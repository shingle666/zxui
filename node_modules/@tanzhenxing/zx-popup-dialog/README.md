# zx-popup-dialog 弹窗对话框

基于 zx-popup 的对话框组件，支持基础对话框和输入对话框两种模式，兼容 H5、小程序和 App 平台。

## 特性

- 🎨 支持多种主题样式（success、warning、info、error）
- 📝 支持基础对话框和输入对话框两种模式
- 🎯 支持自定义标题、内容和按钮文字
- 🔒 支持拦截确认/取消操作
- 📱 完美适配 H5、小程序和 App 平台
- 🎭 支持插槽自定义内容
- ⌨️ 输入模式支持多种输入类型和长度限制

## 基本用法

### 基础对话框

```vue
<template>
  <view>
    <zx-button @click="showDialog = true">显示对话框</zx-button>
    
    <zx-popup-dialog
      v-model:show="showDialog"
      title="提示"
      content="这是一个基础对话框"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showDialog = ref(false)

const onConfirm = () => {
  console.log('确认')
}

const onCancel = () => {
  console.log('取消')
}
</script>
```

### 输入对话框

```vue
<template>
  <view>
    <zx-button @click="showInputDialog = true">显示输入对话框</zx-button>
    
    <zx-popup-dialog
      v-model:show="showInputDialog"
      v-model="inputValue"
      mode="input"
      title="请输入"
      placeholder="请输入内容"
      @confirm="onInputConfirm"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showInputDialog = ref(false)
const inputValue = ref('')

const onInputConfirm = (value) => {
  console.log('输入的内容：', value)
}
</script>
```

### 不同主题样式

```vue
<template>
  <view>
    <!-- 成功样式 -->
    <zx-popup-dialog
      v-model:show="successDialog"
      type="success"
      title="成功"
      content="操作成功！"
      :show-cancel="false"
    />
    
    <!-- 警告样式 -->
    <zx-popup-dialog
      v-model:show="warningDialog"
      type="warning"
      title="警告"
      content="请确认您的操作"
    />
    
    <!-- 错误样式 -->
    <zx-popup-dialog
      v-model:show="errorDialog"
      type="error"
      title="错误"
      content="操作失败，请重试"
    />
  </view>
</template>
```

### 自定义内容

```vue
<template>
  <zx-popup-dialog v-model:show="customDialog">
    <template #title>
      <view class="custom-title">
        <zx-icon name="star" />
        <text>自定义标题</text>
      </view>
    </template>
    
    <view class="custom-content">
      <text>这是自定义的内容区域</text>
      <zx-image src="/static/image.png" />
    </view>
  </zx-popup-dialog>
</template>
```

### 拦截确认操作

```vue
<template>
  <zx-popup-dialog
    v-model:show="interceptDialog"
    title="确认删除"
    content="删除后无法恢复，确定要删除吗？"
    :before-close="true"
    @confirm="handleDelete"
    @cancel="interceptDialog = false"
  />
</template>

<script setup>
import { ref } from 'vue'

const interceptDialog = ref(false)

const handleDelete = async () => {
  try {
    // 执行删除操作
    await deleteData()
    interceptDialog.value = false
    uni.showToast({ title: '删除成功' })
  } catch (error) {
    uni.showToast({ title: '删除失败', icon: 'error' })
  }
}
</script>
```

## API

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| show | Boolean | false | 是否显示弹窗 |
| title | String | '提示' | 弹窗标题 |
| content | String | '' | 弹窗内容 |
| type | String | 'info' | 弹窗类型，可选值：success/warning/info/error |
| mode | String | 'base' | 弹窗模式，可选值：base/input |
| show-cancel | Boolean | true | 是否显示取消按钮 |
| confirm-text | String | '确定' | 确认按钮文字 |
| cancel-text | String | '取消' | 取消按钮文字 |
| before-close | Boolean | false | 是否在确认前拦截 |
| model-value | String/Number | '' | 输入框的值（仅 input 模式） |
| placeholder | String | '请输入内容' | 输入框占位符（仅 input 模式） |
| input-type | String | 'text' | 输入框类型（仅 input 模式） |
| maxlength | Number | -1 | 输入框最大长度（仅 input 模式） |
| focus | Boolean | true | 是否自动聚焦（仅 input 模式） |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:show | 弹窗显示状态改变时触发 | show: Boolean |
| update:modelValue | 输入框值改变时触发（仅 input 模式） | value: String/Number |
| confirm | 点击确认按钮时触发 | value?: String/Number（input 模式下返回输入值） |
| cancel | 点击取消按钮时触发 | - |
| change | 弹窗状态改变时触发 | { show: Boolean } |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| open | 打开弹窗 | - |
| close | 关闭弹窗 | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义内容区域 |
| title | 自定义标题区域 |

## 主题定制

组件支持通过 CSS 变量进行主题定制：

```scss
.zx-popup-dialog {
  --dialog-width: 300px;
  --dialog-border-radius: 12px;
  --dialog-background: #fff;
  --title-font-size: 16px;
  --title-font-weight: 500;
  --content-font-size: 14px;
  --button-height: 50px;
  --button-font-size: 16px;
  --primary-color: #007aff;
  --success-color: #4cd964;
  --warning-color: #f0ad4e;
  --error-color: #dd524d;
  --info-color: #909399;
}
```

## 注意事项

1. 组件依赖 `zx-popup` 组件，请确保已正确引入
2. 在小程序中使用时，建议在页面的 `onReady` 生命周期中操作弹窗
3. `before-close` 为 `true` 时，需要手动控制弹窗的关闭
4. 输入模式下，可以通过 `v-model` 双向绑定输入值
5. 组件已适配各平台的安全区域，无需额外处理

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础对话框和输入对话框
- 支持多种主题样式
- 支持自定义内容和按钮
- 完美适配多平台