<template>
  <view class="zx-hover-button" :class="[
    `zx-hover-button--${position}`,
    {
      'zx-hover-button--shadow': shadow,
      'zx-hover-button--disabled': disabled
    }
  ]" :style="buttonStyle" @click="handleClick">
    <!-- 图标插槽 -->
    <slot name="icon" v-if="!$slots.default">
      <zx-icon :name="icon" :size="iconSize" :color="iconColor" />
    </slot>

    <!-- 默认内容插槽 -->
    <slot></slot>

    <!-- 文本标签 -->
    <view v-if="text && showText" class="zx-hover-button__text" :style="textStyle">
      {{ text }}
    </view>
  </view>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from 'vue'
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'


const { proxy } = getCurrentInstance()

// 设置组件名称
proxy.$options = proxy.$options || {}
proxy.$options.name = 'zx-hover-button'

// 定义 props
const props = defineProps({
  // 按钮位置: left-top, right-top, left-bottom, right-bottom
  position: {
    type: String,
    default: 'right-bottom',
    validator: (val) => ['left-top', 'right-top', 'left-bottom', 'right-bottom'].includes(val)
  },
  // 按钮大小
  size: {
    type: [Number, String],
    default: 50
  },
  // 图标名称
  icon: {
    type: String,
    default: 'plus'
  },
  // 图标大小
  iconSize: {
    type: [Number, String],
    default: '24'
  },
  // 图标颜色
  iconColor: {
    type: String,
    default: '#ffffff'
  },
  // 按钮背景色
  backgroundColor: {
    type: String,
    default: '#007AFF'
  },
  // 文本内容
  text: {
    type: String,
    default: ''
  },
  // 是否显示文本
  showText: {
    type: Boolean,
    default: false
  },
  // 文本颜色
  textColor: {
    type: String,
    default: '#333333'
  },
  // 文本背景色
  textBackgroundColor: {
    type: String,
    default: '#ffffff'
  },
  // 是否显示阴影
  shadow: {
    type: Boolean,
    default: true
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 距离边缘的距离
  margin: {
    type: [Number, String],
    default: 20
  },
  // 距离底部的距离（仅在 bottom 位置时生效）
  bottom: {
    type: [Number, String],
    default: 80
  },
  // 距离顶部的距离（仅在 top 位置时生效）
  top: {
    type: [Number, String],
    default: 80
  },
  // z-index 层级
  zIndex: {
    type: Number,
    default: 999
  },
  // 自定义样式
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

// 定义 emits
const emit = defineEmits(['click'])

// 计算按钮样式
const buttonStyle = computed(() => {
  const size = typeof props.size === 'number' ? `${props.size}px` : props.size
  const margin = typeof props.margin === 'number' ? `${props.margin}px` : props.margin
  const bottom = typeof props.bottom === 'number' ? `${props.bottom}px` : props.bottom
  const top = typeof props.top === 'number' ? `${props.top}px` : props.top

  const baseStyle = {
    width: size,
    height: size,
    backgroundColor: props.backgroundColor,
    zIndex: props.zIndex,
    ...props.customStyle
  }

  // 根据位置设置定位
  if (props.position.includes('left')) {
    baseStyle.left = margin
  } else {
    baseStyle.right = margin
  }

  if (props.position.includes('top')) {
    baseStyle.top = top
  } else {
    baseStyle.bottom = bottom
  }

  return baseStyle
})

// 计算文本样式
const textStyle = computed(() => {
  return {
    color: props.textColor,
    backgroundColor: props.textBackgroundColor
  }
})

// 点击事件处理
const handleClick = (event) => {
  if (props.disabled) {
    return
  }
  emit('click', event)
}
</script>

<style lang="scss" scoped>
.zx-hover-button {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;

  &:active {
    transform: scale(0.95);
  }

  &--shadow {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:active {
      transform: none;
    }
  }

  &__text {
    position: absolute;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);

    .zx-hover-button--left-top &,
    .zx-hover-button--left-bottom & {
      right: 100%;
      margin-right: 8px;
    }

    .zx-hover-button--right-top &,
    .zx-hover-button--right-bottom & {
      left: 100%;
      margin-left: 8px;
    }
  }
}

/* H5 特定样式 */
/* #ifdef H5 */
.zx-hover-button:hover {
  transform: scale(1.05);
}

.zx-hover-button--disabled:hover {
  transform: none;
}

/* #endif */
</style>