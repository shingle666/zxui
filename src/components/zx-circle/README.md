# zx-circle 环形进度条

圆环形的进度条组件，支持进度渐变动画，兼容 H5、小程序和 APP。

## 引入

```vue
<script setup>
import ZxCircle from '@/components/zx-circle/zx-circle.vue';
</script>
```

## 代码演示

### 基础用法

`rate` 属性表示进度条的目标进度，`v-model:currentRate` (或 `:current-rate` 并监听 `@update:currentRate`) 表示动画过程中的实时进度。当 `rate` 发生变化时，`currentRate` 会以 `speed` 的速度变化，直至达到 `rate` 设定的值。

```vue
<template>
  <zx-circle v-model:currentRate="currentRate" :rate="30" :speed="100" :text="text" />
</template>

<script setup>
import { ref, computed } from 'vue';

const currentRate = ref(0);
const text = computed(() => currentRate.value.toFixed(0) + '%');
</script>
```

### 宽度定制

通过 `stroke-width` 属性来控制进度条宽度，`stroke-width` 指的是 SVG 中 path 的宽度，默认值为 40。注意，此单位非 `px`。

```vue
<zx-circle v-model:currentRate="currentRate" :rate="rate" :stroke-width="60" text="宽度定制" />
```

### 颜色定制

通过 `color` 属性来控制进度条颜色，`layer-color` 属性来控制轨道颜色。

```vue
<zx-circle
  v-model:currentRate="currentRate"
  :rate="rate"
  color="#ee0a24"
  layer-color="#ebedf0"
  text="颜色定制"
/>
```

### 渐变色

`color` 属性支持传入对象格式来定义渐变色。

```vue
<template>
  <zx-circle v-model:currentRate="currentRate" :rate="rate" :color="gradientColor" text="渐变色" />
</template>

<script setup>
import { ref } from 'vue';

const currentRate = ref(0);
const rate = ref(70);
const gradientColor = {
  '0%': '#3fecff',
  '100%': '#6149f6',
};
</script>
```

### 逆时针方向

将 `clockwise` 设置为 `false`，进度会从逆时针方向开始。

```vue
<zx-circle v-model:currentRate="currentRate" :rate="rate" :clockwise="false" text="逆时针" />
```

### 大小定制

通过 `size` 属性设置圆环直径，单位为 `rpx`。

```vue
<zx-circle v-model:currentRate="currentRate" :rate="rate" size="240" text="大小定制" />
```

### 起始位置

进度条默认从顶部开始，可以通过 `start-position` 属性设置起始位置，可选值为 `top`, `right`, `bottom`, `left`。

```vue
<zx-circle v-model:currentRate="currentRate" :rate="rate" text="左侧" start-position="left" />
<zx-circle v-model:currentRate="currentRate" :rate="rate" text="右侧" start-position="right" />
<zx-circle v-model:currentRate="currentRate" :rate="rate" text="底部" start-position="bottom" />
```

## API

### Props

| 参数             | 说明                                                       | 类型               | 默认值    |
| ---------------- | ---------------------------------------------------------- | ------------------ | --------- |
| `v-model:currentRate` | 当前进度，推荐使用 `v-model`                               | `Number`           | `0`       |
| `rate`           | 目标进度                                                   | `Number \| String`   | `100`     |
| `size`           | 圆环直径，单位 `rpx`                                       | `Number \| String`   | `100`     |
| `color`          | 进度条颜色，传入对象格式可以定义渐变色                     | `String \| Object` | `#1989fa` |
| `layer-color`    | 轨道颜色                                                   | `String`           | `#ffffff` |
| `fill`           | 填充颜色                                                   | `String`           | `none`    |
| `speed`          | 动画速度（单位为 `rate/s`），`0` 表示无动画                | `Number \| String`   | `0`       |
| `text`           | 文字                                                       | `String`           | -         |
| `stroke-width`   | 进度条宽度 (SVG `stroke-width`)                            | `Number \| String`   | `40`      |
| `stroke-linecap` | 进度条端点的形状，可选值为 `square` `butt`                 | `String`           | `round`   |
| `clockwise`      | 是否顺时针增加                                             | `Boolean`          | `true`    |
| `start-position` | 进度起始位置，可选值为 `left`、`right`、`bottom`           | `String`           | `top`     |

### Events

| 事件名             | 说明                     | 回调参数            |
| ------------------ | ------------------------ | ------------------- |
| `update:currentRate` | `currentRate` 变化时触发 | `currentRate: number` |

### Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 自定义文字内容 |

## 主题定制

### CSS 变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称                             | 默认值                      | 描述               |
| -------------------------------- | --------------------------- | ------------------ |
| `--zx-circle-layer-fill`         | `none`                      | 轨道填充颜色       |
| `--zx-circle-layer-color`        | `#fff`                      | 轨道颜色           |
| `--zx-circle-stroke-width`       | `40px` (逻辑像素，非物理)   | 轨道和进度条宽度   |
| `--zx-circle-hover-stroke-color` | `#1989fa`                   | 进度条颜色         |
| `--zx-circle-stroke-linecap`     | `round`                     | 进度条端点形状     |
| `--zx-circle-text-color`         | `#323233`                   | 文字颜色           |
| `--zx-circle-text-font-weight`   | `500`                       | 文字字重           |
| `--zx-circle-text-font-size`     | `14px` (逻辑像素，非物理)   | 文字大小           |
| `--zx-circle-text-line-height`   | `20px` (逻辑像素，非物理)   | 文字行高           |