import Vue from 'vue'
import Dialog from './index.vue'

export const confirm = function (msg) {
  return new Promise((resolve, reject) => {
    const DialogConstructor = Vue.extend(Dialog, { props: { msg } })
    const instance = new DialogConstructor()
    instance.resolve = resolve
    instance.reject = reject
    instance.$mount()
    document.body.appendChild(instance.$el)
  })
}

Dialog.confirm = confirm

export default Dialog

