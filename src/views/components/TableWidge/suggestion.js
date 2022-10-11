import tippy from 'tippy.js'
import { VueRenderer } from '@tiptap/vue-3'
import CommandsList from './CommandsList.vue'

export default {
  items: ({ query }) => {
    return [
      {
        title: 'H1',
        des: '我不说你也知道这是1号标题',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 1 })
            .run()
        }
      },
      {
        title: 'H2',
        des: '看到上面的H2了嘛?',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode('heading', { level: 2 })
            .run()
        }
      },
      {
        title: 'bold',
        des: '加粗',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setMark('bold').run()
        }
      },
      {
        title: 'bold',
        des: '加粗',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setMark('bold').run()
        }
      },
      {
        title: 'bold',
        des: '加粗',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setMark('bold').run()
        }
      },
      {
        title: 'italic',
        des: '歪头战神',
        command: ({ editor, range }) => {
          editor.chain().focus().deleteRange(range).setMark('italic').run()
        }
      }
    ]
      .filter((item) =>
        item.title.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 10)
  },

  render: () => {
    let component
    let popup

    return {
      onStart: (props) => {
        console.log(props.command, 'propspropspropscommandcommandcommand')
        component = new VueRenderer(CommandsList, {
          // using vue 2:
          // parent: this,
          // propsData: props,
          props,
          editor: props.editor
        })

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start'
        })
      },

      onUpdate(props) {
        console.log('onUpdateonUpdate')
        component.updateProps(props)

        popup[0].setProps({
          getReferenceClientRect: props.clientRect
        })
      },
      // 此处onKeyDown拦截keyDown事件，其实弹窗并没有focus，里面按钮选中的状态是通过class绑定的css样式，通过index=currentIndex实现的
      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }
        console.log(component.ref)
        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      }
    }
  }
}
