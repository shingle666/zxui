# zx-skeleton-item 骨架屏项组件

`zx-skeleton-item`是骨架屏的子组件，用于构建不同形状和大小的骨架占位元素，通常与`zx-skeleton`组件配合使用，用于内容加载时显示的占位图形。

## 使用方法

### 基础用法

```vue
<template>
  <zx-skeleton-item variant="text" />
  <zx-skeleton-item variant="circle" :size="40" />
  <zx-skeleton-item variant="rect" :width="120" :height="40" />
</template>

<script setup>
import ZxSkeletonItem from '@/components/zx-skeleton-item/zx-skeleton-item.vue';
</script>
```

### 组合使用

通常与`zx-skeleton`组件配合使用：

```vue
<template>
  <zx-skeleton :loading="loading" animated>
    <template #template>
      <div style="display: flex; align-items: center;">
        <zx-skeleton-item variant="circle" :size="40" />
        <div style="margin-left: 12px;">
          <zx-skeleton-item variant="text" style="width: 200px; margin-bottom: 8px;" />
          <zx-skeleton-item variant="text" style="width: 150px;" />
        </div>
      </div>
    </template>
    
    <template #default>
      <div class="content">
        <!-- 实际内容 -->
      </div>
    </template>
  </zx-skeleton>
</template>

<script setup>
import { ref } from 'vue';
import ZxSkeleton from '@/components/zx-skeleton/zx-skeleton.vue';
import ZxSkeletonItem from '@/components/zx-skeleton-item/zx-skeleton-item.vue';

const loading = ref(true);

// 模拟数据加载
setTimeout(() => {
  loading.value = false;
}, 2000);
</script>
```

## API

### Props

| 参数      | 说明                | 类型                                                | 默认值  |
|-----------|---------------------|-----------------------------------------------------|---------|
| variant   | 骨架屏的形状        | string: text / circle / rect / p / h1 / h3 / button / caption / image | text    |
| width     | 宽度                | string / number                                     | -       |
| height    | 高度                | string / number                                     | -       |
| size      | 圆形骨架的大小，相当于同时设置width和height | string / number                | -       |
| round     | 是否为圆角          | boolean                                             | false   |
| circle    | 是否为圆形          | boolean                                             | false   |
| active    | 是否展示动画效果    | boolean                                             | false   |

### 内置类型（variant）

- **text**: 文本行，默认样式
- **p**: 段落，比text略高
- **h1**: 大标题
- **h3**: 小标题
- **caption**: 说明文字
- **button**: 按钮
- **image**: 图片
- **circle**: 圆形
- **rect**: 矩形

### 样式自定义

组件支持通过style和class自定义样式：

```vue
<template>
  <zx-skeleton-item 
    variant="text" 
    style="width: 200px; margin-bottom: 8px;" 
    class="custom-skeleton-item"
  />
</template>
```

## 示例

### 不同形状组合

```vue
<template>
  <view class="skeleton-demo">
    <!-- 头像 + 文本 -->
    <view class="skeleton-item">
      <zx-skeleton-item variant="circle" :size="50" />
      <view class="skeleton-content">
        <zx-skeleton-item variant="h3" style="width: 150px; margin-bottom: 12px;" />
        <zx-skeleton-item variant="text" style="width: 240px;" />
      </view>
    </view>
    
    <!-- 图片 + 文本 -->
    <view class="skeleton-item">
      <zx-skeleton-item variant="image" :width="100" :height="100" />
      <view class="skeleton-content">
        <zx-skeleton-item variant="h3" style="width: 180px; margin-bottom: 12px;" />
        <zx-skeleton-item variant="text" style="width: 240px; margin-bottom: 8px;" />
        <zx-skeleton-item variant="text" style="width: 200px;" />
      </view>
    </view>
    
    <!-- 按钮 -->
    <view class="skeleton-item">
      <zx-skeleton-item variant="button" :width="120" :height="40" />
    </view>
  </view>
</template>

<style>
.skeleton-demo {
  padding: 20px;
}
.skeleton-item {
  display: flex;
  margin-bottom: 20px;
}
.skeleton-content {
  margin-left: 12px;
  flex: 1;
}
</style>
```

### 带动画效果

为骨架屏项添加动画效果，可以设置active属性：

```vue
<template>
  <zx-skeleton-item variant="text" :active="true" style="width: 200px;" />
</template>
```

## 兼容性

- 支持H5、App以及各主流小程序平台
- 低版本设备可能不支持部分动画效果
