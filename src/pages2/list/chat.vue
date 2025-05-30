<template>
  <view class="demo-list-chat">
    <view class="demo-section">
      <text class="demo-title">基础用法</text>
      <zx-list>
        <zx-list-chat title="张三" note="你好" time="12:00" avatar="https://cdn.uviewui.com/uview/common/logo.png" />
        <zx-list-chat title="李四" note="[草稿]hello" time="09:30" avatar-circle avatar="https://cdn.uviewui.com/uview/common/logo.png" />
      </zx-list>
    </view>

    <view class="demo-section">
      <text class="demo-title">群头像与角标</text>
      <zx-list>
        <zx-list-chat title="群聊" note="新消息" :avatar-list="groupAvatars" badge-text="8" />
        <zx-list-chat title="群聊未读" note="新消息" :avatar-list="groupAvatars" badge-text="dot" badge-positon="left" />
      </zx-list>
    </view>

    <view class="demo-section">
      <text class="demo-title">跳转与事件</text>
      <zx-list>
        <zx-list-chat title="跳转会话" note="点击跳转" link="navigateTo" to="/pages/demo/index" clickable @click="onChatClick" />
      </zx-list>
      <text class="demo-tip">最近点击事件：{{ lastClick }}</text>
    </view>

    <view class="demo-section">
      <text class="demo-title">插槽自定义内容</text>
      <zx-list>
        <zx-list-chat title="自定义右侧">
          <template #default>
            <text style="color:#eb3a41;">自定义内容</text>
          </template>
        </zx-list-chat>
      </zx-list>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const groupAvatars = [
  { url: 'https://cdn.uviewui.com/uview/common/logo.png' },
  { url: 'https://cdn.uviewui.com/uview/common/logo.png' },
  { url: 'https://cdn.uviewui.com/uview/common/logo.png' }
]

const lastClick = ref('无')
function onChatClick(e) {
  lastClick.value = JSON.stringify(e)
}
</script>

<style scoped>
.demo-list-chat {
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
.demo-tip {
  margin-top: 10px;
  color: #888;
  font-size: 14px;
}
</style> 