<template>
  <div class="button">创建时间</div>
  <div ref="content" style="display: none">
    <h2>这是内容标题</h2>
    <div>efdsgegdgwer</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import tippy, { animateFill } from 'tippy.js'
export default defineComponent({
  props: {
    schema: {
      type: Object,
      default: () => ({})
    }
  },
  components: {},
  setup(props) {
    const store = useStore()
    const content = ref()

    onMounted(() => {
      const popup = tippy('.button', {
        appendTo: () => document.body,
        content: content.value.innerHTML,
        interactive: true,
        trigger: 'click',
        placement: 'bottom-start',
        allowHTML: true,
        theme: 'notion'
      })
    })
    return { content }
  }
})
</script>
