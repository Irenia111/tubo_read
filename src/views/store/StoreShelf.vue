<template>
  <div class="store-shelf">
    <shelf-title :title="$t('shelf.title')"></shelf-title>
    <scroll class="store-shelf-scroll-wrapper"
            :top="0"
            :bottom="scrollBottom"
            @onScroll="onScroll"
            ref="scroll">
      <shelf-search></shelf-search>
      <shelf-list></shelf-list>
    </scroll>
    <shelf-footer></shelf-footer>
  </div>
</template>

<script>
import ShelfTitle from '../../components/shelf/ShelfTitle'
import Scroll from '../../components/common/Scroll'
import ShelfSearch from '../../components/shelf/ShelfSearch'
import ShelfList from '../../components/shelf/ShelfList'
import ShelfFooter from '../../components/shelf/ShelfFooter'
import homeMixins from '../../mixins/homeMixins'

export default {
  name: 'StoreShelf',
  mixins: [homeMixins],
  components: { ShelfFooter, ShelfList, ShelfSearch, ShelfTitle, Scroll },
  watch: {
    isEditMode (value) {
      this.scrollBottom = value ? 50 : 0
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  },
  data () {
    return {
      scrollBottom: 0
    }
  },
  methods: {
    onScroll (offsetY) {
      this.$store.dispatch('setHomeOffsetY', offsetY)
    }
    /* 方法封装至mixin
    getShelfList () {
      // api请求shelf数据
      shelf().then(response => {
        if (response.status === 200 && response.data && response.data.bookList) {
          // console.log(response.data.bookList)
          const list = appendAddToShelf(response.data.bookList)
          this.$store.dispatch('setShelfList', list)
        }
      })
    }

     */
  },
  mounted () {
    this.getShelfList()
  }
}
</script>

<style lang="scss" scoped>

  .store-shelf {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: white;
  .store-shelf-scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
  }
  }
</style>
