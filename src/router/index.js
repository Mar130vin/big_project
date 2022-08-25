import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
Vue.use(VueRouter)

const RouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return RouterPush.call(this, to).catch(err => err)
}

const RouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return RouterReplace.call(this, to).catch(err => err)
}

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
    component: () => import('../views/layout/index.vue'),
    redirect: '/home', // 默认显示首页的二级路由
    children: [
      {
        path: 'home',
        component: () => import('../views/home/index.vue')
      },
      {
        path: 'userinfo',
        component: () => import('../views/User/userInfo.vue')
      },
      {
        path: 'updateavatar',
        component: () => import('../views/User/updateAvatar.vue')
      },
      {
        path: 'updatepwd',
        component: () => import('../views/User/userPwd.vue')
      },
      {
        path: 'articleCates',
        component: () => import('../views/article/articleCates.vue')
      },
      {
        path: 'articlePublish',
        component: () => import('../views/article/articlePublish.vue')
      },
      {
        path: 'articleList',
        component: () => import('../views/article/articleList.vue')
      },
      {
        path: 'articleEdit',
        name: 'articleEdit',
        component: () => import('../views/article/articleEdit.vue')
      }

    ]
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
    // console.log('router')
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
