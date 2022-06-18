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

  // src/top/webpack.js
  var require_webpack = __commonJS({
    "src/top/webpack.js"(exports, module) {
      module.exports = new class rawWebpack {
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
              for (const id in modules) {
                const old2 = modules[id];
                modules[id] = function(_, module2) {
                  const res = old2.apply(this, arguments);
                  for (const ite of waiting)
                    ite(module2, id);
                  webpackModules[id] = _.exports;
                  if (_.exports) {
                    const m = Object.entries(_.exports);
                    m.map(([id2, selector]) => {
                      if (typeof selector !== "string")
                        return;
                      if (!selector.includes(`${id2}-`))
                        return;
                      let newSelector = [];
                      for (const s of selector.split(" "))
                        newSelector.push(`${s} dr-${s.split("-")[0]}`);
                      _.exports[id2] = newSelector.join(" ");
                    });
                  }
                  return res;
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
          for (const id in this.webpackModules) {
            try {
              const module2 = this.webpackModules[id];
              if (!module2)
                continue;
              if (filter(module2))
                return module2;
            } catch (error) {
              this.errors.push(error);
            }
          }
        }
        getModuleById(id) {
          return this.webpackModules[id];
        }
        getModuleByProps(...props) {
          let _module;
          this.getModule((module2) => {
            if (props.every((prop) => typeof module2[prop] !== "undefined"))
              return _module = module2;
            if (!module2?.default)
              return;
            if (props.every((prop) => typeof module2?.default[prop] !== "undefined"))
              return _module = module2?.default;
          });
          return _module;
        }
        getModuleByDisplayName(displayName, returnDefault = false) {
          const module2 = this.getModule((module3) => module3?.default.displayName === displayName);
          if (returnDefault)
            return module2?.default;
          return module2;
        }
        getAllModules(filter) {
          let modules = [];
          for (const id in this.webpackModules) {
            try {
              const module2 = this.webpackModules[id];
              if (!module2)
                continue;
              if (filter(module2))
                modules.push(module2);
            } catch (error) {
              this.errors.push(error);
            }
          }
          return modules;
        }
        getAllModulesByProps(...props) {
          let modules = [];
          this.getAllModules((module2) => {
            if (props.every((prop) => typeof module2[prop] !== "undefined"))
              return modules.push(module2);
            if (!module2?.default)
              return;
            if (props.every((prop) => typeof module2?.default[prop] !== "undefined"))
              return modules.push(module2?.default);
          });
          return modules;
        }
        getAllModulesByDisplayName(displayName, returnDefault = false) {
          const modules = this.getAllModules((module2) => module2?.default.displayName === displayName);
          if (returnDefault)
            modules.map((module2) => module2?.default);
          return modules;
        }
        getModuleAsync(filter) {
          let _this = this;
          return new Promise((resolve) => {
            const cached = _this.getModule(filter);
            if (cached)
              return resolve(cached);
            function waiter(module2, id) {
              try {
                if (!module2)
                  return;
                if (filter(module2, id)) {
                  const i = _this.waiting.indexOf(waiter);
                  _this.waiting.splice(i, 1);
                  return resolve(module2);
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
          return this.getModuleAsync((_, id) => Number(id) === Number(moduleId));
        }
        getModuleByPropsAsync(...props) {
          return new Promise((resolve) => {
            this.getModuleAsync((module2) => {
              if (props.every((prop) => typeof module2[prop] !== "undefined"))
                return resolve(module2);
              if (!module2?.default)
                return;
              if (props.every((prop) => typeof module2?.default[prop] !== "undefined"))
                return resolve(module2?.default);
            });
          });
        }
        async getModuleByDisplayNameAsync(displayName, returnDefault = false) {
          const module2 = await this.getModuleAsync((module3) => module3?.default.displayName === displayName);
          if (returnDefault)
            return module2?.default;
          return module2;
        }
      }();
    }
  });

  // src/top/patcher.js
  var require_patcher = __commonJS({
    "src/top/patcher.js"(exports, module) {
      module.exports = new class rawPatcher {
        Symbol = Symbol("DrApi");
        hook(module2, fn) {
          if (!module2[fn])
            module2[fn] = function() {
            };
          const original = module2[fn];
          let hook = module2[fn][this.Symbol];
          if (!(this.Symbol in module2[fn])) {
            hook = module2[fn][this.Symbol] = {
              before: /* @__PURE__ */ new Set(),
              instead: /* @__PURE__ */ new Set(),
              after: /* @__PURE__ */ new Set()
            };
            module2[fn] = function() {
              let args = Array.from(arguments);
              for (const { callback } of [...hook.before]) {
                const result = callback(this, args);
                if (Array.isArray(result))
                  args = result;
              }
              let res;
              if (!hook.instead.size)
                res = original.apply(this, args);
              else
                for (const { callback } of [...hook.instead])
                  res = callback(this, args, original);
              for (const { callback } of [...hook.after]) {
                const result = callback(this, args, res);
                if (typeof result !== "undefined")
                  res = result;
              }
              return res;
            };
            Object.assign(module2[fn], original);
            module2[fn].toString = () => original.toString();
            module2[fn].toString.toString = () => original.toString.toString();
          }
          return hook;
        }
        before(id, mod, fn, callback) {
          const hook = this.hook(mod, fn);
          const obj = { callback, id };
          hook.before.add(obj);
          return () => hook.after.delete(obj);
        }
        instead(id, mod, fn, callback) {
          const hook = this.hook(mod, fn);
          const obj = { callback, id };
          hook.instead.add(obj);
          return () => hook.after.delete(obj);
        }
        after(id, mod, fn, callback) {
          const hook = this.hook(mod, fn);
          const obj = { callback, id };
          hook.after.add(obj);
          return () => hook.after.delete(obj);
        }
      }();
    }
  });

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

  // src/top/styles.js
  var require_styles = __commonJS({
    "src/top/styles.js"(exports, module) {
      var styles2 = document.createElement("dr-styles");
      module.exports = function(id, css) {
        let style = document.getElementById(id);
        if (!style) {
          style = document.createElement("style");
          style.id = id;
          styles2.appendChild(style);
        }
        style.innerHTML = css;
        return () => style.remove();
      };
      module.exports.documentReady = () => document.head.append(styles2);
      module.exports.styles = styles2;
    }
  });

  // src/top/themes.js
  var require_themes = __commonJS({
    "src/top/themes.js"(exports, module) {
      var storage2 = require_storage();
      var { styles: styles2 } = require_styles();
      var themesFolder = DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "themes");
      if (!DrApiNative.fileSystem.exists(themesFolder))
        DrApiNative.fileSystem.mkdir(themesFolder);
      var readDir = DrApiNative.runInNative('require("fs").readdirSync');
      var themes2 = readDir(themesFolder).filter((theme) => theme.endsWith(".css"));
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
      for (const theme of themes2) {
        const themeContent = DrApiNative.fileSystem.readFile(DrApiNative.fileSystem.join(themesFolder, theme));
        const meta = readMeta(themeContent);
        meta.css = themeContent;
        _themes[meta.name] = meta;
      }
      DrApiNative.require("fs").watch(DrApiNative.fileSystem.join(themesFolder), (type, file) => {
        const enabledThemes = storage2.getData("internal", "enabledThemes", []);
        const themeContent = DrApiNative.fileSystem.readFile(DrApiNative.fileSystem.join(themesFolder, file));
        const meta = readMeta(themeContent);
        meta.css = themeContent;
        _themes[meta.name] = meta;
        if (!enabledThemes.includes(meta.name))
          return;
        if (document.readyState === "complete")
          module.exports.toggleTheme(meta.name);
      });
      module.exports = () => {
        const enabledThemes = storage2.getData("internal", "enabledThemes", []);
        for (const theme of Object.keys(_themes)) {
          if (!enabledThemes.includes(theme))
            continue;
          module.exports.toggleTheme(theme);
        }
      };
      module.exports.toggleTheme = (id) => {
        const theme = _themes[id];
        const isOn = document.getElementById(id);
        if (isOn)
          return isOn.remove();
        const style = document.createElement("style");
        style.id = theme.name;
        style.innerHTML = theme.css;
        styles2.appendChild(style);
      };
      module.exports.getThemes = () => _themes;
    }
  });

  // src/top/settings.js
  var require_settings = __commonJS({
    "src/top/settings.js"(exports, module) {
      var patcher = require_patcher();
      var webpack2 = require_webpack();
      var storage2 = require_storage();
      var styles2 = require_styles();
      var { getThemes, toggleTheme } = require_themes();
      module.exports = async (React) => {
        const sectionsModule = await webpack2.getModuleByPropsAsync("getUserSettingsSections");
        const NotificationSettings = webpack2.getModuleByDisplayName("NotificationSettings", true);
        const FormSection = webpack2.getModuleByDisplayName("FormSection", true);
        const SwitchItem = webpack2.getModuleByDisplayName("SwitchItem", true);
        const Card = webpack2.getModuleByDisplayName("Card", true);
        const Flex = webpack2.getModuleByDisplayName("Flex", true);
        const Clickable = webpack2.getModuleByDisplayName("Clickable", true);
        const FormDivider = webpack2.getModuleByDisplayName("FormDivider", true);
        const Caret = webpack2.getModuleByDisplayName("Caret", true);
        const Mail = webpack2.getModuleByDisplayName("Mail", true);
        const LegacyHeader = webpack2.getModuleByDisplayName("LegacyHeader", true);
        const FormItem = webpack2.getModuleByDisplayName("FormItem", true);
        const Slider = webpack2.getModuleByDisplayName("Slider", true);
        const { Text } = webpack2.getModule((m) => m.Text.displayName);
        const { Messages } = webpack2.getAllModulesByProps("Messages")[1];
        const Switch = webpack2.getModuleByDisplayName("Switch", true);
        const SearchBar = webpack2.getModuleByDisplayName("SearchBar", true);
        const { header, topDivider, body, expandIcon } = webpack2.getModuleByProps("header", "topDivider");
        const { iconWrapper, wrapper, secondaryHeader } = webpack2.getModuleByProps("detailsWrapper", "icon", "iconWrapper");
        const { justifyCenter, alignCenter, justifyBetween, horizontal } = webpack2.getModuleByProps("justifyCenter", "alignCenter");
        const { card } = webpack2.getModuleByProps("card", "pulse", "topDivider");
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
    margin-right: 8px
  } .dr-addon-avatar + h3 {
    padding-top: 2px;
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
          id,
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
                    if (id === "notifications")
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
                                size: "size16-CysEuG dr-size16",
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
          const [newMacOS, setNewMacOS] = storage2.useStorage("internal", "newMacOS", true);
          const [position, setPosition] = storage2.useStorage("internal", "notificationLocation", NotificationSettings.Positions.TOP_RIGHT);
          const [positionX, setPositionX] = storage2.useStorage("internal", "notificationPositionX", 20);
          const [positionY, setPositionY] = storage2.useStorage("internal", "notificationPositionY", 20);
          const [maxHeight, setMaxHeight] = storage2.useStorage("internal", "notificationMaxHeight", 30);
          const [blur, setBlur] = storage2.useStorage("internal", "notificationBlur", 0);
          const [opacity, setOpacity] = storage2.useStorage("internal", "notificationOpacity", 80);
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
                          storage2.setData("internal", "notificationLocation", val);
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
                value: newMacOS,
                children: "New MacOS Titlebar Style",
                note: "Use Electrons titlebar or Discords titlebar.",
                disabled: !(DrApiNative.platform === "darwin"),
                onChange: (value) => {
                  DrApi.modals.confirmModal("Restart discord?", [
                    `To use ${value ? "new" : "old"} MacOS titlebar style you need to restart discord.`
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
        const { openUserProfileModal } = webpack2.getModuleByProps("openUserProfileModal");
        const renderMessageMarkup = webpack2.getModuleByProps("renderMessageMarkupToAST").default;
        const [{ getUser: fetchUser }, { getUser }] = webpack2.getAllModulesByProps("getUser");
        function Avatar({ author, userId }) {
          const [user, setUser] = React.useState(getUser(userId));
          React.useEffect(() => {
            void async function() {
              if (user)
                setUser(getUser(userId));
              else if (typeof userId === "string")
                setUser(await fetchUser(userId));
            }();
          });
          return [
            user && user.id === userId ? React.createElement("img", {
              src: user.getAvatarURL(false, void 0, true),
              width: 24,
              height: 24,
              className: "dr-addon-avatar",
              onClick() {
                openUserProfileModal({ userId });
              }
            }) : false,
            React.createElement(LegacyHeader, {
              children: user?.name ?? author,
              className: secondaryHeader,
              size: "size16-CysEuG dr-size16",
              tag: "h3"
            }),
            user && user.id === userId ? React.createElement(Text, {
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
          const [enabledThemes, setEnabledThmes] = storage2.useStorage("internal", "enabledThemes", []);
          return React.createElement(Card, {
            ...Card.defaultProps,
            editable: true,
            className: card,
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
                            React.createElement(LegacyHeader, {
                              children: addon.name,
                              className: secondaryHeader,
                              size: "size20-2yAqwX dr-size20",
                              tag: "h3"
                            }),
                            React.createElement(Text, {
                              style: {
                                paddingTop: 5,
                                marginLeft: 10
                              },
                              children: ["v", addon.version],
                              color: "header-secondary",
                              variant: "text-sm/normal"
                            })
                          ]
                        }),
                        React.createElement(Flex, {
                          style: { marginBottom: 6 },
                          children: React.createElement(Avatar, { userId: addon.authorId, author: addon.author })
                        })
                      ]
                    }),
                    React.createElement(Switch, {
                      checked: enabledThemes.includes(addon.name),
                      onChange: (val) => {
                        if (val)
                          enabledThemes.push(addon.name);
                        else {
                          const i = enabledThemes.indexOf(addon.name);
                          if (i === -1)
                            return;
                          enabledThemes.splice(i, 1);
                        }
                        setEnabledThmes([...enabledThemes]);
                        toggleTheme(addon.name);
                      }
                    })
                  ]
                }),
                React.createElement("div", {
                  style: { color: "var(--text-normal)" }
                }, (() => {
                  const { content } = renderMessageMarkup({ content: " *s* " + addon.description });
                  content.shift();
                  content.shift();
                  return content;
                })())
              ]
            })
          });
        }
        function Themes() {
          const [query, setQuery] = React.useState("");
          const [themes2, setThemes] = React.useState(getThemes());
          return React.createElement(FormSection, {
            title: "Themes",
            tag: FormSection.Tags.H1,
            children: [
              React.createElement("div", {
                id: "dr-addon-header",
                children: [
                  React.createElement(SearchBar, {
                    placeholder: "Search Themes",
                    query,
                    isLoading: false,
                    disabled: false,
                    autoFocus: true,
                    size: SearchBar.Sizes.SMALL,
                    onQueryChange: (val) => {
                      setQuery(val);
                      const filtered = Object.entries(getThemes()).filter(([theme]) => theme.toLowerCase().includes(val.toLowerCase()));
                      setThemes(Object.fromEntries(filtered));
                    },
                    onClear: () => {
                      setQuery("");
                      setThemes(getThemes());
                    }
                  })
                ]
              }),
              React.createElement("div", {
                id: "dr-addon-list",
                children: Object.values(themes2).map((theme) => React.createElement(AddonCard, theme))
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
            label: "Settings",
            section: "Discord Re-envisioned Themes"
          },
          {
            element: () => React.createElement(Themes),
            label: "Themes",
            section: "Discord Re-envisioned"
          }
        ];
        patcher.after("DrApi", sectionsModule.default, "render", (that, args, res) => {
          const { sections } = res.props.children.props.children.props;
          const index = sections.indexOf(sections.find((s) => s.section === "Connections")) + 1;
          if (!index)
            return;
          if (sections.find((s) => s.section === "Discord Re-envisioned"))
            return;
          sections.splice(index, 0, ...settings2);
        });
        const { line } = webpack2.getModuleByProps("line", "versionHash");
        const { openModal } = webpack2.getModuleByProps("openModalLazy", "openModal");
        const { ModalRoot, ModalHeader, ModalContent, ModalFooter, ModalCloseButton } = webpack2.getModuleByProps("ModalRoot", "ModalHeader");
        const { Heading } = DrApi.webpack.getModuleByProps("Heading");
        function changeLog() {
          openModal((props) => React.createElement(ModalRoot, {
            ...props,
            className: "modal-3Hrb0S dr-modal",
            children: [
              React.createElement(ModalHeader, {
                align: justifyBetween,
                separator: false,
                children: [
                  React.createElement(Flex.Child, {
                    wrap: false,
                    children: [
                      React.createElement(Heading, {
                        children: "What's New",
                        level: 2,
                        variant: "heading-lg/medium"
                      }),
                      React.createElement(Text, {
                        variant: "text-xs/normal",
                        children: [
                          "Discord Re-envisioned",
                          " (",
                          React.createElement("span", {
                            children: "ALPHA",
                            style: { color: "var(--status-danger)" }
                          }),
                          ")"
                        ]
                      })
                    ]
                  }),
                  React.createElement(Flex.Child, {
                    grow: 0,
                    children: React.createElement(ModalCloseButton, { onClick: props.onClose })
                  })
                ]
              }),
              React.createElement(ModalContent, {
                className: "container-3PVapX dr-container content-FDHp32 dr-content",
                children: "Text"
              }),
              React.createElement(ModalFooter, {
                direction: horizontal
              })
            ]
          }));
        }
        patcher.after("DrApi", webpack2.getModuleByDisplayName("ClientDebugInfo"), "default", (that, args, res) => {
          res.props.children.push(React.createElement(Text, {
            className: line,
            color: "text-muted",
            tag: "span",
            variant: "text-xs/normal",
            children: [
              "Discord Re-envisioned",
              " (",
              React.createElement("span", {
                onClick: () => changeLog(),
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

  // src/top/notifications.js
  var require_notifications = __commonJS({
    "src/top/notifications.js"(exports, module) {
      var webpack2 = require_webpack();
      var Patcher2 = require_patcher();
      var storage2 = require_storage();
      var styles2 = require_styles();
      module.exports = async (React) => {
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
        const Shakeable = await webpack2.getModuleByDisplayNameAsync("Shakeable", true);
        const Button = webpack2.getModuleByProps("ButtonColors", "ButtonSizes").default;
        const Flex = webpack2.getModuleByDisplayName("Flex", true);
        const { Heading } = webpack2.getModuleByProps("Heading");
        const Close = webpack2.getModuleByDisplayName("Close", true);
        const Clickable = webpack2.getModuleByDisplayName("Clickable", true);
        const renderMessageMarkup = webpack2.getModuleByProps("renderMessageMarkupToAST").default;
        const { thin, fade } = webpack2.getModuleByProps("thin", "fade");
        const { scroller } = webpack2.getModuleByProps("scroller");
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
        function Toast({ title, content, icon, buttons = [], hideToast, id, type = "" }) {
          const [blur] = storage2.useStorage("internal", "notificationBlur", 0);
          const [opacity] = storage2.useStorage("internal", "notificationOpacity", 80);
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
            id,
            type: type.toLowerCase(),
            children: [
              React.createElement("div", {
                className: "dr-toast-background",
                style: {
                  backdropFilter: `blur(${blur}px)`,
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
          const [location] = storage2.useStorage("internal", "notificationLocation", "topRight");
          const [positionX] = storage2.useStorage("internal", "notificationPositionX", 20);
          const [positionY] = storage2.useStorage("internal", "notificationPositionY", 20);
          const [maxHeight] = storage2.useStorage("internal", "notificationMaxHeight", 30);
          const [toasts, setToasts] = React.useState([]);
          React.useEffect(() => {
            DrApi.toast = {
              delete(id) {
                const toast = toasts.find((t) => t.id === id);
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
        Patcher2.after("DrApi", Shakeable.prototype, "render", (that, args, res) => {
          res.props.children.push(React.createElement(Toasts));
        });
      };
    }
  });

  // src/top/modals.js
  var require_modals = __commonJS({
    "src/top/modals.js"(exports, module) {
      var patcher = require_patcher();
      var webpack2 = require_webpack();
      module.exports = async (React) => {
        let _id = 0;
        const {
          openModal,
          closeModal
        } = webpack2.getModuleByProps("openModalLazy", "openModal");
        const Alert = webpack2.getModuleByDisplayName("Alert", true);
        const ConfirmModal = webpack2.getModuleByDisplayName("ConfirmModal", true);
        const { Messages } = webpack2.getAllModulesByProps("Messages")[1];
        const Button = webpack2.getModuleByProps("ButtonColors", "ButtonSizes").default;
        let renderMessageMarkup;
        function makeContent(content) {
          if (!renderMessageMarkup)
            renderMessageMarkup = webpack2.getModuleByProps("renderMessageMarkupToAST").default;
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
          open(content, id) {
            id ??= `DrApi-Modal-${_id}`;
            _id++;
            openModal(typeof content === "function" ? content : () => content, {
              modalKey: id
            });
            return () => this.close(id);
          },
          close(id) {
            closeModal(id);
          },
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

  // src/top/index.js
  var originalConsole = globalThis.console;
  for (const key in originalConsole) {
    const e = originalConsole[key];
    Object.defineProperty(console, key, {
      get: () => e,
      set: () => e
    });
  }
  var webpack = require_webpack();
  var Patcher = require_patcher();
  var storage = require_storage();
  var settings = require_settings();
  var notifications = require_notifications();
  var styles = require_styles();
  var modals = require_modals();
  var themes = require_themes();
  void function() {
    function changeClasses(that, classes, old) {
      return old.apply(that, classes.map((c) => c.includes(" dr-") ? c.split(" ")[0] : c));
    }
    Patcher.instead("DrApi", DOMTokenList.prototype, "add", changeClasses);
    Patcher.instead("DrApi", DOMTokenList.prototype, "remove", changeClasses);
    Patcher.instead("DrApi", DOMTokenList.prototype, "contains", changeClasses);
  }();
  window.DrApi = {
    webpack,
    Patcher,
    storage: {
      getData: (pluginName, key) => storage.getData(pluginName, key),
      setData: (pluginName, key, value) => storage.setData(pluginName, key, value)
    }
  };
  webpack.getModuleByPropsAsync("isDeveloper").then((e) => Object.defineProperty(e, "isDeveloper", { get: () => true }));
  webpack.getModuleByPropsAsync("memo", "createElement").then((React) => {
    window.DrApi.React = React;
    settings(React);
    notifications(React);
    modals(React);
  });
  function documentReady() {
    const node = document.createElement("script");
    node.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    node.onload = () => window.$ = window.jQuery;
    document.head.append(node);
    styles.documentReady();
    themes();
    globalThis.console = { ...globalThis.console };
  }
  if (document.readyState === "complete")
    documentReady();
  else
    document.addEventListener("DOMContentLoaded", documentReady);
})();
