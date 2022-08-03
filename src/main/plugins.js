import storage from "../storage"
import logger from "./logger"
import webpack from "./webpack"
import { readMeta } from "../util"

const pluginsFolder = DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "..", "plugins")

if (!DrApiNative.fileSystem.exists(pluginsFolder)) DrApiNative.fileSystem.mkdir(pluginsFolder)

const readDir = DrApiNative.runInNative("require(\"fs\").readdirSync")

const dir = readDir(pluginsFolder)
const plugins = dir.filter(plugin => plugin.endsWith(".plugin.js"))

const _plugins = {}

for (const plugin of plugins) {
  const filePath = DrApiNative.fileSystem.join(pluginsFolder, plugin)

  const pluginContent = DrApiNative.fileSystem.readFile(filePath)
  const meta = readMeta(pluginContent)
  meta.js = pluginContent
  meta.filePath = filePath

  _plugins[meta.name] = meta
}

let ready = false
let InlineCode
const watches = {}
DrApiNative.require("fs").watch(DrApiNative.fileSystem.join(pluginsFolder), (type, file) => {
  if (!file.endsWith(".plugin.js")) return

  if (watches[file]) return
  watches[file] = true
  setTimeout(() => watches[file] = false, 200)
  
  const enabledPlugins = storage.getData("internal", "enabledPlugins", [])

  const filePath = DrApiNative.fileSystem.join(pluginsFolder, file)
  const found = Object.values(_plugins).find(plugin => plugin.filePath === filePath)

  if (!DrApiNative.fileSystem.exists(filePath)) {
    delete _plugins[found.name]
    
    const index = enabledPlugins.indexOf(found.name)
    if (index !== -1) {
      enabledPlugins.splice(index, 1)
      if (ready && found.exports) found.exports.onStop?.()
    }

    return storage.setData("internal", "enabledPlugins", [...enabledPlugins])
  }

  const pluginContent = DrApiNative.fileSystem.readFile(filePath)
  const meta = readMeta(pluginContent)

  if (found) {
    delete _plugins[found.name]
    const index = enabledPlugins.indexOf(found.name)
    if (index !== -1) {
      enabledPlugins.splice(index, 1, meta.name)
      if (ready && found.exports) found.exports.onStop?.()
    }
  }

  meta.js = pluginContent
  meta.filePath = filePath
  _plugins[meta.name] = meta

  if (DrApi.toast) {
    if (!InlineCode) InlineCode = webpack.getModuleByDisplayName("InlineCode", true)
    DrApi.toast.show({
      title: `'${meta.name}' updated`,
      type: "info",
      icon: DrApi.React.createElement(InlineCode),
      duration: 4000
    })
  }

  storage.setData("internal", "enabledPlugins", enabledPlugins)
  
  if (ready) {
    try {
      const res = window.eval(`(function() {\n${meta.js}\n})()\n//# sourceURL=${encodeURIComponent(meta.name)}`)
        
      meta.exports = typeof res === "function" ? new res : res
      if (!meta.exports) return meta.didError = true
      meta.exports.onLoad?.()
    
      if (!enabledPlugins.includes(meta.name)) return
      meta.exports.onStart?.()
    } catch (error) {
      logger.error(meta.name, "Cannot start the plugin", error)
      meta.didError = true
    }
  }
})

export default () => {
  ready = true

  const enabledPlugins = storage.getData("internal", "enabledPlugins", [])
  
  for (const plugin of Object.values(_plugins)) {
    try {
      const res = window.eval(`(function() {\n${plugin.js}\n})()\n//# sourceURL=${encodeURIComponent(plugin.name)}`)
      
      plugin.exports = typeof res === "function" ? new res : res
      if (!plugin.exports) return plugin.didError = true
      plugin.exports.onLoad?.()

      if (enabledPlugins.includes(plugin.name)) plugin.exports.onStart?.()
    } catch (error) {
      logger.error(plugin.name, "Cannot start the plugin", error)
      plugin.didError = true
    }
  }
}

export const getPlugins = () => _plugins
export const togglePlugin = (name) => {
  const enabledPlugins = storage.getData("internal", "enabledPlugins", [])

  const plugin = _plugins[name]

  if (!enabledPlugins.includes(name)) plugin.exports.onStop?.()
  else plugin.exports.onStart?.()
}
