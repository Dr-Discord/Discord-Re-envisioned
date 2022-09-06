import patcher from "./patcher"
import webpack from "./webpack"
import storage from "../storage"
import { customCSS } from "./styles"
import { getThemes, toggleTheme, parseTheme, isTheme, isSplash } from "./themes"
import { getPlugins, togglePlugin } from "./plugins"
import logger from "./logger"

const shell = DrApiNative.runInNative(`require("electron").shell`)

export default async (React) => {
  const SettingsView = await webpack.getModuleByDisplayNameAsync("SettingsView", true)
  logger.log("Settings", "Patching 'getPredicateSections' to add settings")

  const [
    NotificationSettings,
    FormSection,
    SwitchItem,
    Card,
    Flex,
    Clickable,
    FormDivider,
    Caret,
    Mail,
    LegacyHeader,
    FormItem,
    Slider,
    { Text },
    { Messages },
    Switch,
    SearchBar,
    Folder,
    OverflowMenu,
    { Icon },
    { default: Menu, MenuItem, MenuSeparator },
    Popout,
    Filter,
    Trash,
    Globe,
    Discord,
    InlineCode,
    WalletIcon,
    Ticket,
    DoubleStarIcon,
    Creative,
    SortIcon,
    OsMac,
    Retry,
    Gear,
    Pencil,
    Monitor,
    Alert,
    InfoFilled,
    Tooltip,
    Anchor,
    FormText,
    TextInput,
    { openContextMenu, closeContextMenu },
    { ModalRoot, ModalHeader, ModalCloseButton, ModalContent, ModalFooter, ModalSize },
    { Heading },
    Button,
    { openUserProfileModal },
    renderMessageMarkup,
    { getUser: fetchUser },
    { getUser, findByTag },
    PopoutWindow,
    dispatcher,
    PopoutWindowStore,
    { useStateFromStores },
    { SingleSelect },
    isWhat,
    { date, container, footer, added, fixed, improved, marginTop, socialLink },
    { content, modal },
    { horizontal },
    { header, topDivider, body, expandIcon },
    { iconWrapper, wrapper, secondaryHeader },
    { justifyCenter, alignCenter, justifyBetween, justifyEnd },
    { card },
    { size16, size20 },
    { icon:iconToolbar },
    { icon:iconMenu },
    { line },
    { search },
    { macDragRegion },
    { marginBottom8 },
    { container:formContainer, dividerDefault },
    { emptyResultsText, noResultsImage, emptyResultsWrap, emptyResultsContent, alt },
    { ROLE_COLORS }
  ] = DrApi.webpack.getBulk({
    filter: (m) => m.displayName === "NotificationSettings", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "FormSection", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "SwitchItem", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Card", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Flex", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Clickable", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "FormDivider", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Caret", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Mail", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "LegacyHeader", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "FormItem", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Slider", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.Text.displayName
  }, {
    filter: (m) => m._events.locale instanceof Array,
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Switch", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "SearchBar", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Folder", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "OverflowMenu", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: m => m.Icon && m.displayName === "HeaderBar",
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Menu", 
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Popout", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Filter", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Trash", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Globe", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Discord", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "InlineCode", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "WalletIcon", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Ticket", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "DoubleStarIcon", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Creative", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "SortIcon", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "OsMac", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Retry", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Gear", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Pencil", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Monitor", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Alert" && m.toString().includes(".cancelText"), 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "InfoFilled", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Tooltip", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "Anchor", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "FormText", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.displayName === "TextInput", 
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.openContextMenuLazy
  }, {
    filter: (m) => m.ModalRoot && m.ModalContent
  }, {
    filter: (m) => m.Heading.displayName
  }, {
    filter: (m) => m.ButtonColors && m.ButtonSizes, 
    defaultExport: true
  }, {
    filter: (m) => m.openUserProfileModal
  }, {
    filter: (m) => m.renderMessageMarkupToAST,
    defaultExport: true
  }, {
    filter: (m) => m.getUser
  }, {
    filter: (m) => m.getUser && m.findByTag,
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.toString().indexOf("DndProvider") > -1 && DrApi.React.isValidElement(m()),
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.subscribe && m.dispatch,
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.getIsAlwaysOnTop && m.getWindow,
    defaultExport: true,
    searchInDefault: true
  }, {
    filter: (m) => m.useStateFromStores
  }, {
    filter: (m) => m.SingleSelect
  }, {
    filter: (m) => m.isWindows && m.isOSX
  }, {
    filter: (m) => m.date && m.premiumIcon && m.improved
  }, {
    filter: (m) => m.content && m.modal && m.maxModalWidth
  }, {
    filter: (m) => m.flexChild && m.horizontal
  }, {
    filter: (m) => m.header && m.topDivider
  }, {
    filter: (m) => m.detailsWrapper && m.icon && m.iconWrapper
  }, {
    filter: (m) => m.justifyCenter && m.alignCenter
  }, {
    filter: (m) => m.card && m.pulse && m.topDivider
  }, {
    filter: (m) => m.size20 && m.size16
  }, {
    filter: (m) => m.icon && m.transparent && m.iconWrapper
  }, {
    filter: (m) => m.colorPremium && m.icon
  }, {
    filter: (m) => m.line && m.versionHash
  }, {
    filter: (m) => m.search && m.toolbar
  }, {
    filter: (m) => m.macDragRegion
  }, {
    filter: (m) => m.marginBottom8 && m.marginBottom4
  }, {
    filter: (m) => m.container && m.dividerDefault
  }, {
    filter: (m) => m.stillIndexing && m.noResults
  }, {
    filter: (m) => m.ROLE_COLORS
  })

  const types = { added, fixed, improved }

  const editorThemes = [
    "ambiance",
    "chaos",
    "chrome",
    "clouds",
    "clouds_midnight",
    "cobalt",
    "crimson_editor",
    "dawn",
    "dracula",
    "dreamweaver",
    "eclipse",
    "github",
    "gob",
    "gruvbox",
    "monokai",
    "nord_dark",
    "one_dark",
    "pastel_on_dark",
    "solarized_dark",
    "solarized_light",
    "sqlserver",
    "terminal",
    "textmate",
    "tomorrow",
    "twilight",
    "vibrant_ink",
    "xcode"
  ]

  const demoToastObj = {
    id: "toastDemo",
    title: "Demo",
    icon: React.createElement(Mail),
    content: "This is a demo Toast.",
    onClose: () => setTimeout(() => DrApi.toast.show(demoToastObj), 500),
    duration: 5e3,
    buttons: [{
      content: "Button",
      onClick: () => {}
    }]
  }

  function Category({
    content,
    title,
    subTitle,
    id,
    icon,
    open = false
  }) {
    const [ isOpen, setOpen ] = React.useState(open)

    React.useEffect(() => {
      if (id === "notifications" && isOpen) DrApi.toast.show(demoToastObj)
      return () => id === "notifications" && DrApi.toast.delete(demoToastObj.id)
    })
    
    return React.createElement(Card, {
      ...Card.defaultProps,
      editable: true,
      className: card,
      children: React.createElement(Flex, {
        direction: Flex.Direction.VERTICAL,
        children: [
          React.createElement(Clickable, {
            className: header,
            onClick: () => {
              setOpen(!isOpen)
              if (id === "notifications")
                if (isOpen) DrApi.toast.delete(demoToastObj.id)
                else DrApi.toast.show(demoToastObj)
            },
            children: React.createElement(Flex, {
              align: alignCenter,
              children: [
                React.createElement(Flex, {
                  justify: justifyCenter,
                  className: wrapper,
                  children: [
                    React.createElement(Flex.Child, {
                      children: React.createElement("div", {
                        children: React.createElement(icon, {
                          className: "dr-catorgory-icon",
                          width: 32,
                          height: 32
                        })
                      }),
                      className: iconWrapper,
                      grow: 0
                    }),
                    React.createElement(Flex, {
                      direction: Flex.Direction.VERTICAL,
                      children: [
                        React.createElement(LegacyHeader, {
                          children: title,
                          className: secondaryHeader,
                          size: size16,
                          tag: "h3"
                        }),
                        subTitle ? React.createElement(Text, {
                          children: subTitle,
                          color: "header-secondary",
                          variant: "text-xs/normal"
                        }) : false
                      ]
                    })
                  ]
                }),
                React.createElement(Caret, {
                  expanded: isOpen,
                  className: expandIcon
                })
              ]
            })
          }),
          isOpen ? React.createElement("div", {
            className: body,
            children: [
              React.createElement(FormDivider, {
                className: topDivider
              }),
              content
            ]
          }) : false
        ]
      })
    })
  }

  function Settings() {
    const [ newMacOS, setNewMacOS ] = storage.useStorage("internal", "newMacOS", true)
    const [ transparency, setTransparency ] = storage.useStorage("internal", "transparency", false)
    const [ position, setPosition ] = storage.useStorage("internal", "notificationLocation", NotificationSettings.Positions.TOP_RIGHT)
    const [ positionX, setPositionX ] = storage.useStorage("internal", "notificationPositionX", 20)
    const [ positionY, setPositionY ] = storage.useStorage("internal", "notificationPositionY", 20)
    const [ maxHeight, setMaxHeight ] = storage.useStorage("internal", "notificationMaxHeight", 30)
    const [ blur, setBlur ] = storage.useStorage("internal", "notificationBlur", 0)
    const [ opacity, setOpacity ] = storage.useStorage("internal", "notificationOpacity", 80)
    const [ showAlert, setShowAlert ] = storage.useStorage("internal", "notificationShowAlert", false)
    const [ aceTheme, setAceTheme ] = storage.useStorage("internal", "aceTheme", "monokai")
    const [ aceDetect, setAceDetect ] = storage.useStorage("internal", "aceDetectTitlebarColor", true)

    return React.createElement(FormSection, {
      title: "Settings",
      tag: FormSection.Tags.H1,
      children: [
        React.createElement(Category, {
          title: "Notifictions",
          subTitle: "Customize the notifications inside the app",
          id: "notifications",
          icon: (props) => React.createElement(Mail, props),
          content: [
            React.createElement(FormItem, {
              title: Messages.FORM_LABEL_NOTIFICATION_POSITION,
              children: React.createElement("div", {
                id: "dr-notification-position",
                children: React.createElement(NotificationSettings, {
                  position,
                  onChange: (e, val) => {
                    setPosition(val)
                    storage.setData("internal", "notificationLocation", val)
                  }
                })
              })
            }),
            React.createElement(FormDivider, {
              className: topDivider
            }),
            React.createElement(FormItem, {
              title: "Positioning",
              disabled: position === "disabled",
              children: React.createElement(Flex, {
                className: "dr-notification-sliders",
                children: [
                  React.createElement(Flex.Child, {
                    children: React.createElement(Slider, {
                      disabled: position === "disabled",
                      maxValue: 500,
                      minValue: 0,
                      markers: Array.from({ length: 11 }, (_, i) => i * 50),
                      onValueChange: (val) => {
                        const round = Math.round(val)
                        if (round === positionX) return 
                        setPositionX(round)
                      },
                      onValueRender: (val) => `${Math.round(val)}px`,
                      initialValue: positionX
                    })
                  }),
                  React.createElement(Flex.Child, {
                    children: React.createElement(Slider, {
                      disabled: position === "disabled",
                      maxValue: 500,
                      minValue: 0,
                      markers: Array.from({ length: 11 }, (_, i) => i * 50),
                      onValueChange: (val) => {
                        const round = Math.round(val)
                        if (round === positionY) return 
                        setPositionY(round)
                      },
                      onValueRender: (val) => `${Math.round(val)}px`,
                      initialValue: positionY
                    })
                  }),
                ]
              })
            }),
            React.createElement(FormDivider, {
              className: topDivider
            }),
            React.createElement(FormItem, {
              title: "Max Height",
              disabled: position === "disabled",
              children: React.createElement(Slider, {
                disabled: position === "disabled",
                maxValue: 100,
                minValue: 0,
                markers: Array.from({ length: 11 }, (_, i) => i * 10),
                onValueChange: (val) => setMaxHeight(Math.round(val)),
                onValueRender: (val) => `${Math.round(val)}%`,
                initialValue: maxHeight
              })
            }),
            React.createElement(FormDivider, {
              className: topDivider
            }),
            React.createElement(FormItem, {
              title: "Opacity",
              disabled: position === "disabled",
              children: React.createElement(Slider, {
                disabled: position === "disabled",
                maxValue: 100,
                minValue: 0,
                markers: Array.from({ length: 11 }, (_, i) => i * 10),
                onValueChange: (val) => setOpacity(Math.round(val)),
                onValueRender: (val) => `${Math.round(val)}%`,
                initialValue: opacity
              }),
            }),
            React.createElement(FormItem, {
              title: "Blur",
              disabled: position === "disabled",
              children: React.createElement(Slider, {
                disabled: position === "disabled",
                maxValue: 20,
                minValue: 0,
                markers: Array.from({ length: 11 }, (_, i) => i * 2),
                onValueChange: (val) => setBlur(Math.round(val)),
                onValueRender: (val) => `${Math.round(val)}px`,
                initialValue: blur
              })
            }),
            React.createElement(FormDivider, {
              className: topDivider
            }),
            React.createElement(FormItem, {
              disabled: position === "disabled",
              children: React.createElement(SwitchItem, {
                children: "Alert on close all",
                note: "Creates a prompt when closing all notifications.",
                disabled: position === "disabled",
                onChange: (val) => setShowAlert(val),
                value: showAlert
              })
            })
          ]
        }),
        React.createElement(Category, {
          title: "Custom CSS",
          subTitle: "Customize the custom css editor",
          id: "customCSS",
          icon: (props) => React.createElement(Pencil, props),
          content: [
            React.createElement(FormItem, {
              title: "Theme",
              children: React.createElement(SingleSelect, {
                className: marginBottom8,
                onChange: (theme) => setAceTheme(theme),
                options: editorThemes.map(theme => ({ label: window._ ? window._.startCase(theme) : theme, value: theme })),
                value: aceTheme
              })
            }),
            React.createElement(FormDivider, {
              className: topDivider
            }),
            React.createElement(SwitchItem, {
              value: aceDetect,
              children: "Detect app titlebar color",
              note: "Detects the apps titlebar color and applies it to the custom css titlebar.",
              onChange: (val) => setAceDetect(val)
            })
          ]
        }),
        React.createElement(Category, {
          title: "App",
          subTitle: "Customize the Main app.",
          id: "app",
          icon: (props) => React.createElement(Monitor, props),
          content: [
            React.createElement(SwitchItem, {
              value: transparency,
              children: [
                "Transparency",
                React.createElement(Tooltip, {
                  text: "Reloading is needed",
                  children: (props) => React.createElement(Retry, {
                    onMouseEnter: props.onMouseEnter,
                    onMouseLeave: props.onMouseLeave,
                    width: 18, 
                    height: 18,
                    style: {
                      marginLeft: 4,
                      transform: "translateY(2px) rotate(180deg)"
                    }
                  })
                })
              ],
              note: "Make Discord transparent. Warning this will break window snapping.",
              onChange: (value) => {
                DrApi.modals.confirmModal("Restart Discord?", [
                  "To toggle transparency you need to restart Discord."
                ], {
                  onConfirm() {
                    DrApiNative.quit(true)
                    setTransparency(value)
                  },
                  confirmText: "Restart",
                  danger: true
                })
              }
            }),
            React.createElement(SwitchItem, {
              value: newMacOS,
              children: [
                React.createElement(Tooltip, {
                  text: "MacOS only",
                  children: (props) => React.createElement(OsMac, {
                    onMouseEnter: props.onMouseEnter,
                    onMouseLeave: props.onMouseLeave,
                    width: 18, 
                    height: 18,
                    style: {
                      marginRight: 4,
                      transform: "translateY(3px)"
                    }
                  })
                }),
                "New MacOS Titlebar Style",
                React.createElement(Tooltip, {
                  text: "Reloading is needed",
                  children: (props) => React.createElement(Retry, {
                    onMouseEnter: props.onMouseEnter,
                    onMouseLeave: props.onMouseLeave,
                    width: 18, 
                    height: 18,
                    style: {
                      marginLeft: 4,
                      transform: "translateY(3px) rotate(180deg)"
                    }
                  })
                })
              ],
              note: "Use Electrons titlebar or Discords titlebar.",
              disabled: !(DrApiNative.platform === "darwin"),
              onChange: (value) => {
                DrApi.modals.confirmModal("Restart Discord?", [
                  `To use ${value ? "new" : "old"} MacOS titlebar style you need to restart Discord.`
                ], {
                  onConfirm() {
                    DrApiNative.quit(true)
                    setNewMacOS(value)
                  },
                  confirmText: "Restart",
                  danger: true
                })
              }
            })
          ]
        })
      ]
    })
  }

  const promisedUsers = {}
  function useUser(author, userId) {
    const [ user, setUser ] = React.useState(getUser(userId))

    React.useEffect(() => {
      void async function() {
        if (user || !author) return
        if (typeof userId === "string") {
          if (promisedUsers[userId]) return setUser(await promisedUsers[userId])
          promisedUsers[userId] = fetchUser(userId)
          return setUser(await promisedUsers[userId])
        }
        const spl = author.split("#")
        const found = findByTag(spl[0], spl[1])
        if (found) setUser(found)
        else setUser({ username: spl[0], discriminator: spl[1] })
      }()
    })

    return user
  }

  function AddonAuthor({ author, userId, authorLink }) {
    const user = useUser(author, userId)
    
    return [
      user?.getAvatarURL ? React.createElement("img", {
        src: user.getAvatarURL(false, undefined, true),
        width: 24,
        height: 24,
        className: "dr-addon-avatar",
        onClick: () => openUserProfileModal({ userId: user?.id }),
      }) : false,
      React.createElement(LegacyHeader, {
        children: user?.username ?? author,
        className: secondaryHeader,
        size: size16,
        style: authorLink ? { cursor: "pointer" } : undefined,
        onClick: authorLink ? () => shell.openExternal(authorLink) : undefined,
        tag: "h3"
      }),
      user?.discriminator ? React.createElement(Text, {
        style: {
          paddingTop: user?.getAvatarURL ? 4 : 1,
          marginLeft: 4
        },
        children: ["#", user.discriminator],
        color: "header-secondary",
        variant: "text-sm/normal"
      }) : false
    ]
  }

  let ColorPicker = () => false
  // Weird bug
  if (webpack.instance) webpack.instance.e("36623").then(() => ColorPicker = webpack.instance("593642").default)
    
  function makeThemeSettings(addon, settings) {
    return React.createElement(() => {
      const result = []
      
      for (const [ key, value ] of Object.entries(settings)) {
        const [ data, setData ] = storage.useStorage(`${addon.name}.theme`, key, value.initial)

        let content = React.createElement("div", { style: { color: "var(--text-danger)" } }, `ERROR: UNKNOWN TYPE '${value.type}'`)
        const type = value.type.toLowerCase()

        if (type === "color") content = React.createElement(ColorPicker, {
          colors: ROLE_COLORS,
          defaultColor: value.initial,
          onChange: (val) => setData(val),
          value: data
        })
        else if (type === "text") {
          const [ danger, setDanger] = React.useState(false)
          React.useEffect(() => value.regex && setDanger(!value.regex.test(data)))

          content = React.createElement(TextInput, {
            size: value.size,
            placeholder: value.placeholder,
            value: data,
            style: danger ? {
              border: "1px solid var(--status-danger)"
            } : {
              border: "1px solid var(--status-positive)"
            },
            onChange: (val) => {
              if (value.regex) setDanger(!value.regex.test(val))
              setData(val)
            }
          })
        }
        else if (type === "switch") {
          result.push(React.createElement(SwitchItem, {
            value: JSON.parse(String(data)),
            note: value.note,
            children: value.name,
            onChange: (val) => setData(val)
          }))
          continue
        } 
        else if (type === "slider") {
          content = React.createElement(Slider, {
            maxValue: value.max ? Number(value.max) : 100,
            minValue: value.min ? Number(value.min) : 0,
            markers: Array.from({ length: value.markers ? Number(value.markers) + 1 : 6}, (_, i) => i * (value.max ? Number(value.max) : 100) / (value.markers ? Number(value.markers) : 5)),
            onValueChange: (val) => setData(Math.round(val)),
            onValueRender: (val) => `${Math.round(val)}${value.sizing ?? "px"}`,
            onMarkerRender: (val) => `${val}${value.sizing ?? "px"}`,
            defaultValue: value.default ? Number(value.default) : 20,
            initialValue: Number(data)
          })
        }

        result.push(React.createElement(FormItem, {
          title: [
            value.regex ? React.createElement(Tooltip, {
              text: String(value.regex),
              children: (props) => React.createElement(InfoFilled, {
                onMouseEnter: props.onMouseEnter,
                onMouseLeave: props.onMouseLeave,
                style: {
                  marginRight: 4,
                  transform: "translatey(3px)"
                }
              })
            }) : false,
            value.name
          ],
          className: formContainer,
          children: [
            value.note ? React.createElement(FormText, {
              type: FormText.Types.DESCRIPTION,
              className: marginBottom8,
              children: value.note,
              style: type === "color" ? undefined : {
                width: "calc(50% - 9px)",
                overflowWrap: "break-word"
              }
            }) : false,
            React.createElement("div", {
              style: type === "color" ? undefined : {
                position: "absolute",
                right: 10,
                width: "calc(50% - 9px)"
              }
            }, content),
            React.createElement(FormDivider, { className: dividerDefault })
          ]
        }))
      }

      return [
        React.createElement(FormItem, {
          title: "Update Settings",
          className: formContainer,
          children: [
            React.createElement(FormText, {
              type: FormText.Types.DESCRIPTION,
              className: marginBottom8,
              children: "Update the Settings on your theme. Reloading will also update the theme."
            }),
            React.createElement(Button, {
              children: "Update",
              style: {
                position: "absolute",
                right: 10
              },
              onClick: () => document.querySelector(`[dr-theme=${JSON.stringify(addon.name)}]`).innerHTML = parseTheme(addon.originalCSS).css
            }),
            React.createElement(FormDivider, { className: dividerDefault })
          ]
        }),
        result
      ]
    })
  }

  function showAddonSettings(addon, settings, size) {
    if (isTheme(addon.filePath)) settings = makeThemeSettings(addon, settings)

    DrApi.modals.open((props) => React.createElement(ModalRoot, {
      ...props,
      [`dr-${isTheme(addon.filePath) ? "theme" : "plugin"}`]: addon.name,
      size: ModalSize[size.toUpperCase()],
      children: [
        React.createElement(ModalHeader, {
          separator: false,
          align: justifyBetween,
          children: [
            React.createElement(Flex.Child, {
              children: [
                React.createElement(Heading, {
                  children: addon.name,
                  level: 2,
                  variant: "heading-lg/medium"
                }),
                React.createElement(Text, {
                  children: ["v", addon.version],
                  className: date,
                  variant: "text-xs/normal"
                })
              ]
            }),
            React.createElement(Flex.Child, {
              grow: 0,
              children: React.createElement(ModalCloseButton, { onClick: props.onClose })
            })
          ]
        }),
        React.createElement(ModalContent, {}, settings)
      ]
    }))
  }

  function AddonCard(addon) {
    const [ enabledAddons, setEnabledAddons ] = storage.useStorage("internal", isTheme(addon.filePath) ? "enabledThemes" : isSplash(addon.filePath) ? "enabledSplashThemes" : "enabledPlugins", [])

    const isEnabled = storage.getData("internal", isTheme(addon.filePath) ? "enabledThemes" : isSplash(addon.filePath) ? "enabledSplashThemes" : "enabledPlugins", []).includes(addon.name)

    return React.createElement(Card, {
      ...Card.defaultProps,
      editable: true,
      className: card,
      key: `dr-addon-${addon.name}${isSplash(addon.filePath) ? "-splash" : ""}`,
      onContextMenu: (event) => openContextMenu(event, event => React.createElement(AddonContextMenu, { event, addon })),
      children: React.createElement("div", {
        className: header,
        style: { cursor: "default" },
        children: [
          React.createElement(Flex, {
            align: alignCenter,
            children: [
              React.createElement(Flex, {
                direction: Flex.Direction.VERTICAL,
                children: [
                  React.createElement(Flex, {
                    style: { marginBottom: 4 },
                    children: [
                      React.createElement(Tooltip, {
                        text: isTheme(addon.filePath) ? "Theme" : isSplash(addon.filePath) ? "Splash Theme" : "Plugin",
                        children: (props) => React.createElement(isTheme(addon.filePath) ? Creative : isSplash(addon.filePath) ? DoubleStarIcon : InlineCode, { 
                          className: iconToolbar, 
                          style: { marginRight: 8 }, 
                          onMouseEnter: props.onMouseEnter,
                          onMouseLeave: props.onMouseLeave
                        })
                      }),
                      React.createElement(LegacyHeader, {
                        children: addon.name,
                        className: secondaryHeader,
                        size: size20,
                        tag: "h3"
                      }),
                      React.createElement(Text, {
                        style: {
                          paddingTop: 5,
                          marginLeft: 4
                        },
                        children: ["v", addon.version ?? "???"],
                        color: "header-secondary",
                        variant: "text-sm/normal"
                      }),
                      addon.beta ? React.createElement("span", {
                        className: "dr-addon-version-beta",
                        children: React.createElement("span", {
                          children: "beta"
                        })
                      }) : false,
                      addon.alpha ? React.createElement("span", {
                        className: "dr-addon-version-alpha",
                        children: React.createElement("span", {
                          children: "alpha"
                        })
                      }) : false
                    ]
                  }),
                  React.createElement(Flex, {
                    style: { marginBottom: 6 },
                    children: React.createElement(AddonAuthor, { userId: addon.authorid, author: addon.author, authorLink: addon.authorlink })
                  })
                ]
              }),
              React.createElement(Flex, {
                grow: 0,
                children: addon.didError ? React.createElement(Tooltip, {
                  text: "An error accord",
                  children: (props) => React.createElement(Alert, {
                    width: 24,
                    height: 24,
                    style: { color: "var(--status-danger)" },
                    onMouseEnter: props.onMouseEnter,
                    onMouseLeave: props.onMouseLeave
                  })
                }) : [
                  (addon.settings || addon.exports?.onSettings) ? React.createElement(Clickable, {
                    className: `dr-addon-gear${isEnabled ? "" : " disabled"}`,
                    onClick: () => {
                      if (!isEnabled) return
                      if (addon.exports?.onSettings) {
                        const data = {
                          defaultPrevented: false,
                          preventDefault: () => data.defaultPrevented = true,
                          size: "MEDIUM",
                          setSize: (size = "MEDIUM") => data.size = size,
                          showAddonSettings: () => showAddonSettings(addon, settings, data.size)
                        }

                        const settings = addon.exports?.onSettings(data)
                        if (data.defaultPrevented) return

                        return data.showAddonSettings()
                      }
                      showAddonSettings(addon, addon.settings, "MEDIUM")
                    },
                    children: React.createElement(Gear)
                  }) : false,
                  React.createElement(Switch, {
                    checked: isEnabled,
                    onChange: (val) => {
                      if (val) enabledAddons.push(addon.name)
                      else {
                        const i = enabledAddons.indexOf(addon.name)
                        if (i === -1) return
                        enabledAddons.splice(i, 1)
                      }
    
                      DrApi.toast.show({
                        title: `${val ? "Enabled" : "Disabled"} '${addon.name}'`,
                        type: "info",
                        icon: React.createElement(isTheme(addon.filePath) ? Creative : isSplash(addon.filePath) ? DoubleStarIcon : InlineCode),
                        duration: 4000
                      })
    
                      setEnabledAddons([...enabledAddons])
    
                      if (isTheme(addon.filePath)) toggleTheme(addon.name, val)
                      else if (addon.filePath.endsWith(".script.js")) togglePlugin(addon.name)
                    }
                  })
                ]
              })
            ]
          }),
          addon.description ? React.createElement("div", {
            style: { color: "var(--text-normal)" }
          }, (() => {
            const { content } = renderMessageMarkup({ content: " *s* " + addon.description })
            content.shift()
            content.shift()
            return content
          })()) : false
        ]
      })
    })
  }

  function AddonContextMenu({ event, addon }) {
    const links = [
      addon.website ? React.createElement(MenuItem, {
        id: "website-addon",
        label: "Website",
        icon: () => React.createElement(Globe, { className: iconMenu }),
        action: () => shell.openExternal(addon.website)
      }) : false,
      addon.invite ? React.createElement(MenuItem, {
        id: "invite-addon",
        label: "Invite",
        icon: () => React.createElement(Discord, { className: iconMenu }),
        action: () => shell.openExternal(`https://discord.gg/${addon.invite.split("/").pop()}`)
      }) : false,
      addon.source ? React.createElement(MenuItem, {
        id: "source-addon",
        label: "Source",
        icon: () => React.createElement(InlineCode, { className: iconMenu }),
        action: () => shell.openExternal(addon.source)
      }) : false,
      addon.donate ? React.createElement(MenuItem, {
        id: "donate-addon",
        label: "Donate",
        icon: () => React.createElement(WalletIcon, { className: iconMenu }),
        action: () => shell.openExternal(addon.donate)
      }) : false,
      addon.patreon ? React.createElement(MenuItem, {
        id: "patreon-addon",
        label: "Patreon",
        icon: () => React.createElement(Ticket, { className: iconMenu }),
        action: () => shell.openExternal(addon.patreon)
      }) : false
    ]

    return React.createElement(Menu, {
      ...event,
      onClose: closeContextMenu,
      navId: "addon-context-menu",
      children: [
        links.filter(l => l).length ? [
          links,
          React.createElement(MenuSeparator)
        ] : false,
        React.createElement(MenuItem, {
          id: "edit-addon",
          label: `Edit ${addon.filePath.endsWith(".script.js") ? "Plugin" : "Theme"}`,
          icon: () => React.createElement(Pencil, { className: iconMenu }),
          action: () => shell.openPath(addon.filePath)
        }),
        React.createElement(MenuSeparator),
        React.createElement(MenuItem, {
          id: "uninstall-addon",
          label: `Uninstall ${addon.filePath.endsWith(".script.js") ? "Plugin" : "Theme"}`,
          color: "colorDanger",
          icon: () => React.createElement(Trash, { className: iconMenu }),
          action: () => DrApi.modals.confirmModal(`Uninstall ${addon.name}`, `Are you sure you want to uninstall '${addon.name}'?`, {
            confirmText: "Uninstall",
            onConfirm: () => DrApiNative.fileSystem.rm(addon.filePath),
            danger: true
          })
        })
      ]
    })
  }

  function AddonConfiguration({ event, filter:showFilter }) {
    const [ sortByWhat, setSortByWhat ] = storage.useStorage("internal", "addonSortBy", "name")
    const [ filter, setFilter ] = storage.useStorage("internal", "addonFilterBy", 0)

    return React.createElement(Menu, {
      ...event,
      onClose: event.closePopout,
      navId: "addon-configuration",
      children: [
        React.createElement(MenuItem, {
          id: "sort-by",
          label: `Sorting by ${sortByWhat[0].toUpperCase() + sortByWhat.substring(1)}`,
          dontCloseOnActionIfHoldingShiftKey: true,
          icon: () => React.createElement(SortIcon, { className: iconMenu }),
          action: () => setSortByWhat(sortByWhat === "name" ? "author" : "name")
        }),
        showFilter ? [
          React.createElement(MenuSeparator),
          React.createElement(MenuItem, {
            id: "filter-by",
            label: filter === 0 ? "Not filtering" : `Filtering out ${filter === 1 ? "Splash Themes" : "Normal Themes"}`,
            dontCloseOnActionIfHoldingShiftKey: true,
            icon: () => React.createElement(Filter, { className: iconMenu }),
            action: () => {
              if ((filter + 1) === 3) return setFilter(0)
              setFilter(filter + 1)
            }
          })
        ] : false,
        React.createElement(MenuSeparator),
        React.createElement(MenuItem, {
          id: `open-${filter ? "theme" : "plugin"}-folder`,
          label: `Open ${filter ? "Theme" : "Plugin"} Folder`,
          icon: () => React.createElement(Folder, { className: iconMenu }),
          action: () => () => shell.openPath(DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "..", filter ? "theme" : "plugin"))
        })
      ]
    })
  }

  const sortBy = (key) => (a, b) => {
    if(a[key] < b[key]) return -1
    if(a[key] > b[key]) return 1
    return 0
  }

  const filterAddons = (val, [addonName, addon]) => val.map(v => {
    if (addonName.toLowerCase().includes(v.toLowerCase())) return true
    if (addon.author) return addon.author.toLowerCase().includes(v.toLowerCase())
  }).filter(l => l).length

  function Themes() {
    storage.useStorage("internal", "enabledThemes", [])
    storage.useStorage("internal", "enabledSplashThemes", [])

    const [ sortByWhat ] = storage.useStorage("internal", "addonSortBy", "name")
    const [ filter ] = storage.useStorage("internal", "addonFilterBy", 0)
    const [ query, setQuery ] = React.useState("")
    const [ tags, setTags ] = React.useState([])
    const [ themes, setThemes ] = React.useState(getThemes())
    const [ splashThemes, setSplashThemes ] = React.useState(getThemes(true))
    const [ isConfigOpen, setConfigOpen ] = React.useState(false)

    const _themes = Object.values(filter === 0 ? Object.values(themes).concat(...Object.values(splashThemes)) : filter === 1 ? Object.values(themes) : Object.values(splashThemes)).sort(sortBy(sortByWhat)).map((theme) => React.createElement(AddonCard, theme))
    const content = _themes.length ? _themes : !(query || tags.length) ? React.createElement(NoAddons, { type: "theme" }) : React.createElement(NoResults)

    return React.createElement(FormSection, {
      title: React.createElement(Flex, {
        justify: justifyBetween,
        children: [
          React.createElement(Flex, {
            children: [
              React.createElement(Creative, { style: { marginRight: 8 } }),
              "Themes"
            ]
          }),
          React.createElement(Flex, {
            id: "dr-addon-header",
            justify: justifyEnd,
            children: [
              React.createElement(Icon, {
                icon: () => React.createElement(Folder, { className: iconToolbar }),
                onClick: () => shell.openPath(DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "..", "themes")),
                tooltip: "Open Theme Folder"
              }),
              React.createElement(SearchBar, {
                placeholder: "Search Themes",
                className: search,
                query,
                tags,
                isLoading: false,
                disabled: false,
                autoFocus: true,
                size: SearchBar.Sizes.SMALL,
                onRemoveTag: (tag) => {
                  tags.splice(tag, 1)
                  setTags([...tags])

                  const searchValue = tags.length ? tags : [query]

                  const filtered = Object.entries(getThemes()).filter(filterAddons.bind(null, searchValue))
                  setThemes(Object.fromEntries(filtered))

                  const _filtered = Object.entries(getThemes(true)).filter(filterAddons.bind(null, searchValue))
                  setSplashThemes(Object.fromEntries(_filtered))
                },
                onKeyDown: (event) => {
                  if (event.key !== "Tab") return
                  event.stopPropagation()
                  event.preventDefault()

                  if (!query) return
                  
                  setTags(tags.concat(query))
                  setQuery("")
                },
                onQueryChange: (val) => {
                  setQuery(val)

                  const searchValue = tags.concat(val)

                  const filtered = Object.entries(getThemes()).filter(filterAddons.bind(null, searchValue))
                  setThemes(Object.fromEntries(filtered))

                  const _filtered = Object.entries(getThemes(true)).filter(filterAddons.bind(null, searchValue))
                  setSplashThemes(Object.fromEntries(_filtered))
                },
                onClear: () => {
                  setQuery("")
                  setThemes(getThemes())
                  setSplashThemes(getThemes(true))
                }
              }),
              React.createElement(Popout, {
                shouldShow: isConfigOpen,
                position: "left",
                onRequestClose: () => setConfigOpen(false),
                renderPopout: (event) => React.createElement(AddonConfiguration, { event, filter: true }),
                children: () => React.createElement(Icon, {
                  selected: isConfigOpen,
                  icon: () => React.createElement(OverflowMenu, { className: iconToolbar }),
                  onClick: () => setConfigOpen(!isConfigOpen),
                  tooltip: "Configuration"
                })
              })
            ]
          })
        ]
      }),
      tag: FormSection.Tags.H1,
      children: [
        React.createElement("div", {
          id: "dr-addon-list",
          children: content
        })
      ]
    })
  }

  function CustomCSS() {
    const [ aceDetect ] = storage.useStorage("internal", "aceDetectTitlebarColor", true)
    const [ theme ] = storage.useStorage("internal", "aceTheme", "monokai")
    const [ editor, setEditor ] = React.useState()
    const windowInstance = useStateFromStores([ PopoutWindowStore ], () => PopoutWindowStore.getWindow("DISCORD_CUSTOM_CSS"))

    const ref = React.useRef()

    React.useEffect(() => {
      if (!Array.from(ref.current.children).length) {
        const editor = ace.edit(ref.current)
        editor.getSession().setMode("ace/mode/css")
        editor.setValue(storage.customCSS())
        editor.on("change", () => {
          const value = editor.getValue()
          storage.customCSS(value)
          customCSS.innerHTML = value
        })
        setEditor(editor)
      }

      if (editor) editor.setTheme(`ace/theme/${theme}`)
      
      const style = Object.assign(document.createElement("style"), {
        textContent: `${[...document.querySelectorAll("style")].filter(e => e.innerHTML.includes("sourceURL=ace/")).reduce((styles, style) => styles += style.textContent, "")}.${macDragRegion},.ace_print-margin-layer{ display: none }${aceDetect ? `html { background: ${getComputedStyle(document.documentElement).getPropertyValue("--background-tertiary")} }` : ""}`,
        id: "dr-custom-css-popout-style"
      })
      windowInstance.document.head.appendChild(style)
      return () => style.remove()
    })

    return React.createElement(PopoutWindow, {
      windowKey: "DISCORD_CUSTOM_CSS",
      withTitleBar: true,
      title: "Custom CSS",
      children: React.createElement("div", { ref, style: { width: "100vw", height: isWhat.isLinux() ? "100vh" : "calc(100vh - 22px)" } })
    })
  }

  function NoResults() {
    return React.createElement("div", {
      className: emptyResultsWrap,
      style: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "fit-content",
        pointerEvents: "none"
      },
      children: React.createElement("div", {
        className: emptyResultsContent,
        children: [
          React.createElement("div", {
            className: `${noResultsImage}${Math.floor(Math.random() * 10) === 9 ? ` ${alt}` : ""}`
          }),
          React.createElement("div", {
            className: emptyResultsText,
            children: "We searched far and wide. Unfortunately, no results were found."
          })
        ]
      })
    })
  }
  function NoAddons({ type }) {
    return React.createElement("div", {
      className: emptyResultsWrap,
      style: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "fit-content",
        pointerEvents: "none"
      },
      children: React.createElement("div", {
        className: emptyResultsContent,
        children: [
          React.createElement("img", {
            src: "/assets/b5eb2f7d6b3f8cc9b60be4a5dcf28015.svg"
          }),
          React.createElement("div", {
            className: emptyResultsText,
            children: `No ${type}s found.`
          })
        ]
      })
    })
  }

  function Plugins() {
    storage.useStorage("internal", "enabledPlugins", [])

    const [ sortByWhat ] = storage.useStorage("internal", "addonSortBy", "name")
    const [ query, setQuery ] = React.useState("")
    const [ tags, setTags ] = React.useState([])
    const [ plugins, setPlugins ] = React.useState(getPlugins())
    const [ isConfigOpen, setConfigOpen ] = React.useState(false)

    const _plugins = Object.values(plugins).sort(sortBy(sortByWhat)).map((plugin) => React.createElement(AddonCard, plugin))
    const content = _plugins.length ? _plugins : !(query || tags.length) ? React.createElement(NoAddons, { type: "plugin" }) : React.createElement(NoResults)

    return React.createElement(FormSection, {
      title: React.createElement(Flex, {
        justify: justifyBetween,
        children: [
          React.createElement(Flex, {
            children: [
              React.createElement(InlineCode, { style: { marginRight: 8 }, width: 24, height: 24 }),
              "Plugins"
            ]
          }),
          React.createElement(Flex, {
            id: "dr-addon-header",
            justify: justifyEnd,
            children: [
              React.createElement(Icon, {
                icon: () => React.createElement(Folder, { className: iconToolbar }),
                onClick: () => shell.openPath(DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "..", "plugins")),
                tooltip: "Open Plugin Folder"
              }),
              React.createElement(SearchBar, {
                placeholder: "Search Plugins",
                className: search,
                query,
                tags,
                isLoading: false,
                disabled: false,
                autoFocus: true,
                size: SearchBar.Sizes.SMALL,
                onRemoveTag: (tag) => {
                  tags.splice(tag, 1)
                  setTags([...tags])

                  const searchValue = tags.length ? tags : [query]

                  const filtered = Object.entries(getPlugins()).filter(filterAddons.bind(null, searchValue))
                  setPlugins(Object.fromEntries(filtered))
                },
                onKeyDown: (event) => {
                  if (event.key !== "Tab") return
                  event.stopPropagation()
                  event.preventDefault()

                  if (!query) return
                  
                  setTags(tags.concat(query))
                  setQuery("")
                },
                onQueryChange: (val) => {
                  setQuery(val)

                  const searchValue = tags.concat(val)

                  const filtered = Object.entries(getPlugins()).filter(filterAddons.bind(null, searchValue))
                  setPlugins(Object.fromEntries(filtered))
                },
                onClear: () => {
                  setQuery("")
                  setPlugins(getPlugins())
                }
              }),
              React.createElement(Popout, {
                shouldShow: isConfigOpen,
                position: "left",
                onRequestClose: () => setConfigOpen(false),
                renderPopout: (event) => React.createElement(AddonConfiguration, { event, filter: false }),
                children: () => React.createElement(Icon, {
                  selected: isConfigOpen,
                  icon: () => React.createElement(OverflowMenu, { className: iconToolbar }),
                  onClick: () => setConfigOpen(!isConfigOpen),
                  tooltip: "Configuration"
                })
              })
            ]
          })
        ]
      }),
      tag: FormSection.Tags.H1,
      children: [
        React.createElement("div", {
          id: "dr-addon-list",
          children: content
        })
      ]
    })
  }

  const settings = [
    { section: "DIVIDER" },
    {
      label: "Discord Re-envisioned",
      section: "HEADER"
    },
    {
      element: () => React.createElement(Settings),
      icon: React.createElement(Gear, { width: 20, height: 20 }),
      label: "Settings",
      section: "Discord Re-envisioned"
    },
    {
      element: () => React.createElement(Themes),
      icon: React.createElement(Creative, { width: 20, height: 20 }),
      label: "Themes",
      section: "Discord Re-envisioned Themes"
    },
    {
      onClick: () => window.ace ? dispatcher.dispatch({
        type: "POPOUT_WINDOW_OPEN",
        key: "DISCORD_CUSTOM_CSS",
        render: () => React.createElement(CustomCSS),
        features: {}
      }) : DrApi.modals.alert("Custom CSS", "The Ace editor didnt load, so custom CSS wont be usable"),
      icon: React.createElement(Pencil, { width: 20, height: 20 }),
      label: "Custom CSS",
      section: "Discord Re-envisioned Custom CSS"
    },
    {
      element: () => React.createElement(Plugins),
      icon: React.createElement(InlineCode, { width: 20, height: 20 }),
      label: "Plugins",
      section: "Discord Re-envisioned Plugins"
    }
  ]

  patcher.after("DrApi", SettingsView.prototype, "getPredicateSections", (that, args, res) => {
    const friendRequests = res.indexOf(res.find(s => s.section === "Friend Requests")) + 1

    if (!friendRequests) return
    if (res.find(s => s.section === "Discord Re-envisioned")) return

    res.splice(friendRequests, 0, ...settings)
  })

  const latestChangelog = DrApiNative.changelog[0]

  patcher.after("DrApi", webpack.getModuleByDisplayName("ClientDebugInfo"), "default", (that, args, res) => {
    res.props.children.push(React.createElement(Text, {
      className: line,
      color: "text-muted",
      tag: "span",
      variant: "text-xs/normal",
      children: [
        "Discord Re-envisioned",
        " (",
        React.createElement("span", {
          onClick: () => {
            DrApi.modals.open(props => React.createElement(ModalRoot, {
              ...props,
              className: modal,
              children: [
                React.createElement(ModalHeader, {
                  separator: false,
                  align: justifyBetween,
                  children: [
                    React.createElement(Flex.Child, {
                      children: [
                        React.createElement(Heading, {
                          children: latestChangelog.title,
                          level: 2,
                          variant: "heading-lg/medium"
                        }),
                        React.createElement(Text, {
                          children: latestChangelog.subtitle,
                          className: date,
                          variant: "text-xs/normal"
                        })
                      ]
                    }),
                    React.createElement(Flex.Child, {
                      grow: 0,
                      children: React.createElement(ModalCloseButton, { onClick: props.onClose })
                    })
                  ]
                }),
                React.createElement(ModalContent, {
                  className: `${container} ${content}`,
                  children: DrApiNative.changelog[0].body.map((item, i) => {
                    return [
                      React.createElement("h1", {
                        children: item.title,
                        className: `${types[item.type]}${item.marginTop ? ` ${marginTop}` : ""}`,
                        style: !i ? { marginTop: 0 } : undefined
                      }),
                      React.createElement("ul", {
                        children: item.content.map(item => React.createElement("li", {
                          children: [
                            React.createElement("strong", {}, item.title),
                            " ",
                            item.content
                          ]
                        }))
                      })
                    ]
                  })
                }),
                React.createElement(ModalFooter, {
                  direction: horizontal,
                  children: React.createElement("div", {
                    className: footer,
                    children: [
                      // @todo find a better way to go to the server
                      React.createElement(Anchor, {
                        className: socialLink,
                        href: "https://discord.gg/yYJA3qQE5F",
                        children: React.createElement(Discord, { width: 16, height: 16 }),
                        target: "_blank"
                      }),
                      React.createElement(Text, {
                        children: "Follow us for more updates!",
                        variant: "text-xs/normal"
                      })
                    ]
                  })
                })
              ]
            }))
          },
          children: DrApiNative.package.version,
          style: { cursor: "pointer" }
        }),
        ")"
      ]
    }))
  })
}
