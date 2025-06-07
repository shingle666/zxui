<template>
  <view :class="bubbleClasses" :style="bubbleStyles">
    <!-- 头像 -->
    <view v-if="showAvatar" :class="avatarClasses" :style="avatarStyles">
      <slot name="avatar">
        <zx-avatar
          :src="avatar?.src"
          :text="avatar?.text"
          :icon="avatar?.icon"
          :shape="avatar?.shape || 'circle'"
          :size="avatar?.size || '80rpx'"
          :bg-color="avatar?.bgColor || '#c0c4cc'"
          :color="avatar?.color || '#ffffff'"
          :font-size="avatar?.fontSize || '32rpx'"
          :mode="avatar?.mode || 'aspectFill'"
          :custom-class="avatarImageClasses"
          :style="avatarImageStyles"
        />
      </slot>
    </view>

    <!-- 内容区域 -->
    <view :class="contentWrapperClasses">
      <!-- 头部 -->
      <view v-if="header || slots.header" :class="headerClasses" :style="headerStyles">
        <slot name="header">{{ header }}</slot>
      </view>

      <!-- 主要内容 -->
      <view :class="contentClasses" :style="contentStyles">
        <slot name="loading" v-if="loading">
          <view :class="loadingClasses">
            <view v-for="(dot, index) in 3" :key="index" :class="loadingDotClasses"
              :style="{ animationDelay: `${index * 0.2}s` }"></view>
          </view>
        </slot>
        <slot name="message" v-else-if="slots.message" :content="displayContent"></slot>
        <view v-else-if="messageRender" v-html="messageRender(displayContent)"></view>
        <view v-else>{{ displayContent }}</view>
        <text v-if="isTyping && typingSuffix" :class="typingSuffixClasses">{{ typingSuffix }}</text>
      </view>

      <!-- 底部 -->
      <view v-if="footer || slots.footer" :class="footerClasses" :style="footerStyles">
        <slot name="footer" :content="displayContent">
          <view v-if="typeof footer === 'function'">{{ footer(displayContent) }}</view>
          <view v-else>{{ footer }}</view>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUnmounted, useSlots } from 'vue'

// Props 定义
const props = defineProps({
  // 基础属性
  prefixCls: {
    type: String,
    default: 'zx-ai-bubble'
  },
  rootClassName: {
    type: String,
    default: ''
  },
  // 头像配置
  avatar: {
    type: Object,
    default: null
  },
  // 位置：start(左侧) | end(右侧)
  placement: {
    type: String,
    default: 'start',
    validator: (value) => ['start', 'end'].includes(value)
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  },
  // 打字效果配置
  typing: {
    type: [Boolean, Object],
    default: false
  },
  // 内容
  content: {
    type: [String, Object],
    default: ''
  },
  // 自定义消息渲染函数
  messageRender: {
    type: Function,
    default: null
  },
  // 自定义加载渲染函数
  loadingRender: {
    type: Function,
    default: null
  },
  // 样式变体：filled | borderless | outlined | shadow
  variant: {
    type: String,
    default: 'filled',
    validator: (value) => ['filled', 'borderless', 'outlined', 'shadow'].includes(value)
  },
  // 形状：round | corner
  shape: {
    type: String,
    default: '',
    validator: (value) => ['', 'round', 'corner'].includes(value)
  },
  // 头部内容
  header: {
    type: [String, Object],
    default: ''
  },
  // 底部内容
  footer: {
    type: [String, Object, Function],
    default: ''
  },
  // 自定义样式
  styles: {
    type: Object,
    default: () => ({})
  },
  // 自定义类名
  classNames: {
    type: Object,
    default: () => ({})
  }
})

// Emits 定义
const emit = defineEmits([
  'typingComplete'
])

// 响应式数据
const displayContent = ref('')
const isTyping = ref(false)
const typingTimer = ref(null)
const currentIndex = ref(0)

// 获取插槽
const slots = useSlots()

// 计算属性
const showAvatar = computed(() => {
  return props.avatar || slots.avatar
})

