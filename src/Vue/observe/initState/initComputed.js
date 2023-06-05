import Watcher from './Watcher'
import Dep from './Dep'
export default function (vm, options) {
  const watchers = vm._computedWatchers = Object.create(null)
  Object.keys(options).forEach(key => {
    const { getter, setter } = options[key]

    const wrappedGetter = wrapComputedGetter.call(vm, key, getter)

    Object.defineProperty(vm, key, {
      enumerable: true,
      configurable: false,
      get: wrappedGetter,
      set: setter
    })

    watchers[key] = new Watcher(vm, wrappedGetter, cb, { lazy: true })
  })
}

function wrapComputedGetter(vm, key, getter) {
  return _ => {
    const watcher = vm._computedWatchers[key]
    const value = getter.call(vm)
    if (watcher) {
      watcher.evaluate()
    }
    if (Dep.target) {
      watcher.depend()
    }
    return value
  }
}