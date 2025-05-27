<template>
  <view class="zx-timeline">
    <slot />
  </view>
</template>

<script setup>
// 仅作为容器，具体内容由 zx-timeline-item 负责
</script>

<style scoped>
.zx-timeline {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
