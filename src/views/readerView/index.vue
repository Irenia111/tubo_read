<template>
  <div class="reader-view-wrapper" ref="ebook">
    <!-- 电子书书签 -->
    <bookmark />
    <!-- 电子书页眉 -->
    <reader-header />
    <!-- 电子书阅读器 -->
    <book-reader />
    <!-- 电子书页脚 -->
    <reader-menu />
  </div>
</template>

<script>
import ReaderHeader from '../../components/readerHeader/index'
import ReaderMenu from '../../components/readerMenu/index'
import BookReader from '../../components/bookReader/index'
import Bookmark from '../../components/readerMenu/Bookmark'
import bookMixins from '../../mixins/bookMixins'
export default {
  name: 'readerView',
  components: { ReaderMenu, ReaderHeader, BookReader, Bookmark },
  mixins: [bookMixins],
  watch: {
    // 监听用户下拉屏幕时滚动条的y轴数值
    offsetY (v) {
      // 判断如果菜单栏没有处于显示状态（如果菜单栏显示，优先响应菜单栏事件）
      // 并且电子书已经解析完毕（未解析完毕时无法获取currentLocation）
      if (!this.showMenuFlag && this.isProgressAvailable) {
        if (v > 0) {
          // 向下拉动屏幕时，调用move方法
          this.move(v)
        } else if (v === 0) {
          // y轴为0时，调用restore方法让屏幕回弹，松手时屏幕是无法自动回弹
          this.restore()
        }
      }
    }
  },
  methods: {
    move (v) {
      // 向下拉动屏幕时，组件改变组件的定位，使之随之移动
      this.$refs.ebook.style.top = v + 'px'
    },
    restore () {
      // 组件归位
      this.$refs.ebook.style.top = '0px'
      // 设置过渡动画，产生回弹效果
      this.$refs.ebook.style.transition = 'all .2s ease-in-out'
      setTimeout(() => {
        // 200毫秒动画结束后，将过渡动画关闭，否则在下拉时也会产生过渡动画
        this.$refs.ebook.style.transition = ''
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
.reader-view-wrapper{
  // 组件绝对定位，实现下拉效果
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // 这里加了overflow-hidden之后，就无法实现下拉展示添加书签的功能了
}
</style>
