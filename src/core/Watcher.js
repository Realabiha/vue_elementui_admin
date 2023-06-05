// vue 中 new Watcher 其实有 3 个时机

// 1 调用 mountComponet 的时候 new Watcher 这个 watcher 是一个渲染 watcher，首次渲染生成 vnode 的过程中访问到定模板中定义的数据触发 getter，做一次依赖收集，这条数据的 dep 就订阅了这个渲染 watcher，当数据改变执行 dep.notify 的时候，会执行 watcher.update 最终执行一次真实的渲染

// 2 计算属性的时候，此时也会 new Watcher 这个 watcher 是个 compute watcher ，是在 vue 的 initState 中会 initComputed，这个 computed watcher 不会立刻执行 getter 而是当生成 vnode 的时候访问到某个计算属性的值的时候，会触发 computed getter，进而执行 computed 的回调，回调里面的数据此时都会收集这个 comupted watcher，数据改变的时候 computed watcher 的 update 会执行

// 3 vue 中 watch 某个数据变化的时候，也会 new Watcher 这个 watcher 是个 user watcher，在 initComputed 之后就会 initWatch，内部其实是手动调用了 vm.$watch 这个 api，原理也是拿到 watch 的每个 key 做一次访问，触发对应数据的 getter，进而让这些数据的 user watcher 订阅这条数据的 dep，这样数据改变的时候，会触发这个 user watcher 的 update
// export default class Watcher {
//   constructor(vm, expOrFn, cb) {
//     this.vm = vm;
//     this.cb = cb;
//     this.value = this.get(expOrFn);
//   }
//   get(expOrFn) {
//     window.target = this;
//     const value = this.vm[expOrFn] || expOrFn();
//     window.target = null;
//     return value;
//   }
//   update() {
//     const oldValue = this.value;
//     this.value = this.get();
//     this.cb.call(this, this.value, oldValue);
//   }
// }

const target = { name: 'Abiha', age: 18 }


class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm
    this.cb = cb
    this.getter = typeof expOrFn === 'function' ? expOrFn : function (key) { return target[key] }
    this.value = this.get()
  }
  get() {
    Dep.target = this
    const vm = this.vm
    const value = this.getter.call(vm, 'age')
    Dep.target = null
    return value
  }
  update() {
    const oldValue = this.value
    const value = this.get()
    this.value = value
    const vm = this.vm
    this.cb.call(vm, oldValue, value)
  }
}

class Dep {
  constructor() {
    this.subs = []
  }
  add() {
    Dep.target && this.subs.push(Dep.target)
  }
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}

class Observer {
  constructor(state) {
    this.state = state
    this.walk()
  }
  walk() {
    const target = this.state
    Object.keys(target).forEach(key => {
      if (target.hasOwnProperty(key)) {
        const value = target[key]
        defineReactive(target, key, value)
      }
    })
  }
}

function defineReactive(state, key, value) {
  const dep = new Dep()
  Object.defineProperty(state, key, {
    get() {
      if (Dep.target) dep.add(Dep.target)
      console.log('getter', value)
      return value
    },
    set(newValue) {
      console.log('setter', newValue)
      if (value === newValue) return
      value = newValue
      dep.notify()
    }
  })
}





new Observer(target)

new Watcher(null, 'age', function (vm, oldValue, value) {
  console.log(oldValue, value)
})

target.age = 29