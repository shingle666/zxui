<template>
  <div class="zx-color-picker" :class="colorPickerClass">
    <div
      class="zx-color-picker__trigger"
      :class="{ 'is-disabled': disabled }"
      @click="handleTriggerClick"
      :tabindex="disabled ? -1 : tabindex"
      @keydown.enter="handleTriggerClick"
      @focus="handleFocus"
      @blur="handleBlur"
      :aria-label="ariaLabel"
      :id="id"
    >
      <div class="zx-color-picker__color" v-if="modelValue">
        <div
          class="zx-color-picker__color-inner"
          :style="{ backgroundColor: displayedColor }"
        ></div>
      </div>
      <div class="zx-color-picker__empty" v-else>
        <svg class="zx-color-picker__icon" viewBox="0 0 1024 1024">
          <path d="M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.296 244.192 42.816 351.904C186.432 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.296-244.192-42.816-351.904zM384 672l-128-128 128-128 45.248 45.248L364.512 512l64.736 50.752L384 672z m256 0l-45.248-109.248L659.488 512l-64.736-50.752L640 352l128 128-128 192z"></path>
        </svg>
      </div>
      <div class="zx-color-picker__icon">
        <svg viewBox="0 0 1024 1024">
          <path d="M831.872 340.864L512 652.672 192.128 340.864a30.592 30.592 0 000 42.752L481.664 771.136a42.496 42.496 0 0060.672 0L831.872 383.616a30.592 30.592 0 000-42.752z"></path>
        </svg>
      </div>
    </div>
    
    <!-- 弹出框 -->
    <teleport to="body" v-if="teleported">
      <transition name="zx-color-picker-fade">
        <div
          v-if="showPanel"
          class="zx-color-picker__panel"
          :class="popperClass"
          :style="panelStyle"
          @click.stop
        >
          <div class="zx-color-picker__panel-inner">
            <!-- 颜色选择区域 -->
            <div class="zx-color-picker__saturation-panel">
              <div
                class="zx-color-picker__saturation"
                :style="{ backgroundColor: hueColor }"
                @mousedown="handleSaturationMouseDown"
                ref="saturationRef"
              >
                <div class="zx-color-picker__white"></div>
                <div class="zx-color-picker__black"></div>
                <div
                  class="zx-color-picker__cursor"
                  :style="saturationCursorStyle"
                >
                  <div></div>
                </div>
              </div>
            </div>
            
            <!-- 色相滑块 -->
            <div class="zx-color-picker__controls">
              <div
                class="zx-color-picker__hue-slider"
                @mousedown="handleHueMouseDown"
                ref="hueRef"
              >
                <div
                  class="zx-color-picker__hue-cursor"
                  :style="hueCursorStyle"
                ></div>
              </div>
              
              <!-- 透明度滑块 -->
              <div
                v-if="showAlpha"
                class="zx-color-picker__alpha-slider"
                @mousedown="handleAlphaMouseDown"
                ref="alphaRef"
              >
                <div class="zx-color-picker__alpha-bar" :style="alphaBarStyle">
                  <div
                    class="zx-color-picker__alpha-cursor"
                    :style="alphaCursorStyle"
                  ></div>
                </div>
              </div>
            </div>
            
            <!-- 预定义颜色 -->
            <div v-if="predefine && predefine.length" class="zx-color-picker__predefine">
              <div class="zx-color-picker__predefine-color-list">
                <div
                  v-for="(color, index) in predefine"
                  :key="index"
                  class="zx-color-picker__predefine-color"
                  @click="handlePredefineClick(color)"
                >
                  <div
                    class="zx-color-picker__predefine-color-inner"
                    :style="{ backgroundColor: color }"
                  ></div>
                </div>
              </div>
            </div>
            
            <!-- 输入框区域 -->
            <div class="zx-color-picker__input">
              <input
                v-model="inputValue"
                @blur="handleInputBlur"
                @keyup.enter="handleInputEnter"
                class="zx-color-picker__input-inner"
              />
            </div>
            
            <!-- 按钮区域 -->
            <div class="zx-color-picker__btns">
              <button
                class="zx-color-picker__btn zx-color-picker__btn--clear"
                @click="handleClear"
              >
                清空
              </button>
              <button
                class="zx-color-picker__btn zx-color-picker__btn--confirm"
                @click="handleConfirm"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
    
    <!-- 非传送模式下的弹出框 -->
    <transition name="zx-color-picker-fade" v-else>
      <div
        v-if="showPanel"
        class="zx-color-picker__panel"
        :class="popperClass"
        @click.stop
      >
        <!-- 与上面相同的内容 -->
        <div class="zx-color-picker__panel-inner">
          <!-- 颜色选择区域 -->
          <div class="zx-color-picker__saturation-panel">
            <div
              class="zx-color-picker__saturation"
              :style="{ backgroundColor: hueColor }"
              @mousedown="handleSaturationMouseDown"
              ref="saturationRef"
            >
              <div class="zx-color-picker__white"></div>
              <div class="zx-color-picker__black"></div>
              <div
                class="zx-color-picker__cursor"
                :style="saturationCursorStyle"
              >
                <div></div>
              </div>
            </div>
          </div>
          
          <!-- 色相滑块 -->
          <div class="zx-color-picker__controls">
            <div
              class="zx-color-picker__hue-slider"
              @mousedown="handleHueMouseDown"
              ref="hueRef"
            >
              <div
                class="zx-color-picker__hue-cursor"
                :style="hueCursorStyle"
              ></div>
            </div>
            
            <!-- 透明度滑块 -->
            <div
              v-if="showAlpha"
              class="zx-color-picker__alpha-slider"
              @mousedown="handleAlphaMouseDown"
              ref="alphaRef"
            >
              <div class="zx-color-picker__alpha-bar" :style="alphaBarStyle">
                <div
                  class="zx-color-picker__alpha-cursor"
                  :style="alphaCursorStyle"
                ></div>
              </div>
            </div>
          </div>
          
          <!-- 预定义颜色 -->
          <div v-if="predefine && predefine.length" class="zx-color-picker__predefine">
            <div class="zx-color-picker__predefine-color-list">
              <div
                v-for="(color, index) in predefine"
                :key="index"
                class="zx-color-picker__predefine-color"
                @click="handlePredefineClick(color)"
              >
                <div
                  class="zx-color-picker__predefine-color-inner"
                  :style="{ backgroundColor: color }"
                ></div>
              </div>
            </div>
          </div>
          
          <!-- 输入框区域 -->
          <div class="zx-color-picker__input">
            <input
              v-model="inputValue"
              @blur="handleInputBlur"
              @keyup.enter="handleInputEnter"
              class="zx-color-picker__input-inner"
            />
          </div>
          
          <!-- 按钮区域 -->
          <div class="zx-color-picker__btns">
            <button
              class="zx-color-picker__btn zx-color-picker__btn--clear"
              @click="handleClear"
            >
              清空
            </button>
            <button
              class="zx-color-picker__btn zx-color-picker__btn--confirm"
              @click="handleConfirm"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps(), {
  disabled: false,
  size: 'default',
  showAlpha: false,
  validateEvent: true,
  tabindex: 0,
  teleported: true
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

// DOM 引用
const saturationRef = ref()
const hueRef = ref()
const alphaRef = ref()

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
      const [r, g, b, a = 1] = values.map(v => v / 255)
      
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

const handleSaturationMouseDown = (event) => {
  if (props.disabled) return
  
  const rect = saturationRef.value.getBoundingClientRect()
  const handleMouseMove = (e) => {
    const saturation = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const value = Math.max(0, Math.min(100, 100 - ((e.clientY - rect.top) / rect.height) * 100))
    
    currentColor.value = { ...currentColor.value, saturation, value }
    updateActiveColor()
  }
  
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  handleMouseMove(event)
}

const handleHueMouseDown = (event) => {
  if (props.disabled) return
  
  const rect = hueRef.value.getBoundingClientRect()
  const handleMouseMove = (e) => {
    const hue = Math.max(0, Math.min(360, ((e.clientX - rect.left) / rect.width) * 360))
    currentColor.value = { ...currentColor.value, hue }
    updateActiveColor()
  }
  
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  handleMouseMove(event)
}

const handleAlphaMouseDown = (event) => {
  if (props.disabled || !props.showAlpha) return
  
  const rect = alphaRef.value.getBoundingClientRect()
  const handleMouseMove = (e) => {
    const alpha = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    currentColor.value = { ...currentColor.value, alpha }
    updateActiveColor()
  }
  
  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
  handleMouseMove(event)
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
  if (showPanel.value && !event.target?.closest('.zx-color-picker')) {
    showPanel.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

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
      width: 44px;
      height: 44px;
    }
  }
  
  &--small {
    .zx-color-picker__trigger {
      width: 24px;
      height: 24px;
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
  width: 32px;
  height: 32px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s;
  
  &:hover {
    border-color: #409eff;
  }
  
  &:focus {
    outline: none;
    border-color: #409eff;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
  }
}

.zx-color-picker__color {
  width: 20px;
  height: 20px;
  border-radius: 2px;
  position: relative;
}

.zx-color-picker__color-inner {
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), 
                   linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                   linear-gradient(45deg, transparent 75%, #ccc 75%), 
                   linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
}

.zx-color-picker__empty {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zx-color-picker__icon {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  fill: #a8abb2;
}

.zx-color-picker__panel {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 2000;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-top: 8px;
  width: 280px;
}

.zx-color-picker__panel-inner {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.zx-color-picker__saturation-panel {
  width: 100%;
  height: 180px;
}

.zx-color-picker__saturation {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  cursor: crosshair;
}

.zx-color-picker__white {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, #fff, transparent);
  border-radius: 4px;
}

.zx-color-picker__black {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent, #000);
  border-radius: 4px;
}

.zx-color-picker__cursor {
  position: absolute;
  width: 8px;
  height: 8px;
  margin: -4px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  
  > div {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

.zx-color-picker__controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.zx-color-picker__hue-slider {
  position: relative;
  width: 100%;
  height: 12px;
  background: linear-gradient(to right, 
    #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, 
    #00f 67%, #f0f 83%, #f00 100%);
  border-radius: 6px;
  cursor: pointer;
}

.zx-color-picker__hue-cursor {
  position: absolute;
  top: -2px;
  width: 16px;
  height: 16px;
  margin-left: -8px;
  background: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.zx-color-picker__alpha-slider {
  position: relative;
  width: 100%;
  height: 12px;
  border-radius: 6px;
  cursor: pointer;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), 
                   linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                   linear-gradient(45deg, transparent 75%, #ccc 75%), 
                   linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
}

.zx-color-picker__alpha-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.zx-color-picker__alpha-cursor {
  position: absolute;
  top: -2px;
  width: 16px;
  height: 16px;
  margin-left: -8px;
  background: #fff;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.zx-color-picker__predefine {
  width: 100%;
}

.zx-color-picker__predefine-color-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.zx-color-picker__predefine-color {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #e4e7ed;
  transition: transform 0.2s;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), 
                   linear-gradient(-45deg, #ccc 25%, transparent 25%), 
                   linear-gradient(45deg, transparent 75%, #ccc 75%), 
                   linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
  
  &:hover {
    transform: scale(1.1);
  }
}

.zx-color-picker__predefine-color-inner {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.zx-color-picker__input {
  width: 100%;
}

.zx-color-picker__input-inner {
  width: 100%;
  height: 32px;
  padding: 0 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #409eff;
  }
}

.zx-color-picker__btns {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.zx-color-picker__btn {
  padding: 6px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;
  
  &:hover {
    border-color: #409eff;
    color: #409eff;
  }
  
  &--confirm {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
    
    &:hover {
      background: #66b1ff;
      border-color: #66b1ff;
    }
  }
}

// 过渡动画
.zx-color-picker-fade-enter-active,
.zx-color-picker-fade-leave-active {
  transition: opacity 0.3s ease;
}

.zx-color-picker-fade-enter-from,
.zx-color-picker-fade-leave-to {
  opacity: 0;
}
</style>
