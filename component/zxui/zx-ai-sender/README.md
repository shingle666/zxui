# zx-ai-sender AI 输入框组件

用于聊天场景的智能输入框组件，支持多种输入方式和丰富的自定义功能。

## 特性

- 🎯 **多平台兼容** - 支持 H5、微信小程序、其他小程序平台、App
- 🎨 **高度可定制** - 支持自定义样式、操作按钮、头部底部内容
- 🎤 **语音输入** - 内置语音输入支持
- ⌨️ **灵活提交** - 支持多种提交触发方式
- 🔄 **双向绑定** - 完整的 v-model 支持
- 🎭 **状态管理** - 加载、禁用、只读等状态支持
- 📱 **响应式设计** - 适配不同屏幕尺寸

## 安装使用

### 基础用法

```vue
<template>
  <zx-ai-sender
    v-model="message"
    placeholder="请输入消息..."
    @submit="handleSubmit"
  />
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')

const handleSubmit = (msg) => {
  console.log('提交消息:', msg)
  message.value = ''
}
</script>
```

### 加载状态

```vue
<template>
  <zx-ai-sender
    v-model="message"
    :loading="isLoading"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
const isLoading = ref(false)

const handleSubmit = (msg) => {
  isLoading.value = true
  // 模拟发送
  setTimeout(() => {
    isLoading.value = false
    message.value = ''
  }, 2000)
}

const handleCancel = () => {
  isLoading.value = false
}
</script>
```

### 语音输入

```vue
<template>
  <zx-ai-sender
    v-model="message"
    :allow-speech="true"
    @submit="handleSubmit"
    @speech="handleSpeech"
  />
</template>

<script setup>
const handleSpeech = () => {
  // 处理语音输入
  console.log('开始语音输入')
}
</script>
```

### 自定义头部

```vue
<template>
  <zx-ai-sender v-model="message">
    <template #header>
      <view class="upload-area">
        <button @click="uploadFile">📎 附件</button>
        <button @click="uploadImage">🖼️ 图片</button>
      </view>
    </template>
  </zx-ai-sender>
</template>
```

### 自定义底部

```vue
<template>
  <zx-ai-sender v-model="message">
    <template #footer>
      <view class="quick-replies">
        <button 
          v-for="reply in quickReplies" 
          :key="reply"
          @click="selectReply(reply)"
        >
          {{ reply }}
        </button>
      </view>
    </template>
  </zx-ai-sender>
</template>

<script setup>
const quickReplies = ['你好', '谢谢', '再见']

const selectReply = (reply) => {
  message.value = reply
}
</script>
```

### 自定义操作按钮

```vue
<template>
  <zx-ai-sender v-model="message">
    <template #actions>
      <view class="custom-actions">
        <button @click="addEmoji">😊</button>
        <button @click="addSticker">🎨</button>
        <button @click="sendMessage">发送</button>
      </view>
    </template>
  </zx-ai-sender>
</template>
```

## API 文档

### Props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|---------|
| modelValue / v-model | 输入框内容 | string | '' | - |
| value | 输入框内容（非受控） | string | '' | - |
| defaultValue | 默认值 | string | '' | - |
| placeholder | 占位符文本 | string | '请输入消息...' | - |
| maxlength | 最大输入长度 | number | -1 | - |
| disabled | 是否禁用 | boolean | false | - |
| readOnly | 是否只读 | boolean | false | - |
| loading | 加载状态 | boolean | false | - |
| submitType | 提交触发方式 | string \| boolean | 'enter' | - |
| autoSize | 自动调整高度 | boolean \| object | true | - |
| allowSpeech | 启用语音输入 | boolean \| object | false | - |
| prefix | 前缀内容 | string | '' | - |
| header | 头部内容 | string | '' | - |
| footer | 底部内容 | string | '' | - |
| styles | 自定义样式 | object | {} | - |
| classNames | 自定义类名 | object | {} | - |
| prefixCls | 样式前缀 | string | 'zx-ai-sender' | - |
| rootClassName | 根元素类名 | string | '' | - |

#### submitType 可选值

