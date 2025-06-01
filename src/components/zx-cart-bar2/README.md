# ZX-Cart-Bar2 购物车底部栏组件

`zx-cart-bar2` 是一个功能强大的购物车底部栏组件，基于 NutUI CartBar 设计理念开发，提供了丰富的功能和高度的可定制性。<mcreference link="https://nutui.jd.com/biz/h5/react/1x/#/zh-CN/component/CartBar" index="1">1</mcreference>

## 特性

- ✅ 支持全选/取消全选功能
- ✅ 显示已选商品数量和总价
- ✅ 支持显示原价和优惠信息
- ✅ 可自定义按钮样式和状态
- ✅ 支持提示信息显示和关闭
- ✅ 完全兼容 H5、小程序、App 平台
- ✅ 支持收藏按钮和多按钮组合
- ✅ 丰富的颜色和样式配置
- ✅ CSS 变量主题定制支持
- ✅ 安全区域适配
- ✅ 阴影和边框可控

## 基础用法

```vue
<template>
  <zx-cart-bar2
    v-model:all-checked="allChecked"
    :total-price="totalPrice"
    :checked-count="checkedCount"
    :total-count="totalCount"
    @submit="handleSubmit"
    @check-all="handleCheckAll"
  />
</template>

<script setup>
import { ref } from 'vue'

const allChecked = ref(false)
const totalPrice = ref(999900) // 9999.00元，以分为单位
const checkedCount = ref(2)
const totalCount = ref(5)

const handleSubmit = (data) => {
  console.log('提交订单', data)
}

const handleCheckAll = (checked) => {
  console.log('全选状态', checked)
}
</script>
```

## 显示原价和优惠

```vue
<template>
  <zx-cart-bar2
    v-model:all-checked="allChecked"
    :total-price="totalPrice"
    :original-price="originalPrice"
    :checked-count="checkedCount"
    :show-original-price="true"
    discount-text="已优惠 ¥200.00"
    @submit="handleSubmit"
  />
</template>

<script setup>
const totalPrice = ref(799900) // 7999.00元
const originalPrice = ref(999900) // 9999.00元
</script>
```

## 自定义按钮组

```vue
<template>
  <zx-cart-bar2
    v-model:all-checked="allChecked"
    :total-price="totalPrice"
    :checked-count="checkedCount"
    :show-favorite-button="true"
    button-type="primary"
    favorite-button-text="收藏"
    @submit="handleSubmit"
    @favorite="handleFavorite"
  />
</template>

<script setup>
const handleFavorite = (data) => {
  console.log('收藏商品', data)
}
</script>
```

## 提示信息

```vue
<template>
  <zx-cart-bar2
    v-model:all-checked="allChecked"
    :total-price="totalPrice"
    :checked-count="checkedCount"
    tip="满99元免运费，还差21元"
    tip-icon="info-circle"
    :tip-closable="true"
    @tip-close="handleTipClose"
  />
</template>

<script setup>
const handleTipClose = () => {
  console.log('提示已关闭')
}
</script>
```

## 隐藏部分功能

```vue
<template>
  <zx-cart-bar2
    v-model:all-checked="allChecked"
    :total-price="totalPrice"
    :checked-count="checkedCount"
    :show-check-all="false"
    :show-count="false"
    :show-shadow="false"
    :show-border="false"
  />
</template>
```

## 自定义左侧内容

```vue
<template>
  <zx-cart-bar2
    v-model:all-checked="allChecked"
    :total-price="totalPrice"
    :checked-count="checkedCount"
  >
    <template #left>
      <view class="custom-left">
        <zx-icon name="gift" color="#ff6900" size="20"></zx-icon>
        <text class="gift-text">有礼品</text>
      </view>
    </template>
  </zx-cart-bar2>
</template>

<style>
.custom-left {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.gift-text {
  font-size: 24rpx;
  color: #ff6900;
}
</style>
```

## 自定义按钮

