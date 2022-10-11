import type { App } from 'vue'

export default {
  install: (vue: App): void => {
    const files = require.context('./components', true, /\.ts$/)
    files.keys().forEach((key) => {
      // if (typeof files(key).default === 'function') {
      //   if (key !== './index.ts') files(key).default(vue)
      // }
      // console.log(component)
      // 根据导入的组件文件，实现自动全局注册
      vue.use(files(key).default)
    })
  }
}
