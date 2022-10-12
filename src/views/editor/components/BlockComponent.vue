<template>
  <div class="block-item" style="height: 40px">
    <div class="item-btn-box">
      <div class="item-btn item-widget-btn-delete">
        <delete-outlined />
      </div>
      <div class="item-btn item-widget-btn-clone">
        <plus-outlined />
      </div>
      <div class="item-btn item-widget-btn-move">
        <setting-outlined />
      </div>
    </div>
    <div>
      <component :is="schema.type" :schema="schema"></component>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import {
  DeleteOutlined,
  PlusOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
export default defineComponent({
  name: 'BlockComponents',
  components: { DeleteOutlined, PlusOutlined, SettingOutlined },
  props: {
    childComponentList: {
      type: Array,
      default: () => []
    },
    globalOptions: {
      type: Object,
      default: () => ({})
    },
    schema: { type: Object }
  },
  setup(props) {
    const hoverContainer = ref([])
    const store = useStore()

    return {}
  }
})
</script>

<style lang="scss" scoped>
.block-item {
  display: flex;
  .item-btn-box {
    display: flex;
    height: 100%;
    align-items: center;
    .item-btn {
      font-size: 20px;
      padding: 2px;
    }
  }
}
</style>
