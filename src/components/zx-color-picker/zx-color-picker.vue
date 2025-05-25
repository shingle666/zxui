<template>
  <view class="zx-color-picker" :class="colorPickerClass">
    <view
      class="zx-color-picker__trigger"
      :class="{ 'is-disabled': disabled }"
      @tap="handleTriggerClick"
      :tabindex="disabled ? -1 : tabindex"
      @keydown.enter="handleTriggerClick"
      @focus="handleFocus"
      @blur="handleBlur"
      :aria-label="ariaLabel"
      :id="id"
    >
      <view class="zx-color-picker__color" v-if="modelValue">
        <view
          class="zx-color-picker__color-inner"
          :style="{ backgroundColor: displayedColor }"
        ></view>
      </view>
      <view class="zx-color-picker__empty" v-else>
        <svg class="zx-color-picker__icon" viewBox="0 0 1024 1024">
          <path d="M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.296 244.192 42.816 351.904C186.432 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.296-244.192-42.816-351.904zM384 672l-128-128 128-128 45.248 45.248L364.512 512l64.736 50.752L384 672z m256 0l-45.248-109.248L659.488 512l-64.736-50.752L640 352l128 128-128 192z"></path>
        </svg>
      </view>
      <view class="zx-color-picker__icon">
        <svg viewBox="0 0 1024 1024">
          <path d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 000 42.752L481.664 771.136a42.496 42.496 0 0060.672 0L831.872 383.616a30.592 30.592 0 000-42.752z"></path>
        </svg>
      </view>
    </view>
    
    <!-- 弹出框 -->
    <view v-if="showPanel" class="zx-color-picker__panel-container" @tap="handleClickOutside">
      <view
        class="zx-color-picker__panel"
        :class="popperClass"
        :style="panelStyle"
        @tap.stop
      >
        <view class="zx-color-picker__panel-inner">
          <!-- 颜色选择区域 -->
          <view class="zx-color-picker__saturation-panel">
            <view
              class="zx-color-picker__saturation"
              :style="{ backgroundColor: hueColor }"
              @touchstart.stop.prevent="handleSaturationTouch"
              @touchmove.stop.prevent="handleSaturationTouch"
            >
              <view class="zx-color-picker__white"></view>
              <view class="zx-color-picker__black"></view>
              <view
                class="zx-color-picker__cursor"
                :style="saturationCursorStyle"
              >
                <view></view>
              </view>
            </view>
          </view>
          
          <!-- 色相滑块 -->
          <view class="zx-color-picker__controls">
            <view
              class="zx-color-picker__hue-slider"
              @touchstart.stop.prevent="handleHueTouch"
              @touchmove.stop.prevent="handleHueTouch"
            >
              <view
                class="zx-color-picker__hue-cursor"
                :style="hueCursorStyle"
              ></view>
            </view>
            
            <!-- 透明度滑块 -->
            <view
              v-if="showAlpha"
              class="zx-color-picker__alpha-slider"
              @touchstart.stop.prevent="handleAlphaTouch"
              @touchmove.stop.prevent="handleAlphaTouch"
            >
              <view class="zx-color-picker__alpha-bar" :style="alphaBarStyle">
                <view
                  class="zx-color-picker__alpha-cursor"
                  :style="alphaCursorStyle"
                ></view>
              </view>
            </view>
          </view>
          
          <!-- 预定义颜色 -->
          <view v-if="predefine && predefine.length" class="zx-color-picker__predefine">
            <view class="zx-color-picker__predefine-color-list">
              <view
                v-for="(color, index) in predefine"
                :key="index"
                class="zx-color-picker__predefine-color"
                @tap="handlePredefineClick(color)"
              >
                <view
                  class="zx-color-picker__predefine-color-inner"
                  :style="{ backgroundColor: color }"
                ></view>
              </view>
            </view>
          </view>
          
          <!-- 输入框区域 -->
          <view class="zx-color-picker__input">
            <input
              v-model="inputValue"
              @blur="handleInputBlur"
              @confirm="handleInputEnter"
              class="zx-color-picker__input-inner"
              type="text"
            />
          </view>
          
          <!-- 按钮区域 -->
          <view class="zx-color-picker__btns">
            <button
              class="zx-color-picker__btn zx-color-picker__btn--clear"
              @tap="handleClear"
            >
              清空
            </button>
            <button
              class="zx-color-picker__btn zx-color-picker__btn--confirm"
              @tap="handleConfirm"
            >
              确定
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: String,
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'default'
  },
  showAlpha: {
    type: Boolean,
    default: false
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  tabindex: {
    type: Number,
    default: 0
  },
  colorFormat: {
    type: String,
    default: ''
  },
  predefine: {
    type: Array,
    default: () => []
  },
  popperClass: String,
  ariaLabel: String,
  id: String
})

