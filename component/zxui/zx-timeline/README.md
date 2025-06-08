# zx-timeline 时间轴组件

基于 uni-app 的跨端时间轴组件，支持 H5、小程序、App。参考 [Element Plus Timeline](https://element-plus.org/zh-CN/component/timeline.html)。

## 组件说明

- `zx-timeline`：时间轴容器。
- `zx-timeline-item`：时间轴节点，支持自定义颜色、尺寸、图标、时间戳、空心节点等。

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
import zxTimeline from '@/components/zx-timeline/zx-timeline.vue'
import zxTimelineItem from '@/components/zx-timeline/zx-timeline-item.vue'
const list = [
  { content: '事件一', timestamp: '2023-01-01' },
  { content: '事件二', timestamp: '2023-01-02' },
  { content: '事件三', timestamp: '2023-01-03' },
]
</script>
```

## 属性说明（zx-timeline-item）

| 属性名           | 说明           | 类型    | 默认值    |
|----------------|--------------|--------|---------|
| timestamp      | 时间戳         | string | ''      |
| hideTimestamp  | 隐藏时间戳      | bool   | false   |
| center         | 垂直居中        | bool   | false   |
| placement      | 时间戳位置      | string | bottom  | 取值：'top'/'bottom' |
| type           | 节点类型        | string | ''      | 可选：primary/success/warning/danger/info |
| color          | 节点颜色        | string | ''      |
| size           | 节点尺寸        | string | normal  | 可选：normal/large |
| icon           | 自定义图标      | string | ''      | 传入 icon class 或 unicode |
| hollow         | 是否空心点      | bool   | false   |

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
- 兼容 uni-app H5、小程序、App 平台。

## 组件注册

```js
import zxTimeline from '@/components/zx-timeline/zx-timeline.vue'
import zxTimelineItem from '@/components/zx-timeline/zx-timeline-item.vue'
export default {
  components: { zxTimeline, zxTimelineItem }
}
```
