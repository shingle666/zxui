# XRequest - uni-app AI 请求工具

## 概述

XRequest 是一个专为 uni-app 框架设计的 AI 请求工具，支持向符合 OpenAI 标准的 LLM 发起请求。该工具兼容 H5、微信小程序、其他小程序平台和 App，支持流式和非流式响应。

## 特性

- ✅ **全平台兼容**: 支持 H5、微信小程序、其他小程序平台、App
- ✅ **流式响应**: 在 H5 环境支持真正的流式响应，小程序环境提供模拟流式体验
- ✅ **Vue 3 Composition API**: 提供 `useXRequest` Hook，方便在组件中使用
- ✅ **请求控制**: 支持请求取消和超时控制
- ✅ **错误处理**: 完善的错误处理机制
- ✅ **自定义转换**: 支持自定义流数据转换器
- ✅ **TypeScript 友好**: 提供完整的类型定义

## 安装

将 `x-request.js` 文件放置在项目的 `src/utils/` 目录下。

## 基础用法

### 1. 创建请求实例

```javascript
import XRequest from '@/utils/x-request.js'

// 创建请求实例
const xRequest = XRequest({
  baseURL: 'https://api.openai.com/v1/chat/completions',
  model: 'gpt-3.5-turbo',
  dangerouslyApiKey: 'Bearer your-api-key', // ⚠️ 仅用于开发环境
  timeout: 60000
})
```

### 2. 发起请求

```javascript
// 非流式请求
await xRequest.create(
  {
    model: 'gpt-3.5-turbo',
    stream: false,
    messages: [
      {
        role: 'user',
        content: 'Hello, how are you?'
      }
    ]
  },
  {
    onSuccess: (chunks) => {
      console.log('请求成功:', chunks)
    },
    onError: (error) => {
      console.error('请求失败:', error)
    },
    onUpdate: (chunk) => {
      console.log('收到数据:', chunk)
    }
  }
)

// 流式请求
await xRequest.create(
  {
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: 'Tell me a story'
      }
    ]
  },
  {
    onSuccess: (chunks) => {
      console.log('流式请求完成:', chunks)
    },
    onError: (error) => {
      console.error('请求失败:', error)
    },
    onUpdate: (chunk) => {
      console.log('收到流数据:', chunk)
      // 处理流式数据
      if (chunk.choices && chunk.choices[0] && chunk.choices[0].delta) {
        const content = chunk.choices[0].delta.content
        if (content) {
          // 累积显示文本
        }
      }
    },
    onStream: (abortController) => {
      // 保存控制器，用于取消请求
      window.currentAbortController = abortController
    }
  }
)
```

## Vue 3 Composition API 用法

### 使用 useXRequest Hook

```vue
<template>
  <view>
    <button :disabled="isLoading" @click="sendMessage">
      {{ isLoading ? '发送中...' : '发送消息' }}
    </button>
    
    <button v-if="isLoading" @click="abort">
      取消请求
    </button>
    
    <view v-if="hasError">
      错误: {{ error.message }}
    </view>
    
    <view v-if="chunks.length">
      收到 {{ chunkCount }} 个数据块
    </view>
    
    <view v-if="lastChunk">
      最新数据: {{ lastChunk }}
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { useXRequest } from '@/utils/x-request.js'

const {
  isLoading,
  error,
  data,
  chunks,
  hasError,
  chunkCount,
  lastChunk,
  init,
  create,
  abort
} = useXRequest()

// 初始化请求实例
init({
  baseURL: 'https://api.openai.com/v1/chat/completions',
  model: 'gpt-3.5-turbo',
  dangerouslyApiKey: 'Bearer your-api-key'
})

const sendMessage = async () => {
  await create(
    {
      stream: true,
      messages: [{ role: 'user', content: 'Hello!' }]
    },
    {
      onUpdate: (chunk) => {
        console.log('收到数据:', chunk)
      },
      onSuccess: (chunks) => {
        console.log('请求完成:', chunks)
      },
      onError: (err) => {
        console.error('请求失败:', err)
      }
    }
  )
}
</script>
```

## API 参考

