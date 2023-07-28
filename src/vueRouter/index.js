import install from "./install"
import createMatcher from "./create-matcher"
import HashHistory from "./history/hash-history"
export default class VueRouter {
  constructor(options) {
    // 将routes列表扁平化
    this.matcher = createMatcher(options.routes)
    // 路由模式
    this.mode = options.mode || 'hash'
    // 基于History类 go back forward api
    this.history = new HashHistory(this)
  }
  // 初始化方法
  init(root) {
    const history = this.history
    // 监听hashchange事件
    const setupHashListener = () => {
      history.setupListener()
    }
    // 渲染当前激活路由对应组件
    history.transitionTo(history.getCurrentLocation(), setupHashListener)
    // 修改根组件_route
    history.listen((route) => {
      root._route = route
      console.log(root._route, 'router')
    })
  }
  // 基于实例matcher属性
  match(location) {
    return this.matcher.match(location)
  }
}
VueRouter.install = install
