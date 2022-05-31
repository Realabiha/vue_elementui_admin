import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login'
import useRouterBeforeEach from './useRouterBeforeEach'
import withStore from '../store/withStore'

/**
 * meta标签代表动态路由  title属性代表menu菜单 auth属性代表权限级别
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
      auth: ['admin', 'user', 'lawyer'], 
      icon: 'el-icon-search', 
      title: '首页'
    },
    path: '/layout/',
    component: _ => import('../components/layout'),
    redirect: '/layout/caseList',
    children: [
      {
        meta: { 
          auth: ['admin', 'user'], 
          icon: 'el-icon-user',
          title: '案件列表' 
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
          auth: ['lawyer'], 
          icon: 'el-icon-refresh',
          title: '案件处理'
        },
        path: 'caseHandle',
        component: _ => import('../views/caseHandle'),
      },
      {
        meta: { 
          auth: ['admin'], 
          icon: 'el-icon-finished',
          title: '案件审批'
        },
        path: 'caseApprove',
        component: _ => import('../views/caseApprove'),
      },
      // {
      //   meta: { 
      //     auth: ['admin', 'user'],
      //     icon: 'el-icon-finished',
      //     title: '律师列表'
      //   },
      //   path: 'lawyerList',
      //   component: _ => import('../views/lawyerList'),
      // },
      {
        meta: { 
          auth: ['lawyer'],
        },
        path: 'logDetail',
        component: _ => import('../views/logDetail')
      },
      {
        meta: { 
          auth: ['lawyer'],
        },
        path: 'caseEdit',
        component: _ => import('../views/caseEdit')
      },
      {
        meta: { 
          auth: ['admin', 'lawyer'],
          icon: 'el-icon-bell',
        },
        path: 'billList',
        component: _ => import('../views/billList')
      },
      {
        meta: { 
          auth: ['admin', 'lawyer'],
          icon: 'el-icon-help',
        },
        path: 'repayPlan',
        component: _ => import('../views/repayPlan')
      },
      // {
      //   meta: { 
      //     auth: ['user', 'lawyer', 'vistor'], 
      //     icon: 'el-icon-receiving',
      //     title: '日志列表'
      //   },
      //   path: 'logList',
      //   component: _ => import('../views/logList')
      // },
      // {
      //   meta: { 
      //     auth: [],
      //     icon: 'el-icon-setting',
      //     title: '权限控制' 
      //   },
      //   path: 'role/',
      //   redirect: 'role/roleControl',
      //   component: _ => import('../views/role'),
      //   children: [
      //     {
      //     meta: { 
      //       auth: [],
      //       title: '权限列表' 
      //     },
      //     path: 'roleControl',
      //     component: _ => import('../views/roleControl')},
      //     {
      //       meta: { 
      //         auth: [],
      //         title: '新增帐户' 
      //       },
      //       path: 'addRole',
      //       component: _ => import('../views/addRole'),
      //     }
      //   ]
      // },
    ]
  },
  {
    meta: {
      auth: ['admin', 'user', 'lawyer'], 
    },
    path: '/404',
    component: () => import('../components/404')
  },
  {
    meta: {
      auth: ['admin', 'user', 'lawyer'], 
    },
    path: '*',
    redirect: '/404'
  },
]

// 先挂载通用路由 登陆后挂载权限路由
const routes = [...constantRoute]
const router = new VueRouter({routes})

Vue.use(VueRouter)

withStore(useRouterBeforeEach)(router)


export default router