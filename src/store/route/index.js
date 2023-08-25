// 路由模块
import {
  SET_DYNAMICROUTE_MUTATION,
  SET_DYNAMICROUTE_ACTION,
  DEL_DYNAMICROUTE_MUTATION,
  DEL_DYNAMICROUTE_ACTION
} from './type'
import router, { menuRoute } from '../../router'
import * as storage from '@/utils/storage'
import { deepTrickClone, deepClone } from '@/utils/tools'


/**
 * @description: 依据角色筛选相应权限
 * @param {Object} 包含角色权限状态信息
 * @return {Array} 权限数组
 */
const withRole = function (userInfo = null) {
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
  // JSON拷贝不了函数  使用递归拷贝
  return filter(deepClone(menuRoute))
}


export default {
  state() {
    return {
      dynamicRoute: _ => []
    }
  },
  mutations: {
    [SET_DYNAMICROUTE_MUTATION](state, payload) {
      // storage.formatSetSessionStorage('dynamicRoute', payload)

      // 避免动态路由被递归转换成响应式
      state.dynamicRoute = _ => payload

      router.options.routes.push(...payload)
      payload.forEach(route => {
        router.addRoute(route)
      })
    },
    [DEL_DYNAMICROUTE_MUTATION](state, payload) {
      // storage.formatSetSessionStorage('dynamicRoute', [])
      state.dynamicRoute = _ => payload
    }
  },
  actions: {
    [SET_DYNAMICROUTE_ACTION](context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(_ => {
          const dynamicRoute = withRole(payload)
          context.commit(SET_DYNAMICROUTE_MUTATION, dynamicRoute)
          resolve(dynamicRoute)
        })
      })
    },
    [DEL_DYNAMICROUTE_ACTION](context, payload) {
      context.commit(DEL_DYNAMICROUTE_MUTATION, payload)
    }
  }
}