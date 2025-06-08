# zx-safe-bottom 底部安全区组件

## 介绍

底部安全区组件主要用于适配 iPhone等底部带指示条的机型，避免页面内容与底部指示条区域重叠，防止用户误操作。

## 使用方式

### 基础用法

```vue
<template>
  <view>
    <view>页面内容区域</view>
    <!-- 底部安全区适配 -->
    <zx-safe-bottom></zx-safe-bottom>
  </view>
</template>
```

### 自定义背景色

```vue
<template>
  <view>
    <view>页面内容区域</view>
    <!-- 自定义背景色的底部安全区 -->
    <zx-safe-bottom bgColor="#ffffff"></zx-safe-bottom>
  </view>
</template>
```

### 自定义高度

```vue
<template>
  <view>
    <view>页面内容区域</view>
    <!-- 自定义高度和背景色的底部安全区 -->
    <zx-safe-bottom height="30" bgColor="red"></zx-safe-bottom>
  </view>
</template>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
| ------ | ------ | ------ | ------ |
| height | String, Number | "" | 自定义底部安全区高度（单位：px） |
| bgColor | String | "transparent" | 底部安全区背景颜色 |

## 注意事项

1. 该组件通常放置在页面最底部，用于撑起底部安全距离
2. 在非刘海屏设备上，组件会自动根据设备特性进行适配
3. 当设置了自定义高度时，将使用固定高度而非自适应安全区高度
