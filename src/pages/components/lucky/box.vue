<template>
  <view class="demo-lucky-box">
    <zx-lucky-box
      ref="luckyRef"
      :width="'600rpx'"
      :height="'600rpx'"
      :blocks="blocks"
      :prizes="prizes"
      :buttons="buttons"
      :defaultConfig="defaultConfig"
      :defaultStyle="defaultStyle"
      @start="onStart"
      @end="onEnd"
    />
    <view class="demo-btns">
      <button @click="play">开始抽奖</button>
      <button @click="stop">停止</button>
      <button @click="init">重置</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import ZxLuckyBox from '@/components/zx-lucky-box/zx-lucky-box.vue'

const luckyRef = ref()
const blocks = ref([
  { background: '#f5f5f5', imgs: [] }
])
const prizes = ref([
  { fonts: [{ text: '一等奖', fontColor: '#e43', fontSize: '18px' }], imgs: [] },
  { fonts: [{ text: '二等奖', fontColor: '#333', fontSize: '18px' }], imgs: [] },
  { fonts: [{ text: '三等奖', fontColor: '#666', fontSize: '18px' }], imgs: [] },
  { fonts: [{ text: '谢谢参与', fontColor: '#aaa', fontSize: '18px' }], imgs: [] },
])
const buttons = ref([
  { radius: '60px', background: '#ff9800', fonts: [{ text: '抽奖', fontColor: '#fff', fontSize: '20px' }] }
])
const defaultConfig = ref({})
const defaultStyle = ref({})

function play() {
  luckyRef.value.play()
}
function stop() {
  luckyRef.value.stop()
}
function init() {
  luckyRef.value.init()
}
function onStart(...args) {
  uni.showToast({ title: '开始抽奖', icon: 'none' })
}
function onEnd(...args) {
  uni.showToast({ title: '抽奖结束', icon: 'none' })
}
</script>

<style scoped>
.demo-lucky-box {
  padding: 32rpx;
}
.demo-btns {
  margin-top: 32rpx;
  display: flex;
  gap: 24rpx;
}
</style> 