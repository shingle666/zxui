<template>
  <div class="watermark-demo">
    <view class="header">
      <text class="title">ZxWatermark 水印组件演示</text>
      <text class="subtitle">在页面上添加文本或图片等水印信息</text>
    </view>
    
    <!-- 基础用法 -->
    <view class="demo-section">
      <view class="section-title">基础用法</view>
      <view class="section-desc">默认的文本水印</view>
      <view class="demo-wrapper">
        <zx-watermark :font="{ color: isDark ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)' }">
          <view class="demo-content">
            <text class="demo-text">我坐在晨光中的窗前，世界如同一个过路人，停留片刻，向我点头示意后离去。</text>
            <text class="demo-text">这些微小的思绪是树叶的沙沙声，它们在我心中低语着欢乐。</text>
          </view>
        </zx-watermark>
      </view>
    </view>

    <!-- 多行水印 -->
    <view class="demo-section">
      <view class="section-title">多行水印</view>
      <view class="section-desc">使用数组设置多行文本水印</view>
      <view class="demo-wrapper">
        <zx-watermark 
          :content="['ZxWatermark', 'Vue3 组件']"
          :font="{ color: isDark ? 'rgba(255, 255, 255, .15)' : 'rgba(0, 0, 0, .15)' }"
        >
          <view class="demo-content">
            <text class="demo-text">你看不见你自己，你所看见的只是你的影子。</text>
            <text class="demo-text">我的愿望是愚人，它们在你的歌声中喧哗。让我只是静听着吧。</text>
          </view>
        </zx-watermark>
      </view>
    </view>

    <!-- 图片水印 -->
    <view class="demo-section">
      <view class="section-title">图片水印</view>
      <view class="section-desc">使用图片作为水印</view>
      <view class="demo-wrapper">
        <zx-watermark 
          :width="100" 
          :height="40"
          image="https://element-plus.org/images/element-plus-logo.svg"
        >
          <view class="demo-content">
            <text class="demo-text">大海啊，你说的是什么语言？</text>
            <text class="demo-text">是永恒疑问的语言。</text>
            <text class="demo-text">天空啊，你回答的是什么？</text>
            <text class="demo-text">是永恒沉默的语言。</text>
          </view>
        </zx-watermark>
      </view>
    </view>

    <!-- 自定义配置 -->
    <view class="demo-section">
      <view class="section-title">自定义配置</view>
      <view class="section-desc">配置自定义参数预览水印效果</view>
      
      <!-- 配置表单 -->
      <view class="config-form">
        <view class="form-row">
          <text class="form-label">内容:</text>
          <input 
            class="form-input" 
            v-model="config.content" 
            placeholder="输入水印内容"
          />
        </view>
        
        <view class="form-row">
          <text class="form-label">字体大小:</text>
          <slider 
            class="form-slider"
            :value="config.font.fontSize" 
            :min="12" 
            :max="30" 
            :step="1"
            @change="onFontSizeChange"
          />
          <text class="form-value">{{ config.font.fontSize }}px</text>
        </view>
        
        <view class="form-row">
          <text class="form-label">旋转角度:</text>
          <slider 
            class="form-slider"
            :value="config.rotate" 
            :min="-180" 
            :max="180" 
            :step="1"
            @change="onRotateChange"
          />
          <text class="form-value">{{ config.rotate }}°</text>
        </view>
        
        <view class="form-row">
          <text class="form-label">水平间距:</text>
          <slider 
            class="form-slider"
            :value="config.gap[0]" 
            :min="50" 
            :max="200" 
            :step="10"
            @change="onGapXChange"
          />
          <text class="form-value">{{ config.gap[0] }}px</text>
        </view>
        
        <view class="form-row">
          <text class="form-label">垂直间距:</text>
          <slider 
            class="form-slider"
            :value="config.gap[1]" 
            :min="50" 
            :max="200" 
            :step="10"
            @change="onGapYChange"
          />
          <text class="form-value">{{ config.gap[1] }}px</text>
        </view>
        
        <view class="form-row">
          <text class="form-label">透明度:</text>
          <slider 
            class="form-slider"
            :value="opacity" 
            :min="0.1" 
            :max="1" 
            :step="0.1"
            @change="onOpacitySliderChange"
          />
          <text class="form-value">{{ Math.round(opacity * 100) }}%</text>
        </view>
      </view>
      
      <!-- 预览区域 -->
      <view class="demo-wrapper">
        <zx-watermark 
          :content="config.content"
          :font="config.font"
          :rotate="config.rotate"
          :gap="config.gap"
          :offset="config.offset"
        >
          <view class="demo-content custom-demo">
            <view class="demo-card">
              <text class="card-title">ZxWatermark</text>
              <text class="card-subtitle">Vue 3 水印组件</text>
              <view class="card-content">
                <text class="card-text">✨ 支持文本和图片水印</text>
                <text class="card-text">🎨 支持自定义样式配置</text>
                <text class="card-text">🔒 支持防删除保护</text>
                <text class="card-text">📱 支持响应式设计</text>
              </view>
            </view>
          </view>
        </zx-watermark>
      </view>
    </view>

    <!-- 不同样式演示 -->
    <view class="demo-section">
      <view class="section-title">不同样式演示</view>
      
      <!-- 红色水印 -->
      <view class="style-demo">
        <view class="style-title">红色警告水印</view>
        <zx-watermark 
          content="机密文档"
          :font="{ color: 'rgba(255, 0, 0, 0.2)', fontSize: 20, fontWeight: 'bold' }"
          :rotate="-30"
          :gap="[120, 80]"
        >
          <view class="demo-content">
            <text class="demo-text">这是一份重要的机密文档，请妥善保管。</text>
          </view>
        </zx-watermark>
      </view>
      
      <!-- 蓝色品牌水印 -->
      <view class="style-demo">
        <view class="style-title">蓝色品牌水印</view>
        <zx-watermark 
          content="品牌保护"
          :font="{ color: 'rgba(64, 158, 255, 0.15)', fontSize: 18 }"
          :rotate="-15"
          :gap="[100, 100]"
        >
          <view class="demo-content">
            <text class="demo-text">这里展示品牌相关的内容，水印用于品牌保护。</text>
          </view>
        </zx-watermark>
      </view>
      
      <!-- 绿色成功水印 -->
      <view class="style-demo">
        <view class="style-title">绿色认证水印</view>
        <zx-watermark 
          content="已认证"
          :font="{ color: 'rgba(103, 194, 58, 0.2)', fontSize: 16, fontWeight: '600' }"
          :rotate="0"
          :gap="[150, 120]"
        >
          <view class="demo-content">
            <text class="demo-text">此内容已通过认证，具有官方权威性。</text>
          </view>
        </zx-watermark>
      </view>
    </view>

    <!-- 使用说明 -->
    <view class="demo-section">
      <view class="section-title">使用说明</view>
      <view class="usage-info">
        <view class="info-item">
          <text class="info-label">🎯 基础用法:</text>
          <text class="info-text">直接使用组件包裹内容即可添加默认水印</text>
        </view>
        <view class="info-item">
          <text class="info-label">📝 文本水印:</text>
          <text class="info-text">通过 content 属性设置文本内容，支持字符串或数组</text>
        </view>
        <view class="info-item">
          <text class="info-label">🖼️ 图片水印:</text>
          <text class="info-text">通过 image 属性设置图片URL，建议使用2x或3x图片</text>
        </view>
        <view class="info-item">
          <text class="info-label">🎨 样式定制:</text>
          <text class="info-text">通过 font 对象配置字体样式，包括颜色、大小、字重等</text>
        </view>
        <view class="info-item">
          <text class="info-label">📐 布局控制:</text>
          <text class="info-text">通过 gap、offset、rotate 等属性控制水印布局</text>
        </view>
        <view class="info-item">
          <text class="info-label">🔒 防删除:</text>
          <text class="info-text">组件内置防删除机制，保护水印不被恶意篡改</text>
        </view>
      </view>
    </view>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import ZxWatermark from '../../../components/zx-watermark/zx-watermark.vue'

