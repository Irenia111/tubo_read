<template>
  <div class="ebook-slide-bookmark">
    <div class="slide-bookmark-title">{{$t('book.bookmark')}} · {{bookmark ? bookmark.length : 0}}</div>
    <scroll class="slide-bookmark-list" :top="48" :bottom="48">
      <div class="slide-bookmark-item" v-for="(item, index) in bookmark" :key="index" @click="displayBookmark(item.cfi)">
        <div class="slide-bookmark-item-icon">
          <div class="icon-wrapper">
            <div class="icon-bookmark"></div>
          </div>
        </div>
        <div class="slide-bookmark-item-text">{{item.text}}</div>
      </div>
    </scroll>
  </div>
</template>

<script>
import bookMixins from '../../mixins/bookMixins'
import Scroll from '../common/Scroll'
export default {
  name: 'SlideBookMark',
  mixins: [bookMixins],
  components: { Scroll },
  methods: {
    displayBookmark (target) {
      this.display(target, () => {
        this.$store.dispatch('setShowBookIndexFlag', false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/assets/style/global";
  .ebook-slide-bookmark {
    width: 100%;
    .slide-bookmark-title {
      width: 100%;
      height: px2rem(48);
      font-size: px2rem(14);
      font-weight: bold;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .slide-bookmark-list {
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-bookmark-item {
        display: flex;
        padding: px2rem(15) 0;
        box-sizing: border-box;
        .slide-bookmark-item-icon {
          flex: 0 0 px2rem(29);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          .icon-wrapper{
            position: relative;
            width: px2rem(20);
            height: px2rem(20);
            font-size: px2rem(12);
            border-radius: 50%;
            background: #bbb;
            .icon-bookmark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
            }
          }
        }
        .slide-bookmark-item-text {
          font-size: px2rem(14);
          line-height: px2rem(15);
          max-height: px2rem(45);
          @include ellipsis2(3);
        }
      }
    }
  }
</style>
