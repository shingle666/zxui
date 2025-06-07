<template>
  <view class="x-stream-demo">
    <zx-navbar title="XStream 流处理" back></zx-navbar>
    
    <view class="demo-container">
      <!-- SSE 流演示 -->
      <view class="demo-section">
        <view class="section-title">SSE 流处理演示</view>
        <view class="demo-card">
          <view class="card-header">
            <text class="card-title">Server-Sent Events</text>
            <button 
              class="btn" 
              :class="{ 'btn-loading': sseDemo.isStreaming }"
              @click="startSSEDemo"
              :disabled="sseDemo.isStreaming"
            >
              {{ sseDemo.isStreaming ? '处理中...' : '开始 SSE 流' }}
            </button>
          </view>
          
          <view class="stream-info">
            <text class="info-item">状态: {{ sseDemo.isStreaming ? '流式传输中' : '已停止' }}</text>
            <text class="info-item">数据块数量: {{ sseDemo.chunkCount }}</text>
            <text class="info-item" v-if="sseDemo.hasError">错误: {{ sseDemo.error?.message }}</text>
          </view>
          
          <view class="stream-output" v-if="sseDemo.chunks.length > 0">
            <view class="output-title">接收到的数据:</view>
            <scroll-view class="output-content" scroll-y>
              <view 
                class="chunk-item" 
                v-for="(chunk, index) in sseDemo.chunks" 
                :key="index"
              >
                <text class="chunk-index">#{{ index + 1 }}</text>
                <text class="chunk-data">{{ JSON.stringify(chunk, null, 2) }}</text>
              </view>
            </scroll-view>
          </view>
          
          <button 
            class="btn btn-secondary" 
            @click="stopSSEDemo"
            v-if="sseDemo.isStreaming"
          >
            停止流
          </button>
        </view>
      </view>
      
      <!-- 自定义协议演示 -->
      <view class="demo-section">
        <view class="section-title">自定义协议演示</view>
        <view class="demo-card">
          <view class="card-header">
            <text class="card-title">JSON Lines 协议</text>
            <button 
              class="btn" 
              :class="{ 'btn-loading': customDemo.isStreaming }"
              @click="startCustomDemo"
              :disabled="customDemo.isStreaming"
            >
              {{ customDemo.isStreaming ? '处理中...' : '开始自定义流' }}
            </button>
          </view>
          
          <view class="stream-info">
            <text class="info-item">状态: {{ customDemo.isStreaming ? '流式传输中' : '已停止' }}</text>
            <text class="info-item">数据块数量: {{ customDemo.chunkCount }}</text>
            <text class="info-item" v-if="customDemo.hasError">错误: {{ customDemo.error?.message }}</text>
          </view>
          
          <view class="stream-output" v-if="customDemo.chunks.length > 0">
            <view class="output-title">接收到的数据:</view>
            <scroll-view class="output-content" scroll-y>
              <view 
                class="chunk-item" 
                v-for="(chunk, index) in customDemo.chunks" 
                :key="index"
              >
                <text class="chunk-index">#{{ index + 1 }}</text>
                <text class="chunk-data">{{ JSON.stringify(chunk, null, 2) }}</text>
              </view>
            </scroll-view>
          </view>
          
          <button 
            class="btn btn-secondary" 
            @click="stopCustomDemo"
            v-if="customDemo.isStreaming"
          >
            停止流
          </button>
        </view>
      </view>
      
      <!-- 实际应用演示 -->
      <view class="demo-section">
        <view class="section-title">实际应用演示</view>
        <view class="demo-card">
          <view class="card-header">
            <text class="card-title">模拟 AI 对话流</text>
            <button 
              class="btn" 
              :class="{ 'btn-loading': aiDemo.isStreaming }"
              @click="startAIDemo"
              :disabled="aiDemo.isStreaming"
            >
              {{ aiDemo.isStreaming ? '生成中...' : '开始 AI 对话' }}
            </button>
          </view>
          
          <view class="ai-chat" v-if="aiDemo.chunks.length > 0 || aiDemo.isStreaming">
            <view class="chat-message user">
              <text>用户: 请介绍一下 Vue 3 的 Composition API</text>
            </view>
            <view class="chat-message ai">
              <text class="ai-label">AI:</text>
              <text class="ai-content">{{ aiResponse }}</text>
              <text class="cursor" v-if="aiDemo.isStreaming">|</text>
            </view>
          </view>
          
          <button 
            class="btn btn-secondary" 
            @click="stopAIDemo"
            v-if="aiDemo.isStreaming"
          >
            停止生成
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { useXStream } from '@/utils/x-stream.js'
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue'


