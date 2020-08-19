import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'showFontFamilyFlag',
      'currentFontSize',
      'fontSizeList',
      'currentFontFamily',
      'fontFamilyList',
      'currentTheme',
      'themeList',
      'currentBook'
    ])
  }
}
