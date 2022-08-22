import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/global.less'
import './elementUI/index'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 全局注册富文本编辑器
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
