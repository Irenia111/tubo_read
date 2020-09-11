<template>
  <div class="shelf-item-book">
    <img class="shelf-item-book-cover" :src="data.cover" />
    <div class="private-wrapper" v-show="data.private"></div>
    <div class="private-icon-wrapper" v-show="data.private">
      <span class="icon-private"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShelfItemBook',
  props: {
    data: Object
  }
}
</script>

<style lang="scss" scoped>
  @import './src/assets/style/global';
  .shelf-item-book{
    width: 100%;
    height: 100%;
    .shelf-item-book-cover{
      width: 100%;
      height: 100%;
    }
    .private-wrapper {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 0;
      border-width: px2rem(20);
      border-style: solid;
      border-color: transparent transparent rgba(0, 0, 0, .3) rgba(0, 0, 0, .3);
    }
    .private-icon-wrapper {
      position: absolute;
      left: px2rem(2);
      bottom: px2rem(2);
      width: px2rem(20);
      height: px2rem(20);
      @include center;
      .icon-private {
        font-size: px2rem(12);
        color: white;
      }
    }
  }
</style>
