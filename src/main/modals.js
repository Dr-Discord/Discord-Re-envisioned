import logger from "./logger"
import webpack from "./webpack"

export default async (React) => {
  logger.log("Modals", "Initializing Modal api")

  let _id = 0

  const { openModal, closeModal } = webpack.getModuleByProps("openModalLazy", "openModal")

  const Alert = await webpack.getModuleByDisplayNameAsync("Alert", true)
  const ConfirmModal = await webpack.getModuleByDisplayNameAsync("ConfirmModal", true)
  
  const { Messages } = webpack.getAllModulesByProps("Messages")[1]

  const Button = webpack.getModuleByProps("ButtonColors", "ButtonSizes").default
  const TextInput = webpack.getModuleByDisplayName("TextInput", true)
  const TextArea = webpack.getModuleByDisplayName("TextArea", true)

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

  function Prompt({ danger, title, resolve, placeholder, defaultText, type, props }) {
    const [ value, setValue ] = React.useState(defaultText)

    return React.createElement(ConfirmModal, {
      ...props,
      header: title,
      confirmText: Messages.OKAY,
      onConfirm: () => resolve(value),
      onCancel: () => resolve(null),
      cancelText: Messages.CANCEL,
      confirmButtonColor: danger ? Button.Colors.RED : Button.Colors.BRAND_NEW,
      children: React.createElement(type, {
        placeholder,
        value,
        onChange: (value) => setValue(value)
      })
    })
  }

  window.DrApi.modals = {
    open(content, id) {
      id ??= `DrApi-Modal-${_id++}`

      openModal(content, { modalKey: id })

      return () => closeModal(id)
    },
    close: (id) => closeModal(id),
    alert: (title, content, opts = {}) => {
      const { confirmText = Messages.OKAY, onConfirm } = opts
      
      openModal((props) => React.createElement(Alert, {
        ...props,
        title: title,
        confirmText,
        onConfirm,
        body: makeContent(content)
      }))
    },
    prompt: (title, opts = {}) => {
      const { danger = false, placeholder = "", defaultText = "", large = false } = opts

      const type = large ? TextArea : TextInput

      return new Promise((resolve) => {
        openModal(props => {
          if (props.transitionState === 3) resolve(null)
          return React.createElement(Prompt, {
            props,
            danger,
            title,
            resolve,
            placeholder,
            defaultText,
            type
          })
        })
      })
    },
    confirmModal: (title, content, opts = {}) => {
      const { cancelText = Messages.CANCEL, confirmText = Messages.OKAY, danger = false, onConfirm, onCancel } = opts

      openModal((props) => React.createElement(ConfirmModal, {
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
