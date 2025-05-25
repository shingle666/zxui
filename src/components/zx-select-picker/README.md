# zx-select 选择器组件

## 介绍
`zx-select` 是一个底部弹出式选择器组件，支持单选和多选模式，可自定义样式和图标。

## 特性
- 支持单选和多选模式
- 自定义标题和样式
- 支持选项图标
- 可自定义底部按钮
- 丰富的自定义样式配置

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| show | Boolean | false | 是否显示选择器 |
| list | Array | [] | 选择项列表，可以是字符串数组或对象数组，对象格式需包含text属性 |
| height | Number/String | 600 | 选择器内容区高度，单位rpx |
| radius | Number/String | 24 | 选择器圆角大小，单位rpx |
| title | String | '请选择' | 选择器标题 |
| titleSize | Number/String | 32 | 标题字体大小，单位rpx |
| titleColor | String | '#333' | 标题字体颜色 |
| fontWeight | Number/String | 400 | 标题字体粗细 |
| multiple | Boolean | false | 是否支持多选 |
| background | String | '#fff' | 选择器背景色 |
| padding | String | '30rpx' | 选项内边距 |
| checkboxColor | String | '#5677fc' | 选择框选中后的颜色 |
| borderColor | String | '#ccc' | 选择框边框颜色 |
| isCheckMark | Boolean | false | 是否使用对勾样式的选择框 |
| checkmarkColor | String | '#fff' | 对勾的颜色 |
| reverse | Boolean | false | 是否反转选项布局（文字在左，选择框在右） |
| dividerLine | Boolean | true | 是否显示选项分割线 |
| dividerColor | String | '#EEEEEE' | 分割线颜色 |
| bottomLeft | Number/String | 30 | 分割线左侧距离，单位rpx |
| highlight | Boolean | true | 点击选项时是否高亮 |
| iconWidth | Number/String | 48 | 图标宽度，单位rpx |
| size | Number/String | 30 | 选项文字大小，单位rpx |
| color | String | '#333' | 选项文字颜色 |
| btnText | String | '确定' | 确认按钮文字 |
| btnBackground | String | '#5677fc' | 确认按钮背景色 |
| btnColor | String | '#fff' | 确认按钮文字颜色 |
| maskBackground | String | 'rgba(0,0,0,.6)' | 遮罩层背景色 |
| maskClosable | Boolean | false | 点击遮罩层是否可关闭选择器 |
| zIndex | Number/String | 1000 | 选择器层级 |

## 事件

| 事件名 | 说明 | 返回值 |
| --- | --- | --- |
| confirm | 点击确认按钮时触发 | 单选模式：{index, options}，多选模式：{options} |
| close | 关闭选择器时触发 | {} |

## 使用示例

```vue
<template>
  <view>
    <button @click="openSelect">打开选择器</button>
    <zx-select :show="showSelect" :list="selectList" @confirm="onConfirm" @close="onClose"></zx-select>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const showSelect = ref(false);
const selectList = ref(['选项1', '选项2', '选项3']);

const openSelect = () => {
  showSelect.value = true;
};

const onConfirm = (e) => {
  console.log('选中的选项:', e);
  showSelect.value = false;
};

const onClose = () => {
  showSelect.value = false;
};
</script>
```

## 高级使用

### 对象数组选择

```vue
<template>
  <view>
    <button @click="openSelect">打开选择器</button>
    <zx-select :show="showSelect" :list="selectList" @confirm="onConfirm" @close="onClose"></zx-select>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const showSelect = ref(false);
const selectList = ref([
  { text: '选项1', checked: true, src: '/static/icon1.png' },
  { text: '选项2', checked: false, src: '/static/icon2.png' },
  { text: '选项3', checked: false, src: '/static/icon3.png' }
]);

const openSelect = () => {
  showSelect.value = true;
};

const onConfirm = (e) => {
  console.log('选中的选项:', e);
  showSelect.value = false;
};

const onClose = () => {
  showSelect.value = false;
};
</script>
```

### 多选模式

```vue
<template>
  <view>
    <button @click="openMultiSelect">打开多选选择器</button>
    <zx-select 
      :show="showMultiSelect" 
      :list="multiSelectList" 
      :multiple="true" 
      @confirm="onMultiConfirm" 
      @close="onMultiClose"
    ></zx-select>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const showMultiSelect = ref(false);
const multiSelectList = ref(['选项1', '选项2', '选项3', '选项4']);

const openMultiSelect = () => {
  showMultiSelect.value = true;
};

const onMultiConfirm = (e) => {
  console.log('选中的多个选项:', e.options);
  showMultiSelect.value = false;
};

const onMultiClose = () => {
  showMultiSelect.value = false;
};
</script>
```
