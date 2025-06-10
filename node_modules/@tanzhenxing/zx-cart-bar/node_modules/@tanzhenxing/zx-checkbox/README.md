# zx-checkbox 多选框组件

在一组备选项中进行多选。

## 使用示例

### 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

```html
<template>
  <view>
    <zx-checkbox v-model="checked1" label="选项 1" />
    <zx-checkbox v-model="checked2" label="选项 2" />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const checked1 = ref(true);
const checked2 = ref(false);
</script>
```

### 禁用状态

多选框不可用状态。

```html
<zx-checkbox v-model="checked1" disabled label="禁用" />
<zx-checkbox v-model="checked2" label="未禁用" />
```

### 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

```html
<template>
  <zx-checkbox-group v-model="checkList">
    <zx-checkbox label="选项 A" value="A" />
    <zx-checkbox label="选项 B" value="B" />
    <zx-checkbox label="选项 C" value="C" />
    <zx-checkbox label="禁用" value="D" disabled />
    <zx-checkbox label="选中且禁用" value="E" disabled />
  </zx-checkbox-group>
</template>

<script setup>
import { ref } from 'vue';

const checkList = ref(['E', 'A']);
</script>
```

### 中间状态

`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果。

```html
<template>
  <zx-checkbox 
    v-model="checkAll" 
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
    label="全选" 
  />
  <zx-checkbox-group 
    v-model="checkedCities" 
    @change="handleCheckedCitiesChange"
  >
    <zx-checkbox v-for="city in cities" :key="city" :label="city" :value="city">
      {{ city }}
    </zx-checkbox>
  </zx-checkbox-group>
</template>

<script setup>
import { ref } from 'vue';

const checkAll = ref(false);
const isIndeterminate = ref(true);
const checkedCities = ref(['上海', '北京']);
const cities = ['上海', '北京', '广州', '深圳'];

const handleCheckAllChange = (val) => {
  checkedCities.value = val ? cities : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
};
</script>
```

### 带有边框

设置 `border` 属性可以渲染为带有边框的多选框。

```html
<zx-checkbox v-model="checked1" label="选项1" border />
<zx-checkbox v-model="checked2" label="选项2" border />
```

## 属性

| 参数           | 说明                                                 | 类型                       | 默认值     |
| -------------- | ---------------------------------------------------- | -------------------------- | ---------- |
| v-model        | 绑定值                                               | boolean / array            | false      |
| name           | checkbox 的名称                                      | string / number / boolean  | -          |
| value          | checkbox 的值                                        | string / number / boolean  | -          |
| label          | 显示的标签文本                                       | string / number            | -          |
| shape          | 形状，可选值为 square 或 circle                      | string                     | square     |
| size           | 整体的大小                                           | string / number            | 36rpx      |
| disabled       | 是否禁用                                             | boolean                    | false      |
| indeterminate  | 设置不确定状态，仅负责样式控制                       | boolean                    | false      |
| active-color   | 选中状态下的颜色                                     | string                     | #2979ff    |
| inactive-color | 未选中的颜色                                         | string                     | #c8c9cc    |
| icon-size      | 图标的大小                                           | string / number            | 24rpx      |
| icon-color     | 图标颜色                                             | string                     | #ffffff    |
| label-size     | label的字体大小                                      | string / number            | 28rpx      |
| label-color    | label的颜色                                          | string                     | #303133    |
| label-disabled | 是否禁止点击提示语选中复选框                         | boolean                    | false      |
| border         | 是否显示边框                                         | boolean                    | false      |
| true-value     | 选中时的值                                           | string / number / boolean  | true       |
| false-value    | 未选中时的值                                         | string / number / boolean  | false      |
| custom-style   | 定义需要用到的外部样式                               | object                     | {}         |

## 事件

| 事件名  | 说明                     | 回调参数 |
| ------- | ------------------------ | -------- |
| change  | 当绑定值变化时触发的事件 | 更新后的值 |

## 插槽

| 名称    | 说明                |
| ------- | ------------------- |
| default | 自定义默认内容      |
| icon    | 自定义图标          |
