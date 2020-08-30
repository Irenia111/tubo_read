import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'homeOffsetY',
      'searchOffsetY',
      'flapCardVisible'
    ])
  }
}
