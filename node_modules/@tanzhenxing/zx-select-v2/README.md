# zx-select-v2 虚拟化选择器组件

一个适用于UniApp的虚拟化选择器组件，支持H5、小程序和App，可以处理大量数据的选择操作。

## 特性

- 支持大数据量渲染（虚拟列表）
- 支持单选和多选
- 支持数据过滤
- 支持选项分组
- 支持远程搜索
- 支持禁用选项
- 支持创建新选项
- 可自定义标签展示
- 兼容多端（H5、小程序、App）

## 安装

```bash
# 复制组件到项目中的components目录
```

## 使用方法

### 基础用法

```vue
<template>
  <zx-select-v2
    v-model="value"
    :options="options"
    placeholder="请选择"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
const options = ref([
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' }
]);
</script>
```

### 多选模式

```vue
<template>
  <zx-select-v2
    v-model="value"
    :options="options"
    multiple
    placeholder="请选择多个选项"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref([]);
const options = ref([
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' }
]);
</script>
```

### 可过滤选择器

```vue
<template>
  <zx-select-v2
    v-model="value"
    :options="options"
    filterable
    placeholder="请输入关键词过滤"
  />
</template>
```

### 远程搜索

```vue
<template>
  <zx-select-v2
    v-model="value"
    :options="options"
    filterable
    remote
    :loading="loading"
    :remote-method="remoteSearch"
    placeholder="请输入关键词搜索"
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
const options = ref([]);
const loading = ref(false);

const remoteSearch = (query) => {
  if (query) {
    loading.value = true;
    
    // 模拟异步请求
    setTimeout(() => {
      options.value = [/* 搜索结果 */];
      loading.value = false;
    }, 1000);
  } else {
    options.value = [];
  }
};
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | String / Number / Boolean / Array | - |
| options | 选项数据源 | Array | [] |
| valueKey | 选项对象中值的属性名 | String | 'value' |
| labelKey | 选项对象中标签的属性名 | String | 'label' |
| disabledKey | 选项对象中禁用标志的属性名 | String | 'disabled' |
| multiple | 是否多选 | Boolean | false |
| disabled | 是否禁用 | Boolean | false |
| size | 输入框尺寸 | String | 'default' |
| clearable | 是否可清空 | Boolean | false |
| placeholder | 占位文本 | String | '请选择' |
| filterable | 是否可搜索 | Boolean | false |
| filterMethod | 自定义过滤方法 | Function | - |
| filterPlaceholder | 搜索框占位文字 | String | '请输入关键词' |
| remote | 是否为远程搜索 | Boolean | false |
| remoteMethod | 远程搜索方法 | Function | - |
| loading | 是否正在从远程获取数据 | Boolean | false |
| collapseTags | 多选时是否折叠Tag | Boolean | false |
| tagColor | 标签背景色 | String | '#f0f2f5' |
| listHeight | 下拉菜单的高度 | Number | 300 |
| allowCreate | 是否允许创建新选项 | Boolean | false |
| groupKey | 分组数据的属性名 | String | '' |
| groupLabelKey | 分组标签的属性名 | String | 'label' |
| groupOptionsKey | 分组选项的属性名 | String | 'options' |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |
| remove-tag | 多选模式下移除tag时触发 | 移除的tag值 |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | - |
| blur | 当选择器的输入框失去焦点时触发 | - |
| focus | 当选择器的输入框获得焦点时触发 | - |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义选项内容 |
| empty | 无选项时的内容 |
| header | 下拉菜单头部内容 |
| footer | 下拉菜单底部内容 |
| loading | 加载中的内容 |

### 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| focus | 使选择器的输入框获取焦点 | - |
| blur | 使选择器的输入框失去焦点 | - |

## 注意事项

1. 组件使用了Vue 3的Composition API，请确保项目使用Vue 3。
2. 在小程序环境中，某些特性可能会受到平台限制。
3. 处理大数据量时，建议使用虚拟滚动（远程搜索）功能来优化性能。
