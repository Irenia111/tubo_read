import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'homeOffsetY',
      'searchOffsetY',
      'flapCardVisible'
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
    }
  }
}
