<template>
  <div>
    <div class="search-bar" :class="{'hide-title': !titleVisible, 'hide-shadow': !shadowVisible}">
      <transition name="title-move">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-text-wrapper">
            <span class="title-text title">书城</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <div class="title-icon-back-wrapper"
           @click="back"
           :class="{'hide-title': !titleVisible}">
        <span class="icon-back icon"></span>
      </div>
      <div class="search-bar-input-wrapper" :class="{'hide-title': !titleVisible}">
        <div class="search-bar-blank" :class="{'hide-title': !titleVisible}"></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <!--keyup.13.exact 按下回车键-->
          <input class="input"
                 type="text"
                 placeholder="社科文学"
                 v-model="searchText"
                 @click="showHotSearch"
                 @keyup.13.exact="search">
        </div>
      </div>
    </div>
    <hot-search-list v-show="hotSearchVisible" ref="hotSearch" />
  </div>
</template>

<script>
import homeMixins from '../../mixins/homeMixins'
import HotSearchList from './HotSearchList'
export default {
  name: 'StoreHomeHeader',
  components: { HotSearchList },
  mixins: [homeMixins],
  watch: {
    homeOffsetY (v) {
      if (v > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
    },
    searchOffsetY (offsetY) {
      if (offsetY > 0) {
        this.showShadow()
      } else {
        this.hideShadow()
      }
    }
  },
  data () {
    return {
      titleVisible: true,
      shadowVisible: true,
      searchText: '',
      hotSearchVisible: false
    }
  },
  methods: {
    showHotSearch () {
      this.hideTitle()
      this.hideShadow()
      this.hotSearchVisible = true
      // 在组件挂载后开始渲染时，调用hotSearch的scrollTo方法，滑动到(0,0)位置，重置searchOffsetY
      this.$nextTick(() => {
        this.$refs.hotSearch.reset()
      })
    },
    search () {
      // 在storeList页面搜索
      this.$router.push({
        path: '/store/list',
        query: {
          keyword: this.searchText
        }
      })
    },
    hideHotSearch () {
      this.hotSearchVisible = false
      // back之后的操作
      if (this.offsetY > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
    },
    back () {
      if (this.offsetY > 0) {
        this.showShadow()
      } else {
        this.hideShadow()
      }
      if (this.hotSearchVisible) {
        this.hideHotSearch()
      } else {
        this.$router.push('/store/shelf')
      }
    },
    showFlapCard () {
      this.$store.dispatch('setFlapCardVisible', true)
    },
    hideTitle () {
      this.titleVisible = false
    },
    showTitle () {
      this.titleVisible = true
    },
    showShadow () {
      this.shadowVisible = true
    },
    hideShadow () {
      this.shadowVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/assets/style/global";

  .search-bar {
    position: relative;
    z-index: 150;
    width: 100%;
    height: px2rem(94);
    box-shadow: 0 px2rem(2) px2rem(2) px2rem(4) rgba(0, 0, 0, .05);
    &.hide-title {
      height: px2rem(52);
    }
    &.hide-shadow {
      box-shadow: none;
    }
    .search-bar-title-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(42);
      .title-text-wrapper {
        width: 100%;
        height: px2rem(42);
        @include center;
      }
      .title-icon-shake-wrapper {
        position: absolute;
        right: px2rem(15);
        top: 0;
        height: px2rem(42);
        @include center;
      }
    }
    .title-icon-back-wrapper {
      position: absolute;
      left: px2rem(15);
      top: 0;
      z-index: 200;
      height: px2rem(42);
      transition: height $animationTime $animationType;
      @include center;
      &.hide-title {
        // 下滑之后，只变换包裹元素高度
        height: px2rem(52);
      }
    }
    .search-bar-input-wrapper {
      position: absolute;
      left: 0;
      top: px2rem(42);
      display: flex;
      width: 100%;
      height: px2rem(52);
      padding: px2rem(10);
      box-sizing: border-box;
      transition: top $animationTime $animationType;
      &.hide-title {
        top: 0;
      }
      // search-bar-blank占位，修改下滑前后的搜索框长度
      .search-bar-blank {
        flex: 0 0 0;
        width: 0;
        transition: all $animationTime $animationType;
        &.hide-title {
          flex: 0 0 px2rem(31);
          width: px2rem(31);
        }
      }
      .search-bar-input {
        flex: 1;
        width: 100%;
        background: #f4f4f4;
        border-radius: px2rem(20);
        padding: px2rem(5) px2rem(15);
        box-sizing: border-box;
        border: px2rem(1) solid #eee;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        .icon-search {
          color: #999;
        }
        .input {
          width: 100%;
          height: px2rem(22);
          border: none;
          background: transparent;
          margin-left: px2rem(10);
          font-size: px2rem(12);
          color: #666;
          &:focus {
            outline: none;
          }
          // 重置placeholder的字体颜色
          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
      }
    }
  }

</style>
