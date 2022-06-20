const storage = require("../storage")
const { themes:styles } = require("./styles")

const themesFolder = DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "themes")

if (!DrApiNative.fileSystem.exists(themesFolder)) DrApiNative.fileSystem.mkdir(themesFolder)

const readDir = DrApiNative.runInNative("require(\"fs\").readdirSync")

const dir = readDir(themesFolder)
const themes = dir.filter(theme => theme.endsWith(".theme.css"))
const splashThemes = dir.filter(theme => theme.endsWith(".splash.css"))

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

const _themes = {}
for (const theme of themes) {
  const filePath = DrApiNative.fileSystem.join(themesFolder, theme)

  const themeContent = DrApiNative.fileSystem.readFile(filePath)
  const meta = readMeta(themeContent)
  meta.css = themeContent
  meta.filePath = filePath

  _themes[meta.name] = meta
}

const _splashThemes = {}
for (const theme of splashThemes) {
  const filePath = DrApiNative.fileSystem.join(themesFolder, theme)

  const themeContent = DrApiNative.fileSystem.readFile(filePath)
  const meta = readMeta(themeContent)
  meta.css = themeContent
  meta.filePath = filePath

  _splashThemes[meta.name] = meta
}

function watchTheme(file) {
  const enabledThemes = storage.getData("internal", "enabledThemes", [])

  const filePath = DrApiNative.fileSystem.join(themesFolder, file)

  const found = Object.values(_themes).find(theme => theme.filePath === filePath)
  
  if (!DrApiNative.fileSystem.exists(filePath)) {
    delete _themes[found.name]
    
    const index = enabledThemes.indexOf(found.name)
    if (index !== -1) {
      enabledThemes.splice(index, 1)
      document.querySelector(`[dr-theme=${JSON.stringify(id)}]`).remove()
    }

    return storage.setData("internal", "enabledThemes", [...enabledThemes])
  }

  const themeContent = DrApiNative.fileSystem.readFile(filePath)

  if (found) delete _splashThemes[found.name]

  const meta = readMeta(themeContent)

  meta.css = themeContent
  meta.filePath = filePath
  _themes[meta.name] = meta

  storage.setData("internal", "enabledThemes", enabledThemes)

  if (!enabledThemes.includes(meta.name)) return
  if (document.readyState === "complete") module.exports.toggleTheme(meta.name)
}

function watchSplash(file) {
  const enabledThemes = storage.getData("internal", "enabledSplashThemes", [])

  const filePath = DrApiNative.fileSystem.join(themesFolder, file)

  const found = Object.values(_splashThemes).find(theme => theme.filePath === filePath)

  if (!DrApiNative.fileSystem.exists(filePath)) {
    delete _splashThemes[found.name]
    
    const index = enabledThemes.indexOf(found.name)
    if (index !== -1) enabledThemes.splice(index, 1)

    return storage.setData("internal", "enabledSplashThemes", [...enabledThemes])
  }

  const themeContent = DrApiNative.fileSystem.readFile(filePath)

  if (found) delete _splashThemes[found.name]

  const meta = readMeta(themeContent)

  meta.css = themeContent
  meta.filePath = filePath
  _splashThemes[meta.name] = meta

  storage.setData("internal", "enabledSplashThemes", enabledThemes)
}

DrApiNative.require("fs").watch(DrApiNative.fileSystem.join(themesFolder), (type, file) => {
  if (file.endsWith(".theme.css")) return watchTheme(file)
  if (file.endsWith(".splash.css")) return watchSplash(file)
})

module.exports = () => {
  const enabledThemes = storage.getData("internal", "enabledThemes", [])
  
  for (const theme of Object.keys(_themes)) {
    if (!enabledThemes.includes(theme)) continue
    module.exports.toggleTheme(theme)
  }
}

module.exports.toggleTheme = (id) => {
  const theme = _themes[id]

  const isOn = document.querySelector(`[dr-theme=${JSON.stringify(id)}]`)
  if (isOn) return isOn.remove()

  const style = document.createElement("style")
  style.setAttribute("dr-theme", theme.name)
  style.innerHTML = theme.css
  styles.appendChild(style)
}

module.exports.getThemes = (splash = false) => splash ? _splashThemes : _themes