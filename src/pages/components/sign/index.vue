<template>
  <view class="sign-demo">
    <zx-sign
      ref="signRef"
      :canvas-id="'mySignDemo'"
      :width="'600rpx'"
      :height="'300rpx'"
      :background-color="'#fff'"
      :line-color="'#007AFF'"
      :line-size="'8rpx'"
      @change="onSignChange"
      @confirm="onSignConfirm"
    />
    <view class="sign-demo-btns">
      <button type="primary" @click="confirmSign">确认签名</button>
      <button type="warn" @click="resetSign">重置签名</button>
    </view>
    <view v-if="signImg" class="sign-demo-img">
      <text>签名图片预览：</text>
      <image :src="signImg" mode="widthFix" style="width: 300px; border: 1px solid #eee;" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const signRef = ref(null)
const signImg = ref('')

function onSignChange(e) {
  // e.tempFilePath 为签名图片临时路径
  // console.log('签名变更', e)
}
function onSignConfirm(img) {
  signImg.value = img
  uni.showToast({ title: '签名已确认', icon: 'success' })
}
function confirmSign() {
  signRef.value && signRef.value.confirm && signRef.value.confirm()
}
function resetSign() {
  signRef.value && signRef.value.canvasInit && signRef.value.canvasInit()
  signImg.value = ''
}
</script>

<style scoped>
.sign-demo {
  padding: 32rpx;
}
.sign-demo-btns {
  margin-top: 32rpx;
  display: flex;
  gap: 24rpx;
}
.sign-demo-img {
  margin-top: 32rpx;
}
</style> 