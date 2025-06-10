# CartBar 购物车底部栏

购物车底部栏组件，用于展示购物车商品信息、价格统计和结算功能。支持全选操作、商品数量显示、价格计算等功能。

## 引入

```js
import zxCartBar from '@/components/zx-cart-bar/zx-cart-bar.vue'
```

## 代码演示

### 基础用法

```vue
<template>
  <zx-cart-bar
    :total-price="totalPrice"
    :checked-count="checkedCount"
    :total-count="totalCount"
    :all-checked="allChecked"
    @submit="handleSubmit"
    @check-all="handleCheckAll"
  />
</template>

<script setup>
import { ref } from 'vue'

const totalPrice = ref(12800) // 单位：分
const checkedCount = ref(2)
const totalCount = ref(5)
const allChecked = ref(false)

const handleSubmit = (data) => {
  console.log('结算', data)
}

const handleCheckAll = (checked) => {
  console.log('全选状态', checked)
  allChecked.value = checked
}
</script>
```

### 显示原价和优惠信息

```vue
<template>
  <zx-cart-bar
    :total-price="totalPrice"
    :original-price="originalPrice"
    :checked-count="checkedCount"
    :show-original-price="true"
    discount-text="已优惠 ¥20.00"
    @submit="handleSubmit"
  />
</template>

<script setup>
const totalPrice = ref(12800) // ¥128.00
const originalPrice = ref(14800) // ¥148.00
const checkedCount = ref(2)
</script>
```

### 自定义按钮

```vue
<template>
  <zx-cart-bar
    :total-price="totalPrice"
    :checked-count="checkedCount"
    button-text="立即购买"
    button-type="primary"
    :button-round="false"
  >
    <template #button>
      <view class="custom-buttons">
        <zx-button type="warning" size="small" @click="addToFavorites">收藏</zx-button>
        <zx-button type="danger" @click="buyNow">立即购买</zx-button>
      </view>
    </template>
  </zx-cart-bar>
</template>
```

### 添加提示信息

```vue
<template>
  <zx-cart-bar
    :total-price="totalPrice"
    :checked-count="checkedCount"
    tip="满99元免运费，还差21元"
    tip-icon="info-circle"
  />
</template>
```

### 隐藏部分功能

```vue
<template>
  <zx-cart-bar
    :total-price="totalPrice"
    :checked-count="checkedCount"
    :show-check-all="false"
    :show-count="false"
    price-label="总计："
  />
</template>
```

### 自定义左侧内容

```vue
<template>
  <zx-cart-bar
    :total-price="totalPrice"
    :checked-count="checkedCount"
  >
    <template #left>
      <view class="custom-left">
        <zx-icon name="gift" color="#ff6900" />
        <text>有礼品</text>
      </view>
    </template>
  </zx-cart-bar>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| total-price | 总价格，单位为分 | number \| string | 0 |
| original-price | 原价格，单位为分 | number \| string | 0 |
| checked-count | 已选商品数量 | number \| string | 0 |
| total-count | 商品总数量 | number \| string | 0 |
| all-checked | 是否全选 | boolean | false |
| show-check-all | 是否显示全选 | boolean | true |
| show-count | 是否显示商品数量 | boolean | true |
| show-price | 是否显示价格 | boolean | true |
| show-original-price | 是否显示原价 | boolean | false |
| price-label | 价格标签文字 | string | '合计：' |
| currency | 货币符号 | string | '¥' |
| button-text | 按钮文字 | string | '' |
| discount-text | 优惠信息文字 | string | '' |
| tip | 顶部提示文字 | string | '' |
| tip-icon | 提示图标名称 | string | '' |
| button-type | 按钮类型 | string | 'danger' |
| button-color | 按钮颜色 | string | '' |
| button-round | 按钮是否圆角 | boolean | true |
| checkbox-color | 复选框颜色 | string | '#ff6900' |
| disabled | 是否禁用 | boolean | false |
| loading | 是否加载中 | boolean | false |
| safe-area-inset-bottom | 是否开启底部安全区适配 | boolean | true |
| decimal-length | 价格小数位数 | number \| string | 2 |
| custom-class | 自定义类名 | string | '' |
| custom-style | 自定义样式 | object | {} |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| submit | 点击结算按钮时触发 | { checkedCount, totalPrice, originalPrice } |
| check-all | 点击全选时触发 | checked: boolean |
| update:all-checked | 全选状态更新时触发 | checked: boolean |

### Slots

| 名称 | 说明 |
|------|------|
| tip | 自定义顶部提示内容 |
| left | 自定义左侧内容 |
| button | 自定义按钮区域 |
| bottom | 自定义底部内容 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
|------|--------|------|
| --zx-cart-bar-height | 100rpx | 主体高度 |
| --zx-cart-bar-padding | 20rpx 32rpx | 内边距 |
| --zx-cart-bar-background | #fff | 背景色 |
| --zx-cart-bar-border-color | #ebedf0 | 边框颜色 |
| --zx-cart-bar-price-color | #ee0a24 | 价格颜色 |
| --zx-cart-bar-text-color | #323233 | 文字颜色 |
| --zx-cart-bar-tip-background | #fff7e8 | 提示背景色 |
| --zx-cart-bar-tip-color | #ff6900 | 提示文字颜色 |

## 注意事项

1. 价格单位统一使用分，组件内部会自动转换为元显示
2. 组件默认固定在页面底部，使用时需要给页面内容添加底部边距
3. 在小程序中使用时，建议开启 `safe-area-inset-bottom` 以适配底部安全区域
4. 全选状态需要通过 `v-model:all-checked` 或监听 `check-all` 事件来同步

## 常见问题

### 如何处理价格计算？

```js
// 价格以分为单位传入
const totalPrice = ref(12800) // 表示 ¥128.00

// 如果后端返回的是元，需要转换
const priceInYuan = 128.00
const totalPrice = ref(Math.round(priceInYuan * 100))
```

### 如何实现全选功能？

```vue
<template>
  <zx-cart-bar
    v-model:all-checked="allChecked"
    @check-all="handleCheckAll"
  />
</template>

<script setup>
const allChecked = ref(false)

const handleCheckAll = (checked) => {
  // 更新商品列表的选中状态
  cartList.value.forEach(item => {
    item.checked = checked
  })
  
  // 重新计算价格和数量
  calculateTotal()
}
</script>
```

### 如何添加页面底部边距？

```scss
.page-content {
  padding-bottom: 120rpx; /* 购物车栏高度 + 安全区域 */
}
```