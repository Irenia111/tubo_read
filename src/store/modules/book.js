
function saveToLocal (state) {
  const name = state.fileName
  const record = JSON.parse(JSON.stringify(
    {
      currentBookProgress: state.currentBookProgress,
      currentSection: state.currentSection,
      currentCfi: state.currentCfi,
      timer: state.timer,
      bookmark: state.bookmark
    }
  ))
  window.localStorage.setItem(name, JSON.stringify(record))
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
    timer: 0,
    cover: null,
    navigation: null,
    metadata: null,
    bookmark: [],
    offsetY: 0,
    isBookmark: false
  },
  mutations: {
    INIT_CURRENTBOOK: (state) => {
      const name = state.fileName.toString()
      const file = window.localStorage.getItem(name)
      console.log(file)
      if (file == null) {
        state.currentBookProgress = 0
        state.currentSection = 0
        state.currentCfi = 0
        state.timer = 0
        state.bookmark = []
        saveToLocal(state)
      } else {
        state.currentBookProgress = JSON.parse(file).currentBookProgress
        state.currentSection = JSON.parse(file).currentSection
        state.currentCfi = JSON.parse(file).currentCfi
        state.timer = JSON.parse(file).timer
        state.bookmark = JSON.parse(file).bookmark
      }
    },
    SET_FILENAME: (state, fileName) => {
      state.fileName = fileName
      // 这里不需要调用本地存储
      // 因为存储的名称由fileName确定
      // saveToLocal(state)
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
    },
    SET_NAVIGATION: (state, navigation) => {
      state.navigation = navigation
    },
    SET_COVER: (state, cover) => {
      state.cover = cover
    },
    SET_METADATA: (state, metadata) => {
      state.metadata = metadata
    },
    SET_OFFSETY: (state, offsetY) => {
      state.offsetY = offsetY
    },
    ADD_BOOKMARK: (state, item) => {
      state.bookmark.push(item)
      saveToLocal(state)
    },
    REMOVE_BOOKMARK: (state, cfi) => {
      state.bookmark = state.bookmark.filter(item => item.cfi !== cfi)
      saveToLocal(state)
    },
    SET_ISBOOKMARK: (state, flag) => {
      state.isBookmark = flag
    }
  }
}

export default book
