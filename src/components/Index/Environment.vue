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

    <div class="form-group" v-if="isEnabled(AllFeatures.pollingInterval)">
      <label>Polling interval (milliseconds)</label>
      <input
        type="text"
        class="form-control"
        placeholder="Polling interval"
        v-model.number="pollingInterval"
      />
      <small class="form-text text-muted">Set your polling interval.</small>
    </div>

    <div class="form-check mb-3" v-if="isEnabled(AllFeatures.envBucketing)">
      <input class="form-check-input" type="checkbox" v-model="bucketing" />
      <label class="form-check-label"> Use bucketing </label>
    </div>

    <div class="form-check mb-3" v-if="isEnabled(AllFeatures.bucketingPath)">
      <label>Bucketing path for bucketing file</label>
      <input
        type="text"
        class="form-control"
        placeholder="Bucketing path"
        v-model.number="bucketingPath"
      />
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
      timeout: 2000,
      pollingInterval: 60000,
      bucketing: false,
      bucketingPath: "",
      envOk: false,
      envError: null,
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
        this.bucketingPath = response.body.bucketing_path;
        this.envId = response.body.environment_id;
        this.apiKey = response.body.api_key;
        this.timeout = response.body.timeout;
        this.pollingInterval = response.body.polling_interval;
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
          polling_interval: this.pollingInterval || 0,
          bucketing_path: this.bucketingPath,
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
