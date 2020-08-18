import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['showMenuFlag',
      'showMenuItemFlag',
      'showBookIndexFlag',
      'fileName',
      'menuItemIndex',
      'currentBook'
    ])
  }
}
