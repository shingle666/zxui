# zx-code 验证码倒计时组件

一个功能完善的验证码倒计时组件，支持自定义UI、页面刷新继续倒计时等功能。

## 功能特性

- ✅ 倒计时功能，支持自定义倒计时秒数
- ✅ 自定义文字提示（开始前、倒计时中、结束后）
- ✅ 页面刷新或返回后继续倒计时（keepRunning）
- ✅ 支持暂停和恢复倒计时
- ✅ 支持禁用状态
- ✅ 支持自动开始倒计时
- ✅ 提供插槽自定义UI界面
- ✅ 完善的错误处理和状态管理
- ✅ TypeScript 类型支持

## 基础用法

### 1. 默认使用
```vue
<template>
  <zx-code 
    ref="codeRef"
    @start="handleStart"
    @end="handleEnd"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const codeRef = ref()

const handleStart = () => {
  console.log('开始倒计时')
  // 这里可以调用发送验证码的API
}

const handleEnd = () => {
  console.log('倒计时结束')
}

const handleChange = (text) => {
  console.log('文字变化:', text)
}
</script>
```

### 2. 自定义配置
```vue
<template>
  <zx-code 
    :seconds="120"
    start-text="发送验证码"
    change-text="X秒后可重发"
    end-text="重新发送"
    :keep-running="true"
    unique-key="login_code"
    @start="sendSms"
  />
</template>
```

### 3. 自定义UI界面
```vue
<template>
  <zx-code 
    :seconds="60"
    @start="sendCode"
  >
    <template #default="{ text, canGetCode, start }">
      <view 
        :class="['custom-btn', { disabled: !canGetCode }]"
        @click="start"
      >
        {{ text }}
      </view>
    </template>
  </zx-code>
</template>

<style>
.custom-btn {
  padding: 10px 20px;
  background: linear-gradient(45deg, #007aff, #00d4ff);
  color: white;
  border-radius: 20px;
  text-align: center;
}

.custom-btn.disabled {
  background: #cccccc;
  cursor: not-allowed;
}
</style>
```

### 4. 手动控制倒计时
```vue
<template>
  <view>
    <zx-code ref="codeRef" :auto-start="false" />
    
    <button @click="startTimer">开始倒计时</button>
    <button @click="pauseTimer">暂停</button>
    <button @click="resumeTimer">恢复</button>
    <button @click="resetTimer">重置</button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const codeRef = ref()

const startTimer = () => {
  codeRef.value.start()
}

const pauseTimer = () => {
  codeRef.value.pause()
}

const resumeTimer = () => {
  codeRef.value.resume()
}

const resetTimer = () => {
  codeRef.value.reset()
}

// 获取当前状态
const getStatus = () => {
  const status = codeRef.value.getStatus()
  console.log('当前状态:', status)
}
</script>
```

## API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| seconds | String \| Number | 60 | 倒计时总秒数 |
| startText | String | '获取验证码' | 开始前的提示文字 |
| changeText | String | 'X秒后重试' | 倒计时中的提示文字模板，X会被替换为剩余秒数 |
| endText | String | '重新获取' | 倒计时结束的提示文字 |
| keepRunning | Boolean | false | 是否在页面刷新或返回时继续倒计时 |
| uniqueKey | String | 'zx_code_timer' | 本地存储的唯一标识，用于区分多个倒计时 |
| autoStart | Boolean | false | 是否自动开始倒计时 |
| disabled | Boolean | false | 是否禁用组件 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| start | 开始倒计时时触发 | - |
| end | 结束倒计时时触发 | - |
| change | 倒计时文字变化时触发 | text: 当前显示的文字 |
| tick | 每秒倒计时触发 | remainingTime: 剩余秒数 |

### Methods

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|-------|
| start() | 开始倒计时 | - | Boolean: 是否成功开始 |
| reset() | 重置倒计时 | - | - |
| pause() | 暂停倒计时 | - | - |
| resume() | 恢复倒计时 | - | - |
| end() | 结束倒计时 | - | - |
| getStatus() | 获取当前状态 | - | Object: 状态信息 |

### Slots

| 插槽名 | 说明 | 插槽参数 |
|--------|------|----------|
| default | 自定义UI界面 | { text, canGetCode, start, reset } |

### 状态对象

`getStatus()` 方法返回的状态对象包含：

```typescript
{
  canGetCode: boolean,      // 是否可以获取验证码
  remainingTime: number,    // 剩余时间（秒）
  currentText: string,      // 当前显示文字
  isRunning: boolean        // 是否正在倒计时
}
```

## 使用场景

1. **登录注册页面** - 发送手机验证码
2. **找回密码页面** - 发送邮箱验证码
3. **绑定手机号** - 验证新手机号
4. **支付验证** - 发送安全验证码
5. **其他需要验证码的场景**

## 注意事项

1. 如果启用 `keepRunning`，确保 `uniqueKey` 在不同页面或组件中是唯一的
2. 组件会自动处理页面销毁时的资源清理
3. 倒计时期间禁用状态会自动暂停倒计时
4. 建议在 `start` 事件中调用发送验证码的API
5. 支持小程序、H5、App端的本地存储

## 更新日志

### v2.0.0
- 🎉 重构组件，提供完整的UI界面
- ✨ 新增暂停和恢复功能
- ✨ 新增自动开始和禁用状态
- ✨ 新增错误处理和状态管理
- ✨ 新增 tick 事件，每秒返回剩余时间
- 🐛 修复本地存储相关bug
- 💄 优化代码结构和性能
