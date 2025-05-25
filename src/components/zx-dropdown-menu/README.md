# zx-dropdown-menu 下拉菜单容器组件

下拉菜单的容器组件，用于包裹下拉菜单项。

## 使用方式

通常作为 `zx-dropdown` 组件的下拉内容使用：

```html
<zx-dropdown>
  <view class="dropdown-link">
    下拉菜单
    <text class="uni-icons" style="margin-left: 5px;">&#xe6e1;</text>
  </view>
  <template #dropdown>
    <zx-dropdown-menu>
      <zx-dropdown-item command="a">选项1</zx-dropdown-item>
      <zx-dropdown-item command="b">选项2</zx-dropdown-item>
      <zx-dropdown-item command="c">选项3</zx-dropdown-item>
    </zx-dropdown-menu>
  </template>
</zx-dropdown>
```

## 组件说明

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 下拉菜单的内容，通常放置 `zx-dropdown-item` 组件 |

### 注意事项

- `zx-dropdown-menu` 组件必须作为 `zx-dropdown` 组件的 `dropdown` 插槽内容使用
- 组件内部应包含一个或多个 `zx-dropdown-item` 组件
- 组件样式已经设置为 `scoped`，不会影响外部样式

## 完整示例

```html
<template>
  <view>
    <zx-dropdown trigger="click">
      <view class="dropdown-link">
        点击触发
        <text class="uni-icons" style="margin-left: 5px;">&#xe6e1;</text>
      </view>
      <template #dropdown>
        <zx-dropdown-menu>
          <zx-dropdown-item command="view">查看</zx-dropdown-item>
          <zx-dropdown-item command="edit">编辑</zx-dropdown-item>
          <zx-dropdown-item command="delete" divided>删除</zx-dropdown-item>
        </zx-dropdown-menu>
      </template>
    </zx-dropdown>
  </view>
</template>

<script setup>
// 处理命令事件
const handleCommand = (command) => {
  uni.showToast({
    title: `点击了: ${command}`,
    icon: 'none'
  })
}
</script>

<style>
.dropdown-link {
  display: flex;
  align-items: center;
  color: #409eff;
  cursor: pointer;
}
</style>
