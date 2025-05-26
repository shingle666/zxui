<template>
  <view class="container">
    <zx-group title="基础分组" top="20">
      <view>分组内容1</view>
      <view>分组内容2</view>
    </zx-group>

    <zx-group title="卡片分组" mode="card" top="20">
      <view>卡片分组内容1</view>
      <view>卡片分组内容2</view>
    </zx-group>

    <zx-group :top="30">
      <template #title>
        <view style="color: #007AFF; font-weight: bold;">自定义标题插槽</view>
      </template>
      <view>自定义标题内容1</view>
      <view>自定义标题内容2</view>
    </zx-group>
  </view>
</template>

<script setup>
import zxGroup from '@/components/zx-group/zx-group.vue';
</script>

<style scoped>
.container {
  padding: 16px;
  background: #f8f8f8;
  min-height: 100vh;
}
</style> 