```vue
<template>
  <zx-cart-bar2
    v-model:all-checked="allChecked"
    :total-price="totalPrice"
    :checked-count="checkedCount"
  >
    <template #button>
      <view class="custom-buttons">
        <zx-button 
          type="warning" 
          size="small" 
          round
          @click="addToFavorites"
        >
          收藏
        </zx-button>
        <zx-button 
          type="danger" 
          round
          :disabled="checkedCount === 0"
          @click="buyNow"
        >
          立即购买({{ checkedCount }})
        </zx-button>
      </view>
    </template>
  </zx-cart-bar2>
</template>

<style>
.custom-buttons {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
</style>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| total-price | 总价格，单位为分 | Number \| String | 0 |
| original-price | 原价格，单位为分 | Number \| String | 0 |
| checked-count | 已选商品数量 | Number \| String | 0 |
| total-count | 商品总数量 | Number \| String | 0 |
| all-checked | 全选状态，支持 v-model | Boolean | false |
| show-check-all | 是否显示全选 | Boolean | true |
| show-count | 是否显示数量 | Boolean | true |
| show-price | 是否显示价格 | Boolean | true |
| show-original-price | 是否显示原价 | Boolean | false |
| show-decimal | 是否显示小数位 | Boolean | true |
| show-shadow | 是否显示阴影 | Boolean | true |
| show-border | 是否显示边框 | Boolean | true |
| show-favorite-button | 是否显示收藏按钮 | Boolean | false |
| price-label | 价格标签文本 | String | '合计：' |
| original-price-label | 原价标签文本 | String | '原价：' |
| currency | 货币符号 | String | '¥' |
| button-text | 按钮文本 | String | '' |
| discount-text | 优惠信息文本 | String | '' |
| tip | 提示信息 | String | '' |
| tip-icon | 提示图标 | String | '' |
| tip-closable | 提示是否可关闭 | Boolean | false |
| check-all-text | 全选文本 | String | '全选' |
| count-label | 数量标签 | String | '已选' |
| count-unit | 数量单位 | String | '件' |
| favorite-button-text | 收藏按钮文本 | String | '收藏' |
| button-type | 按钮类型 | String | 'danger' |
| button-color | 按钮颜色 | String | '' |
| button-size | 按钮尺寸 | String | 'normal' |
| button-round | 按钮是否圆角 | Boolean | true |
| button-gradient | 按钮是否渐变 | Boolean | false |
| favorite-button-type | 收藏按钮类型 | String | 'default' |
| checkbox-color | 复选框颜色 | String | '#ff6900' |
| checkbox-size | 复选框尺寸 | String | 'normal' |
| price-color | 价格颜色 | String | '#ee0a24' |
| price-label-color | 价格标签颜色 | String | '#323233' |
| original-price-color | 原价颜色 | String | '#969799' |
| discount-color | 优惠信息颜色 | String | '#ff6900' |
| count-label-color | 数量标签颜色 | String | '#969799' |
| count-num-color | 数量数字颜色 | String | '#ff6900' |
| check-all-text-color | 全选文本颜色 | String | '#323233' |
| tip-text-color | 提示文本颜色 | String | '#ff6900' |
| tip-icon-color | 提示图标颜色 | String | '#ff6900' |
| tip-background-color | 提示背景颜色 | String | '#fff7e8' |
| disabled | 是否禁用 | Boolean | false |
| loading | 是否加载中 | Boolean | false |
| require-selection | 是否需要选择商品才能提交 | Boolean | true |
| safe-area-inset-bottom | 是否开启底部安全区适配 | Boolean | true |
| decimal-length | 价格小数位数 | Number \| String | 2 |
| main-height | 主体高度 | Number \| String | '' |
| custom-class | 自定义类名 | String | '' |
| custom-style | 自定义样式 | Object | {} |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| submit | 点击提交按钮时触发 | { checkedCount, totalPrice, originalPrice, discountAmount } |
| check-all | 全选状态改变时触发 | checked: boolean |
| update:all-checked | 全选状态更新时触发，用于 v-model | checked: boolean |
| favorite | 点击收藏按钮时触发 | { checkedCount, totalPrice } |
| tip-close | 关闭提示时触发 | - |

### Slots

| 插槽名 | 说明 |
|--------|------|
| tip | 自定义提示内容 |
| left | 自定义左侧内容 |
| button | 自定义按钮区域 |
| bottom | 自定义底部内容 |

## 主题定制

组件支持通过 CSS 变量进行主题定制：

```css
.zx-cart-bar2 {
  /* 基础样式 */
  --zx-cart-bar2-background: #fff;
  --zx-cart-bar2-border-color: #ebedf0;
  --zx-cart-bar2-shadow: 0 -2rpx 12rpx rgba(0, 0, 0, 0.08);
  --zx-cart-bar2-padding: 20rpx 32rpx;
  --zx-cart-bar2-min-height: 100rpx;
  --zx-cart-bar2-gap: 24rpx;
  
  /* 提示区域 */
  --zx-cart-bar2-tip-background: #fff7e8;
  --zx-cart-bar2-tip-padding: 16rpx 32rpx;
  --zx-cart-bar2-tip-text-color: #ff6900;
  --zx-cart-bar2-tip-icon-color: #ff6900;
  
  /* 价格区域 */
  --zx-cart-bar2-price-color: #ee0a24;
  --zx-cart-bar2-price-label-color: #323233;
  --zx-cart-bar2-price-integer-size: 40rpx;
  --zx-cart-bar2-price-symbol-size: 24rpx;
  --zx-cart-bar2-price-decimal-size: 24rpx;
  
  /* 按钮区域 */
  --zx-cart-bar2-button-height: 80rpx;
  --zx-cart-bar2-button-min-width: 200rpx;
  --zx-cart-bar2-button-font-size: 28rpx;
  --zx-cart-bar2-button-font-weight: 600;
}
```

## 使用注意事项

### 价格单位

组件内部价格计算以**分**为单位，显示时会自动转换为元：

```javascript
// 传入价格：99900（分）
// 显示价格：¥999.00（元）
const totalPrice = ref(99900)
```

### 底部安全区域

组件默认开启底部安全区域适配，在 iPhone X 等设备上会自动添加底部安全距离。如不需要可设置 `safe-area-inset-bottom="false"`。

### 全选状态同步

使用 `v-model:all-checked` 进行双向绑定，确保组件内外状态同步：

```vue
<template>
  <zx-cart-bar2
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
}
</script>
```

### 添加底部占位

由于组件使用 `position: fixed` 定位，建议在页面底部添加占位空间：

```vue
<template>
  <view class="page">
    <!-- 页面内容 -->
    <view class="content">
      <!-- ... -->
    </view>
    
    <!-- 底部占位 -->
    <view class="cart-bar-placeholder"></view>
    
    <!-- 购物车底部栏 -->
    <zx-cart-bar2 />
  </view>
