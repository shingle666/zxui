<template>
  <view class="page">
    <!-- 导航栏 -->
    <zx-navbar title="你藏我猜" :border="false"></zx-navbar>
    
    <!-- 内容区域 -->
    <view class="content">
      <!-- 基础用法 -->
      <view class="demo-section">
        <zx-title title="基础用法" type="line" color="#3c9cff"></zx-title>
        <view class="demo-item">
          <zx-guessgift
            ref="guessgift1"
            width="100%"
            height="400px"
            :prize-index="prizeIndex1"
            :turns-number="turnNum1"
            @start-turns="onStartTurns"
            @end-turns="onEndTurns"
            @bowl-click="onBowlClick1"
          />
          <view class="button-group">
            <button class="demo-btn" @click="gameStart1">开始游戏</button>
            <button class="demo-btn secondary" @click="resetGame1">重置游戏</button>
          </view>
          <view class="result-info" v-if="result1">
            <text class="result-text" :class="result1.isWin ? 'win' : 'lose'">
              {{ result1.isWin ? '🎉 恭喜中奖！' : '😢 很遗憾，没有中奖' }}
            </text>
            <text class="result-detail">中奖位置：第{{ result1.prizeIndex + 1 }}个碗</text>
          </view>
        </view>
      </view>
      
      <!-- 自定义配置 -->
      <view class="demo-section">
        <zx-title title="自定义配置" type="line" color="#3c9cff"></zx-title>
        <view class="demo-item">
          <view class="config-panel">
            <view class="config-item">
              <text class="config-label">交换次数：</text>
              <zx-input-number 
                v-model="turnNum2" 
                :min="5" 
                :max="50" 
                :step="5"
              ></zx-input-number>
            </view>
            <view class="config-item">
              <text class="config-label">动画频率(ms)：</text>
              <zx-input-number 
                v-model="frequency2" 
                :min="100" 
                :max="1000" 
                :step="100"
              ></zx-input-number>
            </view>
            <view class="config-item">
              <text class="config-label">抬起高度(px)：</text>
              <zx-input-number 
                v-model="raiseHeight2" 
                :min="30" 
                :max="100" 
                :step="10"
              ></zx-input-number>
            </view>
            <view class="config-item">
              <text class="config-label">中奖位置：</text>
              <zx-radio-group v-model="prizeIndex2" direction="horizontal">
                <zx-radio name="-1" label="随机"></zx-radio>
                <zx-radio name="0" label="第1个"></zx-radio>
                <zx-radio name="1" label="第2个"></zx-radio>
                <zx-radio name="2" label="第3个"></zx-radio>
              </zx-radio-group>
            </view>
          </view>
          
          <zx-guessgift
            ref="guessgift2"
            width="100%"
            height="400px"
            :prize-index="Number(prizeIndex2)"
            :turns-number="turnNum2"
            :turns-frequency="frequency2"
            :raise-height="raiseHeight2"
            @start-turns="onStartTurns"
            @end-turns="onEndTurns"
            @bowl-click="onBowlClick2"
          />
          <view class="button-group">
            <button class="demo-btn" @click="gameStart2">开始游戏</button>
            <button class="demo-btn secondary" @click="resetGame2">重置游戏</button>
          </view>
          <view class="result-info" v-if="result2">
            <text class="result-text" :class="result2.isWin ? 'win' : 'lose'">
              {{ result2.isWin ? '🎉 恭喜中奖！' : '😢 很遗憾，没有中奖' }}
            </text>
            <text class="result-detail">中奖位置：第{{ result2.prizeIndex + 1 }}个碗</text>
          </view>
        </view>
      </view>
      
      <!-- 自定义图片 -->
      <view class="demo-section">
        <zx-title title="自定义图片" type="line" color="#3c9cff"></zx-title>
        <view class="demo-item">
          <zx-guessgift
            ref="guessgift3"
            width="100%"
            height="400px"
            :prize-index="prizeIndex3"
            :turns-number="15"
            :turns-frequency="400"
            bowl-img="https://img14.360buyimg.com/imagetools/jfs/t1/213395/37/9376/5774/61cc34b8Ec3d2eddd/1ddf6d42663e1285.png"
            prize-img="https://img13.360buyimg.com/imagetools/jfs/t1/219815/14/9349/4725/61cc34b8E059ebbd2/55e8002ae82a01ea.png"
            @start-turns="onStartTurns"
            @end-turns="onEndTurns"
            @bowl-click="onBowlClick3"
          />
          <view class="button-group">
            <button class="demo-btn" @click="gameStart3">开始游戏</button>
            <button class="demo-btn secondary" @click="resetGame3">重置游戏</button>
          </view>
          <view class="result-info" v-if="result3">
            <text class="result-text" :class="result3.isWin ? 'win' : 'lose'">
              {{ result3.isWin ? '🎉 恭喜中奖！' : '😢 很遗憾，没有中奖' }}
            </text>
            <text class="result-detail">中奖位置：第{{ result3.prizeIndex + 1 }}个碗</text>
          </view>
        </view>
      </view>
      
      <!-- 游戏统计 -->
      <view class="demo-section">
        <zx-title title="游戏统计" type="line" color="#3c9cff"></zx-title>
        <view class="stats-panel">
          <view class="stats-item">
            <text class="stats-number">{{ gameStats.totalGames }}</text>
            <text class="stats-label">总游戏次数</text>
          </view>
          <view class="stats-item">
            <text class="stats-number">{{ gameStats.winGames }}</text>
            <text class="stats-label">中奖次数</text>
          </view>
          <view class="stats-item">
            <text class="stats-number">{{ winRate }}%</text>
            <text class="stats-label">中奖率</text>
          </view>
        </view>
        <button class="demo-btn secondary" @click="resetStats">重置统计</button>
      </view>
    </view>
  </view>
