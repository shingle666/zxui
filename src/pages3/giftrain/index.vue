<template>
  <view class="container">
    <scroll-view scroll-y style="flex: 1">
      <view class="content">
        <!-- 基础用法 -->
        <view class="demo-section">
          <view class="demo-title">基础用法</view>
          <view class="demo-desc">最简单的红包雨游戏，点击开始按钮启动游戏。</view>
          <view class="demo-block">
            <zx-giftrain
              ref="basicGiftrain"
              width="100%"
              height="400px"
              @start="onBasicStart"
              @gameOver="onBasicGameOver"
              @click="onBasicClick"
            >
              <view v-if="!basicGame.isPlaying" class="start-btn" @click="startBasicGame">
                {{ basicGame.status === 'ready' ? '开始游戏' : '重新开始' }}
              </view>
              
              <view class="game-info">
                <text>得分: {{ basicGame.score }}</text>
                <text v-if="basicGame.isPlaying">剩余: {{ basicGame.timeLeft }}s</text>
              </view>
              
              <view v-if="basicGame.status === 'ended'" class="game-result">
                <text>游戏结束！</text>
                <text>最终得分: {{ basicGame.finalScore }}</text>
              </view>
            </zx-giftrain>
          </view>
        </view>

        <!-- 自定义配置 -->
        <view class="demo-section">
          <view class="demo-title">自定义配置</view>
          <view class="demo-desc">可以自定义红包图片、尺寸、速度、数量等参数。</view>
          <view class="demo-block">
            <zx-giftrain
              ref="customGiftrain"
              width="100%"
              height="350px"
              :rain-time="15000"
              :rain-num="8"
              :rain-width="40"
              :rain-height="40"
              background-color="#f0f8ff"
              :fall-speed="0.12"
              :generate-interval="600"
              @start="onCustomStart"
              @gameOver="onCustomGameOver"
              @click="onCustomClick"
            >
              <view v-if="!customGame.isPlaying" class="start-btn custom-btn" @click="startCustomGame">
                快速模式
              </view>
              
              <view class="game-info custom-info">
                <text>快速得分: {{ customGame.score }}</text>
                <text v-if="customGame.isPlaying">{{ customGame.timeLeft }}s</text>
              </view>
            </zx-giftrain>
          </view>
        </view>

        <!-- 难度选择 -->
        <view class="demo-section">
          <view class="demo-title">难度选择</view>
          <view class="demo-desc">提供简单、普通、困难三种难度模式。</view>
          
          <view class="difficulty-selector">
            <view 
              v-for="(item, index) in difficultyOptions" 
              :key="index"
              class="difficulty-item"
              :class="{ active: selectedDifficulty === index }"
              @click="selectDifficulty(index)"
            >
              <text>{{ item.name }}</text>
              <text class="difficulty-desc">{{ item.desc }}</text>
            </view>
          </view>
          
          <view class="demo-block">
            <zx-giftrain
              ref="difficultyGiftrain"
              width="100%"
              height="380px"
              :rain-time="difficultyGame.gameTime"
              :rain-num="difficultyGame.rainNum"
              :generate-interval="difficultyGame.generateInterval"
              :fall-speed="difficultyGame.fallSpeed"
              @start="onDifficultyStart"
              @gameOver="onDifficultyGameOver"
              @click="onDifficultyClick"
            >
              <view v-if="!difficultyGame.isPlaying" class="start-btn difficulty-btn" @click="startDifficultyGame">
                开始{{ difficultyOptions[selectedDifficulty].name }}模式
              </view>
              
              <view class="game-info difficulty-info">
                <text>{{ difficultyOptions[selectedDifficulty].name }}模式</text>
                <text>得分: {{ difficultyGame.score }}</text>
                <text v-if="difficultyGame.isPlaying">{{ difficultyGame.timeLeft }}s</text>
              </view>
              
              <view v-if="difficultyGame.status === 'ended'" class="game-result difficulty-result">
                <text>{{ difficultyOptions[selectedDifficulty].name }}模式结束</text>
                <text>得分: {{ difficultyGame.finalScore }}</text>
                <text>{{ getDifficultyRating(difficultyGame.finalScore) }}</text>
              </view>
            </zx-giftrain>
          </view>
        </view>

        <!-- 高级功能 -->
        <view class="demo-section">
          <view class="demo-title">高级功能</view>
          <view class="demo-desc">展示更多高级功能，如音效、震动、粒子效果等。</view>
          <view class="demo-block">
            <view class="advanced-controls">
              <view class="control-item">
                <text>音效</text>
                <switch :checked="advancedSettings.soundEnabled" @change="toggleSound" />
              </view>
              <view class="control-item">
                <text>震动</text>
                <switch :checked="advancedSettings.vibrateEnabled" @change="toggleVibrate" />
              </view>
              <view class="control-item">
                <text>特效</text>
                <switch :checked="advancedSettings.effectEnabled" @change="toggleEffect" />
              </view>
            </view>
            
            <zx-giftrain
              ref="advancedGiftrain"
              width="100%"
              height="350px"
              :rain-time="20000"
              :rain-num="6"
              background-color="#1a1a2e"
              @start="onAdvancedStart"
              @gameOver="onAdvancedGameOver"
              @click="onAdvancedClick"
            >
              <view v-if="!advancedGame.isPlaying" class="start-btn advanced-btn" @click="startAdvancedGame">
                高级模式
              </view>
              
              <view class="game-info advanced-info">
                <text>高级模式</text>
                <text>得分: {{ advancedGame.score }}</text>
                <text>连击: {{ advancedGame.combo }}x</text>
              </view>
              
              <!-- 特效层 -->
              <view v-if="advancedSettings.effectEnabled" class="effect-layer">
                <view 
                  v-for="effect in effects" 
                  :key="effect.id"
                  class="click-effect"
                  :style="{
                    left: effect.x + 'px',
                    top: effect.y + 'px',
                    opacity: effect.opacity
                  }"
                >
                  +{{ effect.score }}
                </view>
              </view>
            </zx-giftrain>
          </view>
        </view>

        <!-- API 说明 -->
        <view class="demo-section">
          <view class="demo-title">API 说明</view>
          <view class="demo-desc">组件支持的属性和事件说明。</view>
          <view class="api-table">
            <view class="api-section">
              <text class="api-title">主要属性</text>
              <view class="api-item">
                <text class="api-name">width/height</text>
                <text class="api-desc">容器尺寸</text>
              </view>
              <view class="api-item">
                <text class="api-name">rain-time</text>
                <text class="api-desc">游戏时长(ms)</text>
              </view>
              <view class="api-item">
                <text class="api-name">rain-num</text>
                <text class="api-desc">最大红包数</text>
              </view>
              <view class="api-item">
                <text class="api-name">fall-speed</text>
                <text class="api-desc">下落速度</text>
              </view>
            </view>
            
            <view class="api-section">
              <text class="api-title">事件</text>
              <view class="api-item">
                <text class="api-name">@start</text>
                <text class="api-desc">游戏开始</text>
              </view>
              <view class="api-item">
                <text class="api-name">@gameOver</text>
                <text class="api-desc">游戏结束</text>
              </view>
              <view class="api-item">
                <text class="api-name">@click</text>
                <text class="api-desc">点击红包</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'

