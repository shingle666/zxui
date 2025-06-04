<template>
  <view class="use-x-chat-demo">
    <zx-navbar title="use-x-chat 示例" :border="false" />
    
    <!-- 聊天消息列表 -->
    <scroll-view 
      class="chat-container" 
      scroll-y 
      :scroll-top="scrollTop"
      scroll-with-animation
    >
      <view class="message-list">
        <view 
          v-for="msg in parsedMessages" 
          :key="msg.id" 
          class="message-item"
          :class="getMessageClass(msg)"
        >
          <view class="message-content">
            <view class="message-text">{{ msg.message }}</view>
            <view class="message-status" v-if="msg.status === 'loading'">
              <text class="loading-text">发送中...</text>
            </view>
            <view class="message-status" v-else-if="msg.status === 'error'">
              <text class="error-text">发送失败</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    
    <!-- 输入区域 -->
    <view class="input-container">
      <view class="input-wrapper">
        <input 
          v-model="inputText" 
          class="message-input" 
          placeholder="请输入消息..." 
          @confirm="sendMessage"
          confirm-type="send"
        />
        <button 
          class="send-button" 
          :disabled="!inputText.trim() || isLoading"
          @click="sendMessage"
        >
          {{ isLoading ? '发送中' : '发送' }}
        </button>
      </view>
    </view>
    
    <!-- 功能按钮区域 -->
    <view class="action-buttons">
      <button class="action-btn" @click="clearMessages">清空消息</button>
      <button class="action-btn" @click="addSystemMessage">添加系统消息</button>
      <button class="action-btn" @click="simulateError">模拟错误</button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useStore } from 'vuex'
import { useXChat } from '@/utils/use-x-chat.js'
import XRequest from '@/utils/x-request.js'

// 获取store实例
const store = useStore()

