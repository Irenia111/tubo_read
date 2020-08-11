import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/readerView'
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
  }
]

const router = new VueRouter({
  routes
})

export default router
