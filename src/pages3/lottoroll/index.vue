<template>
  <view class="page">
    <!-- 页面标题 -->
    <zx-navbar title="老虎机抽奖" back></zx-navbar>
    
    <view class="content">
      <!-- 基础用法 -->
      <zx-section title="基础用法" padding>
        <view class="demo-item">
          <zx-lottoroll
            ref="basicLottoRef"
            :prize-list="basicPrizeList"
            :prize-index="basicPrizeIndex"
            @start-turns="onBasicStart"
            @end-turns="onBasicEnd"
          />
          <view class="btn-group">
            <zx-button 
              type="primary" 
              size="small" 
              :disabled="basicRolling"
              @click="startBasicLotto"
            >
              {{ basicRolling ? '抽奖中...' : '开始抽奖' }}
            </zx-button>
          </view>
        </view>
      </zx-section>
      
      <!-- 指定中奖结果 -->
      <zx-section title="指定中奖结果" padding>
        <view class="demo-item">
          <zx-lottoroll
            ref="controlLottoRef"
            :prize-list="controlPrizeList"
            :prize-index="controlPrizeIndex"
            @start-turns="onControlStart"
            @end-turns="onControlEnd"
          />
          <view class="btn-group">
            <zx-button 
              type="success" 
              size="small" 
              :disabled="controlRolling"
              @click="startWinLotto"
            >
              中奖测试
            </zx-button>
            <zx-button 
              type="warning" 
              size="small" 
              :disabled="controlRolling"
              @click="startLoseLotto"
            >
              不中奖测试
            </zx-button>
          </view>
        </view>
      </zx-section>
      
      <!-- 自定义样式 -->
      <zx-section title="自定义样式" padding>
        <view class="demo-item">
          <zx-lottoroll
            ref="customLottoRef"
            :prize-list="customPrizeList"
            :prize-index="customPrizeIndex"
            width="120px"
            height="300px"
            item-height="80px"
            background-color="#f8f9fa"
            border-color="#007bff"
            indicator-color="#28a745"
            :turns-number="5"
            :turns-time="4000"
            @start-turns="onCustomStart"
            @end-turns="onCustomEnd"
          />
          <view class="btn-group">
            <zx-button 
              type="info" 
              size="small" 
              :disabled="customRolling"
              @click="startCustomLotto"
            >
              {{ customRolling ? '转动中...' : '开始转动' }}
            </zx-button>
          </view>
        </view>
      </zx-section>
      
      <!-- 纯文字模式 -->
      <zx-section title="纯文字模式" padding>
        <view class="demo-item">
          <zx-lottoroll
            ref="textLottoRef"
            :prize-list="textPrizeList"
            :prize-index="textPrizeIndex"
            width="150px"
            height="250px"
            item-height="50px"
            @start-turns="onTextStart"
            @end-turns="onTextEnd"
          />
          <view class="btn-group">
            <zx-button 
              type="primary" 
              size="small" 
              :disabled="textRolling"
              @click="startTextLotto"
            >
              {{ textRolling ? '抽奖中...' : '文字抽奖' }}
            </zx-button>
          </view>
        </view>
      </zx-section>
      
      <!-- 重置功能 -->
      <zx-section title="重置功能" padding>
        <view class="demo-item">
          <zx-lottoroll
            ref="resetLottoRef"
            :prize-list="resetPrizeList"
            :prize-index="resetPrizeIndex"
            @start-turns="onResetStart"
            @end-turns="onResetEnd"
          />
          <view class="btn-group">
            <zx-button 
              type="primary" 
              size="small" 
              :disabled="resetRolling"
              @click="startResetLotto"
            >
              开始抽奖
            </zx-button>
            <zx-button 
              type="default" 
              size="small" 
              :disabled="resetRolling"
              @click="resetLotto"
            >
              重置
            </zx-button>
          </view>
        </view>
      </zx-section>
      
      <!-- 抽奖结果显示 -->
      <zx-section title="抽奖结果" padding v-if="lastResult">
        <view class="result-item">
          <text class="result-text">{{ lastResult }}</text>
        </view>
      </zx-section>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 基础用法相关
const basicLottoRef = ref()
const basicRolling = ref(false)
const basicPrizeIndex = ref(-1)
const basicPrizeList = ref([
  {
    imagePath: 'https://img11.360buyimg.com/imagetools/jfs/t1/147182/12/2440/6194/5f06cde6Ead240fe8/31082e30a182a5ce.png',
    text: '大鸡腿'
  },
  {
    imagePath: 'https://img11.360buyimg.com/imagetools/jfs/t1/128607/26/6643/6790/5f06cd27E9b5e15f7/7509bc7ce2da66b8.png',
    text: 'VIP'
  },
  {
    imagePath: 'https://img11.360buyimg.com/imagetools/jfs/t1/105385/19/15140/111093/5e6f1506E48bd0dfb/829a98a8cdb4c27f.png',
    text: 'Apple watch'
  },
  {
    imagePath: 'https://img14.360buyimg.com/imagetools/jfs/t1/90507/38/15165/448364/5e6f15b4E5df0c718/4bd4c3d375eec312.png',
    text: '坚果礼盒'
  },
  {
    imagePath: 'https://img14.360buyimg.com/imagetools/jfs/t1/104165/34/15186/96522/5e6f1435E46bc0cb0/d4e878a15bfd9362.png',
    text: '手机'
  }
])

