<template>
  <div class="shelf-list" :style="{top: shelfListTop}">
    <transition-group name="list"
                      tag="div"
                      id="shelf-list">
    <div class="shelf-list-item-wrapper" v-for="item in data" :key="item.id">
      <!-- 主要显示封面图像及类别-->
      <shelf-item :data="item" :style="{height: itemHeight}" />
      <div class="shelf-list-title-wrapper">
        <span class="shelf-list-title title-small">{{item.title}}</span>
      </div>
    </div>
    </transition-group>
  </div>
</template>

<script>
import ShelfItem from './ShelfItem'
import homeMixins from '../../mixins/homeMixins'
import { realPx, px2rem } from '../../utils/utils'
export default {
  name: 'ShelfList',
  components: { ShelfItem },
  mixins: [homeMixins],
  props: {
    top: {
      type: Number,
      default: 98
    },
    data: Array
  },
  computed: {
    shelfListTop () {
      return px2rem(this.top) + 'rem'
    },
    // 动态设置item的样式高度
    itemHeight () {
      // 封面图片宽高比 250*350
      // height = width / 宽高比
      // width = (window.innerWidth - realPx(30 * 4)) / 3
      // height = width / (250 * 350)
      return ((window.innerWidth - realPx(120)) / 3) / 250 * 350 + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './src/assets/style/global';

  .shelf-list {
    position: absolute;
    z-index: 100;
    // 由于组件要复用，所以这里不直接设置top
    // top: px2rem(98);
    left: 0;
    #shelf-list {
      display: flex;
      // flex-wrap: wrap; 不可以用
      flex-flow: row wrap;
      width: 100%;
      // 通过外部元素的padding实现等宽布局
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .shelf-list-item-wrapper {
        flex: 0 0 33.33%;
        width: 33.33%;
        // 等边距 30px
        padding: px2rem(15);
        box-sizing: border-box;

        .shelf-list-title-wrapper {
          margin-top: px2rem(10);
        }

        // transitionGroup的class设置
        &.list-leave-active {
          display: none;
        }
        &.list-move {
          transition: transform .5s;
        }
      }
    }
  }
</style>
