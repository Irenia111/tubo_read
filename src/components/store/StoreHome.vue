<template>
  <div class="store-home">
    <store-home-header />
    <scroll @onScroll="onscroll" :top="scrollTop" ref="scroll">
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
      <div>1111111111111111111111111</div>
      <div>00000000000</div>
    </scroll>
  </div>

</template>

<script>
import StoreHomeHeader from './StoreHomeHeader'
import Scroll from '../common/Scroll'
import homeMixins from '../../mixins/homeMixins'
export default {
  name: 'StoreHome',
  components: { Scroll, StoreHomeHeader },
  mixins: [homeMixins],
  data () {
    return {
      scrollTop: 94
    }
  },
  methods: {
    onscroll (offsetY) {
      this.$store.dispatch('setHomeOffsetY', offsetY)
      if (offsetY > 0) {
        // 如果滚动超过0，则隐藏标题，滚动条距顶部为52像素
        this.scrollTop = 52
      } else {
        // 如果滚动为0，则显示标题，滚动条距顶部为94像素
        this.scrollTop = 94
      }
      // 调用scroll组件的refresh方法，重新设置其样式
      this.$refs.scroll.refresh()
    }
  }

}
</script>

<style lang="scss" scoped>
  .store-home {
    width: 100%;
    height: 100%;
  }
</style>
