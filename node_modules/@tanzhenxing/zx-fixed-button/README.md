# zx-fixed-button 悬浮按钮

悬浮按钮组件，采用卡槽设计，支持自定义悬浮内容和位置。

## 基本用法

```vue
<template>
  <!-- 基础用法 -->
  <zx-fixed-button @click="handleClick" />
  
  <!-- 自定义位置 -->
  <zx-fixed-button position="top-left" @click="handleClick" />
  
  <!-- 自定义内容 -->
  <zx-fixed-button>
    <view class="custom-content">
      <text>自定义</text>
    </view>
  </zx-fixed-button>
  
  <!-- 精确位置控制 -->
  <zx-fixed-button 
    :top="100" 
    :right="50" 
    bg-color="#ff6b6b"
    @click="handleClick"
  />
</template>

<script setup>
const handleClick = () => {
  console.log('悬浮按钮被点击')
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
| --- | --- | --- | --- | --- |
| show | 是否显示 | Boolean | true | - |
| isFixed | 是否使用固定定位 | Boolean | true | - |
| position | 悬浮位置 | String | bottom-right | top-left, top-right, top-center, bottom-left, bottom-right, bottom-center, left-center, right-center |
| margin | 距离边缘的距离 | Number/String | 30 | - |
| top | 自定义top距离 | Number/String | null | - |
| bottom | 自定义bottom距离 | Number/String | null | - |
| left | 自定义left距离 | Number/String | null | - |
| right | 自定义right距离 | Number/String | null | - |
| width | 按钮宽度 | Number/String | 120 | - |
| height | 按钮高度 | Number/String | 120 | - |
| bg-color | 背景颜色 | String | #007AFF | - |
| border-radius | 圆角大小 | Number/String | 60 | - |
| shadow | 是否显示阴影 | Boolean | true | - |
| z-index | 层级 | Number | 999 | - |
| icon | 默认图标 | String | plus | - |
| icon-size | 图标大小 | Number/String | 50 | - |
| icon-color | 图标颜色 | String | #ffffff | - |
| text | 文字内容 | String | '' | - |
| text-color | 文字颜色 | String | #ffffff | - |
| opacity | 透明度 | Number | 1 | 0-1 |
| animation-duration | 动画持续时间 | Number | 300 | - |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | event |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义按钮内容 |

## 示例

### 不同位置的悬浮按钮

```vue
<template>
  <!-- 右下角 -->
  <zx-fixed-button position="bottom-right" icon="message" />
  
  <!-- 左上角 -->
  <zx-fixed-button position="top-left" icon="menu" />
  
  <!-- 顶部居中 -->
  <zx-fixed-button position="top-center" icon="search" />
  
  <!-- 右侧居中 -->
  <zx-fixed-button position="right-center" icon="phone" />
</template>
```

### 自定义样式

```vue
<template>
  <zx-fixed-button
    :width="100"
    :height="100"
    bg-color="#ff6b6b"
    :border-radius="50"
    icon="heart"
    icon-color="#ffffff"
    :shadow="true"
  />
</template>
```

### 非固定定位模式

```vue
<template>
  <!-- 使用相对定位，不会固定在屏幕上 -->
  <zx-fixed-button
    :is-fixed="false"
    bg-color="#52c41a"
    icon="check"
  />
</template>
```

### 精确位置控制

```vue
<template>
  <!-- 使用具体数值控制位置 -->
  <zx-fixed-button
    :top="200"
    :right="100"
    bg-color="#4ecdc4"
    icon="star"
  />
  
  <!-- 使用百分比 -->
  <zx-fixed-button
    top="20%"
    left="10%"
    bg-color="#45b7d1"
    icon="location"
  />
</template>
```

### 自定义内容

```vue
<template>
  <zx-fixed-button bg-color="#6c5ce7">
    <view class="custom-button">
      <zx-icon name="shopping-cart" size="40" color="#ffffff" />
      <text class="badge">3</text>
    </view>
  </zx-fixed-button>
</template>

<style>
.custom-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge {
  position: absolute;
  top: -10rpx;
  right: -10rpx;
  background-color: #ff4757;
  color: #ffffff;
  font-size: 20rpx;
  padding: 4rpx 8rpx;
  border-radius: 20rpx;
  min-width: 32rpx;
  text-align: center;
}
</style>
```

## 注意事项

1. 当 `isFixed` 为 `true` 时，组件使用 `position: fixed` 定位，会脱离文档流；当 `isFixed` 为 `false` 时，使用 `position: relative` 定位
2. 在 H5 端会自动适配安全区域
3. 自定义位置参数（top、bottom、left、right）优先级高于 position 参数，且仅在 `isFixed` 为 `true` 时生效
4. 支持数值和字符串类型的尺寸参数，数值会自动添加 rpx 单位
5. 建议合理设置 z-index 避免层级冲突
6. 当 `isFixed` 为 `false` 时，位置相关的属性（position、top、bottom、left、right、margin）将不会生效