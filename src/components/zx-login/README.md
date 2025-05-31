# zx-login 登录组件

一个功能完整的登录组件，支持账号密码登录和手机验证码登录两种方式，兼容 H5、小程序和 App 平台。

## 特性

- 🔐 支持账号密码登录和手机验证码登录
- 📱 完美兼容 H5、小程序、App 三端
- 🎨 美观的 UI 设计，支持暗黑模式
- ✅ 完整的表单验证
- 🔄 登录方式切换
- 📋 用户协议勾选
- 🕒 验证码倒计时
- 🎯 丰富的自定义配置

## 安装使用

### 基础用法

```vue
<template>
  <zx-login
    @login="handleLogin"
    @getCode="handleGetCode"
    @forgetPassword="handleForgetPassword"
    @protocolClick="handleProtocolClick"
  />
</template>

<script setup>
const handleLogin = (data) => {
  console.log('登录数据:', data)
  // data.type: 'password' | 'sms'
  // data.data: 登录表单数据
}

const handleGetCode = (data) => {
  console.log('获取验证码:', data.phone)
  // 调用获取验证码接口
  // 成功后调用 data.callback(true) 开始倒计时
  data.callback(true)
}

const handleForgetPassword = () => {
  console.log('忘记密码')
}

const handleProtocolClick = () => {
  console.log('查看用户协议')
}
</script>
```

### 自定义配置

```vue
<template>
  <zx-login
    :show-logo="true"
    logo-url="/static/logo.png"
    title="欢迎登录"
    :default-login-type="'sms'"
    :show-switch="true"
    :show-forget-password="false"
    :show-protocol="true"
    account-placeholder="请输入用户名"
    password-placeholder="请输入登录密码"
    phone-placeholder="请输入手机号码"
    code-placeholder="请输入短信验证码"
    login-button-text="立即登录"
    protocol-text="《服务条款》和《隐私协议》"
    :code-countdown="120"
    custom-class="my-login"
    :custom-style="{ background: '#f5f5f5' }"
    @login="handleLogin"
    @getCode="handleGetCode"
    @forgetPassword="handleForgetPassword"
    @protocolClick="handleProtocolClick"
    @switchType="handleSwitchType"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| customClass | 自定义样式类名 | String | '' |
| customStyle | 自定义样式对象 | Object | {} |
| showLogo | 是否显示 Logo | Boolean | true |
| logoUrl | Logo 图片地址 | String | '' |
| logoText | Logo 文字（logoUrl 为空时显示） | String | 'LOGO' |
| title | 登录标题 | String | '用户登录' |
| defaultLoginType | 默认登录方式 | String | 'password' |
| showSwitch | 是否显示登录方式切换 | Boolean | true |
| showForgetPassword | 是否显示忘记密码 | Boolean | true |
| showProtocol | 是否显示用户协议 | Boolean | true |
| accountPlaceholder | 账号输入框占位符 | String | '请输入账号' |
| passwordPlaceholder | 密码输入框占位符 | String | '请输入密码' |
| phonePlaceholder | 手机号输入框占位符 | String | '请输入手机号' |
| codePlaceholder | 验证码输入框占位符 | String | '请输入验证码' |
| loginButtonText | 登录按钮文字 | String | '登录' |
| forgetPasswordText | 忘记密码文字 | String | '忘记密码？' |
| switchToSmsText | 切换到短信登录文字 | String | '手机验证码登录' |
| switchToPasswordText | 切换到密码登录文字 | String | '账号密码登录' |
| protocolText | 用户协议文字 | String | '《用户协议》和《隐私政策》' |
| codeCountdown | 验证码倒计时秒数 | Number | 60 |

### defaultLoginType 可选值

| 值 | 说明 |
|----|----- |
| password | 账号密码登录 |
| sms | 手机验证码登录 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| login | 点击登录按钮时触发 | (data: LoginData) |
| getCode | 点击获取验证码时触发 | (data: GetCodeData) |
| forgetPassword | 点击忘记密码时触发 | - |
| protocolClick | 点击用户协议时触发 | - |
| switchType | 切换登录方式时触发 | (type: string) |

### LoginData 类型

```typescript
interface LoginData {
  type: 'password' | 'sms'  // 登录方式
  data: {
    // 账号密码登录
    account?: string
    password?: string
    // 手机验证码登录
    phone?: string
    code?: string
  }
}
```

### GetCodeData 类型

```typescript
interface GetCodeData {
  phone: string  // 手机号
  callback: (success: boolean) => void  // 回调函数，传入 true 开始倒计时
}
```

## 表单验证规则

### 账号验证
- 必填
- 长度不少于 3 位

### 密码验证
- 必填
- 长度不少于 6 位

### 手机号验证
- 必填
- 符合中国大陆手机号格式（1开头的11位数字）

### 验证码验证
- 必填
- 6位数字

## 样式自定义

组件使用 BEM 命名规范，可以通过以下类名进行样式自定义：

```scss
.zx-login {
  // 主容器
  
  &__logo {
    // Logo 区域
    
    &-img {
      // Logo 图片
    }
    
    &-default {
      // 默认 Logo 容器
    }
    
    &-text {
      // Logo 文字
    }
  }
  
  &__title {
    // 标题区域
    
    &-text {
      // 标题文字
    }
  }
  
  &__form {
    // 表单区域
  }
  
  &__input-wrap {
    // 输入框包装器
    
    &.error {
      // 错误状态
    }
  }
  
  &__input-item {
    // 输入框容器
  }
  
  &__input {
    // 输入框
  }
  
  &__hide-icon {
    // 密码显示/隐藏图标
  }
  
  &__code-box {
    // 验证码按钮
    
    &.disabled {
      // 禁用状态
    }
  }
  
  &__error-msg {
    // 错误信息
  }
  
  &__forget {
    // 忘记密码
  }
  
  &__protocol {
    // 用户协议
  }
  
  &__checkbox {
    // 复选框
  }
  
  &__btn {
    // 按钮区域
    
    &-primary {
      // 主要按钮
      
      &.disabled {
        // 禁用状态
      }
    }
  }
  
  &__switch {
    // 切换区域
  }
}
```

## 暗黑模式

组件内置了暗黑模式支持，会自动根据系统设置切换主题。

## 注意事项

1. 组件使用 Vue 3 Composition API 开发，需要 Vue 3.0+ 版本
2. 组件避免使用浏览器特有的 DOM API，确保跨平台兼容性
3. 验证码倒计时使用 `setInterval`，组件销毁时会自动清理
4. 表单验证在输入时和失焦时触发，确保用户体验
5. 所有文案都支持自定义，方便国际化

## 更新日志

### v1.0.0
- 初始版本发布
- 支持账号密码登录和手机验证码登录
- 完整的表单验证
- 支持暗黑模式
- 跨平台兼容