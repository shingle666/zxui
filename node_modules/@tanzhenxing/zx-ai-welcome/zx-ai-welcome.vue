<template>
  <view :class="welcomeClasses" :style="welcomeStyles">
    <!-- 图标 -->
    <view v-if="showIcon" :class="iconClasses" :style="iconStyles">
      <slot name="icon">
        <zx-icon v-if="icon" :name="icon" :size="iconSize" :color="iconColor" :mode="iconMode" />
      </slot>
    </view>

    <!-- 内容区域 -->
    <view :class="contentWrapperClasses">
      <!-- 标题和额外操作 -->
      <view v-if="showTitleWrapper" :class="titleWrapperClasses">
        <!-- 标题 -->
        <view v-if="showTitle" :class="titleClasses" :style="titleStyles">
          <slot name="title">
            <text :class="titleTextClasses">{{ title }}</text>
          </slot>
        </view>
        
        <!-- 额外操作 -->
        <view v-if="showExtra" :class="extraClasses" :style="extraStyles">
          <slot name="extra">{{ extra }}</slot>
        </view>
      </view>
      
      <!-- 只有标题时 -->
      <view v-else-if="showTitle" :class="titleClasses" :style="titleStyles">
        <slot name="title">
          <text :class="titleTextClasses">{{ title }}</text>
        </slot>
      </view>

      <!-- 描述 -->
      <view v-if="showDescription" :class="descriptionClasses" :style="descriptionStyles">
        <slot name="description">
          <text :class="descriptionTextClasses">{{ description }}</text>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, useSlots } from 'vue'
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'

// 定义组件名称
defineOptions({
  name: 'ZxAiWelcome'
})

// 定义 props
const props = defineProps({
  // 基础样式
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: [String, Object],
    default: ''
  },
  
  // 变体类型
  variant: {
    type: String,
    default: 'filled', // 'filled' | 'borderless'
    validator: (value) => ['filled', 'borderless'].includes(value)
  },
  
  // 语义化样式类名
  classNames: {
    type: Object,
    default: () => ({})
  },
  
  // 语义化样式
  styles: {
    type: Object,
    default: () => ({})
  },
  
  // 布局内容
  icon: {
    type: String,
    default: ''
  },
  
  title: {
    type: String,
    default: ''
  },
  
  description: {
    type: String,
    default: ''
  },
  
  extra: {
    type: String,
    default: ''
  },
  
  // 图标配置
  iconSize: {
    type: [String, Number],
    default: '96rpx'
  },
  
  iconColor: {
    type: String,
    default: '#1890ff'
  },
  
  iconMode: {
    type: String,
    default: 'aspectFit'
  }
})

// 获取插槽
const slots = useSlots()

// 计算是否显示各个部分
const showIcon = computed(() => {
  return !!(props.icon || slots.icon)
})

const showTitle = computed(() => {
  return !!(props.title || slots.title)
})

const showDescription = computed(() => {
  return !!(props.description || slots.description)
})

const showExtra = computed(() => {
  return !!(props.extra || slots.extra)
})

const showTitleWrapper = computed(() => {
  return showTitle.value && showExtra.value
})



// 样式处理函数
const normalizeStyle = (style) => {
  if (typeof style === 'string') {
    return style
  }
  if (typeof style === 'object' && style !== null) {
    return Object.entries(style)
      .map(([key, value]) => {
        const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        return `${kebabKey}: ${value}`
      })
      .join('; ')
  }
  return ''
}

// 主容器样式类
const welcomeClasses = computed(() => {
  const classes = [
    'zx-ai-welcome',
    `zx-ai-welcome--${props.variant}`,
    props.customClass
  ].filter(Boolean)
  
  return classes.join(' ')
})

// 主容器样式
const welcomeStyles = computed(() => {
  return normalizeStyle(props.customStyle)
})

// 图标容器样式类
const iconClasses = computed(() => {
  const classes = [
    'zx-ai-welcome__icon',
    props.classNames.icon
  ].filter(Boolean)
  
  return classes.join(' ')
})

// 图标容器样式
const iconStyles = computed(() => {
  return normalizeStyle(props.styles.icon)
})



// 内容包装器样式类
const contentWrapperClasses = computed(() => {
  return 'zx-ai-welcome__content-wrapper'
})

// 标题包装器样式类
const titleWrapperClasses = computed(() => {
  return 'zx-ai-welcome__title-wrapper'
})

// 标题容器样式类
const titleClasses = computed(() => {
  const classes = [
    'zx-ai-welcome__title',
    props.classNames.title
  ].filter(Boolean)
  
  return classes.join(' ')
})

// 标题容器样式
const titleStyles = computed(() => {
  return normalizeStyle(props.styles.title)
})

// 标题文本样式类
const titleTextClasses = computed(() => {
  return 'zx-ai-welcome__title-text'
})

// 描述容器样式类
const descriptionClasses = computed(() => {
  const classes = [
    'zx-ai-welcome__description',
    props.classNames.description
  ].filter(Boolean)
  
  return classes.join(' ')
})

// 描述容器样式
const descriptionStyles = computed(() => {
  return normalizeStyle(props.styles.description)
})

// 描述文本样式类
const descriptionTextClasses = computed(() => {
  return 'zx-ai-welcome__description-text'
})

// 额外操作容器样式类
const extraClasses = computed(() => {
  const classes = [
    'zx-ai-welcome__extra',
    props.classNames.extra
  ].filter(Boolean)
  
  return classes.join(' ')
})

// 额外操作容器样式
const extraStyles = computed(() => {
  return normalizeStyle(props.styles.extra)
})
</script>

<style lang="scss" scoped>
.zx-ai-welcome {
  display: flex;
  align-items: flex-start;
  padding: 32rpx;
  border-radius: 16rpx;
  transition: all 0.3s ease;
  
  &--filled {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border: 2rpx solid #e8eaed;
  }
  
  &--borderless {
    background: transparent;
  }
  
  &__icon {
    flex-shrink: 0;
    margin-right: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &__content-wrapper {
    flex: 1;
    min-width: 0;
  }
  
  &__title-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 16rpx;
  }
  
  &__title {
    flex: 1;
    margin-bottom: 16rpx;
    
    &-text {
      font-size: 36rpx;
      font-weight: 600;
      color: #262626;
      line-height: 1.4;
      margin: 0;
    }
  }
  
  &__description {
    &-text {
      font-size: 28rpx;
      color: #8c8c8c;
      line-height: 1.6;
      margin: 0;
    }
  }
  
  &__extra {
    flex-shrink: 0;
    margin-left: 16rpx;
  }
}

// 响应式适配
@media (max-width: 750rpx) {
  .zx-ai-welcome {
    padding: 24rpx;
    
    &__icon {
      margin-right: 16rpx;
    }
    
    &__title {
      &-text {
        font-size: 32rpx;
      }
    }
    
    &__description {
      &-text {
        font-size: 26rpx;
      }
    }
  }
}

// 暗色主题适配
@media (prefers-color-scheme: dark) {
  .zx-ai-welcome {
    &--filled {
      background: linear-gradient(135deg, #1f1f1f 0%, #2d2d2d 100%);
      border-color: #434343;
    }
    
    &__title-text {
      color: #ffffff;
    }
    
    &__description-text {
      color: #a6a6a6;
    }
  }
}
</style>