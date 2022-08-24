import Vue from 'vue'
import App from './app.vue'
// import VueRouter from 'vue-router';
import VueRouter from './vueRouter'
import Home from './components/home/index.vue'
import About from './components/about/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
  ]
})


new Vue({
  router,
  render(h) {
    return (
       h(App)
    );
  },
}).$mount('#sykj')
