<template>
  <view class="demo-lucky-grid">
    <zx-lucky-grid
      ref="luckyGridRef"
      :width="'600rpx'"
      :height="'600rpx'"
      :cols="3"
      :rows="3"
      :blocks="blocks"
      :prizes="prizes"
      :buttons="buttons"
      :defaultConfig="defaultConfig"
      :defaultStyle="defaultStyle"
      :activeStyle="activeStyle"
      @start="onStart"
      @end="onEnd"
    />
    <view class="btns">
      <button type="primary" @click="play">开始抽奖</button>
      <button @click="reset">重置</button>
    </view>
    <view class="result" v-if="result">
      抽奖结果：{{ result }}
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const luckyGridRef = ref(null)
const result = ref('')

const blocks = [
  { padding: '20rpx', background: '#fffbe8', borderRadius: '24rpx' }
]
const prizes = [
  { fonts: [{ text: '一等奖', top: '40%' }], imgs: [{ src: 'https://img.yzcdn.cn/vant/cat.jpeg', width: '60rpx', top: '10rpx' }] },
  { fonts: [{ text: '二等奖', top: '40%' }], imgs: [{ src: 'https://img.yzcdn.cn/vant/cat.jpeg', width: '60rpx', top: '10rpx' }] },
  { fonts: [{ text: '三等奖', top: '40%' }], imgs: [{ src: 'https://img.yzcdn.cn/vant/cat.jpeg', width: '60rpx', top: '10rpx' }] },
  { fonts: [{ text: '谢谢参与', top: '40%' }], imgs: [{ src: 'https://img.yzcdn.cn/vant/cat.jpeg', width: '60rpx', top: '10rpx' }] },
  { fonts: [{ text: '四等奖', top: '40%' }], imgs: [{ src: 'https://img.yzcdn.cn/vant/cat.jpeg', width: '60rpx', top: '10rpx' }] },
  { fonts: [{ text: '五等奖', top: '40%' }], imgs: [{ src: 'https://img.yzcdn.cn/vant/cat.jpeg', width: '60rpx', top: '10rpx' }] },
  { fonts: [{ text: '六等奖', top: '40%' }], imgs: [{ src: 'https://img.yzcdn.cn/vant/cat.jpeg', width: '60rpx', top: '10rpx' }] },
  { fonts: [{ text: '七等奖', top: '40%' }], imgs: [{ src: 'https://img.yzcdn.cn/vant/cat.jpeg', width: '60rpx', top: '10rpx' }] },
]
const buttons = [
  { radius: '60rpx', background: '#ffb940', fonts: [{ text: '抽奖', fontColor: '#fff', fontSize: '32rpx' }] }
]
const defaultConfig = {
  gutter: '8rpx',
  speed: 20,
  accelerationTime: 2500,
  decelerationTime: 2500
}
const defaultStyle = {
  borderRadius: '24rpx',
  fontColor: '#333',
  fontSize: '28rpx',
  background: '#fffbe8'
}
const activeStyle = {
  background: '#ffe066',
  fontColor: '#d35400'
}

function play() {
  // 随机选一个奖品索引
  const index = Math.floor(Math.random() * prizes.length)
  luckyGridRef.value?.play(index)
}
function reset() {
  luckyGridRef.value?.init()
  result.value = ''
}
function onStart(...args) {
  // 可做 loading 等
}
function onEnd(...args) {
  // args[0] 通常为中奖索引
  result.value = `恭喜获得：${prizes[args[0]]?.fonts?.[0]?.text || '未知'}`
}
</script>

<style scoped>
.demo-lucky-grid {
  padding: 32rpx;
}
.btns {
  margin-top: 32rpx;
  display: flex;
  gap: 24rpx;
}
.result {
  margin-top: 32rpx;
  font-size: 32rpx;
  color: #d35400;
}
</style> 