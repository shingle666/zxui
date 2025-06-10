# zx-checkbox-group 多选框组

多选框组组件用于管理一组多选框，使它们成为一个整体，通常用于可选项较多的场景。

## 基础用法

使用 v-model 绑定一个数组类型的变量，数组的值为当前选中的多选框的 value 值。

```html
<zx-checkbox-group v-model="checkList">
  <zx-checkbox label="选项 A" value="A" />
  <zx-checkbox label="选项 B" value="B" />
  <zx-checkbox label="选项 C" value="C" />
</zx-checkbox-group>

<script setup>
import { ref } from 'vue';

const checkList = ref(['A', 'B']);
</script>
```

## 禁用状态

通过设置 `disabled` 属性可以禁用整个多选框组。

```html
<zx-checkbox-group v-model="checkList" disabled>
  <zx-checkbox label="选项 A" value="A" />
  <zx-checkbox label="选项 B" value="B" />
  <zx-checkbox label="选项 C" value="C" />
</zx-checkbox-group>
```

## 布局方式

默认为横向布局，可以通过 `placement` 属性设置为纵向布局。

```html
<!-- 横向布局 -->
<zx-checkbox-group v-model="checkList" placement="row">
  <zx-checkbox label="选项 A" value="A" />
  <zx-checkbox label="选项 B" value="B" />
  <zx-checkbox label="选项 C" value="C" />
</zx-checkbox-group>

<!-- 纵向布局 -->
<zx-checkbox-group v-model="checkList" placement="column">
  <zx-checkbox label="选项 A" value="A" />
  <zx-checkbox label="选项 B" value="B" />
  <zx-checkbox label="选项 C" value="C" />
</zx-checkbox-group>
```

## 限制可选数量

通过设置 `min` 和 `max` 属性可以限制可以选择的选项数量。

```html
<zx-checkbox-group v-model="checkList" :min="1" :max="2">
  <zx-checkbox label="选项 A" value="A" />
  <zx-checkbox label="选项 B" value="B" />
  <zx-checkbox label="选项 C" value="C" />
  <zx-checkbox label="选项 D" value="D" />
</zx-checkbox-group>
```

## 自定义样式

可以通过设置 `activeColor`、`size`、`labelSize` 等属性来自定义多选框组的样式。

```html
<zx-checkbox-group 
  v-model="checkList" 
  active-color="#ff5500" 
  size="40rpx"
  label-size="30rpx"
>
  <zx-checkbox label="选项 A" value="A" />
  <zx-checkbox label="选项 B" value="B" />
  <zx-checkbox label="选项 C" value="C" />
</zx-checkbox-group>
```

## 纵向排列并显示下边框

在纵向排列模式下，可以通过 `border-bottom` 属性显示下边框，增强视觉分隔效果。

```html
<zx-checkbox-group v-model="checkList" placement="column" border-bottom>
  <zx-checkbox label="选项 A" value="A" />
  <zx-checkbox label="选项 B" value="B" />
  <zx-checkbox label="选项 C" value="C" />
</zx-checkbox-group>
```

## 图标位置设置

通过 `icon-placement` 属性可以设置图标的位置，默认为左侧。

```html
<zx-checkbox-group v-model="checkList" icon-placement="right">
  <zx-checkbox label="选项 A" value="A" />
  <zx-checkbox label="选项 B" value="B" />
  <zx-checkbox label="选项 C" value="C" />
</zx-checkbox-group>
```

## 实现全选/反选功能

结合 checkbox 的 indeterminate 属性，可以实现全选/反选功能。

```html
<template>
  <zx-checkbox 
    v-model="checkAll" 
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
    label="全选"
  />
  <zx-checkbox-group v-model="checkList" @change="handleCheckedChange">
    <zx-checkbox v-for="item in options" :key="item" :label="item" :value="item" />
  </zx-checkbox-group>
</template>

<script setup>
import { ref } from 'vue';

const options = ['选项1', '选项2', '选项3', '选项4'];
const checkList = ref(['选项1', '选项2']);
const checkAll = ref(false);
const isIndeterminate = ref(true);

const handleCheckAllChange = (val) => {
  checkList.value = val ? [...options] : [];
  isIndeterminate.value = false;
};

const handleCheckedChange = (value) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === options.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < options.length;
};
</script>
```

## 属性

| 参数名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model / modelValue | 绑定值 | Array | [] |
| name | 标识符 | String | '' |
| shape | 形状，可选值为 square、circle | String | 'square' |
| disabled | 是否禁用所有多选框 | Boolean | false |
| active-color | 选中状态下的颜色 | String | '#2979ff' |
| inactive-color | 未选中的颜色 | String | '#c8c9cc' |
| size | 整个组件的尺寸，默认单位为rpx | String / Number | '36rpx' |
| placement | 布局方式，可选值为 row、column | String | 'row' |
| label-size | label的字体大小，单位为rpx | String / Number | '28rpx' |
| label-color | label的字体颜色 | String | '#303133' |
| label-disabled | 是否禁止点击文本操作 | Boolean | false |
| icon-color | 图标颜色 | String | '#ffffff' |
| icon-size | 图标的大小，单位为rpx | String / Number | '24rpx' |
| icon-placement | 图标对齐方式，可选值为 left、right | String | 'left' |
| border-bottom | 纵向排列时，是否显示下边框 | Boolean | false |
| min | 可被勾选的多选框的最小数量 | Number | 0 |
| max | 可被勾选的多选框的最大数量 | Number | Infinity |
| validate-event | 是否触发表单校验 | Boolean | true |
| tag | 复选框组元素标签 | String | 'view' |
| text-color | 当按钮为活跃状态时的字体颜色 | String | '#ffffff' |
| fill | 当按钮为活跃状态时的边框和背景颜色 | String | '#2979ff' |

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当绑定值变化时触发 | 当前选中的值数组 |
| update:modelValue | 更新v-model绑定的值时触发 | 当前选中的值数组 |

## 插槽

| 名称 | 说明 |
| --- | --- |
| default | 默认插槽，用于放置 zx-checkbox 组件 |
