<template>
  <view class="tips-demo-container">
    <zx-tips ref="tipsTop" position="top" />
    <zx-tips ref="tipsCenter" position="center" />
    <zx-tips ref="tipsBottom" position="bottom" />
    <view class="tips-demo-btns">
      <button @click="showTop">顶部提示</button>
      <button @click="showCenter">中部提示</button>
      <button @click="showBottom">底部提示</button>
      <button @click="showCustom">自定义样式</button>
      <button @click="showQueue">消息队列</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const tipsTop = ref();
const tipsCenter = ref();
const tipsBottom = ref();

function showTop() {
  tipsTop.value.show('顶部提示，2秒后消失');
}
function showCenter() {
  tipsCenter.value.show({ msg: '中部提示，3秒', duration: 3000 });
}
function showBottom() {
  tipsBottom.value.show({ msg: '底部提示，4秒', duration: 4000 });
}
function showCustom() {
  tipsTop.value.show({ msg: '自定义颜色', duration: 2500 });
}
function showQueue() {
  tipsTop.value.show('队列1');
  tipsTop.value.show('队列2');
  tipsTop.value.show({ msg: '队列3', duration: 1500 });
}
</script>

<style scoped>
.tips-demo-container {
  padding: 40rpx;
}
.tips-demo-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  margin-top: 60rpx;
}
button {
  padding: 18rpx 40rpx;
  font-size: 30rpx;
  border-radius: 8rpx;
  background: #f5f5f5;
  color: #333;
  border: none;
}
</style> 