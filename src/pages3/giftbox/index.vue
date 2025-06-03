<template>
  <view class="page">
    <zx-navbar title="神秘礼盒 Giftbox" back />
    
    <view class="demo-section">
      <zx-title title="基础用法" />
      <view class="demo-item">
        <zx-giftbox 
          prize-text="恭喜获得1000元红包" 
          @start-turns="handleStart1"
          @end-turns="handleEnd1"
        />
      </view>
    </view>
    
    <view class="demo-section">
      <zx-title title="自定义颜色" />
      <view class="demo-item">
        <zx-giftbox
          box-color="#4ECDC4"
          lid-color="#45B7D1"
          ribbon-color="#FF6B6B"
          prize-text="<em style='color: #FF6B6B; font-size: 18px;'>特等奖</em><br/><strong style='color: #4ECDC4;'>iPhone 15 Pro</strong>"
          @start-turns="handleStart2"
          @end-turns="handleEnd2"
        />
      </view>
    </view>
    
    <view class="demo-section">
      <zx-title title="自定义尺寸" />
      <view class="demo-item">
        <zx-giftbox
          width="250px"
          height="250px"
          box-color="#96CEB4"
          lid-color="#FFEAA7"
          ribbon-color="#DDA0DD"
          prize-text="恭喜获得豪华大奖"
          prize-text-size="20px"
          prize-text-color="#FF6B6B"
          click-text="点我开启惊喜"
          @start-turns="handleStart3"
          @end-turns="handleEnd3"
        />
      </view>
    </view>
    
    <view class="demo-section">
      <zx-title title="快速动画" />
      <view class="demo-item">
        <zx-giftbox
          :duration="500"
          box-color="#FF6B6B"
          lid-color="#FF5252"
          prize-text="快速开启礼盒"
          @start-turns="handleStart4"
          @end-turns="handleEnd4"
        />
      </view>
      <view class="demo-desc">动画持续时间：500ms</view>
    </view>
    
    <view class="demo-section">
      <zx-title title="禁用粒子效果" />
      <view class="demo-item">
        <zx-giftbox
          :show-particle-effect="false"
          box-color="#9C88FF"
          lid-color="#7C4DFF"
          prize-text="无粒子效果"
          @start-turns="handleStart5"
          @end-turns="handleEnd5"
        />
      </view>
    </view>
    
    <view class="demo-section">
      <zx-title title="自定义粒子数量" />
      <view class="demo-item">
        <zx-giftbox
          :particle-count="50"
          box-color="#06D6A0"
          lid-color="#118AB2"
          prize-text="超多粒子效果"
          @start-turns="handleStart6"
          @end-turns="handleEnd6"
        />
      </view>
      <view class="demo-desc">粒子数量：50个</view>
    </view>
    
    <view class="demo-section">
      <zx-title title="重置功能" />
      <view class="demo-item">
        <zx-giftbox
          ref="giftboxRef"
          box-color="#FFD166"
          lid-color="#F77F00"
          prize-text="可重置的礼盒"
          @start-turns="handleStart7"
          @end-turns="handleEnd7"
        />
      </view>
      <view class="demo-buttons">
        <button class="reset-btn" @click="resetGiftbox">重置礼盒</button>
      </view>
    </view>
    
    <view class="demo-section">
      <zx-title title="禁用状态" />
      <view class="demo-item">
        <zx-giftbox
          :disabled="isDisabled"
          box-color="#CCCCCC"
          lid-color="#999999"
          prize-text="禁用状态"
          click-text="已禁用"
          @start-turns="handleStart8"
          @end-turns="handleEnd8"
        />
      </view>
      <view class="demo-buttons">
        <button class="toggle-btn" @click="toggleDisabled">
          {{ isDisabled ? '启用' : '禁用' }}礼盒
        </button>
      </view>
    </view>
    
    <view class="demo-section">
      <zx-title title="自定义内容插槽" />
      <view class="demo-item">
        <zx-giftbox
          box-color="#E056FD"
          lid-color="#C44569"
          @start-turns="handleStart9"
          @end-turns="handleEnd9"
        >
          <template #prize>
            <view class="custom-prize">
              <image class="prize-icon" src="https://cdn.mp.ac.cn/icon/gift.png" mode="aspectFit" />
              <view class="prize-title">恭喜获得</view>
              <view class="prize-name">超级大奖</view>
              <view class="prize-value">￥10,000</view>
            </view>
          </template>
        </zx-giftbox>
      </view>
    </view>
    
    <view class="demo-section">
      <zx-title title="多个礼盒" />
      <view class="demo-grid">
        <view class="demo-grid-item" v-for="(gift, index) in gifts" :key="index">
          <zx-giftbox
            width="120px"
            height="120px"
            :box-color="gift.boxColor"
            :lid-color="gift.lidColor"
            :prize-text="gift.prizeText"
            :prize-text-size="'14px'"
            :click-text="'开启'"
            :duration="600"
            @start-turns="() => handleMultiStart(index)"
            @end-turns="() => handleMultiEnd(index)"
          />
        </view>
      </view>
    </view>
    
    <view class="demo-section">
      <zx-title title="异步奖品" />
      <view class="demo-item">
        <zx-giftbox
          :prize-text="asyncPrize"
          box-color="#FF9FF3"
          lid-color="#F368E0"
          @start-turns="handleAsyncStart"
          @end-turns="handleAsyncEnd"
        />
      </view>
      <view class="demo-desc">{{ asyncStatus }}</view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 响应式数据
