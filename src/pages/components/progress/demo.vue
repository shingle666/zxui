<template>
  <view class="demo-container">
    <view class="demo-section">
      <view class="section-title">基础进度条</view>
      <zx-progress :percent="30" />
    </view>

    <view class="demo-section">
      <view class="section-title">显示百分比</view>
      <zx-progress :percent="50" :showInfo="true" />
    </view>

    <view class="demo-section">
      <view class="section-title">自定义样式</view>
      <zx-progress 
        :percent="70" 
        :showInfo="true"
        strokeWidth="12"
        borderRadius="6rpx"
        activeColor="#ff6b6b"
        backgroundColor="#f0f0f0"
        fontSize="14"
      />
    </view>

    <view class="demo-section">
      <view class="section-title">渐变色进度条</view>
      <zx-progress 
        :percent="80" 
        :showInfo="true"
        strokeWidth="10"
        borderRadius="5rpx"
        activeColor="linear-gradient(90deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)"
      />
    </view>

    <view class="demo-section">
      <view class="section-title">动画效果 (backwards模式)</view>
      <zx-progress 
        ref="progressRef1"
        :percent="animationPercent1" 
        :active="true"
        :showInfo="true"
        activeMode="backwards"
        :duration="30"
        @activeend="onAnimationEnd1"
      />
      <view class="demo-controls">
        <button @click="updateProgress1" size="mini" type="primary">更新进度</button>
        <button @click="resetProgress1" size="mini">重置</button>
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">动画效果 (forwards模式)</view>
      <zx-progress 
        ref="progressRef2"
        :percent="animationPercent2" 
        :active="true"
        :showInfo="true"
        activeMode="forwards"
        :duration="50"
        strokeWidth="8"
        activeColor="#5677fc"
        @activeend="onAnimationEnd2"
      />
      <view class="demo-controls">
        <button @click="updateProgress2" size="mini" type="primary">更新进度</button>
        <button @click="resetProgress2" size="mini">重置</button>
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">可控制的进度条</view>
      <zx-progress 
        ref="controlProgressRef"
        :percent="controlPercent" 
        :active="enableAnimation"
        :showInfo="true"
        strokeWidth="10"
        borderRadius="5rpx"
        activeColor="linear-gradient(to right, #4facfe, #00f2fe)"
      />
      <view class="demo-controls">
        <view class="slider-container">
          <text>进度: {{ controlPercent }}%</text>
          <slider 
            :value="controlPercent" 
            @change="onSliderChange"
            max="100" 
            min="0"
            step="1"
            activeColor="#4facfe"
          />
        </view>
        <view class="switch-container">
          <text>启用动画</text>
          <switch :checked="enableAnimation" @change="onAnimationToggle" />
        </view>
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">多种尺寸</view>
      <view class="size-demo">
        <view class="size-item">
          <text>小尺寸</text>
          <zx-progress :percent="60" strokeWidth="4" :showInfo="true" fontSize="12" />
        </view>
        <view class="size-item">
          <text>中尺寸</text>
          <zx-progress :percent="60" strokeWidth="8" :showInfo="true" fontSize="16" />
        </view>
        <view class="size-item">
          <text>大尺寸</text>
          <zx-progress :percent="60" strokeWidth="16" :showInfo="true" fontSize="20" />
        </view>
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">不同颜色主题</view>
      <view class="color-demo">
        <view class="color-item">
          <text>成功色</text>
          <zx-progress :percent="75" :showInfo="true" activeColor="#07c160" />
        </view>
        <view class="color-item">
          <text>警告色</text>
          <zx-progress :percent="60" :showInfo="true" activeColor="#ff976a" />
        </view>
        <view class="color-item">
          <text>错误色</text>
          <zx-progress :percent="40" :showInfo="true" activeColor="#ee0a24" />
        </view>
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">模拟加载场景</view>
      <zx-progress 
        :percent="loadingPercent" 
        :active="isLoading"
        :showInfo="true"
        strokeWidth="8"
        borderRadius="4rpx"
        activeColor="linear-gradient(90deg, #36d1dc 0%, #5b86e5 100%)"
        @activeend="onLoadingEnd"
      />
      <view class="demo-controls">
        <button @click="startLoading" :disabled="isLoading" size="mini" type="primary">
          {{ isLoading ? '加载中...' : '开始加载' }}
        </button>
        <button @click="stopLoading" :disabled="!isLoading" size="mini">停止</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import zxProgress from '@/components/zx-progress/zx-progress.vue';

// 动画演示相关
const progressRef1 = ref();
const progressRef2 = ref();
const animationPercent1 = ref(0);
const animationPercent2 = ref(0);

// 可控制的进度条
const controlProgressRef = ref();
const controlPercent = ref(50);
const enableAnimation = ref(true);

// 模拟加载场景
const loadingPercent = ref(0);
const isLoading = ref(false);
const loadingTimer = ref(null);

// 动画完成回调
const onAnimationEnd1 = (e) => {
  console.log('动画1完成，进度：', e.percent);
  uni.showToast({
    title: `动画完成: ${e.percent}%`,
    icon: 'none',
    duration: 1000
  });
};

const onAnimationEnd2 = (e) => {
  console.log('动画2完成，进度：', e.percent);
};

// 更新进度
const updateProgress1 = () => {
  animationPercent1.value = Math.floor(Math.random() * 100);
};

const updateProgress2 = () => {
  animationPercent2.value = Math.floor(Math.random() * 100);
};

// 重置进度
const resetProgress1 = () => {
  progressRef1.value?.reset();
  animationPercent1.value = 0;
};

const resetProgress2 = () => {
  progressRef2.value?.reset();
  animationPercent2.value = 0;
};

// 滑块变化
const onSliderChange = (e) => {
  controlPercent.value = e.detail.value;
};

// 动画开关
const onAnimationToggle = (e) => {
  enableAnimation.value = e.detail.value;
};

// 模拟加载
const startLoading = () => {
  isLoading.value = true;
  loadingPercent.value = 0;
  
  loadingTimer.value = setInterval(() => {
    loadingPercent.value += Math.random() * 10;
    if (loadingPercent.value >= 100) {
      loadingPercent.value = 100;
      clearInterval(loadingTimer.value);
      isLoading.value = false;
    }
  }, 500);
};

const stopLoading = () => {
  if (loadingTimer.value) {
    clearInterval(loadingTimer.value);
    loadingTimer.value = null;
  }
  isLoading.value = false;
};

const onLoadingEnd = () => {
  if (loadingPercent.value >= 100) {
    uni.showToast({
      title: '加载完成！',
      icon: 'success'
    });
  }
};

// 页面卸载时清理定时器
onUnmounted(() => {
  if (loadingTimer.value) {
    clearInterval(loadingTimer.value);
  }
});
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
  background-color: #f5f5f5;
}

.demo-section {
  background-color: white;
  margin-bottom: 20rpx;
  padding: 30rpx;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.demo-controls {
  margin-top: 20rpx;
  display: flex;
  gap: 20rpx;
  align-items: center;
  flex-wrap: wrap;
}

.slider-container {
  flex: 1;
  min-width: 300rpx;
}

.slider-container text {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 10rpx;
  display: block;
}

.switch-container {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.switch-container text {
  font-size: 28rpx;
  color: #666;
}

.size-demo {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.size-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.size-item text {
  width: 120rpx;
  font-size: 28rpx;
  color: #666;
}

.color-demo {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.color-item {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.color-item text {
  width: 120rpx;
  font-size: 28rpx;
  color: #666;
}
</style> 