<template>
  <div>
    <form v-on:submit.prevent="setVisitor()">
      <div class="form-group">
        <label>Visitor ID</label>
        <input
          type="text"
          class="form-control"
          placeholder="Visitor ID"
          v-model="visitorId"
        />
        <small id="emailHelp" class="form-text text-muted"
          >Set your Flagship Visitor ID.</small
        >
      </div>

      <div class="form-group">
        <label>Visitor Context (JSON)</label>
        <textarea
          class="form-control"
          placeholder="Visitor Context"
          v-model="context"
          required
          style="height: 200px"
        ></textarea>
        <small id="emailHelp" class="form-text text-muted"
          >Set your Flagship Visitor Context.</small
        >
      </div>

      <div class="alert alert-danger" v-if="visitorError">
        {{ visitorError.error }}
      </div>
      <div class="alert alert-success" v-if="visitorOk">
        Visitor ID and context set successfully
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
      <div v-if="data && data.visitor">
        <br />
        <h2 class="mt-5">Visitor content:</h2>
      </div>
      <pre class="mt-3" v-if="data && data.visitor">{{
        JSON.stringify(data.visitor, null, 4)
      }}</pre>
    </form>

    <h2 class="mt-5">Stand alone update context</h2>
    <small class="form-text text-muted">(Will also call synchronize)</small>
    <br />

    <form v-on:submit.prevent="updateContext()">
      <div class="row" style="align-items: center">
        <div class="col-sm-3">
          <div class="form-group">
            <label>Context key</label>
            <input
              type="text"
              class="form-control"
              placeholder="Key"
              v-model="newContext.key"
            />
          </div>
        </div>

        <div class="col-sm-3">
          <div class="form-group">
            <label>Context type</label>
            <select
              type="text"
              class="form-control"
              placeholder="Type"
              v-model="newContext.type"
            >
              <option value="bool">bool</option>
              <option value="double">double</option>
              <option value="int">int</option>
              <option value="long">long</option>
              <option value="float">float</option>
              <option value="string">string</option>
            </select>
          </div>
        </div>

        <div class="col-sm-3">
          <div class="form-group">
            <label>Context value</label>
            <input
              type="text"
              class="form-control"
              placeholder="Default"
              v-model="newContext.value"
            />
          </div>
        </div>
      </div>
      <div
        class="alert alert-warning mt-3 mb-3"
        v-if="updateContextOk && updateContextOk.error"
      >
        {{ updateContextOk.error }}
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>

      <div
        class="alert alert-success mt-3 mb-3"
        v-if="updateContextOk && isUndefined(updateContextOk.error)"
      >
        New context: {{ context }}
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      visitorId: "test-visitor",
      context: "{\n}",
      visitorOk: false,
      visitorError: null,
      newContext: { name: "", type: "bool", value: "" },
      updateContextOk: false,
    };
  },
  mounted() {
    this.getVisitor();
  },
  methods: {
    getVisitor() {
      this.$http.get("/visitor").then((response) => {
        // get body data
        this.visitorId = response.body.visitor_id;
        this.context = JSON.stringify(response.body.context);
      });
    },
    setVisitor() {
      this.visitorOk = false;
      this.visitorError = null;
      this.data = null;

      this.$http
        .put("/visitor", {
          visitor_id: this.visitorId,
          context: this.context ? JSON.parse(this.context) : "{}",
        })
        .then(
          (response) => {
            // get body data
            this.data = {};
            this.data.visitor = response.body;
            this.visitorOk = true;
          },
          (response) => {
            this.visitorOk = false;
            this.visitorError = response.body;
          }
        );
    },
    updateContext() {
      this.updateContextOk = false;
      this.data = null;

      const { key, type, value } = this.newContext;

      if (!key || !type || !value) {
        this.updateContextOk = { err: "Missing context type or value" };
        return;
      }

      this.$http
        .put(`/visitor/context/${key}`, {
          type,
          value,
        })
        .then(
          (response) => {
            const { flags, context } = response.body;
            this.data = { visitor: { flags } };
            this.context = JSON.stringify(context);
            this.updateContextOk = response.body;
            this.setVisitor();
          },
          (response) => {
            this.updateContextOk = response.body;
          }
        );
    },
  },
};
</script>
