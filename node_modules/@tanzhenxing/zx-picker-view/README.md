# zx-picker-view 嵌入页面的滚动选择器

`zx-picker-view` 是一个嵌入页面的滚动选择器组件，基于 `uni-app` 的 `picker-view` 进行封装，提供了更灵活的自定义选项。

## 特性

-   支持 H5、小程序、App 端。
-   高度可定制化的选项内容和样式。
-   遵循 `uni-app` `picker-view` 的基本属性和事件。

## 安装

```bash
# npm
npm install zx-ui

# yarn
yarn add zx-ui
```

## 使用方法

在 `script` 中引用组件：

```vue
<script setup>
import ZxPickerView from '@/components/zx-picker-view/zx-picker-view.vue';
</script>
```

在 `template` 中使用组件：

```vue
<template>
  <view>
    <zx-picker-view
      :columns="columns"
      :value="selectedValue"
      @change="handleChange"
    />
  </view>
</template>
```

## API

### Props

| 属性名             | 类型          | 默认值        | 说明                                                                                                                               |
| ------------------ | ------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `value`            | `Array`       | `[]`          | 数组中的数字依次表示 `picker-view` 内的 `picker-view-column` 选择的第几项（下标从 0 开始），数字大于可选项长度时，选择最后一项。        |
| `columns`          | `Array`       | `[]`          | 对象数组，设置每一列的数据。例如：`[[{text: '北京'}, {text: '上海'}], [{text: '男'}, {text: '女'}]]`                               |
| `keyName`          | `String`      | `'text'`      | 选项对象中，需要展示的属性键名。                                                                                                       |
| `itemHeight`       | `String`      | `'88rpx'`     | 各列中，单个选项的高度，单位 rpx。                                                                                                     |
| `visibleItemCount` | `String`      | `Number`      | `5`             | 每列中可见选项的数量。                                                                                                             |
| `indicatorStyle`   | `String`      | `'height: 88rpx;'` | 设置选择器中间选中框的样式。                                                                                                         |
| `indicatorClass`   | `String`      | `''`          | 设置选择器中间选中框的类名。                                                                                                         |
| `maskStyle`        | `String`      | `''`          | 设置蒙层的样式。                                                                                                                   |
| `maskClass`        | `String`      | `''`          | 设置蒙层的类名。                                                                                                                   |
| `immediateChange`  | `Boolean`     | `false`       | 是否在手指松开时立即触发 `change` 事件。若不开启则会在滚动动画结束后触发 `change` 事件。（微信小程序 2.21.1+ 支持）                      |

### Events

| 事件名      | 说明                                                                                                                                                              |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `change`    | 当滚动选择，`value` 改变时触发 `change` 事件，`event.detail = {value: value}`；`value`为数组，表示 `picker-view` 内的 `picker-view-column` 当前选择的是第几项（下标从 0 开始）。 |
| `pickstart` | 当滚动选择开始时候触发事件。（微信小程序2.3.1、快手小程序支持）                                                                                                     |
| `pickend`   | 当滚动选择结束时候触发事件。（微信小程序2.3.1、快手小程序支持）                                                                                                     |

## 示例

请参考 `src/pages/components/picker/view.vue` 文件中的详细用法。
