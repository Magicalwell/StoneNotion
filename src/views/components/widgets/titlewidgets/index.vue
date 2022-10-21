<template>
  <div>
    <div>
      <div>
        <small>添加icon</small>
      </div>
      <h1>{{ schema.properties.name }}</h1>
    </div>
    <div class="tw_p">
      <draggable :list="propertiesList" item-key="id">
        <template #item="{ element }">
          <BlockComponents :key="element.id" :schema="element">
          </BlockComponents>
        </template>
      </draggable>
      <div>添加标题属性...</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'
export default defineComponent({
  props: {
    schema: {
      type: Object
    }
  },
  components: { draggable },
  setup(props) {
    const store = useStore()
    const propertiesList = computed(() => {
      return []
    })
    // 计算属性返回了一个临时的数组，里面是各个对象的引用，排序时直接对该数组修改，不会影响到对象，但可以通过指针修改对象的属性
    // 也可能是数组里面套对象
    console.log(propertiesList, 'propertiesList')

    const hoverContainer = ref([])
    const mainRef = ref([])

    return { propertiesList }
  }
})
</script>
<style lang="scss" scoped></style>
