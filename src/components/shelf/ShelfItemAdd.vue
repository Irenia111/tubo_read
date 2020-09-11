<template>
  <div class="shelf-item-add">
    <span class="icon-add"></span>
  </div>
</template>

<script>
export default {
  name: 'ShelfItemAdd',
  props: {
    data: Object
  }
}
</script>

<style lang="scss" scoped>
  @import './src/assets/style/global';
.shelf-item-add{
  width: 100%;
  height: 100%;
  border: px2rem(1) solid rgba(59, 59, 59, 0.12);
  box-sizing: border-box;
  @include center;
  .icon-add{
    font-size: px2rem(40);
    color: #ccc;
  }
}
</style>
