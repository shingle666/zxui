# ZxAiBubble AI对话气泡组件

一个功能丰富的AI对话气泡组件，专为聊天场景设计，支持打字效果、加载状态、多种样式变体等特性。

## 特性

- 🎯 **多种布局**：支持左右两种对话布局
- 🎨 **丰富样式**：提供多种样式变体和形状选择
- ⚡ **打字效果**：支持逐字显示的打字动画
- 🔄 **加载状态**：内置加载动画效果
- 🖼️ **头像支持**：支持文字、图片等多种头像类型
- 🎪 **插槽扩展**：提供丰富的插槽支持自定义内容
- 📱 **全平台兼容**：支持H5、微信小程序、其他小程序平台、App
- 🎛️ **高度可定制**：支持自定义样式和渲染函数

## 安装使用

### 基础用法

```vue
<template>
  <zx-ai-bubble content="Hello! 这是一个AI对话气泡。" />
</template>

<script setup>
import ZxAiBubble from '@/components/zx-ai-bubble/zx-ai-bubble.vue'
</script>
```

### 设置位置和头像

```vue
<template>
  <!-- AI消息（左侧） -->
  <zx-ai-bubble 
    content="我是AI助手，很高兴为您服务！" 
    :avatar="{ text: 'AI', backgroundColor: '#1890ff' }"
  />
  
  <!-- 用户消息（右侧） -->
  <zx-ai-bubble 
    content="谢谢你的帮助！" 
    placement="end"
    :avatar="{ text: 'U', backgroundColor: '#52c41a' }"
  />
</template>
```

### 打字效果

```vue
<template>
  <zx-ai-bubble 
    :content="message"
    :typing="{ step: 2, interval: 100, suffix: '✨' }"
    @typing-complete="onTypingComplete"
  />
</template>

<script setup>
const message = ref('这段文字会有打字效果，一个字一个字地显示出来。')

const onTypingComplete = () => {
  console.log('打字效果完成')
}
</script>
```

### 加载状态

```vue
<template>
  <zx-ai-bubble 
    :loading="loading"
    content="正在思考中..."
  />
</template>

<script setup>
const loading = ref(true)

// 3秒后停止加载
setTimeout(() => {
  loading.value = false
}, 3000)
</script>
```

### 头部和底部

```vue
<template>
  <zx-ai-bubble 
    content="这条消息包含头部和底部信息。"
    header="AI助手 · 刚刚"
    footer="消息已送达"
  />
</template>
```

### 不同样式变体

```vue
<template>
  <!-- 填充样式（默认） -->
  <zx-ai-bubble content="填充样式" variant="filled" />
  
  <!-- 边框样式 -->
  <zx-ai-bubble content="边框样式" variant="outlined" />
  
  <!-- 无边框样式 -->
  <zx-ai-bubble content="无边框样式" variant="borderless" />
  
  <!-- 阴影样式 -->
  <zx-ai-bubble content="阴影样式" variant="shadow" />
</template>
```

### 自定义渲染

```vue
<template>
  <zx-ai-bubble 
    :content="markdownContent"
    :message-render="renderMarkdown"
  />
</template>

<script setup>
const markdownContent = ref('**粗体** 和 *斜体* 文本')

const renderMarkdown = (content) => {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
}
</script>
```

### 插槽用法

```vue
<template>
  <zx-ai-bubble content="使用插槽自定义内容">
    <!-- 自定义头像 -->
    <template #avatar>
      <view class="custom-avatar">🤖</view>
    </template>
    
    <!-- 自定义头部 -->
    <template #header>
      <view class="custom-header">
        <text>智能助手</text>
        <text>{{ currentTime }}</text>
      </view>
    </template>
    
    <!-- 自定义底部 -->
    <template #footer="{ content }">
      <view class="custom-footer">
        字数：{{ content.length }}
      </view>
    </template>
  </zx-ai-bubble>
</template>
```

## API 文档

### Props

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| prefixCls | 自定义类名前缀 | string | 'zx-ai-bubble' | - |
| rootClassName | 根元素额外类名 | string | '' | - |
| avatar | 头像配置 | AvatarConfig \| null | null | - |
| placement | 消息位置 | 'start' \| 'end' | 'start' | - |
| loading | 加载状态 | boolean | false | - |
| typing | 打字效果配置 | boolean \| TypingConfig | false | - |
| content | 消息内容 | string \| object | '' | - |
| messageRender | 自定义消息渲染函数 | (content: any) => string | null | - |
| loadingRender | 自定义加载渲染函数 | () => string | null | - |
| variant | 样式变体 | 'filled' \| 'borderless' \| 'outlined' \| 'shadow' | 'filled' | - |
| shape | 形状 | '' \| 'round' \| 'corner' | '' | - |
| header | 头部内容 | string \| object | '' | - |
| footer | 底部内容 | string \| object \| function | '' | - |
| styles | 自定义样式 | StylesConfig | {} | - |
| classNames | 自定义类名 | ClassNamesConfig | {} | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| typing-complete | 打字效果完成时触发 | - |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| avatar | 自定义头像 | - |
| header | 自定义头部 | - |
| footer | 自定义底部 | { content } |
| loading | 自定义加载内容 | - |
| message | 自定义消息内容 | { content } |

### 类型定义

#### AvatarConfig

```typescript
interface AvatarConfig {
  // 头像文字
  text?: string
  // 头像图片地址
  src?: string
  // 背景颜色
  backgroundColor?: string
  // 文字颜色
  color?: string
  // 自定义样式
  style?: object
}
```

