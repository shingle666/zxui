<template>
  <view class="example-page">
    <view class="page-header">
      <text class="page-title">zx-movable 可拖拽组件示例</text>
    </view>

    <scroll-view class="page-content" scroll-y>
      <!-- 基础用法 -->
      <view class="example-section">
        <text class="section-title">基础用法</text>
        <view class="example-container">
          <zx-movable 
            :width="300" 
            :height="200"
            content="拖拽我试试"
            @change="handleChange"
          />
        </view>
        <text class="example-desc">最基础的拖拽功能，可以在指定区域内自由拖拽</text>
      </view>

      <!-- 不同方向 -->
      <view class="example-section">
        <text class="section-title">不同拖拽方向</text>
        <view class="direction-examples">
          <view class="direction-item">
            <text class="direction-label">水平拖拽</text>
            <zx-movable 
              :width="280" 
              :height="80"
              direction="horizontal"
              content="水平"
              view-background-color="#ff6b35"
            />
          </view>
          <view class="direction-item">
            <text class="direction-label">垂直拖拽</text>
            <zx-movable 
              :width="80" 
              :height="200"
              direction="vertical"
              content="垂直"
              view-background-color="#7b68ee"
            />
          </view>
        </view>
      </view>

      <!-- 支持缩放 -->
      <view class="example-section">
        <text class="section-title">支持缩放</text>
        <view class="example-container">
          <zx-movable 
            :width="300" 
            :height="200"
            :scale="true"
            :scale-min="0.5"
            :scale-max="3"
            scale-area
            content="双指缩放"
            view-background-color="#ff4757"
            @scale="handleScale"
          />
        </view>
        <text class="example-desc">支持双指缩放，缩放范围：0.5x - 3x</text>
        <text class="scale-info">当前缩放倍数: {{ scaleValue.toFixed(2) }}x</text>
      </view>

      <!-- 惯性滑动 -->
      <view class="example-section">
        <text class="section-title">惯性滑动</text>
        <view class="example-container">
          <zx-movable 
            :width="300" 
            :height="200"
            :inertia="true"
            :friction="2"
            :damping="15"
            content="惯性滑动"
            view-background-color="#2ed573"
          />
        </view>
        <text class="example-desc">支持惯性滑动，快速拖拽后会继续滑动</text>
      </view>

      <!-- 自定义样式 -->
      <view class="example-section">
        <text class="section-title">自定义样式</text>
        <view class="example-container">
          <zx-movable 
            :width="300" 
            :height="200"
            :view-width="80"
            :view-height="80"
            background-color="#f1f2f6"
            view-background-color="#ff9ff3"
            text-color="#2f3542"
            :border-radius="20"
            :border="false"
          >
            <view class="custom-content">
              <text class="emoji">🚀</text>
              <text class="custom-text">火箭</text>
            </view>
          </zx-movable>
        </view>
        <text class="example-desc">使用插槽自定义拖拽元素内容和样式</text>
      </view>

      <!-- 双向绑定 -->
      <view class="example-section">
        <text class="section-title">坐标双向绑定</text>
        <view class="example-container">
          <zx-movable 
            :width="300" 
            :height="200"
            v-model:x="posX"
            v-model:y="posY"
            view-background-color="#ffa502"
            content="坐标绑定"
          />
        </view>
        <view class="position-info">
          <text class="pos-text">当前位置: ({{ Math.round(posX) }}, {{ Math.round(posY) }})</text>
          <view class="control-buttons">
            <button class="control-btn" @click="moveToCenter">移动到中心</button>
            <button class="control-btn" @click="reset">重置位置</button>
          </view>
        </view>
      </view>

      <!-- 禁用状态 -->
      <view class="example-section">
        <text class="section-title">禁用状态</text>
        <view class="example-container">
          <zx-movable 
            :width="300" 
            :height="150"
            :disabled="isDisabled"
            content="点击切换状态"
            view-background-color="#a4b0be"
          />
        </view>
        <view class="disable-control">
          <button class="toggle-btn" @click="toggleDisabled">
            {{ isDisabled ? '启用拖拽' : '禁用拖拽' }}
          </button>
        </view>
      </view>

      <!-- 多个拖拽元素 -->
      <view class="example-section">
        <text class="section-title">多个拖拽元素</text>
        <view class="example-container">
          <view class="multi-container">
            <zx-movable 
              :width="350" 
              :height="250"
              :view-width="60"
              :view-height="60"
              :x="20"
              :y="20"
              view-background-color="#ff6348"
              content="A"
              background-color="rgba(0,0,0,0.05)"
            />
            <zx-movable 
              :width="350" 
              :height="250"
              :view-width="60"
              :view-height="60"
              :x="100"
              :y="80"
              view-background-color="#1dd1a1"
              content="B"
              background-color="transparent"
              :border="false"
              style="position: absolute; top: 0; left: 0;"
            />
            <zx-movable 
              :width="350" 
              :height="250"
              :view-width="60"
              :view-height="60"
              :x="180"
              :y="140"
              view-background-color="#feca57"
              content="C"
              background-color="transparent"
              :border="false"
              style="position: absolute; top: 0; left: 0;"
            />
          </view>
        </view>
        <text class="example-desc">多个拖拽元素可以独立移动</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 缩放相关
