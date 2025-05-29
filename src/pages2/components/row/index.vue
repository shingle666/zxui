<template>
  <view class="demo-container">
    <text class="title">基本用法</text>
    <zx-row>
      <view class="demo-col">A</view>
      <view class="demo-col">B</view>
      <view class="demo-col">C</view>
    </zx-row>

    <text class="title">带间隔（gutter）</text>
    <zx-row :gutter="32">
      <view class="demo-col">A</view>
      <view class="demo-col">B</view>
      <view class="demo-col">C</view>
    </zx-row>

    <text class="title">flex 布局，居中对齐</text>
    <zx-row type="flex" justify="center">
      <view class="demo-col">A</view>
      <view class="demo-col">B</view>
      <view class="demo-col">C</view>
    </zx-row>

    <text class="title">flex 布局，右对齐</text>
    <zx-row type="flex" justify="end">
      <view class="demo-col">A</view>
      <view class="demo-col">B</view>
      <view class="demo-col">C</view>
    </zx-row>

    <text class="title">flex 垂直居中</text>
    <zx-row type="flex" align="middle" style="height: 80rpx; background: #f5f5f5;">
      <view class="demo-col">A</view>
      <view class="demo-col">B</view>
      <view class="demo-col">C</view>
    </zx-row>
  </view>
</template>

<script setup>
// 无需额外逻辑
</script>

<style scoped>
.demo-container {
  padding: 24rpx;
}
.title {
  display: block;
  margin: 24rpx 0 12rpx 0;
  font-weight: bold;
  font-size: 32rpx;
}
.demo-col {
  background: #4fc08d;
  color: #fff;
  text-align: center;
  padding: 16rpx 0;
  margin-bottom: 8rpx;
  border-radius: 8rpx;
  flex: 1;
}
.zx-row {
  margin-bottom: 16rpx;
}
</style> 