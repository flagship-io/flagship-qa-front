<template>
  <div id="swagger"></div>
</template>

<script>
import SwaggerUI from "swagger-ui";
import "swagger-ui/dist/swagger-ui.css";
import swaggerSpec from "../constants/swaggerSpec.js";
export default {
  mounted() {
    SwaggerUI({
      dom_id: "#swagger",
      spec: swaggerSpec,
    });
  },
};
</script>

<style></style>
