# zx-flex 组件

一个基于 uni-app 的 Flex 布局容器组件，支持 H5、小程序、App，适用于多端项目。

## 组件特性
- 支持主轴方向、换行、主轴/交叉轴对齐
- 支持自定义样式、类名
- 响应式 props，适配多端
- 不依赖浏览器特有 DOM

## Props 参数
| 参数           | 类型           | 默认值    | 说明                 |
|----------------|----------------|-----------|----------------------|
| customStyle    | String         | ''        | 自定义行内样式       |
| customClass    | String/Array   | []        | 自定义类名           |
| hoverClass     | String         | ''        | 点击时的类名         |
| direction      | String         | column    | 主轴方向 row/column  |
| wrap           | Boolean        | true      | 是否换行             |
| justifyContent | String         | ''        | 主轴对齐方式         |
| alignItems     | String         | ''        | 交叉轴对齐方式       |

## 平台兼容性
- H5
- 微信/支付宝/百度/字节跳动/QQ 小程序
- App（nvue、vue3）

## 使用示例
```vue
<template>
  <zx-flex direction="row" wrap :customStyle="'height:100px;'" justifyContent="center" alignItems="center">
    <view style="width:50px;height:50px;background:#f00;"></view>
    <view style="width:50px;height:50px;background:#0f0;"></view>
    <view style="width:50px;height:50px;background:#00f;"></view>
  </zx-flex>
```

## 插槽
- 默认插槽：用于放置子元素

## 注意事项
- 建议配合自定义样式使用，灵活布局
- 支持响应式属性，属性变化自动更新布局
