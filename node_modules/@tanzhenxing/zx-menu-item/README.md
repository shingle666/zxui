# ZxMenuItem 菜单项

ZxMenuItem 组件用于构建菜单中的单个可点击项目，通常配合 ZxMenu 和 ZxSubmenu 使用。

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
|-------|-----|------|-------|
| index | 菜单项的唯一标识，必填 | String | null |
| disabled | 是否禁用 | Boolean | false |
| route | 路由跳转对象，点击菜单项时进行页面跳转 | String/Object | null |

## 事件

| 事件名 | 说明 | 回调参数 |
|-------|-----|---------|
| click | 菜单项点击时触发 | {index, indexPath, route} |

## 插槽

| 插槽名 | 说明 |
|-------|-----|
| default | 菜单项的内容 |

## 基础用法

```html
<zx-menu :default-active="activeIndex" @select="handleSelect">
  <zx-menu-item index="1">选项1</zx-menu-item>
  <zx-menu-item index="2" disabled>选项2</zx-menu-item>
  <zx-menu-item index="3">选项3</zx-menu-item>
</zx-menu>
```

## 路由跳转

### 字符串形式（使用 navigateTo 方式跳转）

```html
<zx-menu-item index="1" route="/pages/detail/detail">详情页</zx-menu-item>
```

### 对象形式（可指定跳转类型）

```html
<zx-menu-item 
  index="2" 
  :route="{
    url: '/pages/detail/detail?id=1',
    type: 'switchTab', // 可选值: navigateTo, redirectTo, reLaunch, switchTab
    animationType: 'pop-in', // 动画类型
    animationDuration: 300 // 动画时长
  }"
>
  详情页
</zx-menu-item>
```

## 与 ZxSubmenu 组合使用

```html
<zx-menu :default-active="activeIndex" @select="handleSelect">
  <zx-menu-item index="1">选项1</zx-menu-item>
  <zx-submenu index="2">
    <template #title>选项2</template>
    <zx-menu-item index="2-1">选项2-1</zx-menu-item>
    <zx-menu-item index="2-2">选项2-2</zx-menu-item>
  </zx-submenu>
  <zx-menu-item index="3">选项3</zx-menu-item>
</zx-menu>
```
