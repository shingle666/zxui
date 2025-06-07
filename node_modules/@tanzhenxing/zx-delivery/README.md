# zx-delivery 配送组件

配送组件，用于选择配送方式、配送时间、配送地址等配送相关信息的综合组件。

## 特性

- 🚚 支持多种配送方式选择
- ⏰ 灵活的配送时间选择
- 📍 配送地址管理
- 📝 配送备注功能
- 💰 费用明细展示
- 📱 响应式设计，支持 H5、小程序、APP
- 🎨 美观的 UI 设计
- ⚡ 高性能，基于 Vue 3 Composition API

## 基础用法

```vue
<template>
  <zx-delivery
    v-model="selectedMethod"
    :delivery-methods="deliveryMethods"
    :delivery-times="deliveryTimes"
    :address="selectedAddress"
    @change="onDeliveryChange"
    @address-select="onAddressSelect"
  />
</template>

<script setup>
import { ref } from 'vue'

const selectedMethod = ref('express')
const selectedAddress = ref({
  name: '张三',
  phone: '13800138000',
  detail: '北京市朝阳区xxx街道xxx号'
})

const deliveryMethods = ref([
  {
    value: 'express',
    name: '快递配送',
    desc: '3-5个工作日送达',
    icon: 'truck',
    price: 10,
    disabled: false
  },
  {
    value: 'same-day',
    name: '当日达',
    desc: '当日18:00前送达',
    icon: 'clock',
    price: 20,
    disabled: false
  }
])

const deliveryTimes = ref([
  {
    value: 'morning',
    label: '上午',
    desc: '09:00-12:00',
    disabled: false
  },
  {
    value: 'afternoon',
    label: '下午',
    desc: '13:00-18:00',
    disabled: false
  }
])

const onDeliveryChange = (data) => {
  console.log('配送信息变化:', data)
}

const onAddressSelect = () => {
  // 跳转到地址选择页面
  uni.navigateTo({
    url: '/pages/address/select'
  })
}
</script>
```

## 自定义配送方式

```vue
<template>
  <zx-delivery
    v-model="selectedMethod"
    :delivery-methods="customMethods"
    :show-time-select="false"
    :show-fee-detail="false"
  />
</template>

<script setup>
const customMethods = ref([
  {
    value: 'standard',
    name: '标准配送',
    desc: '5-7个工作日',
    icon: 'truck',
    price: 0,
    disabled: false
  },
  {
    value: 'premium',
    name: '加急配送',
    desc: '1-2个工作日',
    icon: 'flash',
    price: 30,
    disabled: false
  },
  {
    value: 'pickup',
    name: '门店自提',
    desc: '免运费',
    icon: 'shop',
    price: 0,
    disabled: false
  }
])
</script>
```

## 隐藏部分功能

```vue
<template>
  <zx-delivery
    v-model="selectedMethod"
    :show-time-select="false"
    :show-address="false"
    :show-remark="false"
    :show-fee-detail="true"
  />
</template>
```

## 自定义样式

```vue
<template>
  <zx-delivery
    v-model="selectedMethod"
    :active-color="'#ff6b35'"
    :icon-size="48"
    :radio-size="40"
    custom-class="custom-delivery"
    :custom-style="{ padding: '20rpx' }"
  />
</template>

<style>
.custom-delivery {
  --zx-delivery-active-color: #ff6b35;
  --zx-delivery-method-radius: 20rpx;
  --zx-delivery-time-radius: 20rpx;
}
</style>
```

## 表单集成

