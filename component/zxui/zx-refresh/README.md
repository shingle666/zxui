# zx-refresh 下拉刷新组件

一个基于 uni-app、Vue3 <script setup> 语法开发的高兼容性下拉刷新组件，适配 H5、小程序、App。支持 nvue 原生刷新、H5/小程序自定义刷新动画，支持多种状态文本、事件，适合自定义各类下拉刷新场景。

## ✨ 组件特性
- 支持多端（H5、App、各类小程序）
- 支持 nvue 原生 refresh、H5/小程序自定义动画
- 支持自定义刷新提示文本、动画
- 事件丰富，便于扩展
- 不依赖浏览器特有 DOM
- 使用 Vue3 <script setup> 语法

## 📦 属性（Props）
| 属性名         | 类型            | 默认值   | 说明                         |
|----------------|----------------|----------|------------------------------|
| display        | String         | 'hide'   | nvue下控制显示/隐藏          |
| refreshText    | Array          | ['继续下拉刷新','松开手指开始刷新','数据刷新中','数据已刷新'] | 各状态下的提示文本 |
| refreshFontSize| Number         | 28       | 刷新提示字体大小（rpx）      |
| triggerHeight  | Number         | 50       | 触发刷新的下拉高度           |

## 🧲 事件（Events）
| 事件名         | 说明           | 回调参数 |
|----------------|----------------|----------|
| refresh        | nvue原生刷新   | event    |
| pullingdown    | 下拉过程事件   | event    |
| reload         | H5/小程序下拉触发刷新 | 无 |

## 🛠️ 平台兼容性
- H5
- App（iOS/Android）
- 微信/支付宝/百度/抖音/QQ/快手等主流小程序

## 🚀 基础用法
```vue
<template>
  <zx-refresh @reload="onReload" />
  <view>页面内容...</view>
</template>

<script setup>
import zxRefresh from '@/components/zx-refresh/zx-refresh.vue'
function onReload() {
  // 触发刷新逻辑
}
</script>
```

## 🎯 nvue 原生用法
```vue
<zx-refresh display="show" @refresh="onRefresh" @pullingdown="onPullingDown" />
```

## 💡 注意事项
- nvue 平台下 display 控制显示，H5/小程序下拉自动控制。
- 组件已使用 <script setup> 语法，推荐配合 Vue3/uni-app3 项目使用。
- 如需自定义动画/文本，可传入 refreshText 属性。

---
如需更复杂的下拉刷新场景，建议配合自定义插槽或动画扩展。
