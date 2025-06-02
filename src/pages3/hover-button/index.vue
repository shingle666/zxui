<template>
  <view class="page">
    <!-- 页面标题 -->
    <zx-navbar title="HoverButton 悬浮按钮" />
    
    <scroll-view scroll-y class="scroll-view">
      <view class="content">
        
        <!-- 基础用法 -->
        <zx-section title="基础用法" sub-title="默认右下角位置的悬浮按钮">
          <view class="demo-item">
            <text class="demo-text">点击右下角的悬浮按钮</text>
          </view>
        </zx-section>
        
        <!-- 不同位置 -->
        <zx-section title="不同位置" sub-title="四个角落的定位选项">
          <view class="demo-item">
            <view class="position-demo">
              <view class="position-item" @click="changePosition('left-top')">
                <text class="position-text">左上角</text>
                <text class="position-status">{{ currentPosition === 'left-top' ? '✓' : '' }}</text>
              </view>
              <view class="position-item" @click="changePosition('right-top')">
                <text class="position-text">右上角</text>
                <text class="position-status">{{ currentPosition === 'right-top' ? '✓' : '' }}</text>
              </view>
              <view class="position-item" @click="changePosition('left-bottom')">
                <text class="position-text">左下角</text>
                <text class="position-status">{{ currentPosition === 'left-bottom' ? '✓' : '' }}</text>
              </view>
              <view class="position-item" @click="changePosition('right-bottom')">
                <text class="position-text">右下角</text>
                <text class="position-status">{{ currentPosition === 'right-bottom' ? '✓' : '' }}</text>
              </view>
            </view>
          </view>
        </zx-section>
        
        <!-- 不同图标 -->
        <zx-section title="不同图标" sub-title="自定义图标样式">
          <view class="demo-item">
            <view class="icon-demo">
              <view 
                v-for="iconItem in iconList" 
                :key="iconItem.icon"
                class="icon-item" 
                @click="changeIcon(iconItem.icon)"
              >
                <zx-icon :name="iconItem.icon" size="24" color="#007AFF" />
                <text class="icon-name">{{ iconItem.name }}</text>
                <text class="icon-status">{{ currentIcon === iconItem.icon ? '✓' : '' }}</text>
              </view>
            </view>
          </view>
        </zx-section>
        
        <!-- 不同颜色 -->
        <zx-section title="不同颜色" sub-title="自定义背景颜色">
          <view class="demo-item">
            <view class="color-demo">
              <view 
                v-for="colorItem in colorList" 
                :key="colorItem.color"
                class="color-item" 
                @click="changeColor(colorItem.color)"
              >
                <view class="color-preview" :style="{ backgroundColor: colorItem.color }"></view>
                <text class="color-name">{{ colorItem.name }}</text>
                <text class="color-status">{{ currentColor === colorItem.color ? '✓' : '' }}</text>
              </view>
            </view>
          </view>
        </zx-section>
        
        <!-- 不同大小 -->
        <zx-section title="不同大小" sub-title="自定义按钮尺寸">
          <view class="demo-item">
            <view class="size-demo">
              <view 
                v-for="sizeItem in sizeList" 
                :key="sizeItem.size"
                class="size-item" 
                @click="changeSize(sizeItem.size)"
              >
                <text class="size-text">{{ sizeItem.name }}</text>
                <text class="size-value">{{ sizeItem.size }}px</text>
                <text class="size-status">{{ currentSize === sizeItem.size ? '✓' : '' }}</text>
              </view>
            </view>
          </view>
        </zx-section>
        
        <!-- 带文本标签 -->
        <zx-section title="带文本标签" sub-title="显示文本提示">
          <view class="demo-item">
            <view class="text-demo">
              <zx-button 
                type="primary" 
                size="small" 
                @click="toggleText"
              >
                {{ showText ? '隐藏文本' : '显示文本' }}
              </zx-button>
            </view>
          </view>
        </zx-section>
        
        <!-- 禁用状态 -->
        <zx-section title="禁用状态" sub-title="按钮禁用效果">
          <view class="demo-item">
            <view class="disabled-demo">
              <zx-button 
                type="primary" 
                size="small" 
                @click="toggleDisabled"
              >
                {{ disabled ? '启用按钮' : '禁用按钮' }}
              </zx-button>
            </view>
          </view>
        </zx-section>
        
        <!-- 阴影效果 -->
        <zx-section title="阴影效果" sub-title="控制阴影显示">
          <view class="demo-item">
            <view class="shadow-demo">
              <zx-button 
                type="primary" 
                size="small" 
                @click="toggleShadow"
              >
                {{ shadow ? '隐藏阴影' : '显示阴影' }}
              </zx-button>
            </view>
          </view>
        </zx-section>
        
        <!-- 自定义内容 -->
        <zx-section title="自定义内容" sub-title="使用插槽自定义按钮内容">
          <view class="demo-item">
            <view class="custom-demo">
              <zx-button 
                type="primary" 
                size="small" 
                @click="toggleCustom"
              >
                {{ showCustom ? '显示图标' : '自定义内容' }}
              </zx-button>
            </view>
          </view>
        </zx-section>
        
        <!-- 点击统计 -->
        <zx-section title="点击统计" sub-title="记录按钮点击次数">
          <view class="demo-item">
            <view class="click-demo">
              <text class="click-text">点击次数: {{ clickCount }}</text>
              <zx-button 
                type="primary" 
                size="small" 
                @click="resetCount"
              >
                重置计数
              </zx-button>
            </view>
          </view>
        </zx-section>
        
        <!-- 底部占位 -->
        <view class="bottom-placeholder"></view>
      </view>
    </scroll-view>
    
    <!-- 悬浮按钮 -->
    <zx-hover-button 
      v-if="!showCustom"
      :position="currentPosition"
      :icon="currentIcon"
      :backgroundColor="currentColor"
      :size="currentSize"
      :text="showText ? '悬浮按钮' : ''"
      :showText="showText"
      :disabled="disabled"
      :shadow="shadow"
      @click="handleHoverButtonClick"
    />
    
    <!-- 自定义内容的悬浮按钮 -->
    <zx-hover-button 
      v-else
      :position="currentPosition"
      :backgroundColor="currentColor"
      :size="currentSize"
      :disabled="disabled"
      :shadow="shadow"
      @click="handleHoverButtonClick"
    >
      <text style="color: white; font-size: 12px; font-weight: bold;">GO</text>
    </zx-hover-button>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const currentPosition = ref('right-bottom')
