<template>
  <view class="demo-container">
    <view class="demo-block">
      <text class="demo-title">基础用法</text>
      <zx-more text="查看更多" color="#2979ff" size="32rpx" link="/pages/demo/index" linkType="navigateTo" iconName="arrow-right-double" />
    </view>

    <view class="demo-block">
      <text class="demo-title">禁用态</text>
      <zx-more text="不可点击" :disabled="true" />
    </view>

    <view class="demo-block">
      <text class="demo-title">加载态</text>
      <zx-more text="加载中..." :loading="true" />
    </view>

    <view class="demo-block">
      <text class="demo-title">自定义插槽</text>
      <zx-more>
        <template #prefix>
          <zx-icon name="star" color="#f90" size="28rpx" />
        </template>
        <template #default>
          <text>自定义内容</text>
        </template>
        <template #suffix>
          <zx-icon name="arrow-right" color="#2979ff" size="28rpx" />
        </template>
      </zx-more>
    </view>
  </view>
</template>

<script setup>
// 无需特殊逻辑
</script>

<style scoped>
.demo-container {
  padding: 24rpx;
}
.demo-block {
  margin-bottom: 40rpx;
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.04);
  padding: 24rpx;
}
.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 16rpx;
  display: block;
}
</style> 