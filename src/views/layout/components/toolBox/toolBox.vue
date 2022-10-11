<template>
  <div
    class="tool-box"
    :class="{ 'bar-fold': barStatus, 'mode-mobile': isMobile }"
  >
    <div class="draggable-container">
      <draggable
        v-model="defaultComponents"
        v-bind="dragOptions"
        item-key="id"
        @end="addWidgetByDrag"
        :clone="cloneWidget"
        :options="{
          group: { name: 'listComponentsGroup', pull: 'clone' },
          sort: true
        }"
      >
        <template #item="{ element }">
          <div class="tool-item">
            <span>{{ element.value }}</span>
          </div>
        </template>
      </draggable>
    </div>

    <SwitchBtn
      v-model:status="barStatus"
      @isMobile="changeMobileModel"
    />
  </div>
</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'
import blockItemMap from '../../../../utils/index'
import { generateBlockType } from '../../../../utils/generateBlock'
import SwitchBtn from '../switchBtn/index.vue'
export default defineComponent({
  components: {
    draggable,
    SwitchBtn
  },
  setup() {
    const store = useStore()
    const barStatus = ref(false)
    const isMobile = ref(false)
    const changeMobileModel = (e) => {
      isMobile.value = e
    }
    const dragOptions = computed(() => {
      return {
        group: { name: 'listComponentsGroup', pull: 'clone' },
        tag: 'div',
        sort: false,
        animation: 300,
        ghostClass: 'ghostItem',
        draggable: '.tool-item',
        swapThreshold: 0.3,
        forceFallback: true,
        dragClass: 'toolDragClass'
      }
    })
    const defaultComponents = [...blockItemMap.entries()].map(
      ([key, value]) => {
        return {
          id: key,
          value: value
        }
      }
    )
    function saveDragType(item) {
      store.commit('ADD_DARGACTIVEITEM', item)
      console.log(item)
    }
    function addWidgetByDrag(e) {
      console.log(123)
    }
    function cloneWidget(origin) {
      return generateBlockType(origin.id)
    }
    return {
      defaultComponents,
      saveDragType,
      dragOptions,
      addWidgetByDrag,
      cloneWidget,
      barStatus,
      isMobile,
      changeMobileModel
    }
  }
})
</script>

<style lang="scss" scoped>
.tool-box {
  position: absolute;
  background: #f5f5f5;
  width: fit-content;
  transition: width 300ms ease;
  z-index: 20;
  height: 100%;
  display: flex;
  .draggable-container {
    position: relative;
    width: 260px;
    transform: translateX(0);
    height: 100%;
    transition: transform 200ms ease-out;
  }
}
.bar-fold {
  .draggable-container {
    position: absolute;
    left: 0;
    top: 0;
    transform: translateX(-480px);
  }
}
.mode-mobile {
  position: absolute !important;
  left: 0;
  top: 0;
}
.tool-item {
  display: inline-block;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 6px 0 0 6px;
}
.ghostItem {
  opacity: 0.8 !important;
  border: 0;
  font-size: 16px;
  background-color: #f2f5fa;
  padding: 4px 20px;
  margin-left: 50px;
}
.toolDragClass {
  border: 0;
}
</style>
