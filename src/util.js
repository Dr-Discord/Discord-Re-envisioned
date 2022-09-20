export function readMeta(contents) {
  const meta = { beta: false, alpha: false, didError: true }

  try {
    const jsdoc = contents.match(/\/\*\*([\s\S]*?)\*\//)
    if (!jsdoc?.[1]) return meta

    for (let ite of jsdoc[1].match(/\*(\s|)([^\n(\r|)]*)/g)) {
      ite = ite.replace(/\*(\s|)@/, "")
      const split = ite.split(" ")
      meta[split[0].toLowerCase()] = split.slice(1).join(" ").trim()
    }
  
  } catch (error) { return meta }
  
  meta.alpha = typeof meta.alpha === "string"
  meta.beta = typeof meta.beta === "string"

  if (!meta.name) meta.didError = false
  if (!(meta.exports && meta.filepath.endsWith(".script.js"))) meta.didError = false

  return meta
}