import Vue from 'vue'
import desensitization from './desensitization'


export const useFilter = function () {
  Vue.filter('desensitization', desensitization)
}

export {
  desensitization
}
