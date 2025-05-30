# zx-swipe-cell 滑动单元格

`zx-swipe-cell` 组件允许用户通过左右滑动来显示隐藏的操作按钮，常用于列表项的操作，如删除、编辑等。

## 特性

- 支持左滑和右滑操作。
- 可自定义左侧和右侧滑动区域的内容。
- 支持禁用滑动。
- 支持异步关闭，允许在关闭前执行自定义逻辑（例如确认对话框）。
- 提供了 `open`, `close`, `click` 事件。
- 可通过 `ref` 调用 `open` 和 `close` 方法。
- 兼容 H5、小程序和 App 端。

## 基本用法

```vue
<template>
  <zx-swipe-cell>
    <template #left>
      <view style="background-color: #007aff; color: white; padding: 0 20px; height: 100%; display: flex; align-items: center;">选择</view>
    </template>
    <view style="padding: 10px; border-bottom: 1px solid #eee;">
      这是一个可以滑动的单元格
    </view>
    <template #right>
      <view style="background-color: #dd524d; color: white; padding: 0 20px; height: 100%; display: flex; align-items: center;" @click="onDelete">删除</view>
      <view style="background-color: #f0ad4e; color: white; padding: 0 20px; height: 100%; display: flex; align-items: center;">收藏</view>
    </template>
  </zx-swipe-cell>
</template>

<script setup>
const onDelete = () => {
  uni.showToast({
    title: '点击了删除',
    icon: 'none'
  });
};
</script>
```

## API

### Props

| 参数名        | 说明                                                                 | 类型               | 默认值  |
| ------------- | -------------------------------------------------------------------- | ------------------ | ------- |
| name          | 标识符，通常为一个唯一的字符串或数字，可以在事件参数中获取到             | `String`, `Number` | `''`    |
| disabled      | 是否禁用滑动                                                         | `Boolean`          | `false` |
| leftWidth     | 指定左侧滑动区域宽度，单位为 px。**注意：设置为 `auto` 时，实际宽度将按 `0` 处理。请务必提供明确的数值宽度 (如 `'60'` 或 `60`) 以显示滑动区域。** | `String`, `Number` | `'auto'`|
| rightWidth    | 指定右侧滑动区域宽度，单位为 px。**注意：设置为 `auto` 时，实际宽度将按 `0` 处理。请务必提供明确的数值宽度 (如 `'60'` 或 `60`) 以显示滑动区域。** | `String`, `Number` | `'auto'`|
| beforeClose   | 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 `Promise`。回调参数为 `{ position, name, instance }` | `Function`         | `null`  |
| stopPropagation | 是否阻止滑动事件冒泡                                                 | `Boolean`          | `false` |

### Slots

| 名称    | 说明             |
| ------- | ---------------- |
| default | 默认显示的内容   |
| left    | 左侧滑动区域的内容 |
| right   | 右侧滑动区域的内容 |

### Events

| 事件名 | 说明                                                                                                | 回调参数                                                     |
| ------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| open   | 打开时触发                                                                                          | `{ name: String | Number, position: 'left' | 'right' }`     |
| close  | 关闭时触发                                                                                          | `{ name: String | Number, position: 'left' | 'right' | 'cell' | 'outside' }` |
| click  | 点击时触发（包括滑动区域和单元格本身）                                                                | `position: 'left' | 'right' | 'cell' | 'outside'`         |

#### `beforeClose` 回调参数

`beforeClose` 的第一个参数为对象，包含以下属性：

| 参数名   | 说明                                                                 | 类型                                |
| -------- | -------------------------------------------------------------------- | ----------------------------------- |
| position | 关闭时的点击位置 (`'left'`, `'right'`, `'cell'`, `'outside'`) 或触发关闭的方向 | `String`                            |
| name     | 组件的 `name` prop                                                    | `String`, `Number`                  |
| instance | 组件实例，包含 `open` 和 `close` 方法，可用于在异步操作后手动控制开关 | `{ open: Function, close: Function }` |

### Methods

通过 `ref` 获取到组件实例后，可以调用以下方法：

| 方法名 | 说明             | 参数                               |
| ------ | ---------------- | ---------------------------------- |
| open   | 打开单元格侧边栏 | `position: 'left' \| 'right'`      |
| close  | 收起单元格侧边栏 | 无                                 |

```vue
<template>
  <zx-swipe-cell ref="swipeCellRef">
    <view style="padding: 10px;">内容</view>
    <template #right>
      <view style="background-color: #dd524d; color: white; padding: 0 20px;" @click="closeCell">关闭</view>
    </template>
  </zx-swipe-cell>
  <button @click="openRight">通过 Ref 打开右侧</button>
</template>

<script setup>
import { ref } from 'vue';

const swipeCellRef = ref(null);

const openRight = () => {
  if (swipeCellRef.value) {
    swipeCellRef.value.open('right');
  }
};

const closeCell = () => {
  if (swipeCellRef.value) {
    swipeCellRef.value.close();
  }
}
</script>
```

## 注意事项

- **重要**：`leftWidth` 和 `rightWidth` 若不设置或设置为 `'auto'`，则对应的滑动区域宽度为 `0`，即不显示。您必须为这两个属性提供明确的以 `px` 为单位的数值（例如 `left-width="60"` 或 `:left-width="60"`），才能使滑动区域可见并正常工作。
- 组件内部不再尝试通过 `getRect` 动态计算 `auto` 宽度，以保证跨平台行为的一致性和可预测性。
- `beforeClose` 返回 `Promise` 时，可以实现例如删除前的确认弹窗等交互。
- 滑动操作的灵敏度和行为尽量模拟原生体验，但在不同平台和设备上可能存在细微差异。