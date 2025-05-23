# ZxDivider 分割线

用于区隔内容的分割线组件，参考 Element Plus Divider 组件设计。

## 功能特性

- ✅ 基础水平分割线
- ✅ 垂直分割线
- ✅ 带文案的分割线
- ✅ 多种边框样式（实线、虚线、点线、双线等）
- ✅ 文案位置控制（左、中、右）
- ✅ 暗色主题支持
- ✅ 属性验证支持

## 使用方法

```vue
<script setup>
import ZxDivider from '@tanzhenxing/zx-divider'
</script>

<template>
  <div>
    <p>内容上方</p>
    <zx-divider />
    <p>内容下方</p>
  </div>
</template>
```

## 基础用法

### 水平分割线

```vue
<template>
  <div>
    <p>这是第一段内容</p>
    <zx-divider />
    <p>这是第二段内容</p>
  </div>
</template>
```

### 垂直分割线

```vue
<template>
  <div>
    <span>首页</span>
    <zx-divider direction="vertical" />
    <span>产品</span>
    <zx-divider direction="vertical" />
    <span>关于</span>
  </div>
</template>
```

### 带文案的分割线

```vue
<template>
  <div>
    <p>内容上方</p>
    <zx-divider>分割线文案</zx-divider>
    <p>内容下方</p>
  </div>
</template>
```

### 文案位置

```vue
<template>
  <div>
    <zx-divider content-position="left">左侧文案</zx-divider>
    <zx-divider content-position="center">居中文案</zx-divider>
    <zx-divider content-position="right">右侧文案</zx-divider>
  </div>
</template>
```

### 不同边框样式

```vue
<template>
  <div>
    <zx-divider border-style="solid">实线</zx-divider>
    <zx-divider border-style="dashed">虚线</zx-divider>
    <zx-divider border-style="dotted">点线</zx-divider>
    <zx-divider border-style="double">双线</zx-divider>
  </div>
</template>
```

## API

### Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| direction | 分割线方向 | `String` | `horizontal` \| `vertical` | `horizontal` |
| border-style | 边框样式 | `String` | `none` \| `hidden` \| `dotted` \| `dashed` \| `solid` \| `double` \| `groove` \| `ridge` \| `inset` \| `outset` | `solid` |
| content-position | 文案位置（仅水平分割线有效） | `String` | `left` \| `center` \| `right` | `center` |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 分割线文案内容（仅水平分割线有效） |

## 样式变量

组件使用 CSS 变量，可以通过覆盖这些变量来自定义样式：

```css
.zx-divider {
  --zx-border-color: #dcdfe6;           /* 分割线颜色 */
  --zx-border-color-lighter: #e4e7ed;   /* 浅色边框 */
  --zx-text-color-placeholder: #a8abb2; /* 文案颜色 */
  --zx-font-size-small: 12px;           /* 文案字体大小 */
}
```

## 暗色主题

组件支持暗色主题，在 `.dark` 类下会自动应用暗色样式：

```css
.dark .zx-divider {
  --zx-border-color: #4c4d4f;
  --zx-border-color-lighter: #414243;
  --zx-text-color-placeholder: #8d9095;
}
```
