import Editor from './widgets/editor'
import inputWidget from './widgets/input'
// export { default as viewExtend } from './extends/view'
// export { default as entry } from './entery/index.vue'

// import radioWidget from './widgets/radio'

// import tableWidget from './widgets/table'
// import gridWidget from './widgets/grid'
export { inputWidget, Editor }
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
