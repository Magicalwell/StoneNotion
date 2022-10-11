import { getLoadedImage } from './domControl'
import {
  computeValidImageSize,
  computeTransformParameters
} from './initCompute'
export async function initMatting(initMattingConfig) {
  const {
    boardContexts: {
      inputCtx,
      outputCtx,
      inputHiddenCtx,
      inputDrawingCtx,
      outputHiddenCtx,
      outputDrawingCtx
    },
    picFile,
    transformConfig,
    targetSize,
    gapSize
  } = initMattingConfig
  // hideCanvas(inputContext2D, outputContext2D);
  inputCtx.value.imageSmoothingEnabled = true
  outputCtx.value.imageSmoothingEnabled = true
  const imageSource = await getLoadedImage(picFile)
  const { scaleRatio, positionRange } = getValidTransformConfig({
    imageSource,
    transformConfig,
    targetSize,
    gapSize
  })
  const validImageSize = computeValidImageSize(imageSource)
  //   initHiddenBoardWithSource({
  //     imageSource,
  //     targetSize: validImageSize,
  //     hiddenCtx: inputHiddenCtx.value,
  //     drawingCtx: inputDrawingCtx
  //   })
  //   transformedDrawImage({
  //     hiddenCtx: inputHiddenCtx.value,
  //     ctx: inputCtx.value,
  //     scaleRatio,
  //     positionRange
  //   })
  //   initHiddenBoard({
  //     targetSize: validImageSize,
  //     hiddenCtx: outputHiddenCtx.value,
  //     drawingCtx: outputDrawingCtx
  //   })
  console.log(inputHiddenCtx.value)
  const raw = await createImageBitmap(inputHiddenCtx.value.canvas)
  //   const mask = await generateMaskImageSource({
  //     targetSize: validImageSize,
  //     imageSource
  //   })
  return { orig: imageSource, raw, positionRange, scaleRatio }
}
/** 获取有效的变换配置 */
function getValidTransformConfig(getParametersConfig) {
  const { transformConfig, ...computeConfig } = getParametersConfig
  if (isInvalidTransformConfig(transformConfig)) {
    const { scaleRatio, positionRange } = computeTransformConfig(computeConfig)
    transformConfig.scaleRatio = scaleRatio
    transformConfig.positionRange = positionRange
  }
  return transformConfig
}
/** 判断变换配置是否无效 */
function isInvalidTransformConfig(transformConfig) {
  const { scaleRatio, positionRange } = transformConfig
  return !scaleRatio || !positionRange
}

/** 计算画板的变换配置对象 */
function computeTransformConfig(computeConfig) {
  const {
    imageSource,
    targetSize,
    gapSize = { horizontal: 40, vertical: 80 }
  } = computeConfig
  const imageSize = computeValidImageSize(imageSource)
  return computeTransformParameters({
    gapSize,
    imageSize,
    targetSize
  })
}
