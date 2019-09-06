import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import router from '@/router'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    const token = getToken()
    if (token) {
      config.headers['Token'] = token // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }

    if (error.response.status === 401) {
      Message.error('token失效，请重新登录')
      store.dispatch('logout').then(() => {
        router.push({ path: '/login' })
      })
    } else if (error.response.status === 403) {
      MessageBox.alert(error.response.data.msg, '没有权限', {
        type: 'error',
        center: true
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default {
  post(url, data) {
    url = `http://${url}`
    return service({
      method: 'post',
      url,
      data: data // post 请求的data
    })
  },
  put(url, data) {
    url = `http://${url}`
    return service({
      method: 'put',
      url,
      data: data // post 请求的data
    })
  },
  delete(url, data) {
    url = `http://${url}`
    return service({
      method: 'delete',
      url,
      data: data // post 请求的data
    })
  },
  get(url, params) {
    url = `http://${url}`
    return service({
      method: 'get',
      url,
      params // get 请求时带的参数
    })
  }
}
