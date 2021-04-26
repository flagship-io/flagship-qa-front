<template>
  <div>
    <div style="position: relative;">
      <h2 class="mt-5">SDK logs</h2>
      <form v-on:submit.prevent="clearLogs()">
        <button
          type="submit"
          class="btn btn-primary"
          style="position: absolute; right: 0px;"
        >
          clear
        </button>
      </form>
      <form v-on:submit.prevent="getLogs()">
        <button type="submit" class="btn btn-primary">refresh</button>
        <br /><br />
        <textarea
          class="form-control"
          style="height: 564px;"
          v-model="data.logs"
        >
        </textarea>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "qa",
  data() {
    return {
      data: null,
    };
  },
  mounted() {
    this.getLogs();
  },
  methods: {
    getLogs() {
      this.$http.get(`/logs`).then(
        (response) => {
          this.data = {};
          this.data.logs = response.bodyText;
        },
        (response) => {
          this.data = {};
          this.data.logs = response.bodyText;
        }
      );
    },
    clearLogs() {
      this.$http.get(`/clear`).then(
        (response) => {
          this.data = {};
          this.data.logs = response.bodyText;
        },
        (response) => {
          this.data = {};
          this.data.logs = response.bodyText;
        }
      );
    },
  },
};
</script>
