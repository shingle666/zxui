<template>
  <view class="page">
    <!-- 页面标题 -->
    <zx-navbar title="砸金蛋组件" />
    
    <view class="demo-container">
      <!-- 基础用法 -->
      <zx-section title="基础用法" padding>
        <view class="demo-block">
          <zx-hiteggs @click="onEggClick" @hit="onEggHit" />
        </view>
      </zx-section>
      
      <!-- 自定义数量 -->
      <zx-section title="自定义数量" padding>
        <view class="demo-block">
          <zx-hiteggs :num="6" @hit="onEggHit" />
        </view>
      </zx-section>
      
      <!-- 配置奖品 -->
      <zx-section title="配置奖品" padding>
        <view class="demo-block">
          <zx-hiteggs 
            ref="prizeGameRef"
            :num="9" 
            :prizes="prizes" 
            @hit="onPrizeHit"
            @allHit="onAllHit"
          />
          <view class="prize-info">
            <text class="prize-text">已砸开：{{ hitCount }}/9</text>
            <button 
              class="reset-btn" 
              @click="resetPrizeGame"
              :disabled="hitCount === 0"
            >
              重新开始
            </button>
          </view>
        </view>
      </zx-section>
      
      <!-- 自定义样式 -->
      <zx-section title="自定义样式" padding>
        <view class="demo-block">
          <zx-hiteggs 
            :num="4"
            width="120px"
            height="120px"
            gap="20px"
            backgroundColor="#fff3cd"
            :prizes="customPrizes"
            @hit="onCustomHit"
          />
        </view>
      </zx-section>
      
      <!-- 禁用状态 -->
      <zx-section title="禁用状态" padding>
        <view class="demo-block">
          <zx-hiteggs 
            :num="6"
            :disabled="gameDisabled"
            @hit="onDisabledGameHit"
          />
          <view class="control-btns">
            <button 
              class="control-btn" 
              @click="toggleGameState"
            >
              {{ gameDisabled ? '启用游戏' : '禁用游戏' }}
            </button>
          </view>
        </view>
      </zx-section>
      
      <!-- 不显示锤子 -->
      <zx-section title="隐藏锤子" padding>
        <view class="demo-block">
          <zx-hiteggs 
            :num="6"
            :showHammer="false"
            @hit="onNoHammerHit"
          />
        </view>
      </zx-section>
      
      <!-- 手动控制 -->
      <zx-section title="手动控制" padding>
        <view class="demo-block">
          <zx-hiteggs 
            ref="manualGameRef"
            :num="6"
            :disabled="true"
            :prizes="manualPrizes"
          />
          <view class="manual-controls">
            <view class="manual-grid">
              <button 
                v-for="(egg, index) in 6" 
                :key="index"
                class="manual-btn"
                @click="manualHit(index)"
                :disabled="hitEggs.includes(index)"
              >
                砸第{{ index + 1 }}个
              </button>
            </view>
            <button class="reset-btn" @click="resetManualGame">
              重置游戏
            </button>
          </view>
        </view>
      </zx-section>
      
      <!-- 事件日志 -->
      <zx-section title="事件日志" padding>
        <view class="log-container">
          <view class="log-header">
            <text class="log-title">操作记录</text>
            <button class="clear-btn" @click="clearLogs">清空</button>
          </view>
          <scroll-view class="log-list" scroll-y>
            <view 
              v-for="(log, index) in logs" 
              :key="index" 
              class="log-item"
            >
              <text class="log-time">{{ log.time }}</text>
              <text class="log-content">{{ log.content }}</text>
            </view>
            <view v-if="logs.length === 0" class="log-empty">
              暂无操作记录
            </view>
          </scroll-view>
        </view>
      </zx-section>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 引用
const prizeGameRef = ref()
const manualGameRef = ref()

// 响应式数据
const hitCount = ref(0)
const gameDisabled = ref(false)
const hitEggs = ref([])
const logs = ref([])

// 奖品配置
const prizes = reactive([
  { text: '一等奖', image: '/static/logo.png' },
  { text: '二等奖', image: '/static/logo.png' },
  { text: '三等奖' },
  { text: '谢谢参与' },
  null, // 空奖品
  { text: '红包', image: '/static/logo.png' },
  { text: '优惠券' },
  { text: '积分+100' },
  { text: '再来一次' }
])

const customPrizes = reactive([
  { text: '大奖', image: '/static/logo.png' },
  { text: '小奖' },
  null,
  { text: '特等奖', image: '/static/logo.png' }
])

