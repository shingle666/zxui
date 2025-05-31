<template>
  <div class="watermark-demo">
    <view class="header">
      <zx-title title="ZxWatermark 水印组件演示" class="title"></zx-title>
      <zx-title title="在页面上添加文本或图片等水印信息" class="subtitle"></zx-title>
    </view>

    <!-- 基础用法 -->
    <view class="demo-section">
      <zx-title title="基础用法" class="section-title"></zx-title>
      <view class="section-desc">默认的文本水印，覆盖整个页面</view>
      <view class="demo-wrapper">
        <zx-watermark content="tanzhenxing">
          <view>
            <zx-text text="我坐在晨光中的窗前，世界如同一个过路人，停留片刻，向我点头示意后离去。"></zx-text>
            <zx-text text="这些微小的思绪是树叶的沙沙声，它们在我心中低语着欢乐。"></zx-text>
          </view>
        </zx-watermark>
      </view>
    </view>

    <!-- 局部水印 -->
    <view class="demo-section">
      <zx-title title="局部水印" class="section-title"></zx-title>
      <view class="section-desc">仅在容器区域显示水印</view>
      <view class="demo-wrapper" style="position: relative; height: 300px;">
        <zx-watermark content="局部水印" :font-color="'#409eff'" :font-size="14" :gap-x="80" :gap-y="60">
          <view style="min-height: 250px;">
            <zx-text text="这是一个局部水印示例，水印只在当前容器内显示。"></zx-text>
            <zx-text text="适用于需要对特定区域添加水印的场景。"></zx-text>
          </view>
        </zx-watermark>
      </view>
    </view>

    <!-- 多行水印 -->
    <view class="demo-section">
      <zx-title title="多行水印" class="section-title"></zx-title>
      <view class="section-desc">使用数组设置多行文本水印</view>
      <view class="demo-wrapper">
        <zx-watermark :content="['ZxWatermark', 'Vue3 组件']" :gap-x="120" :gap-y="80">
          <view>
            <zx-text text="你看不见你自己，你所看见的只是你的影子。"></zx-text>
            <zx-text text="我的愿望是愚人，它们在你的歌声中喧哗。让我只是静听着吧。"></zx-text>
          </view>
        </zx-watermark>
      </view>
    </view>

    <!-- 图片水印 -->
    <view class="demo-section">
      <zx-title title="图片水印" class="section-title"></zx-title>
      <view class="section-desc">使用图片作为水印</view>
      <view class="demo-wrapper">
        <zx-watermark image="https://zxui.org/logo.png" :gap-x="120" :gap-y="80">
          <view>
            <zx-text text="大海啊，你说的是什么语言？"></zx-text>
            <zx-text text="是永恒疑问的语言。"></zx-text>
            <zx-text text="天空啊，你回答的是什么？"></zx-text>
            <zx-text text="是永恒沉默的语言。"></zx-text>
          </view>
        </zx-watermark>
      </view>
    </view>

    <!-- 自定义配置 -->
    <view class="demo-section">
      <zx-title title="自定义配置" class="section-title"></zx-title>
      <view class="section-desc">配置自定义参数预览水印效果</view>

      <!-- 配置表单 -->
      <view class="config-form">
        <view class="form-row">
          <zx-text text="内容:"></zx-text>
          <input class="form-input" v-model="config.content" placeholder="输入水印内容" />
        </view>

        <view class="form-row">
          <zx-text text="字体大小:"></zx-text>
          <zx-slider class="form-slider" :value="config.fontSize" :min="12" :max="30" :step="1"
            @change="onFontSizeChange" />
          <zx-text :text="config.fontSize + 'px'"></zx-text>
        </view>

        <view class="form-row">
          <zx-text text="旋转角度:"></zx-text>
          <zx-slider class="form-slider" :value="config.rotate" :min="-180" :max="180" :step="1"
            @change="onRotateChange" />
          <zx-text :text="config.rotate + '°'"></zx-text>
        </view>

        <view class="form-row">
          <zx-text text="水平间距:"></zx-text>
          <zx-slider class="form-slider" :value="config.gapX" :min="20" :max="200" :step="10" @change="onGapXChange" />
          <zx-text :text="config.gapX + 'px'"></zx-text>
        </view>

        <view class="form-row">
          <zx-text text="垂直间距:"></zx-text>
          <zx-slider class="form-slider" :value="config.gapY" :min="20" :max="200" :step="10" @change="onGapYChange" />
          <zx-text :text="config.gapY + 'px'"></zx-text>
        </view>

        <view class="form-row">
          <zx-text text="透明度:"></zx-text>
          <zx-slider class="form-slider" :value="opacity" :min="0.1" :max="1" :step="0.1"
            @change="onOpacitySliderChange" />
          <zx-text :text="Math.round(opacity * 100) + '%'"></zx-text>
        </view>
      </view>

      <!-- 预览区域 -->
      <view class="demo-wrapper">
        <zx-watermark :content="config.content" :font-color="config.fontColor" :font-size="config.fontSize"
          :font-weight="config.fontWeight" :rotate="config.rotate" :gap-x="config.gapX" :gap-y="config.gapY"
          :offset="config.offset">
          <view>
            <view>
              <zx-title title="ZxWatermark"></zx-title>
              <zx-title title="Vue 3 水印组件"></zx-title>
              <view class="card-content">
                <zx-text text="✨ 支持文本和图片水印"></zx-text>
                <zx-text text="🎨 支持自定义样式配置"></zx-text>
                <zx-text text="🔒 支持防删除保护"></zx-text>
                <zx-text text="📱 多端兼容支持"></zx-text>
              </view>
            </view>
          </view>
        </zx-watermark>
      </view>
    </view>

    <!-- 不同样式演示 -->
    <view class="demo-section">
      <zx-title title="不同样式演示" class="section-title"></zx-title>

      <!-- 红色水印 -->
      <view class="style-demo">
        <zx-title title="红色警告水印" class="style-title"></zx-title>
        <zx-watermark content="机密文档" :font-color="'rgba(255, 0, 0, 0.2)'" :font-size="20" :font-weight="'bold'"
          :rotate="-30" :gap-x="120" :gap-y="80">
          <view>
            <zx-text text="这是一份重要的机密文档，请妥善保管。"></zx-text>
          </view>
        </zx-watermark>
      </view>

      <!-- 蓝色品牌水印 -->
      <view class="style-demo">
        <zx-title title="蓝色品牌水印" class="style-title"></zx-title>
        <zx-watermark content="品牌保护" :font-color="'rgba(64, 158, 255, 0.15)'" :font-size="18" :rotate="-15" :gap-x="100"
          :gap-y="100">
          <view>
            <zx-text text="这里展示品牌相关的内容，水印用于品牌保护。"></zx-text>
          </view>
        </zx-watermark>
      </view>

      <!-- 绿色成功水印 -->
      <view class="style-demo">
        <zx-title title="绿色认证水印" class="style-title"></zx-title>
        <zx-watermark content="已认证" :font-color="'rgba(103, 194, 58, 0.2)'" :font-size="16" :font-weight="'600'"
          :rotate="0" :gap-x="150" :gap-y="120">
          <view>
            <zx-text text="此内容已通过认证，具有官方权威性。"></zx-text>
          </view>
        </zx-watermark>
      </view>
    </view>

    <!-- 高级配置演示 -->
    <view class="demo-section">
      <zx-title title="高级配置演示" class="section-title"></zx-title>
      <view class="section-desc">展示更多高级配置选项</view>

      <!-- 自定义尺寸和层级 -->
      <view class="style-demo">
        <zx-title title="自定义尺寸和层级" class="style-title"></zx-title>
        <zx-watermark content="高级配置" :font-color="'rgba(138, 43, 226, 0.2)'" :font-size="24" :font-weight="'bold'"
          :width="200" :height="100" :z-index="999" :rotate="45" :gap-x="200" :gap-y="150">
          <view>
            <zx-text text="这个示例展示了自定义水印尺寸、层级和旋转角度的效果。"></zx-text>
            <zx-text text="水印具有更大的尺寸和更高的层级，确保在所有内容之上显示。"></zx-text>
          </view>
        </zx-watermark>
      </view>

      <!-- 偏移量配置 -->
      <view class="style-demo">
        <zx-title title="偏移量配置" class="style-title"></zx-title>
        <zx-watermark content="偏移水印" :font-color="'rgba(255, 140, 0, 0.25)'" :font-size="18" :gap-x="150" :gap-y="100"
          :offset="[50, 30]">
          <view>
            <zx-text text="通过 offset 属性可以调整水印的起始位置偏移量。"></zx-text>
            <zx-text text="这对于精确控制水印位置非常有用。"></zx-text>
          </view>
        </zx-watermark>
      </view>
    </view>

    <!-- 使用说明 -->
    <view class="demo-section">
      <zx-title title="使用说明" class="section-title"></zx-title>
      <view class="usage-info">
        <view class="info-item">
          <zx-text type="info" text="🎯 基础用法:"></zx-text>
          <zx-text text="直接使用组件包裹内容即可添加默认水印"></zx-text>
        </view>
        <view class="info-item">
          <zx-text type="info" text="📝 文本水印:"></zx-text>
          <zx-text text="通过 content 属性设置文本内容，支持字符串或数组"></zx-text>
        </view>
        <view class="info-item">
          <zx-text type="info" text="🖼️ 图片水印:"></zx-text>
          <zx-text text="通过 image 属性设置图片URL，建议使用2x或3x图片"></zx-text>
        </view>
        <view class="info-item">
          <zx-text type="info" text="🎨 样式定制:"></zx-text>
          <zx-text text="通过 font-color、font-size、font-weight 等属性配置字体样式"></zx-text>
        </view>
        <view class="info-item">
          <zx-text type="info" text="📐 布局控制:"></zx-text>
          <zx-text text="通过 gap-x、gap-y、offset、rotate 等属性控制水印布局"></zx-text>
        </view>
        <view class="info-item">
          <zx-text type="info" text="🌐 多端兼容:"></zx-text>
          <zx-text text="支持H5、小程序、App等多端环境，自动适配不同平台"></zx-text>
        </view>
        <view class="info-item">
          <zx-text type="info" text="📏 尺寸控制:"></zx-text>
          <zx-text text="通过 width、height 属性控制水印单元的尺寸大小"></zx-text>
        </view>
        <view class="info-item">
          <zx-text type="info" text="🔢 层级设置:"></zx-text>
          <zx-text text="通过 z-index 属性控制水印的显示层级"></zx-text>
        </view>
        <view class="info-item">
          <zx-text type="info" text="📍 位置偏移:"></zx-text>
          <zx-text text="通过 offset 数组属性设置水印的起始位置偏移量 [x, y]"></zx-text>
        </view>
        <view class="info-item">
          <zx-text type="info" text="🔒 防删除:"></zx-text>
          <zx-text text="H5环境下内置防删除机制，保护水印不被恶意篡改"></zx-text>
        </view>
      </view>
    </view>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

