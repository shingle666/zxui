# zx-list 通用列表组件

一个基于 uni-app、Vue3 <script setup> 语法开发的高兼容性列表容器组件，适配 H5、小程序、App。支持插槽、常用属性、事件，适合自定义各类列表场景。

## ✨ 组件特性
- 支持多端（H5、App、各类小程序）
- 支持插槽自定义内容
- 支持边框、滚动、反向渲染等常用属性
- 事件丰富，便于扩展
- 不依赖浏览器特有 DOM
- 使用 Vue3 <script setup> 语法，类型推断友好

## 📦 属性（Props）
| 属性名           | 类型            | 默认值   | 说明                         |
|------------------|----------------|----------|------------------------------|
| border           | Boolean        | true     | 是否显示上下边框              |
| scrollY          | Boolean/String | false    | 是否开启纵向滚动（nvue有效）  |
| enableBackToTop  | Boolean/String | false    | 是否开启回到顶部（nvue有效）  |
| renderReverse    | Boolean        | false    | 是否反向渲染（nvue有效）      |
| stackFromEnd     | Boolean        | false    | 是否内容从底部堆叠（nvue有效）|

## 🧩 插槽（Slots）
- 默认插槽：列表内容，可自定义任意结构

## 🧲 事件（Events）
| 事件名         | 说明                 | 回调参数         |
|----------------|----------------------|------------------|
| scroll         | 滚动时触发（nvue）   | event            |
| scrolltolower  | 滚动到底部时触发     | event            |

## 🛠️ 平台兼容性
- H5
- App（iOS/Android）
- 微信/支付宝/百度/抖音/QQ/快手等主流小程序

## 🚀 基础用法
```vue
<template>
  <zx-list>
    <view v-for="item in list" :key="item.id">{{ item.title }}</view>
  </zx-list>
</template>

<script setup>
import { ref } from 'vue'
import zxList from '@/components/zx-list/zx-list.vue'

const list = ref([
  { id: 1, title: '列表项1' },
  { id: 2, title: '列表项2' }
])
</script>
```

## 🌈 插槽自定义内容
```vue
<zx-list>
  <view class="item">
    <image src="..." />
    <text>标题</text>
    <text class="right">更多</text>
  </view>
</zx-list>
```

## 🎯 事件用法
```vue
<zx-list @scroll="onScroll" @scrolltolower="onToLower">
  <view v-for="item in list" :key="item.id">{{ item.title }}</view>
</zx-list>

<script setup>
function onScroll(e) {
  // 处理滚动事件
}
function onToLower(e) {
  // 处理滚动到底部事件
}
</script>
```

## 🧪 进阶用法
### 反向渲染
```vue
<zx-list :renderReverse="true">
  <view v-for="item in list" :key="item.id">{{ item.title }}</view>
</zx-list>
```

### 显示/隐藏边框
```vue
<zx-list :border="false">
  <view v-for="item in list" :key="item.id">{{ item.title }}</view>
</zx-list>
```

### 开启回到顶部（nvue有效）
```vue
<zx-list :enableBackToTop="true">
  <view v-for="item in list" :key="item.id">{{ item.title }}</view>
</zx-list>
```

## 💡 注意事项
- 组件已使用 <script setup> 语法，推荐配合 Vue3/uni-app3 项目使用。
- nvue 平台下部分属性/事件才生效，详见 uni-app 官方文档。
- 建议列表项内容使用插槽灵活自定义。

## 📚 参考文档
- [uni-list 官方文档](https://uniapp.dcloud.net.cn/component/uniui/uni-list.html)

---
如需更复杂的列表项样式，建议配合自定义子组件或插槽实现。