// 打字效果配置
const typingConfig = computed(() => {
  if (typeof props.typing === 'boolean') {
    return props.typing ? { step: 1, interval: 50, suffix: '' } : null
  }
  return props.typing ? {
    step: props.typing.step || 1,
    interval: props.typing.interval || 50,
    suffix: props.typing.suffix || ''
  } : null
})

const typingSuffix = computed(() => {
  return typingConfig.value?.suffix || ''
})

// 样式类名计算
const bubbleClasses = computed(() => {
  const { prefixCls, placement, variant, shape, rootClassName, classNames } = props
  return [
    prefixCls,
    rootClassName,
    `${prefixCls}--${placement}`,
    `${prefixCls}--${variant}`,
    shape && `${prefixCls}--${shape}`,
    isTyping.value && `${prefixCls}--typing`,
    classNames.root
  ].filter(Boolean)
})

const avatarClasses = computed(() => {
  const { prefixCls, classNames } = props
  return [
    `${prefixCls}__avatar`,
    classNames.avatar
  ].filter(Boolean)
})

const avatarImageClasses = computed(() => {
  const { prefixCls } = props
  return `${prefixCls}__avatar-image`
})

const contentWrapperClasses = computed(() => {
  const { prefixCls } = props
  return `${prefixCls}__content-wrapper`
})

const headerClasses = computed(() => {
  const { prefixCls, classNames } = props
  return [
    `${prefixCls}__header`,
    classNames.header
  ].filter(Boolean)
})

const contentClasses = computed(() => {
  const { prefixCls, variant, shape, classNames } = props
  return [
    `${prefixCls}__content`,
    `${prefixCls}__content--${variant}`,
    shape && `${prefixCls}__content--${shape}`,
    classNames.content
  ].filter(Boolean)
})

const footerClasses = computed(() => {
  const { prefixCls, classNames } = props
  return [
    `${prefixCls}__footer`,
    classNames.footer
  ].filter(Boolean)
})

const loadingClasses = computed(() => {
  const { prefixCls } = props
  return `${prefixCls}__loading`
})

const loadingDotClasses = computed(() => {
  const { prefixCls } = props
  return `${prefixCls}__loading-dot`
})

const typingSuffixClasses = computed(() => {
  const { prefixCls } = props
  return `${prefixCls}__typing-suffix`
})

// 样式计算
const bubbleStyles = computed(() => {
  return props.styles.root || {}
})

const avatarStyles = computed(() => {
  return {
    ...props.avatar?.style,
    ...props.styles.avatar
  }
})

const avatarImageStyles = computed(() => {
  return props.avatar?.style || {}
})

const headerStyles = computed(() => {
  return props.styles.header || {}
})

const contentStyles = computed(() => {
  return props.styles.content || {}
})

const footerStyles = computed(() => {
  return props.styles.footer || {}
})

// 打字效果实现
const startTyping = () => {
  if (!typingConfig.value || !props.content) {
    displayContent.value = props.content
    return
  }

  const content = String(props.content)
  const { step, interval } = typingConfig.value

  isTyping.value = true
  currentIndex.value = 0
  displayContent.value = ''

  const typeNextChars = () => {
    if (currentIndex.value >= content.length) {
      isTyping.value = false
      emit('typingComplete')
      return
    }

    const nextIndex = Math.min(currentIndex.value + step, content.length)
    displayContent.value = content.slice(0, nextIndex)
    currentIndex.value = nextIndex

    typingTimer.value = setTimeout(typeNextChars, interval)
  }

  typeNextChars()
}

const stopTyping = () => {
  if (typingTimer.value) {
    clearTimeout(typingTimer.value)
    typingTimer.value = null
  }
  isTyping.value = false
}

