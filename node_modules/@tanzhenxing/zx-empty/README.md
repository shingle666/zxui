# zx-empty 空状态

## 介绍

该组件用于需要加载内容，但是加载的第一页数据就为空，提示一个"没有内容"的场景。

## 基础用法

```vue
<zx-empty text="暂无数据" icon="data"></zx-empty>
```

## 自定义图片

通过设置 `icon` 属性传入图片 URL。

```vue
<zx-empty text="暂无数据" icon="https://example.com/custom-empty.png"></zx-empty>
```

## 图片尺寸

通过使用 `imageSize` 属性来控制图片大小。

```vue
<zx-empty text="暂无数据" icon="data" :image-size="200"></zx-empty>
```

## 底部内容

使用默认插槽可在底部插入内容。

```vue
<zx-empty text="暂无数据" icon="data">
  <button type="primary" size="mini">刷新试试</button>
</zx-empty>
```

## 完全自定义

使用插槽自定义内容。

```vue
<zx-empty>
  <template #image>
    <image src="/static/custom-empty.png" style="width: 200rpx; height: 200rpx;"></image>
  </template>
  <template #description>
    <zx-text text="没有找到相关内容" color="#666" size="28rpx"></zx-text>
  </template>
  <button type="primary" size="mini">刷新试试</button>
</zx-empty>
```

## 属性说明

| 属性名     | 说明                           | 类型            | 默认值     |
| ---------- | ------------------------------ | --------------- | ---------- |
| show       | 是否显示组件                   | Boolean         | true       |
| marginTop  | 组件距离上一个元素之间的距离   | String          | '10rpx'    |
| icon       | 内置图标名称，或图片路径       | String          | 'data'     |
| text       | 提示文字                       | String          | '数据为空' |
| textColor  | 文字颜色                       | String          | '#c0c4cc'  |
| textSize   | 文字大小                       | String, Number  | '32rpx'    |
| iconColor  | 图标的颜色                     | String          | '#c0c4cc'  |
| iconSize   | 图标的大小                     | String, Number  | '180rpx'   |
| imageSize  | 图片尺寸，会同时设置宽度和高度 | String, Number  | ''         |
| width      | 图标宽度                       | String, Number  | '320rpx'   |
| height     | 图标高度                       | String, Number  | '320rpx'   |

## 插槽说明

| 插槽名      | 说明           |
| ----------- | -------------- |
| default     | 底部内容       |
| image       | 自定义图片     |
| description | 自定义描述文本 |

## 内置图标

组件内置了多种空状态图标，可通过 `icon` 属性指定：

- address: 地址为空
- auth: 权限为空
- cart: 购物车为空
- collection: 收藏为空
- comment: 评论为空
- coupon: 优惠券为空
- data: 数据为空（默认）
- message: 消息为空
- message_list: 消息列表为空
- news: 新闻为空
- orders: 订单为空
- page: 页面为空
- record: 记录为空
- search: 搜索为空
- wifi: 网络为空