const currentIcon = ref('plus')
const currentColor = ref('#007AFF')
const currentSize = ref(50)
const showText = ref(false)
const disabled = ref(false)
const shadow = ref(true)
const showCustom = ref(false)
const clickCount = ref(0)

// 图标列表
const iconList = ref([
  { icon: 'plus', name: '加号' },
  { icon: 'menu', name: '菜单' },
  { icon: 'search', name: '搜索' },
  { icon: 'message', name: '消息' },
  { icon: 'heart', name: '喜欢' },
  { icon: 'star', name: '收藏' },
  { icon: 'share', name: '分享' },
  { icon: 'edit', name: '编辑' }
])

// 颜色列表
const colorList = ref([
  { color: '#007AFF', name: '蓝色' },
  { color: '#ff6b6b', name: '红色' },
  { color: '#4CAF50', name: '绿色' },
  { color: '#ff9500', name: '橙色' },
  { color: '#9c27b0', name: '紫色' },
  { color: '#607d8b', name: '灰色' },
  { color: '#e91e63', name: '粉色' },
  { color: '#795548', name: '棕色' }
])

// 大小列表
const sizeList = ref([
  { size: 40, name: '小' },
  { size: 50, name: '中' },
  { size: 60, name: '大' },
  { size: 70, name: '超大' }
])

// 方法
const changePosition = (position) => {
  currentPosition.value = position
  uni.showToast({
    title: `切换到${getPositionName(position)}`,
    icon: 'none'
  })
}

const changeIcon = (icon) => {
  currentIcon.value = icon
  const iconItem = iconList.value.find(item => item.icon === icon)
  uni.showToast({
    title: `切换到${iconItem.name}图标`,
    icon: 'none'
  })
}

const changeColor = (color) => {
  currentColor.value = color
  const colorItem = colorList.value.find(item => item.color === color)
  uni.showToast({
    title: `切换到${colorItem.name}`,
    icon: 'none'
  })
}

