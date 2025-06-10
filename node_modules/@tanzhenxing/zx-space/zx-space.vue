<template>
  <view :class="spaceClass" :style="spaceStyle">
    <slot></slot>
  </view>
</template>

<script setup>
import { computed } from 'vue'

// 定义属性
const props = defineProps({
  // 对齐方式
  alignment: {
    type: String,
    default: 'center',
    validator: (value) => ['start', 'end', 'center', 'baseline', 'stretch', 'flex-start', 'flex-end'].includes(value)
  },
  // 排列方向
  direction: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  // 间隔大小
  size: {
    type: [String, Number, Array],
    default: 'small',
    validator: (value) => {
      if (typeof value === 'string') {
        return ['small', 'default', 'large'].includes(value)
      }
      if (typeof value === 'number') {
        return value >= 0
      }
      if (Array.isArray(value)) {
        return value.length === 2 && value.every(v => typeof v === 'number' && v >= 0)
      }
      return false
    }
  },
  // 是否自动换行
  wrap: {
    type: Boolean,
    default: false
  },
  // 是否填充容器
  fill: {
    type: Boolean,
    default: false
  },
  // 填充比例
  fillRatio: {
    type: Number,
    default: 100,
    validator: (value) => value > 0 && value <= 100
  },
  // 分隔符 (仅支持字符串)
  spacer: {
    type: String,
    default: ''
  },
  // 类名前缀
  prefixCls: {
    type: String,
    default: 'zx-space'
  }
})

// 计算间隔大小
const computedSize = computed(() => {
  const sizeMap = {
    small: 8,
    default: 12,
    large: 16
  }

  if (typeof props.size === 'string') {
    return [sizeMap[props.size], sizeMap[props.size]]
  } else if (typeof props.size === 'number') {
    return [props.size, props.size]
  } else if (Array.isArray(props.size)) {
    return props.size
  }

  return [sizeMap.small, sizeMap.small]
})

// 计算容器样式类
const spaceClass = computed(() => {
  return [
    props.prefixCls,
    `${props.prefixCls}--${props.direction}`,
    {
      [`${props.prefixCls}--wrap`]: props.wrap && props.direction === 'horizontal',
      [`${props.prefixCls}--fill`]: props.fill,
      [`${props.prefixCls}--with-spacer`]: !!props.spacer
    }
  ]
})

// 计算容器样式
const spaceStyle = computed(() => {
  const [horizontalSize, verticalSize] = computedSize.value
  const style = {
    '--zx-space-horizontal-size': `${horizontalSize}px`,
    '--zx-space-vertical-size': `${verticalSize}px`,
    '--zx-space-alignment': props.alignment === 'start' ? 'flex-start' :
      props.alignment === 'end' ? 'flex-end' : props.alignment,
    '--zx-space-spacer': props.spacer ? `"${props.spacer}"` : '""'
  }

  return style
})
</script>

<style lang="scss" scoped>
.zx-space {
  --zx-space-horizontal-size: 8px;
  --zx-space-vertical-size: 8px;
  --zx-space-alignment: center;
  --zx-space-spacer: "";

  display: flex;

  &--horizontal {
    flex-direction: row;
    align-items: var(--zx-space-alignment);
    gap: var(--zx-space-horizontal-size);

    &.zx-space--wrap {
      flex-wrap: wrap;
      row-gap: var(--zx-space-vertical-size);
    }

    &.zx-space--fill {
      width: 100%;

      :deep(> view),
      :deep(> text),
      :deep(> button),
      :deep(> image),
      :deep(> input),
      :deep(> picker),
      :deep(> switch),
      :deep(> slider) {
        flex: 1;
        min-width: 0;
      }
    }

    // 分隔符支持
    &.zx-space--with-spacer {
      gap: 0;

      :deep(> view:not(:last-child)::after),
      :deep(> text:not(:last-child)::after),
      :deep(> button:not(:last-child)::after),
      :deep(> image:not(:last-child)::after),
      :deep(> input:not(:last-child)::after),
      :deep(> picker:not(:last-child)::after),
      :deep(> switch:not(:last-child)::after),
      :deep(> slider:not(:last-child)::after) {
        content: var(--zx-space-spacer);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin: 0 calc(var(--zx-space-horizontal-size) / 2);
        color: #909399;
      }
    }
  }

  &--vertical {
    flex-direction: column;
    align-items: var(--zx-space-alignment);
    gap: var(--zx-space-vertical-size);

    &.zx-space--fill {
      width: 100%;

      :deep(> view),
      :deep(> text),
      :deep(> button),
      :deep(> image),
      :deep(> input),
      :deep(> picker),
      :deep(> switch),
      :deep(> slider) {
        width: 100%;
      }
    }

    // 分隔符支持
    &.zx-space--with-spacer {
      gap: 0;

      :deep(> view:not(:last-child)::after),
      :deep(> text:not(:last-child)::after),
      :deep(> button:not(:last-child)::after),
      :deep(> image:not(:last-child)::after),
      :deep(> input:not(:last-child)::after),
      :deep(> picker:not(:last-child)::after),
      :deep(> switch:not(:last-child)::after),
      :deep(> slider:not(:last-child)::after) {
        content: var(--zx-space-spacer);
        display: flex;
        align-items: center;
        justify-content: center;
        margin: calc(var(--zx-space-vertical-size) / 2) 0;
        color: #909399;
      }
    }
  }
}

// 暗色主题支持
.dark {
  .zx-space {

    :deep(> view::after),
    :deep(> text::after),
    :deep(> button::after),
    :deep(> image::after),
    :deep(> input::after),
    :deep(> picker::after),
    :deep(> switch::after),
    :deep(> slider::after) {
      color: #8d9095;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .zx-space {
    --zx-space-horizontal-size: 6px;
    --zx-space-vertical-size: 6px;
  }
}
</style>
