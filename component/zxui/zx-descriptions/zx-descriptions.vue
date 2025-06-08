<template>
  <view :class="descriptionsClass" :style="descriptionsStyle">
    <!-- 标题和操作区 -->
    <view v-if="title || $slots.title || extra || $slots.extra" :class="headerClass">
      <view :class="titleClass">
        <slot name="title">
          <text>{{ title }}</text>
        </slot>
      </view>
      <view v-if="extra || $slots.extra" :class="extraClass">
        <slot name="extra">
          <text>{{ extra }}</text>
        </slot>
      </view>
    </view>

    <!-- 描述列表内容 -->
    <view :class="bodyClass">
      <!-- 直接渲染插槽内容 -->
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
import { computed, provide } from 'vue'

// 定义组件名称
defineOptions({
  name: 'ZxDescriptions'
})

// 定义 props
const props = defineProps({
  // 是否带有边框
  border: {
    type: Boolean,
    default: false
  },
  // 一行显示的项目数量
  column: {
    type: Number,
    default: 3
  },
  // 排列方向
  direction: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  // 尺寸
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['large', 'default', 'small'].includes(value)
  },
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 操作区
  extra: {
    type: String,
    default: ''
  },
  // 标签宽度
  labelWidth: {
    type: [String, Number],
    default: ''
  }
})

// 计算样式类名
const descriptionsClass = computed(() => [
  'zx-descriptions',
  `zx-descriptions--${props.size}`,
  {
    'zx-descriptions--border': props.border,
    'zx-descriptions--vertical': props.direction === 'vertical'
  }
])

const descriptionsStyle = computed(() => ({}))
const headerClass = computed(() => 'zx-descriptions__header')
const titleClass = computed(() => 'zx-descriptions__title')
const extraClass = computed(() => 'zx-descriptions__extra')
const bodyClass = computed(() => [
  'zx-descriptions__body',
  {
    'zx-descriptions__body--border': props.border,
    'zx-descriptions__body--vertical': props.direction === 'vertical'
  }
])

// 向子组件提供配置
provide('zx-descriptions', {
  border: props.border,
  column: props.column,
  direction: props.direction,
  size: props.size,
  labelWidth: props.labelWidth
})
</script>

<style scoped>
.zx-descriptions {
  box-sizing: border-box;
  font-size: 28rpx;
  color: #303133;
}

.zx-descriptions__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40rpx;
}

.zx-descriptions__title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 1.2;
  font-size: 32rpx;
  font-weight: bold;
  color: #303133;
}

.zx-descriptions__extra {
  margin-left: auto;
}

.zx-descriptions__body {
  color: #606266;
  background-color: #fff;
}

.zx-descriptions__body--border {
  border: 1rpx solid #ebeef5;
  border-radius: 8rpx;
  overflow: hidden;
}

.zx-descriptions__body--vertical {
  display: block;
}

/* 边框样式 */
.zx-descriptions--border .zx-descriptions__body {
  border: 1rpx solid #ebeef5;
  border-radius: 8rpx;
  overflow: hidden;
}

/* 尺寸样式 */
.zx-descriptions--large {
  font-size: 32rpx;
}

.zx-descriptions--large .zx-descriptions__title {
  font-size: 36rpx;
}

.zx-descriptions--small {
  font-size: 24rpx;
}

.zx-descriptions--small .zx-descriptions__title {
  font-size: 28rpx;
}

.zx-descriptions--small .zx-descriptions__header {
  margin-bottom: 32rpx;
}
</style>
