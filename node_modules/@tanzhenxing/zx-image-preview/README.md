# zx-image-preview 图片预览

图片放大预览组件，支持滑动切换、手势缩放、双击放大等功能。

## 平台差异说明

本组件核心依赖 uniapp 的 `<swiper>` 和 `<movable-area>`、`<movable-view>` 组件实现，理论上支持所有 uniapp 支持的平台，包括 H5、小程序和 App。

- **H5**: 功能完善。
- **小程序**: 功能完善。注意小程序中 `movable-view` 的 `scale-value` 是只读的，双击放大等通过代码控制缩放的交互可能需要特殊处理或依赖用户手势。
- **App (Vue3)**: 功能完善。

## 基本使用

通过 `v-model:show` (或 `:show` 和 `@update:show`) 控制预览的显示和隐藏，`images` 数组传入图片列表。

```vue
<template>
  <view>
    <zx-button @click="openPreview">打开图片预览</zx-button>
    <zx-image-preview
      :show="showPreview"
      :images="imageList"
      :start-position="initialIndex"
      @close="onPreviewClose"
      @change="onPreviewChange"
      @update:show="showPreview = $event"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const showPreview = ref(false);
const imageList = ref([
  'https://cdn.zxui.org/example/image1.jpg',
  'https://cdn.zxui.org/example/image2.jpg',
  'https://cdn.zxui.org/example/image3.jpg'
]);
const initialIndex = ref(0);

const openPreview = () => {
  initialIndex.value = 0; // 或其他起始索引
  showPreview.value = true;
};

const onPreviewClose = (e) => {
  console.log('Preview closed at index:', e.index, 'by action:', e.fromAction);
  // showPreview.value = false; // Handled by v-model or @update:show
};

const onPreviewChange = (index) => {
  console.log('Current image index:', index);
};
</script>
```

## API

### Props

| 参数名             | 类型          | 默认值      | 说明                                                                 |
| ------------------ | ------------- | ----------- | -------------------------------------------------------------------- |
| `images`           | `Array<String>` | `[]`        | 需要预览的图片 URL 数组                                                |
| `show`             | `Boolean`     | `false`     | 是否显示预览，支持 `v-model`                                           |
| `startPosition`    | `Number`      | `0`         | 初始显示的图片索引                                                     |
| `loop`             | `Boolean`     | `true`      | 是否循环播放                                                           |
| `minZoom`          | `Number`      | `0.5`       | 图片最小缩放倍数                                                       |
| `maxZoom`          | `Number`      | `3`         | 图片最大缩放倍数                                                       |
| `swipeDuration`    | `Number`      | `300`       | 滑动动画时长，单位 ms                                                  |
| `showIndex`        | `Boolean`     | `true`      | 是否显示页码指示器 (e.g., "1 / 3")                                     |
| `closeable`        | `Boolean`     | `false`     | 是否显示关闭按钮                                                       |
| `closeIcon`        | `String`      | `'close'`   | 关闭按钮的图标名称 (需配合 `zx-icon` 使用)                             |
| `closeIconPosition`| `String`      | `'top-right'` | 关闭按钮位置，可选 `'top-left'`, `'top-right'`, `'bottom-left'`, `'bottom-right'` |
| `closeOnClickImage`| `Boolean`     | `true`      | 是否在点击图片时关闭预览 (双击放大优先)                                |
| `closeOnClickOverlay`| `Boolean`   | `true`      | 是否在点击遮罩层时关闭预览 (uniapp 中遮罩层即组件背景)                   |
| `showIndicators`   | `Boolean`     | `false`     | 是否显示 swiper 的指示点 (小圆点)                                      |
| `beforeClose`      | `Function`    | `null`      | 关闭前的回调函数，执行 `done` 可关闭预览，`done` 通过参数传入回调函数    |

### Events

| 事件名      | 说明                                   | 回调参数                                     |
| ----------- | -------------------------------------- | -------------------------------------------- |
| `change`    | 图片切换时触发                         | `index` (当前图片索引)                       |
| `close`     | 关闭预览时触发                         | `{ index: Number, fromAction: Boolean }` (fromAction 表示是否用户主动关闭) |
| `scale`     | 图片缩放时触发                         | `{ scale: Number, index: Number }`           |
| `longPress` | 图片长按时触发 (暂未完整实现)          | `{ index: Number }`                          |
| `update:show`| `show` 属性变化时触发，用于 `v-model` | `Boolean` (新的 show 值)                     |

### Slots

| 名称    | 说明               |
| ------- | ------------------ |
| `cover` | 自定义遮罩层上方的内容 |

### Methods

通过 `ref` 获取组件实例后，可以调用以下方法：

| 方法名          | 说明                               | 参数                                       |
| --------------- | ---------------------------------- | ------------------------------------------ |
| `open()`        | 打开图片预览 (不推荐直接调用，应通过 `show` prop) | -                                          |
| `close()`       | 关闭图片预览 (不推荐直接调用，应通过 `show` prop) | -                                          |
| `getCurrentIndex()` | 获取当前显示的图片索引             | -                                          |
| `swipeTo(index, duration?)` | 滑动到指定图片                     | `index: Number`, `duration?: Number` (可选) |

## 注意事项

- **手势冲突**: 在某些情况下，页面本身的滚动或手势可能与图片预览的滑动、缩放手势产生冲突。确保预览打开时，背景页面不应滚动。
- **图片加载**: 组件内部对图片加载状态和错误进行了基础处理，但复杂的错误处理或占位图逻辑可能需要用户自行扩展。
- **双击放大**: 当前双击放大的实现较为基础，依赖于 `movable-view` 的能力。在小程序等平台，如果 `movable-view` 的 `scale-value` 无法直接通过 JS 设置，双击放大效果可能受限，主要依赖用户双指缩放。
- **性能**: 大量高清图片可能会影响性能，尤其是在低端设备上。建议对图片进行适当压缩和优化。
- **层级 `z-index`**: 组件的 `z-index` 默认为 `10075`，如有需要可自行调整样式覆盖。
- **安全区域**: 关闭按钮等元素的定位未特意适配所有平台的安全区域，如有刘海屏等特殊情况，可能需要微调样式。