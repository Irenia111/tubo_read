<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {}">
      <bookmark-icon :color="color" :width="20" :height="35"></bookmark-icon>
    </div>
  </div>
</template>

<script>
import BookmarkIcon from '../common/BookmarkIcon'
import bookMixins from '../../mixins/bookMixins'
import { realPx } from '../../utils/utils'

const BLUE = '#40a9ff'
const WHITE = '#fff'

export default {
  name: 'Bookmark',
  components: { BookmarkIcon },
  mixins: [bookMixins],
  computed: {
    height () {
      return realPx(40)
    },
    threshold () {
      return realPx(60)
    },
    fixedStyle () {
      return {
        position: 'fixed',
        top: 0,
        right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`
      }
    }
  },
  watch: {
    offsetY (v) {
      if (!this.isProgressAvailable || this.showMenuFlag || this.menuItemIndex >= 0) {
        return
      }
      if (v >= this.height && v < this.threshold) {
        // 状态3：超越零界状态
        // 书签吸顶，相对于外层组件移动
        // 书签变色
        // 添加or删除书签
        this.beforeThreshold(v)
      } else if (v >= this.threshold) {
        // 状态2：未到达零界状态
        // 书签吸顶，相对于外层组件移动
        this.afterThreshold(v)
      } else if (v > 0 && v < this.height) {
        // 状态1：未超过书签的高度
        // 持续下拉
        this.beforeHeight()
      } else if (v === 0) {
        // 状态4：归位
        this.restore()
      }
    },
    isBookmark (isBookmark) {
      this.isFixed = isBookmark
      if (isBookmark) {
        this.color = BLUE
      } else {
        this.color = WHITE
      }
    }
  },
  data () {
    return {
      text: '下拉添加书签',
      color: WHITE,
      isFixed: false
    }
  },
  methods: {
    addBookmark () {
      // 得到当前页面的cfi
      const currentLocation = this.currentBook.rendition.currentLocation()
      // cfiBase定位
      const cfiBase = currentLocation.start.cfi.replace(/!.*/, '')
      // cfi start的位置，！号后的内容，去除最后一个')'
      const cfiStart = currentLocation.start.cfi.replace(/.*!/, '').replace(/\)$/, '')
      // cfi end的位置，！号后的内容，去除最后一个')'
      const cfiEnd = currentLocation.end.cfi.replace(/.*!/, '').replace(/\)$/, '')
      // 拼接cfiRange字符串
      const cfiRange = `${cfiBase}!,${cfiStart},${cfiEnd})`
      this.currentBook.getRange(cfiRange).then(range => {
        // 去除range内容中两个及以上的空格
        const text = range.toString().replace(/\s\s/g, '')
        const item = {
          cfi: currentLocation.start.cfi,
          text: text
        }
        this.$store.dispatch('addBookmark', item)
      })
    },
    removeBookmark () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      const cfi = currentLocation.start.cfi
      this.$store.dispatch('removeBookmark', cfi).then(
        this.$store.dispatch('setIsBookmark', false)
      )
    },
    restore () {
      // 状态4：归位
      setTimeout(() => {
        // 动画效果是0.2秒，所以要在动画结束之后复原
        this.$refs.bookmark.style.top = `-${this.height}px`
        this.$refs.iconDown.style.transform = 'rotate(0deg)'
      }, 200)
      // 是否是书签页
      if (this.isFixed) {
        this.$store.dispatch('setIsBookmark', true)
        this.addBookmark()
      } else {
        this.$store.dispatch('setIsBookmark', false)
        this.removeBookmark()
      }
    },
    beforeHeight () {
      // 状态1：未超过书签的高度
      if (this.isBookmark) {
        this.text = '下拉删除书签'
        this.color = BLUE
        this.isFixed = true
      } else {
        this.text = '下拉添加书签'
        this.color = WHITE
        this.isFixed = false
      }
    },
    beforeThreshold (v) {
      // 状态2：未到达零界状态
      // 下拉超过书签的长度，但未达到添加书签的下拉高度
      // 书签吸顶 采用相对外层组件的位移
      this.$refs.bookmark.style.top = `${-v}px`
      // 同状态1一致的提示文字内容
      this.beforeHeight()
      const iconDown = this.$refs.iconDown
      // icon不旋转
      if (iconDown.style.transform === 'rotate(180deg)') {
        iconDown.style.transform = 'rotate(0deg)'
      }
    },
    afterThreshold (v) {
      // 状态3：超越零界状态
      // 下拉超过书签的长度，但未达到添加书签的下拉高度
      // 书签吸顶 采用相对外层组件的位移
      this.$refs.bookmark.style.top = `${-v}px`
      if (this.isBookmark) {
        this.text = '松开删除书签'
        this.color = WHITE
        this.isFixed = false
      } else {
        this.text = '松开添加书签'
        this.color = BLUE
        this.isFixed = true
      }
      // icon呈现旋转
      const iconDown = this.$refs.iconDown
      if (iconDown.style.transform === '' ||
        iconDown.style.transform === 'rotate(0deg)') {
        iconDown.style.transform = 'rotate(180deg)'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './src/assets/style/global';
  .ebook-bookmark {
    position: absolute;
    top: px2rem(-40);
    margin-bottom: px2rem(5);
    left: 0;
    z-index: 100;
    width: 100%;
    height: px2rem(30);
    .ebook-bookmark-text-wrapper {
      position: absolute;
      right: px2rem(45);
      bottom: px2rem(-5);
      display: flex;
      .ebook-bookmark-down-wrapper {
        font-size: px2rem(14);
        color: white;
        transition: all .2s linear;
        @include center;
      }
      .ebook-bookmark-text {
        font-size: px2rem(14);
        color: white;
      }
    }
    .ebook-bookmark-icon-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: px2rem(15);
    }
  }

</style>
