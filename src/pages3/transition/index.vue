<template>
  <view class="container">
    <zx-navbar title="ZxTransition 过渡动画" />
    
    <scroll-view scroll-y class="scroll-view">
      <!-- 基础动画示例 -->
      <view class="section">
        <view class="section-title">基础动画效果</view>
        
        <!-- 淡入淡出 -->
        <view class="demo-item">
          <view class="demo-title">淡入淡出 (fade)</view>
          <view class="demo-content">
            <zx-transition :show="showStates.fade" name="fade">
              <view class="demo-box fade-box">淡入淡出动画</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('fade')">
            {{ showStates.fade ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <!-- 上滑淡入 -->
        <view class="demo-item">
          <view class="demo-title">上滑淡入 (fade-up)</view>
          <view class="demo-content">
            <zx-transition :show="showStates.fadeUp" name="fade-up">
              <view class="demo-box slide-box">上滑淡入动画</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('fadeUp')">
            {{ showStates.fadeUp ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <!-- 下滑淡入 -->
        <view class="demo-item">
          <view class="demo-title">下滑淡入 (fade-down)</view>
          <view class="demo-content">
            <zx-transition :show="showStates.fadeDown" name="fade-down">
              <view class="demo-box slide-box">下滑淡入动画</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('fadeDown')">
            {{ showStates.fadeDown ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <!-- 左滑淡入 -->
        <view class="demo-item">
          <view class="demo-title">左滑淡入 (fade-left)</view>
          <view class="demo-content">
            <zx-transition :show="showStates.fadeLeft" name="fade-left">
              <view class="demo-box slide-box">左滑淡入动画</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('fadeLeft')">
            {{ showStates.fadeLeft ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <!-- 右滑淡入 -->
        <view class="demo-item">
          <view class="demo-title">右滑淡入 (fade-right)</view>
          <view class="demo-content">
            <zx-transition :show="showStates.fadeRight" name="fade-right">
              <view class="demo-box slide-box">右滑淡入动画</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('fadeRight')">
            {{ showStates.fadeRight ? '隐藏' : '显示' }}
          </button>
        </view>
      </view>
      
      <!-- 滑动动画示例 -->
      <view class="section">
        <view class="section-title">滑动动画效果</view>
        
        <!-- 上滑进入 -->
        <view class="demo-item">
          <view class="demo-title">上滑进入 (slide-up)</view>
          <view class="demo-content">
            <zx-transition :show="showStates.slideUp" name="slide-up">
              <view class="demo-box slide-box">上滑进入动画</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('slideUp')">
            {{ showStates.slideUp ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <!-- 下滑进入 -->
        <view class="demo-item">
          <view class="demo-title">下滑进入 (slide-down)</view>
          <view class="demo-content">
            <zx-transition :show="showStates.slideDown" name="slide-down">
              <view class="demo-box slide-box">下滑进入动画</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('slideDown')">
            {{ showStates.slideDown ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <!-- 左滑进入 -->
        <view class="demo-item">
          <view class="demo-title">左滑进入 (slide-left)</view>
          <view class="demo-content">
            <zx-transition :show="showStates.slideLeft" name="slide-left">
              <view class="demo-box slide-box">左滑进入动画</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('slideLeft')">
            {{ showStates.slideLeft ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <!-- 右滑进入 -->
        <view class="demo-item">
          <view class="demo-title">右滑进入 (slide-right)</view>
          <view class="demo-content">
            <zx-transition :show="showStates.slideRight" name="slide-right">
              <view class="demo-box slide-box">右滑进入动画</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('slideRight')">
            {{ showStates.slideRight ? '隐藏' : '显示' }}
          </button>
        </view>
      </view>
      
      <!-- 缩放动画示例 -->
      <view class="section">
        <view class="section-title">缩放动画效果</view>
        
        <!-- 放大进入 -->
        <view class="demo-item">
          <view class="demo-title">放大进入 (zoom)</view>
          <view class="demo-content">
            <zx-transition :show="showStates.zoom" name="zoom">
              <view class="demo-box zoom-box">放大进入动画</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('zoom')">
            {{ showStates.zoom ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <!-- 缩小进入 -->
        <view class="demo-item">
          <view class="demo-title">缩小进入 (zoom-out)</view>
          <view class="demo-content">
            <zx-transition :show="showStates.zoomOut" name="zoom-out">
              <view class="demo-box zoom-box">缩小进入动画</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('zoomOut')">
            {{ showStates.zoomOut ? '隐藏' : '显示' }}
          </button>
        </view>
      </view>
      
      <!-- 自定义参数示例 -->
      <view class="section">
        <view class="section-title">自定义动画参数</view>
        
        <!-- 自定义时长 -->
        <view class="demo-item">
          <view class="demo-title">自定义时长 (1000ms)</view>
          <view class="demo-content">
            <zx-transition :show="showStates.customDuration" name="fade" :duration="1000">
              <view class="demo-box custom-box">慢速淡入动画</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('customDuration')">
            {{ showStates.customDuration ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <!-- 自定义时间函数 -->
        <view class="demo-item">
          <view class="demo-title">自定义时间函数 (ease-in-out)</view>
          <view class="demo-content">
            <zx-transition :show="showStates.customTiming" name="slide-up" timing-function="ease-in-out">
              <view class="demo-box custom-box">缓入缓出动画</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('customTiming')">
            {{ showStates.customTiming ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <!-- 销毁模式 -->
        <view class="demo-item">
          <view class="demo-title">销毁模式 (destroyOnClose)</view>
          <view class="demo-content">
            <zx-transition :show="showStates.destroyMode" name="zoom" :destroy-on-close="true">
              <view class="demo-box destroy-box">关闭时销毁元素</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('destroyMode')">
            {{ showStates.destroyMode ? '隐藏' : '显示' }}
          </button>
        </view>
      </view>
      
      <!-- 事件监听示例 -->
      <view class="section">
        <view class="section-title">事件监听</view>
        
        <view class="demo-item">
          <view class="demo-title">动画事件监听</view>
          <view class="demo-content">
            <zx-transition 
              :show="showStates.events" 
              name="fade-up"
              @before-enter="onBeforeEnter"
              @enter="onEnter"
              @after-enter="onAfterEnter"
              @before-leave="onBeforeLeave"
              @leave="onLeave"
              @after-leave="onAfterLeave"
              @click="onClick"
            >
              <view class="demo-box event-box">点击我或切换显示</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('events')">
            {{ showStates.events ? '隐藏' : '显示' }}
          </button>
        </view>
        
        <!-- 事件日志 -->
        <view class="event-log">
          <view class="log-title">事件日志:</view>
          <view class="log-content">
            <view v-for="(log, index) in eventLogs" :key="index" class="log-item">
              {{ log }}
            </view>
          </view>
        </view>
      </view>
      
      <!-- 自定义类名示例 -->
      <view class="section">
        <view class="section-title">自定义过渡类名</view>
        
        <view class="demo-item">
          <view class="demo-title">自定义过渡效果</view>
          <view class="demo-content">
            <zx-transition 
              :show="showStates.customClass" 
              name="custom"
              enter-from-class="custom-enter-from"
              enter-active-class="custom-enter-active"
              enter-to-class="custom-enter-to"
              leave-from-class="custom-leave-from"
              leave-active-class="custom-leave-active"
              leave-to-class="custom-leave-to"
            >
              <view class="demo-box custom-transition-box">自定义过渡动画</view>
            </zx-transition>
          </view>
          <button class="demo-btn" @click="toggleShow('customClass')">
            {{ showStates.customClass ? '隐藏' : '显示' }}
          </button>
        </view>
      </view>
      
      <!-- 批量控制示例 -->
      <view class="section">
        <view class="section-title">批量控制</view>
        
        <view class="demo-item">
          <view class="demo-title">批量显示/隐藏</view>
          <view class="demo-content batch-content">
            <zx-transition :show="showStates.batch1" name="fade" :duration="200">
              <view class="demo-box batch-box">元素1</view>
            </zx-transition>
            <zx-transition :show="showStates.batch2" name="slide-up" :duration="400">
              <view class="demo-box batch-box">元素2</view>
            </zx-transition>
            <zx-transition :show="showStates.batch3" name="zoom" :duration="600">
              <view class="demo-box batch-box">元素3</view>
            </zx-transition>
          </view>
          <view class="batch-controls">
            <button class="demo-btn small" @click="showAllBatch">全部显示</button>
            <button class="demo-btn small" @click="hideAllBatch">全部隐藏</button>
            <button class="demo-btn small" @click="sequentialShow">依次显示</button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 显示状态管理
const showStates = reactive({
  fade: false,
  fadeUp: false,
  fadeDown: false,
  fadeLeft: false,
  fadeRight: false,
  slideUp: false,
  slideDown: false,
  slideLeft: false,
  slideRight: false,
  zoom: false,
  zoomOut: false,
  customDuration: false,
  customTiming: false,
  destroyMode: false,
  events: false,
  customClass: false,
  batch1: false,
  batch2: false,
  batch3: false
})

// 事件日志
const eventLogs = ref([])

// 切换显示状态
function toggleShow(key) {
  showStates[key] = !showStates[key]
}

// 事件处理函数
function onBeforeEnter() {
  addEventLog('beforeEnter: 进入动画开始前')
}

function onEnter() {
  addEventLog('enter: 进入动画开始')
}

function onAfterEnter() {
  addEventLog('afterEnter: 进入动画结束')
}

function onBeforeLeave() {
  addEventLog('beforeLeave: 离开动画开始前')
}

function onLeave() {
  addEventLog('leave: 离开动画开始')
}

function onAfterLeave() {
  addEventLog('afterLeave: 离开动画结束')
}

function onClick() {
  addEventLog('click: 元素被点击')
}

// 添加事件日志
function addEventLog(message) {
  const timestamp = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${timestamp}] ${message}`)
  // 限制日志数量
  if (eventLogs.value.length > 10) {
    eventLogs.value = eventLogs.value.slice(0, 10)
  }
}

// 批量控制函数
function showAllBatch() {
  showStates.batch1 = true
  showStates.batch2 = true
  showStates.batch3 = true
}

function hideAllBatch() {
  showStates.batch1 = false
  showStates.batch2 = false
  showStates.batch3 = false
}

function sequentialShow() {
  hideAllBatch()
  setTimeout(() => {
    showStates.batch1 = true
  }, 100)
  setTimeout(() => {
    showStates.batch2 = true
  }, 300)
  setTimeout(() => {
    showStates.batch3 = true
  }, 500)
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.scroll-view {
  height: calc(100vh - 88rpx);
  padding: 20rpx;
}

.section {
  margin-bottom: 40rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
    padding: 20rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12rpx;
    text-align: center;
  }
}

.demo-item {
  background: white;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  
  .demo-title {
    font-size: 28rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 20rpx;
  }
  
  .demo-content {
    min-height: 120rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20rpx;
    border: 2rpx dashed #e0e0e0;
    border-radius: 8rpx;
    position: relative;
    overflow: hidden;
  }
  
  .demo-btn {
    width: 100%;
    height: 80rpx;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8rpx;
    font-size: 28rpx;
    font-weight: 600;
    
    &.small {
      width: auto;
      flex: 1;
      margin: 0 10rpx;
    }
  }
}

.demo-box {
  padding: 30rpx 40rpx;
  border-radius: 8rpx;
  color: white;
  font-size: 28rpx;
  font-weight: 600;
  text-align: center;
  min-width: 200rpx;
}

.fade-box {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
}

.slide-box {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
}

.zoom-box {
  background: linear-gradient(135deg, #a8edea, #fed6e3);
  color: #333;
}

.custom-box {
  background: linear-gradient(135deg, #ffecd2, #fcb69f);
  color: #333;
}

.destroy-box {
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
  color: #333;
}

.event-box {
  background: linear-gradient(135deg, #a18cd1, #fbc2eb);
  color: #333;
  cursor: pointer;
}

.custom-transition-box {
  background: linear-gradient(135deg, #fad0c4, #ffd1ff);
  color: #333;
}

.batch-box {
  background: linear-gradient(135deg, #667eea, #764ba2);
  margin: 10rpx;
  flex: 1;
}

.batch-content {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.batch-controls {
  display: flex;
  gap: 10rpx;
  margin-top: 20rpx;
}

.event-log {
  background: white;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-top: 20rpx;
  
  .log-title {
    font-size: 28rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 20rpx;
  }
  
  .log-content {
    max-height: 400rpx;
    overflow-y: auto;
    
    .log-item {
      padding: 10rpx 0;
      font-size: 24rpx;
      color: #666;
      border-bottom: 1rpx solid #f0f0f0;
      
      &:last-child {
        border-bottom: none;
      }
    }
  }
}

/* 自定义过渡类名样式 */
:deep(.custom-enter-active),
:deep(.custom-leave-active) {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

:deep(.custom-enter-from) {
  opacity: 0;
  transform: translateY(-50rpx) rotate(-10deg) scale(0.8);
}

:deep(.custom-enter-to) {
  opacity: 1;
  transform: translateY(0) rotate(0deg) scale(1);
}

:deep(.custom-leave-from) {
  opacity: 1;
  transform: translateY(0) rotate(0deg) scale(1);
}

:deep(.custom-leave-to) {
  opacity: 0;
  transform: translateY(50rpx) rotate(10deg) scale(0.8);
}
</style>