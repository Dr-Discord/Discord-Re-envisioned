import logger from "./logger"
import webpack from "./webpack"

export default async (React) => {
  logger.log("Modals", "Initializing Modal api")

  let _id = 0

  const { 
    openModal, closeModal
  } = webpack.getModuleByProps("openModalLazy", "openModal")

  const Alert = webpack.getModuleByDisplayName("Alert", true)
  const ConfirmModal = webpack.getModuleByDisplayName("ConfirmModal", true)
  const { Messages } = webpack.getAllModulesByProps("Messages")[1]
  const Button = webpack.getModuleByProps("ButtonColors", "ButtonSizes").default

  let renderMessageMarkup

  function makeContent(content) {
    if (!renderMessageMarkup) renderMessageMarkup = webpack.getModuleByProps("renderMessageMarkupToAST").default

    if (!renderMessageMarkup) return

    if (!Array.isArray(content)) content = [content]
    return content.map(con => typeof con === "string" ? (() => {
      const { content } = renderMessageMarkup({ content: " *s* " + con })
      content.shift()
      content.shift()
      return React.createElement("div", { style: { color: "var(--text-normal)" } }, content)
    })() : con)
  }

  window.DrApi.modals = {
    open(content, id) {
      id ??= `DrApi-Modal-${_id}`
      _id++

      openModal(typeof content === "function" ? content : () => content, {
        modalKey: id
      })

      return { close: () => closeModal(id), id }
    },
    close: (id) => closeModal(id),
    alert(title, content, opts = {}) {
      const { confirmText = Messages.OKAY, onConfirm } = opts
      this.open((props) => React.createElement(Alert, {
        ...props,
        title: title,
        confirmText,
        onConfirm,
        body: makeContent(content)
      }))
    },
    confirmModal(title, content, opts = {}) {
      const { cancelText = Messages.CANCEL, confirmText = Messages.OKAY, danger = false, onConfirm, onCancel } = opts

      this.open((props) => React.createElement(ConfirmModal, {
        ...props,
        header: title,
        confirmText,
        onConfirm,
        onCancel,
        cancelText,
        confirmButtonColor: danger ? Button.Colors.RED : Button.Colors.BRAND_NEW,
        children: makeContent(content)
      }))
    }
  }
}