defineOptions({
  name: 'ZxWatermarkDemo'
})

// 响应式数据
const isDark = ref(false) // 这里可以接入主题切换逻辑
const opacity = ref(0.15)

const config = reactive({
  content: 'ZxWatermark',
  font: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.15)',
    fontWeight: 'normal'
  },
  rotate: -22,
  gap: [100, 100],
  offset: []
})

// 方法
const onFontSizeChange = (e) => {
  config.font.fontSize = e.detail.value
}

const onRotateChange = (e) => {
  config.rotate = e.detail.value
}

const onGapXChange = (e) => {
  config.gap[0] = e.detail.value
}

const onGapYChange = (e) => {
  config.gap[1] = e.detail.value
}

const onOpacitySliderChange = (e) => {
  opacity.value = e.detail.value
}

const onOpacityChange = () => {
  const newOpacity = opacity.value
  // 更新字体颜色的透明度
  if (isDark.value) {
    config.font.color = `rgba(255, 255, 255, ${newOpacity})`
  } else {
    config.font.color = `rgba(0, 0, 0, ${newOpacity})`
  }
}

// 监听透明度变化
watch(() => opacity.value, onOpacityChange, { immediate: true })
</script>

<style lang="scss" scoped>
.watermark-demo {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 20rpx;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
  padding: 40rpx 20rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20rpx;
  color: white;
  
  .title {
    display: block;
    font-size: 48rpx;
    font-weight: 600;
    margin-bottom: 20rpx;
  }
  
  .subtitle {
    display: block;
    font-size: 28rpx;
    opacity: 0.9;
  }
}

