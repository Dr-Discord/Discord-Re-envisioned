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

void async function() {
  const React = await webpack.getModuleByPropsAsync("memo", "createElement")
  
  window.DrApi.React = React

  settings(React)
  notifications(React)
  modals(React)
}()

function jQuery() {
  const node = document.createElement("script")
  node.src = "https://code.jquery.com/jquery-3.6.0.min.js"
  node.onload = () => window.$ = window.jQuery
  document.head.append(node)
}
function ace() {
  const node = document.createElement("script")
  node.src = "https://ajaxorg.github.io/ace-builds/src-min-noconflict/ace.js"
  document.head.append(node)
}

function documentReady() {
  globalThis.console = { ...globalThis.console }
  styles.documentReady()
  themes()

  jQuery()
  ace()
}

if (document.readyState === "complete") documentReady()
else document.addEventListener("DOMContentLoaded", documentReady)