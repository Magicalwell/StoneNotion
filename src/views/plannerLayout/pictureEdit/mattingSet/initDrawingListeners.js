export function initDrawingListeners(config) {
  const { listenerManager } = config
  const listenerConfig = generateDrawingListenerConfig(config)
  const {
    inputBoardDrawingConfig: { ctx: inputCtx, hiddenCtx: inputHiddenCtx },
    outputBoardDrawingConfig: { hiddenCtx: outputHiddenCtx },
    brushDrawingBaseConfig: { positionRange }
  } = listenerConfig
  const { boardRect, draggingInputBoard } = listenerConfig
  resetPivotalOptions(listenerConfig)
  const drawingListener = generateDrawingListener(listenerConfig)
  let canDrawAndBindListener = false
  listenerManager.initMouseListeners({
    mouseTarget: inputCtx.value.canvas,
    down(ev) {
      canDrawAndBindListener = canDrawAndBindMoveListener({
        ev,
        boardRect,
        positionRange,
        draggingInputBoard
      })
      if (canDrawAndBindListener) {
        drawingListener(ev)
      }
      return canDrawAndBindListener
    },
    move(ev) {
      if (!draggingInputBoard && canDrawAndBindListener) {
        drawingListener(ev)
      }
    },
    up(ev) {
      if (!draggingInputBoard && canDrawAndBindListener) {
        canDrawAndBindListener = false
        drawingListener(ev)
      }
    }
  })
}
/** 生成绘制监听器的配置对象 */
function generateDrawingListenerConfig(config) {
  const {
    imageSources,
    imageSources: { raw, mask },
    initDrawingConfig,
    boardContexts,
    ...restConfig
  } = config
  const {
    inputCtx,
    inputHiddenCtx,
    inputDrawingCtx,
    outputCtx,
    outputHiddenCtx,
    outputDrawingCtx
  } = boardContexts
  const brushDrawingBaseConfig = generateBrushBaseConfig(initDrawingConfig)
  const inputBoardDrawingConfig = {
    ctx: inputCtx,
    hiddenCtx: inputHiddenCtx,
    drawingCtx: inputDrawingCtx,
    mattingSource: mask
  }
  const outputBoardDrawingConfig = {
    ctx: outputCtx,
    hiddenCtx: outputHiddenCtx,
    drawingCtx: outputDrawingCtx,
    mattingSource: raw
  }
  return {
    brushDrawingBaseConfig,
    mattingSources: imageSources,
    inputBoardDrawingConfig,
    outputBoardDrawingConfig,
    ...restConfig
  }
}

/** 重置画板配置对象中关键的选项 */
function resetPivotalOptions(config) {
  const { inputBoardDrawingConfig, outputBoardDrawingConfig } = config
  const {
    mattingSources: { raw, mask },
    isErasing
  } = config
  if (isErasing) {
    inputBoardDrawingConfig.mattingSource = raw
    outputBoardDrawingConfig.hiddenCtx.value.globalCompositeOperation =
      GLOBAL_COMPOSITE_OPERATION_DESTINATION_OUT
  } else {
    inputBoardDrawingConfig.mattingSource = mask
    outputBoardDrawingConfig.hiddenCtx.value.globalCompositeOperation =
      GLOBAL_COMPOSITE_OPERATION_SOURCE_OVER
  }
}

/** 生成画笔的基础配置对象 */
function generateBrushBaseConfig(config) {
  const {
    radius: rawRadius,
    hardness,
    transformConfig: { scaleRatio, positionRange }
  } = config
  const radius = computeRealRadius(rawRadius.value, scaleRatio)
  const stepBase = computeStepBase(radius)
  const step = computeStep(radius)
  return {
    radius,
    step,
    stepBase,
    scaleRatio,
    positionRange,
    hardness: hardness.value
  }
}
function generateDrawingListener(config) {
  const {
    brushDrawingBaseConfig,
    brushDrawingBaseConfig: { step, scaleRatio, positionRange },
    boardRect: { left, top }
  } = config
  const { inputBoardDrawingConfig, outputBoardDrawingConfig, isErasing } =
    config
  let totalMovement = 0
  return (ev) => {
    const positionAndMovements = computePositionAndMovements({
      ev,
      scaleRatio,
      positionRange,
      left,
      top
    })
    const { movementX, movementY } = positionAndMovements
    const commonPointConfig = {
      ...brushDrawingBaseConfig,
      ...positionAndMovements
    }
    totalMovement += getRawDistance(movementX, movementY)
    if (canDrawing(totalMovement, step, ev.type)) {
      totalMovement = 0
      executeMattingDrawing([
        { ...commonPointConfig, ...inputBoardDrawingConfig },
        { ...commonPointConfig, ...outputBoardDrawingConfig, isErasing }
      ])
    }
  }
}
function canDrawAndBindMoveListener(canDrawAndBindConfig) {
  const { ev, boardRect, positionRange, draggingInputBoard } =
    canDrawAndBindConfig
  const { pageX, pageY } = ev
  const { left, top } = boardRect
  const { minX, maxX, minY, maxY } = positionRange
  //   const x = transformHelpers.computePivot(pageX, left)
  //   const y = transformHelpers.computePivot(pageY, top)
  //   const inImageRange = isInImageRange({ x, y, minX, maxX, minY, maxY })
  const inImageRange = true

  return inImageRange && !draggingInputBoard
}
function computePositionAndMovements(config) {
  const { ev, scaleRatio, positionRange, left, top } = config
  const { minX, minY } = positionRange
  const { movementX, movementY, pageX, pageY } = ev
  const realPosition = computeRealPosition({
    pageX,
    pageY,
    left,
    top,
    minX,
    minY,
    scaleRatio
  })
  const realMovements = computeRealMovements(
    { movementX, movementY },
    scaleRatio
  )
  return { ...realPosition, ...realMovements }
}
