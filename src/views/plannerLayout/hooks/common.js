import { ref, onMounted } from 'vue'
import { fabric } from 'fabric'

export function canvasConfig(id = 'plannerarea') {
  const option = {
    width: 600, // 画布宽度
    height: 600, // 画布高度
    backgroundColor: '#fff', // 设置画布背景色
    fireRightClick: true, // 启用右键，button的数字为3
    stopContextMenu: false, // 禁止默认右键菜单
    fireMiddleClick: true,
    altSelectionKey: 'altKey',
    preserveObjectStacking: true
  }
  fabric.Object.prototype.cornerStyle = 'circle'
  fabric.Object.prototype.cornerColor = 'dodgerblue'
  fabric.Object.prototype.transparentCorners = false
  fabric.Object.prototype.controls.mtr.cursorStyle = 'crosshair'
  fabric.Canvas.prototype.orderObjects = function (compare) {
    // this._objects.sort(compare)
    console.log(this._objects)
    // this.renderAll()
    return this._objects
  }

  const plannerCanvas = new fabric.Canvas('plannerarea', option)
  var rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 20,
    height: 20
  })
  plannerCanvas.add(rect)
  return {
    plannerCanvas
  }
}
