# zx-radio 单选框组件

## 简介

`zx-radio` 是一个单选框组件，用于在一组选项中选择一个选项。可单独使用或与 `zx-radio-group` 组件配合使用，实现单选功能。

## 基本使用

### 单独使用

```html
<zx-radio v-model:checked="checked" value="选项1">选项1</zx-radio>
```

### 配合 zx-radio-group 使用

```html
<zx-radio-group v-model="radioValue">
  <zx-radio value="1">选项1</zx-radio>
  <zx-radio value="2">选项2</zx-radio>
  <zx-radio value="3">选项3</zx-radio>
</zx-radio-group>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| value | String/Number/Boolean | '' | 单选框的值，当使用radio-group时必须 |
| label | String/Number/Boolean | '' | 单选框的标签，如果没有提供value，则label作为value使用 |
| size | Number | 38 | 组件大小，单位为rpx |
| checked | Boolean | false | 是否选中 |
| disabled | Boolean | false | 是否禁用 |
| parameter | Array | [] | 传递给事件的额外参数 |
| id | String | '' | 组件id，用于zx-label组件的for属性 |
| activeBackgroundColor | String | '' | 选中状态下的背景颜色 |
| backgroundColor | String | '#ffffff' | 未选中状态下的背景颜色 |
| borderColor | String | '#d1d1d1' | 未选中状态下的边框颜色 |
| activeBorderColor | String | '' | 选中状态下的边框颜色 |
| iconColor | String | '#ffffff' | 图标颜色 |
| name | String | '' | 组件名称，用于表单验证 |
| defaultClass | Array | ['zx-color-gray'] | 未选中状态的样式类 |
| checkedClass | Array | ['zx-bg-primary', 'zx-color-white'] | 选中状态的样式类 |

## 事件说明

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中状态变化时触发 | [status, parameter, value]，status为选中状态，parameter为传入的参数，value为单选框的值 |
| update:checked | 选中状态变化时触发，用于支持v-model绑定 | 选中状态，Boolean类型 |

## 使用示例

### 基本用法

```html
<template>
  <view class="container">
    <zx-radio v-model:checked="checked1">默认单选框</zx-radio>
    <zx-radio v-model:checked="checked2" disabled>禁用状态</zx-radio>
    <zx-radio v-model:checked="checked3" size="50" activeBackgroundColor="#ff5500">自定义样式</zx-radio>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const checked1 = ref(false);
const checked2 = ref(true);
const checked3 = ref(false);
</script>
```

### 与 zx-radio-group 配合使用

```html
<template>
  <view class="container">
    <zx-radio-group v-model="radioValue" @change="onChange">
      <zx-radio value="apple">苹果</zx-radio>
      <zx-radio value="banana">香蕉</zx-radio>
      <zx-radio value="orange">橙子</zx-radio>
      <zx-radio value="grape" disabled>葡萄</zx-radio>
    </zx-radio-group>
    
    <view class="result">当前选中: {{ radioValue }}</view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const radioValue = ref('apple');

const onChange = (value) => {
  console.log('选中值变化:', value);
};
</script>
```

### 自定义样式

```html
<template>
  <view class="container">
    <zx-radio
      v-model:checked="checked"
      size="45"
      activeBackgroundColor="#ff9900"
      backgroundColor="#f8f8f8"
      borderColor="#cccccc"
      activeBorderColor="#ff9900"
      iconColor="#ffffff"
    >
      自定义颜色和大小
    </zx-radio>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(false);
</script>
```

### 与 zx-label 配合使用

```html
<template>
  <view class="container">
    <zx-label for="myRadio">
      <view class="label-content">点击此区域也可选中单选框</view>
    </zx-label>
    <zx-radio id="myRadio" v-model:checked="checked">单选框</zx-radio>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const checked = ref(false);
</script>
```

## 注意事项

1. 当单独使用时，请使用 `v-model:checked` 进行双向绑定
2. 当与 `zx-radio-group` 一起使用时，需要为每个 `zx-radio` 提供唯一的 `value` 属性
3. 组件样式支持自定义，可以通过属性或样式类进行定制
4. 如果需要使用表单验证，请设置 `name` 属性
5. 与 `zx-label` 配合使用时，需要设置 `id` 属性并在 `zx-label` 的 `for` 属性中引用

## 依赖说明

本组件依赖以下组件：

- zx-icon: 用于显示选中和未选中状态的图标
