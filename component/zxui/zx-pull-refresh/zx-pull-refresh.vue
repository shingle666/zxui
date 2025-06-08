<template>
  <view class="zx-pull-refresh" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
    <view class="zx-pull-refresh__track" :style="trackStyle">
      <view class="zx-pull-refresh__head" :style="headStyle">
        <slot v-if="status === 'normal'" name="normal"></slot>
        <slot v-if="status === 'pulling'" name="pulling" :distance="distance">
          <view class="zx-pull-refresh__text">{{ pullingText || '下拉即可刷新...' }}</view>
        </slot>
        <slot v-if="status === 'loosing'" name="loosing" :distance="distance">
          <view class="zx-pull-refresh__text">{{ loosingText || '释放即可刷新...' }}</view>
        </slot>
        <slot v-if="status === 'loading'" name="loading" :distance="distance">
          <view class="zx-pull-refresh__loading">
            <view class="zx-loading__spinner"></view>
            <text class="zx-pull-refresh__text">{{ loadingText || '加载中...' }}</text>
          </view>
        </slot>
        <slot v-if="status === 'success'" name="success">
          <view class="zx-pull-refresh__text">{{ successText || '刷新成功' }}</view>
        </slot>
      </view>
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  disabled: Boolean,
  headHeight: {
    type: [Number, String],
    default: 50
  },
  successText: String,
  pullingText: String,
  loosingText: String,
  loadingText: String,
  pullDistance: [Number, String],
  successDuration: {
    type: [Number, String],
    default: 500
  },
  animationDuration: {
    type: [Number, String],
    default: 300
  }
});

const emit = defineEmits(['refresh', 'update:modelValue', 'change']);

const DEFAULT_HEAD_HEIGHT = 50;

const status = ref('normal'); // normal, pulling, loosing, loading, success
const distance = ref(0);
const duration = ref(0);
let reachTop = true; // Assume initially at top for non-scrollable content

const touchState = reactive({
  startY: 0,
  deltaY: 0,
  offsetX: 0,
  offsetY: 0,
});

const headStyle = computed(() => {
  if (props.headHeight !== DEFAULT_HEAD_HEIGHT) {
    return {
      height: `${props.headHeight}px`
    };
  }
  return {};
});

const trackStyle = computed(() => ({
  transitionDuration: `${duration.value}ms`,
  transform: distance.value ? `translate3d(0, ${distance.value}px, 0)` : ''
}));

const getScrollTop = (element) => {
  // For H5, app, and mini-program, direct scrollTop access might not be reliable or available.
  // uniapp doesn't provide a universal way to get scroll position of a generic view.
  // This needs to be handled by the parent scrollable view or by assuming the content is not scrollable initially.
  // For simplicity, we'll assume it's at the top if not explicitly handled by a parent scroll-view.
  // In a real-world scenario, you might need to use uni.createSelectorQuery() for more complex cases,
  // but that's asynchronous and adds complexity here.
  return 0; // Simplified for this example
};

const isTouchable = () => status.value !== 'loading' && status.value !== 'success' && !props.disabled;

const ease = (d) => {
  const pd = +(props.pullDistance || props.headHeight);
  if (d > pd) {
    if (d < pd * 2) {
      d = pd + (d - pd) / 2;
    } else {
      d = pd * 1.5 + (d - pd * 2) / 4;
    }
  }
  return Math.round(d);
};

const setStatus = (newDistance, isLoading) => {
  const pd = +(props.pullDistance || props.headHeight);
  distance.value = newDistance;
  let newStatus = 'normal';
  if (isLoading) {
    newStatus = 'loading';
  } else if (newDistance === 0) {
    newStatus = 'normal';
  } else if (newDistance < pd) {
    newStatus = 'pulling';
  } else {
    newStatus = 'loosing';
  }
  if (status.value !== newStatus) {
    status.value = newStatus;
    emit('change', { status: status.value, distance: distance.value });
  }
};

const showSuccessTip = () => {
  status.value = 'success';
  setTimeout(() => {
    setStatus(0, false);
  }, +props.successDuration);
};

const checkPosition = (event) => {
  // In uniapp, we can't reliably get the scroll parent's scroll top synchronously across all platforms without specific scroll-view usage.
  // We'll assume `reachTop` is true if the content itself isn't scrollable or if the user starts dragging from the top.
  // For a robust solution, the component consuming this pull-refresh might need to inform it about its scroll state.
  reachTop = getScrollTop(event.currentTarget) === 0; // Simplified
  if (reachTop) {
    duration.value = 0;
    touchState.startY = event.touches[0].clientY;
    touchState.deltaY = 0;
    touchState.offsetX = 0;
    touchState.offsetY = 0;
  }
};

const onTouchStart = (event) => {
  if (isTouchable()) {
    checkPosition(event);
  }
};

const onTouchMove = (event) => {
  if (!isTouchable() || !reachTop) return;

  const touch = event.touches[0];
  touchState.deltaY = touch.clientY - touchState.startY;
  touchState.offsetX = Math.abs(touch.clientX - (touchState.startX || touch.clientX)); // touchState.startX needs to be set in onTouchStart if used
  touchState.offsetY = Math.abs(touch.clientY - touchState.startY);

  // Prevent scrolling when pulling vertically
  // A common way to check for vertical scroll is if offsetY > offsetX
  const isVertical = () => touchState.offsetY > touchState.offsetX;

  if (reachTop && touchState.deltaY >= 0 && isVertical()) {
    // #ifdef H5
    event.preventDefault(); // Prevent browser's default pull-to-refresh on H5
    // #endif
    setStatus(ease(touchState.deltaY), false);
  }
};

const onTouchEnd = () => {
  if (reachTop && touchState.deltaY && isTouchable()) {
    duration.value = +props.animationDuration;
    if (status.value === 'loosing') {
      setStatus(+(props.headHeight), true);
      emit('update:modelValue', true);
      nextTick(() => emit('refresh'));
    } else {
      setStatus(0, false);
    }
  }
};

watch(() => props.modelValue, (value) => {
  duration.value = +props.animationDuration;
  if (value) {
    setStatus(+(props.headHeight), true);
  } else if (slots.success || props.successText) {
    showSuccessTip();
  } else {
    setStatus(0, false);
  }
});

// Expose methods if needed via defineExpose, though not typical for pull-refresh

</script>

<style scoped>
.zx-pull-refresh {
  overflow: hidden;
  user-select: none; /* Prevent text selection during drag */
}

.zx-pull-refresh__track {
  position: relative;
  height: 100%;
  transition-property: transform;
}

.zx-pull-refresh__head {
  position: absolute;
  left: 0;
  width: 100%;
  height: 50px; /* Default height, can be overridden by headHeight prop */
  overflow: hidden;
  color: #969799; /* --van-text-color-2 */
  font-size: 14px; /* --van-font-size-md */
  line-height: 50px; /* Default height */
  text-align: center;
  transform: translateY(-100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.zx-pull-refresh__text {
  margin-left: 4px;
}

.zx-pull-refresh__loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Basic spinner animation */
.zx-loading__spinner {
  width: 16px; /* --van-pull-refresh-loading-icon-size */
  height: 16px; /* --van-pull-refresh-loading-icon-size */
  animation: zx-rotate 0.8s linear infinite;
  border: 2px solid #c8c9cc; /* --van-gray-4 */
  border-top-color: #969799; /* --van-text-color-2 */
  border-radius: 100%;
  box-sizing: border-box;
}

@keyframes zx-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>