</template>

<style>
.cart-bar-placeholder {
  height: 200rpx; /* 根据实际高度调整 */
}
</style>
```

## 常见问题

### 1. 价格计算不准确

确保传入的价格以分为单位，避免浮点数计算误差：

```javascript
// ❌ 错误
const totalPrice = ref(99.99)

// ✅ 正确
const totalPrice = ref(9999) // 99.99元 = 9999分
```

### 2. 全选功能实现

```javascript
const handleCheckAll = (checked) => {
  // 更新所有商品的选中状态
  cartList.value.forEach(item => {
    item.checked = checked
  })
  
  // 重新计算总价和数量
  calculateTotal()
}

const calculateTotal = () => {
  const checkedItems = cartList.value.filter(item => item.checked)
  checkedCount.value = checkedItems.reduce((total, item) => total + item.quantity, 0)
  totalPrice.value = checkedItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  allChecked.value = checkedItems.length === cartList.value.length && cartList.value.length > 0
}
```

### 3. 添加底部安全距离

在某些情况下可能需要手动添加底部安全距离：

```css
.zx-cart-bar2 {
  padding-bottom: calc(constant(safe-area-inset-bottom) + 20rpx);
  padding-bottom: calc(env(safe-area-inset-bottom) + 20rpx);
}
```