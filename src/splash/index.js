import storage from "../storage"

const enabledThemes = storage.getData("internal", "enabledSplashThemes", [])

const themesFolder = DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "..", "themes")

if (!DrApiNative.fileSystem.exists(themesFolder)) DrApiNative.fileSystem.mkdir(themesFolder)

const readDir = DrApiNative.runInNative("require(\"fs\").readdirSync")

const themes = readDir(themesFolder).filter(theme => theme.endsWith(".splash.css") || theme.endsWith(".splash.scss") || theme.endsWith(".splash.sass"))

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

const node = document.createElement("dr-themes")
for (const themeName of enabledThemes) {
  const theme = _themes[themeName]
  const style = document.createElement("style")
  style.setAttribute("dr-theme", theme.name)
  style.innerHTML = DrApiNative.sass(theme.css)
  node.append(style)
}

if (document.readyState === "complete") document.head.append(node)
else document.addEventListener("DOMContentLoaded", () => document.head.append(node))