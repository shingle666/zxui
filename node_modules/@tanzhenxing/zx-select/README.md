# zx-select 选择器组件

一个基于uni-app的选择器组件，支持单选、多选、搜索、分组等功能，兼容H5、小程序和APP。

## 特性

- 单选和多选模式
- 支持可清空选择
- 支持禁用状态和禁用选项
- 支持选项搜索过滤
- 支持选项分组
- 自定义模板（前缀、选项、标签等）
- 支持H5、各类小程序以及APP

## 使用方法

### 基础用法

```vue
<template>
  <view>
    <zx-select 
      v-model="value" 
      :options="options" 
      placeholder="请选择"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
const options = ref([
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
  { label: '选项四', value: '4' },
  { label: '选项五', value: '5' }
]);
</script>
```

### 禁用状态

```vue
<zx-select 
  v-model="value" 
  :options="options" 
  disabled
/>
```

### 可清空单选

```vue
<zx-select 
  v-model="value" 
  :options="options" 
  clearable
/>
```

### 基础多选

```vue
<zx-select 
  v-model="value" 
  :options="options" 
  multiple
/>
```

### 可搜索

```vue
<zx-select 
  v-model="value" 
  :options="options" 
  filterable
  search-placeholder="请输入关键词搜索"
/>
```

### 分组选项

```vue
<template>
  <zx-select v-model="value" :options="groupOptions" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
const groupOptions = ref([
  {
    label: '热门城市',
    value: 'hot',
    group: '城市分类'
  },
  {
    label: '北京',
    value: 'Beijing',
    group: '直辖市'
  },
  {
    label: '上海',
    value: 'Shanghai',
    group: '直辖市'
  },
  {
    label: '广州',
    value: 'Guangzhou',
    group: '广东省'
  },
  {
    label: '深圳',
    value: 'Shenzhen',
    group: '广东省'
  }
]);
</script>
```

### 自定义模板

```vue
<zx-select v-model="value" :options="options">
  <template #prefix>
    <text class="custom-prefix">城市:</text>
  </template>
  
  <template #option="{ item }">
    <view class="custom-option">
      <text>{{ item.label }}</text>
      <text class="custom-desc">{{ item.description }}</text>
    </view>
  </template>
</zx-select>
```

## API

### Props

| 参数               | 说明                            | 类型                          | 默认值     |
| ------------------ | ------------------------------- | ----------------------------- | ---------- |
| modelValue / v-model | 绑定值                       | string / number / array / object | ''         |
| options            | 可选项数据源                    | array                         | []         |
| placeholder        | 占位文本                        | string                        | '请选择'   |
| searchPlaceholder  | 搜索框占位文本                  | string                        | '搜索选项' |
| disabled           | 是否禁用                        | boolean                       | false      |
| clearable          | 是否可以清空选项                | boolean                       | false      |
| multiple           | 是否多选                        | boolean                       | false      |
| filterable         | 是否可搜索                      | boolean                       | false      |
| showConfirmButton  | 多选时是否显示确认按钮          | boolean                       | true       |
| confirmButtonText  | 确认按钮文字                    | string                        | '确定'     |
| cancelButtonText   | 取消按钮文字                    | string                        | '取消'     |
| valueKey           | 选项对象中值对应的键名          | string                        | 'value'    |
| labelKey           | 选项对象中标签对应的键名        | string                        | 'label'    |
| groupKey           | 选项对象中分组对应的键名        | string                        | 'group'    |
| emptyText          | 无数据时显示的文本              | string                        | '无数据'   |
| maxHeight          | 下拉菜单最大高度                | number / string               | 600        |
| activeColor        | 选中项的高亮颜色                | string                        | '#409eff'  |

### Events

| 事件名          | 说明                           | 回调参数                    |
| --------------- | ------------------------------ | --------------------------- |
| update:modelValue | 绑定值变化时触发            | 当前值                     |
| change          | 选中值变化时触发               | 当前值                     |
| visible-change  | 下拉框出现/隐藏时触发          | 出现则为 true，隐藏则为 false |
| remove-tag      | 多选模式下移除tag时触发        | 移除的tag值                |
| clear           | 可清空的单选模式下用户点击清空按钮时触发 | - |
| focus           | 当选择器获得焦点时触发         | -                          |
| blur            | 当选择器失去焦点时触发         | -                          |
| search          | 搜索输入时触发                 | 当前输入值                 |
| confirm         | 多选模式下点击确认按钮时触发   | 当前选中值                 |
| cancel          | 多选模式下点击取消按钮时触发   | -                          |

### Slots

| 插槽名    | 说明                               |
| --------- | ---------------------------------- |
| default   | 自定义下拉框内容                   |
| prefix    | 自定义输入框前缀内容               |
| option    | 自定义选项内容，参数为 { item }    |
| tag       | 自定义标签内容，参数为 { item }    |
| empty     | 自定义无数据时的内容               |
| header    | 自定义下拉框顶部内容               |
| footer    | 自定义下拉框底部内容               |
