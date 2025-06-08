# ZX Status Bar 组件

## 介绍

`zx-status-bar` 是一个用于自适应状态栏高度的组件，主要用于自定义导航栏时，自动适配一个恰当的状态栏高度。支持各种移动端平台，包括 iOS、Android 以及各类小程序。

## 特性

- 自动适配不同平台的状态栏高度
- 支持固定定位与相对定位
- 支持安全区域高度计算
- 可自定义背景色和层级
- 性能优化，使用计算属性提升渲染效率
- 提前获取状态栏高度，避免页面闪烁

## 安装与使用

### NPM 安装

```bash
# 使用 npm 安装
npm install @tanzhenxing/zx-status-bar

# 使用 yarn 安装
yarn add @tanzhenxing/zx-status-bar

# 使用 pnpm 安装
pnpm add @tanzhenxing/zx-status-bar
```

### 导入和注册

#### 全局注册

在 main.js 中注册组件：

```js
import { createSSRApp } from 'vue'
import ZxStatusBar from '@tanzhenxing/zx-status-bar'

export function createApp() {
  const app = createSSRApp(App)
  
  // 全局注册组件
  app.component('zx-status-bar', ZxStatusBar)
  
  return {
    app
  }
}
```

#### 局部注册

在单个组件中使用：

```vue
<script setup>
import ZxStatusBar from '@tanzhenxing/zx-status-bar'
</script>

<template>
  <zx-status-bar></zx-status-bar>
</template>
```

#### easycom 自动注册（推荐）

在项目的 `pages.json` 中配置 easycom：

```json
// pages.json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^zx-status-bar$": "@tanzhenxing/zx-status-bar"
    }
  }
}
```

配置完成后，可在项目的任意页面中直接使用，无需手动导入。

## 基础用法

```vue
<template>
  <zx-status-bar></zx-status-bar>
  <view class="content">
    <!-- 页面内容 -->
  </view>
</template>
```

## 使用场景

### 自定义背景色

```vue
<template>
  <zx-status-bar backgroundColor="#007AFF"></zx-status-bar>
</template>
```

### 固定在顶部

```vue
<template>
  <zx-status-bar :fixed="true" backgroundColor="#007AFF"></zx-status-bar>
</template>
```

### 使用安全区域计算（适配刘海屏）

```vue
<template>
  <zx-status-bar :useSafe="true"></zx-status-bar>
</template>
```

### 设置层级

```vue
<template>
  <zx-status-bar :zIndex="1000"></zx-status-bar>
</template>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| backgroundColor | String | "transparent" | 状态栏背景色 |
| zIndex | Number | 999 | 层级，数值越大越靠前 |
| fixed | Boolean | false | 是否固定在顶部 |
| useSafe | Boolean | true | 是否使用安全区域高度计算 |

## 插槽

组件提供一个默认插槽，可以在状态栏中插入内容：

```vue
<template>
  <zx-status-bar backgroundColor="#ffffff">
    <text class="status-text">状态栏文本</text>
  </zx-status-bar>
</template>
```

## 平台差异说明

- 在不同平台上，状态栏高度可能有所不同
- 如果获取不到状态栏高度，会根据平台设置合理的默认值：
  - APP/H5：默认 20px
  - 微信小程序：默认 44px
- 在微信小程序中，会自动使用安全区域适配机制

## 性能优化

组件采用以下优化措施提高性能：

1. 使用 `computed` 计算属性处理样式，避免模板中的复杂计算
2. 在 `onBeforeMount` 钩子中提前获取状态栏高度，减少页面闪烁
3. 针对不同平台设置默认值，确保在各种环境下都能正常工作

## 注意事项

1. 当 `fixed` 设置为 `true` 时，状态栏将固定在页面顶部，不随页面滚动
2. 若自定义导航栏，推荐将状态栏与导航栏组合使用
3. 在某些平台上，可能需要配合页面的 `navigationStyle: "custom"` 设置使用

## 示例代码

### 基础示例

```vue
<template>
  <view>
    <zx-status-bar></zx-status-bar>
    <view class="nav-bar">
      <text>我的应用</text>
    </view>
    <view class="content">
      <!-- 页面内容 -->
    </view>
  </view>
</template>

<style>
.nav-bar {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}
</style>
```

### 自定义导航栏示例

```vue
<template>
  <view class="page">
    <view class="custom-nav">
      <zx-status-bar backgroundColor="#ff6700" :fixed="true"></zx-status-bar>
      <view class="nav-content">
        <view class="back-btn" @click="goBack">
          <text class="iconfont icon-back"></text>
        </view>
        <text class="page-title">详情页</text>
        <view class="placeholder"></view>
      </view>
    </view>
    
    <view class="page-content">
      <!-- 页面内容 -->
    </view>
  </view>
</template>

<script setup>
function goBack() {
  uni.navigateBack();
}
</script>

<style>
.page {
  background-color: #f8f8f8;
}
.custom-nav {
  width: 100%;
}
.nav-content {
  height: 44px;
  background-color: #ff6700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}
.back-btn {
  width: 25px;
}
.page-title {
  color: #ffffff;
  font-size: 16px;
}
.placeholder {
  width: 25px;
}
.page-content {
  padding: 15px;
}
</style>
```

### 透明状态栏（沉浸式体验）

```vue
<template>
  <view class="page">
    <!-- 透明状态栏，实现沉浸式效果 -->
    <zx-status-bar :fixed="true" backgroundColor="transparent"></zx-status-bar>
    
    <!-- 页面背景图 -->
    <image class="bg-image" src="/static/images/banner.jpg" mode="aspectFill"></image>
    
    <!-- 页面内容 -->
    <view class="content">
      <text class="title">沉浸式体验</text>
    </view>
  </view>
</template>

<style>
.page {
  position: relative;
}
.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40vh;
  z-index: 1;
}
.content {
  position: relative;
  z-index: 2;
  padding-top: 25vh;
}
.title {
  font-size: 24px;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  text-align: center;
  font-weight: bold;
}
</style>
```

## 结合页面配置使用

在页面的 `pages.json` 中设置：

```json
{
  "path": "pages/index/index",
  "style": {
    "navigationStyle": "custom",
    "app-plus": {
      "titleNView": false
    }
  }
}
```

然后在页面中使用 `zx-status-bar` 组件来构建自定义导航栏。