// 响应式数据
const isDark = ref(false) // 这里可以接入主题切换逻辑
const opacity = ref(0.15)

const config = reactive({
  content: 'zxui',
  fontColor: 'rgba(0, 0, 0, 0.15)',
  fontSize: 16,
  fontWeight: 'normal',
  rotate: -22,
  gapX: 24,
  gapY: 48,
  offset: []
})

// 方法
const onFontSizeChange = (e) => {
  config.fontSize = e.value
}

const onRotateChange = (e) => {
  config.rotate = e.value
}

const onGapXChange = (e) => {
  config.gapX = e.value
}

const onGapYChange = (e) => {
  config.gapY = e.value
}

const onOpacitySliderChange = (e) => {
  opacity.value = e.value
}

const onOpacityChange = () => {
  const newOpacity = opacity.value
  // 更新字体颜色的透明度
  if (isDark.value) {
    config.fontColor = `rgba(255, 255, 255, ${newOpacity})`
  } else {
    config.fontColor = `rgba(0, 0, 0, ${newOpacity})`
  }
}

// 监听透明度变化
watch(() => opacity.value, onOpacityChange, { immediate: true })
</script>

<style lang="scss" scoped>
.watermark-demo {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20rpx;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
  padding: 50rpx 30rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24rpx;
  color: white;
  box-shadow: 0 8rpx 32rpx rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }

  .title {
    display: block;
    font-size: 52rpx;
    font-weight: 700;
    margin-bottom: 24rpx;
    text-shadow: 0 2rpx 8rpx rgba(0,0,0,0.2);
    position: relative;
    z-index: 1;
  }

  .subtitle {
    display: block;
    font-size: 30rpx;
    opacity: 0.95;
    font-weight: 400;
    position: relative;
    z-index: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg);
  }
}

