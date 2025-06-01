<template>
  <view class="page">
    <zx-navbar title="Popup Message 消息提示" back />
    
    <view class="demo-section">
      <zx-cell-group title="基础用法">
        <zx-cell title="成功消息" is-link @click="showMessage('success')" />
        <zx-cell title="警告消息" is-link @click="showMessage('warning')" />
        <zx-cell title="错误消息" is-link @click="showMessage('error')" />
        <zx-cell title="信息消息" is-link @click="showMessage('info')" />
      </zx-cell-group>
    </view>
    
    <view class="demo-section">
      <zx-cell-group title="自定义配置">
        <zx-cell title="自定义图标" is-link @click="showCustomIcon" />
        <zx-cell title="不显示图标" is-link @click="showNoIcon" />
        <zx-cell title="显示关闭按钮" is-link @click="showClosable" />
        <zx-cell title="显示遮罩" is-link @click="showWithMask" />
      </zx-cell-group>
    </view>
    
    <view class="demo-section">
      <zx-cell-group title="持续时间">
        <zx-cell title="1秒后关闭" is-link @click="showDuration(1000)" />
        <zx-cell title="5秒后关闭" is-link @click="showDuration(5000)" />
        <zx-cell title="不自动关闭" is-link @click="showDuration(0)" />
      </zx-cell-group>
    </view>
    
    <view class="demo-section">
      <zx-cell-group title="长文本消息">
        <zx-cell title="长文本消息" is-link @click="showLongMessage" />
        <zx-cell title="多行文本消息" is-link @click="showMultilineMessage" />
      </zx-cell-group>
    </view>
    
    <view class="demo-section">
      <zx-cell-group title="方法调用">
        <zx-cell title="通过 ref 调用" is-link @click="openByRef" />
        <zx-cell title="拦截关闭" is-link @click="showBeforeClose" />
      </zx-cell-group>
    </view>
    
    <view class="demo-section">
      <zx-cell-group title="实际场景">
        <zx-cell title="登录成功" is-link @click="showLoginSuccess" />
        <zx-cell title="网络错误" is-link @click="showNetworkError" />
        <zx-cell title="表单验证" is-link @click="showFormValidation" />
        <zx-cell title="操作确认" is-link @click="showOperationConfirm" />
      </zx-cell-group>
    </view>
    
    <view class="demo-section">
      <zx-cell-group title="自定义内容">
        <zx-cell title="插槽内容" is-link @click="showSlotContent" />
      </zx-cell-group>
    </view>
    
    <!-- 基础消息组件 -->
    <zx-popup-message
      v-model:show="showBasic"
      :type="messageType"
      :message="messageText"
      :duration="messageDuration"
      :show-icon="showMessageIcon"
      :icon="customIcon"
      :closable="messageClosable"
      :mask-show="showMessageMask"
      :before-close="messageBeforeClose"
      @click="onMessageClick"
    />
    
    <!-- 通过 ref 调用的组件 -->
    <zx-popup-message
      ref="messageRef"
      type="success"
      message="通过 ref 调用的消息"
      :duration="2000"
    />
    
    <!-- 自定义插槽内容 -->
    <zx-popup-message
      v-model:show="showSlot"
      type="info"
      :duration="0"
      closable
    >
      <view class="custom-content">
        <view class="custom-title">自定义消息内容</view>
        <view class="custom-desc">这是一个使用插槽的自定义消息，可以包含更复杂的内容结构</view>
        <view class="custom-actions">
          <zx-button size="mini" type="primary" @click="handleCustomAction">确定</zx-button>
          <zx-button size="mini" @click="showSlot = false">取消</zx-button>
        </view>
      </view>
    </zx-popup-message>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const showBasic = ref(false)
const showSlot = ref(false)
const messageType = ref('info')
const messageText = ref('')
const messageDuration = ref(3000)
const showMessageIcon = ref(true)
const customIcon = ref('')
const messageClosable = ref(false)
const showMessageMask = ref(false)
const messageBeforeClose = ref(null)
const messageRef = ref()

// 基础用法
const showMessage = (type) => {
  const messages = {
    success: '操作成功！',
    warning: '请注意相关风险！',
    error: '操作失败，请重试！',
    info: '这是一条信息提示'
  }
  
  messageType.value = type
  messageText.value = messages[type]
  messageDuration.value = 3000
  showMessageIcon.value = true
  customIcon.value = ''
  messageClosable.value = false
  showMessageMask.value = false
  messageBeforeClose.value = null
  showBasic.value = true
}

// 自定义图标
const showCustomIcon = () => {
  messageType.value = 'info'
  messageText.value = '使用自定义图标的消息'
  customIcon.value = 'star-fill'
  showMessageIcon.value = true
  messageClosable.value = false
  showMessageMask.value = false
  messageDuration.value = 3000
  messageBeforeClose.value = null
  showBasic.value = true
}

