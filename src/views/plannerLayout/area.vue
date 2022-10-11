<template>
  <div
    class="plannerarea"
    @contextmenu="handleContextMenu"
    style="width: 1200px"
  >
    <div class="area-container">
      <Grid
        :width="parseInt(canvasStyleData.planerWidth)"
        :height="parseInt(canvasStyleData.planerHeight)"
      />
      <canvas
        id="plannerarea"
        :width="canvasStyleData.planerWidth"
        :height="canvasStyleData.planerHeight"
        :style="{
          width: canvasStyleData.planerWidth + 'px',
          height: canvasStyleData.planerHeight + 'px'
        }"
        class="area"
      ></canvas>
    </div>

    <!-- https://blog.csdn.net/weixin_31222161/article/details/117763012   抠图 -->
    <!-- https://woai3c.github.io/visual-drag-demo/#/  参考 -->
    <!-- https://blog.csdn.net/daicooper/article/details/79800718 -->
    <!-- 由于图片比较大，转为base64的时候需要事件，此间不能点击 -->
    <!-- 考虑将拖拽加入home中 -->
    <ContextMenu :copy="copyHandle" :paste="pasteHandle" />
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  computed,
  watch,
  ref,
  reactive,
  onUnmounted
} from 'vue'
import { useStore } from 'vuex'
import { fabric } from 'fabric'
import Grid from './grid.vue'
import ContextMenu from './editor/contentText.vue'
import { canvasConfig } from './hooks/common'
import initAligningGuidelines from './hooks/line'
import usePainting from './hooks/painting'
export default defineComponent({
  name: 'planner',
  components: {
    Grid,
    ContextMenu
  },
  setup(props, { expose }) {
    const store = useStore()
    const canvasStyleData = computed(
      () => store.state.plannerVuex.canvasStyleData
    )

    const saveFlag = computed(() => store.state.plannerVuex.saveFlag)
    const ImgFlag = computed(() => store.state.plannerVuex.addImageData)
    // fabric配置属性
    const option = {
      width: canvasStyleData.value.planerWidth, // 画布宽度
      height: canvasStyleData.value.planerHeight, // 画布高度
      backgroundColor: '#fff', // 设置画布背景色
      fireRightClick: true, // 启用右键，button的数字为3
      stopContextMenu: false, // 禁止默认右键菜单
      fireMiddleClick: true,
      altSelectionKey: 'altKey',
      isDrawingMode: false
      // preserveObjectStacking: true
    }
    let plannerCanvas = reactive({}) // canvas实例
    let chooseList = [] // 选中的元素list
    const areaMoving = ref(false) // 拖动的标志位
    const copyData = ref([])
    function exportImg() {
      plannerCanvas.setZoom(1)
      plannerCanvas.absolutePan({ x: 0, y: 0 })
      const dataURL = plannerCanvas.toDataURL({
        width: plannerCanvas.width,
        height: plannerCanvas.height,
        left: 0,
        top: 0,
        format: 'jpg',
        quality: 0.8
      })
      const link = document.createElement('a')
      link.download = 'canvas.jpg'
      link.href = dataURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
    const handleContextMenu = (e) => {
      e.stopPropagation()
      e.preventDefault()
      chooseList = plannerCanvas.getActiveObjects()
      // 计算菜单相对于编辑器的位移
      let target = e.target
      let top = e.offsetY
      let left = e.offsetX

      while (!target.className.includes('area-container')) {
        if (target.parentNode.className.includes('area-container')) break
        target = target.parentNode
      }
      while (!target.className.includes('area-container')) {
        left += target.offsetLeft
        top += target.offsetTop
        target = target.parentNode
      }
      if (chooseList.length > 0 || Object.keys(copyData.value).length > 0) {
        store.commit('plannerVuex/showContextMenu', { top, left })
      }
    }
    const canvasOnMouseDown = (opt) => {
      // canvas的事件要优先于plannerarea的contextmenu事件
      // 鼠标事件触发的顺序：优先是mouse系列的事件，接着才是具体的click，或contextmenu
      console.log(plannerCanvas.getObjects())
      const matchArr = plannerCanvas.getObjects()
      const chooseList = plannerCanvas.getActiveObjects()
      if (
        opt.target &&
        store.state.plannerVuex.toolBox.currentType !== 'pencil-input'
      ) {
        store.commit(
          'plannerVuex/changeLayoutId',
          matchArr.findIndex((item) => item.id === opt.target.id)
        )
        store.commit(
          'plannerVuex/setPaintAimedLayout',
          matchArr.length -
            1 -
            matchArr.findIndex((item) => item.id === opt.target.id)
        )
      } else if (
        store.state.plannerVuex.toolBox.currentType !== 'pencil-input'
      ) {
        store.commit('plannerVuex/changeLayoutId', -1)
        store.commit('plannerVuex/setPaintAimedLayout', -1)
      }
      // var canvasJsonData = JSON.stringify(plannerCanvas.toJSON())
      if (opt.button === 2) {
        areaMoving.value = true
        plannerCanvas.selection = false
      }
      if (
        opt.button === 1 &&
        store.state.plannerVuex.toolBox.currentType === 'text-input'
      ) {
        const text = new fabric.Textbox('', {
          selectionColor: 'rgba(0,0,0,0.5)',
          width: 100,
          left: opt.pointer.x,
          top: opt.pointer.y,
          fontSize: 16,
          lineHeight: 1,
          lockScalingFlip: true, // 禁止负值反转
          splitByGrapheme: true // 拆分中文，可以实现自动换行
        })

        // Render the Textbox in canvas
        plannerCanvas.add(text)
        text.enterEditing()
        text.hiddenTextarea.focus()
      }

      if (opt.button === 3) {
        if (chooseList.length === 0 && opt.target) {
          plannerCanvas.setActiveObject(opt.target)
        }
        if (chooseList.length === 1 && opt.target) {
          plannerCanvas.discardActiveObject()
          plannerCanvas.setActiveObject(opt.target)
        }
        plannerCanvas.renderAll()
        // plannerCanvas.setActiveObject(opt.target, true)
      }
    }
    const addToCanvasByUrl = (canvas, data) => {
      fabric.Image.fromURL(data, (img) => {
        // img.set(Image.defaultImage(canvas, img))
        canvas.add(img)
        img.center()
        // img.sendBackwards()
      })
    }
    const canvasChangeCallback = (e) => {
      console.log('it changed!!!')
      store.commit(
        'plannerVuex/pushHistory',
        JSON.stringify(plannerCanvas.toJSON())
      )
      // store.commit(
      //   'plannerVuex/changeLayoutContainerArr',
      //   plannerCanvas.getObjects()
      // )
    }
    const canvasReloadFromJson = () => {
      console.log('gogogo')
      plannerCanvas.loadFromJSON(
        store.state.plannerVuex.canvasHistory[
          store.state.plannerVuex.canvasHistory.length - 1
        ]
      )
      plannerCanvas.renderAll()
    }
    const canvasRemoveCallback = (e) => {
      store.commit('plannerVuex/removeDragList', e.target.id)
    }
    const setActiveSelect = (order) => {
      return new Promise((resolve) => {
        plannerCanvas.forEachObject((item) => {
          item.canvasBypaint = false
        })
        const objs = plannerCanvas.getObjects().filter((e) => {
          return e && e.id === order
        })
        if (objs && objs.length > 0) {
          plannerCanvas.setActiveObject(objs[0])
          objs[0].canvasBypaint = true
          console.log(objs[0])
          plannerCanvas.renderAll()
          resolve()
        } else {
        }
      })
    }

    const middleDbclick = ref(null)
    const copyHandle = () => {
      plannerCanvas.getActiveObject().clone(function (cloned) {
        copyData.value = cloned
      })
    }
    const pasteHandle = () => {
      // clone again, so you can do multiple copies.
      copyData.value.clone(function (clonedObj) {
        plannerCanvas.discardActiveObject()
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true
        })
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = plannerCanvas
          clonedObj.forEachObject(function (obj) {
            plannerCanvas.add(obj)
          })
          // this should solve the unselectability
          clonedObj.setCoords()
        } else {
          plannerCanvas.add(clonedObj)
        }
        copyData.value.top += 10
        copyData.value.left += 10
        plannerCanvas.setActiveObject(clonedObj)
        plannerCanvas.requestRenderAll()
      })
    }
    expose({ setActiveSelect, canvasReloadFromJson })
    watch(
      () => saveFlag.value.saveStatus,
      (item) => {
        if (item) {
          exportImg()
        }
      }
    )
    watch(
      () => ImgFlag.value.flag,
      (item) => {
        if (item) {
          addToCanvasByUrl(plannerCanvas, ImgFlag.value.data)
        }
      }
    )
    // _objects
    watch(
      () => canvasStyleData.value,
      (item) => {
        plannerCanvas.setHeight(item.planerHeight)
        plannerCanvas.setWidth(item.planerWidth)
      },
      { deep: true }
    )
    watch(
      () => store.state.plannerVuex.canvasEvent.type,
      (item) => {
        if (item) {
          chooseList.forEach((val) => {
            plannerCanvas[item](val)
          })
        }
      },
      { deep: true }
    )
    watch(
      () => store.state.plannerVuex.layoutDragData,
      (item) => {
        const objs = plannerCanvas.getObjects()
        plannerCanvas.moveTo(objs[item.oldIndex], item.newIndex)
        canvasChangeCallback()
      },
      { deep: true }
    )
    onMounted(() => {
      // init()
      fabric.Object.prototype.cornerStyle = 'circle'
      fabric.Object.prototype.cornerColor = 'dodgerblue'
      fabric.Object.prototype.transparentCorners = false
      fabric.Object.prototype.controls.mtr.cursorStyle = 'crosshair'
      fabric.Canvas.prototype.orderObjects = function (compare) {
        // this._objects.sort(compare)
        // this.renderAll()
        return this._objects
      }
      plannerCanvas = new fabric.Canvas('plannerarea', option)
      usePainting({ plannerCanvas, setActiveSelect }) // 自由绘画功能
      initAligningGuidelines({ plannerCanvas }) // 辅助线功能
      var rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 20,
        height: 20
      })
      var rect1 = new fabric.Rect({
        left: 200,
        top: 200,
        fill: 'blue',
        width: 20,
        height: 20
      })
      // var test3 = new fabric.Object({ canvasBypaint: true })
      const group = new fabric.Group([rect, rect1], {
        top: 50, // 整组距离顶部100
        left: 100, // 整组距离左侧100
        angle: -10 // 整组旋转-10deg
      })
      // 先删除之前的，再建立group
      plannerCanvas.add(group)
      // plannerCanvas.add(test3)
      const tempList = plannerCanvas.getObjects()
      tempList.forEach((element, index) => {
        element.id = index
        element.layoutName = `图层${index}`
      })
      store.commit('plannerVuex/changeLayoutContainerArr', tempList)
      plannerCanvas.on('mouse:down', canvasOnMouseDown)
      plannerCanvas.on('mouse:up', function (e) {
        if (
          e.button === 1 &&
          store.state.plannerVuex.toolBox.currentType === 'text-input'
        ) {
          store.commit('plannerVuex/changeToolCurrentType', '') // 重置工具栏的选中状态
        }
        if (e.button === 2) {
          plannerCanvas.defaultCursor = 'default'
          areaMoving.value = false
          plannerCanvas.selection = true
          if (middleDbclick.value) {
            // 通过定时器实现鼠标中键双击
            clearTimeout(middleDbclick.value)
            middleDbclick.value = null
            plannerCanvas.setZoom(1)
            plannerCanvas.absolutePan({ x: 0, y: 0 })
            plannerCanvas.renderAll()
          }

          middleDbclick.value = setTimeout(() => {
            clearTimeout(middleDbclick.value)
            middleDbclick.value = null
          }, 300)
        }
      })
      // 移动画布事件
      plannerCanvas.on('mouse:move', function (e) {
        if (areaMoving.value && e && e.e) {
          plannerCanvas.defaultCursor = 'move'
          var delta = new fabric.Point(e.e.movementX, e.e.movementY)
          plannerCanvas.relativePan(delta)
        }
      })
      plannerCanvas.on('object:added', function (e) {
        if (e && e.target) {
          store.commit('plannerVuex/addLayoutContainerArr', e.target)
        }
      })
      plannerCanvas.on('object:removed', canvasRemoveCallback)
      plannerCanvas.on('object:modified', canvasChangeCallback)
      // plannerCanvas.on('selection:created', () => {
      //   console.log('//////')
      // })
      // plannerCanvas.on('path:created', (e) => {
      //   console.log(e)
      // })
      // 鼠标滚动画布放大缩小 mouse:dblclick
      plannerCanvas.on('mouse:wheel', function (e) {
        var zoom = (e.e.deltaY > 0 ? -0.1 : 0.1) + plannerCanvas.getZoom()
        zoom = Math.max(0.1, zoom)
        zoom = Math.min(3, zoom)
        var zoomPoint = new fabric.Point(e.pointer.x, e.pointer.y)
        plannerCanvas.zoomToPoint(zoomPoint, zoom)
      })
    })
    onUnmounted(() => {
      console.log('destory')
    })
    return {
      handleContextMenu,
      canvasStyleData,
      plannerCanvas,
      setActiveSelect,
      copyHandle,
      pasteHandle,
      canvasReloadFromJson
    }
  }
})
</script>

<style lang="scss" scoped>
.plannerarea {
  position: relative;
  margin: 0 auto;
  height: 100%;
  overflow-y: auto;
  .lock {
    &:hover {
      cursor: not-allowed;
    }
  }
  ::v-deep(.canvas-container) {
    margin: 0 auto;
  }
  .area-container {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 100%;
    width: 100%;
    overflow: hidden;
    transform: translate(-50%, -50%);
    // background: #fff;
    text-align: center;
  }
}
</style>
