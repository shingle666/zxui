<template>
  <view class="demo-wrap">
    <view class="demo-title">PK 组件 - 按钮模式</view>
    <zx-pk
      :title="['队伍A', '队伍B']"
      :btnName="'投票'"
      :status="status"
      :progress="[60, 40, '6000票', '4000票']"
      @choose="onChoose"
      style="margin-bottom: 40rpx;"
    />
    <button @click="toggleStatus" type="primary">切换模式</button>
    <view class="demo-title" style="margin-top: 40rpx;">PK 组件 - 进度条模式</view>
    <zx-pk
      :title="['队伍A', '队伍B']"
      :btnName="'投票'"
      status="progress"
      :progress="[60, 40, '6000票', '4000票']"
      style="margin-bottom: 40rpx;"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const status = ref('button');
const onChoose = (side) => {
  uni.showToast({ title: `你选择了${side === 'left' ? '队伍A' : '队伍B'}` });
};
const toggleStatus = () => {
  status.value = status.value === 'button' ? 'progress' : 'button';
};
</script>

<style scoped>
.demo-wrap {
  padding: 32rpx;
}
.demo-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 24rpx;
}
</style> 