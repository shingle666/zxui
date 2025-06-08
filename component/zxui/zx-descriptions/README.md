# ZxDescriptions 描述列表

列表形式展示多个字段，基于 Element Plus 的 Descriptions 组件设计。

## 基础用法

```vue
<template>
  <zx-descriptions title="用户信息">
    <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
    <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
    <zx-descriptions-item label="居住地">苏州市</zx-descriptions-item>
    <zx-descriptions-item label="备注">
      <el-tag size="small">学校</el-tag>
    </zx-descriptions-item>
    <zx-descriptions-item label="联系地址">
      江苏省苏州市吴中区吴中大道 1188 号
    </zx-descriptions-item>
  </zx-descriptions>
</template>
```

## 带边框

```vue
<template>
  <zx-descriptions title="用户信息" :column="3" border>
    <template #extra>
      <el-button type="primary">操作</el-button>
    </template>
    <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
    <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
    <zx-descriptions-item label="居住地">苏州市</zx-descriptions-item>
    <zx-descriptions-item label="备注">
      <el-tag size="small">学校</el-tag>
    </zx-descriptions-item>
    <zx-descriptions-item label="联系地址">
      江苏省苏州市吴中区吴中大道 1188 号
    </zx-descriptions-item>
  </zx-descriptions>
</template>
```

## 不同尺寸

```vue
<template>
  <div>
    <zx-descriptions title="大尺寸" size="large" border>
      <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
      <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
    </zx-descriptions>
    
    <zx-descriptions title="默认尺寸" size="default" border>
      <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
      <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
    </zx-descriptions>
    
    <zx-descriptions title="小尺寸" size="small" border>
      <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
      <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
    </zx-descriptions>
  </div>
</template>
```

## 垂直列表

```vue
<template>
  <zx-descriptions title="垂直列表" direction="vertical" border>
    <zx-descriptions-item label="用户名">kooriookami</zx-descriptions-item>
    <zx-descriptions-item label="手机号">18100000000</zx-descriptions-item>
    <zx-descriptions-item label="居住地">苏州市</zx-descriptions-item>
  </zx-descriptions>
</template>
```

## 自定义样式

```vue
<template>
  <zx-descriptions title="自定义样式列表" :column="3" border>
    <zx-descriptions-item
      label="用户名"
      label-align="right"
      align="center"
      label-class-name="my-label"
      class-name="my-content"
      width="150px"
    >
      kooriookami
    </zx-descriptions-item>
    <zx-descriptions-item label="手机号" label-align="right" align="center">
      18100000000
    </zx-descriptions-item>
    <zx-descriptions-item label="居住地" label-align="right" align="center">
      苏州市
    </zx-descriptions-item>
  </zx-descriptions>
</template>

<style scoped>
:deep(.my-label) {
  background: #f0f9ff !important;
}
:deep(.my-content) {
  background: #fef2f2;
}
</style>
```

## ZxDescriptions API

### 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| border | 是否带有边框 | boolean | — | false |
| column | 一行 Descriptions Item 的数量 | number | — | 3 |
| direction | 排列的方向 | string | horizontal / vertical | horizontal |
| size | 列表的尺寸 | string | large / default / small | default |
| title | 标题文本，显示在左上方 | string | — | — |
| extra | 操作区文本，显示在右上方 | string | — | — |
| label-width | 每一列的标签宽度 | string / number | — | — |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 自定义默认内容 |
| title | 自定义标题，显示在左上方 |
| extra | 自定义操作区，显示在右上方 |

## ZxDescriptionsItem API

### 属性

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| label | 标签文本 | string | — | — |
| span | 列的数量 | number | — | 1 |
| rowspan | 单元格应该跨越的行数 | number | — | 1 |
| width | 列的宽度 | string / number | — | — |
| min-width | 列的最小宽度 | string / number | — | — |
| label-width | 列标签宽 | string / number | — | — |
| align | 列的内容对齐方式 | string | left / center / right | left |
| label-align | 列的标签对齐方式 | string | left / center / right | — |
| class-name | 列的内容自定义类名 | string | — | — |
| label-class-name | 列标签自定义类名 | string | — | — |

### 插槽

| 插槽名 | 说明 |
|--------|------|
| default | 自定义默认内容 |
| label | 自定义标签 |

## 安装和使用

### 全局安装

```javascript
import { createApp } from 'vue'
import ZxDescriptions from './components/zx-descriptions'

const app = createApp({})
app.use(ZxDescriptions)
```

### 按需引入

```javascript
import { ZxDescriptions, ZxDescriptionsItem } from './components/zx-descriptions'

export default {
  components: {
    ZxDescriptions,
    ZxDescriptionsItem
  }
}
```

## 特性

- ✅ 支持带边框和无边框两种样式
- ✅ 支持水平和垂直两种排列方向
- ✅ 支持三种尺寸（large、default、small）
- ✅ 支持自定义列宽度和对齐方式
- ✅ 支持跨行和跨列
- ✅ 支持自定义样式类名
- ✅ 支持插槽自定义内容
- ✅ 响应式设计，适配不同屏幕尺寸

## 版本

当前版本：1.0.0
