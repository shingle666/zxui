# zx-calendar 日历组件

一个功能完善的uni-app日历组件，支持公历、农历显示，日期范围选择，自定义日期信息等功能。

## 功能特点

- 支持插入模式和弹出模式
- 支持公历和农历显示
- 支持日期范围选择
- 支持自定义日期附加信息
- 支持国际化（中文简体、中文繁体、英文）
- 支持月份背景显示
- 支持今日快速跳转

## 安装使用

将 `zx-calendar` 文件夹复制到项目的 `components` 目录下即可使用。

## 基本用法

### 引入组件

```vue
<script setup>
import ZxCalendar from '@/components/zx-calendar/zx-calendar.vue';
</script>
```

### 插入模式

```vue
<template>
  <view class="content">
    <zx-calendar
      :insert="true"
      :lunar="true"
      @change="change"
    />
  </view>
</template>

<script setup>
const change = (e) => {
  console.log('选择日期：', e.fulldate);
};
</script>
```

### 弹出模式

```vue
<template>
  <view class="content">
    <button @click="openCalendar">打开日历</button>
    <zx-calendar
      ref="calendar"
      :insert="false"
      :clearDate="true"
      @confirm="confirm"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const calendar = ref(null);
const openCalendar = () => {
  calendar.value.open();
};

const confirm = (e) => {
  console.log('确认选择：', e.fulldate);
};
</script>
```

### 日期范围选择

```vue
<template>
  <view class="content">
    <zx-calendar
      :insert="true"
      :range="true"
      :start-date="'2023-01-01'"
      :end-date="'2023-12-31'"
      @change="rangeChange"
    />
  </view>
</template>

<script setup>
const rangeChange = (e) => {
  console.log('选择日期范围：', e.range);
};
</script>
```

### 自定义日期信息

```vue
<template>
  <view class="content">
    <zx-calendar
      :insert="true"
      :selected="selected"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const selected = ref([
  {
    date: '2023-10-20',
    info: '会议'
  },
  {
    date: '2023-10-21',
    info: '出差'
  }
]);
</script>
```

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| date | String | 当前日期 | 自定义当前日期，格式为 'YYYY-MM-DD' |
| selected | Array | [] | 选中的日期，可设置信息，如：[{date: '2023-10-20', info: '会议'}] |
| lunar | Boolean | false | 是否显示农历（阴历） |
| startDate | String | '' | 日期选择范围-开始日期 |
| endDate | String | '' | 日期选择范围-结束日期 |
| range | Boolean | false | 是否使用范围选择模式 |
| insert | Boolean | true | true: 插入模式，false: 弹出模式 |
| showMonth | Boolean | true | 是否显示月份背景 |
| clearDate | Boolean | true | 弹出模式下，是否清空上次选择内容 |

## 事件说明

| 事件名 | 说明 | 返回参数 |
| --- | --- | --- |
| change | 日期改变时触发，insert为true时生效 | Object: {range, year, month, date, fulldate, lunar, extraInfo} |
| confirm | 确认按钮触发，insert为false时生效 | 同上 |
| close | 关闭日历时触发，insert为false时生效 | - |
| monthSwitch | 切换月份时触发 | Object: {year, month} |

## 方法说明

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| open | 打开日历弹窗，insert为false时生效 | - |
| close | 关闭日历弹窗，insert为false时生效 | - |
| setDate | 设置日期 | date:日期字符串，格式为 'YYYY-MM-DD' |

## 国际化支持

组件默认支持简体中文、繁体中文和英文，可通过uni-app提供的国际化功能自动切换语言。

## 样式定制

可通过修改组件中的样式变量来定制日历风格：

```scss
$zx-primary: #2979ff; // 主题色
$zx-text-color: #333; // 文本颜色
$zx-border-color: #EDEDED; // 边框颜色
$zx-bg-color-hover: #f1f1f1; // 悬浮背景色
$zx-color-error: #e43d33; // 错误色/强调色
$zx-text-color-grey: #999; // 灰色文本
```

## 注意事项

1. 日期格式统一使用 'YYYY-MM-DD'
2. 选择范围时，请同时设置 startDate 和 endDate
3. 弹出模式下，需通过 ref 调用 open() 方法打开日历
