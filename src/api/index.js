import axios from './axios.config'

export const userLogin = function(config){
  // return axios(config)
  return new Promise((resolve, reject) => {
    setTimeout(_ => resolve({code: '0'}))
  })
}


