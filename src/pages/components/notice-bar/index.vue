<template>
  <view class="container">
    <text class="title">zx-notice-bar 公告栏组件演示</text>
    <zx-notice-bar text="[多行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏" />
    <zx-notice-bar single text="[单行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏" />
    <zx-notice-bar showIcon text="[多行] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏" />
    <zx-notice-bar showIcon scrollable text="[滚动] 这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏，这是 NoticeBar 通告栏" />
    <zx-notice-bar showGetMore showIcon moreText="查看更多" text="[查看更多] 这是 NoticeBar 通告栏，点击查看更多" @getmore="onGetMore" />
    <zx-notice-bar single color="#2979FF" backgroundColor="#EAF2FF" text="[自定义颜色] 这是 NoticeBar 通告栏，支持自定义颜色。" />
    <zx-notice-bar showClose single text="[可关闭] 这是 NoticeBar 通告栏，点击右侧关闭按钮可关闭。" @close="onClose" />
    <zx-notice-bar showIcon showClose showGetMore moreText="更多" text="[全部功能] 这是 NoticeBar 通告栏，全部功能演示。" @close="onClose" @getmore="onGetMore" @click="onClick" />
  </view>
</template>

<script setup>
import { ref } from 'vue';

function onClick() {
  uni.showToast({ title: '点击公告栏' });
}
function onClose() {
  uni.showToast({ title: '关闭公告栏' });
}
function onGetMore() {
  uni.showToast({ title: '查看更多' });
}
</script>

<style scoped>
.container {
  padding: 20px;
}
.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
}
</style> 