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
const categoryList = {
  computerScience: '计算机科学',
  socialSciences: '社会科学',
  economics: '经济学',
  education: '教育学',
  engineering: '工程学',
  environment: '环境学',
  geography: '地理学',
  history: '历史学',
  laws: '法学',
  lifeSciences: '生命科学',
  literature: '文学',
  biomedicine: '生物医学',
  businessandManagement: '工商管理',
  earthSciences: '地球科学',
  materialsScience: '材料科学',
  mathematics: '数学',
  medicineAndPublicHealth: '公共卫生',
  philosophy: '哲学',
  physics: '物理',
  politicalScienceAndInternationalRelations: '国际关系',
  psychology: '心理学',
  statistics: '统计学'
}

export function categoryText (category) {
  switch (category) {
    case 1:
      return categoryList.computerScience
    case 2:
      return categoryList.socialSciences
    case 3:
      return categoryList.economics
    case 4:
      return categoryList.education
    case 5:
      return categoryList.engineering
    case 6:
      return categoryList.environment
    case 7:
      return categoryList.geography
    case 8:
      return categoryList.history
    case 9:
      return categoryList.laws
    case 10:
      return categoryList.lifeSciences
    case 11:
      return categoryList.literature
    case 12:
      return categoryList.biomedicine
    case 13:
      return categoryList.businessandManagement
    case 14:
      return categoryList.earthSciences
    case 15:
      return categoryList.materialsScience
    case 16:
      return categoryList.mathematics
    case 17:
      return categoryList.medicineAndPublicHealth
    case 18:
      return categoryList.philosophy
    case 19:
      return categoryList.physics
    case 20:
      return categoryList.politicalScienceAndInternationalRelations
    case 21:
      return categoryList.psychology
    case 22:
      return categoryList.statistics
  }
}

export function getCategoryName (id) {
  switch (id) {
    case 1:
      return 'ComputerScience'
    case 2:
      return 'SocialSciences'
    case 3:
      return 'Economics'
    case 4:
      return 'Education'
    case 5:
      return 'Engineering'
    case 6:
      return 'Environment'
    case 7:
      return 'Geography'
    case 8:
      return 'History'
    case 9:
      return 'Laws'
    case 10:
      return 'LifeSciences'
    case 11:
      return 'Literature'
    case 12:
      return 'Biomedicine'
    case 13:
      return 'BusinessandManagement'
    case 14:
      return 'EarthSciences'
    case 15:
      return 'MaterialsScience'
    case 16:
      return 'Mathematics'
    case 17:
      return 'MedicineAndPublicHealth'
    case 18:
      return 'Philosophy'
    case 19:
      return 'Physics'
    case 20:
      return 'PoliticalScienceAndInternationalRelations'
    case 21:
      return 'Psychology'
    case 22:
      return 'Statistics'
  }
}

/* eslint-disable */
export const categoryListNumber = {
  'ComputerScience': 1,
  'SocialSciences': 2,
  'Economics': 3,
  'Education': 4,
  'Engineering': 5,
  'Environment': 6,
  'Geography': 7,
  'History': 8,
  'Laws': 9,
  'LifeSciences': 10,
  'Literature': 11,
  'Biomedicine': 12,
  'BusinessandManagement': 13,
  'EarthSciences': 14,
  'MaterialsScience': 15,
  'Mathematics': 16,
  'MedicineAndPublicHealth': 17,
  'Philosophy': 18,
  'Physics': 19,
  'PoliticalScienceAndInternationalRelations': 20,
  'Psychology': 21,
  'Statistics': 22
}