```vue
<template>
  <zx-form ref="formRef" :model="formData" :rules="formRules">
    <zx-form-item label="商品信息" name="goods">
      <!-- 商品信息 -->
    </zx-form-item>
    
    <zx-form-item label="配送信息" name="delivery" required>
      <zx-delivery
        ref="deliveryRef"
        v-model="formData.delivery.method"
        :address="formData.delivery.address"
        @change="onDeliveryChange"
      />
    </zx-form-item>
    
    <zx-button @click="handleSubmit">提交订单</zx-button>
  </zx-form>
</template>

<script setup>
import { ref, reactive } from 'vue'

const formRef = ref()
const deliveryRef = ref()

const formData = reactive({
  goods: {},
  delivery: {
    method: '',
    time: '',
    address: null,
    remark: ''
  }
})

const formRules = {
  delivery: [
    { required: true, message: '请选择配送方式' }
  ]
}

const onDeliveryChange = (data) => {
  formData.delivery = { ...formData.delivery, ...data }
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    const deliveryData = deliveryRef.value.getDeliveryData()
    console.log('提交数据:', { ...formData, delivery: deliveryData })
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
| v-model | 选中的配送方式 | `String` | `''` |
| delivery-methods | 配送方式列表 | `Array<DeliveryMethod>` | 见下方说明 |
| delivery-times | 配送时间选项 | `Array<DeliveryTime>` | 见下方说明 |
| default-time | 默认选中的配送时间 | `String` | `''` |
| address | 配送地址 | `Object` | `null` |
| remark | 配送备注 | `String` | `''` |
| show-time-select | 是否显示时间选择 | `Boolean` | `true` |
| show-address | 是否显示地址选择 | `Boolean` | `true` |
| show-remark | 是否显示备注输入 | `Boolean` | `true` |
| show-fee-detail | 是否显示费用明细 | `Boolean` | `true` |
| icon-size | 图标大小 | `Number\|String` | `40` |
| radio-size | 单选按钮大小 | `Number\|String` | `36` |
| active-color | 激活状态颜色 | `String` | `#1989fa` |
| icon-color | 图标颜色 | `String` | `#969799` |
| remark-placeholder | 备注输入框占位符 | `String` | `请输入配送备注（选填）` |
| remark-maxlength | 备注最大长度 | `Number\|String` | `200` |
| remark-rows | 备注输入框行数 | `Number\|String` | `3` |
| extra-fee | 额外费用 | `Number\|String` | `0` |
| extra-fee-label | 额外费用标签 | `String` | `加急费` |
| price-prefix | 价格前缀 | `String` | `¥` |
| custom-class | 自定义类名 | `String` | `''` |
| custom-style | 自定义样式 | `Object\|String` | `{}` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 配送方式变化 | `(value: String)` |
| change | 配送信息变化 | `(data: DeliveryData)` |
| method-change | 配送方式变化 | `(method: DeliveryMethod)` |
| time-change | 配送时间变化 | `(time: DeliveryTime)` |
| address-select | 地址选择点击 | `()` |
| remark-change | 备注变化 | `(remark: String)` |

### Methods

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| getDeliveryData | 获取配送数据 | - | `DeliveryData` |
| setMethod | 设置配送方式 | `(value: String)` | - |
| setTime | 设置配送时间 | `(value: String)` | - |
| setAddress | 设置配送地址 | `(address: Object)` | - |
| setRemark | 设置配送备注 | `(remark: String)` | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义内容，插入到组件底部 |

## 数据结构

### DeliveryMethod

```typescript
interface DeliveryMethod {
  value: string         // 配送方式值
  name: string          // 配送方式名称
  desc: string          // 配送方式描述
  icon: string          // 图标名称
  price: number         // 配送费用
  disabled?: boolean    // 是否禁用
}
```

### DeliveryTime

```typescript
interface DeliveryTime {
  value: string         // 时间值
  label: string         // 时间标签
  desc: string          // 时间描述
  disabled?: boolean    // 是否禁用
}
```

### DeliveryData

```typescript
interface DeliveryData {
  method: string              // 选中的配送方式
  methodInfo: DeliveryMethod  // 配送方式详情
  time: string                // 选中的配送时间
  address: Object | null      // 配送地址
  remark: string              // 配送备注
  totalFee: number            // 总费用
}
```

### Address

```typescript
interface Address {
  name: string      // 收货人姓名
  phone: string     // 收货人电话
  detail: string    // 详细地址
  [key: string]: any // 其他字段
}
```

## 样式变量

组件提供了丰富的 CSS 变量用于自定义样式：

