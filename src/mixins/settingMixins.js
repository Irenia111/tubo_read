import { mapGetters } from 'vuex'
import { themeList } from '../utils/book'

export default {
  computed: {
    ...mapGetters([
      'showFontFamilyFlag',
      'currentFontSize',
      'fontSizeList',
      'currentFontFamily',
      'fontFamilyList',
      'currentTheme',
      'currentBook'
    ]),
    themeList () {
      return themeList(this)
    }
  }
}
