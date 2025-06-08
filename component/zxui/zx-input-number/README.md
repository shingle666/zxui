# ZxInputNumber 数字输入框

仅允许输入标准的数字值，可定义范围。参考 [Element Plus InputNumber](https://element-plus.org/zh-CN/component/input-number.html) 组件实现。

## 功能特性

- ✅ 基础用法 - v-model 双向绑定
- ✅ 数值范围控制 - min/max 属性
- ✅ 禁用状态 - disabled 属性
- ✅ 只读状态 - readonly 属性
- ✅ 步进控制 - step 属性
- ✅ 严格步进 - step-strictly 属性
- ✅ 精度控制 - precision 属性
- ✅ 多种尺寸 - size 属性 (large/default/small)
- ✅ 按钮位置 - controls-position 属性
- ✅ 自定义图标 - decrease-icon/increase-icon 插槽
- ✅ 前缀后缀 - prefix/suffix 插槽
- ✅ 键盘控制 - 上下箭头键支持
- ✅ 事件支持 - change/focus/blur 事件
- ✅ 方法暴露 - focus()/blur() 方法

## 基础用法

```vue
<template>
  <zx-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
</template>

<script setup>
import { ref } from 'vue'
import ZxInputNumber from './components/zx-input-number/zx-input-number.vue'

const num = ref(1)
const handleChange = (value) => {
  console.log(value)
}
</script>
```

## API

### 属性 (Props)

| 属性名 | 说明 | 类型 | 默认值 |
|-------|------|------|--------|
| modelValue / v-model | 选中项绑定值 | Number | - |
| min | 设置计数器允许的最小值 | Number | -Infinity |
| max | 设置计数器允许的最大值 | Number | Infinity |
| step | 计数器步长 | Number | 1 |
| stepStrictly | 是否只能输入 step 的倍数 | Boolean | false |
| precision | 数值精度 | Number | - |
| size | 计数器尺寸 | String | 'default' |
| readonly | 原生 readonly 属性，是否只读 | Boolean | false |
| disabled | 是否禁用状态 | Boolean | false |
| controls | 是否使用控制按钮 | Boolean | true |
| controlsPosition | 控制按钮位置 | String | '' |
| name | 等价于原生 input name 属性 | String | - |
| ariaLabel | 等价于原生 input aria-label 属性 | String | - |
| placeholder | 等价于原生 input placeholder 属性 | String | - |
| id | 等价于原生 input id 属性 | String | - |
| valueOnClear | 当输入框被清空时显示的值 | Number/String | null |
| validateEvent | 是否触发表单验证 | Boolean | true |

### 插槽 (Slots)

| 名称 | 说明 |
|------|------|
| decrease-icon | 自定义输入框按钮减少图标 |
| increase-icon | 自定义输入框按钮增加图标 |
| prefix | 输入框头部内容 |
| suffix | 输入框尾部内容 |

### 事件 (Events)

| 名称 | 说明 | 类型 |
|------|------|------|
| change | 绑定值被改变时触发 | Function |
| blur | 在组件 Input 失去焦点时触发 | Function |
| focus | 在组件 Input 获得焦点时触发 | Function |

### 暴露方法 (Exposes)

| 名称 | 详情 | 类型 |
|------|------|------|
| focus | 使 input 组件获得焦点 | Function |
| blur | 使 input 组件失去焦点 | Function |

## 使用示例

### 禁用状态

```vue
<zx-input-number v-model="num" :disabled="true" />
```

### 步进控制

```vue
<zx-input-number v-model="num" :step="2" />
```

### 严格步进

```vue
<zx-input-number v-model="num" :step="2" step-strictly />
```

### 精度控制

```vue
<zx-input-number v-model="num" :precision="2" :step="0.1" :max="10" />
```

### 不同尺寸

```vue
<zx-input-number v-model="num1" size="large" />
<zx-input-number v-model="num2" />
<zx-input-number v-model="num3" size="small" />
```

### 按钮位置

```vue
<zx-input-number 
  v-model="num" 
  :min="1" 
  :max="10" 
  controls-position="right" 
  @change="handleChange" 
/>
```

### 自定义图标

```vue
<zx-input-number v-model="num">
  <template #decrease-icon>
    <span>⬇</span>
  </template>
  <template #increase-icon>
    <span>⬆</span>
  </template>
</zx-input-number>
```

### 前缀和后缀

```vue
<zx-input-number v-model="num" :min="1" :max="10">
  <template #prefix>
    <span>￥</span>
  </template>
</zx-input-number>

<zx-input-number v-model="num" :min="1" :max="10">
  <template #suffix>
    <span>RMB</span>
  </template>
</zx-input-number>
```

## 注意事项

1. `precision` 的值必须是一个非负整数，并且不能小于 `step` 的小数位数
2. 当输入无效的字符串到输入框时，由于错误，输入值将把 `NaN` 导入到上层
3. 支持键盘上下箭头键进行数值增减操作
4. 组件会自动处理数值边界，确保值在 min 和 max 范围内

## 样式定制

组件使用 CSS 变量和 BEM 命名规范，可以通过覆盖相应的 CSS 类来自定义样式：

```css
/* 自定义主要颜色 */
.zx-input-number__inner:focus {
  border-color: #your-primary-color;
}

/* 自定义按钮样式 */
.zx-input-number__decrease:hover,
.zx-input-number__increase:hover {
  color: #your-primary-color;
}
```
