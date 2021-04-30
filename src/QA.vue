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

    <Header
      :technology="technology"
      :branch="branch"
      :environment="environment"
    />

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
import routes from "./constants/routes";
import { V1 } from "./constants/features";

import Header from "./components/Layout/Header";

Vue.use(VueResource);
Vue.use(VueRouter);

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
    environment: {
      type: String,
      default: "prod",
    },
    features: {
      default() {
        return Object.values(V1);
      },
    },
  },
  store,
  router,
  mixins: [mixins],
  components: {
    Header,
  },
  created() {
    let jquery = document.createElement("script");
    jquery.setAttribute("src", "//code.jquery.com/jquery-3.4.1.slim.min.js");
    document.head.appendChild(jquery);
    jquery.onload = function() {
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
    };
  },
  mounted() {
    let features = this.features;
    if (!Array.isArray(features)) {
      features = Object.values(features);
    }

    this.$store.commit("setFeatures", features);
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