.demo-section {
  margin-bottom: 60rpx;
  background: white;
  border-radius: 24rpx;
  padding: 50rpx;
  box-shadow: 0 8rpx 40rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10rpx);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4rpx);
    box-shadow: 0 12rpx 48rpx rgba(0, 0, 0, 0.12);
  }
}

.section-title {
  font-size: 38rpx;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 24rpx;
  padding-bottom: 24rpx;
  border-bottom: 4rpx solid #409eff;
  display: inline-block;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4rpx;
    left: 0;
    width: 0;
    height: 4rpx;
    background: linear-gradient(90deg, #409eff, #67c23a);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
}

.section-desc {
  font-size: 30rpx;
  color: #666;
  margin-bottom: 40rpx;
  line-height: 1.6;
  font-weight: 400;
}

.demo-wrapper {
  border: 2rpx solid #e4e7ed;
  border-radius: 20rpx;
  overflow: hidden;
  background: #fafbfc;
  transition: all 0.3s ease;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    border-color: #409eff;
    box-shadow: 0 4rpx 20rpx rgba(64, 158, 255, 0.15);

    &::before {
      left: 100%;
    }
  }
}

.card-content {
  padding: 30rpx;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16rpx;
  margin: 20rpx;
}

.config-form {
  background: linear-gradient(135deg, #f8f9fb 0%, #e8eaf6 100%);
  padding: 40rpx;
  border-radius: 20rpx;
  margin-bottom: 40rpx;
  border: 1rpx solid rgba(64, 158, 255, 0.1);
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 35rpx;
  padding: 20rpx;
  background: white;
  border-radius: 16rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    transform: translateY(-2rpx);
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  }
}

