import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/reg',
    component: () => import('../views/register/index.vue')
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    component: () => import('../views/layout/index.vue')
  }
]
const whiteList = ['/reg', '/login']
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (store.state.token) {
    // if (!store.state.userinfo.username) {
    // 有token且没有用户信息时候才请求用户信息
    store.dispatch('initUserInfo')
    // }
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
