# zx-floating-bubble 浮动气泡

悬浮在页面边缘的可点击气泡，支持拖拽和磁吸效果。

## 平台兼容性

| H5  | App | 小程序 |
| --- | --- | ---- |
| ✔   | ✔   | ✔    |

## 基本使用

通过 `icon` 属性设置气泡的图标。

```vue
<template>
  <zx-floating-bubble icon="chat-o" @click="onClick" />
</template>

<script setup>
const onClick = () => {
  uni.showToast({
    title: '点击气泡',
    icon: 'none'
  });
};
</script>
```

## 自由拖拽和磁吸

通过 `axis` 属性设置拖拽方向，`magnetic` 属性设置磁吸方向。

- `axis`: 可选值为 `'x'`, `'y'`, `'xy'`, `'lock'`。默认为 `'y'`。
  - `'x'`: 只能在 x 轴方向拖拽
  - `'y'`: 只能在 y 轴方向拖拽
  - `'xy'`: 可以在 x 和 y 轴方向自由拖拽
  - `'lock'`: 禁止拖拽
- `magnetic`: 可选值为 `'x'`, `'y'`。
  - `'x'`: 拖拽释放后，自动吸附到 x 轴方向最近的边缘。
  - `'y'`: 拖拽释放后，自动吸附到 y 轴方向最近的边缘。

```vue
<template>
  <zx-floating-bubble
    axis="xy"
    icon="scan"
    magnetic="x"
    @offset-change="onOffsetChange"
  />
</template>

<script setup>
const onOffsetChange = (offset) => {
  console.log(`x: ${offset.x.toFixed(0)}, y: ${offset.y.toFixed(0)}`);
};
</script>
```

## 双向绑定 offset

使用 `v-model:offset` 控制浮动气泡的位置。

```vue
<template>
  <zx-floating-bubble v-model:offset="offset" axis="xy" icon="setting-o" />
  <view>当前位置: x: {{ offset.x.toFixed(0) }}, y: {{ offset.y.toFixed(0) }}</view>
  <button @click="resetPosition">重置位置</button>
</template>

<script setup>
import { ref } from 'vue';

const offset = ref({ x: 200, y: 400 });

const resetPosition = () => {
  offset.value = { x: 20, y: 300 };
};
</script>
```

## 自定义内容

通过默认插槽自定义气泡显示内容。

```vue
<template>
  <zx-floating-bubble axis="xy">
    <view style="font-size: 12px; color: white;">客服</view>
  </zx-floating-bubble>
</template>
```

## API

### Props

| 参数         | 说明                                                                 | 类型                         | 默认值        |
| ------------ | -------------------------------------------------------------------- | ---------------------------- | ------------- |
| v-model:offset | 控制气泡位置，`{ x: number, y: number }`。x或y为-1时表示默认右下角 | Object                       | `{ x: -1, y: -1 }` |
| axis         | 拖拽的方向，可选值为 `'x'`, `'y'`, `'xy'`, `'lock'`                      | String                       | `'y'`         |
| magnetic     | 自动磁吸的方向，可选值为 `'x'`, `'y'`                                    | String                       | -             |
| icon         | 气泡图标名称或图片链接，同 `zx-icon` 的 `name` 属性                      | String                       | `'chat-o'`    |
| gap          | 气泡与窗口的最小间距，单位为 px。可为数字或对象`{x: number, y: number}` | Number / Object              | `24`          |
| v-model      | 控制气泡的显示与隐藏 (uni-app中通常用 `v-model` 或 `v-model:visible`)    | Boolean                      | `true`        |

### Events

| 事件名        | 说明                               | 回调参数                            |
| ------------- | ---------------------------------- | ----------------------------------- |
| click         | 点击组件时触发                     | `event: MouseEvent`                 |
| offset-change | 由用户拖拽导致位置改变后触发         | `offset: { x: number, y: number }`  |
| update:offset | `v-model:offset` 更新时触发        | `offset: { x: number, y: number }`  |
| update:modelValue | `v-model` 更新时触发 (用于控制显示隐藏) | `value: boolean`                    |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 自定义气泡显示内容 |

### Methods

通过 `ref` 获取组件实例后，可以调用以下方法：

| 方法名 | 说明         | 参数 |
| ------ | ------------ | ---- |
| show   | 显示气泡     | -    |
| hide   | 隐藏气泡     | -    |
| toggle | 切换气泡显隐 | -    |

```vue
<template>
  <zx-floating-bubble ref="bubbleRef" />
  <button @click="toggleBubble">切换显示</button>
</template>

<script setup>
import { ref } from 'vue';
const bubbleRef = ref(null);

const toggleBubble = () => {
  bubbleRef.value?.toggle();
}
</script>
```