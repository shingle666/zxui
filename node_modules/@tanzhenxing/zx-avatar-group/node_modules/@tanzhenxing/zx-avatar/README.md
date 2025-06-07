# zx-avatar 头像组件

## 介绍

zx-avatar 是一个功能丰富的头像展示组件，支持图片、文字、图标等多种形式，并且可以配置徽标、形状、大小等属性。

## 平台兼容性

| H5  | 微信小程序 | 支付宝小程序 | 百度小程序 | QQ小程序 | 字节小程序 | 快手小程序 | App |
| --- | --------- | ----------- | --------- | ------- | --------- | --------- | --- |
| √   | √         | √           | √         | √       | √         | √         | √   |

## 基本使用

### 基础用法

```html
<zx-avatar :src="avatarUrl" />
```

### 不同形状

```html
<!-- 圆形头像（默认） -->
<zx-avatar :src="avatarUrl" shape="circle" />

<!-- 方形头像 -->
<zx-avatar :src="avatarUrl" shape="square" />
```

### 不同尺寸

```html
<zx-avatar :src="avatarUrl" size="80rpx" />
<zx-avatar :src="avatarUrl" size="120rpx" />
<zx-avatar :src="avatarUrl" size="160rpx" />
```

### 文字头像

当无法显示图片时，可以使用文字作为替代

```html
<zx-avatar text="ZX" />
<zx-avatar text="UI" bg-color="#ff7900" />
<zx-avatar text="头像" bg-color="#3c9cff" />
```

### 图标头像

```html
<zx-avatar icon="home" />
<zx-avatar icon="star" bg-color="#5ac725" />
```

### 带徽标的头像

```html
<!-- 数字徽标 -->
<zx-avatar :src="avatarUrl" badge="99" />

<!-- 小红点徽标 -->
<zx-avatar :src="avatarUrl" badge="1" badge-is-dot />

<!-- 自定义徽标位置 -->
<zx-avatar :src="avatarUrl" badge="NEW" badge-position="leftBottom" />
```

### 小程序头像

在微信、QQ、百度小程序中，可以获取用户头像

```html
<zx-avatar mp-avatar />
```

### 随机背景色

当设置文字或图标时，可以使用随机背景色

```html
<zx-avatar text="随机" random-bg-color />
<zx-avatar icon="home" random-bg-color />
```

### 加载失败显示

当头像图片加载失败时，会显示默认头像，也可以自定义

```html
<zx-avatar src="错误链接" />
<zx-avatar src="错误链接" default-url="https://example.com/default-avatar.jpg" />
```

### 点击预览

```html
<zx-avatar :src="avatarUrl" preview />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 头像图片链接 | String | - |
| shape | 头像形状，可选值为 `circle`、`square` | String | `circle` |
| size | 头像尺寸，可以为数值或字符串 | String \| Number | `100rpx` |
| mode | 图片裁剪模式，与uni-app的image组件mode属性一致 | String | `aspectFill` |
| text | 文字内容，优先级高于src | String | - |
| bg-color | 背景颜色，一般用于文字头像 | String | `#c0c4cc` |
| color | 文字颜色 | String | `#ffffff` |
| font-size | 文字大小 | String \| Number | `36rpx` |
| icon | 图标名称，优先级高于src，低于text | String | - |
| mp-avatar | 是否显示小程序头像（仅微信、QQ、百度小程序有效） | Boolean | `false` |
| random-bg-color | 是否使用随机背景色 | Boolean | `false` |
| default-url | 加载失败时显示的默认头像 | String | - |
| color-index | 随机背景色的索引，取值0-19 | String \| Number | `0` |
| name | 组件标识符 | String | `avatar` |
| preview | 是否允许点击预览图片 | Boolean | `false` |
| badge | 徽标内容 | String \| Number \| Boolean | - |
| badge-color | 徽标背景颜色 | String | `#ff4d4f` |
| badge-style | 自定义徽标样式 | Object | - |
| custom-class | 自定义样式类名 | String | - |
| img-class | 自定义图片样式类名 | String | - |
| lazy-load | 是否开启图片懒加载 | Boolean | `false` |
| loading-color | 加载动画颜色 | String | `#ffffff` |
| badge-offset | 徽标的偏移量 | Array | `[0, 0]` |
| badge-is-dot | 徽标是否显示为一个小点 | Boolean | `false` |
| badge-show-zero | 值为零时是否显示徽标 | Boolean | `true` |
| badge-position | 徽标的位置，可选值为 `rightTop`、`rightBottom`、`leftBottom`、`leftTop` | String | `rightTop` |
| badge-font-size | 徽标的字体大小 | String | `22rpx` |
| badge-scale | 徽标的缩放比例 | Number | `0.8` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击头像时触发 | name: 组件标识符 |
| error | 图片加载失败时触发 | name: 组件标识符 |
| load | 图片加载完成时触发 | name: 组件标识符 |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义头像内容，会覆盖组件内部所有内容 |

## 使用示例

### 完整示例

```html
<template>
  <view class="container">
    <!-- 基础用法 -->
    <zx-avatar :src="avatarUrl" />
    
    <!-- 带徽标的头像 -->
    <zx-avatar 
      :src="avatarUrl" 
      badge="99" 
      badge-color="#2979ff"
      badge-position="rightTop"
      :badge-offset="[2, 2]"
    />
    
    <!-- 文字头像 -->
    <zx-avatar 
      text="ZX" 
      bg-color="#ff9900"
      size="120rpx"
      @click="handleClick"
    />
    
    <!-- 自定义样式 -->
    <zx-avatar 
      :src="avatarUrl" 
      shape="square" 
      custom-class="my-avatar" 
      img-class="my-image"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const avatarUrl = ref('https://example.com/avatar.jpg');

const handleClick = (name) => {
  console.log('点击了头像:', name);
};
</script>

<style>
.container {
  display: flex;
  justify-content: space-around;
  margin: 20px;
}
.my-avatar {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
```

## 注意事项

1. 当同时设置了 `text`、`icon` 和 `src` 时，优先级为：`text` > `icon` > `src`
2. 小程序头像 `mp-avatar` 仅在微信、QQ、百度小程序中有效
3. 图片预览功能仅在图片模式下有效，文字或图标模式下无效
4. 徽标功能基于 zx-badge 组件实现，支持 zx-badge 的所有属性配置
