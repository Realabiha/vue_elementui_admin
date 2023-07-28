import RouterView from './components/view'
import RouterLink from './components/link'

/** 
 * 为什么 不直接import Vue from 'vue'
 * 而要设计 install 方法通过参数传递Vue,闭包的方式拿到
 * 模块化导入 Vue的代码会被打包工具打到vue-router代码里 
 */
export let Vue = null
/**
 * @description: 1.Vue.mixin混入逻辑 2.router初始化
 * @param {*} _Vue
 * @return {*}
 */
export default function install(_Vue) {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      // 根组件
      if (this.$options.router) {
        // _开头 私有属性 挂在组件实例上
        this._routerRoot = this
        this._router = this.$options.router
        // 路由初始化
        this._router.init(this)
        // 响应式私有属性
        Vue.util.defineReactive(this, '_route', this._router.history.current)
        // 子组件
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot || this
      }
    }
  })
  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route
    }
  })
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router
    }
  })

  Vue.component('router-view', RouterView)
  Vue.component('router-link', RouterLink)
}