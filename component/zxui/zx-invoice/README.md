# zx-invoice 发票组件

`zx-invoice` 是一个用于展示和处理发票申请页面的组件，支持多种表单项类型，包括输入框和单选按钮组。

## 特性

- 支持多种表单项类型：输入框、单选按钮组
- 内置表单验证功能
- 支持自定义提交按钮
- 支持表单重置和验证清除
- 完全兼容 H5、小程序、APP 平台
- 支持深色模式适配
- 响应式设计，适配不同屏幕尺寸

## 使用方法

```vue
<template>
  <zx-invoice
    :data="invoiceData"
    v-model:form-value="formData"
    :rules="formRules"
    @submit="handleSubmit"
  />
</template>

<script setup>
import { ref } from 'vue'
import ZxInvoice from '@/components/zx-invoice/zx-invoice.vue'

const formData = ref({
  type: '1',
  title: '',
  taxNumber: '',
  address: '',
  phone: ''
})

const invoiceData = ref([
  {
    type: 'radio',
    label: '发票类型',
    formItemProp: 'type',
    required: true,
    radioLabel: [
      { label: '个人', value: '1' },
      { label: '企业', value: '2' }
    ]
  },
  {
    type: 'input',
    label: '发票抬头',
    placeholder: '请输入发票抬头',
    formItemProp: 'title',
    required: true
  }
])

const formRules = ref({
  type: [{ required: true, message: '请选择发票类型' }],
  title: [{ required: true, message: '请输入发票抬头' }]
})

const handleSubmit = (result) => {
  if (result.valid) {
    console.log('提交成功', result.values)
  } else {
    console.log('验证失败', result.errors)
  }
}
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | Array | [] | 发票表单配置数据 |
| formValue | Object | {} | 表单数据对象，支持 v-model |
| rules | Object | {} | 表单验证规则 |
| submit | Boolean | true | 是否显示提交按钮 |
| submitText | String | '提交审批' | 提交按钮文字 |
| submitLoading | Boolean | false | 提交按钮加载状态 |
| labelPosition | String | 'left' | 表单标签位置，可选值：left、right、top |
| customStyle | String/Object | '' | 自定义样式 |

## Data 数据结构

每个表单项支持以下配置：

### 通用属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | String | 'input' | 表单项类型，可选值：input、radio |
| label | String | '' | 表单项标签 |
| formItemProp | String | '' | 表单域 v-model 字段名，必填 |
| required | Boolean | false | 是否必填 |
| rules | Array | [] | 验证规则 |
| disabled | Boolean | false | 是否禁用 |

### 输入框类型 (type: 'input')

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| placeholder | String | '' | 输入框占位符 |
| inputType | String | 'text' | 输入框类型，可选值：text、number、password 等 |
| maxlength | Number | -1 | 最大输入长度，-1 表示不限制 |
| clearable | Boolean | true | 是否显示清除按钮 |

### 单选按钮组类型 (type: 'radio')

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| radioLabel | Array | [] | 单选项配置数组 |

#### radioLabel 数组项结构

| 属性名 | 类型 | 说明 |
| --- | --- | --- |
| label | String | 显示文本 |
| value | String/Number | 选项值 |
| disabled | Boolean | 是否禁用该选项 |

## 事件说明

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| update:formValue | formValue | 表单数据更新时触发 |
| submit | { valid, values, errors? } | 提交表单时触发 |
| validate | { valid, values, errors? } | 表单验证时触发 |
| change | formValue | 表单数据变化时触发 |

## 方法说明

| 方法名 | 参数 | 返回值 | 说明 |
| --- | --- | --- | --- |
| validate | - | Promise | 验证整个表单 |
| resetFields | - | - | 重置表单 |
| clearValidate | props? | - | 清除验证信息 |

## 完整示例

```vue
<template>
  <view class="invoice-page">
    <zx-invoice
      ref="invoiceRef"
      :data="invoiceData"
      v-model:form-value="formData"
      :rules="formRules"
      :submit-loading="submitLoading"
      @submit="handleSubmit"
      @change="handleFormChange"
    />
    
    <view class="action-buttons" v-if="!showSubmitButton">
      <zx-button @click="handleReset">重置</zx-button>
      <zx-button type="primary" @click="handleValidate">验证</zx-button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ZxInvoice from '@/components/zx-invoice/zx-invoice.vue'

