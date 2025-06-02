# ZxIndicator 指示器

显示一个任务或流程的进度，常用于开通流程。

## 基础用法

```vue
<template>
  <zx-indicator :size="5" :current="1" />
  <zx-indicator :size="5" :current="3" />
  <zx-indicator :size="5" :current="5" />
</template>
```

## 块级布局

通过 `block` 属性启用块级布局，并可通过 `align` 属性设置对齐方式。

```vue
<template>
  <zx-indicator block align="left" :size="6" :current="5" />
  <zx-indicator block align="center" :size="6" :current="5" />
  <zx-indicator block align="right" :size="6" :current="5" />
</template>
```

## 不补零

通过 `fill-zero` 属性控制单数前面是否补 0。

```vue
<template>
  <zx-indicator :fill-zero="false" :size="6" :current="5" />
</template>
```

## 自定义颜色

通过 `bg-color`、`dot-color`、`text-color` 属性自定义颜色。

```vue
<template>
  <zx-indicator 
    :size="5" 
    :current="3" 
    bg-color="#ff6b6b"
    dot-color="#ffd93d"
    text-color="#ffffff"
  />
</template>
```

## 自定义大小

通过 `indicator-size` 属性自定义指示器大小。

```vue
<template>
  <zx-indicator :size="5" :current="3" indicator-size="24" />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前步骤 | number | 1 |
| size | 步骤长度 | number | 3 |
| block | 是否启用块级布局 | boolean | false |
| align | 对齐方式，仅在 block 为 true 时生效，可选值 left, right, center | string | left |
| fill-zero | 单数前面是否补 0 | boolean | true |
| bg-color | 指示器背景色 | string | #007aff |
| dot-color | 点的颜色 | string | #c8c9cc |
| text-color | 数字文字颜色 | string | #ffffff |
| indicator-size | 指示器大小 | string \| number | 18 |

## 主题定制

组件提供了下列 CSS 变量，可用于自定义样式：

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --zx-indicator-bg-color | #007aff | 指示器背景色 |
| --zx-indicator-dot-color | #c8c9cc | 点的颜色 |
| --zx-indicator-text-color | #ffffff | 数字文字颜色 |
| --zx-indicator-size | 18px | 指示器大小 |
| --zx-indicator-dot-size | calc(var(--zx-indicator-size) / 3) | 点的大小 |
| --zx-indicator-border-size | calc(var(--zx-indicator-size) + 2px) | 边框大小 |
| --zx-indicator-number-font-size | 10px | 数字字体大小 |

## 兼容性

- ✅ H5
- ✅ 小程序
- ✅ App

## 注意事项

1. 组件使用 CSS 变量实现主题定制，在不支持 CSS 变量的环境中可能显示异常
2. 当 `current` 值超出 `size` 范围时，组件会正常渲染但可能不符合预期
3. `align` 属性仅在 `block` 为 `true` 时生效