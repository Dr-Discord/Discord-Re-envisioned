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

  // src/main/logger.js
  var require_logger = __commonJS({
    "src/main/logger.js"(exports2, module2) {
      function getIcon(color) {
        return btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path d="M11.1903 7.802C11.1903 8.426 11.1003 9.092 10.9203 9.8C10.7403 10.496 10.4883 11.192 10.1643 11.888C9.84032 12.572 9.43832 13.232 8.95832 13.868C8.49032 14.492 7.95632 15.044 7.35632 15.524C6.75632 15.992 6.09632 16.37 5.37632 16.658C4.66832 16.946 3.91232 17.09 3.10832 17.09C2.94032 17.09 2.77232 17.078 2.60432 17.054C2.43632 17.042 2.26832 17.024 2.10032 17C2.42432 15.344 2.74232 13.73 3.05432 12.158C3.17432 11.498 3.30032 10.814 3.43232 10.106C3.56432 9.386 3.69032 8.678 3.81032 7.982C3.93032 7.286 4.04432 6.62 4.15232 5.984C4.27232 5.348 4.36832 4.772 4.44032 4.256C4.95632 4.16 5.47832 4.07 6.00632 3.986C6.53432 3.902 7.07432 3.86 7.62632 3.86C8.27432 3.86 8.82032 3.962 9.26432 4.166C9.72032 4.37 10.0863 4.652 10.3623 5.012C10.6503 5.372 10.8603 5.792 10.9923 6.272C11.1243 6.752 11.1903 7.262 11.1903 7.802ZM6.94232 6.398C6.81032 7.106 6.67232 7.784 6.52832 8.432C6.38432 9.08 6.24032 9.734 6.09632 10.394C5.95232 11.054 5.80832 11.744 5.66432 12.464C5.52032 13.184 5.38232 13.97 5.25032 14.822C5.53832 14.63 5.81432 14.372 6.07832 14.048C6.35432 13.712 6.61232 13.328 6.85232 12.896C7.09232 12.464 7.30832 12.008 7.50032 11.528C7.70432 11.048 7.87832 10.58 8.02232 10.124C8.16632 9.668 8.27432 9.242 8.34632 8.846C8.43032 8.45 8.47232 8.108 8.47232 7.82C8.47232 7.376 8.34632 7.028 8.09432 6.776C7.85432 6.524 7.47032 6.398 6.94232 6.398ZM10.0456 17.018C10.3696 15.422 10.6816 13.862 10.9816 12.338C11.0896 11.69 11.2096 11.018 11.3416 10.322C11.4736 9.614 11.5936 8.918 11.7016 8.234C11.8216 7.538 11.9296 6.872 12.0256 6.236C12.1336 5.588 12.2176 5 12.2776 4.472C12.9616 4.256 13.6996 4.1 14.4916 4.004C15.2836 3.896 16.0696 3.842 16.8496 3.842C17.3176 3.842 17.7016 3.896 18.0016 4.004C18.3136 4.112 18.5536 4.268 18.7216 4.472C18.9016 4.664 19.0276 4.892 19.0996 5.156C19.1716 5.42 19.2076 5.714 19.2076 6.038C19.2076 6.518 19.1236 6.992 18.9556 7.46C18.7876 7.916 18.5596 8.354 18.2716 8.774C17.9956 9.182 17.6716 9.56 17.2996 9.908C16.9396 10.244 16.5496 10.52 16.1296 10.736C16.3456 11.216 16.5736 11.744 16.8136 12.32C17.0656 12.884 17.2996 13.424 17.5156 13.94C17.7556 14.54 18.0016 15.14 18.2536 15.74L15.4636 16.712C15.2236 15.944 15.0076 15.224 14.8156 14.552C14.7316 14.276 14.6476 13.994 14.5636 13.706C14.4796 13.406 14.4016 13.124 14.3296 12.86C14.2576 12.596 14.1976 12.362 14.1496 12.158C14.1016 11.942 14.0716 11.768 14.0596 11.636L13.8256 11.708C13.7536 12.092 13.6636 12.542 13.5556 13.058C13.4596 13.574 13.3696 14.072 13.2856 14.552C13.1776 15.116 13.0696 15.686 12.9616 16.262L10.0456 17.018ZM14.2756 9.206C14.5036 9.182 14.7796 9.086 15.1036 8.918C15.4396 8.75 15.7576 8.552 16.0576 8.324C16.3576 8.084 16.6156 7.838 16.8316 7.586C17.0476 7.334 17.1556 7.112 17.1556 6.92C17.1556 6.788 17.1136 6.686 17.0296 6.614C16.9456 6.53 16.8256 6.47 16.6696 6.434C16.5256 6.386 16.3636 6.356 16.1836 6.344C16.0036 6.332 15.8176 6.326 15.6256 6.326C15.4936 6.326 15.3556 6.332 15.2116 6.344C15.0796 6.344 14.9596 6.344 14.8516 6.344L14.2756 9.206Z" fill="${color}"></path></svg>`);
      }
      var isDark = matchMedia("(prefers-color-scheme: dark)").matches;
      module2.exports = new class rawLogger {
        log(title, ...messages) {
          console.log(`%cDR%c${title}%c
`, `background-image:url(data:image/svg+xml;base64,${getIcon(isDark ? "#202124" : "#fff")}); color: transparent; background-size: 24px; background-repeat: no-repeat; padding: 5px; background-color: #F52590; border-radius: 4px`, `background: #F52590; margin-left: 5px; margin-bottom: 9px; padding: 2px; border-radius: 4px; color: ${isDark ? "#202124" : "#fff"}`, "padding-left: 3px", ...messages);
        }
        warn(title, ...messages) {
          console.warn(`%cDR%c${title}%c
`, `background-image:url(data:image/svg+xml;base64,${getIcon(isDark ? "#202124" : "#fff")}); color: transparent; background-size: 24px; background-repeat: no-repeat; padding: 5px; background-color: #ed4245; border-radius: 4px`, `background: #ed4245; margin-left: 5px; margin-bottom: 9px; padding: 2px; border-radius: 4px; color: ${isDark ? "#202124" : "#fff"}`, "padding-left: 3px", ...messages);
        }
        error(title, ...messages) {
          console.error(`%cDR%c${title}%c
`, `background-image:url(data:image/svg+xml;base64,${getIcon(isDark ? "#202124" : "#fff")}); color: transparent; background-size: 24px; background-repeat: no-repeat; padding: 5px; background-color: #faa81a; border-radius: 4px`, `background: #faa81a; margin-left: 5px; margin-bottom: 9px; padding: 2px; border-radius: 4px; color: ${isDark ? "#202124" : "#fff"}`, "padding-left: 3px", ...messages);
        }
      }();
    }
  });

  // src/main/webpack.js
  var require_webpack = __commonJS({
    "src/main/webpack.js"(exports2, module2) {
      module2.exports = new class rawWebpack {
        constructor() {
          let waiting = [];
          let webpackModules = {};
          window.webpackChunkdiscord_app ??= [];
          window.webpackChunkdiscord_app.push([[Symbol("DrApi")], {}, (instance) => {
            window.webpackChunkdiscord_app.pop();
            this.instance = instance;
          }]);
          let old = window.webpackChunkdiscord_app.push;
          function makeHandler(original) {
            function handler(chunk) {
              const [, modules] = chunk;
              for (const id2 in modules) {
                const old2 = modules[id2];
                modules[id2] = function(_, module3) {
                  const res2 = old2.apply(this, arguments);
                  for (const ite of waiting)
                    ite(module3, id2);
                  webpackModules[id2] = _.exports;
                  if (_.exports && !_.exports.css) {
                    const m = Object.entries(_.exports);
                    m.map(([id3, selector]) => {
                      if (typeof selector !== "string")
                        return;
                      if (!selector.includes(`${id3}-`))
                        return;
                      let newSelector = [];
                      for (const s of selector.split(" "))
                        newSelector.push(`${s} dr-${s.split("-")[0]}`);
                      _.exports[id3] = newSelector.join(" ");
                    });
                  }
                  return res2;
                };
              }
              return original.apply(this, [chunk]);
            }
            return old === original ? () => handler : handler;
          }
          Object.defineProperty(window.webpackChunkdiscord_app, "push", {
            configurable: true,
            get: makeHandler(old),
            set: (val) => {
              Object.defineProperty(window.webpackChunkdiscord_app, "push", {
                value: makeHandler(val),
                configurable: true,
                writable: true
              });
            }
          });
          this.webpackModules = webpackModules;
          this.waiting = waiting;
          this.errors = [];
        }
        getModule(filter) {
          for (const id2 in this.webpackModules) {
            try {
              const module3 = this.webpackModules[id2];
              if (!module3)
                continue;
              if (filter(module3))
                return module3;
            } catch (error) {
              this.errors.push(error);
            }
          }
        }
        getModuleById(id2) {
          return this.webpackModules[id2];
        }
        getModuleByProps(...props) {
          let _module;
          this.getModule((module3) => {
            if (props.every((prop) => typeof module3[prop] !== "undefined"))
              return _module = module3;
            if (!module3?.default)
              return;
            if (props.every((prop) => typeof module3?.default[prop] !== "undefined"))
              return _module = module3?.default;
          });
          return _module;
        }
        getModuleByDisplayName(displayName, returnDefault = false) {
          const module3 = this.getModule((module4) => module4?.default.displayName === displayName);
          if (returnDefault)
            return module3?.default;
          return module3;
        }
        getAllModules(filter) {
          let modules = [];
          for (const id2 in this.webpackModules) {
            try {
              const module3 = this.webpackModules[id2];
              if (!module3)
                continue;
              if (filter(module3))
                modules.push(module3);
            } catch (error) {
              this.errors.push(error);
            }
          }
          return modules;
        }
        getAllModulesByProps(...props) {
          let modules = [];
          this.getAllModules((module3) => {
            if (props.every((prop) => typeof module3[prop] !== "undefined"))
              return modules.push(module3);
            if (!module3?.default)
              return;
            if (props.every((prop) => typeof module3?.default[prop] !== "undefined"))
              return modules.push(module3?.default);
          });
          return modules;
        }
        getAllModulesByDisplayName(displayName, returnDefault = false) {
          const modules = this.getAllModules((module3) => module3?.default.displayName === displayName);
          if (returnDefault)
            modules.map((module3) => module3?.default);
          return modules;
        }
        getModuleAsync(filter) {
          let _this = this;
          return new Promise((resolve) => {
            const cached = _this.getModule(filter);
            if (cached)
              return resolve(cached);
            function waiter(module3, id2) {
              try {
                if (!module3)
                  return;
                if (filter(module3, id2)) {
                  const i = _this.waiting.indexOf(waiter);
                  _this.waiting.splice(i, 1);
                  return resolve(module3);
                }
              } catch (error) {
                _this.errors.push(error);
              }
            }
            this.waiting.push(waiter);
          });
        }
        getModuleByIdAsync(moduleId) {
          const cached = this.webpackModules[moduleId];
          if (cached)
            return Promise.resolve(cached);
          return this.getModuleAsync((_, id2) => Number(id2) === Number(moduleId));
        }
        getModuleByPropsAsync(...props) {
          return new Promise((resolve) => {
            this.getModuleAsync((module3) => {
              if (props.every((prop) => typeof module3[prop] !== "undefined"))
                return resolve(module3);
              if (!module3?.default)
                return;
              if (props.every((prop) => typeof module3?.default[prop] !== "undefined"))
                return resolve(module3?.default);
            });
          });
        }
        async getModuleByDisplayNameAsync(displayName, returnDefault = false) {
          const module3 = await this.getModuleAsync((module4) => module4?.default.displayName === displayName);
          if (returnDefault)
            return module3?.default;
          return module3;
        }
      }();
    }
  });

  // src/main/patcher.js
  var require_patcher = __commonJS({
    "src/main/patcher.js"(exports2, module2) {
      module2.exports = new class rawPatcher {
        Symbol = Symbol("DrApi");
        hook(module3, fn) {
          if (!module3[fn])
            module3[fn] = function() {
            };
          const original = module3[fn];
          let hook = module3[fn][this.Symbol];
          if (!(this.Symbol in module3[fn])) {
            hook = module3[fn][this.Symbol] = {
              before: /* @__PURE__ */ new Set(),
              instead: /* @__PURE__ */ new Set(),
              after: /* @__PURE__ */ new Set()
            };
            module3[fn] = function() {
              let args = Array.from(arguments);
              for (const { callback } of [...hook.before]) {
                const result = callback(this, args);
                if (Array.isArray(result))
                  args = result;
              }
              let res2;
              if (!hook.instead.size)
                res2 = original.apply(this, args);
              else
                for (const { callback } of [...hook.instead])
                  res2 = callback(this, args, original);
              for (const { callback } of [...hook.after]) {
                const result = callback(this, args, res2);
                if (typeof result !== "undefined")
                  res2 = result;
              }
              return res2;
            };
            Object.assign(module3[fn], original);
            module3[fn].toString = () => original.toString();
            module3[fn].toString.toString = () => original.toString.toString();
          }
          return hook;
        }
        before(id2, mod, fn, callback) {
          const hook = this.hook(mod, fn);
          const obj = { callback, id: id2 };
          hook.before.add(obj);
          return () => hook.after.delete(obj);
        }
        instead(id2, mod, fn, callback) {
          const hook = this.hook(mod, fn);
          const obj = { callback, id: id2 };
          hook.instead.add(obj);
          return () => hook.after.delete(obj);
        }
        after(id2, mod, fn, callback) {
          const hook = this.hook(mod, fn);
          const obj = { callback, id: id2 };
          hook.after.add(obj);
          return () => hook.after.delete(obj);
        }
      }();
    }
  });

  // src/storage.js
  var require_storage = __commonJS({
    "src/storage.js"(exports2, module2) {
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
      var customCSS = join(settingsDir, "custom.css");
      if (!exists(customCSS))
        writeFile(customCSS, "");
      var listeners = {};
      module2.exports = new class rawStorage {
        customCSS(value) {
          if (typeof value === "string")
            writeFile(customCSS, value);
          else
            readFile(customCSS);
        }
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
          const file2 = join(settingsDir, `${name}.json`);
          if (exists(file2))
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
          const file2 = join(settingsDir, `${name}.json`);
          writeFile(file2, JSON.stringify(data, null, "	"));
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

  // src/main/styles.js
  var require_styles = __commonJS({
    "src/main/styles.js"(exports2, module2) {
      var styles2 = document.createElement("dr-styles");
      var internal = document.createElement("dr-internal");
      var themes2 = document.createElement("dr-themes");
      var plugins3 = document.createElement("dr-plugins");
      var customCSS = document.createElement("style");
      styles2.append(internal, plugins3, themes2, customCSS);
      module2.exports = function(id2, css) {
        const isInternal = id2.startsWith("DrApi");
        let style = document.querySelector(`[dr-${isInternal ? "internal" : "plugin"}=${JSON.stringify(id2)}]`);
        if (!style) {
          style = document.createElement("style");
          style.setAttribute(`dr-${internal ? "internal" : "plugin"}`, id2);
          if (isInternal)
            internal.append(style);
          else
            plugins3.append(style);
        }
        style.innerHTML = css;
        return () => style.remove();
      };
      module2.exports.documentReady = () => document.head.append(styles2);
      module2.exports.styles = styles2;
      module2.exports.internal = internal;
      module2.exports.plugins = plugins3;
      module2.exports.themes = themes2;
      module2.exports.customCSS = customCSS;
    }
  });

  // src/main/themes.js
  var require_themes = __commonJS({
    "src/main/themes.js"(exports2, module2) {
      var storage3 = require_storage();
      var { themes: styles2 } = require_styles();
      var webpack3 = require_webpack();
      var themesFolder = DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "themes");
      if (!DrApiNative.fileSystem.exists(themesFolder))
        DrApiNative.fileSystem.mkdir(themesFolder);
      var readDir2 = DrApiNative.runInNative('require("fs").readdirSync');
      var dir2 = readDir2(themesFolder);
      var themes2 = dir2.filter((theme) => theme.endsWith(".theme.css"));
      var splashThemes = dir2.filter((theme) => theme.endsWith(".splash.css"));
      function readMeta2(contents) {
        const meta2 = {};
        const jsdoc = contents.match(/\/\*\*([\s\S]*?)\*\//);
        if (!jsdoc?.[1])
          return meta2;
        for (let ite of jsdoc[1].match(/\*\s([^\n]*)/g)) {
          ite = ite.replace(/\*( +|)@/, "");
          const split = ite.split(" ");
          meta2[split[0]] = split.slice(1).join(" ").trim();
        }
        return meta2;
      }
      var _themes = {};
      for (const theme of themes2) {
        const filePath2 = DrApiNative.fileSystem.join(themesFolder, theme);
        const themeContent = DrApiNative.fileSystem.readFile(filePath2);
        const meta2 = readMeta2(themeContent);
        meta2.css = themeContent;
        meta2.filePath = filePath2;
        _themes[meta2.name] = meta2;
      }
      var _splashThemes = {};
      for (const theme of splashThemes) {
        const filePath2 = DrApiNative.fileSystem.join(themesFolder, theme);
        const themeContent = DrApiNative.fileSystem.readFile(filePath2);
        const meta2 = readMeta2(themeContent);
        meta2.css = themeContent;
        meta2.filePath = filePath2;
        _splashThemes[meta2.name] = meta2;
      }
      var Creative;
      var DoubleStarIcon;
      function watchTheme(file2) {
        const enabledThemes = storage3.getData("internal", "enabledThemes", []);
        const filePath2 = DrApiNative.fileSystem.join(themesFolder, file2);
        const found2 = Object.values(_themes).find((theme) => theme.filePath === filePath2);
        if (!DrApiNative.fileSystem.exists(filePath2)) {
          delete _themes[found2.name];
          const index = enabledThemes.indexOf(found2.name);
          if (index !== -1) {
            enabledThemes.splice(index, 1);
            document.querySelector(`[dr-theme=${JSON.stringify(id)}]`).remove();
          }
          return storage3.setData("internal", "enabledThemes", [...enabledThemes]);
        }
        const themeContent = DrApiNative.fileSystem.readFile(filePath2);
        const meta2 = readMeta2(themeContent);
        if (found2) {
          delete _themes[found2.name];
          const index = enabledThemes.indexOf(found2.name);
          if (index !== -1)
            enabledThemes.splice(index, 1, meta2.name);
        }
        meta2.css = themeContent;
        meta2.filePath = filePath2;
        _themes[meta2.name] = meta2;
        if (DrApi.toast) {
          if (!Creative)
            Creative = webpack3.getModuleByDisplayName("Creative", true);
          setTimeout(DrApi.toast.show({
            title: `'${meta2.name}' updated`,
            type: "info",
            icon: DrApi.React.createElement(Creative)
          }), 4e3);
        }
        storage3.setData("internal", "enabledThemes", enabledThemes);
        if (!enabledThemes.includes(meta2.name))
          return;
        if (document.readyState === "complete")
          module2.exports.toggleTheme(meta2.name);
      }
      function watchSplash(file2) {
        const enabledThemes = storage3.getData("internal", "enabledSplashThemes", []);
        const filePath2 = DrApiNative.fileSystem.join(themesFolder, file2);
        const found2 = Object.values(_splashThemes).find((theme) => theme.filePath === filePath2);
        if (!DrApiNative.fileSystem.exists(filePath2)) {
          delete _splashThemes[found2.name];
          const index = enabledThemes.indexOf(found2.name);
          if (index !== -1)
            enabledThemes.splice(index, 1);
          return storage3.setData("internal", "enabledSplashThemes", [...enabledThemes]);
        }
        const themeContent = DrApiNative.fileSystem.readFile(filePath2);
        if (found2)
          delete _splashThemes[found2.name];
        const meta2 = readMeta2(themeContent);
        if (found2) {
          delete _splashThemes[found2.name];
          const index = enabledThemes.indexOf(found2.name);
          if (index !== -1)
            enabledThemes.splice(index, 1, meta2.name);
        }
        meta2.css = themeContent;
        meta2.filePath = filePath2;
        _splashThemes[meta2.name] = meta2;
        if (DrApi.toast) {
          if (!DoubleStarIcon)
            DoubleStarIcon = webpack3.getModuleByDisplayName("DoubleStarIcon", true);
          setTimeout(DrApi.toast.show({
            title: `'${meta2.name}' updated`,
            type: "info",
            icon: DrApi.React.createElement(DoubleStarIcon)
          }), 4e3);
        }
        storage3.setData("internal", "enabledSplashThemes", enabledThemes);
      }
      var flippyBit2 = 0;
      DrApiNative.require("fs").watch(DrApiNative.fileSystem.join(themesFolder), (type2, file2) => {
        if (!(flippyBit2++ % 2))
          return;
        if (!file2)
          return;
        if (file2.endsWith(".theme.css"))
          return watchTheme(file2);
        if (file2.endsWith(".splash.css"))
          return watchSplash(file2);
      });
      module2.exports = () => {
        const enabledThemes = storage3.getData("internal", "enabledThemes", []);
        for (const theme of Object.keys(_themes)) {
          if (!enabledThemes.includes(theme))
            continue;
          module2.exports.toggleTheme(theme);
        }
      };
      module2.exports.toggleTheme = (id2) => {
        const theme = _themes[id2];
        const isOn = document.querySelector(`[dr-theme=${JSON.stringify(id2)}]`);
        if (isOn)
          return isOn.remove();
        const style = document.createElement("style");
        style.setAttribute("dr-theme", theme.name);
        style.innerHTML = theme.css;
        styles2.appendChild(style);
      };
      module2.exports.getThemes = (splash = false) => splash ? _splashThemes : _themes;
    }
  });

  // src/main/plugins.js
  var require_plugins = __commonJS({
    "src/main/plugins.js"(exports, module) {
      var storage = require_storage();
      var webpack = require_webpack();
      var pluginsFolder = DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "plugins");
      if (!DrApiNative.fileSystem.exists(pluginsFolder))
        DrApiNative.fileSystem.mkdir(pluginsFolder);
      var readDir = DrApiNative.runInNative('require("fs").readdirSync');
      var dir = readDir(pluginsFolder);
      var plugins = dir.filter((plugin2) => plugin2.endsWith(".plugin.js"));
      function readMeta(contents) {
        const meta2 = {};
        const jsdoc = contents.match(/\/\*\*([\s\S]*?)\*\//);
        if (!jsdoc?.[1])
          return meta2;
        for (let ite of jsdoc[1].match(/\*\s([^\n]*)/g)) {
          ite = ite.replace(/\*( +|)@/, "");
          const split = ite.split(" ");
          meta2[split[0]] = split.slice(1).join(" ").trim();
        }
        return meta2;
      }
      var _plugins = {};
      for (const plugin2 of plugins) {
        const filePath2 = DrApiNative.fileSystem.join(pluginsFolder, plugin2);
        const pluginContent2 = DrApiNative.fileSystem.readFile(filePath2);
        const meta2 = readMeta(pluginContent2);
        meta2.js = pluginContent2;
        meta2.filePath = filePath2;
        _plugins[meta2.name] = meta2;
      }
      var ready = false;
      var InlineCode;
      var flippyBit = 0;
      DrApiNative.require("fs").watch(DrApiNative.fileSystem.join(pluginsFolder), (type, file) => {
        if (!(flippyBit++ % 2))
          return;
        if (!file)
          return;
        const enabledPlugins = storage.getData("internal", "enabledPlugins", []);
        const filePath = DrApiNative.fileSystem.join(pluginsFolder, file);
        const found = Object.values(_plugins).find((plugin2) => plugin2.filePath === filePath);
        if (!DrApiNative.fileSystem.exists(filePath)) {
          delete _plugins[found.name];
          const index = enabledPlugins.indexOf(found.name);
          if (index !== -1) {
            enabledPlugins.splice(index, 1);
            if (ready)
              found.exports.onStop?.();
          }
          return storage.setData("internal", "enabledPlugins", [...enabledPlugins]);
        }
        const pluginContent = DrApiNative.fileSystem.readFile(filePath);
        const meta = readMeta(pluginContent);
        if (found) {
          delete _plugins[found.name];
          const index = enabledPlugins.indexOf(found.name);
          if (index !== -1) {
            enabledPlugins.splice(index, 1, meta.name);
            if (ready)
              found.exports.onStop?.();
          }
        }
        meta.js = pluginContent;
        meta.filePath = filePath;
        _plugins[meta.name] = meta;
        if (DrApi.toast) {
          if (!InlineCode)
            InlineCode = webpack.getModuleByDisplayName("InlineCode", true);
          setTimeout(DrApi.toast.show({
            title: `'${meta.name}' updated`,
            type: "info",
            icon: DrApi.React.createElement(InlineCode)
          }), 4e3);
        }
        storage.setData("internal", "enabledPlugins", enabledPlugins);
        if (ready) {
          const res = eval(`(function() {
${meta.js}
})()
//# sourceURL=${encodeURIComponent(meta.name)}`);
          meta.exports = typeof res === "function" ? new res() : res;
          meta.exports.onLoad?.();
          if (!enabledPlugins.includes(meta.name))
            return;
          meta.exports.onStart?.();
        }
      });
      module.exports = () => {
        ready = true;
        const enabledPlugins = storage.getData("internal", "enabledPlugins", []);
        for (const plugin of Object.values(_plugins)) {
          const res = eval(`(function() {
${plugin.js}
})()
//# sourceURL=${encodeURIComponent(plugin.name)}`);
          plugin.exports = typeof res === "function" ? new res() : res;
          plugin.exports.onLoad?.();
          if (enabledPlugins.includes(plugin.name))
            plugin.exports.onStart?.();
        }
      };
      module.exports.getPlugins = () => _plugins;
      module.exports.togglePlugin = (name) => {
        const enabledPlugins2 = storage.getData("internal", "enabledPlugins", []);
        const plugin2 = _plugins[name];
        if (!enabledPlugins2.includes(name))
          plugin2.exports.onStop?.();
        else
          plugin2.exports.onStart?.();
      };
    }
  });

  // src/main/settings.js
  var require_settings = __commonJS({
    "src/main/settings.js"(exports2, module2) {
      var patcher = require_patcher();
      var webpack3 = require_webpack();
      var storage3 = require_storage();
      var styles2 = require_styles();
      var { getThemes, toggleTheme } = require_themes();
      var { getPlugins, togglePlugin } = require_plugins();
      var logger2 = require_logger();
      window.getThemes = getThemes;
      var shell = DrApiNative.runInNative(`require("electron").shell`);
      module2.exports = async (React) => {
        const sectionsModule = await webpack3.getModuleByPropsAsync("getUserSettingsSections");
        logger2.log("Settings", "Patching 'getUserSettingsSections' to add settings");
        const NotificationSettings = webpack3.getModuleByDisplayName("NotificationSettings", true);
        const FormSection = webpack3.getModuleByDisplayName("FormSection", true);
        const SwitchItem = webpack3.getModuleByDisplayName("SwitchItem", true);
        const Card = webpack3.getModuleByDisplayName("Card", true);
        const Flex = webpack3.getModuleByDisplayName("Flex", true);
        const Clickable = webpack3.getModuleByDisplayName("Clickable", true);
        const FormDivider = webpack3.getModuleByDisplayName("FormDivider", true);
        const Caret = webpack3.getModuleByDisplayName("Caret", true);
        const Mail = webpack3.getModuleByDisplayName("Mail", true);
        const LegacyHeader = webpack3.getModuleByDisplayName("LegacyHeader", true);
        const FormItem = webpack3.getModuleByDisplayName("FormItem", true);
        const Slider = webpack3.getModuleByDisplayName("Slider", true);
        const { Text } = webpack3.getModule((m) => m.Text.displayName);
        const { Messages } = webpack3.getAllModulesByProps("Messages")[1];
        const Switch = webpack3.getModuleByDisplayName("Switch", true);
        const SearchBar = webpack3.getModuleByDisplayName("SearchBar", true);
        const Folder = webpack3.getModuleByDisplayName("Folder", true);
        const OverflowMenu = webpack3.getModuleByDisplayName("OverflowMenu", true);
        const { Icon } = DrApi.webpack.getModuleByProps("Icon", "default");
        const { default: Menu, MenuItem, MenuSeparator } = webpack3.getModuleByDisplayName("Menu");
        const Popout = webpack3.getModuleByDisplayName("Popout", true);
        const Filter = webpack3.getModuleByDisplayName("Filter", true);
        const Trash = webpack3.getModuleByDisplayName("Trash", true);
        const Globe = webpack3.getModuleByDisplayName("Globe", true);
        const Link = webpack3.getModuleByDisplayName("Link", true);
        const InlineCode2 = webpack3.getModuleByDisplayName("InlineCode", true);
        const WalletIcon = webpack3.getModuleByDisplayName("WalletIcon", true);
        const Ticket = webpack3.getModuleByDisplayName("Ticket", true);
        const DoubleStarIcon = webpack3.getModuleByDisplayName("DoubleStarIcon", true);
        const Creative = webpack3.getModuleByDisplayName("Creative", true);
        const SortIcon = webpack3.getModuleByDisplayName("SortIcon", true);
        const OsMac = webpack3.getModuleByDisplayName("OsMac", true);
        const Retry = webpack3.getModuleByDisplayName("Retry", true);
        const Gear = webpack3.getModuleByDisplayName("Gear", true);
        const Pencil = webpack3.getModuleByDisplayName("Pencil", true);
        const Tooltip = webpack3.getModuleByDisplayName("Tooltip", true);
        const { openContextMenu, closeContextMenu } = webpack3.getModuleByProps("openContextMenuLazy");
        const { header, topDivider, body, expandIcon } = webpack3.getModuleByProps("header", "topDivider");
        const { iconWrapper, wrapper, secondaryHeader } = webpack3.getModuleByProps("detailsWrapper", "icon", "iconWrapper");
        const { justifyCenter, alignCenter, justifyBetween, justifyEnd } = webpack3.getModuleByProps("justifyCenter", "alignCenter");
        const { card } = webpack3.getModuleByProps("card", "pulse", "topDivider");
        const { size16, size20 } = webpack3.getModuleByProps("size20", "size16");
        const { icon: iconToolbar } = DrApi.webpack.getModuleByProps("icon", "transparent", "iconWrapper");
        const { icon: iconMenu } = DrApi.webpack.getModuleByProps("colorPremium", "icon");
        const { line } = webpack3.getModuleByProps("line", "versionHash");
        const { search } = DrApi.webpack.getModuleByProps("search", "toolbar");
        const { macDragRegion } = DrApi.webpack.getModuleByProps("macDragRegion");
        styles2("DrApi-settings", `.dr-header:not(:last-child) .dr-catorgory-icon {
    color: var(--header-primary);
  } .dr-catorgory-icon {
    color: var(--header-secondary);
    margin: 8px
  } #dr-notification-position {
    margin-bottom: 8px
  } #dr-notification-position .dr-wrapper {
    margin-left: 10%;
    width: 80%;
  } .dr-addon-avatar {
    border-radius: 50%; 
    cursor: pointer;
    margin-top: 3px;
    margin-right: 8px
  } .dr-addon-avatar + h3 {
    padding-top: 5px;
  } .dr-addon-avatar + h3 + div {
    padding-top: 6px !important
  }`);
        const demoToastObj = {
          id: "toastDemo",
          title: "Demo",
          icon: React.createElement(Mail),
          content: "This is a demo Toast.",
          onClose: () => setTimeout(DrApi.toast.show.bind(null, demoToastObj), 500),
          buttons: [{
            content: "Button",
            onClick: () => {
            }
          }]
        };
        function Category({
          content,
          title,
          subTitle,
          id: id2,
          open = false
        }) {
          const [isOpen, setOpen] = React.useState(open);
          React.useEffect(() => {
            if (isOpen)
              DrApi.toast.show(demoToastObj);
            return () => DrApi.toast.delete(demoToastObj.id);
          });
          return React.createElement(Card, {
            ...Card.defaultProps,
            editable: true,
            className: card,
            children: React.createElement(Flex, {
              direction: Flex.Direction.VERTICAL,
              children: [
                React.createElement(Clickable, {
                  className: header,
                  onClick: () => {
                    setOpen(!isOpen);
                    if (id2 === "notifications")
                      if (isOpen)
                        DrApi.toast.delete(demoToastObj.id);
                      else
                        DrApi.toast.show(demoToastObj);
                  },
                  children: React.createElement(Flex, {
                    align: alignCenter,
                    children: [
                      React.createElement(Flex, {
                        justify: justifyCenter,
                        className: wrapper,
                        children: [
                          React.createElement(Flex.Child, {
                            children: React.createElement("div", {
                              children: React.createElement(Mail, {
                                className: "dr-catorgory-icon",
                                width: 32,
                                height: 32
                              })
                            }),
                            className: iconWrapper,
                            grow: 0
                          }),
                          React.createElement(Flex, {
                            direction: Flex.Direction.VERTICAL,
                            children: [
                              React.createElement(LegacyHeader, {
                                children: title,
                                className: secondaryHeader,
                                size: size16,
                                tag: "h3"
                              }),
                              subTitle ? React.createElement(Text, {
                                children: subTitle,
                                color: "header-secondary",
                                variant: "text-xs/normal"
                              }) : false
                            ]
                          })
                        ]
                      }),
                      React.createElement(Caret, {
                        expanded: isOpen,
                        className: expandIcon
                      })
                    ]
                  })
                }),
                isOpen ? React.createElement("div", {
                  className: body,
                  children: [
                    React.createElement(FormDivider, {
                      className: topDivider
                    }),
                    content
                  ]
                }) : false
              ]
            })
          });
        }
        function Settings() {
          const [newMacOS, setNewMacOS] = storage3.useStorage("internal", "newMacOS", true);
          const [transparency, setTransparency] = storage3.useStorage("internal", "transparency", false);
          const [position, setPosition] = storage3.useStorage("internal", "notificationLocation", NotificationSettings.Positions.TOP_RIGHT);
          const [positionX, setPositionX] = storage3.useStorage("internal", "notificationPositionX", 20);
          const [positionY, setPositionY] = storage3.useStorage("internal", "notificationPositionY", 20);
          const [maxHeight, setMaxHeight] = storage3.useStorage("internal", "notificationMaxHeight", 30);
          const [blur, setBlur] = storage3.useStorage("internal", "notificationBlur", 0);
          const [opacity, setOpacity] = storage3.useStorage("internal", "notificationOpacity", 80);
          return React.createElement(FormSection, {
            title: "Settings",
            tag: FormSection.Tags.H1,
            children: [
              React.createElement(Category, {
                title: "Notifictions",
                subTitle: "Customize the notifications inside the app",
                id: "notifications",
                content: [
                  React.createElement(FormItem, {
                    title: Messages.FORM_LABEL_NOTIFICATION_POSITION,
                    children: React.createElement("div", {
                      id: "dr-notification-position",
                      children: React.createElement(NotificationSettings, {
                        position,
                        onChange: (e, val) => {
                          setPosition(val);
                          storage3.setData("internal", "notificationLocation", val);
                        }
                      })
                    })
                  }),
                  React.createElement(FormDivider, {
                    className: topDivider
                  }),
                  React.createElement(FormItem, {
                    title: "Positioning",
                    disabled: position === "disabled",
                    children: React.createElement(Flex, {
                      className: "dr-notification-sliders",
                      children: [
                        React.createElement(Flex.Child, {
                          children: React.createElement(Slider, {
                            disabled: position === "disabled",
                            maxValue: 500,
                            minValue: 0,
                            markers: Array.from({ length: 11 }, (_, i) => i * 50),
                            onValueChange: (val) => {
                              const round = Math.round(val);
                              if (round === positionX)
                                return;
                              setPositionX(round);
                            },
                            onValueRender: (val) => `${Math.round(val)}px`,
                            initialValue: positionX
                          })
                        }),
                        React.createElement(Flex.Child, {
                          children: React.createElement(Slider, {
                            disabled: position === "disabled",
                            maxValue: 500,
                            minValue: 0,
                            markers: Array.from({ length: 11 }, (_, i) => i * 50),
                            onValueChange: (val) => {
                              const round = Math.round(val);
                              if (round === positionY)
                                return;
                              setPositionY(round);
                            },
                            onValueRender: (val) => `${Math.round(val)}px`,
                            initialValue: positionY
                          })
                        })
                      ]
                    })
                  }),
                  React.createElement(FormDivider, {
                    className: topDivider
                  }),
                  React.createElement(FormItem, {
                    title: "Max Height",
                    disabled: position === "disabled",
                    children: React.createElement(Slider, {
                      disabled: position === "disabled",
                      maxValue: 100,
                      minValue: 0,
                      markers: Array.from({ length: 11 }, (_, i) => i * 10),
                      onValueChange: (val) => setMaxHeight(Math.round(val)),
                      onValueRender: (val) => `${Math.round(val)}%`,
                      initialValue: maxHeight
                    })
                  }),
                  React.createElement(FormDivider, {
                    className: topDivider
                  }),
                  React.createElement(FormItem, {
                    title: "Opacity",
                    disabled: position === "disabled",
                    children: React.createElement(Slider, {
                      disabled: position === "disabled",
                      maxValue: 100,
                      minValue: 0,
                      markers: Array.from({ length: 11 }, (_, i) => i * 10),
                      onValueChange: (val) => setOpacity(Math.round(val)),
                      onValueRender: (val) => `${Math.round(val)}%`,
                      initialValue: opacity
                    })
                  }),
                  React.createElement(FormItem, {
                    title: "Blur",
                    disabled: position === "disabled",
                    children: React.createElement(Slider, {
                      disabled: position === "disabled",
                      maxValue: 20,
                      minValue: 0,
                      markers: Array.from({ length: 11 }, (_, i) => i * 2),
                      onValueChange: (val) => setBlur(Math.round(val)),
                      onValueRender: (val) => `${Math.round(val)}px`,
                      initialValue: blur
                    })
                  })
                ]
              }),
              React.createElement(SwitchItem, {
                value: transparency,
                children: [
                  "Transparency",
                  React.createElement(Tooltip, {
                    text: "Reloading is needed",
                    children: (props) => React.createElement(Retry, {
                      ...props,
                      width: 18,
                      height: 18,
                      style: {
                        marginLeft: 4,
                        transform: "translateY(2px) rotate(180deg)"
                      }
                    })
                  })
                ],
                note: "Make Discord transparent. Warning this will break window snapping.",
                onChange: (value) => {
                  DrApi.modals.confirmModal("Restart Discord?", [
                    "To toggle transparency you need to restart Discord."
                  ], {
                    onConfirm() {
                      DrApiNative.quit(true);
                      setTransparency(value);
                    },
                    confirmText: "Restart",
                    danger: true
                  });
                }
              }),
              React.createElement(SwitchItem, {
                value: newMacOS,
                children: [
                  React.createElement(Tooltip, {
                    text: "MacOS only",
                    children: (props) => React.createElement(OsMac, {
                      ...props,
                      width: 18,
                      height: 18,
                      style: {
                        marginRight: 4,
                        transform: "translateY(2px)"
                      }
                    })
                  }),
                  "New MacOS Titlebar Style",
                  React.createElement(Tooltip, {
                    text: "Reloading is needed",
                    children: (props) => React.createElement(Retry, {
                      ...props,
                      width: 18,
                      height: 18,
                      style: {
                        marginLeft: 4,
                        transform: "translateY(2px) rotate(180deg)"
                      }
                    })
                  })
                ],
                note: "Use Electrons titlebar or Discords titlebar.",
                disabled: !(DrApiNative.platform === "darwin"),
                onChange: (value) => {
                  DrApi.modals.confirmModal("Restart Discord?", [
                    `To use ${value ? "new" : "old"} MacOS titlebar style you need to restart Discord.`
                  ], {
                    onConfirm() {
                      DrApiNative.quit(true);
                      setNewMacOS(value);
                    },
                    confirmText: "Restart",
                    danger: true
                  });
                }
              })
            ]
          });
        }
        const { openUserProfileModal } = webpack3.getModuleByProps("openUserProfileModal");
        const renderMessageMarkup = webpack3.getModuleByProps("renderMessageMarkupToAST").default;
        const [{ getUser: fetchUser }, { getUser }] = webpack3.getAllModulesByProps("getUser");
        function Avatar({ author, userId, authorLink }) {
          const [user, setUser] = React.useState(getUser(userId));
          React.useEffect(() => {
            void async function() {
              if (typeof userId === "string")
                setUser(await fetchUser(userId));
            }();
          });
          return [
            user ? React.createElement("img", {
              src: user.getAvatarURL(false, void 0, true),
              width: 24,
              height: 24,
              className: "dr-addon-avatar",
              onClick: () => openUserProfileModal({ userId })
            }) : false,
            React.createElement(LegacyHeader, {
              children: user?.name ?? author,
              className: secondaryHeader,
              size: size16,
              style: authorLink ? { cursor: "pointer" } : void 0,
              onClick: authorLink ? () => shell.openExternal(authorLink) : void 0,
              tag: "h3"
            }),
            user ? React.createElement(Text, {
              style: {
                paddingTop: 4,
                marginLeft: 4
              },
              children: ["#", user.discriminator],
              color: "header-secondary",
              variant: "text-sm/normal"
            }) : false
          ];
        }
        function AddonCard(addon) {
          const [enabledAddons, setEnabledAddons] = storage3.useStorage("internal", addon.filePath.endsWith(".theme.css") ? "enabledThemes" : addon.filePath.endsWith(".splash.css") ? "enabledSplashThemes" : "enabledPlugins", []);
          return React.createElement(Card, {
            ...Card.defaultProps,
            editable: true,
            className: card,
            key: `dr-addon-${addon.name}${addon.filePath.endsWith(".splash.css") ? "-splash" : ""}`,
            onContextMenu: (event) => openContextMenu(event, (event2) => React.createElement(AddonContextMenu, { event: event2, addon })),
            children: React.createElement("div", {
              className: header,
              style: { cursor: "default" },
              children: [
                React.createElement(Flex, {
                  align: alignCenter,
                  children: [
                    React.createElement(Flex, {
                      direction: Flex.Direction.VERTICAL,
                      children: [
                        React.createElement(Flex, {
                          style: { marginBottom: 4 },
                          children: [
                            React.createElement(Tooltip, {
                              text: addon.filePath.endsWith(".theme.css") ? "Theme" : addon.filePath.endsWith(".splash.css") ? "Splash Theme" : "Plugin",
                              children: (props) => React.createElement(addon.filePath.endsWith(".theme.css") ? Creative : addon.filePath.endsWith(".splash.css") ? DoubleStarIcon : InlineCode2, { className: iconToolbar, style: { marginRight: 8 }, ...props })
                            }),
                            React.createElement(LegacyHeader, {
                              children: addon.name,
                              className: secondaryHeader,
                              size: size20,
                              tag: "h3"
                            }),
                            React.createElement(Text, {
                              style: {
                                paddingTop: 5,
                                marginLeft: 4
                              },
                              children: ["v", addon.version ?? "???"],
                              color: "header-secondary",
                              variant: "text-sm/normal"
                            })
                          ]
                        }),
                        React.createElement(Flex, {
                          style: { marginBottom: 6 },
                          children: React.createElement(Avatar, { userId: addon.authorId, author: addon.author, authorLink: addon.authorLink })
                        })
                      ]
                    }),
                    React.createElement(Switch, {
                      checked: enabledAddons.includes(addon.name),
                      onChange: (val) => {
                        if (val)
                          enabledAddons.push(addon.name);
                        else {
                          const i = enabledAddons.indexOf(addon.name);
                          if (i === -1)
                            return;
                          enabledAddons.splice(i, 1);
                        }
                        setTimeout(DrApi.toast.show({
                          title: `${val ? "Enabled" : "Disabled"} '${addon.name}'`,
                          type: "info",
                          icon: React.createElement(addon.filePath.endsWith(".theme.css") ? Creative : addon.filePath.endsWith(".splash.css") ? DoubleStarIcon : InlineCode2)
                        }), 4e3);
                        setEnabledAddons([...enabledAddons]);
                        if (addon.filePath.endsWith(".theme.css"))
                          toggleTheme(addon.name);
                        else if (addon.filePath.endsWith(".plugin.js"))
                          togglePlugin(addon.name);
                      }
                    })
                  ]
                }),
                addon.description ? React.createElement("div", {
                  style: { color: "var(--text-normal)" }
                }, (() => {
                  const { content } = renderMessageMarkup({ content: " *s* " + addon.description });
                  content.shift();
                  content.shift();
                  return content;
                })()) : false
              ]
            })
          });
        }
        function AddonContextMenu({ event, addon }) {
          const links = [
            addon.website ? React.createElement(MenuItem, {
              id: "website-addon",
              label: "Website",
              icon: () => React.createElement(Globe, { className: iconMenu }),
              action: () => shell.openExternal(addon.website)
            }) : false,
            addon.invite ? React.createElement(MenuItem, {
              id: "invite-addon",
              label: "Discord Invite",
              icon: () => React.createElement(Link, { className: iconMenu }),
              action: () => shell.openExternal(`https://discord.gg/${addon.invite.split("/").pop()}`)
            }) : false,
            addon.source ? React.createElement(MenuItem, {
              id: "source-addon",
              label: "Source",
              icon: () => React.createElement(InlineCode2, { className: iconMenu }),
              action: () => shell.openExternal(addon.source)
            }) : false,
            addon.donate ? React.createElement(MenuItem, {
              id: "donate-addon",
              label: "Donate",
              icon: () => React.createElement(WalletIcon, { className: iconMenu }),
              action: () => shell.openExternal(addon.donate)
            }) : false,
            addon.patreon ? React.createElement(MenuItem, {
              id: "patreon-addon",
              label: "Patreon",
              icon: () => React.createElement(Ticket, { className: iconMenu }),
              action: () => shell.openExternal(addon.patreon)
            }) : false
          ];
          return React.createElement(Menu, {
            ...event,
            onClose: closeContextMenu,
            navId: "addon-context-menu",
            children: [
              links.filter((l) => l).length ? [
                links,
                React.createElement(MenuSeparator)
              ] : false,
              React.createElement(MenuItem, {
                id: "uninstall-addon",
                label: "Uninstall Theme",
                color: "colorDanger",
                icon: () => React.createElement(Trash, { className: iconMenu }),
                action: () => DrApi.modals.confirmModal(`Uninstall ${addon.name}`, `Are you sure you want to uninstall '${addon.name}'?`, {
                  confirmText: "Uninstall",
                  onConfirm: () => DrApiNative.fileSystem.rm(addon.filePath),
                  danger: true
                })
              })
            ]
          });
        }
        function AddonConfiguration({ event, filter: showFilter }) {
          const [sortByWhat, setSortByWhat] = storage3.useStorage("internal", "addonSortBy", "name");
          const [filter, setFilter] = storage3.useStorage("internal", "addonFilterBy", 0);
          return React.createElement(Menu, {
            ...event,
            onClose: event.closePopout,
            navId: "addon-configuration",
            children: [
              React.createElement(MenuItem, {
                id: "sort-by",
                label: `Sorting by ${sortByWhat[0].toUpperCase() + sortByWhat.substring(1)}`,
                dontCloseOnActionIfHoldingShiftKey: true,
                icon: () => React.createElement(SortIcon, { className: iconMenu }),
                action: () => setSortByWhat(sortByWhat === "name" ? "author" : "name")
              }),
              showFilter ? [
                React.createElement(MenuSeparator),
                React.createElement(MenuItem, {
                  id: "filter-by",
                  label: filter === 0 ? "Not filtering" : `Filtering out ${filter === 1 ? "Splash Themes" : "Normal Themes"}`,
                  dontCloseOnActionIfHoldingShiftKey: true,
                  icon: () => React.createElement(Filter, { className: iconMenu }),
                  action: () => {
                    if (filter + 1 === 3)
                      return setFilter(0);
                    setFilter(filter + 1);
                  }
                })
              ] : false,
              React.createElement(MenuSeparator),
              React.createElement(MenuItem, {
                id: `open-${filter ? "theme" : "plugin"}-folder`,
                label: `Open ${filter ? "Theme" : "Plugin"} Folder`,
                icon: () => React.createElement(Folder, { className: iconMenu }),
                action: () => () => shell.openPath(DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "themes"))
              })
            ]
          });
        }
        const sortBy = (key) => (a, b) => {
          if (a[key] < b[key])
            return -1;
          if (a[key] > b[key])
            return 1;
          return 0;
        };
        const filterAddons = (val, [addon, { author }]) => val.map((v) => addon.toLowerCase().includes(v.toLowerCase()) || author.toLowerCase().includes(v.toLowerCase())).filter((l) => l).length;
        function Themes() {
          storage3.useStorage("internal", "enabledThemes", []);
          storage3.useStorage("internal", "enabledSplashThemes", []);
          const [sortByWhat] = storage3.useStorage("internal", "addonSortBy", "name");
          const [filter] = storage3.useStorage("internal", "addonFilterBy", 0);
          const [query, setQuery] = React.useState("");
          const [tags, setTags] = React.useState([]);
          const [themes2, setThemes] = React.useState(getThemes());
          const [splashThemes, setSplashThemes] = React.useState(getThemes(true));
          const [isConfigOpen, setConfigOpen] = React.useState(false);
          const _themes = filter === 0 ? Object.values(themes2).concat(...Object.values(splashThemes)) : filter === 1 ? Object.values(themes2) : Object.values(splashThemes);
          return React.createElement(FormSection, {
            title: React.createElement(Flex, {
              justify: justifyBetween,
              children: [
                React.createElement(Flex, {
                  children: [
                    React.createElement(Creative, { style: { marginRight: 8 } }),
                    "Themes"
                  ]
                }),
                React.createElement(Flex, {
                  id: "dr-addon-header",
                  justify: justifyEnd,
                  children: [
                    React.createElement(Icon, {
                      icon: () => React.createElement(Folder, { className: iconToolbar }),
                      onClick: () => shell.openPath(DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "themes")),
                      tooltip: "Open Theme Folder"
                    }),
                    React.createElement(SearchBar, {
                      placeholder: "Search Themes",
                      className: search,
                      query,
                      tags,
                      isLoading: false,
                      disabled: false,
                      autoFocus: true,
                      size: SearchBar.Sizes.SMALL,
                      onRemoveTag: (tag) => {
                        tags.splice(tag, 1);
                        setTags([...tags]);
                        const searchValue = tags.length ? tags : [query];
                        const filtered = Object.entries(getThemes()).filter(filterAddons.bind(null, searchValue));
                        setThemes(Object.fromEntries(filtered));
                        const _filtered = Object.entries(getThemes(true)).filter(filterAddons.bind(null, searchValue));
                        setSplashThemes(Object.fromEntries(_filtered));
                      },
                      onKeyDown: (event) => {
                        if (event.key !== "Tab")
                          return;
                        event.stopPropagation();
                        event.preventDefault();
                        if (!query)
                          return;
                        setTags(tags.concat(query));
                        setQuery("");
                      },
                      onQueryChange: (val) => {
                        setQuery(val);
                        const searchValue = tags.concat(val);
                        const filtered = Object.entries(getThemes()).filter(filterAddons.bind(null, searchValue));
                        setThemes(Object.fromEntries(filtered));
                        const _filtered = Object.entries(getThemes(true)).filter(filterAddons.bind(null, searchValue));
                        setSplashThemes(Object.fromEntries(_filtered));
                      },
                      onClear: () => {
                        setQuery("");
                        setThemes(getThemes());
                        setSplashThemes(getThemes(true));
                      }
                    }),
                    React.createElement(Popout, {
                      shouldShow: isConfigOpen,
                      position: "left",
                      onRequestClose: () => setConfigOpen(false),
                      renderPopout: (event) => React.createElement(AddonConfiguration, { event, filter: true }),
                      children: () => React.createElement(Icon, {
                        selected: isConfigOpen,
                        icon: () => React.createElement(OverflowMenu, { className: iconToolbar }),
                        onClick: () => setConfigOpen(!isConfigOpen),
                        tooltip: "Configuration"
                      })
                    })
                  ]
                })
              ]
            }),
            tag: FormSection.Tags.H1,
            children: [
              React.createElement("div", {
                id: "dr-addon-list",
                children: _themes.sort(sortBy(sortByWhat)).map((theme) => React.createElement(AddonCard, theme))
              })
            ]
          });
        }
        const PopoutWindow = webpack3.getModule((e) => e.default.toString().indexOf("DndProvider") > -1 && React.isValidElement(e.default())).default;
        const dispatcher = webpack3.getModuleByProps("dirtyDispatch", "dispatch");
        const PopoutWindowStore = webpack3.getModuleByProps("getWindow", "getName", "getIsAlwaysOnTop");
        const { useStateFromStores } = webpack3.getModuleByProps("useStateFromStores");
        function CustomCSS() {
          const windowInstance = useStateFromStores([PopoutWindowStore], () => PopoutWindowStore.getWindow("DISCORD_CUSTOM_CSS"));
          const ref = React.useRef();
          React.useEffect(() => {
            window.windowInstance = windowInstance;
            const editor = ace.edit(ref.current);
            editor.setTheme("ace/theme/monokai");
            editor.getSession().setMode("ace/mode/css");
            editor.setValue(storage3.customCSS() ?? "");
            editor.on("change", () => {
              const value = editor.getValue();
              storage3.customCSS(value);
              styles2.customCSS.innerHTML = value;
            });
            windowInstance.document.head.appendChild(Object.assign(document.createElement("style"), {
              textContent: `${[...document.querySelectorAll("style")].filter((e) => e.innerHTML.includes("sourceURL=ace/")).reduce((styles3, style) => styles3 += style.textContent, "")}.${macDragRegion}{ display: none }`,
              id: "dr-custom-css-popout-style"
            }));
          });
          return React.createElement(PopoutWindow, {
            windowKey: "DISCORD_CUSTOM_CSS",
            withTitleBar: true,
            title: "Custom CSS",
            children: React.createElement("div", { ref, style: { width: "100vw", height: "calc(100vh - 22px)" } })
          });
        }
        function Plugins() {
          storage3.useStorage("internal", "enabledPlugins", []);
          const [sortByWhat] = storage3.useStorage("internal", "addonSortBy", "name");
          const [query, setQuery] = React.useState("");
          const [tags, setTags] = React.useState([]);
          const [plugins3, setPlugins] = React.useState(getPlugins());
          const [isConfigOpen, setConfigOpen] = React.useState(false);
          const _plugins2 = Object.values(plugins3);
          return React.createElement(FormSection, {
            title: React.createElement(Flex, {
              justify: justifyBetween,
              children: [
                React.createElement(Flex, {
                  children: [
                    React.createElement(InlineCode2, { style: { marginRight: 8 }, width: 24, height: 24 }),
                    "Plugins"
                  ]
                }),
                React.createElement(Flex, {
                  id: "dr-addon-header",
                  justify: justifyEnd,
                  children: [
                    React.createElement(Icon, {
                      icon: () => React.createElement(Folder, { className: iconToolbar }),
                      onClick: () => shell.openPath(DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "plugins")),
                      tooltip: "Open Plugin Folder"
                    }),
                    React.createElement(SearchBar, {
                      placeholder: "Search Plugins",
                      className: search,
                      query,
                      tags,
                      isLoading: false,
                      disabled: false,
                      autoFocus: true,
                      size: SearchBar.Sizes.SMALL,
                      onRemoveTag: (tag) => {
                        tags.splice(tag, 1);
                        setTags([...tags]);
                        const searchValue = tags.length ? tags : [query];
                        const filtered = Object.entries(getPlugins()).filter(filterAddons.bind(null, searchValue));
                        setPlugins(Object.fromEntries(filtered));
                      },
                      onKeyDown: (event) => {
                        if (event.key !== "Tab")
                          return;
                        event.stopPropagation();
                        event.preventDefault();
                        if (!query)
                          return;
                        setTags(tags.concat(query));
                        setQuery("");
                      },
                      onQueryChange: (val) => {
                        setQuery(val);
                        const searchValue = tags.concat(val);
                        const filtered = Object.entries(getPlugins()).filter(filterAddons.bind(null, searchValue));
                        setPlugins(Object.fromEntries(filtered));
                      },
                      onClear: () => {
                        setQuery("");
                        setPlugins(getPlugins());
                      }
                    }),
                    React.createElement(Popout, {
                      shouldShow: isConfigOpen,
                      position: "left",
                      onRequestClose: () => setConfigOpen(false),
                      renderPopout: (event) => React.createElement(AddonConfiguration, { event, filter: false }),
                      children: () => React.createElement(Icon, {
                        selected: isConfigOpen,
                        icon: () => React.createElement(OverflowMenu, { className: iconToolbar }),
                        onClick: () => setConfigOpen(!isConfigOpen),
                        tooltip: "Configuration"
                      })
                    })
                  ]
                })
              ]
            }),
            tag: FormSection.Tags.H1,
            children: [
              React.createElement("div", {
                id: "dr-addon-list",
                children: _plugins2.sort(sortBy(sortByWhat)).map((plugin2) => React.createElement(AddonCard, plugin2))
              })
            ]
          });
        }
        const settings2 = [
          { section: "DIVIDER" },
          {
            label: "Discord Re-envisioned",
            section: "HEADER"
          },
          {
            element: () => React.createElement(Settings),
            icon: React.createElement(Gear, { width: 20, height: 20 }),
            label: "Settings",
            section: "Discord Re-envisioned"
          },
          {
            element: () => React.createElement(Themes),
            icon: React.createElement(Creative, { width: 20, height: 20 }),
            label: "Themes",
            section: "Discord Re-envisioned Themes"
          },
          {
            onClick: () => dispatcher.dirtyDispatch({
              type: "POPOUT_WINDOW_OPEN",
              key: "DISCORD_CUSTOM_CSS",
              render: () => React.createElement(CustomCSS),
              features: {}
            }),
            icon: React.createElement(Pencil, { width: 20, height: 20 }),
            label: "Custom CSS",
            section: "Discord Re-envisioned Custom CSS"
          },
          {
            element: () => React.createElement(Plugins),
            icon: React.createElement(InlineCode2, { width: 20, height: 20 }),
            label: "Plugins",
            section: "Discord Re-envisioned Plugins"
          }
        ];
        patcher.after("DrApi", sectionsModule.default, "render", (that, args, res2) => {
          const { sections } = res2.props.children.props.children.props;
          const index = sections.indexOf(sections.find((s) => s.section === "Connections")) + 1;
          if (!index)
            return;
          if (sections.find((s) => s.section === "Discord Re-envisioned"))
            return;
          sections.splice(index, 0, ...settings2);
        });
        patcher.after("DrApi", webpack3.getModuleByDisplayName("ClientDebugInfo"), "default", (that, args, res2) => {
          res2.props.children.push(React.createElement(Text, {
            className: line,
            color: "text-muted",
            tag: "span",
            variant: "text-xs/normal",
            children: [
              "Discord Re-envisioned",
              " (",
              React.createElement("span", {
                onClick: () => {
                },
                children: "ALPHA",
                style: { color: "var(--status-danger)", cursor: "pointer" }
              }),
              ")"
            ]
          }));
        });
      };
    }
  });

  // src/main/notifications.js
  var require_notifications = __commonJS({
    "src/main/notifications.js"(exports2, module2) {
      var webpack3 = require_webpack();
      var Patcher2 = require_patcher();
      var storage3 = require_storage();
      var styles2 = require_styles();
      var logger2 = require_logger();
      module2.exports = async (React) => {
        styles2("DrApi-Toasts", `#dr-toasts {
    position: fixed;
    z-index: 1000;
    overflow-y: overlay;
    padding: 0 8px 0 0;
  } #dr-toasts[location="bottomLeft"] {
    display: flex;
    flex-direction: column-reverse;
  } #dr-toasts[location="bottomRight"] {
    display: flex;
    flex-direction: column-reverse;
  } #dr-toasts:empty {
    display: none !important
  } #dr-toasts .dr-toast[type="info"] .dr-toast-title > :first-child {
    color: var(--info-help-foreground)
  }  #dr-toasts .dr-toast[type="success"] .dr-toast-title > :first-child {
    color: var(--text-positive)
  } #dr-toasts .dr-toast[type^="warn"] .dr-toast-title > :first-child {
    color: var(--info-warning-foreground)
  } #dr-toasts .dr-toast[type="danger"] .dr-toast-title > :first-child,
  #dr-toasts .dr-toast[type="error"] .dr-toast-title > :first-child {
    color: var(--status-danger)
  } #dr-toasts .dr-toast {
    padding: 10px;
    margin-top: 6px;
    min-width: 200px;
    position: relative;
  } .dr-toast-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: var(--background-tertiary);
    border-radius: 6px;
    z-index: -1;
  } #dr-toasts .dr-toast-title:not(:last-child) {
    margin-bottom: 6px;
  } #dr-toasts .dr-toast-icon {
    width: 24px;
    height: 24px;
    color: var(--text-normal);
  } #dr-toasts .dr-toast-icon + h3 {
    padding-top: 1px
  } #dr-toasts .dr-toast-close {
    color: var(--interactive-normal);
    padding-top: 2px;
    cursor: pointer
  } #dr-toasts .dr-toast-close:hover {
    color: var(--interactive-hover);
  } #dr-toasts .dr-toast-close:active {
    color: var(--interactive-active);
  } #dr-toasts .dr-toast-content:not(:last-child) {
    margin-bottom: 6px;
  } #dr-toasts .dr-toast-content {
    color: var(--text-normal);
    padding: 6px;
    background: var(--background-secondary);
    border-radius: 4px;
    user-select: text
  }`);
        const Shakeable = await webpack3.getModuleByDisplayNameAsync("Shakeable", true);
        logger2.log("Notifications", "Patching 'Shakeable' to add notifications");
        const Button = webpack3.getModuleByProps("ButtonColors", "ButtonSizes").default;
        const Flex = webpack3.getModuleByDisplayName("Flex", true);
        const { Heading } = webpack3.getModuleByProps("Heading");
        const Close = webpack3.getModuleByDisplayName("Close", true);
        const Clickable = webpack3.getModuleByDisplayName("Clickable", true);
        const renderMessageMarkup = webpack3.getModuleByProps("renderMessageMarkupToAST").default;
        const { thin, fade } = webpack3.getModuleByProps("thin", "fade");
        const { scroller } = webpack3.getModuleByProps("scroller");
        function toastContent(content) {
          if (!Array.isArray(content))
            content = [content];
          return content.map((con) => typeof con === "string" ? (() => {
            const { content: content2 } = renderMessageMarkup({ content: " *s* " + con });
            content2.shift();
            content2.shift();
            return content2;
          })() : con);
        }
        function Toast({ title, content, icon, buttons = [], hideToast, id: id2, type: type2 = "" }) {
          const [blur] = storage3.useStorage("internal", "notificationBlur", 0);
          const [opacity] = storage3.useStorage("internal", "notificationOpacity", 80);
          buttons = buttons.map((button) => {
            return React.createElement(Flex.Child, {
              children: React.createElement(Button, {
                children: button.content,
                size: button.size ? Button.Sizes[Object.keys(Button.Sizes).find((size) => size.toLowerCase() === button.size.toLowerCase())] : Button.Sizes.SMALL,
                color: button.color ? Button.Colors[Object.keys(Button.Colors).find((color) => color.toLowerCase() === button.color.toLowerCase())] : void 0,
                borderColor: button.borderColor ? Button.BorderColors[Object.keys(Button.BorderColors).find((borderColor) => borderColor.toLowerCase() === button.borderColor.toLowerCase())] : void 0,
                hover: button.hover ? Button.Hovers[Object.keys(Button.Hovers).find((hover) => hover.toLowerCase() === button.hover.toLowerCase())] : void 0,
                look: button.look ? Button.Looks[Object.keys(Button.Looks).find((look) => look.toLowerCase() === button.look.toLowerCase())] : void 0,
                onClick: button.onClick ? (event) => {
                  button.onClick(hideToast, event);
                } : void 0
              })
            });
          });
          return React.createElement("div", {
            className: "dr-toast",
            id: id2,
            type: type2.toLowerCase(),
            children: [
              React.createElement("div", {
                className: "dr-toast-background",
                style: {
                  filter: `blur(${blur}px)`,
                  opacity: opacity / 100
                }
              }),
              React.createElement(Flex, {
                className: "dr-toast-title",
                children: [
                  icon ? React.createElement(Flex.Child, {
                    grow: 0,
                    className: "dr-toast-icon",
                    children: icon
                  }) : false,
                  React.createElement(Flex.Child, {
                    children: React.createElement(Heading, {
                      level: 3,
                      variant: "heading-md/medium",
                      children: title
                    })
                  }),
                  React.createElement(Flex.Child, {
                    grow: 0,
                    children: React.createElement(Clickable, {
                      className: "dr-toast-close",
                      onClick: (event) => hideToast(event),
                      children: React.createElement(Close, {
                        width: 18,
                        height: 18
                      })
                    })
                  })
                ]
              }),
              content ? React.createElement("div", {
                className: "dr-toast-content",
                children: toastContent(content)
              }) : false,
              buttons.length ? React.createElement(Flex, {
                className: "dr-toast-buttons",
                children: buttons
              }) : false
            ]
          });
        }
        let toastId = 0;
        function Toasts() {
          const [location] = storage3.useStorage("internal", "notificationLocation", "topRight");
          const [positionX] = storage3.useStorage("internal", "notificationPositionX", 20);
          const [positionY] = storage3.useStorage("internal", "notificationPositionY", 20);
          const [maxHeight] = storage3.useStorage("internal", "notificationMaxHeight", 30);
          const [toasts, setToasts] = React.useState([]);
          React.useEffect(() => {
            DrApi.toast = {
              delete(id2) {
                const toast = toasts.find((t) => t.id === id2);
                const index = toasts.indexOf(toast);
                if (index === -1)
                  return;
                toasts.splice(index, 1);
                setToasts([...toasts]);
              },
              show(toast) {
                toast.id ??= `toast-id-${toastId}`;
                toastId++;
                toast.hideToast = (event) => {
                  DrApi.toast.delete(toast.id);
                  if (toast.onClose)
                    toast.onClose(event);
                };
                setToasts(toasts.concat(toast));
                return () => toast.hideToast();
              }
            };
          });
          return React.createElement("div", {
            location,
            id: "dr-toasts",
            style: {
              left: location === "topLeft" || location === "bottomLeft" ? positionX : void 0,
              right: location === "topRight" || location === "bottomRight" ? positionX : void 0,
              top: location === "topRight" || location === "topLeft" ? positionY : void 0,
              bottom: location === "bottomRight" || location === "bottomLeft" ? positionY : void 0,
              maxHeight: `${maxHeight}%`
            },
            className: `${thin} ${scroller} ${fade}`,
            children: location === "disabled" ? null : toasts.map((toast) => React.createElement(Toast, toast))
          });
        }
        Patcher2.after("DrApi", Shakeable.prototype, "render", (that, args, res2) => {
          if (res2.props.children.find((child) => child.type === Toasts))
            return;
          res2.props.children.push(React.createElement(Toasts));
        });
      };
    }
  });

  // src/main/modals.js
  var require_modals = __commonJS({
    "src/main/modals.js"(exports2, module2) {
      var logger2 = require_logger();
      var webpack3 = require_webpack();
      module2.exports = async (React) => {
        logger2.log("Modals", "Initializing Modal api");
        let _id = 0;
        const {
          openModal,
          closeModal
        } = webpack3.getModuleByProps("openModalLazy", "openModal");
        const Alert = webpack3.getModuleByDisplayName("Alert", true);
        const ConfirmModal = webpack3.getModuleByDisplayName("ConfirmModal", true);
        const { Messages } = webpack3.getAllModulesByProps("Messages")[1];
        const Button = webpack3.getModuleByProps("ButtonColors", "ButtonSizes").default;
        let renderMessageMarkup;
        function makeContent(content) {
          if (!renderMessageMarkup)
            renderMessageMarkup = webpack3.getModuleByProps("renderMessageMarkupToAST").default;
          if (!renderMessageMarkup)
            return;
          if (!Array.isArray(content))
            content = [content];
          return content.map((con) => typeof con === "string" ? (() => {
            const { content: content2 } = renderMessageMarkup({ content: " *s* " + con });
            content2.shift();
            content2.shift();
            return React.createElement("span", { style: { color: "var(--text-normal)" } }, content2);
          })() : con);
        }
        window.DrApi.modals = {
          open(content, id2) {
            id2 ??= `DrApi-Modal-${_id}`;
            _id++;
            openModal(typeof content === "function" ? content : () => content, {
              modalKey: id2
            });
            return { close: () => closeModal(id2), id: id2 };
          },
          close: (id2) => closeModal(id2),
          alert(title, content, opts = {}) {
            const { confirmText = Messages.OKAY, onConfirm } = opts;
            this.open((props) => React.createElement(Alert, {
              ...props,
              title,
              confirmText,
              onConfirm,
              body: makeContent(content)
            }));
          },
          confirmModal(title, content, opts = {}) {
            const { cancelText = Messages.CANCEL, confirmText = Messages.OKAY, danger = false, onConfirm, onCancel } = opts;
            this.open((props) => React.createElement(ConfirmModal, {
              ...props,
              header: title,
              confirmText,
              onConfirm,
              onCancel,
              cancelText,
              confirmButtonColor: danger ? Button.Colors.RED : Button.Colors.BRAND_NEW,
              children: makeContent(content)
            }));
          }
        };
      };
    }
  });

  // src/main/index.js
  var originalConsole = globalThis.console;
  for (const key in originalConsole) {
    const e = originalConsole[key];
    Object.defineProperty(console, key, {
      get: () => e,
      set: () => e
    });
  }
  var logger = require_logger();
  var webpack2 = require_webpack();
  var Patcher = require_patcher();
  var storage2 = require_storage();
  var settings = require_settings();
  var notifications = require_notifications();
  var styles = require_styles();
  var modals = require_modals();
  logger.log("Discord Re-invisioned", "Loading...");
  window.logger = logger;
  var themes = require_themes();
  var plugins2 = require_plugins();
  void function() {
    function changeClasses(that, classes, old) {
      return old.apply(that, classes.map((c) => c.includes(" dr-") ? c.split(" ")[0] : c));
    }
    Patcher.instead("DrApi", DOMTokenList.prototype, "add", changeClasses);
    Patcher.instead("DrApi", DOMTokenList.prototype, "remove", changeClasses);
    Patcher.instead("DrApi", DOMTokenList.prototype, "contains", changeClasses);
  }();
  window.DrApi = {
    webpack: webpack2,
    Patcher,
    storage: {
      getData: (pluginName, key) => storage2.getData(pluginName, key),
      setData: (pluginName, key, value) => storage2.setData(pluginName, key, value)
    }
  };
  void async function() {
    const React = await webpack2.getModuleByPropsAsync("memo", "createElement");
    window.DrApi.React = React;
    settings(React);
    notifications(React);
    modals(React);
    const dispatcher = await webpack2.getModuleByPropsAsync("dirtyDispatch", "dispatch");
    function onOpen() {
      logger.log("Plugins", "Initializing all plugins");
      plugins2();
      dispatcher.unsubscribe("CONNECTION_OPEN", onOpen);
    }
    dispatcher.subscribe("CONNECTION_OPEN", onOpen);
  }();
  function jQuery() {
    const node = document.createElement("script");
    node.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    node.onload = () => {
      window.$ = window.jQuery;
      logger.log("jQuery", "Loaded jQuery");
    };
    document.head.append(node);
  }
  function ace2() {
    const node = document.createElement("script");
    node.src = "https://ajaxorg.github.io/ace-builds/src-min-noconflict/ace.js";
    node.onload = () => logger.log("Ace", "Loaded the Ace editor");
    document.head.append(node);
  }
  function documentReady() {
    globalThis.console = { ...globalThis.console };
    logger.log("Themes", "Adding themes");
    styles.documentReady();
    themes();
    jQuery();
    ace2();
  }
  if (document.readyState === "complete")
    documentReady();
  else
    document.addEventListener("DOMContentLoaded", documentReady);
})();
