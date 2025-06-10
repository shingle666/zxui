# zx-date-picker 日期选择器

基于 Element Plus 设计的日期选择器组件，适用于 uni-app 项目，支持多种日期选择模式。

## 功能特性

- ✅ 支持单个日期、日期时间、月份、年份选择
- ✅ 支持日期范围、日期时间范围选择
- ✅ 支持快捷选项配置
- ✅ 支持自定义格式化
- ✅ 支持禁用特定日期
- ✅ 支持默认值设置
- ✅ 响应式设计，适配移动端
- ✅ 完整的事件系统
- ✅ TypeScript 类型支持

## 基础用法

```vue
<template>
  <zx-date-picker 
    v-model="date" 
    placeholder="请选择日期"
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue';

const date = ref('');

const handleChange = (value) => {
  console.log('选择的日期：', value);
};
</script>
```

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue / v-model | String / Array / Date | '' | 绑定值 |
| type | String | 'date' | 显示类型，可选值：year/month/date/datetime/daterange/datetimerange |
| placeholder | String | '' | 输入框占位文本 |
| startPlaceholder | String | '开始日期' | 范围选择时开始日期的占位内容 |
| endPlaceholder | String | '结束日期' | 范围选择时结束日期的占位内容 |
| format | String | '' | 显示在输入框中的格式 |
| valueFormat | String | '' | 可选，绑定值的格式 |
| readonly | Boolean | false | 完全只读 |
| disabled | Boolean | false | 禁用 |
| size | String | 'default' | 输入框尺寸，可选值：large/default/small |
| clearable | Boolean | true | 是否显示清除按钮 |
| className | String | '' | 输入框的类名 |
| name | String | '' | 原生属性 |
| prefixIcon | String | '' | 自定义前缀图标 |
| suffixIcon | String | 'zx-icon-calendar' | 自定义后缀图标 |
| clearIcon | String | 'zx-icon-close-circle' | 自定义清空图标 |
| validateEvent | Boolean | true | 是否触发表单验证 |
| disabledDate | Function | null | 设置禁用状态，参数为当前日期，要求返回 Boolean |
| shortcuts | Array | [] | 设置快捷选项 |
| cellClassName | Function | null | 设置日期单元格的类名 |
| rangeSeparator | String | ' 至 ' | 选择范围时的分隔符 |
| defaultValue | String / Date / Array | null | 可选，选择器打开时默认显示的时间 |
| defaultTime | String / Array | null | 选中日期后的默认具体时刻 |
| cancelText | String | '取消' | 取消按钮文字 |
| confirmText | String | '确认' | 确认按钮文字 |
| title | String | '选择日期' | 弹窗标题 |
| popupHeight | Number | 500 | 弹窗高度 |
| showSeconds | Boolean | false | 是否显示秒 |
| unlinkPanels | Boolean | false | 在范围选择器里取消两个日期面板之间的联动 |

## 组件事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 用户确认选定的值时触发 | 组件绑定值 |
| blur | 当 input 失去焦点时触发 | - |
| focus | 当 input 获得焦点时触发 | - |
| clear | 可清空的模式下用户点击清空按钮时触发 | - |
| calendar-change | 在日历所选日期更改时触发 | [Date, Date] |
| panel-change | 当日期面板改变时触发 | { panel, type, direction } |
| visible-change | 当 DatePicker 的下拉列表出现/消失时触发 | 出现则为 true，隐藏则为 false |

## 组件方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| focus | 使 input 获取焦点 | - |
| blur | 使 input 失去焦点 | - |
| handleOpen | 打开日期选择器弹窗 | - |
| handleClose | 关闭日期选择器弹窗 | - |

## 格式化

使用 `format` 指定输入框的格式；使用 `value-format` 指定绑定值的格式。

默认情况下，组件接受并返回 `Date` 对象。

| 格式 | 含义 | 备注 | 举例 |
| --- | --- | --- | --- |
| YYYY | 年 | | 2025 |
| MM | 月 | | 01-12 |
| DD | 日 | | 01-31 |
| HH | 小时 | 24小时制 | 00-23 |
| mm | 分钟 | | 00-59 |
| ss | 秒 | | 00-59 |

## 使用示例

### 选择日期时间

```vue
<zx-date-picker 
  v-model="datetime"
  type="datetime"
  placeholder="选择日期时间"
  format="YYYY-MM-DD HH:mm:ss"
/>
```

### 选择日期范围

```vue
<zx-date-picker 
  v-model="daterange"
  type="daterange"
  range-separator=" 至 "
  start-placeholder="开始日期"
  end-placeholder="结束日期"
/>
```

### 带快捷选项

```vue
<zx-date-picker 
  v-model="value"
  type="daterange"
  :shortcuts="shortcuts"
/>

<script setup>
const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    }
  }
];
</script>
```

### 设置禁用日期

```vue
<zx-date-picker 
  v-model="value"
  :disabled-date="disabledDate"
/>

<script setup>
const disabledDate = (time) => {
  return time.getTime() > Date.now();
};
</script>
```

## 注意事项

1. 在 uni-app 中使用时，请确保项目支持 Vue 3 和 Composition API
2. 组件使用了 `picker-view` 原生组件，在某些平台上可能有样式限制
3. 图标字体需要在项目中引入对应的字体文件
4. 日期格式化功能较为基础，如需复杂格式化建议使用第三方库

## 更新日志

### v1.0.0
- 初始版本
- 支持基础日期选择功能
- 支持日期范围选择
- 支持快捷选项配置
- 支持自定义格式化
- 支持禁用日期功能
