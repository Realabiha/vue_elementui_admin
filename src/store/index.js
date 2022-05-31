import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 用户模块
import user from './userInfo'
// 路由模块
import route from './route'

const store = new Vuex.Store({
  modules: {
    user,
    route
  }
})
export default store