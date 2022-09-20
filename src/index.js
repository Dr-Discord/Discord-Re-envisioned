console.log("Welcome to Discord Re-envisioned!\n")

import electron from "electron"
import path from "path"
import Module from "module"

import storage from "./storage"

const newMacOS = storage.getData("internal", "newMacOS", process.platform === "darwin")
const transparency = storage.getData("internal", "transparency", false)

let allowSplashToClose = true

class BrowserWindow extends electron.BrowserWindow {
  static original = electron.BrowserWindow

  constructor(opts) {
    if (!opts.webPreferences || !opts.webPreferences.preload) return super(props)

    let originalPreload = opts.webPreferences.preload

    if (opts.title && opts.webPreferences?.nativeWindowOpen)
      opts.webPreferences.preload = path.join(__dirname, "preload.js")
    else
      opts.webPreferences.preload = path.join(__dirname, "splashPreload.js")

    if (process.platform === "darwin" && !newMacOS) opts.titleBarStyle = "default"

    if (transparency) {
      opts.transparent = true
      opts.backgroundColor = "#00000000"
    }

    const win = new electron.BrowserWindow(opts)

    win.webContents.DrApi = { preload: originalPreload }

    const oldClose = win.close
    win.close = () => !opts.webPreferences.preload.endsWith("splashPreload.js") || allowSplashToClose ? oldClose.apply(win, arguments) : null
    const oldHide = win.hide
    win.hide = () => !opts.webPreferences.preload.endsWith("splashPreload.js") || allowSplashToClose ? oldHide.apply(win, arguments) : null

    return win
  }
}

delete require.cache.electron.exports
require.cache.electron.exports = { ...electron, BrowserWindow }

electron.ipcMain.on("@DrApi/preload", (event) => event.returnValue = event.sender.DrApi.preload)
electron.ipcMain.on("@DrApi/newMacOS", (event) => event.returnValue = newMacOS)
electron.ipcMain.on("@DrApi/dontHideSplash", (event) => event.returnValue = allowSplashToClose = false)
electron.ipcMain.on("@DrApi/quit", (event, restart = false) => {
  if(restart) electron.app.relaunch()
  electron.app.quit()
  event.returnValue = true
})

electron.app.once("ready", () => {
  electron.session.defaultSession.webRequest.onHeadersReceived(function({ responseHeaders, url }, callback) {
    for (const header in responseHeaders) {
      if (!header.startsWith("content-security-policy")) continue
      delete responseHeaders[header]
    }
    
    callback({ cancel: url.includes("discord.com/api/webhooks"), responseHeaders })
  })
})

const basePath = path.join(process.resourcesPath, "app.asar")
const pkg = require(path.join(basePath, "package.json"))
electron.app.setAppPath(basePath)
electron.app.name = pkg.name

const appOld = path.join(process.resourcesPath, "app-old")

if (require("fs").existsSync(appOld)) {
  console.warn("Discord Re-envisioned can error with other mods!")

  const res = require(appOld)
  if (typeof res === "function") res(() => Module._load(path.join(basePath, pkg.main), null, true))
}
else Module._load(path.join(basePath, pkg.main), null, true)
