# zx-receive-invoice-edit 收票编辑

收票编辑组件，用于编辑和管理发票抬头信息，支持个人和企业发票类型。

## 特性

- 🎯 支持个人和企业发票类型
- 📝 完整的表单验证
- 🔧 灵活的配置选项
- 📱 响应式设计，支持 H5、小程序、APP
- 🎨 美观的 UI 设计
- ⚡ 高性能，基于 Vue 3 Composition API

## 基础用法

```vue
<template>
  <zx-receive-invoice-edit
    :invoice-info="invoiceInfo"
    @save="onSave"
    @change="onChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const invoiceInfo = ref({
  type: 'personal',
  title: '张三',
  isDefault: false
})

const onSave = (data) => {
  console.log('保存发票信息:', data)
}

const onChange = (data) => {
  console.log('发票信息变化:', data)
}
</script>
```

## 企业发票

```vue
<template>
  <zx-receive-invoice-edit
    :invoice-info="companyInvoice"
    @save="onSave"
  />
</template>

<script setup>
const companyInvoice = ref({
  type: 'company',
  title: '北京科技有限公司',
  taxNumber: '91110000123456789X',
  address: '北京市朝阳区xxx街道xxx号',
  phone: '010-12345678',
  bank: '中国银行北京分行',
  account: '1234567890123456789',
  isDefault: true
})

const onSave = (data) => {
  // 保存企业发票信息
  console.log('保存企业发票:', data)
}
</script>
```

## 自定义发票类型

```vue
<template>
  <zx-receive-invoice-edit
    :invoice-types="customTypes"
    :invoice-info="invoiceInfo"
    @save="onSave"
  />
</template>

<script setup>
const customTypes = [
  { label: '个人', value: 'personal' },
  { label: '企业', value: 'company' },
  { label: '专用发票', value: 'special', disabled: false }
]

const invoiceInfo = ref({
  type: 'special',
  title: '特殊发票抬头'
})
</script>
```

## 编辑模式

```vue
<template>
  <zx-receive-invoice-edit
    :invoice-info="editInvoice"
    :show-delete="true"
    save-button-text="更新"
    delete-button-text="删除发票"
    @save="onUpdate"
    @delete="onDelete"
  />
</template>

<script setup>
const editInvoice = ref({
  id: 1,
  type: 'company',
  title: '现有企业名称',
  taxNumber: '91110000123456789X'
})

const onUpdate = (data) => {
  console.log('更新发票:', data)
}

const onDelete = (data) => {
  console.log('删除发票:', data)
}
</script>
```

## 表单验证

```vue
<template>
  <zx-receive-invoice-edit
    ref="invoiceEditRef"
    :invoice-info="invoiceInfo"
    hide-buttons
  />
  
  <view class="custom-buttons">
    <zx-button @click="handleSave">自定义保存</zx-button>
    <zx-button @click="handleReset">重置表单</zx-button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const invoiceEditRef = ref(null)

const handleSave = async () => {
  try {
    const valid = await invoiceEditRef.value.validate()
    if (valid) {
      const data = invoiceEditRef.value.getFormData()
      console.log('表单数据:', data)
    }
  } catch (error) {
    console.log('验证失败:', error)
  }
}

const handleReset = () => {
  invoiceEditRef.value.resetForm()
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| invoice-info | 发票信息 | Object | `{}` |
| invoice-types | 发票类型选项 | Array | `[{label: '个人', value: 'personal'}, {label: '企业', value: 'company'}]` |
| show-set-default | 是否显示设为默认选项 | Boolean | `true` |
| show-delete | 是否显示删除按钮 | Boolean | `false` |
| hide-buttons | 是否隐藏操作按钮 | Boolean | `false` |
| save-button-text | 保存按钮文本 | String | `'保存'` |
| delete-button-text | 删除按钮文本 | String | `'删除'` |
| is-saving | 保存加载状态 | Boolean | `false` |
| is-deleting | 删除加载状态 | Boolean | `false` |
| title-maxlength | 发票抬头最大长度 | Number/String | `100` |
| tax-number-maxlength | 税号最大长度 | Number/String | `20` |
| address-maxlength | 地址最大长度 | Number/String | `200` |
| phone-maxlength | 电话最大长度 | Number/String | `20` |
| bank-maxlength | 银行最大长度 | Number/String | `100` |
| account-maxlength | 账号最大长度 | Number/String | `30` |
| address-rows | 地址输入框行数 | Number/String | `2` |
| custom-class | 自定义类名 | String | `''` |
| custom-style | 自定义样式 | Object/String | `{}` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| save | 保存发票信息 | `(data: Object)` |
| delete | 删除发票信息 | `(data: Object)` |
| change | 发票信息变化 | `(data: Object)` |
| focus | 输入框获得焦点 | `(field: String)` |
| blur | 输入框失去焦点 | `(field: String)` |
| type-change | 发票类型变化 | `(type: String)` |

### Methods

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| validate | 验证表单 | - | `Promise<Boolean>` |
| resetForm | 重置表单 | - | - |
| getFormData | 获取表单数据 | - | `Object` |
| setFormData | 设置表单数据 | `(data: Object)` | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义内容，插入到表单中间位置 |

## 数据结构

### InvoiceInfo

```typescript
interface InvoiceInfo {
  type: 'personal' | 'company'  // 发票类型
  title: string                 // 发票抬头
  taxNumber?: string           // 纳税人识别号（企业必填）
  address?: string             // 注册地址
  phone?: string               // 注册电话
  bank?: string                // 开户银行
  account?: string             // 银行账号
  isDefault?: boolean          // 是否默认
}
```

### InvoiceType

```typescript
interface InvoiceType {
  label: string     // 显示文本
  value: string     // 值
  disabled?: boolean // 是否禁用
}
```

## 样式变量

组件提供了丰富的 CSS 变量用于自定义样式：

```scss
.zx-receive-invoice-edit {
  --zx-invoice-edit-bg-color: #f8f9fa;
  --zx-invoice-edit-section-bg: #fff;
  --zx-invoice-edit-section-margin: 20rpx;
  --zx-invoice-edit-padding: 32rpx;
  --zx-invoice-edit-label-color: #323233;
  --zx-invoice-edit-label-size: 28rpx;
  --zx-invoice-edit-input-size: 28rpx;
  --zx-invoice-edit-placeholder-color: #c8c9cc;
  --zx-invoice-edit-button-height: 88rpx;
  --zx-invoice-edit-button-size: 32rpx;
}
```

## 注意事项

1. **税号验证**：企业发票的纳税人识别号会进行格式验证，要求15-20位字母数字组合
2. **表单验证**：组件内置了完整的表单验证，包括必填项和格式验证
3. **响应式设计**：组件适配了不同屏幕尺寸，在各端都有良好的显示效果
4. **性能优化**：使用了 Vue 3 的响应式系统，确保高性能渲染

## 常见问题

### Q: 如何自定义验证规则？

A: 可以通过监听 `change` 事件，在外部进行额外的验证逻辑。

### Q: 如何实现异步保存？

A: 在 `save` 事件处理函数中使用 `async/await` 进行异步操作，并通过 `is-saving` 属性控制加载状态。

### Q: 如何集成到现有表单系统？

A: 可以设置 `hide-buttons` 为 `true`，然后使用组件的 `validate` 和 `getFormData` 方法集成到外部表单系统。