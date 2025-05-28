<template>
  <view class="demo-container">
    <!-- 基础用法 -->
    <zx-sms-code ref="codeRef" @start="handleStart" @end="handleEnd" />

    <!-- 自定义按钮内容（插槽用法） -->
    <zx-sms-code v-slot="{ text, canGetCode, start }">
      <button :disabled="!canGetCode" @click="start" class="custom-btn">{{ text }}</button>
    </zx-sms-code>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const codeRef = ref(null);

function handleStart() {
  uni.showToast({ title: '开始倒计时', icon: 'none' });
}

function handleEnd() {
  uni.showToast({ title: '倒计时结束', icon: 'none' });
}
</script>

<style scoped>
.demo-container {
  padding: 24px;
}
.custom-btn {
  padding: 8px 16px;
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}
</style>