const invoiceRef = ref(null)
const submitLoading = ref(false)
const showSubmitButton = ref(true)

const formData = ref({
  type: '',
  title: '',
  taxNumber: '',
  address: '',
  phone: '',
  bankName: '',
  bankAccount: '',
  email: ''
})

const invoiceData = ref([
  {
    type: 'radio',
    label: '发票类型',
    formItemProp: 'type',
    required: true,
    radioLabel: [
      { label: '个人', value: '1' },
      { label: '企业', value: '2' }
    ]
  },
  {
    type: 'input',
    label: '发票抬头',
    placeholder: '请输入发票抬头',
    formItemProp: 'title',
    required: true,
    maxlength: 50
  },
  {
    type: 'input',
    label: '纳税人识别号',
    placeholder: '请输入纳税人识别号',
    formItemProp: 'taxNumber',
    required: true,
    maxlength: 20
  },
  {
    type: 'input',
    label: '注册地址',
    placeholder: '请输入注册地址',
    formItemProp: 'address',
    maxlength: 100
  },
  {
    type: 'input',
    label: '注册电话',
    placeholder: '请输入注册电话',
    formItemProp: 'phone',
    inputType: 'number',
    maxlength: 11
  },
  {
    type: 'input',
    label: '开户银行',
    placeholder: '请输入开户银行',
    formItemProp: 'bankName',
    maxlength: 50
  },
  {
    type: 'input',
    label: '银行账户',
    placeholder: '请输入银行账户',
    formItemProp: 'bankAccount',
    inputType: 'number',
    maxlength: 30
  },
  {
    type: 'input',
    label: '邮箱地址',
    placeholder: '请输入邮箱地址',
    formItemProp: 'email',
    inputType: 'email',
    maxlength: 50
  }
])

const formRules = ref({
  type: [
    { required: true, message: '请选择发票类型' }
  ],
  title: [
    { required: true, message: '请输入发票抬头' },
    { min: 2, max: 50, message: '发票抬头长度在 2 到 50 个字符' }
  ],
  taxNumber: [
    { required: true, message: '请输入纳税人识别号' },
    { pattern: /^[A-Z0-9]{15,20}$/, message: '纳税人识别号格式不正确' }
  ],
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
  ],
  email: [
    { pattern: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, message: '请输入正确的邮箱地址' }
  ]
})

const handleSubmit = async (result) => {
  if (result.valid) {
    submitLoading.value = true
    try {
      // 模拟提交请求
      await new Promise(resolve => setTimeout(resolve, 2000))
      uni.showToast({
        title: '提交成功',
        icon: 'success'
      })
      console.log('提交成功', result.values)
    } catch (error) {
      uni.showToast({
        title: '提交失败',
        icon: 'error'
      })
    } finally {
      submitLoading.value = false
    }
  } else {
    uni.showToast({
      title: '请检查表单信息',
      icon: 'none'
    })
    console.log('验证失败', result.errors)
  }
}

const handleFormChange = (values) => {
  console.log('表单数据变化', values)
}

const handleReset = () => {
  invoiceRef.value?.resetFields()
}

const handleValidate = async () => {
  try {
    await invoiceRef.value?.validate()
    uni.showToast({
      title: '验证通过',
      icon: 'success'
    })
  } catch (error) {
    uni.showToast({
      title: '验证失败',
      icon: 'error'
    })
  }
}
</script>

<style lang="scss" scoped>
.invoice-page {
  padding: 20rpx;
}

.action-buttons {
  display: flex;
  gap: 20rpx;
  margin-top: 40rpx;
  padding: 20rpx;
}
</style>
```

## 注意事项

1. 使用组件前请确保已正确引入相关依赖组件：`zx-form`、`zx-form-item`、`zx-input`、`zx-radio`、`zx-radio-group`、`zx-button`
2. `formItemProp` 属性是必填的，用于表单验证和数据绑定
3. 当使用表单验证时，请确保 `formValue` 和 `rules` 属性正确配置
4. 组件支持响应式数据，`data` 数组变化时会自动更新表单项
5. 提交按钮默认固定在页面底部，如需自定义位置可设置 `submit` 为 `false` 并自行实现
6. 组件已适配深色模式，会根据系统设置自动切换样式

## 版本历史

- v1.0.0: 初始版本，支持基础的发票表单功能