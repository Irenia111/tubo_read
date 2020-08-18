import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'currentFontSize',
      'fontSizeList',
      'currentBook'
    ])
  }
}
