// mock数据的api请求
import axios from 'axios'
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

export function detail (book) {
  return axios({
    methods: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
    params: {
      fileName: book.fileName
    }
  })
}
