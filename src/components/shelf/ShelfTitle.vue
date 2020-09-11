<template>
  <transition name="fade">
    <div class="shelf-title" :class="{'hide-shadow': ifHideShadow}" v-show="shelfTitleVisible">
      <div class="shelf-title-text-wrapper">
        <span class="shelf-title-text">{{title}}</span>
        <span class="shelf-title-sub-text" v-show="isEditMode">
          {{selectedText}}
        </span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-left">
        <span class="shelf-title-btn-text" @click="clearCache">{{$t('shelf.clearCache')}}</span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-right">
        <span class="shelf-title-btn-text" @click="onEditClick">
          {{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}
        </span>
      </div>
      <div class="shelf-title-btn-wrapper shelf-title-left" v-if="showBack">
        <span class="icon-back"></span>
      </div>
      <div class="shelf-title-btn-wrapper"
           :class="{'shelf-title-left': changeGroupLeft, 'shelf-title-right': changeGroupRight}"
           v-if="showChangeGroup">
        <span class="shelf-title-btn-text">{{$t('shelf.editGroup')}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import homeMixins from '../../mixins/homeMixins'
import { clearLocalForage } from '../../utils/localForage'

export default {
  name: 'ShelfTitle',
  mixins: [homeMixins],
  props: {
    title: String
  },
  watch: {
    homeOffsetY (value) {
      this.ifHideShadow = value === 0
    }
  },
  data () {
    return {
      showBack: false,
      changeGroupLeft: false,
      changeGroupRight: false,
      showChangeGroup: false,
      ifHideShadow: true
    }
  },
  computed: {
    selectedText () {
      const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0
      return selectedNumber <= 0 ? this.$t('shelf.selectBook') : (selectedNumber === 1 ? this.$t('shelf.haveSelectedBook').replace('$1', selectedNumber) : this.$t('shelf.haveSelectedBooks').replace('$1', selectedNumber))
    }
  },
  methods: {
    onEditClick () {
      this.$store.dispatch('setIsEditMode', !this.isEditMode)
    },
    clearCache () {
      // 清除localStorage
      window.localStorage.clear()
      // 清除LocalForage
      clearLocalForage()
      // 将shelfList置空
      this.$store.dispatch('setShelfList', [])
      // 重新请求ShelfList数据, 方法封装在mixin中
      this.getShelfList()
      // 提示清除缓存成功
      this.$toast(this.$t('shelf.clearCacheSuccess')).show()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './src/assets/style/global';
  .shelf-title {
    position: relative;
    z-index: 130;
    width: 100%;
    height: px2rem(42);
    background: white;
    padding: px2rem(6) px2rem(4);
    box-sizing: border-box;
    box-shadow: px2rem(2) 0 px2rem(6) rgba(9, 9, 9, .1);
    &.hide-shadow {
      box-shadow: none;
    }
    @include center;
    .shelf-title-text-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(42);
      @include columnCenter;
      .shelf-title-text {
        font-size: px2rem(14);
        line-height: px2rem(16);
        font-weight: bold;
        color: #333;
        @include center;
      }
      .shelf-title-sub-text {
        font-size: px2rem(8);
        color: #333;
      }
    }
    .shelf-title-btn-wrapper {
      position: absolute;
      top: 0;
      box-sizing: border-box;
      height: 100%;
      @include center;
      .shelf-title-btn-text {
        font-size: px2rem(14);
        color: #666;
      }
      .icon-back {
        font-size: px2rem(20);
        color: #666;
      }
      &.shelf-title-left {
        left: 0;
        padding-left: px2rem(15);
      }
      &.shelf-title-right {
        right: 0;
        padding-right: px2rem(15);
      }
    }
  }
</style>
