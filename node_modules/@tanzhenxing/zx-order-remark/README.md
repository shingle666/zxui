# OrderRemark 订单备注

订单备注组件，专门用于订单备注场景，支持字数限制、快捷短语、清除功能、表单验证等功能。

## 特性

- 📝 支持多行文本输入
- 🔢 字数统计和限制
- 🚀 快捷短语选择
- ✨ 清除按钮
- 📋 表单验证
- 🎨 多种边框样式
- 📱 多端兼容（H5、小程序、App）
- 🎯 专为订单备注场景设计

## 基础用法

```vue
<template>
  <zx-order-remark 
    v-model="remark" 
    title="订单备注" 
    placeholder="请输入您的订单备注"
  />
</template>

<script setup>
import { ref } from 'vue'

const remark = ref('')
</script>
```

## 快捷短语

```vue
<template>
  <zx-order-remark 
    v-model="remark" 
    title="订单备注" 
    :quick-phrases="phrases"
    phrases-title="常用备注"
    @phrase-select="onPhraseSelect"
  />
</template>

<script setup>
import { ref } from 'vue'

const remark = ref('')
const phrases = [
  '尽快发货',
  '包装仔细一点',
  '送货上门',
  '工作日配送',
  '周末配送',
  '节假日不配送'
]

const onPhraseSelect = (phrase) => {
  console.log('选择了短语:', phrase)
}
</script>
```

## 表单验证

```vue
<template>
  <zx-order-remark 
    v-model="remark" 
    title="订单备注" 
    required
    :min-length="5"
    :max-length="100"
    :error-message="errorMsg"
    @validate="onValidate"
  />
</template>

<script setup>
import { ref } from 'vue'

const remark = ref('')
const errorMsg = ref('')

const onValidate = (result) => {
  if (!result.valid) {
    errorMsg.value = result.message
  } else {
    errorMsg.value = ''
  }
}
</script>
```

## 自定义样式

```vue
<template>
  <zx-order-remark 
    v-model="remark" 
    title="订单备注" 
    border="bottom"
    background-color="#f8f9fa"
    border-color="#409eff"
    border-radius="12rpx"
    font-size="16px"
    color="#303133"
    padding="32rpx"
  />
</template>
```

## 禁用状态

```vue
<template>
  <zx-order-remark 
    v-model="remark" 
    title="订单备注" 
    disabled
    :quick-phrases="phrases"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value / v-model | 输入框的内容 | String / Number | '' |
| title | 标题文本 | String | '' |
| required | 是否必填，显示红色星号 | Boolean | false |
| placeholder | 输入框为空时占位符 | String / Number | '请输入订单备注' |
| placeholder-class | 指定placeholder的样式类 | String | 'textarea-placeholder' |
| placeholder-style | 指定placeholder的样式 | String / Object | '' |
| height | 输入框高度 | String / Number | '120rpx' |
| confirm-type | 设置键盘右下角按钮的文字 | String | 'done' |
| confirm-hold | 点击键盘右下角按钮时是否保持键盘不收起 | Boolean | false |
| disabled | 是否禁用 | Boolean | false |
| show-count | 是否显示字数统计 | Boolean | true |
| show-maxlength-in-count | 字数统计是否显示最大长度 | Boolean | true |
| clearable | 是否显示清除按钮 | Boolean | true |
| focus | 是否自动获取焦点 | Boolean | false |
| auto-focus | 自动聚焦，拉起键盘 | Boolean | false |
| auto-height | 是否自动增加高度 | Boolean | true |
| fixed | 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true | Boolean | false |
| cursor-spacing | 指定光标与键盘的距离 | Number | 0 |
| cursor | 指定focus时的光标位置 | String / Number | -1 |
| show-confirm-bar | 是否显示键盘上方带有"完成"按钮那一栏 | Boolean | true |
| selection-start | 光标起始位置 | Number | -1 |
| selection-end | 光标结束位置 | Number | -1 |
| adjust-position | 键盘弹起时，是否自动上推页面 | Boolean | true |
| disable-default-padding | 是否去掉 iOS 下的默认内边距 | Boolean | false |
| hold-keyboard | focus时，点击页面的时候不收起键盘 | Boolean | false |
| auto-blur | 键盘收起时，是否自动失去焦点 | Boolean | false |
| maxlength | 最大输入长度，设置为 -1 的时候不限制最大长度 | String / Number | 200 |
| border | 边框类型，surround-四周边框，none-无边框，bottom-底部边框 | String | 'surround' |
| ignore-composition-event | 是否忽略组件内对文本合成系统事件的处理 | Boolean | true |
| inputmode | 用户在编辑元素或其内容时可能输入的数据类型的提示 | String | 'text' |
| font-size | 字体大小 | String / Number | '15px' |
| color | 字体颜色 | String | '#606266' |
| background-color | 背景色 | String | '#fff' |
| border-radius | 边框圆角 | String / Number | '8rpx' |
| border-color | 边框颜色 | String | '#e4e7ed' |
| padding | 内边距 | String / Number | '24rpx' |
| quick-phrases | 快捷短语列表 | Array | [] |
| phrases-title | 快捷短语标题 | String | '常用短语' |
| error-message | 错误提示信息 | String | '' |
| validate-on-blur | 失焦时是否验证 | Boolean | true |
| min-length | 最小输入长度 | Number | 0 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| focus | 输入框聚焦时触发 | event |
| blur | 输入框失去焦点时触发 | event |
| linechange | 输入框行数变化时调用 | event |
| input | 当键盘输入时，触发 input 事件 | value |
| change | 输入框内容变化时触发 | value |
| confirm | 点击完成时，触发 confirm 事件 | event |
| keyboardheightchange | 键盘高度发生变化的时候触发此事件 | event |
| clear | 点击清除按钮时触发 | - |
| phrase-select | 选择快捷短语时触发 | phrase |
| validate | 验证时触发 | { valid, message, value } |

### Methods

通过 ref 可以获取到 OrderRemark 实例并调用实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| validate | 手动验证输入内容 | - | Boolean |
| clear | 清空输入内容 | - | - |
| focus | 获取焦点 | - | - |
| blur | 失去焦点 | - | - |

### Slots

暂无插槽。

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --zx-order-remark-bg-color | #fff | 背景色 |
| --zx-order-remark-border-color | #e4e7ed | 边框颜色 |
| --zx-order-remark-border-radius | 8rpx | 边框圆角 |
| --zx-order-remark-padding | 24rpx | 内边距 |
| --zx-order-remark-font-size | 15px | 字体大小 |
| --zx-order-remark-color | #606266 | 字体颜色 |
| --zx-order-remark-error-color | #f56c6c | 错误颜色 |
| --zx-order-remark-count-color | #909193 | 字数统计颜色 |

## 注意事项

1. 组件基于 `textarea` 原生组件实现，在不同平台可能存在样式差异
2. 在小程序中，`textarea` 是原生组件，层级较高，使用时需注意遮挡问题
3. 快捷短语功能会直接替换当前输入内容，而不是追加
4. 字数限制是按字符数计算，包括中英文、数字、符号等
5. 验证功能需要配合 `validate-on-blur` 或手动调用 `validate` 方法

## 更新日志

### v1.0.0

- 🎉 新增 OrderRemark 订单备注组件
- ✨ 支持字数统计和限制
- ✨ 支持快捷短语选择
- ✨ 支持表单验证
- ✨ 支持多种边框样式
- ✨ 支持多端兼容