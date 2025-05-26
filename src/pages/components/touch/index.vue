<template>
  <view class="container">
    <zx-touch
      style="width: 300rpx; height: 300rpx; background: #f5f5f5; border-radius: 16rpx; display: flex; align-items: center; justify-content: center; margin: 40rpx auto;"
      @tap="onTap"
      @swipe="onSwipe"
      @move="onMove"
      @scale="onScale"
      @end="onEnd"
      @start="onStart"
    >
      <text>请在此区域进行触摸操作</text>
    </zx-touch>
    <view class="log-area">
      <text v-for="(item, idx) in logs" :key="idx">{{ item }}</text>
    </view>
  </view>
</template>
<script setup>
import { ref } from 'vue';
import zxTouch from '@/components/zx-touch/zx-touch.vue';

const logs = ref([]);

function addLog(msg) {
  logs.value.unshift(msg);
  if (logs.value.length > 10) logs.value.length = 10;
}

function onTap(e) {
  addLog('点击事件 tap');
}
function onSwipe(direction) {
  addLog('滑动事件 swipe: ' + direction);
}
function onMove(e) {
  addLog('移动事件 move: dx=' + e.dx + ', dy=' + e.dy);
}
function onScale(scale) {
  addLog('缩放事件 scale: ' + scale);
}
function onEnd(e) {
  addLog('结束事件 end: ' + JSON.stringify(e));
}
function onStart(e) {
  addLog('开始事件 start');
}
</script>
<style scoped>
.container {
  padding: 32rpx;
}
.log-area {
  margin-top: 40rpx;
  background: #fffbe6;
  border-radius: 8rpx;
  padding: 16rpx;
  min-height: 200rpx;
  font-size: 24rpx;
  color: #666;
}
</style> 