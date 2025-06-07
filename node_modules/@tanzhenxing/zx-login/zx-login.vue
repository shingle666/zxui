<template>
  <view class="zx-login" :class="[customClass]" :style="customStyle">
    <!-- Logo区域 -->
    <view class="zx-login__logo" v-if="showLogo">
      <image v-if="logoUrl" :src="logoUrl" class="zx-login__logo-img" mode="aspectFit" />
      <view v-else class="zx-login__logo-default">
        <text class="zx-login__logo-text">{{ logoText }}</text>
      </view>
    </view>

    <!-- 标题区域 -->
    <view class="zx-login__title" v-if="title">
      <text class="zx-login__title-text">{{ title }}</text>
    </view>

    <!-- 登录表单 -->
    <view class="zx-login__form">
      <!-- 账号密码登录 -->
      <view v-if="loginType === 'password'" class="zx-login__password-form">
        <!-- 账号输入框 -->
        <view class="zx-login__input-wrap" :class="{ 'error': accountError }">
          <view class="zx-login__input-item">
            <input
              v-model="formData.account"
              :placeholder="accountPlaceholder"
              class="zx-login__input"
              :maxlength="50"
              @input="onAccountInput"
              @blur="validateAccount"
            />
          </view>
          <text v-if="accountError" class="zx-login__error-msg">{{ accountError }}</text>
        </view>

        <!-- 密码输入框 -->
        <view class="zx-login__input-wrap" :class="{ 'error': passwordError }">
          <view class="zx-login__input-item">
            <input
              v-model="formData.password"
              :placeholder="passwordPlaceholder"
              :password="!showPassword"
              class="zx-login__input"
              :maxlength="20"
              @input="onPasswordInput"
              @blur="validatePassword"
            />
            <view class="zx-login__hide-icon" @tap="togglePassword">
              <text class="zx-login__icon">{{ showPassword ? '👁️' : '🙈' }}</text>
            </view>
          </view>
          <text v-if="passwordError" class="zx-login__error-msg">{{ passwordError }}</text>
        </view>

        <!-- 忘记密码 -->
        <view class="zx-login__forget" v-if="showForgetPassword">
          <text class="zx-login__forget-text" @tap="onForgetPassword">{{ forgetPasswordText }}</text>
        </view>
      </view>

      <!-- 手机验证码登录 -->
      <view v-else class="zx-login__sms-form">
        <!-- 手机号输入框 -->
        <view class="zx-login__input-wrap" :class="{ 'error': phoneError }">
          <view class="zx-login__input-item">
            <input
              v-model="formData.phone"
              :placeholder="phonePlaceholder"
              class="zx-login__input"
              type="number"
              :maxlength="11"
              @input="onPhoneInput"
              @blur="validatePhone"
            />
          </view>
          <text v-if="phoneError" class="zx-login__error-msg">{{ phoneError }}</text>
        </view>

        <!-- 验证码输入框 -->
        <view class="zx-login__input-wrap" :class="{ 'error': codeError }">
          <view class="zx-login__input-item">
            <input
              v-model="formData.code"
              :placeholder="codePlaceholder"
              class="zx-login__input"
              type="number"
              :maxlength="6"
              @input="onCodeInput"
              @blur="validateCode"
            />
            <view class="zx-login__code-box" :class="{ 'disabled': codeDisabled }" @tap="getCode">
              <text class="zx-login__code-text">{{ codeButtonText }}</text>
            </view>
          </view>
          <text v-if="codeError" class="zx-login__error-msg">{{ codeError }}</text>
        </view>
      </view>

      <!-- 协议勾选 -->
      <view class="zx-login__protocol" v-if="showProtocol">
        <view class="zx-login__checkbox" @tap="toggleProtocol">
          <text class="zx-login__checkbox-icon">{{ protocolChecked ? '☑️' : '☐' }}</text>
          <text class="zx-login__protocol-text">
            我已阅读并同意
            <text class="zx-login__protocol-link" @tap.stop="onProtocolClick">{{ protocolText }}</text>
          </text>
        </view>
      </view>

      <!-- 登录按钮 -->
      <view class="zx-login__btn">
        <button
          class="zx-login__btn-primary"
          :class="{ 'disabled': !canLogin }"
          :disabled="!canLogin"
          @tap="onLogin"
        >
          {{ loginButtonText }}
        </button>
      </view>

      <!-- 切换登录方式 -->
      <view class="zx-login__switch" v-if="showSwitch">
        <text class="zx-login__switch-text" @tap="switchLoginType">
          {{ loginType === 'password' ? switchToSmsText : switchToPasswordText }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props定义
const props = defineProps({
  // 外观配置
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: Object,
    default: () => ({})
  },
  
  // Logo配置
  showLogo: {
    type: Boolean,
    default: true
  },
  logoUrl: {
    type: String,
    default: ''
  },
  logoText: {
    type: String,
    default: 'LOGO'
  },
  
  // 标题配置
  title: {
    type: String,
    default: '用户登录'
  },
  
  // 登录方式
  defaultLoginType: {
    type: String,
    default: 'password', // password | sms
    validator: (value) => ['password', 'sms'].includes(value)
  },
  
  // 功能开关
  showSwitch: {
    type: Boolean,
    default: true
  },
  showForgetPassword: {
    type: Boolean,
    default: true
  },
  showProtocol: {
    type: Boolean,
    default: true
  },
  
  // 文案配置
  accountPlaceholder: {
    type: String,
    default: '请输入账号'
  },
  passwordPlaceholder: {
    type: String,
    default: '请输入密码'
  },
  phonePlaceholder: {
    type: String,
    default: '请输入手机号'
  },
  codePlaceholder: {
    type: String,
    default: '请输入验证码'
  },
  loginButtonText: {
    type: String,
    default: '登录'
  },
  forgetPasswordText: {
    type: String,
    default: '忘记密码？'
  },
  switchToSmsText: {
    type: String,
    default: '手机验证码登录'
  },
  switchToPasswordText: {
    type: String,
    default: '账号密码登录'
  },
  protocolText: {
    type: String,
    default: '《用户协议》和《隐私政策》'
  },
  
  // 验证码配置
  codeCountdown: {
    type: Number,
    default: 60
  }
})

