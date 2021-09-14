<template>
  <form v-on:submit.prevent="activateFlag()">
    <div class="row" style="align-items: center">
      <div class="col-sm-3">
        <div class="form-group">
          <label>Flag key</label>
          <input
            type="text"
            class="form-control"
            placeholder="Key"
            v-model="activate.name"
          />
        </div>
      </div>
    </div>
    <div
      class="alert alert-warning mt-3 mb-3"
      v-if="activateOk && activateOk.error"
    >
      {{ activateOk.error }}
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>

    <div
      class="alert alert-success mt-3 mb-3"
      v-if="activateOk && !activateOk.error"
    >
      {{ activateOk }}
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      activate: { name: '', type: 'bool', defaultValue: '', activate: true },
      activateOk: false
    }
  },
  methods: {
    activateFlag () {
      this.activateOk = false

      const { name } = this.activate

      if (!name) {
        this.activateOk = { error: 'Missing flag name or type' }
        return
      }

      this.$http.get(`/flag/${name}/activate`).then(
        (response) => {
          this.activateOk = response.body
        },
        (response) => {
          this.activateOk = response.body
        }
      )
    }
  }
}
</script>
