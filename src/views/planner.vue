<template>
  <div class="planner-box">
    <div class="home">
      <Toolbar @load-from-json="reLoad" />
      <main>
        <section class="left">
          <a-collapse
            v-model:activeKey="activeKey"
            :expand-icon-position="expandIconPosition"
          >
            <a-collapse-panel key="1" header="工具栏">
              <SlideBar />
              <template #extra><setting-outlined /></template>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="图片上传">
              <ComponentList />
              <template #extra><setting-outlined /></template>
            </a-collapse-panel>
          </a-collapse>
        </section>
        <section class="center">
          <div
            class="content"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @mousedown="handleMouseDown"
            @mouseup="deselectCurComponent"
          >
            <planner-area ref="plannerArea"></planner-area>
          </div>
        </section>
        <section class="right">
          <!-- <a-collapse v-model:activeKey="activeKey2">
            <a-collapse-panel key="1" header="待解决事项">
              <ul>
                <li>1.待完善滚轮缩放和页面长度过长时滚动条的冲突问题</li>
                <li>
                  2.重叠元素的选中问题(两种解决方法，1.将选中的暂时置顶，2.禁用其他的元素为不可选中)
                </li>
                <li>
                  3.绘画添加的图层，在图层管理器选中后没有反应,绘画会新建一个图层，要实现在原有的图层上面编辑（用group实现）
                </li>
                <li>
                  4.层级拖动有两种方式，1是根据起始点的index进行moveto，2是将整个canvas重新渲染(目前选择moveto的方法)
                </li>
                <li>5.待优化代码，将fabric的所有配置写入hooks</li>
                <li>
                  8.根据表单字段动态生成对应的表单(schema应该包括两个部分，一部分为表单数据，另一部分用于绑定v-model)
                </li>
                <li>
                  9.表单属性根据每个工具给一个字段，载入时请求拿回之前设置的数据，图层用单独的一个;新建空白图层
                </li>
                <li>
                  10.对画笔参数进行修改双向绑定
                </li>
                <li>
                  11.绘画合并图层后，其他图层的名称改变了
                </li>
              </ul>
            </a-collapse-panel>
          </a-collapse> -->

          <AttrList />
          <LayoutList
            :setActiveObj="plannerArea.setActiveSelect"
            v-if="plannerArea"
          />
          <!-- <AnimationList v-if="curComponent" /> -->

          <!-- <el-tabs v-model="activeName">
            <el-tab-pane label="属性" name="attr">
              <AttrList v-if="curComponent" />
              <p v-else class="placeholder">请选择组件</p>
            </el-tab-pane>
            <el-tab-pane label="动画" name="animation">
              <AnimationList v-if="curComponent" />
              <p v-else class="placeholder">请选择组件</p>
            </el-tab-pane>
            <el-tab-pane label="事件" name="events">
              <EventList v-if="curComponent" />
              <p v-else class="placeholder">请选择组件</p>
            </el-tab-pane>
          </el-tabs> -->
        </section>
      </main>
    </div>
    <a-modal
      ref="modalRef"
      v-model:visible="firstVisible"
      :wrap-style="{ overflow: 'hidden' }"
    >
      <div style="max-height: 300px; overflow-y: auto">
        <p>
          浮动的工具栏目前除了调整画布、导出、撤销前进之外，暂时都不能使用哦！
        </p>
        <p>操作记录最多保留最近的20条！</p>
        <p>基本的操作类似于ps</p>
        <p>...</p>
      </div>
      <template #title>
        <div ref="modalTitleRef" style="width: 100%; cursor: move">
          使用提示
        </div>
      </template>
      <template #footer>
        <a-button key="back" @click="firstVisible = false">知道了！</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ComponentList from './plannerLayout/leftComponents/leftpicture.vue' // 左侧列表组件
import plannerArea from './plannerLayout/area.vue'
import Toolbar from './plannerLayout/toolbox/tool.vue'
import LayoutList from './plannerLayout/rightComponents/layoutList.vue'
import AttrList from './plannerLayout/rightComponents/feature.vue'
import SlideBar from './plannerLayout/leftComponents/toolitem.vue'
import type { CollapseProps } from 'ant-design-vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'planner',
  components: {
    plannerArea,
    Toolbar,
    ComponentList,
    SettingOutlined,
    SlideBar,
    LayoutList,
    AttrList
  },
  setup() {
    const store = useStore()
    const firstVisible = ref(true)
    const activeKey = ref(['1'])
    const plannerArea = ref()
    const activeKey2 = ref(['0'])
    const expandIconPosition = ref<CollapseProps['expandIconPosition']>('right')
    function handleDrop() {
      console.log(11)
    }
    function handleDragOver() {
      console.log(11)
    }
    function handleMouseDown() {
      console.log(11)
    }
    function deselectCurComponent() {
      console.log('deselectCurComponent')
      // store.commit('plannerVuex/changeToolCurrentType', '')
      store.commit('plannerVuex/hideContextMenu')
    }
    const reLoad = () => {
      plannerArea.value.canvasReloadFromJson()
    }
    return {
      handleDrop,
      handleDragOver,
      handleMouseDown,
      deselectCurComponent,
      firstVisible,
      activeKey,
      activeKey2,
      expandIconPosition,
      plannerArea,
      reLoad
    }
  }
})
</script>

<style lang="scss" scoped>
.planner-box {
  position: relative;
}
.home {
  height: calc(100vh - 50px);
  background: #fff;

  main {
    height: 100%;
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 226px;
      left: 0;
      top: 0;
      padding-top: 10px;
      ::v-deep(.ant-collapse-header) {
        padding: 6px 40px 6px 10px !important;
      }
      ::v-deep(.ant-collapse-content-box) {
        padding: 6px !important;
      }
    }

    .right {
      position: absolute;
      height: 100%;
      width: 262px;
      right: 0;
      top: 0;
    }

    .center {
      margin-left: 224px;
      margin-right: 262px;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }
}
</style>