// 基础游戏状态
const basicGame = reactive({
  isPlaying: false,
  status: 'ready', // ready, playing, ended
  score: 0,
  finalScore: 0,
  timeLeft: 30,
  timer: null
})

// 自定义游戏状态
const customGame = reactive({
  isPlaying: false,
  score: 0,
  timeLeft: 15,
  timer: null
})

// 难度选择
const selectedDifficulty = ref(1)
const difficultyOptions = [
  {
    name: '简单',
    desc: '慢速度，少数量',
    rainNum: 3,
    generateInterval: 1200,
    fallSpeed: 0.08,
    gameTime: 30000
  },
  {
    name: '普通',
    desc: '中等速度和数量',
    rainNum: 5,
    generateInterval: 800,
    fallSpeed: 0.1,
    gameTime: 30000
  },
  {
    name: '困难',
    desc: '快速度，大数量',
    rainNum: 8,
    generateInterval: 500,
    fallSpeed: 0.15,
    gameTime: 30000
  }
]

// 难度游戏状态
const difficultyGame = reactive({
  isPlaying: false,
  status: 'ready',
  score: 0,
  finalScore: 0,
  timeLeft: 30,
  timer: null,
  rainNum: 5,
  generateInterval: 800,
  fallSpeed: 0.1,
  gameTime: 30000
})

