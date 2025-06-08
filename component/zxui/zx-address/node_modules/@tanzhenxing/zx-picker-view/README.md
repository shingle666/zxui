# zx-picker-view 选择器组件

## 简介

`zx-picker-view` 是一个基于 uni-app 的自定义选择器组件，它基于原生的 `picker-view` 组件进行封装，提供了更丰富的功能和更友好的使用体验。

该组件支持单列、多列选择，可自定义样式，并且提供了丰富的事件和方法，适用于日期选择、地区选择、自定义数据选择等多种场景。

## 使用方法

### 基础用法

```vue
<template>
  <view>
    <button @click="showPicker = true">打开选择器</button>
    <zx-picker-view
      :show="showPicker"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @close="onClose"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const showPicker = ref(false);
const columns = ref([
  ['选项1', '选项2', '选项3'],
  ['选项A', '选项B', '选项C']
]);

const onConfirm = (e) => {
  console.log('选中的值', e.value);
  console.log('选中的索引', e.indexs);
  showPicker.value = false;
};

const onCancel = () => {
  showPicker.value = false;
};

const onClose = () => {
  showPicker.value = false;
};
</script>
```

### 使用对象数组

```vue
<template>
  <zx-picker-view
    :show="showPicker"
    :columns="objectColumns"
    keyName="label"
    @confirm="onConfirm"
  />
</template>

<script setup>
import { ref } from 'vue';

const showPicker = ref(false);
const objectColumns = ref([
  [
    { label: '选项1', value: 1 },
    { label: '选项2', value: 2 },
    { label: '选项3', value: 3 }
  ],
  [
    { label: '选项A', value: 'A' },
    { label: '选项B', value: 'B' },
    { label: '选项C', value: 'C' }
  ]
]);
</script>
```

### 设置默认选中项

```vue
<template>
  <zx-picker-view
    :show="showPicker"
    :columns="columns"
    :defaultIndex="[1, 2]"
    @confirm="onConfirm"
  />
</template>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| show | Boolean | false | 是否显示picker弹窗 |
| showToolbar | Boolean | true | 是否显示顶部的操作栏 |
| title | String | '' | 顶部标题 |
| columns | Array | [] | 对象数组，设置每一列的数据 |
| loading | Boolean | false | 是否显示加载中状态 |
| itemHeight | String | '88rpx' | 各列中，单个选项的高度 |
| cancelText | String | '取消' | 取消按钮的文字 |
| confirmText | String | '确认' | 确认按钮的文字 |
| cancelColor | String | '#909193' | 取消按钮的颜色 |
| confirmColor | String | '#3c9cff' | 确认按钮的颜色 |
| visibleItemCount | String/Number | 5 | 每列中可见选项的数量 |
| keyName | String | 'text' | 选项对象中，需要展示的属性键名 |
| closeOnClickOverlay | Boolean | false | 是否允许点击遮罩关闭选择器 |
| defaultIndex | Array | [] | 各列的默认索引 |
| indicatorStyle | String | '' | 设置选择器中间选中框的样式 |
| indicatorClass | String | '' | 设置选择器中间选中框的类名 |
| maskStyle | String | '' | 设置蒙层的样式 |
| maskClass | String | '' | 设置蒙层的类名 |
| maskTopStyle | String | '' | 设置蒙层上半部分的样式（仅 app-nvue 3.6.7+ 支持） |
| maskBottomStyle | String | '' | 设置蒙层下半部分的样式（仅 app-nvue 3.6.7+ 支持） |
| immediateChange | Boolean | false | 是否在手指松开时立即触发 change 事件 |

## 事件说明

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| close | 关闭选择器时触发 | - |
| cancel | 点击取消按钮触发 | - |
| change | 当选择值变化时触发 | `{value, index, indexs, values, columnIndex}` |
| confirm | 点击确定按钮，返回当前选择的值 | `{indexs, value, values}` |
| pickstart | 当滚动选择开始时触发 | 原生事件对象 |
| pickend | 当滚动选择结束时触发 | 原生事件对象 |

### 事件参数说明

- `value`: 各列选中值的数组
- `indexs`: 各列选中项的索引数组
- `values`: 各列数据的二维数组
- `index`: 当前变化列中选中项的索引
- `columnIndex`: 当前变化的列的索引

## 方法说明

组件对外暴露了以下方法，可以通过 ref 获取组件实例后调用：

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| setIndexs | 设置各列的选中索引 | `(indexes, setLastIndex)` |
| setColumnValues | 设置对应列的选项数据 | `(columnIndex, values)` |
| getColumnValues | 获取对应列的选项数据 | `(columnIndex)` |
| setColumns | 设置所有列的数据 | `(columns)` |
| getIndexs | 获取各列选中值对应的索引 | - |
| getValues | 获取各列选中的值 | - |

### 方法使用示例

```vue
<template>
  <view>
    <button @click="updateColumn">更新第一列数据</button>
    <button @click="getSelected">获取选中数据</button>
    <zx-picker-view
      ref="pickerRef"
      :show="showPicker"
      :columns="columns"
      @confirm="onConfirm"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const showPicker = ref(false);
const pickerRef = ref(null);
const columns = ref([
  ['选项1', '选项2', '选项3'],
  ['选项A', '选项B', '选项C']
]);

// 更新第一列数据
const updateColumn = () => {
  pickerRef.value.setColumnValues(0, ['新选项1', '新选项2', '新选项3', '新选项4']);
};

// 获取选中数据
const getSelected = () => {
  const indexes = pickerRef.value.getIndexs();
  const values = pickerRef.value.getValues();
  console.log('当前选中索引', indexes);
  console.log('当前选中值', values);
};
</script>
```

## 高级用法

### 联动选择器

```vue
<template>
  <zx-picker-view
    ref="pickerRef"
    :show="showPicker"
    :columns="cascadeColumns"
    @change="onChange"
    @confirm="onConfirm"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';

const showPicker = ref(false);
const pickerRef = ref(null);

// 省市联动数据
const provinces = [
  { text: '北京', children: [{ text: '北京市' }] },
  { text: '广东', children: [{ text: '广州市' }, { text: '深圳市' }, { text: '珠海市' }] }
];

// 初始化省市数据
const cascadeColumns = ref([
  provinces.map(item => item.text),
  provinces[0].children.map(item => item.text)
]);

// 监听选项变化
const onChange = (e) => {
  const { columnIndex, index } = e;
  
  // 如果第一列变化，更新第二列数据
  if (columnIndex === 0) {
    const cityList = provinces[index].children.map(item => item.text);
    pickerRef.value.setColumnValues(1, cityList);
  }
};
</script>
```

### 自定义样式

```vue
<template>
  <zx-picker-view
    :show="showPicker"
    :columns="columns"
    indicatorStyle="height: 80rpx; border-top: 1px solid #eee; border-bottom: 1px solid #eee;"
    maskStyle="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.4));"
    @confirm="onConfirm"
  />
</template>
```

## 注意事项

1. 请确保 `columns` 数据结构正确，每一列的数据必须是数组
2. 当使用对象数组时，确保每个对象都包含 `keyName` 指定的属性
3. 在微信小程序中，如果传入复杂的对象数据，可能会因为循环引用导致报错
4. 在处理 `change` 事件时，如果需要修改数据，建议使用 `nextTick` 延迟执行
