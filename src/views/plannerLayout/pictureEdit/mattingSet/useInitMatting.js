// import { EventType, UPDATE_BOARDRECT_DEBOUNCE_TIME } from '@/constants';
import { resizeCanvas } from './domControl'
import { computeBoardRect } from './initCompute'
import { initMatting } from './initMatting'
// import { MattingProps, UseInitMattingBoardsConfig } from '@/types/init-matting';
// import { debounce } from 'lodash';
import { onMounted, onUnmounted, watch } from 'vue'

export function useInitMattingBoards(props, useInitMattingBoardsConfig) {
  const { picFile } = props
  const {
    boardContexts,
    boardContexts: { inputCtx, outputCtx, inputHiddenCtx, outputHiddenCtx }
  } = useInitMattingBoardsConfig
  const { initMattingResult, width, height, initialized } =
    useInitMattingBoardsConfig
  const { boardRect, transformConfig, mattingSources } =
    useInitMattingBoardsConfig
  const updateBoardRect = () => {
    boardRect.value = computeBoardRect(inputCtx.value.canvas)
  }
  console.log(inputCtx)
  const resizeBoards = () => {
    requestAnimationFrame(() => {
      const commonConfig = {
        targetHeight: height.value,
        targetWidth: width.value,
        transformConfig
      }
      resizeCanvas({
        ctx: inputCtx.value,
        hiddenCtx: inputHiddenCtx.value,
        ...commonConfig
      })
      resizeCanvas({
        ctx: outputCtx.value,
        hiddenCtx: outputHiddenCtx.value,
        withBorder: true,
        ...commonConfig
      })
    })
  }
  console.log(picFile, 'picFilepicFile')
  watch(
    [picFile],
    async () => {
      if (picFile.value && width.value && height.value) {
        initialized.value = false
        initMattingResult.value = await initMatting({
          boardContexts,
          picFile: picFile.value,
          targetSize: { width: width.value, height: height.value },
          transformConfig: {},
          imageSources: {}
        })
        console.log(
          initMattingResult.value,
          'initMattingResult.valueinitMattingResult.value'
        )
        const { raw, mask, orig, positionRange, scaleRatio } =
          initMattingResult.value
        transformConfig.positionRange = positionRange
        transformConfig.scaleRatio = scaleRatio
        mattingSources.value = { raw, mask, orig }
        updateBoardRect()
        // resizeBoards()
        initialized.value = true
      }
    }
  )

  window.addEventListener('resize', resizeBoards)
  // window.addEventListener(
  //   'scroll',
  //   debounce(updateBoardRect, UPDATE_BOARDRECT_DEBOUNCE_TIME)
  // )
  window.addEventListener('scroll', updateBoardRect)

  window.removeEventListener('resize', resizeBoards)
}
