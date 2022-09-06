// 用户模块
import {
  SET_USERINFO_MUTATION, 
  SET_USERINFO_ACTION, 
  DEL_USERINFO_ACTION,
  DEL_USERINFO_MUTATION
} from './type'
import * as storage from '@/utils/storage'
import router, {menuRoute} from '../../router'
import {deepTrickClone, deepClone} from '@/utils/tools'

/**
 * @description: 依据角色筛选相应权限
 * @param {Object} 包含角色权限状态信息
 * @return {Array} 权限数组
 */
 const withRole = function(state = {}){
  if(!state.userInfo) return []
  const {isAdmin, role} = state.userInfo
  // if(isAdmin) return menuRoute

  const filter = function(routes){
    const withRole = []
    for(let i = 0; i < routes.length; i++){
      const child = routes[i]
      if(child.meta.auth.includes(role)){
        if(child.children){
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

/**
 * @description: 依据权限数组筛选相应权限
 * @param {Array} 后台权限数组 
 * @return {Array} 权限数组
 */
const withPermission = function(_permission){
  const menus = [
    {
      title: 'a', 
      path: '/a', 
      children: [
        {
          title: '1', 
          path: '1',
          children: [
            {
              title: '2', 
              path: '2',
            }
          ]
        }
      ]
    }, 
    {
      title: 'b', 
      path: '/b', 
      children: [
        {
            title: '1', 
            path: '1',
        }
      ]
    }
  ]
  const permission = _permission || [
    {
      title: 'a', 
      children: [
        {
          title: '1', 
          children: [
            {
              title: '2'
            }
          ]
        }
      ]
    }
  ]

  const withPer = []

  const filter = function(origin, target, flag = 1){
    for(let i = 0; i < origin.length; i++){
      const o = origin[i]
      for(let j = 0; j < target.length; j++){
        const t = target[j]
        if(o.title === t.title){
          const temp = {title: o.title, path: o.path}
          flag && withPer.push(temp)
          if(o?.children?.length && t?.children?.length){
            temp.children = filter(o.children, t.children, 0)
          }
          return temp
        }
      }
    }
  }

  filter(menus, permission)

  return withPer
}

export default {
  state(){
    return {
      userInfo: storage.formatGetSessionStorage('userInfo')
    }
  },
  // 刷新页面更新
  getters: {
    dynamicRoute: state => {
      const dynamicRoute =   withRole(state)
      // router.addRoutes(dynamicRoute)
      return dynamicRoute
    }
  },
  mutations: {
    [SET_USERINFO_MUTATION](state, payload){
      storage.formatSetSessionStorage('userInfo', payload)
      state.userInfo = payload
    },
    [DEL_USERINFO_MUTATION](state){
      storage.formatSetSessionStorage('userInfo', null)
      state.userInfo = null
    }
  },
  actions: {
    async [SET_USERINFO_ACTION](context, payload){
      await 1
      context.commit(SET_USERINFO_MUTATION, payload)
    },
    [DEL_USERINFO_ACTION](context){
      context.commit(DEL_USERINFO_MUTATION)
    }
  }
}