// 不显示图标
const showNoIcon = () => {
  messageType.value = 'info'
  messageText.value = '这是一条不显示图标的消息'
  showMessageIcon.value = false
  customIcon.value = ''
  messageClosable.value = false
  showMessageMask.value = false
  messageDuration.value = 3000
  messageBeforeClose.value = null
  showBasic.value = true
}

// 显示关闭按钮
const showClosable = () => {
  messageType.value = 'warning'
  messageText.value = '这条消息可以手动关闭'
  showMessageIcon.value = true
  customIcon.value = ''
  messageClosable.value = true
  showMessageMask.value = false
  messageDuration.value = 0 // 不自动关闭
  messageBeforeClose.value = null
  showBasic.value = true
}

// 显示遮罩
const showWithMask = () => {
  messageType.value = 'error'
  messageText.value = '这条消息显示了遮罩层'
  showMessageIcon.value = true
  customIcon.value = ''
  messageClosable.value = true
  showMessageMask.value = true
  messageDuration.value = 0
  messageBeforeClose.value = null
  showBasic.value = true
}

// 自定义持续时间
const showDuration = (duration) => {
  messageType.value = 'info'
  messageText.value = duration === 0 ? '这条消息不会自动关闭' : `这条消息将在 ${duration / 1000} 秒后关闭`
  showMessageIcon.value = true
  customIcon.value = ''
  messageClosable.value = duration === 0
  showMessageMask.value = false
  messageDuration.value = duration
  messageBeforeClose.value = null
  showBasic.value = true
}

// 长文本消息
const showLongMessage = () => {
  messageType.value = 'info'
  messageText.value = '这是一条很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的消息文本，用来测试长文本的显示效果'
  showMessageIcon.value = true
  customIcon.value = ''
  messageClosable.value = true
  showMessageMask.value = false
  messageDuration.value = 5000
  messageBeforeClose.value = null
  showBasic.value = true
}

// 多行文本消息
const showMultilineMessage = () => {
  messageType.value = 'warning'
  messageText.value = '第一行消息内容\n第二行消息内容\n第三行消息内容'
  showMessageIcon.value = true
  customIcon.value = ''
  messageClosable.value = true
  showMessageMask.value = false
  messageDuration.value = 4000
  messageBeforeClose.value = null
  showBasic.value = true
}

// 通过 ref 调用
const openByRef = () => {
  messageRef.value?.open()
}

// 拦截关闭
const showBeforeClose = () => {
  messageType.value = 'warning'
  messageText.value = '关闭前会弹出确认对话框'
  showMessageIcon.value = true
  customIcon.value = ''
  messageClosable.value = true
  showMessageMask.value = false
  messageDuration.value = 0
  messageBeforeClose.value = () => {
    return new Promise((resolve) => {
      uni.showModal({
        title: '提示',
        content: '确定要关闭这条消息吗？',
        success: (res) => {
          resolve(res.confirm)
        }
      })
    })
  }
  showBasic.value = true
}

// 实际场景示例
const showLoginSuccess = () => {
  messageType.value = 'success'
  messageText.value = '登录成功，欢迎回来！'
  showMessageIcon.value = true
  customIcon.value = ''
  messageClosable.value = false
  showMessageMask.value = false
  messageDuration.value = 2000
  messageBeforeClose.value = null
  showBasic.value = true
}

const showNetworkError = () => {
  messageType.value = 'error'
  messageText.value = '网络连接失败，请检查网络设置后重试'
  showMessageIcon.value = true
  customIcon.value = ''
  messageClosable.value = true
  showMessageMask.value = false
  messageDuration.value = 0
  messageBeforeClose.value = null
  showBasic.value = true
}

const showFormValidation = () => {
  messageType.value = 'warning'
  messageText.value = '请填写必填字段后再提交'
  showMessageIcon.value = true
  customIcon.value = ''
  messageClosable.value = false
  showMessageMask.value = false
  messageDuration.value = 3000
  messageBeforeClose.value = null
  showBasic.value = true
}

const showOperationConfirm = () => {
  messageType.value = 'success'
  messageText.value = '数据保存成功'
  showMessageIcon.value = true
  customIcon.value = 'checkmark-circle'
  messageClosable.value = false
  showMessageMask.value = false
  messageDuration.value = 2000
  messageBeforeClose.value = null
  showBasic.value = true
}

// 自定义插槽内容
const showSlotContent = () => {
  showSlot.value = true
}

// 事件处理
const onMessageClick = () => {
  console.log('消息被点击了')
  uni.showToast({
    title: '消息被点击',
    icon: 'none'
  })
}

const handleCustomAction = () => {
  uni.showToast({
    title: '确定操作',
    icon: 'success'
  })
  showSlot.value = false
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.demo-section {
  margin-bottom: 20px;
}

.custom-content {
  padding: 4px 0;
}

.custom-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.custom-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 12px;
}

.custom-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>