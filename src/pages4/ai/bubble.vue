<template>
  <view class="bubble-demo">
    <view class="demo-section">
      <view class="section-title">基础用法</view>
      <zx-ai-bubble content="Hello! 这是一个基础的AI对话气泡。" />
      <zx-ai-bubble 
        content="这是用户发送的消息。" 
        placement="end"
        :avatar="{ text: 'U', bgColor: '#52c41a', size: '80rpx' }"
      />
    </view>

    <view class="demo-section">
      <view class="section-title">头像和位置</view>
      <zx-ai-bubble 
        content="我是AI助手，很高兴为您服务！" 
        :avatar="{ src: '/static/ai-avatar.png', size: '80rpx' }"
      />
      <zx-ai-bubble 
        content="谢谢你的帮助！" 
        placement="end"
        :avatar="{ text: '张', bgColor: '#f56a00', color: '#fff', size: '80rpx' }"
      />
      <zx-ai-bubble 
        content="我可以使用图标头像！" 
        :avatar="{ icon: 'home', bgColor: '#1890ff', size: '80rpx' }"
      />
      <zx-ai-bubble 
        content="方形头像也很酷！" 
        placement="end"
        :avatar="{ text: 'ME', shape: 'square', bgColor: '#52c41a', size: '80rpx' }"
      />
    </view>

    <view class="demo-section">
      <view class="section-title">加载状态</view>
      <zx-ai-bubble 
        :loading="loading"
        content="正在思考中..." 
        :avatar="{ text: 'AI', size: '80rpx' }"
      />
      <view class="demo-controls">
        <button @click="toggleLoading" class="demo-button">
          {{ loading ? '停止加载' : '开始加载' }}
        </button>
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">打字效果</view>
      <zx-ai-bubble 
        :content="typingText"
        :typing="{ step: 2, interval: 100, suffix: '✨' }"
        :avatar="{ text: 'AI', size: '80rpx' }"
        @typing-complete="onTypingComplete"
      />
      <view class="demo-controls">
        <button @click="startTyping" class="demo-button">开始打字</button>
        <button @click="extendText" class="demo-button">扩展文本</button>
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">头部和底部</view>
      <zx-ai-bubble 
        content="这条消息包含头部和底部信息。"
        header="AI助手 · 刚刚"
        footer="消息已送达"
        :avatar="{ text: 'AI', size: '80rpx' }"
      />
    </view>

    <view class="demo-section">
      <view class="section-title">不同变体</view>
      <zx-ai-bubble 
        content="填充样式（默认）"
        variant="filled"
        :avatar="{ text: 'AI', size: '80rpx' }"
      />
      <zx-ai-bubble 
        content="边框样式"
        variant="outlined"
        :avatar="{ text: 'AI', size: '80rpx' }"
      />
      <zx-ai-bubble 
        content="无边框样式"
        variant="borderless"
        :avatar="{ text: 'AI', size: '80rpx' }"
      />
      <zx-ai-bubble 
        content="阴影样式"
        variant="shadow"
        :avatar="{ text: 'AI', size: '80rpx' }"
      />
    </view>

    <view class="demo-section">
      <view class="section-title">不同形状</view>
      <zx-ai-bubble 
        content="圆角形状"
        shape="round"
        :avatar="{ text: 'AI', size: '80rpx' }"
      />
      <zx-ai-bubble 
        content="直角形状"
        shape="corner"
        :avatar="{ text: 'AI', size: '80rpx' }"
      />
    </view>

    <view class="demo-section">
      <view class="section-title">自定义渲染</view>
      <zx-ai-bubble 
        :content="markdownContent"
        :message-render="renderMarkdown"
        :avatar="{ text: 'AI', size: '80rpx' }"
      />
    </view>

    <view class="demo-section">
      <view class="section-title">插槽用法</view>
      <zx-ai-bubble 
        content="这是一个使用插槽的示例"
        header="自定义头部"
      >
        <template #avatar>
          <view class="custom-avatar">🤖</view>
        </template>
        <template #header>
          <view class="custom-header">
            <text class="header-name">智能助手</text>
            <text class="header-time">{{ currentTime }}</text>
          </view>
        </template>
        <template #footer="{ content }">
          <view class="custom-footer">
            <text class="footer-info">字数：{{ content.length }}</text>
            <text class="footer-status">已读</text>
          </view>
        </template>
      </zx-ai-bubble>
    </view>

    <view class="demo-section">
      <view class="section-title">对话列表</view>
      <view class="chat-list">
        <zx-ai-bubble 
          v-for="(message, index) in chatMessages"
          :key="index"
          :content="message.content"
          :placement="message.placement"
          :avatar="message.avatar"
          :typing="message.typing"
          :loading="message.loading"
          @typing-complete="() => onMessageTypingComplete(index)"
        />
      </view>
      <view class="demo-controls">
        <button @click="addMessage" class="demo-button">添加消息</button>
        <button @click="clearMessages" class="demo-button">清空消息</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import zxAiBubble from '@tanzhenxing/zx-ai-bubble/zx-ai-bubble.vue'

