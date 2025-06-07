# zx-segmented 分段控制器组件

用于展示多个选项并允许用户选择其中单个选项。

## 基础用法

设置`v-model`为选项值。

```vue
<template>
  <zx-segmented v-model="value" :options="options" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('Mon');
const options = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
</script>
```

## 尺寸设置

提供 large、default、small 三种尺寸。

```vue
<template>
  <zx-segmented v-model="value" :options="options" size="large" />
  <zx-segmented v-model="value" :options="options" size="default" />
  <zx-segmented v-model="value" :options="options" size="small" />
</template>
```

## 方向设置

通过 `direction` 属性设置水平或垂直方向。

```vue
<template>
  <zx-segmented v-model="value" :options="options" direction="vertical" />
</template>
```

## 禁用状态

可以禁用整个组件或者单个选项。

```vue
<!-- 禁用整个组件 -->
<zx-segmented v-model="value" :options="options" disabled />

<!-- 禁用部分选项 -->
<zx-segmented v-model="value" :options="disabledOptions" />

<script setup>
const disabledOptions = [
  { label: 'Mon', value: 'Mon', disabled: true },
  { label: 'Tue', value: 'Tue' },
  { label: 'Wed', value: 'Wed', disabled: true }
];
</script>
```

## 自定义配置选项

当您的 `options` 格式不同于默认格式时，可通过 `props` 属性自定义 `options`。

```vue
<template>
  <zx-segmented v-model="value" :options="options" :props="props" />
</template>

<script setup>
const props = {
  label: 'myLabel',
  value: 'myValue',
  disabled: 'myDisabled'
};
const options = [
  { myLabel: 'Mon', myValue: 'Mon', myDisabled: true },
  { myLabel: 'Tue', myValue: 'Tue' }
];
</script>
```

## Block 分段选择器

设置 `block` 为 `true` 以适应父元素的宽度。

```vue
<template>
  <zx-segmented v-model="value" :options="options" block />
</template>
```

## 自定义内容

使用默认插槽自定义选项内容。

```vue
<template>
  <zx-segmented v-model="value" :options="options">
    <template #default="scope">
      <view class="custom-item">
        <text>{{ scope.item.label }}</text>
        <!-- 添加其他内容 -->
      </view>
    </template>
  </zx-segmented>
</template>
```

## 自定义样式

使用 CSS 变量设置自定义样式。

```vue
<template>
  <view class="custom-style">
    <zx-segmented v-model="value" :options="options" />
  </view>
</template>

<style>
.custom-style .zx-segmented {
  --segmented-item-selected-color: #333;
  --segmented-item-selected-bg-color: #ffd100;
  --segmented-item-radius: 16px;
}
</style>
```

## 属性

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | string / number / boolean | - |
| options | 选项的数据 | array | [] |
| props | 配置选项，详见下表 | object | - |
| size | 组件大小 | 'large' / 'default' / 'small' | 'default' |
| block | 撑满父元素宽度 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| validate-event | 是否触发表单验证 | boolean | true |
| direction | 展示的方向 | 'horizontal' / 'vertical' | 'horizontal' |

## 自定义配置选项

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 指定键为节点对象的某个属性值 | string | 'value' |
| label | 指定标签为节点对象的某个属性值 | string | 'label' |
| disabled | 指定禁用状态为节点对象的某个属性值 | string | 'disabled' |

## 事件

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 当所选值更改时触发 | 当前选中的值 |

## 插槽

| 名称 | 说明 | 作用域参数 |
| --- | --- | --- |
| default | 自定义选项内容 | { item } |
