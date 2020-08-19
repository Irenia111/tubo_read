<template>
  <transition name="pop-up">
    <div class="font-family-wrapper" v-show="showFontFamilyFlag">
      <div class="header-wrapper">
        <span  class="header-icon" @click="showFontFamily"><span class="icon-down2"></span></span>
        <span class="header-des">选择字体</span>
      </div>
      <div class="list-wrapper" v-for="item in fontFamilyList" :key="item.index">
        <div :class="['item',{'is-active': item.index === currentFontFamily.index }]"
        @click="selectFontFamily(item)"
        >
          <span class="font-name">{{item.name}}</span>
          <span class="icon-check" v-show="item.index === currentFontFamily.index"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import settingMixins from '../../mixins/settingMixins'

export default {
  name: 'FontFamilySetting',
  mixins: [settingMixins],
  methods: {
    showFontFamily () {
      this.$store.dispatch('setShowFontFamilyFlag', false)
    },
    selectFontFamily (item) {
      // console.log(item)
      // console.log(item.fontName)
      this.currentBook.rendition.themes.font(item.fontName)
      this.$store.dispatch('setFontFamily', item.index)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/assets/style/global";
.font-family-wrapper{
  background: white;
  box-shadow: px2rem(2) px2rem(-4) px2rem(12) rgba(0, 0, 0, .04);
  opacity: 1;
  z-index: 200;
  transition: transform 0.15s ease-in, opacify 0.15s ease-in;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: px2rem(260);
  font-size: px2rem(20);
  .header-wrapper{
    padding: px2rem(10) px2rem(20);
    margin-bottom: px2rem(4);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .header-des{
      margin: 0 auto;
    }
  }
  .list-wrapper{
    padding: px2rem(10) px2rem(20);
    .item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      &.is-active{
        color: #40a9ff;
      }
    }
  }

}
</style>
