# zx-page-header 页头组件

如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。

## 安装方式

本组件符合[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)规范，`HBuilderX 2.5.5`起，只需将本组件导入项目，在页面`template`中即可直接使用，无需在页面中`import`和注册`components`。

## 基本用法

```html
<zx-page-header @back="goBack">
  <template #content>
    <text>标题</text>
  </template>
</zx-page-header>
```

```js
const goBack = () => {
  uni.navigateBack();
}
```

## 自定义图标

默认图标可能无法满足您的需求，您可以通过设置`icon`属性来自定义图标。

```html
<zx-page-header icon="left" @back="goBack">
  <template #content>
    <text>标题</text>
  </template>
</zx-page-header>
```

## 无图标

有时，页面全是元素，您可能不想展示页面上方的图标，您可以设置`icon`属性值为空字符串来去除它。

```html
<zx-page-header icon="" @back="goBack">
  <template #content>
    <text>标题</text>
  </template>
</zx-page-header>
```

## 面包屑导航

使用页头组件，您可以通过添加插槽 `breadcrumb` 来设置面包屑路由导航。

```html
<zx-page-header @back="goBack">
  <template #breadcrumb>
    <zx-breadcrumb separator="/">
      <zx-breadcrumb-item to="/pages/index/index">首页</zx-breadcrumb-item>
      <zx-breadcrumb-item to="/pages/components/index">组件</zx-breadcrumb-item>
      <zx-breadcrumb-item>页头</zx-breadcrumb-item>
    </zx-breadcrumb>
  </template>
  <template #content>
    <text>标题</text>
  </template>
</zx-page-header>
```

## 额外操作部分

头部可能会变得很复杂，您可以在头部添加更多的区块，以允许丰富的交互。

```html
<zx-page-header @back="goBack">
  <template #content>
    <view class="content-with-avatar">
      <image class="avatar" src="https://cdn.uviewui.com/uview/album/1.jpg" mode="aspectFill"></image>
      <view class="title-container">
        <text class="title">标题</text>
        <text class="subtitle">副标题</text>
        <zx-tag type="primary" size="small">标签</zx-tag>
      </view>
    </view>
  </template>
  <template #extra>
    <view class="extra-buttons">
      <button size="mini" @click="handlePrint">打印</button>
      <button size="mini" type="primary" @click="handleEdit">编辑</button>
    </view>
  </template>
</zx-page-header>
```

## 主要内容

有时我们想让页头显示一些协同响应内容，我们可以使用 `default` 插槽。

```html
<zx-page-header @back="goBack">
  <template #content>
    <text>标题</text>
  </template>
  <view class="page-content">
    <text class="content-text">您可以在此处添加任何内容，这部分将作为页头的主体内容显示。</text>
  </view>
</zx-page-header>
```

## 组件插槽结构

本组件由这些部件构成：

```html
<template>
  <zx-page-header>
    <!-- 第1行 -->
    <template #breadcrumb />
    <!-- 第2行 -->
    <template #icon />
    <template #title />
    <template #content />
    <template #extra />
    <!-- 第2行之后 -->
    <template #default />
  </zx-page-header>
</template>
```

## API

### 属性

| 参数    | 说明                               | 类型    | 默认值      |
| ------- | ---------------------------------- | ------- | ----------- |
| icon    | 页头的图标名称，为空字符串则不显示 | String  | arrow-left  |
| title   | 页头的主标题                       | String  | 返回        |
| content | 页头的内容                         | String  | -           |
| size    | 尺寸：large、default、small        | String  | default     |

### 事件

| 事件名 | 说明           | 回调参数 |
| ------ | -------------- | -------- |
| back   | 点击左侧区域触发 | -        |

### 插槽

| 名称       | 说明         |
| ---------- | ------------ |
| icon       | 图标内容     |
| title      | 标题内容     |
| content    | 内容         |
| extra      | 扩展设置     |
| breadcrumb | 面包屑导航内容 |
| default    | 默认内容     |

## 示例

完整示例请参考 [页头组件示例](../../pages/components/page-header/index.vue)
