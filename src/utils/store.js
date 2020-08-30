const baseImgUrl = './images'

export const flapCardList = [
  {
    r: 255,
    g: 102,
    // 为方便还原，所以每次更改颜色都修改_g
    _g: 102,
    b: 159,
    imgLeft: 'url(' + require(baseImgUrl + '/gift-left.png') + ')',
    imgRight: 'url(' + require(baseImgUrl + '/gift-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 100,
    rotateDegree: 0
  },
  {
    r: 74,
    g: 171,
    _g: 171,
    b: 255,
    imgLeft: 'url(' + require(baseImgUrl + '/compass-left.png') + ')',
    imgRight: 'url(' + require(baseImgUrl + '/compass-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 99,
    rotateDegree: 0
  },
  {
    r: 255,
    g: 198,
    _g: 198,
    b: 102,
    imgLeft: 'url(' + require(baseImgUrl + '/star-left.png') + ')',
    imgRight: 'url(' + require(baseImgUrl + '/star-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 98,
    rotateDegree: 0
  },
  {
    r: 255,
    g: 102,
    _g: 102,
    b: 159,
    imgLeft: 'url(' + require(baseImgUrl + '/heart-left.png') + ')',
    imgRight: 'url(' + require(baseImgUrl + '/heart-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 97,
    rotateDegree: 0
  },
  {
    r: 59,
    g: 201,
    _g: 201,
    b: 22,
    imgLeft: 'url(' + require(baseImgUrl + '/crown-left.png') + ')',
    imgRight: 'url(' + require(baseImgUrl + '/crown-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 96,
    rotateDegree: 0
  }
]
