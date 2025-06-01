<template>
  <view class="page">
    <zx-navbar title="刮刮卡 Scratchcard" back />
    
    <view class="demo-section">
      <zx-title title="基础用法" />
      <view class="demo-item">
        <zx-scratchcard 
          content="恭喜中奖1000元" 
          @open="handleOpen1" 
        />
      </view>
    </view>
    
    <view class="demo-section">
      <zx-title title="异步数据" />
      <view class="demo-item">
        <zx-scratchcard 
          :content="asyncContent" 
          @open="handleOpen2" 
        />
      </view>
      <view class="demo-desc">2秒后显示内容</view>
    </view>
    
    <view class="demo-section">
      <zx-title title="自定义颜色" />
      <view class="demo-item">
        <zx-scratchcard
          cover-color="#F9CC9D"
          background-color="#C3D08B"
          content="<em style='color: #FF6B6B; font-size: 24px;'>1000</em><strong style='color: #4ECDC4;'>元</strong>"
          @open="handleOpen3"
        />
      </view>
    </view>
    
    <view class="demo-section">
      <zx-title title="背景图片" />
      <view class="demo-item">
        <zx-scratchcard
          content="恭喜中奖iPhone 15"
          :cover-img="coverImage"
          cover-text="刮开有惊喜"
          @open="handleOpen4"
        />
      </view>
    </view>
    
    <view class="demo-section">
      <zx-title title="自定义尺寸" />
      <view class="demo-item">
        <zx-scratchcard
          width="350px"
          height="120px"
          font-size="22px"
          cover-color="#FF6B6B"
          background-color="#4ECDC4"
          cover-text="刮开有惊喜"
          cover-text-color="#FFFFFF"
          cover-text-size="18px"
          content="恭喜获得特等奖"
          @open="handleOpen5"
        />
      </view>
    </view>
    
    <view class="demo-section">
      <zx-title title="低刮开比例" />
      <view class="demo-item">
        <zx-scratchcard
          content="只需刮开30%"
          :ratio="0.3"
          cover-color="#9C88FF"
          background-color="#FFE66D"
          @open="handleOpen6"
        />
      </view>
      <view class="demo-desc">刮开30%即可触发</view>
    </view>
    
    <view class="demo-section">
      <zx-title title="重置功能" />
      <view class="demo-item">
        <zx-scratchcard
          ref="scratchcardRef"
          content="可重置的刮刮卡"
          cover-color="#06D6A0"
          background-color="#FFD166"
          @open="handleOpen7"
        />
      </view>
      <view class="demo-buttons">
        <button class="reset-btn" @click="resetCard">重置刮刮卡</button>
      </view>
    </view>
    
    <view class="demo-section">
      <zx-title title="多种奖品" />
      <view class="demo-item">
        <zx-scratchcard
          :content="randomPrize"
          cover-color="#F72585"
          background-color="#4CC9F0"
          cover-text="刮开看奖品"
          @open="handleRandomPrize"
        />
      </view>
      <view class="demo-buttons">
        <button class="refresh-btn" @click="refreshPrize">换个奖品</button>
      </view>
    </view>
    
    <view class="demo-section">
      <zx-title title="HTML内容" />
      <view class="demo-item">
        <zx-scratchcard
          :content="htmlContent"
          width="320px"
          height="100px"
          cover-color="#7209B7"
          background-color="#F72585"
          @open="handleOpen8"
        />
      </view>
    </view>
    

  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 异步内容
const asyncContent = ref('')

// 背景图片
const coverImage = ref('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')

// 刮刮卡引用
const scratchcardRef = ref()



// 随机奖品
const prizes = [
  '恭喜中奖iPhone 15',
  '恭喜获得iPad Pro',
  '恭喜中奖MacBook',
  '恭喜获得AirPods',
  '谢谢参与',
  '恭喜中奖1000元',
  '恭喜获得优惠券'
]
const randomPrize = ref('')

// HTML内容
const htmlContent = ref(`
  <div style="text-align: center; color: white;">
    <div style="font-size: 18px; margin-bottom: 5px;">🎉 恭喜中奖 🎉</div>
    <div style="font-size: 24px; font-weight: bold;">￥5000</div>
  </div>
`)

// 事件处理
const handleOpen1 = () => {
  showToast('基础刮刮卡已刮开！')
}

const handleOpen2 = () => {
  showToast('异步数据刮刮卡已刮开！')
}

const handleOpen3 = () => {
  showToast('自定义颜色刮刮卡已刮开！')
}

const handleOpen4 = () => {
  showToast('背景图片刮刮卡已刮开！')
}

const handleOpen5 = () => {
  showToast('自定义尺寸刮刮卡已刮开！')
}

const handleOpen6 = () => {
  showToast('低比例刮刮卡已刮开！')
}

const handleOpen7 = () => {
  showToast('可重置刮刮卡已刮开！')
}

const handleOpen8 = () => {
  showToast('HTML内容刮刮卡已刮开！')
}

const handleRandomPrize = () => {
  showToast(`刮开了：${randomPrize.value}`)
}

// 重置刮刮卡
const resetCard = () => {
  scratchcardRef.value?.reset()
  showToast('刮刮卡已重置')
}

// 刷新奖品
const refreshPrize = () => {
  const randomIndex = Math.floor(Math.random() * prizes.length)
  randomPrize.value = prizes[randomIndex]
  showToast('奖品已更换')
}

// 显示提示
const showToast = (message) => {
  // 使用uni.showToast作为备选方案
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 2000
  })
}

// 生命周期
onMounted(() => {
  // 模拟异步加载数据
  setTimeout(() => {
    asyncContent.value = '异步加载的奖品内容'
  }, 2000)
  
  // 初始化随机奖品
  refreshPrize()
  
  // 设置一个简单的背景图片
  coverImage.value = 'data:image/svg+xml;base64,' + btoa(`
    <svg width="300" height="50" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#4ECDC4;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="300" height="50" fill="url(#grad1)" />
      <text x="150" y="30" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dominant-baseline="middle">刮开有惊喜</text>
    </svg>
  `)
})
</script>

<style lang="scss" scoped>
.page {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 40px;
}

.demo-section {
  margin: 20px 0;
  
  .demo-item {
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .demo-desc {
    text-align: center;
    color: #666;
    font-size: 14px;
    margin-top: 10px;
  }
  
  .demo-buttons {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    padding: 0 15px;
    
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
      
      &.reset-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        
        &:active {
          transform: scale(0.95);
        }
      }
      
      &.refresh-btn {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
        
        &:active {
          transform: scale(0.95);
        }
      }
    }
  }
}

/* 标题组件样式 */
:deep(.zx-title) {
  margin: 0 15px;
  
  .zx-title__text {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
}

/* 导航栏样式 */
:deep(.zx-navbar) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  .zx-navbar__title {
    color: white;
    font-weight: 600;
  }
}
</style>