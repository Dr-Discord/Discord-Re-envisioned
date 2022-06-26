const storage = require("../storage")

const styles = document.createElement("dr-styles")

const internal = document.createElement("dr-internal")
const themes = document.createElement("dr-themes")
const plugins = document.createElement("dr-plugins")
const customCSS = document.createElement("style")

styles.append(internal, plugins, themes, customCSS)

customCSS.innerHTML = storage.customCSS()

module.exports = (id, css) => {
  const isInternal = id.startsWith("DrApi")

  let style = document.querySelector(`[dr-${isInternal ? "internal" : "plugin"}=${JSON.stringify(id)}]`)
  if (!style) {
    style = document.createElement("style")
    style.setAttribute(`dr-${internal ? "internal" : "plugin"}`, id)
    if (isInternal) internal.append(style)
    else plugins.append(style)
  }
  style.innerHTML = css
  return () => style.remove()
}

module.exports.documentReady = () => document.head.append(styles)
module.exports.styles = styles
module.exports.internal = internal
module.exports.plugins = plugins
module.exports.themes = themes
module.exports.customCSS = customCSS
