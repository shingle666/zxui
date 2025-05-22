# zx-back-top 返回顶部

## 介绍

返回顶部按钮组件，用于长列表快速返回顶部的场景。支持多种样式、动画效果及位置自定义，使用简单灵活。

## 平台兼容性

| H5 | 微信小程序 | 支付宝小程序 | App |
| -- | --------- | ----------- | --- |
| ✓  | ✓         | ✓           | ✓   |

## 引入

```vue
<zx-back-top :scrollTop="scrollTop"></zx-back-top>
```

## 基础用法

### 基础示例

```vue
<template>
  <view>
    <scroll-view scroll-y @scroll="scroll">
      <!-- 页面内容 -->
      <zx-back-top :scrollTop="scrollTop"></zx-back-top>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const scrollTop = ref(0);

const scroll = (e) => {
  scrollTop.value = e.detail.scrollTop;
};
</script>
```

### 自定义样式

```vue
<zx-back-top 
  :scrollTop="scrollTop" 
  mode="square" 
  backgroundColor="#2979ff" 
  iconColor="#ffffff"
  size="120rpx"
></zx-back-top>
```

### 自定义位置

```vue
<zx-back-top 
  :scrollTop="scrollTop" 
  position="left" 
  bottom="150rpx"
></zx-back-top>
```

### 自定义动画

```vue
<zx-back-top 
  :scrollTop="scrollTop" 
  animation="slide"
></zx-back-top>
```

### 添加震动反馈

```vue
<zx-back-top 
  :scrollTop="scrollTop" 
  :isVibrate="true"
></zx-back-top>
```

### 自定义图标

```vue
<zx-back-top 
  :scrollTop="scrollTop" 
  iconName="rocket"
></zx-back-top>
```

### 事件监听

```vue
<zx-back-top 
  :scrollTop="scrollTop" 
  @onClick="handleClick"
  @onShow="handleShow"
  @onHide="handleHide"
></zx-back-top>
```

## API

### Props

| 参数           | 说明                      | 类型            | 默认值     |
|---------------|--------------------------|----------------|-----------|
| mode          | 形状，可选值：circle、square  | String         | circle    |
| iconName      | 图标名称，可选：arrow-up、rocket、top、dingbu | String | arrow-up |
| duration      | 返回顶部滚动时间(ms)         | Number         | 300       |
| scrollTop     | 滚动距离                   | Number         | 0         |
| top           | 距离顶部多少距离显示           | Number         | 100       |
| bottom        | 按钮到底部的距离              | String         | 100rpx    |
| right         | 按钮到右边的距离              | String         | 50rpx     |
| left          | 按钮到左边的距离              | String         | -         |
| position      | 位置，可选值：right、left     | String         | right     |
| zIndex        | 层级                      | Number         | 9999      |
| backgroundColor | 背景色                   | String         | #ffffff   |
| size          | 按钮大小                   | String         | 90rpx     |
| iconColor     | 图标颜色                   | String         | #999999   |
| iconSize      | 图标大小                   | String         | 50rpx     |
| animation     | 动画效果，可选值：fade、slide、scale | String | fade  |
| isVibrate     | 点击时是否震动反馈            | Boolean        | false     |
| customClass   | 自定义类名                  | String         | -         |

### 事件

| 事件名   | 说明              | 回调参数 |
|---------|------------------|---------|
| onClick | 点击按钮时触发      | -       |
| onShow  | 按钮显示时触发      | -       |
| onHide  | 按钮隐藏时触发      | -       |

## 注意事项

1. 组件需要传入 `scrollTop` 参数，该参数为滚动距离，可以通过监听滚动事件获取
2. 图标使用组件内置的几种图标，包括：arrow-up, rocket, top, dingbu
3. 自定义位置时，如果同时设置了 `position="left"` 和 `left` 属性，优先使用 `left` 属性
4. 组件默认在滚动超过 100px 时显示，可通过 `top` 参数自定义
