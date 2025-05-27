<template>
  <view class="container">
    <zx-turntable
      ref="turntableRef"
      :rewardNames="rewardNames"
      :rewardBGColors="rewardBGColors"
      :rewardColors="rewardColors"
      :fontSize="'32rpx'"
      :turns="6"
      :duration="4000"
      @end="onSpinEnd"
    />
    <button :disabled="isSpinning" @click="startSpin">开始抽奖</button>
    <view v-if="resultIndex !== null" class="result">恭喜你抽中：{{ rewardNames[resultIndex] }}</view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const rewardNames = ref(['一等奖', '二等奖', '三等奖', '四等奖', '五等奖', '六等奖']);
const rewardBGColors = ref(['#FFDF88', '#FFF1C4', '#FFDF88', '#FFF1C4', '#FFDF88', '#FFF1C4']);
const rewardColors = ref(['#C70000', '#8C0000', '#C70000', '#8C0000', '#C70000', '#8C0000']);

const turntableRef = ref(null);
const isSpinning = ref(false);
const resultIndex = ref(null);

function startSpin() {
  if (isSpinning.value) return;
  isSpinning.value = true;
  resultIndex.value = null;
  // 随机抽一个奖品
  const target = Math.floor(Math.random() * rewardNames.value.length);
  turntableRef.value.spinTo(target);
}

function onSpinEnd(index) {
  isSpinning.value = false;
  resultIndex.value = index;
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f7f7f7;
}
button {
  margin-top: 40rpx;
  padding: 20rpx 60rpx;
  font-size: 32rpx;
  background: #ffdf88;
  color: #c70000;
  border: none;
  border-radius: 16rpx;
}
.result {
  margin-top: 40rpx;
  font-size: 36rpx;
  color: #c70000;
}
</style>
