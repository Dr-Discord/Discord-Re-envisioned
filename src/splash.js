(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/storage.js
  var require_storage = __commonJS({
    "src/storage.js"(exports, module) {
      var isTopWindow = !!globalThis.DrApiNative;
      var _require = isTopWindow ? DrApiNative.require : __require;
      var [
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
        const fs = _require("fs");
        return [
          __dirname,
          _require("path").join,
          fs.existsSync,
          fs.mkdirSync,
          fs.writeFileSync,
          fs.readFileSync
        ];
      })();
      var settingsDir = join(dirName, "settings");
      if (!exists(settingsDir))
        mkdir(settingsDir);
      var listeners = {};
      module.exports = new class rawStorage {
        useStorage(name, key, defaultValue) {
          if (!isTopWindow)
            throw new Error();
          const [state, setState] = DrApi.React.useState(this.getData(name, key, defaultValue));
          DrApi.React.useEffect(() => {
            if (!listeners[name])
              listeners[name] = {};
            if (!listeners[name][key])
              listeners[name][key] = /* @__PURE__ */ new Set();
            function listener(val) {
              setState(val);
            }
            listeners[name][key].add(listener);
            return () => listeners[name][key].delete(listener);
          });
          return [
            state,
            (value) => {
              this.setData(name, key, value);
              for (const set of [...listeners[name][key]])
                set(value);
            }
          ];
        }
        readJSON(name) {
          const file = join(settingsDir, `${name}.json`);
          if (exists(file))
            return JSON.parse(readFile(join(settingsDir, `${name}.json`), "utf-8"));
          return {};
        }
        getData(name, key, defaultValue) {
          const data = this.readJSON(name);
          if (key in data)
            return data[key];
          return defaultValue;
        }
        writeJSON(name, data) {
          const file = join(settingsDir, `${name}.json`);
          writeFile(file, JSON.stringify(data, null, "	"));
        }
        setData(name, key, value) {
          const data = this.readJSON(name);
          data[key] = value;
          if (listeners[name]?.[key])
            for (const set of [...listeners[name][key]])
              set(value);
          this.writeJSON(name, data);
        }
      }();
    }
  });

  // src/splash/index.js
  var storage = require_storage();
  var enabledThemes = storage.getData("internal", "enabledSplashThemes", []);
  var themesFolder = DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "themes");
  if (!DrApiNative.fileSystem.exists(themesFolder))
    DrApiNative.fileSystem.mkdir(themesFolder);
  var readDir = DrApiNative.runInNative('require("fs").readdirSync');
  var themes = readDir(themesFolder).filter((theme) => theme.endsWith(".splash.css"));
  function readMeta(contents) {
    const meta = {};
    const jsdoc = contents.match(/\/\*\*([\s\S]*?)\*\//);
    if (!jsdoc?.[1])
      return meta;
    for (let ite of jsdoc[1].match(/\*\s([^\n]*)/g)) {
      ite = ite.replace(/\*( +|)@/, "");
      const split = ite.split(" ");
      meta[split[0]] = split.slice(1).join(" ").trim();
    }
    return meta;
  }
  var _themes = {};
  for (const theme of themes) {
    const filePath = DrApiNative.fileSystem.join(themesFolder, theme);
    const themeContent = DrApiNative.fileSystem.readFile(filePath);
    const meta = readMeta(themeContent);
    meta.css = themeContent;
    meta.filePath = filePath;
    _themes[meta.name] = meta;
  }
  function documentReady() {
    const node = document.createElement("dr-themes");
    for (const themeName of enabledThemes) {
      const theme = _themes[themeName];
      const style = document.createElement("style");
      style.setAttribute("dr-theme", theme.name);
      style.innerHTML = theme.css;
      node.append(style);
    }
    document.head.append(node);
  }
  if (document.readyState === "complete")
    documentReady();
  else
    document.addEventListener("DOMContentLoaded", documentReady);
})();
