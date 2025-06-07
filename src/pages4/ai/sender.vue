<template>
  <view class="sender-demo">
    <!-- 页面标题 -->
    <zx-navbar title="AI Sender 组件" :border="false" bg-color="#f8f9fa" />
    
    <!-- 内容区域 -->
    <view class="demo-content">
      <!-- 基础用法 -->
      <view class="demo-section">
        <view class="section-title">基础用法</view>
        <view class="section-desc">基本的消息输入框，支持双向绑定</view>
        <view class="demo-item">
          <zx-ai-sender
            v-model="basicValue"
            placeholder="请输入消息..."
            @submit="handleBasicSubmit"
            @change="handleBasicChange"
          />
          <view class="demo-result">
            <text>当前值: {{ basicValue }}</text>
          </view>
        </view>
      </view>

      <!-- 加载状态 -->
      <view class="demo-section">
        <view class="section-title">加载状态</view>
        <view class="section-desc">显示加载状态，模拟发送消息</view>
        <view class="demo-item">
          <zx-ai-sender
            v-model="loadingValue"
            :loading="isLoading"
            placeholder="输入消息后点击发送..."
            @submit="handleLoadingSubmit"
            @cancel="handleCancel"
          />
        </view>
      </view>

      <!-- 禁用状态 -->
      <view class="demo-section">
        <view class="section-title">禁用状态</view>
        <view class="section-desc">禁用输入框</view>
        <view class="demo-item">
          <zx-ai-sender
            v-model="disabledValue"
            :disabled="true"
            placeholder="此输入框已禁用"
          />
        </view>
      </view>

      <!-- 只读状态 -->
      <view class="demo-section">
        <view class="section-title">只读状态</view>
        <view class="section-desc">只读模式，不可编辑</view>
        <view class="demo-item">
          <zx-ai-sender
            v-model="readOnlyValue"
            :read-only="true"
            placeholder="只读模式"
          />
        </view>
      </view>

      <!-- 语音输入 -->
      <view class="demo-section">
        <view class="section-title">语音输入</view>
        <view class="section-desc">支持语音输入功能</view>
        <view class="demo-item">
          <zx-ai-sender
            v-model="speechValue"
            :allow-speech="true"
            placeholder="支持语音输入..."
            @submit="handleSpeechSubmit"
            @speech="handleSpeech"
          />
        </view>
      </view>

      <!-- 自定义前缀 -->
      <view class="demo-section">
        <view class="section-title">自定义前缀</view>
        <view class="section-desc">添加自定义前缀内容</view>
        <view class="demo-item">
          <zx-ai-sender
            v-model="prefixValue"
            placeholder="带前缀的输入框..."
            @submit="handlePrefixSubmit"
          >
            <template #prefix>
              <view class="custom-prefix">
                <text class="prefix-icon">🤖</text>
              </view>
            </template>
          </zx-ai-sender>
        </view>
      </view>

      <!-- 自定义头部 -->
      <view class="demo-section">
        <view class="section-title">自定义头部</view>
        <view class="section-desc">添加头部内容，如文件上传等</view>
        <view class="demo-item">
          <zx-ai-sender
            v-model="headerValue"
            placeholder="带头部的输入框..."
            @submit="handleHeaderSubmit"
          >
            <template #header>
              <view class="custom-header">
                <view class="header-item" @click="handleFileUpload">
                  <text class="header-icon">📎</text>
                  <text class="header-text">附件</text>
                </view>
                <view class="header-item" @click="handleImageUpload">
                  <text class="header-icon">🖼️</text>
                  <text class="header-text">图片</text>
                </view>
              </view>
            </template>
          </zx-ai-sender>
        </view>
      </view>

      <!-- 自定义底部 -->
      <view class="demo-section">
        <view class="section-title">自定义底部</view>
        <view class="section-desc">添加底部内容，如快捷回复等</view>
        <view class="demo-item">
          <zx-ai-sender
            v-model="footerValue"
            placeholder="带底部的输入框..."
            @submit="handleFooterSubmit"
          >
            <template #footer>
              <view class="custom-footer">
                <view class="quick-replies">
                  <view 
                    v-for="reply in quickReplies" 
                    :key="reply"
                    class="quick-reply"
                    @click="handleQuickReply(reply)"
                  >
                    {{ reply }}
                  </view>
                </view>
              </view>
            </template>
          </zx-ai-sender>
        </view>
      </view>

      <!-- 自定义操作按钮 -->
      <view class="demo-section">
        <view class="section-title">自定义操作按钮</view>
        <view class="section-desc">自定义操作按钮区域</view>
        <view class="demo-item">
          <zx-ai-sender
            v-model="actionsValue"
            placeholder="自定义操作按钮..."
            @submit="handleActionsSubmit"
          >
            <template #actions>
              <view class="custom-actions">
                <view class="action-btn" @click="handleCustomAction1">
                  <text class="action-icon">⭐</text>
                </view>
                <view class="action-btn" @click="handleCustomAction2">
                  <text class="action-icon">❤️</text>
                </view>
                <view class="action-btn send-btn" @click="handleActionsSubmit">
                  <text class="action-icon">➤</text>
                </view>
              </view>
            </template>
          </zx-ai-sender>
        </view>
      </view>

      <!-- 提交类型 -->
      <view class="demo-section">
        <view class="section-title">提交类型</view>
        <view class="section-desc">不同的提交触发方式</view>
        <view class="demo-item">
          <view class="submit-type-controls">
            <view 
              v-for="type in submitTypes" 
              :key="type.value"
              class="submit-type-item"
              :class="{ active: currentSubmitType === type.value }"
              @click="currentSubmitType = type.value"
            >
              {{ type.label }}
            </view>
          </view>
          <zx-ai-sender
            v-model="submitTypeValue"
            :submit-type="currentSubmitType"
            placeholder="根据选择的提交类型进行操作..."
            @submit="handleSubmitTypeSubmit"
          />
        </view>
      </view>

      <!-- 样式自定义 -->
      <view class="demo-section">
        <view class="section-title">样式自定义</view>
        <view class="section-desc">自定义组件样式</view>
        <view class="demo-item">
          <zx-ai-sender
            v-model="styledValue"
            :styles="customStyles"
            :class-names="customClassNames"
            placeholder="自定义样式的输入框..."
            @submit="handleStyledSubmit"
          />
        </view>
      </view>
    </view>

    <!-- 消息提示 -->
    <zx-toast ref="toast" />
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import zxToast from '@tanzhenxing/zx-toast/zx-toast.vue'
import zxAiSender from '@tanzhenxing/zx-ai-sender/zx-ai-sender.vue'
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue'


