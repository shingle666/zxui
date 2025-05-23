# ZxSpace 组件示例

这个目录包含了 ZxSpace 间距组件的使用示例，专为 **uni-app** 环境优化。

## 文件说明

- `demo.vue` - 完整的组件演示页面，展示所有功能特性
- `simple.vue` - 简单的测试页面，用于快速验证组件功能

## 如何使用

1. 在你的 Vue 页面中导入组件：
```javascript
import ZxSpace from '../../../components/zx-space/zx-space.vue'
```

2. 在 template 中使用：
```vue
<template>
  <zx-space>
    <view>Item 1</view>
    <view>Item 2</view>
    <view>Item 3</view>
  </zx-space>
</template>
```

## uni-app 适配说明

- 使用 `<view>` 标签替代 `<div>`，确保跨平台兼容性
- 分隔符仅支持字符串类型，不支持复杂的 VNode
- 使用 JavaScript 而非 TypeScript，降低配置复杂度
- 样式使用 `:deep()` 选择器进行穿透

## 访问示例

- 完整演示: `/pages/components/space/demo`
- 简单测试: `/pages/components/space/simple`

## 主要特性

- ✅ 水平和垂直布局
- ✅ 可自定义间距大小
- ✅ 支持自动换行
- ✅ 支持字符串分隔符
- ✅ 支持对齐方式设置
- ✅ 支持填充容器
- ✅ 响应式设计
- ✅ 暗色主题支持
- ✅ uni-app 跨平台兼容

## 平台支持

- ✅ H5
- ✅ 小程序（微信、支付宝、百度等）
- ✅ App（iOS、Android）
- ✅ 快应用 