// Emits 定义
const emit = defineEmits([
  'update:modelValue',
  'change',
  'active-change',
  'focus',
  'blur'
])

// 响应式数据
const showPanel = ref(false)
const currentColor = ref({ hue: 0, saturation: 0, value: 0, alpha: 1 })
const inputValue = ref('')
const panelStyle = ref({})

// 计算属性
const colorPickerClass = computed(() => {
  return [
    `zx-color-picker--${props.size}`,
    {
      'is-disabled': props.disabled
    }
  ]
})

const displayedColor = computed(() => {
  if (!props.modelValue) return 'transparent'
  
  const { hue, saturation, value, alpha } = currentColor.value
  if (props.showAlpha) {
    return `hsla(${hue}, ${saturation}%, ${value}%, ${alpha})`
  }
  return `hsl(${hue}, ${saturation}%, ${value}%)`
})

const hueColor = computed(() => {
  return `hsl(${currentColor.value.hue}, 100%, 50%)`
})

const saturationCursorStyle = computed(() => {
  const { saturation, value } = currentColor.value
  return {
    left: `${saturation}%`,
    top: `${100 - value}%`
  }
})

const hueCursorStyle = computed(() => {
  return {
    left: `${(currentColor.value.hue / 360) * 100}%`
  }
})

const alphaCursorStyle = computed(() => {
  return {
    left: `${currentColor.value.alpha * 100}%`
  }
})

const alphaBarStyle = computed(() => {
  const { hue, saturation, value } = currentColor.value
  return {
    background: `linear-gradient(to right, transparent 0%, hsl(${hue}, ${saturation}%, ${value}%) 100%)`
  }
})

// 工具函数
const parseColor = (color) => {
  // 简化的颜色解析，实际项目中可能需要更完善的颜色解析库
  if (!color) return { hue: 0, saturation: 0, value: 0, alpha: 1 }
  
  // RGB 转 HSV
  if (color.startsWith('rgb')) {
    const match = color.match(/rgba?\(([^)]+)\)/)
    if (match) {
      const values = match[1].split(',').map(v => parseFloat(v.trim()))
      const [r, g, b, a = 1] = values.map((v, i) => i < 3 ? v / 255 : v)
      
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      const diff = max - min
      
      let hue = 0
      if (diff !== 0) {
        if (max === r) hue = ((g - b) / diff) % 6
        else if (max === g) hue = (b - r) / diff + 2
        else hue = (r - g) / diff + 4
      }
      hue = Math.round(hue * 60)
      if (hue < 0) hue += 360
      
      const saturation = max === 0 ? 0 : Math.round((diff / max) * 100)
      const value = Math.round(max * 100)
      
      return { hue, saturation, value, alpha: a }
    }
  }
  
  // HEX 转换
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    const r = parseInt(hex.slice(0, 2), 16) / 255
    const g = parseInt(hex.slice(2, 4), 16) / 255
    const b = parseInt(hex.slice(4, 6), 16) / 255
    const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1
    
    // 转换为 HSV (简化版本)
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const diff = max - min
    
    let hue = 0
    if (diff !== 0) {
      if (max === r) hue = ((g - b) / diff) % 6
      else if (max === g) hue = (b - r) / diff + 2
      else hue = (r - g) / diff + 4
    }
    hue = Math.round(hue * 60)
    if (hue < 0) hue += 360
    
    const saturation = max === 0 ? 0 : Math.round((diff / max) * 100)
    const value = Math.round(max * 100)
    
    return { hue, saturation, value, alpha: a }
  }
  
  return { hue: 0, saturation: 0, value: 0, alpha: 1 }
}

