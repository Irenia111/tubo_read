const home = {
  state: {
    homeOffsetY: 0,
    searchOffsetY: 0
  },
  mutations: {
    SET_HOME_OFFSETY: (state, offsetY) => {
      state.homeOffsetY = offsetY
    },
    SET_SEARCH_OFFSETY: (state, offsetY) => {
      state.searchOffsetY = offsetY
    }
  }
}

export default home
