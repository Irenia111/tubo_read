import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book.js'
import bookAction from './modules/bookAction'
import setting from './modules/setting'
import settingAction from './modules/settingAction'
import home from './modules/home'
import homeAction from './modules/homeAction'
import getters from './getters.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    ...bookAction,
    ...settingAction,
    ...homeAction
  },
  modules: {
    book,
    setting,
    home
  },
  getters
})
