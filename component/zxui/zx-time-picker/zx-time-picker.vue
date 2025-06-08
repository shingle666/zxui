<template>
  <view class="zx-time-picker" :class="[{ 'is-disabled': disabled, 'is-readonly': readonly }]">
    <!-- 输入框部分 -->
    <view class="zx-time-picker__input-wrapper" @click="handleOpen" v-if="!readonly">
      <view class="zx-time-picker__input" :class="{ 'zx-time-picker__input--focus': visible }">
        <view v-if="prefixIcon" class="zx-time-picker__prefix-icon">
          <slot name="prefix-icon">
            <zx-icon :name="prefixIcon" />
          </slot>
        </view>
        <view class="zx-time-picker__inner">
          <text v-if="displayValue" class="zx-time-picker__text">{{ displayValue }}</text>
          <text v-else class="zx-time-picker__placeholder">{{ placeholder }}</text>
        </view>
        <view v-if="clearable && displayValue && !disabled" class="zx-time-picker__clear-icon"
          @click.stop="handleClear">
          <slot name="clear-icon">
            <zx-icon :name="clearIcon" />
          </slot>
        </view>
        <view v-else class="zx-time-picker__suffix-icon">
          <slot name="suffix-icon">
            <zx-icon :name="suffixIcon" />
          </slot>
        </view>
      </view>
    </view>
    <view v-else class="zx-time-picker__input-wrapper">
      <view class="zx-time-picker__input zx-time-picker__input--readonly">
        <text v-if="displayValue" class="zx-time-picker__text">{{ displayValue }}</text>
        <text v-else class="zx-time-picker__placeholder">{{ placeholder }}</text>
      </view>
    </view>

    <!-- 弹窗选择器 -->
    <view v-if="visible" class="zx-time-picker__mask" @click="handleMaskClick"></view>
    <view v-if="visible" class="zx-time-picker__popup">
      <view class="zx-time-picker__toolbar">
        <view class="zx-time-picker__toolbar__cancel" @click="handleCancel">{{ cancelText }}</view>
        <view class="zx-time-picker__toolbar__title">{{ title }}</view>
        <view class="zx-time-picker__toolbar__confirm" @click="handleConfirm">{{ confirmText }}</view>
      </view>
      <view class="zx-time-picker__main">
        <!-- 单时间点选择 -->
        <picker-view v-if="!isRange" :value="pickerValue" @change="handlePickerChange"
          class="zx-time-picker__picker-view">
          <picker-view-column>
            <view v-for="hour in hours" :key="hour" class="zx-time-picker__item"
              :class="{ 'is-disabled': isHourDisabled(hour) }">{{ hour.toString().padStart(2, '0') }}</view>
          </picker-view-column>
          <picker-view-column>
            <view v-for="minute in minutes" :key="minute" class="zx-time-picker__item"
              :class="{ 'is-disabled': isMinuteDisabled(selectedHour, minute) }">{{ minute.toString().padStart(2, '0')
              }}</view>
          </picker-view-column>
          <picker-view-column v-if="showSeconds">
            <view v-for="second in seconds" :key="second" class="zx-time-picker__item"
              :class="{ 'is-disabled': isSecondDisabled(selectedHour, selectedMinute, second) }">{{
                second.toString().padStart(2, '0') }}</view>
          </picker-view-column>
        </picker-view>
        <!-- 时间范围选择 -->
        <view v-else class="zx-time-picker__range">
          <view class="zx-time-picker__range-panel">
            <text class="zx-time-picker__range-title">{{ startPlaceholder }}</text>
            <picker-view :value="startPickerValue" @change="handleStartPickerChange"
              class="zx-time-picker__picker-view">
              <picker-view-column>
                <view v-for="hour in hours" :key="hour" class="zx-time-picker__item"
                  :class="{ 'is-disabled': isHourDisabled(hour) }">{{ hour.toString().padStart(2, '0') }}</view>
              </picker-view-column>
              <picker-view-column>
                <view v-for="minute in minutes" :key="minute" class="zx-time-picker__item"
                  :class="{ 'is-disabled': isMinuteDisabled(startSelectedHour, minute) }">{{
                    minute.toString().padStart(2, '0') }}</view>
              </picker-view-column>
              <picker-view-column v-if="showSeconds">
                <view v-for="second in seconds" :key="second" class="zx-time-picker__item"
                  :class="{ 'is-disabled': isSecondDisabled(startSelectedHour, startSelectedMinute, second) }">{{
                    second.toString().padStart(2, '0') }}</view>
              </picker-view-column>
            </picker-view>
          </view>
          <view class="zx-time-picker__range-separator">{{ rangeSeparator }}</view>
          <view class="zx-time-picker__range-panel">
            <text class="zx-time-picker__range-title">{{ endPlaceholder }}</text>
            <picker-view :value="endPickerValue" @change="handleEndPickerChange" class="zx-time-picker__picker-view">
              <picker-view-column>
                <view v-for="hour in hours" :key="hour" class="zx-time-picker__item"
                  :class="{ 'is-disabled': isHourDisabled(hour) }">{{ hour.toString().padStart(2, '0') }}</view>
              </picker-view-column>
              <picker-view-column>
                <view v-for="minute in minutes" :key="minute" class="zx-time-picker__item"
                  :class="{ 'is-disabled': isMinuteDisabled(endSelectedHour, minute) }">{{ minute.toString().padStart(2,
                  '0') }}</view>
              </picker-view-column>
              <picker-view-column v-if="showSeconds">
                <view v-for="second in seconds" :key="second" class="zx-time-picker__item"
                  :class="{ 'is-disabled': isSecondDisabled(endSelectedHour, endSelectedMinute, second) }">{{
                    second.toString().padStart(2, '0') }}</view>
              </picker-view-column>
            </picker-view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'

