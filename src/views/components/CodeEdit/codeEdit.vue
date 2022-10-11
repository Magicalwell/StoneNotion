<template>
  <div class="outer-box">
    <prism-editor
      class="my-editor height-300"
      v-model="selfData.code.rich_text"
      :highlight="highlighter"
      line-numbers
    ></prism-editor>
  </div>
</template>

<script>
import { defineComponent, ref, toRefs } from 'vue'
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css'
export default defineComponent({
  inheritAttrs: false,
  name: 'st-codeEdit',
  components: {
    PrismEditor
  },
  props: {
    editorItem: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { editorItem: selfData } = toRefs(props)
    //    return {
    //   code: 'select a from table1 where b = 1',
    //   cmOptions: {
    //     // 语言及语法模式
    //     mode: 'text/x-sql',
    //     // 主题
    //     theme: 'idea',
    //     // 显示函数
    //     line: true,
    //     lineNumbers: true,
    //     // 软换行
    //     lineWrapping: true,
    //     // tab宽度
    //     tabSize: 4,
    //   }
    // }

    function highlighter(code) {
      return highlight(code, languages.js) // languages.<insert language> to return html with markup
    }

    return {
      selfData,
      highlighter
    }
  }
})
</script>

<style lang="scss" scoped>
.my-editor {
  background: rgb(247, 246, 243);
  color: #ccc;
  border-radius: 8px;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional */
::v-deep(.prism-editor__textarea:focus) {
  outline: none;
  border: 0;
}

/* not required: */
.height-300 {
  min-height: 200px;
}
</style>
