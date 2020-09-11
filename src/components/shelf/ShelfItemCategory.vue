<template>
  <div class="shelf-item-category">
    <!-- 当类目数据为空时，显示列表 -->
    <div class="shelf-item-category-list" v-if="data.itemList.length > 0">
      <div class="shelf-item-category-item" v-for="(item, index) in data.itemList" :key="index">
        <img class="shelf-item-category-img" :src="item.cover" />
      </div>
    </div>
    <!-- 当类目数据为空时，显示图标 -->
    <div class="shelf-item-category-bg" v-else>
      <span class="icon-book2"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShelfItemCategory',
  props: {
    data: Object,
    methods: {
      // 书籍移出书籍分组的实现
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './src/assets/style/global';
  .shelf-item-category{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .shelf-item-category-list{
      display: flex;
      flex-flow: row wrap;
      // 存在空白区域时的排列
      align-content: flex-start;
      // 每排排不满时
      align-items: flex-start;
      width: 100%;
      height: 100%;
      padding-top: px2rem(5);
      box-sizing: border-box;
      .shelf-item-category-item{
        flex: 0 0 33.33%;
        width: 33.33%;
        height: 33.33%;
        box-sizing: border-box;
        // 每行首尾的padding为一半
        &:nth-child(3n+1) {
          padding: 0  px2rem(2.5) px2rem(5) px2rem(5);
        }
        &:nth-child(3n+2) {
          padding: 0  px2rem(2.5) px2rem(5) px2rem(2.5);
        }
        &:nth-child(3n+3) {
          padding: 0  px2rem(5) px2rem(5) px2rem(2.5);
        }
        .shelf-item-category-img{
          width: 100%;
          height: 100%;
        }
      }

    }
    .shelf-item-category-bg {
      width: 100%;
      height: 100%;
      background: white;
      font-size: px2rem(30);
      color: #333;
      @include center;
    }
  }
</style>
