<template>
  <transition name="slide-down">
    <div class="header-wrapper" v-show="showMenuFlag">
      <div class="left-wrapper">
        <div class="icon-wrapper" @click.stop="back">
          <span class="icon-back"></span>
        </div>
      </div>
      <div class="right-wrapper">
        <div class="icon-wrapper">
          <span class="icon-shelf"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import bookMixins from '../../mixins/bookMixins'
export default {
  name: 'readerHeader',
  mixins: [bookMixins],
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/assets/style/global";
  .header-wrapper{
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: px2rem(48);
    background: white;
    transition: transform 0.25s ease-in-out;
    box-shadow: px2rem(2) px2rem(4) px2rem(12) rgba(0, 0, 0, .04);
    font-size: px2rem(20);
    .left-wrapper{
      @include center;
      flex: 0 0 px2rem(40);
      margin-left: px2rem(8);
    }
    .right-wrapper{
      margin-right: px2rem(8);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .icon-wrapper {
        flex: 0 0 px2rem(40);
        @include center;
        .icon-shelf {
          font-size: px2rem(22);
        }
        .icon-cart {
          font-size: px2rem(22);
        }
      }
    }
  }

</style>
