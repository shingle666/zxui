# zx-radio-group 单选框组组件

## 介绍

`zx-radio-group` 组件是一个单选框组容器，用于包裹多个 `zx-radio` 组件，实现单选效果。适用于在多个互斥的选项中选择的场景。

## 引入

```vue
<zx-radio-group v-model="value">
  <zx-radio value="1">选项1</zx-radio>
  <zx-radio value="2">选项2</zx-radio>
</zx-radio-group>
```

## 基础用法

### 基本单选框组

```vue
<template>
  <zx-radio-group v-model="radioValue">
    <zx-radio value="1">选项1</zx-radio>
    <zx-radio value="2">选项2</zx-radio>
    <zx-radio value="3">选项3</zx-radio>
  </zx-radio-group>
</template>

<script setup>
import { ref } from 'vue';

const radioValue = ref('1');
</script>
```

### 禁用状态

```vue
<zx-radio-group v-model="radioValue" disabled>
  <zx-radio value="1">选项1</zx-radio>
  <zx-radio value="2">选项2</zx-radio>
</zx-radio-group>
```

### 横向和纵向布局

```vue
<!-- 横向布局 (默认) -->
<zx-radio-group v-model="radioValue" placement="row">
  <zx-radio value="1">选项1</zx-radio>
  <zx-radio value="2">选项2</zx-radio>
</zx-radio-group>

<!-- 纵向布局 -->
<zx-radio-group v-model="radioValue" placement="column">
  <zx-radio value="1">选项1</zx-radio>
  <zx-radio value="2">选项2</zx-radio>
</zx-radio-group>
```

### 自定义样式

```vue
<zx-radio-group 
  v-model="radioValue"
  active-color="#ff5500"
  size="20"
  label-size="16"
>
  <zx-radio value="1">选项1</zx-radio>
  <zx-radio value="2">选项2</zx-radio>
</zx-radio-group>
```

### 按钮样式单选框组

搭配 `zx-radio-button` 组件（如果已实现）使用，可以实现按钮样式的单选框组：

```vue
<zx-radio-group v-model="radioValue" text-color="#ffffff" fill="#409EFF">
  <zx-radio-button value="1">选项1</zx-radio-button>
  <zx-radio-button value="2">选项2</zx-radio-button>
  <zx-radio-button value="3">选项3</zx-radio-button>
</zx-radio-group>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定的值 | String / Number / Boolean | '' |
| disabled | 是否禁用所有 radio | Boolean | false |
| shape | 外观形状，可选值：`circle`-圆形、`square`-方形 | String | 'circle' |
| activeColor | 选中状态的颜色 | String | '#2979ff' |
| inactiveColor | 未选中的颜色 | String | '#c8c9cc' |
| name | 标识符 | String | '' |
| size | 组件整体的大小，单位 px | String / Number | 18 |
| placement | 布局方式，可选值：`row`-横向、`column`-纵向 | String | 'row' |
| label | 文本 | String | '' |
| labelColor | label 的颜色 | String | '#303133' |
| labelSize | label 的字体大小，单位 px | String / Number | 14 |
| labelDisabled | 是否禁止点击文本操作 radio | Boolean | false |
| iconColor | 图标颜色 | String | '#ffffff' |
| iconSize | 图标的大小，单位 px | String / Number | 12 |
| borderBottom | placement 为 row 时，是否显示下边框 | Boolean | false |
| iconPlacement | 图标与文字的对齐方式，可选值：`left`、`right` | String | 'left' |
| customStyle | 组件的样式，对象形式 | Object | {} |
| validateEvent | 输入时是否触发表单验证 | Boolean | true |
| ariaLabel | 无障碍访问标签 | String | '' |
| textColor | 按钮形式的 Radio 激活时的文本颜色 | String | '#ffffff' |
| fill | 按钮形式的 Radio 激活时的填充色和边框色 | String | '#2979ff' |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选中值发生变化时触发 | value：当前选中的值 |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义默认内容，一般为 zx-radio 组件 |

## 注意事项

1. `zx-radio-group` 必须与 `zx-radio` 组件配合使用
2. v-model 双向绑定的值会自动与 zx-radio 的 value 值进行匹配
3. 可以通过 `disabled` 属性禁用整个单选框组
4. 布局方式可以通过 `placement` 属性设置为横向（row）或纵向（column）

## 使用示例

### 完整示例

```vue
<template>
  <view class="container">
    <view class="title">基础用法</view>
    <zx-radio-group v-model="radio1">
      <zx-radio value="1">选项1</zx-radio>
      <zx-radio value="2">选项2</zx-radio>
      <zx-radio value="3">选项3</zx-radio>
    </zx-radio-group>
    
    <view class="title">禁用状态</view>
    <zx-radio-group v-model="radio2" disabled>
      <zx-radio value="1">选项1</zx-radio>
      <zx-radio value="2">选项2</zx-radio>
    </zx-radio-group>
    
    <view class="title">自定义颜色</view>
    <zx-radio-group v-model="radio3" active-color="#ff5500">
      <zx-radio value="1">选项1</zx-radio>
      <zx-radio value="2">选项2</zx-radio>
    </zx-radio-group>
    
    <view class="title">纵向排列</view>
    <zx-radio-group v-model="radio4" placement="column">
      <zx-radio value="1">选项1</zx-radio>
      <zx-radio value="2">选项2</zx-radio>
      <zx-radio value="3">选项3</zx-radio>
    </zx-radio-group>
    
    <view class="title">自定义大小</view>
    <zx-radio-group v-model="radio5" size="24" icon-size="16" label-size="16">
      <zx-radio value="1">选项1</zx-radio>
      <zx-radio value="2">选项2</zx-radio>
    </zx-radio-group>
    
    <view class="title">监听选择变化</view>
    <zx-radio-group v-model="radio6" @change="radioChange">
      <zx-radio value="1">选项1</zx-radio>
      <zx-radio value="2">选项2</zx-radio>
    </zx-radio-group>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const radio1 = ref('1');
const radio2 = ref('1');
const radio3 = ref('1');
const radio4 = ref('1');
const radio5 = ref('1');
const radio6 = ref('1');

const radioChange = (value) => {
  console.log('选中的值：', value);
  uni.showToast({
    title: `选中了：${value}`,
    icon: 'none'
  });
};
</script>

<style>
.container {
  padding: 20rpx;
}
.title {
  margin: 30rpx 0 15rpx;
  font-size: 28rpx;
  color: #303133;
  font-weight: bold;
}
</style>
