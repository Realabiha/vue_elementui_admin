const data = [
  {id: 0, value: '0', pid: -1},
  {id: 1, value: '1', pid: 0},
  {id: 2, value: '2', pid: 1},
  {id: 3, value: '3', pid: 1},
  {id: 4, value: '4', pid: 3},
  {id: 5, value: '5', pid: 4},
]

const obj = data.reduce((prev, item) => {
  prev[item.id] = item
  return prev
}, {})


let result = []

Object.keys(obj).forEach(key => {
  const value = obj[key]
  if(obj[value.pid]){
    obj[value.pid].children = obj[value.pid].children || []
    obj[value.pid].children.push(value)
  }else{
    result = value
  }
})
console.dir(result)

const flat = function(){
  const filter = function(array){
    return array.reduce((prev, item) => {
      if(typeof item == 'object'){
        return prev.concat(filter(item))
      }else{
        prev.push(item)
        return prev
      }
    }, [])
  }
  return filter([1, [2, [3, [4, [5]]]]])
} 
console.log(flat())

// new _Promise((resolve, reject) => {}).then(res => res, rej => rej)
class _Promise{
  constructor(excutor){
    const resolve = value => {
      this.state = 'RESOLVED'
      this.value = value
      this.callbacks.forEach(({onResolve}) => onResolve(value)
      )
    }
    const reject = reason => {
      this.state = 'REJECTED'
      this.value = reason
      this.callbacks.forEach(({onReject}) => onReject(reason))
    }
    try {
      excutor.call(this, resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  // 状态
  state = 'PENDING'
  // 异步修改状态时保存回调
  callbacks = []
  // 值
  value
  then(onResolve, onReject){
    if(typeof onResolve != 'function') onResolve = _ => _
    if(typeof onReject != 'function') onReject = _ => _

    return new _Promise((resolve, reject) => {
      console.log(this)
      const enqueue = function(handler, value){
        setTimeout(_ => {
          let result
          try {
            result = handler(value)
          } catch (error) {
            reject(error)            
          }
          if(result instanceof _Promise)
          result.then(res => resolve(res), rej => reject(rej))
          resolve(result)
        })
      }

      if(this.state == 'PENDING'){
        this.callbacks.push({
          onResolve: _ => enqueue(onResolve, this.value),
          onReject: _ => enqueue(onReject, this.value)
        })
        return
      }
      if(this.state == 'RESOLVED'){
        enqueue(onResolve, this.value)
        return 
      }
      if(this.state == 'REJECTED'){
        enqueue(onReject, this.value)
      }
    })
  }
}


const _promise = new _Promise((resolve, reject) => {setTimeout(_ => resolve(123))})
.then(res => asd, rej => console.log(rej, 'rej'))
.then(res => console.log(res, 'res'), rej => console.log(rej, 'rej'))

const targetMap = new Map()
      keyMap = new Map()
      deps = new Set()

const effect = function(data){
  console.log('数据改变了执行effect')
  return data.a
}

const reactive = function(target){
  return new Proxy(target, {
    get(target, key){
      // 收集依赖 target->key->deps
      deps.add(effect)
      if(!keyMap.get(key)){
        keyMap.set(key, deps)
      }
      if(!targetMap.get(target)){
        targetMap.set(target, keyMap)
      }

      return Reflect.get(target, key)
    },
    set(target, key, value){
      // 触发依赖
      keys = targetMap.get(target) 
      effects = keys.get(key)
      for(let effect of effects){
        effect(target)
      }

      return Reflect.set(target, key, value)
    }
  })
}

const proxy = reactive({a: 1})

// effect(proxy)
// console.dir(targetMap)

const dispatchRequest = function(config = {}){
  return new Promise((resolve, reject) => {
    // adapter
  })
}

class Intercepter{
  // 实例
  handlers = []
  // 公共
  use(onResolve, onReject){
    this.handlers.push({onResolve, onReject})
  }
  forEach(callback){
    this.handlers.forEach(handler => callback(handler))
  }
}

console.log(new Intercepter())

class Axios{
  intercepter = {
    request: new Intercepter(),
    response: new Intercepter()
  }
  request(config){
    const queue = [dispatchRequest, undefined]
    this.intercepter.request.forEach(({onResolve, onReject}) => {
      queue.unshift(onResolve, onReject)
    })
    this.intercepter.response.forEach(({onResolve, onReject}) => {
      queue.push(onResolve, onReject)
    })
    let promise = Promise.resolve(config)
    while(queue.length){
      promise = promise.then(queue.shift(), queue.shift())
    }
    return promise
  }
}

console.log(new Axios())


class Watcher{
  constructor(vm, exporfun, cb){
    this.vm = vm
    this.value = this.get()
    this.cb = cb
    this.getter = exporfun
  }
  get(){
    window.target = this
    const value = this.getter()
    window.target = null
    return value
  }
  notify(){
    const old = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, old)
  }
}

class Dep{
  constructor(){
    this.cbs = []
  }
  add(){
    if(window.target){
      this.cbs.push(window.target)
    }
  }
  remove(cb){
    const index = this.cbs.findIndex(cb => cb == cb)
    this.cbs.splice(index, 1)
  }
  notify(){
    const cbs = this.cbs.slice(0)
    cbs.forEach(watcher => {
      watcher.notify()
    })
  }
}


class Observer{
  constructor(data){
    this.observe(data)
  }
  observe(data){
    const reactive = (data) => {
      Object.defineProperty(data, '__ob__', {
        enumerable: false,
        configurable: false,
        value: this
      })
      Object.keys(data).forEach(key => {
        let val = data[key]
        if(typeof val == 'object'){
          reactive(val)
        }else{
          const dep = new Dep()
          Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get(){
              // 收集
              if(window.target) dep.add(window.target)
              return val
            },
            set(value){
              // 更新
              dep.notify()
              val = value
            }
          })
        }
      })
    }
    reactive(data)
  }
}
const test = {a: 1, b: {c: 2}}

new Observer(test)

test.a
test.a = 2
console.log(test)


// 挂载
Vue.prototype.$mount = function(el){
  el = el && document ? document.querySelector(el) : null
  return mountComponent(this, el)
}

let updateComponent

function mountComponent(vm, el){
  vm.callHook(vm, 'beforeMount')
  updateComponent = function(){
    vm.update(vm.render, function(){
      callHook(vm, 'updated')
    })
  }
  if(vm.isMounted){
    callHook(vm, 'mounted')
  }
  
}
new Watcher(vm, updateComponent, function(){
  if(vm.isMounted){
    callHook(vm, 'beforeUpdate')
  }
})
