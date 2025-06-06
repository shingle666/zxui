# ZX-Text 文本组件

## 组件介绍

ZX-Text是一个功能丰富的文本处理组件，集成了文本类在项目中的常用功能，包括主题颜色、格式化日期、姓名脱敏等多种处理方式。通过简单的配置，可以实现各种文本展示效果。

## 项目地址

[ZX-Text](https://zxui.org/components/text)

## 适用范围
ZX-Text 适用于 uni-app 项目，vue3 框架，支持 H5、小程序、App 等平台。

### 平台兼容性

#### 框架支持

| Vue3 |
| ---- |
| √    |

#### 小程序支持

| App | 快应用 | 微信小程序 | 支付宝小程序 | 百度小程序 | 字节小程序 | QQ小程序 |
| --- | ------ | ---------- | ------------ | ---------- | ---------- | -------- |
| √ | √ | √ | √ | √ | √ | √ |

| 钉钉小程序 | 快手小程序 | 飞书小程序 | 京东小程序 | 鸿蒙元服务 |
| ---------- | ---------- | ---------- | ---------- | ---------- |
| √ | √ | √ | √ | √ |

#### 浏览器支持

| H5-Safari | Android Browser | 微信浏览器(Android) | QQ浏览器(Android) | Chrome | IE | Edge | Firefox |
| --------- | --------------- | ------------------- | ----------------- | ------ | -- | ---- | ------- |
| √ | √ | √ | √ | √ | √ | √ | √ |

### 框架兼容性
- 仅支持 Vue 3 框架
- 支持 uni-app 使用的 HBuilderX 和 CLI 方式搭建的项目
- 支持 vite 和 webpack 构建方式

### 适用场景
- 各种需要展示文本的场景
- 价格展示场景，如商城、电商类应用
- 需要数据脱敏处理的场景（如姓名、手机号等）
- 日期格式化展示需求
- 自定义排版需求（字体、大小、颜色等）
- 需要限制文本行数的场景
- 内容需要跳转链接的场景

### 注意事项
- 本组件使用 Vue 3 的 `<script setup>` 语法开发，不兼容 Vue 2 项目
- nvue 平台部分样式表现可能与其他平台有所差异，但基本功能都已做兼容处理
- 在低版本APP中，部分高级样式属性可能不支持，推荐使用最新版本的开发工具和运行环境

## 安装说明

### NPM 安装

```bash
# 使用 npm 安装
npm install @tanzhenxing/zx-text

# 使用 yarn 安装
yarn add @tanzhenxing/zx-text

# 使用 pnpm 安装
pnpm add @tanzhenxing/zx-text
```

### 在项目中使用

#### 全局注册

在 `main.js` 中注册组件：

```js
import { createSSRApp } from 'vue'
import App from './App.vue'
import ZxText from '@tanzhenxing/zx-text'

export function createApp() {
  const app = createSSRApp(App)
  app.component('zx-text', ZxText)
  return {
    app
  }
}
```

#### 局部注册

在需要使用的组件中单独引入：

```vue
<script setup>
import ZxText from '@tanzhenxing/zx-text';
</script>

<template>
  <zx-text text="基础文本"></zx-text>
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
      "zx-text": "@tanzhenxing/zx-text"
    }
  }
}
```

配置完成后，可以在任意页面直接使用组件，无需额外引入：

```vue
<template>
  <zx-text text="基础文本"></zx-text>
</template>
```

## 引入方式

```vue
<script setup>
import ZxText from '@/components/zx-text/zx-text.vue';
</script>
```

## 基础用法

```vue
<zx-text text="基础文本"></zx-text>
```

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | String | black | 主题颜色，可选值：primary, success, warning, danger, gray, black, white |
| text | String/Number | - | 显示的文本内容 |
| mode | String | text | 文本处理的匹配模式：text-普通文本，price-价格，name-姓名，date-日期，mobile-手机号码，link-链接 |
| fontFamily | String | - | 字体 |
| symbol | String | ￥ | 符号，常用于价格符号 |
| bold | Boolean | false | 是否粗体 |
| lines | String/Number | - | 文本显示的行数，如果设置，超出此行数，将会显示省略号 |
| color | String | - | 文本颜色 |
| size | String/Number | 32rpx | 字体大小 |
| decoration | String | none | 文字装饰，可选值：none, underline, line-through |
| lineHeight | String/Number | 50rpx | 文本行高 |
| align | String | left | 文本对齐方式，可选值：left, center, right |
| wordWrap | String | normal | 文字换行，可选值：break-word, normal, anywhere |
| selectable | Boolean | false | 是否可选择 |
| userSelect | Boolean | false | 是否可选择 |
| decode | Boolean | false | 是否解码 |
| block | Boolean | true | 是否块级元素 |
| space | String | - | 显示连续空格，可选值：ensp, emsp, nbsp |
| call | Boolean | false | 是否可点击拨打电话（仅手机号码模式下有效） |
| href | String | - | 链接地址（仅链接模式下有效） |
| target | String | _self | 链接打开方式，可选值：_self, _blank（仅链接模式下有效） |

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击文本时触发 | {text: 文本内容} |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| left | 文本左侧内容 |
| right | 文本右侧内容 |

## 使用示例

### 主题颜色

使用`type`属性可以设置多种预定义的主题颜色：

```vue
<zx-text text="主要颜色" type="primary"></zx-text>
<zx-text text="成功颜色" type="success"></zx-text>
<zx-text text="警告颜色" type="warning"></zx-text>
<zx-text text="危险颜色" type="danger"></zx-text>
<zx-text text="灰色" type="gray"></zx-text>
<zx-text text="黑色" type="black"></zx-text>
<zx-text text="白色" type="white"></zx-text>
```

### 文本处理模式

#### 价格模式

自动对数字进行千分位格式化：

```vue
<zx-text text="99.99" mode="price" type="primary"></zx-text>
<!-- 显示：￥ 99.99 -->

<zx-text text="1234.56" mode="price" type="primary"></zx-text>
<!-- 显示：￥ 1,234.56 -->

<!-- 自定义符号 -->
<zx-text text="1234.56" mode="price" symbol="$" type="primary"></zx-text>
<!-- 显示：$ 1,234.56 -->
```

#### 姓名脱敏

自动对姓名进行脱敏处理：

```vue
<zx-text text="张三" mode="name"></zx-text>
<!-- 显示：张* -->

<zx-text text="张三李" mode="name"></zx-text>
<!-- 显示：张*李 -->
```

#### 手机号码脱敏

自动对手机号码进行脱敏处理：

```vue
<zx-text text="13812345678" mode="mobile"></zx-text>
<!-- 显示：138****5678 -->
```

结合`call`属性，可以点击拨打电话：

```vue
<zx-text text="13812345678" mode="mobile" call></zx-text>
```

#### 日期格式化

自动对日期进行格式化：

```vue
<zx-text text="2023-05-20" mode="date"></zx-text>
<!-- 默认格式：yyyy-mm-dd -->

<!-- 时间戳转日期 -->
<zx-text :text="1684569600" mode="date"></zx-text>
<!-- 显示：2023-05-20 -->

<!-- 带时分秒的日期 -->
<zx-text text="2023-05-20 08:30:00" mode="date"></zx-text>
<!-- 显示：2023-05-20 -->
```

#### 链接模式

显示可点击的链接文本：

```vue
<!-- 内部页面链接 -->
<zx-text text="跳转到首页" mode="link" href="/pages/index/index"></zx-text>

<!-- 外部链接（当前窗口打开） -->
<zx-text text="访问官网" mode="link" href="https://zxui.org"></zx-text>

<!-- 外部链接（新窗口打开） -->
<zx-text text="访问文档" mode="link" href="https://zxui.org/components/intro.html" target="_blank"></zx-text>

<!-- 自定义颜色的链接 -->
<zx-text text="自定义颜色链接" mode="link" href="https://zxui.org" color="#ff7900"></zx-text>
```

### 排版样式

#### 对齐方式

```vue
<zx-text text="左对齐文本" align="left" block></zx-text>
<zx-text text="居中对齐文本" align="center" block></zx-text>
<zx-text text="右对齐文本" align="right" block></zx-text>
```

#### 文本修饰

```vue
<zx-text text="粗体文本" bold></zx-text>
<zx-text text="带下划线文本" decoration="underline"></zx-text>
<zx-text text="带中划线文本" decoration="line-through"></zx-text>
```

#### 尺寸与行高

```vue
<zx-text text="36rpx大小文本" size="36rpx"></zx-text>
<zx-text text="自定义行高文本" lineHeight="60rpx"></zx-text>
```

#### 自定义颜色

```vue
<zx-text text="红色文本" color="#FF0000"></zx-text>
<zx-text text="蓝色文本" color="#0000FF"></zx-text>
```

### 文本截断

单行截断：

```vue
<zx-text text="这是一段很长的文本，设置为单行显示，超出部分将会显示省略号。" lines="1"></zx-text>
```

多行截断：

```vue
<zx-text text="这是一段很长的文本，设置为两行显示，超出部分将会显示省略号。" lines="2"></zx-text>
```

### 插槽使用

```vue
<zx-text text="带左侧插槽">
  <template #left>
    <view class="icon">🔍</view>
  </template>
</zx-text>

<zx-text text="带右侧插槽">
  <template #right>
    <view class="icon">🔔</view>
  </template>
</zx-text>

<!-- 同时使用左右插槽 -->
<zx-text text="左右两侧都有插槽">
  <template #left>
    <view class="icon">👈</view>
  </template>
  <template #right>
    <view class="icon">👉</view>
  </template>
</zx-text>
```

### 组合使用

```vue
<zx-text text="组合样式展示" type="primary" bold size="36rpx"></zx-text>
<zx-text text="199.99" mode="price" type="danger" bold size="40rpx"></zx-text>
```

### 可选择文本

```vue
<zx-text text="这段文本可以被选择" selectable></zx-text>
```

### 文本间距

```vue
<zx-text text="这段文本使用了 emsp 空格" space="emsp"></zx-text>
<zx-text text="这段文本使用了 ensp 空格" space="ensp"></zx-text>
<zx-text text="这段文本使用了 nbsp 空格" space="nbsp"></zx-text>
```

## 注意事项

1. 当使用`mobile`模式配合`call`属性时，点击文本会触发电话拨打功能
2. 设置`lines`属性时，文本超出指定行数会自动显示省略号
3. 使用`block`属性可以控制文本是否为块级元素，默认为块级
4. 日期格式化默认为`yyyy-mm-dd`格式，支持多种输入格式，包括时间戳
5. 在nvue环境下，部分样式可能表现不同，组件内部已做兼容处理
6. 链接模式下，文本会自动添加下划线，点击时会根据`href`和`target`属性进行跳转 