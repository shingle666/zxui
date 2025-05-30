<template>
  <view class="col-demo">
    <view class="demo-title">基础用法</view>
    <zx-row :gutter="16">
      <zx-col :span="8"><view class="demo-box">8</view></zx-col>
      <zx-col :span="8"><view class="demo-box">8</view></zx-col>
      <zx-col :span="8"><view class="demo-box">8</view></zx-col>
    </zx-row>

    <view class="demo-title">分栏偏移</view>
    <zx-row :gutter="16">
      <zx-col :span="6"><view class="demo-box">6</view></zx-col>
      <zx-col :span="6" :offset="6"><view class="demo-box">6 offset 6</view></zx-col>
      <zx-col :span="6"><view class="demo-box">6</view></zx-col>
    </zx-row>

    <view class="demo-title">响应式布局</view>
    <zx-row :gutter="16">
      <zx-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <view class="demo-box">响应式1</view>
      </zx-col>
      <zx-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <view class="demo-box">响应式2</view>
      </zx-col>
      <zx-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
        <view class="demo-box">响应式3</view>
      </zx-col>
      <zx-col :xs="24" :sm="12" :md="8" :lg="6" :xl="12">
        <view class="demo-box">响应式4</view>
      </zx-col>
    </zx-row>

    <view class="demo-title">混合布局</view>
    <zx-row :gutter="16">
      <zx-col :span="8"><view class="demo-box">8</view></zx-col>
      <zx-col :span="8"><view class="demo-box">8</view></zx-col>
      <zx-col :span="4"><view class="demo-box">4</view></zx-col>
      <zx-col :span="4"><view class="demo-box">4</view></zx-col>
    </zx-row>
    <zx-row :gutter="16">
      <zx-col :span="4"><view class="demo-box">4</view></zx-col>
      <zx-col :span="16"><view class="demo-box">16</view></zx-col>
      <zx-col :span="4"><view class="demo-box">4</view></zx-col>
    </zx-row>
  </view>
</template>

<script setup>
// 无需js逻辑，全部为静态示例
</script>

<style scoped>
.col-demo {
  padding: 16rpx;
}
.demo-title {
  font-size: 32rpx;
  font-weight: bold;
  margin: 32rpx 0 16rpx 0;
}
.demo-box {
  background: #42b983;
  color: #fff;
  text-align: center;
  padding: 32rpx 0;
  border-radius: 8rpx;
  margin-bottom: 16rpx;
  font-size: 28rpx;
}
</style> 