### XRequest 配置选项

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| baseURL | string | ✅ | - | API 请求的基础 URL |
| model | string | ❌ | - | 模型名称，如 'gpt-3.5-turbo' |
| dangerouslyApiKey | string | ❌ | - | ⚠️ API Key，存在安全风险，仅用于开发环境 |
| timeout | number | ❌ | 60000 | 请求超时时间（毫秒） |
| headers | object | ❌ | {} | 自定义请求头 |
| fetch | function | ❌ | - | 自定义 fetch 函数 |

### 请求参数 (XRequestParams)

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| model | string | ❌ | 配置中的 model | 生成响应时使用的模型 |
| stream | boolean | ❌ | false | 是否使用流式响应 |
| messages | array | ❌ | [] | 消息对象数组 |

### 回调函数 (XRequestCallbacks)

| 回调 | 类型 | 说明 |
|------|------|------|
| onSuccess | (chunks: any[]) => void | 请求成功时的回调 |
| onError | (error: Error) => void | 请求失败时的回调 |
| onUpdate | (chunk: any) => void | 收到数据块时的回调 |
| onStream | (abortController: AbortController) => void | 流控制器创建时的回调 |

### useXRequest Hook 返回值

| 属性/方法 | 类型 | 说明 |
|-----------|------|------|
| isLoading | Ref<boolean> | 是否正在请求 |
| error | Ref<Error \| null> | 错误信息 |
| data | Ref<any> | 响应数据 |
| chunks | Ref<any[]> | 数据块数组 |
| hasError | ComputedRef<boolean> | 是否有错误 |
| chunkCount | ComputedRef<number> | 数据块数量 |
| lastChunk | ComputedRef<any> | 最后一个数据块 |
| init | (config: XRequestOptions) => XRequestClass | 初始化请求实例 |
| create | (params: XRequestParams, callbacks?: XRequestCallbacks) => Promise<void> | 发起请求 |
| abort | () => void | 取消当前请求 |

## 平台差异说明

### H5 环境
- 支持真正的流式响应
- 使用 fetch API 和 ReadableStream
- 支持请求取消

### 小程序环境
- 使用 uni.request 发起请求
- 模拟流式响应体验
- 支持请求取消

### App 环境
- 使用 uni.request 发起请求
- 回退到普通请求模式
- 支持请求取消

## 自定义转换器

可以提供自定义的流数据转换器来处理特殊格式的响应：

```javascript
// 自定义转换器示例
const customTransformStream = new TransformStream({
  transform(chunk, controller) {
    // 处理自定义协议数据
    try {
      const lines = chunk.split('\n')
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(6))
          controller.enqueue(data)
        }
      }
    } catch (error) {
      console.error('转换错误:', error)
    }
  }
})

// 使用自定义转换器
await xRequest.create(
  { /* 请求参数 */ },
  { /* 回调函数 */ },
  customTransformStream
)
```

## 错误处理

```javascript
try {
  await xRequest.create(params, {
    onError: (error) => {
      if (error.message.includes('取消')) {
        console.log('请求被用户取消')
      } else if (error.message.includes('超时')) {
        console.log('请求超时')
      } else {
        console.error('请求失败:', error.message)
      }
    }
  })
} catch (error) {
  console.error('请求异常:', error)
}
```

## 安全注意事项

⚠️ **重要**: `dangerouslyApiKey` 选项存在安全风险，因为它会在客户端代码中暴露您的 API 密钥。Web 浏览器本质上比服务器环境安全性更低，任何有权访问浏览器的用户都可能检查、提取和滥用这些凭据。

**建议**:
1. 仅在开发环境中使用 `dangerouslyApiKey`
2. 生产环境中应通过后端代理 API 请求
3. 使用环境变量管理敏感信息
4. 定期轮换 API 密钥

## 示例项目

完整的使用示例请参考 `src/pages4/ai/x-request.vue` 文件，该文件展示了：

- 基础配置界面
- 消息输入和发送
- 流式响应实时显示
- 错误处理
- 请求状态管理
- 数据块列表展示

## 依赖

- Vue 3
- uni-app
- x-stream.js (流数据处理)

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础请求功能
- 支持流式响应
- 提供 Vue 3 Composition API Hook
- 全平台兼容

## 许可证

MIT License