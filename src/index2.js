import Vue from 'vue'
import Button from './components/button'

new Vue({
  render(h) {
    return h(Button)
  }
}).$mount('#app')