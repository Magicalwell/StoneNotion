export function computeBoardRectSize(inputBoardRect, domRect) {
  const { width, height, left: boardLeft, top: boardTop } = inputBoardRect
  const { left: domLeft, top: domTop } = domRect
  const left = boardLeft - domLeft
  const top = boardTop - domTop
  return { left, top, width, height }
}
export function computeBoardRect(canvas) {
  const inputBoardRect = canvas.getBoundingClientRect()
  const domRect = document.documentElement.getBoundingClientRect()
  return computeBoardRectSize(inputBoardRect, domRect)
}
export function computeValidImageSize(imageSource) {
  let { width, height } = imageSource
  const imageScaleRatio = computeScaleRatio({
    imageSize: { width, height },
    gapSize: { horizontal: 0, vertical: 0 },
    targetSize: { width: 2000, height: 2000 }
  })
  width *= imageScaleRatio
  height *= imageScaleRatio
  return { width, height }
}
export function computeScaleRatio(transformParametersConfig) {
  const { imageSize, gapSize, targetSize } = transformParametersConfig
  const drawingAreaSize = getDrawingAreaSize(targetSize, gapSize)
  return Math.min(
    Math.min(
      drawingAreaSize.width / imageSize.width,
      drawingAreaSize.height / imageSize.height
    ),
    1
  )
}
export function getDrawingAreaSize(boardSize, gapSize) {
  return {
    width: boardSize.width - gapSize.horizontal * 2,
    height: boardSize.height - gapSize.vertical * 2
  }
}
export function computeTransformParameters(transformParametersConfig) {
  const scaleRatio = computeScaleRatio(transformParametersConfig)
  const positionRange = computePositionRange(
    transformParametersConfig,
    scaleRatio
  )
  return { scaleRatio, positionRange }
}
function computePositionRange(transformParametersConfig, scaleRatio) {
  const scaledImageSize = computeScaledImageSize(
    transformParametersConfig.imageSize,
    scaleRatio
  )
  return {
    minX: getPositionRangeMinX(transformParametersConfig, scaledImageSize),
    maxX: getPositionRangeMaxX(transformParametersConfig, scaledImageSize),
    minY: getPositionRangeMinY(transformParametersConfig, scaledImageSize),
    maxY: getPositionRangeMaxY(transformParametersConfig, scaledImageSize)
  }
}
function getPositionRangeMinX(transformParametersConfig, scaledImageSize) {
  const { gapSize, targetSize } = transformParametersConfig
  return (
    fixed(
      (getDrawingAreaSize(targetSize, gapSize).width - scaledImageSize.width) /
        2
    ) + gapSize.horizontal
  )
}

function getPositionRangeMinY(transformParametersConfig, scaledImageSize) {
  const { gapSize, targetSize } = transformParametersConfig
  return (
    fixed(
      (getDrawingAreaSize(targetSize, gapSize).height -
        scaledImageSize.height) /
        2
    ) + gapSize.vertical
  )
}

function getPositionRangeMaxX(transformParametersConfig, scaledImageSize) {
  return fixed(
    getPositionRangeMinX(transformParametersConfig, scaledImageSize) +
      scaledImageSize.width
  )
}

function getPositionRangeMaxY(transformParametersConfig, scaledImageSize) {
  return fixed(
    getPositionRangeMinY(transformParametersConfig, scaledImageSize) +
      scaledImageSize.height
  )
}
function computeScaledImageSize(imageSize, scaleRatio) {
  return {
    width: imageSize.width * scaleRatio,
    height: imageSize.height * scaleRatio
  }
}
function fixed(num) {
  return num | 0
}
export const computeHelpers = {
  computeBoardRect
}
