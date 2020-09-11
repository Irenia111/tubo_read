const home = {
  state: {
    homeOffsetY: 0,
    searchOffsetY: 0,
    flapCardVisible: false,
    isEditMode: false,
    shelfList: [],
    shelfSelected: [],
    shelfTitleVisible: true,
    shelfCategory: [], // 书架分类列表数据
    currentType: 1 // 书架列表为1，书架分类列表为2, 因为复用了shelfList组件
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
    },
    SET_IS_EDIT_MODE (state, isEditMode) {
      state.isEditMode = isEditMode
    },
    SET_SHELF_LIST (state, list) {
      state.shelfList = list
    },
    SET_SHELF_SELECTED (state, list) {
      state.shelfSelected = list
    },
    APPEND_SHELF_SELECTED (state, book) {
      let index = -1
      for (let i = 0; i < state.shelfSelected.length; i++) {
        if (state.shelfSelected[i].id === book.id) {
          index = i
          break
        }
      }
      if (index === -1) state.shelfSelected.push(book)
    },
    REMOVE_SHELF_SELECTED: (state, fileName) => {
      // 这里有点奇怪，拿bookId不能比较，但是拿fileName就可以
      state.shelfSelected = state.shelfSelected.filter(item => item.fileName !== fileName)
    },
    SET_SHELF_TITLE_VISIBLE (state, visible) {
      state.shelfTitleVisible = visible
    },
    SET_SHELF_CATEGORY (state, category) {
      state.shelfCategory = category
    },
    SET_CURRENT_TYPE (state, type) {
      state.currentType = type
    }
  }
}

export default home
