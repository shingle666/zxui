# use-x-chat 聊天工具

基于 Vue 3 Composition API 和 uni-app 框架的聊天工具，支持全平台兼容（H5、微信小程序、其他小程序平台、App）。

## 特性

- 🚀 基于 Vue 3 Composition API
- 📱 uni-app 框架，全平台兼容
- 💬 消息状态管理（本地、加载中、成功、错误）
- 🔄 流式响应支持
- 🎨 消息解析和转换
- ⚡ 轻量级，纯 JavaScript 实现
- 🛠️ 高度可配置

## 安装使用

### 1. 导入工具

```javascript
import { useXChat } from '@/utils/use-x-chat.js'
```

### 2. 基础用法

```javascript
<script setup>
import { useXChat } from '@/utils/use-x-chat.js'

// 模拟代理对象
const mockAgent = {
  request(params, callbacks) {
    const { message } = params
    
    // 模拟 API 请求
    setTimeout(() => {
      callbacks.onSuccess(`回复: ${message}`)
    }, 1000)
  }
}

// 配置聊天
const { onRequest, messages, parsedMessages, setMessages } = useXChat({
  agent: mockAgent,
  defaultMessages: [
    { message: '欢迎使用聊天工具！' }
  ]
})

// 发送消息
const sendMessage = (text) => {
  onRequest(text)
}
</script>
```

## API 参考

### useXChat(config)

主要的聊天 Hook 函数。

#### 参数 config

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| agent | Object | - | 代理对象，用于处理请求 |
| defaultMessages | Array | [] | 默认消息列表 |
| parser | Function | - | 消息解析器，将代理消息转换为气泡消息 |
| requestPlaceholder | String/Function | - | 请求占位符 |
| requestFallback | String/Function | - | 请求失败回调 |
| transformMessage | Function | - | 消息转换函数 |
| transformStream | Function | - | 流转换函数 |
| resolveAbortController | Function | - | 中止控制器解析函数 |

#### 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| onRequest | Function | 发送请求函数 |
| messages | Ref | 原始消息列表 |
| parsedMessages | ComputedRef | 解析后的消息列表 |
| setMessages | Function | 设置消息列表函数 |

### 消息状态

- `local`: 本地消息（用户发送的消息）
- `loading`: 加载中（正在等待响应）
- `success`: 成功（已收到响应）
- `error`: 错误（请求失败）

### Agent 接口

代理对象需要实现 `request` 方法：

```javascript
const agent = {
  request(params, callbacks, transformStream) {
    // params: { message, messages, ...otherParams }
    // callbacks: { onUpdate, onSuccess, onError, onStream }
    
    // 处理请求逻辑
    // 调用相应的回调函数
  }
}
```

#### callbacks 回调函数

- `onUpdate(message)`: 流式更新时调用
- `onSuccess(message)`: 请求成功时调用
- `onError(error)`: 请求失败时调用
- `onStream(controller)`: 流控制器回调

## 高级用法

### 1. 消息解析器

```javascript
const { onRequest, parsedMessages } = useXChat({
  agent: mockAgent,
  parser: (message) => {
    // 将单个消息解析为多个气泡消息
    if (message.includes('\n')) {
      return message.split('\n')
    }
    return message
  }
})
```

### 2. 请求占位符

```javascript
const { onRequest } = useXChat({
  agent: mockAgent,
  requestPlaceholder: (message, { messages }) => {
    return `正在处理"${message}"...`
  }
})
```

### 3. 错误处理

```javascript
const { onRequest } = useXChat({
  agent: mockAgent,
  requestFallback: (message, { error, messages }) => {
    return `处理"${message}"时发生错误: ${error.message}`
  }
})
```

### 4. 消息转换

```javascript
const { onRequest } = useXChat({
  agent: mockAgent,
  transformMessage: ({ originMessage, currentMessage, status }) => {
    // 根据状态转换消息
    if (status === 'loading') {
      return `${currentMessage} ⏳`
    }
    return currentMessage
  }
})
```

### 5. 流式响应

```javascript
const agent = {
  request(params, callbacks) {
    const { message } = params
    
    // 模拟流式响应
    let response = ''
    const words = ['你好', '，', '这是', '流式', '响应']
    
    words.forEach((word, index) => {
      setTimeout(() => {
        response += word
        if (index === words.length - 1) {
          callbacks.onSuccess(response)
        } else {
          callbacks.onUpdate(response)
        }
      }, (index + 1) * 500)
    })
  }
}
```

## 完整示例

```vue
<template>
  <view class="chat-container">
    <!-- 消息列表 -->
    <scroll-view class="message-list" scroll-y>
      <view 
        v-for="msg in parsedMessages" 
        :key="msg.id" 
        class="message-item"
        :class="{
          'user-message': !msg.id.startsWith('default_'),
          'loading': msg.status === 'loading',
          'error': msg.status === 'error'
        }"
      >
        {{ msg.message }}
      </view>
    </scroll-view>
    
    <!-- 输入框 -->
    <view class="input-container">
      <input 
        v-model="inputText" 
        placeholder="请输入消息..." 
        @confirm="sendMessage"
      />
      <button @click="sendMessage">发送</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useXChat } from '@/utils/use-x-chat.js'

const inputText = ref('')

// 模拟 AI 代理
const aiAgent = {
  async request(params, callbacks) {
    const { message } = params
    
    try {
      // 模拟 API 调用
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })
      
      const data = await response.json()
      callbacks.onSuccess(data.reply)
    } catch (error) {
      callbacks.onError(error)
    }
  }
}

const { onRequest, parsedMessages } = useXChat({
  agent: aiAgent,
  defaultMessages: [
    { message: '你好！我是 AI 助手，有什么可以帮助你的吗？' }
  ],
  requestPlaceholder: '思考中...',
  requestFallback: '抱歉，我现在无法回答，请稍后再试。'
})

const sendMessage = () => {
  if (inputText.value.trim()) {
    onRequest(inputText.value.trim())
    inputText.value = ''
  }
}
</script>
```

## 注意事项

1. **平台兼容性**: 工具使用纯 JavaScript 实现，避免了浏览器特有的 DOM API，确保在所有 uni-app 支持的平台上都能正常运行。

2. **内存管理**: 对于长时间运行的聊天应用，建议定期清理历史消息以避免内存泄漏。

3. **错误处理**: 建议为 agent 的 request 方法添加适当的错误处理逻辑。

4. **性能优化**: 对于大量消息的场景，可以考虑实现虚拟滚动或分页加载。

## 类型定义

```typescript
// 消息状态类型
type MessageStatus = 'local' | 'loading' | 'success' | 'error'

// 消息信息接口
interface MessageInfo {
  id: string | number
  message: any
  status: MessageStatus
}

// 配置接口
interface XChatConfig {
  agent?: {
    request: (params: any, callbacks: any, transformStream?: any) => void
  }
  defaultMessages?: Array<Partial<MessageInfo>>
  parser?: (message: any) => any
  requestPlaceholder?: any | ((message: any, info: any) => any)
  requestFallback?: any | ((message: any, info: any) => any)
  transformMessage?: (params: any) => any
  transformStream?: any
  resolveAbortController?: (controller: AbortController) => void
}
```

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础聊天功能
- 支持流式响应
- 支持消息状态管理
- 支持全平台兼容