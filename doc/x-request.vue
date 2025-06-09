<template>
  <view class="x-request-demo">
    <zx-navbar title="AI 智能对话" back>
      <template #right>
        <zx-icon name="setting" @click="showConfigModal = true" />
      </template>
    </zx-navbar>

    <view class="demo-container">
      <!-- 快速配置卡片 -->
      <view class="quick-config-card">
        <view class="config-header">
          <zx-text text="当前配置" type="primary" size="large" />
          <zx-tag :type="isConfigValid ? 'success' : 'warning'">
            {{ isConfigValid ? '已配置' : '未配置' }}
          </zx-tag>
        </view>
        <view class="config-info">
          <view class="config-item">
            <zx-text text="模型:" size="small" type="info" />
            <zx-text :text="config.model || '未设置'" size="small" />
          </view>
          <view class="config-item">
            <zx-text text="接口:" size="small" type="info" />
            <zx-text :text="getShortUrl(config.baseURL)" size="small" />
          </view>
        </view>
        <zx-button size="small" type="primary" plain @click="showConfigModal = true">
          配置设置
        </zx-button>
      </view>

      <!-- 配置弹窗 -->
      <zx-popup v-model="showConfigModal" position="bottom" :safe-area-inset-bottom="true" round>
        <view class="config-modal">
          <view class="modal-header">
            <zx-text text="配置设置" type="primary" size="large" />
            <zx-icon name="close" @click="showConfigModal = false" />
          </view>

          <view class="config-form">
            <zx-cell-group>
              <zx-cell title="预设配置">
                <zx-select v-model="selectedPreset" :options="presetOptions" placeholder="选择预设配置"
                  @change="applyPreset" />
              </zx-cell>
              <zx-cell title="API 地址">
                <zx-input v-model="config.baseURL" placeholder="请输入 API 地址" :clearable="true" />
              </zx-cell>
              <zx-cell title="模型名称">
                <zx-input v-model="config.model" placeholder="如: deepseek-chat" :clearable="true" />
              </zx-cell>
              <zx-cell title="API Key">
                <zx-input v-model="config.apiKey" placeholder="请输入 API Key" type="password" :clearable="true" />
              </zx-cell>
              <zx-cell title="启用流式响应">
                <zx-switch v-model="config.stream" />
              </zx-cell>
              <zx-cell title="最大令牌数">
                <zx-input-number v-model="config.maxTokens" :min="100" :max="4000" :step="100" />
              </zx-cell>
              <zx-cell title="温度参数">
                <zx-slider v-model="config.temperature" :min="0" :max="2" :step="0.1" show-value />
              </zx-cell>
            </zx-cell-group>

            <view class="config-actions">
              <zx-button type="default" @click="resetConfig">
                重置
              </zx-button>
              <zx-button type="primary" @click="saveConfig">
                保存配置
              </zx-button>
            </view>
          </view>
        </view>
      </zx-popup>

      <!-- 对话历史 -->
      <view v-if="chatHistory.length" class="chat-history">
        <view class="history-header">
          <zx-text text="对话历史" type="primary" size="large" />
          <zx-button size="mini" type="default" @click="clearHistory">
            清空
          </zx-button>
        </view>

        <view class="chat-messages">
          <view v-for="(message, index) in chatHistory" :key="index" class="message-item" :class="message.role">
            <view class="message-avatar">
              <zx-avatar :src="message.role === 'user' ? '/static/user-avatar.png' : '/static/ai-avatar.png'"
                :text="message.role === 'user' ? '我' : 'AI'" size="small" />
            </view>
            <view class="message-content">
              <view class="message-text">{{ message.content }}</view>
              <view class="message-time">{{ formatTime(message.timestamp) }}</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 快捷回复 -->
      <view v-if="quickReplies.length && !isLoading" class="quick-replies">
        <zx-text text="快捷回复" type="info" size="small" />
        <view class="reply-tags">
          <zx-tag v-for="(reply, index) in quickReplies" :key="index" type="primary" plain
            @click="selectQuickReply(reply)">
            {{ reply }}
          </zx-tag>
        </view>
      </view>

      <!-- 消息输入 -->
      <view class="message-input-section">
        <view class="input-container">
          <zx-textarea v-model="messageInput" placeholder="请输入您的消息..." :maxlength="2000" :show-word-limit="true"
            :auto-height="true" :min-height="80" :max-height="200" @focus="onInputFocus" @blur="onInputBlur" />

          <view class="input-actions">
            <zx-button v-if="messageInput.trim()" size="mini" type="default" @click="clearInput">
              清空
            </zx-button>
            <zx-button size="mini" type="primary" plain @click="showTemplates = true">
              模板
            </zx-button>
          </view>
        </view>

        <view class="send-container">
          <zx-button type="primary" :loading="isLoading" :disabled="!messageInput.trim() || !isConfigValid"
            @click="sendMessage" block>
            {{ isLoading ? '发送中...' : '发送消息' }}
          </zx-button>

          <zx-button v-if="isLoading" type="default" @click="cancelRequest" block style="margin-top: 10px;">
            取消请求
          </zx-button>
        </view>
      </view>

      <!-- 消息模板弹窗 -->
      <zx-popup v-model="showTemplates" position="bottom" :safe-area-inset-bottom="true" round>
        <view class="templates-modal">
          <view class="modal-header">
            <zx-text text="消息模板" type="primary" size="large" />
            <zx-icon name="close" @click="showTemplates = false" />
          </view>

          <view class="templates-list">
            <view v-for="(template, index) in messageTemplates" :key="index" class="template-item"
              @click="selectTemplate(template)">
              <zx-text :text="template.title" type="primary" />
              <zx-text :text="template.content" type="info" size="small" />
            </view>
          </view>
        </view>
      </zx-popup>

      <!-- 实时响应显示 -->
      <view v-if="isLoading || streamText" class="live-response">
        <view class="response-header">
          <zx-text text="AI 回复" type="primary" size="large" />
          <view class="status-indicators">
            <zx-tag v-if="isLoading" type="warning" size="small">
              <zx-loading-icon size="12" />
              思考中
            </zx-tag>
            <zx-tag v-if="chunkCount > 0" type="info" size="small">
              {{ chunkCount }} 块
            </zx-tag>
          </view>
        </view>

        <view class="ai-response-card">
          <view class="response-content">
            <view v-if="streamText" class="stream-text">
              {{ streamText }}
              <view v-if="isLoading" class="typing-indicator">
                <view class="dot"></view>
                <view class="dot"></view>
                <view class="dot"></view>
              </view>
            </view>
            <view v-else-if="isLoading" class="loading-placeholder">
              <zx-skeleton :loading="true" :rows="3" />
            </view>
          </view>

          <view v-if="streamText && !isLoading" class="response-actions">
            <zx-button size="mini" type="default" @click="copyText(streamText)">
              复制
            </zx-button>
            <zx-button size="mini" type="primary" plain @click="regenerateResponse">
              重新生成
            </zx-button>
          </view>
        </view>
      </view>

      <!-- 错误提示 -->
      <view v-if="hasError" class="error-card">
        <view class="error-header">
          <zx-icon name="warning" color="#ff4757" />
          <zx-text text="请求失败" type="danger" />
        </view>
        <view class="error-content">
          <zx-text :text="error?.message || '未知错误'" type="danger" size="small" />
        </view>
        <view class="error-actions">
          <zx-button size="mini" type="primary" @click="retryRequest">
            重试
          </zx-button>
        </view>
      </view>

      <!-- 空状态 -->
      <view v-if="!chatHistory.length && !isLoading && !hasError" class="welcome-card">
        <view class="welcome-content">
          <zx-icon name="chat" size="48" color="#3c9cff" />
          <zx-text text="开始对话" type="primary" size="large" />
          <zx-text text="输入消息开始与 AI 对话" type="info" size="small" />
        </view>
      </view>

      <!-- 数据块列表 -->
      <zx-section v-if="chunks.length" title="数据块列表" padding>
        <view class="chunks-list">
          <view v-for="(chunk, index) in chunks" :key="index" class="chunk-item">
            <view class="chunk-header">
              <zx-text :text="`块 ${index + 1}`" type="primary" />
              <zx-text :text="formatTime(new Date())" size="small" type="info" />
            </view>
            <view class="chunk-content">
              <pre>{{ JSON.stringify(chunk, null, 2) }}</pre>
            </view>
          </view>
        </view>
      </zx-section>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { useXRequest } from '@/utils/x-request.js'
