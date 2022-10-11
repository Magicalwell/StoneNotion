// const { MouseDown, Mouseup, Mousemove } = EventType;
const MouseDown = 'mousedown'
const Mouseup = 'mouseup'
const Mousemove = 'mousemove'
export default class ListenerManager {
  constructor() {
    this.unbindDownUpCache = new WeakMap()
    this.unbindMoveCache = new WeakMap()
    this.unbindWheelCache = new Set()
  }

  initMouseListeners(ctx) {
    const { mouseTarget } = ctx
    this.removeMouseListeners(mouseTarget)
    const unbindConfig = this.bindMouseListeners(ctx)
    this.unbindDownUpCache.set(mouseTarget, unbindConfig)
  }

  removeMouseListeners(mouseTarget) {
    const unbindConfig = this.unbindDownUpCache.get(mouseTarget)
    if (unbindConfig) {
      const { unbindDown, unbindUp } = unbindConfig
      unbindDown()
      unbindUp()
    }
  }

  bindMouseListeners(listenersContext) {
    const { mouseTarget, down, move, up } = listenersContext
    const moveListener = (ev) => {
      requestAnimationFrame(() => move(ev))
    }
    const downListener = (ev) => {
      const isTarget = ev.target === mouseTarget
      const extraCondition = down && down(ev)
      const shouldBindMove = extraCondition !== false
      if (isTarget && shouldBindMove) {
        const removeMove = this.listenEvent({
          eventType: Mousemove,
          listener: moveListener,
          stop: true,
          prevent: true
        })
        this.unbindMoveCache.set(mouseTarget, removeMove)
      }
    }
    const upListener = (ev) => {
      up && up(ev)
      this.unbindMoveListeners(mouseTarget)
    }
    const unbindDown = this.listenEvent({
      eventType: MouseDown,
      listener: downListener
    })
    const unbindUp = this.listenEvent({
      eventType: Mouseup,
      listener: upListener
    })
    return { unbindDown, unbindUp }
  }

  /** 移除mousemove监听器 */
  unbindMoveListeners(mouseTarget) {
    const unbindMove = this.unbindMoveCache.get(mouseTarget)
    unbindMove && unbindMove()
    this.unbindMoveCache.delete(mouseTarget)
  }

  /** 初始化wheel事件监听器 */
  initWheelListener(listenersConfig) {
    this.removeWheelListeners()
    const removeWheel = this.bindWheelListener(listenersConfig)
    this.unbindWheelCache.add(removeWheel)
    return removeWheel
  }

  /** 解绑wheel事件监听器 */
  removeWheelListeners() {
    this.unbindWheelCache.forEach((unbind) => unbind())
    this.unbindWheelCache.clear()
  }

  /** 绑定wheel事件监听器 */
  bindWheelListener(listenersConfig) {
    const { mattingBoards, wheel } = listenersConfig
    return this.listenEvent(
      {
        eventType: 'wheel',
        listener: (ev) => {
          if (this.canWheel(ev, mattingBoards)) {
            wheel(ev)
          }
        }
      },
      false,
      ...mattingBoards
    )
  }

  /** 是否可以滚动 */
  canWheel(ev, mattingBoards) {
    return mattingBoards.some((board) => ev.target === board)
  }

  /** 监听事件，返回移除监听器的回调 */
  listenEvent(listenerConfig, options = false, ...targets) {
    const { eventType } = listenerConfig
    const wrapListener = this.genWrapListener(listenerConfig)
    let removeListenerCallback
    if (!this.isNeedToBindToTargets(targets)) {
      removeListenerCallback = this.bindListener(
        window,
        eventType,
        wrapListener,
        options
      )
    } else {
      removeListenerCallback = this.bindListeners(
        targets,
        eventType,
        wrapListener,
        options
      )
    }
    return removeListenerCallback
  }

  genWrapListener(listenerConfig) {
    const { listener, stop, prevent } = listenerConfig
    return (ev) => {
      if (stop) {
        ev.stopPropagation()
      }
      if (prevent) {
        ev.preventDefault()
      }
      listener(ev)
    }
  }

  /** 是否需要绑定在目标元素上 */
  isNeedToBindToTargets(targets) {
    return targets.length !== 0
  }

  /** 为单个目标绑定监听器 */
  bindListener(target, eventType, listener, options) {
    target.addEventListener(eventType, listener, options)
    return () => target.removeEventListener(eventType, listener, options)
  }

  /** 为多个目标绑定监听器 */
  bindListeners(targets, eventType, listener, options) {
    targets.forEach((target) => {
      target.addEventListener(eventType, listener, options)
    })
    return () =>
      targets.forEach((target) => {
        target.removeEventListener(eventType, listener, options)
      })
  }
}
