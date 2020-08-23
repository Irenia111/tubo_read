function saveToLocal (state) {
  const record = JSON.parse(JSON.stringify(
    {
      fileName: state.fileName,
      currentBookProgress: state.currentBookProgress,
      currentSection: state.currentSection,
      currentCfi: state.currentCfi,
      timer: state.timer
    }
  ))
  window.localStorage.setItem('currentBookRecord', JSON.stringify(record))
}

const book = {
  state: {
    fileName: '',
    showMenuFlag: false,
    showMenuItemFlag: false,
    showBookIndexFlag: false,
    showFontFamilyFlag: false,
    menuItemIndex: -1,
    currentBook: null,
    isProgressAvailable: false,
    currentBookProgress: 0,
    currentCfi: null,
    currentSection: 0,
    timer: 0
  },
  mutations: {
    INIT_CURRENTBOOK: (state) => {
      const file = window.localStorage.getItem('currentBookRecord')
      if (file == null) {
        state.fileName = ''
        state.currentBookProgress = 0
        state.currentSection = 0
        state.currentCfi = 0
        state.timer = 0
        saveToLocal(state)
      } else {
        state.fileName = JSON.parse(file).fileName
        state.currentBookProgress = JSON.parse(file).currentBookProgress
        state.currentSection = JSON.parse(file).currentSection
        state.currentCfi = JSON.parse(file).currentCfi
        state.timer = JSON.parse(file).timer
      }
    },
    SET_FILENAME: (state, fileName) => {
      state.fileName = fileName
      saveToLocal(state)
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
    },
    SET_ISPROGRESSAVAILABLE: (state, flag) => {
      state.isProgressAvailable = flag
    },
    SET_CURRENTBOOKPROGRESS: (state, newProgress) => {
      state.currentBookProgress = newProgress
      saveToLocal(state)
    },
    SET_CURRENTCFI: (state, newCfi) => {
      state.currentCfi = newCfi
      saveToLocal(state)
    },
    SET_CURRENTSECTION: (state, newSection) => {
      state.currentSection = newSection
      saveToLocal(state)
    },
    SET_TIMER: (state, time) => {
      state.timer = time
      saveToLocal(state)
    }
  }
}

export default book