// 控制中奖相关
const controlLottoRef = ref()
const controlRolling = ref(false)
const controlPrizeIndex = ref(-1)
const controlPrizeList = ref([
  { imagePath: '/static/images/prize1.png', text: '一等奖' },
  { imagePath: '/static/images/prize2.png', text: '二等奖' },
  { imagePath: '/static/images/prize3.png', text: '三等奖' },
  { imagePath: '/static/images/thanks.png', text: '谢谢参与' }
])

// 自定义样式相关
const customLottoRef = ref()
const customRolling = ref(false)
const customPrizeIndex = ref(-1)
const customPrizeList = ref([
  { imagePath: '/static/images/diamond.png', text: '钻石' },
  { imagePath: '/static/images/gold.png', text: '黄金' },
  { imagePath: '/static/images/silver.png', text: '白银' },
  { imagePath: '/static/images/bronze.png', text: '青铜' }
])

// 纯文字模式相关
const textLottoRef = ref()
const textRolling = ref(false)
const textPrizeIndex = ref(-1)
const textPrizeList = ref([
  { text: '1000元现金' },
  { text: '500元优惠券' },
  { text: '100元红包' },
  { text: '50元话费' },
  { text: '20元话费' },
  { text: '谢谢参与' }
])

// 重置功能相关
const resetLottoRef = ref()
const resetRolling = ref(false)
const resetPrizeIndex = ref(-1)
const resetPrizeList = ref([
  { text: '奖品A' },
  { text: '奖品B' },
  { text: '奖品C' },
  { text: '奖品D' }
])

// 抽奖结果
const lastResult = ref('')

// 基础用法事件
const onBasicStart = () => {
  basicRolling.value = true
  console.log('基础抽奖开始')
}

const onBasicEnd = () => {
  basicRolling.value = false
  const prize = basicPrizeList.value[basicPrizeIndex.value]
  lastResult.value = `基础抽奖结果：${prize?.text || '未知奖品'}`
  console.log('基础抽奖结束', prize)
}

const startBasicLotto = () => {
  basicPrizeIndex.value = Math.floor(Math.random() * basicPrizeList.value.length)
  basicLottoRef.value.start()
}

// 控制中奖事件
const onControlStart = () => {
  controlRolling.value = true
  console.log('控制抽奖开始')
}

const onControlEnd = () => {
  controlRolling.value = false
  const prize = controlPrizeList.value[controlPrizeIndex.value]
  lastResult.value = `控制抽奖结果：${prize?.text || '未知奖品'}`
  console.log('控制抽奖结束', prize)
}

const startWinLotto = () => {
  // 指定中奖（前3个为中奖奖品）
  controlPrizeIndex.value = Math.floor(Math.random() * 3)
  controlLottoRef.value.start()
}

const startLoseLotto = () => {
  // 指定不中奖
  controlPrizeIndex.value = 3 // 谢谢参与
  controlLottoRef.value.start()
}

// 自定义样式事件
const onCustomStart = () => {
  customRolling.value = true
  console.log('自定义抽奖开始')
}

const onCustomEnd = () => {
  customRolling.value = false
  const prize = customPrizeList.value[customPrizeIndex.value]
  lastResult.value = `自定义抽奖结果：${prize?.text || '未知奖品'}`
  console.log('自定义抽奖结束', prize)
}

const startCustomLotto = () => {
  customPrizeIndex.value = Math.floor(Math.random() * customPrizeList.value.length)
  customLottoRef.value.start()
}

// 纯文字模式事件
const onTextStart = () => {
  textRolling.value = true
  console.log('文字抽奖开始')
}

const onTextEnd = () => {
  textRolling.value = false
  const prize = textPrizeList.value[textPrizeIndex.value]
  lastResult.value = `文字抽奖结果：${prize?.text || '未知奖品'}`
  console.log('文字抽奖结束', prize)
}

const startTextLotto = () => {
  textPrizeIndex.value = Math.floor(Math.random() * textPrizeList.value.length)
  textLottoRef.value.start()
}

// 重置功能事件
const onResetStart = () => {
  resetRolling.value = true
  console.log('重置抽奖开始')
}

const onResetEnd = () => {
  resetRolling.value = false
  const prize = resetPrizeList.value[resetPrizeIndex.value]
  lastResult.value = `重置抽奖结果：${prize?.text || '未知奖品'}`
  console.log('重置抽奖结束', prize)
}

const startResetLotto = () => {
  resetPrizeIndex.value = Math.floor(Math.random() * resetPrizeList.value.length)
  resetLottoRef.value.start()
}

const resetLotto = () => {
  resetLottoRef.value.reset()
  lastResult.value = '老虎机已重置'
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.content {
  padding-bottom: 40px;
}

.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 20px;
}

.btn-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.result-item {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
}

.result-text {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}
</style>