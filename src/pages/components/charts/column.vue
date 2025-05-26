<template>
  <view class="demo-column">
    <zx-charts-column
      ref="columnRef"
      :legend="{ show: true, size: 24, color: '#333' }"
      :tooltip="true"
      :xAxis="xAxis"
      :yAxis="yAxis"
      :currentIndex="2"
      :columnBarWidth="32"
      :splitLine="{ color: '#e3e3e3', type: 'dashed' }"
      :xAxisTick="{ height: '12rpx', color: '#e3e3e3' }"
      :xAxisLine="{ color: '#e3e3e3', itemPadding: '0 30rpx' }"
      :xAxisLabel="{ color: '#333', size: 24, height: 60 }"
      :xAxisVal="{ show: true, color: '#333', size: 24, height: 60 }"
      :min="0"
      :max="100"
      :splitNumber="20"
      :yAxisLine="{ color: '#e3e3e3', itemGap: 60 }"
      :yAxisLabel="{ show: true, color: '#333', size: 24 }"
      :scrollable="false"
      :isStack="false"
      :clickEffect="1"
      :columnCap="'round'"
      @click="onColumnClick"
    />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import zxChartsColumn from '@/components/zx-charts-column/zx-charts-column.vue';

const columnRef = ref();
const xAxis = ['一月', '二月', '三月', '四月', '五月'];
const yAxis = [];
const dataset = [
  {
    name: '访问量',
    color: '#3b82f6',
    source: [30, 60, 80, 40, 50]
  },
  {
    name: '下单量',
    color: '#f59e42',
    source: [20, 40, 60, 30, 35]
  }
];

function onColumnClick(e) {
  uni.showToast({ title: `点击：${e.name} - ${e.val}`, icon: 'none' });
}

onMounted(() => {
  // 推荐在 onMounted 后调用 draw
  columnRef.value.draw(dataset);
});
</script>

<style scoped>
.demo-column {
  padding: 32rpx;
  background: #fff;
}
</style>
