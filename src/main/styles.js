const styles = document.createElement("dr-styles")

module.exports = function(id, css) {
  let style = document.getElementById(id)
  if (!style) {
    style = document.createElement("style")
    style.id = id
    styles.appendChild(style)
  }
  style.innerHTML = css
  return () => style.remove()
}

module.exports.documentReady = () => document.head.append(styles)
module.exports.styles = styles
