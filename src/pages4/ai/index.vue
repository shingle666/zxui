<template>
  <view class="ai-chat-app">
    <!-- 导航栏 -->
    <zx-navbar title="AI智能聊天" :border="false" bgColor="#6366f1" color="#ffffff" :left-arrow="false">
      <template #right>
        <view class="navbar-actions">
          <view class="action-item" @click="showNetworkStatus">
            <zx-icon :name="networkStatus ? 'wifi' : 'wifi-off'" size="40rpx"
              :color="networkStatus ? '#ffffff' : '#ff6b6b'" />
          </view>
          <view class="action-item" @click="showSettings = true">
            <zx-icon name="setting" size="40rpx" color="#ffffff" />
          </view>
        </view>
      </template>
    </zx-navbar>

    <!-- 网络状态提示 -->
    <zx-no-network v-if="!networkStatus"></zx-no-network>

    <!-- 聊天消息列表 -->
    <scroll-view class="chat-container" scroll-y :scroll-top="scrollTop" scroll-with-animation @scroll="onScroll"
      :refresher-enabled="true" :refresher-triggered="isRefreshing" @refresherrefresh="onRefresh">
      <view class="message-list">
        <!-- 加载更多历史消息 -->
        <zx-loading v-if="hasMoreHistory && isLoadingHistory" text="加载中..." />
        <view v-else-if="hasMoreHistory" class="load-more-history" @click="loadMoreHistory">
          <text class="load-more-text">加载更多历史消息</text>
        </view>

        <!-- 欢迎消息 -->
        <zx-ai-welcome v-if="messages.length === 0 && !isLoadingHistory" />

        <!-- 聊天消息 -->
        <view v-for="(message, index) in messages" :key="message.id || index" class="message-item" :class="{
          'user-message': message.role === 'user',
          'assistant-message': message.role === 'assistant',
          'system-message': message.role === 'system'
        }" @longpress="showMessageActions(message, index)">
          <view class="message-avatar">
            <image v-if="message.role === 'user'" class="avatar" :src="userAvatar || '/static/user-avatar.png'"
              mode="aspectFill" @error="onAvatarError" />
            <image v-else class="avatar" src="https://zxui.org/logo.png" mode="aspectFill" />
          </view>

          <view class="message-content">
            <view class="message-bubble" :class="{ 'has-image': message.images && message.images.length }">
              <!-- 图片消息 -->
              <view v-if="message.images && message.images.length" class="message-images">
                <image v-for="(img, imgIndex) in message.images" :key="imgIndex" class="message-image" :src="img"
                  mode="aspectFill" @click="previewImage(img, message.images)" />
              </view>

              <!-- 文本消息 -->
              <view v-if="message.content" class="message-text-wrapper">
                <text class="message-text" :selectable="true">{{ message.content }}</text>

                <!-- 消息操作按钮 -->
                <view v-if="message.role === 'assistant' && message.status === 'sent'" class="message-actions">
                  <view class="action-btn" @click="copyMessage(message.content)">
                    <zx-icon name="copy" size="14" color="#6b7280" />
                  </view>
                  <view class="action-btn" @click="speakMessage(message.content)">
                    <zx-icon :name="isSpeaking ? 'volume-off' : 'volume'" size="14" color="#6b7280" />
                  </view>
                  <view class="action-btn" @click="likeMessage(message)">
                    <zx-icon :name="message.liked ? 'heart-fill' : 'heart'" size="14"
                      :color="message.liked ? '#ff6b6b' : '#6b7280'" />
                  </view>
                </view>
              </view>

              <!-- 加载状态 -->
              <view v-if="message.status === 'loading'" class="loading-indicator">
                <zx-loading size="16" color="#999" text="加载中" />
              </view>

              <!-- 错误状态 -->
              <view v-if="message.status === 'error'" class="error-indicator">
                <zx-icon name="warning" size="16" color="#ef4444" />
                <text class="error-text">{{ message.error || '发送失败' }}</text>
                <text class="retry-btn" @click="retryMessage(message)">重试</text>
              </view>
            </view>

            <view class="message-footer">
              <view class="message-time">
                <text>{{ formatTime(message.timestamp) }}</text>
              </view>
              <view v-if="message.role === 'user' && message.status" class="message-status">
                <zx-icon v-if="message.status === 'sending'" name="clock" size="12" color="#9ca3af" />
                <zx-icon v-else-if="message.status === 'sent'" name="check" size="12" color="#10b981" />
                <zx-icon v-else-if="message.status === 'error'" name="close" size="12" color="#ef4444" />
              </view>
            </view>
          </view>
        </view>

        <!-- 正在输入指示器 -->
        <view v-if="isTyping" class="typing-indicator">
          <view class="message-avatar">
            <image class="avatar" src="https://zxui.org/logo.png" mode="aspectFill" />
          </view>
          <view class="typing-content">
            <view class="typing-dots">
              <view class="dot"></view>
              <view class="dot"></view>
              <view class="dot"></view>
            </view>
            <text class="typing-text">AI正在思考...</text>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 输入区域 -->
    <view class="input-container" :class="{ 'expanded': showInputExtensions }">
      <!-- 快捷操作按钮 -->
      <view v-if="showQuickActions" class="quick-actions">
        <scroll-view class="quick-actions-scroll" scroll-x>
          <view class="quick-actions-list">
            <view v-for="action in quickActions" :key="action.id" class="quick-action-item"
              @click="sendQuickMessage(action.text)">
              <zx-icon :name="action.icon" size="16" color="#6366f1" />
              <text class="action-text">{{ action.text }}</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 图片预览 -->
      <view v-if="selectedImages.length" class="image-preview">
        <scroll-view class="image-preview-scroll" scroll-x>
          <view class="image-preview-list">
            <view v-for="(img, index) in selectedImages" :key="index" class="preview-item">
              <image class="preview-image" :src="img" mode="aspectFill" />
              <view class="remove-image" @click="removeImage(index)">
                <zx-icon name="close" size="12" color="#fff" />
              </view>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- AI发送器组件 -->
      <zx-ai-sender :modelValue="inputText" :placeholder="inputPlaceholder" :maxlength="maxInputLength" :loading="isLoading"
        @submit="sendMessage" @change="onInputChange" @focus="onInputFocus"
        @blur="onInputBlur"></zx-ai-sender>

      <!-- 扩展功能面板 -->
      <view v-if="showInputExtensions" class="input-extensions">
        <view class="extension-grid">
          <view class="extension-item" @click="chooseImage">
            <view class="extension-icon">
              <zx-icon name="image" size="24" color="#6366f1" />
            </view>
            <text class="extension-text">图片</text>
          </view>
          <view class="extension-item" @click="chooseFile">
            <view class="extension-icon">
              <zx-icon name="folder" size="24" color="#10b981" />
            </view>
            <text class="extension-text">文件</text>
          </view>
          <view class="extension-item" @click="openCamera">
            <view class="extension-icon">
              <zx-icon name="camera" size="24" color="#f59e0b" />
            </view>
            <text class="extension-text">拍照</text>
          </view>
          <view class="extension-item" @click="showEmojiPanel">
            <view class="extension-icon">
              <zx-icon name="emoji" size="24" color="#ef4444" />
            </view>
            <text class="extension-text">表情</text>
          </view>
          <view class="extension-item" @click="clearChat">
            <view class="extension-icon">
              <zx-icon name="delete" size="24" color="#6b7280" />
            </view>
            <text class="extension-text">清空</text>
          </view>
          <view class="extension-item" @click="exportChat">
            <view class="extension-icon">
              <zx-icon name="download" size="24" color="#8b5cf6" />
            </view>
            <text class="extension-text">导出</text>
          </view>
        </view>
      </view>

      <!-- 语音录制提示 -->
      <view v-if="isRecording" class="recording-overlay">
        <view class="recording-content">
          <view class="recording-animation">
            <view class="wave"></view>
            <view class="wave"></view>
            <view class="wave"></view>
          </view>
          <text class="recording-text">正在录音...</text>
          <text class="recording-tip">松开发送，上滑取消</text>
        </view>
      </view>
    </view>

    <!-- 设置面板 -->
    <zx-popup :show="showSettings" position="bottom" :round="true">
      <view class="settings-panel">
        <view class="settings-header">
          <text class="settings-title">聊天设置</text>
          <view class="close-btn" @click="showSettings = false">
            <zx-icon name="close" size="20" color="#999" />
          </view>
        </view>

        <view class="settings-content">
          <!-- 模型选择 -->
          <view class="setting-item">
            <text class="setting-label">AI模型</text>
            <zx-select v-model="currentModel" :options="modelOptions" @change="onModelChange" />
          </view>

          <!-- 温度设置 -->
          <view class="setting-item">
            <text class="setting-label">创造性 ({{ temperature }})</text>
            <zx-slider v-model="temperature" :min="0" :max="2" :step="0.1" @change="onTemperatureChange" />
          </view>

          <!-- 最大令牌数 -->
          <view class="setting-item">
            <text class="setting-label">最大回复长度</text>
            <zx-input-number v-model="maxTokens" :min="100" :max="4000" :step="100" @change="onMaxTokensChange" />
          </view>

          <!-- 流式输出 -->
          <view class="setting-item">
            <text class="setting-label">流式输出</text>
            <zx-switch v-model="streamMode" @change="onStreamModeChange" />
          </view>
        </view>
      </view>
    </zx-popup>

    <!-- 浮动操作按钮 -->
    <!-- <zx-fab :actions="fabActions" @click="onFabClick" position="bottom-right" :offset="{ bottom: 100, right: 20 }" /> -->
  </view>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, watch } from 'vue'
