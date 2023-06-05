import createArrayProto from '../initState/array'
import Dep from './Dep'
class Observer {
  constructor(data) {
    this.value = data
    this.dep = new Dep()
    // 拦截数组
    if (Array.isArray(data)) {
      // 只重写当前数组的原型，不要直接修改数组本身的原型
      Object.setPrototypeOf(data, createArrayProto)
      this.array(data)
      // 拦截对象
    } else {
      this.object(data)
    }
    Object.defineProperty(data, '__ob__', {
      value: this,
    })
  }
  // 对象
  object(data) {
    Object.keys(data).forEach(key => {
      let value = data[key]
      defineReactive(data, key, value)
      // 递归深度拦截
      // observe(value)
    })
  }
  // 数组
  array(data) {
    data.forEach(item => {
      // 递归深度拦截
      observe(item)
    })
  }
}

// get/set转换
function defineReactive(data, key, value, cb) {
  const dep = new Dep()

  // 递归深度监听
  const ob = observe(value)

  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      console.log(`读取了${key}值`)
      if (Dep.target) {
        dep.depend()
        ob instanceof Observer && ob.dep.depend()
      }
      return value
    },
    set(newValue) {
      if (newValue !== value) {
        value = newValue
      }
      console.log(`设置了${key}值为`, value)
      return value
    }
  })

}

function observe(data) {
  if (typeof data === 'object' && data !== null) {
    const ob = data.__ob__
    if (ob instanceof Observer) {
      return ob
    }
    return new Observer(data)
  }
}

/*
  Object.defineProperty缺陷
  1.新增属性不能被拦截 Vue.set
  2.删除属性不能被拦截 Vue.delete
  3.数组拦截需要重写其原型
*/
/*
  Vue.set
  不能给组件实例添加属性, 会被代理到_data, 访问返回undefined
  不能给组件实例root $data添加属性，共享引用
*/
export function set(data, key, value) {
  if (typeof data === 'object' && data !== null) {
    const ob = data.__ob__

    // 存在key
    if (key in data) {
      data[key] = value
      return value
    }
    // 不存在key
    if (ob instanceof Observer) {
      if (Array.isArray(data) && typeof key === 'number') {
        data.splice(key, 1, value)
      } else {
        console.log(`添加了${key}值为`, value)
        defineReactive(ob.value, key, value)
      }
    }
    // 通知视图更新 ob ? dep defineReactive childOb
    ob.dep.notify()
  }
  return value
}

export function del(data, key) {
  if (typeof data === 'object' && data !== null) {
    if (!(key in data)) {
      return
    }
    const ob = data.__ob__
    if (!(ob instanceof Observer)) {
      delete data[key]
      return
    }
    if (Array.isArray(data) && typeof key === 'number') {
      data.splice(key, 1)
    } else {
      delete data[key]
    }
    ob.dep.notify()
  }
}

export function observable(data) {
  observe(data)
  return data
}

export default observe