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
          <div style="display: flex; padding-bottom: 4px; width: 100%">
            <PropertyLabel></PropertyLabel>
            <PropertyView></PropertyView>
          </div>
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
import PropertyLabel from './PropertyLabel.vue'
import PropertyView from './PropertyView.vue'
export default defineComponent({
  props: {
    schema: {
      type: Object,
      default: () => ({})
    }
  },
  components: { draggable, PropertyLabel, PropertyView },
  setup(props) {
    const store = useStore()
    const propertiesList = computed(() => {
      return props.schema.properties.list
    })
    const options1 = ref([
      {
        value: 'jack',
        label: 'Jack'
      },
      {
        value: 'lucy',
        label: 'Lucy'
      },
      {
        value: 'disabled',
        label: 'Disabled',
        disabled: true
      },
      {
        value: 'yiminghe',
        label: 'Yiminghe'
      }
    ])
    // 计算属性返回了一个临时的数组，里面是各个对象的引用，排序时直接对该数组修改，不会影响到对象，但可以通过指针修改对象的属性
    // 也可能是数组里面套对象
    console.log(propertiesList, 'propertiesList')

    const hoverContainer = ref([])
    const mainRef = ref([])

    return { propertiesList, options1 }
  }
})
</script>
<style lang="scss" scoped></style>