.form-input {
  flex: 1;
  height: 80rpx;
  padding: 0 24rpx;
  background: white;
  border: 2rpx solid #e4e7ed;
  border-radius: 12rpx;
  font-size: 30rpx;
  color: #333;
  transition: all 0.3s ease;

  &:focus {
    border-color: #409eff;
    box-shadow: 0 0 0 4rpx rgba(64, 158, 255, 0.1);
    outline: none;
  }
}

.form-slider {
  flex: 1;
  margin: 0 24rpx;
}

.style-demo {
  margin-bottom: 50rpx;
  padding: 30rpx;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 20rpx;
  border: 1rpx solid #e9ecef;
  transition: all 0.3s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    transform: translateY(-2rpx);
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  }
}

.style-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 24rpx;
  padding-left: 24rpx;
  border-left: 6rpx solid #409eff;
  position: relative;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    left: -6rpx;
    top: 0;
    width: 6rpx;
    height: 100%;
    background: linear-gradient(180deg, #409eff, #67c23a);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
}

.usage-info {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20rpx;
  padding: 30rpx;
  border: 1rpx solid #dee2e6;

  .info-item {
    padding: 30rpx 0;
    border-bottom: 1rpx solid rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    border-radius: 12rpx;
    margin-bottom: 8rpx;
    padding-left: 20rpx;
    padding-right: 20rpx;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    &:hover {
      background: white;
      transform: translateX(8rpx);
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
    }
  }
}

// 响应式设计增强
@media (max-width: 750rpx) {
  .watermark-demo {
    padding: 16rpx;
  }

  .header {
    padding: 40rpx 24rpx;
    margin-bottom: 40rpx;

    .title {
      font-size: 44rpx;
    }

    .subtitle {
      font-size: 26rpx;
    }
  }

  .demo-section {
    padding: 30rpx;
    margin-bottom: 40rpx;
  }

  .section-title {
    font-size: 34rpx;
  }

  .config-form {
    padding: 30rpx;
  }

  .form-row {
    flex-direction: column;
    align-items: stretch;
    padding: 24rpx;

    .form-input {
      width: 100%;
      margin: 0 0 20rpx 0;
    }

    .form-slider {
      width: 100%;
      margin: 0;
    }
  }

  .style-demo {
    padding: 24rpx;
    margin-bottom: 30rpx;
  }

  .usage-info {
    padding: 24rpx;

    .info-item {
      padding: 24rpx 16rpx;
    }
  }
}

// 深色模式支持
@media (prefers-color-scheme: dark) {
  .watermark-demo {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  }

  .demo-section {
    background: #2d2d2d;
    border-color: #404040;
  }

  .section-title {
    color: #e0e0e0;
  }

  .section-desc {
    color: #b0b0b0;
  }

  .config-form {
    background: linear-gradient(135deg, #2d2d2d 0%, #3d3d3d 100%);
  }

  .form-row {
    background: #3d3d3d;
  }

  .form-input {
    background: #3d3d3d;
    border-color: #505050;
    color: #e0e0e0;
  }
}
</style>