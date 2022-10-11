<template>
  <div class="generation-container">
    <top-Head class="generation-head"></top-Head>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import topHead from './layout/components/topHead/topHead.vue'
export default defineComponent({
  name: 'Home',
  components: {
    topHead
  }
})
</script>

<style lang="scss" scoped>
.generation-container {
  height: calc(100vh - 50px);
}
.generation-head {
  position: relative;
  z-index: 3;
}
</style>
