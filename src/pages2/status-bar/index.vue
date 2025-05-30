<template>
  <view class="page">
    <!-- 顶部标签栏 -->
    <view class="tabs">
      <view 
        v-for="(item, index) in tabs" 
        :key="index"
        :class="['tab-item', currentTab === index ? 'active' : '']"
        @click="switchTab(index)"
      >
        {{ item.name }}
      </view>
    </view>
    
    <!-- 内容区域 -->
    <swiper class="swiper-box" :current="currentTab" @change="onSwiperChange">
      <!-- 基础示例 -->
      <swiper-item>
        <scroll-view scroll-y class="scroll-view">
          <view class="demo-block">
            <view class="title">基础使用</view>
            <view class="demo-content">
              <view class="demo-card">
                <zx-status-bar></zx-status-bar>
                <view class="nav-bar basic">
                  <text>基础状态栏</text>
                </view>
                <view class="demo-code">默认透明背景</view>
              </view>
            </view>
            
            <view class="title">自定义背景色</view>
            <view class="demo-content">
              <view class="demo-card">
                <zx-status-bar backgroundColor="#007AFF"></zx-status-bar>
                <view class="nav-bar primary">
                  <text>蓝色状态栏</text>
                </view>
                <view class="demo-code">backgroundColor="#007AFF"</view>
              </view>
            </view>
            
            <view class="title">自定义层级</view>
            <view class="demo-content">
              <view class="demo-card">
                <zx-status-bar backgroundColor="#FF5A5F" :zIndex="1001"></zx-status-bar>
                <view class="nav-bar danger">
                  <text>高层级状态栏</text>
                </view>
                <view class="demo-code">:zIndex="1001"</view>
              </view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>

      <!-- 固定示例 -->
      <swiper-item>
        <scroll-view scroll-y class="scroll-view">
          <view class="demo-block">
            <view class="title">固定在顶部</view>
            <view class="demo-content">
              <view class="demo-card">
                <zx-status-bar :fixed="true" backgroundColor="#4CD964"></zx-status-bar>
                <view class="nav-bar success fixed">
                  <text>固定状态栏</text>
                </view>
                <view class="long-content">
                  <view class="hint">向上滚动查看效果</view>
                  <view class="paragraph" v-for="i in 20" :key="i">
                    这是第 {{i}} 行内容，状态栏和导航栏会固定在顶部不随页面滚动。
                  </view>
                </view>
                <view class="demo-code">:fixed="true"</view>
              </view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>

      <!-- 安全区域示例 -->
      <swiper-item>
        <scroll-view scroll-y class="scroll-view">
          <view class="demo-block">
            <view class="title">安全区域适配</view>
            <view class="demo-content">
              <view class="demo-card">
                <zx-status-bar :useSafe="true" backgroundColor="#FF9500"></zx-status-bar>
                <view class="nav-bar warning">
                  <text>使用安全区域</text>
                </view>
                <view class="demo-code">:useSafe="true"</view>
              </view>
            </view>
            
            <view class="title">禁用安全区域</view>
            <view class="demo-content">
              <view class="demo-card">
                <zx-status-bar :useSafe="false" backgroundColor="#FF9500"></zx-status-bar>
                <view class="nav-bar warning">
                  <text>禁用安全区域</text>
                </view>
                <view class="demo-code">:useSafe="false"</view>
              </view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>

      <!-- 综合示例 -->
      <swiper-item>
        <scroll-view scroll-y class="scroll-view">
          <view class="demo-block">
            <view class="title">自定义导航栏</view>
            <view class="demo-content">
              <view class="demo-card">
                <view class="custom-nav">
                  <zx-status-bar backgroundColor="#8A2BE2" :fixed="true"></zx-status-bar>
                  <view class="nav-content">
                    <view class="back-btn">
                      <text class="icon">←</text>
                    </view>
                    <text class="page-title">详情页</text>
                    <view class="placeholder"></view>
                  </view>
                </view>
                <view class="demo-body">
                  <view class="paragraph">这是一个完整的自定义导航栏示例</view>
                </view>
                <view class="demo-code">.custom-nav 包含状态栏和导航内容</view>
              </view>
            </view>
            
            <view class="title">沉浸式体验</view>
            <view class="demo-content">
              <view class="demo-card">
                <view class="immersive-container">
                  <!-- 透明状态栏，实现沉浸式效果 -->
                  <zx-status-bar :fixed="true" backgroundColor="transparent"></zx-status-bar>
                  
                  <!-- 背景图 -->
                  <image class="bg-image" src="https://cdn.mp.ac.cn/banner/01.jpg" mode="aspectFill"></image>
                  
                  <!-- 导航内容 -->
                  <view class="immersive-nav">
                    <view class="back-btn">
                      <text class="icon">←</text>
                    </view>
                    <text class="page-title">沉浸式标题</text>
                    <view class="placeholder"></view>
                  </view>
                  
                  <!-- 内容 -->
                  <view class="immersive-content">
                    <text class="immersive-title">沉浸式体验</text>
                    <text class="immersive-subtitle">背景图延伸到状态栏</text>
                  </view>
                </view>
                <view class="demo-code">透明状态栏 + 背景图全屏展示</view>
              </view>
            </view>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 标签页数据
