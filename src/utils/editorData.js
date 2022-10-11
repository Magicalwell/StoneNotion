export function formatFormLabelWidth(value) {
  return value ? `${value * 4}px` : undefined
}

// 转回来
export function deFormatFormLabelWidth(value) {
  return parseFloat(value) / 4
}
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isEmptyObject(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false
    }
  }
  return true
}
function filterObj(
  obj,
  filter = (key, value) =>
    (isObject(value) && !isEmptyObject(value)) || value !== undefined
) {
  const result = {}
  if (!isObject(obj)) return result

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const filterVal = filter(key, obj[key])
      // 返回值Bool
      const isBoolOrUndefined =
        filterVal === undefined || Boolean(filterVal) === filterVal

      // 如果是 Boolean 类型，使用原值
      if (isBoolOrUndefined && filterVal) {
        result[key] = obj[key]
      }

      // 非Boolean类型 使用返回后的值
      if (!isBoolOrUndefined) {
        result[key] = filterVal
      }
    }
  }

  return result
}
export function editorItem2SchemaFieldProps(editorItem, formData) {
  console.log(editorItem, ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;')
  // baseValue
  // console.log(editorItem)
  // const {
  //   schemaOptions: baseSchemaOptions,
  //   uiOptions: { required, ...baseUiOptions } = {}
  // } = editorItem.componentValue.baseValue

  // // options
  // const { schemaOptions, uiOptions } = editorItem.componentValue.options || {}

  // // rules
  // const { schemaOptions: ruleSchemaOptions, uiOptions: ruleUiOptions } =
  //   editorItem.componentValue.rules || {}

  // // schema
  // const schema = {
  //   ...JSON.parse(JSON.stringify(editorItem.componentPack.viewSchema)),
  //   ...filterObj({
  //     ...baseSchemaOptions,
  //     ...schemaOptions,
  //     ...ruleSchemaOptions
  //   })
  // }

  // // false 时可省略的属性值
  // // todo: 这里需要优化自动对比default的值
  // const ignoreAttrs = {
  //   // slider
  //   showInput: false,
  //   showStops: false,
  //   showInputControls: true,
  //   showTooltip: true,
  //   debounce: 300,

  //   // input number
  //   controlsPosition: 'default',
  //   stepStrictly: false,

  //   // input
  //   clearable: false,
  //   disabled: false,
  //   showPassword: false,
  //   showWordLimit: false,
  //   type: 'text',

  //   showTitle: true,
  //   showDescription: true
  // }

  // // uiSchema
  // const { hidden, widget, field, fieldProps, ...mergeUiOptions } = filterObj(
  //   {
  //     ...baseUiOptions,
  //     ...uiOptions,
  //     ...ruleUiOptions
  //   },
  //   (key, value) => {
  //     // 省略掉默认值
  //     if (ignoreAttrs[key] === value) return false

  //     if (key === 'labelWidth') {
  //       return formatFormLabelWidth(value)
  //     }

  //     // 过滤undefined
  //     return value !== undefined
  //   }
  // )

  // const uiSchema = {
  //   ...Object.entries({
  //     hidden,
  //     widget,
  //     field,
  //     fieldProps
  //   }).reduce((preVal, [key, value]) => {
  //     if (value !== undefined) {
  //       preVal[`ui:${key}`] = value
  //     }
  //     return preVal
  //   }, {}),
  //   ...(isEmptyObject(mergeUiOptions)
  //     ? {}
  //     : {
  //       'ui:options': mergeUiOptions
  //     })
  // }

  return {
    // rootSchema: schema,
    // schema,
    // required,
    // rootFormData: formData,
    // curNodePath: editorItem.componentValue.property || '',
    // uiSchema
  }
}
// export function editorItem2SchemaFieldProps(editorItem, formData) {
//   // baseValue
//   const {
//     schemaOptions: baseSchemaOptions,
//     uiOptions: { required, ...baseUiOptions } = {}
//   } = editorItem.componentValue.baseValue

//   // options
//   const { schemaOptions, uiOptions } = editorItem.componentValue.options || {}

//   // rules
//   const { schemaOptions: ruleSchemaOptions, uiOptions: ruleUiOptions } =
//     editorItem.componentValue.rules || {}

//   // schema
//   const schema = {
//     ...JSON.parse(JSON.stringify(editorItem.componentPack.viewSchema)),
//     ...filterObj({
//       ...baseSchemaOptions,
//       ...schemaOptions,
//       ...ruleSchemaOptions
//     })
//   }

//   // false 时可省略的属性值
//   // todo: 这里需要优化自动对比default的值
//   const ignoreAttrs = {
//     // slider
//     showInput: false,
//     showStops: false,
//     showInputControls: true,
//     showTooltip: true,
//     debounce: 300,

//     // input number
//     controlsPosition: 'default',
//     stepStrictly: false,

//     // input
//     clearable: false,
//     disabled: false,
//     showPassword: false,
//     showWordLimit: false,
//     type: 'text',

//     showTitle: true,
//     showDescription: true
//   }

//   // uiSchema
//   const { hidden, widget, field, fieldProps, ...mergeUiOptions } = filterObj(
//     {
//       ...baseUiOptions,
//       ...uiOptions,
//       ...ruleUiOptions
//     },
//     (key, value) => {
//       // 省略掉默认值
//       if (ignoreAttrs[key] === value) return false

//       if (key === 'labelWidth') {
//         return formatFormLabelWidth(value)
//       }

//       // 过滤undefined
//       return value !== undefined
//     }
//   )

//   const uiSchema = {
//     ...Object.entries({
//       hidden,
//       widget,
//       field,
//       fieldProps
//     }).reduce((preVal, [key, value]) => {
//       if (value !== undefined) {
//         preVal[`ui:${key}`] = value
//       }
//       return preVal
//     }, {}),
//     ...(isEmptyObject(mergeUiOptions)
//       ? {}
//       : {
//         'ui:options': mergeUiOptions
//       })
//   }

//   return {
//     rootSchema: schema,
//     schema,
//     required,
//     rootFormData: formData,
//     curNodePath: editorItem.componentValue.property || '',
//     uiSchema
//   }
// }
