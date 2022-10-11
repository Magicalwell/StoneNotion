<template>
  <div class="feature-box">
    <h4>属性</h4>
    <div v-if="toolsType">
      {{ toolsType }}
      <!-- 此处引入一个js的render文件，在里面绑定值，类似于SchemaField.js -->
      <!-- 可以打散单个表单模块进行render，也可以根据每种类型直接写对应的表单 -->
      <component :is="toolsType" :form-render="valueList[toolsType]"></component>
    </div>
    <div v-else>暂无相关属性,请选择图层或工具</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import pencilInput from '../feature/pencilInput.vue'

export default defineComponent({
  components: {
    pencilInput
  },
  setup() {
    const store = useStore()
    const toolsType = computed(
      () => store.state.plannerVuex.toolBox.currentType
    )
    return {
      toolsType,
      valueList: reactive(store.state.plannerVuex.toolsFeature)
    }
  }
})
</script>

<style lang="scss" scoped>
.feature-box {
  border: 1px solid #000;
  margin: 5px 0;
  padding: 4px;
}
</style>
