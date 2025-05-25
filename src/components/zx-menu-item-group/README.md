# ZxMenuItemGroup 菜单分组

ZxMenuItemGroup 组件用于在菜单中创建分组，可以为相关的菜单项提供一个分组标题。

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
|-------|-----|------|-------|
| title | 分组标题 | String | '' |

## 插槽

| 插槽名 | 说明 |
|-------|-----|
| default | 分组内容，通常用于放置菜单项 |
| title | 自定义分组标题内容 |

## 基础用法

```html
<zx-menu-item-group title="分组标题">
  <zx-menu-item>菜单项1</zx-menu-item>
  <zx-menu-item>菜单项2</zx-menu-item>
</zx-menu-item-group>
```

## 自定义标题

```html
<zx-menu-item-group>
  <template #title>
    <text class="custom-title">自定义标题</text>
  </template>
  <zx-menu-item>菜单项1</zx-menu-item>
  <zx-menu-item>菜单项2</zx-menu-item>
</zx-menu-item-group>
```
