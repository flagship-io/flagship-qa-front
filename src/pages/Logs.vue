<template>
  <div>
    <div style="position: relative;">
      <h2 class="mt-5">SDK logs</h2>
      <button
        type="button"
        class="btn btn-primary"
        style="position: absolute; right: 0px;"
        @click="clearLogs()"
      >
        clear
      </button>
      <form v-on:submit.prevent="getLogs()">
        <button type="submit" class="btn btn-primary">refresh</button>
        <br /><br />
        <textarea
          class="form-control"
          style="height: 564px;"
          v-model="logs"
        >
        </textarea>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qa',
  data () {
    return {
      logs: ''
    }
  },
  mounted () {
    this.getLogs()
  },
  methods: {
    getLogs () {
      this.$http.get('/logs').then(
        (response) => {
          this.logs = response.bodyText
        },
        (response) => {
          this.logs = response.bodyText
        }
      )
    },
    clearLogs () {
      this.$http.post('/logs/clear').then(
        (response) => {
          this.logs = response.bodyText
        },
        (response) => {
          this.logs = response.bodyText
        }
      )
    }
  }
}
</script>
