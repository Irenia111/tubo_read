import Vue from 'vue'
import Toast from './ToastBlank'
import Popup from './Popup'
import Loading from './Loading'
// dialog组件不能拿动态注册组件的方式，因为里面还嵌套了别的组件，好像是不能访问的
// import ShelfGroupDialog from '../shelf/ShelfGroupDialog'
// 动态组件可以直接传入data， 不能使用props

const ToastConstructor = Vue.extend(Toast)
let toastInstance = null
// 单例模式
function initToast (options) {
  const data = typeof options === 'string' ? { text: options } : options
  toastInstance = new ToastConstructor({ data: data })
  toastInstance.$mount()
  document.body.appendChild(toastInstance.$el)
}

export function toast (options) {
  if (toastInstance) toastInstance = null
  initToast(options)
  return toastInstance
  /* 采用时间戳实现简单的节流
  * let timeStamp = null
  * if (timeStamp == null || (new Date().valueOf() - timeStamp > 2000)) {
    timeStamp = new Date().valueOf()
    toastInstance = new ToastConstructor({ data: text })
    toastInstance.$mount()
    document.body.appendChild(toastInstance.$el)
    return toastInstance
  } else {
    return toastInstance
  }
  * */
}

const PopupConstructor = Vue.extend(Popup)
let popupInstance = null
export function popup (option) {
  if (popupInstance) {
    popupInstance = null
  }
  popupInstance = new PopupConstructor({ data: option })
  // $props不能在组件生成后修改
  // popupInstance.$props = option
  popupInstance.$mount()
  document.body.appendChild(popupInstance.$el)
  return popupInstance
}

const LoadingConstructor = Vue.extend(Loading)
let loadingInstance = null
export function loading (option) {
  if (loadingInstance) {
    loadingInstance = null
  }
  loadingInstance = new LoadingConstructor({ data: option })
  loadingInstance.$mount()
  document.body.appendChild(loadingInstance.$el)
  console.log(loadingInstance)
  return loadingInstance
}
