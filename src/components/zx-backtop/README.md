# zx-backtop 回到顶部

## 介绍

回到顶部按钮组件，参考 Element Plus Backtop 组件设计。用于长页面快速返回顶部的场景，支持多种样式、动画效果及位置自定义，使用简单灵活。

## 平台兼容性

| H5 | 微信小程序 | 支付宝小程序 | App |
| -- | --------- | ----------- | --- |
| ✓  | ✓         | ✓           | ✓   |

## 引入

```vue
<zx-backtop :scrollTop="scrollTop"></zx-backtop>
```

## 基础用法

### 基础示例

滚动页面，当滚动高度超过 200px 时，回到顶部按钮会出现在页面右下角。

```vue
<template>
  <view>
    <scroll-view scroll-y @scroll="scroll">
      <!-- 页面内容 -->
      <zx-backtop :scrollTop="scrollTop" @click="handleBacktopClick"></zx-backtop>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const scrollTop = ref(0);

const scroll = (e) => {
  scrollTop.value = e.detail.scrollTop;
};

const handleBacktopClick = () => {
  console.log('返回顶部');
};
</script>
```

### 自定义内容

显示区域被固定为 40px * 40px 的区域，其中的内容可支持自定义。

```vue
<zx-backtop :scrollTop="scrollTop" :bottom="100">
  <view style="
    height: 100%;
    width: 100%;
    background-color: #f2f5f6;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    text-align: center;
    line-height: 40px;
    color: #1989fa;
  ">
    UP
  </view>
</zx-backtop>
```

### 自定义样式

```vue
<zx-backtop 
  :scrollTop="scrollTop" 
  mode="square" 
  backgroundColor="#409EFF" 
  iconColor="#ffffff"
  size="50px"
></zx-backtop>
```

### 自定义位置

```vue
<zx-backtop 
  :scrollTop="scrollTop" 
  :left="100" 
  :bottom="150"
></zx-backtop>
```

### 自定义触发高度

```vue
<zx-backtop 
  :scrollTop="scrollTop" 
  :visibilityHeight="300"
></zx-backtop>
```

### 自定义动画效果

```vue
<zx-backtop 
  :scrollTop="scrollTop" 
  animation="scale"
></zx-backtop>
```

### 添加震动反馈

```vue
<zx-backtop 
  :scrollTop="scrollTop" 
  :vibrate="true"
></zx-backtop>
```

### 自定义图标

```vue
<zx-backtop 
  :scrollTop="scrollTop" 
  iconName="rocket"
></zx-backtop>
```

### 事件监听

```vue
<zx-backtop 
  :scrollTop="scrollTop" 
  @click="handleClick"
  @show="handleShow"
  @hide="handleHide"
></zx-backtop>
```

## API

### Attributes

| 参数               | 说明                        | 类型     | 默认值     |
|-------------------|----------------------------|----------|-----------|
| target            | 触发滚动的对象（暂不支持，预留）  | String   | —         |
| visibilityHeight  | 滚动高度达到此参数值才出现      | Number   | 200       |
| right             | 控制其显示位置，距离页面右边距   | Number   | 40        |
| bottom            | 控制其显示位置，距离页面底部距离 | Number   | 40        |
| left              | 控制其显示位置，距离页面左边距   | Number   | null      |
| scrollTop         | 当前滚动距离，用于控制显示/隐藏 | Number   | 0         |
| duration          | 返回顶部滚动时间(ms)          | Number   | 300       |
| zIndex            | 层级                        | Number   | 9999      |
| mode              | 形状，可选值：circle、square   | String   | circle    |
| backgroundColor   | 背景色                      | String   | #ffffff   |
| size              | 组件大小                    | String   | 40px      |
| iconName          | 图标名称，可选：arrow-up、rocket、top、dingbu | String | arrow-up |
| iconColor         | 图标颜色                    | String   | #999999   |
| iconSize          | 图标大小                    | String   | 24px      |
| animation         | 动画效果，可选值：fade、slide、scale | String | fade   |
| vibrate           | 点击时是否震动反馈            | Boolean  | false     |
| customClass       | 自定义类名                  | String   | —         |

### Events

| 事件名 | 说明         | 回调参数   |
|-------|-------------|-----------|
| click | 点击按钮触发  | Function  |
| show  | 按钮显示时触发 | Function  |
| hide  | 按钮隐藏时触发 | Function  |

### Slots

| 插槽名  | 说明       |
|--------|-----------|
| default | 自定义默认内容 |

## 注意事项

1. 组件需要传入 `scrollTop` 参数，该参数为当前滚动距离，可以通过监听滚动事件获取
2. 图标使用组件内置的几种图标，包括：arrow-up, rocket, top, dingbu
3. 自定义位置时，如果设置了 `left` 属性，优先级高于 `right` 属性
4. 组件默认在滚动超过 200px 时显示，可通过 `visibilityHeight` 参数自定义
5. 位置参数 `right`、`bottom`、`left` 单位为 px，不需要带单位
6. 尺寸参数 `size`、`iconSize` 需要带单位，支持 px、rpx 等

## 更新日志

- 重构组件名称为 `zx-backtop`，与 Element Plus 保持一致
- 优化 API 设计，使用 `visibilityHeight` 替代 `top` 参数
- 简化位置配置，使用数字类型的 `right`、`bottom`、`left` 参数
- 优化事件命名，使用 `click`、`show`、`hide` 替代原有事件名
- 改进动画效果和样式设计
- 增加更多自定义选项和扩展性
