<template>
  <div>
    <div v-if="isEnabled(AllFeatures.env)">
      <h2>First, set your Flagship Environment ID & API Key</h2>
      <Environment />
    </div>

    <div v-if="isEnabled(AllFeatures.visitor)">
      <h2 class="mt-5">Then, set your Visitor ID and context</h2>
      <Visitor />
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

    <div v-if="isEnabled(AllFeatures.xpc)">
      <h2 class="mt-5">Experience continuity</h2>
      <Xpc />
    </div>

    <div v-if="isEnabled(AllFeatures.consent)">
      <h2 class="mt-5">Consent</h2>
      <Consent />
    </div>
  </div>
</template>

<script>
import Environment from "../components/Index/Environment";
import Visitor from "../components/Index/Visitor";
import FlagValue from "../components/Index/FlagValue";
import FlagActivate from "../components/Index/FlagActivate";
import FlagInfo from "../components/Index/FlagInfo";
import Xpc from "@/components/Index/Xpc";
import Consent from "../components/Index/Consent";

export default {
  name: "qa",
  components: {
    Xpc,
    Environment,
    Visitor,
    FlagValue,
    FlagActivate,
    FlagInfo,
    Consent,
  },
};
</script>
