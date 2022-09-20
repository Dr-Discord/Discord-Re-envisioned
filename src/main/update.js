import logger from "./logger"
import webpack from "./webpack"

export default async (React) => {
  logger.log("Updater", "Checking for new update")

  const request = await fetch("https://api.github.com/repos/Dr-Discord/Discord-Re-envisioned/releases")
  const json = (await request.json()).shift()

  if (DrApiNative.package.version >= json.tag_name) return
    
  const CloudDownload = webpack.getModuleByDisplayName("CloudDownload", true)
  DrApi.modals.confirmModal([
    React.createElement(CloudDownload, {
      style: {
        transform: "translateY(4px)",
        marginRight: 8
      }
    }),
    "You version is out of date!"
  ], [
    "Do you want to update Discord Re-envisioned",
    `You version is '${DrApiNative.package.version}' and the latest is '${json.tag_name}'`
  ], {
    confirmText: "Update",
    onConfirm: () => {
      const hash = json.assets.find(a => a.name.endsWith(".asar")).url.split("/").pop()
      DrApiNative.downloadAsar(hash, (err) => err ? null : DrApiNative.quit(true))
    }
  })
}