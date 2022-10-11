<template>
  <div class="items">
    <template v-if="items.length">
      <!-- <button
        class="item"
        :class="{ 'is-selected': index === selectedIndex }"
        v-for="(item, index) in items"
        :key="index"
        @click="selectItem(index)"
      >
        {{ item }}
      </button> -->
      <div
        class="item item-box"
        :class="{ 'is-selected': index === selectedIndex }"
        v-for="(item, index) in items"
        :key="index"
        @click="selectItem(index)"
        ref="itemboxlist"
      >
        <font-colors-outlined class="item-icon" />
        <div style="flex: 1">
          <div>{{ item.title }}</div>
          <small v-if="item.des" class="item-small">{{ item.des }}</small>
          <small></small>
        </div>
      </div>
    </template>
    <div class="item" v-else>No result</div>
  </div>
</template>

<script>
import { FontColorsOutlined } from '@ant-design/icons-vue'
export default {
  props: {
    items: {
      type: Array,
      required: true
    },

    command: {
      type: Function,
      required: true
    }
  },
  components: {
    FontColorsOutlined
  },
  data() {
    return {
      selectedIndex: 0
    }
  },

  watch: {
    items() {
      this.selectedIndex = 0
    }
  },

  methods: {
    onKeyDown({ event }) {
      if (event.key === 'ArrowUp') {
        this.upHandler()
        return true
      }

      if (event.key === 'ArrowDown') {
        this.downHandler()
        return true
      }

      if (event.key === 'Enter') {
        this.enterHandler()
        return true
      }

      return false
    },

    upHandler() {
      this.selectedIndex =
        (this.selectedIndex + this.items.length - 1) % this.items.length
      console.log(this.$refs.itemboxlist[this.selectedIndex].getBoundingClientRect())
      this.$refs.itemboxlist[this.selectedIndex].scrollIntoView(true)
    },
    //     if (roleed.length > 0) {
    //      this.checked2 = roleed[0].id
    //     //  开始
    //      this.$nextTick(()=>{
    //       this.$refs.lef_radio.forEach((item,index)=>{
    //          if(item.value ==  roleed[0].id){  // 判断选中的dom为要滑动的dom
    //               item.scrollIntoView({ behavior: "instant"})   // 滑动到可视区域
    //           }
    //       })
    //     })
    //  }
    downHandler() {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length
      this.$refs.itemboxlist[this.selectedIndex].scrollIntoView(false)
    },

    enterHandler() {
      this.selectItem(this.selectedIndex)
    },

    selectItem(index) {
      const item = this.items[index]

      if (item) {
        this.command(item)
      }
    }
  }
}
</script>

<style lang="scss">
.items {
  padding: 0.2rem;
  position: relative;
  border-radius: 0.5rem;
  background: #fff;
  color: rgba(0, 0, 0, 0.8);
  max-height: 200px;
  min-width: 100px;
  overflow-y: auto;
  font-size: 0.9rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.item {
  display: block;
  margin: 0;
  width: 100%;
  text-align: left;
  background: transparent;
  border-radius: 0.4rem;
  border: 1px solid transparent;
  padding: 0.2rem 0.4rem;
  min-height: 40px;
  .item-icon {
    width: 40px;
  }
  .item-small {
    font-size: 12px;
    color: rgba(55, 53, 47, 0.65);
  }
  &.item-box {
    display: flex;
    align-items: center;
  }
  &.is-selected {
    background: rgba(55, 53, 47, 0.08);
  }
}
</style>
