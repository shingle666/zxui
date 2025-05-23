<template>
  <div class="test-page">
    <view class="header">
      <text class="title">ZxWatermark 测试页面</text>
    </view>
    
    <!-- 简单测试 -->
    <view class="test-section">
      <view class="section-title">基础测试</view>
      <zx-watermark content="测试水印">
        <view class="test-content">
          <text>这是一个简单的测试内容</text>
          <text>用来验证水印组件是否正常工作</text>
        </view>
      </zx-watermark>
    </view>
    
    <!-- 多行测试 -->
    <view class="test-section">
      <view class="section-title">多行测试</view>
      <zx-watermark :content="['行1', '行2']">
        <view class="test-content">
          <text>这是多行水印测试</text>
        </view>
      </zx-watermark>
    </view>
    
    <!-- 自定义字体测试 -->
    <view class="test-section">
      <view class="section-title">自定义字体测试</view>
      <zx-watermark 
        content="自定义" 
        :font="{ color: 'rgba(255, 0, 0, 0.3)', fontSize: 20 }"
      >
        <view class="test-content">
          <text>红色水印测试</text>
        </view>
      </zx-watermark>
    </view>
  </div>
</template>

<script setup>
import ZxWatermark from '../../../components/zx-watermark/zx-watermark.vue'

defineOptions({
  name: 'ZxWatermarkTest'
})
</script>

<style lang="scss" scoped>
.test-page {
  padding: 20rpx;
  background: #f5f7fa;
  min-height: 100vh;
}

.header {
  text-align: center;
  padding: 40rpx;
  background: #409eff;
  color: white;
  border-radius: 20rpx;
  margin-bottom: 40rpx;
  
  .title {
    font-size: 36rpx;
    font-weight: 600;
  }
}

.test-section {
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 20rpx;
  border-bottom: 2rpx solid #409eff;
  padding-bottom: 10rpx;
}

.test-content {
  min-height: 300rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fafbfc;
  border-radius: 12rpx;
  padding: 40rpx;
  
  text {
    font-size: 28rpx;
    color: #333;
    margin-bottom: 20rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style> 