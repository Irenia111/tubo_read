const getters = {
  fileName: state => state.book.fileName,
  showMenuFlag: state => state.book.showMenuFlag,
  showMenuItemFlag: state => state.book.showMenuItemFlag,
  showBookIndexFlag: state => state.book.showBookIndexFlag,
  showFontFamilyFlag: state => state.book.showFontFamilyFlag,
  menuItemIndex: state => state.book.menuItemIndex,
  fontSizeList: state => state.setting.fontSizeList,
  currentFontSize: state => state.setting.currentFontSize,
  fontFamilyList: state => state.setting.fontFamilyList,
  currentFontFamily: state => state.setting.currentFontFamily,
  currentTheme: state => state.setting.currentTheme,
  themeList: state => state.setting.themeList,
  currentBook: state => state.book.currentBook,
  isProgressAvailable: state => state.book.isProgressAvailable,
  currentBookProgress: state => state.book.currentBookProgress,
  currentSection: state => state.book.currentSection,
  currentCfi: state => state.book.currentCfi,
  timer: state => state.book.timer,
  metadata: state => state.book.metadata,
  navigation: state => state.book.navigation,
  cover: state => state.book.cover,
  isBookmark: state => state.book.isBookmark,
  bookmark: state => state.book.bookmark,
  offsetY: state => state.book.offsetY
}

export default getters
