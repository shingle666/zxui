# zx-drag 拖拽排序组件

一个基于 JavaScript、Vue3 setup 语法开发，适配 H5、小程序、App 的高性能通用拖拽排序组件。

## ✨ 主要特性
- 支持 H5、微信/各类小程序、App（uni-app 全端）
- 支持多列布局、固定项、编辑模式
- 拖拽流畅不卡顿，体验优秀
- 不依赖浏览器特有 DOM API，全部用 uni-app 官方 API
- 拖拽中/拖拽结束事件，支持自定义内容插槽

## 📦 属性（Props）
| 属性名      | 说明               | 类型    | 默认值 |
| ----------- | ------------------ | ------- | ------ |
| listData    | 数据源，建议带 id 和 fixed 字段 | Array   | []     |
| columns     | 列数               | Number  | 3      |
| topSize     | 顶部固定高度        | Number  | 0      |
| bottomSize  | 底部固定高度        | Number  | 0      |
| itemHeight  | 每个 item 高度（rpx）| Number  | 0      |
| scrollTop   | 页面滚动高度        | Number  | 0      |
| isEdit      | 是否为编辑模式      | Boolean | true   |

## 🧩 事件（Events）
| 事件名   | 说明           | 回调参数           |
| -------- | -------------- | ------------------ |
| change   | 拖拽中顺序变化 | { listData }       |
| sortend  | 拖拽结束       | { listData }       |
| click    | item 点击      | { key, data, extra } |

## 🔌 插槽（Slots）
- 默认插槽：自定义每个 item 的内容，slot props 包含 entity（数据项）、index、isEdit、fixed 等

## 🛠️ 平台兼容性
- H5、微信/各类小程序、App（uni-app 全端）
- 不依赖浏览器特有 DOM API

## 🚀 使用示例
```vue
<template>
  <zx-drag
    v-model:listData="dragList"
    :columns="3"
    :itemHeight="120"
    :isEdit="isEdit"
    @sortend="onSortEnd"
    @change="onChange"
  >
    <template #default="{ entity, index, isEdit, fixed }">
      <view class="drag-item" :class="{ fixed }">
        <text>{{ entity.name }}</text>
        <text v-if="fixed" class="fixed-label">固定</text>
        <text v-if="isEdit" class="edit-label">可拖拽</text>
      </view>
    </template>
  </zx-drag>
  <button @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</button>
</template>
<script setup>
import { ref } from 'vue'
import zxDrag from '@/components/zx-drag/zx-drag.vue'
const isEdit = ref(true)
const dragList = ref([
  { id: 1, name: '模块一', fixed: false },
  { id: 2, name: '模块二', fixed: false },
  { id: 3, name: '模块三', fixed: true },
  { id: 4, name: '模块四', fixed: false },
  { id: 5, name: '模块五', fixed: false },
  { id: 6, name: '模块六', fixed: false }
])
function onSortEnd(e) {
  console.log('排序结束', e.listData)
}
function onChange(e) {
  console.log('顺序变化', e.listData)
}
</script>
```

## ⚠️ 注意事项
- listData 中每一项建议带有唯一 id 和 fixed 字段，fixed 为 true 的项不可拖拽、不可换位
- 需在编辑模式（isEdit=true）下才可拖拽
- itemHeight 建议与实际 item 高度一致，否则拖拽定位可能不准
- 支持多列布局，columns 可自定义
- 拖拽事件已做防抖和边界处理，体验流畅

## ❓ 常见问题
- Q: 为什么 fixed 项拖不动？
  A: fixed=true 的项为固定项，设计如此。
- Q: 拖拽时有延迟？
  A: itemHeight/columns 设置需与实际布局一致，避免误差。
- Q: 支持哪些小程序平台？
  A: 支持 uni-app 所有主流小程序平台。

## 👨‍💻 贡献者
- @tanzhenxing

---

如有问题或建议，欢迎 issue 或 PR！