import { onLoad, onShow, onHide } from '@dcloudio/uni-app'
import aiAPI from '@/utils/ai-api.js'
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue'
import zxNoNetwork from '@tanzhenxing/zx-no-network/zx-no-network.vue'
import zxLoading from '@tanzhenxing/zx-loading/zx-loading.vue'
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'
import zxAiSender from '@tanzhenxing/zx-ai-sender/zx-ai-sender.vue'
import zxAiWelcome from '@tanzhenxing/zx-ai-welcome/zx-ai-welcome.vue'
import zxPopup from '@tanzhenxing/zx-popup/zx-popup.vue'
import zxSelect from '@tanzhenxing/zx-select/zx-select.vue'
import zxSlider from '@tanzhenxing/zx-slider/zx-slider.vue'
import zxInputNumber from '@tanzhenxing/zx-input-number/zx-input-number.vue'
import zxSwitch from '@tanzhenxing/zx-switch/zx-switch.vue'

// 页面标题
uni.setNavigationBarTitle({
  title: 'AI智能聊天'
})

// 响应式数据
const messages = ref([])
const inputText = ref('')
const isLoading = ref(false)
const isTyping = ref(false)
const scrollTop = ref(0)
const showSettings = ref(false)
const showQuickActions = ref(false)
const currentWorkspace = ref('default')
const networkStatus = ref(true)
const isRefreshing = ref(false)
const hasMoreHistory = ref(true)
const isLoadingHistory = ref(false)
const userAvatar = ref('')
const showInputExtensions = ref(false)
const selectedImages = ref([])
const isRecording = ref(false)
const maxInputLength = ref(2000)
const inputPlaceholder = ref('请输入您的问题...')
const isSpeaking = ref(false)
const recordingStartTime = ref(0)