// 创建真实的API代理对象
const createApiAgent = () => {
  const aiConfig = store.getters.aiConfig
  
  // 初始化 XRequest 实例
  const xRequest = XRequest({
    baseURL: `${aiConfig.baseURL}/admin/workspace-chats`,
    model: aiConfig.model,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${aiConfig.apiKey}`
    }
  })
  
  return {
    async request(params, callbacks) {
      const { message, messages = [] } = params
      
      try {
        // 使用 XRequest 发起请求
        await xRequest.create(
          {
            model: aiConfig.model,
            stream: aiConfig.stream,
            messages: [
              ...messages,
              { role: 'user', content: message }
            ],
            maxTokens: aiConfig.maxTokens,
            temperature: aiConfig.temperature
          },
          {
            onSuccess: (responseChunks) => {
              
              // 处理成功响应
              if (responseChunks && responseChunks.length > 0) {
                const lastResponse = responseChunks[responseChunks.length - 1]
             
                // 检查是否有聊天记录格式的响应
                if (lastResponse.chats && lastResponse.chats.length > 0) {
                  const latestChat = lastResponse.chats[0]
                  let responseText = ''
                 
                  try {
                    // 检查 response 字段是否为字符串
                    if (typeof latestChat.response === 'string') {
                      // 尝试解析 JSON 字符串
                      const responseData = JSON.parse(latestChat.response)
                      responseText = responseData.text || responseData.content || responseData.message || ''
                    } else if (typeof latestChat.response === 'object') {
                      // 直接是对象格式
                      responseText = latestChat.response.text || latestChat.response.content || latestChat.response.message || ''
                    } else {
                      responseText = String(latestChat.response || '')
                    }
                  } catch (error) {
                    console.error('解析响应数据失败:', error)
                    // 如果解析失败，直接使用原始响应
                    responseText = String(latestChat.response || '')
                  }
                  
                  callbacks.onSuccess(responseText)
                } else if (lastResponse.choices && lastResponse.choices[0]) {
                  // OpenAI 格式响应
                  const content = lastResponse.choices[0].message?.content || 
                                lastResponse.choices[0].delta?.content || ''
                  callbacks.onSuccess(content)
                } else if (typeof lastResponse === 'string') {
                  // 直接是字符串响应
                  callbacks.onSuccess(lastResponse)
                } else if (lastResponse.text || lastResponse.content || lastResponse.message) {
                  // 包含文本字段的对象响应
                  const content = lastResponse.text || lastResponse.content || lastResponse.message
                  callbacks.onSuccess(String(content))
                } else {
                  // 其他格式响应
                  callbacks.onSuccess(String(lastResponse))
                }
              } else {
                callbacks.onError(new Error('未获取到有效响应'))
              }
            },
            onError: (error) => {
              console.error('XRequest 请求错误:', error)
              callbacks.onError(error)
            },
            onUpdate: (chunk) => {
              // 处理流式更新
              if (chunk.choices && chunk.choices[0]) {
                const content = chunk.choices[0].delta?.content || ''
                if (content) {
                  callbacks.onUpdate(content)
                }
              } else if (chunk.chats && chunk.chats.length > 0) {
                // 处理自定义格式的流式响应
                const latestChat = chunk.chats[0]
                let responseText = ''
                
                try {
                  // 检查 response 字段类型
                  if (typeof latestChat.response === 'string') {
                    // 尝试解析 JSON 字符串
                    try {
                      const responseData = JSON.parse(latestChat.response)
                      responseText = responseData.text || responseData.content || responseData.message || ''
                    } catch (parseError) {
                      // 如果不是有效JSON，直接使用字符串
                      responseText = latestChat.response
                    }
                  } else if (typeof latestChat.response === 'object') {
                    // 直接是对象格式
                    responseText = latestChat.response.text || latestChat.response.content || latestChat.response.message || ''
                  } else {
                    responseText = String(latestChat.response || '')
                  }
                } catch (error) {
                  console.error('流式数据解析失败:', error)
                  responseText = String(latestChat.response || '')
                }
                
                if (responseText) {
                  callbacks.onUpdate(responseText)
                }
              } else if (typeof chunk === 'string') {
                // 直接是字符串流式数据
                callbacks.onUpdate(chunk)
              } else if (chunk.text || chunk.content || chunk.message) {
                // 包含文本字段的流式数据
                const content = chunk.text || chunk.content || chunk.message
                if (content) {
                  callbacks.onUpdate(String(content))
                }
              }
            },
            onStream: (abortController) => {
              // 传递中止控制器
              if (callbacks.onStream) {
                callbacks.onStream(abortController)
              }
            }
          }
        )
      } catch (error) {
        console.error('API请求错误:', error)
        callbacks.onError(error)
      }
    }
  }
}

// 聊天配置
const chatConfig = {
  agent: createApiAgent(),
  defaultMessages: [
    { message: '欢迎使用 use-x-chat 工具！' },
    { message: '这是一个基于 Vue 3 Composition API 的聊天工具示例' }
  ],
  requestPlaceholder: '正在思考中...',
  requestFallback: '抱歉，发生了错误，请稍后重试',
  parser: (message) => {
    // 简单的消息解析器
    if (typeof message === 'string') {
      return message
    }
    return String(message)
  },
  transformMessage: ({ currentMessage, status }) => {
    // 消息转换
    return currentMessage
  }
}

// 使用聊天 Hook
const { onRequest, messages, parsedMessages, setMessages } = useXChat(chatConfig)

// 响应式数据
const inputText = ref('')
const scrollTop = ref(0)
const isLoading = computed(() => {
  return messages.value.some(msg => msg.status === 'loading')
})

// 发送消息
const sendMessage = () => {
  if (!inputText.value.trim()) return
  
  onRequest(inputText.value.trim())
  inputText.value = ''
  
  // 滚动到底部
  nextTick(() => {
    scrollToBottom()
  })
}

// 清空消息
const clearMessages = () => {
  setMessages([])
}

// 添加系统消息
const addSystemMessage = () => {
  setMessages(prev => [
    ...prev,
    {
      id: `system_${Date.now()}`,
      message: '这是一条系统消息',
      status: 'local'
    }
  ])
}

// 模拟错误
const simulateError = () => {
  onRequest('触发错误测试')
}

// 获取消息样式类
const getMessageClass = (msg) => {
  const classes = []
  
  if (msg.id.startsWith('default_') || msg.id.startsWith('system_')) {
    classes.push('system-message')
  } else {
    classes.push('user-message')
  }
  
  if (msg.status === 'loading') {
    classes.push('loading-message')
  } else if (msg.status === 'error') {
    classes.push('error-message')
  }
  
  return classes
}

// 滚动到底部
const scrollToBottom = () => {
  scrollTop.value = scrollTop.value === 99999 ? 99998 : 99999
}

// 监听消息变化，自动滚动
watch(
  () => parsedMessages.value.length,
  () => {
    nextTick(() => {
      scrollToBottom()
    })
  }
)
</script>

<style lang="scss" scoped>
.use-x-chat-demo {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.chat-container {
  flex: 1;
  padding: 20rpx;
}

.message-list {
  padding-bottom: 20rpx;
}

.message-item {
  margin-bottom: 20rpx;
  display: flex;
  
  &.user-message {
    justify-content: flex-end;
    
    .message-content {
      background-color: #007aff;
      color: white;
      max-width: 70%;
    }
  }
  
  &.system-message {
    justify-content: flex-start;
    
    .message-content {
      background-color: white;
      color: #333;
      max-width: 70%;
    }
  }
  
  &.loading-message {
    .message-content {
      opacity: 0.7;
    }
  }
  
  &.error-message {
    .message-content {
      background-color: #ff3b30;
      color: white;
    }
  }
}

.message-content {
  padding: 20rpx 30rpx;
  border-radius: 20rpx;
  word-wrap: break-word;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.message-text {
  line-height: 1.4;
}

.message-status {
  margin-top: 10rpx;
  font-size: 24rpx;
  opacity: 0.8;
}

.loading-text {
  color: #999;
}

.error-text {
  color: #ff3b30;
}

.input-container {
  background-color: white;
  padding: 20rpx;
  border-top: 1rpx solid #e5e5e5;
}

.input-wrapper {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.message-input {
  flex: 1;
  height: 80rpx;
  padding: 0 20rpx;
  border: 1rpx solid #e5e5e5;
  border-radius: 40rpx;
  background-color: #f8f8f8;
  font-size: 28rpx;
}

.send-button {
  height: 80rpx;
  padding: 0 30rpx;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 40rpx;
  font-size: 28rpx;
  
  &:disabled {
    background-color: #ccc;
  }
}

.action-buttons {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
  background-color: white;
  border-top: 1rpx solid #e5e5e5;
}

.action-btn {
  flex: 1;
  height: 70rpx;
  background-color: #f8f8f8;
  color: #333;
  border: 1rpx solid #e5e5e5;
  border-radius: 10rpx;
  font-size: 26rpx;
}
</style>