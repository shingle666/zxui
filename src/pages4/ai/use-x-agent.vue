<template>
  <view class="container">
    <zx-navbar title="useXAgent 示例" back></zx-navbar>
    
    <view class="content">
      <!-- 基础用法 -->
      <view class="section">
        <view class="section-title">基础用法</view>
        <view class="demo-card">
          <view class="demo-title">预设请求</view>
          <view class="demo-desc">配置 baseURL、model 即可使用</view>
          <view class="input-group">
            <input 
              v-model="basicMessage" 
              placeholder="请输入消息" 
              class="input"
            />
            <button 
              @click="sendBasicMessage" 
              :disabled="basicAgent.value.isRequesting()"
              class="btn"
            >
              {{ basicAgent.value.isRequesting() ? '发送中...' : '发送' }}
            </button>
          </view>
          <view class="response-area">
            <view class="response-title">响应:</view>
            <view class="response-content">{{ basicResponse }}</view>
          </view>
        </view>
      </view>

      <!-- 自定义请求 -->
      <view class="section">
        <view class="section-title">自定义请求</view>
        <view class="demo-card">
          <view class="demo-title">自定义 RequestParams</view>
          <view class="demo-desc">可以向智能体等发送消息</view>
          <view class="input-group">
            <input 
              v-model="customMessage" 
              placeholder="请输入消息" 
              class="input"
            />
            <button 
              @click="sendCustomMessage" 
              :disabled="customAgent.value.isRequesting()"
              class="btn"
            >
              {{ customAgent.value.isRequesting() ? '发送中...' : '发送' }}
            </button>
          </view>
          <view class="response-area">
            <view class="response-title">响应:</view>
            <view class="response-content">{{ customResponse }}</view>
          </view>
        </view>
      </view>

      <!-- 流式响应 -->
      <view class="section">
        <view class="section-title">流式响应</view>
        <view class="demo-card">
          <view class="demo-title">实时流式更新</view>
          <view class="demo-desc">支持流式数据接收和实时更新</view>
          <view class="input-group">
            <input 
              v-model="streamMessage" 
              placeholder="请输入消息" 
              class="input"
            />
            <button 
              @click="sendStreamMessage" 
              :disabled="streamAgent.value.isRequesting()"
              class="btn"
            >
              {{ streamAgent.value.isRequesting() ? '接收中...' : '发送' }}
            </button>
            <button 
              v-if="streamController" 
              @click="stopStream"
              class="btn btn-danger"
            >
              停止
            </button>
          </view>
          <view class="response-area">
            <view class="response-title">流式响应:</view>
            <view class="response-content stream">{{ streamResponse }}</view>
          </view>
        </view>
      </view>

      <!-- 请求日志 -->
      <view class="section">
        <view class="section-title">请求日志</view>
        <view class="log-area">
          <view 
            v-for="(log, index) in requestLogs" 
            :key="index" 
            class="log-item"
            :class="log.type"
          >
            <view class="log-time">{{ log.time }}</view>
            <view class="log-content">{{ log.message }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import useXAgent from '@/utils/use-x-agent.js'
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue'


// 基础用法
const basicMessage = ref('')
const basicResponse = ref('')
const [basicAgent] = useXAgent({
  baseURL: 'https://api.example.com/v1/chat/completions',
  model: 'gpt-3.5-turbo',
  dangerouslyApiKey: 'Bearer your-api-key'
})

// 自定义请求
const customMessage = ref('')
const customResponse = ref('')
const [customAgent] = useXAgent({
  request: (info, callbacks) => {
    // 模拟自定义请求逻辑
    setTimeout(() => {
      const response = {
        role: 'assistant',
        content: `自定义响应: ${info.message?.content || '收到消息'}`
      }
      callbacks.onUpdate(response)
      callbacks.onSuccess([response])
    }, 1000)
  }
})

// 流式响应
const streamMessage = ref('')
const streamResponse = ref('')
const streamController = ref(null)
const [streamAgent] = useXAgent({
  request: (info, callbacks) => {
    // 模拟流式响应
    const controller = new AbortController()
    streamController.value = controller
    callbacks.onStream?.(controller)
    
    const message = info.message?.content || '流式消息'
    const words = message.split('')
    let index = 0
    
    const interval = setInterval(() => {
      if (controller.signal.aborted || index >= words.length) {
        clearInterval(interval)
        callbacks.onSuccess([{ content: message }])
        streamController.value = null
        return
      }
      
      const partialContent = words.slice(0, index + 1).join('')
      callbacks.onUpdate({ content: partialContent })
      index++
    }, 100)
  }
})

// 请求日志
const requestLogs = ref([])

// 添加日志
function addLog(message, type = 'info') {
  requestLogs.value.unshift({
    time: new Date().toLocaleTimeString(),
    message,
    type
  })
  
  // 限制日志数量
  if (requestLogs.value.length > 50) {
    requestLogs.value = requestLogs.value.slice(0, 50)
  }
}

// 发送基础消息
function sendBasicMessage() {
  if (!basicMessage.value.trim()) {
    uni.showToast({ title: '请输入消息', icon: 'none' })
    return
  }
  
  addLog(`发送基础消息: ${basicMessage.value}`, 'info')
  
  basicAgent.value.request(
    {
      message: {
        role: 'user',
        content: basicMessage.value
      }
    },
    {
      onUpdate: (message) => {
        basicResponse.value = message.content || JSON.stringify(message)
        addLog(`基础响应更新: ${message.content}`, 'success')
      },
      onSuccess: (messages) => {
        addLog(`基础请求成功，共 ${messages.length} 条消息`, 'success')
      },
      onError: (error) => {
        basicResponse.value = `错误: ${error.message}`
        addLog(`基础请求错误: ${error.message}`, 'error')
      }
    }
  )
  
  basicMessage.value = ''
}

// 发送自定义消息
function sendCustomMessage() {
  if (!customMessage.value.trim()) {
    uni.showToast({ title: '请输入消息', icon: 'none' })
    return
  }
  
  addLog(`发送自定义消息: ${customMessage.value}`, 'info')
  
  customAgent.value.request(
    {
      message: {
        role: 'user',
        content: customMessage.value
      }
    },
    {
      onUpdate: (message) => {
        customResponse.value = message.content || JSON.stringify(message)
        addLog(`自定义响应更新: ${message.content}`, 'success')
      },
      onSuccess: (messages) => {
        addLog(`自定义请求成功，共 ${messages.length} 条消息`, 'success')
      },
      onError: (error) => {
        customResponse.value = `错误: ${error.message}`
        addLog(`自定义请求错误: ${error.message}`, 'error')
      }
    }
  )
  
  customMessage.value = ''
}

// 发送流式消息
function sendStreamMessage() {
  if (!streamMessage.value.trim()) {
    uni.showToast({ title: '请输入消息', icon: 'none' })
    return
  }
  
  addLog(`发送流式消息: ${streamMessage.value}`, 'info')
  streamResponse.value = ''
  
  streamAgent.value.request(
    {
      message: {
        role: 'user',
        content: streamMessage.value
      }
    },
    {
      onUpdate: (message) => {
        streamResponse.value = message.content || JSON.stringify(message)
      },
      onSuccess: (messages) => {
        addLog(`流式请求成功，共 ${messages.length} 条消息`, 'success')
      },
      onError: (error) => {
        streamResponse.value = `错误: ${error.message}`
        addLog(`流式请求错误: ${error.message}`, 'error')
      },
      onStream: (controller) => {
        addLog('流式连接已建立', 'info')
      }
    }
  )
  
  streamMessage.value = ''
}

// 停止流式响应
function stopStream() {
  if (streamController.value) {
    streamController.value.abort()
    streamController.value = null
    addLog('流式响应已停止', 'warning')
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.content {
  padding: 20rpx;
}

.section {
  margin-bottom: 40rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
    padding-left: 20rpx;
    border-left: 6rpx solid #007aff;
  }
}

.demo-card {
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  
  .demo-title {
    font-size: 28rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 10rpx;
  }
  
  .demo-desc {
    font-size: 24rpx;
    color: #666;
    margin-bottom: 30rpx;
  }
}

.input-group {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
  
  .input {
    flex: 1;
    height: 80rpx;
    padding: 0 20rpx;
    border: 2rpx solid #e0e0e0;
    border-radius: 8rpx;
    font-size: 28rpx;
    
    &:focus {
      border-color: #007aff;
    }
  }
  
  .btn {
    height: 80rpx;
    padding: 0 30rpx;
    background: #007aff;
    color: white;
    border: none;
    border-radius: 8rpx;
    font-size: 28rpx;
    
    &:disabled {
      background: #ccc;
    }
    
    &.btn-danger {
      background: #ff3b30;
    }
  }
}

.response-area {
  .response-title {
    font-size: 26rpx;
    color: #333;
    margin-bottom: 15rpx;
    font-weight: bold;
  }
  
  .response-content {
    min-height: 120rpx;
    padding: 20rpx;
    background: #f8f8f8;
    border-radius: 8rpx;
    font-size: 24rpx;
    color: #333;
    line-height: 1.5;
    
    &.stream {
      font-family: monospace;
      white-space: pre-wrap;
    }
  }
}

.log-area {
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  max-height: 600rpx;
  overflow-y: auto;
  
  .log-item {
    padding: 15rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .log-time {
      font-size: 20rpx;
      color: #999;
      margin-bottom: 5rpx;
    }
    
    .log-content {
      font-size: 24rpx;
      line-height: 1.4;
    }
    
    &.info .log-content {
      color: #333;
    }
    
    &.success .log-content {
      color: #52c41a;
    }
    
    &.error .log-content {
      color: #ff4d4f;
    }
    
    &.warning .log-content {
      color: #faad14;
    }
  }
}
</style>