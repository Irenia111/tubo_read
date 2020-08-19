const fontSizeMap = {
  defaultSizeIndex: 1,
  fontSizeList: [
    { index: 0, fontSize: 16 },
    { index: 1, fontSize: 17 },
    { index: 2, fontSize: 18 },
    { index: 3, fontSize: 19 },
    { index: 4, fontSize: 20 },
    { index: 5, fontSize: 22 },
    { index: 6, fontSize: 24 },
    { index: 7, fontSize: 27 },
    { index: 8, fontSize: 30 },
    { index: 9, fontSize: 33 },
    { index: 10, fontSize: 36 },
    { index: 11, fontSize: 40 }
  ]
}

const themeMap = {
  defaultThemeIndex: 0,
  themeList: [
    {
      index: 0,
      name: 'Default',
      chName: '默认',
      style: {
        body: {
          color: '#4c5059',
          background: '#cecece',
          'padding-top': '48px !important',
          'padding-bottom': '48px !important'
        }
      }
    },
    {
      index: 1,
      name: 'Gold',
      chName: '雅致',
      style: {
        body: {
          color: '#5c5b56',
          background: '#c6c2b6',
          'padding-top': '48px !important',
          'padding-bottom': '48px !important'
        }
      }
    },
    {
      index: 2,
      name: 'Eye',
      chName: '护眼',
      style: {
        body: {
          color: '#404c42',
          background: '#a9c1a9',
          'padding-top': '48px !important',
          'padding-bottom': '48px !important'
        }
      }
    },
    {
      index: 3,
      name: 'Night',
      chName: '黑夜',
      style: {
        body: {
          color: '#cecece',
          background: '#000000',
          'padding-top': '48px !important',
          'padding-bottom': '48px !important'
        }
      }
    }
  ]
}

const fontFamilyMap = {
  defaultFontFamilyIndex: 0,
  fontFamilyList: [
    { index: 0, name: 'Default', fontName: 'Times New Roman' },
    { index: 1, name: 'Cabin', fontName: 'Cabin' },
    { index: 2, name: 'Days One', fontName: 'Days One' },
    { index: 3, name: 'Montserrat', fontName: 'Montserrat' },
    { index: 4, name: 'Tangerine', fontName: 'Tangerine' }
  ]
}
export { fontSizeMap, themeMap, fontFamilyMap }
