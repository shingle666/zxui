# XStream 流处理工具

## 概述

XStream 是一个基于 Vue 3 Composition API 的流处理工具，专为 uni-app 框架设计，支持全平台（H5、微信小程序、其他小程序平台、App）。它可以将 `ReadableStream` 转换为易于处理的数据格式，特别适用于处理 Server-Sent Events (SSE) 协议和其他流式数据。

## 特性

- 🚀 **全平台兼容**：支持 H5、微信小程序、其他小程序平台、App
- 📦 **轻量级**：纯 JavaScript 实现，无外部依赖
- 🔧 **灵活配置**：支持自定义转换流处理不同协议
- 🎯 **Vue 3 集成**：提供 Composition API Hook，响应式状态管理
- 📡 **SSE 支持**：内置 Server-Sent Events 协议支持
- 🔄 **异步迭代**：支持 `for await...of` 语法

## 安装

将 `x-stream.js` 文件放置在项目的 `src/utils/` 目录下。

## 基础用法

### 导入

```javascript
import { XStream, useXStream } from '@/utils/x-stream.js'
```

### 基本示例

```javascript
import { XStream } from '@/utils/x-stream.js'

async function processStream() {
  // 获取 ReadableStream（例如从 fetch 响应）
  const response = await fetch('/api/stream')
  
  // 创建 XStream 实例
  const stream = XStream({
    readableStream: response.body
  })
  
  // 使用异步迭代器处理数据
  for await (const chunk of stream) {
    console.log('接收到数据块:', chunk)
  }
}
```

## Vue 3 Composition API 用法

### useXStream Hook

`useXStream` 提供了响应式的流处理状态管理：

```vue
<template>
  <view>
    <button @click="startStream" :disabled="isStreaming">
      {{ isStreaming ? '处理中...' : '开始流处理' }}
    </button>
    
    <view v-if="hasError">
      错误: {{ error.message }}
    </view>
    
    <view>
      已接收 {{ chunkCount }} 个数据块
    </view>
    
    <view v-for="(chunk, index) in chunks" :key="index">
      {{ JSON.stringify(chunk) }}
    </view>
  </view>
</template>

<script setup>
import { useXStream } from '@/utils/x-stream.js'

const {
  isStreaming,
  error,
  chunks,
  hasError,
  chunkCount,
  startStream,
  stopStream,
  processStream
} = useXStream()

async function handleStartStream() {
  try {
    const response = await fetch('/api/stream')
    const stream = await startStream(response.body)
    
    // 处理流数据
    processStream(
      stream,
      (chunk) => {
        // 处理每个数据块
        console.log('新数据块:', chunk)
      },
      (allChunks) => {
        // 流处理完成
        console.log('流处理完成，总共接收:', allChunks.length, '个数据块')
      },
      (error) => {
        // 错误处理
        console.error('流处理错误:', error)
      }
    )
  } catch (err) {
    console.error('启动流失败:', err)
  }
}
</script>
```

## API 参考

### XStream(options)

创建一个流处理实例。

#### 参数

- `options` (Object): 配置选项
  - `readableStream` (ReadableStream<Uint8Array>): 要处理的可读流
  - `transformStream` (TransformStream, 可选): 自定义转换流

#### 返回值

返回一个增强的 `ReadableStream`，支持异步迭代器。

#### 示例

```javascript
// 默认 SSE 处理
const stream = XStream({
  readableStream: response.body
})

// 自定义转换流
const customTransform = new TransformStream({
  transform(chunk, controller) {
    // 自定义处理逻辑
    controller.enqueue(processChunk(chunk))
  }
})

const stream = XStream({
  readableStream: response.body,
  transformStream: customTransform
})
```

### useXStream()

Vue 3 Composition API Hook，提供响应式的流处理状态管理。

#### 返回值

返回一个包含以下属性和方法的对象：

##### 响应式状态

- `isStreaming` (Ref<boolean>): 是否正在流式传输
- `error` (Ref<Error | null>): 错误信息
- `chunks` (Ref<Array>): 接收到的数据块数组
- `currentStream` (Ref<ReadableStream | null>): 当前流实例

##### 计算属性

- `hasError` (ComputedRef<boolean>): 是否有错误
- `chunkCount` (ComputedRef<number>): 数据块数量
- `lastChunk` (ComputedRef<any>): 最后一个数据块

