# ZX-Tag 标签组件

用于标记和选择的标签组件，提供了丰富的表现形式，参考 Element Plus Tag 组件设计。

## 特性

- 🎨 多种类型：primary、success、info、warning、danger
- 🎯 多种主题：dark、light、plain  
- 📏 多种尺寸：large、default、small
- 🔘 支持圆形标签
- 🚫 可关闭标签
- ✅ 可选中标签（CheckTag）
- 🎭 支持自定义图标
- 🎪 支持动画效果
- 🧩 插槽支持

## 组件列表

### ZxTag - 基础标签
基础的标签组件，支持多种样式和功能。

### ZxCheckTag - 可选中标签  
可选中的标签组件，类似复选框但是按钮式的样式。

## 安装使用

```js
// 导入组件
import { ZxTag, ZxCheckTag } from '@/components/zx-tag'

// 或者单独导入
import ZxTag from '@/components/zx-tag/zx-tag.vue'
import ZxCheckTag from '@/components/zx-tag/zx-check-tag.vue'
```

## ZxTag 基础用法

### 基础标签

```vue
<template>
  <view class="flex gap-2">
    <zx-tag text="Primary" type="primary" />
    <zx-tag text="Success" type="success" />
    <zx-tag text="Info" type="info" />
    <zx-tag text="Warning" type="warning" />
    <zx-tag text="Danger" type="danger" />
  </view>
</template>
```

### 不同主题

```vue
<template>
  <view>
    <!-- Dark 主题 -->
    <view class="flex gap-2 mb-2">
      <zx-tag text="Dark" type="primary" effect="dark" />
      <zx-tag text="Dark" type="success" effect="dark" />
    </view>
    
    <!-- Light 主题（默认） -->
    <view class="flex gap-2 mb-2">
      <zx-tag text="Light" type="primary" effect="light" />
      <zx-tag text="Light" type="success" effect="light" />
    </view>
    
    <!-- Plain 主题 -->
    <view class="flex gap-2">
      <zx-tag text="Plain" type="primary" effect="plain" />
      <zx-tag text="Plain" type="success" effect="plain" />
    </view>
  </view>
</template>
```

### 不同尺寸

```vue
<template>
  <view class="flex gap-2">
    <zx-tag text="Large" size="large" />
    <zx-tag text="Default" size="default" />
    <zx-tag text="Small" size="small" />
  </view>
</template>
```

### 可移除标签

```vue
<template>
  <view class="flex gap-2">
    <zx-tag 
      v-for="tag in tags" 
      :key="tag.name" 
      :text="tag.name"
      :type="tag.type"
      closable 
      @close="handleClose"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'

const tags = ref([
  { name: 'Tag 1', type: 'primary' },
  { name: 'Tag 2', type: 'success' },
  { name: 'Tag 3', type: 'info' }
])

const handleClose = (index) => {
  tags.value.splice(index, 1)
}
</script>
```

### 圆形标签

```vue
<template>
  <view class="flex gap-2">
    <zx-tag text="Round" type="primary" round />
    <zx-tag text="Round" type="success" round />
    <zx-tag text="Round" type="info" round />
  </view>
</template>
```

### 带图标的标签

```vue
<template>
  <view class="flex gap-2">
    <zx-tag text="图标标签" type="primary" icon="star" />
    <zx-tag text="图片标签" type="success" icon="https://zxui.org/logo.png" />
  </view>
</template>
```

### 自定义插槽

```vue
<template>
  <zx-tag type="primary">
    <template #icon>
      <zx-icon name="heart" />
    </template>
    自定义内容
  </zx-tag>
</template>
```

## ZxCheckTag 可选中标签

### 基础用法

```vue
<template>
  <view class="flex gap-2">
    <zx-check-tag v-model:checked="checked1" text="可选标签" />
    <zx-check-tag :checked="true" text="已选中" disabled />
    <zx-check-tag text="未选中" />
  </view>
</template>

<script setup>
import { ref } from 'vue'
const checked1 = ref(false)
</script>
```

### 不同类型

```vue
<template>
  <view class="flex gap-2">
    <zx-check-tag v-model:checked="checked1" text="Primary" type="primary" />
    <zx-check-tag v-model:checked="checked2" text="Success" type="success" />
    <zx-check-tag v-model:checked="checked3" text="Warning" type="warning" />
  </view>
</template>
```

## ZxTag API

### Attributes

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| type | 标签类型 | string | primary/success/info/warning/danger/error | primary |
| effect | 主题 | string | dark/light/plain | light |
| size | 标签尺寸 | string | large/default/small | default |
| shape | 标签形状 | string | circle/square | square |
| round | 是否为圆形 | boolean | - | false |
| hit | 是否有边框描边 | boolean | - | false |
| text | 标签文字 | string/number | - | - |
| closable | 是否可关闭 | boolean | - | false |
| disabled | 是否禁用 | boolean | - | false |
| show | 是否显示 | boolean | - | true |
| disableTransitions | 是否禁用动画 | boolean | - | false |
| icon | 图标名称或图片路径 | string | - | - |
| iconColor | 图标颜色 | string | - | - |
| bgColor | 背景色 | string | - | - |
| color | 文字颜色 | string | - | - |
| borderColor | 边框颜色 | string | - | - |
| closeColor | 关闭按钮颜色 | string | - | #C6C7CB |
| name | 标识符 | string/number | - | - |
| plain | 是否镂空（废弃） | boolean | - | false |
| plainFill | 镂空时是否填充 | boolean | - | false |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击标签时触发 | (name) |
| close | 关闭标签时触发 | (name) |

### Slots

| 名称 | 说明 |
|------|------|
| default | 标签内容 |
| icon | 自定义图标 |

## ZxCheckTag API

### Attributes

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| checked / v-model:checked | 是否选中 | boolean | - | false |
| disabled | 是否禁用 | boolean | - | false |
| type | 标签类型 | string | primary/success/info/warning/danger | primary |
| size | 标签尺寸 | string | large/default/small | default |
| text | 标签文字 | string/number | - | - |
| bgColor | 背景色 | string | - | - |
| color | 文字颜色 | string | - | - |
| borderColor | 边框颜色 | string | - | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 选中状态改变时触发 | (checked: boolean) |

### Slots

| 名称 | 说明 |
|------|------|
| default | 标签内容 |

## 更新日志

### v1.1.0
- ✨ 新增 `effect` 属性支持多种主题
- ✨ 新增 `round` 属性支持圆形标签  
- ✨ 新增 `hit` 属性支持边框描边
- ✨ 新增 `disableTransitions` 属性禁用动画
- ✨ 新增 `ZxCheckTag` 可选中标签组件
- 🐛 修复尺寸规范化问题
- 🐛 修复图标颜色逻辑
- 📖 完善文档和示例

### v1.0.0
- 🎉 初始版本发布
- ✨ 支持基础标签功能
- ✨ 支持可关闭标签
- ✨ 支持自定义图标

## 兼容性说明

- 支持 `error` 类型向 `danger` 的自动转换
- 支持旧版本尺寸名称：`mini` → `small`，`medium` → `default`
- 保留 `plain` 属性的向后兼容性，建议使用 `effect="plain"`

## 贡献

欢迎提交 Issue 和 Pull Request 来完善组件功能。
