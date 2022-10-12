<template>
  <div
    id="editor-container"
    @click.self="generationNewInput"
    @drop="drogitem"
    @dragover="dragOveritem($event)"
    class="editor-container"
  >
    <h1>{{ page.properties.name }}</h1>
    <draggable :list="page.children" v-bind="dragOptions" item-key="id">
      <template #item="{ element }">
        <BlockComponents :key="element.id" :schema="element"> </BlockComponents>
      </template>
    </draggable>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import BlockComponents from './components/BlockComponent.vue'
import draggable from 'vuedraggable'
import widgets from '../components/map'
export default defineComponent({
  components: { draggable, BlockComponents },
  setup() {
    const store = useStore()
    const page = store.getters.pageData

    const hoverContainer = ref([])
    const mainRef = ref([])

    console.log(widgets, 'widgetswidgetswidgets')
    store.commit('INT_WIDGETS', widgets)
    if (!store.state.pageBox.children) {
      store.commit('SET_DEFAULT_PAGE')
    }
    function generationNewInput() {
      console.log(store.state.pageBox.children)

      if (store.state.pageBox.children.length === 0 || checkLastElement()) {
        store.commit('ADD_NEW_DEFAULT_INPUT')
      }
    }
    function checkLastElement() {
      const lastElement =
        store.state.pageBox.children[store.state.pageBox.children.length - 1]
      if (lastElement[lastElement.type].rich_text !== '') {
        // 还是要换成检测数据的方式，用dom的话不能检测很多复杂组件的value
        return true
      } else {
        return false
      }
    }
    function drogitem(e: any) {
      store.commit('ADD_NEW_DEFAULT_INPUT', store.state.dargActiveItem.id)
    }
    return {
      page,
      mainRef,
      generationNewInput, // 点击空白新增空列表
      checkLastElement, // 检测最后一个dom是否为空的
      hoverContainer, // 用于接收hover了哪个dom
      drogitem, // h5拖拽事件，没用到
      valueList: reactive(store.getters.pageData),
      userGlobalOptions: ref(store.state.userGlobalOptions),
      componentsList: reactive(store.getters.componentsValueList)
    }
  },
  directives: {}
})
</script>

<style lang="scss" scoped>
.fade-btn-label-enter-active,
.fade-btn-label-leave-active {
  transition: all 0.3s ease;
}
.fade-btn-label-enter-from,
.fade-btn-label-leave-to {
  opacity: 0;
}
.fade-btn-label-enter-to,
.fade-btn-label-leave-from {
  opacity: 1;
}
#editor-container {
  position: relative;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 80px;
  width: 100%;
  padding: 40px;
}
.control-label {
  position: absolute;
  top: 0;
  left: 0;
}
.add-new-element {
  display: flex;
  align-items: center;
  justify-content: center;
  fill: rgba(55, 53, 47, 0.3);
  position: absolute;
  top: 4px;
  left: 0px;
  width: 24px;
  height: 24px;
}
.move-new-element {
  width: 18px;
  height: 24px;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: rgba(55, 53, 47, 0.3);
  left: 24px;
  top: 4px;
  position: absolute;
}
.pop-inner-list-item {
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: rgba(55, 53, 47, 0.08);
  }
}
</style>