- `'enter'` - 按 Enter 键提交
- `'shiftEnter'` - 按 Shift+Enter 键提交
- `false` - 禁用快捷键提交
- `true` - 等同于 'enter'

#### autoSize 配置

```typescript
type AutoSize = boolean | {
  minRows?: number
  maxRows?: number
}
```

#### allowSpeech 配置

```typescript
type AllowSpeech = boolean | {
  // 自定义语音配置
}
```

#### styles 配置

```typescript
interface Styles {
  root?: CSSProperties
  header?: CSSProperties
  content?: CSSProperties
  prefix?: CSSProperties
  inputWrapper?: CSSProperties
  input?: CSSProperties
  actions?: CSSProperties
  footer?: CSSProperties
  sendButton?: CSSProperties
  clearButton?: CSSProperties
  speechButton?: CSSProperties
}
```

#### classNames 配置

```typescript
interface ClassNames {
  root?: string
  header?: string
  content?: string
  prefix?: string
  inputWrapper?: string
  input?: string
  actions?: string
  footer?: string
}
```

### Events

| 事件名 | 说明 | 回调参数 | 版本 |
|--------|------|----------|---------|
| submit | 提交消息时触发 | (message: string) => void | - |
| cancel | 取消操作时触发 | () => void | - |
| change | 输入内容变化时触发 | (value: string, event: Event) => void | - |
| focus | 输入框获得焦点时触发 | (event: Event) => void | - |
| blur | 输入框失去焦点时触发 | (event: Event) => void | - |
| clear | 清空内容时触发 | () => void | - |
| speech | 语音按钮点击时触发 | () => void | - |
| keyboardHeightChange | 键盘高度变化时触发 | (event: Event) => void | - |

### Slots

| 插槽名 | 说明 | 参数 | 版本 |
|--------|------|------|---------|
| header | 自定义头部内容 | - | - |
| prefix | 自定义前缀内容 | - | - |
| actions | 自定义操作按钮 | { components, info } | - |
| footer | 自定义底部内容 | { components, info } | - |
| clearIcon | 自定义清除图标 | - | - |
| speechIcon | 自定义语音图标 | - | - |
| sendIcon | 自定义发送图标 | - | - |

### Methods

通过 ref 可以访问以下方法：

| 方法名 | 说明 | 参数 | 返回值 | 版本 |
|--------|------|------|--------|---------|
| focus | 聚焦输入框 | - | - | - |
| blur | 失焦输入框 | - | - | - |
| clear | 清空输入内容 | - | - | - |

```vue
<template>
  <zx-ai-sender ref="senderRef" v-model="message" />
  <button @click="focusInput">聚焦</button>
</template>

<script setup>
import { ref } from 'vue'

const senderRef = ref()
const message = ref('')

const focusInput = () => {
  senderRef.value?.focus()
}
</script>
```

## 平台兼容性

| 平台 | 支持程度 | 说明 |
|------|----------|------|
| H5 | ✅ 完全支持 | 支持所有功能 |
| 微信小程序 | ✅ 完全支持 | 支持所有功能 |
| 支付宝小程序 | ✅ 完全支持 | 支持所有功能 |
| 百度小程序 | ✅ 完全支持 | 支持所有功能 |
| 字节小程序 | ✅ 完全支持 | 支持所有功能 |
| QQ 小程序 | ✅ 完全支持 | 支持所有功能 |
| 快手小程序 | ✅ 完全支持 | 支持所有功能 |
| 京东小程序 | ✅ 完全支持 | 支持所有功能 |
| App (iOS) | ✅ 完全支持 | 支持所有功能 |
| App (Android) | ✅ 完全支持 | 支持所有功能 |

### 平台特性说明

#### 小程序平台
- 使用 `textarea` 组件实现，支持自动调整高度
- 支持小程序特有的键盘相关属性
- 语音功能需要用户授权麦克风权限

#### H5 平台
- 完整支持所有 Web 标准特性
- 支持键盘快捷键
- 支持拖拽文件上传（需自定义实现）

#### App 平台
- 支持原生键盘体验
- 支持系统级语音输入
- 支持文件系统访问

## 最佳实践

### 1. 消息发送流程

