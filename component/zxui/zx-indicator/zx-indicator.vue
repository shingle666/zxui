<template>
  <view :class="indicatorClass" :style="indicatorStyle">
    <template v-for="item in size" :key="item">
      <view 
        v-if="item === current" 
        :class="numberClass"
        :style="numberStyle"
      >
        {{ fillZero && item < 10 ? '0' + item : item }}
      </view>
      <view 
        v-else 
        :class="dotClass"
        :style="dotStyle"
      />
    </template>
  </view>
</template>

<script setup>
import { computed } from 'vue'

// 定义组件名称
defineOptions({
  name: 'ZxIndicator'
})

// 定义属性及默认值
const props = defineProps({
  // 当前步骤
  current: {
    type: Number,
    default: 1
  },
  // 步骤长度
  size: {
    type: Number,
    default: 3
  },
  // 是否启用块级布局
  block: {
    type: Boolean,
    default: false
  },
  // 对齐方式，仅在 block 为 true 时生效
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'center', 'right'].includes(value)
  },
  // 单数前面是否补 0
  fillZero: {
    type: Boolean,
    default: true
  },
  // 指示器背景色
  bgColor: {
    type: String,
    default: '#007aff'
  },
  // 点的颜色
  dotColor: {
    type: String,
    default: '#c8c9cc'
  },
  // 数字文字颜色
  textColor: {
    type: String,
    default: '#ffffff'
  },
  // 指示器大小
  indicatorSize: {
    type: [String, Number],
    default: 18
  }
})

// 计算指示器容器样式类
const indicatorClass = computed(() => {
  return [
    'zx-indicator',
    {
      'zx-indicator--block': props.block,
      [`zx-indicator--align-${props.align}`]: props.block
    }
  ]
})

// 计算指示器容器样式
const indicatorStyle = computed(() => {
  return {
    '--zx-indicator-bg-color': props.bgColor,
    '--zx-indicator-dot-color': props.dotColor,
    '--zx-indicator-text-color': props.textColor,
    '--zx-indicator-size': typeof props.indicatorSize === 'number' ? props.indicatorSize + 'px' : props.indicatorSize
  }
})

// 计算数字样式类
const numberClass = computed(() => {
  return 'zx-indicator__number'
})

// 计算点样式类
const dotClass = computed(() => {
  return 'zx-indicator__dot'
})

// 计算数字样式
const numberStyle = computed(() => {
  return {}
})

// 计算点样式
const dotStyle = computed(() => {
  return {}
})
</script>

<style lang="scss" scoped>
.zx-indicator {
  --zx-indicator-bg-color: #007aff;
  --zx-indicator-dot-color: #c8c9cc;
  --zx-indicator-text-color: #ffffff;
  --zx-indicator-size: 18px;
  --zx-indicator-dot-size: calc(var(--zx-indicator-size) / 3);
  --zx-indicator-border-size: calc(var(--zx-indicator-size) + 2px);
  --zx-indicator-number-font-size: 10px;
  
  display: inline-flex;
  align-items: center;
  
  &--block {
    display: flex;
    width: 100%;
  }
  
  &--align-left {
    justify-content: flex-start;
  }
  
  &--align-center {
    justify-content: center;
  }
  
  &--align-right {
    justify-content: flex-end;
  }
  
  &__dot,
  &__number {
    margin: 0 4px;
    
    &:first-child {
      margin-left: 0;
    }
    
    &:last-child {
      margin-right: 0;
    }
  }
  
  &__dot {
    width: var(--zx-indicator-dot-size);
    height: var(--zx-indicator-dot-size);
    background-color: var(--zx-indicator-dot-color);
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  &__number {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--zx-indicator-size);
    height: var(--zx-indicator-size);
    font-size: var(--zx-indicator-number-font-size);
    color: var(--zx-indicator-text-color);
    background-color: var(--zx-indicator-bg-color);
    border: 1px solid var(--zx-indicator-text-color);
    border-radius: 50%;
    box-shadow: 0 0 1px 1px var(--zx-indicator-bg-color);
    flex-shrink: 0;
  }
}
</style>