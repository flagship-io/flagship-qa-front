import Vue from 'vue'
import qa from './QA.vue'
import { V1, V2, V3, All } from './constants/features'

const Components = {
  qa
}

Object.keys(Components).forEach((c) => {
  Vue.component(c, Components[c])
})

window.FSFeatures = { V1, V2, V3, All }

export default Components
