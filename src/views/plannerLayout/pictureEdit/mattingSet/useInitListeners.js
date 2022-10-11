import { onBeforeUnmount, watch, watchEffect } from 'vue'
import { initDrawingListeners } from './initDrawingListeners'
export function useInitDrawingListeners(props, config) {
  const { radius, hardness, isErasing } = props
  const {
    boardContexts,
    transformConfig,
    mattingSources,
    draggingInputBoard,
    initialized,
    boardRect,
    listenerManager
  } = config
  const { inputCtx } = boardContexts
  watchEffect(() => {
    if (initialized.value) {
      initDrawingListeners({
        listenerManager,
        imageSources: mattingSources.value,
        boardContexts,
        initDrawingConfig: { radius, hardness, transformConfig },
        isErasing: isErasing.value,
        draggingInputBoard: draggingInputBoard.value,
        boardRect: boardRect.value
      })
    }
  })
  onBeforeUnmount(() => {
    listenerManager.removeMouseListeners(inputCtx.value.canvas)
  })
}
