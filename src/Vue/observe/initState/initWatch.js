export default function (vm, options) {
  // const { getter, cb } = options
  Object.keys(options).forEach(key => {
    const { getter, cb } = options[key]
    const unwatch = vm.$watch(vm, getter, cb)
  })
}