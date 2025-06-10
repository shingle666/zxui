# zx-scrollbar 滚动条组件

## 简介

`zx-scrollbar` 是一个高性能的自定义滚动条组件，专为 uni-app 多端开发设计。组件使用 Vue 3 Composition API 开发，支持垂直和水平滚动，提供美观的自定义滚动条样式，同时保持良好的性能和用户体验。

## 特性

- 🎨 **美观的滚动条样式** - 自定义滚动条外观，告别原生滚动条的局限
- 📱 **多端兼容** - 支持 H5、小程序、App 等多个平台
- 🚀 **高性能** - 基于 uni-app 的 scroll-view 组件，性能优异
- 🎯 **灵活配置** - 支持垂直/水平滚动、始终显示、最大高度等多种配置
- 🎪 **触摸支持** - 支持触摸拖拽滚动条，提供原生般的交互体验
- 🛠 **易于使用** - 简单的 API 设计，支持插槽自定义内容

## 基础用法

```vue
<template>
  <zx-scrollbar height="400rpx">
    <view v-for="item in 20" :key="item">
      项目 {{ item }}
    </view>
  </zx-scrollbar>
</template>
```

## 横向滚动

```vue
<template>
  <zx-scrollbar height="200rpx" :scroll-y="false">
    <view style="display: flex; width: max-content;">
      <view v-for="item in 20" :key="item" style="width: 200rpx;">
        {{ item }}
      </view>
    </view>
  </zx-scrollbar>
</template>
```

## 最大高度

```vue
<template>
  <zx-scrollbar max-height="300rpx">
    <view v-for="item in count" :key="item">
      动态项目 {{ item }}
    </view>
  </zx-scrollbar>
</template>
```

## 手动控制滚动

```vue
<template>
  <zx-scrollbar ref="scrollbarRef" height="300rpx" @scroll="onScroll">
    <view v-for="item in 15" :key="item">
      项目 {{ item }}
    </view>
  </zx-scrollbar>
  
  <button @click="scrollToTop">滚动到顶部</button>
</template>

<script setup>
import { ref } from 'vue'

const scrollbarRef = ref()

const scrollToTop = () => {
  scrollbarRef.value.setScrollTop(0)
}

const onScroll = ({ scrollTop }) => {
  console.log('当前滚动位置:', scrollTop)
}
</script>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| height | String/Number | - | 滚动容器的高度 |
| max-height | String/Number | - | 滚动容器的最大高度 |
| native | Boolean | false | 是否使用原生滚动条 |
| wrap-style | String/Object | - | 包裹容器的自定义样式 |
| wrap-class | String | - | 包裹容器的自定义类名 |
| view-style | String/Object | - | 视图的自定义样式 |
| view-class | String | - | 视图的自定义类名 |
| noresize | Boolean | false | 不响应容器尺寸变化 |
| always | Boolean | false | 滚动条总是显示 |
| min-size | Number | 20 | 滚动条最小尺寸 |
| scroll-x | Boolean | true | 是否允许水平滚动 |
| scroll-y | Boolean | true | 是否允许垂直滚动 |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| scroll | 滚动时触发 | { scrollTop, scrollLeft, scrollHeight, scrollWidth } |

## Methods

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| scrollTo | 滚动到指定位置 | (options: {top?: number, left?: number} \| number) |
| setScrollTop | 设置垂直滚动位置 | (value: number) |
| setScrollLeft | 设置水平滚动位置 | (value: number) |
| update | 手动更新滚动条状态 | - |

## Slots

| 插槽名 | 说明 |
|--------|------|
| default | 默认插槽，滚动内容 |

## 样式自定义

组件提供了丰富的样式自定义选项：

```vue
<template>
  <zx-scrollbar 
    height="300rpx"
    wrap-class="custom-wrap"
    view-class="custom-view"
    :wrap-style="{ padding: '20rpx' }"
  >
    <!-- 内容 -->
  </zx-scrollbar>
</template>

<style>
.custom-wrap {
  background-color: #f5f5f5;
}

.custom-view {
  padding: 10rpx;
}
</style>
```

## 注意事项

1. **高度设置**: 组件需要明确的高度才能正常显示滚动条，可以通过 `height` 或 `max-height` 属性设置
2. **内容溢出**: 只有当内容高度/宽度超过容器时，滚动条才会显示
3. **平台差异**: 在不同平台上，滚动条的表现可能略有不同，建议在目标平台上充分测试
4. **性能优化**: 对于大量数据的滚动场景，建议结合虚拟列表等技术优化性能

## 兼容性

- ✅ H5
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 百度小程序
- ✅ 字节跳动小程序
- ✅ QQ 小程序
- ✅ App

## 更新日志

### 1.0.0 (2024-01-XX)

- 🎉 初始版本发布
- ✨ 支持垂直和水平滚动
- ✨ 支持自定义滚动条样式
- ✨ 支持触摸拖拽交互
- ✨ 支持多种配置选项
- ✨ 完善的文档和示例

## 许可证

MIT License
