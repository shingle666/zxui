<template>
  <view class="demo">
    <view class="demo-block">
      <text>基础用法</text>
      <zx-time-select v-model="time1" />
    </view>
    <view class="demo-block">
      <text>自定义时间范围和步长</text>
      <zx-time-select v-model="time2" start="08:30" end="18:30" step="00:15" />
    </view>
    <view class="demo-block">
      <text>自定义格式</text>
      <zx-time-select v-model="time3" format="hh:mm A" />
    </view>
    <view class="demo-block">
      <text>禁用状态</text>
      <zx-time-select v-model="time4" :disabled="true" />
    </view>
    <view class="demo-block">
      <text>不可清空</text>
      <zx-time-select v-model="time5" :clearable="false" />
    </view>
    <view class="demo-block">
      <text>事件演示</text>
      <zx-time-select v-model="time6" @change="onChange" @clear="onClear" />
      <view>当前值：{{ time6 }}</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const time1 = ref('')
const time2 = ref('')
const time3 = ref('')
const time4 = ref('')
const time5 = ref('')
const time6 = ref('')

function onChange(val) {
  uni.showToast({ title: 'change: ' + val, icon: 'none' })
}
function onClear() {
  uni.showToast({ title: '已清空', icon: 'none' })
}
</script>

<style scoped>
.demo {
  padding: 24rpx;
}
.demo-block {
  margin-bottom: 40rpx;
}
</style>
