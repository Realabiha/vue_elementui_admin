import Vue from 'vue'
import App from './app'
import VueRouter from './vueRouter'
// import VueRouter from 'vue-router'
import Vuex from './Vuex'
// import Vuex from 'vuex'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/foo',
      component: { render(h) { return h('h1', null, ['foo']) } }
    },
    {
      path: '/bar',
      component: { render(h) { return <div><h1>bar</h1><router-view></router-view></div> } },
      children: [
        {
          path: 'a',
          component: { render(h) { return h('h1', null, 'bar a') } }
        },
        {
          path: 'b',
          component: { render(h) { return h('h1', null, 'bar b') } }
        }
      ]
    }
  ]
})

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  modules: {
    who: {
      state: {
        name: 'abiha',
      },
      modules: {
        old: {
          state: {
            age: 18
          },
          getters: {
            myAge(state) {
              return state.age + '_my'
            }
          },
          mutations: {
            syncAddAge(state, payload) {
              state.age += payload
            }
          }
        }
      }
    },
    sex: {
      state: {
        male: true
      }
    }
  },
  getters: {
    myCount(state) {
      return state.count + '_my'
    }
  },
  mutations: {
    syncAddCount(state, payload) {
      state.count += payload
    }
  },
  actions: {
    async asyncAddCount(context, payload) {
      const res = await payload
      setTimeout(_ => {
        context.commit('syncAddCount', res)
      }, 500)
    }
  }
})


// import './mini-qiankun/src'
// import { test } from './workers/test.script'
// import Vue from './Vue/instance'
// const vm = new Vue({ data: { a: 1, b: [2, { c: 3 }] } })
// vm.b.push({ d: [5, { e: 6 }] })
// vm.a = []
// vm.$set(vm.b[1], 'f', [])
// vm.b[1].f.push(4)

// vm.$set(vm.b[1].f, '2', 7)

// console.dir(vm)
// console.dir(Vue)

// console.log()
// console.log(import.meta.url)

// webpack5 支持new URL的形式加载本地worker文件
// const testWorker = new Worker(new URL('./workers/test.worker.js', import.meta.url))


// const input = document.createElement('input')
// input.setAttribute('type', 'file')
// input.onchange = function (e) {
//   // console.log(e)
//   const file = e.target.files[0]
//   testWorker.postMessage(file)
//   for (let i = 0; i < 100; i++) {
//     console.log(i)
//   }
// }
// document.body.appendChild(input)
// testWorker.onmessage = function (e) {
//   console.log(e.data, 'data')
// }

new Vue({
  name: 'Root',
  data() {
    return {
      msg: 'hello world'
    }
  },
  router,
  store,
  render(h) { return h(App) }
})
  .$mount('#sykj')