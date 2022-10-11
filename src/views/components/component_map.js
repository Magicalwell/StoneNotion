import { h } from 'vue'
import { modelValueComponent } from '../../utils/vue3transform'
import ToggleWidget from '../components/Collapse/index'
import CheckboxWidget from '../components/Checkbox/index'
import CodeWidget from '../components/CodeEdit/index'
import TableWidget from '../components/TableWidge/tablewidget.vue'
import TextWidget from '../components/TableWidge/textwidge.vue'
const widgetComponents = {
  //   CheckboxesWidget,
  //   RadioWidget,
  //   InputWidget: modelValueComponent('a-input'),
  head1: {
    setup(props, { attrs }) {
      return () =>
        h(TextWidget, {
          ...attrs,
          ...props,
          widgetType: { level: 1, type: 'head' }
        })
    }
  },
  head2: {
    setup(props, { attrs }) {
      return () =>
        h(TextWidget, {
          ...attrs,
          ...props,
          widgetType: { level: 2, type: 'head' }
        })
    }
  },
  head3: {
    setup(props, { attrs }) {
      return () =>
        h(TextWidget, {
          ...attrs,
          ...props,
          widgetType: { level: 3, type: 'head' }
        })
    }
  },
  head4: {
    setup(props, { attrs }) {
      return () =>
        h(TextWidget, {
          ...attrs,
          ...props,
          widgetType: { level: 4, type: 'head' }
        })
    }
  },
  paragraph: TextWidget,
  toggle: ToggleWidget,
  checkbox: CheckboxWidget,
  code: CodeWidget,
  table: TableWidget,
  bulletList: {
    setup(props, { attrs }) {
      return () =>
        h(TextWidget, {
          ...attrs,
          ...props,
          widgetType: { type: 'bulletList' }
        })
    }
  },
  orderList: {
    setup(props, { attrs }) {
      return () =>
        h(TextWidget, {
          ...attrs,
          ...props,
          widgetType: { type: 'OrderedList' }
        })
    }
  }
  //   SwitchWidget: modelValueComponent('a-switch', {
  //     model: 'checked'
  //   })
}

export default widgetComponents
