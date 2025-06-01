<template>
  <view class="page">
    <!-- 页面标题 -->
    <zx-navbar title="摇骰子 ShakeDice" />
    
    <!-- 基础用法 -->
    <zx-section title="基础用法" padding>
      <view class="demo-section">
        <zx-shakedice 
          ref="basicDiceRef"
          @shake="onBasicShake"
          @end="onBasicEnd"
        />
        <view class="demo-desc">点击摇动按钮开始摇骰子，随机生成1-6的结果</view>
      </view>
    </zx-section>
    
    <!-- 指定结果 -->
    <zx-section title="指定结果" padding>
      <view class="demo-section">
        <view class="control-panel">
          <text class="label">指定结果:</text>
          <view class="number-buttons">
            <view 
              v-for="num in 6" 
              :key="num"
              class="number-btn"
              :class="{ active: targetResult === num }"
              @click="setTargetResult(num)"
            >
              {{ num }}
            </view>
            <view 
              class="number-btn"
              :class="{ active: targetResult === -1 }"
              @click="setTargetResult(-1)"
            >
              随机
            </view>
          </view>
        </view>
        
        <zx-shakedice 
          ref="targetDiceRef"
          :id="targetResult"
          :time="2000"
          @shake="onTargetShake"
          @end="onTargetEnd"
        />
        <view class="demo-desc">选择想要的结果，骰子会摇出指定的点数</view>
      </view>
    </zx-section>
    
    <!-- 自定义样式 -->
    <zx-section title="自定义样式" padding>
      <view class="demo-section">
        <zx-shakedice 
          ref="customDiceRef"
          width="350px"
          height="450px"
          dice-size="100px"
          dice-color="#ff6b35"
          dot-color="#ffffff"
          button-text="开始摇动"
          :time="1500"
          @shake="onCustomShake"
          @end="onCustomEnd"
        />
        <view class="demo-desc">自定义骰子大小、颜色和摇动时间</view>
      </view>
    </zx-section>
    
    <!-- 手动控制 -->
    <zx-section title="手动控制" padding>
      <view class="demo-section">
        <zx-shakedice 
          ref="manualDiceRef"
          :show-button="false"
          :show-result="manualShowResult"
          :id="manualResult"
          @shake="onManualShake"
          @end="onManualEnd"
        />
        
        <view class="manual-controls">
          <view class="control-row">
            <zx-button 
              type="primary" 
              @click="startManualShake"
              :disabled="isManualShaking"
            >
              {{ isManualShaking ? '摇动中...' : '手动摇动' }}
            </zx-button>
            
            <zx-button 
              type="default" 
              @click="resetManualDice"
              :disabled="isManualShaking"
            >
              重置
            </zx-button>
          </view>
          
          <view class="control-row">
            <zx-checkbox 
              v-model="manualShowResult"
              :disabled="isManualShaking"
            >
              显示结果
            </zx-checkbox>
          </view>
        </view>
        
        <view class="demo-desc">隐藏默认按钮，使用自定义控制</view>
      </view>
    </zx-section>
    
    <!-- 游戏示例 -->
    <zx-section title="游戏示例" padding>
      <view class="demo-section">
        <view class="game-info">
          <view class="game-stats">
            <view class="stat-item">
              <text class="stat-label">游戏次数:</text>
              <text class="stat-value">{{ gameStats.rounds }}</text>
            </view>
            <view class="stat-item">
              <text class="stat-label">总分:</text>
              <text class="stat-value">{{ gameStats.totalScore }}</text>
            </view>
            <view class="stat-item">
              <text class="stat-label">平均分:</text>
              <text class="stat-value">{{ gameStats.averageScore }}</text>
            </view>
          </view>
          
          <zx-button 
            type="warning" 
            size="small"
            @click="resetGame"
            :disabled="isGamePlaying"
          >
            重置游戏
          </zx-button>
        </view>
        
        <zx-shakedice 
          ref="gameDiceRef"
          :show-button="false"
          dice-color="#4CAF50"
          dot-color="#ffffff"
          @shake="onGameShake"
          @end="onGameEnd"
        />
        
        <view class="game-controls">
          <zx-button 
            type="success" 
            size="large"
            @click="playGame"
            :disabled="isGamePlaying"
          >
            {{ isGamePlaying ? '游戏中...' : '开始游戏' }}
          </zx-button>
        </view>
        
        <view v-if="gameHistory.length > 0" class="game-history">
          <text class="history-title">历史记录:</text>
          <view class="history-list">
            <view 
              v-for="(record, index) in gameHistory.slice(-5)" 
              :key="index"
              class="history-item"
            >
              第{{ record.round }}次: {{ record.result }}点
            </view>
          </view>
        </view>
        
        <view class="demo-desc">完整的游戏示例，包含统计和历史记录</view>
      </view>
    </zx-section>
    
    <!-- 多骰子同时摇动 -->
    <zx-section title="多骰子同时摇动" padding>
      <view class="demo-section">
        <view class="multi-dice">
          <zx-shakedice 
            v-for="(dice, index) in multiDices" 
            :key="index"
            ref="multiDiceRefs"
            :show-button="false"
            :show-result="true"
            width="200px"
            height="250px"
            dice-size="60px"
            :dice-color="dice.color"
            @end="(result) => onMultiDiceEnd(index, result)"
          />
        </view>
        
        <view class="multi-controls">
          <zx-button 
            type="primary" 
            @click="shakeAllDices"
            :disabled="isMultiShaking"
          >
            {{ isMultiShaking ? '摇动中...' : '同时摇动' }}
          </zx-button>
          
          <view v-if="multiResults.length > 0" class="multi-result">
            <text class="result-label">结果:</text>
            <text class="result-text">
              {{ multiResults.join(' + ') }} = {{ multiTotal }}
            </text>
          </view>
        </view>
        
        <view class="demo-desc">同时摇动多个骰子，计算总和</view>
      </view>
    </zx-section>
  </view>
