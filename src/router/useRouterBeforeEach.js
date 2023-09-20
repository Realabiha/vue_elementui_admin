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
  router.beforeEach((to, from, next) => {
    // 用户信息
    const { userInfo = null } = store.state.user

    // 动态路由
    // const { dynamicRoute = [] } = store.getters
    const { dynamicRoute = _ => [] } = store.state.route

    // 登录信息
    const isLogin = function () {
      return !!userInfo
    }

    // 登录放行
    if (to.name === 'Login') return next()

    // 未登陆拦截
    if (!isLogin()) return next({ name: 'Login', replace: true })

    console.log(dynamicRoute(), 'dynamicRoute')
    console.log(userInfo, 'userInfo')
    // 登录已添加动态路由
    if (dynamicRoute().length) return next()

    // 登陆没有添加动态路由
    store
      .dispatch(
        SET_DYNAMICROUTE_ACTION,
        userInfo
      )
      .then(dynamicRoute => next({ ...to })); // 添加成功后重定向到当前路由


    // 添加动态路由
    // if (to.matched.length < 1 && dynamicRoute.length) {
    //   debugger
    //   dynamicRoute.forEach((route) => router.addRoute(route))
    //   router.options.routes.push(...dynamicRoute)
    //   return next({ ...to })
    // }
    // addRoutes添加完成放行
    // return next()
    // next()





  })
}
