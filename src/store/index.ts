import { createStore } from 'vuex'
import { generatePage, generateBlockType } from '../utils/generateBlock'
import { guid } from '../utils'
import plannerVuex from './modules/planner'
function treeForeach(tree, func) {
  let node
  const list = [...tree]
  while ((node = list.shift())) {
    if (func(node)) {
      if (list.length > 0) {
        return node.children && node.children.length > 0
          ? node.children[0].id
          : list[0].id
      } else {
        return node.children && node.children.length > 0
          ? node.children[0].id
          : node.id
      }
    }
    node.children && list.unshift(...node.children)
  }
}
function treeIterator(tree, target, func, dash = []) {
  tree.forEach((node, index) => {
    if (Array.isArray(target)) {
      console.log('ttt')
    }
    if (node.id === target) {
      func(tree, node, index)
      return
    }
    node.children && treeIterator(node.children, target, func, dash)
  })
}
function preTreeForeach(tree, func) {
  let node
  let preNode
  let parentNode
  const list = [...tree]
  while ((node = list.shift())) {
    if (func(node)) {
      // if (list.length > 0) {
      //   return preNode.id
      // } else {
      //   return preNode.id
      // }
      if (
        preNode.children &&
        preNode.children.length > 0 &&
        node.id !== preNode.children[0].id
      ) {
        list.push(...preNode.children)
        preNode = list.pop()
      }

      return preNode.id
    }
    preNode = node
    node.children && node.children.length && list.unshift(...node.children)
  }
}
// const modulesFiles = require.context('./modules', false, /\.ts$/)
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})
export default createStore({
  state: {
    pageBox: {
      object: 'page', // 固定为page，里面的子组件为children数组
      id: guid(),
      created_time: '2020-03-17T19:10:04.968Z',
      last_edited_time: '2020-03-17T21:49:37.913Z',
      created_by: {
        object: 'user',
        id: guid() // 暂时不做改动
      },
      last_edited_by: {
        object: 'user',
        id: guid() // 暂时不做改动
      },
      // parent: {
      //   // 暂时不清楚该字段的用处，推测是区分page的归属
      //   type: 'database_id',
      //   database_id: '48f8fee9-cd79-4180-bc2f-ec0398253067'
      // },
      archived: false, // 页面是否在编辑
      url: 'https://www.notion.so/Avocado-b55c9c91384d452b81dbd1ef79372b75', // 页面的url
      icon: {
        type: 'emoji',
        emoji: '🎉'
      },
      cover: {
        type: 'external',
        external: {
          url: 'https://website.domain/images/image.png'
        }
      },
      properties: {
        name: {
          title: [{ type: 'text', text: '测试标题h1' }]
        }
      },
      has_children: true,
      children: [
        {
          object: 'block',
          id: guid(),
          created_time: '12321312312',
          created_by: {
            object: 'user'
            // id: 'cb38e95d-00cf-4e7e-adce-974f4a44a547' 暂时不做多人编辑 只显示谁编辑了
          },
          last_edited_time: '12321312312',
          last_edited_by: {
            object: 'user'
            // id: 'e79a0b74-3aba-4149-9f74-0bb5791a6ee6' 暂时不做多人编辑 只显示谁编辑了
          },
          has_children: false,
          type: 'paragraph',
          archived: false,
          paragraph: {
            rich_text: 'Lacinato kal2312321312e',
            checked: false,
            color: 'default'
          }
        },
        {
          object: 'block',
          id: guid(),
          created_time: 'ggggg',
          created_by: {
            object: 'user'
            // id: 'cb38e95d-00cf-4e7e-adce-974f4a44a547' 暂时不做多人编辑 只显示谁编辑了
          },
          last_edited_time: '3215555',
          last_edited_by: {
            object: 'user'
            // id: 'e79a0b74-3aba-4149-9f74-0bb5791a6ee6' 暂时不做多人编辑 只显示谁编辑了
          },
          has_children: true,
          type: 'paragraph',
          archived: false,
          paragraph: {
            rich_text: 'tada!',
            checked: false,
            color: 'default'
          },
          children: [
            {
              object: 'block',
              id: guid(),
              created_time: 'ggggg',
              created_by: {
                object: 'user'
                // id: 'cb38e95d-00cf-4e7e-adce-974f4a44a547' 暂时不做多人编辑 只显示谁编辑了
              },
              last_edited_time: '3215555',
              last_edited_by: {
                object: 'user'
                // id: 'e79a0b74-3aba-4149-9f74-0bb5791a6ee6' 暂时不做多人编辑 只显示谁编辑了
              },
              has_children: false,
              type: 'paragraph',
              archived: false,
              paragraph: {
                rich_text: 'tada!',
                checked: false,
                color: 'default'
              }
            }
          ]
        }
      ]
    },
    focusId: '',
    addData: ''
  },
  mutations: {
    ADD_NEW_DEFAULT_INPUT(state: any, data) {
      if (!data) {
        state.pageBox.children.push({
          object: 'block',
          id: guid(),
          created_time: new Date().valueOf(),
          created_by: {
            object: 'user',
            id: 'cb38e95d-00cf-4e7e-adce-974f4a44a547'
          },
          last_edited_time: new Date().valueOf(),
          last_edited_by: {
            object: 'user',
            id: 'e79a0b74-3aba-4149-9f74-0bb5791a6ee6'
          },
          has_children: false,
          type: 'paragraph',
          archived: false,
          paragraph: {
            rich_text: '',
            checked: false,
            color: 'default'
          }
        })
      } else {
        state.pageBox.children.push(generateBlockType(data))
      }
    },
    ADD_DARGACTIVEITEM(state: any, val: any) {
      state.dargActiveItem = val
    },
    SET_DEFAULT_PAGE(state) {
      state.pageBox = generatePage()
    },
    GET_NEXTWIDGETS_ID(state, { id }) {
      state.focusId = id
      state.focusId = treeForeach(
        state.pageBox.children,
        (item) => state.focusId === item.id
      )
    },
    GET_PREWIDGETS_ID(state, { id }) {
      state.focusId = id
      state.focusId = preTreeForeach(
        state.pageBox.children,
        (item) => state.focusId === item.id
      )
    },
    DESTORY_ITEM(state, id) {
      state.focusId = id
      state.focusId = preTreeForeach(
        state.pageBox.children,
        (item) => state.focusId === item.id
      )
      treeIterator(state.pageBox.children, id, (tree, node, index) => {
        tree.splice(index, 1)
      })
    },
    // 当当前文本行有内容时，按删除将内容加到上面的尾部
    ADD_ITEM_BYOTHERD(state, data) {
      state.focusId = data.id
      state.focusId = preTreeForeach(
        state.pageBox.children,
        (item) => state.focusId === item.id
      )
      treeIterator(state.pageBox.children, data.id, (tree, node, index) => {
        console.log(tree, node, index)

        if (node.type === 'paragraph') {
          state.addData = data.text
          tree.splice(index, 1)
        }
      })
    }
  },
  getters: {
    returnComponentType: (state: any) => {
      return state.dargActiveItem
    },
    addComponentInfo: (state: any) => {
      return state.defaultComponents
    },
    pageData: (state: any) => {
      return state.pageBox
    }
  },
  actions: {},
  modules: {
    plannerVuex
  }
})
