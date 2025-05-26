<template>
  <view class="demo-refresh">
    <view class="demo-section">
      <text class="demo-title">基础用法（H5/小程序）</text>
      <zx-refresh @reload="onReload" :refreshText="['下拉刷新','松开刷新','刷新中...','刷新完成']" />
      <view class="demo-content">页面内容...</view>
    </view>

    <view class="demo-section">
      <text class="demo-title">nvue 原生用法</text>
      <zx-refresh display="show" @refresh="onRefresh" @pullingdown="onPullingDown" />
      <view class="demo-content">nvue 内容区</view>
    </view>

    <view class="demo-section">
      <text class="demo-title">事件演示</text>
      <zx-refresh @reload="onReload" />
      <text class="demo-tip">最近刷新事件：{{ lastEvent }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxRefresh from '@/components/zx-refresh/zx-refresh.vue'

const lastEvent = ref('无')
function onReload() {
  lastEvent.value = 'H5/小程序触发刷新：' + new Date().toLocaleTimeString()
}
function onRefresh(e) {
  lastEvent.value = 'nvue原生刷新：' + JSON.stringify(e)
}
function onPullingDown(e) {
  lastEvent.value = 'nvue下拉：' + JSON.stringify(e)
}
</script>

<style scoped>
.demo-refresh {
  padding: 16px;
}
.demo-section {
  margin-bottom: 32px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 16px;
}
.demo-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  display: block;
}
.demo-content {
  min-height: 80px;
  color: #666;
  padding: 12px 0;
}
.demo-tip {
  margin-top: 10px;
  color: #888;
  font-size: 14px;
}
</style> 