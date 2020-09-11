<template>
  <div class="shelf-footer" v-show="isEditMode">
    <div class="shelf-footer-tab-wrapper" v-for="item in tabs" :key="item.index" @click="onTabClick(item)">
      <div class="shelf-footer-tab" :class="{'is-selected': isSelected}">
        <div class="icon-private tab-icon" v-if="item.index === 1 && !isPrivate"></div>
        <div class="icon-private-see tab-icon" v-if="item.index === 1 && isPrivate"></div>
        <div class="icon-download tab-icon" v-if="item.index === 2 && !isDownload"></div>
        <div class="icon-download-remove tab-icon" v-if="item.index === 2 && isDownload"></div>
        <div class="icon-move tab-icon" v-if="item.index === 3"></div>
        <div class="icon-shelf tab-icon" v-if="item.index === 4"></div>
        <div class="tab-text" :class="{'remove-text': item.index === 4}">{{label(item)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import homeMixins from '../../mixins/homeMixins'
import { download } from '../../api/store'
import { removeLocalForage } from '../../utils/localForage'

export default {
  name: 'ShelfFooter',
  mixins: [homeMixins],
  data () {
    return {
      popupMenu: null,
      loadingItem: null
    }
  },
  computed: {
    isSelected () {
      return this.shelfSelected && this.shelfSelected.length > 0
    },
    tabs () {
      return [
        {
          label: this.$t('shelf.private'),
          label2: this.$t('shelf.noPrivate'),
          index: 1
        },
        {
          label: this.$t('shelf.download'),
          label2: this.$t('shelf.delete'),
          index: 2
        },
        {
          label: this.$t('shelf.move'),
          index: 3
        },
        {
          label: this.$t('shelf.remove'),
          index: 4
        }
      ]
    },
    // 当前选中图书是否为私密阅读模式
    isPrivate () {
      // 当前没有选中图书
      if (!this.isSelected) {
        return false
      } else {
        // 全部图书为private状态时，才设定isPrivate为true
        return this.shelfSelected.every(item => item.private)
      }
    },
    isDownload () {
      // 当前没有选中图书
      if (!this.isSelected) {
        return false
      } else {
        // 全部图书的cache属性为true，才设定isDownload为true
        return this.shelfSelected.every(item => item.cache)
      }
    }
  },
  methods: {
    async downloadSelectedBook () {
      // 初始化进度条组件
      this.loadingItem = this.$loading({ downloadText: this.$t('shelf.progressDownload').replace('：$1', '') })
      this.loadingItem.show()
      for (let i = 0; i < this.shelfSelected.length; i++) {
        await this.downloadBook(this.shelfSelected[i])
        // 下载图书后，修改选中图书的cache属性为true
          .then((book) => { book.cache = true })
      }
    },
    downloadBook (book) {
      // 电子书的下载路径是 categoryText | fileName
      // console.log(book)
      // 传入图书名称
      this.loadingItem.updateFileName(book.fileName + '.epub')
      return new Promise((resolve, reject) => {
        // 调用下载图书的方法
        download(book, (book) => {
          // 下载完毕，setLocalForage成功后，回调函数传回 得到blob对象res
          // console.log(book)
          // 执行resolve的回调函数
          // 回调函数是更新图书的cache属性，所以传入book对象
          resolve(book)
        }, (reject) => {
          console.log(reject)
        }, (progress) => {
          // 下载中
          const percent = Math.floor(progress.loaded / progress.total) * 100
          const percentStr = percent + '%'
          // console.log(percentStr)
          this.loadingItem.updateProgress(percentStr)
        })
      })
    },
    onTabClick (item) {
      if (!this.isSelected) {
        return
      }
      switch (item.index) {
        case 1:
          this.showPrivate()
          break
        case 2:
          this.showDownload()
          break
        case 3:
          this.dialog().show()
          break
        case 4:
          this.showRemove()
          break
        default:
          break
      }
    },
    hidePopup () {
      this.popupMenu.hide()
    },
    onComplete () {
      // 本地保存shelfList
      window.localStorage.setItem('shelfList', this.shelfList)
      // this.hidePopup()
      // this.$store.dispatch('setIsEditMode', false)
    },
    showPrivate () {
      this.popupMenu = this.$popup({
        title: this.isPrivate ? this.$t('shelf.closePrivateTitle') : this.$t('shelf.setPrivateTitle'),
        btn: [
          {
            text: this.isPrivate ? this.$t('shelf.close') : this.$t('shelf.open'),
            click: () => {
              this.setPrivate()
            }
          },
          {
            text: this.$t('shelf.cancel'),
            click: () => {
              this.hidePopup()
            }
          }
        ]
      })
      this.popupMenu.show()
    },
    showDownload () {
      this.popupMenu = this.$popup({
        title: this.isDownload ? this.$t('shelf.removeDownloadTitle') : this.$t('shelf.setDownloadTitle'),
        btn: [
          {
            text: this.isDownload ? this.$t('shelf.delete') : this.$t('shelf.open'),
            click: () => {
              this.setDownload()
            }
          },
          {
            text: this.$t('shelf.cancel'),
            click: () => {
              this.hidePopup()
            }
          }
        ]
      })
      this.popupMenu.show()
    },
    showRemove () {
      let title
      if (this.shelfSelected.length === 1) {
        title = this.$t('shelf.removeBookTitle').replace('$1', `《${this.shelfSelected[0].title}》`)
      } else {
        title = this.$t('shelf.removeBookTitle').replace('$1', this.$t('shelf.selectedBooks'))
      }
      this.popupMenu = this.$popup({
        title: title,
        btn: [
          {
            text: this.$t('shelf.removeBook'),
            type: 'danger',
            click: () => {
              this.removeSelected()
            }
          },
          {
            text: this.$t('shelf.cancel'),
            click: () => {
              this.hidePopup()
            }
          }
        ]
      })
      this.popupMenu.show()
    },
    // 私密阅读模式，将item的private属性设置为true
    setPrivate () {
      let isPrivate
      if (this.isPrivate) {
        isPrivate = false
      } else {
        isPrivate = true
      }
      this.shelfSelected.forEach((item) => { item.private = isPrivate })
      this.onComplete()
      if (isPrivate) {
        this.$toast({ text: this.$t('shelf.setPrivateSuccess') }).show()
      } else {
        this.$toast({ text: this.$t('shelf.closePrivateSuccess') }).show()
      }
    },
    // 下载，对应item的cache属性
    async setDownload () {
      this.hidePopup()
      this.$store.dispatch('setIsEditMode', false)
      if (this.isDownload) {
        this.removeSelectedBook()
      } else {
        // 下载选中电子书
        await this.downloadSelectedBook()
        // 由于download操作是异步操作，所以利用async改为同步
        // 关闭进度条
        this.loadingItem.hide()
        this.$toast({ text: this.$t('shelf.setDownloadSuccess') }).show()
      }
    },
    // 移出书架
    removeSelected () {
      // 感觉循环嵌套，有点费
      this.shelfSelected.forEach((selected) => {
        this.$store.dispatch('setShelfList', this.shelfList.filter(book => book !== selected))
      })
      this.$store.dispatch('setShelfSelected', [])
      this.onComplete()
    },
    removeSelectedBook () {
      // promise.all 不按顺序等全部函数执行结束，调用then
      Promise.all(this.shelfSelected.map(book => this.removeBook(book)))
        // 更新书籍的cache记录，保存bookShelf记录到本地
        .then(books => {
          books.map(book => {
            book.cache = false
          })
          // 本地保存shelfList
          window.localStorage.setItem('shelfList', this.shelfList)
          // 删除缓存，提示删除成功
          this.$toast({ text: this.$t('shelf.removeDownloadSuccess') }).show()
        })
    },
    removeBook (book) {
      return new Promise((resolve, reject) => {
        // 个人觉得没必要删除书籍的离线记录
        // window.localStorage.removeItem(`${book.categoryText}/${book.fileName}`)
        removeLocalForage(`${book.fileName}`)
        // 调用回调函数
        resolve(book)
      })
    },
    label (item) {
      switch (item.index) {
        case 1:
          return this.isPrivate ? item.label2 : item.label
        case 2:
          return this.isDownload ? item.label2 : item.label
        default:
          return item.label
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './src/assets/style/global';
  .shelf-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 120;
    display: flex;
    width: 100%;
    height: px2rem(50);
    background: white;
    box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(59, 59, 59, .1);
    .shelf-footer-tab-wrapper {
      flex: 1;
      width: 25%;
      height: 100%;
      .shelf-footer-tab {
        width: 100%;
        height: 100%;
        opacity: .5;
        @include columnCenter;
        &.is-selected {
          opacity: 1;
        }
        .tab-icon {
          font-size: px2rem(20);
          color: #666;
        }
        .tab-text {
          margin-top: px2rem(5);
          font-size: px2rem(12);
          color: #666;
          &.remove-text {
            color: $color-blue;
          }
        }
        .icon-shelf {
          color: $color-blue;
        }
      }
    }
  }

</style>
