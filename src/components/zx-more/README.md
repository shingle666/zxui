# zx-more 组件

一个基于 uni-app、Vue3 `<script setup>` 语法开发的高兼容性"更多"组件，适配 H5、小程序、App。

## 功能特性
- 支持自定义文字、颜色、大小、图标
- 支持跳转不同页面类型
- 支持禁用、加载态
- 支持自定义插槽（前缀、后缀、内容）
- 兼容 H5、小程序、App

## 属性（Props）
| 属性名     | 说明           | 类型    | 默认值                |
|------------|----------------|---------|-----------------------|
| text       | 显示文字       | String  | 更多                  |
| color      | 文字/图标颜色  | String  | #555555               |
| size       | 文字大小       | String  | 28rpx                 |
| link       | 跳转链接       | String  | 空                    |
| linkType   | 跳转类型       | String  | navigateTo            |
| iconName   | 图标名称       | String  | arrow-right-double    |
| disabled   | 是否禁用       | Boolean | false                 |
| loading    | 是否加载中     | Boolean | false                 |

## 插槽（Slots）
| 名称     | 说明           |
|----------|----------------|
| default  | 自定义文字内容 |
| prefix   | 文字前自定义   |
| suffix   | 文字后自定义   |

## 事件（Events）
无（点击事件已内置处理跳转，禁用/加载态下不可点击）

## 使用示例
```vue
<template>
  <zx-more text="查看更多" color="#2979ff" size="32rpx" link="/pages/demo/index" linkType="navigateTo" iconName="arrow-right-double" />

  <!-- 禁用态 -->
  <zx-more text="不可点击" :disabled="true" />

  <!-- 加载态 -->
  <zx-more text="加载中..." :loading="true" />

  <!-- 自定义插槽 -->
  <zx-more>
    <template #prefix>
      <zx-icon name="star" color="#f90" size="28rpx" />
    </template>
    <template #default>
      <text>自定义内容</text>
    </template>
    <template #suffix>
      <zx-icon name="arrow-right" color="#2979ff" size="28rpx" />
    </template>
  </zx-more>
```

## 平台兼容性
- H5
- 微信/支付宝/百度/字节/QQ/快手等主流小程序
- App（基于 uni-app）

## 注意事项
- 依赖 `zx-icon` 组件，请确保已全局/局部注册。
- `link` 为空时点击无跳转。
- `disabled` 或 `loading` 状态下不可点击。