// 监听内容变化
watch(
  () => props.content,
  (newContent, oldContent) => {
    stopTyping()

    if (typingConfig.value && newContent) {
      // 如果新内容是旧内容的扩展，继续打字
      if (oldContent && String(newContent).startsWith(String(oldContent))) {
        const content = String(newContent)
        const oldLength = String(oldContent).length
        currentIndex.value = oldLength
        displayContent.value = String(oldContent)

        if (currentIndex.value < content.length) {
          isTyping.value = true
          const { step, interval } = typingConfig.value

          const typeNextChars = () => {
            if (currentIndex.value >= content.length) {
              isTyping.value = false
              emit('typingComplete')
              return
            }

            const nextIndex = Math.min(currentIndex.value + step, content.length)
            displayContent.value = content.slice(0, nextIndex)
            currentIndex.value = nextIndex

            typingTimer.value = setTimeout(typeNextChars, interval)
          }

          typingTimer.value = setTimeout(typeNextChars, typingConfig.value.interval)
        }
      } else {
        // 重新开始打字
        startTyping()
      }
    } else {
      displayContent.value = newContent
    }
  },
  { immediate: true }
)

// 监听加载状态
watch(
  () => props.loading,
  (loading) => {
    if (!loading && !isTyping.value) {
      emit('typingComplete')
    }
  }
)

// 生命周期
onMounted(() => {
  if (!props.loading) {
    startTyping()
  }
})

onUnmounted(() => {
  stopTyping()
})
</script>

<style lang="scss" scoped>
.zx-ai-bubble {
  display: flex;
  gap: 12rpx;
  margin-bottom: 24rpx;

  &--start {
    flex-direction: row;
    justify-content: flex-start;
  }

  &--end {
    flex-direction: row-reverse;
    justify-content: flex-end;
  }

  &__avatar {
    flex-shrink: 0;
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__avatar-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  &__content-wrapper {
    flex: 1;
    max-width: calc(100% - 120rpx);
  }

  &__header {
    margin-bottom: 8rpx;
    font-size: 24rpx;
    color: #999;
  }

  &__content {
    padding: 24rpx 32rpx;
    font-size: 32rpx;
    line-height: 1.5;
    word-wrap: break-word;
    position: relative;

    &--filled {
      background-color: #f5f5f5;

      .zx-ai-bubble--end & {
        background-color: #1890ff;
        color: #fff;
      }
    }

    &--outlined {
      border: 2rpx solid #d9d9d9;
      background-color: #fff;

      .zx-ai-bubble--end & {
        border-color: #1890ff;
        background-color: #e6f7ff;
      }
    }

    &--borderless {
      background-color: transparent;
      border: none;
    }

    &--shadow {
      background-color: #fff;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
    }

    &--round {
      border-radius: 32rpx;
    }

    &--corner {
      border-radius: 8rpx;
    }

    // 默认圆角
    &:not(&--round):not(&--corner) {
      border-radius: 16rpx;
    }

    // 气泡尖角
    &::before {
      content: '';
      position: absolute;
      top: 24rpx;
      width: 0;
      height: 0;
      border: 16rpx solid transparent;

      .zx-ai-bubble--start & {
        left: -30rpx;
        border-right-color: #f5f5f5;

        .zx-ai-bubble__content--outlined & {
          border-right-color: #fff;
        }

        .zx-ai-bubble__content--shadow & {
          border-right-color: #fff;
        }

        .zx-ai-bubble__content--borderless & {
          display: none;
        }
      }

      .zx-ai-bubble--end & {
        right: -30rpx;
        border-left-color: #1890ff;

        .zx-ai-bubble__content--outlined & {
          border-left-color: #e6f7ff;
        }

        .zx-ai-bubble__content--shadow & {
          border-left-color: #fff;
        }

        .zx-ai-bubble__content--borderless & {
          display: none;
        }
      }
    }
  }

  &__footer {
    margin-top: 8rpx;
    font-size: 24rpx;
    color: #999;
  }

  &__loading {
    display: flex;
    align-items: center;
    gap: 8rpx;
  }

  &__loading-dot {
    width: 12rpx;
    height: 12rpx;
    border-radius: 50%;
    background-color: #ccc;
    animation: loading-bounce 1.4s infinite ease-in-out;

    .zx-ai-bubble--end & {
      background-color: rgba(255, 255, 255, 0.8);
    }
  }

  &__typing-suffix {
    animation: cursor-blink 1s infinite;
  }

  &--typing &__content::after {
    content: '|';
    animation: cursor-blink 1s infinite;
    margin-left: 4rpx;
  }
}

@keyframes loading-bounce {

  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }

  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes cursor-blink {

  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}
</style>