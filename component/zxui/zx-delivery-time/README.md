# zx-delivery-time 配送时间选择组件

一个用于选择配送时间的 Vue 3 组件，支持 H5、小程序和 App 平台。

## 特性

- 📱 支持 H5、小程序、App 多端
- 🎨 美观的 UI 设计
- ⚡ Vue 3 Composition API
- 🔧 高度可定制
- 📅 智能日期生成
- ⏰ 时间段禁用功能
- 🎯 实时时间验证

## 安装

将组件文件复制到项目的 `components` 目录下即可使用。

## 基础用法

```vue
<template>
  <view>
    <zx-delivery-time 
      v-model:visible="showPicker"
      @select="handleSelect"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'

const showPicker = ref(false)

const handleSelect = (data) => {
  console.log('选择的配送时间:', data)
}
</script>
```

## 自定义触发器

```vue
<template>
  <zx-delivery-time v-model:visible="showPicker">
    <template #trigger>
      <view class="custom-trigger" @click="showPicker = true">
        <text>自定义触发按钮</text>
      </view>
    </template>
  </zx-delivery-time>
</template>
```

## 自定义时间段

```vue
<template>
  <zx-delivery-time 
    v-model:visible="showPicker"
    :time-slots="customTimeSlots"
    @select="handleSelect"
  />
</template>

<script setup>
const customTimeSlots = [
  { start: '08:00', end: '10:00', text: '早上 08:00-10:00' },
  { start: '10:00', end: '12:00', text: '上午 10:00-12:00' },
  { start: '14:00', end: '16:00', text: '下午 14:00-16:00' },
  { start: '16:00', end: '18:00', text: '下午 16:00-18:00' },
  { start: '19:00', end: '21:00', text: '晚上 19:00-21:00' }
]
</script>
```

## 禁用特定时间段

```vue
<template>
  <zx-delivery-time 
    v-model:visible="showPicker"
    :disabled-times="disabledTimes"
    @select="handleSelect"
  />
</template>

<script setup>
// 禁用今天的第一个时间段和明天的第二个时间段
const disabledTimes = [
  '2024-01-15_0', // 格式：日期_时间段索引
  '2024-01-16_1'
]
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| visible | 是否显示选择器 | Boolean | false |
| title | 弹窗标题 | String | '选择配送时间' |
| currentKey | 当前选中的日期索引 | String/Number | 0 |
| currentTime | 当前选中的时间数据 | Array | [] |
| dateCount | 可选择的日期数量 | Number | 7 |
| timeSlots | 时间段配置 | Array | 默认三个时间段 |
| disabledTimes | 禁用的时间段 | Array | [] |
| placeholder | 默认显示文本 | String | '请选择配送时间' |

### timeSlots 数据格式

```javascript
[
  {
    start: '09:00',    // 开始时间
    end: '12:00',      // 结束时间
    text: '上午 09:00-12:00'  // 显示文本
  }
]
```

### disabledTimes 数据格式

```javascript
[
  '2024-01-15_0',  // 日期_时间段索引
  '2024-01-16_1'
]
```

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:visible | 显示状态改变 | (visible: boolean) |
| select | 选择完成 | (data: SelectData) |
| change | 选择改变 | (data: ChangeData) |
| cancel | 取消选择 | - |
| confirm | 确认选择 | (data: SelectData) |

### SelectData 数据格式

```javascript
{
  date: {
    date: '今天',           // 显示文本
    week: '周一',           // 星期
    value: '2024-01-15',    // 日期值
    dateObj: Date           // 日期对象
  },
  time: {
    start: '09:00',         // 开始时间
    end: '12:00',           // 结束时间
    text: '上午 09:00-12:00', // 显示文本
    disabled: false,        // 是否禁用
    index: 0                // 索引
  },
  dateIndex: 0,             // 日期索引
  timeIndex: 0              // 时间索引
}
```

### ChangeData 数据格式

```javascript
{
  dateIndex: 0,    // 日期索引
  date: DateItem,  // 日期数据
  timeIndex: 0,    // 时间索引（可能为 -1）
  time: TimeItem   // 时间数据（可能为 null）
}
```

### Slots

| 名称 | 说明 |
|------|------|
| trigger | 自定义触发器 |

## 样式定制

组件使用 SCSS 编写样式，支持通过 CSS 变量进行主题定制：

```scss
.zx-delivery-time {
  // 主色调
  --primary-color: #007aff;
  
  // 背景色
  --bg-color: #fff;
  --panel-bg-color: #f8f8f8;
  
  // 文字颜色
  --text-color: #333;
  --text-color-secondary: #999;
  
  // 边框颜色
  --border-color: #e5e5e5;
}
```

## 注意事项

1. 组件会自动过滤已过期的时间段（仅限今天）
2. 时间段的禁用状态会实时计算
3. 支持通过 `disabledTimes` 属性禁用特定时间段
4. 日期格式为 `YYYY-MM-DD_索引` 的形式
5. 组件使用 `uni-app` 的 `scroll-view` 组件，确保在所有平台正常滚动

## 兼容性

- ✅ H5
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 百度小程序
- ✅ 字节跳动小程序
- ✅ QQ 小程序
- ✅ App (Vue)
- ✅ App (Nvue)

## 更新日志

### v1.0.1
- 初始版本发布
- 支持基础的配送时间选择功能
- 支持自定义时间段和禁用功能