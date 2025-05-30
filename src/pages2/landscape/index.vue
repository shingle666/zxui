<template>
  <view class="demo-container">
    <button @tap="show1 = true">基础用法</button>
    <button @tap="show2 = true">自定义关闭图标位置</button>
    <button @tap="show3 = true">自定义遮罩颜色</button>
    <button @tap="show4 = true">禁止点击遮罩关闭</button>

    <!-- 基础用法 -->
    <zx-landscape v-model:show="show1" @close="onClose('show1', $event)">
      <view class="demo-content">这是基础用法内容</view>
    </zx-landscape>

    <!-- 自定义关闭图标位置 -->
    <zx-landscape
      v-model:show="show2"
      :position="2"
      iconTop="20rpx"
      iconRight="20rpx"
      @close="onClose('show2', $event)"
    >
      <view class="demo-content">右上角关闭图标</view>
    </zx-landscape>

    <!-- 自定义遮罩颜色 -->
    <zx-landscape
      v-model:show="show3"
      maskBgColor="rgba(255,0,0,0.3)"
      @close="onClose('show3', $event)"
    >
      <view class="demo-content">自定义遮罩颜色</view>
    </zx-landscape>

    <!-- 禁止点击遮罩关闭 -->
    <zx-landscape
      v-model:show="show4"
      :maskClosable="false"
      @close="onClose('show4', $event)"
    >
      <view class="demo-content">点击遮罩不会关闭</view>
    </zx-landscape>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);

function onClose(key, e) {
  if (key === 'show1') show1.value = false;
  if (key === 'show2') show2.value = false;
  if (key === 'show3') show3.value = false;
  if (key === 'show4') show4.value = false;
  // 你可以在这里处理 e.params
}
</script>

<style scoped>
.demo-container {
  padding: 32rpx;
}
button {
  margin: 16rpx 0;
  display: block;
}
.demo-content {
  min-width: 400rpx;
  min-height: 200rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 16rpx;
  font-size: 32rpx;
  color: #333;
}
</style> 