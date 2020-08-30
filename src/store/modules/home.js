const home = {
  state: {
    homeOffsetY: 0,
    searchOffsetY: 0,
    flapCardVisible: false
  },
  mutations: {
    SET_HOME_OFFSETY: (state, offsetY) => {
      state.homeOffsetY = offsetY
    },
    SET_SEARCH_OFFSETY: (state, offsetY) => {
      state.searchOffsetY = offsetY
    },
    SET_FLAPCARDVISIBLE: (state, flag) => {
      state.flapCardVisible = flag
    }
  }
}

export default home
