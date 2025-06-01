# zx-popup 弹出层

## 介绍

弹出层容器，用于展示弹窗、信息提示等内容，支持上下左右和中部弹出。

## 基本用法

```vue
<template>
  <view>
    <zx-button @click="showPopup('bottom')">底部弹出</zx-button>
    
    <zx-popup 
      :show="show" 
      mode="bottom" 
      @close="closePopup"
    >
      <view class="popup-content">
        <text>弹窗内容</text>
        <zx-button @click="closePopup">关闭弹窗</zx-button>
      </view>
    </zx-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);

const showPopup = () => {
  show.value = true;
};

const closePopup = () => {
  show.value = false;
};
</script>

<style>
.popup-content {
  padding: 30rpx;
}
</style>
```

## 弹出方向

通过 `mode` 属性设置弹出方向，支持 `top`、`bottom`、`left`、`right`、`center` 五种方向。

```vue
<zx-popup :show="show" mode="top">顶部弹出内容</zx-popup>
<zx-popup :show="show" mode="bottom">底部弹出内容</zx-popup>
<zx-popup :show="show" mode="left">左侧弹出内容</zx-popup>
<zx-popup :show="show" mode="right">右侧弹出内容</zx-popup>
<zx-popup :show="show" mode="center">居中弹出内容</zx-popup>
```

## 关闭图标

设置 `closeable` 属性后，会在弹出层的右上角显示关闭图标，并且可以通过 `closeIconPos` 属性设置图标位置。

```vue
<zx-popup 
  :show="show" 
  mode="bottom" 
  closeable 
  closeIconPos="top-right"
  @close="closePopup"
>
  内容
</zx-popup>
```

## 圆角弹窗

设置 `round` 属性可以让弹窗内容显示圆角。

```vue
<zx-popup :show="show" mode="bottom" round="10rpx">
  圆角内容
</zx-popup>
```

## 禁止滚动穿透

默认情况下，弹窗显示时会锁定背景滚动。可以通过设置 `lockScroll` 为 `false` 来取消此限制。

```vue
<zx-popup :show="show" :lockScroll="false">
  内容
</zx-popup>
```

## ESC 键关闭

在 H5 环境下，可以通过 ESC 键关闭弹窗，默认开启，可以通过 `closeOnEsc` 属性控制。

```vue
<zx-popup :show="show" :closeOnEsc="false">
  内容
</zx-popup>
```

## API

### Props

| 参数                  | 说明                          | 类型             | 默认值     |
|-----------------------|-------------------------------|-----------------|------------|
| show                  | 是否显示弹出层                | Boolean         | false      |
| overlay               | 是否显示遮罩                  | Boolean         | true       |
| mode                  | 弹出方向                      | String          | bottom     |
| duration              | 动画时长，单位ms              | String / Number | 300        |
| overlayDuration       | 遮罩层动画时长，单位ms        | String / Number | 350        |
| closeable             | 是否显示关闭图标              | Boolean         | false      |
| overlayStyle          | 自定义遮罩的样式              | Object / String | {}         |
| overlayOpacity        | 遮罩透明度，0-1之间           | String / Number | 0.8        |
| closeOnClickOverlay   | 点击遮罩是否关闭弹窗          | Boolean         | true       |
| zIndex                | 层级                         | String / Number | 10075      |
| safeAreaInsetBottom   | 是否为底部安全区预留空间      | Boolean         | true       |
| safeAreaInsetTop      | 是否为顶部安全区预留空间      | Boolean         | false      |
| closeIconPos          | 关闭图标位置                  | String          | top-right  |
| round                 | 圆角值                        | String / Number | 5rpx       |
| zoom                  | 是否开启缩放动画              | Boolean         | true       |
| bgColor               | 弹窗背景色                    | String          | #ffffff    |
| border                | 是否显示边框                  | Boolean         | false      |
| customStyle           | 自定义弹窗样式                | Object          | {}         |
| closeOnEsc            | 是否支持ESC键关闭             | Boolean         | true       |
| lockScroll            | 是否锁定背景滚动              | Boolean         | true       |
| role                  | ARIA角色属性                 | String          | dialog     |
| ariaLabel             | ARIA标签                     | String          | 弹窗       |

### closeIconPos 有效值
- top-left: 左上角
- top-right: 右上角
- bottom-left: 左下角
- bottom-right: 右下角

### Events

| 事件名 | 说明           | 回调参数 |
|--------|----------------|----------|
| open   | 弹出层打开时触发 | -        |
| close  | 弹出层关闭时触发 | -        |
| click  | 弹出层点击时触发 | -        |

### Slots

| 名称    | 说明         |
|---------|-------------|
| default | 弹窗内容     |

## 注意事项

1. 弹窗内容部分可自定义，通过默认插槽传入
2. 弹窗的层级默认为10075，请确保不会与其他组件层级冲突
3. 在弹窗内部的滚动内容，建议添加`.scroll-view`样式类以获得更好的滚动体验
4. 当使用`mode="center"`模式时，建议设置合适的`zIndex`以确保弹窗正常显示
5. 当需要自定义弹窗样式时，可以通过`customStyle`属性进行设置
