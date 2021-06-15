<template>
  <div>
    <h2 class="mt-5">(Optional) Authenticate your visitor</h2>
    <form v-on:submit.prevent="authenticate()">
      <div class="form-group">
        <label>New Visitor ID</label>
        <input
          type="text"
          class="form-control"
          placeholder="Visitor ID"
          v-model="newVisitorId"
        />
        <small id="emailHelp" class="form-text text-muted"
          >Set your new Flagship Visitor ID.</small
        >
      </div>

      <div class="alert alert-info">
        <div>Visitor ID: {{ visitorId }}</div>
        <div>Anonymous ID: {{ anonymousId || "null" }}</div>
      </div>

      <div class="alert alert-danger" v-if="visitorAuth.error">
        {{ visitorAuth.error }}
      </div>
      <div class="alert alert-success" v-if="visitorAuth.ok">
        Visitor authenticated successfully
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <h2 class="mt-5">(Optional) Unauthenticate your visitor</h2>
    <form v-on:submit.prevent="unauthenticate()">
      <div class="alert alert-info">
        <div>Visitor ID: {{ visitorId }}</div>
        <div>Anonymous ID: {{ anonymousId || "null" }}</div>
      </div>

      <div class="alert alert-danger" v-if="visitorUnauth.error">
        {{ visitorUnauth.error }}
      </div>
      <div class="alert alert-success" v-if="visitorUnauth.ok">
        Visitor unauthenticated successfully
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["visitorId", "onNewVisitorId"],
  data() {
    return {
      newVisitorId: "",
      anonymousId: false,
      isAuthenticated: false,
      visitorAuth: {},
      visitorUnauth: {},
    };
  },
  methods: {
    authenticate() {
      this.visitorAuth = { ok: false, error: null };

      this.$http
        .post("/authenticate", {
          new_visitor_id: this.newVisitorId,
        })
        .then(
          (response) => {
            this.data = response.body;
            this.visitorAuth.ok = true;
            this.anonymousId = response.body.anonymousId;
            onNewVisitorId(response.body.visitorId);
          },
          (response) => {
            this.visitorAuth.ok = false;
            this.visitorAuth.error = response.body;
          }
        );
    },
    unauthenticate() {
      this.visitorUnauth = { ok: false, error: null };

      this.$http.post("/unauthenticate", {}).then(
        (response) => {
          this.data = response.body;
          this.visitorUnauth.ok = true;
          this.anonymousId = response.body.anonymousId;
          onNewVisitorId(response.body.visitorId);
        },
        (response) => {
          this.visitorUnauth.ok = false;
          this.visitorUnauth.error = response.body;
        }
      );
    },
  },
};
</script>
