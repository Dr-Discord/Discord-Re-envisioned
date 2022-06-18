const isTopWindow = !globalThis.global

// Bypass esbuild build 'require("item")' error
const _require = isTopWindow ? DrApiNative.require : require

const [
  dirName,
  join,
  exists,
  mkdir,
  writeFile,
  readFile
] = isTopWindow ? [
  DrApiNative.fileSystem.dirName,
  DrApiNative.fileSystem.join,
  DrApiNative.fileSystem.exists,
  DrApiNative.fileSystem.mkdir,
  DrApiNative.fileSystem.writeFile,
  DrApiNative.fileSystem.readFile
] : (() => {
  const fs = _require("fs")

  return [
    __dirname,
    _require("path").join,
    fs.existsSync,
    fs.mkdirSync,
    fs.writeFileSync,
    fs.readFileSync
  ]
})()

const settingsDir = join(dirName, "settings")

if (!exists(settingsDir)) mkdir(settingsDir)

const listeners = {}

module.exports = new class rawStorage {
  useStorage(name, key, defaultValue) {
    if (!isTopWindow) throw new Error()

    const [state, setState] = DrApi.React.useState(this.getData(name, key, defaultValue))

    DrApi.React.useEffect(() => {
      if (!listeners[name]) listeners[name] = {}
      if (!listeners[name][key]) listeners[name][key] = new Set()

      function listener(val) {
        setState(val)
      }

      listeners[name][key].add(listener) 
      return () => listeners[name][key].delete(listener) 
    })

    return [
      state,
      (value) => {
        this.setData(name, key, value)
        for (const set of [...listeners[name][key]]) set(value)
      }
    ]
  }
  readJSON(name) {
    const file = join(settingsDir, `${name}.json`)
    if (exists(file)) return JSON.parse(readFile(join(settingsDir, `${name}.json`), "utf-8"))
    return {}
  }
  getData(name, key, defaultValue) {
    const data = this.readJSON(name)
    if (key in data) return data[key]
    return defaultValue
  }
  writeJSON(name, data) {
    const file = join(settingsDir, `${name}.json`)
    writeFile(file, JSON.stringify(data, null, "\t"))
  }
  setData(name, key, value) {
    const data = this.readJSON(name)
    data[key] = value

    if (listeners[name]?.[key]) for (const set of [...listeners[name][key]]) set(value)

    this.writeJSON(name, data)
  }
}