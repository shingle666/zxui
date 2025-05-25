# zx-step 步骤组件

步骤条的子组件，表示一个单独的步骤，必须配合 zx-steps 组件使用。

## 简介

`zx-step` 组件是 `zx-steps` 步骤条组件的子组件，用于表示步骤条中的单个步骤。它支持多种显示模式、状态和自定义内容，可以帮助用户清晰地了解当前流程的进度。

## 特性

- ✅ 支持水平和垂直方向
- ✅ 支持居中对齐
- ✅ 自定义图标
- ✅ 多种状态显示（等待/处理中/完成/错误/成功）
- ✅ 简洁模式
- ✅ 自定义插槽
- ✅ 跨端兼容

## 安装方法

将组件复制到项目的 components 目录中，并确保同时安装 `zx-steps` 组件。

## 基础用法

```vue
<template>
  <zx-steps :active="1" finish-status="success">
    <zx-step title="步骤1" description="这是第一步的描述"></zx-step>
    <zx-step title="步骤2" description="这是第二步的描述"></zx-step>
    <zx-step title="步骤3" description="这是第三步的描述"></zx-step>
  </zx-steps>
</template>

<script setup>
import ZxSteps from '@/components/zx-steps/zx-steps.vue';
import ZxStep from '@/components/zx-step/zx-step.vue';
</script>
```

## 垂直方向

```vue
<template>
  <view style="height: 300px;">
    <zx-steps direction="vertical" :active="1">
      <zx-step title="步骤1" description="这是第一步的描述"></zx-step>
      <zx-step title="步骤2" description="这是第二步的描述"></zx-step>
      <zx-step title="步骤3" description="这是第三步的描述"></zx-step>
    </zx-steps>
  </view>
</template>
```

## 简洁模式

简洁模式下不显示描述文案。

```vue
<template>
  <zx-steps :active="1" simple>
    <zx-step title="步骤1"></zx-step>
    <zx-step title="步骤2"></zx-step>
    <zx-step title="步骤3"></zx-step>
  </zx-steps>
</template>
```

## 自定义图标

可以使用 `icon` 属性设置自定义图标。

```vue
<template>
  <zx-steps :active="1">
    <zx-step title="步骤1" icon="✏️"></zx-step>
    <zx-step title="步骤2" icon="⬆️"></zx-step>
    <zx-step title="步骤3" icon="🖼️"></zx-step>
  </zx-steps>
</template>
```

## 自定义状态

可以单独为每个步骤设置状态，优先级高于 `zx-steps` 组件的状态设置。

```vue
<template>
  <zx-steps>
    <zx-step title="步骤1" status="finish"></zx-step>
    <zx-step title="步骤2" status="error"></zx-step>
    <zx-step title="步骤3" status="wait"></zx-step>
  </zx-steps>
</template>
```

## 动态控制

```vue
<template>
  <zx-steps :active="active" finish-status="success">
    <zx-step title="步骤 1"></zx-step>
    <zx-step title="步骤 2"></zx-step>
    <zx-step title="步骤 3"></zx-step>
  </zx-steps>
  <button @click="next">下一步</button>
</template>

<script setup>
import { ref } from 'vue';
const active = ref(0);
const next = () => {
  active.value = (active.value + 1) % 4;
};
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 步骤标题 | String | - |
| description | 步骤描述文案，简洁模式下不显示 | String | - |
| icon | 自定义图标，如果设置则覆盖默认的数字图标 | String | - |
| status | 设置当前步骤的状态，可选值为 wait/process/finish/error/success | String | - |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 默认插槽 |
| title | 自定义标题内容 |
| description | 自定义描述内容 |
| icon | 自定义图标内容 |

## 注意事项

1. `zx-step` 组件必须作为 `zx-steps` 组件的子组件使用
2. 每个 `zx-step` 的状态由父组件 `zx-steps` 的 `active` 属性和 `process-status`/`finish-status` 控制
3. 也可以通过单独设置 `status` 属性来覆盖父组件状态
4. 简洁模式下，`description` 属性将不会显示
5. 所有状态对应的样式颜色：
   - process: #409eff (蓝色)
   - finish/success: #67c23a (绿色)
   - error: #f56c6c (红色)
   - wait: #c0c4cc (灰色)

## 相关组件

- [zx-steps](../zx-steps/README.md) - 步骤条容器组件
