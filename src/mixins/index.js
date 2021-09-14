import Vue from 'vue'
import { All } from '../constants/features'

export default Vue.mixin({
  data: function () {
    return {
      get AllFeatures () {
        return All
      }
    }
  },
  methods: {
    isUndefined (v) {
      return typeof v === 'undefined'
    },
    isEnabled (feature) {
      return this.$store.getters.features.includes(feature)
    }
  },
  filters: {
    json: (value) => {
      return JSON.stringify(value, null, 4)
    }
  }
})
