<template>
  <view v-if="showPopup" class="zx-popup" :class="[popupStyle, isDesktop ? 'fixforpc-z-index' : '']">
    <view @touchstart="touchstart">
      <!-- 遮罩层 -->
      <zx-transition v-if="maskShow" :show="showTrans" mode-class="fade" :duration="duration" @click="onMaskClick">
        <view class="zx-popup__mask" :style="maskStyles"></view>
      </zx-transition>

      <!-- 内容区域 -->
      <zx-transition :show="showTrans" :mode-class="animationMode" :duration="duration" @click="onContentClick">
        <view class="zx-popup__wrapper" :style="contentStyles" :class="[popupStyle]" @click="clear">
          <slot />
          <!-- 底部安全区适配 -->
          <zx-safe-bottom v-if="props.type === 'bottom' && props.safeArea" :bgColor="props.backgroundColor" />
        </view>
      </zx-transition>
    </view>

    <!-- H5 键盘事件处理 -->
    <!-- #ifdef H5 -->
    <view v-if="maskShow" @keyup.esc="onMaskClick" style="position: fixed; top: -9999px; left: -9999px;" tabindex="0"
      ref="keyHandler"></view>
    <!-- #endif -->
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import zxTransition from '@tanzhenxing/zx-transition/zx-transition.vue'
import zxSafeBottom from '@tanzhenxing/zx-safe-bottom/zx-safe-bottom.vue'

/**
 * ZxPopup 弹出层组件
 * @description 弹出层组件，支持多种弹出方式和动画效果
 * 
 */

const props = defineProps({
  // 是否显示弹窗
  show: {
    type: Boolean,
    default: false
  },
  // 弹出方式
  type: {
    type: String,
    default: 'center',
    validator: (value) => ['top', 'center', 'bottom', 'left', 'right'].includes(value)
  },
  // 是否开启动画
  animation: {
    type: Boolean,
    default: true
  },
  // 点击遮罩是否关闭
  maskClick: {
    type: Boolean,
    default: true
  },
  // 主窗口背景色
  backgroundColor: {
    type: String,
    default: 'transparent'
  },
  // 遮罩背景色
  maskBackgroundColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.4)'
  },
  // 圆角设置
  borderRadius: {
    type: String,
    default: '0'
  },
  // 是否适配底部安全区
  safeArea: {
    type: Boolean,
    default: true
  },
  // z-index 层级
  zIndex: {
    type: Number,
    default: 999
  },
  // 动画持续时间
  duration: {
    type: Number,
    default: 50
  },
  // 是否显示遮罩
  overlay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:show', 'change', 'maskClick', 'open', 'opened', 'close', 'closed'])

// 响应式数据
const showPopup = ref(false)
const showTrans = ref(false)
const popupWidth = ref(0)
const popupHeight = ref(0)
const safeAreaInsets = ref(0)
const clearPropagation = ref(false)
const keyHandler = ref(null)

// 计算属性
const isDesktop = computed(() => {
  return popupWidth.value >= 500 && popupHeight.value >= 500
})

const popupStyle = computed(() => {
  let style = props.type
  if (props.type === 'top' && isDesktop.value) {
    style = 'fixforpc-top'
  }
  return style
})

const animationMode = computed(() => {
  const modeMap = {
    top: 'slide-top',
    bottom: 'slide-bottom',
    center: ['zoom-out', 'fade'],
    left: 'slide-left',
    right: 'slide-right'
  }
  return modeMap[props.type] || 'fade'
})

const maskShow = computed(() => {
  return props.overlay
})

const maskStyles = computed(() => {
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: props.maskBackgroundColor,
    zIndex: props.zIndex
  }
})

