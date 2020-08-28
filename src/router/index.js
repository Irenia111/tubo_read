import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/store'
  },
  {
    path: '/readerView',
    name: 'ReaderView',
    component: () => import(/* webpackChunkName: "about" */ '../views/readerView/index'),
    children: [{
      path: ':fileName',
      // 动态路由
      component: () => import(/* webpackChunkName: "about" */ '../components/bookReader/index.vue')
    }]
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import(/* webpackChunkName: "about" */ '../views/Store/index'),
    redirect: '/store/home',
    children: [{
      // 相对路径
      path: 'home',
      component: () => import(/* webpackChunkName: "about" */ '../components/store/StoreHome.vue')
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
