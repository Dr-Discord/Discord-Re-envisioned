const patcher = require("./patcher")
const webpack = require("./webpack")
const storage = require("../storage")
const styles = require("./styles")
const { getThemes, toggleTheme } = require("./themes")

window.getThemes = getThemes

const shell = DrApiNative.runInNative(`require("electron").shell`)

module.exports = async (React) => {
  const sectionsModule = await webpack.getModuleByPropsAsync("getUserSettingsSections")
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
  const { Icon } = DrApi.webpack.getModuleByProps("Icon", "default")
  const { default: Menu, MenuItem, MenuSeparator } = webpack.getModuleByDisplayName("Menu")
  const Popout = webpack.getModuleByDisplayName("Popout", true)
  const Filter = webpack.getModuleByDisplayName("Filter", true)
  const Trash = webpack.getModuleByDisplayName("Trash", true)
  const Globe = webpack.getModuleByDisplayName("Globe", true)
  const Link = webpack.getModuleByDisplayName("Link", true)
  const InlineCode = webpack.getModuleByDisplayName("InlineCode", true)
  const WalletIcon = webpack.getModuleByDisplayName("WalletIcon", true)
  const Ticket = webpack.getModuleByDisplayName("Ticket", true)
  const DoubleStarIcon = webpack.getModuleByDisplayName("DoubleStarIcon", true)
  const Tooltip = webpack.getModuleByDisplayName("Tooltip", true)
  const { openContextMenu, closeContextMenu } = webpack.getModuleByProps("openContextMenuLazy")

  const { header, topDivider, body, expandIcon } = webpack.getModuleByProps("header", "topDivider")
  const { iconWrapper, wrapper, secondaryHeader } = webpack.getModuleByProps("detailsWrapper", "icon", "iconWrapper")
  const { justifyCenter, alignCenter, justifyBetween, justifyEnd} = webpack.getModuleByProps("justifyCenter", "alignCenter")
  const { card } = webpack.getModuleByProps("card", "pulse", "topDivider")
  const { size16, size20 } = webpack.getModuleByProps("size20", "size16")
  const { icon:iconToolbar } = DrApi.webpack.getModuleByProps("icon", "transparent", "iconWrapper")
  const { icon:iconMenu } = DrApi.webpack.getModuleByProps("colorPremium", "icon")
  const { line } = webpack.getModuleByProps("line", "versionHash")

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
    margin-right: 8px
  } .dr-addon-avatar + h3 {
    padding-top: 2px;
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
    open = false
  }) {
    const [isOpen, setOpen] = React.useState(open)

    React.useEffect(() => {
      if (isOpen) DrApi.toast.show(demoToastObj)
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
                        children: React.createElement(Mail, {
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
        React.createElement(SwitchItem, {
          value: newMacOS,
          children: "New MacOS Titlebar Style",
          note: "Use Electrons titlebar or Discords titlebar.",
          disabled: !(DrApiNative.platform === "darwin"),
          onChange: (value) => {
            DrApi.modals.confirmModal("Restart discord?", [
              `To use ${value ? "new" : "old"} MacOS titlebar style you need to restart discord.`
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
      (user && user.id === userId) ? React.createElement("img", {
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
        onClick: authorLink ? shell.openExternal(authorLink) : undefined,
        tag: "h3"
      }),
      (user && user.id === userId) ? React.createElement(Text, {
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

  function AddonCard(addon) {
    const [enabledAddons, setEnabledAddons] = storage.useStorage("internal", addon.filePath.endsWith(".theme.css") ? "enabledThemes" : addon.filePath.endsWith(".splash.css") ? "enabledSplashThemes" : "UNKNOWN", [])
    
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
                      addon.filePath.endsWith(".splash.css") ? React.createElement(Tooltip, {
                        text: "Splash Theme",
                        children: (props) => React.createElement(DoubleStarIcon, { className: iconToolbar, style: { marginRight: 8 }, ...props })
                      }) : false,
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
              React.createElement(Switch, {
                checked: enabledAddons.includes(addon.name),
                onChange: (val) => {
                  if (val) enabledAddons.push(addon.name)
                  else {
                    const i = enabledAddons.indexOf(addon.name)
                    if (i === -1) return
                    enabledAddons.splice(i, 1)
                  }

                  setEnabledAddons([...enabledAddons])

                  if (addon.filePath.endsWith(".theme.css")) toggleTheme(addon.name)
                }
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
        label: "Discord Invite",
        icon: () => React.createElement(Link, { className: iconMenu }),
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
          label: "Uninstall Theme",
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

  function AddonConfiguration(event) {
    const [sortByWhat, setSortByWhat] = storage.useStorage("internal", "addonSortBy", "name")

    return React.createElement(Menu, {
      ...event,
      onClose: event.closePopout,
      navId: "addon-configuration",
      children: [
        React.createElement(MenuItem, {
          id: "sort-by",
          label: `Sorting by ${sortByWhat[0].toUpperCase() + sortByWhat.substring(1)}`,
          dontCloseOnActionIfHoldingShiftKey: true,
          icon: () => React.createElement(Filter, { className: iconMenu }),
          action: () => setSortByWhat(sortByWhat === "name" ? "author" : "name")
        }),
        React.createElement(MenuSeparator),
        React.createElement(MenuItem, {
          id: "open-theme-folder",
          label: "Open Theme Folder",
          icon: () => React.createElement(Folder, { className: iconMenu }),
          action: () => () => shell.openPath(DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "themes"))
        })
      ]
    })
  }

  const sortBy = (key) => (a, b) => {
    if(a[key] < b[key]) return -1
    if(a[key] > b[key]) return 1
    return 0
  }

  function Themes() {
    storage.useStorage("internal", "enabledThemes", [])
    storage.useStorage("internal", "enabledSplashThemes", [])

    const [sortByWhat] = storage.useStorage("internal", "addonSortBy", "name")
    const [query, setQuery] = React.useState("")
    const [themes, setThemes] = React.useState(getThemes())
    const [splashThemes, setSplashThemes] = React.useState(getThemes(true))
    const [isConfigOpen, setConfigOpen] = React.useState(false)

    return React.createElement(FormSection, {
      title: React.createElement(Flex, {
        justify: justifyBetween,
        children: [
          "Themes",
          React.createElement(Flex, {
            id: "dr-addon-header",
            justify: justifyEnd,
            children: [
              React.createElement(SearchBar, {
                placeholder: "Search Themes",
                query,
                isLoading: false,
                disabled: false,
                autoFocus: true,
                size: SearchBar.Sizes.SMALL,
                onQueryChange: (val) => {
                  setQuery(val)
  
                  const filtered = Object.entries(getThemes()).filter(([theme, { author }]) => theme.toLowerCase().includes(val.toLowerCase()) || author.toLowerCase().includes(val.toLowerCase()))
                  setThemes(Object.fromEntries(filtered))

                  const _filtered = Object.entries(getThemes(true)).filter(([theme, { author }]) => theme.toLowerCase().includes(val.toLowerCase()) || author.toLowerCase().includes(val.toLowerCase()))
                  setSplashThemes(Object.fromEntries(_filtered))
                },
                onClear: () => {
                  setQuery("")
                  setThemes(getThemes())
                  setSplashThemes(getThemes(true))
                }
              }),
              React.createElement(Icon, {
                icon: () => React.createElement(Folder, { className: iconToolbar }),
                onClick: () => shell.openPath(DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "themes")),
                tooltip: "Open Theme Folder"
              }),
              React.createElement(Popout, {
                shouldShow: isConfigOpen,
                position: "left",
                onRequestClose: () => setConfigOpen(false),
                renderPopout: (event) => React.createElement(AddonConfiguration, event),
                children: () => React.createElement(Icon, {
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
          children: Object.values(themes).concat(...Object.values(splashThemes)).sort(sortBy(sortByWhat)).map((theme) => React.createElement(AddonCard, theme))
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
      label: "Settings",
      section: "Discord Re-envisioned"
    },
    {
      element: () => React.createElement(Themes),
      label: "Themes",
      section: "Discord Re-envisioned Themes"
    }
  ]

  patcher.after("DrApi", sectionsModule.default, "render", (that, args, res) => {
    const { sections } = res.props.children.props.children.props
    
    const index = sections.indexOf(sections.find(s => s.section === "Connections")) + 1
    if (!index) return
    if (sections.find(s => s.section === "Discord Re-envisioned")) return

    sections.splice(index, 0, ...settings)
  })

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
          onClick: () => {},
          children: "ALPHA",
          style: { color: "var(--status-danger)", cursor: "pointer" }
        }),
        ")"
      ]
    }))
  })
}