# zx-horizontal-scrolling 横向滚动组件

## 介绍

适用于横向滚动展示，适用场景有订单列表、商品列表、图片轮播等。支持H5、小程序、APP多端。

## 特性

- 🎯 支持多种遮罩层样式（阴影、三角箭头、半透明、无）
- 📱 完美适配H5、小程序、APP
- 🎨 可自定义遮罩内容和样式
- 📏 灵活的尺寸和间距配置
- 🔄 丰富的事件回调
- 💡 Vue3 Composition API

## 安装

```bash
# 组件已内置在zxui中，无需额外安装
```

## 基本用法

```vue
<template>
  <zx-horizontal-scrolling>
    <view class="item" v-for="item in list" :key="item.id">
      <image :src="item.image" />
      <text>{{ item.title }}</text>
    </view>
  </zx-horizontal-scrolling>
</template>

<script setup>
const list = ref([
  { id: 1, image: '/static/img1.jpg', title: '商品1' },
  { id: 2, image: '/static/img2.jpg', title: '商品2' },
  // ...
])
</script>

<style>
.item {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
}

.item text {
  margin-top: 8px;
  font-size: 12px;
  text-align: center;
}
</style>
```

## 遮罩层位置

可通过 `maskPosition` 控制遮罩层的位置：

```vue
<template>
  <!-- 左侧遮罩 -->
  <zx-horizontal-scrolling mask-position="left">
    <view class="item" v-for="item in list" :key="item.id">
      <!-- 内容 -->
    </view>
  </zx-horizontal-scrolling>
  
  <!-- 右侧遮罩（默认） -->
  <zx-horizontal-scrolling mask-position="right">
    <view class="item" v-for="item in list" :key="item.id">
      <!-- 内容 -->
    </view>
  </zx-horizontal-scrolling>
</template>
```

## 遮罩层阴影样式

遮罩层阴影样式 `maskShadowType` 有 4 种类型：

```vue
<template>
  <!-- 阴影样式 -->
  <zx-horizontal-scrolling mask-shadow-type="shadow">
    <!-- 内容 -->
  </zx-horizontal-scrolling>
  
  <!-- 三角箭头阴影（默认） -->
  <zx-horizontal-scrolling mask-shadow-type="triangle">
    <!-- 内容 -->
  </zx-horizontal-scrolling>
  
  <!-- 半透明阴影 -->
  <zx-horizontal-scrolling mask-shadow-type="transparent">
    <!-- 内容 -->
  </zx-horizontal-scrolling>
  
  <!-- 无阴影 -->
  <zx-horizontal-scrolling mask-shadow-type="none">
    <!-- 内容 -->
  </zx-horizontal-scrolling>
</template>
```

## 遮罩层半透明阴影样式

滚动内容和容器的遮罩层侧之间的距离默认为 `maskWidth` 宽度，也可以通过 `maskDistance` 设置：

```vue
<template>
  <zx-horizontal-scrolling 
    mask-shadow-type="transparent"
    mask-distance="20px"
  >
    <!-- 内容 -->
  </zx-horizontal-scrolling>
</template>
```

## 自定义遮罩内容

可以通过 `maskContent` 属性或 `maskContent` 插槽自定义遮罩内容：

```vue
<template>
  <!-- 通过属性 -->
  <zx-horizontal-scrolling mask-content="<div>查看更多</div>">
    <!-- 内容 -->
  </zx-horizontal-scrolling>
  
  <!-- 通过插槽 -->
  <zx-horizontal-scrolling>
    <template #maskContent>
      <view class="custom-mask">
        <zx-icon name="arrow-right" size="20px" />
        <text>查看全部</text>
      </view>
    </template>
    <!-- 内容 -->
  </zx-horizontal-scrolling>
</template>
```

## 无遮罩

```vue
<template>
  <zx-horizontal-scrolling :show-mask="false">
    <!-- 内容 -->
  </zx-horizontal-scrolling>
</template>
```

## 事件演示

```vue
<template>
  <zx-horizontal-scrolling 
    @click-mask="handleMaskClick"
    @scroll-right="handleScrollRight"
    @scroll-change="handleScrollChange"
  >
    <!-- 内容 -->
  </zx-horizontal-scrolling>
</template>

<script setup>
const handleMaskClick = () => {
  console.log('点击了遮罩层')
}

const handleScrollRight = () => {
  console.log('滚动到了右边')
}

const handleScrollChange = (scrollLeft) => {
  console.log('滚动距离：', scrollLeft)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| showMask | 是否需要遮罩层 | boolean | true |
| maskPosition | 遮罩层展示位置 | 'left' \| 'right' | 'right' |
| maskShadowType | 遮罩阴影形式 | 'none' \| 'triangle' \| 'shadow' \| 'transparent' | 'triangle' |
| maskWidth | 遮罩层宽度 | string \| number | '100px' |
| maskDistance | 滚动内容和容器的遮罩层侧之间的距离 | string \| number | 0 |
| iconProps | Icon 组件的 props | object | { name: 'arrow-right', size: '16px' } |
| maskContent | 自定义遮罩内容 | string | '' |
| moreText | 更多文本 | string | '更多' |
| height | 容器高度 | string \| number | 'auto' |
| gap | 内容间距 | string \| number | '12px' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| clickMask | 点击遮罩层时触发 | - |
| scrollRight | 滑动到右边时会触发 | - |
| scrollChange | 滑动时获取滚动距离 | scrollLeft: number |

### Slots

| 名称 | 说明 |
|------|------|
| default | 滚动内容 |
| maskContent | 自定义遮罩内容 |

### Methods

通过 ref 可以获取到组件实例并调用实例方法：

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| scrollTo | 滚动到指定位置 | left: number | - |
| getScrollLeft | 获取当前滚动距离 | - | number |

```vue
<template>
  <zx-horizontal-scrolling ref="scrollRef">
    <!-- 内容 -->
  </zx-horizontal-scrolling>
</template>

<script setup>
const scrollRef = ref()

// 滚动到指定位置
const scrollToPosition = () => {
  scrollRef.value.scrollTo(200)
}

// 获取当前滚动距离
const getCurrentScroll = () => {
  const scrollLeft = scrollRef.value.getScrollLeft()
  console.log('当前滚动距离：', scrollLeft)
}
</script>
```

## 样式变量

组件提供了以下CSS变量，可用于自定义主题：

```scss
.zx-horizontal-scrolling {
  --zx-horizontal-scrolling-mask-bg: rgba(255, 255, 255, 0.7);
  --zx-horizontal-scrolling-mask-shadow: #d1d0d0;
  --zx-horizontal-scrolling-mask-text-color: #666;
  --zx-horizontal-scrolling-mask-text-size: 14px;
}
```

## 注意事项

1. 组件使用 `scroll-view` 实现横向滚动，在小程序中性能更好
2. 遮罩层的阴影效果通过CSS伪元素实现，兼容性良好
3. 建议为滚动内容设置固定宽度，避免布局问题
4. 在使用半透明遮罩时，注意背景色的搭配
5. 组件高度默认为 `auto`，建议根据内容设置合适的高度

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持多种遮罩样式
- ✨ 支持自定义遮罩内容
- ✨ 支持多端适配
- ✨ 提供丰富的配置选项和事件回调