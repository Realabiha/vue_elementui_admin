import Vue from 'vue'
import { permission } from './permission'

export const useDirective = function () {
    Vue.directive('permission', permission)
}
export {
    permission
}