const scaleValue = ref(1);

// 位置绑定
const posX = ref(50);
const posY = ref(50);
const movableRef = ref();

// 禁用状态
const isDisabled = ref(false);

// 事件处理
const handleChange = (e) => {
  console.log('位置变化:', e.detail);
};

const handleScale = (e) => {
  scaleValue.value = e.detail.scale;
  console.log('缩放倍数:', e.detail.scale);
};

// 控制方法
const moveToCenter = () => {
  posX.value = 125;
  posY.value = 75;
};

const reset = () => {
  posX.value = 0;
  posY.value = 0;
};

const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value;
};
</script>

<style lang="scss" scoped>
.example-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.page-header {
  padding: 40rpx 30rpx 20rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  .page-title {
    font-size: 36rpx;
    font-weight: 600;
    color: #ffffff;
    text-align: center;
    display: block;
  }
}

.page-content {
  height: calc(100vh - 120rpx);
  padding: 30rpx;
}

.example-section {
  margin-bottom: 60rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 20rpx;
    display: block;
  }
  
  .example-desc {
    font-size: 26rpx;
    color: #7f8c8d;
    margin-top: 15rpx;
    display: block;
    line-height: 1.5;
  }
}

.example-container {
  display: flex;
  justify-content: center;
  margin: 20rpx 0;
}

.direction-examples {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
  
  .direction-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15rpx;
    
    .direction-label {
      font-size: 28rpx;
      color: #34495e;
      font-weight: 500;
    }
  }
}

.custom-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 8rpx;
  
  .emoji {
    font-size: 36rpx;
  }
  
  .custom-text {
    font-size: 24rpx;
    color: #2f3542;
  }
}

.scale-info {
  font-size: 28rpx;
  color: #e74c3c;
  font-weight: 600;
  margin-top: 10rpx;
  display: block;
  text-align: center;
}

.position-info {
  margin-top: 20rpx;
  
  .pos-text {
    font-size: 28rpx;
    color: #2c3e50;
    font-weight: 500;
    display: block;
    text-align: center;
    margin-bottom: 20rpx;
  }
  
  .control-buttons {
    display: flex;
    justify-content: center;
    gap: 20rpx;
    
    .control-btn {
      padding: 15rpx 30rpx;
      background-color: #3498db;
      color: #ffffff;
      border: none;
      border-radius: 10rpx;
      font-size: 26rpx;
    }
  }
}

.disable-control {
  display: flex;
  justify-content: center;
  margin-top: 20rpx;
  
  .toggle-btn {
    padding: 15rpx 40rpx;
    background-color: #e67e22;
    color: #ffffff;
    border: none;
    border-radius: 10rpx;
    font-size: 28rpx;
  }
}

.multi-container {
  position: relative;
  width: 350rpx;
  height: 250rpx;
}
</style> 