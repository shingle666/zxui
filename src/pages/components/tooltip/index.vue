<template>
  <view class="demo-tooltip">
    <view class="demo-row">
      <zx-tooltip content="上方提示" placement="top">
        <button>上方</button>
      </zx-tooltip>
      <zx-tooltip content="下方提示" placement="bottom">
        <button>下方</button>
      </zx-tooltip>
      <zx-tooltip content="左侧提示" placement="left">
        <button>左侧</button>
      </zx-tooltip>
      <zx-tooltip content="右侧提示" placement="right">
        <button>右侧</button>
      </zx-tooltip>
    </view>
    <view class="demo-row">
      <zx-tooltip content="深色主题" effect="dark">
        <button>深色主题</button>
      </zx-tooltip>
      <zx-tooltip content="浅色主题" effect="light">
        <button>浅色主题</button>
      </zx-tooltip>
    </view>
    <view class="demo-row">
      <zx-tooltip placement="top">
        <template #content>
          <view>多行内容<br />第二行</view>
        </template>
        <button>自定义内容</button>
      </zx-tooltip>
    </view>
    <view class="demo-row">
      <zx-tooltip content="点击显示" trigger="click">
        <button>点击显示</button>
      </zx-tooltip>
      <zx-tooltip content="聚焦显示" trigger="focus">
        <input placeholder="聚焦显示提示" />
      </zx-tooltip>
    </view>
    <view class="demo-row">
      <zx-tooltip content="动态内容" :show-after="500" :hide-after="500">
        <button @click="changeContent">动态内容</button>
      </zx-tooltip>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';


function changeContent() {
  
}
</script>

<style scoped>
.demo-tooltip {
  padding: 32rpx;
}
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 32rpx;
  margin-bottom: 32rpx;
}
button, input {
  min-width: 120rpx;
  padding: 16rpx 32rpx;
  font-size: 28rpx;
  border-radius: 8rpx;
  border: 1rpx solid #eee;
  background: #fff;
}
</style> 