import { formatTime } from '@/utils/index.js'
import zxAvatar from '@tanzhenxing/zx-avatar/zx-avatar.vue'
import zxText from '@tanzhenxing/zx-text/zx-text.vue'
import zxTextarea from '@tanzhenxing/zx-textarea/zx-textarea.vue'
import zxButton from '@tanzhenxing/zx-button/zx-button.vue'
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'
import zxLoadingIcon from '@tanzhenxing/zx-loading-icon/zx-loading-icon.vue'
import zxPopup from '@tanzhenxing/zx-popup/zx-popup.vue'
import zxCell from '@tanzhenxing/zx-cell/zx-cell.vue'
import zxCellGroup from '@tanzhenxing/zx-cell-group/zx-cell-group.vue'
import zxSelect from '@tanzhenxing/zx-select/zx-select.vue'
import zxSwitch from '@tanzhenxing/zx-switch/zx-switch.vue'
import zxSlider from '@tanzhenxing/zx-slider/zx-slider.vue'
import zxInput from '@tanzhenxing/zx-input/zx-input.vue'
import zxInputNumber from '@tanzhenxing/zx-input-number/zx-input-number.vue'
import zxTag from '@tanzhenxing/zx-tag/zx-tag.vue'
import zxSkeleton from '@tanzhenxing/zx-skeleton/zx-skeleton.vue'
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue'
import zxSection from '@tanzhenxing/zx-section/zx-section.vue'

