<template>
  <view class="color-picker-example">
    <view class="header">
      <text class="title">ZX Color Picker 颜色选择器</text>
    </view>
    
    <!-- 基础用法 -->
    <view class="example-section">
      <view class="section-title">基础用法</view>
      <view class="demo-block">
        <view class="demo-item">
          <text class="label">有默认值:</text>
          <zx-color-picker v-model="color1" />
          <text class="value">{{ color1 }}</text>
        </view>
        <view class="demo-item">
          <text class="label">无默认值:</text>
          <zx-color-picker v-model="color2" />
          <text class="value">{{ color2 || '未选择' }}</text>
        </view>
      </view>
      <view class="description">
        <text>基础用法只需传入 v-model 即可，支持默认值或空值</text>
      </view>
    </view>
    
    <!-- 透明度选择 -->
    <view class="example-section">
      <view class="section-title">透明度选择</view>
      <view class="demo-block">
        <view class="demo-item">
          <text class="label">支持透明度:</text>
          <zx-color-picker v-model="colorAlpha" show-alpha />
          <text class="value">{{ colorAlpha }}</text>
        </view>
      </view>
      <view class="description">
        <text>添加 show-alpha 属性可以支持选择透明度</text>
      </view>
    </view>
    
    <!-- 预定义颜色 -->
    <view class="example-section">
      <view class="section-title">预定义颜色</view>
      <view class="demo-block">
        <view class="demo-item">
          <text class="label">预定义颜色:</text>
          <zx-color-picker 
            v-model="colorPredefine" 
            show-alpha 
            :predefine="predefineColors" 
          />
          <text class="value">{{ colorPredefine }}</text>
        </view>
      </view>
      <view class="description">
        <text>通过 predefine 属性可以预定义常用的颜色，方便用户直接选择</text>
      </view>
    </view>
    
    <!-- 不同尺寸 -->
    <view class="example-section">
      <view class="section-title">不同尺寸</view>
      <view class="demo-block">
        <view class="demo-item">
          <text class="label">大尺寸:</text>
          <zx-color-picker v-model="color1" size="large" />
        </view>
        <view class="demo-item">
          <text class="label">默认尺寸:</text>
          <zx-color-picker v-model="color1" />
        </view>
        <view class="demo-item">
          <text class="label">小尺寸:</text>
          <zx-color-picker v-model="color1" size="small" />
        </view>
      </view>
      <view class="description">
        <text>通过 size 属性设置组件尺寸，可选值有 large、default、small</text>
      </view>
    </view>
    
    <!-- 不同颜色格式 -->
    <view class="example-section">
      <view class="section-title">不同颜色格式</view>
      <view class="demo-block">
        <view class="demo-item">
          <text class="label">HEX 格式:</text>
          <zx-color-picker v-model="colorHex" color-format="hex" />
          <text class="value">{{ colorHex }}</text>
        </view>
        <view class="demo-item">
          <text class="label">RGB 格式:</text>
          <zx-color-picker v-model="colorRgb" color-format="rgb" />
          <text class="value">{{ colorRgb }}</text>
        </view>
        <view class="demo-item">
          <text class="label">HSL 格式:</text>
          <zx-color-picker v-model="colorHsl" color-format="hsl" />
          <text class="value">{{ colorHsl }}</text>
        </view>
        <view class="demo-item">
          <text class="label">HSV 格式:</text>
          <zx-color-picker v-model="colorHsv" color-format="hsv" />
          <text class="value">{{ colorHsv }}</text>
        </view>
      </view>
      <view class="description">
        <text>通过 color-format 属性可以设置不同的颜色格式输出，支持 hex、rgb、hsl、hsv</text>
      </view>
    </view>
    
    <!-- 禁用状态 -->
    <view class="example-section">
      <view class="section-title">禁用状态</view>
      <view class="demo-block">
        <view class="demo-item">
          <text class="label">禁用状态:</text>
          <zx-color-picker v-model="color1" disabled />
        </view>
        <view class="demo-item">
          <text class="label">可控禁用:</text>
          <zx-color-picker v-model="color1" :disabled="isDisabled" />
          <button class="toggle-btn" @tap="isDisabled = !isDisabled">
            {{ isDisabled ? '启用' : '禁用' }}
          </button>
        </view>
      </view>
      <view class="description">
        <text>通过 disabled 属性可以禁用颜色选择器</text>
      </view>
    </view>
    
    <!-- 事件监听 -->
    <view class="example-section">
      <view class="section-title">事件监听</view>
      <view class="demo-block">
        <view class="demo-item">
          <text class="label">事件示例:</text>
          <zx-color-picker 
            v-model="colorEvent" 
            show-alpha
            @change="handleChange"
            @active-change="handleActiveChange"
            @focus="handleFocus"
            @blur="handleBlur"
          />
        </view>
        <view class="event-log">
          <view class="log-header">
            <text class="log-title">事件日志:</text>
            <button class="clear-btn" @tap="eventLogs = []">清空日志</button>
          </view>
          <view class="log-list">
            <view v-for="(log, index) in eventLogs" :key="index" class="log-item">
              <text>{{ log }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="description">
        <text>组件支持多种事件：change(确认颜色)、active-change(颜色变化)、focus(获得焦点)、blur(失去焦点)</text>
      </view>
    </view>
    
    <!-- 方法调用 -->
    <view class="example-section">
      <view class="section-title">方法调用</view>
      <view class="demo-block">
        <view class="demo-item">
          <zx-color-picker 
            ref="colorPickerRef"
            v-model="colorMethod" 
          />
          <view class="btn-group">
            <button @tap="showPicker">显示选择器</button>
            <button @tap="hidePicker">隐藏选择器</button>
            <button @tap="focusPicker">聚焦</button>
            <button @tap="blurPicker">失焦</button>
          </view>
          <text class="value">{{ colorMethod }}</text>
        </view>
      </view>
      <view class="description">
        <text>通过 ref 可以调用组件方法：show()、hide()、focus()、blur()</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

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

// 禁用状态控制
const isDisabled = ref(true)

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
  addLog('调用 show() 方法')
}

