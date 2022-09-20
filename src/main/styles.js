import storage from "../storage"

export const styles = document.createElement("dr-styles")

export const internal = document.createElement("style")
export const themes = document.createElement("dr-themes")
export const plugins = document.createElement("dr-plugins")
export const customCSS = document.createElement("style")

styles.append(internal, plugins, themes, customCSS)

customCSS.innerHTML = storage.customCSS()

export default (id, css) => {
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

export const documentReady = () => document.head.append(styles)