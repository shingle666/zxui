# zx-col 列布局组件

> 该组件基于 [uni-app uni-row/uni-col](https://uniapp.dcloud.net.cn/component/uniui/uni-row.html) 思路实现，适用于 H5、各类小程序、App，无浏览器特有 DOM 依赖。

## 介绍

`zx-col` 用于栅格布局中的列，与 `zx-row` 搭配使用，快速实现响应式分栏布局。每行分为 24 份，通过设置 `span`、`offset` 等属性灵活控制每列宽度和偏移。

## 平台兼容性
- H5
- 微信/支付宝/百度/抖音/QQ/快手/京东/华为/360/小红书等主流小程序
- App（vue、nvue）

## 属性说明
| 属性名   | 类型           | 默认值 | 说明 |
|----------|----------------|--------|------|
| span     | Number         | 24     | 占据的列数（1-24） |
| offset   | Number         | -1     | 左侧偏移的列数 |
| pull     | Number         | -1     | 向左移动的列数 |
| push     | Number         | -1     | 向右移动的列数 |
| xs       | Number/Object  | -      | <768px 响应式设置，Number为列数，Object可配置span/offset等 |
| sm       | Number/Object  | -      | ≥768px 响应式设置 |
| md       | Number/Object  | -      | ≥992px 响应式设置 |
| lg       | Number/Object  | -      | ≥1200px 响应式设置 |
| xl       | Number/Object  | -      | ≥1920px 响应式设置 |

> 响应式属性如 `xs`、`sm`、`md`、`lg`、`xl` 可传数字（表示span），或对象（如 `{span: 4, offset: 2}`）。

## 用法示例

```vue
<template>
  <zx-row :gutter="16">
    <zx-col :span="8"><view class="demo-box">8</view></zx-col>
    <zx-col :span="8"><view class="demo-box">8</view></zx-col>
    <zx-col :span="8"><view class="demo-box">8</view></zx-col>
  </zx-row>

  <zx-row :gutter="16">
    <zx-col :span="6"><view class="demo-box">6</view></zx-col>
    <zx-col :span="6" :offset="6"><view class="demo-box">6 offset 6</view></zx-col>
    <zx-col :span="6"><view class="demo-box">6</view></zx-col>
  </zx-row>

  <zx-row :gutter="16">
    <zx-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      <view class="demo-box">响应式</view>
    </zx-col>
    <zx-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
      <view class="demo-box">响应式</view>
    </zx-col>
  </zx-row>
</template>
```

## 响应式用法

- 直接传数字：`<zx-col :sm="12" />` 表示在sm及以上屏幕宽度占12列。
- 传对象：`<zx-col :md="{span:8, offset:4}" />` 表示md及以上屏幕宽度占8列，左侧偏移4列。

## 注意事项
- 需配合 `zx-row` 使用。
- `gutter` 间距由 `zx-row` 控制。
- 不依赖 window/document 等浏览器对象，适配多端。

## 相关链接
- [uni-ui uni-row/uni-col 官方文档](https://uniapp.dcloud.net.cn/component/uniui/uni-row.html)
- [zx-row 组件说明](../zx-row/README.md) 