const hidePicker = () => {
  colorPickerRef.value?.hide()
  addLog('调用 hide() 方法')
}

const focusPicker = () => {
  colorPickerRef.value?.focus()
  addLog('调用 focus() 方法')
}

const blurPicker = () => {
  colorPickerRef.value?.blur()
  addLog('调用 blur() 方法')
}
</script>

<style lang="scss" scoped>
.color-picker-example {
  max-width: 1000rpx;
  margin: 0 auto;
  padding: 40rpx;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.header {
  margin-bottom: 80rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  text-align: center;
  display: block;
}

.example-section {
  margin-bottom: 80rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #409eff;
  border-bottom: 4rpx solid #409eff;
  padding-bottom: 16rpx;
  margin-bottom: 40rpx;
}

.demo-block {
  background: #f8f9fa;
  border: 2rpx solid #e9ecef;
  border-radius: 16rpx;
  padding: 40rpx;
}

.description {
  margin-top: 24rpx;
  padding: 16rpx 24rpx;
  color: #666;
  font-size: 28rpx;
  line-height: 1.5;
  background: #f0f9ff;
  border-left: 8rpx solid #409eff;
  border-radius: 0 8rpx 8rpx 0;
}

.demo-item {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
  flex-wrap: wrap;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .label {
    min-width: 240rpx;
    font-weight: 500;
    color: #666;
    font-size: 28rpx;
  }
  
  .value {
    margin-left: 32rpx;
    padding: 8rpx 16rpx;
    background: #e9ecef;
    border-radius: 8rpx;
    font-family: 'Courier New', monospace;
    font-size: 24rpx;
    color: #495057;
  }
  
  button {
    margin-left: 16rpx;
    padding: 12rpx 24rpx;
    background: #409eff;
    color: white;
    border: none;
    border-radius: 8rpx;
    font-size: 24rpx;
    transition: background-color 0.3s;
    
    &:active {
      background: #66b1ff;
    }
  }
  
  .btn-group {
    display: flex;
    gap: 16rpx;
    margin-left: 32rpx;
  }
  
  .toggle-btn {
    min-width: 120rpx;
  }
}

.event-log {
  margin-top: 40rpx;
  
  .log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
  }
  
  .log-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
  }
  
  .clear-btn {
    font-size: 24rpx;
    padding: 8rpx 16rpx;
    background: #f56c6c;
    color: white;
    border: none;
    border-radius: 8rpx;
    
    &:active {
      background: #f78989;
    }
  }
}

.log-list {
  max-height: 400rpx;
  overflow-y: auto;
  background: #fff;
  border: 2rpx solid #ddd;
  border-radius: 8rpx;
  padding: 16rpx;
  margin-bottom: 24rpx;
}

.log-item {
  padding: 8rpx 0;
  font-family: 'Courier New', monospace;
  font-size: 24rpx;
  color: #666;
  border-bottom: 2rpx solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
}
</style> 