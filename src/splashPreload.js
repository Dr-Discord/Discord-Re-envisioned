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

window.require = require

const Native = {
  require(path) { return require(path) },
  runInNative(code) { return (0, eval)(code) },
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

document.addEventListener("keydown", event => {
  if (event.key.toLowerCase() === "s" && event.shiftKey && (event.metaKey || event.ctrlKey)) ipcRenderer.send("@DrApi/dontHideSplash")
})
contextBridge.exposeInMainWorld("DrApiNative", Native)

const node = document.createElement("script")
node.innerHTML = fs.readFileSync(path.join(__dirname, "splash.js"), "utf-8")
document.append(node)
