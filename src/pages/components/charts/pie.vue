<template>
  <view class="demo-pie">
    <zx-charts-pie
      ref="pieRef"
      :title="'用户分布'"
      :diam="500"
      :backgroundColor="'#fff'"
      :legend="{ show: true, size: 24, color: '#333', direction: 'vertical' }"
      :tooltip="true"
      :type="2"
      :annular="{ width: 220, backgroundColor: '#f8f8f8' }"
      @click="onPieClick"
    />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import zxChartsPie from '@/components/zx-charts-pie/zx-charts-pie.vue';

const pieRef = ref();
const pieData = [
  { name: 'A类用户', value: 40, color: '#3b82f6' },
  { name: 'B类用户', value: 30, color: '#34d399' },
  { name: 'C类用户', value: 20, color: '#f59e42' },
  { name: 'D类用户', value: 10, color: '#f43f5e' }
];

function onPieClick(e) {
  uni.showToast({ title: `点击：${e.name} - ${e.value}`, icon: 'none' });
}

onMounted(() => {
  // 推荐在 onMounted 后调用 draw
  pieRef.value.draw(pieData);
});
</script>

<style scoped>
.demo-pie {
  padding: 32rpx;
  background: #fff;
}
</style>
