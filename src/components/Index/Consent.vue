<template>
  <form v-on:submit.prevent="setConsent()">
    <div class="form-group">
      <div>
        <label for="checkbox" v-if="isEnabled(AllFeatures.consent)" style="margin-right: 10px">Has consented : </label>
        <input type="checkbox" v-if="isEnabled(AllFeatures.consent)" v-model="consent" style="vertical-align: middle" checked>
      </div>
      <div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "Consent",
  data() {
    return {
      consent: true
    }
  },
  methods: {
    setConsent() {
      const consent = this.consent
      this.$http.put(`/visitor/consent`, consent).then(
          (response) => {
            this.data = response.body
          },
          (response) => {
            this.data = response.body
          }
      );
    }
  }
}
</script>