<template>
  <view class="demo-line">
    <zx-charts-line
      ref="lineRef"
      :width="700"
      :legend="{ show: true, size: 24, color: '#333' }"
      :tooltip="true"
      :xAxis="xAxis"
      :currentIndex="2"
      :splitLine="{ color: '#e3e3e3', type: 'dashed' }"
      :xAxisTick="{ height: '12rpx', color: '#e3e3e3' }"
      :xAxisLine="{ color: '#e3e3e3', itemGap: 120 }"
      :xAxisLabel="{ color: '#333', size: 24, height: 60 }"
      :xAxisVal="{ show: true, color: '#333', size: 24, height: 48 }"
      :yAxisSplitLine="{ color: 'transparent', type: 'dashed' }"
      :brokenDot="{ width: 12, color: '#F8F8F8' }"
      :brokenLineHeight="2"
      :min="0"
      :max="100"
      :splitNumber="20"
      :yAxisLine="{ color: '#e3e3e3', itemGap: 60 }"
      :yAxisLabel="{ show: true, color: '#333', size: 24 }"
      :scrollable="false"
      @click="onLineClick"
    />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import zxChartsLine from '@tanzhenxing/zx-charts-line/zx-charts-line.vue';

const lineRef = ref();
const xAxis = ['一月', '二月', '三月', '四月', '五月'];
const dataset = [
  {
    name: '访问量',
    color: '#3b82f6',
    source: [10, 20, 30, 40, 50]
  },
  {
    name: '下单量',
    color: '#f59e42',
    source: [20, 15, 35, 25, 45]
  }
];

function onLineClick(e) {
  uni.showToast({ title: `点击：${e.name} - ${e.val}`, icon: 'none' });
}

onMounted(() => {
  // 推荐在 onMounted 后调用 draw
  lineRef.value.draw(dataset);
});
</script>

<style scoped>
.demo-line {
  padding: 32rpx;
  background: #fff;
}
</style>
