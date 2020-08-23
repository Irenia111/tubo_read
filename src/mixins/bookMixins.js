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
      'timer'
    ])
  },
  methods: {
    refreshLocation () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      const currentCfi = currentLocation.start.cfi
      // 由于分页没有完成，所以导致progress一开始为null
      const progress = this.currentBook.locations.percentageFromCfi(currentCfi)
      const section = currentLocation.start.index
      this.$store.dispatch('setCurrentBookProgress', Math.floor(progress * 100))
      this.$store.dispatch('setCurrentSection', section)
      this.$store.dispatch('setCurrentCfi', currentCfi)
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
