import { pushTarget, popTarget } from "./Dep"
class Watcher {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm
    // _ => vm.a.b.c
    this.getter = parsePath(expOrFn)
    this.cb = cb
    this.lazy = options.lazy || false
    this.sync = options.sync || false
    this.user = options.user || false
    this.before = options.before
    this.deps = []
    this.value = this.dirty ? undefined : this.get()
  }
  get() {
    pushTarget(this)
    const value = this.getter.call(this.vm, this.vm)
    popTarget()
    return value
  }
  addDep(dep) {
    this.deps.push(dep)
    dep.add(this)
  }
  update() {
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }
  depend() {
    let i = this.deps.length
    while (i--) {
      /*
      只有data里定义的依赖才会实例化Dep用来收集watcher
      dep收集watcher的同时，watcher也会存储dep

      让当前计算属性依赖值对应的dep收集render watcher

      当计算属性依赖值改变时会做两件事：执行computed watcher的update 和 render watcher的update
      */
      this.deps[i].depend()
    }
  }
  evaluate() {
    /*
      获取计算属性值的时候，把计算属性watcher推入了栈顶
      获取计算属性依赖项值的时候，把当前计算属性watcher收集到计算属性依赖项的dep中

      因此当计算属性依赖项改变时，会触发当前计算属性watcher的update方法
      计算属性watcher的update方法不是进入异步队列，而是修改dirty标志为true
      当再次访问当前计算属性时，会执行计算属性的getter，evaluate重新计算，并重置dirty属性为false
      如果计算属性依赖项没有改变，再次访问该计算属性，则返回老值(缓存)

      执行完get方法，计算属性watcher出栈，栈顶为当前组件渲染watcher
    */
    if (this.dirty) {
      this.value = this.get()
      this.dirty = false
    }
    return this.value
  }
  run() {
    const value = this.value
    // callback || updateComponent
    const newValue = this.get()
    this.cb.call(this.vm, newValue, value)
    console.log(`旧值`, value)
    console.log(`新值`, newValue)
  }
  teardown() {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      dep.remove(this)
    }
  }
}

const queue = []

function queueWatcher(watcher) {
  queue.push(watcher)
}

export function watch(vm, expOrFn, cb, options) {
  const watcher = new Watcher(vm, expOrFn, cb, options)
  return function () {
    watcher.teardown()
  }
}

export default Watcher