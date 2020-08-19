export default {
  initSetting: ({ commit }) => {
    return commit('INIT_SETTING')
  },
  setFontSize: ({ commit }, newFontSizeIndex) => {
    return commit('SET_FONTSIZE', newFontSizeIndex)
  },
  setFontFamily: ({ commit }, newFontFamilyIndex) => {
    return commit('SET_FONTFAMILY', newFontFamilyIndex)
  },
  setTheme: ({ commit }, newThemeIndex) => {
    return commit('SET_THEME', newThemeIndex)
  }
}
