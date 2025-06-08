# zx-lazyload 图片懒加载

`zx-lazyload` 是一个为 UniApp 设计的图片懒加载组件，旨在优化图片加载体验，提升页面性能。它支持 H5、小程序和 App 端（Vue3 版本）。

## 特性

- **懒加载**：仅当图片滚动到视窗范围内时才开始加载。
- **跨平台**：基于 UniApp 的 `IntersectionObserver` API 实现，兼容多端。
- **占位提示**：支持自定义加载中和加载失败时的占位图片或插槽内容。
- **淡入效果**：图片加载完成后支持平滑的淡入动画。
- **灵活配置**：提供多种 Props 来自定义图片样式、加载行为等。

## 使用方法

```vue
<template>
  <view>
    <!-- 基础用法 -->
    <zx-lazyload src="your-image-url.jpg" />

    <!-- 带加载中和错误提示 -->
    <zx-lazyload
      src="your-image-url.jpg"
      loading-src="/static/loading.png"
      error-src="/static/error.png"
      width="200rpx"
      height="200rpx"
    />

    <!-- 使用插槽自定义占位 -->
    <zx-lazyload src="your-image-url.jpg" use-loading-slot use-error-slot>
      <template #loading>
        <view>加载中...</view>
      </template>
      <template #error>
        <view>加载失败</view>
      </template>
    </zx-lazyload>
  </view>
</template>

<script setup>
// 如果你的项目没有自动导入组件，需要手动引入
// import zxLazyload from '@/components/zx-lazyload/zx-lazyload.vue';
</script>
```

## API

### Props

| 参数                | 类型             | 默认值        | 说明                                                                 |
| ------------------- | ---------------- | ------------- | -------------------------------------------------------------------- |
| `src`               | String           | -             | **必填**，图片资源地址                                                 |
| `mode`              | String           | `aspectFill`  | UniApp `image` 组件的 `mode` 属性，控制图片裁剪、缩放模式              |
| `webp`              | Boolean          | `false`       | 是否启用 webp 图片格式                                                 |
| `showMenuByLongpress`| Boolean          | `false`       | 是否开启长按图片显示识别小程序码菜单 (仅H5、微信小程序、App支持)         |
| `draggable`         | Boolean          | `true`        | H5 端是否启用拖拽                                                      |
| `loadingSrc`        | String           | `''`          | 加载中状态显示的图片地址                                               |
| `errorSrc`          | String           | `''`          | 加载失败状态显示的图片地址                                             |
| `threshold`         | Number           | `0.1`         | 预加载阈值，0-1之间，表示元素顶部或底部进入视窗的百分比时开始加载        |
| `viewStyle`         | Object           | `{}`          | 懒加载组件根元素（`view`）的自定义样式                                  |
| `imageCustomStyle`  | Object           | `{}`          | `image` 标签的自定义样式，会覆盖 `width`, `height`, `radius` 生成的样式 |
| `fadeIn`            | Boolean          | `true`        | 图片加载成功后是否启用淡入效果                                         |
| `useLoadingSlot`    | Boolean          | `false`       | 是否使用名为 `loading` 的插槽自定义加载中状态的内容                    |
| `useErrorSlot`      | Boolean          | `false`       | 是否使用名为 `error` 的插槽自定义加载失败状态的内容                    |
| `width`             | String \| Number | `100%`        | 图片宽度，支持 `rpx` 或 `px` 单位，或百分比                          |
| `height`            | String \| Number | `auto`        | 图片高度，支持 `rpx` 或 `px` 单位，或百分比。`auto` 时依赖 `mode` 行为 |
| `radius`            | String \| Number | `0`           | 图片圆角，支持 `rpx` 或 `px` 单位                                      |

### Events

| 事件名 | 回调参数                                   | 说明                 |
| ------ | ------------------------------------------ | -------------------- |
| `load` | `event` (UniApp `image` 组件 `load` 事件对象) | 图片加载成功时触发   |
| `error`| `event` (UniApp `image` 组件 `error` 事件对象)| 图片加载失败时触发   |

### Slots

| 名称      | 说明                                       |
| --------- | ------------------------------------------ |
| `loading` | 自定义加载中状态的显示内容，需配合 `useLoadingSlot: true` 使用 |
| `error`   | 自定义加载失败状态的显示内容，需配合 `useErrorSlot: true` 使用 |

## 注意事项

- **App-Nvue 平台**：Nvue 平台不支持 `IntersectionObserver`，因此在 Nvue 环境下，图片会直接尝试加载，不具备懒加载特性。如果需要在 Nvue 实现类似效果，可能需要依赖列表组件（如 `waterfall`）提供的 cell 复用和按需渲染能力。
- **阈值 `threshold`**：此值决定了图片距离视窗多远时开始加载。较小的值会更晚加载，较大的值会更早加载。合理设置可以平衡加载时机和用户体验。
- **占位图尺寸**：为了避免页面抖动，建议为懒加载组件或其父容器设置明确的宽度和高度，或者确保占位图与最终加载的图片尺寸一致。
- **`imageCustomStyle` 优先级**：通过 `imageCustomStyle` 传入的样式会覆盖由 `width`、`height`、`radius` props 生成的内联样式。
- **H5 圆角**：在 H5 平台，直接给 `<img>` 标签设置 `border-radius` 可能无法裁剪图片内容。组件内部已通过给父 `view` 设置 `overflow: hidden` 来解决此问题。
- **图片资源路径**：确保 `src`, `loadingSrc`, `errorSrc` 的路径正确，特别是静态资源路径（如 `/static/...`）。

## 示例页面

请参考项目中的 `src/pages3/lazyload/index.vue` 文件，其中包含了各种使用场景的示例代码。

## 依赖

- Vue 3
- UniApp (支持 Vue 3 的版本)

## 未来可优化方向

- 支持背景图懒加载。
- 提供更细致的加载状态管理（如加载前、加载中、加载完成、加载失败等更明确的 class 或状态）。
- 针对 Nvue 平台探索更优的懒加载方案（如果 UniApp 未来提供相关 API）。