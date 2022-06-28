console.log("Starting build...")
const start = Date.now()

const esbuild = require("esbuild")
const asar = require("asar")
const fs = require("fs")

const { version } = require("./package.json")

const production = process.argv.includes("--production")

const license = fs.readFileSync("license", "utf-8")

function buildFile(file) {
  esbuild.buildSync({
    entryPoints: [file.endsWith(".js") ? `src/${file}` : `src/${file}/index.js`],
    outfile: `dist/${file.replace(".js", "")}.js`,
    bundle: !file.endsWith(".js"),
    minify: production,
    platform: file.endsWith(".js") ? "node" : "browser"
  })

  const js = fs.readFileSync(`dist/${file.replace(".js", "")}.js`, "utf-8")
  fs.writeFileSync(`dist/${file.replace(".js", "")}.js`, `/*\n${license.split("\n\n").map(str => `\t${str}`).join("\n")}\n*/\n\n${js}`)
}
buildFile("splash")
buildFile("main")
buildFile("preload.js")
buildFile("splashPreload.js")
buildFile("storage.js")
buildFile("index.js")

fs.copyFileSync("src/changelog.json", "dist/changelog.json")
fs.writeFileSync("dist/license", license)

fs.appendFileSync("dist/main.js", `//# sourceURL=${encodeURIComponent("Discord Re-envisioned")}`)
fs.writeFileSync("dist/package.json", JSON.stringify({
  version,
  name: "Discord Re-envisioned",
  main: "index.js"
}))

function generateTime(num) {
  const { length } = num

  const ms = num.substring(length - 3)
  const s = num.substring(0, length - 3)
  const m = String(s / 60).split(".")[0]

  return `${m}m ${s - (m * 60)}s ${ms}ms`
}

asar.createPackage("dist", "built.asar").then(() => {
  console.log(`Built completed in ${generateTime(String(Date.now() - start))}!`)
})