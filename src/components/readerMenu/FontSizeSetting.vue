<template>
  <div class="font-wrapper">
    <div class="font-size-list-wrapper">
      <div :class="['font-size-item',
    {
      'is-selected': item.index < currentIndex,
      'is-active': item.index === currentIndex,
    }
    ]"
           v-for=" item in fontSizeList" :key="item.index"
           @click="selectFontSize(item)"
      >
        <span class="preview" v-show="item.index === 0 || item.index === fontSizeList.length-1">A</span>
        <div class="selected-item" v-show="item.index === currentIndex ">
          <span>{{item.fontSize}}</span>
        </div>
      </div>
    </div>
    <div class="item-wrapper">
      <div class="item font-family-wrapper" @click="showFontFamilySetting()">
        <span>{{$t('book.selectFont')}}</span>
        <span class="icon-forward"></span>
      </div>
    </div>
  </div>
</template>

<script>
import settingMixins from '../../mixins/settingMixins'
export default {
  name: 'FontSizeSetting',
  mixins: [settingMixins],
  data () {
    return {
      currentIndex: 1
    }
  },
  methods: {
    selectFontSize (item) {
      // console.log(item)
      // console.log(this.currentFontSize)
      this.currentIndex = item.index
      const fontSize = item.fontSize + 'px'
      this.currentBook.rendition.themes.fontSize(fontSize)
      this.$store.dispatch('setFontSize', this.currentIndex)
    },
    showFontFamilySetting () {
      this.$store.dispatch('setShowFontFamilyFlag', true)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/assets/style/global";
  .font-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .font-size-list-wrapper{
      flex: 2 0 auto;
      margin: 0 auto;
      width: 80%;
      height: px2rem(25);
      display: flex;
      .font-size-item{
        background: #d4d4d4;
        border-right: 1px solid #d4d4d4;
        flex: 1 0 px2rem(24);
        position: relative;
        .preview{
          @include center;
        }
        .selected-item{
          position: absolute;
          z-index: 110;
          background: white;
          top: px2rem(-2);
          left: px2rem(14);
          height: px2rem(28);
          width: px2rem(28);
          border-radius: 50%;
          box-shadow: px2rem(2) px2rem(0) px2rem(4) rgba(0, 0, 0, 0.15);
          @include center;
          font-size: 12px;
          span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
          }
        }
        &.is-selected, &.is-active{
          background: #cacacc;
          border-right: 1px solid white;
        }
        &:first-child{
          @include center;
          font-size: 12px;
          padding-left: 2px;
          border-bottom-left-radius: px2rem(12);
          border-top-left-radius: px2rem(12);
          .selected-item{
            left: -1px;
          }
          &.is-selected{
            border-right: 1px solid #cacacc;
          }
          &.is-active{
            background: #d4d4d4;
            border-right: 1px solid #d4d4d4;
          }
        }
        &:last-child{
          @include center;
          border-right: none;
          font-size: 16px;
          padding-right: 2px;
          border-bottom-right-radius: px2rem(12);
          border-top-right-radius: px2rem(12);
          .selected-item{
            left: 2px;
          }
        }
        &:nth-child(2){
          flex: 1 0 0;
          .selected-item{
            left: px2rem(-10);
          }
        }
      }
    }
    .item-wrapper{
      margin: px2rem(18) 0;
      flex: 1 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .item{
        font-size: px2rem(16);
        display: flex;
        justify-content: space-between;
        align-items: center;
        :first-child{
          margin-right: px2rem(4);
        }
      }
    }
  }

</style>