// 使用 Vuex store
const store = useStore()

// 配置 - 从 store 获取
const config = computed({
  get: () => store.getters.aiConfig,
  set: (value) => store.dispatch('updateAiConfig', value)
})

// UI状态
const showConfigModal = ref(false)
const showTemplates = ref(false)
const selectedPreset = ref('')

// 消息输入
const messageInput = ref('')
const lastMessage = ref('')

// 流式文本累积
const streamText = ref('')

// 对话历史
const chatHistory = ref([])

// 预设配置选项
const presetOptions = ref([
  {
    name: 'GPT-4',
    value: 'gpt-4',
    config: {
      baseURL: 'https://api.openai.com/v1',
      model: 'gpt-4',
      apiKey: 'your-openai-api-key',
      stream: true,
      maxTokens: 2000,
      temperature: 0.7
    }
  },
  {
    name: 'Claude',
    value: 'claude',
    config: {
      baseURL: 'https://api.anthropic.com/v1',
      model: 'claude-3-sonnet-20240229',
      apiKey: 'your-anthropic-api-key',
      stream: true,
      maxTokens: 2000,
      temperature: 0.7
    }
  },
  {
    name: 'DeepSeek (本地)',
    value: 'deepseek-local',
    config: {
      baseURL: 'http://127.0.0.1:11434',
      model: 'deepseek',
      apiKey: '4NAD34X-FDYM36S-K6TG4M0-8YGMCGW',
      stream: true,
      maxTokens: 2000,
      temperature: 0.7
    }
  },
  {
    name: 'Gemini',
    value: 'gemini',
    config: {
      baseURL: 'https://generativelanguage.googleapis.com/v1beta',
      model: 'gemini-pro',
      apiKey: 'your-google-api-key',
      stream: true,
      maxTokens: 2000,
      temperature: 0.7
    }
  }
])

