import storage from "../storage"
import { themes as styles } from "./styles"
import webpack from "./webpack"
import { readMeta } from "../util"

const themesFolder = DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "..", "themes")

if (!DrApiNative.fileSystem.exists(themesFolder)) DrApiNative.fileSystem.mkdir(themesFolder)

const readDir = DrApiNative.runInNative("require(\"fs\").readdirSync")

const dir = readDir(themesFolder)

export const isTheme = (path) => path.endsWith(".theme.css")
export const isSplash = (path) => path.endsWith(".splash.css")

const themes = dir.filter(isTheme)
const splashThemes = dir.filter(isSplash)

function int(color) {
  if (typeof color === "number") return color.toString(16)
  
  if (color.startsWith("#")) {
    color = color.substring(1)
    if (color.length === 3) color = Array.from({ length: 6 }, (_, i) => color[Math.round((i + 1) / 2)]).join("")
    return parseInt(color, 16)
  }
  
  const matches = color.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d*)?)\))?/)
  const rgb = matches ? {
    red: parseInt(matches[1]),
    green: parseInt(matches[2]),
    blue: parseInt(matches[3])
  } : {
    red: 0,
    green: 0,
    blue: 0
  }
  return (rgb.red << 16) + (rgb.green << 8) + rgb.blue
}

export function parseTheme(contents) {
  const meta = readMeta(contents)

  meta.originalCSS = contents
  meta.css = contents

  const settings = contents.match(/@settings((\s|)+)(.*?)((\s|)+){((\n|)((\s|)+)([A-z]|[0-9])+:((\s|)+)((rgb|hsl|#|)(a|)(([A-z]|[0-9])+|\((([0-9]|\.)+(,|\/|)((\s|)+)){0,4}\))|(["'])(.*?[^\\])\1)(;|)(\n|)((\s|)+)){0,}}/g)
  if (!settings) return meta

  const _settings = {}

  for (let setting of settings) {
    contents = contents.replace(setting, "")
  
    setting = setting.replace(/@settings((\s|)+)/g, "")
  
    let id = setting.match(/(.*?)((\s|)+){/g)[0]
    id = id.replace(id.match(/((\s|)+){/g)[0], "")
  
    let body = setting.replace(setting.match(/(.*?)((\s|)+){/g)[0], "").replace(/((\s|\n|)+)}/g, "")
  
    const properties = []
    for (let key of body.match(/((\s|)+)([A-z]|[0-9])+:((\s|)+)/g)) {
      body = body.replace(key, "")
      for (const iterator of key.match(/((\s|)+)/)) key = key.replace(iterator, "").replace(":", "")
      properties.push(key)
    }
    
    const _properties = {}
    const _matches = body.match(/((["'])(.*?[^\\])\2|((rgb|#|)(a|)(([A-z]|[0-9])+|\((([0-9]|\.)+(,|\/|)((\s|)+)){0,4}\))|(["'])(.*?[^\\])\1))/g)
    for (const id in _matches) {
      const val = _matches[id]
      if (val.startsWith("\"") || val.startsWith("'")) _properties[properties[id]] = val.substring(1, val.length - 1)
      else if (val.startsWith("#") || val.startsWith("rgb")) _properties[properties[id]] = int(val)
      else _properties[properties[id]] = val
    }

    if (_properties.regex) {
      const match = _properties.regex.match(/(^\/)((.*?)+)\/(\w+|)/)
      if (match) _properties.regex = new RegExp(match[2], match[4])
      else _properties.regex = new RegExp(_properties.regex)
    }
  
    _settings[id] = _properties
  }

  const data = storage.readJSON(`${meta.name}.theme`)

  meta.settings = _settings
  meta.css = `${contents}\n\n/* Generated CSS Settings */\n:root {\n${Object.entries(_settings).map(([key, value]) => {
    if (value.type.toLowerCase() === "color") return`\t--${key}: #${int(data[key] ?? value.initial)}`
    if (value.type.toLowerCase() === "text") return`\t--${key}: ${JSON.stringify(data[key] ?? value.initial ?? "")}`
    if (value.type.toLowerCase() === "switch") return`\t--${key}: ${data[key] ?? JSON.parse(value.initial) ? 1 : 0}`
    if (value.type.toLowerCase() === "slider") return`\t--${key}: ${data[key] ?? value.initial ? 1 : 0}`
  }).join(";\n")}\n}`

  return meta
}

const _themes = {}
for (const theme of themes) {
  const filePath = DrApiNative.fileSystem.join(themesFolder, theme)

  const themeContent = DrApiNative.fileSystem.readFile(filePath)
  const meta = parseTheme(themeContent)
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

let Creative
let DoubleStarIcon

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

  const meta = parseTheme(themeContent)

  if (found) {
    delete _themes[found.name]
    const index = enabledThemes.indexOf(found.name)
    if (index !== -1) enabledThemes.splice(index, 1, meta.name)
  }

  meta.filePath = filePath
  _themes[meta.name] = meta

  if (DrApi.toast) {
    if (!Creative) Creative = webpack.getModuleByDisplayName("Creative", true)
    DrApi.toast.show({
      title: `'${meta.name}' updated`,
      type: "info",
      icon: DrApi.React.createElement(Creative),
      duration: 4000
    })
  }

  storage.setData("internal", "enabledThemes", enabledThemes)

  if (!enabledThemes.includes(meta.name)) return
  if (document.readyState === "complete") {
    const style = document.createElement("style")
    style.setAttribute("dr-theme", meta.name)
    style.innerHTML = meta.css
    styles.appendChild(style)
  }
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

  if (found) {
    delete _splashThemes[found.name]
    const index = enabledThemes.indexOf(found.name)
    if (index !== -1) enabledThemes.splice(index, 1, meta.name)
  }

  meta.css = themeContent
  meta.filePath = filePath
  _splashThemes[meta.name] = meta

  if (DrApi.toast) {
    if (!DoubleStarIcon) DoubleStarIcon = webpack.getModuleByDisplayName("DoubleStarIcon", true)
    DrApi.toast.show({
      title: `'${meta.name}' updated`,
      type: "info",
      icon: DrApi.React.createElement(DoubleStarIcon),
      duration: 4000
    })
  }

  storage.setData("internal", "enabledSplashThemes", enabledThemes)
}

const watches = {}
DrApiNative.require("fs").watch(DrApiNative.fileSystem.join(themesFolder), (type, file) => {
  if (watches[file]) return
  watches[file] = true
  setTimeout(() => watches[file] = false, 200)
  if (isTheme(file)) return watchTheme(file)
  if (isSplash(file)) return watchSplash(file)
})

export default function() {
  const enabledThemes = storage.getData("internal", "enabledThemes", [])
  
  for (const theme in _themes) {
    if (!enabledThemes.includes(theme)) continue

    toggleTheme(theme, true)
  }
}

export const toggleTheme = (id, val) => {
  const theme = _themes[id]

  if (val) {
    const style = document.createElement("style")
    style.setAttribute("dr-theme", theme.name)
    style.innerHTML = theme.css
    styles.appendChild(style)
  } else {
    document.querySelector(`[dr-theme=${JSON.stringify(id)}]`)?.remove?.()
  }
}

export const getThemes = (splash = false) => splash ? _splashThemes : _themes