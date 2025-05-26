<template>
  <view class="demo-cropper">
    <button @tap="chooseImage">选择图片</button>
    <view v-if="imageUrl" class="cropper-container">
      <zx-cropper
        ref="cropperRef"
        v-model:imageUrl="imageUrl"
        :width="280"
        :height="280"
        :isRound="isRound"
        :scaleRatio="2"
        :quality="0.9"
        :minScale="0.5"
        :maxScale="2"
        :custom="false"
        @cropper="onCropper"
        @ready="onReady"
        @imageLoad="onImageLoad"
        @initAngle="onInitAngle"
      />
    </view>
    <view v-if="resultUrl || resultBase64" class="result-container">
      <text>裁剪结果：</text>
      <image v-if="resultUrl" :src="resultUrl" mode="widthFix" style="width:140px;" />
      <image v-else-if="resultBase64" :src="'data:image/png;base64,'+resultBase64" mode="widthFix" style="width:140px;" />
    </view>
    <view class="options">
      <label><input type="checkbox" v-model="isRound" />圆形裁剪</label>
      <button @tap="resetCropper">重置</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import zxCropper from '@/components/zx-cropper/zx-cropper.vue';

const imageUrl = ref('');
const resultUrl = ref('');
const resultBase64 = ref('');
const isRound = ref(true);
const cropperRef = ref();

function chooseImage() {
  uni.chooseImage({
    count: 1,
    success: res => {
      imageUrl.value = res.tempFilePaths[0];
      resultUrl.value = '';
      resultBase64.value = '';
    }
  });
}

function onCropper(data) {
  resultUrl.value = data.url;
  resultBase64.value = data.base64;
  uni.showToast({ title: '裁剪完成', icon: 'success' });
}

function resetCropper() {
  cropperRef.value?.imageReset && cropperRef.value.imageReset();
}

function onReady() {
  // 组件初始化完成
}
function onImageLoad() {
  // 图片加载完成
}
function onInitAngle() {
  // 初始化角度
}
</script>

<style scoped>
.demo-cropper {
  padding: 20px;
}
.cropper-container {
  margin: 20px 0;
}
.result-container {
  margin: 20px 0;
}
.options {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}
</style> 