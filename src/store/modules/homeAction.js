export default {
  setHomeOffsetY: ({ commit }, offsetY) => {
    return commit('SET_HOME_OFFSETY', offsetY)
  },
  setSearchOffsetY: ({ commit }, offsetY) => {
    return commit('SET_SEARCH_OFFSETY', offsetY)
  },
  setFlapCardVisible: ({ commit }, flag) => {
    return commit('SET_FLAPCARDVISIBLE', flag)
  },
  setIsEditMode ({ commit }, isEditMode) {
    return commit('SET_IS_EDIT_MODE', isEditMode)
  },
  setShelfList ({ commit }, list) {
    return commit('SET_SHELF_LIST', list)
  },
  appendShelfSelected ({ commit }, selected) {
    return commit('APPEND_SHELF_SELECTED', selected)
  },
  setShelfSelected ({ commit }, selected) {
    return commit('SET_SHELF_SELECTED', selected)
  },
  removeShelfSelected ({ commit }, fileName) {
    return commit('REMOVE_SHELF_SELECTED', fileName)
  },
  setShelfTitleVisible ({ commit }, visible) {
    return commit('SET_SHELF_TITLE_VISIBLE', visible)
  },
  setShelfCategory ({ commit }, category) {
    return commit('SET_SHELF_CATEGORY', category)
  },
  setCurrentType ({ commit }, type) {
    return commit('SET_CURRENT_TYPE', type)
  }
}
