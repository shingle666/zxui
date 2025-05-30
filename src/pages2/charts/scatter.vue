<template>
  <view class="demo-scatter">
    <zx-charts-scatter
      ref="scatterRef"
      :legend="{ show: true, size: 24, color: '#333' }"
      :tooltip="true"
      :xAxis="{ min: 0, max: 100, splitNumber: 20 }"
      :yAxis="{ min: 0, max: 100, splitNumber: 20 }"
      :xAxisLine="{ color: '#e3e3e3', itemGap: 100 }"
      :yAxisLine="{ color: '#e3e3e3', itemGap: 80 }"
      :xAxisTick="{ height: '12rpx', color: '#e3e3e3' }"
      :yAxisTick="{ width: '12rpx', color: '#e3e3e3' }"
      :xAxisLabel="{ color: '#333', size: 24 }"
      :yAxisLabel="{ color: '#333', size: 24 }"
      :splitLine="{ color: '#e3e3e3', type: 'dashed' }"
      @click="onScatterClick"
    />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const scatterRef = ref();
const dataset = [
  {
    name: 'A类样本',
    color: '#3b82f6',
    width: 18,
    source: [
      [10, 20, 'A1'],
      [30, 40, 'A2'],
      [50, 60, 'A3'],
      [70, 80, 'A4']
    ]
  },
  {
    name: 'B类样本',
    color: '#f59e42',
    width: 18,
    source: [
      [20, 30, 'B1'],
      [40, 50, 'B2'],
      [60, 70, 'B3'],
      [80, 90, 'B4']
    ]
  }
];

function onScatterClick(e) {
  const { datasetIndex, sourceIndex } = e;
  if (datasetIndex !== undefined && sourceIndex !== undefined) {
    const item = dataset[datasetIndex];
    const point = item.source[sourceIndex];
    uni.showToast({ title: `点击：${item.name} - ${point[2] || point[0] + ',' + point[1]}` });
  }
}

onMounted(() => {
  // 推荐在 onMounted 后调用 draw
  scatterRef.value.draw(dataset);
});
</script>

<style scoped>
.demo-scatter {
  padding: 32rpx;
  background: #fff;
}
</style>
