# zx-number-keyboard 数字键盘

虚拟数字键盘，可以配合密码输入框组件或自定义的输入框组件使用。

## 平台兼容性

| H5  | App | 小程序 |
| --- | --- | ---- |
| ✔   | ✔   | ✔    |

## 基本使用

数字键盘提供了 `input`、`delete`、`blur`、`close` 事件，分别对应输入内容、删除内容、失去焦点和点击完成按钮的动作。

```vue
<template>
  <input type="text" :value="value" @focus="show = true" readonly placeholder="点击弹出默认键盘" />
  <zx-number-keyboard
    :show="show"
    v-model="value"
    @blur="show = false"
    @input="onInput"
    @delete="onDelete"
  />
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
const value = ref('');

const onInput = (inputValue) => {
  console.log('输入：', inputValue);
};

const onDelete = () => {
  console.log('删除');
};
</script>
```

## 带右侧栏的键盘

将 `theme` 属性设置为 `custom` 来展示键盘的右侧栏，常用于输入金额的场景。

```vue
<zx-number-keyboard
  :show="show"
  theme="custom"
  extra-key="."
  close-button-text="完成"
  v-model="value"
  @blur="show = false"
/>
```

## 身份证号键盘

通过 `extra-key` 属性可以设置左下角按键内容，比如需要输入身份证号时，可以将 `extra-key` 设置为 `X`。

```vue
<zx-number-keyboard
  :show="show"
  extra-key="X"
  close-button-text="完成"
  v-model="value"
  @blur="show = false"
/>
```

## 键盘标题

通过 `title` 属性可以设置键盘标题。

```vue
<zx-number-keyboard
  :show="show"
  title="请输入支付密码"
  extra-key="."
  close-button-text="完成"
  v-model="value"
  @blur="show = false"
/>
```

## 配置多个按键

当 `theme` 为 `custom` 时，支持以数组的形式配置两个 `extra-key`。

```vue
<zx-number-keyboard
  :show="show"
  theme="custom"
  :extra-key="['00', '.']"
  close-button-text="完成"
  v-model="value"
  @blur="show = false"
/>
```

## 随机数字键盘

通过 `random-key-order` 属性可以随机排序数字键盘，常用于安全等级较高的场景。

```vue
<zx-number-keyboard
  :show="show"
  random-key-order
  v-model="value"
  @blur="show = false"
/>
```

## 双向绑定

可以通过 `v-model` 绑定键盘当前输入值，并通过 `maxlength` 属性来限制输入长度。

```vue
<input type="text" v-model="value" readonly @focus="show = true" />
<zx-number-keyboard
  v-model="value"
  :show="show"
  :maxlength="6"
  @blur="show = false"
/>
```

## Props

| 参数                | 说明                                                                 | 类型                      | 默认值       |
| ------------------- | -------------------------------------------------------------------- | ------------------------- | ------------ |
| v-model             | 当前输入值                                                           | `String`                  | `''`         |
| show                | 是否显示键盘                                                         | `Boolean`                 | `false`      |
| title               | 键盘标题                                                             | `String`                  | `''`         |
| theme               | 样式风格，可选值为 `custom`                                          | `String`                  | `default`    |
| maxlength           | 输入值最大长度                                                       | `Number` \| `String`      | `Infinity`   |
| z-index             | 键盘 z-index 层级                                                    | `Number` \| `String`      | `100`        |
| extra-key           | 底部额外按键的内容, `theme`为`custom`时可为数组传入两个值            | `String` \| `Array<String>` | `''`         |
| close-button-text   | 关闭按钮文字，空则不展示（`theme`为`default`时生效）                   | `String`                  | `完成`       |
| delete-button-text  | 删除按钮文字，空则展示删除图标                                         | `String`                  | `''`         |
| close-button-loading| 是否将关闭按钮设置为加载中状态（仅在 `theme="custom"` 时有效）         | `Boolean`                 | `false`      |
| show-delete-key     | 是否展示删除图标/文字                                                  | `Boolean`                 | `true`       |
| blur-on-close       | 是否在点击关闭按钮时触发 `blur` 事件                                   | `Boolean`                 | `true`       |
| hide-on-click-outside | 是否在点击外部时收起键盘 (uni-app中建议在页面控制该逻辑)             | `Boolean`                 | `true`       |
| safe-area-inset-bottom | 是否开启底部安全区适配                                                 | `Boolean`                 | `true`       |
| random-key-order    | 是否将通过随机顺序展示按键                                             | `Boolean`                 | `false`      |

## Events

| 事件名        | 说明                                           | 回调参数             |
| ------------- | ---------------------------------------------- | -------------------- |
| input         | 点击按键时触发                                 | `key: String`        |
| delete        | 点击删除键时触发                               | -                    |
| close         | 点击关闭按钮时触发 (`theme`为`custom`时生效)   | -                    |
| blur          | 点击关闭按钮或非键盘区域时触发                   | -                    |
| show          | 键盘完全弹出时触发 (若`transition`为`false`则同步触发) | -                    |
| hide          | 键盘完全收起时触发 (若`transition`为`false`则同步触发) | -                    |

## Slots

| 名称         | 说明                     |
| ------------ | ------------------------ |
| delete       | 自定义删除按键内容         |
| extra-key    | 自定义左下角按键内容     |
| title-left   | 自定义标题栏左侧内容     |