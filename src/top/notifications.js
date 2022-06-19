const webpack = require("./webpack")
const Patcher = require("./patcher")
const storage = require("../storage")
const styles = require("./styles")

module.exports = async (React) => {
  styles("DrApi-Toasts", `#dr-toasts {
    position: fixed;
    z-index: 1000;
    overflow-y: overlay;
    padding: 0 8px 0 0;
  } #dr-toasts[location="bottomLeft"] {
    display: flex;
    flex-direction: column-reverse;
  } #dr-toasts[location="bottomRight"] {
    display: flex;
    flex-direction: column-reverse;
  } #dr-toasts:empty {
    display: none !important
  } #dr-toasts .dr-toast[type="info"] .dr-toast-title > :first-child {
    color: var(--info-help-foreground)
  }  #dr-toasts .dr-toast[type="success"] .dr-toast-title > :first-child {
    color: var(--text-positive)
  } #dr-toasts .dr-toast[type^="warn"] .dr-toast-title > :first-child {
    color: var(--info-warning-foreground)
  } #dr-toasts .dr-toast[type="danger"] .dr-toast-title > :first-child,
  #dr-toasts .dr-toast[type="error"] .dr-toast-title > :first-child {
    color: var(--status-danger)
  } #dr-toasts .dr-toast {
    padding: 10px;
    margin-top: 6px;
    min-width: 200px;
    position: relative;
  } .dr-toast-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: var(--background-tertiary);
    border-radius: 6px;
    z-index: -1;
  } #dr-toasts .dr-toast-title:not(:last-child) {
    margin-bottom: 6px;
  } #dr-toasts .dr-toast-icon {
    width: 24px;
    height: 24px;
    color: var(--text-normal);
  } #dr-toasts .dr-toast-icon + h3 {
    padding-top: 1px
  } #dr-toasts .dr-toast-close {
    color: var(--interactive-normal);
    padding-top: 2px;
    cursor: pointer
  } #dr-toasts .dr-toast-close:hover {
    color: var(--interactive-hover);
  } #dr-toasts .dr-toast-close:active {
    color: var(--interactive-active);
  } #dr-toasts .dr-toast-content:not(:last-child) {
    margin-bottom: 6px;
  } #dr-toasts .dr-toast-content {
    color: var(--text-normal);
    padding: 6px;
    background: var(--background-secondary);
    border-radius: 4px;
    user-select: text
  }`)

  const Shakeable = await webpack.getModuleByDisplayNameAsync("Shakeable", true)

  const Button = webpack.getModuleByProps("ButtonColors", "ButtonSizes").default
  const Flex = webpack.getModuleByDisplayName("Flex", true)
  const { Heading } = webpack.getModuleByProps("Heading")
  const Close = webpack.getModuleByDisplayName("Close", true)
  const Clickable = webpack.getModuleByDisplayName("Clickable", true)
  const renderMessageMarkup = webpack.getModuleByProps("renderMessageMarkupToAST").default

  const { thin, fade } = webpack.getModuleByProps("thin", "fade")
  const { scroller } = webpack.getModuleByProps("scroller")

  function toastContent(content) {
    if (!Array.isArray(content)) content = [content]
    return content.map(con => typeof con === "string" ? (() => {
      const { content } = renderMessageMarkup({ content: " *s* " + con })
      content.shift()
      content.shift()
      return content
    })() : con)
  }

  function Toast({ title, content, icon, buttons = [], hideToast, id, type = "" }) {
    const [blur] = storage.useStorage("internal", "notificationBlur", 0)
    const [opacity] = storage.useStorage("internal", "notificationOpacity", 80)

    buttons = buttons.map(button => {
      return React.createElement(Flex.Child, {
        children: React.createElement(Button, {
          children: button.content,
          size: button.size ? Button.Sizes[Object.keys(Button.Sizes).find(size => size.toLowerCase() === button.size.toLowerCase())] : Button.Sizes.SMALL,
          color: button.color ? Button.Colors[Object.keys(Button.Colors).find(color => color.toLowerCase() === button.color.toLowerCase())] : undefined,
          borderColor: button.borderColor ? Button.BorderColors[Object.keys(Button.BorderColors).find(borderColor => borderColor.toLowerCase() === button.borderColor.toLowerCase())] : undefined,
          hover: button.hover ? Button.Hovers[Object.keys(Button.Hovers).find(hover => hover.toLowerCase() === button.hover.toLowerCase())] : undefined,
          look: button.look ? Button.Looks[Object.keys(Button.Looks).find(look => look.toLowerCase() === button.look.toLowerCase())] : undefined,
          onClick: button.onClick ? (event) => {
            button.onClick(hideToast, event)
          } : undefined
        })
      })
    })

    return React.createElement("div", {
      className: "dr-toast",
      id,
      type: type.toLowerCase(),
      children: [
        React.createElement("div", {
          className: "dr-toast-background",
          style: {
            filter: `blur(${blur}px)`,
            opacity: opacity / 100
          }
        }),
        React.createElement(Flex, {
          className: "dr-toast-title",
          children: [
            icon ? React.createElement(Flex.Child, {
              grow: 0,
              className: "dr-toast-icon",
              children: icon
            }) : false,
            React.createElement(Flex.Child, {
              children: React.createElement(Heading, {
                level: 3,
                variant: "heading-md/medium",
                children: title 
              })
            }),
            React.createElement(Flex.Child, {
              grow: 0,
              children: React.createElement(Clickable, {
                className: "dr-toast-close",
                onClick: (event) => hideToast(event),
                children: React.createElement(Close, {
                  width: 18,
                  height: 18
                })
              })
            })
          ]
        }),
        content ? React.createElement("div", {
          className: "dr-toast-content",
          children: toastContent(content) 
        }) : false,
        buttons.length ? React.createElement(Flex, {
          className: "dr-toast-buttons",
          children: buttons 
        }) : false
      ]
    })
  }

  let toastId = 0

  function Toasts() {
    const [location] = storage.useStorage("internal", "notificationLocation", "topRight")
    const [positionX] = storage.useStorage("internal", "notificationPositionX", 20)
    const [positionY] = storage.useStorage("internal", "notificationPositionY", 20)
    const [maxHeight] = storage.useStorage("internal", "notificationMaxHeight", 30)
    const [toasts, setToasts] = React.useState([])
    
    React.useEffect(() => {
      DrApi.toast = {
        delete(id) {
          const toast = toasts.find(t => t.id === id)
          const index = toasts.indexOf(toast)
          if (index === -1) return
          toasts.splice(index, 1)
          setToasts([...toasts])
        },
        show(toast) {
          toast.id ??= `toast-id-${toastId}`
          toastId++
          toast.hideToast = (event) => {
            DrApi.toast.delete(toast.id)
            if (toast.onClose) toast.onClose(event)
          }
          setToasts(toasts.concat(toast))
          return () => toast.hideToast()
        }
      }
    })

    return React.createElement("div", {
      location,
      id: "dr-toasts",
      style: {
        left: (location === "topLeft" || location === "bottomLeft") ? positionX : undefined,
        right: (location === "topRight" || location === "bottomRight") ? positionX : undefined,
        top: (location === "topRight" || location === "topLeft") ? positionY : undefined,
        bottom: (location === "bottomRight" || location === "bottomLeft") ? positionY : undefined,
        maxHeight: `${maxHeight}%`
      },
      className: `${thin} ${scroller} ${fade}`,
      children: location === "disabled" ? null : toasts.map(toast => React.createElement(Toast, toast))
    })
  }

  Patcher.after("DrApi", Shakeable.prototype, "render", (that, args, res) => {
    if (res.props.children.find(child => child.type === Toasts)) return
    res.props.children.push(React.createElement(Toasts))
  })
}