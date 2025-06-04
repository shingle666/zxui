# useXAgent 模型调度

用于模型调度的 Agent 钩子，基于 Vue 3 Composition API 开发，支持 uni-app 全平台。

## 何时使用

- 与后端模型进行交互
- 提供抽象数据流
- 需要流式响应处理
- 自定义请求逻辑

## 特性

- 🚀 基于 Vue 3 Composition API
- 📱 支持 uni-app 全平台（H5、微信小程序、App等）
- 🔄 支持流式响应
- 🛠 可自定义请求逻辑
- 📦 轻量级，无外部依赖
- 🔒 支持请求状态管理

## 安装使用

```javascript
import useXAgent from '@/utils/use-x-agent.js'
```

## 基础用法

### 预设请求

使用预设协议进行请求，仅需配置 `baseURL`、`model` 即可：

```vue
<template>
  <view>
    <input v-model="message" placeholder="请输入消息" />
    <button @click="sendMessage" :disabled="agent.value.isRequesting()">
      {{ agent.value.isRequesting() ? '发送中...' : '发送' }}
    </button>
    <view>{{ response }}</view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import useXAgent from '@/utils/use-x-agent.js'

const message = ref('')
const response = ref('')

const [agent] = useXAgent({
  baseURL: 'https://api.example.com/v1/chat/completions',
  model: 'gpt-3.5-turbo',
  dangerouslyApiKey: 'Bearer your-api-key'
})

function sendMessage() {
  agent.value.request(
    {
      message: {
        role: 'user',
        content: message.value
      }
    },
    {
      onUpdate: (msg) => {
        response.value = msg.content
      },
      onSuccess: (messages) => {
        console.log('请求成功', messages)
      },
      onError: (error) => {
        console.error('请求失败', error)
      }
    }
  )
}
</script>
```

### 自定义请求

通过自定义 `request` 函数，可以实现完全自定义的请求逻辑：

```javascript
const [agent] = useXAgent({
  request: (info, callbacks) => {
    // 自定义请求逻辑
    const { message, messages } = info
    const { onUpdate, onSuccess, onError, onStream } = callbacks
    
    // 模拟异步请求
    setTimeout(() => {
      const response = {
        role: 'assistant',
        content: `回复: ${message?.content}`
      }
      
      onUpdate(response)
      onSuccess([response])
    }, 1000)
  }
})
```

### 流式响应

支持流式数据接收和实时更新：

```javascript
const [agent] = useXAgent({
  request: (info, callbacks) => {
    const controller = new AbortController()
    callbacks.onStream?.(controller)
    
    // 模拟流式响应
    const message = info.message?.content || ''
    const words = message.split('')
    let index = 0
    
    const interval = setInterval(() => {
      if (controller.signal.aborted || index >= words.length) {
        clearInterval(interval)
        callbacks.onSuccess([{ content: message }])
        return
      }
      
      const partialContent = words.slice(0, index + 1).join('')
      callbacks.onUpdate({ content: partialContent })
      index++
    }, 100)
  }
})
```

## API 参考

### useXAgent(config)

创建一个 Agent 实例。

**参数：**

- `config: XAgentConfig` - Agent 配置

**返回值：**

- `[agent]` - 包含 agent 实例的数组

### XAgentConfig

#### 预设配置 (XAgentConfigPreset)

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| baseURL | 请求服务端地址 | `string` | - | - |
| key | 请求秘钥 | `string` | - | - |
| model | 协议模型 | `string` | - | - |
| dangerouslyApiKey | ⚠️ 危险的API密钥 | `string` | - | - |

> **注意：** `dangerouslyApiKey` 存在安全风险，因为它会在客户端代码中暴露你的秘密API凭据。Web浏览器本质上比服务器环境安全性更低，任何有权访问浏览器的用户都可能检查、提取和滥用这些凭据。

#### 自定义配置 (XAgentConfigCustom)

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| request | 配置自定义请求，支持流式更新 | `RequestFn` | - | - |

### RequestFn

请求函数类型定义：

```javascript
type RequestFn = (
  info: RequestFnInfo,
  callbacks: {
    onUpdate: (message: any) => void;
    onSuccess: (message: any) => void;
    onError: (error: Error) => void;
    onStream?: (abortController: AbortController) => void;
  },
  transformStream?: Function
) => void;
```

