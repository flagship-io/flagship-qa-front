<template>
  <div>
    <div v-if="isEnabled('env')">
      <h2>First, set your Flagship Environment ID & API Key</h2>
      <Environment />
    </div>

    <div v-if="isEnabled('visitor')">
      <h2 class="mt-5">Then, set your Visitor ID and context</h2>
      <Visitor />
    </div>

    <div v-if="isEnabled('flag-value')">
      <h2 class="mt-5">Then, get a Flag Value</h2>
      <FlagValue />
    </div>

    <div v-if="isEnabled('flag-activate')">
      <h2 class="mt-5">Stand alone activate modification</h2>
      <FlagActivate />
    </div>

    <div v-if="isEnabled('flag-info')">
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

export default {
  name: "qa",
  components: {
    Environment,
    Visitor,
    FlagValue,
    FlagActivate,
    FlagInfo,
  },
};
</script>
