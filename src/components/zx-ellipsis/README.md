# Ellipsis 文本省略

展示空间不足时，隐去部分内容并用"…"替代。

## 引入

```js
import zxEllipsis from '@/components/zx-ellipsis/zx-ellipsis.vue'
```

## 基础用法

通过 `content` 属性设置文本内容，默认尾部省略。

```vue
<template>
  <zx-ellipsis content="这是一段很长的文本内容，当超出容器宽度时会自动省略" />
</template>
```

## 头部省略

设置 `direction` 为 `start` 可以让文本从头部开始省略。

```vue
<template>
  <zx-ellipsis 
    direction="start" 
    content="这是一段很长的文本内容，当超出容器宽度时会自动省略" 
  />
</template>
```

## 中间省略

设置 `direction` 为 `middle` 可以让文本从中间开始省略。

```vue
<template>
  <zx-ellipsis 
    direction="middle" 
    content="这是一段很长的文本内容，当超出容器宽度时会自动省略" 
  />
</template>
```

## 多行省略

通过 `rows` 属性设置展示的行数。

```vue
<template>
  <zx-ellipsis 
    :rows="2" 
    content="这是一段很长的文本内容，当超出指定行数时会自动省略。这里是第二行的内容，继续展示更多的文字内容。" 
  />
</template>
```

## 展开收起

设置 `expand-text` 和 `collapse-text` 可以显示展开收起按钮。

```vue
<template>
  <zx-ellipsis 
    :rows="2" 
    expand-text="展开" 
    collapse-text="收起" 
    content="这是一段很长的文本内容，当超出指定行数时会自动省略。这里是第二行的内容，继续展示更多的文字内容。用户可以点击展开按钮查看完整内容，也可以点击收起按钮折叠内容。" 
  />
</template>
```

## 自定义省略符号

通过 `symbol` 属性自定义省略符号。

```vue
<template>
  <zx-ellipsis 
    symbol="***" 
    content="这是一段很长的文本内容，当超出容器宽度时会自动省略" 
  />
</template>
```

## 自定义样式

可以通过 `font-size`、`text-color`、`line-height` 等属性自定义文本样式。

```vue
<template>
  <zx-ellipsis 
    font-size="16px" 
    text-color="#666" 
    :line-height="24" 
    content="这是一段很长的文本内容，当超出容器宽度时会自动省略" 
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 文本内容 | string | - |
| direction | 省略位置，可选值 `start` `end` `middle` | string | `end` |
| rows | 展示几行 | number | `1` |
| expand-text | 展开操作的文案 | string | `''` |
| collapse-text | 收起操作的文案 | string | `''` |
| symbol | 省略的符号 | string | `...` |
| line-height | 容器的行高 | string \| number | `20` |
| font-size | 字体大小 | string | `14px` |
| text-color | 文字颜色 | string | `#333333` |
| toggle-color | 展开收起按钮颜色 | string | `#3460fa` |
| custom-style | 自定义样式 | object | `{}` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 文本点击时触发 | - |
| change | 点击展开收起时触发 | `expand` 或 `collapse` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 |
| --- | --- |
| --zx-ellipsis-text-color | #333333 |
| --zx-ellipsis-font-size | 14px |
| --zx-ellipsis-line-height | 20px |
| --zx-ellipsis-toggle-color | #3460fa |

## 注意事项

1. 单行省略使用 CSS 的 `text-overflow: ellipsis` 实现
2. 多行省略使用 `-webkit-line-clamp` 实现，在某些旧版本浏览器中可能不支持
3. 在小程序中，多行省略的效果可能与 H5 有所差异
4. 建议在使用多行省略时，为容器设置固定宽度以获得更好的效果

## 兼容性

- ✅ H5
- ✅ 小程序（微信、支付宝、百度、字节跳动、QQ、快手、京东）
- ✅ App（iOS、Android）

## 更新日志

### v1.0.0

- 初始版本
- 支持单行和多行文本省略
- 支持头部、尾部、中间省略
- 支持展开收起功能
- 支持自定义省略符号和样式