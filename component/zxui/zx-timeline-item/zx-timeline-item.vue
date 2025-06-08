<template>
  <view class="zx-timeline-item">
    <view class="zx-timeline-item__dot" :class="[type, size, { hollow }]" :style="dotStyle">
      <slot name="dot">
        <zx-icon v-if="icon" :name="icon" />
      </slot>
    </view>
    <view class="zx-timeline-item__wrapper">
      <view v-if="placement === 'top' && timestamp && !hideTimestamp" class="zx-timeline-item__timestamp top">
        {{ timestamp }}
      </view>
      <view class="zx-timeline-item__content">
        <slot />
      </view>
      <view v-if="placement !== 'top' && timestamp && !hideTimestamp" class="zx-timeline-item__timestamp">
        {{ timestamp }}
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'

const props = defineProps({
  timestamp: String,
  hideTimestamp: Boolean,
  center: Boolean,
  placement: {
    type: String,
    default: 'bottom', // 'top' | 'bottom'
  },
  type: {
    type: String,
    default: '', // '', 'primary', 'success', 'warning', 'danger', 'info'
  },
  color: String,
  size: {
    type: String,
    default: 'normal', // 'normal' | 'large'
  },
  icon: String, // 传入 icon class 或 unicode
  hollow: Boolean,
})
const dotStyle = computed(() => {
  const style = {}
  if (props.color) style.backgroundColor = props.color
  if (props.hollow) style.backgroundColor = 'transparent'
  if (props.color && props.hollow) style.borderColor = props.color
  return style
})
</script>

<style scoped>
.zx-timeline-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 24rpx;
}

.zx-timeline-item__dot {
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  background: #dcdfe6;
  margin-right: 24rpx;
  border: 2rpx solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20rpx;
}

.zx-timeline-item__dot.primary {
  background: #409eff;
}

.zx-timeline-item__dot.success {
  background: #67c23a;
}

.zx-timeline-item__dot.warning {
  background: #e6a23c;
}

.zx-timeline-item__dot.danger {
  background: #f56c6c;
}

.zx-timeline-item__dot.info {
  background: #909399;
}

.zx-timeline-item__dot.large {
  width: 32rpx;
  height: 32rpx;
  font-size: 28rpx;
}

.zx-timeline-item__dot.hollow {
  background: transparent;
  border: 2rpx solid #dcdfe6;
}

.zx-timeline-item__wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.zx-timeline-item__timestamp {
  color: #909399;
  font-size: 24rpx;
  margin-bottom: 8rpx;
}

.zx-timeline-item__timestamp.top {
  margin-bottom: 8rpx;
}

.zx-timeline-item__content {
  font-size: 28rpx;
  color: #303133;
}
</style>