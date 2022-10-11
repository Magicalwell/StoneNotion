<template>
  <div
    v-show="menuState.menuShow"
    class="contextmenu"
    :style="{ top: menuState.menuTop + 'px', left: menuState.menuLeft + 'px' }"
  >
    <div class="btn-container">
      <a-button
        type="primary"
        ghost
        @mouseup="eventHandle($event, 'bringForward')"
        @mousedown="stopEvent"
        class="mouse-btn"
        >图层上移</a-button
      >
      <a-button
        type="primary"
        ghost
        @mouseup="eventHandle($event, 'sendBackwards')"
        @mousedown="stopEvent"
        class="mouse-btn"
        >图层下移</a-button
      >
      <a-button
        type="primary"
        ghost
        @mouseup="eventHandle($event, 'bringToFront')"
        @mousedown="stopEvent"
        class="mouse-btn"
        >置顶</a-button
      >
      <a-button
        type="primary"
        ghost
        @mouseup="eventHandle($event, 'sendToBack')"
        @mousedown="stopEvent"
        class="mouse-btn"
        >置底</a-button
      >
      <a-button type="primary" ghost @click="copy" class="mouse-btn"
        >复制</a-button
      >
      <a-button type="primary" ghost @click="paste" class="mouse-btn"
        >粘贴</a-button
      >
      <a-button
        type="primary"
        ghost
        @mouseup="eventHandle($event, 'remove')"
        @mousedown="stopEvent"
        class="mouse-btn"
        >删除</a-button
      >
    </div>

    <!-- <ul @mouseup="handleMouseUp">
      <template v-if="curComponent">
        <template v-if="!curComponent.isLock">
          <li @click="copy">复制</li>
          <li @click="paste">粘贴</li>
          <li @click="cut">剪切</li>
          <li @click="deleteComponent">删除</li>
          <li @click="lock">锁定</li>
          <li @click="topComponent">置顶</li>
          <li @click="bottomComponent">置底</li>
          <li @click="upComponent">上移</li>
          <li @click="downComponent">下移</li>
        </template>
        <li v-else @click="unlock">解锁</li>
      </template>
      <li v-else @click="paste">粘贴</li>
    </ul> -->
  </div>
</template>

<script>
import { computed, defineComponent, nextTick } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    copy: {
      type: Function,
      required: true
    },
    paste: {
      type: Function,
      required: true
    }
  },
  name: 'tool',

  setup() {
    const store = useStore()
    const menuState = computed(() => store.state.plannerVuex.rightMenu)
    const stopEvent = (e) => {
      e.stopPropagation()
    }
    const eventHandle = (e, type) => {
      e.stopPropagation()
      store.commit('plannerVuex/emitCanvasEvent', type)
      nextTick(() => {
        store.commit('plannerVuex/resetCanvasEvent')
        store.commit('plannerVuex/hideContextMenu')
      })
    }
    // 595×842
    return { menuState, stopEvent, eventHandle }
  }
})
</script>

<style lang="scss" scoped>
.contextmenu {
  position: absolute;
  z-index: 1000;
  // ul {
  //   border: 1px solid #e4e7ed;
  //   border-radius: 4px;
  //   background-color: #fff;
  //   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  //   box-sizing: border-box;
  //   margin: 5px 0;
  //   padding: 6px 0;

  //   li {
  //     font-size: 14px;
  //     padding: 0 20px;
  //     position: relative;
  //     white-space: nowrap;
  //     overflow: hidden;
  //     text-overflow: ellipsis;
  //     color: #606266;
  //     height: 34px;
  //     line-height: 34px;
  //     box-sizing: border-box;
  //     cursor: pointer;

  //     &:hover {
  //       background-color: #f5f7fa;
  //     }
  //   }
  // }
  .btn-container {
    display: flex;
    flex-direction: column;
    border: 1px solid #1890ff;
    padding: 2px;
  }
  .mouse-btn {
    margin: 1px 0;
  }
}
</style>
