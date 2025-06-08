<template>
  <view class="zx-infinite-loading" :style="containerStyle">
    <!-- 内容区域 -->
    <slot></slot>

    <!-- 加载状态区域 -->
    <view class="zx-infinite-loading__status" :class="statusClass" :style="statusStyle" v-if="showStatus">
      <!-- 加载中状态 -->
      <view v-if="status === 'loading'" class="zx-infinite-loading__loading">
        <slot name="loading" :loading="true">
          <view class="zx-infinite-loading__spinner">
            <view class="zx-infinite-loading__dot" v-for="i in 3" :key="i"></view>
          </view>
          <text class="zx-infinite-loading__text">{{ loadingText }}</text>
        </slot>
      </view>

      <!-- 错误状态 -->
      <view v-else-if="status === 'error'" class="zx-infinite-loading__error" @click="handleErrorClick">
        <slot name="error" :error="true" :retry="handleErrorClick">
          <text class="zx-infinite-loading__text">{{ errorText }}</text>
        </slot>
      </view>

      <!-- 完成状态 -->
      <view v-else-if="status === 'complete'" class="zx-infinite-loading__complete">
        <slot name="complete" :complete="true">
          <text class="zx-infinite-loading__text">{{ completeText }}</text>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

// 定义组件属性
const props = defineProps({
  // 加载状态：loading-加载中, error-加载失败, complete-加载完成
  status: {
    type: String,
    default: 'loading',
    validator: (value) => ['loading', 'error', 'complete'].includes(value)
  },
  // 距离底部多少像素时触发加载
  threshold: {
    type: Number,
    default: 100
  },
  // 加载中文本
  loadingText: {
    type: String,
    default: '加载中...'
  },
  // 错误文本
  errorText: {
    type: String,
    default: '加载失败，点击重试'
  },
  // 完成文本
  completeText: {
    type: String,
    default: '没有更多了'
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 容器高度
  height: {
    type: [String, Number],
    default: ''
  },
  // 状态区域样式
  statusStyle: {
    type: Object,
    default: () => ({})
  },
  // 是否立即检查
  immediateCheck: {
    type: Boolean,
    default: true
  }
})

// 定义事件
const emit = defineEmits(['load', 'retry'])

// 响应式数据
const isLoading = ref(false)
const scrollTop = ref(0)
const scrollHeight = ref(0)
const clientHeight = ref(0)

// 计算属性
const containerStyle = computed(() => {
  const style = {}
  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return style
})

const statusClass = computed(() => {
  return {
    'zx-infinite-loading__status--loading': props.status === 'loading',
    'zx-infinite-loading__status--error': props.status === 'error',
    'zx-infinite-loading__status--complete': props.status === 'complete'
  }
})

const showStatus = computed(() => {
  return props.status === 'loading' || props.status === 'error' || props.status === 'complete'
})

// 检查是否需要加载更多
const checkLoad = () => {
  if (props.disabled || isLoading.value || props.status === 'complete') {
    return
  }

  // 获取系统信息
  const systemInfo = uni.getSystemInfoSync()

  // 获取页面滚动信息
  uni.createSelectorQuery().selectViewport().scrollOffset((res) => {
    if (!res) return

    scrollTop.value = res.scrollTop || 0

    // 获取页面高度信息
    uni.createSelectorQuery().selectViewport().boundingClientRect((rect) => {
      if (!rect) return

      clientHeight.value = rect.height || systemInfo.windowHeight

      // 获取页面内容总高度
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]

      // 尝试多种方式获取页面高度
      const query = uni.createSelectorQuery().in(currentPage)

      // 先尝试获取page元素
      query.select('page').boundingClientRect((pageRect) => {
        let totalHeight = pageRect?.height

        // 如果page元素获取失败，尝试获取body
        if (!totalHeight) {
          query.select('body').boundingClientRect((bodyRect) => {
            totalHeight = bodyRect?.height

            // 如果还是获取失败，使用document的scrollHeight
            if (!totalHeight && typeof document !== 'undefined') {
              totalHeight = document.documentElement.scrollHeight || document.body.scrollHeight
            }

            // 最后的兜底方案
            if (!totalHeight) {
              totalHeight = clientHeight.value + scrollTop.value + 1000 // 假设还有1000px内容
            }

            checkDistance(totalHeight)
          }).exec()
        } else {
          checkDistance(totalHeight)
        }
      }).exec()
    }).exec()
  }).exec()
}

// 检查距离并触发加载
const checkDistance = (totalHeight) => {
  scrollHeight.value = totalHeight

  // 计算是否到达底部
  const distanceToBottom = scrollHeight.value - scrollTop.value - clientHeight.value

  // 只有在状态为loading且未在加载中时才触发
  if (distanceToBottom <= props.threshold && props.status === 'loading' && !isLoading.value) {
    handleLoad()
  }
}

// 处理加载
const handleLoad = () => {
  if (isLoading.value || props.disabled || props.status !== 'loading') {
    return
  }

  isLoading.value = true
  emit('load')

  // 由父组件控制加载状态，这里不自动重置
  // 父组件应该在加载完成后更新status或调用组件方法
}

// 处理错误点击
const handleErrorClick = () => {
  emit('retry')
}

// 页面滚动事件处理
const onPageScroll = (e) => {
  if (e && typeof e.scrollTop === 'number') {
    scrollTop.value = e.scrollTop
  }
  checkLoad()
}

// 节流函数
const throttle = (func, delay) => {
  let timeoutId
  let lastExecTime = 0
  return function (...args) {
    const currentTime = Date.now()

    if (currentTime - lastExecTime > delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func.apply(this, args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

// 节流后的检查函数
const throttledCheckLoad = throttle(checkLoad, 100)

// 生命周期
onMounted(() => {
  // 立即检查
  if (props.immediateCheck) {
    nextTick(() => {
      setTimeout(checkLoad, 100)
    })
  }

  // 定时检查（主要检测方案）
  const checkInterval = setInterval(() => {
    if (props.status === 'loading' && !props.disabled) {
      throttledCheckLoad()
    }
  }, 500) // 减少检查频率

  // 保存定时器引用到组件实例
  checkInterval._isInfiniteLoadingTimer = true

  // 在组件卸载时清理
  onUnmounted(() => {
    clearInterval(checkInterval)
  })
})

// onUnmounted 已在 onMounted 中定义

// 重置加载状态
const resetLoading = () => {
  isLoading.value = false
}

// 暴露方法
defineExpose({
  checkLoad,
  resetLoading
})
</script>

<style lang="scss" scoped>
.zx-infinite-loading {
  width: 100%;

  &__status {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32rpx 0;
    min-height: 100rpx;

    &--loading {
      .zx-infinite-loading__text {
        color: #969799;
      }
    }

    &--error {
      cursor: pointer;

      .zx-infinite-loading__text {
        color: #969799;

        &:active {
          opacity: 0.7;
        }
      }
    }

    &--complete {
      .zx-infinite-loading__text {
        color: #969799;
      }
    }
  }

  &__loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16rpx;
  }

  &__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16rpx;
  }

  &__complete {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16rpx;
  }

  &__spinner {
    display: flex;
    align-items: center;
    gap: 8rpx;
  }

  &__dot {
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
    background-color: #c8c9cc;
    animation: zx-infinite-loading-dot 1.4s infinite ease-in-out both;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }

  &__text {
    font-size: 28rpx;
    line-height: 40rpx;
    text-align: center;
  }
}

@keyframes zx-infinite-loading-dot {

  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }

  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>