const giftboxRef = ref()
const isDisabled = ref(false)
const asyncPrize = ref('加载中...')
const asyncStatus = ref('点击礼盒后异步加载奖品信息')

// 多个礼盒数据
const gifts = ref([
  {
    boxColor: '#FF6B6B',
    lidColor: '#FF5252',
    prizeText: '100元红包'
  },
  {
    boxColor: '#4ECDC4',
    lidColor: '#45B7D1',
    prizeText: '优惠券'
  },
  {
    boxColor: '#96CEB4',
    lidColor: '#FFEAA7',
    prizeText: '积分奖励'
  },
  {
    boxColor: '#DDA0DD',
    lidColor: '#9C88FF',
    prizeText: '谢谢参与'
  }
])

// 事件处理函数
const handleStart1 = () => {
  console.log('基础礼盒开始打开')
  uni.showToast({
    title: '礼盒开启中...',
    icon: 'loading',
    duration: 1000
  })
}

const handleEnd1 = () => {
  console.log('基础礼盒打开完成')
  uni.showToast({
    title: '恭喜获奖！',
    icon: 'success'
  })
}

const handleStart2 = () => {
  console.log('自定义颜色礼盒开始打开')
}

const handleEnd2 = () => {
  console.log('自定义颜色礼盒打开完成')
  uni.showModal({
    title: '恭喜',
    content: '您获得了特等奖 iPhone 15 Pro！',
    showCancel: false
  })
}

const handleStart3 = () => {
  console.log('大尺寸礼盒开始打开')
}

const handleEnd3 = () => {
  console.log('大尺寸礼盒打开完成')
}

const handleStart4 = () => {
  console.log('快速动画礼盒开始打开')
}

const handleEnd4 = () => {
  console.log('快速动画礼盒打开完成')
}

const handleStart5 = () => {
  console.log('无粒子效果礼盒开始打开')
}

const handleEnd5 = () => {
  console.log('无粒子效果礼盒打开完成')
}

const handleStart6 = () => {
  console.log('多粒子礼盒开始打开')
}

const handleEnd6 = () => {
  console.log('多粒子礼盒打开完成')
}

const handleStart7 = () => {
  console.log('可重置礼盒开始打开')
}

const handleEnd7 = () => {
  console.log('可重置礼盒打开完成')
}

const handleStart8 = () => {
  console.log('禁用状态礼盒开始打开')
}

const handleEnd8 = () => {
  console.log('禁用状态礼盒打开完成')
}

const handleStart9 = () => {
  console.log('自定义内容礼盒开始打开')
}

const handleEnd9 = () => {
  console.log('自定义内容礼盒打开完成')
}

const handleMultiStart = (index) => {
  console.log(`第${index + 1}个礼盒开始打开`)
}

const handleMultiEnd = (index) => {
  console.log(`第${index + 1}个礼盒打开完成`)
  uni.showToast({
    title: gifts.value[index].prizeText,
    icon: 'none'
  })
}

const handleAsyncStart = () => {
  console.log('异步礼盒开始打开')
  asyncStatus.value = '正在加载奖品信息...'
  
  // 模拟异步加载
  setTimeout(() => {
    const prizes = [
      '恭喜获得iPhone 15',
      '恭喜获得MacBook Pro',
      '恭喜获得AirPods Pro',
      '恭喜获得1000元红包',
      '谢谢参与'
    ]
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)]
    asyncPrize.value = randomPrize
    asyncStatus.value = '奖品加载完成'
  }, 800)
}

const handleAsyncEnd = () => {
  console.log('异步礼盒打开完成')
  asyncStatus.value = '恭喜获奖！点击重新开始'
}

// 重置礼盒
const resetGiftbox = () => {
  if (giftboxRef.value) {
    giftboxRef.value.init()
    uni.showToast({
      title: '礼盒已重置',
      icon: 'success'
    })
  }
}

// 切换禁用状态
const toggleDisabled = () => {
  isDisabled.value = !isDisabled.value
  uni.showToast({
    title: isDisabled.value ? '已禁用' : '已启用',
    icon: 'none'
  })
}

// 生命周期
onMounted(() => {
  console.log('Giftbox 示例页面加载完成')
})
</script>

<style lang="scss" scoped>
.page {
  padding-bottom: 40px;
}

.demo-section {
  margin: 20px 0;
  padding: 0 20px;
}

.demo-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.demo-desc {
  margin-top: 10px;
  padding: 0 10px;
  font-size: 14px;
  color: #666;
  text-align: center;
}

.demo-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
}

.reset-btn,
.toggle-btn {
  padding: 8px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.demo-grid-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.custom-prize {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.prize-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
}

.prize-title {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.prize-name {
  font-size: 16px;
  font-weight: bold;
  color: #E056FD;
  margin-bottom: 4px;
}

.prize-value {
  font-size: 18px;
  font-weight: bold;
  color: #FF6B6B;
}
</style>