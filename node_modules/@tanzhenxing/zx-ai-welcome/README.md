# zx-ai-welcome 欢迎组件

清晰传达给用户可实现的意图范围和预期功能的欢迎组件。

## 何时使用

使用合适的欢迎推荐组件，可以有效降低用户学习成本，让用户快速了解并顺利开始。适用于以下场景：

- AI 应用的欢迎页面
- 功能介绍和引导
- 产品特性展示
- 用户引导流程

## 平台兼容性

| H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | 头条小程序 | QQ小程序 | App |
| --- | ---------- | ------------ | ---------- | ---------- | -------- | --- |
| ✅  | ✅         | ✅           | ✅         | ✅         | ✅       | ✅  |

## 基础用法

```vue
<template>
  <zx-ai-welcome
    icon="https://example.com/icon.png"
    title="Hello, I'm AI Assistant"
    description="我是您的专属AI助手，可以帮助您解决各种问题"
    icon-size="80rpx"
    icon-color="#1890ff"
  />
</template>
```

## 变体样式

```vue
<template>
  <!-- 填充样式（默认） -->
  <zx-ai-welcome
    variant="filled"
    icon="https://example.com/icon.png"
    title="填充样式"
    description="默认的填充样式，带有背景色和边框"
  />
  
  <!-- 无边框样式 -->
  <zx-ai-welcome
    variant="borderless"
    icon="https://example.com/icon.png"
    title="无边框样式"
    description="简洁的无边框样式，适合更简约的设计"
  />
</template>
```

## 使用插槽

```vue
<template>
  <zx-ai-welcome>
    <!-- 自定义图标 -->
    <template #icon>
      <view class="custom-icon">
        <text>🤖</text>
      </view>
    </template>
    
    <!-- 自定义标题 -->
    <template #title>
      <view class="custom-title">
        <text>智能助手</text>
        <text class="badge">Beta</text>
      </view>
    </template>
    
    <!-- 自定义描述 -->
    <template #description>
      <view class="custom-description">
        <text>支持多种功能：</text>
        <text>• 智能对话</text>
        <text>• 内容生成</text>
        <text>• 问题解答</text>
      </view>
    </template>
    
    <!-- 额外操作 -->
    <template #extra>
      <button size="mini" type="primary">开始使用</button>
    </template>
  </zx-ai-welcome>
</template>
```

## 自定义样式

```vue
<template>
  <zx-ai-welcome
    icon="https://example.com/icon.png"
    title="自定义样式"
    description="通过 styles 和 customStyle 自定义样式"
    :custom-style="{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '20rpx',
      padding: '40rpx'
    }"
    :styles="{
      title: { color: '#ffffff', fontSize: '40rpx' },
      description: { color: '#f0f0f0' },
      icon: { borderRadius: '50%' }
    }"
    :class-names="{
      title: 'custom-title-class',
      description: 'custom-desc-class'
    }"
  />
</template>
```

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 | 可选值 |
| ------ | ---- | ---- | ------ | ------ |
| customClass | 自定义样式类名 | String | '' | - |
| customStyle | 自定义样式 | String \| Object | '' | - |
| variant | 变体类型 | String | 'filled' | 'filled' \| 'borderless' |
| classNames | 语义化样式类名 | Object | {} | - |
| styles | 语义化样式 | Object | {} | - |
| icon | 图标，支持图片URL、文本、emoji等 | String | '' | - |
| iconSize | 图标大小 | String \| Number | '96rpx' | - |
| iconColor | 图标颜色 | String | '#1890ff' | - |
| iconMode | 图标模式（图片时有效） | String | 'aspectFit' | - |
| title | 标题文本 | String | '' | - |
| description | 描述文本 | String | '' | - |
| extra | 额外内容文本 | String | '' | - |

### classNames 对象结构

```typescript
interface ClassNames {
  icon?: string      // 图标容器样式类名
  title?: string     // 标题容器样式类名
  description?: string // 描述容器样式类名
  extra?: string     // 额外内容容器样式类名
}
```

### styles 对象结构

```typescript
interface Styles {
  icon?: Object      // 图标容器样式
  title?: Object     // 标题容器样式
  description?: Object // 描述容器样式
  extra?: Object     // 额外内容容器样式
}
```

### Slots

| 插槽名 | 说明 | 参数 |
| ------ | ---- | ---- |
| icon | 自定义图标内容 | - |
| title | 自定义标题内容 | - |
| description | 自定义描述内容 | - |
| extra | 自定义额外操作内容 | - |

## 样式变量

组件提供了以下 CSS 变量，可以通过覆盖这些变量来自定义样式：

```scss
:root {
  // 基础样式
  --zx-ai-welcome-padding: 32rpx;
  --zx-ai-welcome-border-radius: 16rpx;
  --zx-ai-welcome-transition: all 0.3s ease;
  
  // 填充样式
  --zx-ai-welcome-filled-bg: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  --zx-ai-welcome-filled-border: 2rpx solid #e8eaed;
  
  // 图标样式
  --zx-ai-welcome-icon-margin: 24rpx;
  --zx-ai-welcome-icon-size: 96rpx;
  --zx-ai-welcome-icon-border-radius: 12rpx;
  
  // 标题样式
  --zx-ai-welcome-title-font-size: 36rpx;
  --zx-ai-welcome-title-font-weight: 600;
  --zx-ai-welcome-title-color: #262626;
  --zx-ai-welcome-title-margin: 16rpx;
  
  // 描述样式
  --zx-ai-welcome-desc-font-size: 28rpx;
  --zx-ai-welcome-desc-color: #8c8c8c;
  --zx-ai-welcome-desc-line-height: 1.6;
}
```

