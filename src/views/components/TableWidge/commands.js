import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
// 创建自定义的拓展commands
export default Extension.create({
  name: 'commands',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }) => {
          props.command({ editor, range })
        }
      }
    }
  },

  addProseMirrorPlugins() {
    console.log(this.options.suggestion)
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion
      })
    ]
  }
})
