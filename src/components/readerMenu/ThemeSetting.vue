<template>
  <div class="theme-list-wrapper">
    <div class="theme-list">
      <div v-for="item in themeList" :key="item.index"
        :class="['item',{'is-active': item.name === currentTheme}]"
        @click="selectTheme(item)"
      >
        <div class="preview"
             :style="{
          background: item.style.body.background,
          color: item.style.body.color
        }"
        >Abc</div>
        <div class="item-des">{{item.alias}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import settingMixins from '../../mixins/settingMixins'

export default {
  name: 'ThemeSetting',
  mixins: [settingMixins],
  methods: {
    selectTheme (item) {
      this.$store.dispatch('setTheme', item.name).then(() => {
        this.currentBook.rendition.themes.select(this.currentTheme)
        // this.initGlobalStyle()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/assets/style/global";
  .theme-list-wrapper{
    .theme-list{
      display:flex;
      font-size: px2rem(16);
      .item{
        flex: 1 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        .preview{
          width: px2rem(45);
          height: px2rem(30);
          border-radius: px2rem(4);
          margin-bottom: px2rem(12);
          border: 1px solid transparent;
          @include center;
        }
        &.is-active{
          color: #40a9ff;
          .preview{
            border: 1px solid #40a9ff;
            box-shadow: px2rem(2) px2rem(2) px2rem(10) rgba(0, 0, 0, .16);
          }
        }
      }
    }
  }

</style>
