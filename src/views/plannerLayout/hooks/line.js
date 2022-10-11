import { fabric } from 'fabric'
function initAligningGuidelines({ plannerCanvas: canvas }) {
  var ctx = canvas.getSelectionContext()
  var aligningLineOffset = 1
  var aligningLineMargin = 1
  var aligningLineWidth = 2
  var aligningLineColor = 'rgb(24,144,255)'
  var viewportTransform
  var zoom = 1

  function drawVerticalLine(coords) {
    drawLine(
      coords.x + 0.5,
      coords.y1 > coords.y2 ? coords.y2 : coords.y1,
      coords.x + 0.5,
      coords.y2 > coords.y1 ? coords.y2 : coords.y1
    )
  }

  function drawHorizontalLine(coords) {
    drawLine(
      coords.x1 > coords.x2 ? coords.x2 : coords.x1,
      coords.y + 0.5,
      coords.x2 > coords.x1 ? coords.x2 : coords.x1,
      coords.y + 0.5
    )
  }

  function drawLine(x1, y1, x2, y2) {
    ctx.save()
    ctx.lineWidth = aligningLineWidth
    ctx.strokeStyle = aligningLineColor
    ctx.beginPath()
    // 此处要先用坐标点乘缩放倍数，再减去viewport的偏差值
    ctx.moveTo(
      x1 * zoom + viewportTransform[4],
      y1 * zoom + viewportTransform[5]
    )
    ctx.lineTo(
      x2 * zoom + viewportTransform[4],
      y2 * zoom + viewportTransform[5]
    )
    ctx.stroke()
    ctx.restore()
  }

  function isInRange(value1, value2) {
    value1 = Math.round(value1)
    value2 = Math.round(value2)
    for (
      var i = value1 - aligningLineMargin, len = value1 + aligningLineMargin;
      i <= len;
      i++
    ) {
      if (i === value2) {
        return true
      }
    }
    return false
  }

  var verticalLines = []
  var horizontalLines = []

  canvas.on('mouse:down', function () {
    viewportTransform = canvas.viewportTransform
    zoom = canvas.getZoom()
  })
  canvas.on('mouse:wheel', function () {
    // ctx = canvas.getSelectionContext()
    zoom = canvas.getZoom()
  })
  canvas.on('object:moving', function (e) {
    var activeObject = e.target
    var canvasObjects = canvas.getObjects()
    var activeObjectCenter = activeObject.getCenterPoint()
    var activeObjectLeft = activeObjectCenter.x
    var activeObjectTop = activeObjectCenter.y
    var activeObjectBoundingRect = activeObject.getBoundingRect()
    var activeObjectHeight =
      activeObjectBoundingRect.height / viewportTransform[3]
    var activeObjectWidth =
      activeObjectBoundingRect.width / viewportTransform[0]
    var horizontalInTheRange = false
    var verticalInTheRange = false
    var transform = canvas._currentTransform

    if (!transform) return

    // It should be trivial to DRY this up by encapsulating (repeating) creation of x1, x2, y1, and y2 into functions,
    // but we're not doing it here for perf. reasons -- as this a function that's invoked on every mouse move

    for (var i = canvasObjects.length; i--; i <= 0) {
      if (canvasObjects[i] === activeObject) continue

      var objectCenter = canvasObjects[i].getCenterPoint()
      var objectLeft = objectCenter.x
      var objectTop = objectCenter.y
      var objectBoundingRect = canvasObjects[i].getBoundingRect()
      var objectHeight = objectBoundingRect.height / viewportTransform[3]
      var objectWidth = objectBoundingRect.width / viewportTransform[0]

      // snap by the horizontal center line
      if (isInRange(objectLeft, activeObjectLeft)) {
        verticalInTheRange = true
        verticalLines.push({
          x: objectLeft,
          y1:
            objectTop < activeObjectTop
              ? objectTop - objectHeight / 2 - aligningLineOffset
              : objectTop + objectHeight / 2 + aligningLineOffset,
          y2:
            activeObjectTop > objectTop
              ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset
              : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset
        })
        const tempPostiton = new fabric.Point(objectLeft, activeObjectTop)
        activeObject.setPositionByOrigin(tempPostiton, 'center', 'center')
      }

      // snap by the left edge
      if (
        isInRange(
          objectLeft - objectWidth / 2,
          activeObjectLeft - activeObjectWidth / 2
        )
      ) {
        verticalInTheRange = true
        verticalLines.push({
          x: objectLeft - objectWidth / 2,
          y1:
            objectTop < activeObjectTop
              ? objectTop - objectHeight / 2 - aligningLineOffset
              : objectTop + objectHeight / 2 + aligningLineOffset,
          y2:
            activeObjectTop > objectTop
              ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset
              : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset
        })
        activeObject.setPositionByOrigin(
          new fabric.Point(
            objectLeft - objectWidth / 2 + activeObjectWidth / 2,
            activeObjectTop
          ),
          'center',
          'center'
        )
      }

      // snap by the right edge
      if (
        isInRange(
          objectLeft + objectWidth / 2,
          activeObjectLeft + activeObjectWidth / 2
        )
      ) {
        verticalInTheRange = true
        verticalLines.push({
          x: objectLeft + objectWidth / 2,
          y1:
            objectTop < activeObjectTop
              ? objectTop - objectHeight / 2 - aligningLineOffset
              : objectTop + objectHeight / 2 + aligningLineOffset,
          y2:
            activeObjectTop > objectTop
              ? activeObjectTop + activeObjectHeight / 2 + aligningLineOffset
              : activeObjectTop - activeObjectHeight / 2 - aligningLineOffset
        })
        activeObject.setPositionByOrigin(
          new fabric.Point(
            objectLeft + objectWidth / 2 - activeObjectWidth / 2,
            activeObjectTop
          ),
          'center',
          'center'
        )
      }

      // snap by the vertical center line
      if (isInRange(objectTop, activeObjectTop)) {
        horizontalInTheRange = true
        horizontalLines.push({
          y: objectTop,
          x1:
            objectLeft < activeObjectLeft
              ? objectLeft - objectWidth / 2 - aligningLineOffset
              : objectLeft + objectWidth / 2 + aligningLineOffset,
          x2:
            activeObjectLeft > objectLeft
              ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset
              : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset
        })
        activeObject.setPositionByOrigin(
          new fabric.Point(activeObjectLeft, objectTop),
          'center',
          'center'
        )
      }

      // snap by the top edge
      if (
        isInRange(
          objectTop - objectHeight / 2,
          activeObjectTop - activeObjectHeight / 2
        )
      ) {
        horizontalInTheRange = true
        horizontalLines.push({
          y: objectTop - objectHeight / 2,
          x1:
            objectLeft < activeObjectLeft
              ? objectLeft - objectWidth / 2 - aligningLineOffset
              : objectLeft + objectWidth / 2 + aligningLineOffset,
          x2:
            activeObjectLeft > objectLeft
              ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset
              : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset
        })
        activeObject.setPositionByOrigin(
          new fabric.Point(
            activeObjectLeft,
            objectTop - objectHeight / 2 + activeObjectHeight / 2
          ),
          'center',
          'center'
        )
      }

      // snap by the bottom edge
      if (
        isInRange(
          objectTop + objectHeight / 2,
          activeObjectTop + activeObjectHeight / 2
        )
      ) {
        horizontalInTheRange = true
        horizontalLines.push({
          y: objectTop + objectHeight / 2,
          x1:
            objectLeft < activeObjectLeft
              ? objectLeft - objectWidth / 2 - aligningLineOffset
              : objectLeft + objectWidth / 2 + aligningLineOffset,
          x2:
            activeObjectLeft > objectLeft
              ? activeObjectLeft + activeObjectWidth / 2 + aligningLineOffset
              : activeObjectLeft - activeObjectWidth / 2 - aligningLineOffset
        })
        activeObject.setPositionByOrigin(
          new fabric.Point(
            activeObjectLeft,
            objectTop + objectHeight / 2 - activeObjectHeight / 2
          ),
          'center',
          'center'
        )
      }
    }

    if (!horizontalInTheRange) {
      horizontalLines.length = 0
    }

    if (!verticalInTheRange) {
      verticalLines.length = 0
    }
  })

  canvas.on('before:render', function () {
    canvas.clearContext(ctx)
  })

  canvas.on('after:render', function () {
    for (let i = verticalLines.length; i--; i <= 0) {
      drawVerticalLine(verticalLines[i])
    }
    for (let i = horizontalLines.length; i--; i <= 0) {
      drawHorizontalLine(horizontalLines[i])
    }

    verticalLines.length = horizontalLines.length = 0
  })

  canvas.on('mouse:up', function () {
    verticalLines.length = horizontalLines.length = 0
    canvas.renderAll()
  })
}

export default initAligningGuidelines
