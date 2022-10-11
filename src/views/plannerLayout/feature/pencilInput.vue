<template>
  <div>
    <span>画笔类型：</span>
    <a-select
      ref="select"
      v-model:value="selfData.type"
      style="display: block; width: 120px"
      v-bind="popSetting"
    >
      <a-select-option value="pencil">画笔</a-select-option>
      <a-select-option value="maopencil">毛笔</a-select-option>
    </a-select>
  </div>
  <div>
    <span>画笔大小：</span>
    <a-row>
      <a-col :span="12">
        <a-slider v-model:value="selfData.size" :min="1" :max="100" />
      </a-col>
      <a-col :span="4">
        <a-input-number
          v-model:value="selfData.size"
          :min="1"
          :max="100"
          style="margin-left: 16px"
        />
      </a-col>
    </a-row>
  </div>
  <div>
    <span>画笔颜色：</span>
    <input type="color" v-model="selfData.color" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, toRefs } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    formRender: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { formRender: selfData } = toRefs(props)
    const popSetting = ref({
      getPopupContainer: () => document.querySelector('#app')
    })

    return { selfData, popSetting }
  }
})
</script>

<style lang="scss" scoped></style>
