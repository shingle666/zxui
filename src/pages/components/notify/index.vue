<template>
  <view class="demo-container">
    <zx-notify ref="notifyRef" />
    <button @click="show('primary')">普通通知</button>
    <button @click="show('success')">成功通知</button>
    <button @click="show('warning')">警告通知</button>
    <button @click="show('error')">错误通知</button>
    <button @click="showCustom">自定义颜色/时长</button>
    <button @click="showSlot">自定义图标</button>
    <button @click="closeNotify">手动关闭</button>
  </view>
  <zx-notify ref="slotNotifyRef">
    <template #icon>
      <zx-icon name="star" color="#FFD700" size="24" :customStyle="{marginRight: '6px'}" />
    </template>
  </zx-notify>
</template>

<script setup>
import { ref } from 'vue'
import ZxNotify from '@/components/zx-notify/zx-notify.vue'
import ZxIcon from '@/components/zx-icon/zx-icon.vue'

const notifyRef = ref()
const slotNotifyRef = ref()

function show(type) {
  notifyRef.value?.show({
    type,
    message: `这是一条${type}类型的通知`,
    duration: 2000
  })
}

function showCustom() {
  notifyRef.value?.show({
    message: '自定义背景色和字体色，5秒后自动关闭',
    bgColor: '#222',
    color: '#FFD700',
    duration: 5000
  })
}

function showSlot() {
  slotNotifyRef.value?.show({
    message: '自定义插槽图标',
    bgColor: '#fffbe6',
    color: '#faad14',
    duration: 3000
  })
}

function closeNotify() {
  notifyRef.value?.close()
  slotNotifyRef.value?.close()
}
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
}
button {
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  background: #f5f5f5;
  color: #333;
  font-size: 16px;
  margin-bottom: 8px;
}
</style> 