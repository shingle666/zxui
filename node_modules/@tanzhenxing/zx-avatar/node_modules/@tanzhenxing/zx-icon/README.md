# ZX-Icon 图标组件

## 组件介绍

ZX-Icon是一个功能丰富的图标组件，可以同时使用字体图标和图片。通过简单的配置，可以实现各种图标展示效果，支持自定义前缀、大小、颜色等多种属性。

## 适用范围

### 平台兼容性

#### 框架支持

| Vue3 |
| ---- |
| √    |

#### 小程序支持

| App | 快应用 | 微信小程序 | 支付宝小程序 | 百度小程序 | 字节小程序 | QQ小程序 |
| --- | ------ | ---------- | ------------ | ---------- | ---------- | -------- |
| √ | √ | √ | √ | √ | √ | √ |

#### 浏览器支持

| H5-Safari | Android Browser | 微信浏览器(Android) | QQ浏览器(Android) | Chrome | IE | Edge | Firefox |
| --------- | --------------- | ------------------- | ----------------- | ------ | -- | ---- | ------- |
| √ | √ | √ | √ | √ | √ | √ | √ |

### 框架兼容性
- 仅支持 Vue 3 框架
- 支持 uni-app 使用的 HBuilderX 和 CLI 方式搭建的项目
- 支持 vite 和 webpack 构建方式

### 适用场景
- 需要使用图标的各种界面
- 需要使用自定义图标库的场景
- 需要使用图片作为图标的场景
- 需要控制图标大小、颜色的场景
- 按钮、列表、导航等界面元素中使用图标

### 注意事项
- 本组件使用 Vue 3 的 `<script setup>` 语法开发，不兼容 Vue 2 项目
- 图标名称需要与引入的图标库名称一致
- 使用图片作为图标时，需要提供图片的路径

## 安装说明

### NPM 安装

```bash
# 使用 npm 安装
npm install @tanzhenxing/zx-icon

# 使用 yarn 安装
yarn add @tanzhenxing/zx-icon

# 使用 pnpm 安装
pnpm add @tanzhenxing/zx-icon
```

### 在项目中使用

#### 全局注册

在 `main.js` 中注册组件：

```js
import { createSSRApp } from 'vue'
import App from './App.vue'
import ZxIcon from '@tanzhenxing/zx-icon'

export function createApp() {
  const app = createSSRApp(App)
  app.component('zx-icon', ZxIcon)
  return {
    app
  }
}
```

#### 局部注册

在需要使用的组件中单独引入：

```vue
<script setup>
import ZxIcon from '@tanzhenxing/zx-icon';
</script>

<template>
  <zx-icon name="eye"></zx-icon>
</template>
```

#### easycom 模式（推荐）

在 `pages.json` 中配置 easycom 规则：

```json
// pages.json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "zx-icon": "@tanzhenxing/zx-icon"
    }
  }
}
```

配置完成后，可以在任意页面直接使用组件，无需额外引入：

```vue
<template>
  <zx-icon name="eye"></zx-icon>
</template>
```

## 引入方式

```vue
<script setup>
import ZxIcon from '@/components/zx-icon/zx-icon.vue';
</script>
```

## 基础用法

```vue
<zx-icon name="eye"></zx-icon>
```

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| name | String | - | 图标名称，如果是图片图标，则为图片的路径 |
| color | String | #b0b0b0 | 图标颜色 |
| size | String/Number | 34rpx | 图标字体大小 |
| bold | Boolean | false | 是否显示粗体 |
| customPrefix | String | zx-icon | 自定义扩展前缀，方便用户扩展自己的图标库 |
| mode | String | - | 图片的mode，用于图片图标 |
| width | String/Number | - | 用于显示图片小图标时，图片的宽度 |
| height | String/Number | - | 用于显示图片小图标时，图片的高度 |
| top | String/Number | - | 用于解决某些情况下，让图标垂直居中的用途 |

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击图标时触发 | event: Event |

## 使用示例

### 基础用法

使用内置图标：

```vue
<zx-icon name="eye"></zx-icon>
<zx-icon name="home"></zx-icon>
<zx-icon name="user"></zx-icon>
```

### 图标颜色

自定义图标颜色：

```vue
<zx-icon name="heart" color="#3e8ed0"></zx-icon>
<zx-icon name="check" color="#48c78e"></zx-icon>
<zx-icon name="exclamation-triangle" color="#ffe08a"></zx-icon>
<zx-icon name="times" color="#f14668"></zx-icon>
```

### 图标大小

自定义图标大小：

```vue
<zx-icon name="star" size="16px"></zx-icon>
<zx-icon name="star" size="24px"></zx-icon>
<zx-icon name="star" size="32px"></zx-icon>
```

### 粗体图标

```vue
<zx-icon name="alert" bold></zx-icon>
```

### 使用图片作为图标

当name属性中包含"/"时，会被识别为图片路径：

```vue
<zx-icon name="/static/icons/logo.png" width="40px" height="40px"></zx-icon>
```

### 自定义图标库

使用customPrefix属性可以自定义图标前缀，用于使用第三方图标库：

```vue
<zx-icon name="camera" customPrefix="custom-icon"></zx-icon>
```

### 垂直对齐

使用top属性可以调整图标的垂直位置，解决对齐问题：

```vue
<zx-icon name="align-center" top="2px"></zx-icon>
```

### 图标点击事件

```vue
<zx-icon name="bell" @click="handleClick"></zx-icon>

<script setup>
const handleClick = (event) => {
  console.log('图标被点击了', event);
}
</script>
```

## 注意事项

1. 使用图标前，需要确保相应的图标字体已经引入到项目中
2. 使用图片作为图标时，图片路径中必须包含"/"
3. 自定义前缀时，需要确保已经引入对应的图标库
4. 图标颜色属性对图片图标无效
5. 当同时设置size和width/height属性时，对于图片图标，优先使用width和height属性 