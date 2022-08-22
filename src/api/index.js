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

export const updataUserinfoAPI = ({ id, nickname, email, _ }) => {
  return request({
    url: '/my/userinfo',
    method: 'post',
    data: `id=${id}&nickname=${nickname}&email=${email}`
  })
}

export const updateAvatarAPI = (avatar) => {
  return request({
    url: '/my/update/avatar',
    method: 'post',
    data: `avatar=${avatar}`
  })
}

export const updatePwdAPI = ({ oldPwd, newPwd, _ }) => {
  return request({
    url: '/my/updatepwd',
    method: 'post',
    data: `oldPwd=${oldPwd}&newPwd=${newPwd}`
  })
}

export const articleCatesAPI = () => {
  return request({
    url: '/my/article/cates',
    method: 'GET'
  })
}

export const addCatesAPI = ({ name, alias }) => {
  return request({
    url: '/my/article/addcates',
    method: 'POST',
    data: `name=${name}&alias=${alias}`
  })
}

export const deletecatesAPI = (id) => {
  return request({
    url: `/my/article/deletecate/${id}`,
    method: 'GET'
  })
}

export const updatecateAPI = ({ Id, name, alias, _ }) => {
  return request({
    url: '/my/article/updatecate',
    method: 'POST',
    data: `Id=${Id}&name=${name}&alias=${alias}`
  })
}
