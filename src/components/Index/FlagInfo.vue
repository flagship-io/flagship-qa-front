<template>
  <form v-on:submit.prevent="getFlagInfo()">
    <div class="row" style="align-items: center">
      <div class="col-sm-3">
        <div class="form-group">
          <label>Flag key</label>
          <input
            type="text"
            class="form-control"
            placeholder="Key"
            v-model="flagInfo.name"
          />
        </div>
      </div>
    </div>
    <div
      class="alert alert-warning mt-3 mb-3"
      v-if="flagInfoOk && flagInfoOk.error"
    >
      {{ flagInfoOk.error }}
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>

    <div
      class="alert alert-success mt-3 mb-3"
      v-if="flagInfoOk && !flagInfoOk.error"
    >
      {{ flagInfoOk }}
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      flagInfo: { name: "" },
      flagInfoOk: false,
    };
  },
  methods: {
    isUndefined(v) {
      return typeof v !== "undefined";
    },
    getFlagInfo() {
      this.flagInfoOk = false;

      const { name } = this.flagInfo;

      if (!name) {
        this.flagInfoOk = { err: "Missing flag name or type" };
        return;
      }

      this.$http.get(`/flag/${name}/info`).then(
        (response) => {
          this.flagInfoOk = response.body.value;
        },
        (response) => {
          this.flagInfoOk = response.body;
        }
      );
    },
  },
};
</script>