</template>

<script setup>
import { ref, reactive, computed, nextTick } from 'vue'

// 基础用法
const basicDiceRef = ref()

const onBasicShake = () => {
  console.log('基础骰子开始摇动')
}

const onBasicEnd = (result) => {
  console.log('基础骰子结果:', result)
  uni.showToast({
    title: `摇出了 ${result} 点`,
    icon: 'success',
    duration: 1500
  })
}

// 指定结果
const targetDiceRef = ref()
const targetResult = ref(-1)

const setTargetResult = (num) => {
  targetResult.value = num
}

const onTargetShake = () => {
  console.log('指定结果骰子开始摇动')
}

const onTargetEnd = (result) => {
  console.log('指定结果骰子结果:', result)
  const message = targetResult.value === -1 
    ? `随机摇出 ${result} 点` 
    : `按指定摇出 ${result} 点`
  
  uni.showToast({
    title: message,
    icon: 'success',
    duration: 1500
  })
}

// 自定义样式
const customDiceRef = ref()

const onCustomShake = () => {
  console.log('自定义样式骰子开始摇动')
}

const onCustomEnd = (result) => {
  console.log('自定义样式骰子结果:', result)
}

// 手动控制
const manualDiceRef = ref()
const manualResult = ref(-1)
const manualShowResult = ref(true)
const isManualShaking = ref(false)

const startManualShake = () => {
  if (isManualShaking.value) return
  manualDiceRef.value.shake()
}

const resetManualDice = () => {
  manualDiceRef.value.reset()
  manualResult.value = -1
}

const onManualShake = () => {
  isManualShaking.value = true
  console.log('手动控制骰子开始摇动')
}

const onManualEnd = (result) => {
  isManualShaking.value = false
  manualResult.value = result
  console.log('手动控制骰子结果:', result)
}

// 游戏示例
const gameDiceRef = ref()
const isGamePlaying = ref(false)
const gameStats = reactive({
  rounds: 0,
  totalScore: 0
})
const gameHistory = ref([])

const averageScore = computed(() => {
  return gameStats.rounds > 0 
    ? (gameStats.totalScore / gameStats.rounds).toFixed(1) 
    : '0.0'
})

// 修复计算属性
const gameStatsComputed = computed(() => ({
  ...gameStats,
  averageScore: averageScore.value
}))

// 使用计算属性
const gameStatsDisplay = computed(() => gameStatsComputed.value)

