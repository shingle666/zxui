# ZxSpace 间距组件

虽然我们拥有 Divider 组件，但很多时候我们需要不是一个被 Divider 组件分割开的页面结构，因此我们会重复的使用很多的 Divider 组件，这在我们的开发效率上造成了一定的困扰。**间距组件**就是为了解决这种困扰应运而生的。

## 特别说明

本组件专为 **uni-app** 优化，使用简单的插槽方式，不依赖动态组件，确保跨平台兼容性。

## 基础用法

最基础的用法，通过这个组件来给组件之间提供统一的间距。

```vue
<template>
  <zx-space>
    <view>Item 1</view>
    <view>Item 2</view>
    <view>Item 3</view>
  </zx-space>
</template>
```

## 垂直布局

使用 `direction` 来控制布局的方式，背后实际上是利用了 `flex-direction` 来控制。

```vue
<template>
  <zx-space direction="vertical">
    <view>Item 1</view>
    <view>Item 2</view>
  </zx-space>
</template>
```

## 控制间距的大小

通过调整 `size` 的值来控制间距的大小。

使用内置的 `small`、`default`、`large` 来设置间距大小，分别对应 `8px`、`12px` 和 `16px` 的间距。默认的间距大小为 `small`，也就是 `8px`。

```vue
<template>
  <zx-space size="large">
    <view>Item 1</view>
    <view>Item 2</view>
  </zx-space>
</template>
```

## 自定义 Size

很多时候，内建的大小不满足设计师的要求，我们可以通过传入自己定义的大小（数值类型）来设置。

```vue
<template>
  <zx-space :size="30">
    <view>Item 1</view>
    <view>Item 2</view>
  </zx-space>
</template>
```

## 自动换行

在**水平（horizontal）**模式下，通过使用 `wrap`（**布尔类型**）来控制自动换行行为。

```vue
<template>
  <zx-space wrap>
    <view v-for="i in 20" :key="i">Item {{ i }}</view>
  </zx-space>
</template>
```

## 行间分隔符

通过 `spacer` 来设置分隔符（仅支持字符串类型）。

```vue
<template>
  <!-- 管道符分隔符 -->
  <zx-space spacer="|">
    <span>首页</span>
    <span>产品</span>
    <span>关于我们</span>
  </zx-space>

  <!-- 点号分隔符 -->
  <zx-space spacer="•">
    <span>选项1</span>
    <span>选项2</span>
  </zx-space>
</template>
```

## 对齐方式

通过 `alignment` 来设置对齐方式。

```vue
<template>
  <zx-space alignment="start">
    <span>文本</span>
    <button>按钮</button>
  </zx-space>
</template>
```

## 填充容器

通过 `fill`（**布尔类型**）参数，您可以控制子节点是否自动填充容器。

```vue
<template>
  <zx-space fill>
    <view>Item 1</view>
    <view>Item 2</view>
    <view>Item 3</view>
  </zx-space>
</template>
```

也可以使用 `fillRatio` 参数，自定义填充的比例，默认值为 `100`，代表基于父容器宽度的 `100%` 进行填充。

```vue
<template>
  <zx-space fill :fill-ratio="30">
    <view>Item 1</view>
    <view>Item 2</view>
  </zx-space>
</template>
```

## API

### Attributes

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| alignment | 对齐的方式 | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch' \| 'flex-start' \| 'flex-end'` | center |
| direction | 排列的方向 | `'horizontal' \| 'vertical'` | horizontal |
| size | 间隔大小 | `'small' \| 'default' \| 'large' \| number \| [number, number]` | small |
| wrap | 设置是否自动折行 | boolean | false |
| fill | 子元素是否填充父容器 | boolean | false |
| fill-ratio | 填充父容器的比例 | number | 100 |
| spacer | 间隔符（仅支持字符串） | string | '' |
| prefix-cls | 给 space 的类名前缀 | string | zx-space |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 需要添加间隔的元素 |

## 主题定制

组件提供了 CSS 变量来支持主题定制：

```scss
.zx-space {
  --zx-space-horizontal-size: 8px;  // 水平间距
  --zx-space-vertical-size: 8px;    // 垂直间距
  --zx-space-alignment: center;     // 对齐方式
  --zx-space-spacer: "";           // 分隔符内容
}
```

## 响应式支持

组件支持响应式设计，在移动设备上会自动调整间距大小：

```scss
@media (max-width: 768px) {
  .zx-space {
    --zx-space-horizontal-size: 6px;
    --zx-space-vertical-size: 6px;
  }
}
```

## 兼容性说明

1. **uni-app 优化**: 组件专为 uni-app 设计，使用 `<view>` 标签和简单插槽，确保跨平台兼容性。

2. **分隔符限制**: 由于 uni-app 的限制，`spacer` 属性仅支持字符串类型，不支持 VNode。

3. **样式穿透**: 使用 `:deep()` 选择器来穿透子组件样式，确保样式正确应用。

4. **Flexbox 布局**: 组件使用 Flexbox 布局，在所有支持的平台上都有良好的兼容性。

## 注意事项

1. 在 uni-app 中使用时，建议子元素使用 `<view>` 等 uni-app 支持的标签。

2. 分隔符功能通过 CSS 的 `::after` 伪元素实现，在某些平台可能有样式差异。

3. 当使用 `fill` 属性时，建议设置容器的宽度，以获得更好的布局效果。

4. 组件使用现代 CSS 特性，在较老的浏览器或 WebView 中可能需要额外的兼容性处理。