// 响应式数据
const loading = ref(false)
const typingText = ref('')
const currentTime = ref('')
const chatMessages = ref([])

// 计算属性
const markdownContent = computed(() => {
  return '**粗体文本** 和 *斜体文本*\n\n- 列表项 1\n- 列表项 2\n- 列表项 3'
})

// 方法
const toggleLoading = () => {
  loading.value = !loading.value
}

const startTyping = () => {
  typingText.value = 'Hello! 这是一个打字效果的演示。我会一个字一个字地显示出来，就像真人在打字一样。'
}

const extendText = () => {
  typingText.value += ' 这是扩展的文本内容，会继续打字显示。'
}

const onTypingComplete = () => {
  console.log('打字效果完成')
  uni.showToast({
    title: '打字完成',
    icon: 'success'
  })
}

const renderMarkdown = (content) => {
  // 简单的 Markdown 渲染示例
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>')
    .replace(/^- (.*)/gm, '• $1')
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString()
}

const addMessage = () => {
  const isUser = Math.random() > 0.5
  const messages = [
    '你好！有什么可以帮助你的吗？',
    '这是一条测试消息。',
    '我正在学习如何使用这个组件。',
    '感谢你的耐心指导！',
    '这个组件功能很强大呢。'
  ]
  
  const newMessage = {
    content: messages[Math.floor(Math.random() * messages.length)],
    placement: isUser ? 'end' : 'start',
    avatar: isUser 
      ? { text: 'U', backgroundColor: '#52c41a' }
      : { text: 'AI', backgroundColor: '#1890ff' },
    typing: !isUser ? { step: 1, interval: 50 } : false,
    loading: false
  }
  
  chatMessages.value.push(newMessage)
}

const clearMessages = () => {
  chatMessages.value = []
}

const onMessageTypingComplete = (index) => {
  console.log(`消息 ${index} 打字完成`)
}

// 生命周期
onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
  
  // 初始化一些消息
  chatMessages.value = [
    {
      content: '欢迎使用 zx-ai-bubble 组件！',
      placement: 'start',
      avatar: { text: 'AI', backgroundColor: '#1890ff' },
      typing: { step: 2, interval: 80 },
      loading: false
    },
    {
      content: '这个组件看起来很不错！',
      placement: 'end',
      avatar: { text: 'U', backgroundColor: '#52c41a' },
      typing: false,
      loading: false
    }
  ]
})
</script>

<style lang="scss" scoped>
.bubble-demo {
  padding: 32rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.demo-section {
  margin-bottom: 64rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #262626;
  margin-bottom: 32rpx;
  padding-bottom: 16rpx;
  border-bottom: 2rpx solid #f0f0f0;
}

.demo-controls {
  margin-top: 32rpx;
  display: flex;
  gap: 16rpx;
  flex-wrap: wrap;
}

.demo-button {
  padding: 16rpx 32rpx;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 8rpx;
  font-size: 28rpx;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #40a9ff;
  }
  
  &:active {
    background-color: #096dd9;
  }
}

.custom-avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
}

.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .header-name {
    font-weight: 600;
    color: #262626;
    font-size: 28rpx;
  }
  
  .header-time {
    font-size: 24rpx;
    color: #8c8c8c;
  }
}

.custom-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .footer-info {
    font-size: 24rpx;
    color: #8c8c8c;
  }
  
  .footer-status {
    font-size: 24rpx;
    color: #52c41a;
  }
}

.chat-list {
  max-height: 800rpx;
  overflow-y: auto;
  padding: 16rpx;
  background-color: #fafafa;
  border-radius: 12rpx;
  border: 2rpx solid #f0f0f0;
}

/* 滚动条样式 */
.chat-list::-webkit-scrollbar {
  width: 8rpx;
}

.chat-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4rpx;
}

.chat-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4rpx;
}

.chat-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>