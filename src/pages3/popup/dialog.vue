<template>
  <view class="container">
    <zx-navbar title="弹窗对话框" />
    
    <view class="demo-section">
      <view class="section-title">基础用法</view>
      <view class="demo-item">
        <zx-button @click="basicDialog = true" type="primary">基础对话框</zx-button>
        <zx-button @click="noCloseDialog = true" type="primary">无取消按钮</zx-button>
      </view>
    </view>
    
    <view class="demo-section">
      <view class="section-title">不同主题</view>
      <view class="demo-item">
        <zx-button @click="successDialog = true" type="success">成功</zx-button>
        <zx-button @click="warningDialog = true" type="warning">警告</zx-button>
        <zx-button @click="errorDialog = true" type="error">错误</zx-button>
        <zx-button @click="infoDialog = true" type="info">信息</zx-button>
      </view>
    </view>
    
    <view class="demo-section">
      <view class="section-title">输入对话框</view>
      <view class="demo-item">
        <zx-button @click="inputDialog = true" type="primary">文本输入</zx-button>
        <zx-button @click="numberDialog = true" type="primary">数字输入</zx-button>
        <zx-button @click="passwordDialog = true" type="primary">密码输入</zx-button>
      </view>
    </view>
    
    <view class="demo-section">
      <view class="section-title">高级用法</view>
      <view class="demo-item">
        <zx-button @click="interceptDialog = true" type="primary">拦截确认</zx-button>
        <zx-button @click="customDialog = true" type="primary">自定义内容</zx-button>
        <zx-button @click="longContentDialog = true" type="primary">长内容</zx-button>
      </view>
    </view>
    
    <view class="demo-section">
      <view class="section-title">实际场景</view>
      <view class="demo-item">
        <zx-button @click="deleteDialog = true" type="error">删除确认</zx-button>
        <zx-button @click="loginDialog = true" type="primary">登录对话框</zx-button>
        <zx-button @click="feedbackDialog = true" type="primary">意见反馈</zx-button>
      </view>
    </view>
    
    <!-- 基础对话框 -->
    <zx-popup-dialog
      v-model:show="basicDialog"
      title="提示"
      content="这是一个基础的对话框示例"
      @confirm="onBasicConfirm"
      @cancel="onBasicCancel"
    />
    
    <!-- 无取消按钮 -->
    <zx-popup-dialog
      v-model:show="noCloseDialog"
      title="通知"
      content="这是一个只有确认按钮的对话框"
      :show-cancel="false"
      @confirm="noCloseDialog = false"
    />
    
    <!-- 成功主题 -->
    <zx-popup-dialog
      v-model:show="successDialog"
      type="success"
      title="操作成功"
      content="您的操作已成功完成！"
      :show-cancel="false"
      confirm-text="知道了"
      @confirm="successDialog = false"
    />
    
    <!-- 警告主题 -->
    <zx-popup-dialog
      v-model:show="warningDialog"
      type="warning"
      title="警告"
      content="此操作可能会影响系统性能，是否继续？"
      @confirm="onWarningConfirm"
      @cancel="warningDialog = false"
    />
    
    <!-- 错误主题 -->
    <zx-popup-dialog
      v-model:show="errorDialog"
      type="error"
      title="错误"
      content="网络连接失败，请检查网络设置后重试"
      :show-cancel="false"
      confirm-text="重试"
      @confirm="onErrorRetry"
    />
    
    <!-- 信息主题 -->
    <zx-popup-dialog
      v-model:show="infoDialog"
      type="info"
      title="信息"
      content="当前版本：v1.0.0\n更新内容：修复已知问题，优化用户体验"
      :show-cancel="false"
      confirm-text="确定"
      @confirm="infoDialog = false"
    />
    
    <!-- 文本输入 -->
    <zx-popup-dialog
      v-model:show="inputDialog"
      v-model="inputValue"
      mode="input"
      title="请输入"
      placeholder="请输入您的姓名"
      @confirm="onInputConfirm"
      @cancel="inputDialog = false"
    />
    
    <!-- 数字输入 -->
    <zx-popup-dialog
      v-model:show="numberDialog"
      v-model="numberValue"
      mode="input"
      input-type="number"
      title="设置数量"
      placeholder="请输入数量"
      @confirm="onNumberConfirm"
      @cancel="numberDialog = false"
    />
    
    <!-- 密码输入 -->
    <zx-popup-dialog
      v-model:show="passwordDialog"
      v-model="passwordValue"
      mode="input"
      input-type="password"
      title="验证密码"
      placeholder="请输入密码"
      :maxlength="20"
      @confirm="onPasswordConfirm"
      @cancel="passwordDialog = false"
    />
    
    <!-- 拦截确认 -->
    <zx-popup-dialog
      v-model:show="interceptDialog"
      title="确认操作"
      content="此操作需要验证，请稍候..."
      :before-close="true"
      @confirm="onInterceptConfirm"
      @cancel="interceptDialog = false"
    />
    
    <!-- 自定义内容 -->
    <zx-popup-dialog v-model:show="customDialog">
      <template #title>
        <view class="custom-title">
          <text class="title-icon">🎉</text>
          <text class="title-text">恭喜您</text>
        </view>
      </template>
      
      <view class="custom-content">
        <view class="achievement">
          <image class="achievement-icon" src="https://cdn.mp.ac.cn/icon/medal.png" mode="aspectFit" />
          <text class="achievement-text">获得成就：连续签到7天</text>
        </view>
        <view class="reward">
          <text class="reward-text">奖励：积分 +100</text>
        </view>
      </view>
    </zx-popup-dialog>
    
    <!-- 长内容 -->
    <zx-popup-dialog
      v-model:show="longContentDialog"
      title="用户协议"
      :content="longContent"
      confirm-text="同意"
      cancel-text="拒绝"
      @confirm="onAgreementConfirm"
      @cancel="longContentDialog = false"
    />
    
    <!-- 删除确认 -->
    <zx-popup-dialog
      v-model:show="deleteDialog"
      type="error"
      title="确认删除"
      content="删除后无法恢复，确定要删除这条记录吗？"
      confirm-text="删除"
      cancel-text="取消"
      :before-close="true"
      @confirm="onDeleteConfirm"
      @cancel="deleteDialog = false"
    />
    
    <!-- 登录对话框 -->
    <zx-popup-dialog
      v-model:show="loginDialog"
      v-model="loginForm.username"
      mode="input"
      title="快速登录"
      placeholder="请输入用户名"
      @confirm="onLoginConfirm"
      @cancel="loginDialog = false"
    />
    
    <!-- 意见反馈 -->
    <zx-popup-dialog
      v-model:show="feedbackDialog"
      v-model="feedbackContent"
      mode="input"
      title="意见反馈"
      placeholder="请输入您的意见或建议"
      :maxlength="200"
      @confirm="onFeedbackConfirm"
      @cancel="feedbackDialog = false"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxPopupDialog from '@tanzhenxing/zx-popup-dialog/zx-popup-dialog.vue'

