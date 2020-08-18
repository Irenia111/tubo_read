const getters = {
  fileName: state => state.book.fileName,
  showMenuFlag: state => state.book.showMenuFlag,
  showMenuItemFlag: state => state.book.showMenuItemFlag,
  showBookIndexFlag: state => state.book.showBookIndexFlag,
  menuItemIndex: state => state.book.menuItemIndex,
  fontSizeList: state => state.setting.fontSizeList,
  currentFontSize: state => state.setting.currentFontSize,
  currentBook: state => state.book.currentBook
}

export default getters
