<template>
  <view class="zx-tooltip-wrapper" @touchstart.stop="onTriggerStart" @touchend.stop="onTriggerEnd"
    @mouseenter.stop="onTriggerStart" @mouseleave.stop="onTriggerEnd" @click.stop="onClickTrigger">
    <slot />
    <view v-if="visible" class="zx-tooltip-popper" :class="[`zx-tooltip--${effect}`, `zx-tooltip--${placement}`]"
      :style="popperStyle" @touchstart.stop @mouseenter.stop="onPopperEnter" @mouseleave.stop="onPopperLeave">
      <slot name="content">
        <zx-html v-if="rawContent" :content="content"></zx-html>
        <text v-else>{{ content }}</text>
      </slot>
      <view v-if="showArrow" class="zx-tooltip-arrow"></view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick,onMounted,onUnmounted } from 'vue';
import zxHtml from '@tanzhenxing/zx-html/zx-html.vue';

const props = defineProps({
  content: { type: String, default: '' },
  rawContent: { type: Boolean, default: false },
  placement: { type: String, default: 'top' },
  effect: { type: String, default: 'dark' },
  disabled: { type: Boolean, default: false },
  showArrow: { type: Boolean, default: true },
  trigger: { type: String, default: 'hover' }, // hover, click, focus
  showAfter: { type: Number, default: 0 },
  hideAfter: { type: Number, default: 200 },
  autoClose: { type: Number, default: 0 },
  offset: { type: Number, default: 12 },
  popperClass: { type: String, default: '' },
  modelValue: { type: Boolean, default: undefined },
});

const emit = defineEmits(['update:modelValue', 'show', 'hide']);

const visible = ref(false);
let showTimer = null;
let hideTimer = null;
let autoCloseTimer = null;

function clearTimers() {
  if (showTimer) clearTimeout(showTimer);
  if (hideTimer) clearTimeout(hideTimer);
  if (autoCloseTimer) clearTimeout(autoCloseTimer);
}

function showTooltip() {
  if (props.disabled) return;
  clearTimers();
  showTimer = setTimeout(() => {
    visible.value = true;
    emit('update:modelValue', true);
    emit('show');
    if (props.autoClose > 0) {
      autoCloseTimer = setTimeout(hideTooltip, props.autoClose);
    }
  }, props.showAfter);
}

function hideTooltip() {
  clearTimers();
  hideTimer = setTimeout(() => {
    visible.value = false;
    emit('update:modelValue', false);
    emit('hide');
  }, props.hideAfter);
}

function onTriggerStart(e) {
  if (props.trigger === 'hover') showTooltip();
}
function onTriggerEnd(e) {
  if (props.trigger === 'hover') hideTooltip();
}
function onClickTrigger(e) {
  if (props.trigger === 'click') {
    visible.value ? hideTooltip() : showTooltip();
  }
}
function onPopperEnter() {
  if (props.trigger === 'hover') clearTimers();
}
function onPopperLeave() {
  if (props.trigger === 'hover') hideTooltip();
}

watch(() => props.modelValue, (val) => {
  if (typeof val === 'boolean') visible.value = val;
});

onMounted(() => {
  if (props.modelValue) visible.value = true;
});
onUnmounted(() => {
  clearTimers();
});

const popperStyle = computed(() => {
  // 这里只能做简单的偏移，不能像浏览器那样精确定位
  let style = '';
  if (props.placement.includes('top')) style += `bottom:${props.offset}rpx;`;
  if (props.placement.includes('bottom')) style += `top:${props.offset}rpx;`;
  if (props.placement.includes('left')) style += `right:${props.offset}rpx;`;
  if (props.placement.includes('right')) style += `left:${props.offset}rpx;`;
  return style;
});
</script>

<style scoped>
.zx-tooltip-wrapper {
  display: inline-block;
  position: relative;
}

.zx-tooltip-popper {
  min-width: 80rpx;
  max-width: 400rpx;
  padding: 16rpx 24rpx;
  border-radius: 8rpx;
  font-size: 28rpx;
  position: absolute;
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.zx-tooltip--dark {
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
}

.zx-tooltip--light {
  background: #fff;
  color: #333;
  border: 1rpx solid #eee;
}

.zx-tooltip--top {
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
}

.zx-tooltip--bottom {
  left: 50%;
  transform: translateX(-50%) translateY(100%);
}

.zx-tooltip--left {
  top: 50%;
  right: 100%;
  transform: translateY(-50%) translateX(-12rpx);
}

.zx-tooltip--right {
  top: 50%;
  left: 100%;
  transform: translateY(-50%) translateX(12rpx);
}

.zx-tooltip-popper[style*="bottom"],
.zx-tooltip-popper[style*="top"],
.zx-tooltip-popper[style*="left"],
.zx-tooltip-popper[style*="right"] {
  opacity: 1;
  pointer-events: auto;
}

.zx-tooltip-arrow {
  width: 24rpx;
  height: 24rpx;
  background: inherit;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -12rpx;
  clip-path: polygon(50% 100%, 0 0, 100% 0);
}
</style>
