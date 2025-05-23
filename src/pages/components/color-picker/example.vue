<template>
  <div class="color-picker-example">
    <h1>ZX Color Picker 示例</h1>
    
    <!-- 基础用法 -->
    <section class="example-section">
      <h2>基础用法</h2>
      <div class="demo-block">
        <div class="demo-item">
          <span class="label">有默认值:</span>
          <zx-color-picker v-model="color1" />
          <span class="value">{{ color1 }}</span>
        </div>
        <div class="demo-item">
          <span class="label">无默认值:</span>
          <zx-color-picker v-model="color2" />
          <span class="value">{{ color2 || '未选择' }}</span>
        </div>
      </div>
    </section>
    
    <!-- 透明度选择 -->
    <section class="example-section">
      <h2>透明度选择</h2>
      <div class="demo-block">
        <div class="demo-item">
          <span class="label">支持透明度:</span>
          <zx-color-picker v-model="colorAlpha" show-alpha />
          <span class="value">{{ colorAlpha }}</span>
        </div>
      </div>
    </section>
    
    <!-- 预定义颜色 -->
    <section class="example-section">
      <h2>预定义颜色</h2>
      <div class="demo-block">
        <div class="demo-item">
          <span class="label">预定义颜色:</span>
          <zx-color-picker 
            v-model="colorPredefine" 
            show-alpha 
            :predefine="predefineColors" 
          />
          <span class="value">{{ colorPredefine }}</span>
        </div>
      </div>
    </section>
    
    <!-- 不同尺寸 -->
    <section class="example-section">
      <h2>不同尺寸</h2>
      <div class="demo-block">
        <div class="demo-item">
          <span class="label">大尺寸:</span>
          <zx-color-picker v-model="color1" size="large" />
        </div>
        <div class="demo-item">
          <span class="label">默认尺寸:</span>
          <zx-color-picker v-model="color1" />
        </div>
        <div class="demo-item">
          <span class="label">小尺寸:</span>
          <zx-color-picker v-model="color1" size="small" />
        </div>
      </div>
    </section>
    
    <!-- 不同颜色格式 -->
    <section class="example-section">
      <h2>不同颜色格式</h2>
      <div class="demo-block">
        <div class="demo-item">
          <span class="label">HEX 格式:</span>
          <zx-color-picker v-model="colorHex" color-format="hex" />
          <span class="value">{{ colorHex }}</span>
        </div>
        <div class="demo-item">
          <span class="label">RGB 格式:</span>
          <zx-color-picker v-model="colorRgb" color-format="rgb" />
          <span class="value">{{ colorRgb }}</span>
        </div>
        <div class="demo-item">
          <span class="label">HSL 格式:</span>
          <zx-color-picker v-model="colorHsl" color-format="hsl" />
          <span class="value">{{ colorHsl }}</span>
        </div>
        <div class="demo-item">
          <span class="label">HSV 格式:</span>
          <zx-color-picker v-model="colorHsv" color-format="hsv" />
          <span class="value">{{ colorHsv }}</span>
        </div>
      </div>
    </section>
    
    <!-- 禁用状态 -->
    <section class="example-section">
      <h2>禁用状态</h2>
      <div class="demo-block">
        <div class="demo-item">
          <span class="label">禁用状态:</span>
          <zx-color-picker v-model="color1" disabled />
        </div>
      </div>
    </section>
    
    <!-- 事件监听 -->
    <section class="example-section">
      <h2>事件监听</h2>
      <div class="demo-block">
        <div class="demo-item">
          <span class="label">事件示例:</span>
          <zx-color-picker 
            v-model="colorEvent" 
            show-alpha
            @change="handleChange"
            @active-change="handleActiveChange"
            @focus="handleFocus"
            @blur="handleBlur"
          />
        </div>
        <div class="event-log">
          <h3>事件日志:</h3>
          <div class="log-list">
            <div v-for="(log, index) in eventLogs" :key="index" class="log-item">
              {{ log }}
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 方法调用 -->
    <section class="example-section">
      <h2>方法调用</h2>
      <div class="demo-block">
        <div class="demo-item">
          <zx-color-picker 
            ref="colorPickerRef"
            v-model="colorMethod" 
          />
          <button @click="showPicker">显示选择器</button>
          <button @click="hidePicker">隐藏选择器</button>
          <button @click="focusPicker">聚焦</button>
          <button @click="blurPicker">失焦</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ZxColorPicker from './zx-color-picker.vue'

// 基础颜色值
const color1 = ref('#409EFF')
const color2 = ref('')
const colorAlpha = ref('rgba(19, 206, 102, 0.8)')
const colorPredefine = ref('rgba(255, 69, 0, 0.68)')

// 不同格式的颜色
const colorHex = ref('#ff4500')
const colorRgb = ref('rgb(255, 120, 0)')
const colorHsl = ref('hsl(181, 100%, 37%)')
const colorHsv = ref('hsv(51, 100, 98)')

// 事件相关
const colorEvent = ref('#409EFF')
const eventLogs = ref([])

// 方法调用相关
const colorMethod = ref('#409EFF')
const colorPickerRef = ref()

// 预定义颜色
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

// 事件处理函数
const addLog = (message) => {
  const timestamp = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`[${timestamp}] ${message}`)
  if (eventLogs.value.length > 10) {
    eventLogs.value = eventLogs.value.slice(0, 10)
  }
}

const handleChange = (value) => {
  addLog(`change 事件: ${value}`)
}

const handleActiveChange = (value) => {
  addLog(`active-change 事件: ${value}`)
}

const handleFocus = (event) => {
  addLog('focus 事件触发')
}

const handleBlur = (event) => {
  addLog('blur 事件触发')
}

// 方法调用
const showPicker = () => {
  colorPickerRef.value?.show()
}

const hidePicker = () => {
  colorPickerRef.value?.hide()
}

const focusPicker = () => {
  colorPickerRef.value?.focus()
}

const blurPicker = () => {
  colorPickerRef.value?.blur()
}
</script>

<style lang="scss" scoped>
.color-picker-example {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 40px;
}

.example-section {
  margin-bottom: 40px;
  
  h2 {
    color: #409eff;
    border-bottom: 2px solid #409eff;
    padding-bottom: 8px;
    margin-bottom: 20px;
  }
}

.demo-block {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
}

.demo-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .label {
    min-width: 120px;
    font-weight: 500;
    color: #666;
  }
  
  .value {
    margin-left: 16px;
    padding: 4px 8px;
    background: #e9ecef;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: #495057;
  }
  
  button {
    margin-left: 8px;
    padding: 6px 12px;
    background: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    transition: background-color 0.3s;
    
    &:hover {
      background: #66b1ff;
    }
    
    &:first-of-type {
      margin-left: 16px;
    }
  }
}

.event-log {
  margin-top: 20px;
  
  h3 {
    margin-bottom: 12px;
    color: #333;
    font-size: 16px;
  }
}

.log-list {
  max-height: 200px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
}

.log-item {
  padding: 4px 0;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #666;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
}
</style> 