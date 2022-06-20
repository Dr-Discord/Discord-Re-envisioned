console.log("Welcome to Discord Re-envisioned!\n")

const electron = require("electron")
const path = require("path")
const Module = require("module")

const storage = require("./storage")

const newMacOS = storage.getData("internal", "newMacOS", true)

class BrowserWindow extends electron.BrowserWindow {
  static original = electron.BrowserWindow

  constructor(opts) {
    if (!opts.webPreferences || !opts.webPreferences.preload) return super(props)

    let originalPreload = opts.webPreferences.preload

    if (opts.title && opts.webPreferences?.nativeWindowOpen) {
      opts.webPreferences.preload = path.join(__dirname, "preload.js")
    } else {
      opts.webPreferences.preload = path.join(__dirname, "splashPreload.js")
    }

    if (process.platform === "darwin" && !newMacOS) opts.titleBarStyle = "default"

    super(opts)

    this.webContents.DrApi = {
      preload: originalPreload
    }
  }
}

BrowserWindow.toString = () => electron.BrowserWindow.toString()

delete require.cache.electron.exports

require.cache.electron.exports = { ...electron, BrowserWindow }

electron.ipcMain.on("@DrApi/preload", (event) => event.returnValue = event.sender.DrApi.preload)
electron.ipcMain.on("@DrApi/newMacOS", (event) => event.returnValue = newMacOS)

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
    if (url.startsWith("devtools://") || url.startsWith("file://") || url.startsWith("wss://gateway.discord.gg/")) callback({ cancel: false, responseHeaders })
    else callback({ cancel: url.includes("discord.com/api/webhooks"), responseHeaders })
  })
  
  try {
    const { default: installExtension, REACT_DEVELOPER_TOOLS } = require("../node_modules/electron-devtools-installer/")
    installExtension(REACT_DEVELOPER_TOOLS, true)
  } catch (error) {}
})

const basePath = path.join(process.resourcesPath, "app.asar")
const pkg = require(path.join(basePath, "package.json"))
electron.app.setAppPath(basePath)
electron.app.name = pkg.name

const appOld = path.join(process.resourcesPath, "app-old")

if (require("fs").existsSync(appOld)) {
  const res = require(appOld)
  if (typeof res === "function") res(() => Module._load(path.join(basePath, pkg.main), null, true))
}
else Module._load(path.join(basePath, pkg.main), null, true)