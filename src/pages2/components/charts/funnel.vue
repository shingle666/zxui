<template>
  <view class="demo-funnel">
    <zx-charts-funnel
      ref="funnelRef"
      :title="'转化漏斗'"
      :width="600"
      :height="500"
      :gap="8"
      :legend="{ show: true, size: 24, color: '#333', direction: 'vertical' }"
      :tooltip="true"
      :sort="'desc'"
      @click="onFunnelClick"
    />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const funnelRef = ref();
const funnelData = [
  { name: '访问', value: 1000, color: '#3b82f6' },
  { name: '注册', value: 800, color: '#34d399' },
  { name: '下单', value: 600, color: '#f59e42' },
  { name: '支付', value: 300, color: '#f43f5e' },
  { name: '复购', value: 100, color: '#6366f1' }
];

function onFunnelClick(e) {
  uni.showToast({ title: `点击：${e.name} - ${e.value}`, icon: 'none' });
}

onMounted(() => {
  // 推荐在 onMounted 后调用 draw
  funnelRef.value.draw(funnelData);
});
</script>

<style scoped>
.demo-funnel {
  padding: 32rpx;
  background: #fff;
}
</style>
