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
export default {
  data() {
    return {
      envId: "",
      apiKey: "",
      timeout: 0,
      pollingInterval: 0,
      envOk: false,
      envError: null,
      flagshipMode: "api",
      pollingIntervalUnit: "milliseconds",
    };
  },
  mounted() {
    this.getEnv();
  },
  methods: {
    getEnv() {
      this.$http.get("/env").then((response) => {
        // get body data
        this.currentEnv = response.body;
        this.bucketing = response.body.bucketing;
        this.envId = response.body.environment_id;
        this.apiKey = response.body.api_key;
        this.timeout = response.body.timeout;
        this.flagshipMode = response.body.flagship_mode || "api";
        this.flagshipMode === "bucketing"
          ? {
              polling_interval_unit: this.pollingIntervalUnit || "milliseconds",
            }
          : {};
      });
    },
    setEnv() {
      this.envOk = false;
      this.envError = null;
      this.$http
        .put("/env", {
          environment_id: this.envId,
          api_key: this.apiKey,
          bucketing: this.bucketing,
          timeout: this.timeout || 0,
          flagship_mode: this.flagshipMode || "api",
          ...(this.flagshipMode === "bucketing"
            ? { polling_interval: this.pollingInterval || 2000 }
            : {}),
          ...(this.flagshipMode === "bucketing"
            ? {
                polling_interval_unit:
                  this.pollingIntervalUnit || "milliseconds",
              }
            : {}),
        })
        .then(
          () => {
            this.envOk = true;
          },
          (response) => {
            this.envOk = false;
            this.envError = response.body;
          }
        );
    },
  },
};
</script>
