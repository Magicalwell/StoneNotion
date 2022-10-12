import { markRaw } from 'vue'
import View from './Input.vue'
// import Setting from './Setting'
// import Schema from './Schema'
const inputWidget = {
  View: markRaw(View),
  //   Setting,
  Schema: 'input'
}
export default inputWidget
