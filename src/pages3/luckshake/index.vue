<template>
  <view class="container">
    <scroll-view scroll-y style="flex: 1">
      <view class="content">
        <!-- 基础用法 -->
        <view class="demo-section">
          <view class="demo-title">基础用法</view>
          <view class="demo-desc">最简单的摇一摇抽奖，支持摇晃设备和点击触发。</view>
          <view class="demo-block">
            <zx-luckshake
              ref="basicLuckshake"
              :luck-width="'200px'"
              :luck-height="'160px'"
              @shake-event="onBasicShake"
              @click-shake="onBasicClick"
            >
            </zx-luckshake>
            
            <view class="game-info">
              <text>剩余次数: {{ basicGame.remainCount }}</text>
              <text>总得分: {{ basicGame.totalScore }}</text>
            </view>
            
            <view v-if="basicGame.lastResult" class="result-info">
              <text>{{ basicGame.lastResult }}</text>
            </view>
          </view>
        </view>

        <!-- 自定义图片 -->
        <view class="demo-section">
          <view class="demo-title">自定义红包图片</view>
          <view class="demo-desc">可以自定义红包的上下两部分图片。</view>
          <view class="demo-block">
            <zx-luckshake
              ref="customImageLuckshake"
              :luck-width="'250px'"
              :luck-height="'200px'"
              luck-img-top="/static/demo/redpacket-top.png"
              luck-img-bottom="/static/demo/redpacket-bottom.png"
              @shake-event="onCustomImageShake"
              @click-shake="onCustomImageClick"
            >
            </zx-luckshake>
            
            <view class="game-info">
              <text>剩余次数: {{ customImageGame.remainCount }}</text>
              <text>总得分: {{ customImageGame.totalScore }}</text>
            </view>
            
            <view v-if="customImageGame.lastResult" class="result-info">
              <text>{{ customImageGame.lastResult }}</text>
            </view>
          </view>
        </view>

        <!-- 自定义手势 -->
        <view class="demo-section">
          <view class="demo-title">自定义手势图片</view>
          <view class="demo-desc">可以自定义手势提示图片和样式。</view>
          <view class="demo-block">
            <zx-luckshake
              ref="customPointerLuckshake"
              :luck-width="'180px'"
              :luck-height="'140px'"
              click-point="/static/demo/hand-gesture.png"
              :pointer-style="{
                width: '120px',
                height: '120px',
                borderRadius: '50%'
              }"
              @shake-event="onCustomPointerShake"
              @click-shake="onCustomPointerClick"
            >
            </zx-luckshake>
            
            <view class="game-info">
              <text>剩余次数: {{ customPointerGame.remainCount }}</text>
              <text>总得分: {{ customPointerGame.totalScore }}</text>
            </view>
            
            <view v-if="customPointerGame.lastResult" class="result-info">
              <text>{{ customPointerGame.lastResult }}</text>
            </view>
          </view>
        </view>

        <!-- 高灵敏度 -->
        <view class="demo-section">
          <view class="demo-title">高灵敏度摇晃</view>
          <view class="demo-desc">调整摇晃灵敏度，更容易触发摇一摇。</view>
          <view class="demo-block">
            <zx-luckshake
              ref="sensitivityLuckshake"
              :luck-width="'200px'"
              :luck-height="'160px'"
              :shake-speed="60"
              :duration-animation="1500"
              @shake-event="onSensitivityShake"
              @click-shake="onSensitivityClick"
            >
            </zx-luckshake>
            
            <view class="game-info">
              <text>剩余次数: {{ sensitivityGame.remainCount }}</text>
              <text>总得分: {{ sensitivityGame.totalScore }}</text>
            </view>
            
            <view v-if="sensitivityGame.lastResult" class="result-info">
              <text>{{ sensitivityGame.lastResult }}</text>
            </view>
            
            <view class="tip-info">
              <text>💡 灵敏度设置为 60，更容易触发</text>
            </view>
          </view>
        </view>

        <!-- 禁用手势提示 -->
        <view class="demo-section">
          <view class="demo-title">禁用手势提示</view>
          <view class="demo-desc">不显示手势提示图标，更简洁的界面。</view>
          <view class="demo-block">
            <zx-luckshake
              ref="noPointerLuckshake"
              :luck-width="'200px'"
              :luck-height="'160px'"
              :click-point="false"
              @shake-event="onNoPointerShake"
              @click-shake="onNoPointerClick"
            >
            </zx-luckshake>
            
            <view class="game-info">
              <text>剩余次数: {{ noPointerGame.remainCount }}</text>
              <text>总得分: {{ noPointerGame.totalScore }}</text>
            </view>
            
            <view v-if="noPointerGame.lastResult" class="result-info">
              <text>{{ noPointerGame.lastResult }}</text>
            </view>
          </view>
        </view>

        <!-- 仅点击模式 -->
        <view class="demo-section">
          <view class="demo-title">仅点击模式</view>
          <view class="demo-desc">禁用摇一摇检测，只支持点击触发。</view>
          <view class="demo-block">
            <zx-luckshake
              ref="clickOnlyLuckshake"
              :luck-width="'200px'"
              :luck-height="'160px'"
              :is-shake="false"
              @shake-event="onClickOnlyShake"
              @click-shake="onClickOnlyClick"
            >
            </zx-luckshake>
            
            <view class="game-info">
              <text>剩余次数: {{ clickOnlyGame.remainCount }}</text>
              <text>总得分: {{ clickOnlyGame.totalScore }}</text>
            </view>
            
            <view v-if="clickOnlyGame.lastResult" class="result-info">
              <text>{{ clickOnlyGame.lastResult }}</text>
            </view>
            
            <view class="tip-info">
              <text>💡 已禁用摇一摇，只能点击触发</text>
            </view>
          </view>
        </view>

        <!-- 完整游戏示例 -->
        <view class="demo-section">
          <view class="demo-title">完整游戏示例</view>
          <view class="demo-desc">包含游戏状态、奖品设置、结果展示的完整示例。</view>
          <view class="demo-block">
            <view class="game-container">
              <view class="game-header">
                <text class="game-title">摇一摇抽奖</text>
                <view class="game-stats">
                  <text>剩余: {{ fullGame.remainCount }}次</text>
                  <text>得分: {{ fullGame.totalScore }}</text>
                </view>
              </view>
              
              <zx-luckshake
                ref="fullGameLuckshake"
                :luck-width="'220px'"
                :luck-height="'180px'"
                :shake-speed="80"
                @shake-event="onFullGameShake"
                @click-shake="onFullGameClick"
              >
              </zx-luckshake>
              
              <view v-if="fullGame.isGameOver" class="game-over">
                <text class="game-over-title">游戏结束</text>
                <text class="final-score">最终得分: {{ fullGame.totalScore }}</text>
                <button class="restart-btn" @click="restartFullGame">重新开始</button>
              </view>
              
              <view v-if="fullGame.lastPrize" class="prize-result">
                <text class="prize-text">🎉 {{ fullGame.lastPrize.name }}</text>
                <text class="prize-desc">{{ fullGame.lastPrize.desc }}</text>
              </view>
              
              <view class="prize-list">
                <text class="prize-list-title">奖品列表:</text>
                <view v-for="(prize, index) in prizes" :key="index" class="prize-item">
                  <text class="prize-name">{{ prize.name }}</text>
                  <text class="prize-probability">{{ prize.probability }}%</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 重置按钮 -->
        <view class="demo-section">
          <view class="demo-title">操作按钮</view>
          <view class="demo-desc">重置所有游戏状态。</view>
          <view class="demo-block">
            <button class="reset-btn" @click="resetAllGames">重置所有游戏</button>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import ZxLuckshake from '@/components/zx-luckshake/zx-luckshake.vue'

