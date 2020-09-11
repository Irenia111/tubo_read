import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 使用国际化
import i18n from './lang'
import './assets/style/iconStyle.css'
// 引入mock数据 mock不支持blob对象的下载
// 所以mock不支持电子书阅读器的资源下载
// mock的电子书资源还是在nginx服务器上下载的
// 采用本地调试模式启动的http服务模拟，在vue.config.js中设置
// import './mock'

// 引入动态组件
import { popup, toast, loading } from './components/common'
import './utils/create-api'

// 在原型链绑定组件
Vue.prototype.$popup = popup
Vue.prototype.$toast = toast
Vue.prototype.$loading = loading

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