// 聊天设置
const currentModel = ref('deepseek')
const temperature = ref(0.7)
const maxTokens = ref(2000)
const streamMode = ref(false)

// 快捷操作
const quickActions = ref([
  { id: 1, text: '解释这段代码', icon: 'code' },
  { id: 2, text: '优化这个方案', icon: 'bulb' },
  { id: 3, text: '写一个总结', icon: 'file-text' },
  { id: 4, text: '翻译成英文', icon: 'translate' },
  { id: 5, text: '检查语法错误', icon: 'check-circle' },
  { id: 6, text: '生成思维导图', icon: 'share' },
  { id: 7, text: '创意写作', icon: 'edit' },
  { id: 8, text: '数据分析', icon: 'bar-chart' }
])

// 模型选项
const modelOptions = ref([
  { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo' },
  { label: 'GPT-4', value: 'gpt-4' },
  { label: 'Claude', value: 'claude-3' },
  { label: '通义千问', value: 'qwen-turbo' }
])

// 浮动按钮配置
const fabActions = ref([
  { icon: 'settings', text: '设置', action: 'settings' },
  { icon: 'refresh', text: '新对话', action: 'new' },
  { icon: 'history', text: '历史', action: 'history' }
])

// 计算属性
const canSend = computed(() => {
  return (inputText.value.trim() || selectedImages.value.length > 0) && !isLoading.value
})

const conversationHistory = computed(() => {
  return messages.value
    .filter(msg => msg.role !== 'system' && msg.status !== 'error')
    .map(msg => ({
      role: msg.role,
      content: msg.content
    }))
})

// 生成消息ID
const generateMessageId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9)
}

