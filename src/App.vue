<template>
  <div id="app">
    <QA :features="features" />
  </div>
</template>

<script>
import QA from './QA.vue'
import { All } from './constants/features'

export default {
  name: 'App',
  components: {
    QA
  },
  data () {
    return {
      features: All
    }
  }
}
</script>

<style></style>
