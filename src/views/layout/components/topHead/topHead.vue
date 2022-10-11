<template>
  <div class="generation-head">
    <a-radio-group
      v-model:value="current"
      button-style="solid"
      @change="handleClick"
    >
      <a-radio-button value="notes">三石笔记</a-radio-button>
      <a-radio-button value="planner">手账生成器</a-radio-button>
    </a-radio-group>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const current = ref<string>('notes')
    const router = useRouter()
    watch(
      () => router.currentRoute.value.name,
      (newValue) => {
        // console.log('watch', newValue)
        current.value = newValue as string
        console.log(newValue, 'newValuenewValuenewValue')
      },
      { immediate: true }
    )

    function handleClick(item) {
      router.replace({ path: `/Home/${item.target.value}` })
    }
    return {
      current,
      handleClick
    }
  }
})
</script>

<style lang="scss" scoped>
.generation-head {
  width: 100%;
  height: 50px;
  padding: 0 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
}
</style>