const formatColor = (colorObj) => {
  const { hue, saturation, value, alpha } = colorObj
  
  // HSV 转 RGB
  const c = (value / 100) * (saturation / 100)
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = (value / 100) - c
  
  let r = 0, g = 0, b = 0
  
  if (hue >= 0 && hue < 60) {
    r = c; g = x; b = 0
  } else if (hue >= 60 && hue < 120) {
    r = x; g = c; b = 0
  } else if (hue >= 120 && hue < 180) {
    r = 0; g = c; b = x
  } else if (hue >= 180 && hue < 240) {
    r = 0; g = x; b = c
  } else if (hue >= 240 && hue < 300) {
    r = x; g = 0; b = c
  } else if (hue >= 300 && hue < 360) {
    r = c; g = 0; b = x
  }
  
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)
  
  if (props.colorFormat === 'hex') {
    const hex = [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
    return props.showAlpha && alpha < 1 
      ? `#${hex}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`
      : `#${hex}`
  }
  
  if (props.colorFormat === 'hsl') {
    return props.showAlpha && alpha < 1
      ? `hsla(${hue}, ${saturation}%, ${Math.round(value * saturation / 100)}%, ${alpha})`
      : `hsl(${hue}, ${saturation}%, ${Math.round(value * saturation / 100)}%)`
  }
  
  if (props.colorFormat === 'hsv') {
    return props.showAlpha && alpha < 1
      ? `hsva(${hue}, ${saturation}%, ${value}%, ${alpha})`
      : `hsv(${hue}, ${saturation}%, ${value}%)`
  }
  
  // 默认 RGB
  return props.showAlpha && alpha < 1
    ? `rgba(${r}, ${g}, ${b}, ${alpha})`
    : `rgb(${r}, ${g}, ${b})`
}

// 事件处理
const handleTriggerClick = () => {
  if (props.disabled) return
  showPanel.value = !showPanel.value
}

const handleFocus = (event) => {
  emit('focus', event)
}

const handleBlur = (event) => {
  emit('blur', event)
}

// 纯计算的触摸事件处理 - 不使用DOM
const handleSaturationTouch = (event) => {
  if (props.disabled) return
  
  // 确保event对象有效
  if (!event || !event.touches || !event.touches[0]) return
  
  const touch = event.touches[0]
  const touchTarget = event.currentTarget || event.target
  
  // 计算相对位置（0-1范围）
  // 由于不同平台差异，我们直接使用事件对象中的相对定位属性
  // 如果没有，则使用估算值
  let saturationPercent = 0
  let valuePercent = 0
  
  if (touch.offsetX !== undefined && touchTarget.offsetWidth) {
    saturationPercent = touch.offsetX / touchTarget.offsetWidth
    valuePercent = 1 - (touch.offsetY / touchTarget.offsetHeight)
  } else if (touch.pageX !== undefined && touchTarget.clientWidth) {
    // 基于事件对象的属性计算相对位置
    // 这里我们使用简单的比例计算，没有使用getBoundingClientRect
    const boxWidth = touchTarget.clientWidth || 100
    const boxHeight = touchTarget.clientHeight || 100
    saturationPercent = Math.min(Math.max(0, touch.pageX / boxWidth), 1)
    valuePercent = Math.min(Math.max(0, 1 - (touch.pageY / boxHeight)), 1)
  } else {
    // 最简单的情况，直接用触摸点在屏幕上的位置除以100作为百分比
    // 这个方法不够精确，但确保在任何平台都能工作
    saturationPercent = Math.min(Math.max(0, touch.clientX / 300), 1)
    valuePercent = Math.min(Math.max(0, 1 - (touch.clientY / 300)), 1)
  }
  
  // 限制在0-1范围内并转换为百分比
  saturationPercent = Math.max(0, Math.min(1, saturationPercent))
  valuePercent = Math.max(0, Math.min(1, valuePercent))
  
  // 更新颜色
  currentColor.value = { 
    ...currentColor.value, 
    saturation: Math.round(saturationPercent * 100),
    value: Math.round(valuePercent * 100)
  }
  
  updateActiveColor()
}

