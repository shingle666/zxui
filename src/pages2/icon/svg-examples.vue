<template>
  <view class="svg-examples">
    <view class="example-section">
      <text class="section-title">SVG字符串示例</text>
      <view class="icon-row">
        <zx-icon 
          :name="svgString" 
          size="60rpx" 
          @svgLoad="onSvgLoad"
          @svgError="onSvgError"
        ></zx-icon>
        <text class="label">SVG字符串</text>
      </view>
    </view>
    
    <view class="example-section">
      <text class="section-title">SVG文件路径示例</text>
      <view class="icon-row">
        <zx-icon 
          name="/static/icons/example.svg" 
          size="60rpx"
          @svgLoad="onSvgLoad"
          @svgError="onSvgError"
        ></zx-icon>
        <text class="label">SVG文件</text>
      </view>
    </view>
    
    <view class="example-section">
      <text class="section-title">复杂SVG示例</text>
      <view class="icon-row">
        <zx-icon 
          :name="complexSvg" 
          size="80rpx"
          @svgLoad="onSvgLoad"
          @svgError="onSvgError"
        ></zx-icon>
        <text class="label">复杂SVG</text>
      </view>
    </view>
    
    <view class="example-section">
      <text class="section-title">错误处理示例</text>
      <view class="icon-row">
        <zx-icon 
          name="<invalid-svg>" 
          size="60rpx"
          @svgError="onSvgError"
        ></zx-icon>
        <text class="label">无效SVG</text>
      </view>
    </view>
    
    <view class="example-section">
      <text class="section-title">动态SVG示例</text>
      <view class="icon-row">
        <zx-icon 
          :name="dynamicSvg" 
          size="60rpx"
          :color="svgColor"
          @click="changeSvgColor"
        ></zx-icon>
        <text class="label">点击改变颜色</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 简单SVG字符串
const svgString = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// 复杂SVG示例
const complexSvg = `<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4ecdc4;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="40" fill="url(#grad1)" />
  <text x="50" y="55" font-family="Arial" font-size="16" fill="white" text-anchor="middle">SVG</text>
</svg>`;

// 动态SVG颜色
const svgColor = ref('#3498db');
const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
let colorIndex = 0;

// 动态SVG（使用currentColor）
const dynamicSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor"/>
</svg>`;

// 事件处理
const onSvgLoad = (e) => {
  console.log('SVG加载成功:', e);
  uni.showToast({
    title: 'SVG加载成功',
    icon: 'success',
    duration: 1000
  });
};

const onSvgError = (e) => {
  console.error('SVG加载失败:', e);
  uni.showToast({
    title: 'SVG加载失败',
    icon: 'error',
    duration: 1000
  });
};

const changeSvgColor = () => {
  colorIndex = (colorIndex + 1) % colors.length;
  svgColor.value = colors[colorIndex];
};
</script>

<style lang="scss" scoped>
.svg-examples {
  padding: 40rpx;
  
  .example-section {
    margin-bottom: 60rpx;
    
    .section-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
      display: block;
    }
    
    .icon-row {
      display: flex;
      align-items: center;
      padding: 20rpx;
      background-color: #f8f9fa;
      border-radius: 12rpx;
      border: 1px solid #e9ecef;
      
      .label {
        margin-left: 20rpx;
        font-size: 28rpx;
        color: #666;
      }
    }
  }
}
</style>