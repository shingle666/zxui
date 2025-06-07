<template>
  <zx-popup :show="showPopup" type="top" :animation="animation" :mask-click="false" :overlay="maskShow"
    :mask-background-color="maskBackgroundColor" :z-index="zIndex" :duration="duration" @open="onOpen"
    @opened="onOpened" @close="onClose" @closed="onClosed" @change="onChange">
    <view class="zx-popup-message" :class="[`zx-popup-message--${type}`, isDesktop ? 'zx-popup-message--desktop' : '']">
      <view class="zx-popup-message__content">
        <!-- 图标 -->
        <view v-if="showIcon" class="zx-popup-message__icon">
          <zx-icon :name="iconName" :size="iconSize" :color="iconColor" />
        </view>

        <!-- 消息内容 -->
        <view class="zx-popup-message__text">
          <slot>
            <text class="zx-popup-message__message">{{ message }}</text>
          </slot>
        </view>

        <!-- 关闭按钮 -->
        <view v-if="closable" class="zx-popup-message__close" @click="handleClose">
          <zx-icon name="close" :size="16" color="#909399" />
        </view>
      </view>
    </view>
  </zx-popup>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'
import zxPopup from '@tanzhenxing/zx-popup/zx-popup.vue'

/**
 * ZxPopupMessage 消息提示组件
 * @description 基于 zx-popup 的消息提示组件，支持多种主题和自动关闭
 */

const props = defineProps({
  // 是否显示消息
  show: {
    type: Boolean,
    default: false
  },
  // 消息类型
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'warning', 'error', 'info'].includes(value)
  },
  // 消息文本
  message: {
    type: String,
    default: ''
  },
  // 显示时长（毫秒），0 表示不自动关闭
  duration: {
    type: Number,
    default: 3000
  },
  // 是否显示图标
  showIcon: {
    type: Boolean,
    default: true
  },
  // 自定义图标名称
  icon: {
    type: String,
    default: ''
  },
  // 图标大小
  iconSize: {
    type: [Number, String],
    default: 18
  },
  // 是否显示关闭按钮
  closable: {
    type: Boolean,
    default: false
  },
  // 是否显示遮罩
  maskShow: {
    type: Boolean,
    default: false
  },
  // 遮罩背景色
  maskBackgroundColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.1)'
  },
  // z-index 层级
  zIndex: {
    type: Number,
    default: 1000
  },
  // 是否开启动画
  animation: {
    type: Boolean,
    default: true
  },
  // 关闭前的回调函数
  beforeClose: {
    type: Function,
    default: null
  }
})

const emit = defineEmits(['update:show', 'open', 'opened', 'close', 'closed', 'click'])

// 响应式数据
const showPopup = ref(false)
const timer = ref(null)
const isDesktop = ref(false)

// 计算属性
const iconName = computed(() => {
  if (props.icon) return props.icon

  const iconMap = {
    success: 'checkmark-circle-fill',
    warning: 'warning-fill',
    error: 'close-circle-fill',
    info: 'information-circle-fill'
  }

  return iconMap[props.type] || 'information-circle-fill'
})

const iconColor = computed(() => {
  const colorMap = {
    success: '#67C23A',
    warning: '#E6A23C',
    error: '#F56C6C',
    info: '#409EFF'
  }

  return colorMap[props.type] || '#409EFF'
})

// 方法
const open = () => {
  showPopup.value = true
  startTimer()
}

const close = async () => {
  if (props.beforeClose && typeof props.beforeClose === 'function') {
    try {
      const shouldClose = await props.beforeClose()
      if (!shouldClose) return
    } catch (e) {
      console.warn('beforeClose 回调执行失败:', e)
    }
  }

  clearTimer()
  showPopup.value = false
  emit('update:show', false)
}

const handleClose = () => {
  close()
}

const startTimer = () => {
  if (props.duration > 0) {
    clearTimer()
    timer.value = setTimeout(() => {
      close()
    }, props.duration)
  }
}

const clearTimer = () => {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
}

const getSystemInfo = () => {
  try {
    const { windowWidth, windowHeight } = uni.getSystemInfoSync()
    isDesktop.value = windowWidth >= 500 && windowHeight >= 500
  } catch (e) {
    console.warn('获取系统信息失败:', e)
  }
}

// 事件处理
const onOpen = () => {
  emit('open')
}

const onOpened = () => {
  emit('opened')
}

const onClose = () => {
  emit('close')
}

const onClosed = () => {
  emit('closed')
}

const onChange = (e) => {
  // 可以在这里处理状态变化
}

const onClick = () => {
  emit('click')
}

// 监听器
watch(() => props.show, (newVal) => {
  if (newVal) {
    open()
  } else {
    close()
  }
}, { immediate: true })

watch(() => props.duration, () => {
  if (showPopup.value) {
    startTimer()
  }
})

// 生命周期
onMounted(() => {
  getSystemInfo()
})

onUnmounted(() => {
  clearTimer()
})

// 暴露方法给父组件
defineExpose({
  open,
  close
})
</script>

<style lang="scss" scoped>
.zx-popup-message {
  padding: 12px 20px;
  margin: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &--success {
    background-color: #f0f9ff;
    border: 1px solid #e1f5fe;

    .zx-popup-message__message {
      color: #67C23A;
    }
  }

  &--warning {
    background-color: #fdf6ec;
    border: 1px solid #faecd8;

    .zx-popup-message__message {
      color: #E6A23C;
    }
  }

  &--error {
    background-color: #fef0f0;
    border: 1px solid #fde2e2;

    .zx-popup-message__message {
      color: #F56C6C;
    }
  }

  &--info {
    background-color: #f4f4f5;
    border: 1px solid #e9e9eb;

    .zx-popup-message__message {
      color: #409EFF;
    }
  }

  &--desktop {
    margin: 20px auto;
    max-width: 500px;
    min-width: 300px;
  }
}

.zx-popup-message__content {
  display: flex;
  align-items: center;
  position: relative;
}

.zx-popup-message__icon {
  margin-right: 8px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.zx-popup-message__text {
  flex: 1;
  display: flex;
  align-items: center;
}

.zx-popup-message__message {
  font-size: 14px;
  line-height: 1.5;
  word-break: break-all;
}

.zx-popup-message__close {
  margin-left: 8px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
}

/* 响应式设计 */
@media screen and (max-width: 500px) {
  .zx-popup-message {
    margin: 8px;
    padding: 10px 16px;
    border-radius: 6px;

    &__message {
      font-size: 13px;
    }
  }
}

/* 深色模式支持 */
@media (prefers-color-scheme: dark) {
  .zx-popup-message {
    &--success {
      background-color: rgba(103, 194, 58, 0.1);
      border-color: rgba(103, 194, 58, 0.2);
    }

    &--warning {
      background-color: rgba(230, 162, 60, 0.1);
      border-color: rgba(230, 162, 60, 0.2);
    }

    &--error {
      background-color: rgba(245, 108, 108, 0.1);
      border-color: rgba(245, 108, 108, 0.2);
    }

    &--info {
      background-color: rgba(64, 158, 255, 0.1);
      border-color: rgba(64, 158, 255, 0.2);
    }
  }
}
</style>