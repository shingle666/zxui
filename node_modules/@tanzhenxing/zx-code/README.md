# zx-code 增强版源代码展示组件

## 概述

`zx-code` 是一个功能丰富的源代码展示组件，专为 uni-app 项目设计。经过全面重构，提供了语法高亮、行号显示、代码复制、全屏模式等多种实用功能。

## 功能特点

### 🎨 核心功能
- ✅ **语法高亮** - 支持 JavaScript、Vue、CSS、HTML 等多种语言
- ✅ **行号显示** - 可切换显示/隐藏行号
- ✅ **代码复制** - 一键复制源代码到剪贴板
- ✅ **全屏模式** - 支持全屏查看代码
- ✅ **自动换行** - 可控制代码是否自动换行
- ✅ **代码统计** - 显示行数、字符数等统计信息

### 🎯 UI/UX 优化
- ✅ **现代化界面** - 渐变色工具栏，美观的卡片式设计
- ✅ **响应式布局** - 适配各种屏幕尺寸
- ✅ **交互反馈** - 复制成功提示、按钮动画效果
- ✅ **可自定义样式** - 支持字体大小、行高等样式配置

### 🔧 开发者友好
- ✅ **TypeScript 支持** - 完整的类型定义
- ✅ **组件 API** - 暴露常用方法供父组件调用
- ✅ **跨平台兼容** - 支持 H5、小程序、App 等平台

## 安装使用

### 基础使用

```vue
<template>
  <zx-code 
    :sourceCode="code"
    language="javascript"
    title="示例代码"
  />
</template>

<script setup>
import zxCode from '@/components/zx-code/zx-code.vue'

const code = `function hello() {
  console.log('Hello World!');
}`
</script>
```

## API 参考

### Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `sourceCode` | String | `''` | 要显示的源代码内容 |
| `showCode` | Boolean | `true` | 是否显示源代码 |
| `language` | String | `'javascript'` | 编程语言类型，用于语法高亮 |
| `title` | String | `''` | 代码块标题 |
| `fontSize` | String/Number | `'26rpx'` | 字体大小 |
| `lineHeight` | String/Number | `'40rpx'` | 行高 |
| `showLineNumber` | Boolean | `true` | 是否显示行号 |
| `enableCopy` | Boolean | `true` | 是否启用复制功能 |
| `enableFullscreen` | Boolean | `true` | 是否启用全屏功能 |
| `wrapCode` | Boolean | `false` | 是否自动换行 |
| `showStats` | Boolean | `true` | 是否显示统计信息 |
| `theme` | String | `'light'` | 代码主题（预留功能） |

### 支持的编程语言

目前支持基础语法高亮的语言：

- **JavaScript/TypeScript**: `javascript`, `js`, `typescript`, `ts`
- **Vue**: `vue`
- **HTML/XML**: `html`, `xml`
- **CSS/Sass**: `css`, `scss`, `sass`

### 暴露的方法

通过 `ref` 可以调用组件的方法：

```vue
<template>
  <zx-code ref="codeRef" :sourceCode="code" />
  <button @click="copyCode">复制代码</button>
</template>

<script setup>
import { ref } from 'vue'

const codeRef = ref()

const copyCode = () => {
  codeRef.value.copyCode()
}
</script>
```

可用方法：
- `copyCode()` - 复制代码
- `toggleFullscreen()` - 切换全屏模式
- `toggleLineNumber()` - 切换行号显示
- `toggleWrap()` - 切换自动换行

## 使用示例

### 1. 基础 JavaScript 代码展示

```vue
<zx-code 
  :sourceCode="jsCode"
  language="javascript"
  title="异步函数示例"
  :showLineNumber="true"
  :enableCopy="true"
/>
```

### 2. Vue 组件代码展示

```vue
<zx-code 
  :sourceCode="vueCode"
  language="vue"
  title="Vue 组件"
  :fontSize="24"
  :lineHeight="36"
/>
```

### 3. CSS 样式代码展示

```vue
<zx-code 
  :sourceCode="cssCode"
  language="css"
  title="样式定义"
  :showLineNumber="false"
  :wrapCode="true"
/>
```

### 4. 自定义样式配置

```vue
<zx-code 
  :sourceCode="htmlCode"
  language="html"
  title="HTML 结构"
  fontSize="28rpx"
  lineHeight="42rpx"
  :showStats="false"
/>
```

## 样式自定义

组件使用 SCSS 编写样式，支持通过 CSS 变量或覆盖样式类进行自定义：

```scss
// 自定义工具栏背景
.zx-code-display .code-toolbar {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

// 自定义代码背景色
.zx-code-display .code-block {
  background-color: #2d3748;
}

// 自定义代码文字颜色
.zx-code-display .code-text {
  color: #e2e8f0;
}
```

## 平台兼容性

| 平台 | 支持状态 | 备注 |
|------|----------|------|
| H5 | ✅ 完全支持 | 使用 Clipboard API |
| 微信小程序 | ✅ 完全支持 | 使用 uni.setClipboardData |
| 支付宝小程序 | ✅ 完全支持 | 使用 uni.setClipboardData |
| App (iOS/Android) | ✅ 完全支持 | 使用 uni.setClipboardData |

## 注意事项

1. **语法高亮限制**: 当前版本提供基础的语法高亮，如需更复杂的高亮效果，建议集成 highlight.js 或 prism.js
2. **性能考虑**: 对于超大代码文件（>1000行），建议分页显示或虚拟滚动
3. **复制功能**: 在小程序中复制功能需要用户授权
4. **全屏模式**: 在某些平台可能受到限制

## 更新日志

### v2.0.0 (最新版本)
- 🎉 全面重构，提升性能和用户体验
- ✨ 新增语法高亮功能
- ✨ 新增行号显示
- ✨ 新增代码复制功能
- ✨ 新增全屏模式
- ✨ 新增代码统计信息
- 🎨 优化界面设计，采用现代化风格
- 📱 完善响应式布局
- 🔧 增强组件 API，暴露更多方法
- 🐛 修复多项已知问题

### v1.0.0
- 🎉 初始版本
- ✨ 基础的代码显示功能

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个组件！

## 许可证

MIT License 