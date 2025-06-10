# zx-pull-refresh 下拉刷新组件

`zx-pull-refresh` 是一个通用的下拉刷新组件，支持 H5、小程序和 App 端。它提供了下拉刷新的交互操作，允许用户通过向下滑动页面来加载最新内容。

## 特性

- **跨平台兼容**：专为 uni-app 设计，确保在 H5、小程序（微信、支付宝、百度等）和 App (iOS/Android) 上的表现一致。
- **自定义加载提示**：支持自定义下拉过程、释放过程、加载过程以及成功状态的提示内容和样式。
- **事件反馈**：提供 `refresh` 事件，在触发刷新时回调，以及 `change` 事件，在拖动或状态改变时回调。
- **配置灵活**：可配置头部高度、触发下拉的距离、成功提示时长、动画时长等。

## 使用方法

### 引入组件

```vue
<script setup>
import zxPullRefresh from '@/components/zx-pull-refresh/zx-pull-refresh.vue';
</script>
```

### 基础用法

通过 `v-model` 控制加载状态，监听 `refresh` 事件执行刷新操作。

```vue
<template>
  <zx-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <view v-for="item in list" :key="item" class="item-class">
      {{ item }}
    </view>
  </zx-pull-refresh>
</template>

<script setup>
import { ref } from 'vue';
import zxPullRefresh from '@/components/zx-pull-refresh/zx-pull-refresh.vue';

const isLoading = ref(false);
const list = ref(['项目1', '项目2', '项目3']);

const onRefresh = () => {
  setTimeout(() => {
    // 模拟数据加载
    const newList = [`新项目 ${list.value.length + 1}`, ...list.value];
    list.value = newList.slice(0, 5); // 假设只保留最新的5条
    isLoading.value = false; // 数据加载完成，关闭加载状态
    uni.showToast({ title: '刷新成功', icon: 'none' });
  }, 1500);
};
</script>
```

### 自定义提示

可以通过插槽 (slot) 自定义下拉刷新过程中的提示内容。

```vue
<template>
  <zx-pull-refresh v-model="isLoading" :head-height="80" @refresh="onRefresh">
    <!-- 下拉提示 -->
    <template #pulling="props">
      <view :style="{ fontSize: '12px', color: '#999' }">
        <image src="/static/pulling-icon.png" style="width:20px; height:20px; vertical-align: middle;" />
        <text>继续下拉刷新 ({{ Math.round(props.distance) }}px)</text>
      </view>
    </template>

    <!-- 释放提示 -->
    <template #loosing>
      <view :style="{ fontSize: '12px', color: '#333' }">
        <image src="/static/loosing-icon.png" style="width:20px; height:20px; vertical-align: middle;" />
        <text>释放即可刷新</text>
      </view>
    </template>

    <!-- 加载提示 -->
    <template #loading>
      <view :style="{ fontSize: '12px', color: '#007aff' }">
        <uni-load-more status="loading" :show-icon="true"></uni-load-more>
        <text>正在努力加载...</text>
      </view>
    </template>

    <!-- 默认内容 -->
    <view v-for="item in list" :key="item" class="item-class">
      {{ item }}
    </view>
  </zx-pull-refresh>
</template>

<script setup>
// ... 同上
</script>
```

## API

### Props

| 参数                | 说明                                     | 类型               | 默认值            |
| ------------------- | ---------------------------------------- | ------------------ | ----------------- |
| `v-model`           | 是否处于加载中状态                         | `Boolean`          | `false`           |
| `disabled`          | 是否禁用下拉刷新                           | `Boolean`          | `false`           |
| `head-height`       | 顶部内容高度 (px)                          | `Number` \| `String` | `50`              |
| `success-text`      | 刷新成功提示文案                           | `String`           | `''` (不显示)     |
| `pulling-text`      | 下拉过程提示文案                           | `String`           | `下拉即可刷新...`   |
| `loosing-text`      | 释放过程提示文案                           | `String`           | `释放即可刷新...`   |
| `loading-text`      | 加载过程提示文案                           | `String`           | `加载中...`       |
| `pull-distance`     | 触发下拉刷新的距离 (px)，默认同 `head-height` | `Number` \| `String` | `head-height`     |
| `success-duration`  | 刷新成功提示展示时长 (ms)                  | `Number` \| `String` | `500`             |
| `animation-duration`| 动画时长 (ms)                              | `Number` \| `String` | `300`             |

### Events

| 事件名    | 说明                     | 回调参数                               |
| --------- | ------------------------ | -------------------------------------- |
| `refresh` | 下拉刷新时触发           | -                                      |
| `change`  | 拖动时或状态改变时触发   | `{ status: string, distance: number }` |

`status` 的可能值：`'normal'`, `'pulling'`, `'loosing'`, `'loading'`, `'success'`。

### Slots

| 名称      | 说明                 | 参数 (`props`)          |
| --------- | -------------------- | ----------------------- |
| `default` | 自定义内容区域       | -                       |
| `normal`  | 非下拉状态时顶部内容 | -                       |
| `pulling` | 下拉过程中顶部内容   | `{ distance: number }`  |
| `loosing` | 释放过程中顶部内容   | `{ distance: number }`  |
| `loading` | 加载过程中顶部内容   | `{ distance: number }`  |
| `success` | 刷新成功提示内容     | -                       |

## 注意事项

- **滚动容器**：`zx-pull-refresh` 组件本身不提供滚动。你需要将其放置在一个可滚动的内容区域中，或者确保其内容本身可以滚动（例如，一个长列表）。为了在内容不足一屏时也能触发下拉，可以给 `zx-pull-refresh` 的父容器或其自身设置一个最小高度，如 `min-height: 100vh;`。
- **H5 兼容性**：在 H5 平台，组件内部会尝试阻止浏览器默认的下拉刷新行为。如果遇到问题，请检查是否有其他全局事件监听器干扰。
- **小程序兼容性**：在小程序中，由于事件模型的差异，触摸事件的处理可能需要特别注意。组件已尽力兼容，但复杂嵌套场景下可能需要调整。
- **App 兼容性**：在 App 端，表现通常较好。如果使用 nvue 页面，请确保组件的实现方式与 nvue 兼容（当前版本主要基于 Vue 3 `<script setup>`，在 nvue 中可能需要调整或使用编译模式）。

## 样式变量

组件内部使用了一些基础样式，你可以通过覆盖这些样式或使用更具体的 CSS 选择器来定制外观。

- `.zx-pull-refresh__head`: 头部容器
- `.zx-pull-refresh__text`: 提示文字
- `.zx-pull-refresh__loading`: 加载中状态的容器
- `.zx-loading__spinner`: 加载中的旋转图标

参考 `zx-pull-refresh.vue` 文件中的 `<style scoped>` 部分获取更多细节。