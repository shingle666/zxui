# zx-time-picker 时间选择器

基于 Element Plus 设计，适用于 uni-app 的时间选择器组件，支持 H5、小程序、App，兼容多端。

## 功能特性
- 支持单时间点选择、时间范围选择
- 支持禁用部分小时/分钟/秒
- 支持只读、禁用、清除
- 支持自定义格式化显示
- 响应式设计，适配移动端
- 完整的事件系统

## 基础用法
```vue
<template>
  <zx-time-picker v-model="time" placeholder="请选择时间" />
</template>
<script setup>
import { ref } from 'vue'
const time = ref('12:00:00')
</script>
```

## 选择时间范围
```vue
<zx-time-picker v-model="timeRange" is-range range-separator="至" start-placeholder="开始" end-placeholder="结束" />
```

## 禁用部分时间
```vue
<zx-time-picker v-model="time" :disabled-hours="disabledHours" :disabled-minutes="disabledMinutes" :disabled-seconds="disabledSeconds" />
```

## 属性说明
| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值，单选为字符串，范围为数组 | string/array | '' |
| is-range | 是否为时间范围选择 | boolean | false |
| format | 显示在输入框中的格式 | string | HH:mm:ss |
| value-format | 绑定值的格式 | string | '' |
| readonly | 完全只读 | boolean | false |
| disabled | 禁用 | boolean | false |
| clearable | 是否显示清除按钮 | boolean | true |
| placeholder | 占位内容 | string | 请选择时间 |
| start-placeholder | 范围选择时开始时间的占位内容 | string | 开始时间 |
| end-placeholder | 范围选择时结束时间的占位内容 | string | 结束时间 |
| range-separator | 选择范围时的分隔符 | string | - |
| show-seconds | 是否显示秒 | boolean | true |
| prefix-icon | 自定义前缀图标 | string | '' |
| suffix-icon | 自定义后缀图标 | string | clock |
| clear-icon | 自定义清除图标 | string | close-circle |
| cancel-text | 取消按钮文字 | string | 取消 |
| confirm-text | 确认按钮文字 | string | 确定 |
| title | 弹窗标题 | string | 选择时间 |
| disabled-hours | 禁用小时选项 | Function | - |
| disabled-minutes | 禁用分钟选项 | Function | - |
| disabled-seconds | 禁用秒选项 | Function | - |
| default-value | 选择器打开时默认显示的时间 | string/array | - |

## 事件说明
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 绑定值变化时触发 | (value) |
| change | 用户确认选定的值时触发 | (value) |
| blur | 组件失去焦点时触发 | - |
| focus | 组件获得焦点时触发 | - |
| clear | 用户点击清除按钮时触发 | - |
| visible-change | 弹窗显示/隐藏时触发 | (visible) |

## 插槽说明
| 名称 | 说明 |
| --- | --- |
| prefix-icon | 自定义前缀图标 |
| suffix-icon | 自定义后缀图标 |
| clear-icon | 自定义清除图标 |

## 使用示例
详见 `src/pages/components/time/picker.vue`

## 注意事项
1. 组件基于原生 picker-view 实现，兼容 H5、小程序、App
2. 禁用选项需返回对应的禁用项数组
3. 图标可自定义为文字或自定义组件
4. 建议配合 uni-app 3.x + Vue3 使用

## 参考文档
- [Element Plus 时间选择器](https://element-plus.org/zh-CN/component/time-picker.html)
