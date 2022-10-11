<template>
  <draggable :list="childComponentList" v-bind="dragOptions" item-key="id">
    <template #item="{ element }">
      <components-Item
        :drag-options="dragOptions"
        :editor-item="element"
        :show-nested-editor="false"
        :globalOptions="globalOptions"
        :ref="
          (el) => {
            if (el) widgetsList[el.id] = el
          }
        "
      >
      </components-Item>
    </template>
  </draggable>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'
import { generateBlockType } from '../../../utils/generateBlock.js'
import componentsItem from './componentsItem.vue'
export default defineComponent({
  name: 'stoneDragbox',
  props: {
    childComponentList: {
      type: Array,
      default: () => []
    },
    globalOptions: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    draggable,
    componentsItem
  },
  setup(props) {
    const widgetsList = ref([])
    const dragOptions = computed(() => {
      return {
        animation: 300,
        group: 'listComponentsGroup',
        ghostClass: 'ghostItem',
        draggable: '.draggableItem',
        tag: 'div',
        swapThreshold: 0.3,
        handle: '.mover',
        forceFallback: true,
        dragClass: 'dragClass',
        fallbackTolerance: 0
      }
    })
    function updateDatadragEnd() {
      console.log(111)
    }

    return { updateDatadragEnd, dragOptions, widgetsList }
  }
  // computed: {
  //   ...mapState(['textContainer'])
  // }
})
</script>

<style lang="scss" scoped>
.item-drag {
  position: relative;
  padding-left: 4%;
  padding-right: 3%;
}
.ghostItem {
  opacity: 0.6 !important;
  background-color: #f2f5fa !important;
}
.dragClass {
  background-color: #f2f5fa !important;
}
</style>