```vue
<template>
  <zx-ai-sender
    v-model="message"
    :loading="sending"
    @submit="sendMessage"
    @cancel="cancelSending"
  />
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
const sending = ref(false)

const sendMessage = async (msg) => {
  if (!msg.trim()) return
  
  sending.value = true
  try {
    await api.sendMessage(msg)
    message.value = ''
    // 显示成功提示
  } catch (error) {
    // 显示错误提示
  } finally {
    sending.value = false
  }
}

const cancelSending = () => {
  sending.value = false
  // 取消发送请求
}
</script>
```

### 2. 文件上传集成

```vue
<template>
  <zx-ai-sender v-model="message">
    <template #header>
      <view class="upload-section" v-if="showUpload">
        <view class="file-list">
          <view 
            v-for="file in uploadedFiles" 
            :key="file.id"
            class="file-item"
          >
            <image v-if="file.type === 'image'" :src="file.url" />
            <view v-else class="file-info">
              <text>{{ file.name }}</text>
            </view>
            <button @click="removeFile(file.id)">×</button>
          </view>
        </view>
        <view class="upload-actions">
          <button @click="chooseImage">📷 图片</button>
          <button @click="chooseFile">📎 文件</button>
        </view>
      </view>
    </template>
    
    <template #prefix>
      <button @click="toggleUpload">📎</button>
    </template>
  </zx-ai-sender>
</template>

<script setup>
import { ref } from 'vue'

const showUpload = ref(false)
const uploadedFiles = ref([])

const toggleUpload = () => {
  showUpload.value = !showUpload.value
}

const chooseImage = () => {
  uni.chooseImage({
    count: 9,
    success: (res) => {
      // 处理图片上传
    }
  })
}

const chooseFile = () => {
  // 处理文件选择
}

const removeFile = (id) => {
  uploadedFiles.value = uploadedFiles.value.filter(f => f.id !== id)
}
</script>
```

### 3. 快捷回复功能

```vue
<template>
  <zx-ai-sender v-model="message">
    <template #footer>
      <view class="quick-section">
        <view class="quick-title">快捷回复</view>
        <view class="quick-list">
          <button 
            v-for="item in quickReplies" 
            :key="item.id"
            @click="useQuickReply(item.text)"
            class="quick-item"
          >
            {{ item.text }}
          </button>
        </view>
      </view>
    </template>
  </zx-ai-sender>
</template>

<script setup>
const quickReplies = [
  { id: 1, text: '收到，谢谢！' },
  { id: 2, text: '好的，没问题' },
  { id: 3, text: '稍等，我查一下' },
  { id: 4, text: '抱歉，我不太明白' }
]

const useQuickReply = (text) => {
  message.value = text
}
</script>
```

### 4. 语音输入集成

```vue
<template>
  <zx-ai-sender
    v-model="message"
    :allow-speech="speechConfig"
    @speech="startSpeech"
  />
</template>

<script setup>
const speechConfig = {
  // 语音配置
}

const startSpeech = () => {
  // 开始语音识别
  uni.startSpeech({
    success: (res) => {
      message.value = res.result
    },
    fail: (err) => {
      console.error('语音识别失败:', err)
    }
  })
}
</script>
```

## 样式定制

### CSS 变量

组件支持通过 CSS 变量进行样式定制：

```css
.zx-ai-sender {
  --sender-border-radius: 12rpx;
  --sender-border-color: #e4e7ed;
  --sender-bg-color: #ffffff;
  --sender-padding: 24rpx;
  
  --input-font-size: 28rpx;
  --input-line-height: 1.5;
  --input-color: #303133;
  --input-placeholder-color: #c0c4cc;
  
  --button-size: 64rpx;
  --button-border-radius: 50%;
  
  --send-button-bg: #409eff;
  --send-button-color: #ffffff;
  
  --clear-button-bg: #f0f0f0;
  --clear-button-color: #909399;
  
  --speech-button-bg: #e1f3d8;
  --speech-button-color: #67c23a;
}
```

### 主题定制

