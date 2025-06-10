# zx-coupon-list 优惠券列表

适用于 uni-app 跨端（H5、小程序、App）优惠券选择和兑换场景。

## 组件特性
- 支持多端（H5/小程序/App）
- 支持优惠券选择（单选/多选）
- 支持优惠券兑换功能
- 支持可用/不可用优惠券分类显示
- 支持自定义样式和文案
- 支持空状态展示
- 支持插槽自定义内容

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| code | String | '' | 当前输入的兑换码，支持 v-model |
| chosen-coupon | Number/Array | -1 | 当前选中优惠券的索引，支持多选 |
| coupons | Array | [] | 可用优惠券列表 |
| disabled-coupons | Array | [] | 不可用优惠券列表 |
| enabled-title | String | '可使用优惠券' | 可用优惠券列表标题 |
| disabled-title | String | '不可使用优惠券' | 不可用优惠券列表标题 |
| exchange-button-text | String | '兑换' | 兑换按钮文字 |
| exchange-button-loading | Boolean | false | 是否显示兑换按钮加载动画 |
| exchange-button-disabled | Boolean | false | 是否禁用兑换按钮 |
| exchange-min-length | Number | 1 | 兑换码最小长度 |
| displayed-coupon-index | Number | -1 | 滚动至特定优惠券位置 |
| show-close-button | Boolean | true | 是否显示列表底部按钮 |
| close-button-text | String | '不使用优惠' | 列表底部按钮文字 |
| input-placeholder | String | '请输入优惠码' | 输入框文字提示 |
| show-exchange-bar | Boolean | true | 是否展示兑换栏 |
| currency | String | '¥' | 货币符号 |
| empty-image | String | '' | 列表为空时的占位图 |
| show-count | Boolean | true | 是否展示可用/不可用数量 |
| custom-class | String | '' | 自定义样式类名 |
| custom-style | String/Object | '' | 自定义样式 |

## 事件说明

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 优惠券切换时触发 | 选中优惠券的索引 |
| exchange | 兑换优惠券时触发 | 兑换码 |
| update:code | 兑换码输入时触发 | 当前兑换码 |

## 插槽说明

| 插槽名 | 说明 |
| --- | --- |
| list-footer | 优惠券列表底部 |
| disabled-list-footer | 不可用优惠券列表底部 |
| list-button | 自定义底部按钮 |

## CouponInfo 数据结构

| 字段名 | 说明 | 类型 |
| --- | --- | --- |
| id | 优惠券 id | String |
| name | 优惠券名称 | String |
| condition | 满减条件 | String |
| startAt | 卡有效开始时间 (时间戳, 单位秒) | Number |
| endAt | 卡失效日期 (时间戳, 单位秒) | Number |
| description | 描述信息，优惠券可用时展示 | String |
| reason | 不可用原因，优惠券不可用时展示 | String |
| value | 折扣券优惠金额，单位分 | Number |
| valueDesc | 折扣券优惠金额文案 | String |
| unitDesc | 单位文案 | String |

## 使用示例

### 基础用法

```vue
<template>
  <view class="demo">
    <!-- 优惠券选择按钮 -->
    <view class="coupon-cell" @tap="showList = true">
      <text>选择优惠券</text>
      <text v-if="chosenCoupon >= 0">已选择</text>
    </view>
    
    <!-- 优惠券列表弹窗 -->
    <zx-popup 
      v-model:show="showList" 
      position="bottom" 
      :style="{ height: '90%' }"
    >
      <zx-coupon-list
        v-model:code="exchangeCode"
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </zx-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxCouponList from '@/components/zx-coupon-list/zx-coupon-list.vue'
import zxPopup from '@/components/zx-popup/zx-popup.vue'

const showList = ref(false)
const chosenCoupon = ref(-1)
const exchangeCode = ref('')

const coupons = ref([
  {
    id: '1',
    name: '满减优惠券',
    condition: '满100元可用',
    value: 1000, // 10元，单位分
    startAt: 1640995200, // 2022-01-01
    endAt: 1672531199,   // 2022-12-31
    description: '全场通用'
  },
  {
    id: '2',
    name: '新用户专享',
    condition: '无门槛',
    valueDesc: '9.5',
    unitDesc: '折',
    startAt: 1640995200,
    endAt: 1672531199,
    description: '仅限新用户使用'
  }
])

const disabledCoupons = ref([
  {
    id: '3',
    name: '已过期优惠券',
    condition: '满50元可用',
    value: 500,
    reason: '优惠券已过期',
    startAt: 1609459200,
    endAt: 1640995199
  }
])

const onChange = (index) => {
  chosenCoupon.value = index
  showList.value = false
}

const onExchange = (code) => {
  console.log('兑换码:', code)
  // 处理兑换逻辑
}
</script>
```

### 多选模式

```vue
<template>
  <zx-coupon-list
    :coupons="coupons"
    :chosen-coupon="chosenCoupons"
    @change="onMultiChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const chosenCoupons = ref([]) // 多选模式使用数组

const onMultiChange = (indexes) => {
  chosenCoupons.value = indexes
}
</script>
```

### 自定义样式

```vue
<template>
  <zx-coupon-list
    :coupons="coupons"
    custom-class="custom-coupon-list"
    currency="$"
    enabled-title="Available Coupons"
    disabled-title="Unavailable Coupons"
    exchange-button-text="Redeem"
    close-button-text="No Coupon"
    input-placeholder="Enter coupon code"
  />
</template>
```

### 使用插槽

```vue
<template>
  <zx-coupon-list :coupons="coupons">
    <template #list-footer>
      <view class="custom-footer">
        <text>更多优惠券敬请期待</text>
      </view>
    </template>
    
    <template #list-button>
      <view class="custom-button" @tap="customAction">
        <text>自定义按钮</text>
      </view>
    </template>
  </zx-coupon-list>
</template>
```

## 注意事项

1. 优惠券金额 `value` 字段单位为分，组件会自动转换为元显示
2. 时间戳 `startAt` 和 `endAt` 单位为秒
3. 多选模式下 `chosen-coupon` 需要传入数组
4. 组件内部使用了 `scroll-view`，在某些平台可能需要设置固定高度
5. 兑换功能需要配合后端接口实现具体的兑换逻辑

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础的优惠券列表展示和选择功能
- 支持优惠券兑换功能
- 支持自定义样式和文案