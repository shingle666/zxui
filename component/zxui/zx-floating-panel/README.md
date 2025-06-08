# zx-floating-panel 浮动面板

浮动在页面底部的面板，可以上下拖动来浏览内容，常用于提供额外的功能或信息。

## 平台兼容性

| H5  | 小程序 | App |
| --- | ---- | --- |
| ✔️  | ✔️   | ✔️  |

## 基本用法

FloatingPanel 的默认高度为 `100px`（或 anchors 第一个值），用户可以拖动来展开面板。

```vue
<template>
  <zx-floating-panel v-model="showPanel" :height="150">
    <view>面板内容</view>
  </zx-floating-panel>
</template>

<script setup>
import { ref } from 'vue';
const showPanel = ref(true);
</script>
```

## 自定义锚点

通过 `anchors` 属性来设置 FloatingPanel 的锚点位置（单位 px），并通过 `v-model:height` (或 `:height` 和 `@update:height`) 来控制当前面板的显示高度。

例如，使面板的高度在 `100px`、`40%` 屏幕高度和 `70%` 屏幕高度三个位置停靠：

```vue
<template>
  <zx-floating-panel v-model="showPanel" v-model:height="panelHeight" :anchors="panelAnchors">
    <view style="text-align: center; padding: 15px">
      <text>面板显示高度 {{ panelHeight.toFixed(0) }} px</text>
    </view>
  </zx-floating-panel>
</template>

<script setup>
import { ref, computed } from 'vue';

const showPanel = ref(true);
const panelAnchors = computed(() => {
  const windowHeight = uni.getSystemInfoSync().windowHeight;
  return [
    100,
    Math.round(0.4 * windowHeight),
    Math.round(0.7 * windowHeight),
  ].sort((a,b) => a - b);
});
const panelHeight = ref(panelAnchors.value[0]);
</script>
```

## 仅头部拖拽

默认情况下，FloatingPanel 的头部区域和内容区域都可以被拖拽，你可以通过 `content-draggable` 属性来禁用内容区域的拖拽。

```vue
<template>
  <zx-floating-panel v-model="showPanel" :content-draggable="false">
    <view style="text-align: center; padding: 15px">
      <text>内容不可拖拽</text>
    </view>
  </zx-floating-panel>
</template>

<script setup>
import { ref } from 'vue';
const showPanel = ref(true);
</script>
```

## API

### Props

| 参数                | 说明                                       | 类型               | 默认值                                  |
| ------------------- | ------------------------------------------ | ------------------ | --------------------------------------- |
| `v-model`           | 是否显示面板                               | `Boolean`          | `true`                                  |
| `v-model:height`    | 当前面板的显示高度 (或使用 `:height` 和 `@update:height`) | `Number`           | `0` (实际会基于 anchors 初始化)         |
| `anchors`           | 设置自定义锚点, 单位 `px`                  | `Array<Number>`    | `[100, windowHeight * 0.6]` (近似值)    |
| `duration`          | 动画时长，单位秒，设置为 `0` 可以禁用动画    | `Number \| String` | `0.3`                                   |
| `content-draggable` | 允许拖拽内容容器                           | `Boolean`          | `true`                                  |
| `lock-scroll`       | 当不拖拽时，是否锁定背景滚动 (H5平台部分支持，小程序/App需页面配合) | `Boolean`          | `false`                                 |
| `safe-area-inset-bottom` | 是否开启底部安全区适配                     | `Boolean`          | `true`                                  |

### Events

| 事件名         | 说明                               | 回调参数             |
| -------------- | ---------------------------------- | -------------------- |
| `heightChange` | 面板显示高度改变且结束拖动后触发     | `{ height: number }` |
| `update:height`| 面板高度更新时触发 (用于v-model:height) | `newHeight: number`  |
| `update:modelValue`| 面板显隐状态更新时触发 (用于v-model) | `newValue: boolean`  |

### Slots

| Name    | Description        |
| ------- | ------------------ |
| `default` | 自定义面板内容     |
| `header`  | 自定义面板标头     |

## 主题定制

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                               | 默认值                      | 描述             |
| ---------------------------------- | --------------------------- | ---------------- |
| `--van-floating-panel-border-radius` | `16px`                      | 面板圆角         |
| `--van-floating-panel-header-height` | `30px`                      | 头部高度         |
| `--van-floating-panel-z-index`       | `999`                       | z-index 层级     |
| `--van-floating-panel-background`    | `#fff` (或 `var(--van-background-2)`) | 背景色           |
| `--van-floating-panel-bar-width`     | `20px`                      | 拖动条宽度       |
| `--van-floating-panel-bar-height`    | `3px`                       | 拖动条高度       |
| `--van-floating-panel-bar-color`     | `#c8c9cc` (或 `var(--van-gray-5)`) | 拖动条颜色       |

**注意:** 上述默认值参考了 Vant，实际组件内可能使用更通用的值或依赖项目主题配置。