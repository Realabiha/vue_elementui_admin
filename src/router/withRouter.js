import router from './index'
/**
 * @description: router引用封装
 * @param undefined
 * @return {*}
 */
export default function(callback){
  return function(...args){
    const context = this
    callback.call(context, router, ...args)
  }
}