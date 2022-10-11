import { guid, getBlockMap, getBlockDefault } from './index'

export function generateBlockType(blockId = 1) {
  const blockItem = {
    object: 'block',
    id: guid(),
    created_time: new Date().valueOf(),
    created_by: {
      object: 'user'
      // id: 'cb38e95d-00cf-4e7e-adce-974f4a44a547' 暂时不做多人编辑 只显示谁编辑了
    },
    last_edited_time: new Date().valueOf(),
    last_edited_by: {
      object: 'user'
      // id: 'e79a0b74-3aba-4149-9f74-0bb5791a6ee6' 暂时不做多人编辑 只显示谁编辑了
    },
    type: getBlockMap(blockId),
    archived: false,
    ...getBlockDefault(blockId)
  }
  // blockItem[getBlockMap(blockId)] = {
  //   rich_text: 'tada!',
  //   checked: false,
  //   color: 'default'
  // }
  return blockItem
}
export function generatePage() {
  const pageItem = {
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
    // properties中是每个页面的头部组件，可以为空
    properties: {
      // Name: {
      //   id: 'lOpd',
      //   type: 'title',
      //   title: [
      //     {
      //       type: 'text',
      //       text: {
      //         content: 'Avocado',
      //         link: null
      //       },
      //       annotations: {
      //         bold: false,
      //         italic: false,
      //         strikethrough: false,
      //         underline: false,
      //         code: false,
      //         color: 'default'
      //       },
      //       plain_text: 'Avocado',
      //       href: null
      //     }
      //   ]
      // },
      // Description: {
      //   id: 'ajLj',
      //   type: 'rich_text',
      //   rich_text: [
      //     {
      //       type: 'text',
      //       text: {
      //         content: 'Persea americana',
      //         link: null
      //       },
      //       annotations: {
      //         bold: false,
      //         italic: false,
      //         strikethrough: false,
      //         underline: false,
      //         code: false,
      //         color: 'default'
      //       },
      //       plain_text: 'Persea americana',
      //       href: null
      //     }
      //   ]
      // },
      // 'In stock': {
      //   id: 'KpQq',
      //   type: 'checkbox',
      //   checkbox: false
      // },
      // 'Food group': {
      //   id: 'z%7D%5C%3C',
      //   type: 'select',
      //   select: {
      //     id: '2f998e2d-7b1c-485b-ba6b-5e6a815ec8f5',
      //     name: '🍎Fruit',
      //     color: 'red'
      //   }
      // },
      // Price: {
      //   id: 'XpXf',
      //   type: 'number',
      //   number: 2
      // },
      // 'Cost of next trip': {
      //   id: 'Xpaf',
      //   type: 'number',
      //   number: 2
      // },
      // 'Last ordered': {
      //   id: 'ERd%5E',
      //   type: 'date',
      //   date: {
      //     start: '2020-03-10',
      //     end: null,
      //     time_zone: null
      //   }
      // },
      // Meals: {
      //   id: 'vYdV',
      //   type: 'relation',
      //   relation: [
      //     {
      //       id: '1jdo7fb2-95e6-4b37-a696-036e5eac5cf6'
      //     }
      //   ]
      // },
      // 'Store availability': {
      //   id: 'z%7D%5C%3C',
      //   type: 'multi_select',
      //   multi_select: [
      //     {
      //       id: '2f998e2d-7b1c-485b-ba6b-5e6a815ec8f5',
      //       name: 'Rainbow Grocery',
      //       color: 'purple'
      //     },
      //     {
      //       id: '2f998e2d-7b1c-485b-ba6b-5e6a815ec8f5',
      //       name: "Gus's Community Market",
      //       color: 'green'
      //     }
      //   ]
      // },
      // '+1': {
      //   id: 'KpQq',
      //   type: 'people',
      //   people: [
      //     {
      //       object: 'user',
      //       id: '285e5768-3fdc-4742-ab9e-125f9050f3b8',
      //       name: 'Example Avo',
      //       avatar_url: null,
      //       type: 'person',
      //       person: {
      //         email: 'avo@example.com'
      //       }
      //     }
      //   ]
      // },
      // Photos: {
      //   id: 'KpQq',
      //   type: 'files',
      //   files: [
      //     {
      //       type: 'external',
      //       name: 'avocado',
      //       external:
      //         'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e6a352a8-8381-44d0-a1dc-9ed80e62b53d/avocado.jpg'
      //     }
      //   ]
      // }
    },
    children: [
      {
        object: 'block',
        id: () => guid(),
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
      }
    ]
  }
  return pageItem
}
//   blockItem: {
//     object: 'block',
//     id: '9bc30ad4-9373-46a5-84ab-0a7845ee52e6',
//     created_time: '2021-03-16T16:31:00.000Z',
//     created_by: {
//       object: 'user',
//       id: 'cb38e95d-00cf-4e7e-adce-974f4a44a547'
//     },
//     last_edited_time: '2021-03-16T16:32:00.000Z',
//     last_edited_by: {
//       object: 'user',
//       id: 'e79a0b74-3aba-4149-9f74-0bb5791a6ee6'
//     },
//     has_children: false,
//     type: 'to_do',
//     archived: false,
//     to_do: {
//       rich_text: [
//         {
//           type: 'text',
//           text: {
//             content: 'Lacinato kale',
//             link: null
//           },
//           annotations: {
//             bold: false,
//             italic: false,
//             strikethrough: false,
//             underline: false,
//             code: false,
//             color: 'default'
//           },
//           plain_text: 'Lacinato kale',
//           href: null
//         }
//       ],
//       checked: false,
//       color: 'default'
//     }
//   }
