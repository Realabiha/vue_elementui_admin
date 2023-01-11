// 路由全局钩子拦截
import { SET_DYNAMICROUTE_ACTION } from '../store/route/type'
import router, { menuRoute } from '../router'
import { deepTrickClone, deepClone } from '../utils/tools'

/**
 * @description: 依据角色筛选相应权限
 * @param {Object} 包含角色权限状态信息
 * @return {Array} 权限数组
 */
const withRole = function ({ userInfo }) {
  //  debugger
  if (!userInfo) return []
  const { isAdmin, role } = userInfo
  // if(isAdmin) return menuRoute

  const filter = function (routes) {
    const withRole = []
    for (let i = 0; i < routes.length; i++) {
      const child = routes[i]
      if (child.meta.auth.includes(role)) {
        if (child.children) {
          child.children = filter(child.children)
        }
        withRole.push(child)
      }
    }
    return withRole
  }
  // JSON拷贝有问题？  使用递归拷贝
  return filter(deepClone(menuRoute))
}
export default function (store, router) {
  // 在beforeEach钩子执行前获取vuex中的状态?
  router.beforeEach(async (to, from, next) => {
    console.log(from, 'beforeEach')
    // 用户信息
    const { userInfo = null } = store.state.user

    // 动态路由
    const { dynamicRoute = [] } = store.getters

    // 登录信息
    const isLogin = function () {
      return !!userInfo
    }
    // 登录放行
    if (to.name === 'Login') return next()

    // 未登陆拦截
    if (!isLogin()) return next({ name: 'Login', replace: true })

    /**
     * 页面刷新动态路由重新添加
     * 如果动态路由为空则会栈溢出
     * beforeEach中使用addRoutes是无法添加的,因为这是访问路由之前的钩子,
     * 你需要自己做判断,addRoutes过后重定向到访问的页面,再次访问就可以了,因为已经执行过addRoutes了
     **/
    if (to.matched.length < 1 && dynamicRoute.length) {
      // 替换当前导航(会重新触发beforeEach)，此时addRoutes添加完成
      dynamicRoute.forEach((route) => router.addRoute(route))
      // return router.replace(to)
      // router.push({...to, replace: true})
      // return next()

      router.options.routes.push(...dynamicRoute)
      // return next({ ...to, replace: true })
      // return next()
      return router.push({ ...to })
    }
    // addRoutes添加完成放行
    return next()
  })
}
