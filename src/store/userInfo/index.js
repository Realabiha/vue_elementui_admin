// 用户模块
import {
  SET_USERINFO_MUTATION,
  SET_USERINFO_ACTION,
  DEL_USERINFO_ACTION,
  DEL_USERINFO_MUTATION,
} from './type'
import * as storage from '@/utils/storage'
import router, { menuRoute } from '../../router'
import { deepTrickClone, deepClone } from '@/utils/tools'

/**
 * @description: 依据角色筛选相应权限
 * @param {Object} 包含角色权限状态信息
 * @return {Array} 权限数组
 */
const withRole = function (state = {}) {
  if (!state.userInfo) return []
  const { isAdmin, role } = state.userInfo
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
  /**
   * JSON拷贝限制  使用递归拷贝
   * 对象中有时间类型的时候，序列化之后会变成字符串类型。
   * 对象中有undefined和Function类型数据的时候，序列化之后会直接丢失。
   * 对象中有NaN、Infinity和-Infinity的时候，序列化之后会显示 null。
   * 对象循环引用的时候，会直接报错。
   * */
  return filter(deepClone(menuRoute))
}

export default {
  state() {
    return {
      userInfo: Object.freeze(storage.formatGetSessionStorage('userInfo')),
    }
  },
  // 刷新页面更新
  getters: {
    // dynamicRoute: (state) => {
    //   const dynamicRoute = withRole(state)
    //   // router.addRoutes(dynamicRoute)
    //   return dynamicRoute
    // },
  },
  mutations: {
    [SET_USERINFO_MUTATION](state, payload) {
      storage.formatSetSessionStorage('userInfo', payload)
      state.userInfo = payload
    },
    [DEL_USERINFO_MUTATION](state) {
      storage.formatSetSessionStorage('userInfo', null)
      state.userInfo = null
    },
  },
  actions: {
    [SET_USERINFO_ACTION](context, payload) {
      context.commit(SET_USERINFO_MUTATION, payload)
    },
    [DEL_USERINFO_ACTION](context) {
      context.commit(DEL_USERINFO_MUTATION)
    },
  },
}
