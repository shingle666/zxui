<template>
  <view class="demo-list-ad">
    <view class="demo-section">
      <text class="demo-title">基础用法</text>
      <zx-list>
        <view class="demo-item" v-for="item in list" :key="item.id">
          <text>{{ item.title }}</text>
        </view>
        <!-- 广告项插入列表中间 -->
        <zx-list-ad adpid="1111111111" @error="onAdError" @close="onAdClose" />
      </zx-list>
    </view>

    <view class="demo-section">
      <text class="demo-title">多广告参数配置</text>
      <zx-list>
        <zx-list-ad adpid="2222222222" type="banner" />
        <zx-list-ad adpid="3333333333" type="video" />
      </zx-list>
    </view>

    <view class="demo-section">
      <text class="demo-title">广告关闭与错误事件</text>
      <zx-list>
        <zx-list-ad adpid="4444444444" @error="onAdError" @close="onAdClose" />
      </zx-list>
      <text class="demo-tip">最近广告事件：{{ lastAdEvent }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxList from '@/components/zx-list/zx-list.vue'
import zxListAd from '@/components/zx-list-ad/zx-list-ad.vue'

const list = [
  { id: 1, title: '内容1' },
  { id: 2, title: '内容2' },
  { id: 3, title: '内容3' }
]

const lastAdEvent = ref('无')
function onAdError(e) {
  lastAdEvent.value = '广告加载失败: ' + JSON.stringify(e)
}
function onAdClose(e) {
  lastAdEvent.value = '广告被关闭: ' + JSON.stringify(e)
}
</script>

<style scoped>
.demo-list-ad {
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
.demo-tip {
  margin-top: 10px;
  color: #888;
  font-size: 14px;
}
</style> 