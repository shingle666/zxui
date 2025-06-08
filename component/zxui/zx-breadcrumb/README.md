# ZX-Breadcrumb 面包屑组件

显示当前页面的路径，快速返回之前的任意页面。参考 Element Plus Breadcrumb 组件设计。

## 特性

- 🎯 **路径导航**：清晰显示页面层级关系
- 🔗 **路由跳转**：支持路由跳转和外部链接
- 🎨 **自定义分隔符**：支持文字和图标分隔符
- 📏 **多种尺寸**：large、default、small 三种尺寸
- 🎪 **自定义样式**：支持自定义颜色和样式
- 🚫 **禁用状态**：支持整体或单项禁用
- 🧩 **插槽支持**：支持自定义内容和分隔符

## 基础用法

```vue
<template>
  <zx-breadcrumb separator="/">
    <zx-breadcrumb-item :to="{ path: '/' }">首页</zx-breadcrumb-item>
    <zx-breadcrumb-item to="/promotion">推广管理</zx-breadcrumb-item>
    <zx-breadcrumb-item to="/promotion/list">推广列表</zx-breadcrumb-item>
    <zx-breadcrumb-item>推广详情</zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

## 图标分隔符

通过设置 `separator-icon` 可使用相应的图标作为分隔符，注意这将使 `separator` 失效：

```vue
<template>
  <zx-breadcrumb separator-icon="arrow-right">
    <zx-breadcrumb-item :to="{ path: '/' }">首页</zx-breadcrumb-item>
    <zx-breadcrumb-item>推广管理</zx-breadcrumb-item>
    <zx-breadcrumb-item>推广列表</zx-breadcrumb-item>
    <zx-breadcrumb-item>推广详情</zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

## 不同尺寸

```vue
<template>
  <!-- 小号 -->
  <zx-breadcrumb size="small">
    <zx-breadcrumb-item to="/">首页</zx-breadcrumb-item>
    <zx-breadcrumb-item>列表页</zx-breadcrumb-item>
    <zx-breadcrumb-item>详情页</zx-breadcrumb-item>
  </zx-breadcrumb>

  <!-- 默认 -->
  <zx-breadcrumb size="default">
    <zx-breadcrumb-item to="/">首页</zx-breadcrumb-item>
    <zx-breadcrumb-item>列表页</zx-breadcrumb-item>
    <zx-breadcrumb-item>详情页</zx-breadcrumb-item>
  </zx-breadcrumb>

  <!-- 大号 -->
  <zx-breadcrumb size="large">
    <zx-breadcrumb-item to="/">首页</zx-breadcrumb-item>
    <zx-breadcrumb-item>列表页</zx-breadcrumb-item>
    <zx-breadcrumb-item>详情页</zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

## 自定义颜色

```vue
<template>
  <zx-breadcrumb 
    color="#409eff" 
    active-color="#f56c6c"
    separator-color="#909399"
  >
    <zx-breadcrumb-item to="/">首页</zx-breadcrumb-item>
    <zx-breadcrumb-item to="/list">列表页</zx-breadcrumb-item>
    <zx-breadcrumb-item>详情页</zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

## 外部链接

```vue
<template>
  <zx-breadcrumb>
    <zx-breadcrumb-item href="https://www.example.com" target="_blank">
      外部链接
    </zx-breadcrumb-item>
    <zx-breadcrumb-item>当前页面</zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

## 禁用状态

```vue
<template>
  <!-- 整体禁用 -->
  <zx-breadcrumb disabled>
    <zx-breadcrumb-item to="/">首页</zx-breadcrumb-item>
    <zx-breadcrumb-item>详情页</zx-breadcrumb-item>
  </zx-breadcrumb>

  <!-- 单项禁用 -->
  <zx-breadcrumb>
    <zx-breadcrumb-item to="/">首页</zx-breadcrumb-item>
    <zx-breadcrumb-item disabled>禁用项</zx-breadcrumb-item>
    <zx-breadcrumb-item>详情页</zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

## 自定义内容

```vue
<template>
  <zx-breadcrumb>
    <zx-breadcrumb-item to="/">
      <zx-icon name="home" size="16" color="#409eff" />
      首页
    </zx-breadcrumb-item>
    <zx-breadcrumb-item>
      <template #separator>
        <zx-icon name="arrow-right" size="12" color="#c0c4cc" />
      </template>
      自定义分隔符
    </zx-breadcrumb-item>
    <zx-breadcrumb-item>详情页</zx-breadcrumb-item>
  </zx-breadcrumb>
</template>
```

## API 参考

### ZxBreadcrumb 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| separator | 分隔符 | string | — | / |
| separator-icon | 图标分隔符的组件或组件名 | string | — | — |
| size | 面包屑尺寸 | string | large/default/small | default |
| disabled | 是否禁用整个面包屑 | boolean | — | false |
| color | 文字颜色 | string | — | — |
| active-color | 当前页面颜色 | string | — | — |
| separator-color | 分隔符颜色 | string | — | — |

### ZxBreadcrumb 插槽

| 插槽名 | 说明 | 子标签 |
|--------|------|--------|
| default | 自定义默认内容 | ZxBreadcrumbItem |

### ZxBreadcrumbItem 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| to | 路由跳转目标，同 vue-router 的 to 属性 | string/object | — | — |
| replace | 如果设置该属性为 true, 导航将不会留下历史记录 | boolean | — | false |
| text | 面包屑项的文字内容 | string/number | — | — |
| disabled | 是否禁用该项 | boolean | — | false |
| color | 文字颜色 | string | — | — |
| href | 链接地址 | string | — | — |
| target | 链接打开方式 | string | _self/_blank | _self |

### ZxBreadcrumbItem 事件

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击面包屑项时触发 | — |

### ZxBreadcrumbItem 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 自定义默认内容 |
| separator | 自定义分隔符 |

## 注意事项

1. **路由跳转**：组件会自动检测项目中的路由方法（`$zx.route`），如果不存在会输出日志
2. **当前页面判断**：没有 `to` 和 `href` 属性的 `BreadcrumbItem` 会被视为当前页面
3. **外部链接**：使用 `href` 属性可以跳转到外部链接，在不同平台有不同的处理方式
4. **图标分隔符**：当设置 `separator-icon` 时，`separator` 属性会被忽略
5. **颜色优先级**：单项的 `color` 属性优先级高于父组件的颜色设置

## 样式变量

如需自定义样式，可以覆盖以下 CSS 变量：

```scss
// 默认颜色
$breadcrumb-link-color: #606266;
$breadcrumb-active-color: #909399;
$breadcrumb-separator-color: #c0c4cc;
$breadcrumb-hover-color: #409eff;

// 字体大小
$breadcrumb-small-size: 12px;
$breadcrumb-default-size: 14px;
$breadcrumb-large-size: 16px;

// 间距
$breadcrumb-small-gap: 6px;
$breadcrumb-default-gap: 8px;
$breadcrumb-large-gap: 10px;
```

## 使用示例

参考 `src/pages/components/breadcrumb/` 目录下的示例文件，包含了各种用法的完整演示。
