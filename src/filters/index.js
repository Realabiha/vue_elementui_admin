import Vue from 'vue'
import {typeOf} from '@utils/tools'
export const desensitization = function(data){
  const isString = typeOf(data) == 'String'
  if(!isString) return ''
  const replace = data.slice(3, -3)
  return data.replace(replace, '****')
}

Vue.directive('desensitization', desensitization)