```scss
.zx-delivery {
  --zx-delivery-bg-color: #f8f9fa;
  --zx-delivery-section-bg: #fff;
  --zx-delivery-section-margin: 20rpx;
  --zx-delivery-padding: 32rpx;
  --zx-delivery-title-size: 32rpx;
  --zx-delivery-title-weight: 600;
  --zx-delivery-title-color: #323233;
  --zx-delivery-title-margin: 24rpx;
  --zx-delivery-active-color: #1989fa;
  --zx-delivery-active-bg: #f0f8ff;
  --zx-delivery-method-bg: #fff;
  --zx-delivery-method-border: #ebedf0;
  --zx-delivery-method-radius: 16rpx;
  --zx-delivery-method-name-size: 30rpx;
  --zx-delivery-method-name-weight: 500;
  --zx-delivery-method-name-color: #323233;
  --zx-delivery-method-desc-size: 26rpx;
  --zx-delivery-method-desc-color: #969799;
  --zx-delivery-method-price-size: 28rpx;
  --zx-delivery-method-price-weight: 600;
  --zx-delivery-price-color: #ee0a24;
  --zx-delivery-time-bg: #fff;
  --zx-delivery-time-border: #ebedf0;
  --zx-delivery-time-radius: 12rpx;
  --zx-delivery-time-label-size: 28rpx;
  --zx-delivery-time-label-weight: 500;
  --zx-delivery-time-label-color: #323233;
  --zx-delivery-time-desc-size: 24rpx;
  --zx-delivery-time-desc-color: #969799;
  --zx-delivery-address-bg: #fff;
  --zx-delivery-address-border: #ebedf0;
  --zx-delivery-address-radius: 12rpx;
  --zx-delivery-address-active-bg: #f8f9fa;
  --zx-delivery-address-name-size: 28rpx;
  --zx-delivery-address-name-weight: 500;
  --zx-delivery-address-name-color: #323233;
  --zx-delivery-address-detail-size: 26rpx;
  --zx-delivery-address-detail-color: #969799;
  --zx-delivery-address-text-size: 28rpx;
  --zx-delivery-placeholder-color: #c8c9cc;
  --zx-delivery-remark-bg: #fff;
  --zx-delivery-remark-border: #ebedf0;
  --zx-delivery-remark-radius: 12rpx;
  --zx-delivery-fee-bg: #fff;
  --zx-delivery-fee-border: #ebedf0;
  --zx-delivery-fee-radius: 12rpx;
  --zx-delivery-fee-divider: #ebedf0;
  --zx-delivery-fee-total-bg: #f8f9fa;
  --zx-delivery-fee-label-size: 28rpx;
  --zx-delivery-fee-label-color: #646566;
  --zx-delivery-fee-value-size: 28rpx;
  --zx-delivery-fee-value-weight: 500;
  --zx-delivery-fee-value-color: #323233;
  --zx-delivery-fee-total-size: 32rpx;
  --zx-delivery-fee-total-weight: 600;
}
```

## 注意事项

1. **图标依赖**：组件依赖 `zx-icon` 组件，请确保已正确引入
2. **地址选择**：组件不包含地址选择功能，需要监听 `address-select` 事件自行实现
3. **表单验证**：如需表单验证，建议配合 `zx-form` 组件使用
4. **响应式设计**：组件适配了不同屏幕尺寸，在各端都有良好的显示效果
5. **性能优化**：使用了 Vue 3 的响应式系统，确保高性能渲染
6. **深色模式**：组件已适配深色模式，会根据系统设置自动切换样式

## 常见问题

### Q: 如何自定义配送方式图标？

A: 在 `delivery-methods` 数组中设置 `icon` 字段，使用 `zx-icon` 支持的图标名称。

### Q: 如何实现动态配送费计算？

A: 可以监听 `method-change` 事件，根据选中的配送方式动态更新 `extra-fee` 属性。

### Q: 如何集成地址选择功能？

A: 监听 `address-select` 事件，跳转到地址选择页面，选择完成后通过 `setAddress` 方法设置地址。

### Q: 如何实现配送时间的动态过滤？

A: 可以根据选中的配送方式，动态更新 `delivery-times` 数组，组件会自动重新渲染。

## 版本历史

- v1.0.0: 初始版本，支持基础的配送选择功能