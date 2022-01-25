import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.mixin({
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      AllFeatures: 'features'
    })
  },
  methods: {
    isUndefined (v) {
      return typeof v === 'undefined'
    },
    isEnabled (feature) {
      return !!feature
    }
  },
  filters: {
    json: (value) => {
      return JSON.stringify(value, null, 4)
    }
  }
})
