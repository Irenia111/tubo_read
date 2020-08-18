import { fontSizeMap } from './settingMap'
const setting = {
  state: {
    currentFontSize: fontSizeMap.fontSizeList[fontSizeMap.defaultSizeIndex],
    fontSizeList: fontSizeMap.fontSizeList
  },
  mutations: {
    SET_FONTSIZE: (state, fontSizeIndex) => {
      state.currentFontSize = state.fontSizeList[fontSizeIndex]
    }
  }
}

export default setting
