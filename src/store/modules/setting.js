import { fontSizeMap, fontFamilyMap } from './settingMap'

function saveToLocal (state) {
  const setting = JSON.parse(JSON.stringify(
    {
      currentFontSize: state.currentFontSize,
      currentFontFamily: state.currentFontFamily,
      currentTheme: state.currentTheme
    }
  ))
  window.localStorage.setItem('readerSetting', JSON.stringify(setting))
}
const setting = {
  state: {
    currentFontSize: -1,
    fontSizeList: fontSizeMap.fontSizeList,
    currentFontFamily: '',
    fontFamilyList: fontFamilyMap.fontFamilyList,
    currentTheme: ''
  },
  mutations: {
    INIT_SETTING: (state) => {
      const file = window.localStorage.getItem('readerSetting')
      if (file == null) {
        state.currentFontSize = JSON.parse(JSON.stringify(fontSizeMap.fontSizeList[fontSizeMap.defaultSizeIndex]))
        state.currentFontFamily = JSON.parse(JSON.stringify(fontFamilyMap.fontFamilyList[fontFamilyMap.defaultFontFamilyIndex]))
        state.currentTheme = 'default'
        saveToLocal(state)
      } else {
        state.currentFontSize = JSON.parse(file).currentFontSize
        state.currentFontFamily = JSON.parse(file).currentFontFamily
        state.currentTheme = JSON.parse(file).currentTheme
      }
    },
    SET_FONTSIZE: (state, fontSizeIndex) => {
      state.currentFontSize = state.fontSizeList[fontSizeIndex]
      saveToLocal(state)
    },
    SET_FONTFAMILY: (state, fontFamilyIndex) => {
      state.currentFontFamily = state.fontFamilyList[fontFamilyIndex]
      saveToLocal(state)
    },
    SET_THEME: (state, themeName) => {
      state.currentTheme = themeName
      saveToLocal(state)
    }
  }
}

export default setting
