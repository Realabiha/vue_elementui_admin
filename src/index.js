import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router';
// import VueRouter from './vueRouter'
import Home from './components/home/index.vue'
import About from './components/about/index.vue'
// import Dialog from './components/dialog/index.vue'

// const DialogCtr = Vue.extend(Dialog)
// const DialogIns = new DialogCtr({props: {show: true}}).$mount()
// document.body.appendChild(DialogIns.$el)

// DialogIns.alert('hahaha')



Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/home/1'
    },
    {
      path: '/home/:id',
      component: Home
    },
    {
      path: '/about/:id',
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
