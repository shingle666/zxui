<template>
  <view class="demo-container">
    <view class="page-header">
      <view class="page-title">zx-progress 进度条组件</view>
      <view class="page-desc">基于 uni-app 官方规范优化的进度条组件</view>
    </view>

    <view class="demo-section">
      <view class="section-title">基础用法</view>
      <view class="demo-item">
        <view class="demo-label">默认进度条</view>
        <zx-progress :percent="30" />
      </view>
      
      <view class="demo-item">
        <view class="demo-label">显示百分比</view>
        <zx-progress :percent="50" :showInfo="true" />
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">自定义样式</view>
      <view class="demo-item">
        <view class="demo-label">自定义颜色和宽度</view>
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
      
      <view class="demo-item">
        <view class="demo-label">渐变色进度条</view>
        <zx-progress 
          :percent="80" 
          :showInfo="true"
          strokeWidth="10"
          borderRadius="5rpx"
          activeColor="linear-gradient(90deg, #ff6b6b 0%, #feca57 50%, #48dbfb 100%)"
        />
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">动画效果</view>
      <view class="demo-item">
        <view class="demo-label">backwards 模式（从头播放）</view>
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

      <view class="demo-item">
        <view class="demo-label">forwards 模式（连续播放）</view>
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
    </view>

    <view class="demo-section">
      <view class="section-title">交互控制</view>
      <view class="demo-item">
        <view class="demo-label">滑块控制进度</view>
        <zx-progress 
          ref="controlProgressRef"
          :percent="controlPercent" 
          :active="enableAnimation"
          :showInfo="true"
          strokeWidth="10"
          borderRadius="5rpx"
          activeColor="linear-gradient(to right, #4facfe, #00f2fe)"
        />
        <view class="control-panel">
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
    </view>

    <view class="demo-section">
      <view class="section-title">不同尺寸</view>
      <view class="demo-item">
        <view class="demo-label">小尺寸</view>
        <zx-progress :percent="60" strokeWidth="4" :showInfo="true" fontSize="12" />
      </view>
      
      <view class="demo-item">
        <view class="demo-label">中尺寸</view>
        <zx-progress :percent="60" strokeWidth="8" :showInfo="true" fontSize="16" />
      </view>
      
      <view class="demo-item">
        <view class="demo-label">大尺寸</view>
        <zx-progress :percent="60" strokeWidth="16" :showInfo="true" fontSize="20" />
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">主题色彩</view>
      <view class="demo-item">
        <view class="demo-label">成功色</view>
        <zx-progress :percent="75" :showInfo="true" activeColor="#07c160" />
      </view>
      
      <view class="demo-item">
        <view class="demo-label">警告色</view>
        <zx-progress :percent="60" :showInfo="true" activeColor="#ff976a" />
      </view>
      
      <view class="demo-item">
        <view class="demo-label">错误色</view>
        <zx-progress :percent="40" :showInfo="true" activeColor="#ee0a24" />
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">应用场景</view>
      <view class="demo-item">
        <view class="demo-label">文件上传进度</view>
        <zx-progress 
          :percent="uploadPercent" 
          :active="isUploading"
          :showInfo="true"
          strokeWidth="8"
          borderRadius="4rpx"
          activeColor="linear-gradient(90deg, #36d1dc 0%, #5b86e5 100%)"
          @activeend="onUploadEnd"
        />
        <view class="demo-controls">
          <button @click="startUpload" :disabled="isUploading" size="mini" type="primary">
            {{ isUploading ? '上传中...' : '开始上传' }}
          </button>
          <button @click="stopUpload" :disabled="!isUploading" size="mini">停止</button>
        </view>
      </view>

      <view class="demo-item">
        <view class="demo-label">技能熟练度</view>
        <view class="skill-list">
          <view class="skill-item" v-for="skill in skillList" :key="skill.name">
            <view class="skill-name">{{ skill.name }}</view>
            <zx-progress 
              :percent="skill.percent" 
              :showInfo="true"
              strokeWidth="6"
              borderRadius="3rpx"
              :activeColor="skill.color"
            />
          </view>
        </view>
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">代码示例</view>
      <view class="code-block">
        <text>{{ codeExample }}</text>
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