const manualPrizes = reactive([
  { text: '手动奖1' },
  { text: '手动奖2' },
  { text: '手动奖3' },
  null,
  { text: '手动奖5' },
  { text: '手动奖6' }
])

// 添加日志
const addLog = (content) => {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
  logs.value.unshift({ time, content })
  
  // 限制日志数量
  if (logs.value.length > 50) {
    logs.value = logs.value.slice(0, 50)
  }
}

// 基础事件处理
const onEggClick = (data) => {
  addLog(`点击了第${data.index + 1}个金蛋`)
}

const onEggHit = (data) => {
  addLog(`砸开了第${data.index + 1}个金蛋`)
  uni.showToast({
    title: '砸开了！',
    icon: 'success'
  })
}

// 奖品游戏事件处理
const onPrizeHit = (data) => {
  const { index, prize, hitCount: count } = data
  hitCount.value = count
  
  if (prize) {
    addLog(`砸开第${index + 1}个金蛋，获得：${prize.text}`)
    uni.showToast({
      title: `恭喜获得：${prize.text}`,
      icon: 'success',
      duration: 2000
    })
  } else {
    addLog(`砸开第${index + 1}个金蛋，很遗憾没有中奖`)
    uni.showToast({
      title: '很遗憾，没有中奖',
      icon: 'none'
    })
  }
}

const onAllHit = (data) => {
  const { prizes: wonPrizes } = data
  const prizeTexts = wonPrizes.map(p => p?.text).filter(Boolean)
  
  addLog(`游戏结束！共获得${prizeTexts.length}个奖品：${prizeTexts.join('、')}`)
  
  uni.showModal({
    title: '游戏结束',
    content: `恭喜您获得了${prizeTexts.length}个奖品！\n${prizeTexts.join('、')}`,
    confirmText: '重新开始',
    cancelText: '查看记录',
    success: (res) => {
      if (res.confirm) {
        resetPrizeGame()
      }
    }
  })
}

// 重置奖品游戏
const resetPrizeGame = () => {
  prizeGameRef.value?.reset()
  hitCount.value = 0
  addLog('重置了奖品游戏')
}

// 自定义样式事件
const onCustomHit = (data) => {
  const { index, prize } = data
  addLog(`自定义样式游戏：砸开第${index + 1}个金蛋${prize ? `，获得${prize.text}` : '，没有中奖'}`)
}

// 禁用游戏控制
const toggleGameState = () => {
  gameDisabled.value = !gameDisabled.value
  addLog(`${gameDisabled.value ? '禁用' : '启用'}了游戏`)
}

const onDisabledGameHit = (data) => {
  addLog(`禁用状态游戏：砸开第${data.index + 1}个金蛋`)
}

// 无锤子游戏
const onNoHammerHit = (data) => {
  addLog(`无锤子游戏：砸开第${data.index + 1}个金蛋`)
}

// 手动控制
const manualHit = (index) => {
  if (hitEggs.value.includes(index)) {
    return
  }
  
  manualGameRef.value?.hitEgg(index)
  hitEggs.value.push(index)
  
  const prize = manualPrizes[index]
  addLog(`手动砸开第${index + 1}个金蛋${prize ? `，获得${prize.text}` : '，没有中奖'}`)
}

const resetManualGame = () => {
  manualGameRef.value?.reset()
  hitEggs.value = []
  addLog('重置了手动控制游戏')
}

// 清空日志
const clearLogs = () => {
  logs.value = []
  uni.showToast({
    title: '日志已清空',
    icon: 'success'
  })
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.demo-container {
  padding-bottom: 40px;
}

.demo-block {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin: 10px 0;
}

.prize-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.prize-text {
  font-size: 14px;
  color: #666;
}

.reset-btn {
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  
  &:disabled {
    background: #c0c4cc;
    cursor: not-allowed;
  }
}

.control-btns {
  margin-top: 20px;
  text-align: center;
}

.control-btn {
  background: #67c23a;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
}

.manual-controls {
  margin-top: 20px;
}

.manual-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.manual-btn {
  background: #e6a23c;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 12px;
  
  &:disabled {
    background: #c0c4cc;
    cursor: not-allowed;
  }
}

.log-container {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin: 10px 0;
}

.log-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.log-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.clear-btn {
  background: #f56c6c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
}

.log-list {
  height: 300px;
}

.log-item {
  display: flex;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
}

.log-time {
  flex-shrink: 0;
  width: 80px;
  font-size: 12px;
  color: #999;
  margin-right: 10px;
}

.log-content {
  flex: 1;
  font-size: 14px;
  color: #333;
  line-height: 1.4;
}

.log-empty {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 40px 0;
}
</style>