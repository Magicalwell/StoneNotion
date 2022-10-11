<template>
  <a-collapse-panel>
    <template
      #header
      v-if="true"
    >
      <a-textarea auto-size class="input-item"></a-textarea>
    </template>
    <slot></slot>
  </a-collapse-panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'st-collapse-panel',
  props: {
    outElement: {
      type: Object
    }
  },
  mounted() {
    console.log(this.$parent)
  }
})
</script>
