import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    features: {}
  },
  mutations: {
    setFeatures (state, newFeatures) {
      state.features = newFeatures
    }
  },
  getters: {
    features: (state) => state.features
  }
})

export default store