#### TypingConfig

```typescript
interface TypingConfig {
  // 每次显示的字符数
  step?: number
  // 打字间隔（毫秒）
  interval?: number
  // 打字时的后缀
  suffix?: string
}
```

#### StylesConfig

```typescript
interface StylesConfig {
  // 根元素样式
  root?: object
  // 头像样式
  avatar?: object
  // 头部样式
  header?: object
  // 内容样式
  content?: object
  // 底部样式
  footer?: object
}
```

#### ClassNamesConfig

```typescript
interface ClassNamesConfig {
  // 根元素类名
  root?: string
  // 头像类名
  avatar?: string
  // 头部类名
  header?: string
  // 内容类名
  content?: string
  // 底部类名
  footer?: string
}
```

## 平台兼容性

| 平台 | 支持情况 | 说明 |
| --- | --- | --- |
| H5 | ✅ | 完全支持 |
| 微信小程序 | ✅ | 完全支持 |
| 支付宝小程序 | ✅ | 完全支持 |
| 百度小程序 | ✅ | 完全支持 |
| 字节跳动小程序 | ✅ | 完全支持 |
| QQ小程序 | ✅ | 完全支持 |
| 快手小程序 | ✅ | 完全支持 |
| 京东小程序 | ✅ | 完全支持 |
| App (Vue) | ✅ | 完全支持 |
| App (Nvue) | ✅ | 完全支持 |

### 兼容性说明

1. **样式兼容性**：组件使用 `rpx` 单位和标准 CSS 属性，确保在所有平台上的一致性
2. **动画兼容性**：打字效果和加载动画在所有平台上都能正常工作
3. **事件兼容性**：所有事件都使用 uni-app 标准事件系统
4. **图片兼容性**：头像图片支持本地路径、网络地址和 base64 格式

## 最佳实践

### 1. 性能优化

```vue
<!-- 避免频繁更新内容，使用防抖 -->
<script setup>
import { debounce } from 'lodash-es'

const updateContent = debounce((newContent) => {
  content.value = newContent
}, 300)
</script>
```

### 2. 长文本处理

```vue
<!-- 对于长文本，建议分段显示 -->
<template>
  <zx-ai-bubble 
    v-for="(paragraph, index) in paragraphs"
    :key="index"
    :content="paragraph"
    :typing="index === currentTypingIndex ? typingConfig : false"
  />
</template>
```

### 3. 消息列表优化

```vue
<!-- 使用虚拟滚动处理大量消息 -->
<template>
  <scroll-view 
    scroll-y
    :scroll-top="scrollTop"
    @scroll="onScroll"
  >
    <zx-ai-bubble 
      v-for="message in visibleMessages"
      :key="message.id"
      v-bind="message"
    />
  </scroll-view>
</template>
```

### 4. 主题定制

```scss
// 自定义主题变量
.zx-ai-bubble {
  --bubble-primary-color: #1890ff;
  --bubble-success-color: #52c41a;
  --bubble-border-radius: 16rpx;
  --bubble-padding: 24rpx 32rpx;
  --bubble-font-size: 32rpx;
  --bubble-line-height: 1.5;
}
```

## 常见问题

### Q: 如何实现消息的自动滚动？

A: 可以监听消息变化，自动滚动到底部：

```vue
<script setup>
const scrollTop = ref(0)
const messages = ref([])

watch(messages, () => {
  nextTick(() => {
    // 滚动到底部
    scrollTop.value = 999999
  })
}, { deep: true })
</script>
```

### Q: 如何处理图片消息？

A: 可以通过插槽或自定义渲染函数：

```vue
<template>
  <zx-ai-bubble>
    <template #message="{ content }">
      <image 
        v-if="content.type === 'image'"
        :src="content.url"
        mode="widthFix"
      />
      <text v-else>{{ content.text }}</text>
    </template>
  </zx-ai-bubble>
</template>
```

### Q: 如何实现消息的重发功能？

A: 可以在底部插槽中添加重发按钮：

```vue
<template>
  <zx-ai-bubble 
    :content="message.content"
    :class="{ 'message-failed': message.failed }"
  >
    <template #footer v-if="message.failed">
      <button @click="resendMessage(message)" class="resend-btn">
        重发
      </button>
    </template>
  </zx-ai-bubble>
</template>
```

### Q: 如何支持 Markdown 渲染？

A: 可以使用 markdown-it 等库：

```vue
<script setup>
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

const renderMarkdown = (content) => {
  return md.render(content)
}
</script>

<template>
  <zx-ai-bubble 
    :content="markdownContent"
    :message-render="renderMarkdown"
  />
</template>
```

### Q: 如何实现消息的复制功能？

A: 可以通过长按事件实现：

```vue
<template>
  <zx-ai-bubble 
    :content="message.content"
    @longpress="copyMessage(message.content)"
  />
</template>

<script setup>
const copyMessage = (content) => {
  uni.setClipboardData({
    data: content,
    success: () => {
      uni.showToast({ title: '已复制' })
    }
  })
}
</script>
```

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持基础对话气泡功能
- ✨ 支持打字效果
- ✨ 支持加载状态
- ✨ 支持多种样式变体
- ✨ 支持头像、头部、底部自定义
- ✨ 支持插槽扩展
- ✨ 全平台兼容

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个组件。

### 开发环境

1. 克隆项目
2. 安装依赖：`npm install`
3. 启动开发服务器：`npm run dev`

### 提交规范

请遵循 [Conventional Commits](https://conventionalcommits.org/) 规范。

## 许可证

MIT License