const changeSize = (size) => {
  currentSize.value = size
  const sizeItem = sizeList.value.find(item => item.size === size)
  uni.showToast({
    title: `切换到${sizeItem.name}尺寸`,
    icon: 'none'
  })
}

const toggleText = () => {
  showText.value = !showText.value
  uni.showToast({
    title: showText.value ? '显示文本标签' : '隐藏文本标签',
    icon: 'none'
  })
}

const toggleDisabled = () => {
  disabled.value = !disabled.value
  uni.showToast({
    title: disabled.value ? '按钮已禁用' : '按钮已启用',
    icon: 'none'
  })
}

const toggleShadow = () => {
  shadow.value = !shadow.value
  uni.showToast({
    title: shadow.value ? '显示阴影' : '隐藏阴影',
    icon: 'none'
  })
}

const toggleCustom = () => {
  showCustom.value = !showCustom.value
  uni.showToast({
    title: showCustom.value ? '自定义内容' : '显示图标',
    icon: 'none'
  })
}

const handleHoverButtonClick = () => {
  if (!disabled.value) {
    clickCount.value++
    uni.showToast({
      title: `悬浮按钮被点击 ${clickCount.value} 次`,
      icon: 'none'
    })
  }
}

const resetCount = () => {
  clickCount.value = 0
  uni.showToast({
    title: '计数已重置',
    icon: 'none'
  })
}

const getPositionName = (position) => {
  const positionMap = {
    'left-top': '左上角',
    'right-top': '右上角',
    'left-bottom': '左下角',
    'right-bottom': '右下角'
  }
  return positionMap[position] || position
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  background-color: #f5f5f5;
}

.scroll-view {
  height: calc(100vh - 44px);
}

.content {
  padding: 20rpx;
}

.demo-item {
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.demo-text {
  color: #666666;
  font-size: 28rpx;
  text-align: center;
  display: block;
}

.position-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.position-item {
  flex: 1;
  min-width: 45%;
  padding: 20rpx;
  background-color: #f8f9fa;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2rpx solid transparent;
  transition: all 0.3s ease;
}

.position-item:active {
  background-color: #e9ecef;
  border-color: #007AFF;
}

.position-text {
  color: #333333;
  font-size: 26rpx;
}

.position-status {
  color: #007AFF;
  font-size: 24rpx;
  font-weight: bold;
}

.icon-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.icon-item {
  flex: 1;
  min-width: 30%;
  padding: 20rpx;
  background-color: #f8f9fa;
  border-radius: 8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
  border: 2rpx solid transparent;
  transition: all 0.3s ease;
}

.icon-item:active {
  background-color: #e9ecef;
  border-color: #007AFF;
}

.icon-name {
  color: #333333;
  font-size: 24rpx;
}

.icon-status {
  color: #007AFF;
  font-size: 20rpx;
  font-weight: bold;
}

.color-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.color-item {
  flex: 1;
  min-width: 30%;
  padding: 20rpx;
  background-color: #f8f9fa;
  border-radius: 8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
  border: 2rpx solid transparent;
  transition: all 0.3s ease;
}

.color-item:active {
  background-color: #e9ecef;
  border-color: #007AFF;
}

.color-preview {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 2rpx solid #e0e0e0;
}

.color-name {
  color: #333333;
  font-size: 24rpx;
}

.color-status {
  color: #007AFF;
  font-size: 20rpx;
  font-weight: bold;
}

.size-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.size-item {
  flex: 1;
  min-width: 45%;
  padding: 20rpx;
  background-color: #f8f9fa;
  border-radius: 8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  border: 2rpx solid transparent;
  transition: all 0.3s ease;
}

.size-item:active {
  background-color: #e9ecef;
  border-color: #007AFF;
}

.size-text {
  color: #333333;
  font-size: 26rpx;
  font-weight: bold;
}

.size-value {
  color: #666666;
  font-size: 22rpx;
}

.size-status {
  color: #007AFF;
  font-size: 20rpx;
  font-weight: bold;
}

.text-demo,
.disabled-demo,
.shadow-demo,
.custom-demo {
  display: flex;
  justify-content: center;
}

.click-demo {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.click-text {
  color: #333333;
  font-size: 28rpx;
  font-weight: bold;
}

.bottom-placeholder {
  height: 200rpx;
}
</style>