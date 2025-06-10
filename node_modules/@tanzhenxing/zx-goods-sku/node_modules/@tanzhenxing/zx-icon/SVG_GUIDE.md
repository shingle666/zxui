# ZX-Icon SVG 支持指南

## 概述

ZX-Icon 组件现已全面支持 SVG 图标，包括 SVG 字符串和 SVG 文件路径。本指南将详细介绍如何使用这些功能。

## 功能特性

### ✨ 新增功能

- 🎯 **SVG 字符串支持** - 直接传入 SVG 代码字符串
- 📁 **SVG 文件支持** - 支持 .svg 文件路径
- 🔍 **智能识别** - 自动识别 SVG 内容类型
- 🛡️ **错误处理** - 完善的错误处理和提示
- 🎨 **样式兼容** - 支持 currentColor 和动态样式
- 📱 **跨平台兼容** - 支持 H5、小程序、APP 等平台
- 🔧 **调试友好** - 详细的控制台日志和事件回调

## 使用方法

### 1. SVG 字符串

```vue
<template>
  <!-- 简单 SVG -->
  <zx-icon :name="svgString" size="60rpx"></zx-icon>
  
  <!-- 带颜色的 SVG -->
  <zx-icon :name="coloredSvg" size="60rpx" color="#3498db"></zx-icon>
</template>

<script setup>
const svgString = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2"/>
</svg>`;

const coloredSvg = `<svg width="24" height="24" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" fill="currentColor"/>
</svg>`;
</script>
```

### 2. SVG 文件路径

```vue
<template>
  <!-- 本地 SVG 文件 -->
  <zx-icon name="/static/icons/heart.svg" size="60rpx"></zx-icon>
  
  <!-- 网络 SVG 文件 -->
  <zx-icon name="https://example.com/icon.svg" size="60rpx"></zx-icon>
</template>
```

### 3. 事件处理

```vue
<template>
  <zx-icon 
    :name="svgContent" 
    size="60rpx"
    @svgLoad="onSvgLoad"
    @svgError="onSvgError"
    @click="onClick"
  ></zx-icon>
</template>

<script setup>
const onSvgLoad = (e) => {
  console.log('SVG 加载成功');
};

const onSvgError = (e) => {
  console.error('SVG 加载失败', e);
};

const onClick = (e) => {
  console.log('SVG 被点击');
};
</script>
```

### 4. 组件方法

```vue
<template>
  <zx-icon ref="iconRef" :name="svgContent" size="60rpx"></zx-icon>
  <button @click="getInfo">获取图标信息</button>
</template>

<script setup>
import { ref } from 'vue';

const iconRef = ref();

const getInfo = () => {
  const iconType = iconRef.value.getIconType(); // 'svg' | 'image' | 'font'
  const base64 = iconRef.value.getSvgBase64(); // SVG 的 base64 编码
  
  console.log('图标类型:', iconType);
  console.log('Base64:', base64);
};
</script>
```

## 高级用法

### 1. 动态 SVG

```vue
<template>
  <zx-icon 
    :name="dynamicSvg" 
    :size="iconSize"
    :color="iconColor"
    @click="changeStyle"
  ></zx-icon>
</template>

<script setup>
import { ref } from 'vue';

const iconSize = ref('60rpx');
const iconColor = ref('#3498db');

const dynamicSvg = `<svg viewBox="0 0 24 24">
  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
</svg>`;

const changeStyle = () => {
  iconSize.value = iconSize.value === '60rpx' ? '80rpx' : '60rpx';
  iconColor.value = iconColor.value === '#3498db' ? '#e74c3c' : '#3498db';
};
</script>
```

### 2. 渐变和动画 SVG

```vue
<template>
  <zx-icon :name="gradientSvg" size="80rpx"></zx-icon>
</template>

<script setup>
const gradientSvg = `<svg width="100" height="100" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff6b6b"/>
      <stop offset="100%" style="stop-color:#4ecdc4"/>
    </linearGradient>
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      from="0 50 50"
      to="360 50 50"
      dur="2s"
      repeatCount="indefinite"/>
  </defs>
  <circle cx="50" cy="50" r="40" fill="url(#gradient1)">
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      from="0 50 50"
      to="360 50 50"
      dur="2s"
      repeatCount="indefinite"/>
  </circle>
</svg>`;
</script>
```

## 最佳实践

### 1. SVG 优化

- 使用 `currentColor` 让 SVG 继承文字颜色
- 移除不必要的属性和注释
- 使用相对单位（如 viewBox）而不是固定尺寸
- 压缩 SVG 代码以减少体积

### 2. 性能优化

```vue
<!-- ✅ 推荐：使用 computed 缓存复杂 SVG -->
<script setup>
import { computed } from 'vue';

const complexSvg = computed(() => {
  return `<svg>...</svg>`; // 复杂的 SVG 生成逻辑
});
</script>

<!-- ❌ 不推荐：每次渲染都生成 SVG -->
<template>
  <zx-icon :name="generateSvg()" size="60rpx"></zx-icon>
</template>
```

### 3. 错误处理

```vue
<template>
  <zx-icon 
    :name="svgContent" 
    size="60rpx"
    @svgError="handleError"
  ></zx-icon>
</template>

<script setup>
const handleError = (error) => {
  // 记录错误
  console.error('SVG 加载失败:', error);
  
  // 用户友好的提示
  uni.showToast({
    title: '图标加载失败',
    icon: 'none'
  });
  
  // 可选：切换到备用图标
  // svgContent.value = fallbackSvg;
};
</script>
```

## 平台兼容性

| 平台 | SVG 字符串 | SVG 文件 | 注意事项 |
|------|------------|----------|----------|
| H5 | ✅ | ✅ | 完全支持 |
| 微信小程序 | ✅ | ✅ | 使用 uni.arrayBufferToBase64 |
| 支付宝小程序 | ✅ | ✅ | 同微信小程序 |
| APP-PLUS | ✅ | ✅ | 使用原生 btoa |
| APP-NVUE | ✅ | ⚠️ | 建议使用 base64 |

## 常见问题

### Q: SVG 不显示怎么办？

A: 检查以下几点：
1. SVG 代码是否完整且有效
2. 是否包含 `<svg>` 标签
3. 查看控制台是否有错误信息
4. 尝试使用 `@svgError` 事件调试

### Q: SVG 颜色无法改变？

A: 确保 SVG 中使用了 `currentColor` 或 `fill="currentColor"`：

```svg
<!-- ✅ 可以改变颜色 -->
<svg><path fill="currentColor" d="..."/></svg>

<!-- ❌ 无法改变颜色 -->
<svg><path fill="#000000" d="..."/></svg>
```

### Q: 小程序中 SVG 显示异常？

A: 小程序对 SVG 支持有限，建议：
1. 使用简单的 SVG 图形
2. 避免复杂的动画和滤镜
3. 测试不同小程序平台的兼容性

## 更新日志

### v1.1.0
- ✨ 新增 SVG 字符串支持
- ✨ 新增 SVG 文件路径支持
- ✨ 新增错误处理和事件回调
- ✨ 新增跨平台 base64 编码
- 🐛 修复 SVG 识别不准确的问题
- 💄 优化样式和用户体验

## 贡献

欢迎提交 Issue 和 Pull Request 来改进 SVG 支持功能！