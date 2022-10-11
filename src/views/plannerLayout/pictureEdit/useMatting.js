import { ref, computed, Ref, reactive } from 'vue'
import { createContext2D } from './mattingSet/domControl'
import ListenerManager from './mattingSet/listenerManager'
import { useInitMattingBoards } from './mattingSet/useInitMatting'
export function useMatting() {
  const picFile = ref(null)
  const isErasing = ref(false)
  const radius = ref(12)
  const hardness = ref(0.5) // 边缘羽化半径
  const brushSize = computed(() => radius.value)
  return {
    picFile,
    isErasing,
    radius,
    hardness,
    brushSize
  }
}

export function useMattingBoard(props) {
  const width = ref(0)
  const height = ref(0)
  const inputCtx = ref(null)
  const outputCtx = ref(null)
  const initMattingResult = ref(null)
  const draggingInputBoard = ref(false)
  const isDrawing = ref(false)
  const transformConfig = reactive({
    scaleRatio: 1,
    positionRange: {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0
    }
  })
  const mattingSources = ref(null)
  const boardRect = ref(null)
  const initialized = ref(false)
  const inputHiddenCtx = ref(createContext2D())
  const outputHiddenCtx = ref(createContext2D())
  const inputDrawingCtx = createContext2D()
  const outputDrawingCtx = createContext2D()
  const listenerManager = new ListenerManager()
  const initMattingConfig = {
    boardContexts: {
      inputCtx,
      outputCtx,
      inputDrawingCtx,
      outputDrawingCtx,
      inputHiddenCtx,
      outputHiddenCtx
    },
    initMattingResult,
    transformConfig,
    mattingSources,
    initialized,
    boardRect
  }
  const initListenersConfig = {
    ...initMattingConfig,
    draggingInputBoard,
    isDrawing,
    listenerManager
  }
  useInitMattingBoards(props, { ...initMattingConfig, width, height })
  // useInitDrawingListeners(props, initListenersConfig)
  // useInitTransformListener(initListenersConfig)
  return {
    width,
    height,
    inputCtx,
    outputCtx,
    inputHiddenCtx,
    outputHiddenCtx,
    draggingInputBoard,
    transformConfig,
    initialized,
    mattingSources
  }
}
