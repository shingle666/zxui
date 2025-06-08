# zx-dropdown-item 下拉菜单项组件

下拉菜单中的菜单项组件，用于展示可点击的选项。

## 使用方式

在 `zx-dropdown-menu` 组件内使用：

```html
<zx-dropdown>
  <view class="dropdown-link">
    下拉菜单
    <text class="uni-icons" style="margin-left: 5px;">&#xe6e1;</text>
  </view>
  <template #dropdown>
    <zx-dropdown-menu>
      <zx-dropdown-item command="a">选项1</zx-dropdown-item>
      <zx-dropdown-item command="b" disabled>选项2</zx-dropdown-item>
      <zx-dropdown-item command="c" divided>选项3</zx-dropdown-item>
    </zx-dropdown-menu>
  </template>
</zx-dropdown>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| command | String / Number / Object | '' | 指令，点击菜单项时会传递给 command 回调函数 |
| disabled | Boolean | false | 是否禁用菜单项 |
| divided | Boolean | false | 是否显示分隔符，添加后会在菜单项上方显示分隔线 |
| icon | String | '' | 图标名称，显示在菜单项文本前 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 菜单项的文本内容 |
| icon | 自定义图标，会替代 icon 属性指定的图标 |

## 样式说明

- 菜单项高度为 34px
- 禁用状态会显示灰色文本
- 分隔符会在菜单项上方添加一条分隔线和间距
- 鼠标悬停或点击时会显示浅蓝色背景和蓝色文本

## 使用示例

### 基础用法

```html
<zx-dropdown-menu>
  <zx-dropdown-item command="view">查看</zx-dropdown-item>
  <zx-dropdown-item command="edit">编辑</zx-dropdown-item>
  <zx-dropdown-item command="delete">删除</zx-dropdown-item>
</zx-dropdown-menu>
```

### 禁用选项

```html
<zx-dropdown-menu>
  <zx-dropdown-item command="view">查看</zx-dropdown-item>
  <zx-dropdown-item command="edit" disabled>编辑</zx-dropdown-item>
  <zx-dropdown-item command="delete">删除</zx-dropdown-item>
</zx-dropdown-menu>
```

### 分隔选项

```html
<zx-dropdown-menu>
  <zx-dropdown-item command="view">查看</zx-dropdown-item>
  <zx-dropdown-item command="edit">编辑</zx-dropdown-item>
  <zx-dropdown-item command="delete" divided>删除</zx-dropdown-item>
</zx-dropdown-menu>
```

### 使用图标

```html
<zx-dropdown-menu>
  <zx-dropdown-item command="view" icon="eye">查看</zx-dropdown-item>
  <zx-dropdown-item command="edit" icon="edit">编辑</zx-dropdown-item>
  <zx-dropdown-item command="delete" icon="trash" divided>删除</zx-dropdown-item>
</zx-dropdown-menu>
```

### 自定义图标

```html
<zx-dropdown-menu>
  <zx-dropdown-item command="view">
    <template #icon>
      <text class="custom-icon">👁️</text>
    </template>
    查看
  </zx-dropdown-item>
</zx-dropdown-menu>
```
