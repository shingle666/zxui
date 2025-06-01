<template>
  <view class="zx-horizontal-scrolling" :style="containerStyle">
    <!-- 左侧遮罩 -->
    <view 
      v-if="showMask && maskPosition === 'left'"
      class="zx-horizontal-scrolling__mask zx-horizontal-scrolling__mask--left"
      :class="[
        `zx-horizontal-scrolling__mask--${maskShadowType}`,
        { 'zx-horizontal-scrolling__mask--transparent': maskShadowType === 'transparent' }
      ]"
      :style="leftMaskStyle"
      @click="handleMaskClick"
    >
      <view class="zx-horizontal-scrolling__mask-box">
        <slot name="maskContent" v-if="$slots.maskContent"></slot>
        <template v-else-if="maskContent">
          <view v-html="maskContent"></view>
        </template>
        <template v-else>
          <zx-icon v-if="iconProps" v-bind="iconProps" />
          <text class="zx-horizontal-scrolling__mask-text">{{ moreText }}</text>
        </template>
      </view>
    </view>

    <!-- 滚动容器 -->
    <scroll-view 
      class="zx-horizontal-scrolling__container"
      :style="scrollContainerStyle"
      scroll-x
      :show-scrollbar="false"
      :scroll-left="scrollLeft"
      @scroll="handleScroll"
    >
      <view class="zx-horizontal-scrolling__content" :style="contentStyle">
        <slot></slot>
      </view>
    </scroll-view>

    <!-- 右侧遮罩 -->
    <view 
      v-if="showMask && maskPosition === 'right'"
      class="zx-horizontal-scrolling__mask zx-horizontal-scrolling__mask--right"
      :class="[
        `zx-horizontal-scrolling__mask--${maskShadowType}`,
        { 'zx-horizontal-scrolling__mask--transparent': maskShadowType === 'transparent' }
      ]"
      :style="rightMaskStyle"
      @click="handleMaskClick"
    >
      <view class="zx-horizontal-scrolling__mask-box">
        <slot name="maskContent" v-if="$slots.maskContent"></slot>
        <template v-else-if="maskContent">
          <view v-html="maskContent"></view>
        </template>
        <template v-else>
          <zx-icon v-if="iconProps" v-bind="iconProps" />
          <text class="zx-horizontal-scrolling__mask-text">{{ moreText }}</text>
        </template>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

// Props定义
const props = defineProps({
  // 是否显示遮罩层
  showMask: {
    type: Boolean,
    default: true
  },
  // 遮罩层位置 left | right
  maskPosition: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value)
  },
  // 遮罩阴影类型 none | triangle | shadow | transparent
  maskShadowType: {
    type: String,
    default: 'triangle',
    validator: (value) => ['none', 'triangle', 'shadow', 'transparent'].includes(value)
  },
  // 遮罩层宽度
  maskWidth: {
    type: [String, Number],
    default: '100px'
  },
  // 滚动内容和容器的遮罩层侧之间的距离
  maskDistance: {
    type: [String, Number],
    default: 0
  },
  // 图标属性
  iconProps: {
    type: Object,
    default: () => ({
      name: 'arrow-right',
      size: '16px'
    })
  },
  // 自定义遮罩内容
  maskContent: {
    type: String,
    default: ''
  },
  // 更多文本
  moreText: {
    type: String,
    default: '更多'
  },
  // 容器高度
  height: {
    type: [String, Number],
    default: 'auto'
  },
  // 内容间距
  gap: {
    type: [String, Number],
    default: '12px'
  }
})

// Emits定义
const emit = defineEmits([
  'clickMask',
  'scrollRight', 
  'scrollChange'
])

// 响应式数据
const scrollLeft = ref(0)
const isScrolledToRight = ref(false)

