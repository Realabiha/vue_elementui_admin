/**
 * @description: 数据类型判断 
 * @param {*}
 * @return {String} Array|Object|Null
 */
export const typeOf = function(data){
  return Object.prototype.toString.call(data).slice(8, -1)
} 
/**
 * @description: 递归深克隆
 * @param {Array|Object} 源数据
 * @param {Array|Object} 拷贝数据
 * @return {Array|Object}
 */
export const deepClone = function(origin, target){
  target = typeOf(origin) == 'Array' ? [] : {}
  for(let key in origin){
    if(origin.hasOwnProperty(key)){
      const value = origin[key]
      if(typeof value != 'object') target[key] = value
      if(typeOf(value) == 'Array'){
        target[key] = deepClone(origin[key], [])           
      }
      if(typeOf(value) == 'Object'){
        target[key] = deepClone(origin[key], {})
      }
    }
  }
  return target
}
/**
 * @description: JSON深克隆
 * @param {Array|Object} 源数据
 * @return {Array|Object}
 */
export const deepTrickClone = function(origin){
  const result = JSON.parse(JSON.stringify(origin)) 
  console.log(result)
  return result
}

/**
 * @description: 防抖 
 * @param {Function} 回调
 * @param {Number} 延时
 * @param {Boolean} 是否立即出发
 * @return {*}
 */
export const debounce = function(func, delay, immediate = false){3
  let timer = null
  return function(...args){
    const context = this
    const resetTimer = function(timer){
      clearTimeout(timer)
      timer = null
    }
    const later = function(){
      func.apply(context, args)
      resetTimer(timer)
    }
    if(timer){
      resetTimer(timer)
    }
    if(!timer && immediate){
      later()
    }
    timer = setTimeout(later, delay)
  }
}

/**
 * @description: 节流 
 * @param {Function} func 回调
 * @param {Number} delay 延时
 * @param {Boolean} immediate 是否立即触发
 * @return {*}
 */
export const throtte = function(func, delay, immediate = false){
  let timer = null
  return function(...args){
    const context = this
    const later = function(){
      func.apply(context, args)
    }
    if(!timer && immediate) later()
    timer = setTimeout(later, delay)
  }
}