// 快捷回复
const quickReplies = ref([
  '请详细解释一下',
  '能举个例子吗？',
  '还有其他方法吗？',
  '谢谢，很有帮助'
])

// 消息模板
const messageTemplates = ref([
  {
    title: '代码解释',
    content: '请解释以下代码的功能和工作原理：\n\n[在这里粘贴代码]'
  },
  {
    title: '问题解决',
    content: '我遇到了一个问题：[描述问题]\n\n请帮我分析原因并提供解决方案。'
  },
  {
    title: '学习指导',
    content: '我想学习 [技术/概念]，请为我制定一个学习计划和推荐一些资源。'
  },
  {
    title: '代码优化',
    content: '请帮我优化以下代码，提高性能和可读性：\n\n[在这里粘贴代码]'
  }
])

// 计算属性
const isConfigValid = computed(() => {
  const currentConfig = store.getters.aiConfig
  return currentConfig.baseURL && currentConfig.model && currentConfig.apiKey
})

// 使用 XRequest Hook
const {
  isLoading,
  error,
  data,
  chunks,
  hasError,
  chunkCount,
  init,
  create,
  abort
} = useXRequest()

// 工具方法
const getShortUrl = (url) => {
  if (!url) return '未设置'
  try {
    const urlObj = new URL(url)
    return urlObj.hostname + (urlObj.port ? ':' + urlObj.port : '')
  } catch {
    return url.length > 20 ? url.substring(0, 20) + '...' : url
  }
}

// 配置管理
const loadConfig = () => {
  store.dispatch('loadAiConfig')
}

const saveConfig = () => {
  try {
    store.dispatch('updateAiConfig', config.value)
    showConfigModal.value = false
    uni.showToast({
      title: '配置已保存',
      icon: 'success'
    })
  } catch (e) {
    console.error('保存配置失败:', e)
    uni.showToast({
      title: '保存失败',
      icon: 'none'
    })
  }
}

const resetConfig = () => {
  store.dispatch('resetAiConfig')
  uni.showToast({
    title: '配置已重置',
    icon: 'success'
  })
}

const applyPreset = (presetValue) => {
  const preset = presetOptions.value.find(p => p.value === presetValue)
  if (preset) {
    store.dispatch('updateAiConfig', preset.config)
    selectedPreset.value = presetValue
    uni.showToast({
      title: `已应用 ${preset.name} 配置`,
      icon: 'success'
    })
  }
}

// 消息处理
const addToHistory = (role, content) => {
  chatHistory.value.push({
    role,
    content,
    timestamp: new Date()
  })

  // 保存历史记录
  try {
    uni.setStorageSync('ai-chat-history', chatHistory.value.slice(-50)) // 只保存最近50条
  } catch (e) {
    console.error('保存历史失败:', e)
  }
}

const clearHistory = () => {
  uni.showModal({
    title: '确认清空',
    content: '确定要清空所有对话历史吗？',
    success: (res) => {
      if (res.confirm) {
        chatHistory.value = []
        uni.removeStorageSync('ai-chat-history')
        uni.showToast({
          title: '已清空历史',
          icon: 'success'
        })
      }
    }
  })
}

// UI交互
const onInputFocus = () => {
  // 输入框获得焦点时的处理
}

const onInputBlur = () => {
  // 输入框失去焦点时的处理
}

const clearInput = () => {
  messageInput.value = ''
}

const selectQuickReply = (reply) => {
  messageInput.value = reply
}

const selectTemplate = (template) => {
  messageInput.value = template.content
  showTemplates.value = false
}

