<template>
  <view class="zx-menu-item-group">
    <view class="zx-menu-item-group__title" v-if="!$slots.title">{{ title }}</view>
    <view class="zx-menu-item-group__title" v-else><slot name="title"></slot></view>
    <view class="zx-menu-item-group__content">
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
import { defineProps } from 'vue';

// 组件名称
const name = 'ZxMenuItemGroup';

defineProps({
  // 分组标题
  title: {
    type: String,
    default: ''
  }
});

// 对外暴露组件名称
defineExpose({
  name
});
</script>

<style>
.zx-menu-item-group {
  margin-bottom: 5px;
}

.zx-menu-item-group__title {
  padding: 8px 20px;
  line-height: normal;
  font-size: 12px;
  color: #909399;
}

.zx-menu-item-group__content {
  padding: 0;
}
</style> 