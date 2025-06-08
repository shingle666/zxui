# zx-goods-card 商品卡片

用于展示商品的图片、价格等信息。

## 平台兼容性

| H5 | App | 小程序 |
| --- | --- | --- |
| ✔️ | ✔️ | ✔️ |

## 基本用法

```vue
<template>
  <zx-goods-card
    title="商品标题"
    desc="描述信息"
    num="2"
    price="2.00"
    thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
  />
</template>
```

## Props

| 参数         | 说明                                     | 类型            | 默认值 | H5 | App | 小程序 |
| ------------ | ---------------------------------------- | --------------- | ------ | --- | --- | --- |
| title        | 标题                                     | String          | -      | ✔️ | ✔️ | ✔️ |
| desc         | 描述                                     | String          | -      | ✔️ | ✔️ | ✔️ |
| thumb        | 左侧图片 URL                             | String          | -      | ✔️ | ✔️ | ✔️ |
| num          | 商品数量                                 | String, Number  | -      | ✔️ | ✔️ | ✔️ |
| price        | 商品价格                                 | String, Number  | -      | ✔️ | ✔️ | ✔️ |
| origin-price | 商品划线原价                             | String, Number  | -      | ✔️ | ✔️ | ✔️ |
| tag          | 图片角标                                 | String          | -      | ✔️ | ✔️ | ✔️ |
| currency     | 货币符号                                 | String          | ¥      | ✔️ | ✔️ | ✔️ |
| centered     | 内容是否垂直居中                         | Boolean         | false  | ✔️ | ✔️ | ✔️ |
| lazy-load    | 是否开启图片懒加载，须配合 Lazyload 组件使用 | Boolean         | false  | ✔️ | ✔️ | ✔️ |
| thumb-link   | 点击左侧图片后跳转的链接地址             | String          | -      | ✔️ | ✔️ | ✔️ |

## Events

| 事件名      | 说明                 | 回调参数        | H5 | App | 小程序 |
| ----------- | -------------------- | --------------- | --- | --- | --- |
| click       | 点击时触发           | event: MouseEvent | ✔️ | ✔️ | ✔️ |
| click-thumb | 点击自定义图片时触发 | event: MouseEvent | ✔️ | ✔️ | ✔️ |

## Slots

| 名称         | 说明               |
| ------------ | ------------------ |
| title        | 自定义标题         |
| desc         | 自定义描述         |
| num          | 自定义数量         |
| price        | 自定义价格         |
| origin-price | 自定义商品原价     |
| price-top    | 自定义价格上方区域 |
| bottom       | 自定义价格下方区域 |
| thumb        | 自定义图片         |
| tag          | 自定义图片角标     |
| tags         | 自定义描述下方标签区域 |
| footer       | 自定义右下角内容   |