<template>
  <div class="book-reader-wrapper">
    <div id="reader"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import bookMixins from '../../mixins/bookMixins'
import settingMixins from '../../mixins/settingMixins'
// 设置全局的ePub变量
global.ePub = Epub
export default {
  name: 'bookReader',
  mixins: [bookMixins, settingMixins],
  mounted () {
    const url = this.$route.params.fileName
    const bookName = url.split('|').join('/')
    // 初始化阅读器设置
    this.$store.dispatch('initSetting')
    this.$store.dispatch('setFileName', bookName).then(() => {
      this.renderBook()
    })
  },
  methods: {
    renderBook () {
      // 要使用http协议！
      const baseUrl = 'http://127.0.0.1:8081/epub/'
      const fileType = '.epub'
      const url = baseUrl + this.fileName + fileType
      this.book = new Epub(url)
      // 此时书籍尚未解析，所以不能设置字体大小
      // this.book.rendition.themes.fontSize()
      this.$store.dispatch('setCurrentBook', this.book)
      // console.log(this.currentBook)
      this.rendition = this.book.renderTo('reader', {
        width: innerWidth,
        height: innerHeight,
        // 如果flow是下滑模式 'scrolled-doc'那么this.nextPage()就是上下章的切换
        // flow: 'scrolled-doc',
        flow: 'paginated',
        // 兼容微信
        method: 'default'
      })
      // 设置渲染字体大小
      this.currentBook.rendition.themes.fontSize(this.currentFontSize.fontSize + 'px')
      // 设置字体
      this.currentBook.rendition.themes.font(this.currentFontFamily.fontName)
      // 注册主题
      this.themeList.forEach(item => {
        this.currentBook.rendition.themes.register(item.name, item.style)
      })
      // 设置主题
      this.currentBook.rendition.themes.select(this.currentTheme.name)
      this.rendition.display()
      // this.book.ready.then(() => {})
      // rendition监听不了事件
      // 是版本问题，降级就可以用了
      // 降低版本之后，封面也出现了
      // 重点是安装时锁定版本，package.json中不能有^，
      // https://blog.csdn.net/weixin_45915752/article/details/105182059
      // https://blog.csdn.net/qq_27036043/article/details/86664672
      // 这个好像没有什么用处https://zhuanlan.zhihu.com/p/86138298
      this.rendition.on('touchstart', e => {
        // changedTouches 一个数组，数组的length为手指数量，一个手指就是0号元素
        // clientX, clientY 当前点击位置
        this.timeStamp = e.timeStamp
        this.touchStartX = e.changedTouches[0].clientX
      })
      this.rendition.on('touchend', e => {
        const span = e.timeStamp - this.timeStamp
        this.touchEndX = e.changedTouches[0].clientX
        const moveDirection = this.touchStartX - this.touchEndX
        if (span < 500 && moveDirection > 40) {
          // console.log('上一页')
          this.prevPage()
        } else if (span < 500 && moveDirection < -40) {
          // console.log('下一页')
          this.nextPage()
        } else {
          this.toggleMenu(!this.showMenuFlag)
        }
        e.preventDefault()
        e.stopPropagation()
      })
      this.rendition.on('click', e => {
        this.toggleMenu(!this.showMenuFlag)
      })
      // 字体设置
      // 将字体文件加载入iframe的styleSheet中
      // 此处需要注意，因为styleSheet以link的形式加入，需要配置文件的url，不能采用本地静态资源，故字体文件存放在nginx服务器
      this.rendition.hooks.content.register((contents) => {
        // 不能直接写assets的路径
        // 可以通过addStyleSheet的源码了解
        // contents.addStylesheet('../../assets/fonts/daysOne.css')
        const baseUrl = 'http://127.0.0.1:8081/fonts/'
        contents.addStylesheet(baseUrl + 'cabin.css')
        contents.addStylesheet(baseUrl + 'daysOne.css')
        contents.addStylesheet(baseUrl + 'montserrat.css')
        contents.addStylesheet(baseUrl + 'tangerine.css')
      })
    },
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
      }
    },
    toggleMenu (flag) {
      // console.log(flag)
      this.$store.dispatch('setShowMenuFlag', flag)
      this.$store.dispatch('setShowFontFamilyFlag', false)
    }
  },
  data () {
    return {
      timeStamp: 0,
      touchStartX: 0,
      touchEndX: 0
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
