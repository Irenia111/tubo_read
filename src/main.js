import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/iconStyle.css'
// 引入mock数据
import './mock'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
