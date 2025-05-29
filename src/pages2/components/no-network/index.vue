<template>
  <view class="demo-container">
    <zx-no-network
      :tips="'网络不可用，请检查设置'"
      :zIndex="2000"
      image="/static/no-network.png"
      @retry="onRetry"
      @connected="onConnected"
      @disconnected="onDisconnected"
    />
    <view class="demo-status">
      <text>当前网络状态：{{ isConnected ? '已连接' : '无网络' }}</text>
      <text>网络类型：{{ networkType }}</text>
    </view>
    <view class="demo-btns">
      <button @click="mockDisconnect">模拟断网</button>
      <button @click="mockConnect">模拟联网</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const isConnected = ref(true);
const networkType = ref('wifi');

function onRetry() {
  uni.showToast({ title: '重试被点击', icon: 'none' });
}
function onConnected() {
  isConnected.value = true;
  networkType.value = 'wifi';
  uni.showToast({ title: '网络已连接', icon: 'success' });
}
function onDisconnected() {
  isConnected.value = false;
  networkType.value = 'none';
  uni.showToast({ title: '网络断开', icon: 'error' });
}
// 以下为演示用，实际项目无需模拟
function mockDisconnect() {
  onDisconnected();
}
function mockConnect() {
  onConnected();
}
</script>

<style scoped>
.demo-container {
  padding: 24rpx;
}
.demo-status {
  margin: 32rpx 0 16rpx 0;
  font-size: 28rpx;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}
.demo-btns {
  display: flex;
  gap: 24rpx;
}
.demo-btns button {
  flex: 1;
  background: #f5f5f5;
  border: 1px solid #eee;
  color: #333;
}
</style> 