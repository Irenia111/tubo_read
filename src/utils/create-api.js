import CreateAPI from 'vue-create-api'
import Vue from 'vue'

import GroupDialog from '../components/shelf/ShelfGroupDialog'

Vue.use(CreateAPI)
Vue.createAPI(GroupDialog, true)
Vue.mixin({
  methods: {
    dialog (settings) {
      return this.$createGroupDialog({
        $props: settings
      })
    }
  }
})