// 奖品配置
const prizes = [
  { name: '一等奖', desc: '获得100积分', score: 100, probability: 5 },
  { name: '二等奖', desc: '获得50积分', score: 50, probability: 15 },
  { name: '三等奖', desc: '获得20积分', score: 20, probability: 30 },
  { name: '谢谢参与', desc: '获得5积分', score: 5, probability: 50 }
]

// 基础游戏状态
const basicGame = reactive({
  remainCount: 5,
  totalScore: 0,
  lastResult: ''
})

// 自定义图片游戏状态
const customImageGame = reactive({
  remainCount: 5,
  totalScore: 0,
  lastResult: ''
})

// 自定义手势游戏状态
const customPointerGame = reactive({
  remainCount: 5,
  totalScore: 0,
  lastResult: ''
})

// 高灵敏度游戏状态
const sensitivityGame = reactive({
  remainCount: 5,
  totalScore: 0,
  lastResult: ''
})

// 禁用手势游戏状态
const noPointerGame = reactive({
  remainCount: 5,
  totalScore: 0,
  lastResult: ''
})

// 仅点击游戏状态
const clickOnlyGame = reactive({
  remainCount: 5,
  totalScore: 0,
  lastResult: ''
})

// 完整游戏状态
const fullGame = reactive({
  remainCount: 10,
  totalScore: 0,
  lastResult: '',
  lastPrize: null,
  isGameOver: false
})

