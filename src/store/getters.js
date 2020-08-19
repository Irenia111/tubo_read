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
  currentBook: state => state.book.currentBook
}

export default getters
