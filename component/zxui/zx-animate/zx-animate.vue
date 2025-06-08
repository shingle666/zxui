<template>
  <view :class="[
    'zx-animate',
    {
      'zx-animate--show': isShow,
      [`zx-animate--${type}`]: type
    }
  ]" :style="animateStyle" @click="handleClick">
    <slot></slot>
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// 定义 props
const props = defineProps({
  // 控制动画，当值从 false 变为 true 时会触发一次动画
  show: {
    type: Boolean,
    default: false
  },
  // 动画类型
  type: {
    type: String,
    default: 'shake',
    validator: (value) => {
      return [
        'shake',      // 抖动
        'ripple',     // 放大后缩小/心跳
        'breath',     // 呼吸灯
        'float',      // 漂浮
        'slide-right',// 由右向左划入
        'slide-left', // 由左向右划入
        'slide-top',  // 由上至下划入
        'slide-bottom',// 由下至上划入
        'jump',       // 跳跃
        'twinkle',    // 水波
        'flicker'     // 擦亮按钮
      ].includes(value)
    }
  },
  // 是否循环执行
  loop: {
    type: Boolean,
    default: false
  },
  // 动画时长，单位 ms
  duration: {
    type: [Number, String],
    default: 1000
  },
  // 触发方式，initial-初始化执行; click-点击执行
  action: {
    type: String,
    default: '',
    validator: (value) => {
      return ['', 'initial', 'click'].includes(value)
    }
  }
})

// 定义 emits
const emit = defineEmits(['animate', 'click'])

// 响应式数据
const isShow = ref(false)
const isAnimating = ref(false)

// 计算属性
const animateStyle = computed(() => {
  const style = {}

  if (props.duration) {
    style['--animate-duration'] = typeof props.duration === 'number'
      ? `${props.duration}ms`
      : props.duration
  }

  if (props.loop) {
    style['animation-iteration-count'] = 'infinite'
  }

  return style
})

// 监听 show 属性变化
watch(() => props.show, (newVal, oldVal) => {
  if (newVal && !oldVal && !isAnimating.value) {
    triggerAnimate()
  }
})

// 触发动画
const triggerAnimate = () => {
  if (isAnimating.value) return

  isAnimating.value = true
  isShow.value = true

  emit('animate')

  // 如果不是循环动画，在动画结束后重置状态
  if (!props.loop) {
    const duration = typeof props.duration === 'number'
      ? props.duration
      : parseInt(props.duration) || 1000

    setTimeout(() => {
      isShow.value = false
      isAnimating.value = false
    }, duration)
  }
}

// 点击事件处理
const handleClick = (event) => {
  emit('click', event)

  if (props.action === 'click') {
    triggerAnimate()
  }
}

// 组件挂载时处理初始化动画
onMounted(() => {
  if (props.action === 'initial') {
    triggerAnimate()
  }
})
</script>

<style lang="scss" scoped>
.zx-animate {
  display: inline-block;
  --animate-duration: 1s;

  &--show {
    &.zx-animate--shake {
      animation: zx-shake var(--animate-duration) ease-in-out;
    }

    &.zx-animate--ripple {
      animation: zx-ripple var(--animate-duration) ease-in-out;
    }

    &.zx-animate--breath {
      animation: zx-breath var(--animate-duration) ease-in-out;
    }

    &.zx-animate--float {
      animation: zx-float var(--animate-duration) ease-in-out;
    }

    &.zx-animate--slide-right {
      animation: zx-slide-right var(--animate-duration) ease-out;
    }

    &.zx-animate--slide-left {
      animation: zx-slide-left var(--animate-duration) ease-out;
    }

    &.zx-animate--slide-top {
      animation: zx-slide-top var(--animate-duration) ease-out;
    }

    &.zx-animate--slide-bottom {
      animation: zx-slide-bottom var(--animate-duration) ease-out;
    }

    &.zx-animate--jump {
      animation: zx-jump var(--animate-duration) ease-in-out;
    }

    &.zx-animate--twinkle {
      animation: zx-twinkle var(--animate-duration) ease-in-out;
    }

    &.zx-animate--flicker {
      animation: zx-flicker var(--animate-duration) ease-in-out;
    }
  }
}

// 动画关键帧定义
@keyframes zx-shake {

  0%,
  100% {
    transform: translateX(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-10rpx);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translateX(10rpx);
  }
}

@keyframes zx-ripple {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes zx-breath {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

@keyframes zx-float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-20rpx);
  }
}

@keyframes zx-slide-right {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes zx-slide-left {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes zx-slide-top {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes zx-slide-bottom {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes zx-jump {

  0%,
  100% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(-30rpx);
  }

  50% {
    transform: translateY(-15rpx);
  }

  75% {
    transform: translateY(-30rpx);
  }
}

@keyframes zx-twinkle {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes zx-flicker {

  0%,
  100% {
    background: linear-gradient(90deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.8) 50%, transparent 60%, transparent 100%);
    background-size: 200% 100%;
    background-position: 200% 0;
  }

  50% {
    background-position: -200% 0;
  }
}
</style>