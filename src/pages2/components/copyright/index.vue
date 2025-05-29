<template>
  <view class="demo-copyright">
    <!-- 基础用法 -->
    <zx-copyright />

    <!-- 自定义文本、颜色、大小、内边距、对齐方式 -->
    <zx-copyright 
      text="© 2024 My Awesome App. All rights reserved."
      background-color="#f5f5f5"
      color="#666666"
      size="22rpx"
      padding="30rpx 0"
      align="center"
    />

    <!-- 带跳转链接（H5端新窗口打开） -->
    <zx-copyright 
      text="点击跳转到官网"
      link="https://example.com"
      link-target="_blank"
      color="#007AFF"
      background-color="#e0f7fa"
      align="right"
    />
  </view>
</template>

<script setup>

</script>

<style scoped>
.demo-copyright {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  padding: 32rpx;
  background: #fafbfc;
  min-height: 100vh;
}
</style>
