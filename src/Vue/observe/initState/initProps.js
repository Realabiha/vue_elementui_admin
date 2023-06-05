import { defineReactive } from './Observer'
/*
  模板编译的时候，组件标签上的所有属性，会被解析出来，然后实例化子组件的时候，作为组件选项传入
*/
export default function (vm) {
  let propsData = vm.$options.propsData
  const props = vm._props = {}

  Object.keys(propsData).forEach(prop => {
    const value = propsData[prop]
    defineReactive(props, prop, value)
  })


  Object.defineProperty(vm, key, {
    enumerable: true,
    configurable: true,
    get() {
      return vm._props[key]
    },
    set(newValue) {
      // const value = vm[key]
      // if (value === newValue) return
      // vm[key] = newValue
      vm._props[key] = newValue
    }
  })
}