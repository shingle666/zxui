# zx-hover-button 悬浮按钮组件

`zx-hover-button` 是一个轻量级的悬浮按钮组件，适用于需要在页面上显示固定位置按钮的场景。支持 H5、小程序、App 多端。

## 特性

- 支持四个角落定位（左上、右上、左下、右下）
- 可自定义按钮大小、颜色和图标
- 支持文本标签显示
- 内置阴影效果
- 支持禁用状态
- 响应式交互动画
- 多端兼容

## 使用方法

```vue
<template>
  <zx-hover-button 
    icon="plus" 
    @click="handleClick"
  />
</template>

<script setup>
const handleClick = () => {
  console.log('悬浮按钮被点击')
}
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--|--|--|--|
| position | String | 'right-bottom' | 按钮位置，可选值: 'left-top', 'right-top', 'left-bottom', 'right-bottom' |
| size | Number/String | 50 | 按钮大小，单位px |
| icon | String | 'plus' | 图标名称 |
| iconSize | Number/String | '24' | 图标大小 |
| iconColor | String | '#ffffff' | 图标颜色 |
| backgroundColor | String | '#007AFF' | 按钮背景色 |
| text | String | '' | 文本内容 |
| showText | Boolean | false | 是否显示文本 |
| textColor | String | '#333333' | 文本颜色 |
| textBackgroundColor | String | '#ffffff' | 文本背景色 |
| shadow | Boolean | true | 是否显示阴影 |
| disabled | Boolean | false | 是否禁用 |
| margin | Number/String | 20 | 距离边缘的距离，单位px |
| bottom | Number/String | 80 | 距离底部的距离（仅在 bottom 位置时生效），单位px |
| top | Number/String | 80 | 距离顶部的距离（仅在 top 位置时生效），单位px |
| zIndex | Number | 999 | z-index 层级 |
| customStyle | Object | {} | 自定义样式对象 |

## 事件

| 事件名 | 说明 | 回调参数 |
|--|--|--|
| click | 点击按钮时触发 | event: Event |

## 插槽

| 插槽名 | 说明 |
|--|--|
| default | 按钮内容，会覆盖图标显示 |
| icon | 自定义图标内容 |

## 示例

### 基础用法

```vue
<template>
  <!-- 默认右下角位置 -->
  <zx-hover-button @click="handleClick" />
</template>
```

### 不同位置

```vue
<template>
  <!-- 左上角 -->
  <zx-hover-button position="left-top" icon="menu" />
  
  <!-- 右上角 -->
  <zx-hover-button position="right-top" icon="search" />
  
  <!-- 左下角 -->
  <zx-hover-button position="left-bottom" icon="message" />
  
  <!-- 右下角 -->
  <zx-hover-button position="right-bottom" icon="plus" />
</template>
```

### 自定义样式

```vue
<template>
  <zx-hover-button 
    :size="60"
    icon="heart"
    backgroundColor="#ff6b6b"
    iconColor="#ffffff"
    :shadow="true"
  />
</template>
```

### 带文本标签

```vue
<template>
  <zx-hover-button 
    icon="plus"
    text="添加"
    :showText="true"
    textColor="#333"
    textBackgroundColor="#f5f5f5"
  />
</template>
```

### 自定义图标

```vue
<template>
  <zx-hover-button>
    <template #icon>
      <image src="/static/custom-icon.png" style="width: 24px; height: 24px;" />
    </template>
  </zx-hover-button>
</template>
```

### 自定义内容

```vue
<template>
  <zx-hover-button 
    :size="60"
    backgroundColor="#4CAF50"
  >
    <text style="color: white; font-size: 12px;">GO</text>
  </zx-hover-button>
</template>
```

### 禁用状态

```vue
<template>
  <zx-hover-button 
    :disabled="true"
    icon="plus"
  />
</template>
```

### 自定义位置和样式

```vue
<template>
  <zx-hover-button 
    position="left-bottom"
    :margin="30"
    :bottom="100"
    :size="55"
    backgroundColor="linear-gradient(45deg, #ff6b6b, #ffa500)"
    :customStyle="{
      border: '2px solid #fff',
      boxShadow: '0 4px 20px rgba(255, 107, 107, 0.4)'
    }"
  />
</template>
```

## 注意事项

1. 组件使用 `position: fixed` 定位，会相对于视窗进行定位
2. 在小程序中，请确保页面有足够的层级空间，避免被其他元素遮挡
3. 图标依赖 `zx-icon` 组件，请确保已正确引入
4. 在 App 端，建议适当调整 `bottom` 值以适配不同设备的安全区域
5. 自定义样式会与默认样式合并，相同属性会被覆盖

## 兼容性

| 平台 | 支持情况 |
|--|--|
| H5 | ✅ |
| 微信小程序 | ✅ |
| 支付宝小程序 | ✅ |
| 百度小程序 | ✅ |
| 字节小程序 | ✅ |
| QQ小程序 | ✅ |
| App | ✅ |
| 快应用 | ✅ |