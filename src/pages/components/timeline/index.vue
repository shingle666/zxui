<template>
  <view class="demo-timeline">
    <view class="demo-title">基础用法</view>
    <zx-timeline>
      <zx-timeline-item
        v-for="(item, idx) in baseList"
        :key="idx"
        :timestamp="item.timestamp"
      >
        {{ item.content }}
      </zx-timeline-item>
    </zx-timeline>

    <view class="demo-title">自定义节点样式</view>
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

    <view class="demo-title">自定义时间戳位置</view>
    <zx-timeline>
      <zx-timeline-item timestamp="2023/01/01" placement="top">
        <view>内容在下方，时间戳在上方</view>
      </zx-timeline-item>
    </zx-timeline>

    <view class="demo-title">dot 插槽自定义节点</view>
    <zx-timeline>
      <zx-timeline-item timestamp="2023-01-01">
        <template #dot>
          <image src="/static/star.png" style="width:24rpx;height:24rpx;" />
        </template>
        自定义图片节点
      </zx-timeline-item>
    </zx-timeline>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const baseList = [
  { content: '事件一', timestamp: '2023-01-01' },
  { content: '事件二', timestamp: '2023-01-02' },
  { content: '事件三', timestamp: '2023-01-03' },
]
</script>

<style scoped>
.demo-timeline {
  padding: 32rpx;
}
.demo-title {
  font-size: 32rpx;
  font-weight: bold;
  margin: 32rpx 0 16rpx 0;
}
</style>
