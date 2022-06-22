const storage = require("../storage")
const webpack = require("./webpack")

const pluginsFolder = DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "plugins")

if (!DrApiNative.fileSystem.exists(pluginsFolder)) DrApiNative.fileSystem.mkdir(pluginsFolder)

const readDir = DrApiNative.runInNative("require(\"fs\").readdirSync")

const dir = readDir(pluginsFolder)
const plugins = dir.filter(plugin => plugin.endsWith(".plugin.js"))

function readMeta(contents) {
  const meta = {}
  const jsdoc = contents.match(/\/\*\*([\s\S]*?)\*\//)
  if (!jsdoc?.[1]) return meta
  for (let ite of jsdoc[1].match(/\*\s([^\n]*)/g)) {
    ite = ite.replace(/\*( +|)@/, "")
    const split = ite.split(" ")
    meta[split[0]] = split.slice(1).join(" ").trim()
  }
  return meta
}

const _plugins = {}

for (const plugin of plugins) {
  const filePath = DrApiNative.fileSystem.join(pluginsFolder, plugin)

  const pluginContent = DrApiNative.fileSystem.readFile(filePath)
  const meta = readMeta(pluginContent)
  meta.js = pluginContent
  meta.filePath = filePath

  _plugins[meta.name] = meta
}

module.exports = () => {
  const enabledPlugins = storage.getData("internal", "enabledPlugins", [])
  
  for (const plugin of Object.values(_plugins)) {
    const res = eval(`(function() {\n${plugin.js}\n})()//# sourceURL=${encodeURIComponent(plugin.name)}`)
    
    plugin.exports = typeof res === "function" ? new res : res
    
    if (plugin.exports.onLoad) plugin.exports.onLoad()
    if (enabledPlugins.includes(plugin.name)) 
      if (plugin.exports.onStart) plugin.exports.onStart()
  }
}

module.exports.getPlugins = () => _plugins
module.exports.togglePlugin = (name) => {
  const enabledPlugins = storage.getData("internal", "enabledPlugins", [])

  const plugin = _plugins[name]

  if (!enabledPlugins.includes(name)) plugin.exports.onStop?.()
  else plugin.exports.onStart?.()
}