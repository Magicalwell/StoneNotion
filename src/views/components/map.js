// import * as _setting from './setting'
// export const setting = _setting
// export { default as viewExtend } from './extends/view'
// export { default as entry } from './entery/index.vue'
import inputWidget from './widgets/input'

// import radioWidget from './widgets/radio'

// import tableWidget from './widgets/table'
// import gridWidget from './widgets/grid'
export { inputWidget }
export default [
  {
    title: '常规',
    key: 'common',
    widgets: [inputWidget]
  }
  //   {
  //     title: '展示',
  //     key: 'display',
  //     widgets: [tableWidget]
  //   },
  //   {
  //     title: '布局容器',
  //     key: 'layout',
  //     widgets: [gridWidget]
  //   }
]
