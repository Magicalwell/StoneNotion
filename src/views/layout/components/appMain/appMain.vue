<template>
  <div class="appMain">
    <!-- <component :is=""></component> -->
    <slot></slot>
    <app-Editor></app-Editor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import appEditor from '../../../editor/index.vue'
export default defineComponent({
  components: {
    appEditor
  },
  methods: {}
})
</script>

<style lang="scss" scoped>
.appMain {
  position: relative;
  height: 100%;
  padding: 20px;
  padding-top: 40px;
  flex: 1;
}
</style>
