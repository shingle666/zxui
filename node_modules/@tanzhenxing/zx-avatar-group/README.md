# zx-avatar-group 头像组组件

## 介绍

本组件一般用于展示头像组的场景，如个人中心、评论列表页的用户头像展示等场所。支持设置头像大小、形状、数量限制以及点击查看更多功能。

## 基本用法

```vue
<template>
  <zx-avatar-group :urls="avatarList" size="70" shape="circle"></zx-avatar-group>
</template>

<script setup>
const avatarList = [
  'https://example.com/avatar1.jpg',
  'https://example.com/avatar2.jpg',
  'https://example.com/avatar3.jpg',
  'https://example.com/avatar4.jpg',
  'https://example.com/avatar5.jpg',
  'https://example.com/avatar6.jpg'
];
</script>
```

## 对象数组用法

当传入的是对象数组时，可以通过 `keyName` 属性指定使用对象中的哪个属性作为头像地址：

```vue
<template>
  <zx-avatar-group :urls="userList" keyName="avatar" size="60"></zx-avatar-group>
</template>

<script setup>
const userList = [
  { id: 1, name: '用户1', avatar: 'https://example.com/avatar1.jpg' },
  { id: 2, name: '用户2', avatar: 'https://example.com/avatar2.jpg' },
  { id: 3, name: '用户3', avatar: 'https://example.com/avatar3.jpg' }
];
</script>
```

## 自定义样式

```vue
<template>
  <zx-avatar-group 
    :urls="avatarList" 
    size="80" 
    shape="square" 
    :maxCount="4" 
    :gap="0.3"
    @showMore="handleShowMore"
  ></zx-avatar-group>
</template>

<script setup>
const avatarList = ['https://example.com/avatar1.jpg', 'https://example.com/avatar2.jpg', 
  'https://example.com/avatar3.jpg', 'https://example.com/avatar4.jpg', 
  'https://example.com/avatar5.jpg', 'https://example.com/avatar6.jpg'];

const handleShowMore = () => {
  // 处理查看更多逻辑
  console.log('查看更多头像');
};
</script>
```

## API

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| urls | Array | [] | 头像图片组，可以是图片地址字符串数组，也可以是对象数组 |
| maxCount | String/Number | 5 | 最多展示的头像数量 |
| shape | String | 'circle' | 头像形状，可选值：'circle'(圆形), 'square'(方形) |
| mode | String | 'scaleToFill' | 图片裁剪模式 |
| showMore | Boolean | true | 超出maxCount时是否显示查看更多的提示 |
| size | String/Number | 80 | 头像大小，单位rpx |
| keyName | String | '' | 当urls为对象数组时，指定从对象中读取哪个属性作为图片地址 |
| gap | String/Number | 0.5 | 头像之间的遮挡比例，取值范围0-1，0.5表示遮挡50% |
| extraValue | String/Number | '' | 需额外显示的值，用于自定义+N中的N值 |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| showMore | 点击查看更多头像时触发 | - |

## 注意事项

1. `urls` 为对象数组时，若不设置 `keyName`，则默认尝试读取对象中的 `url` 属性
2. `gap` 属性控制头像之间的重叠程度，值越小重叠越少，值为0则无重叠
3. 当实际头像数量超过 `maxCount` 或设置了 `extraValue` 且大于0时，最后一个头像会显示 +N 的提示
4. 可以通过监听 `showMore` 事件实现自定义的展示更多头像的逻辑
