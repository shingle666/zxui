<template>
  <view class="container">
    <scroll-view scroll-y style="flex: 1">
      <view class="content">
        <!-- 基础用法 -->
        <view class="demo-section">
          <view class="demo-title">基础用法</view>
          <view class="demo-desc">最简单的抓娃娃机游戏，点击抓取按钮开始游戏。</view>
          <view class="demo-block">
            <zx-dollmachine
              ref="basicDollmachine"
              width="100%"
              height="500px"
              :prize-list="basicPrizeList"
              :prize-index="basicPrizeIndex"
              @init="onBasicInit"
              @start-turns="onBasicStartTurns"
              @end-turns="onBasicEndTurns"
            />
            
            <view class="game-status">
              <text>游戏状态: {{ basicGame.status }}</text>
              <text v-if="basicGame.lastPrize">上次获得: {{ basicGame.lastPrize }}</text>
            </view>
            
            <view class="control-buttons">
              <button @click="resetBasicGame" :disabled="basicGame.isPlaying">重置游戏</button>
            </view>
          </view>
        </view>

        <!-- 自定义配置 -->
        <view class="demo-section">
          <view class="demo-title">自定义配置</view>
          <view class="demo-desc">可以自定义爪子移动速度、抓取时间等参数。</view>
          <view class="demo-block">
            <zx-dollmachine
              ref="customDollmachine"
              width="100%"
              height="480px"
              :prize-list="customPrizeList"
              :prize-index="customPrizeIndex"
              :move-speed="60"
              :grab-time="3000"
              @init="onCustomInit"
              @start-turns="onCustomStartTurns"
              @end-turns="onCustomEndTurns"
            />
            
            <view class="game-status">
              <text>快速模式 - 移动更快，抓取时间更长</text>
              <text v-if="customGame.lastPrize">获得奖品: {{ customGame.lastPrize }}</text>
            </view>
          </view>
        </view>

        <!-- 概率控制 -->
        <view class="demo-section">
          <view class="demo-title">概率控制</view>
          <view class="demo-desc">可以设置不同的中奖概率，模拟真实的抓娃娃机。</view>
          
          <view class="probability-selector">
            <view class="selector-title">选择中奖概率:</view>
            <view class="probability-options">
              <view 
                v-for="(option, index) in probabilityOptions" 
                :key="index"
                class="probability-item"
                :class="{ active: selectedProbability === index }"
                @click="selectProbability(index)"
              >
                <text>{{ option.name }}</text>
                <text class="probability-desc">{{ option.rate }}</text>
              </view>
            </view>
          </view>
          
          <view class="demo-block">
            <zx-dollmachine
              ref="probabilityDollmachine"
              width="100%"
              height="500px"
              :prize-list="probabilityPrizeList"
              :prize-index="probabilityPrizeIndex"
              @init="onProbabilityInit"
              @start-turns="onProbabilityStartTurns"
              @end-turns="onProbabilityEndTurns"
            />
            
            <view class="game-statistics">
              <view class="stat-item">
                <text>总抓取次数: {{ probabilityGame.totalTries }}</text>
              </view>
              <view class="stat-item">
                <text>成功次数: {{ probabilityGame.successCount }}</text>
              </view>
              <view class="stat-item">
                <text>成功率: {{ probabilityGame.successRate }}%</text>
              </view>
            </view>
          </view>
        </view>

        <!-- 奖品展示 -->
        <view class="demo-section">
          <view class="demo-title">丰富奖品</view>
          <view class="demo-desc">展示更多样的奖品类型和样式。</view>
          <view class="demo-block">
            <zx-dollmachine
              ref="richDollmachine"
              width="100%"
              height="520px"
              :prize-list="richPrizeList"
              :prize-index="richPrizeIndex"
              @init="onRichInit"
              @start-turns="onRichStartTurns"
              @end-turns="onRichEndTurns"
            />
            
            <view class="prize-showcase">
              <view class="showcase-title">可获得奖品:</view>
              <view class="prize-grid">
                <view 
                  v-for="(prize, index) in richPrizeList" 
                  :key="index"
                  class="prize-card"
                >
                  <image :src="prize.prizeImg" mode="aspectFit" />
                  <text>{{ prize.prizeName }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 游戏记录 -->
        <view class="demo-section">
          <view class="demo-title">游戏记录</view>
          <view class="demo-desc">记录每次游戏的结果和获得的奖品。</view>
          <view class="demo-block">
            <view class="game-records">
              <view v-if="gameRecords.length === 0" class="no-records">
                <text>暂无游戏记录</text>
              </view>
              <view v-else class="records-list">
                <view 
                  v-for="(record, index) in gameRecords" 
                  :key="index"
                  class="record-item"
                >
                  <view class="record-time">{{ record.time }}</view>
                  <view class="record-result" :class="{ success: record.success }">
                    {{ record.success ? '成功获得: ' + record.prize : '未中奖' }}
                  </view>
                </view>
              </view>
              
              <view class="record-actions">
                <button @click="clearRecords" :disabled="gameRecords.length === 0">
                  清空记录
                </button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// 组件引用
const basicDollmachine = ref(null)
const customDollmachine = ref(null)
const probabilityDollmachine = ref(null)
const richDollmachine = ref(null)

// 基础游戏数据
const basicGame = reactive({
  status: '等待开始',
  isPlaying: false,
  lastPrize: ''
})

const basicPrizeIndex = ref(-1)
const basicPrizeList = reactive([
  {
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/147182/12/2440/6194/5f06cde6Ead240fe8/31082e30a182a5ce.png',
    prizeName: '大鸡腿'
  },
  {
    prizeImg: 'https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png',
    prizeName: 'JOY公仔'
  },
  {
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/128607/26/6643/6790/5f06cd27E9b5e15f7/7509bc7ce2da66b8.png',
    prizeName: 'VIP卡'
  },
  {
    prizeImg: 'https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png',
    prizeName: '小熊玩偶'
  }
])

// 自定义游戏数据
const customGame = reactive({
  lastPrize: ''
})

const customPrizeIndex = ref(-1)
const customPrizeList = reactive([
  {
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/147182/12/2440/6194/5f06cde6Ead240fe8/31082e30a182a5ce.png',
    prizeName: '美味鸡腿'
  },
  {
    prizeImg: 'https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png',
    prizeName: '可爱JOY'
  },
  {
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/128607/26/6643/6790/5f06cd27E9b5e15f7/7509bc7ce2da66b8.png',
    prizeName: '黄金VIP'
  }
])

// 概率控制数据
const selectedProbability = ref(1)
const probabilityOptions = reactive([
  { name: '简单', rate: '70%', probability: 0.7 },
  { name: '普通', rate: '40%', probability: 0.4 },
  { name: '困难', rate: '20%', probability: 0.2 },
  { name: '极难', rate: '5%', probability: 0.05 }
])

const probabilityGame = reactive({
  totalTries: 0,
  successCount: 0,
  successRate: 0
})

const probabilityPrizeIndex = ref(-1)
const probabilityPrizeList = reactive([
  {
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/147182/12/2440/6194/5f06cde6Ead240fe8/31082e30a182a5ce.png',
    prizeName: '香辣鸡腿'
  },
  {
    prizeImg: 'https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png',
    prizeName: 'JOY娃娃'
  },
  {
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/128607/26/6643/6790/5f06cd27E9b5e15f7/7509bc7ce2da66b8.png',
    prizeName: '钻石VIP'
  },
  {
    prizeImg: 'https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png',
    prizeName: '限量熊熊'
  }
])

// 丰富奖品数据
const richPrizeIndex = ref(-1)
const richPrizeList = reactive([
  {
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/147182/12/2440/6194/5f06cde6Ead240fe8/31082e30a182a5ce.png',
    prizeName: '美味大鸡腿'
  },
  {
    prizeImg: 'https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png',
    prizeName: '超萌JOY公仔'
  },
  {
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/128607/26/6643/6790/5f06cd27E9b5e15f7/7509bc7ce2da66b8.png',
    prizeName: '黄金VIP会员卡'
  },
  {
    prizeImg: 'https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png',
    prizeName: '毛绒小熊'
  },
  {
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/147182/12/2440/6194/5f06cde6Ead240fe8/31082e30a182a5ce.png',
    prizeName: '奖励红包'
  },
  {
    prizeImg: 'https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png',
    prizeName: '神秘礼品'
  }
])

// 游戏记录
const gameRecords = ref([])

// 基础游戏事件
const onBasicInit = () => {
  console.log('基础娃娃机初始化完成')
  basicGame.status = '准备就绪'
}

const onBasicStartTurns = () => {
  console.log('基础游戏开始抓取')
  basicGame.status = '抓取中...'
  basicGame.isPlaying = true
  
  // 模拟随机中奖 (30% 概率)
  setTimeout(() => {
    const random = Math.random()
    if (random < 0.3) {
      basicPrizeIndex.value = Math.floor(Math.random() * basicPrizeList.length)
    } else {
      basicPrizeIndex.value = -1
    }
  }, 1000)
}

const onBasicEndTurns = () => {
  console.log('基础游戏抓取结束')
  basicGame.isPlaying = false
  
  if (basicPrizeIndex.value >= 0) {
    const prize = basicPrizeList[basicPrizeIndex.value]
    basicGame.lastPrize = prize.prizeName
    basicGame.status = '抓取成功！'
    
    // 添加游戏记录
    addGameRecord(true, prize.prizeName)
    
    uni.showToast({
      title: `恭喜获得${prize.prizeName}！`,
      icon: 'success'
    })
  } else {
    basicGame.lastPrize = ''
    basicGame.status = '抓取失败'
    
    // 添加游戏记录
    addGameRecord(false)
    
    uni.showToast({
      title: '很遗憾，没有抓到奖品',
      icon: 'none'
    })
  }
  
  // 重置中奖索引
  setTimeout(() => {
    basicPrizeIndex.value = -1
  }, 2000)
}

const resetBasicGame = () => {
  basicGame.status = '准备就绪'
  basicGame.lastPrize = ''
  basicPrizeIndex.value = -1
  basicDollmachine.value?.resetGame()
}

// 自定义游戏事件
const onCustomInit = () => {
  console.log('自定义娃娃机初始化完成')
}

const onCustomStartTurns = () => {
  console.log('自定义游戏开始抓取')
  
  // 快速模式，更高的中奖概率 (50%)
  setTimeout(() => {
    const random = Math.random()
    if (random < 0.5) {
      customPrizeIndex.value = Math.floor(Math.random() * customPrizeList.length)
    } else {
      customPrizeIndex.value = -1
    }
  }, 800)
}

const onCustomEndTurns = () => {
  console.log('自定义游戏抓取结束')
  
  if (customPrizeIndex.value >= 0) {
    const prize = customPrizeList[customPrizeIndex.value]
    customGame.lastPrize = prize.prizeName
    addGameRecord(true, prize.prizeName)
  } else {
    customGame.lastPrize = ''
    addGameRecord(false)
  }
  
  setTimeout(() => {
    customPrizeIndex.value = -1
  }, 2000)
}

// 概率控制事件
const selectProbability = (index) => {
  selectedProbability.value = index
}

const onProbabilityInit = () => {
  console.log('概率控制娃娃机初始化完成')
}

const onProbabilityStartTurns = () => {
  console.log('概率控制游戏开始抓取')
  probabilityGame.totalTries++
  
  const currentProbability = probabilityOptions[selectedProbability.value].probability
  
  setTimeout(() => {
    const random = Math.random()
    if (random < currentProbability) {
      probabilityPrizeIndex.value = Math.floor(Math.random() * probabilityPrizeList.length)
      probabilityGame.successCount++
    } else {
      probabilityPrizeIndex.value = -1
    }
    
    // 更新成功率
    probabilityGame.successRate = Math.round((probabilityGame.successCount / probabilityGame.totalTries) * 100)
  }, 1000)
}

const onProbabilityEndTurns = () => {
  console.log('概率控制游戏抓取结束')
  
  if (probabilityPrizeIndex.value >= 0) {
    const prize = probabilityPrizeList[probabilityPrizeIndex.value]
    addGameRecord(true, prize.prizeName)
  } else {
    addGameRecord(false)
  }
  
  setTimeout(() => {
    probabilityPrizeIndex.value = -1
  }, 2000)
}

// 丰富奖品事件
const onRichInit = () => {
  console.log('丰富奖品娃娃机初始化完成')
}

const onRichStartTurns = () => {
  console.log('丰富奖品游戏开始抓取')
  
  setTimeout(() => {
    const random = Math.random()
    if (random < 0.35) {
      richPrizeIndex.value = Math.floor(Math.random() * richPrizeList.length)
    } else {
      richPrizeIndex.value = -1
    }
  }, 1200)
}

const onRichEndTurns = () => {
  console.log('丰富奖品游戏抓取结束')
  
  if (richPrizeIndex.value >= 0) {
    const prize = richPrizeList[richPrizeIndex.value]
    addGameRecord(true, prize.prizeName)
  } else {
    addGameRecord(false)
  }
  
  setTimeout(() => {
    richPrizeIndex.value = -1
  }, 2000)
}

// 游戏记录管理
const addGameRecord = (success, prize = '') => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  
  gameRecords.value.unshift({
    time,
    success,
    prize
  })
  
  // 只保留最近20条记录
  if (gameRecords.value.length > 20) {
    gameRecords.value = gameRecords.value.slice(0, 20)
  }
}

