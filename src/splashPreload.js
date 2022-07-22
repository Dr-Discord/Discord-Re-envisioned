import { ipcRenderer } from "electron"
import fs from "fs"
import path from "path"

import storage from "./storage"
import { readMeta } from "./util"

try {
  const preload = ipcRenderer.sendSync("@DrApi/preload")
  if (preload) require(preload)
} catch (error) {
  console.error(error)
}

document.addEventListener("keydown", event => {
  if (event.key.toLowerCase() === "s" && event.shiftKey && (event.metaKey || event.ctrlKey)) ipcRenderer.send("@DrApi/dontHideSplash")
  else if (event.key.toLowerCase() === "f8") debugger
}, true)

const enabledThemes = storage.getData("internal", "enabledSplashThemes", [])
const themesFolder = path.join(__dirname, "..", "themes")

if (!fs.existsSync(themesFolder)) fs.mkdirSync(themesFolder)

const themes = fs.readdirSync(themesFolder).filter(theme => theme.endsWith(".splash.css"))

const _themes = {}

for (const theme of themes) {
  const filePath = path.join(themesFolder, theme)

  const themeContent = fs.readFileSync(filePath, "utf-8")
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
  style.innerHTML = theme.css
  node.append(style)
}

if (document.readyState === "complete") document.head.append(node)
else document.addEventListener("DOMContentLoaded", () => document.head.append(node))