// 基础对话框
const basicDialog = ref(false)
const noCloseDialog = ref(false)

// 主题对话框
const successDialog = ref(false)
const warningDialog = ref(false)
const errorDialog = ref(false)
const infoDialog = ref(false)

// 输入对话框
const inputDialog = ref(false)
const numberDialog = ref(false)
const passwordDialog = ref(false)
const inputValue = ref('')
const numberValue = ref('')
const passwordValue = ref('')

// 高级用法
const interceptDialog = ref(false)
const customDialog = ref(false)
const longContentDialog = ref(false)

// 实际场景
const deleteDialog = ref(false)
const loginDialog = ref(false)
const feedbackDialog = ref(false)
const loginForm = ref({ username: '' })
const feedbackContent = ref('')

// 长内容
const longContent = `欢迎使用我们的服务！

在使用本服务前，请仔细阅读以下条款：

1. 用户应当遵守相关法律法规
2. 禁止发布违法违规内容
3. 保护个人隐私信息安全
4. 合理使用平台资源
5. 尊重他人权益

如果您同意以上条款，请点击"同意"按钮继续使用服务。`

// 事件处理
const onBasicConfirm = () => {
  uni.showToast({ title: '点击了确认' })
}

const onBasicCancel = () => {
  uni.showToast({ title: '点击了取消', icon: 'none' })
}

const onWarningConfirm = () => {
  warningDialog.value = false
  uni.showToast({ title: '继续操作' })
}

const onErrorRetry = () => {
  errorDialog.value = false
  uni.showToast({ title: '正在重试...', icon: 'loading' })
}

const onInputConfirm = (value) => {
  if (!value.trim()) {
    uni.showToast({ title: '请输入姓名', icon: 'none' })
    return
  }
  inputDialog.value = false
  uni.showToast({ title: `您好，${value}！` })
  inputValue.value = ''
}

const onNumberConfirm = (value) => {
  if (!value || value <= 0) {
    uni.showToast({ title: '请输入有效数量', icon: 'none' })
    return
  }
  numberDialog.value = false
  uni.showToast({ title: `设置数量：${value}` })
  numberValue.value = ''
}

const onPasswordConfirm = (value) => {
  if (!value || value.length < 6) {
    uni.showToast({ title: '密码至少6位', icon: 'none' })
    return
  }
  passwordDialog.value = false
  uni.showToast({ title: '密码验证成功' })
  passwordValue.value = ''
}

const onInterceptConfirm = () => {
  uni.showLoading({ title: '验证中...' })
  
  // 模拟异步操作
  setTimeout(() => {
    uni.hideLoading()
    interceptDialog.value = false
    uni.showToast({ title: '验证成功' })
  }, 2000)
}

const onAgreementConfirm = () => {
  longContentDialog.value = false
  uni.showToast({ title: '已同意用户协议' })
}

const onDeleteConfirm = () => {
  uni.showLoading({ title: '删除中...' })
  
  // 模拟删除操作
  setTimeout(() => {
    uni.hideLoading()
    deleteDialog.value = false
    uni.showToast({ title: '删除成功' })
  }, 1500)
}

const onLoginConfirm = (username) => {
  if (!username.trim()) {
    uni.showToast({ title: '请输入用户名', icon: 'none' })
    return
  }
  
  loginDialog.value = false
  uni.showToast({ title: `欢迎，${username}！` })
  loginForm.value.username = ''
}

const onFeedbackConfirm = (content) => {
  if (!content.trim()) {
    uni.showToast({ title: '请输入反馈内容', icon: 'none' })
    return
  }
  
  feedbackDialog.value = false
  uni.showToast({ title: '感谢您的反馈！' })
  feedbackContent.value = ''
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.demo-section {
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 12px;
  padding: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

.demo-item {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.demo-item .zx-button {
  flex: 1;
  min-width: 120px;
}

/* 自定义对话框样式 */
.custom-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.title-icon {
  font-size: 20px;
}

.title-text {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.custom-content {
  text-align: center;
}

.achievement {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}

.achievement-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.achievement-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.reward {
  padding: 10px;
  background-color: #fff3cd;
  border-radius: 6px;
  border: 1px solid #ffeaa7;
}

.reward-text {
  font-size: 14px;
  color: #856404;
  font-weight: 500;
}
</style>