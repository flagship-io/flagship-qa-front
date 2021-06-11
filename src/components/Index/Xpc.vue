<template>
  <div>
    <h3 class="mt-3">Authenticate</h3>
    <br/>
    <form v-on:submit.prevent="authenticate()">
      <div class="row" style="align-items: center">
        <div class="col-sm-3">
          <div class="form-group">
            <label>Logged-in visitor Id : </label>
            <input
                type="text"
                class="form-control"
                placeholder="New visitor id"
                v-model="newVisitorId"
            />
          </div>
        </div>
      </div>
      <div>
        <button type="submit" class="btn btn-primary">Authenticate</button>
      </div>
    </form>

    <h3 class="mt-3">Unauthenticate</h3>
    <br/>
    <form v-on:submit.prevent="unauthenticate()">
      <button type="submit" class="btn btn-primary">Unauthenticate</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Xpc",
  data() {
    return {
      data: null,
      visitorOk: false,
      visitorError: null,
    };
  },
  methods: {
    authenticate() {
      this.visitorOk = false;
      this.visitorError = null;
      this.data = null;
      this.$http
          .get("/visitor/authenticate", {
            params:
                {
                  newVisitorId: this.newVisitorId
                }
          })
          .then(
              (response) => {
                // get body data
                this.data = {}
                this.data.visitor = response.body;
                this.visitorOk = true;
                this.$root.$emit('refresh_visitor', '');
              },
              (response) => {
                this.visitorOk = false;
                this.visitorError = response.body;
              }
          );
    },
    unauthenticate() {
      this.visitorOk = false;
      this.visitorError = null;
      this.data = null;
      this.$http
          .get("/visitor/unauthenticate", {
          })
          .then(
              (response) => {
                // get body data
                this.data = {}
                this.data.visitor = response.body;
                this.visitorOk = true;
                this.$root.$emit('refresh_visitor', '');
              },
              (response) => {
                this.visitorOk = false;
                this.visitorError = response.body;
              }
          );
    },
  },
};
</script>

<style scoped>

</style>