<template>
  <div>
    <div v-if="isEnabled(AllFeatures.env)">
      <h2>First, set your Flagship Environment ID & API Key</h2>
      <Environment />
    </div>

    <div v-if="isEnabled(AllFeatures.visitor)">
      <h2 class="mt-5">Then, set your Visitor ID and context</h2>
      <Visitor
        :visitorId="visitorId"
        :changeVisitorId="(newId) => (this.visitorId = newId)"
      />
    </div>

    <div v-if="isEnabled(AllFeatures.experienceContinuity)">
      <ExperienceContinuity
        :visitorId="visitorId"
        :onNewVisitorId="(vId) => (this.visitorId = vId)"
      />
    </div>

    <div v-if="isEnabled(AllFeatures.flagValue)">
      <h2 class="mt-5">Then, get a Flag Value</h2>
      <FlagValue @updateFlag="setFlag" />
    </div>

    <div v-if="isEnabled(AllFeatures.flagActivate)">
      <h2 class="mt-5">Stand alone activate modification</h2>
      <FlagActivate />
    </div>

    <div v-if="isEnabled(AllFeatures.flagActivate3)">
      <h2 class="mt-5">Stand alone activate modification</h2>
      <FlagActivateV3 :flag="flag" />
    </div>

    <div v-if="isEnabled(AllFeatures.flagInfo)">
      <h2 class="mt-5">Get modification information</h2>
      <FlagInfo />
    </div>
     <div v-if="isEnabled(AllFeatures.flagInfo3)">
      <h2 class="mt-5">Get modification information</h2>
      <FlagInfoV3 :flag="flag" />
    </div>
  </div>
</template>

<script>
import Environment from '../components/Index/Environment'
import Visitor from '../components/Index/Visitor'
import FlagValue from '../components/Index/FlagValue'
import FlagActivateV3 from '../components/Index/FlagActivateV3'
import FlagInfoV3 from '../components/Index/FlagInfoV3'
import FlagActivate from '../components/Index/FlagActivate'
import FlagInfo from '../components/Index/FlagInfo'
import ExperienceContinuity from '../components/Index/ExperienceContinuity.vue'

export default {
  name: 'qa',
  components: {
    Environment,
    Visitor,
    FlagValue,
    FlagActivateV3,
    FlagActivate,
    FlagInfo,
    FlagInfoV3,
    ExperienceContinuity
  },
  data () {
    return {
      visitorId: '',
      flag: null
    }
  },
  methods: {
    setFlag (flag) {
      this.flag = flag
    }
  }
}
</script>
