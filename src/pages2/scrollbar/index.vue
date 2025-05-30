<template>
  <view class="container">
    <view class="title">zx-scrollbar 滚动条组件</view>
    
    <!-- 基础用法 -->
    <view class="section">
      <view class="section-title">基础用法</view>
      <view class="section-desc">通过 height 属性设置滚动条高度</view>
      <zx-scrollbar height="400rpx" class="demo-scrollbar">
        <view 
          v-for="item in 20" 
          :key="item" 
          class="scrollbar-demo-item"
        >
          基础滚动项目 {{ item }}
        </view>
      </zx-scrollbar>
    </view>
    
    <!-- 横向滚动 -->
    <view class="section">
      <view class="section-title">横向滚动</view>
      <view class="section-desc">当元素宽度大于滚动条宽度时，会显示横向滚动条</view>
      <zx-scrollbar class="demo-scrollbar" height="200rpx" :scroll-y="false">
        <view class="scrollbar-flex-content">
          <view 
            v-for="item in 20" 
            :key="item" 
            class="scrollbar-demo-item horizontal-item"
          >
            {{ item }}
          </view>
        </view>
      </zx-scrollbar>
    </view>
    
    <!-- 最大高度 -->
    <view class="section">
      <view class="section-title">最大高度</view>
      <view class="section-desc">当元素高度超过最大高度，才会显示滚动条</view>
      <view class="button-group">
        <button @click="addItem" class="mini-btn primary">添加项目</button>
        <button @click="deleteItem" class="mini-btn danger">删除项目</button>
      </view>
      <zx-scrollbar max-height="300rpx" class="demo-scrollbar">
        <view 
          v-for="item in count" 
          :key="item" 
          class="scrollbar-demo-item"
        >
          动态项目 {{ item }}
        </view>
      </zx-scrollbar>
    </view>
    
    <!-- 手动滚动 -->
    <view class="section">
      <view class="section-title">手动滚动</view>
      <view class="section-desc">通过 setScrollTop 方法手动控制滚动位置</view>
      <zx-scrollbar 
        ref="scrollbarRef" 
        height="300rpx" 
        always 
        @scroll="onScroll"
        class="demo-scrollbar"
      >
        <view>
          <view 
            v-for="item in 15" 
            :key="item" 
            class="scrollbar-demo-item"
          >
            手动滚动项目 {{ item }}
          </view>
        </view>
      </zx-scrollbar>
      
      <view class="control-panel">
        <view class="control-label">滚动位置: {{ scrollValue }}px</view>
        <view class="control-buttons">
          <button @click="scrollToTop" class="control-btn">滚动到顶部</button>
          <button @click="scrollToMiddle" class="control-btn">滚动到中间</button>
          <button @click="scrollToBottom" class="control-btn">滚动到底部</button>
        </view>
      </view>
    </view>
    
    <!-- 原生滚动条 -->
    <view class="section">
      <view class="section-title">原生滚动条</view>
      <view class="section-desc">使用原生滚动条样式</view>
      <zx-scrollbar native height="250rpx" class="demo-scrollbar">
        <view 
          v-for="item in 12" 
          :key="item" 
          class="scrollbar-demo-item"
        >
          原生滚动条项目 {{ item }}
        </view>
      </zx-scrollbar>
    </view>
    
    <!-- 始终显示滚动条 -->
    <view class="section">
      <view class="section-title">始终显示滚动条</view>
      <view class="section-desc">通过 always 属性让滚动条始终显示</view>
      <zx-scrollbar always height="250rpx" class="demo-scrollbar">
        <view 
          v-for="item in 8" 
          :key="item" 
          class="scrollbar-demo-item"
        >
          始终显示滚动条 {{ item }}
        </view>
      </zx-scrollbar>
    </view>
    
    <!-- 自定义样式 -->
    <view class="section">
      <view class="section-title">自定义样式</view>
      <view class="section-desc">自定义包裹容器和视图的样式</view>
      <zx-scrollbar 
        height="250rpx"
        wrap-class="custom-wrap"
        view-class="custom-view"
        :wrap-style="{ padding: '20rpx' }"
        class="demo-scrollbar custom-scrollbar"
      >
        <view 
          v-for="item in 10" 
          :key="item" 
          class="scrollbar-demo-item custom-item"
        >
          自定义样式项目 {{ item }}
        </view>
      </zx-scrollbar>
    </view>
    
    <!-- 混合内容 -->
    <view class="section">
      <view class="section-title">混合内容滚动</view>
      <view class="section-desc">包含文本、卡片等混合内容的滚动</view>
      <zx-scrollbar height="400rpx" class="demo-scrollbar">
        <view class="mixed-content">
          <view class="text-content">
            <text class="content-title">文本内容区域</text>
            <text class="content-text">
              这是一个包含大量文本内容的区域。zx-scrollbar 组件支持任意类型的内容滚动，
              包括文本、图片、表单元素等。组件采用 Vue 3 的 Composition API 开发，
              具有良好的性能和可维护性。支持垂直和水平滚动，自动检测内容溢出，
              提供平滑的滚动体验。适配了 uni-app 的多端开发需求，在小程序、H5、
              App 等平台都能良好运行。
            </text>
          </view>
          
          <view class="card-list">
            <view 
              v-for="item in 6" 
              :key="item" 
              class="demo-card"
            >
              <view class="card-header">卡片标题 {{ item }}</view>
              <view class="card-content">
                这是卡片 {{ item }} 的内容区域，包含了一些描述性文字。
                每个卡片都有独立的样式和布局。支持多种类型的内容展示。
              </view>
              <view class="card-footer">
                <text class="card-time">2024-01-{{ String(item).padStart(2, '0') }}</text>
              </view>
            </view>
          </view>
        </view>
      </zx-scrollbar>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// 响应式数据