const copyText = async (text) => {
  try {
    // #ifdef H5
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      uni.showToast({
        title: '复制成功',
        icon: 'success'
      })
    } else {
      uni.showToast({
        title: 'H5环境不支持复制',
        icon: 'none'
      })
    }
    // #endif

    // #ifndef H5
    uni.setClipboardData({
      data: text,
      success: () => {
        uni.showToast({
          title: '复制成功',
          icon: 'success'
        })
      }
    })
    // #endif
  } catch (e) {
    uni.showToast({
      title: '复制失败',
      icon: 'none'
    })
  }
}

const regenerateResponse = () => {
  if (lastMessage.value) {
    messageInput.value = lastMessage.value
    sendMessage()
  }
}

const retryRequest = () => {
  if (lastMessage.value) {
    messageInput.value = lastMessage.value
    sendMessage()
  }
}

// 初始化请求实例
watch(() => config.value, (newConfig) => {
  if (newConfig.baseURL) {
    const requestConfig = {
      baseURL: newConfig.baseURL,
      model: newConfig.model,
      timeout: 60000
    }

    if (newConfig.apiKey) {
      requestConfig.dangerouslyApiKey = `Bearer ${newConfig.apiKey}`
    }

    init(requestConfig)
  }
}, { immediate: true, deep: true })

// 发送消息
const sendMessage = async () => {
  const currentConfig = store.getters.aiConfig

  if (!messageInput.value.trim()) {
    uni.showToast({
      title: '请输入消息内容',
      icon: 'none'
    })
    return
  }

  if (!isConfigValid.value) {
    uni.showToast({
      title: '请先完成配置',
      icon: 'none'
    })
    showConfigModal.value = true
    return
  }

  const userMessage = messageInput.value.trim()
  lastMessage.value = userMessage

  // 添加用户消息到历史
  addToHistory('user', userMessage)

  // 清空输入框和流式文本
  messageInput.value = ''
  streamText.value = ''

  // 构建消息历史（包含上下文）
  const messages = chatHistory.value.slice(-10).map(msg => ({
    role: msg.role,
    content: msg.content
  }))

  const params = {
    model: currentConfig.model,
    stream: currentConfig.stream,
    messages: messages,
    max_tokens: currentConfig.maxTokens,
    temperature: currentConfig.temperature
  }

  const callbacks = {
    onUpdate: (chunk) => {
      console.log('收到数据块:', chunk)

      // 处理流式响应文本累积
      if (currentConfig.stream && chunk.choices && chunk.choices[0]) {
        const delta = chunk.choices[0].delta
        if (delta && delta.content) {
          streamText.value += delta.content
        }
      }
    },
    onSuccess: (chunks) => {
      console.log('请求成功:', chunks)

      // 添加AI回复到历史
      if (streamText.value) {
        addToHistory('assistant', streamText.value)
      }

      uni.showToast({
        title: '回复完成',
        icon: 'success'
      })
    },
    onError: (err) => {
      console.error('请求失败:', err)
      uni.showToast({
        title: err.message || '请求失败',
        icon: 'none'
      })
    },
    onStream: (abortController) => {
      console.log('流控制器已创建:', abortController)
    }
  }

  try {
    await create(params, callbacks)
  } catch (err) {
    console.error('发送消息失败:', err)
  }
}

// 取消请求
const cancelRequest = () => {
  abort()
  uni.showToast({
    title: '请求已取消',
    icon: 'none'
  })
}



// 组件挂载时初始化
onMounted(() => {
  // 加载 AI 配置
  store.dispatch('loadAiConfig')

  // 加载聊天历史
  try {
    const savedHistory = uni.getStorageSync('chatHistory')
    if (savedHistory && Array.isArray(savedHistory)) {
      chatHistory.value = savedHistory
    }
  } catch (e) {
    console.error('加载聊天历史失败:', e)
  }
})
</script>

<style lang="scss" scoped>
.x-request-demo {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.demo-container {
  padding: 15px;
  padding-bottom: 30px;
}

// 快速配置卡片
.quick-config-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  .config-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .config-info {
    margin-bottom: 15px;

    .config-item {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
  }
}

// 配置弹窗
.config-modal {
  background: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 80vh;
  overflow: hidden;

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #f0f0f0;
  }

  .config-form {
    padding: 20px;
    max-height: 60vh;
    overflow-y: auto;
  }

  .config-actions {
    display: flex;
    gap: 15px;
    margin-top: 20px;

    .zx-button {
      flex: 1;
    }
  }
}

