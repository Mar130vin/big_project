import axios from 'axios'
const myAxios = axios.create({
  baseURL: 'http://big-event-api-t.itheima.net'
})

// 导出自定义的axios方法, 供外面调用传参发请求
export default myAxios
