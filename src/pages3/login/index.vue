<template>
  <view class="login-demo">
    <!-- 页面标题 -->
    <view class="demo-header">
      <text class="demo-title">zx-login 登录组件示例</text>
      <text class="demo-desc">支持账号密码登录和手机验证码登录</text>
    </view>

    <!-- 基础用法 -->
    <view class="demo-section">
      <view class="demo-section-title">
        <text class="section-title">基础用法</text>
      </view>
      <view class="demo-card">
        <zx-login
          @login="handleLogin"
          @getCode="handleGetCode"
          @forgetPassword="handleForgetPassword"
          @protocolClick="handleProtocolClick"
          @switchType="handleSwitchType"
        />
      </view>
    </view>

    <!-- 自定义配置 -->
    <view class="demo-section">
      <view class="demo-section-title">
        <text class="section-title">自定义配置</text>
        <text class="section-desc">自定义Logo、标题、文案等</text>
      </view>
      <view class="demo-card">
        <zx-login
          :show-logo="true"
          logo-text="DEMO"
          title="欢迎回来"
          :default-login-type="'sms'"
          :show-forget-password="false"
          account-placeholder="请输入用户名"
          password-placeholder="请输入登录密码"
          phone-placeholder="请输入手机号码"
          code-placeholder="请输入短信验证码"
          login-button-text="立即登录"
          protocol-text="《服务条款》和《隐私协议》"
          :code-countdown="120"
          custom-class="custom-login"
          @login="handleCustomLogin"
          @getCode="handleGetCode"
          @protocolClick="handleProtocolClick"
        />
      </view>
    </view>

    <!-- 仅密码登录 -->
    <view class="demo-section">
      <view class="demo-section-title">
        <text class="section-title">仅密码登录</text>
        <text class="section-desc">隐藏切换按钮，只支持账号密码登录</text>
      </view>
      <view class="demo-card">
        <zx-login
          :show-logo="false"
          title="管理员登录"
          :default-login-type="'password'"
          :show-switch="false"
          :show-protocol="false"
          @login="handleAdminLogin"
          @forgetPassword="handleForgetPassword"
        />
      </view>
    </view>

    <!-- 仅验证码登录 -->
    <view class="demo-section">
      <view class="demo-section-title">
        <text class="section-title">仅验证码登录</text>
        <text class="section-desc">隐藏切换按钮，只支持手机验证码登录</text>
      </view>
      <view class="demo-card">
        <zx-login
          :show-logo="false"
          title="快速登录"
          :default-login-type="'sms'"
          :show-switch="false"
          :show-forget-password="false"
          @login="handleQuickLogin"
          @getCode="handleGetCode"
        />
      </view>
    </view>

    <!-- 操作日志 -->
    <view class="demo-section">
      <view class="demo-section-title">
        <text class="section-title">操作日志</text>
      </view>
      <view class="demo-logs">
        <view v-for="(log, index) in logs" :key="index" class="log-item">
          <text class="log-time">{{ log.time }}</text>
          <text class="log-content">{{ log.content }}</text>
        </view>
        <view v-if="logs.length === 0" class="log-empty">
          <text>暂无操作记录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxLogin from '@/components/zx-login/zx-login.vue'

// 操作日志
const logs = ref([])

// 添加日志
const addLog = (content) => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  
  logs.value.unshift({
    time,
    content
  })
  
  // 最多保留20条记录
  if (logs.value.length > 20) {
    logs.value = logs.value.slice(0, 20)
  }
}

// 模拟登录接口
const mockLogin = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟登录成功
      resolve({ success: true, message: '登录成功' })
    }, 1000)
  })
}

// 模拟获取验证码接口
const mockGetCode = async (phone) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟获取验证码成功
      resolve({ success: true, message: '验证码已发送' })
    }, 500)
  })
}

// 基础登录处理
const handleLogin = async (data) => {
  addLog(`基础登录 - 类型: ${data.type === 'password' ? '账号密码' : '手机验证码'}`)
  addLog(`登录数据: ${JSON.stringify(data.data)}`)
  
  try {
    const result = await mockLogin(data)
    addLog(`登录结果: ${result.message}`)
    
    // 显示成功提示
    uni.showToast({
      title: result.message,
      icon: 'success'
    })
  } catch (error) {
    addLog(`登录失败: ${error.message}`)
    uni.showToast({
      title: '登录失败',
      icon: 'error'
    })
  }
}

// 自定义登录处理
const handleCustomLogin = async (data) => {
  addLog(`自定义登录 - 类型: ${data.type === 'password' ? '账号密码' : '手机验证码'}`)
  addLog(`登录数据: ${JSON.stringify(data.data)}`)
  
  try {
    const result = await mockLogin(data)
    addLog(`登录结果: ${result.message}`)
    
    uni.showModal({
      title: '登录成功',
      content: `欢迎回来！登录方式: ${data.type === 'password' ? '账号密码' : '手机验证码'}`,
      showCancel: false
    })
  } catch (error) {
    addLog(`登录失败: ${error.message}`)
    uni.showToast({
      title: '登录失败',
      icon: 'error'
    })
  }
}

