import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'showMenuFlag',
      'showMenuItemFlag',
      'showBookIndexFlag',
      'fileName',
      'menuItemIndex',
      'currentBook',
      'isProgressAvailable',
      'currentFontSize',
      'currentBookProgress',
      'currentCfi',
      'currentSection',
      'timer',
      'cover',
      'navigation',
      'metadata',
      'offsetY',
      'isBookmark',
      'bookmark'
    ])
  },
  methods: {
    refreshLocation () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      if (currentLocation && currentLocation.start) {
        const currentCfi = currentLocation.start.cfi
        // 由于分页没有完成，所以导致progress一开始为null
        const progress = this.currentBook.locations.percentageFromCfi(currentCfi)
        const section = currentLocation.start.index
        // 保存当前定位
        this.$store.dispatch('setCurrentBookProgress', Math.floor(progress * 100))
        this.$store.dispatch('setCurrentSection', section)
        this.$store.dispatch('setCurrentCfi', currentCfi)
        // 对当前页面是否为bookmark进行判断
        if (this.bookmark) {
          if (this.bookmark.some(item => item.cfi === currentCfi)) {
            this.$store.dispatch('setIsBookmark', true)
          } else {
            this.$store.dispatch('setIsBookmark', false)
          }
        } else {
          this.$store.dispatch('setIsBookmark', false)
        }
      }
    },
    display (target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      }
    }
  }
}
