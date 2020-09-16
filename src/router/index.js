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
    component: () => import(/* webpackChunkName: "about" */ '../views/store/index'),
    redirect: '/store/shelf',
    children: [
      {
        // 相对路径
        path: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/store/StoreHome.vue')
      },
      {
        path: 'list',
        component: () => import(/* webpackChunkName: "about" */ '../views/store/StoreList.vue')
      },
      {
        path: 'detail',
        component: () => import(/* webpackChunkName: "about" */ '../views/store/StoreDetail.vue')
      },
      {
        path: 'shelf',
        component: () => import('../views/store/StoreShelf.vue')
      },
      {
        path: 'category',
        component: () => import('../views/store/StoreCategory.vue')
      }
      /*,
      {
        path: 'speaking',
        component: () => import('../components/store/StoreSpeaking.vue')
      }

      */
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
