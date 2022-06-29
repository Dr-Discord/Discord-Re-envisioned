import storage from "../storage"

const styles = document.createElement("dr-styles")

const internal = document.createElement("style")
const themes = document.createElement("dr-themes")
const plugins = document.createElement("dr-plugins")
const customCSS = document.createElement("style")

styles.append(internal, plugins, themes, customCSS)

customCSS.innerHTML = storage.customCSS()

module.exports = (id, css) => {
  if (id === "DrApi") return internal.innerHTML = css

  let style = document.querySelector(`[dr-plugin=${JSON.stringify(id)}]`)
  if (!style) {
    style = document.createElement("style")
    style.setAttribute(`dr-plugin`, id)
    plugins.append(style)
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
