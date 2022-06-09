import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import useRouterBeforeEach from './useRouterBeforeEach'
import useRouterOnError from './useRouterOnError'
import withStore from '../store/withStore'

/**
 * meta 路由信息  title 菜单名字 auth 权限级别 icon 菜单图标
 * 
 * admin 超管可查看全部页面
 * user 管理员可查看对应页面
 * lawyer 律师可查看对应页面
 * vistor 游客模式
 * 
 * 页面路由目前全部在前端控制，如果有调整权限需求建议由后端来控制
 */

// 通用路由
export const constantRoute = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

// 权限路由
export const menuRoute = [
  {
    meta: {
      auth: ['admin', 'user', 'lawyer', 'vistor'], 
      icon: 'el-icon-search',
      title: '一级菜单'
    },
    path: '/layout/',
    component: _ => import('../components/layout'),
    children: [
      {
        meta: { 
          auth: ['admin', 'user', 'lawyer', 'vistor'], 
          icon: 'el-icon-help',
          title: '首页' 
        },  
        path: 'welcome',
        component: _ => import('../components/welcome'),
      },
      {
        meta: { 
          auth: ['admin', 'user'], 
          icon: 'el-icon-user',
          title: '列表' 
        },  
        path: 'caseList',
        component: _ => import('../views/caseList'),
      },
      {
        meta: { 
          auth: ['admin', 'user', 'lawyer'], 
        },
        path: 'caseDetail/:id',
        component: _ => import('../views/caseDetail'),
      },
      {
        meta: { 
          auth: ['admin'],
          icon: 'el-icon-setting',
          title: '权限' 
        },
        path: 'role/',
        component: _ => import('../views/role'),
        redirect: '/layout/role/roleControl',
        children: [
          {
            meta: { 
              auth: ['admin'],
              title: '权限列表' 
            },
            path: 'roleControl',
            component: _ => import('../views/roleControl'),
            beforeEnter(to, from, next){
              if(to.path !== from.path) next()
              console.log('beforeEnter')
            }
          },
          {
            meta: { 
              auth: ['admin'],
              title: '新增帐户' 
            },
            path: 'addRole',
            component: _ => import('../views/addRole'),
          }
        ]
      },
      {
        meta: {
          auth: ['admin', 'user', 'lawyer'], 
        },
        path: '404',
        component: () => import('../components/404')
      },
      {
        meta: {
          auth: ['admin', 'user', 'lawyer'], 
        },
        path: '*',
        redirect: '404'
      }
    ]
  }
]

// 先挂载通用路由 登陆后挂载权限路由
const routes = [...constantRoute]
const router = new VueRouter({routes})

Vue.use(VueRouter)


withStore(useRouterBeforeEach)(router)


export default router