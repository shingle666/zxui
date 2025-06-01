<template>
  <view class="marquee-demo">
    <zx-navbar title="跑马灯抽奖" back></zx-navbar>
    
    <view class="demo-section">
      <view class="demo-title">基础用法</view>
      <view class="demo-content">
        <zx-marquee
          :prize-list="prizeList"
          :prize-index="prizeIndex"
          :speed="100"
          :circle="40"
          @start-turns="startTurns"
          @end-turns="endTurns"
        />
      </view>
      <view class="demo-desc">点击中间按钮开始抽奖</view>
    </view>
    
    <view class="demo-section">
      <view class="demo-title">自定义样式</view>
      <view class="demo-content">
        <zx-marquee
          :prize-list="prizeList2"
          :prize-index="prizeIndex2"
          :style-opt="customStyle"
          width="350px"
          height="350px"
          start-text="抽奖"
          @start-turns="startTurns2"
          @end-turns="endTurns2"
        />
      </view>
      <view class="demo-desc">自定义背景色和按钮样式</view>
    </view>
    
    <view class="demo-section">
      <view class="demo-title">自定义开始按钮</view>
      <view class="demo-content">
        <zx-marquee
          :prize-list="prizeList3"
          :prize-index="prizeIndex3"
          :speed="80"
          :circle="50"
          @start-turns="startTurns3"
          @end-turns="endTurns3"
        >
          <template #start>
            <view class="custom-start-btn">
              <zx-icon name="gift" size="24" color="#fff"></zx-icon>
              <text class="start-text">开始抽奖</text>
            </view>
          </template>
        </zx-marquee>
      </view>
      <view class="demo-desc">使用插槽自定义开始按钮</view>
    </view>
    
    <!-- 中奖结果弹窗 -->
    <zx-popup v-model:show="showResult" position="center" round>
      <view class="result-popup">
        <view class="result-title">🎉 恭喜中奖 🎉</view>
        <view class="result-prize" v-if="currentPrize">
          <image v-if="currentPrize.prizeImg" :src="currentPrize.prizeImg" class="prize-img" />
          <text class="prize-name">{{ currentPrize.prizeName }}</text>
        </view>
        <zx-button type="primary" @click="showResult = false">确定</zx-button>
      </view>
    </zx-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 基础示例数据
const prizeList = ref([
  {
    id: 'xiaomi',
    prizeName: '小米手机',
    prizeImg: 'https://img14.360buyimg.com/imagetools/jfs/t1/104165/34/15186/96522/5e6f1435E46bc0cb0/d4e878a15bfd9362.png'
  },
  {
    id: 'bluetooth',
    prizeName: '蓝牙耳机',
    prizeImg: 'https://img13.360buyimg.com/imagetools/jfs/t1/91864/11/15108/139003/5e6f146dE1c7b511d/1ddc5aa6e502060a.jpg'
  },
  {
    id: 'thanks1',
    prizeName: '谢谢参与',
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png'
  },
  {
    id: 'watch',
    prizeName: 'Apple Watch',
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/105385/19/15140/111093/5e6f1506E48bd0dfb/829a98a8cdb4c27f.png'
  },
  {
    id: 'fruit',
    prizeName: '迪士尼苹果',
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/108308/11/8890/237603/5e6f157eE489cccf1/26e0437cfd93b9c8.png'
  },
  {
    id: 'thanks2',
    prizeName: '谢谢参与',
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png'
  },
  {
    id: 'seafood',
    prizeName: '海鲜套餐',
    prizeImg: 'https://img14.360buyimg.com/imagetools/jfs/t1/90507/38/15165/448364/5e6f15b4E5df0c718/4bd4c3d375eec312.png'
  },
  {
    id: 'thanks3',
    prizeName: '谢谢参与',
    prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png'
  }
])

