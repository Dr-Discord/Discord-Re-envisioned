const patcher = require("./patcher")
const webpack = require("./webpack")
const storage = require("../storage")
const styles = require("./styles")
const { getThemes, toggleTheme } = require("./themes")

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

  const { header, topDivider, body, expandIcon } = webpack.getModuleByProps("header", "topDivider")
  const { iconWrapper, wrapper, secondaryHeader } = webpack.getModuleByProps("detailsWrapper", "icon", "iconWrapper")
  const { justifyCenter, alignCenter, justifyBetween, horizontal, justifyEnd} = webpack.getModuleByProps("justifyCenter", "alignCenter")
  const { card } = webpack.getModuleByProps("card", "pulse", "topDivider")

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
                          size: "size16-CysEuG dr-size16",
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

  function Avatar({ author, userId }) {
    const [user, setUser] = React.useState(getUser(userId))

    React.useEffect(() => {
      void async function() {
        if (user) setUser(getUser(userId))
        else if (typeof userId === "string") setUser(await fetchUser(userId))
      }()
    })

    return [
      (user && user.id === userId) ? React.createElement("img", {
        src: user.getAvatarURL(false, undefined, true),
        width: 24,
        height: 24,
        className: "dr-addon-avatar",
        onClick() {
          openUserProfileModal({ userId: userId })
        },
      }) : false,
      React.createElement(LegacyHeader, {
        children: user?.name ?? author,
        className: secondaryHeader,
        size: "size16-CysEuG dr-size16",
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
    const [enabledThemes, setEnabledThmes] = storage.useStorage("internal", "enabledThemes", [])

    return React.createElement(Card, {
      ...Card.defaultProps,
      editable: true,
      className: card,
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
                      React.createElement(LegacyHeader, {
                        children: addon.name,
                        className: secondaryHeader,
                        size: "size20-2yAqwX dr-size20",
                        tag: "h3"
                      }),
                      React.createElement(Text, {
                        style: {
                          paddingTop: 5,
                          marginLeft: 10
                        },
                        children: ["v", addon.version],
                        color: "header-secondary",
                        variant: "text-sm/normal"
                      })
                    ]
                  }),
                  React.createElement(Flex, {
                    style: { marginBottom: 6 },
                    children: React.createElement(Avatar, { userId: addon.authorId, author: addon.author })
                  })
                ]
              }),
              React.createElement(Switch, {
                checked: enabledThemes.includes(addon.name),
                onChange: (val) => {
                  if (val) enabledThemes.push(addon.name)
                  else {
                    const i = enabledThemes.indexOf(addon.name)
                    if (i === -1) return
                    enabledThemes.splice(i, 1)
                  }

                  setEnabledThmes([...enabledThemes])

                  toggleTheme(addon.name)
                }
              })
            ]
          }),
          React.createElement("div", {
            style: { color: "var(--text-normal)" }
          }, (() => {
            const { content } = renderMessageMarkup({ content: " *s* " + addon.description })
            content.shift()
            content.shift()
            return content
          })())
        ]
      })
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
          icon: () => React.createElement(Filter, { className: "icon-E4cW1l dr-icon" }),
          action: () => setSortByWhat(sortByWhat === "name" ? "author" : "name")
        }),
        React.createElement(MenuSeparator),
        React.createElement(MenuItem, {
          id: "open-theme-folder",
          label: "Open Theme Folder",
          icon: () => React.createElement(Folder, { className: "icon-E4cW1l dr-icon" }),
          action: () => () => DrApiNative.runInNative("require(\"electron\").shell").openPath(DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "themes"))
        }),
      ]
    })
  }

  const sortBy = (key) => (a, b) => {
    if(a[key] < b[key]) return -1
    if(a[key] > b[key]) return 1
    return 0
  }

  function Themes() {
    const [sortByWhat] = storage.useStorage("internal", "addonSortBy", "name")
    const [query, setQuery] = React.useState("")
    const [themes, setThemes] = React.useState(getThemes())
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
                },
                onClear: () => {
                  setQuery("")
                  setThemes(getThemes())
                }
              }),
              React.createElement(Icon, {
                icon: () => React.createElement(Folder, { className: "icon-2xnN2Y dr-icon" }),
                onClick: () => DrApiNative.runInNative("require(\"electron\").shell").openPath(DrApiNative.fileSystem.join(DrApiNative.fileSystem.dirName, "themes")),
                tooltip: "Open Theme Folder"
              }),
              React.createElement(Popout, {
                shouldShow: isConfigOpen,
                position: "left",
                onRequestClose: () => setConfigOpen(false),
                renderPopout: (event) => React.createElement(AddonConfiguration, event),
                children: () => React.createElement(Icon, {
                  icon: () => React.createElement(OverflowMenu, { className: "icon-2xnN2Y dr-icon" }),
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
          children: Object.values(themes).sort(sortBy(sortByWhat)).map((theme) => React.createElement(AddonCard, theme))
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

  const { line } = webpack.getModuleByProps("line", "versionHash")
  
  const { openModal } = webpack.getModuleByProps("openModalLazy", "openModal")
  const { ModalRoot, ModalHeader, ModalContent, ModalFooter, ModalCloseButton } = webpack.getModuleByProps("ModalRoot", "ModalHeader")
  const { Heading } = DrApi.webpack.getModuleByProps("Heading")

  function changeLog() {
    openModal(props => React.createElement(ModalRoot, {
      ...props,
      className: "modal-3Hrb0S dr-modal",
      children: [
        React.createElement(ModalHeader, {
          align: justifyBetween,
          separator: false,
          children: [
            React.createElement(Flex.Child, {
              wrap: false,
              children: [
                React.createElement(Heading, {
                  children: "What's New",
                  level: 2,
                  variant: "heading-lg/medium"
                }),
                React.createElement(Text, {
                  variant: "text-xs/normal",
                  children: [
                    "Discord Re-envisioned",
                    " (",
                    React.createElement("span", {
                      children: "ALPHA",
                      style: { color: "var(--status-danger)" }
                    }),
                    ")"
                  ]
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
          className: "container-3PVapX dr-container content-FDHp32 dr-content",
          children: "Text"
        }),
        React.createElement(ModalFooter, {
          direction: horizontal
        })
      ]
    }))
  }

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
          onClick: () => changeLog(),
          children: "ALPHA",
          style: { color: "var(--status-danger)", cursor: "pointer" }
        }),
        ")"
      ]
    }))
  })
}