<template>
  <view class="demo-list">
    <view class="demo-section">
      <text class="demo-title">基础用法</text>
      <zx-list>
        <view class="demo-item" v-for="item in baseList" :key="item.id">
          <text>{{ item.title }}</text>
        </view>
      </zx-list>
    </view>

    <view class="demo-section">
      <text class="demo-title">带插槽（自定义内容）</text>
      <zx-list>
        <view class="demo-item" v-for="item in slotList" :key="item.id">
          <image v-if="item.icon" :src="item.icon" class="demo-icon" mode="aspectFit" />
          <text>{{ item.title }}</text>
          <text class="demo-right" v-if="item.right">{{ item.right }}</text>
        </view>
      </zx-list>
    </view>

    <view class="demo-section">
      <text class="demo-title">带点击事件</text>
      <zx-list>
        <view class="demo-item clickable" v-for="item in clickList" :key="item.id" @click="onItemClick(item)">
          <text>{{ item.title }}</text>
        </view>
      </zx-list>
      <text class="demo-tip">最近点击：{{ lastClick ? lastClick.title : '无' }}</text>
    </view>

    <view class="demo-section">
      <text class="demo-title">反向渲染（renderReverse）</text>
      <zx-list :renderReverse="true">
        <view class="demo-item" v-for="item in baseList" :key="item.id">
          <text>{{ item.title }}</text>
        </view>
      </zx-list>
    </view>

    <view class="demo-section">
      <text class="demo-title">显示边框（border）</text>
      <zx-list :border="true">
        <view class="demo-item" v-for="item in baseList" :key="item.id">
          <text>{{ item.title }}</text>
        </view>
      </zx-list>
      <text class="demo-tip">默认显示上下边框，可通过 :border="false" 关闭</text>
    </view>

    <view class="demo-section">
      <text class="demo-title">开启回到顶部（enableBackToTop，仅nvue有效）</text>
      <zx-list :enableBackToTop="true">
        <view class="demo-item" v-for="item in baseList" :key="item.id">
          <text>{{ item.title }}</text>
        </view>
      </zx-list>
    </view>

    <view class="demo-section">
      <text class="demo-title">滚动事件（nvue有效）</text>
      <zx-list @scroll="onScroll" @scrolltolower="onToLower">
        <view class="demo-item" v-for="item in baseList" :key="item.id">
          <text>{{ item.title }}</text>
        </view>
      </zx-list>
      <text class="demo-tip">最近滚动事件：{{ lastScroll ? JSON.stringify(lastScroll) : '无' }}</text>
      <text class="demo-tip">最近滚动到底部事件：{{ lastToLower ? JSON.stringify(lastToLower) : '无' }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const baseList = ref([
  { id: 1, title: '列表项 1' },
  { id: 2, title: '列表项 2' },
  { id: 3, title: '列表项 3' }
])

const slotList = ref([
  { id: 1, title: '带图标', icon: 'https://cdn.uviewui.com/uview/common/logo.png', right: '右侧内容' },
  { id: 2, title: '无图标', right: '更多' },
  { id: 3, title: '仅标题' }
])

const clickList = ref([
  { id: 1, title: '可点击项 1' },
  { id: 2, title: '可点击项 2' }
])

const lastClick = ref(null)
function onItemClick(item) {
  lastClick.value = item
}

const lastScroll = ref(null)
const lastToLower = ref(null)
function onScroll(e) {
  lastScroll.value = e
}
function onToLower(e) {
  lastToLower.value = e
}
</script>

<style scoped>
.demo-list {
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
.demo-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}
.demo-item:last-child {
  border-bottom: none;
}
.demo-icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.demo-right {
  margin-left: auto;
  color: #999;
  font-size: 14px;
}
.clickable {
  cursor: pointer;
  color: #007aff;
}
.demo-tip {
  margin-top: 10px;
  color: #888;
  font-size: 14px;
}
</style> 