// 交互控制
const controlProgressRef = ref();
const controlPercent = ref(50);
const enableAnimation = ref(true);

// 上传演示
const uploadPercent = ref(0);
const isUploading = ref(false);
const uploadTimer = ref(null);

// 技能列表演示
const skillList = ref([
  { name: 'Vue.js', percent: 90, color: '#4fc08d' },
  { name: 'JavaScript', percent: 85, color: '#f7df1e' },
  { name: 'CSS3', percent: 80, color: '#1572b6' },
  { name: 'Node.js', percent: 75, color: '#68a063' },
  { name: 'Python', percent: 70, color: '#3776ab' }
]);

// 代码示例
const codeExample = ref(`<!-- 基础用法 -->
<zx-progress :percent="50" :showInfo="true" />

<!-- 自定义样式 -->
<zx-progress 
  :percent="80" 
  :showInfo="true"
  strokeWidth="10"
  borderRadius="5rpx"
  activeColor="linear-gradient(90deg, #ff6b6b 0%, #48dbfb 100%)"
/>

<!-- 动画效果 -->
<zx-progress 
  :percent="percent" 
  :active="true"
  activeMode="backwards"
  @activeend="onAnimationEnd"
/>`);

// 动画完成回调
const onAnimationEnd1 = (e) => {
  console.log('动画1完成，进度：', e.percent);
  uni.showToast({
    title: `动画完成: ${e.percent}%`,
    icon: 'none',
    duration: 1500
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

// 滑块控制
const onSliderChange = (e) => {
  controlPercent.value = e.detail.value;
};

// 动画开关
const onAnimationToggle = (e) => {
  enableAnimation.value = e.detail.value;
};

// 模拟上传
const startUpload = () => {
  isUploading.value = true;
  uploadPercent.value = 0;
  
  uploadTimer.value = setInterval(() => {
    uploadPercent.value += Math.random() * 15;
    if (uploadPercent.value >= 100) {
      uploadPercent.value = 100;
      clearInterval(uploadTimer.value);
      isUploading.value = false;
    }
  }, 600);
};

const stopUpload = () => {
  if (uploadTimer.value) {
    clearInterval(uploadTimer.value);
    uploadTimer.value = null;
  }
  isUploading.value = false;
};

const onUploadEnd = () => {
  if (uploadPercent.value >= 100) {
    uni.showToast({
      title: '上传完成！',
      icon: 'success'
    });
  }
};

// 页面卸载时清理定时器
onUnmounted(() => {
  if (uploadTimer.value) {
    clearInterval(uploadTimer.value);
  }
});
</script>

<style scoped>
.demo-container {
  padding: 20rpx;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40rpx 30rpx;
  border-radius: 20rpx;
  margin-bottom: 30rpx;
  text-align: center;
}

.page-title {
  font-size: 40rpx;
  font-weight: bold;
  color: white;
  margin-bottom: 10rpx;
}

.page-desc {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
}

.demo-section {
  background-color: white;
  margin-bottom: 30rpx;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  padding: 30rpx;
  background-color: #f9f9f9;
  border-bottom: 1rpx solid #eee;
}

.demo-item {
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.demo-item:last-child {
  border-bottom: none;
}

.demo-label {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 20rpx;
  font-weight: 500;
}

.demo-controls {
  margin-top: 20rpx;
  display: flex;
  gap: 20rpx;
}

.control-panel {
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: #f9f9f9;
  border-radius: 10rpx;
}

.slider-container {
  margin-bottom: 20rpx;
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
  justify-content: space-between;
}

.switch-container text {
  font-size: 28rpx;
  color: #666;
}

.skill-list {
  margin-top: 10rpx;
}

.skill-item {
  margin-bottom: 20rpx;
}

.skill-item:last-child {
  margin-bottom: 0;
}

.skill-name {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.code-block {
  background-color: #2d3748;
  color: #e2e8f0;
  padding: 30rpx;
  border-radius: 10rpx;
  font-family: 'Courier New', monospace;
  font-size: 24rpx;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre-wrap;
}
</style>
