# zx-time-select 时间选择器

用于选择时间，支持 H5、小程序、App，适配 uniapp。参考自 Element Plus 的 el-time-select。

## 基本用法

```
<zx-time-select v-model="time" />
```

## 属性（Props）

| 属性名         | 说明                 | 类型    | 默认值    |
| -------------- | -------------------- | ------- | --------- |
| modelValue     | 绑定值，格式 HH:mm   | String  | —         |
| start          | 可选起始时间         | String  | 09:00     |
| end            | 可选结束时间         | String  | 18:00     |
| step           | 时间间隔（步长）     | String  | 00:30     |
| format         | 显示格式（dayjs格式）| String  | HH:mm     |
| minTime        | 最早可选时间         | String  | —         |
| maxTime        | 最晚可选时间         | String  | —         |
| placeholder    | 占位符               | String  | 请选择时间 |
| clearable      | 是否可清空           | Boolean | true      |
| disabled       | 是否禁用             | Boolean | false     |

## 事件（Events）

| 事件名   | 说明             | 回调参数         |
| -------- | ---------------- | --------------- |
| change   | 选中时间时触发   | value: String   |
| clear    | 点击清空时触发   | —               |

## 插槽（Slots）

无

## 用法示例

```
<template>
  <zx-time-select v-model="time" start="08:30" end="18:30" step="00:15" format="hh:mm A" />
</template>

<script setup>
import { ref } from 'vue'
const time = ref('')
</script>
```

## 注意事项
- 组件内部使用 `<picker mode="time">`，兼容各端。
- 不支持秒级选择。
- `format` 仅影响显示，实际绑定值始终为 `HH:mm` 格式。
- 组件无浏览器特有 DOM 依赖。

## 参考文档
- [Element Plus 时间选择器](https://element-plus.org/zh-CN/component/time-select.html)