const tabs = [
  { name: '基础' },
  { name: '固定' },
  { name: '安全区域' },
  { name: '综合' }
];

// 当前标签页
const currentTab = ref(0);

// 切换标签
function switchTab(index) {
  currentTab.value = index;
}

// 滑动切换
function onSwiperChange(e) {
  currentTab.value = e.detail.current;
}
</script>

<style>
.page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

/* 标签栏样式 */
.tabs {
  display: flex;
  background-color: #ffffff;
  padding: 0 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.tab-item {
  flex: 1;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 14px;
  color: #333;
  position: relative;
}

.tab-item.active {
  color: #007AFF;
  font-weight: bold;
}

.tab-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  width: 50%;
  height: 2px;
  background-color: #007AFF;
}

/* swiper样式 */
.swiper-box {
  flex: 1;
  height: 0;
}

.scroll-view {
  height: 100%;
}

/* 演示区块 */
.demo-block {
  padding: 10px;
}

.title {
  font-size: 16px;
  font-weight: bold;
  margin: 15px 0 10px;
  color: #333;
}

.demo-content {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.demo-card {
  position: relative;
  overflow: hidden;
}

.demo-code {
  padding: 8px 12px;
  background-color: #f8f8f8;
  font-family: Monaco, monospace;
  font-size: 12px;
  color: #666;
  border-top: 1px solid #eee;
}

/* 导航栏样式 */
.nav-bar {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  font-size: 16px;
}

.nav-bar.fixed {
  position: fixed;
  top: var(--status-bar-height, 20px);
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-bar.basic {
  background-color: #ffffff;
}

.nav-bar.primary {
  background-color: #007AFF;
  color: #ffffff;
}

.nav-bar.success {
  background-color: #4CD964;
  color: #ffffff;
}

.nav-bar.warning {
  background-color: #FF9500;
  color: #ffffff;
}

.nav-bar.danger {
  background-color: #FF5A5F;
  color: #ffffff;
}

/* 长内容 */
.long-content {
  padding: 15px;
  padding-top: 70px; /* 适应固定导航栏 */
}

.hint {
  text-align: center;
  color: #999;
  margin-bottom: 15px;
}

.paragraph {
  margin-bottom: 10px;
  line-height: 1.6;
  color: #333;
}

/* 自定义导航栏 */
.custom-nav {
  width: 100%;
}

.nav-content {
  height: 44px;
  background-color: #8A2BE2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}

.back-btn {
  width: 25px;
}

.icon {
  font-size: 18px;
  color: #ffffff;
}

.page-title {
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
}

.placeholder {
  width: 25px;
}

.demo-body {
  padding: 15px;
}

/* 沉浸式效果 */
.immersive-container {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.immersive-nav {
  position: relative;
  z-index: 10;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}

.immersive-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100% - 44px);
}

.immersive-title {
  font-size: 24px;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  font-weight: bold;
  margin-bottom: 5px;
}

.immersive-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
}
</style>
