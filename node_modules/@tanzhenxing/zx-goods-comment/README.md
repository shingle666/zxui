# GoodsComment 商品评论组件

> 一个功能完整的商品评论组件，支持评分、图片、回复等功能，适用于电商、社区等场景。

## 介绍

zx-goods-comment 是一个专为商品评论场景设计的组件，提供了完整的评论展示功能。组件支持用户头像、评分星级、评论内容、图片展示、回复列表等功能，同时支持点赞、回复、图片预览等交互操作。

## 基础用法

```vue
<template>
  <zx-goods-comment 
    :comment-list="commentList"
    @reply="handleReply"
    @like="handleLike"
  />
</template>

<script setup>
import { ref } from 'vue'

const commentList = ref([
  {
    id: 1,
    username: '张三',
    avatar: 'https://example.com/avatar1.jpg',
    rating: 5,
    content: '商品质量很好，物流也很快，非常满意！',
    createTime: '2023-10-15 14:30:00',
    likeCount: 12,
    isLiked: false,
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg'
    ],
    replies: [
      {
        id: 101,
        username: '客服小王',
        content: '感谢您的好评，我们会继续努力！'
      }
    ]
  }
])

const handleReply = ({ comment, index }) => {
  console.log('回复评论', comment)
}

const handleLike = ({ comment, index }) => {
  console.log('点赞评论', comment)
}
</script>
```

## 自定义样式

```vue
<zx-goods-comment 
  :comment-list="commentList"
  username-color="#2979ff"
  content-color="#333333"
  :username-size="32"
  :content-size="30"
  :show-border="false"
/>
```

## 隐藏功能模块

```vue
<zx-goods-comment 
  :comment-list="commentList"
  :show-rating="false"
  :show-actions="false"
/>
```

## 自定义图片数量

```vue
<zx-goods-comment 
  :comment-list="commentList"
  :max-images="6"
  :max-replies="5"
/>
```

## 加载更多

```vue
<zx-goods-comment 
  :comment-list="commentList"
  :show-load-more="true"
  load-more-text="点击加载更多"
  @load-more="loadMoreComments"
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| comment-list | 评论列表数据 | Array | [] |
| default-avatar | 默认头像 | String | base64默认头像 |
| avatar-mode | 头像裁剪模式 | String | aspectFill |
| show-border | 是否显示边框 | Boolean | true |
| show-rating | 是否显示评分 | Boolean | true |
| show-actions | 是否显示操作按钮 | Boolean | true |
| lazy-load | 图片是否懒加载 | Boolean | true |
| username-color | 用户名颜色 | String | #333333 |
| time-color | 时间颜色 | String | #999999 |
| content-color | 内容颜色 | String | #666666 |
| username-size | 用户名字体大小(rpx) | Number/String | 28 |
| time-size | 时间字体大小(rpx) | Number/String | 24 |
| content-size | 内容字体大小(rpx) | Number/String | 28 |
| line-height | 行高 | String | 1.5 |
| image-mode | 图片裁剪模式 | String | aspectFill |
| max-images | 最大显示图片数量 | Number | 3 |
| max-replies | 最大显示回复数量 | Number | 2 |
| empty-text | 空状态文本 | String | 暂无评论 |
| show-load-more | 是否显示加载更多 | Boolean | false |
| load-more-text | 加载更多文本 | String | 加载更多评论 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| reply | 点击回复时触发 | { comment, index } |
| like | 点击点赞时触发 | { comment, index } |
| image-preview | 点击图片预览时触发(仅H5) | { images, index } |
| more-replies | 点击查看更多回复时触发 | { comment, index } |
| load-more | 点击加载更多时触发 | - |

## 数据结构

### Comment 评论对象

```javascript
{
  id: 1,                    // 评论ID
  username: '用户名',        // 用户名
  avatar: 'avatar.jpg',     // 用户头像
  rating: 5,                // 评分(1-5)
  content: '评论内容',       // 评论内容
  createTime: '2023-10-15', // 创建时间
  likeCount: 10,            // 点赞数
  isLiked: false,           // 是否已点赞
  images: [                 // 评论图片
    'image1.jpg',
    'image2.jpg'
  ],
  replies: [                // 回复列表
    {
      id: 101,
      username: '回复者',
      content: '回复内容'
    }
  ]
}
```

## 注意事项

1. **图片预览**：在H5环境下，图片预览会触发 `image-preview` 事件，需要自行实现预览功能；在小程序和APP环境下，会自动调用原生的图片预览功能。

2. **时间格式化**：组件内置了时间格式化功能，支持相对时间显示（如：刚刚、5分钟前、1小时前等）。

3. **头像处理**：当用户没有头像时，会显示默认的SVG头像。

4. **响应式设计**：组件采用rpx单位，能够适配不同屏幕尺寸。

5. **性能优化**：支持图片懒加载，大量评论时建议配合虚拟列表使用。

## 样式变量

组件提供了以下CSS变量供自定义：

```scss
$zx-primary: #2979ff;                    // 主题色
$zx-border-color: #ebeef5;               // 边框颜色
$zx-text-color: #333333;                 // 主文本颜色
$zx-text-color-secondary: #666666;       // 次要文本颜色
$zx-text-color-placeholder: #999999;     // 占位文本颜色
$zx-bg-color: #f8f9fa;                   // 背景色
$zx-spacing-xs: 8rpx;                    // 最小间距
$zx-spacing-sm: 16rpx;                   // 小间距
$zx-spacing-md: 24rpx;                   // 中等间距
$zx-spacing-lg: 32rpx;                   // 大间距
```

## 兼容性

- ✅ H5
- ✅ 小程序（微信、支付宝、百度、字节跳动、QQ、快手、京东）
- ✅ APP（iOS、Android）

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持评论列表展示
- ✨ 支持评分星级显示
- ✨ 支持图片展示和预览
- ✨ 支持回复列表
- ✨ 支持点赞和回复操作
- ✨ 支持自定义样式
- ✨ 支持空状态和加载更多
- ✨ 支持多端兼容