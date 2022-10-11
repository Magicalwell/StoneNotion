import { tryOnMounted, tryOnUnmounted, useDebounceFn } from '@vueuse/core'
import { ref, computed } from 'vue'

interface WindowSizeOptions {
  once?: boolean
  immediate?: boolean
  listenerOptions?: AddEventListenerOptions | boolean
}

export function useWindowSizeFn(
  fn: any,
  wait = 150,
  options?: WindowSizeOptions
) {
  let handler = () => {
    fn()
  }
  const handleSize = useDebounceFn(handler, wait)
  handler = handleSize

  const start = () => {
    if (options && options.immediate) {
      handler()
    }
    window.addEventListener('resize', handler)
  }

  const stop = () => {
    window.removeEventListener('resize', handler)
  }

  tryOnMounted(() => {
    start()
  })

  tryOnUnmounted(() => {
    stop()
  })
  return [start, stop]
}
const viewState = ref(false)

export function useLoginState() {
  function setViewState(state) {
    viewState.value = state
  }

  const getViewState = computed(() => viewState.value)

  return { setViewState, getViewState }
}
