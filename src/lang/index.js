import Vue from 'vue'
import VueI18N from 'vue-i18n'
// 资源文件加载
import en from './en'
import cn from './cn'

function getLocale () {
  const locale = window.localStorage.getItem('localLang')
  return locale
}
function saveLocale (locale) {
  window.localStorage.setItem('localLang', locale)
}

// 插件加载成功
Vue.use(VueI18N)

const messages = {
  en,
  cn
}

let locale = getLocale()
if (!locale) {
  locale = 'en'
  saveLocale(locale)
}

// 插件实例化
const i18n = new VueI18N({
  locale,
  messages
})

export default i18n
