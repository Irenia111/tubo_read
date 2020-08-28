export default {
  setHomeOffsetY: ({ commit }, offsetY) => {
    return commit('SET_HOME_OFFSETY', offsetY)
  },
  setSearchOffsetY: ({ commit }, offsetY) => {
    return commit('SET_SEARCH_OFFSETY', offsetY)
  }
}
