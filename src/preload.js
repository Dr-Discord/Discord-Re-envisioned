const electron = require("electron")
const { ipcRenderer, contextBridge } = electron
const fs = require("fs")
const path = require("path")

// Replace electron renderer so we can mess with 'DiscordNative'
delete require.cache.electron.exports
require.cache.electron.exports = {}
Object.defineProperty(require.cache.electron.exports, "contextBridge", {
  get: () => ({
    exposeInMainWorld(key, value) {
      if (key === "DiscordNative") {
        value.window.setDevtoolsCallbacks = function() {}
        value.window.USE_OSX_NATIVE_TRAFFIC_LIGHTS = ipcRenderer.sendSync("@DrApi/newMacOS")
      }

      return contextBridge.exposeInMainWorld(key, value)
    }
  })
})
Object.entries(electron).map(([key, value]) => {
  if (key in require.cache.electron.exports) return
  Object.defineProperty(require.cache.electron.exports, key, {
    get: () => value
  })
})

console.log("[DrApi]: Loading...")

try {
  const preload = ipcRenderer.sendSync("@DrApi/preload")
  if (preload) require(preload)
} catch (error) {
  console.error(error)
}

const originalConsole = globalThis.console
for (const key in console)
  Object.defineProperty(console, key, {
    writable: false,
    value: originalConsole[key]
  })

const Native = {
  require(path) { return require(path) },
  runInNative(code) { return eval(code) },
  quit(restart = false) { ipcRenderer.send("@DrApi/quit", restart) },
  platform: process.platform,
  fileSystem: {
    dirName: __dirname,
    join: (...paths) => path.join(...paths),
    readFile: (path, encoding = "utf-8") => fs.readFileSync(path, encoding),
    writeFile: (path, content) => fs.writeFileSync(path, content),
    exists: (path) => fs.existsSync(path),
    mkdir: (path) => fs.mkdirSync(path),
    rmdir: (path) => fs.rmdirSync(path),
    rm: (path) => fs.rmSync(path)
  }
}

contextBridge.exposeInMainWorld("DrApiNative", Native)

const node = document.createElement("script")
node.innerHTML = fs.readFileSync(path.join(__dirname, "top.js"), "utf-8")
document.append(node)