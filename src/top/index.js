const originalConsole = globalThis.console
for (const key in originalConsole) {
  const e = originalConsole[key]
  Object.defineProperty(console, key, {
    get: () => e,
    set: () => e
  })
}

const webpack = require("./webpack")
const Patcher = require("./patcher")
const storage = require("../storage")
const settings = require("./settings")
const notifications = require("./notifications")
const styles = require("./styles")
const modals = require("./modals")

const themes = require("./themes")

void function() {
  function changeClasses(that, classes, old) {
    return old.apply(that, classes.map(c => c.includes(" dr-") ? c.split(" ")[0] : c))
  }

  Patcher.instead("DrApi", DOMTokenList.prototype, "add", changeClasses)
  Patcher.instead("DrApi", DOMTokenList.prototype, "remove", changeClasses)
  Patcher.instead("DrApi", DOMTokenList.prototype, "contains", changeClasses)
}()

window.DrApi = {
  webpack,
  Patcher,
  storage: {
    getData: (pluginName, key) => storage.getData(pluginName, key),
    setData: (pluginName, key, value) => storage.setData(pluginName, key, value)
  }
}

webpack.getModuleByPropsAsync("isDeveloper").then(e => Object.defineProperty(e, "isDeveloper", { get: () => true }))
webpack.getModuleByPropsAsync("memo", "createElement").then(React => {
  window.DrApi.React = React
  settings(React)
  notifications(React)
  modals(React)
})

function documentReady() {
  const node = document.createElement("script")
  node.src = "https://code.jquery.com/jquery-3.6.0.min.js"
  node.onload = () => window.$ = window.jQuery
  document.head.append(node)
  
  styles.documentReady()
  themes()

  globalThis.console = { ...globalThis.console }
}

if (document.readyState === "complete") documentReady()
else document.addEventListener("DOMContentLoaded", documentReady)