// 管理员登录处理
const handleAdminLogin = async (data) => {
  addLog(`管理员登录 - 账号: ${data.data.account}`)
  
  // 模拟管理员账号验证
  if (data.data.account === 'admin' && data.data.password === '123456') {
    addLog('管理员登录成功')
    uni.showModal({
      title: '登录成功',
      content: '欢迎管理员！',
      showCancel: false
    })
  } else {
    addLog('管理员登录失败 - 账号或密码错误')
    uni.showModal({
      title: '登录失败',
      content: '账号或密码错误，请重试！\n提示：admin/123456',
      showCancel: false
    })
  }
}

// 快速登录处理
const handleQuickLogin = async (data) => {
  addLog(`快速登录 - 手机号: ${data.data.phone}`)
  addLog(`验证码: ${data.data.code}`)
  
  // 模拟验证码验证
  if (data.data.code === '123456') {
    addLog('快速登录成功')
    uni.showToast({
      title: '登录成功',
      icon: 'success'
    })
  } else {
    addLog('快速登录失败 - 验证码错误')
    uni.showModal({
      title: '登录失败',
      content: '验证码错误，请重试！\n提示：123456',
      showCancel: false
    })
  }
}

// 获取验证码处理
const handleGetCode = async (data) => {
  addLog(`获取验证码 - 手机号: ${data.phone}`)
  
  try {
    const result = await mockGetCode(data.phone)
    addLog(`验证码发送成功: ${result.message}`)
    
    // 调用回调函数开始倒计时
    data.callback(true)
    
    uni.showToast({
      title: '验证码已发送',
      icon: 'success'
    })
  } catch (error) {
    addLog(`验证码发送失败: ${error.message}`)
    data.callback(false)
    
    uni.showToast({
      title: '发送失败',
      icon: 'error'
    })
  }
}

// 忘记密码处理
const handleForgetPassword = () => {
  addLog('点击忘记密码')
  
  uni.showModal({
    title: '忘记密码',
    content: '请联系客服或通过手机验证码登录',
    showCancel: false
  })
}

// 用户协议处理
const handleProtocolClick = () => {
  addLog('点击用户协议')
  
  uni.showModal({
    title: '用户协议',
    content: '这里是用户协议和隐私政策的内容...',
    showCancel: false
  })
}

// 切换登录方式处理
const handleSwitchType = (type) => {
  addLog(`切换登录方式: ${type === 'password' ? '账号密码' : '手机验证码'}`)
}

// 清空日志
const clearLogs = () => {
  logs.value = []
  addLog('日志已清空')
}

// 页面加载时添加欢迎日志
addLog('欢迎使用 zx-login 组件示例')
</script>

<style lang="scss" scoped>
.login-demo {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20rpx;
}

.demo-header {
  text-align: center;
  padding: 40rpx 20rpx;
  background: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  
  .demo-title {
    display: block;
    font-size: 36rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 16rpx;
  }
  
  .demo-desc {
    display: block;
    font-size: 28rpx;
    color: #666;
  }
}

.demo-section {
  margin-bottom: 40rpx;
  
  .demo-section-title {
    padding: 20rpx 0;
    
    .section-title {
      display: block;
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 8rpx;
    }
    
    .section-desc {
      display: block;
      font-size: 24rpx;
      color: #666;
    }
  }
  
  .demo-card {
    background: #fff;
    border-radius: 16rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
  }
}

.demo-logs {
  background: #fff;
  border-radius: 16rpx;
  padding: 20rpx;
  max-height: 600rpx;
  overflow-y: auto;
  
  .log-item {
    display: flex;
    align-items: flex-start;
    padding: 12rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .log-time {
      flex-shrink: 0;
      width: 120rpx;
      font-size: 24rpx;
      color: #999;
      margin-right: 20rpx;
    }
    
    .log-content {
      flex: 1;
      font-size: 26rpx;
      color: #333;
      word-break: break-all;
    }
  }
  
  .log-empty {
    text-align: center;
    padding: 60rpx 0;
    color: #999;
    font-size: 28rpx;
  }
}

// 自定义登录样式
:deep(.custom-login) {
  .zx-login__btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50rpx;
  }
  
  .zx-login__input-item {
    border-radius: 50rpx;
    border-color: #e0e0e0;
    
    &:focus-within {
      border-color: #667eea;
      box-shadow: 0 0 0 4rpx rgba(102, 126, 234, 0.1);
    }
  }
  
  .zx-login__title-text {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

/* 暗黑模式适配 */
@media (prefers-color-scheme: dark) {
  .login-demo {
    background: #1a1a1a;
  }
  
  .demo-header,
  .demo-card,
  .demo-logs {
    background: #2a2a2a;
  }
  
  .demo-title,
  .section-title,
  .log-content {
    color: #fff;
  }
  
  .demo-desc,
  .section-desc,
  .log-time {
    color: #999;
  }
  
  .log-item {
    border-bottom-color: #333;
  }
}
</style>