// 高级游戏状态
const advancedGame = reactive({
  isPlaying: false,
  score: 0,
  combo: 0,
  lastClickTime: 0
})

// 高级设置
const advancedSettings = reactive({
  soundEnabled: true,
  vibrateEnabled: true,
  effectEnabled: true
})

// 特效数组
const effects = ref([])

// 组件引用
const basicGiftrain = ref(null)
const customGiftrain = ref(null)
const difficultyGiftrain = ref(null)
const advancedGiftrain = ref(null)

// 计算属性
const currentDifficulty = computed(() => {
  return difficultyOptions[selectedDifficulty.value]
})
  
// ===== 基础游戏 =====
const startBasicGame = () => {
  basicGame.score = 0
  basicGame.timeLeft = 30
  basicGame.status = 'playing'
  basicGiftrain.value.startRain()
}

const onBasicStart = () => {
  basicGame.isPlaying = true
  startBasicTimer()
}

const onBasicGameOver = (result) => {
  basicGame.isPlaying = false
  basicGame.status = 'ended'
  basicGame.finalScore = result.clickedCount
  clearBasicTimer()
}

const onBasicClick = (data) => {
  basicGame.score = data.clickedCount
  if (advancedSettings.vibrateEnabled) {
    uni.vibrateShort()
  }
}

const startBasicTimer = () => {
  basicGame.timer = setInterval(() => {
    basicGame.timeLeft--
    if (basicGame.timeLeft <= 0) {
      basicGiftrain.value.stopRain()
    }
  }, 1000)
}

const clearBasicTimer = () => {
  if (basicGame.timer) {
    clearInterval(basicGame.timer)
    basicGame.timer = null
  }
}

// ===== 自定义游戏 =====
const startCustomGame = () => {
  customGame.score = 0
  customGame.timeLeft = 15
  customGiftrain.value.startRain()
}

const onCustomStart = () => {
  customGame.isPlaying = true
  startCustomTimer()
}

const onCustomGameOver = (result) => {
  customGame.isPlaying = false
  clearCustomTimer()
  uni.showToast({
    title: `快速模式得分: ${result.clickedCount}`,
    icon: 'none'
  })
}

const onCustomClick = (data) => {
  customGame.score = data.clickedCount
}

const startCustomTimer = () => {
  customGame.timer = setInterval(() => {
    customGame.timeLeft--
    if (customGame.timeLeft <= 0) {
      customGiftrain.value.stopRain()
    }
  }, 1000)
}

const clearCustomTimer = () => {
  if (customGame.timer) {
    clearInterval(customGame.timer)
    customGame.timer = null
  }
}

// ===== 难度选择 =====
const selectDifficulty = (index) => {
  selectedDifficulty.value = index
  const difficulty = difficultyOptions[index]
  difficultyGame.rainNum = difficulty.rainNum
  difficultyGame.generateInterval = difficulty.generateInterval
  difficultyGame.fallSpeed = difficulty.fallSpeed
  difficultyGame.gameTime = difficulty.gameTime
}

const startDifficultyGame = () => {
  difficultyGame.score = 0
  difficultyGame.timeLeft = 30
  difficultyGame.status = 'playing'
  difficultyGiftrain.value.startRain()
}

const onDifficultyStart = () => {
  difficultyGame.isPlaying = true
  startDifficultyTimer()
}

