<template>
  <div class="block-item">
    <draggable :list="childComponentList" v-bind="dragOptions" item-key="id">
      <template #item="{ element }">
        <template v-if="element.children">
          <BlockComponents
            :child-component-list="element.children"
          ></BlockComponents>
        </template>
        <component
          v-else
          :is="element.type"
          :schema="element"
          :show-nested-editor="false"
          :globalOptions="globalOptions"
        ></component>
      </template>
    </draggable>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";
export default defineComponent({
  name: "BlockComponents",
  components: { draggable },
  props: {
    childComponentList: {
      type: Array,
      default: () => [],
    },
    globalOptions: {
      type: Object,
      default: () => ({}),
    },
    schema: { type: Object },
  },
  setup(props) {
    const hoverContainer = ref([]);
    const store = useStore();
    console.log(props.childComponentList);

    return {};
  },
});
</script>

<style lang="scss" scoped></style>
