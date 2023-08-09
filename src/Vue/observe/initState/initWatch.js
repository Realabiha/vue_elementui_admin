export default function (vm, options) {
  // const { expOrFn, cb } = options
  Object.keys(options).forEach(key => {
    const { expOrFn, cb } = options[key]
    const unwatch = vm.$watch(vm, expOrFn, cb)
  })
}