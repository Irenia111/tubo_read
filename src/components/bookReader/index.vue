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
    this.$store.dispatch('initCurrentBook')
    this.$store.dispatch('setFileName', bookName).then(() => {
      this.renderBook()
      this.bookTimer = setInterval(() => {
        if (this.clock === 60) {
          this.$store.dispatch('setTimer', this.timer + 1)
          this.clock = 1
        } else {
          this.clock += 1
        }
      }, 1000)
    })
  },
  beforeDestroy () {
    clearInterval(this.bookTimer)
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
      const location = this.currentCfi
      this.display(location, () => {
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
      })
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
      this.rendition.hooks.content.register((contents) => {
        const baseUrl = 'http://127.0.0.1:8081/fonts/'
        contents.addStylesheet(baseUrl + 'cabin.css')
        contents.addStylesheet(baseUrl + 'daysOne.css')
        contents.addStylesheet(baseUrl + 'montserrat.css')
        contents.addStylesheet(baseUrl + 'tangerine.css')
      })
      // 分页需要书籍加载
      this.currentBook.ready.then(() => {
        //  this.currentBook.locations.generate(每页的呈现字数)
        // 默认每页呈现 700 字，根据页面宽度及字体大小调整页面呈现字数
        // 这种分页调节不包括图片等信息
        return this.currentBook.locations.generate(700 * (window.innerWidth / 375) * (this.currentFontSize / 17))
      }).then(() => {
        this.$store.dispatch('setIsProgressAvailable', true)
        // 分页完成之后再次调用refreshLocation，保证progress有值
        this.refreshLocation()
      })
    },
    prevPage () {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
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
      touchEndX: 0,
      bookTimer: null,
      clock: 1
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