const playGame = () => {
  if (isGamePlaying.value) return
  gameDiceRef.value.shake()
}

const resetGame = () => {
  gameStats.rounds = 0
  gameStats.totalScore = 0
  gameHistory.value = []
  
  uni.showToast({
    title: '游戏已重置',
    icon: 'success'
  })
}

const onGameShake = () => {
  isGamePlaying.value = true
  console.log('游戏骰子开始摇动')
}

const onGameEnd = (result) => {
  isGamePlaying.value = false
  gameStats.rounds++
  gameStats.totalScore += result
  
  gameHistory.value.push({
    round: gameStats.rounds,
    result: result
  })
  
  console.log('游戏骰子结果:', result)
  
  uni.showToast({
    title: `第${gameStats.rounds}次: ${result}点`,
    icon: 'success',
    duration: 2000
  })
}

// 多骰子同时摇动
const multiDiceRefs = ref([])
const isMultiShaking = ref(false)
const multiResults = ref([])
const multiDices = ref([
  { color: '#ff6b35' },
  { color: '#4CAF50' },
  { color: '#2196F3' }
])

const multiTotal = computed(() => {
  return multiResults.value.reduce((sum, result) => sum + result, 0)
})

const shakeAllDices = async () => {
  if (isMultiShaking.value) return
  
  isMultiShaking.value = true
  multiResults.value = []
  
  // 同时摇动所有骰子
  await nextTick()
  multiDiceRefs.value.forEach(diceRef => {
    if (diceRef) {
      diceRef.shake()
    }
  })
}

const onMultiDiceEnd = (index, result) => {
  multiResults.value[index] = result
  
  // 检查是否所有骰子都完成了
  if (multiResults.value.length === multiDices.value.length && 
      multiResults.value.every(r => r > 0)) {
    isMultiShaking.value = false
    
    setTimeout(() => {
      uni.showToast({
        title: `总和: ${multiTotal.value}`,
        icon: 'success',
        duration: 2000
      })
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
.page {
  background: #f5f5f5;
  min-height: 100vh;
}

.demo-section {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  
  .demo-desc {
    margin-top: 15px;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;
    font-size: 14px;
    color: #666;
    text-align: center;
  }
}

// 控制面板
.control-panel {
  margin-bottom: 20px;
  
  .label {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    display: block;
  }
  
  .number-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    .number-btn {
      width: 50px;
      height: 50px;
      border: 2px solid #ddd;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
      color: #666;
      background: white;
      transition: all 0.3s ease;
      
      &.active {
        border-color: #ff6b35;
        background: #ff6b35;
        color: white;
      }
      
      &:active {
        transform: scale(0.95);
      }
    }
  }
}

// 手动控制
.manual-controls {
  margin-top: 20px;
  
  .control-row {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

// 游戏信息
.game-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  
  .game-stats {
    display: flex;
    gap: 20px;
    
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .stat-label {
        font-size: 12px;
        color: #666;
        margin-bottom: 5px;
      }
      
      .stat-value {
        font-size: 18px;
        font-weight: bold;
        color: #333;
      }
    }
  }
}

.game-controls {
  margin: 20px 0;
  text-align: center;
}

.game-history {
  margin-top: 20px;
  
  .history-title {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    display: block;
  }
  
  .history-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    .history-item {
      padding: 5px 10px;
      background: #e3f2fd;
      border-radius: 15px;
      font-size: 12px;
      color: #1976d2;
    }
  }
}

// 多骰子
.multi-dice {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.multi-controls {
  text-align: center;
  
  .multi-result {
    margin-top: 15px;
    padding: 10px;
    background: #e8f5e8;
    border-radius: 8px;
    
    .result-label {
      font-size: 14px;
      color: #666;
      margin-right: 10px;
    }
    
    .result-text {
      font-size: 18px;
      font-weight: bold;
      color: #4CAF50;
    }
  }
}

// 响应式设计
@media (max-width: 750px) {
  .game-info {
    flex-direction: column;
    gap: 15px;
    
    .game-stats {
      justify-content: center;
    }
  }
  
  .multi-dice {
    flex-direction: column;
    align-items: center;
  }
  
  .number-buttons {
    justify-content: center;
  }
}
</style>