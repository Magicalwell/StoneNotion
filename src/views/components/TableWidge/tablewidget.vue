<template>
  <div
    style="display: flex; margin-top: 10px"
    @mousemove="moveCol($event)"
    @mouseup="cancelDragCol()"
  >
    <div
      style="position: relative"
      @mouseleave="
        addBottomTable = false;
        addColTable = false
      "
    >
      <table border="1" class="table-widgets-box" draggable="false">
        <colgroup>
          <col
            v-for="(item, column) in selfData.children[0].children"
            :key="column"
            style="width: 100px"
            span="1"
          />
        </colgroup>
        <tr
          v-for="(out, index) in selfData.children"
          :key="index"
          class="cell-row"
          @mouseenter="showBottomAdd(index, selfData.children.length)"
        >
          <td
            v-for="(inner, index1) in out.children"
            :key="index1"
            class="cell"
            :class="{
              'col-hover': index1 === colNum,
              'cancel-border-right': index1 === out.children.length - 1
            }"
            :style="{
              maxWidth: inner.width + 'px',
              minWidth: inner.width + 'px'
            }"
            @mouseenter="showColAdd(index1, out.children.length)"
          >
            <!-- <div
              class="col-line"
              v-if="index1 !== out.children.length - 1"
              @mouseover="setHoverCol(index, index1, $event)"
              @mousedown="dragCol($event)"
              @mouseleave="resetHoverCol"
              @mousemove="moveCol($event)"
            ></div> -->
            <div
              class="col-line"
              @mouseover="setHoverCol(index, index1, $event)"
              @mousedown="dragCol($event, inner)"
              @mouseleave="resetHoverCol"
            ></div>

            <text-widget v-model="inner.rich_text" :shortOrderValied="false" />
          </td>
          <div
            class="row-line"
            v-if="index !== selfData.children.length - 1"
          ></div>
        </tr>
      </table>
      <div
        class="add-tablebtn-bottom add-btn"
        v-if="addBottomTable"
        @click="handleAdd(0)"
      >
        <plus-outlined />
      </div>
      <div
        class="add-tablebtn-right add-btn"
        v-if="addColTable"
        @click="handleAdd(1)"
      >
        <plus-outlined />
      </div>
      <div
        v-if="addBottomTable && addColTable"
        class="add-btn add-tablebtn-both"
        @click="handleAdd(2)"
      >
        <plus-outlined />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, ref } from 'vue'
import TextWidget from './textwidge.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
// import NestedEditor from '../../editor/elementBox/NestedEditor.vue'
export default defineComponent({
  inheritAttrs: false,
  name: 'st-table',
  props: {
    editorItem: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    TextWidget,
    PlusOutlined
  },
  setup(props) {
    const { editorItem: selfData } = toRefs(props)
    // 列和行的数量可以添加到数据结构的data里面
    // let colList = computed(() => {
    //   // 计算属性初始化加10
    //   return selfData.children[0]
    // })
    // const colList = computed(() => {
    //   // 计算属性初始化加10
    //   return props.editorItem.children[0]
    // })
    const colNum = ref(-1) // 列的index
    const rowNum = ref(-1) // 行的index
    const dragStatus = ref(false)
    const itemRef = ref()
    const itemWidthLabel = ref() // 列的初始宽度
    const mousePosition = ref() // 保留鼠标点击的位置
    const addBottomTable = ref(false)
    const addColTable = ref(false)
    function showBottomAdd(index, indexLength) {
      if (index === indexLength - 1 && !addBottomTable.value) {
        addBottomTable.value = true
      }
      if (index !== indexLength - 1) {
        addBottomTable.value = false
      }
    }
    function showColAdd(index, indexLength) {
      if (index === indexLength - 1 && !addColTable.value) {
        addColTable.value = true
      }
      if (index !== indexLength - 1) {
        addColTable.value = false
      }
    }
    // const colRef = (el) => {
    //   itemRef.value.push(el)
    // }

    function setHoverCol(val1, val2, event) {
      colNum.value = val2
    }
    function setHoverRow(val) {
      rowNum.value = val
    }
    function resetHoverCol() {
      colNum.value = -1
    }
    function resetHoverRow() {
      rowNum.value = -1
    }
    function dragCol(event, item) {
      mousePosition.value = event.clientX
      itemRef.value = item

      itemWidthLabel.value = item.width
      dragStatus.value = true
    }
    function cancelDragCol() {
      dragStatus.value = false
    }
    function moveCol(event) {
      if (dragStatus.value) {
        itemRef.value.width =
          itemWidthLabel.value + (event.pageX - mousePosition.value) >= 100
            ? itemWidthLabel.value + (event.pageX - mousePosition.value)
            : 100
      }
    }
    function handleAdd(flag) {
      if (flag === 0) {
        const childrenRow = JSON.parse(
          JSON.stringify(selfData.value.children[0].children)
        )
        selfData.value.children.push({
          children: childrenRow.map((item) => {
            item.rich_text = ''
            return item
          })
        })
      } else if (flag === 1) {
        selfData.value.children.forEach((element) => {
          const tempCol = JSON.parse(JSON.stringify(element.children)).pop()
          tempCol.rich_text = ''
          tempCol.width = 100
          element.children.push(tempCol)
        })
      } else {
        handleAdd(0)
        handleAdd(1)
      }
    }
    return {
      selfData,
      setHoverCol,
      colNum,
      resetHoverCol,
      rowNum,
      setHoverRow,
      resetHoverRow,
      dragCol,
      cancelDragCol,
      moveCol,
      dragStatus,
      addBottomTable,
      showBottomAdd,
      addColTable,
      showColAdd,
      handleAdd
    }
  }
})
</script>

<style lang="scss" scoped>
.table-widgets-box {
  position: relative;
  table-layout: fixed;
  word-break: break-all;
  border-collapse: collapse;
  -moz-user-select: -moz-none;

  -moz-user-select: none;

  -o-user-select: none;

  -khtml-user-select: none;

  -webkit-user-select: none;

  -ms-user-select: none;

  user-select: none;
  margin-bottom: 30px;
  margin-right: 30px;
  border-right: 1px solid rgb(233, 233, 231);
}
.add-btn {
  position: absolute;
  background-color: rgba(55, 53, 47, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}
.add-tablebtn-bottom {
  width: calc(100% - 30px);
  height: 20px;
  bottom: 2px;
  border-radius: 6px;
}
.add-tablebtn-right {
  width: 20px;
  right: 0px;
  top: 0;
  bottom: 30px;
  border-radius: 6px;
}
.add-tablebtn-both {
  right: 0;
  bottom: 2px;
  width: 20px;
  height: 20px;
  border-radius: 20px;
}
.cell-row {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: top;
  will-change: width, max-width;
  .cancel-border-right {
    border-right: 0;
  }
}
.row-line {
  height: 4px;
  position: absolute;
  bottom: -2px;
  left: -1px;
  width: calc(100% + 2px);
  background-color: transparent;
}
.cell {
  position: relative;
  padding: 7px 0;
  min-width: 30px;
  border: 1px solid rgb(233, 233, 231);
}
.col-line {
  z-index: 999;
  width: 6px;
  height: calc(100% + 4px);
  position: absolute;
  right: -3px;
  top: -2px;
  background-color: transparent;
  cursor: w-resize;
  padding: 0 1px;
  transition: all 0.2s ease;
  border-radius: 3px;
}
.col-hover .col-line {
  background-color: rgb(116, 182, 219);
}
.column1 {
  background-color: red;
}
</style>
