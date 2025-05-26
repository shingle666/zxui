# zx-list-ad 广告列表项组件

一个基于 uni-app、Vue3 <script setup> 语法开发的高兼容性广告列表项组件，适配 H5、小程序、App。可嵌入于 zx-list 组件中，支持多端广告展示，便于灵活插入广告内容。

## ✨ 组件特性
- 支持多端（H5、App、各类小程序）
- 可插入 zx-list 作为广告项
- 支持多种广告参数配置
- 事件丰富，便于扩展
- 不依赖浏览器特有 DOM
- 使用 Vue3 <script setup> 语法

## 📦 属性（Props）
| 属性名   | 类型            | 默认值   | 说明                 |
|----------|----------------|----------|----------------------|
| adpid    | String/Number  | ''       | 广告平台ID           |
| unitId   | String         | ''       | 广告单元ID           |
| appid    | String         | ''       | 应用ID（部分平台用） |
| apid     | String         | ''       | 广告位ID（部分平台） |
| type     | String         | 'feed'   | 广告类型             |
| title    | String         | ''       | 预留标题             |

## 🧲 事件（Events）
| 事件名   | 说明           | 回调参数 |
|----------|----------------|----------|
| error    | 广告加载失败   | event    |
| close    | 广告被关闭     | event    |

## 🧩 插槽（Slots）
- 默认插槽：无

## 🛠️ 平台兼容性
- H5
- App（iOS/Android）
- 微信/支付宝/百度/抖音/QQ/快手等主流小程序（需平台支持广告组件）

## 🚀 基础用法
```vue
<template>
  <zx-list>
    <view v-for="item in list" :key="item.id">{{ item.title }}</view>
    <zx-list-ad adpid="1111111111" />
  </zx-list>
</template>

<script setup>
import zxList from '@/components/zx-list/zx-list.vue'
import zxListAd from '@/components/zx-list-ad/zx-list-ad.vue'
const list = [
  { id: 1, title: '内容1' },
  { id: 2, title: '内容2' }
]
</script>
```

## 🎯 事件用法
```vue
<zx-list-ad adpid="1111111111" @error="onAdError" @close="onAdClose" />
<script setup>
function onAdError(e) {
  // 处理广告加载失败
}
function onAdClose(e) {
  // 处理广告关闭
}
</script>
```

## 💡 注意事项
- 需在支持广告组件的平台使用，部分平台需配置广告位ID。
- 建议配合 zx-list 组件使用，便于统一列表风格。
- 组件已使用 <script setup> 语法，推荐配合 Vue3/uni-app3 项目使用。

---
如需更复杂的广告样式，建议配合自定义插槽或样式扩展。 