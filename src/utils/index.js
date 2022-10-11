const blockItemMap = new Map([
  [1, 'head1'],
  [2, 'head2'],
  [3, 'head3'],
  [4, 'head4'],
  [5, 'paragraph'],
  [6, 'toggle'],
  [7, 'checkbox'],
  [8, 'code'],
  [9, 'table'],
  [10, 'bulletList'],
  [11, 'orderList']
])
const blockItemDefault = {
  1: {
    has_children: false,
    head1: { rich_text: 'tada!h1', checked: false, color: 'default' }
  },
  2: {
    has_children: false,
    head2: { rich_text: 'tada!h2', checked: false, color: 'default' }
  },
  3: {
    has_children: false,
    head3: { rich_text: 'tada!h3', checked: false, color: 'default' }
  },
  4: {
    has_children: false,
    head4: { rich_text: 'tada!h4', checked: false, color: 'default' }
  },
  5: {
    has_children: false,
    paragraph: { rich_text: 'tada!p', checked: false, color: 'default' }
  },
  6: {
    has_children: false,
    toggle: { rich_text: 'tada!toggle!', checked: false, color: 'default' },
    collapse: [],
    children: []
  },
  7: {
    has_children: false,
    checkbox: { rich_text: 'tada!checkbox!', checked: false, color: 'default' }
  },
  8: {
    has_children: false,
    code: { rich_text: 'tada!code!', checked: false, color: 'default' }
  },
  9: {
    has_children: true,
    table: { rich_text: 'tada!table!', checked: false, color: 'default' },
    children: [
      {
        children: [
          { rich_text: '', width: 100 },
          { rich_text: '', width: 100 }
        ]
      },
      {
        children: [
          { rich_text: '', width: 100 },
          { rich_text: '2313132', width: 100 }
        ]
      }
    ]
  },
  10: {
    has_children: true,
    bulletList: { rich_text: '<ul><li><p></p></li></li></ul>' }
  },
  11: {
    has_children: true,
    orderList: { rich_text: '<ol><li><p></p></li></li></ol>' }
  }
}
export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function getBlockMap(blockId) {
  return blockItemMap.get(blockId)
}
export function getBlockDefault(blockId) {
  return JSON.parse(JSON.stringify(blockItemDefault[blockId]))
}
export default blockItemMap
