<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Flagship {{ technology }} SDK QA App</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" v-for="r in routes" :key="r.path">
          <router-link class="nav-link" :to="r.path">{{ r.label }}</router-link>
        </li>
      </ul>
      <span class="navbar-text"
        >Branch : {{ branch }} / Env : {{ environment }}</span
      >
    </div>
  </nav>
</template>

<script>
import routes from '../../constants/routes'

export default {
  props: ['branch', 'technology', 'environment'],
  data () {
    return { routes }
  }
}
</script>

<style></style>
