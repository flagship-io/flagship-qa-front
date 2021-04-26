import Vue from "vue";

export default Vue.mixin({
  methods: {
    isEnabled: function(feature) {
      return this.$store.getters.features.includes(feature);
    },
  },
});
