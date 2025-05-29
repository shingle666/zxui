<template>
  <view class="demo-list-item">
    <view class="demo-section">
      <text class="demo-title">基础用法</text>
      <zx-list>
        <zx-list-item title="标题" note="描述" right-text="更多" />
        <zx-list-item title="带图标" thumb="https://cdn.uviewui.com/uview/common/logo.png" />
        <zx-list-item title="可点击" clickable @click="onItemClick" />
      </zx-list>
    </view>

    <view class="demo-section">
      <text class="demo-title">插槽自定义内容</text>
      <zx-list>
        <zx-list-item>
          <template #header>
            <image src="https://cdn.uviewui.com/uview/common/logo.png" style="width:24px;height:24px;" />
          </template>
          <template #body>
            <view>自定义内容</view>
          </template>
          <template #footer>
            <text>右侧自定义</text>
          </template>
        </zx-list-item>
      </zx-list>
    </view>

    <view class="demo-section">
      <text class="demo-title">角标与开关</text>
      <zx-list>
        <zx-list-item title="带角标" show-badge badge-text="8" />
        <zx-list-item title="带开关" show-switch :switch-checked="switchChecked" @switchChange="onSwitchChange" />
      </zx-list>
      <text class="demo-tip">开关状态：{{ switchChecked }}</text>
    </view>

    <view class="demo-section">
      <text class="demo-title">跳转用法</text>
      <zx-list>
        <zx-list-item title="跳转页面" link="navigateTo" to="/pages/demo/index" clickable @click="onJump" />
      </zx-list>
      <text class="demo-tip">最近跳转事件：{{ lastJump }}</text>
    </view>

    <view class="demo-section">
      <text class="demo-title">禁用与省略</text>
      <zx-list>
        <zx-list-item title="禁用项" disabled />
        <zx-list-item title="超长标题超长标题超长标题超长标题" :ellipsis="1" />
        <zx-list-item title="多行省略多行省略多行省略多行省略多行省略多行省略" :ellipsis="2" />
      </zx-list>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const switchChecked = ref(false)
function onSwitchChange(val) {
  switchChecked.value = val
}

const lastJump = ref('无')
function onJump(e) {
  lastJump.value = JSON.stringify(e)
}

function onItemClick(e) {
  uni.showToast({ title: '点击事件', icon: 'none' })
}
</script>

<style scoped>
.demo-list-item {
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