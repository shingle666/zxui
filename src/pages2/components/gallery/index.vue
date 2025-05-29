<template>
  <view>
    <button @tap="openGallery">打开图片预览</button>
    <zx-gallery
      :urls="images"
      :show="showGallery"
      :current="current"
      :showDelete="true"
      @change="onChange"
      @delete="onDelete"
      @hide="onHide"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const images = ref([
  { src: 'https://cdn.mp.ac.cn/banner/01.jpg', desc: '图片1描述' },
  { src: 'https://cdn.mp.ac.cn/banner/02.jpg', desc: '图片2描述' },
  { src: 'https://cdn.mp.ac.cn/banner/03.jpg', desc: '图片3描述' }
]);
const showGallery = ref(false);
const current = ref(0);

function openGallery() {
  showGallery.value = true;
  current.value = 0;
}

function onChange(e) {
  current.value = e.current;
}

function onDelete(e) {
  images.value.splice(e.index, 1);
  if (images.value.length === 0) {
    showGallery.value = false;
  } else {
    current.value = 0;
  }
}

function onHide() {
  showGallery.value = false;
}
</script>

<style scoped>
button {
  margin: 40rpx;
}
</style> 