// SSE 演示
const sseDemo = useXStream()

// 自定义协议演示
const customDemo = useXStream()

// AI 对话演示
const aiDemo = useXStream()
const aiResponse = ref('')

/**
 * 创建模拟 SSE 数据流
 */
function createMockSSEStream() {
  const sseData = [
    'event: start\ndata: {"type": "start", "message": "开始处理"}\n\n',
    'event: progress\ndata: {"type": "progress", "percent": 25}\n\n',
    'event: progress\ndata: {"type": "progress", "percent": 50}\n\n',
    'event: progress\ndata: {"type": "progress", "percent": 75}\n\n',
    'event: complete\ndata: {"type": "complete", "result": "处理完成"}\n\n'
  ]
  
  let index = 0
  
  return new ReadableStream({
    start(controller) {
      const sendNext = () => {
        if (index < sseData.length) {
          const encoder = new TextEncoder()
          controller.enqueue(encoder.encode(sseData[index]))
          index++
          setTimeout(sendNext, 1000) // 每秒发送一个数据块
        } else {
          controller.close()
        }
      }
      sendNext()
    }
  })
}

/**
 * 创建模拟 JSON Lines 数据流
 */
function createMockJSONLinesStream() {
  const jsonLines = [
    '{"id": 1, "name": "张三", "age": 25}\n',
    '{"id": 2, "name": "李四", "age": 30}\n',
    '{"id": 3, "name": "王五", "age": 28}\n',
    '{"id": 4, "name": "赵六", "age": 35}\n'
  ]
  
  let index = 0
  
  return new ReadableStream({
    start(controller) {
      const sendNext = () => {
        if (index < jsonLines.length) {
          const encoder = new TextEncoder()
          controller.enqueue(encoder.encode(jsonLines[index]))
          index++
          setTimeout(sendNext, 800)
        } else {
          controller.close()
        }
      }
      sendNext()
    }
  })
}

/**
 * 创建 JSON Lines 转换流
 */
