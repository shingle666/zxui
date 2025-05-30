<template>
  <view class="demo-radar">
    <zx-charts-radar
      ref="radarRef"
      :legend="{ show: true, size: 24, color: '#333' }"
      :tooltip="true"
      :width="500"
      :splitNumber="5"
      :indicator="indicator"
      :label="{ show: true, color: '#bbb', size: 24 }"
      :axisLineColor="'#ddd'"
      :splitLineColor="'#eee'"
      :lineBold="false"
      @click="onRadarClick"
    />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const radarRef = ref();
const indicator = [
  { name: '活跃度', max: 100 },
  { name: '消费力', max: 100 },
  { name: '忠诚度', max: 100 },
  { name: '传播力', max: 100 },
  { name: '成长性', max: 100 }
];
const dataset = [
  {
    name: 'A类用户',
    color: '#3b82f6',
    source: [80, 90, 70, 60, 85]
  },
  {
    name: 'B类用户',
    color: '#f59e42',
    source: [60, 70, 80, 90, 60]
  }
];

function onRadarClick(e) {
  uni.showToast({ title: `点击：${e.datasetIndex !== undefined ? dataset[e.datasetIndex].name : ''}` });
}

onMounted(() => {
  // 推荐在 onMounted 后调用 draw
  radarRef.value.draw(dataset);
});
</script>

<style scoped>
.demo-radar {
  padding: 32rpx;
  background: #fff;
}
</style>
