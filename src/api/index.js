import axios from './axios.config'

const merge = function(origin, target){
  return Object.assign(origin, target)
}

export const userLogin = function(config){
  const base = {
    method: 'post',
    url: '/login/manage/admin/login'
  }
  return axios(merge(base, config))
}

