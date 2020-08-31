<template>
  <div class="book-list-wrapper">
    <detail-title :title="title"
                  :showShelf="true"
                  @back="back"
                  ref="title"></detail-title>
    <scroll class="book-list-scroll-wrapper"
            :top="42"
            @onScroll="onScroll"
            ref="scroll">
      <featured :titleText="titleText ? titleText : getCategoryText(key)" :btnText="''"
                :data="value"
                v-for="(value, key, index) in list"
                :key="index"></featured>
    </scroll>
  </div>
</template>

<script>
import DetailTitle from '../../components/detail/DetaiTitle'
import Scroll from '../../components/common/Scroll'
import Featured from '../../components/store/Featured'
import { realPx } from '../../utils/utils'
import { list } from '../../api/store'
import { categoryListNumber, categoryText } from '../../utils/store'

export default {
  components: {
    DetailTitle,
    Scroll,
    Featured
  },
  computed: {
    title () {
      if (this.list) {
        return this.total && '共 $1 本图书'.replace('$1', this.totalNumber)
      } else {
        return '无相关书籍'
      }
    },
    totalNumber () {
      let num = 0
      Object.keys(this.list).forEach(key => {
        num += this.list[key].length
      })
      return num
    }
  },
  data () {
    return {
      list: null,
      total: null,
      titleText: ''
    }
  },
  methods: {
    getCategoryText (key) {
      return `${categoryText(categoryListNumber[key])}(${this.list[key].length})`
    },
    back () {
      // 回退到上个页面
      this.$router.go(-1)
    },
    onScroll (offsetY) {
      if (offsetY > realPx(42)) {
        this.$refs.title.showShadow()
      } else {
        this.$refs.title.hideShadow()
      }
    },
    getList () {
      // 拿到返回数据
      list().then(response => {
        this.list = response.data.data
        this.total = response.data.total
        const category = this.$route.query.category
        // keyword是搜索关键词
        const keyword = this.$route.query.keyword
        if (category) {
          // 将该分类下的书籍资源拿到
          const key = Object.keys(this.list).filter(item => item === category)[0]
          const data = this.list[key]
          this.list = {}
          this.list[key] = data
        } else if (keyword) {
          // 搜索书目
          Object.keys(this.list).filter(key => {
            // 搜索关键字的方法
            // book.fileName.indexOf(keyword)
            // 书名中包含keyword
            this.list[key] = this.list[key].filter(book => book.fileName.indexOf(keyword) >= 0)
            return this.list[key].length > 0
          })
        }
      })
    }
  },
  created () {
    this.getList()
    this.titleText = this.$route.query.categoryText
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import './src/assets/style/global';
  .book-list-wrapper {
    width: 100%;
    height: 100%;
    background: white;
  }
</style>
