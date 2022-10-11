<template>
  <div class="draggableItem">
    <span class="operation-btn">
      <plus-outlined class="btn-item" />
      <bars-outlined class="mover btn-item" />
    </span>
    <SchemaField v-bind="attrs"></SchemaField>
    <!-- 暂时隐藏，目前只有toggle会有children -->
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import SchemaField from '../components/SchemaField.js'
import { editorItem2SchemaFieldProps } from '../../../utils/editorData'
import { PlusOutlined, BarsOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  name: 'componentsItem',
  components: {
    SchemaField,
    PlusOutlined,
    BarsOutlined
  },
  props: {
    editorItem: {
      type: Object,
      default: () => ({})
    },
    dragOptions: {
      type: Object,
      default: () => ({})
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    formProps: {
      type: null,
      default: null
    },
    globalOptions: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // console.log(props.editorItem, 'props.editorItemprops.editorItem')

    const attrs = computed(() => {
      return {
        // 这里是需要一个全局的配置，用于设置用户之前配置的信息，例如标题的字号，颜色
        editorItem: props.editorItem,
        ...editorItem2SchemaFieldProps(props.editorItem, props.globalOptions)
        // 这里考虑自己实现一下，可以看一下参考vue3的代码，editordata是对于vue2进行封装的
      }
    })
    return {
      attrs
    }
  }
})
</script>

<style lang="scss" scoped>
.draggableItem {
  position: relative;
  padding-left: 50px;
  min-height: 30px;
  &:hover > .operation-btn {
    visibility: visible;
    opacity: 1;
  }
}
.operation-btn {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 4px;
  left: 0;
  display: flex;
  z-index: 99;
  transition: all 0.3s ease;
  .btn-item {
    padding: 4px;
    cursor: pointer;
  }
}
</style>
