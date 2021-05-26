<template>
  <form v-on:submit.prevent="getFlag()">
    <div class="row" style="align-items: center">
      <div class="col-sm-3">
        <div class="form-group">
          <label>Flag key</label>
          <input
            type="text"
            class="form-control"
            placeholder="Key"
            v-model="flag.name"
          />
        </div>
      </div>

      <div class="col-sm-3">
        <div class="form-group">
          <label>Flag type</label>
          <select
            type="text"
            class="form-control"
            placeholder="Type"
            v-model="flag.type"
          >
            <option value="bool">bool</option>
            <option value="double">double</option>
            <option value="int">int</option>
            <option value="long">long</option>
            <option value="float">float</option>
            <option value="string">string</option>
            <option value="JSONObject">JSONObject</option>
            <option value="JSONArray">JSONArray</option>
          </select>
        </div>
      </div>

      <div class="col-sm-3">
        <div class="form-group">
          <label>Default value</label>
          <input
            type="text"
            class="form-control"
            placeholder="Default"
            v-model="flag.defaultValue"
          />
        </div>
      </div>
    </div>

    <div class="form-check mb-3">
      <input class="form-check-input" type="checkbox" v-model="flag.activate" />
      <label class="form-check-label"> Activate </label>
    </div>

    <div class="alert alert-warning mt-3 mb-3" v-if="flagOk && flagOk.error">
      {{ flagOk.error }}
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>

    <div
      class="alert alert-success mt-3 mb-3"
      v-if="flagOk && !isUndefined(flagOk.value)"
    >
      {{ flagOk.value }}
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      flag: { name: "", type: "bool", defaultValue: "", activate: true },
      flagOk: false,
    };
  },
  methods: {
    getFlag() {
      this.flagOk = false;
      const { name, type, activate, defaultValue } = this.flag;

      if (!name || !type) {
        this.flagOk = { error: "Missing flag name or type" };
        return;
      }

      this.$http
        .get(`/flag/${name}`, {
          params: {
            type,
            activate,
            defaultValue,
          },
        })
        .then(
          (response) => {
            this.flagOk = response.body;
          },
          (response) => {
            this.flagOk = response.body;
          }
        );
    },
  },
};
</script>
