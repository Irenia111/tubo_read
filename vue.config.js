
function mock (app, url, data) {
  app.get(url, (request, response) => {
    // 将data作为json文件返回
    response.json(data)
  })
}

const homeData = require('./src/mock/bookHome')
const shelfData = require('./src/mock/bookShelf')
const listData = require('./src/mock/bookList')
const flatListData = require('./src/mock/bookFlatList')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  // 自定义接口的mock实现
  devServer: {
    before (app) {
      // 在app服务启动前
      // 做一个模拟的mock请求
      mock(app, '/book/home', homeData)
      mock(app, '/book/shelf', shelfData)
      mock(app, '/book/list', listData)
      mock(app, '/book/flat-list', flatListData)
    }
  }
}
