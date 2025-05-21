<template>
  <view class="container">
    <view class="title">zx-badge 数字角标</view>
    <view class="subtitle">数字角标一般和其它控件配合使用，用于数量提示</view>

    <!-- 基础用法 -->
    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="section-content">
        <zx-badge text="12" class="badge-item">
          <button class="btn">评论</button>
        </zx-badge>
        <zx-badge text="3" class="badge-item">
          <button class="btn">回复</button>
        </zx-badge>
        <zx-badge text="1" type="primary" class="badge-item">
          <button class="btn">评论</button>
        </zx-badge>
        <zx-badge text="2" type="warning" class="badge-item">
          <button class="btn">回复</button>
        </zx-badge>
        <zx-badge text="1" bgColor="green" class="badge-item">
          <button class="btn">自定义背景色</button>
        </zx-badge>
      </view>
    </view>

    <!-- 最大值 -->
    <view class="section">
      <view class="section-title">最大值</view>
      <view class="section-content">
        <zx-badge text="200" :maxNum="99" class="badge-item">
          <button class="btn">评论</button>
        </zx-badge>
        <zx-badge text="100" :maxNum="10" class="badge-item">
          <button class="btn">回复</button>
        </zx-badge>
      </view>
    </view>

    <!-- 自定义显示内容 -->
    <view class="section">
      <view class="section-title">自定义显示内容</view>
      <view class="section-content">
        <zx-badge text="new" class="badge-item">
          <button class="btn">评论</button>
        </zx-badge>
        <zx-badge text="hot" class="badge-item">
          <button class="btn">回复</button>
        </zx-badge>
        <zx-badge text="VIP" type="success" class="badge-item">
          <button class="btn">会员</button>
        </zx-badge>
      </view>
    </view>

    <!-- 小红点 -->
    <view class="section">
      <view class="section-title">小红点</view>
      <view class="section-content">
        <zx-badge isDot class="badge-item">
          <button class="btn">提醒</button>
        </zx-badge>
        <zx-badge isDot type="primary" class="badge-item">
          <button class="btn">消息</button>
        </zx-badge>
        <zx-badge isDot type="success" class="badge-item">
          <button class="btn">通知</button>
        </zx-badge>
      </view>
    </view>

    <!-- 位置偏移 -->
    <view class="section">
      <view class="section-title">位置偏移</view>
      <view class="section-content">
        <zx-badge text="1" :offset="[10, 5]" class="badge-item">
          <button class="btn">右上偏移</button>
        </zx-badge>
        <zx-badge text="2" absolute="rightBottom" class="badge-item">
          <button class="btn">右下角</button>
        </zx-badge>
        <zx-badge text="3" absolute="leftTop" class="badge-item">
          <button class="btn">左上角</button>
        </zx-badge>
        <zx-badge text="4" absolute="leftBottom" class="badge-item">
          <button class="btn">左下角</button>
        </zx-badge>
      </view>
    </view>

    <!-- 自定义样式 -->
    <view class="section">
      <view class="section-title">自定义样式</view>
      <view class="section-content">
        <zx-badge text="99+" :badgeStyle="{ backgroundColor: '#ff6600', padding: '0 15rpx' }" class="badge-item">
          <button class="btn">自定义样式</button>
        </zx-badge>
        <zx-badge text="VIP" badgeClass="custom-badge" class="badge-item">
          <button class="btn">自定义类名</button>
        </zx-badge>
      </view>
    </view>

    <!-- 显示控制 -->
    <view class="section">
      <view class="section-title">显示控制</view>
      <view class="section-content">
        <zx-badge text="1" :hidden="isHidden" class="badge-item">
          <button class="btn">显示/隐藏</button>
        </zx-badge>
        <button @click="toggleHidden" class="toggle-btn">切换显示状态</button>
        
        <zx-badge text="0" :showZero="false" class="badge-item">
          <button class="btn">零值不显示</button>
        </zx-badge>
        <zx-badge text="0" :showZero="true" class="badge-item">
          <button class="btn">零值显示</button>
        </zx-badge>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const isHidden = ref(false);

const toggleHidden = () => {
  isHidden.value = !isHidden.value;
};
</script>

<style lang="scss" scoped>
.container {
  padding: 30rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.subtitle {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 40rpx;
}

.section {
  margin-bottom: 60rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 30rpx;
  position: relative;
  padding-left: 20rpx;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 8rpx;
    height: 30rpx;
    background-color: #2979ff;
    border-radius: 4rpx;
  }
}

.section-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.badge-item {
  margin-right: 30rpx;
  margin-bottom: 30rpx;
}

.btn {
  padding: 16rpx 30rpx;
  background-color: #f5f5f5;
  border: none;
  border-radius: 8rpx;
  font-size: 28rpx;
}

.toggle-btn {
  padding: 16rpx 30rpx;
  background-color: #2979ff;
  color: #fff;
  border: none;
  border-radius: 8rpx;
  font-size: 28rpx;
  margin: 0 30rpx;
}

.custom-badge {
  background: linear-gradient(to right, #ff9a9e, #fad0c4);
  font-weight: bold;
  padding: 0 15rpx;
}
</style>
