<template>
  <div>
  <book-index />
  <transition name="slide-up">
    <div class="menu-item-wrapper" v-show="showMenuFlag && showMenuItemFlag">
      <div class="menu-item">
        <progress-setting v-if="menuItemIndex===0" />
        <theme-setting v-else-if="menuItemIndex===1" />
        <font-size-setting v-else-if="menuItemIndex===2"/>
      </div>
    </div>
  </transition>
  <transition name="slide-up" @after-leave="hideMenuItem">
    <div class="menu-wrapper"
         :class="[{
            'hide-box-shadow': showMenuItemFlag,
            'show-border': showBookIndexFlag
         }]"
         v-show="showMenuFlag">
        <div class="icon-wrapper" @click="showBookIndex">
          <span class="icon-menu"></span>
        </div>
      <div class="icon-wrapper" @click="showMenuItem(0)">
        <span class="icon-progress"></span>
      </div>
      <div class="icon-wrapper" @click="showMenuItem(1)">
        <span class="icon-bright"></span>
      </div>
      <div class="icon-wrapper" @click="showMenuItem(2)">
        <span class="icon-A"></span>
      </div>
    </div>
  </transition>
  </div>
</template>

<script>
import bookMixins from '../../mixins/bookMixins'
import ThemeSetting from './ThemeSetting'
import FontSizeSetting from './FontSizeSetting'
import ProgressSetting from './ProgressSetting'
import BookIndex from './BookIndex'
export default {
  name: 'readerMenu',
  mixins: [bookMixins],
  components: { BookIndex, ProgressSetting, ThemeSetting, FontSizeSetting },
  methods: {
    showBookIndex () {
      this.$store.dispatch('setShowMenuFlag', !this.showMenuFlag)
      this.$store.dispatch('setShowBookIndexFlag', !this.showBookIndexFlag)
    },
    showMenuItem (itemIndex) {
      this.$store.dispatch('setShowMenuItemFlag', !this.showMenuItemFlag)
      this.$store.dispatch('setMenuItemIndex', itemIndex)
    },
    hideMenuItem () {
      // 隐藏menu之后，将menuItem进行隐藏
      this.$store.dispatch('setShowMenuItemFlag', false)
      this.$store.dispatch('setMenuItemIndex', -1)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/assets/style/global";
  .menu-item-wrapper{
    z-index: 100;
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    width: 100%;
    height: px2rem(90);
    transition: transform 0.25s ease-in;
    background: white;
    box-shadow: px2rem(2) px2rem(-4) px2rem(12) rgba(0, 0, 0, .04);
    font-size: px2rem(20);
    .menu-item{
      margin: px2rem(20) 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
  }
  .menu-wrapper{
    z-index: 100;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: px2rem(48);
    transition: transform 0.25s ease-in;
    padding: 0 px2rem(8);
    background: white;
    box-shadow: px2rem(2) px2rem(-4) px2rem(12) rgba(0, 0, 0, .04);
    font-size: px2rem(20);
    &.hide-box-shadow{
      box-shadow: none;
    }
    &.show-border{
      box-shadow: px2rem(0) px2rem(0) px2rem(1) rgba(0, 0, 0, .04);
    }
    .icon-wrapper {
      @include center;
      .icon-progress {
        font-size: px2rem(24);
      }
      .icon-bright {
        font-size: px2rem(22);
      }
    }
  }
</style>
