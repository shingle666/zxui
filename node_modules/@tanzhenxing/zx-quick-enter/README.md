# zx-quick-enter 快捷入口

> 一个功能丰富的快捷入口组件，用于展示一组快速访问的功能入口，支持图标、文字、徽标和点击事件。

## 介绍

zx-quick-enter 是一个通用快捷入口组件，常用于首页、个人中心等页面展示功能入口。组件支持自定义列数、图标、文字、徽标、禁用状态等，提供丰富的样式自定义选项。<mcreference link="https://nutui.jd.com/biz/h5/react/1x/" index="1">1</mcreference>

## 平台支持

- ✅ H5
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 百度小程序
- ✅ 头条小程序
- ✅ QQ小程序
- ✅ App

## 基础用法

```vue
<template>
  <zx-quick-enter 
    :list="quickList"
    @click="handleClick"
  />
</template>

<script setup>
const quickList = [
  {
    text: '扫一扫',
    icon: 'scan',
    id: 'scan'
  },
  {
    text: '付款码',
    icon: 'qrcode',
    id: 'pay'
  },
  {
    text: '收款',
    icon: 'money-circle',
    id: 'receive'
  },
  {
    text: '转账',
    icon: 'exchange',
    id: 'transfer'
  }
]

const handleClick = ({ item, index }) => {
  console.log('点击了', item.text, index)
}
</script>
```

## 自定义列数

```vue
<template>
  <!-- 3列布局 -->
  <zx-quick-enter 
    :list="quickList"
    :column="3"
  />
  
  <!-- 5列布局 -->
  <zx-quick-enter 
    :list="quickList"
    :column="5"
  />
</template>
```

## 使用图片图标

```vue
<template>
  <zx-quick-enter :list="imageList" />
</template>

<script setup>
const imageList = [
  {
    text: '京东超市',
    image: '/static/icons/supermarket.png',
    id: 'supermarket'
  },
  {
    text: '京东国际',
    image: '/static/icons/international.png',
    id: 'international'
  }
]
</script>
```

## 带徽标

```vue
<template>
  <zx-quick-enter :list="badgeList" />
</template>

<script setup>
const badgeList = [
  {
    text: '消息',
    icon: 'message',
    badge: 5,
    id: 'message'
  },
  {
    text: '通知',
    icon: 'bell',
    badge: 'new',
    badgeColor: '#ff6600',
    id: 'notification'
  },
  {
    text: '红点',
    icon: 'star',
    badgeDot: true,
    id: 'star'
  }
]
</script>
```

## 禁用状态

```vue
<template>
  <zx-quick-enter :list="disabledList" />
</template>

<script setup>
const disabledList = [
  {
    text: '正常功能',
    icon: 'check',
    id: 'normal'
  },
  {
    text: '禁用功能',
    icon: 'close',
    disabled: true,
    id: 'disabled'
  }
]
</script>
```

## 自定义样式

```vue
<template>
  <zx-quick-enter 
    :list="customList"
    :icon-size="60"
    :text-size="28"
    icon-color="#1890ff"
    text-color="#1890ff"
    background-color="#f5f5f5"
    padding="30rpx"
    :gap="30"
    :item-height="180"
  />
</template>

<script setup>
const customList = [
  {
    text: '自定义样式',
    icon: 'star',
    iconColor: '#ff4444', // 单独设置图标颜色
    textColor: '#ff4444', // 单独设置文字颜色
    id: 'custom'
  }
]
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| list | 快捷入口列表 | Array | [] |
| column | 每行显示的列数 | Number | 4 |
| icon-size | 图标大小，单位rpx | Number/String | 48 |
| icon-color | 图标颜色 | String | #666666 |
| text-size | 文字大小，单位rpx | Number/String | 24 |
| text-color | 文字颜色 | String | #333333 |
| disabled-color | 禁用状态颜色 | String | #cccccc |
| badge-color | 徽标颜色 | String | #ff4444 |
| badge-max | 徽标最大值 | Number | 99 |
| highlight | 是否显示点击高亮效果 | Boolean | true |
| background-color | 容器背景色 | String | transparent |
| padding | 容器内边距 | String | 20rpx |
| gap | 项目间距，单位rpx | Number/String | 20 |
| item-height | 项目高度，单位rpx | Number/String | 160 |

### List Item 数据结构

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| text | 显示文字 | String | - |
| icon | 图标名称（使用zx-icon） | String | - |
| image | 图片地址（与icon二选一） | String | - |
| id | 唯一标识 | String/Number | - |
| disabled | 是否禁用 | Boolean | false |
| badge | 徽标内容 | String/Number | - |
| badge-dot | 是否显示红点徽标 | Boolean | false |
| badge-color | 徽标颜色（优先级高于全局设置） | String | - |
| icon-color | 图标颜色（优先级高于全局设置） | String | - |
| text-color | 文字颜色（优先级高于全局设置） | String | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击项目时触发 | { item, index } |
| item-click | 点击项目时触发（与click相同） | { item, index } |

## 样式变量

组件提供了以下CSS变量，可用于自定义样式：

```scss
.zx-quick-enter {
  // 可以通过以下方式自定义样式
  --zx-quick-enter-bg: transparent;
  --zx-quick-enter-padding: 20rpx;
  --zx-quick-enter-gap: 20rpx;
  --zx-quick-enter-item-height: 160rpx;
  --zx-quick-enter-icon-size: 48rpx;
  --zx-quick-enter-text-size: 24rpx;
  --zx-quick-enter-icon-color: #666666;
  --zx-quick-enter-text-color: #333333;
  --zx-quick-enter-disabled-color: #cccccc;
}
```

## 注意事项

1. 组件依赖 `zx-icon` 和 `zx-badge` 组件，请确保已正确引入
2. 图标名称需要与 `zx-icon` 组件支持的图标名称一致
3. 图片路径建议使用绝对路径或网络地址
4. 在小程序中使用网络图片需要配置域名白名单
5. 徽标功能需要确保 `zx-badge` 组件可用

## 更新日志

### v1.0.0
- 初始版本
- 支持基础快捷入口功能
- 支持图标、图片、徽标
- 支持自定义样式和布局
- 支持禁用状态
- 支持点击事件