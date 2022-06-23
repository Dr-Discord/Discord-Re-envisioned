const esbuild = require("esbuild")
const asar = require("asar")
const fs = require("fs")

const { version } = require("./package.json")

function buildFile(file) {
  esbuild.buildSync({
    entryPoints: [file.endsWith(".js") ? `src/${file}` : `src/${file}/index.js`],
    outfile: `dist/${file.replace(".js", "")}.js`,
    bundle: !file.endsWith(".js"),
    platform: file.endsWith(".js") ? "node" : "browser"
  })
}
buildFile("splash")
buildFile("main")
buildFile("preload.js")
buildFile("splashPreload.js")
buildFile("storage.js")
buildFile("index.js")

fs.copyFileSync("src/changelog.json", "dist/changelog.json")

fs.appendFileSync("dist/main.js", `//# sourceURL=${encodeURIComponent("Discord Re-envisioned")}`)
fs.writeFileSync("dist/package.json", JSON.stringify({
  version,
  name: "Discord Re-envisioned",
  main: "index.js"
}))

asar.createPackage("dist", "built.asar")