import electron from "electron"
const { ipcRenderer, contextBridge } = electron
import fs from "fs"
import path from "path"
import ofs from "original-fs"
import Module from "module"

Module.globalPaths.push(path.join(process.resourcesPath, "app.asar/node_modules"))

// Replace 'electron/renderer' so we can mess with 'DiscordNative'
delete require.cache.electron.exports
require.cache.electron.exports = {}
Object.defineProperty(require.cache.electron.exports, "contextBridge", {
  get: () => ({
    exposeInMainWorld(key, value) {
      if (key === "DiscordNative") {
        value.window.setDevtoolsCallbacks = () => {}
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

const generateEval = (code) => new Function("require", `return ${code}`)

const Native = {
  require(path) { return require(path) },
  runInNative(code) { return generateEval(code)(require) },
  quit(restart = false) { ipcRenderer.send("@DrApi/quit", restart) },
  platform: process.platform,
  package: require(path.join(__dirname, "package.json")),
  changelog: require(path.join(__dirname, "changelog.json")),
  downloadAsar: (id, callback) => require("request")(`https://api.github.com/repos/Dr-Discord/Discord-Re-envisioned/releases/assets/${id}`, {
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
  }),
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

const replace = (item, fun, callback) => {
  const old = item[fun]
  item[fun] = function() {
    return callback(this, arguments, old)
  }
  item[fun].toString = () => old.toString()
}

function querySelector(that, [ selector ], old) {
  return old.apply(that, [ selector.replace(/( |\.)dr-/g, ".dr-") ])
}

function changeClasses(that, classes, old) {
  let newClasses = []
  classes.map(c => c.includes(" dr-") ? newClasses.push(...c.split(" ")) : newClasses.push(c))
  return old.apply(that, newClasses)
}

replace(DOMTokenList.prototype, "add", changeClasses)
replace(DOMTokenList.prototype, "remove", changeClasses)
replace(DOMTokenList.prototype, "contains", changeClasses)

replace(document, "querySelector", querySelector)
replace(document, "querySelectorAll", querySelector)
replace(Element.prototype, "querySelector", querySelector)
replace(Element.prototype, "querySelectorAll", querySelector)