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
        :onNewVisitorId="(vId) => (this.visitorId = vId)"
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
      <FlagValue />
    </div>

    <div v-if="isEnabled(AllFeatures.flagActivate)">
      <h2 class="mt-5">Stand alone activate modification</h2>
      <FlagActivate />
    </div>

    <div v-if="isEnabled(AllFeatures.flagInfo)">
      <h2 class="mt-5">Get modification information</h2>
      <FlagInfo />
    </div>
  </div>
</template>

<script>
import Environment from "../components/Index/Environment";
import Visitor from "../components/Index/Visitor";
import FlagValue from "../components/Index/FlagValue";
import FlagActivate from "../components/Index/FlagActivate";
import FlagInfo from "../components/Index/FlagInfo";
import ExperienceContinuity from "../components/Index/ExperienceContinuity.vue";

export default {
  name: "qa",
  components: {
    Environment,
    Visitor,
    FlagValue,
    FlagActivate,
    FlagInfo,
    ExperienceContinuity,
  },
  data() {
    return {
      visitorId: "",
    };
  },
};
</script>