const onDifficultyGameOver = (result) => {
  difficultyGame.isPlaying = false
  difficultyGame.status = 'ended'
  difficultyGame.finalScore = result.clickedCount
  clearDifficultyTimer()
}

const onDifficultyClick = (data) => {
  difficultyGame.score = data.clickedCount
}

const startDifficultyTimer = () => {
  difficultyGame.timer = setInterval(() => {
    difficultyGame.timeLeft--
    if (difficultyGame.timeLeft <= 0) {
      difficultyGiftrain.value.stopRain()
    }
  }, 1000)
}

const clearDifficultyTimer = () => {
  if (difficultyGame.timer) {
    clearInterval(difficultyGame.timer)
    difficultyGame.timer = null
  }
}

const getDifficultyRating = (score) => {
  const difficulty = difficultyOptions[selectedDifficulty.value]
  if (difficulty.name === '简单') {
    return score >= 15 ? '优秀!' : score >= 10 ? '良好' : '继续努力'
  } else if (difficulty.name === '普通') {
    return score >= 25 ? '优秀!' : score >= 18 ? '良好' : '继续努力'
  } else {
    return score >= 35 ? '优秀!' : score >= 25 ? '良好' : '继续努力'
  }
}

// ===== 高级功能 =====
const startAdvancedGame = () => {
  advancedGame.score = 0
  advancedGame.combo = 0
  advancedGame.lastClickTime = 0
  effects.value = []
  advancedGiftrain.value.startRain()
}

const onAdvancedStart = () => {
  advancedGame.isPlaying = true
}

const onAdvancedGameOver = (result) => {
  advancedGame.isPlaying = false
  uni.showModal({
    title: '高级模式结束',
    content: `得分: ${result.clickedCount}\n最高连击: ${advancedGame.combo}`,
    showCancel: false
  })
}

const onAdvancedClick = (data) => {
  advancedGame.score = data.clickedCount
  
  // 连击计算
  const now = Date.now()
  if (now - advancedGame.lastClickTime < 1000) {
    advancedGame.combo++
  } else {
    advancedGame.combo = 1
  }
  advancedGame.lastClickTime = now
  
  // 音效
  if (advancedSettings.soundEnabled) {
    // 这里可以播放音效
    console.log('播放音效')
  }
  
  // 震动
  if (advancedSettings.vibrateEnabled) {
    uni.vibrateShort()
  }
  
  // 特效
  if (advancedSettings.effectEnabled && data.item) {
    addClickEffect(data.item)
  }
}

const addClickEffect = (item) => {
  // 安全检查，确保item存在且有必要的属性
  if (!item || typeof item.left === 'undefined' || typeof item.top === 'undefined') {
    console.warn('addClickEffect: item参数无效', item)
    return
  }
  
  const effect = {
    id: Date.now() + Math.random(),
    x: item.left,
    y: item.top,
    score: advancedGame.combo,
    opacity: 1
  }
  
  effects.value.push(effect)
  
  // 动画效果
  setTimeout(() => {
    const index = effects.value.findIndex(e => e.id === effect.id)
    if (index > -1) {
      effects.value[index].opacity = 0
      setTimeout(() => {
        const idx = effects.value.findIndex(e => e.id === effect.id)
        if (idx > -1) {
          effects.value.splice(idx, 1)
        }
      }, 300)
    }
  }, 100)
}

// 设置切换
const toggleSound = (e) => {
  advancedSettings.soundEnabled = e.detail.value
}

const toggleVibrate = (e) => {
  advancedSettings.vibrateEnabled = e.detail.value
}

const toggleEffect = (e) => {
  advancedSettings.effectEnabled = e.detail.value
}

onBeforeUnmount(() => {
  // 清理所有定时器
  clearBasicTimer()
  clearCustomTimer()
  clearDifficultyTimer()
})
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background: #f5f5f5;
}

.content {
  padding: 20rpx;
}

.demo-section {
  margin-bottom: 40rpx;
  background: white;
  border-radius: 16rpx;
  overflow: hidden;
}

