<template>
  <div :class="
      [ 'shelf-item',
      {'shelf-item-shadow': data.type === 1 || data.type === 2}]"
       @click="onItemClick(data.type)"
  >
    <!-- 动态组件 -->
    <component :is="itemType"
               :data="data"
               :class="['shelf-item-comp', {'is-edit': isEditMode && data.type === 2}]"></component>
    <!-- 选中状态图标 -->
    <div class="icon-selected"
         :class="{'is-selected': data.selected}"
         v-show="isEditMode && data.type === 1"></div>
  </div>
</template>

<script>
// 动态组件
import ShelfItemBook from './ShelfItemBook'
import ShelfItemCategory from './ShelfItemCategory'
import ShelfItemAdd from './ShelfItemAdd'
import homeMixins from '../../mixins/homeMixins'
export default {
  name: 'ShelfItem',
  mixins: [homeMixins],
  props: {
    data: Object
  },
  computed: {
    itemType () {
      return this.data.type === 1 ? this.book : (this.data.type === 2 ? this.category : this.add)
    }
  },
  data () {
    return {
      // 绑定动态组件
      book: ShelfItemBook,
      category: ShelfItemCategory,
      add: ShelfItemAdd
    }
  },
  methods: {
    onItemClick (itemType) {
      if (this.isEditMode) {
        this.editItem()
      } else {
        this.gotoPage(itemType)
      }
    },
    editItem () {
      // 修改item的选中状态
      this.data.selected = !this.data.selected
      if (this.data.selected) {
        // 如过时选中状态，则需要存进shelfSelected
        this.$store.dispatch('appendShelfSelected', this.data)
      } else {
        // 如过不是选中的状态，则需要删除
        this.$store.dispatch('removeShelfSelected', this.data.fileName)
      }
    },
    gotoPage (itemType) {
      switch (itemType) {
        case 1:
          this.showBookDetail(this.data)
          break
        case 2:
          this.$router.push({
            path: '/store/category',
            query: {
              // 将分类名称作为参数，从路由传入
              title: this.data.title
            }
          })
          break
        case 3:
          this.gotoStoreHome()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './src/assets/style/global';
  .shelf-item{
    position: relative;
    width: 100%;
    height: 100%;
    &.shelf-item-shadow{
      box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, .3);
    }
    .shelf-item-comp{
      opacity: 1;
      &.is-edit {
        opacity: .5;
      }
    }
    .icon-selected{
      position: absolute;
      bottom: px2rem(4);
      right: px2rem(4);
      font-size: px2rem(18);
      color: rgba(59, 59, 59, .4);
      &.is-selected {
        color: $color-blue;
      }
    }
  }
</style>