## 最佳实践

### 1. 图标选择

- **图片图标**：使用高质量的图片，支持网络图片和本地图片
- **字体图标**：使用 zx-icon 支持的字体图标
- **Emoji 图标**：可以使用 emoji 字符，简洁明了
- **自定义图标**：通过插槽实现复杂的图标设计

```vue
<!-- 推荐：使用高质量图片 -->
<zx-ai-welcome 
  icon="https://example.com/high-quality-icon.png" 
  icon-size="80rpx"
  icon-mode="aspectFit"
/>

<!-- 推荐：使用字体图标 -->
<zx-ai-welcome 
  icon="home" 
  icon-size="60rpx"
  icon-color="#1890ff"
/>

<!-- 推荐：使用 emoji -->
<zx-ai-welcome 
  icon="🤖" 
  icon-size="80rpx"
/>

<!-- 推荐：自定义图标 -->
<zx-ai-welcome>
  <template #icon>
    <view class="gradient-icon">
      <text>AI</text>
    </view>
  </template>
</zx-ai-welcome>
```

### 2. 内容编写

- **标题**：简洁明了，突出核心功能
- **描述**：详细说明功能特点，引导用户操作
- **长度控制**：避免内容过长影响用户体验

```vue
<!-- 推荐：简洁明了 -->
<zx-ai-welcome
  title="智能助手"
  description="为您提供24小时智能服务，解答问题、生成内容、协助工作"
/>

<!-- 不推荐：内容过长 -->
<zx-ai-welcome
  title="功能非常强大的人工智能助手系统"
  description="这是一个非常强大的人工智能助手系统，它可以帮助您解决各种各样的问题..."
/>
```

### 3. 样式定制

- **保持一致性**：与应用整体设计风格保持一致
- **响应式设计**：考虑不同屏幕尺寸的适配
- **主题适配**：支持明暗主题切换

```vue
<!-- 推荐：渐进式定制 -->
<zx-ai-welcome
  variant="borderless"
  :custom-style="{ background: 'var(--app-primary-bg)' }"
  :styles="{ title: { color: 'var(--app-primary-color)' } }"
/>
```

### 4. 交互设计

- **合理使用 extra 插槽**：放置重要的操作按钮
- **避免过多操作**：保持界面简洁
- **提供反馈**：操作后给予用户明确反馈

```vue
<zx-ai-welcome
  title="开始使用"
  description="点击下方按钮开始您的AI之旅"
>
  <template #extra>
    <button @click="handleStart" type="primary" size="mini">
      立即开始
    </button>
  </template>
</zx-ai-welcome>
```

## 注意事项

### 1. 性能优化

- **图片优化**：使用适当尺寸的图片，避免过大的图片文件
- **懒加载**：对于图片较多的场景，考虑使用懒加载
- **缓存策略**：合理设置图片缓存策略

### 2. 无障碍访问

- **语义化**：使用语义化的内容结构
- **对比度**：确保文字与背景有足够的对比度
- **可读性**：字体大小和行高要便于阅读

### 3. 跨平台兼容

- **样式兼容**：避免使用平台特有的样式属性
- **功能测试**：在各个平台上进行充分测试
- **降级方案**：为不支持的功能提供降级方案

## 常见问题

### Q: 如何实现图标的圆形裁剪？

A: 可以通过 styles 属性设置图标样式：

```vue
<zx-ai-welcome
  icon="https://example.com/avatar.jpg"
  :styles="{ icon: { borderRadius: '50%' } }"
/>
```

### Q: 如何实现点击整个组件的交互？

A: 可以在组件外层包装一个可点击的容器：

```vue
<view @click="handleClick" class="clickable-welcome">
  <zx-ai-welcome
    title="点击我"
    description="整个区域都可以点击"
  />
</view>
```

### Q: 如何实现动态内容更新？

A: 直接绑定响应式数据即可：

```vue
<template>
  <zx-ai-welcome
    :title="dynamicTitle"
    :description="dynamicDescription"
  />
</template>

<script setup>
import { ref } from 'vue'

const dynamicTitle = ref('初始标题')
const dynamicDescription = ref('初始描述')

// 动态更新内容
setTimeout(() => {
  dynamicTitle.value = '更新后的标题'
  dynamicDescription.value = '更新后的描述'
}, 2000)
</script>
```

### Q: 如何实现暗色主题适配？

A: 组件已内置暗色主题支持，也可以通过 CSS 变量自定义：

```scss
// 自定义暗色主题
@media (prefers-color-scheme: dark) {
  .zx-ai-welcome {
    --zx-ai-welcome-filled-bg: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    --zx-ai-welcome-title-color: #ffffff;
    --zx-ai-welcome-desc-color: #a6a6a6;
  }
}
```

### Q: 如何处理长文本内容？

A: 可以通过 CSS 控制文本溢出：

```scss
.custom-description {
  .zx-ai-welcome__description-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
```

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持基础的欢迎组件功能
- ✨ 支持 filled 和 borderless 两种变体
- ✨ 支持自定义图标、标题、描述和额外操作
- ✨ 支持插槽自定义内容
- ✨ 支持语义化样式定制
- ✨ 支持响应式设计和暗色主题
- ✨ 全平台兼容支持

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个组件。在提交代码前，请确保：

1. 代码符合项目的编码规范
2. 添加了必要的测试用例
3. 更新了相关文档
4. 在各个平台上进行了测试

## 许可证

MIT License