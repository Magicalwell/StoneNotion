<template>
  <div>
    <a-button
      class="tools-item"
      :type="btnType === 'text-input' ? 'primary' : ''"
      @click="sendChange('text-input')"
    >
      <FontSizeOutlined />
    </a-button>
    <a-button
      class="tools-item"
      :type="btnType === 'bgcolor-input' ? 'primary' : ''"
      @click="sendChange('bgcolor-input')"
    >
      <FormatPainterOutlined />
    </a-button>
    <a-button class="tools-item"
      :type="btnType === 'pencil-input' ? 'primary' : ''"
      @click="sendChange('pencil-input')"
    >
      <DownOutlined />
    </a-button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import {
  FontSizeOutlined,
  FormatPainterOutlined,
  DownOutlined
} from '@ant-design/icons-vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: { FontSizeOutlined, FormatPainterOutlined, DownOutlined },
  setup() {
    const store = useStore()
    // 暂时不用render写，不好个性化控制
    // const toolList = [
    //   {
    //     id: 1,
    //     name: '文字',
    //     type: 'text-input',
    //     icon: 'font-size-outlined'
    //   },
    //   {
    //     id: 1,
    //     name: '背景颜色',
    //     type: 'bgcolor-input',
    //     icon: 'format-painter-outlined'
    //   }
    // ]
    const btnType = computed(() => store.state.plannerVuex.toolBox.currentType)
    const visible = ref(false)
    const popSetting = ref({
      getPopupContainer: () => document.querySelector('#app')
    })
    const sendChange = (type) => {
      store.commit('plannerVuex/changeToolCurrentType', type)
    }
    // return () =>
    //   toolList.map((item) => {
    //     return h(
    //       resolveComponent('a-button'),
    //       {
    //         type:
    //           item.type === store.state.plannerVuex.toolBox.currentType
    //             ? 'primary'
    //             : '',
    //         class: {
    //           'tool-btn-item': true
    //         },
    //         onClick: () => {
    //           store.commit('plannerVuex/changeToolCurrentType', item.type)
    //         }
    //       },
    //       () => [h(resolveComponent(item.icon))]
    //     )
    //   })
    return { btnType, sendChange, visible, popSetting }
  }
})
</script>
<style lang="scss" scoped>
.tool-btn-item {
  margin: 0 4px;
}
.tools-item {
  margin: 0 4px;
}
</style>
>
