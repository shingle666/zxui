# zx-title 标题组件

## 介绍

`zx-title` 是一个用于显示标题的组件，支持多种标题级别、副标题、图标和右侧操作区域，适用于各种标题展示场景。

## 基本用法

```html
<zx-title title="标题文本" type="h2"></zx-title>
```

## 带图标

```html
<zx-title title="带图标的标题" iconShow icon="home" iconColor="#3c9cff"></zx-title>
```

## 带副标题

```html
<zx-title title="主标题" subtitle="副标题描述" type="h2"></zx-title>
```

## 带右侧操作

```html
<zx-title title="带操作的标题" rightText="更多" @right="handleRight"></zx-title>
```

## 自定义右侧内容

```html
<zx-title title="自定义右侧">
  <template #right>
    <button size="mini" type="primary">操作按钮</button>
  </template>
</zx-title>
```

## 自定义样式

```html
<zx-title 
  title="自定义样式" 
  type="h3" 
  color="#ff5500" 
  background="#f8f8f8" 
  padding="20rpx" 
  borderRadius="10rpx">
</zx-title>
```

## API

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | String | h2 | 标题级别，可选值：h1、h2、h3、h4、h5 |
| title | String | - | 标题内容 |
| subtitle | String | - | 副标题内容 |
| align | String | left | 对齐方式，可选值：left、center、right |
| color | String | #333333 | 标题文字颜色 |
| subtitleColor | String | #666666 | 副标题文字颜色 |
| bold | Boolean | true | 是否加粗 |
| icon | String | - | 图标名称 |
| iconShow | Boolean | false | 是否显示图标 |
| iconColor | String | #3c9cff | 图标颜色 |
| iconSize | String | 40rpx | 图标大小 |
| iconWidth | String | - | 图标容器宽度 |
| rightText | String | - | 右侧文本 |
| rightTextColor | String | #3c9cff | 右侧文本颜色 |
| rightTextSize | String | 28rpx | 右侧文本大小 |
| margin | String | 0 | 外边距 |
| padding | String | 15rpx 0 | 内边距 |
| background | String | transparent | 背景颜色 |
| borderRadius | String | 0 | 圆角大小 |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| right | 点击右侧文本时触发 | - |

### 插槽

| 名称 | 说明 |
| --- | --- |
| right | 自定义右侧内容 |

## 示例代码

```vue
<template>
  <view>
    <!-- 基础用法 -->
    <zx-title title="基础标题" type="h2"></zx-title>
    
    <!-- 带图标 -->
    <zx-title 
      title="带图标的标题" 
      iconShow 
      icon="star" 
      iconColor="#ff9900">
    </zx-title>
    
    <!-- 带副标题 -->
    <zx-title 
      title="产品详情" 
      subtitle="了解更多产品信息和使用方法" 
      type="h3" 
      color="#2979ff">
    </zx-title>
    
    <!-- 带右侧文本 -->
    <zx-title 
      title="消息列表" 
      rightText="查看全部" 
      @right="onViewAll">
    </zx-title>
    
    <!-- 自定义右侧内容 -->
    <zx-title title="商品分类">
      <template #right>
        <view class="custom-right">
          <button size="mini" type="primary">筛选</button>
        </view>
      </template>
    </zx-title>
    
    <!-- 自定义样式 -->
    <zx-title 
      title="热门推荐" 
      background="#f5f5f5" 
      padding="20rpx 30rpx" 
      borderRadius="10rpx" 
      iconShow 
      icon="fire" 
      iconColor="#ff5500">
    </zx-title>
  </view>
</template>

<script setup>
const onViewAll = () => {
  uni.navigateTo({
    url: '/pages/message/list'
  });
};
</script>
