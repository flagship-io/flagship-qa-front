<template>
<div>
    <div v-if="flag" class="alert alert-info">
      <div>key: {{ flag.key }}</div>
      <div>defaultValue : {{ flag.defaultValue }}</div>
    </div>
    <div v-else class="alert alert-warning">
      Please set get Flag first
    </div>
    <div
      class="alert alert-warning mt-3 mb-3"
      v-if="activateOk && activateOk.error"
    >
      {{ activateOk.error }}
    </div>

    <button type="submit" class="btn btn-primary" @click="activateFlag()">Submit</button>

    <div
      class="alert alert-success mt-3 mb-3"
      v-if="activateOk && !activateOk.error"
    >
      {{ activateOk }}
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
      activate: { name: '', type: 'bool', defaultValue: '', activate: true },
      activateOk: false
    }
  },
  methods: {
    activateFlag () {
      this.activateOk = false

      if (!this.flag) {
        this.activateOk = { error: 'Please set get Flag first' }
        return
      }

      const { key, defaultValue, type } = this.flag

      this.$http.get(`/flag/${key}/activate`, {
        params: {
          defaultValue,
          type
        }
      }).then(
        (response) => {
          this.activateOk = response.body
        },
        (response) => {
          this.activateOk = response.body
        }
      )
    }
  }
}
</script>
