import axios from 'axios'
const instance = axios.create()

instance.interceptors.request.use(
  config => {
    return config
  }, 
  error => {
    return error
  }
)

instance.interceptors.response.use(
  response => {
    return response
  }, 
  error => {
    return error
  }
)

export default instance