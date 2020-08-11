<template>
  <div class="book-reader-wrapper">
    <div id="reader"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
// 设置全局的ePub变量
global.ePub = Epub
export default {
  name: 'bookReader',
  mounted () {
    // 为啥这个写上面，它就执行了？？？？
    const url = this.$route.params.fileName
    const bookName = url.split('|').join('/')
    this.renderBook(bookName)
  },
  methods: {
    renderBook (bookName) {
      // 要使用http协议！
      const baseUrl = 'http://127.0.0.1:8081/epub/'
      const fileType = '.epub'
      const bookUrl = `${baseUrl}${bookName}${fileType}`
      console.log(bookUrl)

      this.book = new Epub(bookUrl)
      this.book2 = new Epub('https://s3.amazonaws.com/epubjs/books/moby-dick/OPS/package.opfb')
      console.log(new Epub('http://www.youbaobao.xyz/epub/History/2018_Book_TheCostOfInsanityInNineteenth-.epub'))
      console.log(this.book)
      // 这里的bookUrl要是直接使用的话，是不能直接取到的图书的
      // 因为获取图书的过程是异步操作，如果不经过vuex的action操作，图书是不能获取的
      // 打印出来的this.book是open false，但是过一会打开，就是open true， 所以这是一个异步操作！
      // 所以nginx的缓存要设置清除(我猜的)，不然感受不到这个异步操作时间差
      console.log(this.book2)
      this.rendition = this.book2.renderTo('reader', {
        width: 600,
        height: 400,
        // 兼容微信
        method: 'default'
      })
      console.log(this.rendition)
      this.rendition.display()
    },
    data () {
      return {
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .book-reader-wrapper{
    width: 100%;
    height: 100%;
    #reader{
      width: 100%;
      height: 100%;
    }
  }

</style>
