import axios from 'axios'1
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'

var CancelToken = axios.CancelToken
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 15000 // request timeout
})
// request interceptor 请求之前拦截判断，权限等处理
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (!localStorage.getItem('token')) {
      router.replace({
        name: '/loginPage'
      })
    } else {
      config.headers['token'] = localStorage.getItem('token')
    }
    config.cancelToken = new CancelToken(e => {
      store.state.axiosCancel.push(e)
    })
    // if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
    // }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
 
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
 
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    if (!res.data) {
      if (res.code === '200') {
        return Promise.reject(new Error('数据异常！'))
        // localStorage.removeItem('token');
      } else {
        return res
      }
    } else if (res.data instanceof Array) {
      if (res.data.length === 0) {
        return Promise.reject(new Error('数据异常！'))
      } else {
        return res
      }
    } else {
      return res
    }
    // var str = JSON.stringify(res)
    // var json = JSON.parse(str)
    // console.log(json)
 
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000 && res.code !== 0) {
    //   // Message({
    //   //   message: res.message || 'Error',
    //   //   type: 'error',
    //   //   duration: 5 * 1000
    //   // })
 
    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //  }
  },
  (error) => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error).catch(err => {
      console.log(err)
    })
    // return Promise.reject(error)
  }
)
 
export default service
————————————————
版权声明：本文为CSDN博主「前端的路人丁」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/yinzisang/article/details/121079073