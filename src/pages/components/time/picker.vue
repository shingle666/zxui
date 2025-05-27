<template>
  <view class="demo-time-picker">
    <view class="demo-block">
      <text class="demo-title">基础用法</text>
      <zx-time-picker v-model="time1" placeholder="请选择时间" @change="onChange1" />
    </view>
    <view class="demo-block">
      <text class="demo-title">时间范围选择</text>
      <zx-time-picker v-model="timeRange" is-range range-separator="至" start-placeholder="开始" end-placeholder="结束" />
    </view>
    <view class="demo-block">
      <text class="demo-title">禁用部分时间</text>
      <zx-time-picker v-model="time2" :disabled-hours="disabledHours" :disabled-minutes="disabledMinutes" :disabled-seconds="disabledSeconds" />
    </view>
    <view class="demo-block">
      <text class="demo-title">只读</text>
      <zx-time-picker v-model="time3" readonly />
    </view>
    <view class="demo-block">
      <text class="demo-title">禁用</text>
      <zx-time-picker v-model="time4" disabled />
    </view>
    <view class="demo-block">
      <text class="demo-title">可清除</text>
      <zx-time-picker v-model="time5" clearable />
    </view>
    <view class="demo-block">
      <text class="demo-title">自定义格式</text>
      <zx-time-picker v-model="time6" :show-seconds="false" format="HH:mm" placeholder="选择时分" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxTimePicker from '@/components/zx-time-picker/zx-time-picker.vue'

const time1 = ref('12:30:00')
const timeRange = ref(['08:00:00', '18:00:00'])
const time2 = ref('17:30:00')
const time3 = ref('09:00:00')
const time4 = ref('10:00:00')
const time5 = ref('11:00:00')
const time6 = ref('13:45')

function onChange1(val) {
  uni.showToast({ title: '选择时间：' + val, icon: 'none' })
}

function makeRange(start, end) {
  const arr = []
  for (let i = start; i <= end; i++) arr.push(i)
  return arr
}
function disabledHours() {
  return makeRange(0, 7).concat(makeRange(20, 23))
}
function disabledMinutes(hour) {
  if (hour === 17) return makeRange(0, 29)
  if (hour === 18) return makeRange(31, 59)
  return []
}
function disabledSeconds(hour, minute) {
  if (hour === 18 && minute === 30) return makeRange(1, 59)
  return []
}
</script>

<style scoped>
.demo-time-picker {
  padding: 32rpx;
}
.demo-block {
  margin-bottom: 48rpx;
}
.demo-title {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 16rpx;
  display: block;
}
</style>
