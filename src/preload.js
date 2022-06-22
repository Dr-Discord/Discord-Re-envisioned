const electron = require("electron")
const { ipcRenderer, contextBridge } = electron
const fs = require("fs")
const path = require("path")
const ofs = require("original-fs")

require("module").globalPaths.push(path.join(process.resourcesPath, "app.asar/node_modules"))

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
  Object.defineProperty(require.cache.electron.exports, key, { get: () => value })
})

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
  downloadAsar(id, callback) {
    require("request")(`https://api.github.com/repos/Dr-Discord/dev/releases/assets/${id}`, {
      encoding: null,
      headers: {
        "User-Agent": "Updater", 
        "Accept": "application/octet-stream"
      }
    }, (err, resp, body) => {
      if (err || resp.statusCode != 200) return callback(true)
      ofs.unlinkSync(__dirname)
      ofs.writeFileSync(__dirname, body)
      callback(false)
    })
  },
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
node.innerHTML = fs.readFileSync(path.join(__dirname, "main.js"), "utf-8")
document.append(node)