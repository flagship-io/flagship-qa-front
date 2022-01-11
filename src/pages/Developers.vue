<template>
  <div>
    <h2>SDK Features</h2>
    <table class="table table-sm">
      <thead>
        <tr>
          <th width="250px">Feature</th>
          <th>Spec versions</th>
          <th>Enabled</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="f in Object.keys(AllFeatures)" :key="f">
          <td>
            {{ f }}
          </td>
          <td>
            <span v-if="V1Features[f]">V1</span>
            <span v-if="V2Features[f]">V2</span>
          </td>
          <td>
            <input
              type="checkbox"
              onclick="return false;"
              :checked="isEnabled(f)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div id="swagger"></div>
  </div>
</template>

<script>
import SwaggerUI from 'swagger-ui'
import 'swagger-ui/dist/swagger-ui.css'
import swaggerSpec from '../constants/swaggerSpec.js'
import { All, V1, V2 } from '../constants/features.js'
export default {
  data () {
    return {
      AllFeatures: All,
      V1Features: V1,
      V2Features: V2
    }
  },
  mounted () {
    SwaggerUI({
      dom_id: '#swagger',
      spec: swaggerSpec
    })
  }
}
</script>

<style>
#swagger {
  margin: 0 -35px;
}

#swagger .title {
  font-size: 2rem;
}
</style>
