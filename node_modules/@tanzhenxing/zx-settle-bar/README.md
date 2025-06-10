# SettleBar 结算栏

### 介绍

结算栏组件，常用于购物车页面底部，支持全选、价格显示、结算按钮等功能。

### 引入

```js
import { createSSRApp } from 'vue'
import ZxSettleBar from '@/components/zx-settle-bar/zx-settle-bar.vue'

const app = createSSRApp(App)
app.component('zx-settle-bar', ZxSettleBar)
```

## 代码演示

### 基础用法

```vue
<template>
  <zx-settle-bar
    :price="totalPrice"
    :selected-count="selectedCount"
    :check-all="checkAll"
    @settle="handleSettle"
    @check-all="handleCheckAll"
  />
</template>

<script setup>
import { ref } from 'vue'

const totalPrice = ref(12800) // 128.00元，单位：分
const selectedCount = ref(2)
const checkAll = ref(false)

const handleSettle = (data) => {
  console.log('结算', data)
}

const handleCheckAll = (checked) => {
  checkAll.value = checked
  console.log('全选状态', checked)
}
</script>
```

### 显示原价

```vue
<template>
  <zx-settle-bar
    :price="12800"
    :original-price="15800"
    :selected-count="2"
  />
</template>
```

### 自定义按钮

```vue
<template>
  <zx-settle-bar
    :price="12800"
    :selected-count="2"
    button-text="立即购买"
    button-type="danger"
    button-color="#ff4444"
  />
</template>
```

### 加载状态

```vue
<template>
  <zx-settle-bar
    :price="12800"
    :selected-count="2"
    :loading="loading"
    loading-text="结算中..."
    @settle="handleSettle"
  />
</template>

<script setup>
import { ref } from 'vue'

const loading = ref(false)

const handleSettle = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>
```

### 提示信息

```vue
<template>
  <zx-settle-bar
    :price="12800"
    :selected-count="2"
    tip="满99元免运费"
    tip-icon="info"
  />
</template>
```

### 禁用状态

```vue
<template>
  <zx-settle-bar
    :price="12800"
    :selected-count="0"
    :disabled="true"
    button-text="请选择商品"
  />
</template>
```

### 自定义插槽

```vue
<template>
  <zx-settle-bar :price="12800" :selected-count="2">
    <!-- 顶部插槽 -->
    <template #top>
      <view class="custom-top">优惠券可用</view>
    </template>
    
    <!-- 默认插槽 -->
    <view class="custom-content">
      <text>已优惠：¥20.00</text>
    </view>
    
    <!-- 自定义按钮 -->
    <template #button>
      <button class="custom-button" @click="handleCustomSettle">
        去结算
      </button>
    </template>
  </zx-settle-bar>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| price | 当前价格（单位：分） | _number_ | `0` |
| original-price | 原价（单位：分） | _number_ | `0` |
| price-label | 价格标签文字 | _string_ | `合计：` |
| price-suffix | 价格后缀文字 | _string_ | - |
| currency | 货币符号 | _string_ | `¥` |
| decimal-length | 小数位数 | _number_ | `2` |
| show-price | 是否显示价格 | _boolean_ | `true` |
| selected-count | 已选择商品数量 | _number_ | `0` |
| show-check-all | 是否显示全选 | _boolean_ | `true` |
| check-all | 全选状态 | _boolean_ | `false` |
| check-all-text | 全选文字 | _string_ | `全选` |
| check-all-disabled | 全选是否禁用 | _boolean_ | `false` |
| button-text | 按钮文字 | _string_ | `结算` |
| button-type | 按钮类型 | _string_ | `primary` |
| button-color | 按钮颜色 | _string_ | - |
| button-size | 按钮尺寸 | _string_ | `normal` |
| button-round | 按钮是否圆角 | _boolean_ | `true` |
| loading | 是否加载中 | _boolean_ | `false` |
| loading-text | 加载中文字 | _string_ | - |
| disabled | 是否禁用 | _boolean_ | `false` |
| tip | 提示文字 | _string_ | - |
| tip-icon | 提示图标 | _string_ | - |
| safe-area-inset-bottom | 是否适配底部安全区 | _boolean_ | `true` |

### 样式定制 Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| background-color | 背景色 | _string_ | `#ffffff` |
| tip-background-color | 提示背景色 | _string_ | `#fff7e8` |
| tip-text-color | 提示文字颜色 | _string_ | `#f56723` |
| tip-icon-color | 提示图标颜色 | _string_ | `#f56723` |
| tip-icon-size | 提示图标大小 | _number_ | `24` |
| check-all-text-color | 全选文字颜色 | _string_ | `#323233` |
| checkbox-color | 复选框颜色 | _string_ | `#1989fa` |
| checkbox-size | 复选框大小 | _number_ | `20` |
| checkbox-shape | 复选框形状 | _string_ | `round` |
| price-label-color | 价格标签颜色 | _string_ | `#323233` |
| price-color | 价格颜色 | _string_ | `#ee0a24` |
| price-size | 价格字体大小 | _number_ | `36` |
| original-price-color | 原价颜色 | _string_ | `#969799` |
| original-price-size | 原价字体大小 | _number_ | `24` |
| price-suffix-color | 价格后缀颜色 | _string_ | `#323233` |
| price-suffix-size | 价格后缀字体大小 | _number_ | `24` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| settle | 点击结算按钮时触发 | `{ selectedCount, price, originalPrice }` |
| check-all | 点击全选时触发 | `checked: boolean` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容，位于价格和按钮之间 |
| top | 自定义顶部内容 |
| bottom | 自定义底部内容 |
| tip | 自定义提示内容 |
| button | 自定义按钮内容 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/config-provider)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --zx-settle-bar-height | _100rpx_ | 结算栏高度 |
| --zx-settle-bar-background | _#ffffff_ | 结算栏背景色 |
| --zx-settle-bar-border-color | _#ebedf0_ | 结算栏边框颜色 |
| --zx-settle-bar-padding | _16rpx 32rpx_ | 结算栏内边距 |
| --zx-settle-bar-gap | _24rpx_ | 结算栏元素间距 |
| --zx-settle-bar-tip-background | _#fff7e8_ | 提示背景色 |
| --zx-settle-bar-tip-color | _#f56723_ | 提示文字颜色 |
| --zx-settle-bar-tip-padding | _16rpx 32rpx_ | 提示内边距 |
| --zx-settle-bar-price-color | _#ee0a24_ | 价格颜色 |
| --zx-settle-bar-price-font-size | _36rpx_ | 价格字体大小 |
| --zx-settle-bar-price-font-weight | _600_ | 价格字体粗细 |
| --zx-settle-bar-button-width | _200rpx_ | 按钮最小宽度 |
| --zx-settle-bar-button-height | _80rpx_ | 按钮高度 |