const handleHueTouch = (event) => {
  if (props.disabled) return
  
  if (!event || !event.touches || !event.touches[0]) return
  
  const touch = event.touches[0]
  const touchTarget = event.currentTarget || event.target
  
  // 计算相对位置（0-1范围）
  let huePercent = 0
  
  if (touch.offsetX !== undefined && touchTarget.offsetWidth) {
    huePercent = touch.offsetX / touchTarget.offsetWidth
  } else if (touch.pageX !== undefined && touchTarget.clientWidth) {
    const boxWidth = touchTarget.clientWidth || 100
    huePercent = Math.min(Math.max(0, touch.pageX / boxWidth), 1)
  } else {
    huePercent = Math.min(Math.max(0, touch.clientX / 300), 1)
  }
  
  // 限制在0-1范围内并转换为色相值(0-360)
  huePercent = Math.max(0, Math.min(1, huePercent))
  
  // 更新颜色
  currentColor.value = { 
    ...currentColor.value, 
    hue: Math.round(huePercent * 360)
  }
  
  updateActiveColor()
}

const handleAlphaTouch = (event) => {
  if (props.disabled || !props.showAlpha) return
  
  if (!event || !event.touches || !event.touches[0]) return
  
  const touch = event.touches[0]
  const touchTarget = event.currentTarget || event.target
  
  // 计算相对位置（0-1范围）
  let alphaPercent = 0
  
  if (touch.offsetX !== undefined && touchTarget.offsetWidth) {
    alphaPercent = touch.offsetX / touchTarget.offsetWidth
  } else if (touch.pageX !== undefined && touchTarget.clientWidth) {
    const boxWidth = touchTarget.clientWidth || 100
    alphaPercent = Math.min(Math.max(0, touch.pageX / boxWidth), 1)
  } else {
    alphaPercent = Math.min(Math.max(0, touch.clientX / 300), 1)
  }
  
  // 限制在0-1范围内
  alphaPercent = Math.max(0, Math.min(1, alphaPercent))
  
  // 更新颜色
  currentColor.value = { 
    ...currentColor.value, 
    alpha: alphaPercent
  }
  
  updateActiveColor()
}

const handlePredefineClick = (color) => {
  currentColor.value = parseColor(color)
  updateValue()
  showPanel.value = false
}

const handleInputBlur = () => {
  if (inputValue.value) {
    try {
      currentColor.value = parseColor(inputValue.value)
      updateActiveColor()
    } catch (error) {
      // 恢复原值
      inputValue.value = formatColor(currentColor.value)
    }
  }
}

const handleInputEnter = () => {
  handleInputBlur()
  handleConfirm()
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('change', '')
  showPanel.value = false
}

const handleConfirm = () => {
  updateValue()
  showPanel.value = false
}

const updateActiveColor = () => {
  const colorString = formatColor(currentColor.value)
  inputValue.value = colorString
  emit('active-change', colorString)
}

const updateValue = () => {
  const colorString = formatColor(currentColor.value)
  emit('update:modelValue', colorString)
  emit('change', colorString)
}

// 暴露的方法
const show = () => {
  if (!props.disabled) {
    showPanel.value = true
  }
}

const hide = () => {
  showPanel.value = false
}

const focus = () => {
  // 聚焦触发器
}

const blur = () => {
  showPanel.value = false
}

// 监听器
watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    currentColor.value = parseColor(newVal)
    inputValue.value = newVal
  } else {
    currentColor.value = { hue: 0, saturation: 0, value: 0, alpha: 1 }
    inputValue.value = ''
  }
}, { immediate: true })

// 点击外部关闭面板
const handleClickOutside = (event) => {
  if (showPanel.value) {
    showPanel.value = false
  }
}

// 暴露方法和属性
defineExpose({
  color: currentColor,
  show,
  hide,
  focus,
  blur
})
</script>

