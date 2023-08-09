export let Vue
class ModuleCollection {
  constructor(module) {
    return this.register(module)
  }
  register(module, result = Object.create(null)) {
    /**
     * {
     *  raw: module,
     *  state: module.state,
     *  children:{
     *    a: {
     *      raw: AModule,
     *      state: AModule.state,
     *      children: {} 
     *    }
     *  }
     * }
     * */

    result.raw = module
    result.state = module.state
    const modules = module.modules
    if (modules) {
      result.children = Object.create(null)
      Object.keys(modules).forEach(module => {
        result.children[module] = this.register(modules[module], modules[module])
      })
    }
    return result
  }
}
class Store {
  constructor(options) {
    this.vm = new Vue({
      data: {
        state: options.state || {}
      }
    })

    // 格式化模块
    const rootModule = new ModuleCollection(options)

    // getters
    this.getters = Object.create(null)
    // Object.keys(options.getters || {}).forEach(getterKey => {
    //   Object.defineProperty(this.getters, getterKey, {
    //     get: () => {
    //       return options.getters[getterKey](this.state)
    //     }
    //   })
    // })
    // mutations
    this.mutations = Object.create(null)
    // Object.keys(options.mutations || {}).forEach(mutationKey => {
    //   this.mutations[mutationKey] = payload => {
    //     options.mutations[mutationKey](this.state, payload)
    //   }
    // })
    // actions
    this.actions = Object.create(null)
    // Object.keys(options.actions || {}).forEach(actionKey => {
    //   this.actions[actionKey] = payload => {
    //     options.actions[actionKey](this, payload)
    //   }
    // })

    // 安装模块
    const installModule = function (store, module, path = []) {
      const { state, children } = module
      const { getters, mutations, actions } = module.raw

      if (path.length) {
        const parent = path.slice(0, -1).reduce((prev, item) => {
          return prev.children[item]
        }, rootModule)
        console.log(parent, path, 'path')
        Vue.set(parent.state, path[path.length - 1], module.state)
      }

      // getters
      getters && Object.keys(getters).forEach(getterName => {
        store.getters = store.getters || {}
        const getterFn = getters[getterName]
        Object.defineProperty(store.getters, getterName, {
          get() {
            return getterFn(state)
          }
        })
      })
      // mutations
      mutations && Object.keys(mutations).forEach(mutationName => {
        const mutationFn = mutations[mutationName]
        store.mutations[mutationName] = store.mutations[mutationName] || []
        const wrapMutationFn = payload => {
          mutationFn(state, payload)
        }
        store.mutations[mutationName].push(wrapMutationFn)
      })

      children && Object.keys(children).forEach(moduleName => installModule(store, children[moduleName], path.concat(moduleName)))
      // actions
      actions && Object.keys(actions).forEach(actionName => {
        const actionFn = actions[actionName]
        store.actions[actionName] = store.actions[actionName] || []
        const wrapActionFn = payload => {
          actionFn(store, payload)
        }
        store.actions[actionName].push(wrapActionFn)
      })
    }

    installModule(this, rootModule)
    console.log(this, 'store')


  }
  get state() {
    return this.vm.state
  }
  commit(type, payload) {
    // this.mutations[type](payload)
    this.mutations[type].forEach(fn => fn(payload))
  }
  dispatch(type, payload) {
    // this.actions[type](payload)
    this.actions[type].forEach(fn => fn(payload))
  }
}
export default {
  install(_Vue) {
    Vue = _Vue
    Vue.mixin({
      beforeCreate() {
        if (this.$options.store) {
          this.$store = this.$options.store
        } else {
          this.$store = this.$parent && this.$parent.$store
        }
      }
    })
  },
  Store
}