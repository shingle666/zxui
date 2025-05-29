<template>
  <view class="toolbar-demo">
    <zx-toolbar
      :show="true"
      cancel-text="返回"
      confirm-text="保存"
      cancel-color="#ff4d4f"
      confirm-color="#52c41a"
      title="工具条示例"
      :custom-style="{ margin: '20rpx 0' }"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
    <view class="result">{{ result }}</view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const result = ref('');

function onCancel() {
  result.value = '点击了取消';
}

function onConfirm() {
  result.value = '点击了确认';
}
</script>

<style scoped>
.toolbar-demo {
  padding: 24rpx;
}
.result {
  margin-top: 32rpx;
  color: #888;
  font-size: 15px;
}
</style>
