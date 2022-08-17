import request from '../utils/request'
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
