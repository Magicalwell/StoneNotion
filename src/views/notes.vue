<template>
  <div class="generation-body">
    <!-- <tool-Box></tool-Box> -->
    <app-Editor style="flex: 1"></app-Editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import appEditor from './editor/index.vue'
import toolBox from './layout/components/toolBox/toolBox.vue'
import { useWindowSizeFn } from '../views/layout/components/switchBtn/useWindowSizeFn'
export default defineComponent({
  name: 'Home',
  components: {
    appEditor
    // toolBox,
  },
  setup() {
    const isMobile = ref(false)
    const responsiveSwitch = () => {
      const windowWidth = document.documentElement.clientWidth
      if (windowWidth > 600) {
        isMobile.value = false
      } else {
        isMobile.value = true
      }
    }
    responsiveSwitch()
    useWindowSizeFn(responsiveSwitch, 150, { immediate: true })
    return {
      isMobile
    }
  }
})
</script>

<style lang="scss" scoped>
.generation-container {
  height: 100%;
}
.generation-head {
  position: relative;
  z-index: 3;
}
.generation-body {
  position: relative;
  display: flex;
  height: 100vh;
  overflow-x: hidden;
}
</style>
