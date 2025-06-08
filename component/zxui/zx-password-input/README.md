# zx-password-input 密码输入框

带网格的输入框组件，可以用于输入密码、短信验证码等场景，通常与数字键盘组件 (`zx-number-keyboard`) 配合使用。

## 特性

- 支持 H5、小程序、App 端。
- 高度可定制，支持自定义长度、格子间距、明暗文切换等。
- 样式基于 Vant PasswordInput，并适配 uniapp 项目。

## 引入

```vue
<template>
  <zx-password-input v-model="password" />
</template>

<script setup>
import { ref } from 'vue';
// import zxPasswordInput from '@/components/zx-password-input/zx-password-input.vue'; // 根据实际路径引入

const password = ref('');
</script>
```

## 代码演示

### 基础用法

搭配数字键盘组件来实现密码输入功能。

```vue
<template>
  <zx-password-input v-model="value" :focused="showKeyboard" @focus="showKeyboard = true" />
  <zx-number-keyboard v-model="value" :show="showKeyboard" @blur="showKeyboard = false" />
</template>

<script setup>
import { ref } from 'vue';
const value = ref('');
const showKeyboard = ref(false);
</script>
```

### 自定义长度

通过 `length` 属性来设置密码长度。

```vue
<zx-password-input v-model="value" :length="4" />
```

### 格子间距

通过 `gutter` 属性来设置格子之间的间距 (单位 rpx)。

```vue
<zx-password-input v-model="value" :gutter="10" />
```

### 明文展示

将 `mask` 设置为 `false` 可以明文展示输入的内容，适用于短信验证码等场景。

```vue
<zx-password-input v-model="value" :mask="false" />
```

### 提示信息

通过 `info` 属性设置提示信息，通过 `error-info` 属性设置错误提示。

```vue
<template>
  <zx-password-input
    v-model="value"
    info="密码为 6 位数字"
    :error-info="errorInfo"
    :focused="showKeyboard"
    @focus="showKeyboard = true"
  />
  <zx-number-keyboard v-model="value" :show="showKeyboard" @blur="showKeyboard = false" />
</template>

<script setup>
import { ref, watch } from 'vue';

const value = ref('');
const errorInfo = ref('');
const showKeyboard = ref(false);

watch(value, (newVal) => {
  if (newVal.length === 6 && newVal !== '123456') {
    errorInfo.value = '密码错误';
  } else {
    errorInfo.value = '';
  }
});
</script>
```

## API

### Props

| 参数        | 说明                                     | 类型             | 默认值  |
| ----------- | ---------------------------------------- | ---------------- | ------- |
| value       | 密码值 (支持 `v-model`)                    | String           | `''`    |
| info        | 输入框下方文字提示                         | String           | `''`    |
| error-info  | 输入框下方错误提示                         | String           | `''`    |
| length      | 密码最大长度                             | Number \| String | `6`     |
| gutter      | 输入框格子之间的间距 (单位 rpx)            | Number \| String | `0`     |
| mask        | 是否隐藏密码内容                         | Boolean          | `true`  |
| focused     | 是否已聚焦，聚焦时会显示光标             | Boolean          | `false` |
| item-width  | 每个格子的宽度 (单位 rpx 或其他合法 CSS 单位) | Number \| String | `'auto'`|
| item-height | 每个格子的高度 (单位 rpx 或其他合法 CSS 单位) | Number \| String | `50`    |
| custom-style| 自定义根节点样式                         | String \| Object | `''`    |

### Events

| 事件名        | 说明             | 回调参数 |
| ------------- | ---------------- | -------- |
| focus         | 输入框聚焦时触发 | `event`  |
| update:value  | `v-model` 更新事件 | `value`  |

## 样式变量

组件提供了一些 CSS 变量，可用于自定义样式。你可以在项目的全局样式文件或者页面的 `<style>` 标签中覆盖这些变量。

| 名称                                  | 默认值 (rpx) | 描述                 |
| ------------------------------------- | ------------ | -------------------- |
| `--zx-password-input-height`          | `100rpx`     | 输入框总高度         |
| `--zx-password-input-margin`          | `0 30rpx`    | 输入框外边距         |
| `--zx-password-input-font-size`       | `40rpx`      | 格子内文字/点的大小  |
| `--zx-password-input-radius`          | `12rpx`      | 输入框/格子圆角      |
| `--zx-password-input-background`      | `#f7f8fa`    | 格子背景色           |
| `--zx-password-input-info-color`      | `#969799`    | 提示文字颜色         |
| `--zx-password-input-info-font-size`  | `28rpx`      | 提示文字大小         |
| `--zx-password-input-error-info-color`| `#ee0a24`    | 错误提示文字颜色     |
| `--zx-password-input-dot-size`        | `20rpx`      | 密码掩码点的大小     |
| `--zx-password-input-dot-color`       | `#323233`    | 密码掩码点的颜色     |
| `--zx-password-input-text-color`      | `#323233`    | 明文展示时文字颜色   |
| `--zx-password-input-cursor-color`    | `#323233`    | 光标颜色             |
| `--zx-password-input-cursor-width`    | `2rpx`       | 光标宽度             |
| `--zx-password-input-cursor-height`   | `40%`        | 光标高度             |
| `--zx-password-input-cursor-duration` | `1s`         | 光标闪烁动画周期     |
| `--zx-padding-md`                     | `20rpx`      | 用于提示信息的上边距 |

**注意:**
- `item-width` 默认为 `auto`，当 `gutter` 为 `0` 时，格子会自动均分宽度。如果设置了 `gutter`，建议同时设置一个明确的 `item-width` 以获得最佳布局。
- `zx-number-keyboard` 是一个假设存在的数字键盘组件，你需要确保项目中已经有此组件或替换为其他可用的键盘组件。