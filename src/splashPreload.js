import { ipcRenderer, contextBridge } from "electron"
import fs from "fs"
import path from "path"
import crypto from "crypto"

try {
  const preload = ipcRenderer.sendSync("@DrApi/preload")
  if (preload) require(preload)
} catch (error) {
  console.error(error)
}

const cache = path.join(__dirname, "..", "cache")
if (!fs.existsSync(cache)) fs.mkdirSync(cache)

window.require = require

const Native = {
  require(path) { return require(path) },
  runInNative(code) { return (0, eval)(code) },
  quit(restart = false) { ipcRenderer.send("@DrApi/quit", restart) },
  platform: process.platform,
  sass: (content) => {
    const hash = crypto.createHash("md5").update(content).digest("hex")
    if (fs.existsSync(path.join(cache, hash))) {
      if (sassCache[hash]) return sassCache[hash]
      return sassCache[hash] = fs.readFileSync(path.join(cache, hash), "utf-8")
    }
    
    try {
      const { css } = sass.compileString(content)
      fs.writeFileSync(path.join(cache, hash), css)
      return sassCache[hash] = css
    } catch (error) {
      return error
    }
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

document.addEventListener("keydown", event => {
  if (event.key.toLowerCase() === "s" && event.shiftKey && (event.metaKey || event.ctrlKey)) ipcRenderer.send("@DrApi/dontHideSplash")
})
contextBridge.exposeInMainWorld("DrApiNative", Native)

const node = document.createElement("script")
node.innerHTML = fs.readFileSync(path.join(__dirname, "splash.js"), "utf-8")
document.append(node)
