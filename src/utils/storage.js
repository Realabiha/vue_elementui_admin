/**
 * @description: JSON.stringfy
 * @param undefined
 * @return {*}
 */
const withStringify = function(storageApi){
  return function(key = '', data = null){
    if(typeof data == 'object' && data != null)
    data = JSON.stringify(data)
    storageApi(key, data)
  }
}

/**
 * @description: JSON.parse
 * @param undefined
 * @return {*}
 */
const withParse = function(storageApi){
  return function(key = ''){
    let result = storageApi(key)
    try {
      result = JSON.parse(result)
    } catch (error) {
      
    }
    return result
  }
}

/**
 * @description: localstorege sessionStorage 
 * @param undefined
 * @param undefined
 * @return {*}
 */
const setLocalStorage = function(key, value){
  localStorage.setItem(key, value)
}
const getLocalStorage = function(key){
  return localStorage.getItem(key)
}
const setSessionStorage = function(key, value){
  sessionStorage.setItem(key, value)
}
const getSessionStorage = function(key){
  return sessionStorage.getItem(key)
}
export const removeLocalStorage = function(key){
  if(key) localStorage.removeItem(key)
  localStorage.clear()
}
export const removeSessionStorage = function(key){
  if(key) sessionStorage.removeItem(key)
  sessionStorage.clear()
}
export const withLogin = function(callback){
  const userInfo = getSessionStorage('userInfo')
  return function(...args){
    const context = this
    callback.call(context, userInfo, ...args)
  }
}


export const formatSetLocalStorage = withStringify(setLocalStorage)
export const formatSetSessionStorage = withStringify(setSessionStorage)
export const formatGetLocalStorage = withParse(getLocalStorage)
export const formatGetSessionStorage = withParse(getSessionStorage)