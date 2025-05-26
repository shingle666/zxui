<template>
  <view class="demo-bar">
    <zx-charts-bar
      ref="barRef"
      :width="700"
      :legend="{ show: true, size: 24, color: '#333' }"
      :tooltip="true"
      :xAxis="xAxis"
      :yAxis="yAxis"
      :min="0"
      :max="100"
      :splitNumber="20"
      :splitLine="{ color: '#e3e3e3', type: 'dashed' }"
      :xAxisLineColor="'#e3e3e3'"
      :xAxisLabel="{ show: true, color: '#333', size: 24 }"
      :columnBarHeight="32"
      :yAxisTick="{ width: '12rpx', color: '#e3e3e3' }"
      :yAxisLine="{ color: '#e3e3e3', itemPadding: '30rpx 0' }"
      :yAxisLabel="{ show: true, color: '#333', size: 24 }"
      :yAxisVal="{ show: true, color: '#333', size: 24 }"
      :currentIndex="1"
      :isStack="false"
      :clickEffect="1"
      :columnCap="'round'"
      @click="onBarClick"
    />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import zxChartsBar from '@/components/zx-charts-bar/zx-charts-bar.vue';

const barRef = ref();
const xAxis = ['一月', '二月', '三月', '四月', '五月'];
const yAxis = ['A产品', 'B产品', 'C产品', 'D产品', 'E产品'];
const dataset = [
  {
    name: '销量',
    color: '#3b82f6',
    source: [30, 60, 80, 40, 50]
  },
  {
    name: '利润',
    color: '#f59e42',
    source: [20, 40, 60, 30, 35]
  }
];

function onBarClick(e) {
  uni.showToast({ title: `点击：${e.name} - ${e.val}`, icon: 'none' });
}

onMounted(() => {
  // 推荐在 onMounted 后调用 draw
  barRef.value.draw(dataset);
});
</script>

<style scoped>
.demo-bar {
  padding: 32rpx;
  background: #fff;
}
</style>
