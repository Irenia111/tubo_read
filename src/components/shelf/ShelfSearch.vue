<template>
  <div :class="[ 'shelf-search-wrapper', {'hide-shadow': ifHideShadow, 'is-fixed': ifInputClicked }]">
    <div :class="[ 'shelf-search', {'search-top': ifInputClicked}]">
      <div class="search-wrapper">
        <div class="icon-search-wrapper"><span class="icon-search icon"></span></div>
        <div class="search-input-wrapper">
          <input class="search-input"
                 type="text"
                 :placeholder="$t('shelf.search')"
                 v-model="searchText"
                 @click="onSearchClick"
          />
        </div>
        <div class="icon-clear-wrapper"
             v-show="searchText.length > 0"
             @click="clearSearchText"
        ><span class="icon-close-circle-fill"></span></div>
      </div>
      <div class="icon-locale-wrapper" v-show="!ifInputClicked" @click="switchLocale">
        <span v-show="currentLocale === 'cn'" class="icon-cn icon"></span>
        <span v-show="currentLocale === 'en'" class="icon-en icon"></span>
      </div>
      <div class="cancel-btn-wrapper"
           @click="onCancelClick"
           v-show="ifInputClicked">
        <span class="cancel-text">{{$t('shelf.cancel')}}</span>
      </div>
    </div>
    <transition name="shelf-search-move">
    <div class="shelf-search-tab-wrapper" v-if="ifInputClicked">
      <div class="shelf-search-tab-item"
           v-for="item in tabs" :key="item.index"
           @click="onTabClick(item.index)">
        <span class="shelf-search-tab-text"
              :class="{'is-selected': item.index === selectedTabIndex}"
        >{{item.text}}</span>
      </div>

    </div>
    </transition>
  </div>
</template>

<script>
import homeMixins from '../../mixins/homeMixins'

export default {
  name: 'ShelfSearch',
  mixins: [homeMixins],
  watch: {
    homeOffsetY (value) {
      this.ifHideShadow = !(value > 0 && this.ifInputClicked)
    }
  },
  computed: {
    currentLocale () {
      return this.$i18n.locale
    },
    tabs () {
      return [
        {
          index: 1,
          text: this.$t('shelf.default')
        },
        {
          index: 2,
          text: this.$t('shelf.progress')
        },
        {
          index: 3,
          text: this.$t('shelf.purchase')
        }
      ]
    }
  },
  data () {
    return {
      ifInputClicked: false,
      searchText: '',
      selectedTabIndex: 1,
      ifHideShadow: true
    }
  },
  methods: {
    onSearchClick () {
      this.ifInputClicked = true
      // 隐藏shelfTitle
      this.$store.dispatch('setShelfTitleVisible', false)
    },
    onCancelClick () {
      this.ifInputClicked = false
      // 显示shelfTitle
      this.$store.dispatch('setShelfTitleVisible', true)
    },
    clearSearchText () {
      this.searchText = ''
    },
    switchLocale () {
      const lang = this.currentLocale === 'en' ? 'cn' : 'en'
      this.$i18n.locale = lang
      window.localStorage.setItem('localLang', lang)
    },
    onTabClick (index) {
      this.selectedTabIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './src/assets/style/global';
  .shelf-search-wrapper{
    position: relative;
    z-index: 105;
    width: 100%;
    height: px2rem(94);
    font-size: px2rem(16);
    background: white;
    box-sizing: border-box;
    padding: 0 px2rem(4);
    box-shadow: px2rem(2) 0 px2rem(6) rgba(9, 9, 9, .1);
    &.hide-shadow {
      box-shadow: none;
    }
    &.is-fixed{
      position: fixed;
      top: 0;
    }
    .shelf-search{
      position: absolute;
      z-index: 105;
      display: flex;
      top: px2rem(42);
      left: 0;
      width: 100%;
      height: px2rem(52);
      transition: top $animationTime ease-in-out;
      &.search-top{
        top: 0;
      }
      .search-wrapper{
        flex: 1;
        margin: px2rem(8) 0 px2rem(8) px2rem(10);
        border: px2rem(1) solid #ccc;
        border-radius: px2rem(3);
        display: flex;
        .icon-search-wrapper{
          flex: 0 0 px2rem(22);
          @include right;
          .icon-search{
            font-size: px2rem(12);
          }
        }
        .search-input-wrapper{
          flex: 1;
          padding: 0 px2rem(10);
          box-sizing: border-box;
          @include center;
          .search-input{
            width: 100%;
            font-size: px2rem(14);
            border: none;
            color: #333;
            &:focus{
              outline: none;
            }
            &::-webkit-input-placeholder{
              font-size: px2rem(14);
              color: #ccc;
            }
          }
        }
        .icon-clear-wrapper{
          flex: 0 0 px2rem(24);
          @include left;
          .icon-close-circle-fill{
            font-size: px2rem(16);
            color: #ccc;
          }
        }
      }
      .icon-locale-wrapper{
        flex: 0 0 px2rem(60);
        @include center;
        .icon-cn, .icon-en{
          font-size: px2rem(22);
          color: #666;
          @include center;
        }
      }
      .cancel-btn-wrapper{
        flex: 0 0 px2rem(60);
        @include center;
        .cancel-text{
          font-size: px2rem(14);
          color: $color-blue;
        }
      }
    }
    .shelf-search-tab-wrapper {
      position: absolute;
      top: px2rem(52);
      left: 0;
      z-index: 105;
      display: flex;
      width: 100%;
      height: px2rem(42);
      padding: 0 px2rem(4);
      box-sizing: border-box;
      .shelf-search-tab-item {
        flex: 1;
        @include center;
        .shelf-search-tab-text {
          font-size: px2rem(12);
          color: #999;
          &.is-selected{
            color: $color-blue;
          }
        }
      }
    }
  }

</style>