// 格式化时间
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date

  if (diff < 60000) { // 1分钟内
    return '刚刚'
  } else if (diff < 3600000) { // 1小时内
    return `${Math.floor(diff / 60000)}分钟前`
  } else if (date.toDateString() === now.toDateString()) { // 今天
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  } else {
    return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
  }
}

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick()
  scrollTop.value = 999999
}

// 发送消息
const sendMessage = async () => {
  if (!canSend.value) return

  const messageText = inputText.value.trim()
  const hasImages = selectedImages.value.length > 0

  if (!messageText && !hasImages) return

  // 构建消息内容
  let messageContent = messageText
  const messageImages = [...selectedImages.value]
console.log('messageContent:',messageContent)

  // 添加用户消息
  const userMessage = {
    id: generateMessageId(),
    role: 'user',
    content: messageContent,
    images: messageImages,
    timestamp: Date.now(),
    status: 'sent'
  }

  messages.value.push(userMessage)
  const currentInput = inputText.value
  inputText.value = ''
  selectedImages.value = []
  showInputExtensions.value = false
  showQuickActions.value = false

  await scrollToBottom()

  // 创建助手回复消息
  const assistantMessage = {
    id: generateMessageId(),
    role: 'assistant',
    content: '',
    timestamp: Date.now(),
    status: 'loading'
  }

  messages.value.push(assistantMessage)
  isLoading.value = true
  isTyping.value = true

  await scrollToBottom()

  try {
    if (streamMode.value) {
      // 流式聊天
      await aiAPI.workspaces.streamChat(currentWorkspace.value, {
        message: messageContent,
        model: currentModel.value,
        temperature: temperature.value,
        max_tokens: maxTokens.value
      }, {
        onUpdate: (chunk) => {
          assistantMessage.content += chunk
          assistantMessage.status = 'streaming'
          scrollToBottom()
        },
        onSuccess: (result) => {
          assistantMessage.status = 'sent'
          isLoading.value = false
          isTyping.value = false
          scrollToBottom()
        },
        onError: (error) => {
          console.error('流式聊天错误:', error)
          assistantMessage.status = 'error'
          assistantMessage.content = '抱歉，发生了错误，请稍后重试。'
          isLoading.value = false
          isTyping.value = false

          uni.showToast({
            title: '发送失败',
            icon: 'error'
          })
        }
      })
    } else {
      // 普通聊天
      const response = await aiAPI.workspaces.chat(currentWorkspace.value, {
        message: messageContent,
        model: currentModel.value,
        temperature: temperature.value,
        max_tokens: maxTokens.value
      })

      assistantMessage.content = response.message || response.content || '抱歉，我无法理解您的问题。'
      assistantMessage.status = 'sent'
      isLoading.value = false
      isTyping.value = false

      await scrollToBottom()
    }
  } catch (error) {
    console.error('发送消息错误:', error)
    assistantMessage.status = 'error'
    assistantMessage.content = '抱歉，发生了错误，请稍后重试。'
    isLoading.value = false
    isTyping.value = false

    uni.showToast({
      title: '发送失败',
      icon: 'error'
    })
  }
}

