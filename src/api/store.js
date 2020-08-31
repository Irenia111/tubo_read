// mock数据的api请求
import axios from 'axios'
// 调用home的mock数据
export function home () {
  return axios({
    methods: 'get',
    url: `${process.env.VUE_APP_BASE_URL}/book/home`
  })
}
