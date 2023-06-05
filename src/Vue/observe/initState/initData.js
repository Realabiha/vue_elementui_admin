import observe from './Observer'
function initData(vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data() : data
  Object.keys(data).forEach(key => {
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get() {
        return vm._data[key]
      },
      set(newValue) {
        vm._data[key] = newValue
      }
    })
  })
  observe(data)
}
export default initData