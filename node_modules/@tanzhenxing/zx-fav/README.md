# zx-fav 收藏按钮组件

## 介绍

`zx-fav` 是一个用于实现收藏功能的按钮组件，可以方便地切换选中/未选中状态，支持自定义样式和内容。

## 组件预览

- 默认状态：未收藏状态显示星星图标和"收藏"文字
- 选中状态：已收藏状态显示"已收藏"文字，背景色和文字颜色变化
- 圆角状态：支持圆角样式
- 禁用状态：不可点击，样式变暗

## 使用方式

### 基础用法

```html
<zx-fav :checked="false" @click="onFavClick"></zx-fav>
```

### 自定义样式

```html
<zx-fav
  :checked="isFavorite"
  circle
  bgColor="#f8f8f8"
  fgColor="#333333"
  bgColorChecked="#ff6600"
  fgColorChecked="#ffffff"
  width="100px"
  @click="onFavClick"
></zx-fav>
```

### 禁用状态

```html
<zx-fav :checked="true" disabled></zx-fav>
```

### 自定义内容

```html
<zx-fav
  :checked="isFavorite"
  :contentText="{ contentDefault: '加入收藏', contentFav: '已加入收藏' }"
  @click="onFavClick"
></zx-fav>
```

### 自定义图标

```html
<zx-fav
  :checked="isFavorite"
  iconName="heart-fill"
  iconSize="16"
  @click="onFavClick"
></zx-fav>
```

## API

### 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| star | Boolean/String | true | 是否显示星星图标 |
| bgColor | String | #eeeeee | 未收藏时的背景色 |
| fgColor | String | #666666 | 未收藏时的文字颜色 |
| bgColorChecked | String | #007aff | 已收藏时的背景色 |
| fgColorChecked | String | #FFFFFF | 已收藏时的文字颜色 |
| circle | Boolean/String | false | 是否为圆角按钮 |
| checked | Boolean | false | 是否为已收藏状态 |
| disabled | Boolean | false | 是否禁用按钮 |
| contentText | Object | {contentDefault: '', contentFav: ''} | 收藏按钮文字，为空时显示默认值"收藏"/"已收藏" |
| iconName | String | star-fill | 图标名称，需要与 zx-icon 组件兼容 |
| iconSize | Number/String | 14 | 图标大小 |
| width | String | 80px | 按钮宽度 |

### 事件

| 事件名 | 说明 | 返回值 |
| --- | --- | --- |
| click | 点击按钮时触发（禁用状态下不会触发） | - |

## 示例代码

```vue
<template>
  <view>
    <zx-fav :checked="isFavorite" @click="toggleFavorite"></zx-fav>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const isFavorite = ref(false);

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  uni.showToast({
    title: isFavorite.value ? '已收藏' : '已取消收藏',
    icon: 'none'
  });
};
</script>
```

## 注意事项

1. 需要配合 zx-icon 组件使用
2. 在使用 `contentText` 属性时，如果没有提供 `contentDefault` 或 `contentFav` 值，将使用默认值"收藏"和"已收藏"
3. 在支付宝小程序环境中，组件的渲染方式有所差异，但功能保持一致
