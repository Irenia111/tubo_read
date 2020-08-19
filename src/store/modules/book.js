const book = {
  state: {
    fileName: '',
    showMenuFlag: false,
    showMenuItemFlag: false,
    showBookIndexFlag: false,
    showFontFamilyFlag: false,
    menuItemIndex: -1,
    currentBook: null
  },
  mutations: {
    SET_FILENAME: (state, fileName) => {
      state.fileName = fileName
    },
    SET_SHOWMENUFLAG: (state, flag) => {
      state.showMenuFlag = flag
    },
    SET_SHOWBOOKINDEXFLAG: (state, flag) => {
      state.showBookIndexFlag = flag
    },
    SET_SHOWMENUITEMFLAG: (state, flag) => {
      state.showMenuItemFlag = flag
    },
    SET_SHOWFONTFAMILYFLAG: (state, flag) => {
      state.showFontFamilyFlag = flag
    },
    SET_MENUITEMINDEX: (state, itemIndex) => {
      state.menuItemIndex = itemIndex
    },
    SET_CURRENTBOOK: (state, currentBook) => {
      state.currentBook = currentBook
    }
  }
}

export default book
