const styles = document.createElement("dr-styles")

const internal = document.createElement("dr-internal")
const themes = document.createElement("dr-themes")
const plugins = document.createElement("dr-plugins")

styles.append(internal, plugins, themes)

module.exports = function(id, css) {
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
