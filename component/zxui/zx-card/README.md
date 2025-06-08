# zx-card 卡片组件

> 一个功能丰富的卡片组件，用于显示图文内容，支持自定义样式、主题和交互效果。

## 介绍

zx-card 是一个通用卡片组件，可用于展示产品、文章、个人信息等内容。组件支持封面图、缩略图、标题、副标题、额外信息、内容区域以及底部操作区域，同时提供丰富的样式自定义选项。

## 基础用法

```vue
<template>
  <zx-card 
    title="卡片标题" 
    sub-title="卡片副标题" 
    :thumbnail="require('@/static/avatar.png')"
    extra="额外信息"
    @click="onClick"
  >
    这里是卡片的内容区域
  </zx-card>
</template>

<script setup>
const onClick = (type) => {
  console.log('点击了', type)
}
</script>
```

## 带封面图的卡片

```vue
<zx-card 
  title="带封面的卡片" 
  sub-title="这是一个带封面的卡片" 
  :cover="require('@/static/cover.jpg')"
  cover-radius="8"
>
  这里是卡片的内容区域
</zx-card>
```

## 可点击的卡片

```vue
<zx-card 
  title="可点击的卡片" 
  :clickable="true"
  @click="handleCardClick"
>
  点击此卡片会有轻微的缩放效果
</zx-card>
```

## 不同主题的卡片

```vue
<zx-card title="默认卡片" mode="default">默认主题</zx-card>
<zx-card title="主要卡片" mode="primary">主要主题</zx-card>
<zx-card title="成功卡片" mode="success">成功主题</zx-card>
<zx-card title="警告卡片" mode="warning">警告主题</zx-card>
<zx-card title="错误卡片" mode="error">错误主题</zx-card>
<zx-card title="信息卡片" mode="info">信息主题</zx-card>
```

## 自定义底部操作区

```vue
<zx-card title="带操作按钮的卡片">
  卡片内容区域
  
  <template #actions>
    <button @click="handleShare">分享</button>
    <button @click="handleLike">点赞</button>
    <button @click="handleComment">评论</button>
  </template>
</zx-card>
```

## 自定义底部区域

```vue
<zx-card title="带底部的卡片">
  卡片内容区域
  
  <template #footer>
    <view>底部区域内容</view>
  </template>
</zx-card>
```

## 通栏卡片

```vue
<zx-card 
  title="通栏卡片" 
  :is-full="true"
>
  这是一个通栏卡片，没有左右边距
</zx-card>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | String | '' | 标题文字 |
| subTitle | String | '' | 副标题 |
| titleColor | String | '#3a3a3a' | 标题颜色 |
| subTitleColor | String | '#909399' | 副标题颜色 |
| extraColor | String | '#909399' | 额外信息颜色 |
| contentColor | String | '#6a6a6a' | 内容颜色 |
| titleSize | Number/String | 30 | 标题字体大小，单位rpx |
| subTitleSize | Number/String | 24 | 副标题字体大小，单位rpx |
| contentSize | Number/String | 28 | 内容字体大小，单位rpx |
| titleBold | Boolean | false | 标题是否加粗 |
| padding | String | '10rpx' | 内容内边距 |
| margin | String | '15rpx' | 卡片外边距 |
| spacing | String | '0 10rpx' | 卡片内边距 |
| extra | String | '' | 标题额外信息 |
| cover | String | '' | 封面图（本地路径需要引入） |
| coverMode | String | 'widthFix' | 封面图裁剪模式 |
| coverRadius | Number/String | 4 | 封面图圆角，单位rpx |
| thumbnail | String | '' | 标题左侧缩略图 |
| avatarMode | String | 'aspectFit' | 头像裁剪模式 |
| avatarSize | Number/String | 80 | 头像大小，单位rpx |
| avatarCircle | Boolean | false | 头像是否为圆形 |
| isFull | Boolean | false | 卡片内容是否通栏，为 true 时将去除左右边距 |
| isShadow | Boolean | true | 卡片内容是否开启阴影 |
| shadow | String | '0px 0px 6rpx 2rpx rgba(0, 0, 0, 0.08)' | 卡片阴影样式 |
| border | Boolean | true | 是否显示卡片边框 |
| radius | Number/String | 10 | 卡片圆角，单位rpx |
| bgColor | String | '#ffffff' | 卡片背景色 |
| mode | String | 'default' | 卡片主题模式，可选值：default/primary/success/warning/error/info |
| clickable | Boolean | false | 卡片是否可点击 |
| lazyLoad | Boolean | true | 图片是否懒加载 |

## 插槽

| 名称 | 说明 |
| --- | --- |
| default | 卡片内容区域 |
| cover | 自定义封面区域 |
| title | 自定义标题区域 |
| extra | 自定义标题右侧额外区域 |
| actions | 自定义底部操作区域 |
| footer | 自定义底部区域 |

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击卡片时触发 | type: 点击区域（'card'/'cover'/'title'/'content'/'extra'/'actions'） |

## 代码示例

### 商品卡片

```vue
<zx-card 
  title="iPhone 15 Pro" 
  sub-title="超瓷晶面板，钛金属边框"
  :cover="require('@/static/iphone.jpg')"
  extra="￥7999起"
  mode="primary"
  :clickable="true"
  :title-bold="true"
  title-color="#333"
  avatar-circle
  @click="goToDetail"
>
  A17 Pro 芯片，创新相机控制，4800万像素主摄，全新操作体验
  
  <template #actions>
    <button>加入购物车</button>
    <button>立即购买</button>
  </template>
</zx-card>
```

### 文章卡片

```vue
<zx-card 
  title="Vue 3.0新特性解析" 
  sub-title="发布于2023-10-12"
  :thumbnail="require('@/static/avatar.png')"
  :cover="require('@/static/vue.jpg')"
  content-size="30"
  :title-bold="true"
>
  Vue 3.0带来了Composition API、Teleport、Fragments等新特性，本文将详细解析这些特性的使用方法和实际应用场景...
  
  <template #footer>
    <view class="card-footer">
      <text>阅读量: 2380</text>
      <text>点赞: 168</text>
      <text>评论: 32</text>
    </view>
  </template>
</zx-card>
```

### 个人信息卡片

```vue
<zx-card 
  title="张三" 
  sub-title="前端工程师"
  :thumbnail="require('@/static/person.jpg')"
  avatar-circle
  avatar-size="100"
  mode="info"
  :clickable="true"
>
  <view class="info-item">
    <text class="label">邮箱：</text>
    <text>zhangsan@example.com</text>
  </view>
  <view class="info-item">
    <text class="label">电话：</text>
    <text>13800138000</text>
  </view>
  <view class="info-item">
    <text class="label">地址：</text>
    <text>北京市朝阳区</text>
  </view>
  
  <template #actions>
    <button>发送消息</button>
    <button>添加好友</button>
  </template>
</zx-card>
```
