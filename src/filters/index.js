import Vue from 'vue'
import desensitization from './desensitization'


const useFilter = function(name, formatter){
  if(typeof formatter != 'function') throw Error(`formatter should be function get ${typeof formatter}`)
  Vue.filter(name, formatter)
}

useFilter('desensitization', desensitization)