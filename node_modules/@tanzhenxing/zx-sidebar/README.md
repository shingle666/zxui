# zx-sidebar 侧边导航组件

垂直展示的导航栏，用于在不同的内容区域之间进行切换。

## 特性

- 🚀 支持 H5、小程序、App 多端适配
- 🎨 可自定义宽度和背景色
- 🔄 支持 v-model 双向绑定
- 🎯 支持徽标和小红点提示
- 🚫 支持禁用选项

## 基础用法

通过 `v-model` 绑定当前选中项的索引。

```vue
<template>
  <zx-sidebar v-model="active">
    <zx-sidebar-item title="标签名称" />
    <zx-sidebar-item title="标签名称" />
    <zx-sidebar-item title="标签名称" />
  </zx-sidebar>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(0);
</script>
```

## 徽标提示

设置 `dot` 属性后，会在右上角展示一个小红点；设置 `badge` 属性后，会在右上角展示相应的徽标。

```vue
<template>
  <zx-sidebar v-model="active">
    <zx-sidebar-item title="标签名称" dot />
    <zx-sidebar-item title="标签名称" badge="5" />
    <zx-sidebar-item title="标签名称" />
  </zx-sidebar>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(0);
</script>
```

## 禁用选项

通过 `disabled` 属性禁用选项。

```vue
<template>
  <zx-sidebar v-model="active">
    <zx-sidebar-item title="标签名称" />
    <zx-sidebar-item title="标签名称" disabled />
    <zx-sidebar-item title="标签名称" />
  </zx-sidebar>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(0);
</script>
```

## 监听切换事件

设置 `change` 方法来监听切换导航项时的事件。

```vue
<template>
  <zx-sidebar v-model="active" @change="onChange">
    <zx-sidebar-item title="标签名 1" />
    <zx-sidebar-item title="标签名 2" />
    <zx-sidebar-item title="标签名 3" />
  </zx-sidebar>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(0);
const onChange = (index) => {
  uni.showToast({
    title: `标签名 ${index + 1}`,
    icon: 'none'
  });
};
</script>
```

## 自定义宽度和背景色

通过 `width` 和 `background` 属性自定义侧边栏的样式。

```vue
<template>
  <zx-sidebar v-model="active" width="100px" background="#f2f3f5">
    <zx-sidebar-item title="标签名称" />
    <zx-sidebar-item title="标签名称" />
    <zx-sidebar-item title="标签名称" />
  </zx-sidebar>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(0);
</script>
```

## API

### zx-sidebar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 当前导航项的索引 | number \| string | 0 |
| width | 侧边栏宽度 | string | '80px' |
| background | 侧边栏背景色 | string | - |

### zx-sidebar Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 切换导航项时触发 | index: number |

### zx-sidebar-item Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 内容 | string | '' |
| dot | 是否显示右上角小红点 | boolean | false |
| badge | 图标右上角徽标的内容 | number \| string | - |
| disabled | 是否禁用该项 | boolean | false |

### zx-sidebar-item Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击时触发 | index: number |

### zx-sidebar-item Slots

| 名称 | 说明 |
| --- | --- |
| title | 自定义标题 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式：

```css
/* 在App.vue的style标签中 */
page {
  /* 侧边栏宽度 */
  --zx-sidebar-width: 80px;
  /* 侧边栏字体大小 */
  --zx-sidebar-font-size: 14px;
  /* 侧边栏行高 */
  --zx-sidebar-line-height: 1.4;
  /* 侧边栏文字颜色 */
  --zx-sidebar-text-color: #323233;
  /* 侧边栏禁用文字颜色 */
  --zx-sidebar-disabled-text-color: #c8c9cc;
  /* 侧边栏内边距 */
  --zx-sidebar-padding: 20px 12px;
  /* 侧边栏激活背景色 */
  --zx-sidebar-active-color: #f2f3f5;
  /* 侧边栏背景 */
  --zx-sidebar-background: #f7f8fa;
  /* 侧边栏选中字体粗细 */
  --zx-sidebar-selected-font-weight: 500;
  /* 侧边栏选中文字颜色 */
  --zx-sidebar-selected-text-color: #323233;
  /* 侧边栏选中边框宽度 */
  --zx-sidebar-selected-border-width: 4px;
  /* 侧边栏选中边框高度 */
  --zx-sidebar-selected-border-height: 16px;
  /* 侧边栏选中边框颜色 */
  --zx-sidebar-selected-border-color: #1989fa;
  /* 侧边栏选中背景 */
  --zx-sidebar-selected-background: #ffffff;
}
```