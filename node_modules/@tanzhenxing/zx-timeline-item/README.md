# zx-timeline-item 时间轴节点组件

## 介绍

`zx-timeline-item` 是时间轴的节点组件，需要配合 `zx-timeline` 容器组件一起使用。支持自定义节点颜色、尺寸、图标、时间戳位置等，适用于展示时间流信息，如时间进度、操作记录等。

## 引入方式

```vue
<script setup>
import ZxTimeline from '@/components/zx-timeline/zx-timeline.vue';
import ZxTimelineItem from '@/components/zx-timeline-item/zx-timeline-item.vue';
</script>

<template>
  <ZxTimeline>
    <ZxTimelineItem timestamp="2023-01-01">事件内容</ZxTimelineItem>
  </ZxTimeline>
</template>
```

## 基本用法

```vue
<template>
  <zx-timeline>
    <zx-timeline-item
      v-for="(item, idx) in list"
      :key="idx"
      :timestamp="item.timestamp"
    >
      {{ item.content }}
    </zx-timeline-item>
  </zx-timeline>
</template>

<script setup>
import ZxTimeline from '@/components/zx-timeline/zx-timeline.vue';
import ZxTimelineItem from '@/components/zx-timeline-item/zx-timeline-item.vue';

const list = [
  { content: '事件一', timestamp: '2023-01-01' },
  { content: '事件二', timestamp: '2023-01-02' },
  { content: '事件三', timestamp: '2023-01-03' },
];
</script>
```

## 属性说明

| 属性名 | 说明 | 类型 | 默认值 |
|-------|------|------|--------|
| timestamp | 时间戳 | string | '' |
| hideTimestamp | 隐藏时间戳 | boolean | false |
| center | 垂直居中 | boolean | false |
| placement | 时间戳位置 | string | 'bottom' | 可选值：'top'/'bottom' |
| type | 节点类型 | string | '' | 可选值：'primary'/'success'/'warning'/'danger'/'info' |
| color | 节点颜色 | string | '' | 自定义颜色值，如 '#0bbd87' |
| size | 节点尺寸 | string | 'normal' | 可选值：'normal'/'large' |
| icon | 自定义图标 | string | '' | 传入 icon class 或 unicode |
| hollow | 是否空心点 | boolean | false |

## 插槽

- 默认插槽：节点内容
- dot：自定义节点图标内容

## 进阶用法

### 自定义节点样式

```vue
<zx-timeline>
  <zx-timeline-item
    type="primary"
    size="large"
    icon="iconfont icon-star"
    timestamp="2023-01-01 10:00"
  >自定义图标</zx-timeline-item>
  <zx-timeline-item color="#0bbd87" timestamp="2023-01-02">自定义颜色</zx-timeline-item>
  <zx-timeline-item size="large" timestamp="2023-01-03">自定义尺寸</zx-timeline-item>
  <zx-timeline-item hollow type="primary" timestamp="2023-01-04">空心节点</zx-timeline-item>
  <zx-timeline-item timestamp="2023-01-05">默认节点</zx-timeline-item>
</zx-timeline>
```

### 自定义时间戳位置

```vue
<zx-timeline>
  <zx-timeline-item timestamp="2023/01/01" placement="top">
    <view>内容在下方，时间戳在上方</view>
  </zx-timeline-item>
</zx-timeline>
```

### 使用 dot 插槽自定义节点

```vue
<zx-timeline>
  <zx-timeline-item timestamp="2023-01-01">
    <template #dot>
      <image src="/static/star.png" style="width:24rpx;height:24rpx;" />
    </template>
    自定义图片节点
  </zx-timeline-item>
</zx-timeline>
```

## 注意事项

- 组件样式采用 rpx 单位，适配多端。
- 图标可用 iconfont 或自定义图片。
- 必须在 `zx-timeline` 容器内使用。
- 兼容 uni-app H5、小程序、App 平台。