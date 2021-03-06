<template>
  <div class="book-reader-wrapper">
    <div id="reader"></div>
    <div class="reader-mask"
         @click="onMaskClick"
         @touchmove="move"
         @touchend="moveEnd"></div>
  </div>
</template>

<script>
// http://localhost:8080/#/readerView/Laws|2016_Book_ImplementationOfEUReadmission
import Epub from 'epubjs'
import bookMixins from '../../mixins/bookMixins'
import settingMixins from '../../mixins/settingMixins'
import { getLocalForage } from '../../utils/localForage'
// 设置全局的ePub变量
global.ePub = Epub
export default {
  name: 'bookReader',
  mixins: [bookMixins, settingMixins],
  mounted () {
    const bookName = this.$route.params.fileName.split('|').join('/')
    const books = this.$route.params.fileName.split('|')
    const fileName = books[1]
    // 初始化阅读器设置
    this.$store.dispatch('initSetting')
    // 阅读器支持传入资源地址，或者blob对象
    // 先从本地存储中拿到blobd对象，要是拿不到，则使用url下载网络资源
    getLocalForage(fileName, (err, blob) => {
      if (!err && blob) {
        console.log('加载离线资源')
        this.$store.dispatch('setFileName', bookName).then(() => {
          this.renderBook(blob)
          this.startBookTimer()
          // 初始化当前书本数据
          this.$store.dispatch('initCurrentBook')
        })
      } else {
        console.log('加载线上资源')
        this.$store.dispatch('setFileName', bookName).then(() => {
          const fileType = '.epub'
          const url = process.env.VUE_APP_RES_URL + this.fileName + fileType
          this.renderBook(url)
          this.startBookTimer()
          // 初始化当前书本数据
          this.$store.dispatch('initCurrentBook')
        })
      }
    })
  },
  beforeDestroy () {
    clearInterval(this.bookTimer)
  },
  methods: {
    renderBook (url) {
      this.book = new Epub(url)
      this.$store.dispatch('setCurrentBook', this.book).then(() => {
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
          this.initBookReaderSetting()
        })
        // 因为手势监听无法和下拉书签兼容，所以采用蒙版
        this.parseBook()
        this.rendition.hooks.content.register((contents) => {
          const baseUrl = 'http://127.0.0.1:8081/fonts/'
          contents.addStylesheet(baseUrl + 'cabin.css')
          contents.addStylesheet(baseUrl + 'daysOne.css')
          contents.addStylesheet(baseUrl + 'montserrat.css')
          contents.addStylesheet(baseUrl + 'tangerine.css')
        })
      })
      this.currentBook.ready.then(() => {
        return this.currentBook.locations.generate(700 * (window.innerWidth / 375) * (this.currentFontSize / 17))
      }).then(() => {
        this.$store.dispatch('setIsProgressAvailable', true)
        this.refreshLocation()
      })
    },
    move (e) {
      let offsetY = 0
      if (this.firstOffsetY) {
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY
        this.$store.dispatch('setOffsetY', offsetY)
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY
      }
      // 阻止默认事件，这样下拉的时候可以防止微信浏览器的bug
      e.preventDefault()
      e.stopPropagation()
    },
    moveEnd () {
      // touch结束时，需要将offsetY值归零.将记录的firstOffsetY值置空
      this.$store.dispatch('setOffsetY', 0)
      this.firstOffsetY = null
    },
    onMaskClick (e) {
      const offsetX = e.offsetX
      const width = window.innerWidth
      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage()
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        this.nextPage()
      } else {
        this.toggleMenu(!this.showMenuFlag)
      }
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
    },
    startBookTimer () {
      this.bookTimer = setInterval(() => {
        if (this.clock === 60) {
          this.$store.dispatch('setTimer', this.timer + 1)
          this.clock = 1
        } else {
          this.clock += 1
        }
      }, 1000)
    },
    /*
    initGesture () {
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
    },
     */
    parseBook () {
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.$store.dispatch('setCover', url)
        })
      })
      this.book.loaded.metadata.then(metadata => {
        this.$store.dispatch('setMetadata', metadata)
      })

      function flatten (array) {
        return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))))
      }

      this.book.loaded.navigation.then(nav => {
        const navItem = flatten(nav.toc)
        function find (item, level = 0) {
          return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
        }
        navItem.forEach(item => {
          item.level = find(item)
        })
        this.$store.dispatch('setNavigation', navItem)
      })
    },
    initBookReaderSetting () {
      this.currentBook.rendition.themes.fontSize(this.currentFontSize.fontSize + 'px')
      this.currentBook.rendition.themes.font(this.currentFontFamily.fontName)
      this.themeList.forEach(item => {
        this.currentBook.rendition.themes.register(item.name, item.style)
      })
      this.currentBook.rendition.themes.select(this.currentTheme.name)
    }
  },
  data () {
    return {
      touchStartX: 0,
      touchEndX: 0,
      bookTimer: null,
      clock: 1,
      // firstOffsetY初始值为空
      firstOffsetY: null
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
    .reader-mask{
      position: absolute;
      top: 0;
      left: 0;
      background: transparent;
      z-index: 80;
      width: 100%;
      height: 100%;
    }
  }
</style>
