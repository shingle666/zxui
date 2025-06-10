# zx-steps 步骤条组件

基于 Element Plus Steps 组件设计的 uni-app 步骤条组件，支持 H5、小程序和 App，不依赖浏览器特有的 DOM。

## 特性

- ✅ 基础步骤导航
- ✅ 多种显示方向（水平/垂直）
- ✅ 居中对齐
- ✅ 带描述文案
- ✅ 带图标的步骤
- ✅ 简洁风格
- ✅ 多种状态（等待/处理中/完成/错误/成功）
- ✅ 自定义间距
- ✅ 可定制主题
- ✅ 支持插槽自定义
- ✅ 跨端兼容

## 安装方法

将组件复制到项目的 components 目录中即可使用。

## 基础用法

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
import ZxSteps from '@/components/zx-steps/zx-steps.vue';
import ZxStep from '@/components/zx-steps/zx-step.vue';

const active = ref(0);

const next = () => {
  active.value = (active.value + 1) % 4;
};
</script>
```

## 含状态的步骤条

```vue
<template>
  <zx-steps :active="1" :space="200" finish-status="success">
    <zx-step title="已完成"></zx-step>
    <zx-step title="处理中"></zx-step>
    <zx-step title="步骤 3"></zx-step>
  </zx-steps>
</template>
```

## 居中的步骤条

```vue
<template>
  <zx-steps :active="2" align-center>
    <zx-step title="步骤 1" description="这是一段描述文字"></zx-step>
    <zx-step title="步骤 2" description="这是一段描述文字"></zx-step>
    <zx-step title="步骤 3" description="这是一段描述文字"></zx-step>
  </zx-steps>
</template>
```

## 带描述的步骤条

```vue
<template>
  <zx-steps :active="1">
    <zx-step title="步骤 1" description="这里是步骤 1 的详细描述"></zx-step>
    <zx-step title="步骤 2" description="这里是步骤 2 的详细描述"></zx-step>
    <zx-step title="步骤 3" description="这里是步骤 3 的详细描述"></zx-step>
  </zx-steps>
</template>
```

## 带图标的步骤条

```vue
<template>
  <zx-steps :active="1">
    <zx-step title="步骤 1" icon="✏️"></zx-step>
    <zx-step title="步骤 2" icon="⬆️"></zx-step>
    <zx-step title="步骤 3" icon="🖼️"></zx-step>
  </zx-steps>
</template>
```

## 垂直的步骤条

```vue
<template>
  <view style="height: 300px;">
    <zx-steps direction="vertical" :active="active">
      <zx-step title="步骤 1" description="这是一段描述文字"></zx-step>
      <zx-step title="步骤 2" description="这是一段描述文字"></zx-step>
      <zx-step title="步骤 3" description="这是一段描述文字"></zx-step>
    </zx-steps>
  </view>
</template>
```

## 简洁风格的步骤条

```vue
<template>
  <zx-steps :active="1" simple>
    <zx-step title="步骤 1"></zx-step>
    <zx-step title="步骤 2"></zx-step>
    <zx-step title="步骤 3"></zx-step>
  </zx-steps>
</template>
```

## API

### ZxSteps Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 设置当前激活步骤 | Number | 0 |
| direction | 显示方向，可选值为 horizontal 或 vertical | String | horizontal |
| space | 每个 step 的间距，支持百分比或像素值 | String/Number | - |
| process-status | 设置当前步骤的状态，可选值为 wait/process/finish/error/success | String | process |
| finish-status | 设置结束步骤的状态，可选值为 wait/process/finish/error/success | String | finish |
| align-center | 进行居中对齐 | Boolean | false |
| simple | 是否应用简洁风格 | Boolean | false |

### ZxSteps Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 步骤组件（ZxStep） |

### ZxStep Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | String | - |
| description | 描述文案 | String | - |
| icon | 自定义图标 | String | - |
| status | 设置当前步骤的状态，可选值为 wait/process/finish/error/success | String | - |

### ZxStep Slots

| 插槽名 | 说明 |
| --- | --- |
| icon | 自定义图标 |
| title | 自定义标题 |
| description | 自定义描述文案 |

## 注意事项

1. 步骤条至少需要包含 2 个 zx-step 子组件
2. active 属性从 0 开始计数
3. 简洁模式下，align-center、description、direction、space 属性均无效
4. 如需定制主题颜色，可修改组件样式中的相关颜色变量
