# zx-popconfirm 气泡确认框组件

基于 uni-app 开发的气泡确认框组件，可在移动端和小程序中使用。

## 安装方式

```bash
npm install @tanzhenxing/zx-popconfirm
```

## 引入组件

在 `pages.json` 中注册组件：

```json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^zx-popconfirm": "@tanzhenxing/zx-popconfirm/zx-popconfirm"
    }
  }
}
```

## 基本使用

```vue
<template>
  <zx-popconfirm title="确定要删除吗？">
    <template #reference>
      <button>删除</button>
    </template>
  </zx-popconfirm>
</template>
```

## API

### Props 属性

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | String | '' | 标题文本 |
| confirmButtonText | String | '确认' | 确认按钮文本 |
| cancelButtonText | String | '取消' | 取消按钮文本 |
| confirmButtonType | String | 'primary' | 确认按钮类型，可选值：'default', 'primary', 'success', 'warning', 'danger', 'info', 'text' |
| cancelButtonType | String | 'default' | 取消按钮类型，可选值：'default', 'primary', 'success', 'warning', 'danger', 'info', 'text' |
| icon | String | 'help-filled' | 图标类型，可选值：'help-filled', 'info-filled', 'warning-filled', 'error-filled' |
| iconColor | String | '#f90' | 图标颜色 |
| hideIcon | Boolean | false | 是否隐藏图标 |
| hideAfter | Number | 200 | 关闭延迟时间（毫秒） |
| width | String/Number | 150 | 气泡宽度 |
| placement | String | 'top' | 气泡展示位置，可选值：'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end' |

### Events 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击确认按钮时触发 | - |
| cancel | 点击取消按钮时触发 | - |

### Slots 插槽

| 插槽名 | 说明 |
| --- | --- |
| reference | 触发气泡显示的元素 |
| actions | 自定义操作按钮，提供 confirm 和 cancel 函数 |

## 示例

### 基础用法

```vue
<zx-popconfirm title="确定要删除这条记录吗？">
  <template #reference>
    <button>删除</button>
  </template>
</zx-popconfirm>
```

### 自定义按钮文字

```vue
<zx-popconfirm 
  title="确定要执行此操作吗？" 
  confirm-button-text="是的" 
  cancel-button-text="取消操作"
  @confirm="handleConfirm"
  @cancel="handleCancel"
>
  <template #reference>
    <button>执行操作</button>
  </template>
</zx-popconfirm>
```

### 自定义图标和颜色

```vue
<zx-popconfirm 
  title="此操作不可逆，是否继续？" 
  icon="error-filled" 
  icon-color="#F56C6C"
>
  <template #reference>
    <button>危险操作</button>
  </template>
</zx-popconfirm>
```

### 自定义按钮类型

```vue
<zx-popconfirm 
  title="确认操作？" 
  confirm-button-type="success" 
  cancel-button-type="info"
>
  <template #reference>
    <button>自定义按钮类型</button>
  </template>
</zx-popconfirm>
```

### 自定义操作插槽

```vue
<zx-popconfirm title="确认删除所选项目？">
  <template #reference>
    <button>批量删除</button>
  </template>
  <template #actions="{ confirm, cancel }">
    <button @click="cancel">我再想想</button>
    <button @click="confirm">确定删除</button>
  </template>
</zx-popconfirm>
```

## 注意事项

1. 组件需要 uni-app 环境，确保项目是基于 uni-app 框架开发的
2. 组件使用了 Vue 3 的 Composition API (setup)，不支持 Vue 2
3. 在某些小程序平台可能有兼容性问题，请根据实际情况调整样式
