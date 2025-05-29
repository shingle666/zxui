<template>
  <view class="tabbar-item-demo">
    <view class="section">
      <text class="title">基础用法</text>
      <zx-tabbar-item text="首页" icon="home" :active="true" />
      <zx-tabbar-item text="放映厅" icon="photo" />
    </view>
    <view class="section">
      <text class="title">徽标与圆点</text>
      <zx-tabbar-item text="消息" icon="message" badge="8" />
      <zx-tabbar-item text="通知" icon="bell" dot />
    </view>
    <view class="section">
      <text class="title">自定义颜色</text>
      <zx-tabbar-item text="激活" icon="star" :active="true" activeColor="#d81e06" inactiveColor="#999" />
      <zx-tabbar-item text="未激活" icon="star" :active="false" activeColor="#d81e06" inactiveColor="#999" />
    </view>
    <view class="section">
      <text class="title">点击事件</text>
      <zx-tabbar-item text="点击我" icon="like" @click="onClick" name="like" />
    </view>
  </view>
</template>

<script setup>
function onClick(name) {
  uni.showToast({ title: `点击了：${name}`, icon: 'none' });
}
</script>

<style scoped>
.tabbar-item-demo {
  padding: 32rpx;
}
.section {
  margin-bottom: 40rpx;
  background: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32rpx;
}
.title {
  font-size: 28rpx;
  font-weight: bold;
  margin-right: 32rpx;
  min-width: 160rpx;
}
</style> 