.demo-section {
  margin-bottom: 60rpx;
  background: white;
  border-radius: 20rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20rpx;
  padding-bottom: 20rpx;
  border-bottom: 4rpx solid #409eff;
  display: inline-block;
}

.section-desc {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 40rpx;
}

.demo-wrapper {
  border: 2rpx solid #e4e7ed;
  border-radius: 16rpx;
  overflow: hidden;
  background: #fafbfc;
}

.demo-content {
  min-height: 400rpx;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
}

.demo-text {
  display: block;
  font-size: 30rpx;
  line-height: 1.8;
  color: #333;
  margin-bottom: 20rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.custom-demo {
  min-height: 500rpx;
}

.demo-card {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  padding: 40rpx;
  border-radius: 20rpx;
  color: white;
  text-align: center;
}

.card-title {
  display: block;
  font-size: 40rpx;
  font-weight: 600;
  margin-bottom: 15rpx;
}

.card-subtitle {
  display: block;
  font-size: 28rpx;
  opacity: 0.9;
  margin-bottom: 30rpx;
}

.card-content {
  .card-text {
    display: block;
    font-size: 26rpx;
    margin-bottom: 15rpx;
    text-align: left;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.config-form {
  background: #f8f9fb;
  padding: 30rpx;
  border-radius: 16rpx;
  margin-bottom: 40rpx;
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.form-label {
  width: 160rpx;
  font-size: 28rpx;
  color: #333;
  font-weight: 500;
}

.form-input {
  flex: 1;
  height: 70rpx;
  padding: 0 20rpx;
  background: white;
  border: 2rpx solid #e4e7ed;
  border-radius: 8rpx;
  font-size: 28rpx;
  color: #333;
}

.form-slider {
  flex: 1;
  margin: 0 20rpx;
}

.form-value {
  width: 120rpx;
  font-size: 26rpx;
  color: #666;
  text-align: right;
}

.style-demo {
  margin-bottom: 40rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.style-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 20rpx;
  padding-left: 20rpx;
  border-left: 6rpx solid #409eff;
}

.usage-info {
  .info-item {
    padding: 25rpx 0;
    border-bottom: 1rpx solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .info-label {
    display: block;
    font-size: 30rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 10rpx;
  }
  
  .info-text {
    display: block;
    font-size: 28rpx;
    color: #666;
    line-height: 1.6;
  }
}

// 响应式设计
@media (max-width: 750rpx) {
  .watermark-demo {
    padding: 15rpx;
  }
  
  .header {
    padding: 30rpx 20rpx;
    
    .title {
      font-size: 40rpx;
    }
    
    .subtitle {
      font-size: 24rpx;
    }
  }
  
  .demo-section {
    padding: 30rpx;
  }
  
  .section-title {
    font-size: 32rpx;
  }
  
  .form-row {
    flex-direction: column;
    align-items: flex-start;
    
    .form-label {
      width: 100%;
      margin-bottom: 15rpx;
    }
    
    .form-input,
    .form-slider {
      width: 100%;
      margin: 0;
    }
    
    .form-value {
      width: 100%;
      text-align: left;
      margin-top: 10rpx;
    }
  }
}
</style> 