// 抽奖逻辑
const drawPrize = () => {
  const random = Math.random() * 100
  let currentProbability = 0
  
  for (const prize of prizes) {
    currentProbability += prize.probability
    if (random <= currentProbability) {
      return prize
    }
  }
  
  return prizes[prizes.length - 1] // 默认返回最后一个奖品
}

// 处理游戏逻辑
const handleGameLogic = (gameState, isShake = true) => {
  if (gameState.remainCount <= 0) {
    gameState.lastResult = '抽奖次数已用完'
    return
  }
  
  const prize = drawPrize()
  gameState.remainCount--
  gameState.totalScore += prize.score
  gameState.lastResult = `${isShake ? '摇一摇' : '点击'}获得: ${prize.name} (+${prize.score}分)`
  
  if (gameState === fullGame) {
    gameState.lastPrize = prize
    if (gameState.remainCount <= 0) {
      gameState.isGameOver = true
    }
  }
  
  // 显示结果提示
  uni.showToast({
    title: prize.name,
    icon: 'success',
    duration: 1500
  })
}

// 基础用法事件处理
const onBasicShake = () => {
  handleGameLogic(basicGame, true)
}

const onBasicClick = () => {
  handleGameLogic(basicGame, false)
}

// 自定义图片事件处理
const onCustomImageShake = () => {
  handleGameLogic(customImageGame, true)
}

const onCustomImageClick = () => {
  handleGameLogic(customImageGame, false)
}

// 自定义手势事件处理
const onCustomPointerShake = () => {
  handleGameLogic(customPointerGame, true)
}

const onCustomPointerClick = () => {
  handleGameLogic(customPointerGame, false)
}

// 高灵敏度事件处理
const onSensitivityShake = () => {
  handleGameLogic(sensitivityGame, true)
}

const onSensitivityClick = () => {
  handleGameLogic(sensitivityGame, false)
}

// 禁用手势事件处理
const onNoPointerShake = () => {
  handleGameLogic(noPointerGame, true)
}

const onNoPointerClick = () => {
  handleGameLogic(noPointerGame, false)
}

// 仅点击事件处理
const onClickOnlyShake = () => {
  // 这个不会被调用，因为禁用了摇一摇
  handleGameLogic(clickOnlyGame, true)
}

const onClickOnlyClick = () => {
  handleGameLogic(clickOnlyGame, false)
}

// 完整游戏事件处理
const onFullGameShake = () => {
  if (!fullGame.isGameOver) {
    handleGameLogic(fullGame, true)
  }
}

const onFullGameClick = () => {
  if (!fullGame.isGameOver) {
    handleGameLogic(fullGame, false)
  }
}

// 重启完整游戏
const restartFullGame = () => {
  fullGame.remainCount = 10
  fullGame.totalScore = 0
  fullGame.lastResult = ''
  fullGame.lastPrize = null
  fullGame.isGameOver = false
}

