<template>
  <view class="zx-input-number" :class="[
    `zx-input-number--${size}`,
    {
      'is-disabled': disabled,
      'is-readonly': readonly,
      'is-controls-right': controlsPosition === 'right'
    }
  ]">
    <view v-if="controls && controlsPosition !== 'right'" class="zx-input-number__decrease"
      :class="{ 'is-disabled': minDisabled }" @click="decrease">
      <slot name="decrease-icon">
        <zx-icon name="minus"></zx-icon>
      </slot>
    </view>

    <view v-if="controls && controlsPosition !== 'right'" class="zx-input-number__increase"
      :class="{ 'is-disabled': maxDisabled }" @click="increase">
      <slot name="increase-icon">
        <zx-icon name="plus"></zx-icon>
      </slot>
    </view>

    <view class="zx-input-number__input">
      <view v-if="$slots.prefix" class="zx-input-number__prefix">
        <slot name="prefix"></slot>
      </view>

      <zx-input ref="inputRef" v-model="displayValue" type="text" :placeholder="placeholder" :readonly="readonly"
        :disabled="disabled" :name="name" :id="id" :aria-label="ariaLabel || label" class="zx-input-number__inner"
        @focus="handleFocus" @blur="handleBlur" @input="handleInput" @change="handleChange" @keydown="handleKeydown" />

      <view v-if="$slots.suffix" class="zx-input-number__suffix">
        <slot name="suffix"></slot>
      </view>
    </view>

    <view v-if="controls && controlsPosition === 'right'" class="zx-input-number__controls">
      <view class="zx-input-number__increase" :class="{ 'is-disabled': maxDisabled }" @click="increase">
        <slot name="increase-icon">
          <zx-icon name="arrow-up"></zx-icon>
        </slot>
      </view>
      <view class="zx-input-number__decrease" :class="{ 'is-disabled': minDisabled }" @click="decrease">
        <slot name="decrease-icon">
          <zx-icon name="arrow-down"></zx-icon>
        </slot>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'
