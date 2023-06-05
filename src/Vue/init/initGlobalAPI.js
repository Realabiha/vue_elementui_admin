import initMixin from './initMixin'
import { set, del, observable } from '../observe/initState/Observer'
import { watch } from '../observe/initState/Watcher'
function initGlobalAPI(Vue) {
  Vue.set = Vue.prototype.$set = set
  Vue.delte = Vue.prototype.delete = del
  Vue.observable = observable
  Vue.watch = Vue.prototype.$watch = watch
  initMixin(Vue)
}
export default initGlobalAPI