```vue
<template>
  <zx-ai-sender
    v-model="message"
    :styles="customTheme"
    class="custom-sender"
  />
</template>

<script setup>
const customTheme = {
  root: {
    borderRadius: '20rpx',
    border: '2rpx solid #ff6b6b',
    boxShadow: '0 8rpx 24rpx rgba(255, 107, 107, 0.2)'
  },
  input: {
    backgroundColor: '#fff5f5',
    fontSize: '30rpx',
    fontWeight: '500'
  },
  sendButton: {
    backgroundColor: '#ff6b6b',
    transform: 'scale(1.1)'
  }
}
</script>

<style>
.custom-sender {
  margin: 32rpx;
}
</style>
```

## 常见问题

### Q: 如何实现消息的撤回功能？

A: 可以通过监听 `submit` 事件，在发送后显示撤回按钮：

```vue
<template>
  <view>
    <zx-ai-sender v-model="message" @submit="sendMessage" />
    <view v-if="canRecall" class="recall-tip">
      <button @click="recallMessage">撤回</button>
    </view>
  </view>
</template>

<script setup>
const canRecall = ref(false)
let recallTimer = null

const sendMessage = (msg) => {
  // 发送消息
  canRecall.value = true
  
  // 10秒后不能撤回
  recallTimer = setTimeout(() => {
    canRecall.value = false
  }, 10000)
}

const recallMessage = () => {
  // 撤回逻辑
  canRecall.value = false
  clearTimeout(recallTimer)
}
</script>
```

### Q: 如何实现 @ 提及功能？

A: 可以监听输入变化，检测 @ 符号：

```vue
<template>
  <zx-ai-sender 
    v-model="message" 
    @change="handleInputChange"
  />
  
  <!-- @ 提及面板 -->
  <view v-if="showMentionPanel" class="mention-panel">
    <view 
      v-for="user in filteredUsers" 
      :key="user.id"
      @click="selectUser(user)"
    >
      {{ user.name }}
    </view>
  </view>
</template>

<script setup>
const showMentionPanel = ref(false)
const mentionKeyword = ref('')

const handleInputChange = (value) => {
  const atIndex = value.lastIndexOf('@')
  if (atIndex !== -1) {
    const keyword = value.slice(atIndex + 1)
    if (keyword.length > 0) {
      mentionKeyword.value = keyword
      showMentionPanel.value = true
    }
  } else {
    showMentionPanel.value = false
  }
}
</script>
```

### Q: 如何实现表情包功能？

A: 可以通过自定义操作按钮实现：

```vue
<template>
  <zx-ai-sender v-model="message">
    <template #actions>
      <view class="custom-actions">
        <button @click="showEmojiPanel = !showEmojiPanel">😊</button>
        <button @click="sendMessage">发送</button>
      </view>
    </template>
    
    <template #footer v-if="showEmojiPanel">
      <view class="emoji-panel">
        <view 
          v-for="emoji in emojis" 
          :key="emoji"
          @click="addEmoji(emoji)"
          class="emoji-item"
        >
          {{ emoji }}
        </view>
      </view>
    </template>
  </zx-ai-sender>
</template>

<script setup>
const showEmojiPanel = ref(false)
const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣']

const addEmoji = (emoji) => {
  message.value += emoji
  showEmojiPanel.value = false
}
</script>
```

### Q: 如何处理网络异常情况？

A: 建议实现重试机制和离线缓存：

```vue
<script setup>
const sendMessage = async (msg, retryCount = 0) => {
  try {
    await api.sendMessage(msg)
    message.value = ''
  } catch (error) {
    if (retryCount < 3) {
      // 重试
      setTimeout(() => {
        sendMessage(msg, retryCount + 1)
      }, 1000 * (retryCount + 1))
    } else {
      // 保存到本地，等网络恢复后重发
      saveToLocal(msg)
      showError('发送失败，已保存到草稿')
    }
  }
}
</script>
```

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持基础输入功能
- ✨ 支持语音输入
- ✨ 支持自定义样式
- ✨ 支持多种提交方式
- ✨ 完整的插槽支持
- ✨ 全平台兼容

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个组件。

### 开发环境

```bash
# 克隆项目
git clone [repository-url]

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 提交规范

请遵循 [Conventional Commits](https://conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

## 许可证

MIT License