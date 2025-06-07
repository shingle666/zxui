<template>
  <view class="zx-timeline">
    <slot></slot>
  </view>
</template>

<script setup>
import {  ref } from 'vue'
</script>

<style scoped>
.zx-timeline {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