**参数说明：**

- `info: RequestFnInfo` - 请求信息
  - `messages?: any[]` - 消息数组
  - `message?: any` - 单个消息
  - `baseURL?: string` - 基础URL
  - `model?: string` - 模型名称
  - 其他自定义属性

- `callbacks` - 回调函数
  - `onUpdate` - 响应更新回调
  - `onSuccess` - 请求成功回调
  - `onError` - 请求失败回调
  - `onStream` - 流连接回调（可选）

### Agent 实例方法

#### request(info, callbacks, transformStream?)

发起请求。

**参数：**

- `info: RequestFnInfo` - 请求信息
- `callbacks: RequestCallbacks` - 回调函数
- `transformStream?: Function` - 流转换函数（可选）

#### isRequesting()

检查是否正在请求。

**返回值：**

- `boolean` - 是否正在请求

## 最佳实践

### 1. 错误处理

```javascript
const [agent] = useXAgent({
  request: async (info, callbacks) => {
    try {
      // 请求逻辑
      const response = await someApiCall(info)
      callbacks.onSuccess([response])
    } catch (error) {
      callbacks.onError(new Error(`请求失败: ${error.message}`))
    }
  }
})
```

### 2. 请求状态管理

```javascript
const isLoading = computed(() => agent.value.isRequesting())

// 在模板中使用
// <button :disabled="isLoading">{{ isLoading ? '加载中...' : '发送' }}</button>
```

### 3. 取消请求

```javascript
let currentController = null

const [agent] = useXAgent({
  request: (info, callbacks) => {
    const controller = new AbortController()
    currentController = controller
    callbacks.onStream?.(controller)
    
    // 使用 controller.signal 来取消请求
  }
})

// 取消当前请求
function cancelRequest() {
  if (currentController) {
    currentController.abort()
    currentController = null
  }
}
```

### 4. 多实例管理

```javascript
// 不同的 Agent 用于不同的用途
const [chatAgent] = useXAgent({
  baseURL: 'https://api.example.com/chat',
  model: 'gpt-3.5-turbo'
})

const [imageAgent] = useXAgent({
  baseURL: 'https://api.example.com/image',
  model: 'dall-e-3'
})
```

## 注意事项

1. **安全性**：避免在客户端暴露敏感的 API 密钥
2. **性能**：合理使用 `isRequesting()` 来避免重复请求
3. **错误处理**：始终提供 `onError` 回调来处理异常情况
4. **内存管理**：及时取消不需要的请求以避免内存泄漏
5. **平台兼容**：使用 `uni.request` 而非 `fetch` 以确保全平台兼容

## 常见问题

### Q: 如何处理网络超时？

A: 在自定义请求函数中设置超时：

```javascript
const [agent] = useXAgent({
  request: async (info, callbacks) => {
    try {
      const response = await uni.request({
        url: 'your-api-url',
        timeout: 10000, // 10秒超时
        // 其他配置
      })
      callbacks.onSuccess([response.data])
    } catch (error) {
      callbacks.onError(error)
    }
  }
})
```

### Q: 如何实现重试机制？

A: 在请求函数中添加重试逻辑：

```javascript
const [agent] = useXAgent({
  request: async (info, callbacks, transformStream) => {
    const maxRetries = 3
    let retries = 0
    
    const attemptRequest = async () => {
      try {
        // 请求逻辑
        const response = await makeRequest(info)
        callbacks.onSuccess([response])
      } catch (error) {
        if (retries < maxRetries) {
          retries++
          setTimeout(attemptRequest, 1000 * retries) // 递增延迟
        } else {
          callbacks.onError(error)
        }
      }
    }
    
    attemptRequest()
  }
})
```

### Q: 如何处理不同的响应格式？

A: 使用 `transformStream` 参数或在回调中处理：

```javascript
const [agent] = useXAgent({
  request: (info, callbacks) => {
    // 请求逻辑
    const rawResponse = getRawResponse()
    
    // 转换响应格式
    const formattedResponse = {
      content: rawResponse.text,
      role: 'assistant',
      timestamp: Date.now()
    }
    
    callbacks.onUpdate(formattedResponse)
  }
})
```

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持基础请求和自定义请求
- ✨ 支持流式响应
- ✨ 支持请求状态管理
- ✨ 全平台兼容（H5、小程序、App）

## 许可证

MIT License