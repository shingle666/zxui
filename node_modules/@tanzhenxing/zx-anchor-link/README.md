# ZxAnchorLink 锚点链接组件

`ZxAnchorLink` 是配合 `ZxAnchor` 组件使用的锚点链接项组件，用于创建可点击的锚点链接。

## 基础用法

基本用法示例：

```vue
<template>
  <zx-anchor>
    <zx-anchor-link href="#section1" title="第一部分"></zx-anchor-link>
    <zx-anchor-link href="#section2" title="第二部分"></zx-anchor-link>
    <zx-anchor-link href="#section3" title="第三部分"></zx-anchor-link>
  </zx-anchor>
</template>
```

## 使用插槽

除了使用 `title` 属性，您也可以使用默认插槽自定义链接内容：

```vue
<template>
  <zx-anchor>
    <zx-anchor-link href="#section1">
      <view class="custom-link">自定义链接内容</view>
    </zx-anchor-link>
  </zx-anchor>
</template>
```

## 嵌套子链接

您可以使用 `sub-link` 插槽创建嵌套的子链接：

```vue
<template>
  <zx-anchor>
    <zx-anchor-link href="#part1" title="第一部分"></zx-anchor-link>
    <zx-anchor-link href="#part2" title="第二部分">
      <template #sub-link>
        <zx-anchor-link href="#part2-1" title="第二部分 - 子部分1"></zx-anchor-link>
        <zx-anchor-link href="#part2-2" title="第二部分 - 子部分2"></zx-anchor-link>
      </template>
    </zx-anchor-link>
    <zx-anchor-link href="#part3" title="第三部分"></zx-anchor-link>
  </zx-anchor>
</template>
```

## API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|--------|-----|
| href | String | '#' | 锚点链接的目标ID，格式为 `#target-id` |
| title | String | '' | 链接显示的文本，不设置时可使用默认插槽 |

### 插槽

| 插槽名 | 说明 |
|-------|------|
| default | 自定义链接内容，当不使用 `title` 属性时生效 |
| sub-link | 用于放置子链接组件 |

### 样式自定义

组件提供了以下CSS类名用于自定义样式：

- `.zx-anchor-link` - 整个链接项的容器
- `.zx-anchor-link-title` - 链接文本/内容的容器
- `.zx-anchor-link-sublink` - 子链接的容器

### 注意事项

1. 组件必须与 `ZxAnchor` 组件一起使用
2. `href` 属性对应页面上元素的ID，不要忘记添加 `#` 前缀
3. 链接激活状态会自动根据页面滚动位置更新
4. 在 UniApp 中使用时，确保目标元素具有正确的ID属性
