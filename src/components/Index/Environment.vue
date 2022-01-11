<template>
  <form v-on:submit.prevent="setEnv()">
    <div class="form-group">
      <label>Environment ID</label>
      <input
        type="text"
        class="form-control"
        placeholder="Environment ID"
        v-model="envId"
      />
      <small id="emailHelp" class="form-text text-muted"
        >Set your Flagship Environment ID first.</small
      >
    </div>
    <div class="form-group">
      <label>API Key</label>
      <input
        type="text"
        class="form-control"
        placeholder="API Key"
        v-model="apiKey"
      />
      <small class="form-text text-muted">Set your API Key.</small>
    </div>
    <div class="form-group">
      <label>Timeout (milliseconds)</label>
      <input
        type="text"
        class="form-control"
        placeholder="Timeout"
        v-model.number="timeout"
      />
      <small class="form-text text-muted">Set your timeout.</small>
    </div>

    <div class="form-group">
      <label>Flagship Mode</label>
      <select
        type="text"
        class="form-control"
        placeholder="Flagship Mode"
        v-model="flagshipMode"
      >
        <option value="api">API</option>
        <option value="bucketing" v-if="isEnabled(AllFeatures.bucketing)">
          Bucketing
        </option>
      </select>
    </div>

    <div
      v-if="
        flagshipMode == 'bucketing' &&
        isEnabled(AllFeatures.pollingIntervalUnit)
      "
      class="form-group"
    >
      <label>Polling time interval unit</label>
      <select
        type="text"
        class="form-control"
        placeholder="Flagship Mode"
        v-model="pollingIntervalUnit"
      >
        <option value="milliseconds">Milliseconds</option>
        <option value="seconds">Second</option>
        <option value="minutes">Minutes</option>
      </select>
    </div>

    <div
      v-if="
        flagshipMode == 'bucketing' && isEnabled(AllFeatures.pollingInterval)
      "
      class="form-group"
    >
      <label>Polling time interval</label>
      <input
        type="text"
        class="form-control"
        placeholder="Polling interval"
        v-model.number="pollingInterval"
      />
      <small class="form-text text-muted">Set your polling interval.</small>
    </div>

    <div class="alert alert-danger" v-if="envError">
      {{ envError.error }}
    </div>
    <div class="alert alert-success" v-if="envOk">
      Flagship client successfully initialized
    </div>

    <button type="submit" class="btn btn-success">Submit</button>
  </form>
</template>

<script>
const BUCKETING = 'bucketing'
const API = 'api'
export default {
  data () {
    return {
      envId: '',
      apiKey: '',
      timeout: 2000,
      pollingInterval: 2000,
      envOk: false,
      envError: null,
      flagshipMode: API,
      pollingIntervalUnit: 'milliseconds'
    }
  },
  mounted () {
    this.getEnv()
  },
  methods: {
    getEnv () {
      this.$http.get('/env').then((response) => {
        // get body data
        this.currentEnv = response.body
        this.bucketing = response.body.bucketing
        this.envId = response.body.environment_id
        this.apiKey = response.body.api_key
        this.timeout = response.body.timeout
        this.flagshipMode = this.bucketing ? BUCKETING : API
      })
    },
    getPollingInterval (pollingIntervalUnit, pollingInterval) {
      switch (pollingIntervalUnit) {
        case 'seconds':
          pollingInterval = pollingInterval * 1000
          break
        case 'minutes':
          pollingInterval = pollingInterval * 1000 * 60
          break
        default:

          break
      }
      return pollingInterval
    },
    isEnvValidat () {
      const error = {}
      if (!this.envId) {
        error.envId = 'Environnemet ID is required'
      }
      if (!this.apiKey) {
        error.apiKey = 'API key is required'
      }

      if (Object.keys(error).length) {
        this.envError = { error }
        this.envOk = false
        return false
      }
      return true
    },
    setEnv () {
      if (!this.isEnvValidat()) {
        return
      }
      this.envOk = false
      this.envError = null
      this.$http
        .put('/env', {
          environment_id: this.envId,
          api_key: this.apiKey,
          bucketing: this.flagshipMode === BUCKETING,
          timeout: this.timeout || 2000,
          polling_interval: this.getPollingInterval(this.pollingIntervalUnit, this.pollingInterval)
        })
        .then(
          () => {
            this.envOk = true
          },
          (response) => {
            this.envOk = false
            this.envError = response.body
          }
        )
    }
  }
}
</script>
