import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'

// elementui 组件注册
import '@/js/elementui'
// resize事件
import '@/js/resize'
// 全局filters 注册
import './filters'
// 全局directives 注册
import './directives'

new Vue({
  router,
  store,
  render(h) {
    return (
       h(App)
    );
  },
  // beforeCreate(){
  //   router.addRoutes(store.getters.dynamicRoute)
  // }
}).$mount('#sykj')
