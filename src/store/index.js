import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { userinfoAPI } from '../api/index'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    // 1. 用来存储登录成功之后，得到的 token
    token: '',
    userinfo: {}
    // email: ""
    // id: 6442
    // nickname: ""
    // user_pic: null
    // username: "ymf130"
  },
  getters: {
    nickname: state => state.userinfo.nickname,
    user_pic: state => state.userinfo.user_pic,
    username: state => state.userinfo.username
  },

  mutations: {
    // 2. 更新 token 的 mutation 函数
    updateToken (state, newToken) {
      state.token = newToken
    },
    updateUserinfo (state, newUserinfo) {
      state.userinfo = newUserinfo
    }
  },
  actions: {
    // 定义初始化用户基本信息的 action 函数
    async initUserInfo (context) {
      const { data: res } = await userinfoAPI()
      // const data = await userinfoAPI()
      console.log(res)
      if (res.status === 0) {
        context.commit('updateUserinfo', res.data)
      }
    }
  },
  modules: {
  }
})
