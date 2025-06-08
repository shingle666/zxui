<template>
  <view :class="itemClass" :style="itemStyle">
    <!-- 标签 -->
    <view :class="labelClass" :style="labelStyle">
      <text>{{ label }}</text>
    </view>
    <!-- 内容 -->
    <view :class="contentClass" :style="contentStyle">
      <slot />
    </view>
  </view>
</template>

<script setup>
import { computed, inject } from 'vue'

// 注入父组件配置
const descriptions = inject('zx-descriptions', {})

// 定义 props
const props = defineProps({
  // 标签文本
  label: {
    type: String,
    default: ''
  },
  // 列的数量
  span: {
    type: Number,
    default: 1
  },
  // 单元格应该跨越的行数
  rowspan: {
    type: Number,
    default: 1
  },
  // 列的宽度
  width: {
    type: [String, Number],
    default: ''
  },
  // 列的最小宽度
  minWidth: {
    type: [String, Number],
    default: ''
  },
  // 列标签宽
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  // 列的内容对齐方式
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'center', 'right'].includes(value)
  },
  // 列的标签对齐方式
  labelAlign: {
    type: String,
    default: '',
    validator: (value) => ['left', 'center', 'right', ''].includes(value)
  },
  // 列的内容自定义类名
  className: {
    type: String,
    default: ''
  },
  // 列标签自定义类名
  labelClassName: {
    type: String,
    default: ''
  }
})

// 计算样式类名
const itemClass = computed(() => [
  'zx-descriptions-item',
  {
    'zx-descriptions-item--border': descriptions.border,
    'zx-descriptions-item--vertical': descriptions.direction === 'vertical',
    [`zx-descriptions-item--${descriptions.size}`]: descriptions.size !== 'default'
  }
])

const labelClass = computed(() => [
  'zx-descriptions-item__label',
  props.labelClassName,
  {
    [`zx-descriptions-item__label--${props.labelAlign || props.align}`]: props.labelAlign || props.align
  }
])

const contentClass = computed(() => [
  'zx-descriptions-item__content',
  props.className,
  {
    [`zx-descriptions-item__content--${props.align}`]: props.align
  }
])

// 计算样式
const itemStyle = computed(() => {
  const style = {}
  
  // 设置宽度
  if (!descriptions.border && descriptions.column) {
    style.width = `${100 / descriptions.column}%`
  }
  
  return style
})

const labelStyle = computed(() => {
  const style = {}
  
  // 标签宽度
  const labelWidth = props.labelWidth || descriptions.labelWidth
  if (labelWidth) {
    style.width = typeof labelWidth === 'number' ? `${labelWidth}rpx` : labelWidth
  }
  
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}rpx` : props.width
  }
  
  return style
})

const contentStyle = computed(() => {
  const style = {}
  
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}rpx` : props.width
  }
  
  if (props.minWidth) {
    style.minWidth = typeof props.minWidth === 'number' ? `${props.minWidth}rpx` : props.minWidth
  }
  
  return style
})
</script>

<style scoped>
.zx-descriptions-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 36rpx;
  min-width: 0;
}

.zx-descriptions-item__label {
  font-weight: bold;
  color: #909399;
  padding-right: 24rpx;
  word-break: break-word;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  min-height: 40rpx;
}

.zx-descriptions-item__content {
  color: #303133;
  word-break: break-word;
  flex: 1;
  display: flex;
  align-items: center;
  min-height: 40rpx;
}

/* 边框样式 */
.zx-descriptions-item--border {
  margin-bottom: 0;
  border-bottom: 1rpx solid #ebeef5;
}

.zx-descriptions-item--border:last-child {
  border-bottom: none;
}

.zx-descriptions-item--border .zx-descriptions-item__label {
  background: #fafafa;
  border-right: 1rpx solid #ebeef5;
  padding: 24rpx;
  margin: 0;
}

.zx-descriptions-item--border .zx-descriptions-item__content {
  background: #fff;
  padding: 24rpx;
  margin: 0;
}

/* 垂直布局 */
.zx-descriptions-item--vertical {
  flex-direction: column;
  align-items: stretch;
}

.zx-descriptions-item--vertical .zx-descriptions-item__label {
  padding-right: 0;
  padding-bottom: 12rpx;
}

.zx-descriptions-item--vertical .zx-descriptions-item__content {
  padding-left: 0;
}

/* 对齐方式 */
.zx-descriptions-item__label--left {
  justify-content: flex-start;
}

.zx-descriptions-item__label--center {
  justify-content: center;
}

.zx-descriptions-item__label--right {
  justify-content: flex-end;
}

.zx-descriptions-item__content--left {
  justify-content: flex-start;
}

.zx-descriptions-item__content--center {
  justify-content: center;
}

.zx-descriptions-item__content--right {
  justify-content: flex-end;
}

/* 尺寸样式 */
.zx-descriptions-item--large .zx-descriptions-item__label,
.zx-descriptions-item--large .zx-descriptions-item__content {
  font-size: 32rpx;
  min-height: 48rpx;
}

.zx-descriptions-item--large.zx-descriptions-item--border .zx-descriptions-item__label,
.zx-descriptions-item--large.zx-descriptions-item--border .zx-descriptions-item__content {
  padding: 32rpx;
}

.zx-descriptions-item--large:not(.zx-descriptions-item--border) {
  margin-bottom: 48rpx;
}

.zx-descriptions-item--small .zx-descriptions-item__label,
.zx-descriptions-item--small .zx-descriptions-item__content {
  font-size: 24rpx;
  min-height: 32rpx;
}

.zx-descriptions-item--small.zx-descriptions-item--border .zx-descriptions-item__label,
.zx-descriptions-item--small.zx-descriptions-item--border .zx-descriptions-item__content {
  padding: 16rpx;
}

.zx-descriptions-item--small:not(.zx-descriptions-item--border) {
  margin-bottom: 24rpx;
}
</style> 