const originalConsole = globalThis.console
for (const key in originalConsole) {
  const e = originalConsole[key]
  Object.defineProperty(console, key, {
    get: () => e,
    set: () => e
  })
}

const logger = require("./logger")
const webpack = require("./webpack")
const Patcher = require("./patcher")
const storage = require("../storage")
const settings = require("./settings")
const notifications = require("./notifications")
const styles = require("./styles")
const modals = require("./modals")

logger.log("Discord Re-invisioned", "Loading...")

const themes = require("./themes")
const plugins = require("./plugins")

void function() {  
  function changeClasses(that, classes, old) {
    return old.apply(that, classes.map(c => c.includes(" dr-") ? c.split(" ")[0] : c))
  }

  Patcher.instead("DrApi", DOMTokenList.prototype, "add", changeClasses)
  Patcher.instead("DrApi", DOMTokenList.prototype, "remove", changeClasses)
  Patcher.instead("DrApi", DOMTokenList.prototype, "contains", changeClasses)
}()

window.DrApi = {
  request: (url, then) => fetch(url).then(then),
  webpack,
  Patcher,
  storage: {
    useStorage: (pluginName, key, defaultValue) => storage.useStorage(pluginName === "internal" ? pluginName : `${pluginName}.plugin`, key, defaultValue),
    getData: (pluginName, key, defaultValue) => storage.getData(pluginName === "internal" ? pluginName : `${pluginName}.plugin`, key, defaultValue),
    setData: (pluginName, key, value) => storage.setData(pluginName === "internal" ? pluginName : `${pluginName}.plugin`, key, value)
  },
  plugins: {
    getAll: () => plugins.getPlugins(),
    get: (id) => plugins.getPlugins()[id],
    isEnabled: (id) => storage.getData("internal", "enabledPlugins", []).includes(id),
    toggle: (id) => {
      const enabledPlugins = storage.getData("internal", "enabledPlugins", [])
      const plugin = plugins.getPlugins()[id]

      if (!plugin) return
      const index = enabledPlugins.indexOf(id)

      if (index === -1) {
        plugin.exports.onStart?.()
        storage.setData("internal", "enabledPlugins", enabledPlugins.concat(id))
        return true
      }
      
      enabledPlugins.splice(index, 1)
      storage.setData("internal", "enabledPlugins", enabledPlugins)
      plugin.exports.onStop?.()
      
      return false
    }
  },
  themes: {
    getAll: () => themes.getThemes(),
    get: (id) => themes.getThemes()[id],
    isEnabled: (id) => storage.getData("internal", "enabledPlugins", []).includes(id),
    toggle: (id) => {
      const enabledThemes = storage.getData("internal", "enabledThemes", [])
      const theme = themes.getThemes()[id]

      if (!theme) return
      const index = enabledThemes.indexOf(id)

      if (index === -1) {
        theme.exports.onStart?.()
        storage.setData("internal", "enabledThemes", enabledThemes.concat(id))

        const style = document.createElement("style")
        style.setAttribute("dr-theme", id)
        style.innerHTML = theme.css
        styles.appendChild(style)

        return true
      }

      enabledThemes.splice(index, 1)
      storage.setData("internal", "enabledThemes", enabledThemes)
      document.querySelector(`[dr-theme=${JSON.stringify(id)}]`).remove()

      return false
    }
  },
  styling: {
    insert: (id, css) => {
      let node = document.querySelector(`[dr-plugin=${JSON.stringify(id)}]`)
      if (!node) {
        node = document.createElement("style")
        node.setAttribute("dr-plugin", id)
        styles.plugins.appendChild(node)
      }
      node.innerHTML = css
      return (css) => typeof css === "string" ? DrApi.styling.insert(id, css) : node.remove()
    },
    remove: (id) => document.querySelector(`[dr-plugin=${JSON.stringify(id)}]`)?.remove?.()
  }
}

void async function() {
  const React = await webpack.getModuleByPropsAsync("memo", "createElement")
  
  window.DrApi.React = React

  settings(React)
  notifications(React)
  modals(React)

  const dispatcher = await webpack.getModuleByPropsAsync("dirtyDispatch", "dispatch")
  function onOpen() {
    logger.log("Plugins", "Initializing all plugins")
    plugins()

    logger.log("Updater", "Checking for new update")
    DrApi.request("https://api.github.com/repos/Dr-Discord/Discord-Re-envisioned/releases", async request => {
      const json = (await request.json()).shift()

      if (DrApiNative.package.version >= json.tag_name) return
      
      const CloudDownload = webpack.getModuleByDisplayName("CloudDownload", true)
      DrApi.modals.confirmModal([
        React.createElement(CloudDownload, {
          style: {
            transform: "translateY(4px)",
            marginRight: 8
          }
        }),
        "You version is out of date!"
      ], [
        "Do you want to update Discord Re-envisioned",
        `You version is '${DrApiNative.package.version}' and the latest is '${json.tag_name}'`
      ], {
        confirmText: "Update",
        onConfirm: () => {
          const hash = json.assets.find(a => a.name.endsWith(".asar")).url.split("/").pop()
          DrApiNative.downloadAsar(hash, (err) => err ? null : DrApiNative.quit(true))
        }
      })
    })
    
    dispatcher.unsubscribe("CONNECTION_OPEN", onOpen)
  }


  dispatcher.subscribe("CONNECTION_OPEN", onOpen)
  dispatcher.subscribe("CONNECTION_OPEN", ({ user }) => document.documentElement.setAttribute("user-id", user.id))
  dispatcher.subscribe("LOGOUT", () => document.documentElement.removeAttribute("user-id"))
}()


function documentReady() {
  globalThis.console = { ...globalThis.console }

  logger.log("Themes", "Adding themes")
  styles.documentReady()
  themes()

  const jquery = document.createElement("script")
  jquery.src = "https://code.jquery.com/jquery-3.6.0.min.js"
  jquery.onerror = (event) => logger.err("jQuery", "Cannot load jQuery", event)
  jquery.onload = () => {
    window.$ = window.jQuery
    logger.log("jQuery", "Loaded jQuery")
  }
  document.head.append(jquery)

  const ace = document.createElement("script")
  ace.src = "https://ajaxorg.github.io/ace-builds/src-min-noconflict/ace.js"
  ace.onerror = (event) => logger.err("Ace", "Cannot the Ace editor", event)
  ace.onload = () => logger.log("Ace", "Loaded the Ace editor")
  document.head.append(ace)

  document.documentElement.setAttribute("release", window.GLOBAL_ENV.RELEASE_CHANNEL)
  if (storage.getData("internal", "transparency", false)) document.documentElement.setAttribute("transparent", "")
}

if (document.readyState === "complete") documentReady()
else document.addEventListener("DOMContentLoaded", documentReady)
