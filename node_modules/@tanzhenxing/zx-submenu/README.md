# zx-submenu 子菜单组件

## 介绍

`zx-submenu` 是一个用于 uni-app 的子菜单组件，主要用于展示多级菜单结构。它需要配合 `zx-menu` 和 `zx-menu-item` 组件一起使用，支持垂直和水平两种显示模式，以及折叠展开等功能。

## 安装方法

```bash
# npm 安装
npm install @tanzhenxing/zx-submenu

# yarn 安装
yarn add @tanzhenxing/zx-submenu
```

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| index | String | - | 子菜单的唯一标识（必填） |
| disabled | Boolean | false | 是否禁用子菜单 |
| popperClass | String | '' | 水平模式下弹出菜单的自定义类名 |

## 组件插槽

| 插槽名 | 说明 |
|-------|------|
| default | 子菜单内容，一般放置 zx-menu-item 组件 |
| title | 子菜单标题内容 |

## 使用示例

### 基础用法

```vue
<template>
  <zx-menu :default-active="activeIndex" mode="vertical">
    <zx-menu-item index="1">菜单项一</zx-menu-item>
    <zx-submenu index="2">
      <template #title>子菜单</template>
      <zx-menu-item index="2-1">子菜单项一</zx-menu-item>
      <zx-menu-item index="2-2">子菜单项二</zx-menu-item>
    </zx-submenu>
    <zx-menu-item index="3">菜单项三</zx-menu-item>
  </zx-menu>
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref('1');
</script>
```

### 水平模式

```vue
<template>
  <zx-menu :default-active="activeIndex" mode="horizontal">
    <zx-menu-item index="1">菜单项一</zx-menu-item>
    <zx-submenu index="2">
      <template #title>子菜单</template>
      <zx-menu-item index="2-1">子菜单项一</zx-menu-item>
      <zx-menu-item index="2-2">子菜单项二</zx-menu-item>
    </zx-submenu>
    <zx-menu-item index="3">菜单项三</zx-menu-item>
  </zx-menu>
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref('1');
</script>
```

### 嵌套子菜单

```vue
<template>
  <zx-menu :default-active="activeIndex" mode="vertical">
    <zx-submenu index="1">
      <template #title>一级菜单</template>
      <zx-menu-item index="1-1">选项1</zx-menu-item>
      <zx-submenu index="1-2">
        <template #title>二级菜单</template>
        <zx-menu-item index="1-2-1">选项1</zx-menu-item>
        <zx-menu-item index="1-2-2">选项2</zx-menu-item>
      </zx-submenu>
    </zx-submenu>
  </zx-menu>
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref('');
</script>
```

### 禁用状态

```vue
<template>
  <zx-menu :default-active="activeIndex" mode="vertical">
    <zx-menu-item index="1">菜单项一</zx-menu-item>
    <zx-submenu index="2" disabled>
      <template #title>禁用的子菜单</template>
      <zx-menu-item index="2-1">子菜单项一</zx-menu-item>
      <zx-menu-item index="2-2">子菜单项二</zx-menu-item>
    </zx-submenu>
  </zx-menu>
</template>

<script setup>
import { ref } from 'vue';

const activeIndex = ref('1');
</script>
```

## 注意事项

1. `zx-submenu` 组件必须在 `zx-menu` 组件内使用
2. 每个 `zx-submenu` 必须设置唯一的 `index` 属性
3. 子菜单可以无限嵌套，但建议不要超过三级，以保证良好的用户体验
4. 在水平模式下，子菜单会以弹出形式展示
5. 在垂直模式下，子菜单会以展开/折叠形式展示

## 与 zx-menu 配合使用

`zx-submenu` 组件需要配合 `zx-menu` 组件使用。`zx-menu` 组件支持以下属性：

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| mode | String | vertical | 菜单显示模式，可选值：horizontal / vertical |
| defaultActive | String | '' | 默认激活菜单的 index |
| backgroundColor | String | #ffffff | 菜单背景色 |
| textColor | String | #303133 | 菜单文字颜色 |
| activeTextColor | String | #409EFF | 激活菜单文字颜色 |
| collapse | Boolean | false | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用） |
| openDelay | Number | 0 | 子菜单打开的延时（毫秒） |
| closeDelay | Number | 0 | 子菜单关闭的延时（毫秒） |
