# zx-skeleton 骨架屏组件

在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

## 基础用法

```vue
<template>
  <zx-skeleton :loading="loading" />
</template>

<script setup>
import { ref } from 'vue'
const loading = ref(true)
</script>
```

## 更多参数

可以配置骨架屏段落数量，以便更接近真实渲染效果：

```vue
<template>
  <zx-skeleton :loading="loading" :rows="5" />
</template>
```

## 动画效果

开启动画效果，所有的骨架元素将显示流光动画：

```vue
<template>
  <zx-skeleton :loading="loading" :rows="3" animated />
</template>
```

## 自定义样式

使用具名插槽 `template` 来自定义骨架屏模板：

```vue
<template>
  <zx-skeleton :loading="loading" animated>
    <template #template>
      <zx-skeleton-item variant="image" :width="'240rpx'" :height="'240rpx'" animated />
      <view style="padding: 14rpx">
        <zx-skeleton-item variant="h3" :width="'50%'" animated />
        <view style="margin-top: 16rpx;">
          <zx-skeleton-item variant="text" animated />
          <zx-skeleton-item variant="text" :width="'60%'" animated />
        </view>
      </view>
    </template>
  </zx-skeleton>
</template>
```

## 加载状态

当 `loading` 结束之后，显示真实的内容：

```vue
<template>
  <zx-skeleton :loading="loading" animated>
    <template #template>
      <!-- 骨架屏模板 -->
      <zx-skeleton-item variant="image" :width="'240rpx'" :height="'240rpx'" animated />
      <!-- ... -->
    </template>
    <template #default>
      <!-- 真实内容 -->
      <view class="content">这里是真实的内容</view>
    </template>
  </zx-skeleton>
</template>
```

## 渲染多条数据

利用 `count` 属性控制渲染多少条骨架数据：

```vue
<template>
  <zx-skeleton :loading="loading" animated :count="3">
    <template #template>
      <view class="list-item">
        <zx-skeleton-item variant="circle" :size="80" animated />
        <view class="content">
          <zx-skeleton-item variant="h3" :width="'60%'" animated />
          <zx-skeleton-item variant="text" animated />
        </view>
      </view>
    </template>
  </zx-skeleton>
</template>
```

## 防止渲染抖动

使用 `throttle` 控制切换时的平滑过渡：

```vue
<template>
  <zx-skeleton 
    :loading="loading" 
    animated 
    :throttle="{ leading: 500, trailing: 500, initVal: true }"
  >
    <!-- ... -->
  </zx-skeleton>
</template>
```

## API

### Skeleton Props

| 属性名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| loading | 是否显示骨架屏 | Boolean | true |
| animated | 是否显示动画 | Boolean | false |
| count | 渲染多少个模板 | Number | 1 |
| rows | 骨架屏段落数量 | Number | 3 |
| throttle | 渲染延迟控制 | Number \| Object | 0 |

#### throttle 详细说明

- **Number**: 简单延迟毫秒数
- **Object**: 复杂配置
  - `leading`: 显示时的延迟（毫秒）
  - `trailing`: 隐藏时的延迟（毫秒）
  - `initVal`: 初始显示状态

### Skeleton Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击骨架屏时触发 | - |

### Skeleton Slots

| 插槽名 | 说明 |
|--------|------|
| default | 真正渲染的DOM |
| template | 渲染骨架屏模板的内容 |

### SkeletonItem Props

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| variant | 当前渲染的骨架屏类型 | String | text/h1/h3/p/image/circle/rect/button | text |
| width | 宽度 | String \| Number | - | - |
| height | 高度 | String \| Number | - | - |
| size | 尺寸（用于circle等正方形元素） | String \| Number | - | - |
| animated | 是否开启动画效果 | Boolean | - | false |

## 骨架元素类型

### text
文本骨架，默认高度 32rpx，圆角 16rpx

### h1
一级标题骨架，默认高度 40rpx，宽度 50%

### h3
三级标题骨架，默认高度 36rpx，宽度 40%

### p
段落骨架，默认高度 32rpx，宽度 100%

### image
图片骨架，默认高度 200rpx，圆角 8rpx

### circle
圆形骨架，使用 size 属性控制大小

### rect
矩形骨架，默认高度 200rpx

### button
按钮骨架，默认高度 64rpx，宽度 120rpx

## 注意事项

1. 推荐将 `count` 值保持在较小的数字，避免性能问题
2. 在构建自定义骨架时，应尽可能接近真正的DOM结构，避免高度差导致的抖动
3. 使用 `throttle` 可以有效改善加载状态切换时的用户体验
4. 记得在自定义模板中为 `zx-skeleton-item` 传递 `animated` 属性以保持动画一致性
