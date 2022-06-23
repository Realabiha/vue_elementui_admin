import Vue from 'vue'
import permission from './permission'

const useDirective = function(name, options){
    Vue.directive(name, typeof options == 'function' ? options() : options)
}

useDirective('permisson', permission)