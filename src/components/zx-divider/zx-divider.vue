<template>
  <div
    :class="dividerClass"
    :style="dividerStyle"
    role="separator"
  >
    <template v-if="hasSlot && direction === 'horizontal'">
      <span :class="contentClass">
        <slot />
      </span>
    </template>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue'

// 定义组件名称
defineOptions({
  name: 'ZxDivider'
})

// 定义属性及默认值
const props = defineProps({
  // 分割线方向
  direction: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  // 边框样式
  borderStyle: {
    type: String,
    default: 'solid',
    validator: (value) => ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'].includes(value)
  },
  // 文案位置
  contentPosition: {
    type: String,
    default: 'center',
    validator: (value) => ['left', 'center', 'right'].includes(value)
  }
})

// 获取插槽
const slots = useSlots()

// 计算是否有插槽内容
const hasSlot = computed(() => {
  return !!slots.default
})

// 计算分割线样式类
const dividerClass = computed(() => {
  return [
    'zx-divider',
    `zx-divider--${props.direction}`,
    {
      'zx-divider--with-text': hasSlot.value && props.direction === 'horizontal'
    }
  ]
})

// 计算内容样式类
const contentClass = computed(() => {
  return [
    'zx-divider__text',
    `zx-divider__text--${props.contentPosition}`
  ]
})

// 计算分割线样式
const dividerStyle = computed(() => {
  return {
    '--zx-divider-border-style': props.borderStyle
  }
})
</script>

<style lang="scss" scoped>
.zx-divider {
  --zx-border-color: #dcdfe6;
  --zx-border-color-lighter: #e4e7ed;
  --zx-text-color-placeholder: #a8abb2;
  --zx-font-size-small: 12px;
  --zx-divider-border-style: solid;
  
  background-color: transparent;
  
  &--horizontal {
    display: flex;
    align-items: center;
    margin: 16px 0;
    border-top: 1px var(--zx-divider-border-style) var(--zx-border-color);
    
    &.zx-divider--with-text {
      border-top: none;
      color: var(--zx-text-color-placeholder);
      font-weight: 500;
      font-size: var(--zx-font-size-small);
      
      &::before,
      &::after {
        content: '';
        flex: 1;
        border-top: 1px var(--zx-divider-border-style) var(--zx-border-color);
      }
    }
  }
  
  &--vertical {
    display: inline-block;
    width: 1px;
    height: 1em;
    margin: 0 8px;
    vertical-align: middle;
    border-left: 1px var(--zx-divider-border-style) var(--zx-border-color);
  }
  
  &__text {
    position: relative;
    padding: 0 16px;
    white-space: nowrap;
    
    &--left {
      &::before {
        flex: 0 0 5% !important;
      }
    }
    
    &--right {
      &::after {
        flex: 0 0 5% !important;
      }
    }
  }
}

// 暗色主题支持
.dark {
  .zx-divider {
    --zx-border-color: #4c4d4f;
    --zx-border-color-lighter: #414243;
    --zx-text-color-placeholder: #8d9095;
  }
}
</style>
