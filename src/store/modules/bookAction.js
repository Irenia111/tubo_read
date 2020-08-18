export default {
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
  setMenuItemIndex: ({ commit }, itemIndex) => {
    return commit('SET_MENUITEMINDEX', itemIndex)
  },
  setCurrentBook: ({ commit }, currentBook) => {
    return commit('SET_CURRENTBOOK', currentBook)
  }
}
