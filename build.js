(async function() {
  console.log("Starting build...")
  const start = Date.now()
  
  const fs = require("fs")

  const esbuild = require("esbuild")
  const asar = require("asar")
  const sass = require("sass")
  
  const { version } = require("./package.json")
  
  const production = process.argv.includes("--production")
  
  const license = fs.readFileSync("license", "utf-8")
  
  const makeHttpRequire = (src) => `const node = document.createElement("script")
node.src = ${JSON.stringify(src)}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => document.head.append(node))
else document.head.append(node)
module.exports = node`
  
  const scssPlugin = {
    name: "scss",
    setup: (build) => {
      build.onResolve({ filter: /\.scss$/ }, args => ({
        path: require.resolve(args.path, { paths: [args.resolveDir] }),
        namespace: "sass-file",
      }))
  
      build.onResolve({ filter: /\.scss$/, namespace: "sass-file" }, args => ({
        path: args.path,
        namespace: "sass-file",
      }))
  
      build.onLoad({ filter: /.*/, namespace: "sass-file" }, async (args) => {
        const { css } = await sass.compileAsync(args.path)
        return { contents: `module.exports = ${JSON.stringify(css)}` }
      })
    }
  }
  const httpsPlugin = {
    name: "https",
    setup: (build) => {
      build.onResolve({ filter: /^https?:\/\// }, args => ({
        path: args.path,
        namespace: "http-file",
      }))

      build.onResolve({ filter: /.*/, namespace: "http-file" }, args => ({
        path: new URL(args.path, args.importer).toString(),
        namespace: "http-file",
      }))

      build.onLoad({ filter: /.*/, namespace: "http-file" }, (args) => ({ contents: makeHttpRequire(args.path) }))
    }
  }


  async function buildFile(file) {
    console.log(`${file.endsWith(".js") ? "Building" : "Bundling"} '${file.endsWith(".js") ? `src/${file}` : `src/${file}/index.js`}'`)

    await esbuild.build({
      entryPoints: [file.endsWith(".js") ? `src/${file}` : `src/${file}/index.js`],
      outfile: `dist/${file.replace(".js", "")}.js`,
      bundle: true,
      minify: production,
      platform: file.endsWith(".js") ? "node" : "browser",
      plugins: [httpsPlugin, scssPlugin],
      external: ["electron", "original-fs", "./sass", "request"],
      loader: { ".scss": "text" }
    })
  
    const js = fs.readFileSync(`dist/${file.replace(".js", "")}.js`, "utf-8")
    fs.writeFileSync(`dist/${file.replace(".js", "")}.js`, `/*\n${license.split("\n\n").map(str => `\t${str}`).join("\n")}\n*/\n\n${js}\n\n//# sourceURL=${encodeURIComponent("Discord Re-envisioned")}`)
  }

  await buildFile("splash")
  await buildFile("main")
  await buildFile("preload.js")
  await buildFile("splashPreload.js")
  await buildFile("storage.js")
  await buildFile("index.js")
  
  console.log("Copying changelog from 'src/changelog.json' to 'dist/changelog.json'")
  fs.copyFileSync("src/changelog.json", "dist/changelog.json")
  
  console.log("Copying license from 'license' to 'dist/license'")
  fs.writeFileSync("dist/license", license)

  console.log("Making 'dist/package.json'")
  fs.writeFileSync("dist/package.json", JSON.stringify({
    version,
    name: "Discord Re-envisioned",
    main: "index.js"
  }))

  console.log("Bundling 'sass.js'")
  await esbuild.build({
    entryPoints: ["./node_modules/sass/sass.default.dart.js"],
    outfile: "dist/sass.js",
    bundle: true,
    minify: true,
    platform: "node"
  })
  
  function generateTime(num) {
    const { length } = num
  
    const ms = num.substring(length - 3)
    const s = num.substring(0, length - 3)
    const m = String(s / 60).split(".")[0]
  
    return `${m}m ${s - (m * 60)}s ${ms}ms`
  }
  
  await asar.createPackage("dist", "built.asar")

  console.log(`Built completed in ${generateTime(String(Date.now() - start))}!`)
})()