const count = ref(3)
const scrollValue = ref(0)
const scrollbarRef = ref()

// 方法
const addItem = () => {
  count.value++
}

const deleteItem = () => {
  if (count.value > 0) {
    count.value--
  }
}

const onScroll = ({ scrollTop }) => {
  scrollValue.value = Math.round(scrollTop)
}

const scrollToTop = () => {
  if (scrollbarRef.value) {
    scrollbarRef.value.setScrollTop(0)
  }
}

const scrollToMiddle = () => {
  if (scrollbarRef.value) {
    scrollbarRef.value.setScrollTop(500)
  }
}

const scrollToBottom = () => {
  if (scrollbarRef.value) {
    scrollbarRef.value.setScrollTop(1000)
  }
}

// 生命周期
onMounted(() => {
  nextTick(() => {
    console.log('zx-scrollbar 组件示例页面已加载')
  })
})
</script>

<style scoped>
.container {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 40rpx;
}

.section {
  margin-bottom: 50rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
}

.section-desc {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 30rpx;
  line-height: 1.5;
}

.demo-scrollbar {
  border: 1rpx solid #e4e7ed;
  border-radius: 8rpx;
  background-color: #fff;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80rpx;
  margin: 15rpx;
  padding: 20rpx;
  text-align: center;
  border-radius: 8rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  font-size: 28rpx;
  font-weight: 500;
  box-shadow: 0 4rpx 8rpx rgba(102, 126, 234, 0.3);
}

.scrollbar-flex-content {
  display: flex;
  flex-direction: row;
  width: max-content;
}

.horizontal-item {
  flex-shrink: 0;
  width: 160rpx;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  box-shadow: 0 4rpx 8rpx rgba(240, 147, 251, 0.3);
}

.button-group {
  display: flex;
  gap: 20rpx;
  margin-bottom: 30rpx;
}

.mini-btn {
  padding: 8rpx 16rpx;
  border: none;
  border-radius: 6rpx;
  font-size: 24rpx;
  color: #fff;
  cursor: pointer;
}

.mini-btn.primary {
  background-color: #409eff;
}

.mini-btn.danger {
  background-color: #f56c6c;
}

.control-panel {
  margin-top: 30rpx;
  padding: 20rpx;
  background-color: #f8f9fa;
  border-radius: 8rpx;
}

.control-label {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 20rpx;
}

.control-buttons {
  display: flex;
  gap: 15rpx;
  flex-wrap: wrap;
}

.control-btn {
  padding: 12rpx 20rpx;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 6rpx;
  font-size: 24rpx;
  cursor: pointer;
}

/* 自定义样式示例 */
.custom-scrollbar {
  border: 2rpx solid #409eff;
}

.custom-wrap {
  background-color: #f0f2f5;
}

.custom-view {
  padding: 10rpx;
}

.custom-item {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  box-shadow: 0 4rpx 8rpx rgba(79, 172, 254, 0.3);
}

/* 混合内容样式 */
.mixed-content {
  padding: 20rpx;
}

.text-content {
  margin-bottom: 40rpx;
  padding: 30rpx;
  background-color: #f8f9fa;
  border-radius: 12rpx;
}

.content-title {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 20rpx;
}

.content-text {
  display: block;
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.demo-card {
  padding: 30rpx;
  background-color: #fff;
  border-radius: 12rpx;
  border: 1rpx solid #e4e7ed;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.card-header {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
}

.card-content {
  font-size: 28rpx;
  color: #666;
  line-height: 1.5;
  margin-bottom: 20rpx;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
}

.card-time {
  font-size: 24rpx;
  color: #999;
}
</style> 