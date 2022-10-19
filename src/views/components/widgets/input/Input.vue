<template>
  <Ediotr></Ediotr>
  <!-- <div style="display: flex; align-items: center">我是input</div> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Ediotr from '../editor/index.vue'
export default defineComponent({
  components: {
    Ediotr
  },
  setup(props) {
    return {}
  }
})
</script>

<style lang="scss" scoped></style>
