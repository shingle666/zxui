<template>
  <view class="container">
    <view class="header">
      <text class="title">Sidebar 侧边导航</text>
    </view>
    
    <view class="demo-section">
      <text class="section-title">基础用法</text>
      <view class="demo-box">
        <view class="sidebar-container">
          <zx-sidebar v-model="active1">
            <zx-sidebar-item title="标签名称" />
            <zx-sidebar-item title="标签名称" />
            <zx-sidebar-item title="标签名称" />
          </zx-sidebar>
          <view class="content-area">
            <text>当前选中: {{ active1 + 1 }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="demo-section">
      <text class="section-title">徽标提示</text>
      <view class="demo-box">
        <view class="sidebar-container">
          <zx-sidebar v-model="active2">
            <zx-sidebar-item title="标签名称" dot />
            <zx-sidebar-item title="标签名称" badge="5" />
            <zx-sidebar-item title="标签名称" />
          </zx-sidebar>
          <view class="content-area">
            <text>当前选中: {{ active2 + 1 }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="demo-section">
      <text class="section-title">禁用选项</text>
      <view class="demo-box">
        <view class="sidebar-container">
          <zx-sidebar v-model="active3">
            <zx-sidebar-item title="标签名称" />
            <zx-sidebar-item title="标签名称" disabled />
            <zx-sidebar-item title="标签名称" />
          </zx-sidebar>
          <view class="content-area">
            <text>当前选中: {{ active3 + 1 }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="demo-section">
      <text class="section-title">监听切换事件</text>
      <view class="demo-box">
        <view class="sidebar-container">
          <zx-sidebar v-model="active4" @change="onChange">
            <zx-sidebar-item title="标签名 1" />
            <zx-sidebar-item title="标签名 2" />
            <zx-sidebar-item title="标签名 3" />
          </zx-sidebar>
          <view class="content-area">
            <text>当前选中: {{ active4 + 1 }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="demo-section">
      <text class="section-title">自定义宽度和背景色</text>
      <view class="demo-box">
        <view class="sidebar-container">
          <zx-sidebar v-model="active5" width="100px" background="#f2f3f5">
            <zx-sidebar-item title="标签名称" />
            <zx-sidebar-item title="标签名称" />
            <zx-sidebar-item title="标签名称" />
          </zx-sidebar>
          <view class="content-area">
            <text>当前选中: {{ active5 + 1 }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <view class="demo-section">
      <text class="section-title">自定义标题内容</text>
      <view class="demo-box">
        <view class="sidebar-container">
          <zx-sidebar v-model="active6">
            <zx-sidebar-item>
              <template #title>
                <view class="custom-title">
                  <text class="custom-text">自定义</text>
                  <text class="custom-icon">🔥</text>
                </view>
              </template>
            </zx-sidebar-item>
            <zx-sidebar-item>
              <template #title>
                <view class="custom-title">
                  <text class="custom-text">标题</text>
                  <text class="custom-icon">⭐</text>
                </view>
              </template>
            </zx-sidebar-item>
            <zx-sidebar-item>
              <template #title>
                <view class="custom-title">
                  <text class="custom-text">内容</text>
                  <text class="custom-icon">🎉</text>
                </view>
              </template>
            </zx-sidebar-item>
          </zx-sidebar>
          <view class="content-area">
            <text>当前选中: {{ active6 + 1 }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import ZxSidebar from '../../components/zx-sidebar/zx-sidebar.vue';
import ZxSidebarItem from '../../components/zx-sidebar-item/zx-sidebar-item.vue';

// 基础用法
const active1 = ref(0);

// 徽标提示
const active2 = ref(0);

// 禁用选项
const active3 = ref(0);

// 监听切换事件
const active4 = ref(0);
const onChange = (index) => {
  uni.showToast({
    title: `标签名 ${index + 1}`,
    icon: 'none'
  });
};

// 自定义宽度和背景色
const active5 = ref(0);

// 自定义标题内容
const active6 = ref(0);
</script>

<style>
.container {
  padding: 20rpx;
}

.header {
  margin-bottom: 40rpx;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.demo-section {
  margin-bottom: 40rpx;
}

.section-title {
  font-size: 30rpx;
  color: #666;
  margin-bottom: 20rpx;
}

.demo-box {
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
}

.sidebar-container {
  display: flex;
  height: 300rpx;
}

.content-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20rpx;
}

.custom-title {
  display: flex;
  align-items: center;
}

.custom-text {
  margin-right: 8rpx;
}

.custom-icon {
  font-size: 24rpx;
}
</style>