// 计算属性
const containerStyle = computed(() => {
  const style = {}
  if (props.height !== 'auto') {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return style
})

const scrollContainerStyle = computed(() => {
  const style = {
    flex: 1
  }
  
  if (props.showMask) {
    const distance = typeof props.maskDistance === 'number' ? `${props.maskDistance}px` : props.maskDistance
    if (props.maskPosition === 'left') {
      style.marginLeft = distance
    } else {
      style.marginRight = distance
    }
  }
  
  return style
})

const contentStyle = computed(() => {
  return {
    display: 'flex',
    gap: typeof props.gap === 'number' ? `${props.gap}px` : props.gap,
    padding: '2px 0'
  }
})

const leftMaskStyle = computed(() => {
  const width = typeof props.maskWidth === 'number' ? `${props.maskWidth}px` : props.maskWidth
  const style = {
    width,
    flexShrink: 0
  }
  
  if (props.maskShadowType === 'transparent') {
    style.background = 'rgba(255, 255, 255, 0.7)'
    style.position = 'absolute'
    style.left = '0'
    style.top = '0'
    style.height = '100%'
    style.zIndex = '1'
  }
  
  return style
})

const rightMaskStyle = computed(() => {
  const width = typeof props.maskWidth === 'number' ? `${props.maskWidth}px` : props.maskWidth
  const style = {
    width,
    flexShrink: 0
  }
  
  if (props.maskShadowType === 'transparent') {
    style.background = 'rgba(255, 255, 255, 0.7)'
    style.position = 'absolute'
    style.right = '0'
    style.top = '0'
    style.height = '100%'
    style.zIndex = '1'
  }
  
  return style
})

// 方法
const handleMaskClick = () => {
  emit('clickMask')
}

const handleScroll = (e) => {
  const { scrollLeft: currentScrollLeft, scrollWidth, clientWidth } = e.detail || e.target
  scrollLeft.value = currentScrollLeft
  
  // 检查是否滚动到右边
  const isAtRight = currentScrollLeft + clientWidth >= scrollWidth - 10 // 10px容错
  if (isAtRight && !isScrolledToRight.value) {
    isScrolledToRight.value = true
    emit('scrollRight')
  } else if (!isAtRight) {
    isScrolledToRight.value = false
  }
  
  emit('scrollChange', currentScrollLeft)
}

// 暴露方法给父组件
defineExpose({
  scrollTo: (left) => {
    scrollLeft.value = left
  },
  getScrollLeft: () => scrollLeft.value
})
</script>

<style lang="scss" scoped>
.zx-horizontal-scrolling {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;

  &__container {
    width: 100%;
    height: 100%;
    white-space: nowrap;
  }

  &__content {
    display: flex;
    align-items: center;
    min-width: 100%;
    height: 100%;
  }

  &__mask {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
    z-index: 2;

    &--left {
      margin-right: 10px;

      &.zx-horizontal-scrolling__mask--triangle {
        &::before {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          content: '';
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 5px solid transparent;
          border-right: 5px solid #d1d0d0;
        }

        &::after {
          position: absolute;
          top: 0;
          right: -7px;
          content: '';
          width: 7px;
          height: 100%;
          background: linear-gradient(-90deg, rgba(0, 0, 0, 0.00) 0%, #d1d0d0 100%);
          border-radius: 3px;
        }
      }

      &.zx-horizontal-scrolling__mask--shadow {
        &::after {
          position: absolute;
          top: 0;
          right: -7px;
          content: '';
          width: 7px;
          height: 100%;
          background: linear-gradient(-90deg, rgba(0, 0, 0, 0.00) 0%, #d1d0d0 100%);
          border-radius: 3px;
        }
      }
    }

    &--right {
      margin-left: 10px;

      &.zx-horizontal-scrolling__mask--triangle {
        &::before {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          content: '';
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-left: 5px solid #d1d0d0;
          border-right: 5px solid transparent;
        }

        &::after {
          position: absolute;
          top: 0;
          left: -7px;
          content: '';
          width: 7px;
          height: 100%;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.00) 0%, #d1d0d0 100%);
          border-radius: 3px;
        }
      }

      &.zx-horizontal-scrolling__mask--shadow {
        &::after {
          position: absolute;
          top: 0;
          left: -7px;
          content: '';
          width: 7px;
          height: 100%;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.00) 0%, #d1d0d0 100%);
          border-radius: 3px;
        }
      }
    }

    &--transparent {
      padding: 0 !important;
      margin: 0;
    }

    &-box {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &-text {
      margin-top: 10px;
      font-size: 14px;
      color: #666;
    }
  }
}
</style>