module.exports = new class rawWebpack {
  constructor() {
    let waiting = []
    let webpackModules = {}
    window.webpackChunkdiscord_app ??= []
    
    window.webpackChunkdiscord_app.push([[Symbol("DrApi")], {}, instance => {
      window.webpackChunkdiscord_app.pop()
      this.instance = instance
    }])

    let old = window.webpackChunkdiscord_app.push
  
    function makeHandler(original) {
      function handler(chunk) {
        const [, modules] = chunk
  
        for (const id in modules) {
          const old = modules[id]
          modules[id] = function(_, module) {
            const res = old.apply(this, arguments)
            for (const ite of waiting) ite(module, id)

            webpackModules[id] = _.exports
            
            if (_.exports && !_.exports.css) {
              const m = Object.entries(_.exports)
              m.map(([id, selector]) => {
                if (typeof selector !== "string") return 
                if (!selector.includes(`${id}-`)) return 
                let newSelector = []
                for (const s of selector.split(" ")) newSelector.push(`${s} dr-${s.split("-")[0]}`)
                _.exports[id] = newSelector.join(" ")
              })
            }
            
            return res
          }
        }
  
        return original.apply(this, [chunk])
      }
      return old === original ? () => handler : handler
    }
  
    Object.defineProperty(window.webpackChunkdiscord_app, "push", {
      configurable: true,
      get: makeHandler(old),
      set: (val) => {
        Object.defineProperty(window.webpackChunkdiscord_app, "push", {
          value: makeHandler(val),
          configurable: true,
          writable: true
        })
      }
    })

    this.webpackModules = webpackModules
    this.waiting = waiting
  }
  getModule(filter) {
    for (const id in this.webpackModules) {
      try {
        const module = this.webpackModules[id]
        if (!module) continue
        if (filter(module, id)) return module
      } catch (error) {}
    }
  }
  getModuleById(id) { return this.webpackModules[id] }
  getModuleByProps(...props) {
    let _module
    this.getModule(module => {
      if (props.every(prop => typeof module[prop] !== "undefined")) return _module = module
      if (!module?.default) return
      if (props.every(prop => typeof module?.default[prop] !== "undefined")) return _module = module?.default
    })
    return _module
  }
  getModuleByDisplayName(displayName, returnDefault = false) {
    const module = this.getModule(module => module?.default.displayName === displayName)
    if (returnDefault) return module?.default
    return module
  }
  getAllModules(filter) {
    let modules = []
    for (const id in this.webpackModules) {
      try {
        const module = this.webpackModules[id]
        if (!module) continue
        if (filter(module)) modules.push(module)
      } catch (error) {}
    }
    return modules
  }
  getAllModulesByProps(...props) {
    let modules = []
    this.getAllModules(module => {
      if (props.every(prop => typeof module[prop] !== "undefined")) return modules.push(module)
      if (!module?.default) return
      if (props.every(prop => typeof module?.default[prop] !== "undefined")) return modules.push(module?.default)
    })
    return modules
  }
  getAllModulesByDisplayName(displayName, returnDefault = false) {
    const modules = this.getAllModules(module => module?.default.displayName === displayName)
    if (returnDefault) modules.map(module => module?.default)
    return modules
  }
  getModuleAsync(filter) {
    let _this = this
    return new Promise(resolve => {
      const cached = _this.getModule(filter)
      if (cached) return resolve(cached)
      function waiter(module, id) {
        try {
          if (!module) return
          if (filter(module, id)) {
            const i = _this.waiting.indexOf(waiter)
            _this.waiting.splice(i, 1)
            return resolve(module)
          }
        } catch (error) {}
      }
      this.waiting.push(waiter)
    })
  }
  getModuleByIdAsync(moduleId) {
    const cached = this.webpackModules[moduleId]
    if (cached) return Promise.resolve(cached)
    return this.getModuleAsync((_, id) => Number(id) === Number(moduleId))
  }
  getModuleByPropsAsync(...props) {
    return new Promise(resolve => {
      this.getModuleAsync((module) => {
        if (props.every(prop => typeof module[prop] !== "undefined")) return resolve(module)
        if (!module?.default) return
        if (props.every(prop => typeof module?.default[prop] !== "undefined")) return resolve(module?.default)
      })
    })
  }
  async getModuleByDisplayNameAsync(displayName, returnDefault = false) {
    const module = await this.getModuleAsync(module => module?.default.displayName === displayName)
    if (returnDefault) return module?.default
    return module
  }
}
