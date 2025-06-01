# Gap 间隔槽

该组件一般用于内容块之间的用一个灰色块隔开的场景，方便用户风格统一，减少工作量。

## 平台差异说明

| App(vue) | App(nvue) | H5  | 小程序 |
| -------- | --------- | --- | ------ |
| √        | √         | √   | √      |

## 基本使用

直接引入即可使用：

```vue
<template>
  <view>
    <view>内容块1</view>
    <zx-gap></zx-gap>
    <view>内容块2</view>
  </view>
</template>
```

## 自定义高度和背景色

通过 `height` 配置高度，单位px；通过 `bgColor` 配置背景颜色：

```vue
<template>
  <zx-gap height="80" bgColor="#f5f5f5"></zx-gap>
</template>
```

## 设置边距

通过 `marginTop` 和 `marginBottom` 设置与前后元素的距离：

```vue
<template>
  <zx-gap 
    height="40" 
    marginTop="20" 
    marginBottom="20"
    bgColor="#eee"
  ></zx-gap>
</template>
```

## 自定义样式

通过 `customStyle` 属性可以传入自定义样式对象：

```vue
<template>
  <zx-gap 
    :customStyle="{
      borderRadius: '8px',
      border: '1px solid #ddd'
    }"
  ></zx-gap>
</template>
```

## API

### Props

| 参数         | 说明                     | 类型            | 默认值        | 可选值 |
| ------------ | ------------------------ | --------------- | ------------- | ------ |
| bgColor      | 背景颜色                 | String          | transparent   | -      |
| height       | 间隔槽高度，单位px       | String \| Number | 20            | -      |
| marginTop    | 与前一个元素的距离，单位px | String \| Number | 0             | -      |
| marginBottom | 与后一个元素的距离，单位px | String \| Number | 0             | -      |
| customStyle  | 自定义样式对象           | Object          | {}            | -      |

### 注意事项

1. 组件支持数字和字符串类型的尺寸值，会自动添加 `px` 单位
2. 如果传入的是带单位的字符串（如 `"20px"`、`"2rem"`），会保持原有单位
3. `bgColor` 支持任何有效的 CSS 颜色值
4. `customStyle` 中的样式会与组件默认样式进行深度合并

### 使用场景

- 列表项之间的分隔
- 内容区块的间隔
- 页面布局中的留白处理
- 视觉分组的分隔线