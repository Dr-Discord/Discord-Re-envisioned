(async function() {
  console.log("Starting build...")
  const start = Date.now()

  const fs = require("fs")
  const cp = require("child_process")
  const https = require("https")
  const path = require("path")

  const { version, dependencies } = require("./package.json")

  await new Promise(resolve => {
    for (const dependency of Object.keys(dependencies)) {
      try { require(dependency) } 

      catch (error) {
        if (error.message.split("\n")[0] !== `Cannot find module '${dependency}'`) continue
        console.log("Installing dependencies")
        return cp.exec(`cd ${__dirname.replace("\\", "/").replace(" ", "\\ ")} && npm install`, () => {
          console.log("Installed dependencies")
          resolve()
        })
      }
    }
    resolve()
  })

  const esbuild = require("esbuild")
  const asar = require("asar")
  const sass = require("sass")

  const production = process.argv.includes("--production")
  if (production) console.log("Production mode enabled!")

  const changePermissions = (dir, mode) => {
    const files = fs.readdirSync(dir)
    files.forEach((file) => {
      const filePath = path.join(dir, file)
      fs.chmodSync(filePath, parseInt(`${mode}`, 8))
      if (fs.statSync(filePath).isDirectory()) {
        changePermissions(filePath, mode)
      }
    })
  }
  const downloadFile = (from, to) => {
    return new Promise((resolve, reject) => {
      const req = https.get(from)
      req.on("response", (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return downloadFile(res.headers.location, to).then(resolve).catch(reject)
        }
        res.pipe(fs.createWriteStream(to)).on("close", resolve)
        res.on("error", reject)
      })
      req.on("error", reject)
      req.end()
    })
  }

  const license = fs.readFileSync("license", "utf-8")

  async function buildFile(file) {
    const start = Date.now()

    console.log(`${file.endsWith(".js") ? "Building" : "Bundling"} '${file.endsWith(".js") ? `src/${file}` : `src/${file}/index.js`}'`)

    await esbuild.build({
      entryPoints: [file.endsWith(".js") ? `src/${file}` : `src/${file}/index.js`],
      outfile: `dist/${file.replace(".js", "")}.js`,
      bundle: true,
      minify: production,
      platform: file.endsWith(".js") ? "node" : "browser",
      plugins: [{
          name: "external-ace",
          setup: (build) => {
            // Allow *importing* ace
            build.onResolve({ filter: /^ace$/ }, () => ({ path: "ace.js", namespace: "ace" }))

            build.onLoad({ filter: /.*/, namespace: "ace" }, () => ({
              contents: `const node = document.createElement("script")
node.src = "https://ajaxorg.github.io/ace-builds/src-min-noconflict/ace.js"
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => document.head.append(node))
else document.head.append(node)
module.exports = (event, callback) => node.addEventListener(event, callback)`
            }))
          }
        }, {
        name: "styles",
        setup: (build) => {
          // allow 'styles' be the compiled version of 'src/styling/index.scss'
          build.onResolve({ filter: /^styles$/ }, () => ({ path: "styling/index.scss", namespace: "styles", }))
          build.onLoad({ filter: /.*/, namespace: "styles" }, async () => {
            const { css } = await sass.compileAsync("src/styling/index.scss", { style: "compressed" })
            return { contents: `module.exports = ${JSON.stringify(css)}` }
          })
        }
      }, {
        name: "node-module",
        setup: (build) => {
          // All external node modules to not bundle
          build.onResolve({ filter: /^electron$/ }, () => ({ path: "electron", namespace: "external:node-module" }))
          build.onResolve({ filter: /^original-fs$/ }, () => ({ path: "original-fs", namespace: "external:node-module" }))
          build.onResolve({ filter: /^request$/ }, () => ({ path: "request", namespace: "external:node-module" }))
          // To prevent it from requiring itself make it require a const instead of a string
          build.onLoad({ filter: /.*/, namespace: "external:node-module" }, (args) => ({ contents: `const path = ${JSON.stringify(args.path)}
module.exports = require(path)` }))
        }
      }],
      loader: { ".scss": "text" }
    })
  
    const js = fs.readFileSync(`dist/${file.replace(".js", "")}.js`, "utf-8")
    fs.writeFileSync(`dist/${file.replace(".js", "")}.js`, `/*\n${license.split("\n\n").map(str => `\t${str}`).join("\n")}\n*/\n\n${js}`)
    console.log(`${file.endsWith(".js") ? "Built" : "Bundled"} '${file.endsWith(".js") ? `src/${file}` : `src/${file}/index.js`}' in ${Date.now() - start}ms`)
  }

  await buildFile("main")
  await buildFile("preload.js")
  await buildFile("splashPreload.js")
  await buildFile("storage.js")
  await buildFile("index.js")
  
  fs.appendFileSync("dist/main.js", `//# sourceURL=${encodeURIComponent("Discord Re-envisioned")}`)

  console.log("Copying changelog from 'src/changelog.json' to 'dist/changelog.json'")
  fs.writeFileSync("dist/changelog.json", JSON.stringify(require("./src/changelog.json")))

  console.log("Copying license from 'license' to 'dist/license'")
  fs.writeFileSync("dist/license", license)

  console.log("Making 'dist/package.json'")
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
  
  await asar.createPackage("dist", "built.asar")

  function getSize(size) {
    if (size.length <= 3) return `${size}b`
    else if (size.length <= 6) {
      const kb = size.substring(0, size.length - 3)
      const b = size.substring(size.length - 3, size.length - 1)
      return `${kb}.${Math.round(b / 10)}kb`
    } else {
      const mb = size.substring(0, size.length - 6)
      const kb = size.substring(size.length - 6, size.length - 4)
      return `${mb}.${Math.round(kb / 10)}mb`
    }
  }
  
  const size = getSize(String(fs.statSync("built.asar").size))

  console.log(`Built completed in ${generateTime(String(Date.now() - start))}! Estimated size is ${size}`)
})()