const clearRecords = () => {
  gameRecords.value = []
  probabilityGame.totalTries = 0
  probabilityGame.successCount = 0
  probabilityGame.successRate = 0
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
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
  line-height: 1.5;
}

.demo-block {
  padding: 30rpx;
}

.game-status {
  margin-top: 20rpx;
  padding: 20rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
  
  text {
    display: block;
    font-size: 28rpx;
    color: #666;
    margin-bottom: 10rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.control-buttons {
  margin-top: 20rpx;
  text-align: center;
  
  button {
    padding: 16rpx 32rpx;
    background: #007aff;
    color: white;
    border: none;
    border-radius: 8rpx;
    font-size: 28rpx;
    
    &:disabled {
      background: #ccc;
    }
  }
}

.probability-selector {
  padding: 30rpx;
  
  .selector-title {
    font-size: 32rpx;
    color: #333;
    margin-bottom: 20rpx;
  }
  
  .probability-options {
    display: flex;
    gap: 20rpx;
  }
  
  .probability-item {
    flex: 1;
    padding: 20rpx;
    background: #f8f9fa;
    border-radius: 12rpx;
    text-align: center;
    border: 2rpx solid transparent;
    
    &.active {
      background: #e3f2fd;
      border-color: #2196f3;
    }
    
    text {
      display: block;
      font-size: 28rpx;
      
      &:first-child {
        color: #333;
        font-weight: bold;
        margin-bottom: 8rpx;
      }
    }
    
    .probability-desc {
      color: #666;
      font-size: 24rpx;
    }
  }
}

.game-statistics {
  margin-top: 20rpx;
  padding: 20rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
  display: flex;
  justify-content: space-between;
  
  .stat-item {
    text-align: center;
    
    text {
      font-size: 26rpx;
      color: #666;
    }
  }
}

.prize-showcase {
  margin-top: 20rpx;
  
  .showcase-title {
    font-size: 30rpx;
    color: #333;
    margin-bottom: 20rpx;
  }
  
  .prize-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
  }
  
  .prize-card {
    padding: 20rpx;
    background: #f8f9fa;
    border-radius: 12rpx;
    text-align: center;
    
    image {
      width: 60rpx;
      height: 60rpx;
      margin-bottom: 10rpx;
    }
    
    text {
      font-size: 24rpx;
      color: #666;
    }
  }
}

.game-records {
  .no-records {
    padding: 60rpx;
    text-align: center;
    
    text {
      font-size: 28rpx;
      color: #999;
    }
  }
  
  .records-list {
    max-height: 400rpx;
    overflow-y: auto;
  }
  
  .record-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .record-time {
      font-size: 26rpx;
      color: #999;
    }
    
    .record-result {
      font-size: 28rpx;
      color: #666;
      
      &.success {
        color: #4caf50;
        font-weight: bold;
      }
    }
  }
  
  .record-actions {
    margin-top: 20rpx;
    text-align: center;
    
    button {
      padding: 16rpx 32rpx;
      background: #ff5722;
      color: white;
      border: none;
      border-radius: 8rpx;
      font-size: 28rpx;
      
      &:disabled {
        background: #ccc;
      }
    }
  }
}
</style>