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



// webpack runtime
;(function(modules){
  const cachedModules = {}
  const installedChunks = {}
  const webpack_require = function(moduleid){
    if(cachedModules[moduleid]) return cachedModules[moduleid].exports
    const module = cachedModules[moduleid] = {
      id: moduleid,
      l: false,
      exports: {}
    }
    modules[moduleid].call(module.exports, module, module.exports, webpack_require)
    module.l = true
    return module.exports
  }


  // 动态加载，先加载chunk后加载模块

  webpack_require.e = function(chunkid){
    // const installedChunks = {}
    const promises = []
    if(installedChunks[chunkid] === 0) return
    const promise = new Promise((resolve, reject) => {
      installedChunks[chunkid] = [resolve, reject, promise]
    })
    promises.push(promise)
    return Promise.all(promises)
  }


  window['webpackJsonpCallback'] = window['webpackJsonpCallback'] = []
  webpackJsonpCallback.push = function(chunks = [], modules = {}){
    const resolves = []
    for(let i = 0; i < chunks.length; i++){
      resolves.push(chunks[i][0])
    }

    for(let moduleid in modules){
      // cachedModules
    }


    while(resolves.length){
      resolves.shift()()
    }
  } 


  return webpack_require('./path/to/entry')
})({
'./your/path/to/module': function(module, webpack_exports, webpack_require){
  'use strict'
  // ...
}
})


class VueRouter{
  static install(Vue){

  }
  constructor(options){
    Vue.component()
    Vue.observable({$route: {current: '/'}})
    Vue.mixin({})
  }
  init(){

  }
  initEvent(){}
  initComponent(){
    Vue.component('router-link', {
      data(){
        return {}
      },
      props: {
        to: {
          required: false,
          type: String,
          default: '/'
        }
      },
      render(h){
        // <a to="/"><slot></slot></a>
        return h('a', {to: this.$props.to, '@click': this.onClick}, '<slot></slot>')
      },
      methods: {
        onClick(e){
          e.preventDefault()
          this.$route.current = this.$props.to
        }
      }
    })
    Vue.component('router-view', {
      props: {},
      render(h){
        return h()
      }
    })
  }
}

class Store{}
const Vuex = {
  install(){},
  Store
}


const retryAjax = function(ajax, count = 3){
  const sendAjax = function(){
    return new Promise((resolve, reject) => {
      const send = function(){
        return new Promise((res, rej) => {
          setTimeout(_ => {
            Math.random() > .5 ? res(123) : rej(789)
          })
        })
      }
      const tasks = new Array(count).fill(send)
      const excute = function(data){
        if(tasks.length){
          tasks.shift()()
          .then(res => {
            resolve(res)
          },
          rej => {
            excute(rej)
          })
          .catch(err => {
            excute(err)
          })
        }else{
          reject(data)
        }
      }
      excute()
    })
  }
  return sendAjax()
}