<template>
  <div
    class="switch-btn-box"
    :style="positionStyle"
    :class="slide + '-btn'"
    @click="$emit('update:status', !status)"
  >
    <slot name="arrow"></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useWindowSizeFn, useLoginState } from './useWindowSizeFn'
export default defineComponent({
  name: 'Home',
  props: {
    positionStyle: {
      type: Object,
      default: function () {
        return {
          top: '50%',
          right: '-10px'
        }
      }
    },
    slide: {
      type: String,
      default: 'left'
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  setup(props, { emit }) {
    const { setViewState } = useLoginState()
    const responsiveSwitch = () => {
      const windowWidth = document.documentElement.clientWidth
      if (windowWidth > 600) {
        emit('isMobile', false)
        setViewState(false)
      } else {
        emit('isMobile', true)
        setViewState(true)
      }
    }
    responsiveSwitch()
    useWindowSizeFn(responsiveSwitch, 150, { immediate: true })
    return {}
  }
})
</script>
<style lang="scss" scoped>
.switch-btn-box {
  position: absolute;
  width: 16px;
  height: 80px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px;
  background-color: #fff;
  transform: translateY(-50%);
}
.left-btn {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
.right-btn {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
</style>
