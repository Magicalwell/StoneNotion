<template>
  <div class="generation-body">
    <div class="fake-div" :style="{ width: isMobile ? '0px' : '260px' }"></div>
    <tool-Box></tool-Box>
    <app-Main>
      <SettingBar />
    </app-Main>
    <div class="fake-div" :style="{ width: isMobile ? '0px' : '340px' }"></div>
    <setting-Box></setting-Box>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import appMain from './layout/components/appMain/appMain.vue'
import toolBox from './layout/components/toolBox/toolBox.vue'
import settingBox from './layout/components/settingBox/settingBox.vue'
import SettingBar from './layout/components/settingBar/index.vue'
import { useWindowSizeFn } from '../views/layout/components/switchBtn/useWindowSizeFn'
export default defineComponent({
  name: 'Home',
  components: {
    appMain,
    toolBox,
    settingBox,
    SettingBar
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
  height: calc(100vh - 100px);
  overflow-x: hidden;
}
</style>