const emit = defineEmits(['update:modelValue', 'change', 'blur', 'focus', 'clear', 'visible-change'])

const props = defineProps({
  modelValue: [String, Array],
  isRange: Boolean,
  format: { type: String, default: 'HH:mm:ss' },
  valueFormat: { type: String, default: '' },
  readonly: Boolean,
  disabled: Boolean,
  clearable: { type: Boolean, default: true },
  placeholder: { type: String, default: '请选择时间' },
  startPlaceholder: { type: String, default: '开始时间' },
  endPlaceholder: { type: String, default: '结束时间' },
  rangeSeparator: { type: String, default: '-' },
  showSeconds: { type: Boolean, default: true },
  prefixIcon: { type: String, default: '' },
  suffixIcon: { type: String, default: 'clock' },
  clearIcon: { type: String, default: 'close-circle' },
  cancelText: { type: String, default: '取消' },
  confirmText: { type: String, default: '确定' },
  title: { type: String, default: '选择时间' },
  disabledHours: Function,
  disabledMinutes: Function,
  disabledSeconds: Function,
  defaultValue: [String, Array],
})

const visible = ref(false)

const hours = computed(() => Array.from({ length: 24 }, (_, i) => i))
const minutes = computed(() => Array.from({ length: 60 }, (_, i) => i))
const seconds = computed(() => Array.from({ length: 60 }, (_, i) => i))

const isHourDisabled = (hour) => props.disabledHours ? props.disabledHours().includes(hour) : false
const isMinuteDisabled = (hour, minute) => props.disabledMinutes ? props.disabledMinutes(hour)?.includes(minute) : false
const isSecondDisabled = (hour, minute, second) => props.disabledSeconds ? props.disabledSeconds(hour, minute)?.includes(second) : false

const isRange = computed(() => props.isRange)

const displayValue = computed(() => {
  if (isRange.value) {
    if (Array.isArray(props.modelValue) && props.modelValue.length === 2) {
      return props.modelValue.map(v => formatTime(v)).join(` ${props.rangeSeparator} `)
    }
    return ''
  } else {
    return props.modelValue ? formatTime(props.modelValue) : ''
  }
})

function formatTime(val) {
  if (!val) return ''
  if (typeof val === 'string') return val
  if (Array.isArray(val)) return val.join(':')
  return val
}

const pickerValue = ref([0, 0, 0])
const startPickerValue = ref([0, 0, 0])
const endPickerValue = ref([0, 0, 0])

const selectedHour = computed(() => pickerValue.value[0])
const selectedMinute = computed(() => pickerValue.value[1])
const startSelectedHour = computed(() => startPickerValue.value[0])
const startSelectedMinute = computed(() => startPickerValue.value[1])
const endSelectedHour = computed(() => endPickerValue.value[0])
const endSelectedMinute = computed(() => endPickerValue.value[1])

