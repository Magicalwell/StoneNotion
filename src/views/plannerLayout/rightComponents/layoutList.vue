<template>
  <div class="layout-control">
    <h4
      style="
        border-bottom: 1px solid #000;
        height: 28px;
        line-height: 28px;
        padding: 0 4px;
        font-size: 16px;
      "
    >
      图层管理器
    </h4>
    <draggable
      :list="childComponentList"
      v-bind="dragOptions"
      item-key="id"
      @sort="layoutMoved"
    >
      <template #item="{ element, index }">
        <div
          :class="{
            layer_active: styleNum == index,
            'drag-handle': !selectInputArr.includes(element.id)
          }"
          class="layout-item"
          @click="setAvtive(element.id, index)"
          @dblclick="setInput(element.id)"
        >
          <a-input
            v-model:value.lazy="element.layoutName"
            v-if="selectInputArr.includes(element.id)"
            @blur="resetArr(element.id)"
          ></a-input>
          <div v-else>
            {{ element.layoutName }}
          </div>
          <span class="layout-btn" @click.stop="changeVisiable(element.id)">
            <bulb-outlined />
          </span>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import draggable from 'vuedraggable'
import { BulbOutlined } from '@ant-design/icons-vue'
export default defineComponent({
  components: {
    draggable,
    BulbOutlined
  },
  props: {
    setActiveObj: {
      type: Function,
      default: () => ({})
    }
  },
  setup(props) {
    const store = useStore()
    const childComponentList = computed(
      () => store.state.plannerVuex.layoutContainer
    )
    const styleNum = computed(() => store.state.plannerVuex.paintAimedLayout)
    const selectIndex = computed({
      get: () => {
        return store.state.plannerVuex.layoutId
      },
      set: (val) => {
        store.commit('plannerVuex/changeLayoutId', val)
      }
    })
    const dragOptions = {
      animation: 300,
      ghostClass: 'ghostItem',
      draggable: '.drag-handle',
      tag: 'div',
      forceFallback: false,
      dragClass: 'dragClass'
    }
    const selectInputArr = ref([])
    const setAvtive = (idx, index) => {
      selectIndex.value = childComponentList.value.length - 1 - index
      store.commit('plannerVuex/setPaintAimedLayout', index)
      console.log(
        idx,
        index,
        'indexindexindex',
        childComponentList.value.length - 1 - index
      )

      props.setActiveObj(idx)
    }
    const layoutMoved = (arg) => {
      store.commit('plannerVuex/layoutDrag', {
        newIndex: childComponentList.value.length - 1 - arg.newIndex,
        oldIndex: childComponentList.value.length - 1 - arg.oldIndex
      })
    }
    const setInput = (val: never) => {
      selectInputArr.value.push(val)
    }
    const resetArr = (val) => {
      selectInputArr.value = selectInputArr.value.filter((item) => item !== val)
    }
    const changeVisiable = () => {
      console.log(123)

      //   hide(){
      //     this.canvas.getActiveObject().set('opacity', 0).setCoords();
      //     this.canvas.requestRenderAll()
      // },
      // display(){
      //     this.canvas.getActiveObject().set('opacity', 1).setCoords();
      //     this.canvas.requestRenderAll()
      // },
    }
    return {
      childComponentList,
      dragOptions,
      selectIndex,
      setAvtive,
      layoutMoved,
      setInput,
      selectInputArr,
      resetArr,
      styleNum,
      changeVisiable
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-control {
  border: 1px solid #000;
  min-height: 200px;
}
.layout-item {
  position: relative;
  padding: 4px 8px 4px 40px;
  ::v-deep(.ant-input) {
    padding: 0 !important;
    border: none;
  }
  &:hover .layout-btn {
    display: inline-block;
  }
}
.layer_active {
  background-color: #ccc;
}
.layout-btn {
  position: absolute;
  left: 6px;
  top: 0;
  display: none;
  width: 30px;
  height: 100%;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
</style>
