import webpack from "./webpack"
import Patcher from "./patcher"
import storage from "../storage"
import logger from "./logger"

export default async (React) => {
  const Shakeable = await webpack.getModuleByDisplayNameAsync("Shakeable", true)
  logger.log("Notifications", "Patching 'Shakeable' to add notifications")

  const Button = webpack.getModuleByProps("ButtonColors", "ButtonSizes").default
  const Flex = webpack.getModuleByDisplayName("Flex", true)
  const { Heading } = webpack.getModuleByProps("Heading")
  const Close = webpack.getModuleByDisplayName("Close", true)
  const Clickable = webpack.getModuleByDisplayName("Clickable", true)
  const renderMessageMarkup = webpack.getModuleByProps("renderMessageMarkupToAST").default

  const { useSpring, animated } = webpack.getModuleByProps("useSpring", "animated")

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

  function Toast({ title, content, icon, buttons = [], hideToast, id, type = "", duration = Infinity }) {
    const [ blur ] = storage.useStorage("internal", "notificationBlur", 0)
    const [ opacity ] = storage.useStorage("internal", "notificationOpacity", 80)
    const [ showAlert ] = storage.useStorage("internal", "notificationShowAlert", false)

    const Ref = React.useRef()

    const { width } = useSpring({
      from: { width: 0 },
      width: 0, 
      config: { duration: isFinite(duration) ? duration : undefined }
    })

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

    React.useEffect(() => {
      if (!isFinite(duration)) return
      width.start({
        to: Ref.current.offsetWidth,
        onRest: () => hideToast(true)
      })
    })

    return React.createElement("div", {
      className: "dr-toast",
      id,
      ref: Ref,
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
                onContextMenu: (event) => {
                  if (showAlert) return DrApi.modals.confirmModal("Close all toasts", [
                    "Are you sure you want to close every toast?"
                  ], {
                    danger: true,
                    confirmText: "Close All",
                    onConfirm: () => {
                      for (let index = DrApi.toast.toasts.length; index > 0; index--) 
                        DrApi.toast.toasts[index - 1].hideToast(event)
                    }
                  })
                  
                  for (let index = DrApi.toast.toasts.length; index > 0; index--) 
                    DrApi.toast.toasts[index - 1].hideToast(event)
                },
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
        }) : false,
        React.createElement(animated.div, { 
          className: "dr-toast-slider", 
          style: { width } 
        })
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
        toasts,
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