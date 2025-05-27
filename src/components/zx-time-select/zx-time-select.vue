<template>
  <view class="zx-time-select">
    <picker
      :mode="'time'"
      :value="innerValue"
      :start="start"
      :end="end"
      :disabled="disabled"
      @change="onPickerChange"
      @cancel="onCancel"
    >
      <view class="zx-time-select__input" :class="{ 'is-disabled': disabled }">
        <text v-if="innerValue">{{ displayValue }}</text>
        <text v-else class="placeholder">{{ placeholder }}</text>
        <view v-if="clearable && innerValue && !disabled" class="zx-time-select__clear" @tap.stop="clearValue">×</view>
      </view>
    </picker>
  </view>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  modelValue: String,
  start: { type: String, default: '09:00' },
  end: { type: String, default: '18:00' },
  step: { type: String, default: '00:30' },
  format: { type: String, default: 'HH:mm' },
  minTime: String,
  maxTime: String,
  placeholder: { type: String, default: '请选择时间' },
  clearable: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue', 'change', 'clear'])

const innerValue = ref(props.modelValue || '')

watch(() => props.modelValue, val => {
  innerValue.value = val || ''
})

const displayValue = computed(() => {
  if (!innerValue.value) return ''
  return dayjs(innerValue.value, 'HH:mm').format(props.format)
})

function onPickerChange(e) {
  let value = e.detail.value
  if (props.minTime && value < props.minTime) value = props.minTime
  if (props.maxTime && value > props.maxTime) value = props.maxTime
  innerValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}
function onCancel() {}
function clearValue() {
  innerValue.value = ''
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<style scoped>
.zx-time-select {
  width: 100%;
}
.zx-time-select__input {
  display: flex;
  align-items: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 8rpx 20rpx;
  min-height: 80rpx;
  background: #fff;
  color: #333;
  font-size: 30rpx;
  position: relative;
}
.zx-time-select__input.is-disabled {
  background: #f5f7fa;
  color: #bbb;
}
.zx-time-select__clear {
  margin-left: 10rpx;
  color: #bbb;
  font-size: 36rpx;
  cursor: pointer;
}
.placeholder {
  color: #bbb;
}
</style>