watch(() => props.modelValue, (val) => {
  if (isRange.value) {
    if (Array.isArray(val) && val.length === 2) {
      startPickerValue.value = parseTime(val[0])
      endPickerValue.value = parseTime(val[1])
    }
  } else {
    pickerValue.value = parseTime(val)
  }
}, { immediate: true })

function parseTime(val) {
  if (!val) return [0, 0, 0]
  if (typeof val === 'string') {
    const arr = val.split(':').map(Number)
    return [arr[0] || 0, arr[1] || 0, arr[2] || 0]
  }
  if (Array.isArray(val)) return val
  return [0, 0, 0]
}

function handleOpen() {
  if (props.disabled) return
  visible.value = true
  emit('focus')
  emit('visible-change', true)
}
function handleMaskClick() {
  visible.value = false
  emit('blur')
  emit('visible-change', false)
}
function handleCancel() {
  visible.value = false
  emit('visible-change', false)
}
function handleClear() {
  emit('update:modelValue', isRange.value ? [] : '')
  emit('clear')
}
function handleConfirm() {
  if (isRange.value) {
    const start = joinTime(startPickerValue.value)
    const end = joinTime(endPickerValue.value)
    emit('update:modelValue', [start, end])
    emit('change', [start, end])
  } else {
    const val = joinTime(pickerValue.value)
    emit('update:modelValue', val)
    emit('change', val)
  }
  visible.value = false
  emit('visible-change', false)
}
function handlePickerChange(e) {
  pickerValue.value = e.detail.value
}
function handleStartPickerChange(e) {
  startPickerValue.value = e.detail.value
}
function handleEndPickerChange(e) {
  endPickerValue.value = e.detail.value
}
function joinTime(arr) {
  if (!props.showSeconds) return `${arr[0].toString().padStart(2, '0')}:${arr[1].toString().padStart(2, '0')}`
  return `${arr[0].toString().padStart(2, '0')}:${arr[1].toString().padStart(2, '0')}:${arr[2].toString().padStart(2, '0')}`
}

</script>

<style scoped>
.zx-time-picker {
  width: 100%;
  position: relative;
}

.zx-time-picker__input-wrapper {
  width: 100%;
}

.zx-time-picker__input {
  display: flex;
  align-items: center;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 8rpx 16rpx;
  background: #fff;
  min-height: 40rpx;
}

.zx-time-picker__input--focus {
  border-color: #409eff;
}

.zx-time-picker__input--readonly {
  background: #f5f7fa;
  color: #c0c4cc;
}

.zx-time-picker__text {
  color: #303133;
  font-size: 28rpx;
}

.zx-time-picker__placeholder {
  color: #c0c4cc;
  font-size: 28rpx;
}

.zx-time-picker__prefix-icon,
.zx-time-picker__suffix-icon,
.zx-time-picker__clear-icon {
  margin: 0 8rpx;
  font-size: 32rpx;
  color: #909399;
}

.zx-time-picker__clear-icon {
  color: #c0c4cc;
}

.zx-time-picker__mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.zx-time-picker__popup {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 1001;
  border-top-left-radius: 16rpx;
  border-top-right-radius: 16rpx;
  box-shadow: 0 -2rpx 16rpx rgba(0, 0, 0, 0.08);
  padding-bottom: env(safe-area-inset-bottom);
}

.zx-time-picker__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx 0 32rpx;
}

.zx-time-picker__toolbar__cancel,
.zx-time-picker__toolbar__confirm {
  color: #409eff;
  font-size: 28rpx;
}

.zx-time-picker__toolbar__title {
  font-size: 30rpx;
  color: #303133;
  font-weight: 500;
}

.zx-time-picker__main {
  padding: 24rpx 0 0 0;
}

.zx-time-picker__picker-view {
  height: 300rpx;
}

.zx-time-picker__item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60rpx;
  font-size: 28rpx;
  color: #606266;
}

.zx-time-picker__item.is-disabled {
  color: #c0c4cc;
}

.zx-time-picker__range {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 32rpx;
}

.zx-time-picker__range-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.zx-time-picker__range-title {
  font-size: 24rpx;
  color: #909399;
  margin-bottom: 8rpx;
}

.zx-time-picker__range-separator {
  font-size: 28rpx;
  color: #606266;
  margin: 0 16rpx;
  align-self: center;
}
</style>
