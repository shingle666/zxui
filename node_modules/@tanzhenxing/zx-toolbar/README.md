# zx-toolbar 工具条

## 介绍

`zx-toolbar` 是一个常用于页面顶部或底部的工具操作条组件。通常用于展示标题、取消和确认等操作按钮。

## 基本用法

### 基础示例

```vue
<template>
  <zx-toolbar 
    title="标题" 
    @cancel="onCancel" 
    @confirm="onConfirm"
  />
</template>

<script setup>
const onCancel = () => {
  console.log('点击取消');
}

const onConfirm = () => {
  console.log('点击确认');
}
</script>
```

### 自定义文字和颜色

```vue
<template>
  <zx-toolbar 
    title="自定义文字和颜色" 
    cancelText="返回" 
    confirmText="提交" 
    cancelColor="#ff5500" 
    confirmColor="#07c160"
  />
</template>
```

### 使用插槽自定义内容

```vue
<template>
  <zx-toolbar>
    <template #left>
      <view class="custom-left">
        <zx-icon name="arrow-left" size="20"></zx-icon>
        <text>返回</text>
      </view>
    </template>
    
    <template #center>
      <view class="custom-title">
        <zx-icon name="home" size="18"></zx-icon>
        <text>自定义标题</text>
      </view>
    </template>
    
    <template #right>
      <view class="custom-right">
        <zx-button type="primary" size="mini">提交</zx-button>
      </view>
    </template>
  </zx-toolbar>
</template>
```

### 自定义样式

```vue
<template>
  <zx-toolbar 
    title="自定义样式" 
    :customStyle="{ 
      backgroundColor: '#f8f8f8', 
      borderBottom: '1px solid #eee' 
    }"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否展示工具条 | Boolean | true |
| cancelText | 取消按钮的文字 | String | '取消' |
| confirmText | 确认按钮的文字 | String | '确认' |
| cancelColor | 取消按钮的颜色 | String | '#2b85e4' |
| confirmColor | 确认按钮的颜色 | String | '#2b85e4' |
| title | 标题文字 | String | '' |
| customStyle | 自定义样式 | Object | {} |
| bgColor | 背景颜色 | String | '#ffffff' |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| cancel | 点击取消按钮时触发 | - |
| confirm | 点击确认按钮时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| left | 自定义左侧内容 |
| center | 自定义中间内容 |
| right | 自定义右侧内容 |

## 常见问题

### 如何在页面底部固定工具条？

可以通过外层容器定位来实现：

```vue
<template>
  <view class="footer-toolbar">
    <zx-toolbar title="底部工具条" />
  </view>
</template>

<style>
.footer-toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* 如果有安全区域需求，可以配合 zx-safe-bottom 组件使用 */
}
</style>
```
