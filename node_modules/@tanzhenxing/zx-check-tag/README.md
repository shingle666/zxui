# zx-check-tag 可选中标签

一个可选中的标签组件，类似复选框但具有按钮式的样式。

## 特性

- 🎨 支持多种主题类型：primary、success、info、warning、danger
- 📏 支持多种尺寸：large、default、small
- 🎯 支持自定义颜色（背景色、文字色、边框色）
- ♿ 支持禁用状态
- 🔧 支持插槽自定义内容
- 💫 平滑的动画过渡效果

## 基础用法

```vue
<template>
  <zx-check-tag v-model:checked="checked" text="可选标签" />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
```

## 主题类型

通过 `type` 属性可以设置不同的主题类型：

```vue
<template>
  <zx-check-tag v-model:checked="primary" text="Primary" type="primary" />
  <zx-check-tag v-model:checked="success" text="Success" type="success" />
  <zx-check-tag v-model:checked="info" text="Info" type="info" />
  <zx-check-tag v-model:checked="warning" text="Warning" type="warning" />
  <zx-check-tag v-model:checked="danger" text="Danger" type="danger" />
</template>

<script setup>
import { ref } from 'vue'

const primary = ref(false)
const success = ref(false)
const info = ref(false)
const warning = ref(false)
const danger = ref(false)
</script>
```

## 尺寸大小

通过 `size` 属性可以设置不同的尺寸：

```vue
<template>
  <zx-check-tag v-model:checked="small" text="小尺寸" size="small" />
  <zx-check-tag v-model:checked="default" text="默认尺寸" size="default" />
  <zx-check-tag v-model:checked="large" text="大尺寸" size="large" />
</template>

<script setup>
import { ref } from 'vue'

const small = ref(false)
const default = ref(false)
const large = ref(false)
</script>
```

## 禁用状态

通过 `disabled` 属性可以禁用标签：

```vue
<template>
  <zx-check-tag v-model:checked="checked" text="禁用标签" disabled />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
```

## 自定义颜色

可以通过 `bgColor`、`color`、`borderColor` 属性自定义颜色：

```vue
<template>
  <zx-check-tag 
    v-model:checked="checked" 
    text="自定义颜色" 
    bg-color="#ff6b6b"
    color="#ffffff"
    border-color="#ff6b6b"
  />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
```

## 自定义内容

使用默认插槽可以自定义标签内容：

```vue
<template>
  <zx-check-tag v-model:checked="checked">
    <view class="custom-content">
      <text>🎉</text>
      <text>自定义内容</text>
    </view>
  </zx-check-tag>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)
</script>
```

## 监听变化

通过 `change` 事件可以监听选中状态的变化：

```vue
<template>
  <zx-check-tag 
    v-model:checked="checked" 
    text="监听变化" 
    @change="handleChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(false)

const handleChange = (newChecked) => {
  console.log('选中状态改变：', newChecked)
}
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|------|------|------|--------|--------|
| checked / v-model:checked | 是否选中 | `Boolean` | `false` | `true` / `false` |
| disabled | 是否禁用 | `Boolean` | `false` | `true` / `false` |
| type | 标签类型 | `String` | `'primary'` | `'primary'` / `'success'` / `'info'` / `'warning'` / `'danger'` |
| size | 标签大小 | `String` | `'default'` | `'large'` / `'default'` / `'small'` |
| text | 标签文字内容 | `String` / `Number` | `''` | - |
| bg-color | 背景颜色 | `String` | `''` | 任意有效的 CSS 颜色值 |
| color | 文字颜色 | `String` | `''` | 任意有效的 CSS 颜色值 |
| border-color | 边框颜色 | `String` | `''` | 任意有效的 CSS 颜色值 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 点击标签时触发 | `(checked: boolean)` - 新的选中状态 |

### Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义标签内容，会覆盖 `text` 属性 |

## 样式变量

组件使用了以下 SCSS 变量，可以通过覆盖这些变量来自定义主题：

```scss
$zx-primary: #2979ff !default;
$zx-success: #07c160 !default;
$zx-info: #909399 !default;
$zx-warning: #ff9900 !default;
$zx-error: #fa3534 !default;
```

## 注意事项

1. 组件支持双向数据绑定，推荐使用 `v-model:checked`
2. 当同时设置 `text` 属性和使用默认插槽时，插槽内容会覆盖 `text` 属性
3. 自定义颜色属性（`bgColor`、`color`、`borderColor`）优先级高于主题类型
4. 组件在禁用状态下不会响应点击事件