const contentStyles = computed(() => {
  const baseStyles = {
    backgroundColor: props.backgroundColor === 'none' ? 'transparent' : props.backgroundColor,
    borderRadius: props.borderRadius,
    position: 'fixed',
    zIndex: props.zIndex + 1
  }

  // 根据类型设置位置样式
  switch (props.type) {
    case 'top':
      return {
        ...baseStyles,
        left: 0,
        right: 0,
        top: 0
      }
    case 'bottom':
      return {
        ...baseStyles,
        left: 0,
        right: 0,
        bottom: 0
      }
    case 'left':
      return {
        ...baseStyles,
        left: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column'
      }
    case 'right':
      return {
        ...baseStyles,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column'
      }
    case 'center':
    default:
      return {
        ...baseStyles,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }
  }
})

// 方法
const getSystemInfo = () => {
  try {
    const {
      windowWidth,
      windowHeight,
      windowTop,
      safeArea,
      screenHeight,
      safeAreaInsets: sai
    } = uni.getSystemInfoSync()

    popupWidth.value = windowWidth
    popupHeight.value = windowHeight + (windowTop || 0)

    if (safeArea && props.safeArea) {
      safeAreaInsets.value = sai ? sai.bottom : 0
    } else {
      safeAreaInsets.value = 0
    }
  } catch (e) {
    console.warn('获取系统信息失败:', e)
  }
}

const open = () => {
  if (showPopup.value) return

  emit('open')
  showPopup.value = true

  nextTick(() => {
    showTrans.value = true

    // #ifdef H5
    // 设置焦点以便监听键盘事件
    if (keyHandler.value && typeof keyHandler.value.focus === 'function') {
      try {
        keyHandler.value.focus()
      } catch (e) {
        console.warn('设置焦点失败:', e)
      }
    }
    // #endif

    emit('change', { show: true, type: props.type })

    // 动画完成后触发 opened 事件
    setTimeout(() => {
      emit('opened')
    }, props.duration)
  })
}

const close = () => {
  if (!showPopup.value) return

  emit('close')
  showTrans.value = false
  emit('change', { show: false, type: props.type })

  setTimeout(() => {
    showPopup.value = false
    emit('closed')
  }, props.duration)
}

// 监听器
watch(() => props.show, (newVal) => {
  if (newVal) {
    open()
  } else {
    close()
  }
}, { immediate: true })

// H5 下禁止底部滚动
watch(showPopup, (show) => {
  // #ifdef H5
  if (typeof document !== 'undefined') {
    document.body.style.overflow = show ? 'hidden' : 'visible'
  }
  // #endif
})

const onMaskClick = () => {
  if (clearPropagation.value) {
    clearPropagation.value = false
    return
  }

  emit('maskClick')

  if (props.maskClick) {
    emit('update:show', false)
    close()
  }
}

const onContentClick = () => {
  // 内容区域点击事件，可以用于阻止冒泡等
}

const clear = (e) => {
  // #ifndef APP-NVUE
  if (e && e.stopPropagation) {
    e.stopPropagation()
  }
  // #endif
  clearPropagation.value = true
}

const touchstart = () => {
  clearPropagation.value = false
}

// 生命周期
onMounted(() => {
  getSystemInfo()
})

onUnmounted(() => {
  // #ifdef H5
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'visible'
  }
  // #endif
})

// 暴露方法给父组件
defineExpose({
  open,
  close
})
</script>

<style lang="scss" scoped>
.zx-popup {
  position: fixed;
  /* #ifndef APP-NVUE */
  z-index: 99;
  /* #endif */

  &.top,
  &.left,
  &.right {
    /* #ifdef H5 */
    top: var(--window-top);
    /* #endif */
    /* #ifndef H5 */
    top: 0;
    /* #endif */
  }

  .zx-popup__mask {
    width: 100%;
    height: 100%;
  }

  .zx-popup__wrapper {
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    position: relative;

    &.left,
    &.right {
      /* #ifdef H5 */
      padding-top: var(--window-top);
      /* #endif */
      /* #ifndef H5 */
      padding-top: 0;
      /* #endif */
      flex: 1;
    }
  }
}

.fixforpc-z-index {
  /* #ifndef APP-NVUE */
  z-index: 999;
  /* #endif */
}

.fixforpc-top {
  top: 0;
}
</style>