// 重置所有游戏
const resetAllGames = () => {
  // 重置基础游戏
  basicGame.remainCount = 5
  basicGame.totalScore = 0
  basicGame.lastResult = ''
  
  // 重置自定义图片游戏
  customImageGame.remainCount = 5
  customImageGame.totalScore = 0
  customImageGame.lastResult = ''
  
  // 重置自定义手势游戏
  customPointerGame.remainCount = 5
  customPointerGame.totalScore = 0
  customPointerGame.lastResult = ''
  
  // 重置高灵敏度游戏
  sensitivityGame.remainCount = 5
  sensitivityGame.totalScore = 0
  sensitivityGame.lastResult = ''
  
  // 重置禁用手势游戏
  noPointerGame.remainCount = 5
  noPointerGame.totalScore = 0
  noPointerGame.lastResult = ''
  
  // 重置仅点击游戏
  clickOnlyGame.remainCount = 5
  clickOnlyGame.totalScore = 0
  clickOnlyGame.lastResult = ''
  
  // 重置完整游戏
  restartFullGame()
  
  uni.showToast({
    title: '已重置所有游戏',
    icon: 'success'
  })
}
</script>

<style scoped>
.container {
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.content {
  padding: 20rpx;
}

.demo-section {
  margin-bottom: 60rpx;
  background: white;
  border-radius: 20rpx;
  padding: 30rpx;
  box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.1);
}

.demo-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  text-align: center;
}

.demo-desc {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 30rpx;
  text-align: center;
  line-height: 1.5;
}

.demo-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 20rpx;
  background: #f8f9fa;
  border-radius: 16rpx;
  min-height: 400rpx;
  justify-content: center;
}

.game-info {
  margin-top: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.game-info text {
  font-size: 28rpx;
  color: #333;
  padding: 8rpx 16rpx;
  background: white;
  border-radius: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.result-info {
  margin-top: 20rpx;
  padding: 20rpx;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 16rpx;
  box-shadow: 0 4rpx 15rpx rgba(79, 172, 254, 0.3);
}

.result-info text {
  color: white;
  font-size: 28rpx;
  font-weight: 500;
}

.tip-info {
  margin-top: 20rpx;
  padding: 16rpx 24rpx;
  background: #fff3cd;
  border: 2rpx solid #ffeaa7;
  border-radius: 12rpx;
}

.tip-info text {
  color: #856404;
  font-size: 24rpx;
}

/* 完整游戏样式 */
.game-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30rpx;
  padding: 20rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16rpx;
}

.game-title {
  font-size: 32rpx;
  font-weight: bold;
  color: white;
}

.game-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8rpx;
}

.game-stats text {
  font-size: 24rpx;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  padding: 6rpx 12rpx;
  border-radius: 12rpx;
}

.game-over {
  margin-top: 30rpx;
  padding: 30rpx;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15rpx;
  box-shadow: 0 8rpx 25rpx rgba(255, 107, 107, 0.3);
}

.game-over-title {
  font-size: 32rpx;
  font-weight: bold;
  color: white;
}

.final-score {
  font-size: 28rpx;
  color: white;
}

.restart-btn {
  padding: 16rpx 32rpx;
  background: white;
  color: #ff6b6b;
  border: none;
  border-radius: 25rpx;
  font-size: 28rpx;
  font-weight: 500;
}

.prize-result {
  margin-top: 20rpx;
  padding: 25rpx;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  border-radius: 16rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
  box-shadow: 0 4rpx 15rpx rgba(252, 182, 159, 0.3);
}

.prize-text {
  font-size: 30rpx;
  font-weight: bold;
  color: #d63031;
}

.prize-desc {
  font-size: 26rpx;
  color: #636e72;
}

.prize-list {
  margin-top: 30rpx;
  width: 100%;
  padding: 20rpx;
  background: #f1f3f4;
  border-radius: 12rpx;
}

.prize-list-title {
  font-size: 26rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 15rpx;
  display: block;
}

.prize-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12rpx 0;
  border-bottom: 1rpx solid #e9ecef;
}

.prize-item:last-child {
  border-bottom: none;
}

.prize-name {
  font-size: 24rpx;
  color: #495057;
}

.prize-probability {
  font-size: 22rpx;
  color: #6c757d;
  background: #e9ecef;
  padding: 4rpx 8rpx;
  border-radius: 8rpx;
}

.reset-btn {
  width: 100%;
  padding: 25rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 16rpx;
  font-size: 32rpx;
  font-weight: 500;
  box-shadow: 0 8rpx 25rpx rgba(102, 126, 234, 0.3);
}

.reset-btn:active {
  transform: translateY(2rpx);
  box-shadow: 0 4rpx 15rpx rgba(102, 126, 234, 0.3);
}
</style>