// 自定义样式示例数据
const prizeList2 = ref([
  { id: '1', prizeName: '一等奖', prizeImg: 'https://img14.360buyimg.com/imagetools/jfs/t1/104165/34/15186/96522/5e6f1435E46bc0cb0/d4e878a15bfd9362.png' },
  { id: '2', prizeName: '二等奖', prizeImg: 'https://img13.360buyimg.com/imagetools/jfs/t1/91864/11/15108/139003/5e6f146dE1c7b511d/1ddc5aa6e502060a.jpg' },
  { id: '3', prizeName: '三等奖', prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/105385/19/15140/111093/5e6f1506E48bd0dfb/829a98a8cdb4c27f.png' },
  { id: '4', prizeName: '四等奖', prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/108308/11/8890/237603/5e6f157eE489cccf1/26e0437cfd93b9c8.png' },
  { id: '5', prizeName: '五等奖', prizeImg: 'https://img14.360buyimg.com/imagetools/jfs/t1/90507/38/15165/448364/5e6f15b4E5df0c718/4bd4c3d375eec312.png' },
  { id: '6', prizeName: '谢谢参与', prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png' },
  { id: '7', prizeName: '谢谢参与', prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png' },
  { id: '8', prizeName: '谢谢参与', prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png' }
])

// 自定义按钮示例数据
const prizeList3 = ref([
  { id: '1', prizeName: '现金红包', prizeImg: 'https://img14.360buyimg.com/imagetools/jfs/t1/104165/34/15186/96522/5e6f1435E46bc0cb0/d4e878a15bfd9362.png' },
  { id: '2', prizeName: '优惠券', prizeImg: 'https://img13.360buyimg.com/imagetools/jfs/t1/91864/11/15108/139003/5e6f146dE1c7b511d/1ddc5aa6e502060a.jpg' },
  { id: '3', prizeName: '积分奖励', prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/105385/19/15140/111093/5e6f1506E48bd0dfb/829a98a8cdb4c27f.png' },
  { id: '4', prizeName: '免费试用', prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/108308/11/8890/237603/5e6f157eE489cccf1/26e0437cfd93b9c8.png' },
  { id: '5', prizeName: '会员权益', prizeImg: 'https://img14.360buyimg.com/imagetools/jfs/t1/90507/38/15165/448364/5e6f15b4E5df0c718/4bd4c3d375eec312.png' },
  { id: '6', prizeName: '再来一次', prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png' },
  { id: '7', prizeName: '再来一次', prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png' },
  { id: '8', prizeName: '再来一次', prizeImg: 'https://img11.360buyimg.com/imagetools/jfs/t1/96116/38/15085/5181/5e6f15d1E48e31d30/71353b61dff705d4.png' }
])

// 中奖索引
const prizeIndex = ref(-1)
const prizeIndex2 = ref(-1)
const prizeIndex3 = ref(-1)

// 中奖结果显示
const showResult = ref(false)
const currentPrize = ref(null)

// 自定义样式配置
const customStyle = {
  bgStyle: {
    background: 'linear-gradient(45deg, #667eea, #764ba2)'
  },
  prizeItemStyle: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '12px',
    border: '2px solid rgba(255, 255, 255, 0.3)'
  },
  startBtnStyle: {
    background: 'linear-gradient(45deg, #f093fb, #f5576c)',
    width: '80px',
    height: '80px',
    boxShadow: '0 6px 20px rgba(240, 147, 251, 0.4)'
  }
}

// 抽奖逻辑
const startTurns = () => {
  console.log('开始抽奖...')
  // 模拟接口请求
  setTimeout(() => {
    const index = Math.floor(Math.random() * prizeList.value.length)
    prizeIndex.value = index
  }, 100)
}

const endTurns = () => {
  console.log('抽奖结束')
  currentPrize.value = prizeList.value[prizeIndex.value]
  showResult.value = true
  // 重置索引
  setTimeout(() => {
    prizeIndex.value = -1
  }, 1000)
}

const startTurns2 = () => {
  console.log('开始抽奖2...')
  setTimeout(() => {
    const index = Math.floor(Math.random() * prizeList2.value.length)
    prizeIndex2.value = index
  }, 100)
}

const endTurns2 = () => {
  console.log('抽奖结束2')
  currentPrize.value = prizeList2.value[prizeIndex2.value]
  showResult.value = true
  setTimeout(() => {
    prizeIndex2.value = -1
  }, 1000)
}

const startTurns3 = () => {
  console.log('开始抽奖3...')
  setTimeout(() => {
    const index = Math.floor(Math.random() * prizeList3.value.length)
    prizeIndex3.value = index
  }, 100)
}

const endTurns3 = () => {
  console.log('抽奖结束3')
  currentPrize.value = prizeList3.value[prizeIndex3.value]
  showResult.value = true
  setTimeout(() => {
    prizeIndex3.value = -1
  }, 1000)
}
</script>

<style lang="scss" scoped>
.marquee-demo {
  min-height: 100vh;
  background: #f5f5f5;
}

.demo-section {
  margin: 20px;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.demo-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.demo-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}

.demo-desc {
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-top: 10px;
}

.custom-start-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  .start-text {
    color: #fff;
    font-size: 12px;
    margin-top: 4px;
    font-weight: bold;
  }
}

.result-popup {
  padding: 30px;
  text-align: center;
  min-width: 280px;
  
  .result-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
  
  .result-prize {
    margin-bottom: 25px;
    
    .prize-img {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    
    .prize-name {
      display: block;
      font-size: 16px;
      color: #666;
      font-weight: 500;
    }
  }
}
</style>