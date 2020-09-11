<template>
  <div class="wrapper">
    <div class="search-wrapper">
      <div class="search">
        <span class="icon-search"></span>
        <input type="text"
               v-model="searchText"
               :placeholder="$t('book.searchHint')"
               @keyup.enter.exact="search()"
               @click="showSearchPage"
        />
        <span v-if="searchVisible" @click="hideSearchPage()">{{$t('book.cancel')}}</span>
      </div>
    </div>
    <div class="book-info" v-show="!searchVisible">
      <div class="cover-wrapper">
        <img :src="cover" />
      </div>
      <div class="book-info-wrapper">
        <div class="book-title">
          <span>{{title}}</span>
        </div>
        <div class="book-author">
          <span>{{author}}</span>
        </div>
      </div>
      <div class="book-progress-wrapper">
        <div class="book-progress">
          <span>
            {{currentBookProgress}}%
          </span>
          {{$t('book.haveRead2')}}</div>
        <div class="book-timer">{{$t('book.haveRead2')}}{{timeStamp}}</div>
      </div>
    </div>
    <scroll class="slide-contents-list"
            :top="156"
            :bottom="48"
            v-show="!searchVisible">
      <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index">
        <span class="slide-contents-item-label"
              :class="{'is-selected': currentSection === index}"
              :style="contentItemStyle(item)"
              @click="displayContent(item.href)">{{item.label}}</span>
        <span class="slide-contents-item-page">{{item.page}}</span>
      </div>
    </scroll>
    <scroll class="slide-search-list"
            :top="50"
            :bottom="48"
            v-show="searchVisible">
      <div class="slide-search-item"
           v-for="(item, index) in searchList"
           :key="index"
           v-html="item.excerpt"
           @click="displayContent(item.cfi, true)"></div>
    </scroll>
  </div>
</template>

<script>
import bookMixins from '../../mixins/bookMixins'
import Scroll from '../common/Scroll'
import { px2rem } from '../../utils/utils.js'

export default {
  name: 'SlideBookContent',
  mixins: [bookMixins],
  components: { Scroll },
  computed: {
    timeStamp: function () {
      const hour = Math.floor(this.timer / 60)
      const min = this.timer % 60
      let hourText = null
      if (hour > 1) {
        hourText = this.$t('book.hours')
      } else {
        hourText = this.$t('book.hour')
      }
      return hour > 0 ? `${hour}${hourText}  ${min}${this.$t('book.minutes')}` : `${min}${this.$t('book.minutes')}`
    },
    title: function () {
      return this.metadata == null ? '' : this.metadata.title
    },
    author: function () {
      return this.metadata == null ? '' : this.metadata.creator
    }
  },
  data () {
    return {
      searchVisible: false,
      searchList: null,
      searchText: ''
    }
  },
  methods: {
    search () {
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then(list => {
          this.searchList = list
          this.searchList.map(item => {
            item.excerpt = item.excerpt.replace(this.searchText, `<span class="_search-text">${this.searchText}</span>`)
            return item
          })
        })
      }
    },
    // 搜索算法
    doSearch (q) {
      return Promise.all(
        // 重要的代码片段
        this.currentBook.spine.spineItems.map(
          section => section.load(this.currentBook.load.bind(this.currentBook))
            .then(section.find.bind(section, q))
            .finally(section.unload.bind(section)))
        // 二维数组降为一维数组
      ).then(results => Promise.resolve([].concat.apply([], results)))
    },
    displayContent (target, highlight = false) {
      this.display(target, () => {
        this.$store.dispatch('setShowBookIndexFlag', false)
        if (highlight) {
          this.currentBook.rendition.annotations.highlight(target)
        }
      })
    },
    contentItemStyle (item) {
      return {
        marginLeft: `${px2rem(item.level * 15)}rem`
      }
    },
    showSearchPage () {
      this.searchVisible = true
    },
    hideSearchPage () {
      this.searchVisible = false
      this.searchText = ''
      this.searchList = null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./src/assets/style/global";
  .wrapper{
    width: 100%;
    // 去除文字间空格
    font-size: 0;
    .search-wrapper{
      box-sizing: border-box;
      height: px2rem(30);
      margin: px2rem(10);
      .search{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background: #d4d4d4;
        font-size: px2rem(14);
        padding: px2rem(4);
        border-radius: px2rem(14);
        :first-child{
          flex: 0 0 auto;
          font-size: px2rem(8);
          margin: 2px 6px 2px 4px;
        }
        :last-child{
          flex: 0 0 auto;
          margin: 0 8px;
        }
        input{
          flex: 1 0 auto;
          border: none;
          background: transparent;
          &:focus{
            outline: none;
          }
        }
      }
   }
    .book-info{
      display: flex;
      align-items: flex-start;
      width: 100%;
      height: px2rem(90);
      padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
      box-sizing: border-box;
      border-bottom: 1px solid rgba(0,0,0,0.05);
      .cover-wrapper{
        flex: 0 0 px2rem(45);
        height: px2rem(60);
        img{
          width: px2rem(45);
          height: px2rem(60);
        }
      }
      .book-info-wrapper{
        flex: 1;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        .book-title{
          font-size: px2rem(14);
          line-height: px2rem(16);
          span{
            @include ellipsis2(2);
          }
        }
        .book-author{
          font-size: px2rem(14);
          line-height: px2rem(16);
          margin: px2rem(5) 0;
          span{
            @include ellipsis2(1);
          }
        }
      }
      .book-progress-wrapper{
        flex: 0 0 px2rem(75);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .book-progress{
          font-size: px2rem(8);
          margin-bottom: px2rem(8);
          span{
            font-size: px2rem(16);
          }
        }
        .book-timer{
          font-size: px2rem(6);
        }
      }
    }
    .slide-contents-list {
      width: 100%;
      padding: px2rem(15);
      box-sizing: border-box;
      .slide-contents-item {
        display: flex;
        padding: px2rem(15) 0;
        box-sizing: border-box;
        .slide-contents-item-label {
          flex: 1;
          font-size: px2rem(14);
          line-height: px2rem(16);
          @include ellipsis;
          &.is-selected{
            color: #40a9ff;
          }
        }
        .slide-contents-item-page {
          flex: 0 0 px2rem(30);
          font-size: px2rem(10);
        }
      }
    }
    .slide-search-list {
      width: 100%;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-search-item {
        font-size: px2rem(14);
        line-height: px2rem(16);
        padding: px2rem(10) 0;
        box-sizing: border-box;
      }
    }
  }
</style>