// Emits定义
const emit = defineEmits([
  'login',
  'getCode',
  'forgetPassword',
  'protocolClick',
  'switchType'
])

// 响应式数据
const loginType = ref(props.defaultLoginType)
const showPassword = ref(false)
const protocolChecked = ref(false)
const codeDisabled = ref(false)
const countdown = ref(0)

// 表单数据
const formData = ref({
  account: '',
  password: '',
  phone: '',
  code: ''
})

// 错误信息
const accountError = ref('')
const passwordError = ref('')
const phoneError = ref('')
const codeError = ref('')

// 验证码按钮文案
const codeButtonText = computed(() => {
  if (countdown.value > 0) {
    return `${countdown.value}s`
  }
  return '获取验证码'
})

// 是否可以登录
const canLogin = computed(() => {
  if (props.showProtocol && !protocolChecked.value) {
    return false
  }
  
  if (loginType.value === 'password') {
    return formData.value.account && formData.value.password && !accountError.value && !passwordError.value
  } else {
    return formData.value.phone && formData.value.code && !phoneError.value && !codeError.value
  }
})

// 方法定义
const validateAccount = () => {
  if (!formData.value.account) {
    accountError.value = '请输入账号'
    return false
  }
  if (formData.value.account.length < 3) {
    accountError.value = '账号长度不能少于3位'
    return false
  }
  accountError.value = ''
  return true
}

const validatePassword = () => {
  if (!formData.value.password) {
    passwordError.value = '请输入密码'
    return false
  }
  if (formData.value.password.length < 6) {
    passwordError.value = '密码长度不能少于6位'
    return false
  }
  passwordError.value = ''
  return true
}

const validatePhone = () => {
  if (!formData.value.phone) {
    phoneError.value = '请输入手机号'
    return false
  }
  const phoneReg = /^1[3-9]\d{9}$/
  if (!phoneReg.test(formData.value.phone)) {
    phoneError.value = '请输入正确的手机号'
    return false
  }
  phoneError.value = ''
  return true
}

const validateCode = () => {
  if (!formData.value.code) {
    codeError.value = '请输入验证码'
    return false
  }
  if (formData.value.code.length !== 6) {
    codeError.value = '请输入6位验证码'
    return false
  }
  codeError.value = ''
  return true
}

const onAccountInput = () => {
  if (accountError.value) {
    validateAccount()
  }
}

const onPasswordInput = () => {
  if (passwordError.value) {
    validatePassword()
  }
}

const onPhoneInput = () => {
  if (phoneError.value) {
    validatePhone()
  }
}

const onCodeInput = () => {
  if (codeError.value) {
    validateCode()
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleProtocol = () => {
  protocolChecked.value = !protocolChecked.value
}

const switchLoginType = () => {
  loginType.value = loginType.value === 'password' ? 'sms' : 'password'
  // 清空表单数据和错误信息
  formData.value = {
    account: '',
    password: '',
    phone: '',
    code: ''
  }
  accountError.value = ''
  passwordError.value = ''
  phoneError.value = ''
  codeError.value = ''
  
  emit('switchType', loginType.value)
}

const startCountdown = () => {
  countdown.value = props.codeCountdown
  codeDisabled.value = true
  
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      codeDisabled.value = false
    }
  }, 1000)
}

