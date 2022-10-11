<template>
  <bubble-menu
    :editor="editor"
    :tippy-options="{ duration: 300 }"
    v-if="editor"
    class="bubble-menu"
  >
    <button
      @click="editor.chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
      class="float-utils"
    >
      <bold-outlined />
    </button>
    <button
      @click="editor.chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
      class="float-utils"
    >
      <italic-outlined />
    </button>
    <button
      @click="editor.chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
      class="float-utils"
    >
      <strikethrough-outlined />
    </button>
    <button
      @click="editor.chain().focus().toggleCode().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
      class="float-utils"
    >
      <github-outlined />
    </button>
    <!-- <button
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
    >
      H1
    </button> -->
    <!-- <a-popover
      title="高亮标记"
      trigger="click"
      v-model:visible="popoverVisible"
      :destroyTooltipOnHide="true"
      overlayClassName="rich-text-popover-box"
      :getPopupContainer="
        (triggerNode) => {
          return triggerNode.parentNode
        }
      "
    > -->
    <a-popover
      title="高亮标记"
      trigger="click"
      v-model:visible="popoverVisible"
      :destroyTooltipOnHide="true"
      overlayClassName="rich-text-popover-box"
      placement="right"
      v-bind="popSetting"
    >
      <template #content>
        <div
          class="mark-item"
          v-for="(item, index) in markData"
          :key="index"
          @click="
            editor
              .chain()
              .focus()
              .toggleHighlight({ color: item.colorCode })
              .run()
          "
        >
          <font-colors-outlined
            class="item-icon"
            :style="{ color: item.colorCode }"
          />
          <div style="flex: 1">{{ item.label }}</div>
        </div>
      </template>
      <button class="float-utils">
        <highlight-outlined />
      </button>
    </a-popover>
    <a-popover
      title="字体设置"
      trigger="click"
      v-model:visible="colorPopoverVisible"
      :destroyTooltipOnHide="true"
      overlayClassName="rich-text-popover-box"
      placement="right"
      v-bind="popSetting"
    >
      <template #content>
        <div
          class="mark-item"
          v-for="(item, index) in colorData"
          :key="index"
          @click="editor.chain().focus().setColor(item.colorCode).run()"
        >
          <font-colors-outlined
            class="item-icon"
            :style="{ color: item.colorCode }"
          />
          <div style="flex: 1">{{ item.label }}</div>
        </div>
      </template>
      <button class="float-utils">
        <font-colors-outlined />
      </button>
    </a-popover>
  </bubble-menu>
  <!-- <a-popover
    title="组件"
    v-model:visible="addPopoverStatus"
    :destroyTooltipOnHide="true"
    placement="topLeft"
  >
    <template #content>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
        class="float-utils"
      >
        <strikethrough-outlined />
      </button>
    </template>
  </a-popover> -->
  <editor-content :editor="editor" class="rich-editor-input" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { Editor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import { useStore } from 'vuex'
import Text from '@tiptap/extension-text'
import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Commands from './commands'
import suggestion from './suggestion'
import Image from '@tiptap/extension-image'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import {
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  GithubOutlined,
  HighlightOutlined,
  FontColorsOutlined
} from '@ant-design/icons-vue'
const CustomHighlight = Highlight.extend({
  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-color'),
        renderHTML: (attributes) => {
          return {
            'data-color': attributes.color,
            style: `background-color: ${attributes.color};`
          }
        }
      }
    }
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0]
  }
})
export default defineComponent({
  inheritAttrs: false,
  name: 'st-text',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    focusStatus: {
      type: Boolean,
      default: false
    },
    shortOrderValied: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue'],
  components: {
    EditorContent,
    BubbleMenu,
    BoldOutlined,
    ItalicOutlined,
    StrikethroughOutlined,
    GithubOutlined,
    HighlightOutlined,
    FontColorsOutlined
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  setup(props, { emit, attrs }) {
    const { editorItem: selfData }: any = attrs
    const { widgetType }: any = attrs
    const store = useStore()
    const popoverVisible = ref(false)
    const colorPopoverVisible = ref(false)
    const popSetting = ref({
      getPopupContainer: () => document.querySelector('#app')
    })
    // const addPopoverStatus = ref(false)
    // 这个配置需要抽离出来，因为是可以被设置的
    const CustomText = Text.extend({
      addKeyboardShortcuts() {
        return {
          'Control-Enter': () => {
            store.commit('ADD_NEW_DEFAULT_INPUT')
            return this.editor.commands.blur()
          },
          ArrowDown: () => {
            store.commit('GET_NEXTWIDGETS_ID', selfData)
            return false
          },
          ArrowUp: () => {
            store.commit('GET_PREWIDGETS_ID', selfData)
            return false
          },
          Backspace: () => {
            if (editor.isEmpty) {
              store.commit('DESTORY_ITEM', selfData.id)
            }
            if (
              editor.getText() &&
              window.getSelection()?.getRangeAt(0).startOffset === 0
            ) {
              store.commit('ADD_ITEM_BYOTHERD', {
                text: editor.getText(),
                id: selfData.id
              })
            }
            return false
          }
          // '/': () => {
          //   if (editor.isEmpty) {
          //     addPopoverStatus.value = true
          //   }
          //   return false
          // }
        }
      }
    })
    console.log(props.modelValue, '这是收到的数据')

    const markData = ref([
      { label: 'hightLight', colorCode: null },
      { label: 'orange', colorCode: '#ffc078' },
      { label: 'green', colorCode: '#8ce99a' },
      { label: 'blue', colorCode: '#e7f3f8' },
      { label: 'purple', colorCode: '#b197fc' },
      { label: 'red', colorCode: '#FDEBEC' },
      { label: 'pinkRed', colorCode: '#ffa8a8' }
    ])
    const colorData = ref([
      { label: 'orange', colorCode: '#ffc078' },
      { label: 'green', colorCode: '#8ce99a' },
      { label: 'blue', colorCode: '#74c0fc' },
      { label: 'purple', colorCode: '#b197fc' },
      { label: 'red', colorCode: 'red' },
      { label: 'pinkRed', colorCode: '#ffa8a8' }
    ])
    const editor = new Editor({
      extensions: [
        BulletList,
        ListItem,
        OrderedList,
        StarterKit.configure({
          // Disable an included extension
          bold: {
            HTMLAttributes: {
              class: 'my-custom-class'
            }
          }
        }),
        props.shortOrderValied ? CustomText : Text,
        TextStyle,
        Color,
        Image,
        props.shortOrderValied
          ? Commands.configure({ suggestion })
          : Commands.configure({}),
        CustomHighlight.configure({ multicolor: true })
      ],
      autofocus: 'end',
      content: props.modelValue,
      // 这里vuex里面的数据已经改了，但是页面没有变过来
      onUpdate: (...arg) => {
        // 使用commands 暂时注释掉监听的方法
        // if (
        //   addPopoverStatus.value &&
        //   !/^\/[A-Za-z]{0,5}$/.test(editor.getText())
        // ) {
        //   addPopoverStatus.value = false
        // }
        emit('update:modelValue', editor.getHTML())

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      }
    })

    if (widgetType && widgetType.type === 'head') {
      editor.commands.setHeading({ level: widgetType.level })
    }
    // list需要考虑一下交互，是否能调出/，调出后的行为是替换还是新增一个
    // if (widgetType && widgetType.type === 'bulletList') {
    //   editor.commands.toggleBulletList()
    // }
    // if (widgetType && widgetType.type === 'OrderedList') {
    //   editor.commands.toggleOrderedList()
    // }
    watch(
      () => [store.state.focusId, store.state.addData],
      (newValue, oldValue) => {
        console.log(newValue, oldValue)

        if (
          newValue[0] ===
          (typeof selfData === 'object' ? selfData.id : selfData)
        ) {
          editor.commands.focus()
          if (newValue[1]) {
            editor.commands.insertContent(newValue[1])
          }
        }
      },
      { deep: true }
    )
    return {
      editor,
      popoverVisible,
      markData,
      colorData,
      colorPopoverVisible,
      popSetting
      // addPopoverStatus 暂时不用监听的方法
    }
  }
})
</script>

<style lang="scss" scoped>
.float-utils {
  background-color: #fff;
  outline: none;
  border: none;
  padding: 0 8px;
  &:hover {
    background-color: #f2f5fa;
  }
  height: 100%;
}
.rich-editor-input {
  width: 100%;
  min-height: 30px;
  font-size: 16px;
  ::v-deep(.ProseMirror) {
    outline: none;
  }

  ::v-deep(p) {
    min-height: 30px;
    line-height: 30px;
    margin-bottom: 0;
    word-break: normal;
    white-space: normal;
    word-wrap: break-word;
    vertical-align: bottom;
  }
  ::v-deep(mark) {
    padding: 2px 0;
    border-radius: 6px;
  }
  ::v-deep(img) {
    max-width: 100%;
    height: auto;

    &.ProseMirror-selectednode {
      outline: 3px solid #68cef8;
    }
  }
}
.bubble-menu {
  box-shadow: rgb(15 15 15 / 5%) 0px 0px 0px 1px,
    rgb(15 15 15 / 10%) 0px 3px 6px, rgb(15 15 15 / 20%) 0px 9px 24px;
  border-radius: 6px;
  overflow: hidden;
  height: 32px;
}
.mark-item {
  display: flex;
  align-items: center;
  min-height: 28px;
  padding: 0 8px;
  cursor: pointer;
  .item-icon {
    font-size: 18px;
    margin-right: 12px;
  }
  &:hover {
    background-color: #f2f5fa;
  }
}
</style>