// 对话历史
.chat-history {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: rgba(60, 156, 255, 0.1);
    border-bottom: 1px solid rgba(60, 156, 255, 0.2);
  }

  .chat-messages {
    max-height: 400px;
    overflow-y: auto;
    padding: 15px;
  }

  .message-item {
    display: flex;
    margin-bottom: 15px;

    &.user {
      flex-direction: row-reverse;

      .message-content {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: #fff;
        margin-right: 10px;
        margin-left: 0;
      }
    }

    &.assistant {
      .message-content {
        background: #f8f9fa;
        color: #333;
        margin-left: 10px;
      }
    }

    .message-avatar {
      flex-shrink: 0;
    }

    .message-content {
      max-width: 70%;
      border-radius: 12px;
      padding: 12px 16px;

      .message-text {
        line-height: 1.5;
        word-break: break-word;
      }

      .message-time {
        font-size: 11px;
        opacity: 0.7;
        margin-top: 5px;
      }
    }
  }
}

// 快捷回复
.quick-replies {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  .reply-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 10px;
  }
}

// 消息输入
.message-input-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  .input-container {
    position: relative;
    margin-bottom: 15px;

    .input-actions {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      gap: 8px;
    }
  }
}

// 实时响应
.live-response {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  .response-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background: rgba(52, 199, 89, 0.1);
    border-bottom: 1px solid rgba(52, 199, 89, 0.2);

    .status-indicators {
      display: flex;
      gap: 8px;
    }
  }

  .ai-response-card {
    padding: 20px;

    .response-content {
      .stream-text {
        line-height: 1.6;
        font-size: 15px;
        color: #333;
        white-space: pre-wrap;
        word-break: break-word;
        position: relative;
      }

      .typing-indicator {
        display: inline-flex;
        gap: 4px;
        margin-left: 5px;

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3c9cff;
          animation: typing 1.4s infinite ease-in-out;

          &:nth-child(1) {
            animation-delay: -0.32s;
          }

          &:nth-child(2) {
            animation-delay: -0.16s;
          }
        }
      }
    }

    .response-actions {
      display: flex;
      gap: 10px;
      margin-top: 15px;
      padding-top: 15px;
      border-top: 1px solid #f0f0f0;
    }
  }
}

// 错误卡片
.error-card {
  background: rgba(255, 71, 87, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 71, 87, 0.2);

  .error-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .error-content {
    margin-bottom: 15px;
  }
}

// 欢迎卡片
.welcome-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 40px 20px;
  margin-bottom: 20px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  .welcome-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
}

// 模板弹窗
.templates-modal {
  background: #fff;
  border-radius: 20px 20px 0 0;
  max-height: 70vh;
  overflow: hidden;

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #f0f0f0;
  }

  .templates-list {
    padding: 20px;
    max-height: 50vh;
    overflow-y: auto;
  }

  .template-item {
    padding: 15px;
    border-radius: 12px;
    background: #f8f9fa;
    margin-bottom: 10px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #e9ecef;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

// 动画
@keyframes typing {

  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }

  40% {
    transform: scale(1);
    opacity: 1;
  }
}

// 数据块列表（保留原有样式但优化）
.chunks-list {
  .chunk-item {
    margin-bottom: 15px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

    .chunk-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: rgba(60, 156, 255, 0.1);
      border-bottom: 1px solid rgba(60, 156, 255, 0.2);
    }

    .chunk-content {
      pre {
        padding: 16px;
        margin: 0;
        font-size: 12px;
        line-height: 1.4;
        overflow-x: auto;
        background: #fff;
        color: #333;
      }
    }
  }
}
</style>