## 常见问题

### 如何实现购物车全选功能？

```vue
<template>
  <view>
    <!-- 商品列表 -->
    <view v-for="item in cartList" :key="item.id">
      <zx-checkbox 
        v-model="item.checked" 
        @change="updateCheckAll"
      />
      <!-- 商品信息 -->
    </view>
    
    <!-- 结算栏 -->
    <zx-settle-bar
      :check-all="isAllChecked"
      :selected-count="selectedCount"
      :price="totalPrice"
      @check-all="handleCheckAll"
      @settle="handleSettle"
    />
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const cartList = ref([
  { id: 1, name: '商品1', price: 5000, checked: false },
  { id: 2, name: '商品2', price: 8000, checked: false }
])

// 是否全选
const isAllChecked = computed(() => {
  return cartList.value.length > 0 && cartList.value.every(item => item.checked)
})

// 已选择数量
const selectedCount = computed(() => {
  return cartList.value.filter(item => item.checked).length
})

// 总价
const totalPrice = computed(() => {
  return cartList.value
    .filter(item => item.checked)
    .reduce((total, item) => total + item.price, 0)
})

// 处理全选
const handleCheckAll = (checked) => {
  cartList.value.forEach(item => {
    item.checked = checked
  })
}

// 更新全选状态
const updateCheckAll = () => {
  // 当单个商品选择状态改变时，会自动通过计算属性更新全选状态
}

// 处理结算
const handleSettle = (data) => {
  const selectedItems = cartList.value.filter(item => item.checked)
  console.log('结算商品', selectedItems)
  console.log('结算数据', data)
}
</script>
```

### 如何自定义结算按钮样式？

```vue
<template>
  <zx-settle-bar :price="12800" :selected-count="2">
    <template #button>
      <view class="custom-button-group">
        <button class="add-to-cart">加入购物车</button>
        <button class="buy-now" @click="handleBuyNow">立即购买</button>
      </view>
    </template>
  </zx-settle-bar>
</template>

<style>
.custom-button-group {
  display: flex;
  gap: 16rpx;
}

.add-to-cart {
  flex: 1;
  height: 80rpx;
  background: #fff;
  border: 2rpx solid #1989fa;
  color: #1989fa;
  border-radius: 40rpx;
}

.buy-now {
  flex: 1;
  height: 80rpx;
  background: #1989fa;
  color: #fff;
  border: none;
  border-radius: 40rpx;
}
</style>
```