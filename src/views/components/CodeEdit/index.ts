import codeEdit from './codeEdit.vue'

/* istanbul ignore next */
codeEdit.install = function (Vue: any) {
  Vue.component(codeEdit.name, codeEdit)
}

export default codeEdit