</template>

<script>
import ZxGuessgift from '@/components/zx-guessgift/zx-guessgift.vue'

export default {
  components: {
    ZxGuessgift
  },
  data() {
    return {
      // 基础用法
      prizeIndex1: 1,
      turnNum1: 20,
      result1: null,
      
      // 自定义配置
      prizeIndex2: '-1',
      turnNum2: 25,
      frequency2: 500,
      raiseHeight2: 50,
      result2: null,
      
      // 自定义图片
      prizeIndex3: 0,
      result3: null,
      
      // 游戏统计
      gameStats: {
        totalGames: 0,
        winGames: 0
      }
    }
  },
  computed: {
    winRate() {
      if (this.gameStats.totalGames === 0) return 0
      return Math.round((this.gameStats.winGames / this.gameStats.totalGames) * 100)
    }
  },
  onLoad() {
    // 从本地存储加载统计数据
    this.loadStats()
  },
  methods: {
    // 游戏开始
    gameStart1() {
      this.result1 = null
      this.$refs.guessgift1.start()
    },
    
    gameStart2() {
      this.result2 = null
      this.$refs.guessgift2.start()
    },
    
    gameStart3() {
      this.result3 = null
      this.$refs.guessgift3.start()
    },
    
    // 重置游戏
    resetGame1() {
      this.result1 = null
      this.prizeIndex1 = Math.floor(Math.random() * 3)
    },
    
    resetGame2() {
      this.result2 = null
      if (this.prizeIndex2 === '-1') {
        // 保持随机
      } else {
        this.prizeIndex2 = String(Math.floor(Math.random() * 3))
      }
    },
    
    resetGame3() {
      this.result3 = null
      this.prizeIndex3 = Math.floor(Math.random() * 3)
    },
    
    // 事件处理
    onStartTurns() {
      console.log('开始抽奖')
      uni.showToast({
        title: '游戏开始！',
        icon: 'none',
        duration: 1000
      })
    },
    
    onEndTurns() {
      console.log('抽奖结束')
      uni.showToast({
        title: '请选择一个碗',
        icon: 'none',
        duration: 1500
      })
    },
    
    onBowlClick1(result) {
      this.result1 = result
      this.updateStats(result.isWin)
      this.showResult(result)
    },
    
    onBowlClick2(result) {
      this.result2 = result
      this.updateStats(result.isWin)
      this.showResult(result)
    },
    
    onBowlClick3(result) {
      this.result3 = result
      this.updateStats(result.isWin)
      this.showResult(result)
    },
    
    // 显示结果
    showResult(result) {
      const title = result.isWin ? '🎉 恭喜中奖！' : '😢 很遗憾，没有中奖'
      uni.showModal({
        title: '游戏结果',
        content: `${title}\n中奖位置：第${result.prizeIndex + 1}个碗`,
        showCancel: false,
        confirmText: '知道了'
      })
    },
    
    // 更新统计
    updateStats(isWin) {
      this.gameStats.totalGames++
      if (isWin) {
        this.gameStats.winGames++
      }
      this.saveStats()
    },
    
    // 重置统计
    resetStats() {
      uni.showModal({
        title: '确认重置',
        content: '确定要重置游戏统计吗？',
        success: (res) => {
          if (res.confirm) {
            this.gameStats = {
              totalGames: 0,
              winGames: 0
            }
            this.saveStats()
            uni.showToast({
              title: '统计已重置',
              icon: 'success'
            })
          }
        }
      })
    },
    
    // 保存统计到本地
    saveStats() {
      try {
        uni.setStorageSync('guessgift_stats', this.gameStats)
      } catch (e) {
        console.error('保存统计失败:', e)
      }
    },
    
    // 从本地加载统计
    loadStats() {
      try {
        const stats = uni.getStorageSync('guessgift_stats')
        if (stats) {
          this.gameStats = stats
        }
      } catch (e) {
        console.error('加载统计失败:', e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.content {
  padding: 20rpx;
}

.demo-section {
  margin-bottom: 60rpx;
  
  .demo-item {
    background: white;
    border-radius: 20rpx;
    padding: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
    margin-top: 20rpx;
  }
}

.button-group {
  display: flex;
  gap: 20rpx;
  margin-top: 30rpx;
  justify-content: center;
}

.demo-btn {
  flex: 1;
  max-width: 200rpx;
  height: 80rpx;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: bold;
  
  &.secondary {
    background: linear-gradient(45deg, #ffeaa7, #fab1a0);
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.result-info {
  margin-top: 30rpx;
  padding: 20rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
  text-align: center;
  
  .result-text {
    display: block;
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
    
    &.win {
      color: #27ae60;
    }
    
    &.lose {
      color: #e74c3c;
    }
  }
  
  .result-detail {
    display: block;
    font-size: 24rpx;
    color: #666;
  }
}

.config-panel {
  margin-bottom: 30rpx;
  
  .config-item {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
    
    .config-label {
      width: 200rpx;
      font-size: 28rpx;
      color: #333;
    }
  }
}

.stats-panel {
  display: flex;
  justify-content: space-around;
  background: white;
  border-radius: 20rpx;
  padding: 40rpx 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  margin-bottom: 30rpx;
  
  .stats-item {
    text-align: center;
    
    .stats-number {
      display: block;
      font-size: 48rpx;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 10rpx;
    }
    
    .stats-label {
      display: block;
      font-size: 24rpx;
      color: #666;
    }
  }
}

/* 响应式适配 */
@media (max-width: 750rpx) {
  .button-group {
    flex-direction: column;
    align-items: center;
    
    .demo-btn {
      max-width: 300rpx;
    }
  }
  
  .stats-panel {
    .stats-item {
      .stats-number {
        font-size: 36rpx;
      }
      
      .stats-label {
        font-size: 22rpx;
      }
    }
  }
}
</style>