<template>
  <a-space class="bar-content" :size="12">
    <MenuUnfoldOutlined style="font-size: 24px" class="btn-icon" />
    <MenuUnfoldOutlined style="font-size: 24px" class="btn-icon" />
  </a-space>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { MenuUnfoldOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: { MenuUnfoldOutlined },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.bar-content {
  position: absolute;
  top: 0;
  height: 24px;
  left: 12px;
}
.btn-icon {
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
}
::v-deep(.ant-space-item) {
  line-height: 1;
}
</style>
