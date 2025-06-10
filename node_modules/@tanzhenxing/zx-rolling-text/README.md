# zx-rolling-text 翻滚文本

`zx-rolling-text` 是一个为 UniApp 设计的文本翻滚动效组件，可以用于数字的动态翻滚效果，也支持非数字文本内容的列表翻转。它旨在提供一种视觉上吸引人的方式来展示变化的数值或文本。

## 特性

- **数字翻滚**：支持从起始数字平滑翻滚到目标数字。
- **文本列表翻转**：支持一组文本内容之间的依次翻转动画。
- **自定义方向**：可以设置数字或文本向上或向下翻滚。
- **自定义停止顺序**：对于多位数数字，可以控制是从高位先停止还是从低位先停止。
- **灵活配置**：提供动画时长、高度、字体大小、间距等多种 Props 进行样式和行为定制。
- **手动控制**：可以通过 `ref` 获取组件实例，调用 `start` 和 `reset` 方法来手动控制动画的开始和重置。
- **跨平台**：基于 UniApp 的标准组件和 API 实现，努力兼容 H5、小程序和 App 端。

## 使用方法

```vue
<template>
  <view>
    <!-- 数字翻滚 -->
    <zx-rolling-text :start-num="0" :target-num="1234" />

    <!-- 文本列表翻转 -->
    <zx-rolling-text :text-list="['Apple', 'Banana', 'Cherry']" />

    <!-- 手动控制 -->
    <zx-rolling-text ref="myRoller" :target-num="999" :auto-start="false" />
    <button @click="startAnimation">开始</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';
// 如果项目没有自动导入组件，可能需要手动引入
// import zxRollingText from '@/components/zx-rolling-text/zx-rolling-text.vue';

const myRoller = ref(null);
const startAnimation = () => {
  myRoller.value?.start();
};
</script>
```

## API

### Props

| 参数             | 类型                  | 默认值      | 说明                                                                                             |
| ---------------- | --------------------- | ----------- | ------------------------------------------------------------------------------------------------ | 
| `startNum`       | Number                | `0`         | 起始数值，当 `textList` 为空时生效。                                                                 |
| `targetNum`      | Number                | `undefined` | 目标数值，当 `textList` 为空时生效。                                                                 |
| `textList`       | Array\[String]        | `[]`        | 内容数组，用于翻转非数字内容。如果提供此项，则忽略 `startNum` 和 `targetNum`。数组中各项长度必须一致。 |
| `duration`       | Number                | `2`         | 动画时长，单位为秒。                                                                               |
| `autoStart`      | Boolean               | `true`      | 是否自动开始动画。                                                                                 |
| `direction`      | String                | `'down'`    | 文本翻滚方向，可选值为 `'down'` (向下) 或 `'up'` (向上)。                                              |
| `stopOrder`      | String                | `'ltr'`     | 多位数动画停止的先后顺序，可选值为 `'ltr'` (从左到右) 或 `'rtl'` (从右到左)。                            |
| `height`         | Number \| String        | `40`        | 单个数字/字符的高度，单位为 `px`。                                                                   |
| `fontSize`       | Number \| String        | `'inherit'` | 字体大小，支持 `rpx` 或 `px` 单位，或 CSS 关键字如 `inherit`。                                         |
| `itemWidth`      | Number \| String        | `'auto'`    | 单个数位/字符的宽度，单位为 `px`。`'auto'` 表示自适应内容。                                              |
| `gap`            | Number \| String        | `0`         | 数位/字符之间的间隔，单位为 `px`。                                                                   |
| `randomOffset`   | Boolean               | `false`     | 是否在初始时随机偏移各个滚动项的位置，以增加视觉趣味性（主要用于数字滚动）。                               |
| `customStyle`    | Object                | `{}`        | 自定义根元素样式对象，可以用于覆盖或添加如背景色、文字颜色等。支持 CSS 变量形式。                        |

**CSS 变量 (通过 `customStyle` 或直接在 class 中定义):**

- `--zx-rolling-text-bg`: 单个数位/字符的背景色 (默认: `transparent`)
- `--zx-rolling-text-color`: 数字/字符的颜色 (默认: `inherit`)
- `--zx-rolling-text-item-radius`: 单个数位/字符的圆角 (默认: `0`)

### Methods

通过 `ref` 获取组件实例后，可以调用以下方法：

| 方法名  | 说明                                     | 参数 | 返回值 |
| ------- | ---------------------------------------- | ---- | ------ |
| `start` | 开始（或重新开始）翻滚动画。               | -    | -      |
| `reset` | 重置动画到初始状态。如果 `autoStart` 为 `true`，重置后会自动再次开始。 | -    | -      |

## 注意事项

- **性能**：对于非常长的数字或文本列表，以及非常快速的动画，请注意性能影响，尤其是在性能较低的设备上。
- **字体与宽度**：`itemWidth` 设置为 `auto` 时，每个字符的宽度会自适应。如果需要固定宽度，请明确设置 `itemWidth`。字体的选择也可能影响最终的视觉宽度。
- **`textList` 长度一致性**：当使用 `textList` 时，数组中的每个字符串长度必须相同，否则可能导致显示异常。
- **动画平滑度**：动画的平滑度依赖于 CSS `transition`。在不同平台和设备上，CSS 动画的表现可能略有差异。
- **Nvue 兼容性**：由于 Nvue 对 CSS 动画的支持限制，复杂动画（如 `ease-in-out` 之外的 `timing-function` 或某些 transform 细节）可能表现不同或不支持。此组件主要针对 Vue 页面优化。

## 示例页面

请参考项目中的 `src/pages3/rolling-text/index.vue` 文件，其中包含了各种使用场景的示例代码。