# zx-order-cancel-panel 订单取消面板

`zx-order-cancel-panel` 是一个用于订单取消的底部弹出面板组件，提供了取消原因选择和自定义输入功能。

## 特性

- 支持多种取消原因选择
- 支持自定义其他原因输入
- 支持点击遮罩关闭
- 支持加载状态显示
- 支持暗黑模式适配
- 兼容 H5、小程序、APP 多端
- 流畅的动画效果
- 安全区域适配

## 使用方法

```vue
<template>
  <view>
    <zx-button @click="showPanel = true">取消订单</zx-button>
    
    <zx-order-cancel-panel
      v-model="showPanel"
      :reason-list="reasonList"
      :loading="loading"
      @confirm="handleConfirm"
      @cancel="handleCancel"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showPanel = ref(false)
const loading = ref(false)

const reasonList = [
  { text: '我不想要了', value: 'dont_want' },
  { text: '信息填写错误，重新拍', value: 'info_error' },
  { text: '卖家缺货', value: 'out_of_stock' },
  { text: '同城买到更便宜的', value: 'cheaper_local' },
  { text: '其他原因', value: 'other' }
]

const handleConfirm = (result) => {
  console.log('取消原因:', result)
  loading.value = true
  
  // 模拟API调用
  setTimeout(() => {
    loading.value = false
    showPanel.value = false
    // 处理取消订单逻辑
  }, 2000)
}

const handleCancel = () => {
  console.log('用户取消操作')
}
</script>
```

## 属性说明

### 基础属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue / v-model | Boolean | false | 是否显示面板 |
| title | String | '取消订单' | 面板标题 |
| subtitle | String | '请选择取消原因' | 副标题 |
| reasonList | Array | 见下方说明 | 取消原因列表 |
| otherPlaceholder | String | '请输入其他取消原因...' | 其他原因输入框占位符 |
| maxLength | Number | 200 | 其他原因最大输入长度 |
| showCount | Boolean | true | 是否显示字数统计 |

### 按钮相关属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| cancelText | String | '取消' | 取消按钮文字 |
| confirmText | String | '确认取消' | 确认按钮文字 |
| loading | Boolean | false | 是否显示加载状态 |

### 行为属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| closeOnClickOverlay | Boolean | true | 点击遮罩是否关闭面板 |
| zIndex | Number | 1000 | 面板层级 |
| primaryColor | String | '#007aff' | 主题色 |

### reasonList 数据结构

```javascript
const reasonList = [
  {
    text: '显示文本',    // 必需，显示给用户的文本
    value: '值'         // 必需，用于标识的值
  }
]
```

**默认取消原因列表：**

```javascript
[
  { text: '我不想要了', value: 'dont_want' },
  { text: '信息填写错误，重新拍', value: 'info_error' },
  { text: '卖家缺货', value: 'out_of_stock' },
  { text: '同城买到更便宜的', value: 'cheaper_local' },
  { text: '其他原因', value: 'other' }
]
```

**注意：** 当 `value` 为 `'other'` 时，会自动显示文本输入框供用户输入自定义原因。

## 事件说明

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 面板显示状态改变时触发 | (value: boolean) |
| confirm | 点击确认按钮时触发 | (result: ConfirmResult) |
| cancel | 点击取消按钮时触发 | - |
| close | 面板关闭时触发 | - |
| reason-change | 选择原因改变时触发 | (data: ReasonChangeData) |

### ConfirmResult 数据结构

```typescript
interface ConfirmResult {
  index: number;           // 选中的原因索引
  reason: ReasonItem;      // 选中的原因对象
  otherReason: string;     // 其他原因文本（仅当选择"其他原因"时有值）
}
```

### ReasonChangeData 数据结构

```typescript
interface ReasonChangeData {
  index: number;           // 选中的原因索引
  reason: ReasonItem;      // 选中的原因对象
  otherReason: string;     // 其他原因文本
}
```

## 使用示例

### 基础用法

```vue
<template>
  <zx-order-cancel-panel
    v-model="visible"
    @confirm="handleConfirm"
  />
</template>

<script setup>
const visible = ref(false)

const handleConfirm = (result) => {
  console.log('选择的取消原因:', result.reason.text)
  if (result.reason.value === 'other') {
    console.log('自定义原因:', result.otherReason)
  }
}
</script>
```

### 自定义取消原因

```vue
<template>
  <zx-order-cancel-panel
    v-model="visible"
    :reason-list="customReasons"
    @confirm="handleConfirm"
  />
</template>

<script setup>
const customReasons = [
  { text: '商品质量问题', value: 'quality_issue' },
  { text: '发货时间太长', value: 'delivery_delay' },
  { text: '价格变动', value: 'price_change' },
  { text: '其他原因', value: 'other' }
]
</script>
```

### 带加载状态

```vue
<template>
  <zx-order-cancel-panel
    v-model="visible"
    :loading="submitting"
    @confirm="handleConfirm"
  />
</template>

<script setup>
const visible = ref(false)
const submitting = ref(false)

const handleConfirm = async (result) => {
  submitting.value = true
  try {
    await cancelOrder(result)
    visible.value = false
    // 显示成功提示
  } catch (error) {
    // 显示错误提示
  } finally {
    submitting.value = false
  }
}
</script>
```

### 监听原因变化

```vue
<template>
  <zx-order-cancel-panel
    v-model="visible"
    @reason-change="handleReasonChange"
    @confirm="handleConfirm"
  />
</template>

<script setup>
const handleReasonChange = (data) => {
  console.log('当前选择:', data.reason.text)
  if (data.reason.value === 'other') {
    console.log('其他原因内容:', data.otherReason)
  }
}
</script>
```

## 样式定制

组件支持通过 CSS 变量进行样式定制：

```css
.zx-order-cancel-panel {
  --primary-color: #007aff;  /* 主题色 */
}
```

## 注意事项

1. **其他原因处理**：当取消原因的 `value` 为 `'other'` 时，组件会自动显示文本输入框
2. **表单验证**：选择"其他原因"时，必须输入文本内容才能确认
3. **安全区域**：组件底部已适配安全区域，无需额外处理
4. **暗黑模式**：组件已支持系统暗黑模式自动适配
5. **多端兼容**：组件使用 uni-app 标准语法，兼容 H5、小程序、APP

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础的订单取消功能
- 支持自定义取消原因
- 支持多端适配