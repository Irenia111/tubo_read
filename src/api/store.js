import axios from 'axios'
import { setLocalForage } from '../utils/localForage'

// onProgress 下载时的回调函数
export function download (book, onSuccess, onError, onProgress) {
  if (onProgress == null) {
    onProgress = onError
    // onError为何要置空
  }
  // axios.create()会返回axios实例
  return axios.create({
    baseURL: process.env.VUE_APP_EPUB_URL,
    method: 'get',
    responseType: 'blob',
    timeout: 180 * 1000,
    // 设置下载中的回调函数
    onDownloadProgress: progressEvent => {
      if (onProgress) onProgress(progressEvent)
    }
  }).get( // 拼出下载路径
    `${book.categoryText}/${book.fileName}.epub`)
    .then(res => {
      const blob = new Blob([res.data])
      setLocalForage(book.fileName,
        // setLocalForage存储的blob对象
        blob,
        // 此时执行setLocalForage成功后的回调函数，将book对象传回
        () => onSuccess(book),
        err => onError(err))
    }).catch(err => {
      if (onError) onError(err)
    })
}

// mock数据的api请求
// 调用home的mock数据
export function home () {
  return axios({
    methods: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/home`
  })
}
// 调用list的mock数据
export function list () {
  return axios({
    methods: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/list`
  })
}
export function shelf () {
  return axios({
    methods: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/shelf`
  })
}
export function detail (book) {
  return axios({
    methods: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
    params: {
      fileName: book.fileName
    }
  })
}
