<template>
  <div class="hello">
    <title>qa demo</title>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />

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
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if="features.includes('hits')">
            <router-link class="nav-link" to="/events">Hits</router-link>
          </li>
          <li class="nav-item" v-if="features.includes('logs')">
            <router-link class="nav-link" to="/logs">Logs</router-link>
          </li>
        </ul>
        <span class="navbar-text">Branch : {{ branch }} </span>
      </div>
    </nav>

    <div class="container mt-5 mb-5" id="app">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";

import store from "./store";
import mixins from "./mixins";

import Index from "./pages/Index";
import Events from "./pages/Events";
import Logs from "./pages/Logs";

Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
  { path: "/", component: Index },
  { path: "/events", component: Events },
  { path: "/logs", component: Logs },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes, // short for `routes: routes`
});

export default {
  name: "qa",
  props: {
    technology: {
      type: String,
      default: "",
    },
    branch: {
      type: String,
      default: "main",
    },
    features: {
      type: Array,
      default() {
        return [
          "env",
          "visitor",
          "update-context",
          "flag-value",
          "flag-activate",
          "flag-info",
          "hits",
          "logs",
        ];
      },
    },
  },
  store,
  router,
  mixins: [mixins],
  created() {
    let jquery = document.createElement("script");
    jquery.setAttribute("src", "//code.jquery.com/jquery-3.4.1.slim.min.js");
    document.head.appendChild(jquery);

    let popper = document.createElement("script");
    popper.setAttribute(
      "src",
      "//cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    );
    document.head.appendChild(popper);

    let bootstrap = document.createElement("script");
    bootstrap.setAttribute(
      "src",
      "//stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
    );
    document.head.appendChild(bootstrap);
  },
  mounted() {
    console.log(this.features);
    this.$store.commit("setFeatures", this.features);
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