// 发送快捷消息
const sendQuickMessage = (text) => {
  inputText.value = text
  showQuickActions.value = false
  sendMessage()
}

// 重试消息
const retryMessage = (message) => {
  if (message.role === 'user') {
    inputText.value = message.content
    // 移除失败的消息
    const index = messages.value.findIndex(msg => msg.id === message.id)
    if (index > -1) {
      messages.value.splice(index, 1)
    }
  }
}

// 清空聊天
const clearChat = () => {
  uni.showModal({
    title: '确认清空',
    content: '确定要清空所有聊天记录吗？',
    success: (res) => {
      if (res.confirm) {
        messages.value = []
        uni.showToast({
          title: '已清空',
          icon: 'success'
        })
      }
    }
  })
}

// 切换快捷操作显示
const toggleQuickActions = () => {
  showQuickActions.value = !showQuickActions.value
  if (showQuickActions.value) {
    showInputExtensions.value = false
  }
}

// 切换扩展功能面板
const toggleInputExtensions = () => {
  showInputExtensions.value = !showInputExtensions.value
  if (showInputExtensions.value) {
    showQuickActions.value = false
  }
}

// 选择图片
const chooseImage = () => {
  uni.chooseImage({
    count: 9 - selectedImages.value.length,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      selectedImages.value.push(...res.tempFilePaths)
      showInputExtensions.value = false
    },
    fail: (err) => {
      console.error('选择图片失败:', err)
      uni.showToast({
        title: '选择图片失败',
        icon: 'none'
      })
    }
  })
}

// 选择文件
const chooseFile = () => {
  // #ifdef H5
  uni.showToast({
    title: 'H5暂不支持文件选择',
    icon: 'none'
  })
  // #endif
  // #ifndef H5
  uni.chooseMessageFile({
    count: 1,
    type: 'file',
    success: (res) => {
      console.log('选择文件成功:', res)
      showInputExtensions.value = false
    },
    fail: (err) => {
      console.error('选择文件失败:', err)
    }
  })
  // #endif
}

// 打开相机
const openCamera = () => {
  uni.chooseImage({
    count: 1,
    sourceType: ['camera'],
    success: (res) => {
      selectedImages.value.push(...res.tempFilePaths)
      showInputExtensions.value = false
    },
    fail: (err) => {
      console.error('拍照失败:', err)
    }
  })
}

// 显示表情面板
const showEmojiPanel = () => {
  uni.showToast({
    title: '表情功能开发中',
    icon: 'none'
  })
}