import zxInput from '@tanzhenxing/zx-input/zx-input.vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: undefined
  },
  min: {
    type: Number,
    default: -Infinity
  },
  max: {
    type: Number,
    default: Infinity
  },
  step: {
    type: Number,
    default: 1
  },
  stepStrictly: {
    type: Boolean,
    default: false
  },
  precision: {
    type: Number,
    default: undefined
  },
  size: {
    type: String,
    default: 'default',
    validator: value => ['large', 'default', 'small'].includes(value)
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  controls: {
    type: Boolean,
    default: true
  },
  controlsPosition: {
    type: String,
    default: '',
    validator: value => ['', 'right'].includes(value)
  },
  name: String,
  ariaLabel: String,
  label: String,
  placeholder: String,
  id: String,
  valueOnClear: {
    type: [Number, String],
    default: null
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus'])

const inputRef = ref(null)
const currentValue = ref(props.modelValue)
const userInput = ref(null)

// 显示值
const displayValue = computed({
  get() {
    if (userInput.value !== null) {
      return userInput.value
    }
    if (currentValue.value === undefined || currentValue.value === null) {
      return ''
    }
    if (isNumber(currentValue.value)) {
      if (props.precision !== undefined) {
        return currentValue.value.toFixed(props.precision)
      }
      return currentValue.value.toString()
    }
    return ''
  },
  set(value) {
    userInput.value = value
  }
})

// 数值精度处理
const numPrecision = computed(() => {
  const stepPrecision = getPrecision(props.step)
  if (props.precision !== undefined) {
    if (stepPrecision > props.precision) {
      console.warn('precision should not be less than the decimal places of step')
    }
    return props.precision
  } else {
    return Math.max(getPrecision(props.modelValue), stepPrecision)
  }
})

// 最小值禁用状态
const minDisabled = computed(() => {
  return isNumber(currentValue.value) && currentValue.value <= props.min
})

// 最大值禁用状态
const maxDisabled = computed(() => {
  return isNumber(currentValue.value) && currentValue.value >= props.max
})

// 工具函数
function isNumber(value) {
  return typeof value === 'number' && !isNaN(value)
}

function getPrecision(value) {
  if (value === undefined) return 0
  const valueString = value.toString()
  const dotPosition = valueString.indexOf('.')
  let precision = 0
  if (dotPosition !== -1) {
    precision = valueString.length - dotPosition - 1
  }
  return precision
}

function toPrecision(num, pre) {
  if (pre === undefined) pre = numPrecision.value
  return parseFloat(Math.round(num * Math.pow(10, pre)) / Math.pow(10, pre))
}

function ensureBoundary(value) {
  if (!isNumber(value)) return value
  return Math.min(props.max, Math.max(props.min, value))
}

function setCurrentValue(value, emitChange = true) {
  const oldVal = currentValue.value

  if (typeof value === 'number' && props.precision !== undefined) {
    value = toPrecision(value, props.precision)
  }

  if (value !== undefined && value !== null) {
    value = ensureBoundary(value)
  }

  if (oldVal === value) return

  userInput.value = null
  currentValue.value = value
  emit('update:modelValue', value)

  if (emitChange) {
    emit('change', value, oldVal)
  }
}

// 增加数值
function increase() {
  if (props.disabled || props.readonly || maxDisabled.value) return

  const value = (currentValue.value || 0) + props.step
  setCurrentValue(value)
}

// 减少数值
function decrease() {
  if (props.disabled || props.readonly || minDisabled.value) return

  const value = (currentValue.value || 0) - props.step
  setCurrentValue(value)
}

// 处理输入
function handleInput(event) {
  userInput.value = event.target.value
}

// 处理改变
function handleChange(event) {
  const value = event.target.value
  const parsedValue = value === '' ? undefined : Number(value)

  if (!isNaN(parsedValue) || value === '') {
    if (props.stepStrictly) {
      const stepPrecision = getPrecision(props.step)
      const precisionFactor = Math.pow(10, stepPrecision)
      const stepValue = Math.round(parsedValue * precisionFactor) / precisionFactor
      if (stepValue % props.step !== 0) {
        return
      }
    }
    setCurrentValue(parsedValue)
  } else {
    userInput.value = null
    event.target.value = displayValue.value
  }
}

// 处理焦点
function handleFocus(event) {
  emit('focus', event)
}

// 处理失焦
function handleBlur(event) {
  emit('blur', event)
  if (props.validateEvent) {
    // 可以在这里添加表单验证逻辑
  }
}

// 处理键盘事件
function handleKeydown(event) {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    increase()
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    decrease()
  }
}

// 暴露方法
function focus() {
  nextTick(() => {
    inputRef.value?.focus()
  })
}

function blur() {
  nextTick(() => {
    inputRef.value?.blur()
  })
}

// 监听 modelValue 变化
watch(() => props.modelValue, (value) => {
  currentValue.value = value
  userInput.value = null
}, { immediate: true })

defineExpose({
  focus,
  blur
})
</script>

<style scoped>
.zx-input-number {
  position: relative;
  display: inline-block;
  width: 180px;
  line-height: 1;
}

.zx-input-number__input {
  position: relative;
  display: block;
  width: 100%;
}

.zx-input-number__inner {
  appearance: none;
  background-color: #ffffff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  color: #606266;
  display: block;
  font-size: inherit;
  height: 32px;
  line-height: 32px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}

.zx-input-number__inner:focus {
  border-color: #409eff;
  outline: none;
}

.zx-input-number__inner:hover {
  border-color: #c0c4cc;
}

.zx-input-number__inner:disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

.zx-input-number__prefix,
.zx-input-number__suffix {
  position: absolute;
  top: 0;
  height: 100%;
  color: #909399;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: none;
}

.zx-input-number__prefix {
  left: 8px;
}

.zx-input-number__suffix {
  right: 8px;
}

.zx-input-number:not(.is-controls-right) .zx-input-number__inner {
  padding-left: 50px;
  padding-right: 50px;
}

.zx-input-number:not(.is-controls-right) .zx-input-number__decrease,
.zx-input-number:not(.is-controls-right) .zx-input-number__increase {
  position: absolute;
  z-index: 1;
  top: 1px;
  width: 40px;
  height: auto;
  text-align: center;
  background: #f5f7fa;
  color: #606266;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dcdfe6;
}

.zx-input-number:not(.is-controls-right) .zx-input-number__decrease {
  left: 1px;
  border-radius: 4px 0 0 4px;
  border-right: none;
}

.zx-input-number:not(.is-controls-right) .zx-input-number__increase {
  right: 1px;
  border-radius: 0 4px 4px 0;
  border-left: none;
}

.zx-input-number:not(.is-controls-right) .zx-input-number__decrease:hover,
.zx-input-number:not(.is-controls-right) .zx-input-number__increase:hover {
  color: #409eff;
}

.zx-input-number:not(.is-controls-right) .zx-input-number__decrease.is-disabled,
.zx-input-number:not(.is-controls-right) .zx-input-number__increase.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

/* 右侧控制按钮样式 */
.zx-input-number.is-controls-right .zx-input-number__inner {
  padding-right: 50px;
}

.zx-input-number__controls {
  position: absolute;
  height: 100%;
  right: 1px;
  top: 1px;
  width: 40px;
  border-radius: 0 4px 4px 0;
  text-align: center;
  border-left: 1px solid #dcdfe6;
  display: flex;
  flex-direction: column;
}

.zx-input-number__controls .zx-input-number__increase,
.zx-input-number__controls .zx-input-number__decrease {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  background: #f5f7fa;
  color: #606266;
  cursor: pointer;
  font-size: 12px;
}

.zx-input-number__controls .zx-input-number__increase {
  border-bottom: 1px solid #dcdfe6;
  border-radius: 0 4px 0 0;
}

.zx-input-number__controls .zx-input-number__decrease {
  border-radius: 0 0 4px 0;
}

.zx-input-number__controls .zx-input-number__increase:hover,
.zx-input-number__controls .zx-input-number__decrease:hover {
  color: #409eff;
}

.zx-input-number__controls .zx-input-number__increase.is-disabled,
.zx-input-number__controls .zx-input-number__decrease.is-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

/* 尺寸样式 */
.zx-input-number--large .zx-input-number__inner {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}

.zx-input-number--small .zx-input-number__inner {
  height: 24px;
  line-height: 24px;
  font-size: 12px;
}

/* 禁用状态 */
.zx-input-number.is-disabled .zx-input-number__decrease,
.zx-input-number.is-disabled .zx-input-number__increase {
  color: #c0c4cc;
  cursor: not-allowed;
}

/* 图标字体 - 可以根据实际项目使用的图标库调整 */
.zx-icon-minus::before {
  content: '−';
}

.zx-icon-plus::before {
  content: '+';
}

.zx-icon-arrow-up::before {
  content: '↑';
}

.zx-icon-arrow-down::before {
  content: '↓';
}
</style>
