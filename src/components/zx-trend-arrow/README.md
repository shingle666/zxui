# TrendArrow 趋势箭头

带有箭头指示的百分比数字，用以展示指标趋势。

## 引入

```js
import zxTrendArrow from '@/components/zx-trend-arrow/zx-trend-arrow.vue'
```

## 基础用法

通过 `rate` 属性设置数值，大于0时箭头向上，小于0时箭头向下。

```vue
<template>
  <zx-trend-arrow :rate="10.2365" />
  <zx-trend-arrow :rate="-0.2535" />
</template>
```

## 改变文字颜色

设置 `sync-text-color` 为 `false` 可以让文字颜色不跟随箭头颜色变化。

```vue
<template>
  <zx-trend-arrow :sync-text-color="false" :rate="1" />
  <zx-trend-arrow :sync-text-color="false" :rate="-0.2535" />
</template>
```

## 指定小数位

通过 `digits` 属性指定小数位数。

```vue
<template>
  <zx-trend-arrow :digits="0" :rate="10.2365" />
  <zx-trend-arrow :digits="0" :rate="-0.2535" />
</template>
```

## 箭头在前面

设置 `arrow-left` 属性可以让箭头显示在数字前面。

```vue
<template>
  <zx-trend-arrow arrow-left :rate="0.2535" />
  <zx-trend-arrow arrow-left :rate="-0.2535" />
</template>
```

## 显示正负号

设置 `show-sign` 属性可以显示正负号。

```vue
<template>
  <zx-trend-arrow show-sign :rate="1" />
  <zx-trend-arrow show-sign :rate="-0.2535" />
</template>
```

## 是否展示0

通过 `show-zero` 属性控制是否显示0值。

```vue
<template>
  <zx-trend-arrow show-sign :rate="0" />
  <zx-trend-arrow show-sign show-zero :rate="0" />
</template>
```

## 自定义颜色

可以通过 `rise-color`、`drop-color`、`text-color` 属性自定义颜色。

```vue
<template>
  <zx-trend-arrow :rate="10.2365" rise-color="rgb(73,143,242)" />
  <zx-trend-arrow :rate="-0.2535" show-sign drop-color="rgb(255, 190, 13)" />
  <zx-trend-arrow
    :sync-text-color="false"
    show-sign
    :rate="-0.2535"
    text-color="rgb(39,197,48)"
    drop-color="rgb(255, 190, 13)"
  />
</template>
```

## 自定义图标

通过插槽可以自定义箭头图标。

```vue
<template>
  <zx-trend-arrow :rate="10.2365">
    <template #upIcon>
      <zx-icon name="success" custom-color="blue" size="18px" />
    </template>
  </zx-trend-arrow>
  <zx-trend-arrow :rate="-10.2365">
    <template #downIcon>
      <zx-icon name="failure" custom-color="red" />
    </template>
  </zx-trend-arrow>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rate | 数值，大于0时箭头向上，小于0时箭头向下 | number | 0 |
| digits | 小数位精度 | number | 2 |
| show-sign | 是否显示加减号 | boolean | false |
| show-zero | 是否显示 0 | boolean | false |
| arrow-left | 是否在数字左侧显示箭头 | boolean | false |
| sync-text-color | 文字颜色是否与箭头同步 | boolean | true |
| text-color | 文字颜色 | string | #333333 |
| rise-color | 向上箭头颜色 | string | #fa2c19 |
| drop-color | 向下箭头颜色 | string | #64b578 |
| font-size | 字体大小 | string | 14px |
| custom-style | 自定义样式 | object | {} |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| upIcon | 自定义向上箭头图标 |
| downIcon | 自定义向下箭头图标 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式：

| 名称 | 默认值 |
| --- | --- |
| --zx-trend-arrow-font-size | 14px |
| --zx-trend-arrow-icon-margin | 4rpx |

## 兼容性

- ✅ H5
- ✅ 小程序
- ✅ App

## 注意事项

1. 组件使用纯 CSS 和 Unicode 字符实现箭头，确保跨平台兼容性
2. 支持自定义图标插槽，可以使用图标组件替换默认箭头
3. 文字颜色可以与箭头颜色同步，也可以独立设置
4. 支持小数位数控制和正负号显示