function createJSONLinesTransformStream() {
  let buffer = ''
  
  return new TransformStream({
    transform(chunk, controller) {
      buffer += chunk
      const lines = buffer.split('\n')
      
      // 处理除最后一行外的所有完整行
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
      
      // 保留最后一行（可能不完整）
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

/**
 * 创建模拟 AI 对话流
 */
function createMockAIStream() {
  const aiText = 'Vue 3 的 Composition API 是一套全新的 API 设计，它提供了更灵活的代码组织方式。通过 setup 函数，我们可以将相关的逻辑组合在一起，而不是按照选项类型分散在不同的选项中。这种方式让代码更加模块化，也更容易复用和测试。主要特性包括：响应式系统、生命周期钩子、依赖注入等。'
  
  let index = 0
  
  return new ReadableStream({
    start(controller) {
      const sendNext = () => {
        if (index < aiText.length) {
          const encoder = new TextEncoder()
          const chunk = aiText.slice(index, index + Math.floor(Math.random() * 5) + 1)
          controller.enqueue(encoder.encode(`data: {"content": "${chunk}"}\n\n`))
          index += chunk.length
          setTimeout(sendNext, 100 + Math.random() * 100) // 随机延迟
        } else {
          controller.close()
        }
      }
      sendNext()
    }
  })
}

/**
 * 开始 SSE 演示
 */
async function startSSEDemo() {
  try {
    const stream = await sseDemo.startStream(createMockSSEStream())
    
    sseDemo.processStream(
      stream,
      (chunk) => {
        console.log('SSE 数据块:', chunk)
      },
      (allChunks) => {
        console.log('SSE 流完成，总共接收:', allChunks.length, '个数据块')
      },
      (error) => {
        console.error('SSE 流错误:', error)
      }
    )
  } catch (error) {
    console.error('启动 SSE 流失败:', error)
  }
}

/**
 * 停止 SSE 演示
 */
function stopSSEDemo() {
  sseDemo.stopStream()
}

/**
 * 开始自定义协议演示
 */
async function startCustomDemo() {
  try {
    const transformStream = createJSONLinesTransformStream()
    const stream = await customDemo.startStream(createMockJSONLinesStream(), transformStream)
    
    customDemo.processStream(
      stream,
      (chunk) => {
        console.log('JSON Lines 数据块:', chunk)
      },
      (allChunks) => {
        console.log('JSON Lines 流完成，总共接收:', allChunks.length, '个数据块')
      },
      (error) => {
        console.error('JSON Lines 流错误:', error)
      }
    )
  } catch (error) {
    console.error('启动自定义流失败:', error)
  }
}

/**
 * 停止自定义协议演示
 */
function stopCustomDemo() {
  customDemo.stopStream()
}

/**
 * 开始 AI 对话演示
 */
async function startAIDemo() {
  try {
    aiResponse.value = ''
    const stream = await aiDemo.startStream(createMockAIStream())
    
    aiDemo.processStream(
      stream,
      (chunk) => {
        if (chunk.data) {
          try {
            const parsed = JSON.parse(chunk.data)
            if (parsed.content) {
              aiResponse.value += parsed.content
            }
          } catch (err) {
            console.error('AI 数据解析错误:', err)
          }
        }
      },
      (allChunks) => {
        console.log('AI 对话流完成')
      },
      (error) => {
        console.error('AI 对话流错误:', error)
      }
    )
  } catch (error) {
    console.error('启动 AI 对话流失败:', error)
  }
}

/**
 * 停止 AI 对话演示
 */
function stopAIDemo() {
  aiDemo.stopStream()
  aiResponse.value = ''
}

// 组件卸载时清理
onUnmounted(() => {
  sseDemo.stopStream()
  customDemo.stopStream()
  aiDemo.stopStream()
})
</script>

<style scoped>
.x-stream-demo {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.demo-container {
  padding: 20rpx;
}

.demo-section {
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  padding-left: 10rpx;
}

.demo-card {
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.card-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
}

.btn {
  padding: 16rpx 32rpx;
  border-radius: 8rpx;
  border: none;
  font-size: 24rpx;
  background: #1890ff;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.btn:disabled {
  background: #d9d9d9;
  cursor: not-allowed;
}

.btn-loading {
  background: #40a9ff;
}

.btn-secondary {
  background: #ff4d4f;
  margin-top: 20rpx;
}

.stream-info {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
  margin-bottom: 20rpx;
  padding: 20rpx;
  background: #f8f9fa;
  border-radius: 8rpx;
}

.info-item {
  font-size: 24rpx;
  color: #666;
}

.stream-output {
  margin-top: 20rpx;
}

.output-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 15rpx;
}

.output-content {
  max-height: 400rpx;
  background: #f8f9fa;
  border-radius: 8rpx;
  padding: 20rpx;
}

.chunk-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 20rpx;
  padding: 15rpx;
  background: white;
  border-radius: 6rpx;
  border-left: 4rpx solid #1890ff;
}

.chunk-index {
  font-size: 22rpx;
  color: #1890ff;
  font-weight: 600;
  margin-bottom: 8rpx;
}

.chunk-data {
  font-size: 24rpx;
  color: #333;
  font-family: 'Courier New', monospace;
  white-space: pre-wrap;
  word-break: break-all;
}

.ai-chat {
  margin-top: 20rpx;
}

.chat-message {
  margin-bottom: 20rpx;
  padding: 20rpx;
  border-radius: 12rpx;
}

.chat-message.user {
  background: #e6f7ff;
  margin-left: 60rpx;
}

.chat-message.ai {
  background: #f6ffed;
  margin-right: 60rpx;
  display: flex;
  flex-direction: column;
}

.ai-label {
  font-size: 24rpx;
  color: #52c41a;
  font-weight: 600;
  margin-bottom: 10rpx;
}

.ai-content {
  font-size: 26rpx;
  color: #333;
  line-height: 1.6;
}

.cursor {
  display: inline-block;
  width: 2rpx;
  height: 32rpx;
  background: #333;
  animation: blink 1s infinite;
  margin-left: 4rpx;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}
</style>