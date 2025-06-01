# zx-invoice-title-edit 发票抬头编辑

发票抬头编辑组件，支持个人和企业发票信息的录入和编辑。

## 特性

- 支持个人和企业两种发票类型
- 智能表单验证，根据发票类型动态调整必填项
- 支持设置默认发票抬头
- 完整的表单验证和错误提示
- 支持自定义按钮文字和状态
- 兼容 H5、小程序、APP 多端

## 基础用法

```vue
<template>
  <zx-invoice-title-edit 
    v-model="invoiceData"
    @submit="handleSubmit"
    @cancel="handleCancel"
  />
</template>

<script setup>
import { ref } from 'vue'

const invoiceData = ref({
  type: 'personal',
  title: '',
  taxNumber: '',
  isDefault: false
})

const handleSubmit = (data) => {
  console.log('提交数据:', data)
}

const handleCancel = () => {
  console.log('取消操作')
}
</script>
```

## 编辑模式

```vue
<template>
  <zx-invoice-title-edit 
    v-model="invoiceData"
    :is-edit="true"
    submit-text="更新"
    @submit="handleUpdate"
  />
</template>

<script setup>
import { ref } from 'vue'

const invoiceData = ref({
  id: '1',
  type: 'company',
  title: '北京某某科技有限公司',
  taxNumber: '91110000123456789X',
  address: '北京市朝阳区某某街道123号',
  phone: '010-12345678',
  bankName: '中国银行北京分行',
  bankAccount: '1234567890123456789',
  isDefault: true
})

const handleUpdate = (data) => {
  console.log('更新数据:', data)
}
</script>
```

## 自定义发票类型

```vue
<template>
  <zx-invoice-title-edit 
    v-model="invoiceData"
    :invoice-types="customTypes"
    @submit="handleSubmit"
  />
</template>

<script setup>
import { ref } from 'vue'

const invoiceData = ref({})

const customTypes = [
  { label: '个人', value: 'personal' },
  { label: '企业', value: 'company' },
  { label: '事业单位', value: 'institution', disabled: true }
]

const handleSubmit = (data) => {
  console.log('提交数据:', data)
}
</script>
```

## 隐藏底部按钮

```vue
<template>
  <zx-invoice-title-edit 
    v-model="invoiceData"
    :hide-footer="true"
    ref="editRef"
  />
  
  <view class="custom-footer">
    <zx-button @click="handleCustomSubmit">自定义提交</zx-button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const invoiceData = ref({})
const editRef = ref(null)

const handleCustomSubmit = async () => {
  try {
    await editRef.value.validate()
    console.log('验证通过:', editRef.value.formData)
  } catch (error) {
    console.log('验证失败:', error)
  }
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 表单数据，支持 v-model | Object | `{}` |
| invoice-types | 发票类型选项 | Array | `[{label:'个人',value:'personal'},{label:'企业',value:'company'}]` |
| hide-footer | 是否隐藏底部按钮 | Boolean | `false` |
| hide-cancel | 是否隐藏取消按钮 | Boolean | `false` |
| cancel-text | 取消按钮文字 | String | `'取消'` |
| submit-text | 提交按钮文字 | String | `'保存'` |
| submit-loading | 提交按钮加载状态 | Boolean | `false` |
| is-edit | 是否编辑模式 | Boolean | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 表单数据更新时触发 | `(value: Object)` |
| submit | 点击提交按钮且验证通过时触发 | `(data: Object)` |
| cancel | 点击取消按钮时触发 | `()` |
| change | 表单数据变化时触发 | `(data: Object)` |

### Methods

通过 ref 可以获取到组件实例并调用下述方法：

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| validate | 验证表单 | `()` | `Promise` |
| resetForm | 重置表单 | `()` | `void` |
| clearValidate | 清除验证状态 | `()` | `void` |

### 数据结构

#### InvoiceData

```typescript
interface InvoiceData {
  id?: string | number          // 发票抬头ID（编辑时）
  type: 'personal' | 'company'  // 发票类型：personal-个人，company-企业
  title: string                 // 发票抬头
  taxNumber?: string            // 纳税人识别号（企业发票必填）
  address?: string              // 注册地址（企业发票）
  phone?: string                // 注册电话（企业发票）
  bankName?: string             // 开户银行（企业发票）
  bankAccount?: string          // 银行账号（企业发票）
  isDefault: boolean            // 是否默认
}
```

#### InvoiceType

```typescript
interface InvoiceType {
  label: string     // 显示文字
  value: string     // 选项值
  disabled?: boolean // 是否禁用
}
```

## 样式变量

组件提供了以下 CSS 变量，可用于自定义样式：

```scss
:root {
  --zx-invoice-title-edit-bg-color: #fff;
  --zx-invoice-title-edit-footer-border-color: #ebedf0;
  --zx-invoice-title-edit-label-color: #323233;
  --zx-invoice-title-edit-input-border-color: #ebedf0;
  --zx-invoice-title-edit-input-bg-color: #fafafa;
  --zx-invoice-title-edit-input-focus-border-color: #1989fa;
  --zx-invoice-title-edit-input-focus-bg-color: #fff;
}
```

## 注意事项

1. 企业发票类型时，纳税人识别号为必填项，且会进行格式验证
2. 个人发票类型时，企业相关字段（地址、电话、银行信息）会被自动清空
3. 纳税人识别号支持15-20位的大写字母和数字组合
4. 组件内部使用了 `zx-form`、`zx-input`、`zx-radio`、`zx-switch`、`zx-button` 等基础组件
5. 支持表单验证，提交前会自动进行数据校验

## 更新日志

### v1.0.0

- 初始版本
- 支持个人和企业发票类型
- 完整的表单验证功能
- 支持多端兼容