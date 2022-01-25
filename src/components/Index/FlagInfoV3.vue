<template>
  <div>
    <div v-if="flag" class="alert alert-info">
      <div>key: {{ flag.key }}</div>
      <div>defaultValue : {{ flag.defaultValue }}</div>
    </div>
    <div v-else class="alert alert-warning">Please set get Flag first</div>
    <div
      class="alert alert-warning mt-3 mb-3"
      v-if="flagInfoOk && flagInfoOk.error"
    >
      {{ flagInfoOk.error }}
    </div>

    <button type="submit" class="btn btn-primary" @click="getFlagInfo">Submit</button>

    <div
      class="alert alert-success mt-3 mb-3"
      v-if="flagInfoOk && isUndefined(flagInfoOk.error)"
    >
      <pre>{{ flagInfoOk | json }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    flag: {
      type: Object
    }
  },
  data () {
    return {
      flagInfo: { name: '' },
      flagInfoOk: false
    }
  },
  methods: {
    getFlagInfo () {
      this.flagInfoOk = false

      if (!this.flag) {
        this.flagInfoOk = { error: 'Please set get Flag first' }
        return
      }
      const { key, defaultValue, type } = this.flag

      this.$http.get(`/flag/${key}/info`, {
        params: {
          defaultValue,
          type
        }
      }).then(
        (response) => {
          this.flagInfoOk = response.body
        },
        (response) => {
          this.flagInfoOk = response.body
        }
      )
    }
  }
}
</script>
