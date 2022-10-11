<template>
  <div
    class="setting-box"
    :class="{ 'bar-fold': barStatus, 'mode-mobile': isMobile }"
  >
    <div class="setting-inner">我是配置模块</div>
    <SwitchBtn
      v-model:status="barStatus"
      @isMobile="changeMobileModel"
      :positionStyle="{ left: '-10px', top: '50%' }"
      slide="right"
    />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
import SwitchBtn from '../switchBtn/index.vue'
export default defineComponent({
  components: {
    SwitchBtn
  },
  setup() {
    const barStatus = ref(true)
    const isMobile = ref(true)
    const changeMobileModel = (e) => {
      isMobile.value = e
    }
    return {
      barStatus,
      changeMobileModel,
      isMobile
    }
  }
})
</script>

<style lang="scss" scoped>
.setting-box {
  position: absolute;
  background: #f5f5f5;
  width: fit-content;
  transition: width 300ms ease;
  z-index: 20;
  height: 100%;
  display: flex;
  right: 0;
  top: 0;
  .setting-inner {
    position: relative;
    width: 340px;
    transform: translateX(0);
    height: 100%;
    transition: transform 200ms ease-out;
  }
}
.bar-fold {
  .setting-inner {
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(480px);
  }
}
.mode-mobile {
  position: absolute !important;
  right: 0;
  top: 0;
}
</style>
