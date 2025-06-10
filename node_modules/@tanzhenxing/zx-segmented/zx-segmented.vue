<template>
  <view class="zx-segmented" :class="[
    `zx-segmented--${size}`,
    {
      'zx-segmented--block': block,
      'zx-segmented--disabled': disabled,
      'zx-segmented--vertical': direction === 'vertical'
    }
  ]">
    <view class="zx-segmented__inner">
      <view v-for="(item, index) in normalizedOptions" :key="index" class="zx-segmented__item" :class="{
        'zx-segmented__item--selected': isSelected(item),
        'zx-segmented__item--disabled': disabled || item.disabled
      }" @click="handleSelect(item)">
        <slot :item="item">
          <text class="zx-segmented__item-label">{{ item.label }}</text>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  options: {
    type: Array,
    default: () => [],
  },
  props: {
    type: Object,
    default: () => ({
      label: 'label',
      value: 'value',
      disabled: 'disabled',
    }),
  },
  size: {
    type: String,
    default: 'default', // large, default, small
    validator: (val) => ['large', 'default', 'small'].includes(val),
  },
  block: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  validateEvent: {
    type: Boolean,
    default: true,
  },
  direction: {
    type: String,
    default: 'horizontal', // horizontal, vertical
    validator: (val) => ['horizontal', 'vertical'].includes(val),
  },
});

const emit = defineEmits(['update:modelValue', 'change']);

// 格式化选项
const normalizedOptions = computed(() => {
  return props.options.map((option) => {
    if (typeof option === 'string' || typeof option === 'number' || typeof option === 'boolean') {
      return {
        label: option.toString(),
        value: option,
        disabled: false,
      };
    } else {
      return {
        label: option[props.props.label] || option.label || '',
        value: option[props.props.value] || option.value || '',
        disabled: option[props.props.disabled] || option.disabled || false,
      };
    }
  });
});

// 判断选项是否被选中
const isSelected = (item) => {
  return item.value === props.modelValue;
};

// 处理选择
const handleSelect = (item) => {
  if (props.disabled || item.disabled) return;

  emit('update:modelValue', item.value);
  emit('change', item.value);
};
</script>

<style lang="scss">
.zx-segmented {
  --segmented-item-height: 32px;
  --segmented-item-radius: 4px;
  --segmented-item-selected-color: #409eff;
  --segmented-item-selected-bg-color: #ecf5ff;
  --segmented-item-color: #606266;
  --segmented-item-bg-color: #f2f3f5;
  --segmented-item-hover-bg-color: #e4e7ed;
  --segmented-item-disabled-color: #c0c4cc;
  --segmented-item-disabled-bg-color: #f7f7f7;
  --segmented-border-color: #dcdfe6;

  display: inline-flex;
  box-sizing: border-box;
  border-radius: var(--segmented-item-radius);
  background-color: var(--segmented-item-bg-color);
  padding: 2px;

  &__inner {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  &--vertical &__inner {
    flex-direction: column;
  }

  &__item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    height: var(--segmented-item-height);
    font-size: 14px;
    color: var(--segmented-item-color);
    border-radius: var(--segmented-item-radius);
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover:not(&--selected):not(&--disabled) {
      background-color: var(--segmented-item-hover-bg-color);
    }

    &--selected {
      color: var(--segmented-item-selected-color);
      background-color: var(--segmented-item-selected-bg-color);
    }

    &--disabled {
      color: var(--segmented-item-disabled-color);
      background-color: var(--segmented-item-disabled-bg-color);
      cursor: not-allowed;
    }

    &-label {
      line-height: 1;
    }
  }

  &--large {
    --segmented-item-height: 40px;

    .zx-segmented__item {
      font-size: 16px;
      padding: 0 16px;
    }
  }

  &--small {
    --segmented-item-height: 24px;

    .zx-segmented__item {
      font-size: 12px;
      padding: 0 8px;
    }
  }

  &--block {
    display: flex;
    width: 100%;
  }

  &--disabled {
    cursor: not-allowed;
  }

  &--vertical {
    .zx-segmented__item {
      width: 100%;
    }
  }
}
</style>
