<template>
  <div class="store-home">
    <store-home-header />
    <flap-card :data="random"/>
    <scroll @onScroll="onscroll" :top="scrollTop" ref="scroll">
      <div class="banner-wrapper">
        <div class="banner-img" :style="{backgroundImage:`url('${banner}')`}"></div>
      </div>
      <guess-you-like class="guess-you-like" :data="guessYouLike"></guess-you-like>
      <recommend class="recommend" :data="recommend"></recommend>
      <featured class="featured"
                :data="featured"
                :titleText="$t('home.featured')"
                :btnText="$t('home.seeAll')"
      ></featured>
      <div class="category-list-wrapper"
           v-for="(item, index) in categoryList" :key="index">
        <category-book :data="item"></category-book>
      </div>
      <category class="categories" :data="categories"></category>
    </scroll>
  </div>

</template>

<script>
import StoreHomeHeader from '../../components/store/StoreHomeHeader'
import Scroll from '../../components/common/Scroll'
import homeMixins from '../../mixins/homeMixins'
import FlapCard from '../../components/store/FlapCard'
import GuessYouLike from '../../components/store/GuessYouLike'
import Recommend from '../../components/store/Recommend'
import Featured from '../../components/store/Featured'
import Category from '../../components/store/Category'
import CategoryBook from '../../components/store/CategoryBook'
// 引入mock数据
import { home } from '../../api/store'

export default {
  name: 'StoreHome',
  components: {
    Featured,
    Recommend,
    GuessYouLike,
    Category,
    CategoryBook,
    FlapCard,
    Scroll,
    StoreHomeHeader
  },
  mixins: [homeMixins],
  data () {
    return {
      scrollTop: 94,
      random: null,
      banner: null,
      guessYouLike: null,
      recommend: null,
      featured: null,
      categoryList: null,
      categories: null
    }
  },
  mounted () {
    // 通过home获取mock数据
    home().then(response => {
      if (response && response.status === 200) {
        // console.log(response)
        const data = response.data
        // 随机推荐书籍
        const randomIndex = Math.floor(Math.random() * data.random.length)
        this.random = data.random[randomIndex]
        this.banner = data.banner
        this.guessYouLike = data.guessYouLike
        this.recommend = data.recommend
        this.featured = data.featured
        this.categoryList = data.categoryList
        this.categories = data.categories
      }
    })
  },
  methods: {
    onscroll (offsetY) {
      this.$store.dispatch('setHomeOffsetY', offsetY)
      if (offsetY > 0) {
        // 如果滚动超过0，则隐藏标题，滚动条距顶部为52像素
        this.scrollTop = 52
      } else {
        // 如果滚动为0，则显示标题，滚动条距顶部为94像素
        this.scrollTop = 94
      }
      // 调用scroll组件的refresh方法，重新设置其样式
      this.$refs.scroll.refresh()
    }
  }

}
</script>

<style lang="scss" scoped>
  @import './src/assets/style/global';
  .store-home {
    width: 100%;
    height: 100%;
    .banner-wrapper {
      width: 100%;
      padding: px2rem(10);
      box-sizing: border-box;
      .banner-img {
        width: 100%;
        height: px2rem(150);
        // 图片填充不满，不重复填充
        background-repeat: no-repeat;
        // 图片宽100% 高100%
        background-size: 100% 100%;
      }
    }
    .guess-you-like, .recommend, .featured, .category-list-wrapper, .categories {
      margin: px2rem(10) px2rem(4);
    }
  }
</style>
