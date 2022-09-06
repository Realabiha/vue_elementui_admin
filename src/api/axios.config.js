import axios from 'axios'
import router from '../router'
import {formatGetSessionStorage} from '@/utils/storage'
const instance = axios.create()

// token
const useToken = function(config = {}){
  config.header = {
    ...config.header,
    'token': formatGetSessionStorage('userInfo')?.token
  }
  return config
}

// 开发代理或生产nginx转发
const useProxy = function(config = {}){
  config.url = NODE_ENV == 'devlopment' ? '/api' : '' + config.url
  return config
}


instance.interceptors.request.use(
  config => {
    return useToken(useProxy(config))
  }, 
  error => {
    return error
  }
)

instance.interceptors.response.use(
  response => {
    if(response.status = 400){
      router.replace({name: 'Login', query: {redirect: location.hash.slice(1)}})
      return {}
    }
    return response
  }, 
  error => {
    return error
  }
)

export default instance