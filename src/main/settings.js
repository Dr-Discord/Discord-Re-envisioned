const patcher = require("./patcher")
const webpack = require("./webpack")
const storage = require("../storage")
const styles = require("./styles")
const { getThemes, toggleTheme, parseTheme } = require("./themes")
const { getPlugins, togglePlugin } = require("./plugins")
const logger = require("./logger")
const { readJSON } = require("../storage")

window.getThemes = getThemes

const shell = DrApiNative.runInNative(`require("electron").shell`)

module.exports = async (React) => {
  const sectionsModule = await webpack.getModuleByPropsAsync("getUserSettingsSections")
  logger.log("Settings", "Patching 'getUserSettingsSections' to add settings")

  const NotificationSettings = webpack.getModuleByDisplayName("NotificationSettings", true)
  const FormSection = webpack.getModuleByDisplayName("FormSection", true)
  const SwitchItem = webpack.getModuleByDisplayName("SwitchItem", true)
  const Card = webpack.getModuleByDisplayName("Card", true)
  const Flex = webpack.getModuleByDisplayName("Flex", true)
  const Clickable = webpack.getModuleByDisplayName("Clickable", true)
  const FormDivider = webpack.getModuleByDisplayName("FormDivider", true)
  const Caret = webpack.getModuleByDisplayName("Caret", true)
  const Mail = webpack.getModuleByDisplayName("Mail", true)
  const LegacyHeader = webpack.getModuleByDisplayName("LegacyHeader", true)
  const FormItem = webpack.getModuleByDisplayName("FormItem", true)
  const Slider = webpack.getModuleByDisplayName("Slider", true)
  const { Text } = webpack.getModule(m => m.Text.displayName)
  const { Messages } = webpack.getAllModulesByProps("Messages")[1]
  const Switch = webpack.getModuleByDisplayName("Switch", true)
  const SearchBar = webpack.getModuleByDisplayName("SearchBar", true)
  const Folder = webpack.getModuleByDisplayName("Folder", true)
  const OverflowMenu = webpack.getModuleByDisplayName("OverflowMenu", true)
  const { Icon } = webpack.getModuleByProps("Icon", "default")
  const { default: Menu, MenuItem, MenuSeparator } = webpack.getModuleByDisplayName("Menu")
  const Popout = webpack.getModuleByDisplayName("Popout", true)
  const Filter = webpack.getModuleByDisplayName("Filter", true)
  const Trash = webpack.getModuleByDisplayName("Trash", true)
  const Globe = webpack.getModuleByDisplayName("Globe", true)
  const Discord = webpack.getModuleByDisplayName("Discord", true)
  const InlineCode = webpack.getModuleByDisplayName("InlineCode", true)
  const WalletIcon = webpack.getModuleByDisplayName("WalletIcon", true)
  const Ticket = webpack.getModuleByDisplayName("Ticket", true)
  const DoubleStarIcon = webpack.getModuleByDisplayName("DoubleStarIcon", true)
  const Creative = webpack.getModuleByDisplayName("Creative", true)
  const SortIcon = webpack.getModuleByDisplayName("SortIcon", true)
  const OsMac = webpack.getModuleByDisplayName("OsMac", true)
  const Retry = webpack.getModuleByDisplayName("Retry", true)
  const Gear = webpack.getModuleByDisplayName("Gear", true)
  const Pencil = webpack.getModuleByDisplayName("Pencil", true)
  const Monitor = webpack.getModuleByDisplayName("Monitor", true)
  const Tooltip = webpack.getModuleByDisplayName("Tooltip", true)
  const Anchor = webpack.getModuleByDisplayName("Anchor", true)
  const FormText = webpack.getModuleByDisplayName("FormText", true)
  const TextInput = webpack.getModuleByDisplayName("TextInput", true)
  const { openContextMenu, closeContextMenu } = webpack.getModuleByProps("openContextMenuLazy")
  const { ModalRoot, ModalHeader, ModalCloseButton, ModalContent, ModalFooter, ModalSize } = webpack.getModuleByProps("ModalRoot", "ModalContent")
  const { Heading } = webpack.getModule(m => m.Heading.displayName)
  const Button = webpack.getModuleByProps("ButtonColors", "ButtonSizes").default

  const { date, container, footer, added, fixed, improved, marginTop, socialLink } = webpack.getModuleByProps("date", "premiumIcon", "improved")
  const { content, modal } = webpack.getModuleByProps("content", "modal", "maxModalWidth")
  const { horizontal } = webpack.getModuleByProps("flexChild", "horizontal")
  const { header, topDivider, body, expandIcon } = webpack.getModuleByProps("header", "topDivider")
  const { iconWrapper, wrapper, secondaryHeader } = webpack.getModuleByProps("detailsWrapper", "icon", "iconWrapper")
  const { justifyCenter, alignCenter, justifyBetween, justifyEnd } = webpack.getModuleByProps("justifyCenter", "alignCenter")
  const { card } = webpack.getModuleByProps("card", "pulse", "topDivider")
  const { size16, size20 } = webpack.getModuleByProps("size20", "size16")
  const { icon:iconToolbar } = webpack.getModuleByProps("icon", "transparent", "iconWrapper")
  const { icon:iconMenu } = webpack.getModuleByProps("colorPremium", "icon")
  const { line } = webpack.getModuleByProps("line", "versionHash")
  const { search } = webpack.getModuleByProps("search", "toolbar")
  const { macDragRegion } = webpack.getModuleByProps("macDragRegion")
  const { marginBottom8 } = webpack.getModuleByProps("marginBottom8", "marginBottom4")
  const { container:formContainer, dividerDefault } = webpack.getModuleByProps("container", "dividerDefault")

  const { ROLE_COLORS } = webpack.getModuleByProps("ROLE_COLORS")
  const types = { added, fixed, improved }

  styles("DrApi-settings", `.dr-header:not(:last-child) .dr-catorgory-icon {
    color: var(--header-primary);
  } .dr-catorgory-icon {
    color: var(--header-secondary);
    margin: 8px
  } #dr-notification-position {
    margin-bottom: 8px
  } #dr-notification-position .dr-wrapper {
    margin-left: 10%;
    width: 80%;
  } .dr-addon-avatar {
    border-radius: 50%; 
    cursor: pointer;
    margin-top: 3px;
    margin-right: 8px
  } .dr-addon-avatar + h3 {
    padding-top: 5px;
  } .dr-addon-avatar + h3 + div {
    padding-top: 6px !important
  } .dr-addon-gear {
    margin-right: 8px;
    cursor: pointer;
    color: var(--interactive-normal)
  } .dr-addon-gear:hover {
    color: var(--interactive-hover)
  } .dr-addon-gear:active {
    color: var(--interactive-active)
  } .dr-addon-gear.disabled {
    cursor: not-allowed;
    color: var(--interactive-muted)
  }`)

  const demoToastObj = {
    id: "toastDemo",
    title: "Demo",
    icon: React.createElement(Mail),
    content: "This is a demo Toast.",
    onClose: () => setTimeout(DrApi.toast.show.bind(null, demoToastObj), 500),
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
    const [isOpen, setOpen] = React.useState(open)

    React.useEffect(() => {
      if (id === "notifications" && isOpen) DrApi.toast.show(demoToastObj)
      return () => DrApi.toast.delete(demoToastObj.id)
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
    const [newMacOS, setNewMacOS] = storage.useStorage("internal", "newMacOS", true)
    const [transparency, setTransparency] = storage.useStorage("internal", "transparency", false)
    const [position, setPosition] = storage.useStorage("internal", "notificationLocation", NotificationSettings.Positions.TOP_RIGHT)
    const [positionX, setPositionX] = storage.useStorage("internal", "notificationPositionX", 20)
    const [positionY, setPositionY] = storage.useStorage("internal", "notificationPositionY", 20)
    const [maxHeight, setMaxHeight] = storage.useStorage("internal", "notificationMaxHeight", 30)
    const [blur, setBlur] = storage.useStorage("internal", "notificationBlur", 0)
    const [opacity, setOpacity] = storage.useStorage("internal", "notificationOpacity", 80)

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
              }),
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
                  text: "Restarting is needed",
                  children: (props) => React.createElement(Retry, {
                    ...props, 
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
                    ...props, 
                    width: 18, 
                    height: 18,
                    style: {
                      marginRight: 4,
                      transform: "translateY(2px)"
                    }
                  })
                }),
                "New MacOS Titlebar Style",
                React.createElement(Tooltip, {
                  text: "Restarting is needed",
                  children: (props) => React.createElement(Retry, {
                    ...props, 
                    width: 18, 
                    height: 18,
                    style: {
                      marginLeft: 4,
                      transform: "translateY(2px) rotate(180deg)"
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

  const { openUserProfileModal } = webpack.getModuleByProps("openUserProfileModal")
  const renderMessageMarkup = webpack.getModuleByProps("renderMessageMarkupToAST").default
  const [{ getUser: fetchUser }, { getUser }] = webpack.getAllModulesByProps("getUser")

  function Avatar({ author, userId, authorLink }) {
    const [user, setUser] = React.useState(getUser(userId))

    React.useEffect(() => {
      void async function() {
        if (typeof userId === "string") setUser(await fetchUser(userId))
      }()
    })
    
    return [
      user ? React.createElement("img", {
        src: user.getAvatarURL(false, undefined, true),
        width: 24,
        height: 24,
        className: "dr-addon-avatar",
        onClick: () => openUserProfileModal({ userId: userId }),
      }) : false,
      React.createElement(LegacyHeader, {
        children: user?.name ?? author,
        className: secondaryHeader,
        size: size16,
        style: authorLink ? { cursor: "pointer" } : undefined,
        onClick: authorLink ? () => shell.openExternal(authorLink) : undefined,
        tag: "h3"
      }),
      user ? React.createElement(Text, {
        style: {
          paddingTop: 4,
          marginLeft: 4
        },
        children: ["#", user.discriminator],
        color: "header-secondary",
        variant: "text-sm/normal"
      }) : false
    ]
  }

  let ColorPicker = () => false
  webpack.instance.e("36623").then(() => ColorPicker = webpack.instance("593642").default)

  function makeThemeSettings(addon, settings) {
    return React.createElement(() => {
      const result = []
      
      for (const [key, value] of Object.entries(settings)) {
        const [data, setData] = storage.useStorage(`${addon.name}.theme`, key, value.initial)

        let content = React.createElement("div", { style: { color: "var(--text-danger)" } }, `ERROR: UNKNOWN TYPE '${value.type}'`)

        if (value.type.toLowerCase() === "color") content = React.createElement(ColorPicker, {
          colors: ROLE_COLORS,
          defaultColor: value.initial,
          onChange: (val) => setData(val),
          value: data
        })
        else if (value.type.toLowerCase() === "text") {
          const [danger, setDanger] = React.useState(false)
          React.useEffect(() => value.regex && setDanger(!value.regex.test(data)))

          content = React.createElement(TextInput, {
            size: value.size,
            placeholder: value.placeholder,
            value: data,
            style: danger ? { border: "1px solid var(--status-danger)" } : { border: "1px solid var(--status-positive)" },
            onChange: (val) => {
              if (value.regex) setDanger(!value.regex.test(val))
              setData(val)
            }
          })
        }
        else if (value.type.toLowerCase() === "switch") {
          result.push(React.createElement(SwitchItem, {
            value: JSON.parse(String(data)),
            note: value.note,
            children: value.name,
            onChange: (val) => setData(val)
          }))
          continue
        } 
        else if (value.type.toLowerCase() === "slider") {
          content = React.createElement(Slider, {
            maxValue: value.max ? Number(value.max) : 100,
            minValue: value.min ? Number(value.min) : 0,
            markers: Array.from({ length: 11 }, (_, i) => i * (value.max ? Number(value.max) : 100) / 10),
            onValueChange: (val) => setData(Math.round(val)),
            onValueRender: (val) => `${Math.round(val)}${value.sizing ?? "px"}`,
            initialValue: Number(data)
          })
        }

        result.push(React.createElement(FormItem, {
          title: value.name,
          className: formContainer,
          children: [
            value.note ? React.createElement(FormText, {
              type: FormText.Types.DESCRIPTION,
              className: marginBottom8,
              children: value.note
            }) : false,
            content,
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
              children: "Update the Settings on your theme."
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
    if (addon.filePath.endsWith(".theme.css")) settings = makeThemeSettings(addon, settings)

    DrApi.modals.open((props) => React.createElement(ModalRoot, {
      ...props,
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
    const [enabledAddons, setEnabledAddons] = storage.useStorage("internal", addon.filePath.endsWith(".theme.css") ? "enabledThemes" : addon.filePath.endsWith(".splash.css") ? "enabledSplashThemes" : "enabledPlugins", [])

    return React.createElement(Card, {
      ...Card.defaultProps,
      editable: true,
      className: card,
      key: `dr-addon-${addon.name}${addon.filePath.endsWith(".splash.css") ? "-splash" : ""}`,
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
                        text: addon.filePath.endsWith(".theme.css") ? "Theme" : addon.filePath.endsWith(".splash.css") ? "Splash Theme" : "Plugin",
                        children: (props) => React.createElement(addon.filePath.endsWith(".theme.css") ? Creative : addon.filePath.endsWith(".splash.css") ? DoubleStarIcon : InlineCode, { className: iconToolbar, style: { marginRight: 8 }, ...props })
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
                      })
                    ]
                  }),
                  React.createElement(Flex, {
                    style: { marginBottom: 6 },
                    children: React.createElement(Avatar, { userId: addon.authorId, author: addon.author, authorLink: addon.authorLink })
                  })
                ]
              }),
              React.createElement(Flex, {
                grow: 0,
                children: [
                  (addon.settings || addon.exports?.onSettings) ? React.createElement(Clickable, {
                    className: `dr-addon-gear${enabledAddons.includes(addon.name) ? "" : " disabled"}`,
                    onClick: () => {
                      if (!enabledAddons.includes(addon.name)) return
                      if (addon.exports?.onSettings) {
                        let defValue = "MEDIUM"
                        const settings = addon.exports?.onSettings((size = true) => preventDefault = size)
                        if (!defValue) defValue = "MEDIUM"
                        if (defValue === true) return
                        return showAddonSettings(addon, settings, defValue)
                      }
                      showAddonSettings(addon, addon.settings, "MEDIUM")
                    },
                    children: React.createElement(Gear)
                  }) : false,
                  React.createElement(Switch, {
                    checked: enabledAddons.includes(addon.name),
                    onChange: (val) => {
                      if (val) enabledAddons.push(addon.name)
                      else {
                        const i = enabledAddons.indexOf(addon.name)
                        if (i === -1) return
                        enabledAddons.splice(i, 1)
                      }
    
                      setTimeout(DrApi.toast.show({
                        title: `${val ? "Enabled" : "Disabled"} '${addon.name}'`,
                        type: "info",
                        icon: React.createElement(addon.filePath.endsWith(".theme.css") ? Creative : addon.filePath.endsWith(".splash.css") ? DoubleStarIcon : InlineCode)
                      }), 4e3)
    
                      setEnabledAddons([...enabledAddons])
    
                      if (addon.filePath.endsWith(".theme.css")) toggleTheme(addon.name)
                      else if (addon.filePath.endsWith(".plugin.js")) togglePlugin(addon.name)
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
          id: "uninstall-addon",
          label: `Uninstall ${addon.filePath.endsWith(".plugin.js") ? "Plugin" : "Theme"}`,
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
    const [sortByWhat, setSortByWhat] = storage.useStorage("internal", "addonSortBy", "name")
    const [filter, setFilter] = storage.useStorage("internal", "addonFilterBy", 0)

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

  const filterAddons = (val, [addon, { author }]) => val.map(v => addon.toLowerCase().includes(v.toLowerCase()) || author.toLowerCase().includes(v.toLowerCase())).filter(l => l).length

  function Themes() {
    storage.useStorage("internal", "enabledThemes", [])
    storage.useStorage("internal", "enabledSplashThemes", [])

    const [sortByWhat] = storage.useStorage("internal", "addonSortBy", "name")
    const [filter] = storage.useStorage("internal", "addonFilterBy", 0)
    const [query, setQuery] = React.useState("")
    const [tags, setTags] = React.useState([])
    const [themes, setThemes] = React.useState(getThemes())
    const [splashThemes, setSplashThemes] = React.useState(getThemes(true))
    const [isConfigOpen, setConfigOpen] = React.useState(false)

    const _themes = filter === 0 ? Object.values(themes).concat(...Object.values(splashThemes)) : filter === 1 ? Object.values(themes) : Object.values(splashThemes)

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
          children: _themes.sort(sortBy(sortByWhat)).map((theme) => React.createElement(AddonCard, theme))
        })
      ]
    })
  }

  const PopoutWindow = webpack.getModule(e => e.default.toString().indexOf("DndProvider") > -1 && React.isValidElement(e.default())).default
  const dispatcher = webpack.getModuleByProps("dirtyDispatch", "dispatch")
  const PopoutWindowStore = webpack.getModuleByProps("getWindow", "getName", "getIsAlwaysOnTop")
  const { useStateFromStores } = webpack.getModuleByProps("useStateFromStores") 

  function CustomCSS() {
    const windowInstance = useStateFromStores([PopoutWindowStore], () => PopoutWindowStore.getWindow("DISCORD_CUSTOM_CSS"))

    const ref = React.useRef()

    React.useEffect(() => {
      window.windowInstance = windowInstance
      
      const editor = ace.edit(ref.current)
      editor.setTheme("ace/theme/monokai")
      editor.getSession().setMode("ace/mode/css")
      editor.setValue(storage.customCSS())
      editor.on("change", () => {
        const value = editor.getValue()
        storage.customCSS(value)
        styles.customCSS.innerHTML = value
      })

      windowInstance.document.head.appendChild(Object.assign(document.createElement("style"), {
        textContent: `${[...document.querySelectorAll("style")].filter(e => e.innerHTML.includes("sourceURL=ace/")).reduce((styles, style) => styles += style.textContent, "")}.${macDragRegion},.ace_print-margin-layer{ display: none }`,
        id: "dr-custom-css-popout-style"
      }))
    })

    return React.createElement(PopoutWindow, {
      windowKey: "DISCORD_CUSTOM_CSS",
      withTitleBar: true,
      title: "Custom CSS",
      children: React.createElement("div", { ref, style: { width: "100vw", height: "calc(100vh - 22px)" } })
    })
  }

  function Plugins() {
    storage.useStorage("internal", "enabledPlugins", [])

    const [sortByWhat] = storage.useStorage("internal", "addonSortBy", "name")
    const [query, setQuery] = React.useState("")
    const [tags, setTags] = React.useState([])
    const [plugins, setPlugins] = React.useState(getPlugins())
    const [isConfigOpen, setConfigOpen] = React.useState(false)

    const _plugins = Object.values(plugins)

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
          children: _plugins.sort(sortBy(sortByWhat)).map((plugin) => React.createElement(AddonCard, plugin))
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
      onClick: () => window.ace ? dispatcher.dirtyDispatch({
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

  patcher.after("DrApi", sectionsModule.default, "render", (that, args, res) => {
    const { sections } = res.props.children.props.children.props
        
    const index = sections.indexOf(sections.find(s => s.section === "Connections")) + 1
    if (!index) return
    if (sections.find(s => s.section === "Discord Re-envisioned")) return
    
    sections.splice(index, 0, ...settings)
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
