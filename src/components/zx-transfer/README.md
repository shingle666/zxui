# zx-transfer 穿梭框组件

一个支持 H5、微信小程序、App 的多端穿梭框组件，基于 uni-app + vue3 + <script setup> 实现，参考 Element Plus Transfer 设计。

## 功能特性
- 支持左右穿梭、批量选择、禁用项
- 支持搜索过滤
- 支持字段别名
- 支持插槽自定义内容、底部、空内容
- 适配多端（H5/小程序/APP），不依赖浏览器特有 DOM

## 基本用法
```vue
<template>
  <zx-transfer v-model="value" :data="data" />
</template>

<script setup>
import { ref } from 'vue'
import zxTransfer from '@/components/zx-transfer/zx-transfer.vue'

const data = ref([
  { key: 1, label: '选项一' },
  { key: 2, label: '选项二' },
  { key: 3, label: '选项三', disabled: true }
])
const value = ref([2])
</script>
```

## 属性（Props）
| 属性名              | 说明                         | 类型      | 默认值         |
|---------------------|------------------------------|-----------|----------------|
| modelValue / v-model| 右侧列表选中项的 key 数组     | Array     | []             |
| data                | 数据源，见下表                | Array     | []             |
| filterable          | 是否可搜索                    | Boolean   | false          |
| filterPlaceholder   | 搜索框占位符                  | String    | 请输入搜索内容  |
| filterMethod        | 自定义搜索方法                | Function  | -              |
| props               | 字段别名 {key,label,disabled} | Object    | {key:'key',label:'label',disabled:'disabled'} |
| leftTitle           | 左侧标题                      | String    | 列表1          |
| rightTitle          | 右侧标题                      | String    | 列表2          |
| emptyText           | 空内容提示                    | String    | 暂无数据        |
| leftDefaultChecked  | 左侧初始勾选项 key 数组       | Array     | []             |
| rightDefaultChecked | 右侧初始勾选项 key 数组       | Array     | []             |

### 数据源格式
默认：
```js
[
  { key: 1, label: '选项一', disabled: false },
  ...
]
```
可通过 `props` 属性自定义字段名。

## 事件（Events）
| 事件名              | 说明                       | 回调参数                      |
|---------------------|----------------------------|-------------------------------|
| update:modelValue   | v-model 绑定值变化时触发    | 新的 key 数组                 |
| change              | 穿梭操作后触发              | 新 key 数组, 方向, 移动的 key |
| left-check-change   | 左侧勾选项变化时触发        | 勾选的 key 数组               |
| right-check-change  | 右侧勾选项变化时触发        | 勾选的 key 数组               |

## 插槽（Slots）
| 插槽名         | 说明                       | 参数         |
|----------------|----------------------------|--------------|
| option         | 自定义数据项内容            | { option }   |
| left-footer    | 左侧底部自定义内容          | -            |
| right-footer   | 右侧底部自定义内容          | -            |
| left-empty     | 左侧无数据时自定义内容      | -            |
| right-empty    | 右侧无数据时自定义内容      | -            |

## 进阶用法
### 可搜索
```vue
<zx-transfer v-model="value" :data="data" filterable filter-placeholder="搜索..." />
```

### 字段别名
```vue
<zx-transfer
  v-model="value"
  :data="data"
  :props="{ key: 'id', label: 'desc', disabled: 'disable' }"
/>
```

### 自定义内容
```vue
<zx-transfer v-model="value" :data="data">
  <template #option="{ option }">
    <view>{{ option.label }} <text v-if="option.disabled">(禁用)</text></view>
  </template>
  <template #left-footer>
    <text>左侧底部自定义</text>
  </template>
  <template #right-footer>
    <text>右侧底部自定义</text>
  </template>
</zx-transfer>
```

## 注意事项
- 请确保 data 中每项的 key 唯一。
- 组件高度、样式可通过外部样式类自定义。
- 适用于 uni-app H5、微信小程序、App 等多端。

## 参考文档
- [Element Plus Transfer 穿梭框](https://element-plus.org/zh-CN/component/transfer.html)