// 导出聊天记录
const exportChat = () => {
  if (messages.value.length === 0) {
    uni.showToast({
      title: '暂无聊天记录',
      icon: 'none'
    })
    return
  }

  const chatContent = messages.value.map(msg => {
    const time = formatTime(msg.timestamp)
    const role = msg.role === 'user' ? '用户' : 'AI助手'
    return `[${time}] ${role}: ${msg.content}`
  }).join('\n\n')

  // #ifdef H5
  const blob = new Blob([chatContent], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `AI聊天记录_${new Date().toISOString().slice(0, 10)}.txt`
  a.click()
  URL.revokeObjectURL(url)
  // #endif

  // #ifndef H5
  uni.showToast({
    title: '导出功能开发中',
    icon: 'none'
  })
  // #endif

  showInputExtensions.value = false
}

// 移除图片
const removeImage = (index) => {
  selectedImages.value.splice(index, 1)
}

// 开始录音
const startRecording = () => {
  isRecording.value = true
  recordingStartTime.value = Date.now()

  // #ifndef H5
  const recorderManager = uni.getRecorderManager()
  recorderManager.start({
    duration: 60000,
    sampleRate: 16000,
    numberOfChannels: 1,
    encodeBitRate: 48000,
    format: 'mp3'
  })
  // #endif
}

// 停止录音
const stopRecording = () => {
  if (!isRecording.value) return

  const duration = Date.now() - recordingStartTime.value
  isRecording.value = false

  if (duration < 1000) {
    uni.showToast({
      title: '录音时间太短',
      icon: 'none'
    })
    return
  }

  // #ifndef H5
  const recorderManager = uni.getRecorderManager()
  recorderManager.stop()
  // #endif

  // #ifdef H5
  uni.showToast({
    title: 'H5暂不支持语音输入',
    icon: 'none'
  })
  // #endif
}

// 取消录音
const cancelRecording = () => {
  isRecording.value = false

  // #ifndef H5
  const recorderManager = uni.getRecorderManager()
  recorderManager.stop()
  // #endif
}

// 下拉刷新
const onRefresh = async () => {
  isRefreshing.value = true
  try {
    // 模拟刷新延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    // 这里可以添加刷新逻辑，比如重新加载最新消息
  } catch (error) {
    console.error('刷新失败:', error)
  } finally {
    isRefreshing.value = false
  }
}

// 显示网络状态
const showNetworkStatus = () => {
  const status = networkStatus.value ? '网络连接正常' : '网络连接异常'
  uni.showToast({
    title: status,
    icon: networkStatus.value ? 'success' : 'error'
  })
}

// 加载更多历史消息
const loadMoreHistory = async () => {
  if (isLoadingHistory.value || !hasMoreHistory.value) return

  isLoadingHistory.value = true
  try {
    // 模拟加载历史消息
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 这里可以添加实际的历史消息加载逻辑
    // 暂时模拟没有更多历史消息
    hasMoreHistory.value = false

    uni.showToast({
      title: '暂无更多历史消息',
      icon: 'none'
    })
  } catch (error) {
    console.error('加载历史消息失败:', error)
    uni.showToast({
      title: '加载失败',
      icon: 'error'
    })
  } finally {
    isLoadingHistory.value = false
  }
}

// 输入事件
const onInputChange = (value, e) => {
  // zx-ai-sender组件的change事件直接传递值作为第一个参数
  inputText.value = value
}

const onInputFocus = () => {
  showQuickActions.value = false
}

const onInputBlur = () => {
  // 延迟隐藏，避免点击快捷操作时立即隐藏
  setTimeout(() => {
    // showQuickActions.value = false
  }, 200)
}

// 滚动事件
const onScroll = (e) => {
  // 可以在这里处理滚动相关逻辑
}

// 设置相关事件
const onModelChange = (value) => {
  currentModel.value = value
}

const onTemperatureChange = (value) => {
  temperature.value = value
}

const onMaxTokensChange = (value) => {
  maxTokens.value = value
}

const onStreamModeChange = (value) => {
  streamMode.value = value
}

// 浮动按钮点击
const onFabClick = (action) => {
  switch (action) {
    case 'settings':
      showSettings.value = true
      break
    case 'new':
      clearChat()
      break
    case 'history':
      // 跳转到历史记录页面
      uni.navigateTo({
        url: '/pages4/ai/conversations'
      })
      break
  }
}

// 初始化工作空间
const initWorkspace = async () => {
  try {
    // 获取或创建默认工作空间
    const workspaces = await aiAPI.workspaces.getWorkspaces();

    // 检查是否有工作空间
    if (workspaces && workspaces.workspaces && workspaces.workspaces.length > 0) {
      currentWorkspace.value = workspaces.workspaces[0].slug || 'default'
      console.log('slug:', currentWorkspace.value)
    } else {
      // 创建默认工作空间
      const newWorkspace = await aiAPI.workspaces.createWorkspace({
        name: '默认聊天空间',
        description: 'AI智能聊天默认工作空间'
      })
      currentWorkspace.value = newWorkspace.slug || 'default'
    }
  } catch (error) {
    console.error('初始化工作空间失败:', error)
    currentWorkspace.value = 'default'
  }
}

const onAvatarError = (e) => {
  console.log('头像加载失败:', e)
}

// 页面生命周期
onLoad(async (options) => {
  // 初始化工作空间
  await initWorkspace();

  // 添加欢迎消息
  setTimeout(() => {
    if (messages.value.length === 0) {
      messages.value.push({
        id: generateMessageId(),
        role: 'assistant',
        content: '您好！我是您的AI助手，有什么可以帮助您的吗？',
        timestamp: Date.now(),
        status: 'sent'
      })
    }
  }, 1000)
})
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";
</style>