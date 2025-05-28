<template>
  <view class="page">
    <zx-toast ref="toast" :show="show" :type="type" :message="message" :duration="duration" :position="position" :overlay="overlay" :icon="icon" :loading="loading" :customStyle="customStyle" />
    <view class="demo-btns">
      <button @click="showToast('普通提示')">普通提示</button>
      <button @click="showToast('成功', 'success')">成功</button>
      <button @click="showToast('失败', 'error')">失败</button>
      <button @click="showToast('警告', 'warning')">警告</button>
      <button @click="showToast('主要', 'primary')">主要</button>
      <button @click="showToast('加载中', 'loading', true)">加载中</button>
      <button @click="showToast('顶部显示', 'success', false, 'top')">顶部显示</button>
      <button @click="showToast('底部显示', 'success', false, 'bottom')">底部显示</button>
      <button @click="showToast('带遮罩', 'success', false, 'center', true)">带遮罩</button>
      <button @click="showToast('自定义图标', 'default', false, 'center', false, 'star')">自定义图标</button>
      <button @click="showManualToast">手动关闭</button>
    </view>
    <button v-if="manualShow" @click="hideManualToast" style="margin-top: 40rpx;">关闭手动Toast</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const show = ref(false);
const type = ref('default');
const message = ref('');
const duration = ref(2000);
const position = ref('center');
const overlay = ref(false);
const icon = ref('');
const loading = ref(false);
const customStyle = ref({});
const manualShow = ref(false);
const toast = ref(null);

function showToast(msg, t = 'default', isLoading = false, pos = 'center', ov = false, ic = '') {
  message.value = msg;
  type.value = t;
  loading.value = isLoading;
  position.value = pos;
  overlay.value = ov;
  icon.value = ic;
  duration.value = isLoading ? 0 : 2000;
  show.value = true;
}

function showManualToast() {
  manualShow.value = true;
  toast.value.show({
    message: '手动关闭Toast',
    type: 'primary',
    duration: 0,
    overlay: true,
    position: 'center',
  });
}

function hideManualToast() {
  manualShow.value = false;
  toast.value.hide();
}
</script>

<style scoped>
.page {
  padding: 32rpx;
}
.demo-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-bottom: 32rpx;
}
button {
  margin: 8rpx 0;
  padding: 16rpx 32rpx;
  font-size: 28rpx;
  border-radius: 8rpx;
  background: #f5f5f5;
  border: 1px solid #eee;
}
</style> 