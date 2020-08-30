export default {
  setHomeOffsetY: ({ commit }, offsetY) => {
    return commit('SET_HOME_OFFSETY', offsetY)
  },
  setSearchOffsetY: ({ commit }, offsetY) => {
    return commit('SET_SEARCH_OFFSETY', offsetY)
  },
  setFlapCardVisible: ({ commit }, flag) => {
    return commit('SET_FLAPCARDVISIBLE', flag)
  }
}
