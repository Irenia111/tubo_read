import { mapGetters } from 'vuex'
import { shelf } from '../api/store'
import { appendAddToShelf } from '../utils/store'

export default {
  computed: {
    ...mapGetters([
      'homeOffsetY',
      'searchOffsetY',
      'flapCardVisible',
      'isEditMode',
      'shelfList',
      'shelfSelected',
      'shelfTitleVisible',
      'shelfCategory',
      'currentType'
    ])
  },
  methods: {
    showBookDetail (data) {
      // console.log(data)
      // 路由跳转
      this.$router.push({
        path: '/store/detail',
        query: {
          fileName: data.fileName,
          // category: data.category
          category: data.categoryText
        }
      })
    },
    gotoStoreHome () {
      this.$router.push({ path: '/store/home' })
    },
    // 获得shelfList数据
    getShelfList () {
      const shelfList = window.localStorage.getItem('shelfList')
      if (!shelfList) {
        // 本地未储存
        // api请求shelf数据
        shelf().then(response => {
          if (response.status === 200 && response.data && response.data.bookList) {
            // console.log(response.data.bookList)
            const list = appendAddToShelf(response.data.bookList)
            // 本地存储shelfList
            window.localStorage.setItem('shelfList', this.shelfList)
            // 更新vuex中的shelfList
            this.$store.dispatch('setShelfList', list)
          }
        })
      } else {
        // 已有本地存储, 初始化vuex
        this.$store.dispatch('setShelfList', shelfList)
      }
    }
  }
}