<style lang="scss" scoped>
.zx-color-picker {
  position: relative;
  display: inline-block;
  
  &--large {
    .zx-color-picker__trigger {
      width: 88rpx;
      height: 88rpx;
    }
  }
  
  &--small {
    .zx-color-picker__trigger {
      width: 48rpx;
      height: 48rpx;
    }
  }
  
  &.is-disabled {
    .zx-color-picker__trigger {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}

.zx-color-picker__trigger {
  position: relative;
  width: 64rpx;
  height: 64rpx;
  border: 1rpx solid #dcdfe6;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s;
  
  &:active {
    border-color: #409eff;
  }
}

.zx-color-picker__color {
  width: 40rpx;
  height: 40rpx;
  border-radius: 4rpx;
  position: relative;
}

.zx-color-picker__color-inner {
  width: 100%;
  height: 100%;
  border-radius: 4rpx;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), 
                   linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                   linear-gradient(45deg, transparent 75%, #ccc 75%), 
                   linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 16rpx 16rpx;
  background-position: 0 0, 0 8rpx, 8rpx -8rpx, -8rpx 0px;
}

.zx-color-picker__empty {
  width: 40rpx;
  height: 40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zx-color-picker__icon {
  position: absolute;
  right: 8rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 24rpx;
  height: 24rpx;
  fill: #a8abb2;
}

.zx-color-picker__panel-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.zx-color-picker__panel {
  background: #fff;
  border: 1rpx solid #e4e7ed;
  border-radius: 8rpx;
  box-shadow: 0 4rpx 24rpx 0 rgba(0, 0, 0, 0.1);
  padding: 32rpx;
  width: 560rpx;
  max-width: 90%;
}

.zx-color-picker__panel-inner {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.zx-color-picker__saturation-panel {
  width: 100%;
  height: 360rpx;
}

.zx-color-picker__saturation {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 8rpx;
}

.zx-color-picker__white {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, #fff, transparent);
  border-radius: 8rpx;
}

.zx-color-picker__black {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, #000);
  border-radius: 8rpx;
}

.zx-color-picker__cursor {
  position: absolute;
  width: 16rpx;
  height: 16rpx;
  margin: -8rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
  box-shadow: 0 0 0 2rpx rgba(0, 0, 0, 0.3);
  
  > view {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

.zx-color-picker__controls {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.zx-color-picker__hue-slider {
  position: relative;
  width: 100%;
  height: 24rpx;
  background: linear-gradient(to right, 
    #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, 
    #00f 67%, #f0f 83%, #f00 100%);
  border-radius: 12rpx;
}

.zx-color-picker__hue-cursor {
  position: absolute;
  top: -4rpx;
  width: 32rpx;
  height: 32rpx;
  margin-left: -16rpx;
  background: #fff;
  border: 4rpx solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 2rpx rgba(0, 0, 0, 0.3);
}

.zx-color-picker__alpha-slider {
  position: relative;
  width: 100%;
  height: 24rpx;
  border-radius: 12rpx;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), 
                   linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                   linear-gradient(45deg, transparent 75%, #ccc 75%), 
                   linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 16rpx 16rpx;
  background-position: 0 0, 0 8rpx, 8rpx -8rpx, -8rpx 0px;
}

.zx-color-picker__alpha-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12rpx;
}

.zx-color-picker__alpha-cursor {
  position: absolute;
  top: -4rpx;
  width: 32rpx;
  height: 32rpx;
  margin-left: -16rpx;
  background: #fff;
  border: 4rpx solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 2rpx rgba(0, 0, 0, 0.3);
}

.zx-color-picker__predefine {
  width: 100%;
}

.zx-color-picker__predefine-color-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.zx-color-picker__predefine-color {
  width: 48rpx;
  height: 48rpx;
  border-radius: 8rpx;
  border: 1rpx solid #e4e7ed;
  transition: transform 0.2s;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), 
                   linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                   linear-gradient(45deg, transparent 75%, #ccc 75%), 
                   linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 16rpx 16rpx;
  background-position: 0 0, 0 8rpx, 8rpx -8rpx, -8rpx 0px;
  
  &:active {
    transform: scale(1.1);
  }
}

.zx-color-picker__predefine-color-inner {
  width: 100%;
  height: 100%;
  border-radius: 8rpx;
}

.zx-color-picker__input {
  width: 100%;
}

.zx-color-picker__input-inner {
  width: 100%;
  height: 64rpx;
  padding: 0 16rpx;
  border: 1rpx solid #dcdfe6;
  border-radius: 8rpx;
  font-size: 28rpx;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.zx-color-picker__btns {
  display: flex;
  justify-content: flex-end;
  gap: 16rpx;
}

.zx-color-picker__btn {
  padding: 12rpx 24rpx;
  border: 1rpx solid #dcdfe6;
  border-radius: 8rpx;
  background: #fff;
  font-size: 24rpx;
  transition: all 0.3s;
  
  &:active {
    border-color: #409eff;
    color: #409eff;
  }
  
  &--confirm {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
    
    &:active {
      background: #66b1ff;
      border-color: #66b1ff;
    }
  }
}
</style>
