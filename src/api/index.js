import request from '../utils/request'
// import store from '../store/index'
export const registerAPI = ({ username, password, _ }) => {
  return request({
    url: '/api/reguser',
    method: 'post',
    data: `username=${username}&password=${password}`
  })
}

export const loginAPI = ({ username, password, _ }) => {
  return request({
    url: '/api/login',
    method: 'post',
    data: `username=${username}&password=${password}`
  })
}

export const userinfoAPI = () => {
  return request({
    url: '/my/userinfo'
    // method方法不写默认是get
  })
}