// 响应式数据
const basicValue = ref('')
const loadingValue = ref('')
const disabledValue = ref('这是禁用状态的文本')
const readOnlyValue = ref('这是只读状态的文本')
const speechValue = ref('')
const prefixValue = ref('')
const headerValue = ref('')
const footerValue = ref('')
const actionsValue = ref('')
const submitTypeValue = ref('')
const styledValue = ref('')

const isLoading = ref(false)
const toast = ref(null)

// 提交类型选项
const submitTypes = [
  { label: 'Enter 提交', value: 'enter' },
  { label: 'Shift+Enter 提交', value: 'shiftEnter' },
  { label: '禁用快捷键', value: false }
]
const currentSubmitType = ref('enter')

// 快捷回复
const quickReplies = ['你好', '谢谢', '再见', '没问题', '好的']

// 自定义样式
const customStyles = reactive({
  root: {
    borderRadius: '20rpx',
    border: '2rpx solid #ff6b6b'
  },
  input: {
    backgroundColor: '#fff5f5',
    borderRadius: '16rpx'
  },
  sendButton: {
    backgroundColor: '#ff6b6b'
  }
})

const customClassNames = reactive({
  root: 'custom-sender',
  input: 'custom-input'
})

// 事件处理函数
const showToast = (message, type = 'success') => {
  if (toast.value) {
    toast.value.show({
      message,
      type,
      duration: 2000
    })
  }
}

const handleBasicSubmit = (message) => {
  showToast(`基础提交: ${message}`)
  basicValue.value = ''
}

const handleBasicChange = (value) => {
  console.log('基础输入变化:', value)
}

const handleLoadingSubmit = (message) => {
  if (isLoading.value) return
  
  isLoading.value = true
  showToast('正在发送消息...', 'loading')
  
  // 模拟发送延迟
  setTimeout(() => {
    isLoading.value = false
    showToast(`消息发送成功: ${message}`)
    loadingValue.value = ''
  }, 3000)
}

