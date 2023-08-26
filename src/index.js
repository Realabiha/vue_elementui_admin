import Vue from 'vue'
import App from './app'
import router from './router'
import store from './store'
import { useDirective } from './directives'
import { useFilter } from './filters'
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
// import '@/css/var.scss'

// Vue.use(Element)

useDirective()
useFilter()


new Vue({
  router,
  store,
  render(h) {
    return h(App)
  }
}).$mount('#sykj')
