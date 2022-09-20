export default new class Webpack {
  constructor() {
    let waiting = new Set()
    let webpackModules = {}
    
    window.webpackChunkdiscord_app ??= []

    window.webpackChunkdiscord_app.push([
      [ Symbol("DrApi") ], 
      { }, 
      instance => this.instance = instance
    ])

    let old = window.webpackChunkdiscord_app.push
  
    function makeHandler(original) {
      function handler(chunk) {
        const [, modules] = chunk
  
        for (const id in modules) {
          const old = modules[id]
          modules[id] = function(module) {
            const res = old.apply(this, arguments)
            for (const ite of [...waiting]) ite(module.exports, id)
            
            webpackModules[id] = module.exports
            
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
  #ensureQuery(query) {
    if (!query) query = () => true
    if (typeof query === "function") query = { filter: query }

    query.defaultExport ??= false

    if (query.filters) {
      query.filters = query.filters.map(filter => this.#ensureQuery(filter))
      query.filter = (module, id) => query.filters.every(query => query.filter(module, id))
    }

    const old = query.filter
    query.filter = (module, id) => {
      try { return old(query.searchInDefault ? module.default : module, id) }
      catch (error) { }
    }

    return query
  }
  getModule(query) {
    query = this.#ensureQuery(query)

    for (const id in this.webpackModules) {
      const module = this.webpackModules[id]
      if (!module) continue
      if (query.filter(module, id)) return query.defaultExport ? module.default : module
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
    return this.getModule({
      filter: module => module.displayName === displayName,
      searchInDefault: true,
      defaultExport: returnDefault
    })
  }
  getBulk(...queries) {
    queries = queries.map(query => this.#ensureQuery(query))

    return queries.map(query => {
      for (const id in this.webpackModules) {
        const module = this.webpackModules[id]
        if (query.filter(module, id)) return query.defaultExport ? module.default : module
      }
    })
  }
  getAllModules(query) {
    query = this.#ensureQuery(query)

    let modules = []
    
    for (const id in this.webpackModules) {
      const module = this.webpackModules[id]
      if (!module) continue
      if (query.filter(module, id)) modules.push(query.defaultExport ? module.default : module)
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
    return this.getAllModules({
      filter: module => module.displayName === displayName,
      searchInDefault: true,
      defaultExport: returnDefault
    })
  }
  getModuleAsync(query) {
    query = this.#ensureQuery(query)
    
    let _this = this
    return new Promise(resolve => {
      const cached = this.getModule(query)
      if (cached) return resolve(cached)

      function waiter(module, id) {
        if (!module) return
        
        if (query.filter(module, id)) {
          _this.waiting.delete(waiter)
          resolve(query.defaultExport ? module.default : module)
          return true
        }
      }

      this.waiting.add(waiter)
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
        if (props.every(prop => typeof module[prop] !== "undefined")) {
          resolve(module)
          return true
        }
        if (!module?.default) return
        if (props.every(prop => typeof module.default[prop] !== "undefined")) {
          resolve(module.default)
          return true
        }
      })
    })
  }
  async getModuleByDisplayNameAsync(displayName, returnDefault = false) {
    const module = await this.getModuleAsync(module => module?.default.displayName === displayName)
    if (returnDefault) return module?.default
    return module
  }
}
