<template>
  <div class="generation-container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",
});
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
