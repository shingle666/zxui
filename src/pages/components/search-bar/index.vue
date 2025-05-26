<template>
  <view class="demo-container">
    <zx-search-bar
      v-model="searchValue"
      placeholder="请输入关键词"
      :radius="10"
      :clearButton="'auto'"
      :cancelButton="'auto'"
      cancelText="取消"
      bgColor="#f0f0f0"
      textColor="#333"
      :maxlength="50"
      @confirm="onSearch"
      @input="onInput"
      @clear="onClear"
      @cancel="onCancel"
      @blur="onBlur"
      @focus="onFocus"
    >
      <template #searchIcon>
        <zx-icon color="#007aff" size="20" name="search" />
      </template>
      <template #clearIcon>
        <zx-icon color="#ff4d4f" size="20" name="close" />
      </template>
    </zx-search-bar>
    <view class="result-box">
      <text>当前输入：{{ searchValue }}</text>
      <view v-if="eventLog.length" class="event-log">
        <text v-for="(log, idx) in eventLog" :key="idx">{{ log }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxSearchBar from '@/components/zx-search-bar/zx-search-bar.vue'

const searchValue = ref('')
const eventLog = ref([])

function logEvent(msg) {
  eventLog.value.unshift(msg)
  if (eventLog.value.length > 5) eventLog.value.pop()
}

function onSearch(e) {
  logEvent('搜索确认: ' + e.value)
}
function onInput(val) {
  logEvent('输入变化: ' + val)
}
function onClear(e) {
  logEvent('清除: ' + e.value)
}
function onCancel(e) {
  logEvent('取消: ' + e.value)
}
function onBlur(e) {
  logEvent('失去焦点: ' + e.value)
}
function onFocus(e) {
  logEvent('获得焦点')
}
</script>

<style scoped>
.demo-container {
  padding: 24px;
  background: #fff;
  min-height: 100vh;
}
.result-box {
  margin-top: 24px;
  font-size: 16px;
  color: #333;
}
.event-log {
  margin-top: 12px;
  color: #888;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style> 