##### 方法

- `startStream(readableStream, transformStream?)`: 开始流处理
- `stopStream()`: 停止当前流
- `processStream(stream, onChunk?, onComplete?, onError?)`: 处理流数据

## 协议支持

### Server-Sent Events (SSE)

XStream 默认支持 SSE 协议，自动解析以下格式的数据：

```
event: message
data: {"content": "Hello World"}

event: progress
data: {"percent": 50}

```

解析后的数据格式：

```javascript
{
  event: 'message',
  data: '{"content": "Hello World"}'
}
```

### 自定义协议

可以通过提供自定义 `TransformStream` 来支持其他协议：

#### JSON Lines 示例

```javascript
function createJSONLinesTransform() {
  let buffer = ''
  
  return new TransformStream({
    transform(chunk, controller) {
      buffer += chunk
      const lines = buffer.split('\n')
      
      // 处理完整的行
      lines.slice(0, -1).forEach(line => {
        if (line.trim()) {
          try {
            const parsed = JSON.parse(line)
            controller.enqueue(parsed)
          } catch (err) {
            console.error('JSON 解析错误:', err)
          }
        }
      })
      
      // 保留不完整的行
      buffer = lines[lines.length - 1]
    },
    flush(controller) {
      if (buffer.trim()) {
        try {
          const parsed = JSON.parse(buffer)
          controller.enqueue(parsed)
        } catch (err) {
          console.error('JSON 解析错误:', err)
        }
      }
    }
  })
}

// 使用自定义转换流
const stream = XStream({
  readableStream: response.body,
  transformStream: createJSONLinesTransform()
})
```

## 实际应用场景

### AI 对话流式响应

```javascript
async function handleAIChat(message) {
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  })
  
  const stream = XStream({
    readableStream: response.body
  })
  
  let aiResponse = ''
  
  for await (const chunk of stream) {
    if (chunk.data) {
      try {
        const parsed = JSON.parse(chunk.data)
        if (parsed.content) {
          aiResponse += parsed.content
          // 更新 UI 显示实时响应
          updateChatUI(aiResponse)
        }
      } catch (err) {
        console.error('解析 AI 响应错误:', err)
      }
    }
  }
}
```

### 文件上传进度

```javascript
async function uploadWithProgress(file) {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
  
  const stream = XStream({
    readableStream: response.body
  })
  
  for await (const chunk of stream) {
    if (chunk.event === 'progress' && chunk.data) {
      const progress = JSON.parse(chunk.data)
      updateProgressBar(progress.percent)
    } else if (chunk.event === 'complete') {
      const result = JSON.parse(chunk.data)
      handleUploadComplete(result)
    }
  }
}
```

## 错误处理

```javascript
try {
  const stream = XStream({
    readableStream: response.body
  })
  
  for await (const chunk of stream) {
    // 处理数据块
  }
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('流被中止')
  } else {
    console.error('流处理错误:', error)
  }
}
```

## 注意事项

1. **编码支持**：当前仅支持 UTF-8 编码
2. **平台兼容性**：在小程序环境中，某些 Web API 可能有限制
3. **内存管理**：处理大量数据时注意内存使用
4. **错误处理**：建议始终包含错误处理逻辑
5. **流的生命周期**：记得在组件卸载时停止流处理

## 常见问题

### Q: 如何在小程序中使用？

A: XStream 设计时考虑了小程序的兼容性，避免使用浏览器特有的 DOM API。在小程序中使用时，确保网络请求返回的是标准的 `ReadableStream`。

### Q: 如何处理网络中断？

A: 可以通过监听错误事件来处理网络中断：

```javascript
processStream(
  stream,
  onChunk,
  onComplete,
  (error) => {
    if (error.name === 'NetworkError') {
      // 处理网络错误，可能需要重试
      handleNetworkError(error)
    }
  }
)
```

### Q: 如何自定义数据解析？

A: 通过提供自定义的 `TransformStream` 来实现特定的数据解析逻辑。参考上面的 JSON Lines 示例。

## 更新日志

### v1.0.0

- 初始版本发布
- 支持 SSE 协议
- 提供 Vue 3 Composition API Hook
- 全平台兼容性支持

## 许可证

MIT License