const handleCancel = () => {
  isLoading.value = false
  showToast('已取消发送', 'warning')
}

const handleSpeechSubmit = (message) => {
  showToast(`语音提交: ${message}`)
  speechValue.value = ''
}

const handleSpeech = () => {
  showToast('开始语音输入...', 'info')
  // 这里可以集成语音识别功能
}

const handlePrefixSubmit = (message) => {
  showToast(`前缀提交: ${message}`)
  prefixValue.value = ''
}

const handleHeaderSubmit = (message) => {
  showToast(`头部提交: ${message}`)
  headerValue.value = ''
}

const handleFileUpload = () => {
  showToast('选择文件...', 'info')
  // 这里可以实现文件上传逻辑
}

const handleImageUpload = () => {
  showToast('选择图片...', 'info')
  // 这里可以实现图片上传逻辑
}

const handleFooterSubmit = (message) => {
  showToast(`底部提交: ${message}`)
  footerValue.value = ''
}

const handleQuickReply = (reply) => {
  footerValue.value = reply
  showToast(`选择快捷回复: ${reply}`, 'info')
}

const handleActionsSubmit = () => {
  if (actionsValue.value.trim()) {
    showToast(`自定义操作提交: ${actionsValue.value}`)
    actionsValue.value = ''
  }
}

const handleCustomAction1 = () => {
  showToast('点击了收藏按钮', 'info')
}

const handleCustomAction2 = () => {
  showToast('点击了点赞按钮', 'info')
}

const handleSubmitTypeSubmit = (message) => {
  showToast(`${currentSubmitType.value} 提交: ${message}`)
  submitTypeValue.value = ''
}

const handleStyledSubmit = (message) => {
  showToast(`样式自定义提交: ${message}`)
  styledValue.value = ''
}
</script>

<style lang="scss" scoped>
.sender-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.demo-content {
  padding: 32rpx;
}

.demo-section {
  margin-bottom: 64rpx;
  
  &:last-child {
    margin-bottom: 32rpx;
  }
}

.section-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #303133;
  margin-bottom: 16rpx;
}

.section-desc {
  font-size: 28rpx;
  color: #606266;
  margin-bottom: 32rpx;
  line-height: 1.5;
}

.demo-item {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.demo-result {
  margin-top: 24rpx;
  padding: 20rpx;
  background-color: #f5f7fa;
  border-radius: 12rpx;
  font-size: 26rpx;
  color: #606266;
}

// 自定义前缀样式
.custom-prefix {
  display: flex;
  align-items: center;
  padding: 0 16rpx;
}

.prefix-icon {
  font-size: 32rpx;
}

// 自定义头部样式
.custom-header {
  display: flex;
  gap: 24rpx;
  padding: 16rpx 0;
}

.header-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 16rpx 24rpx;
  background-color: #f0f0f0;
  border-radius: 20rpx;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #e0e0e0;
  }
}

.header-icon {
  font-size: 28rpx;
}

.header-text {
  font-size: 26rpx;
  color: #606266;
}

// 自定义底部样式
.custom-footer {
  padding: 16rpx 0;
}

.quick-replies {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.quick-reply {
  padding: 12rpx 20rpx;
  background-color: #e1f3d8;
  color: #67c23a;
  border-radius: 16rpx;
  font-size: 24rpx;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #d1e7c1;
    transform: translateY(-2rpx);
  }
}

// 自定义操作按钮样式
.custom-actions {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &.send-btn {
    background-color: #409eff;
    color: #ffffff;
  }
}

.action-icon {
  font-size: 32rpx;
}

// 提交类型控制
.submit-type-controls {
  display: flex;
  gap: 16rpx;
  margin-bottom: 24rpx;
}

.submit-type-item {
  padding: 16rpx 24rpx;
  background-color: #f0f0f0;
  border-radius: 20rpx;
  font-size: 26rpx;
  color: #606266;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  &.active {
    background-color: #409eff;
    color: #ffffff;
  }
}

// 自定义样式类
:deep(.custom-sender) {
  box-shadow: 0 8rpx 24rpx rgba(255, 107, 107, 0.2);
}

:deep(.custom-input) {
  font-weight: 500;
}
</style>