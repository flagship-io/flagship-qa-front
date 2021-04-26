import Vue from "vue";
import qa from "./QA.vue";

const Components = {
  qa,
};

Object.keys(Components).forEach((c) => {
  console.log(c);
  Vue.component(c, Components[c]);
});

export default Components;
