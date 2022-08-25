import axios from 'axios'
import store from '../store/index'
import router from '../router/index'
import { Message } from 'element-ui'
export const baseURL = 'http://big-event-api-t.itheima.net'
const myAxios = axios.create({
  baseURL
})
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (store.state.token) {
    config.headers.Authorization = store.state.token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (
    response.data.status === 1 &&
    response.data.message === '身份认证失败！') {
    Message.error(response.data.message)
    store.commit('updateToken', '')
    store.commit('updateUserinfo', {})
    // 把他清空了就不会走这里
    router.replace('/login')
  }
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // 修改token（不是删除是修改）可以对着部分进行调试
  // console.log(error, 2222)
  Message.error('请求错误！！！')
  return Promise.reject(error)
})
// 导出自定义的axios方法, 供外面调用传参发请求
export default myAxios
