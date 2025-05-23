# zx-alert 提示组件

## 简介

`zx-alert` 是一个用于页面中展示重要提示信息的组件。它不属于浮层元素，不会自动消失或关闭。

## 特性

- 🎨 **多种类型** - 支持 success、info、warning、error 四种类型
- 🌓 **双主题** - 提供 light 和 dark 两种主题样式
- 🔧 **高度可定制** - 支持自定义关闭按钮、图标、样式等
- 📱 **移动端适配** - 采用 rpx 单位，完美适配各种屏幕
- 🎯 **插槽支持** - 支持 title、icon、default 插槽自定义内容
- ⚡ **Vue 3** - 使用 Composition API 开发

## 基本用法

```vue
<template>
  <zx-alert title="这是一条提示信息" type="info" />
</template>
```

## 属性 (Props)

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| title | 标题 | String | — | — |
| type | 类型 | String | success/info/warning/error | info |
| description | 描述性文本 | String | — | — |
| closable | 是否可以关闭 | Boolean | — | true |
| center | 文字是否居中 | Boolean | — | false |
| close-text | 自定义关闭按钮文本 | String | — | — |
| show-icon | 是否显示类型图标 | Boolean | — | false |
| effect | 主题样式 | String | light/dark | light |
| custom-style | 自定义样式 | Object | — | {} |

## 事件 (Events)

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| close | 关闭 Alert 时触发的事件 | event |

## 插槽 (Slots)

| 插槽名 | 说明 |
|--------|------|
| default | Alert 内容描述 |
| title | 标题的内容 |
| icon | 自定义图标内容 |

## 方法 (Methods)

| 方法名 | 说明 | 参数 |
|--------|------|------|
| close | 手动关闭 Alert | — |

## 使用示例

### 基础用法

```vue
<template>
  <zx-alert title="成功提示的文案" type="success" />
  <zx-alert title="消息提示的文案" type="info" />
  <zx-alert title="警告提示的文案" type="warning" />
  <zx-alert title="错误提示的文案" type="error" />
</template>
```

### 主题样式

```vue
<template>
  <zx-alert title="深色主题" type="success" effect="dark" />
  <zx-alert title="浅色主题" type="success" effect="light" />
</template>
```

### 自定义关闭按钮

```vue
<template>
  <!-- 不可关闭 -->
  <zx-alert title="不可关闭的提示" type="info" :closable="false" />
  
  <!-- 自定义关闭文本 -->
  <zx-alert title="自定义关闭文本" type="warning" close-text="知道了" />
  
  <!-- 关闭回调 -->
  <zx-alert title="带回调的提示" type="error" @close="handleClose" />
</template>

<script setup>
const handleClose = () => {
  console.log('Alert 被关闭了');
};
</script>
```

### 带图标

```vue
<template>
  <zx-alert title="带图标的提示" type="success" show-icon />
  
  <!-- 自定义图标 -->
  <zx-alert title="自定义图标" type="info" show-icon>
    <template #icon>
      <zx-icon name="heart-fill" size="28" color="#409eff" />
    </template>
  </zx-alert>
</template>
```

### 文字居中

```vue
<template>
  <zx-alert title="居中的提示文案" type="success" center show-icon />
</template>
```

### 带描述

```vue
<template>
  <zx-alert 
    title="带描述的提示" 
    type="warning"
    description="这是一条详细的描述信息，为用户提供更多相关内容。"
  />
</template>
```

### 自定义内容

```vue
<template>
  <zx-alert type="info">
    <template #title>
      <text style="color: #409eff; font-weight: bold;">自定义标题</text>
    </template>
    <view style="color: #606266;">
      这里是自定义的内容区域，可以包含更丰富的信息。
    </view>
  </zx-alert>
</template>
```

### 自定义样式

```vue
<template>
  <zx-alert 
    title="自定义样式" 
    type="info"
    :custom-style="{ 
      backgroundColor: '#e1f3d8', 
      borderLeft: '6rpx solid #67c23a' 
    }"
  />
</template>
```

## 注意事项

1. 组件使用了 `zx-icon` 组件来显示图标，请确保项目中已正确引入图标组件
2. 组件支持 UniApp 的多端编译，在不同平台下表现一致
3. 使用 `rpx` 单位确保在不同设备上的适配效果
4. 组件内部使用了 `transition` 组件来实现关闭动画效果

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础的 Alert 功能
- 使用 Vue 3 Composition API 重构
- 完善的类型定义和文档
