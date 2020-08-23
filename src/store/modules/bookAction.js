export default {
  initCurrentBook: ({ commit }) => {
    return commit('INIT_CURRENTBOOK')
  },
  setFileName: ({ commit }, newName) => {
    return commit('SET_FILENAME', newName)
  },
  setShowMenuFlag: ({ commit }, flag) => {
    return commit('SET_SHOWMENUFLAG', flag)
  },
  setShowBookIndexFlag: ({ commit }, flag) => {
    return commit('SET_SHOWBOOKINDEXFLAG', flag)
  },
  setShowMenuItemFlag: ({ commit }, flag) => {
    return commit('SET_SHOWMENUITEMFLAG', flag)
  },
  setShowFontFamilyFlag: ({ commit }, flag) => {
    return commit('SET_SHOWFONTFAMILYFLAG', flag)
  },
  setMenuItemIndex: ({ commit }, itemIndex) => {
    return commit('SET_MENUITEMINDEX', itemIndex)
  },
  setCurrentBook: ({ commit }, currentBook) => {
    return commit('SET_CURRENTBOOK', currentBook)
  },
  setIsProgressAvailable: ({ commit }, flag) => {
    return commit('SET_ISPROGRESSAVAILABLE', flag)
  },
  setCurrentBookProgress: ({ commit }, newProgress) => {
    return commit('SET_CURRENTBOOKPROGRESS', newProgress)
  },
  setCurrentCfi: ({ commit }, newCfi) => {
    return commit('SET_CURRENTCFI', newCfi)
  },
  setCurrentSection: ({ commit }, newSection) => {
    return commit('SET_CURRENTSECTION', newSection)
  },
  setTimer: ({ commit }, time) => {
    return commit('SET_TIMER', time)
  }
}