.demo-title {
  padding: 30rpx;
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
}

.demo-desc {
  padding: 20rpx 30rpx;
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.demo-block {
  padding: 30rpx;
  position: relative;
}

// 游戏UI样式
.start-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20rpx 40rpx;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  border-radius: 50rpx;
  font-size: 32rpx;
  z-index: 100;
  box-shadow: 0 8rpx 20rpx rgba(255, 107, 107, 0.3);
  
  &.custom-btn {
    background: linear-gradient(135deg, #4facfe, #00f2fe);
    box-shadow: 0 8rpx 20rpx rgba(79, 172, 254, 0.3);
  }
  
  &.difficulty-btn {
    background: linear-gradient(135deg, #a8edea, #fed6e3);
    color: #333;
    box-shadow: 0 8rpx 20rpx rgba(168, 237, 234, 0.3);
  }
  
  &.advanced-btn {
    background: linear-gradient(135deg, #667eea, #764ba2);
    box-shadow: 0 8rpx 20rpx rgba(102, 126, 234, 0.3);
  }
}

.game-info {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  z-index: 50;
  
  text {
    display: block;
    color: #333;
    font-size: 28rpx;
    margin-bottom: 10rpx;
    background: rgba(255, 255, 255, 0.9);
    padding: 8rpx 16rpx;
    border-radius: 20rpx;
    margin-bottom: 8rpx;
  }
  
  &.custom-info text {
    background: rgba(240, 248, 255, 0.9);
    color: #0066cc;
  }
  
  &.difficulty-info text {
    background: rgba(168, 237, 234, 0.9);
    color: #333;
  }
  
  &.advanced-info text {
    background: rgba(26, 26, 46, 0.9);
    color: #fff;
  }
}

.game-result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  padding: 40rpx;
  border-radius: 20rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
  
  text {
    display: block;
    margin-bottom: 20rpx;
    
    &:first-child {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
    }
    
    &:last-child {
      font-size: 48rpx;
      color: #ff6b6b;
      font-weight: bold;
    }
  }
  
  &.difficulty-result {
    text:last-child {
      color: #4facfe;
    }
  }
}

// 难度选择
.difficulty-selector {
  display: flex;
  padding: 30rpx;
  gap: 20rpx;
}

.difficulty-item {
  flex: 1;
  padding: 30rpx 20rpx;
  background: #f8f9fa;
  border-radius: 16rpx;
  text-align: center;
  border: 2rpx solid transparent;
  transition: all 0.3s ease;
  
  &.active {
    background: #e3f2fd;
    border-color: #2196f3;
    transform: translateY(-4rpx);
  }
  
  text {
    display: block;
    
    &:first-child {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 10rpx;
    }
    
    &.difficulty-desc {
      font-size: 24rpx;
      color: #666;
    }
  }
}

// 高级控制
.advanced-controls {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-bottom: 30rpx;
  padding: 30rpx;
  background: #f8f9fa;
  border-radius: 16rpx;
}

.control-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  text {
    font-size: 32rpx;
    color: #333;
  }
}

// 特效层
.effect-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 20;
}

.click-effect {
  position: absolute;
  font-size: 32rpx;
  font-weight: bold;
  color: #ffd700;
  text-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.5);
  animation: floatUp 0.8s ease-out forwards;
}

@keyframes floatUp {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-60rpx) scale(1.2);
    opacity: 0;
  }
}

// API 表格
.api-table {
  padding: 30rpx;
}

.api-section {
  margin-bottom: 40rpx;
  
  .api-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 20rpx;
    padding-bottom: 10rpx;
    border-bottom: 2rpx solid #e0e0e0;
  }
}

.api-item {
  display: flex;
  justify-content: space-between;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  
  .api-name {
    font-size: 28rpx;
    color: #2196f3;
    font-family: monospace;
  }
  
  .api-desc {
    font-size: 28rpx;
    color: #666;
    text-align: right;
    flex: 1;
    margin-left: 20rpx;
  }
}
</style>