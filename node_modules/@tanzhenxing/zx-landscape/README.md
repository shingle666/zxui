# zx-landscape 组件

一个适用于 H5、小程序、App 的弹窗/横屏内容展示组件，基于 `uni-app` + `vue3 setup` 实现。

## 组件特性
- 支持遮罩、关闭按钮、位置自定义
- 支持点击遮罩关闭、参数传递
- 兼容 H5、微信/支付宝/百度/字节小程序、App
- 不依赖浏览器特有 DOM

## 使用方法

### 1. 注册组件

```vue
<template>
  <zx-landscape v-model:show="show" @close="onClose">
    <view>内容</view>
  </zx-landscape>
</template>

<script setup>
import { ref } from 'vue';
const show = ref(false);
function onClose(e) {
  show.value = false;
}
</script>
```

### 2. Props 属性

| 属性名         | 说明                     | 类型            | 默认值           |
| -------------- | ------------------------ | --------------- | ---------------- |
| show           | 是否显示                 | Boolean         | false            |
| zIndex         | 内容区 z-index           | Number          | 1001             |
| closeIcon      | 是否显示关闭图标         | Boolean         | true             |
| iconColor      | 关闭图标颜色             | String          | #fff             |
| iconSize       | 关闭图标大小（px）       | Number          | 25               |
| position       | 关闭图标位置（1底部/2右上/3左上） | Number/String | 1                |
| iconTop        | 关闭图标 top 值          | String          | -120rpx          |
| iconBottom     | 关闭图标 bottom 值       | String          | -120rpx          |
| iconLeft       | 关闭图标 left 值         | String          | 0                |
| iconRight      | 关闭图标 right 值        | String          | 0                |
| maskClosable   | 点击遮罩是否可关闭       | Boolean         | true             |
| mask           | 是否显示遮罩             | Boolean         | true             |
| maskBgColor    | 遮罩背景色               | String          | rgba(0,0,0,.6)   |
| maskZIndex     | 遮罩 z-index             | Number          | 1000             |
| params         | 关闭时自定义参数         | Number/String   | 0                |

### 3. 事件

| 事件名 | 说明           | 回调参数           |
| ------ | -------------- | ------------------ |
| close  | 关闭时触发     | { params }         |

### 4. 插槽

- 默认插槽：内容区

### 5. 平台兼容性

- H5、微信/支付宝/百度/字节小程序、App
- 不依赖 window/document 等浏览器特有对象

### 6. 示例代码

详见 `src/pages/components/landscape/index.vue`

```vue
<zx-landscape v-model:show="show" :position="2" iconTop="20rpx" iconRight="20rpx">
  <view>右上角关闭图标</view>
</zx-landscape>
```
