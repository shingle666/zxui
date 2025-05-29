# zx-submit-bar 提交订单栏

`zx-submit-bar` 是一个用于展示订单金额与提交订单的组件，通常用于购物车结算、订单确认等场景。

## 特性

- 支持自定义金额展示
- 支持自定义按钮样式和文字
- 支持提示信息展示
- 支持多种插槽，灵活定制内容
- 支持底部安全区适配
- 完全兼容 H5、小程序、App

## 使用方法

```vue
<template>
  <zx-submit-bar
    :price="3050"
    button-text="提交订单"
    @submit="onSubmit"
  />
</template>

<script setup>
import { ref } from 'vue';

const onSubmit = () => {
  uni.showToast({
    title: '点击按钮',
    icon: 'none'
  });
};
</script>
```

## 属性说明

### 基础属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| price | Number | - | 金额（单位分） |
| decimal-length | Number / String | 2 | 金额小数点位数 |
| label | String | '合计：' | 金额左侧文案 |
| suffix-label | String | - | 金额右侧文案 |
| text-align | String | 'right' | 金额文案对齐方向，可选值为 left |
| button-text | String | - | 按钮文字 |
| button-type | String | 'danger' | 按钮类型 |
| button-color | String | - | 自定义按钮颜色 |
| tip | String | - | 在订单栏上方的提示文案 |
| tip-icon | String | - | 提示文案左侧的图标名称 |
| currency | String | '¥' | 货币符号 |
| disabled | Boolean | false | 是否禁用按钮 |
| loading | Boolean | false | 是否显示将按钮显示为加载中状态 |
| safe-area-inset-bottom | Boolean | true | 是否开启底部安全区适配 |
| placeholder | Boolean | false | 是否在标签位置生成一个等高的占位元素 |

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| submit | 按钮点击事件回调 | - |

## 插槽

| 名称 | 说明 |
| --- | --- |
| default | 自定义订单栏左侧内容 |
| button | 自定义按钮 |
| top | 自定义订单栏上方内容 |
| tip | 提示文案中的额外内容 |

## 代码示例

### 基础用法

```vue
<zx-submit-bar
  :price="3050"
  button-text="提交订单"
  @submit="onSubmit"
/>
```

### 禁用状态

禁用状态下不会触发 submit 事件。

```vue
<zx-submit-bar
  disabled
  :price="3050"
  button-text="提交订单"
  tip="你的收货地址不支持配送"
  tip-icon="info"
  @submit="onSubmit"
/>
```

### 加载状态

加载状态下不会触发 submit 事件。

```vue
<zx-submit-bar
  loading
  :price="3050"
  button-text="提交订单"
  @submit="onSubmit"
/>
```

### 高级用法

通过插槽插入自定义内容。

```vue
<zx-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
  <zx-checkbox v-model="checked">全选</zx-checkbox>
  <template #tip>
    你的收货地址不支持配送, <text class="link" @tap="onClickLink">修改地址</text>
  </template>
</zx-submit-bar>
```

```js
const checked = ref(false);

const onSubmit = () => {
  uni.showToast({
    title: '点击按钮',
    icon: 'none'
  });
};

const onClickLink = () => {
  uni.showToast({
    title: '修改地址',
    icon: 'none'
  });
};
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式：

```css
.zx-submit-bar {
  --submit-bar-height: 100rpx;
  --submit-bar-z-index: 100;
  --submit-bar-background: #ffffff;
  --submit-bar-button-width: 220rpx;
  --submit-bar-price-color: #ee0a24;
  --submit-bar-price-font-size: 24rpx;
  --submit-bar-price-integer-font-size: 40rpx;
  --submit-bar-text-color: #323233;
  --submit-bar-text-font-size: 28rpx;
  --submit-bar-tip-padding: 8rpx 24rpx;
  --submit-bar-tip-font-size: 24rpx;
  --submit-bar-tip-line-height: 1.5;
  --submit-bar-tip-color: #f56723;
  --submit-bar-tip-background: #fff7e8;
  --submit-bar-tip-icon-size: 24rpx;
  --submit-bar-button-height: 80rpx;
  --submit-bar-padding: 0 32rpx;
}
```