const getCode = () => {
  if (codeDisabled.value) return
  
  if (!validatePhone()) return
  
  emit('getCode', {
    phone: formData.value.phone,
    callback: (success) => {
      if (success) {
        startCountdown()
      }
    }
  })
}

const onLogin = () => {
  if (!canLogin.value) return
  
  let isValid = true
  
  if (loginType.value === 'password') {
    isValid = validateAccount() && validatePassword()
  } else {
    isValid = validatePhone() && validateCode()
  }
  
  if (!isValid) return
  
  const loginData = {
    type: loginType.value,
    data: loginType.value === 'password' 
      ? { account: formData.value.account, password: formData.value.password }
      : { phone: formData.value.phone, code: formData.value.code }
  }
  
  emit('login', loginData)
}

const onForgetPassword = () => {
  emit('forgetPassword')
}

const onProtocolClick = () => {
  emit('protocolClick')
}

// 监听登录类型变化
watch(() => props.defaultLoginType, (newType) => {
  loginType.value = newType
}, { immediate: true })
</script>

<style lang="scss" scoped>
.zx-login {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
  background: #fff;
  min-height: 100vh;
  box-sizing: border-box;

  &__logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 60rpx 0 40rpx;

    &-img {
      width: 160rpx;
      height: 160rpx;
      border-radius: 16rpx;
    }

    &-default {
      width: 160rpx;
      height: 160rpx;
      background: #f5f5f5;
      border-radius: 16rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &-text {
      font-size: 32rpx;
      font-weight: bold;
      color: #666;
    }
  }

  &__title {
    text-align: center;
    margin-bottom: 60rpx;

    &-text {
      font-size: 48rpx;
      font-weight: bold;
      color: #333;
    }
  }

  &__form {
    flex: 1;
  }

  &__input-wrap {
    margin-bottom: 40rpx;
    transition: all 0.2s;

    &.error {
      margin-bottom: 60rpx;
    }
  }

  &__input-item {
    display: flex;
    align-items: center;
    min-height: 90rpx;
    border: 2rpx solid #e3e3e3;
    border-radius: 8rpx;
    overflow: hidden;
    background: #fff;
    position: relative;
  }

  &__input {
    flex: 1;
    padding: 0 30rpx;
    font-size: 32rpx;
    color: #333;
    background: transparent;
    border: none;
    outline: none;

    &::placeholder {
      color: #999;
    }
  }

  &__hide-icon {
    width: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 20rpx;
  }

  &__icon {
    font-size: 32rpx;
  }

  &__code-box {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 200rpx;
    padding: 0 20rpx;
    color: #007aff;
    font-size: 28rpx;
    border-left: 2rpx solid #e3e3e3;
    cursor: pointer;

    &.disabled {
      color: #ccc;
      cursor: not-allowed;
    }

    &-text {
      text-align: center;
    }
  }

  &__error-msg {
    position: absolute;
    bottom: -40rpx;
    left: 30rpx;
    font-size: 24rpx;
    color: #ff4757;
  }

  &__forget {
    text-align: right;
    margin-bottom: 40rpx;

    &-text {
      font-size: 28rpx;
      color: #007aff;
    }
  }

  &__protocol {
    margin-bottom: 40rpx;

    &-text {
      font-size: 24rpx;
      color: #666;
    }

    &-link {
      color: #007aff;
    }
  }

  &__checkbox {
    display: flex;
    align-items: center;

    &-icon {
      font-size: 32rpx;
      margin-right: 16rpx;
      color: #007aff;
    }
  }

  &__btn {
    margin-bottom: 40rpx;

    &-primary {
      width: 100%;
      height: 90rpx;
      background: #007aff;
      color: #fff;
      border: none;
      border-radius: 8rpx;
      font-size: 32rpx;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;

      &.disabled {
        background: #d8d8d8;
        color: #999;
      }

      &::after {
        border: none;
      }
    }
  }

  &__switch {
    text-align: center;

    &-text {
      font-size: 28rpx;
      color: #007aff;
    }
  }
}

/* 暗黑模式支持 */
@media (prefers-color-scheme: dark) {
  .zx-login {
    background: #1a1a1a;
    color: #fff;

    &__title-text {
      color: #fff;
    }

    &__input-item {
      border-color: #333;
      background: #2a2a2a;
    }

    &__input {
      color: #fff;

      &::placeholder {
        color: #666;
      }
    }

    &__code-box {
      border-left-color: #333;
    }

    &__logo-default {
      background: #2a2a2a;
    }

    &__logo-text {
      color: #999;
    }
  }
}
</style>