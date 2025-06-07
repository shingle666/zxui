<template>
  <view class="page">
    <!-- 导航栏 -->
    <zx-navbar title="AI Welcome 组件" :border="false" bgColor="#fff" />
    
    <scroll-view scroll-y class="scroll-view" @scroll="onScroll">
      <view class="content">
        <!-- 页面标题 -->
        <view class="page-header">
          <text class="page-title">AI Welcome 欢迎组件</text>
          <text class="page-desc">清晰传达给用户可实现的意图范围和预期功能</text>
        </view>

        <!-- 基础用法 -->
        <view class="demo-section">
          <view class="section-title">
            <text>基础用法</text>
          </view>
          <view class="demo-card">
            <zx-ai-welcome
              icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
              title="Hello, I'm zxUI AI"
              description="基于 zxUI，AI 产品界面解决方案，创造更好的智能视觉体验~"
            />
          </view>
        </view>

        <!-- 变体样式 -->
        <view class="demo-section">
          <view class="section-title">
            <text>变体样式</text>
          </view>
          <view class="demo-card">
            <zx-ai-welcome
              variant="borderless"
              icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
              title="无边框样式"
              description="使用 borderless 变体，适合更简洁的设计风格"
            >
              <template #extra>
                <view class="extra-buttons">
                  <button class="extra-btn" size="mini" type="primary">分享</button>
                  <button class="extra-btn" size="mini" type="default">更多</button>
                </view>
              </template>
            </zx-ai-welcome>
          </view>
        </view>

        <!-- 自定义图标 -->
        <view class="demo-section">
          <view class="section-title">
            <text>自定义图标</text>
          </view>
          <view class="demo-card">
            <zx-ai-welcome
              icon="🤖"
              title="Emoji 图标"
              description="使用 emoji 作为图标，通过 iconSize 和 iconColor 属性配置"
              icon-size="80rpx"
              icon-color="#52c41a"
            />
          </view>
        </view>

        <!-- 自定义样式 -->
        <view class="demo-section">
          <view class="section-title">
            <text>自定义样式</text>
          </view>
          <view class="demo-card">
            <zx-ai-welcome
              icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
              title="自定义背景"
              description="通过 customStyle 属性自定义组件样式"
              :custom-style="{
                background: 'linear-gradient(97deg, #f2f9fe 0%, #f7f3ff 100%)',
                border: '2rpx solid #d9f7be',
                borderRadius: '20rpx'
              }"
              :styles="{
                title: { color: '#1890ff' },
                description: { color: '#52c41a' }
              }"
            />
          </view>
        </view>

        <!-- 完整示例 -->
        <view class="demo-section">
          <view class="section-title">
            <text>完整示例</text>
          </view>
          <view class="demo-card">
            <zx-ai-welcome
              icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
              title="智能助手"
              description="我是您的专属AI助手，可以帮助您解决各种问题，提供智能化的服务体验。点击下方按钮开始对话吧！"
            >
              <template #extra>
                <view class="action-menu">
                  <text class="menu-icon">⋯</text>
                </view>
              </template>
            </zx-ai-welcome>
            
            <!-- 操作按钮 -->
            <view class="action-buttons">
              <button class="action-btn primary" @click="startChat">开始对话</button>
              <button class="action-btn secondary" @click="viewFeatures">查看功能</button>
            </view>
          </view>
        </view>

        <!-- 插槽用法 -->
        <view class="demo-section">
          <view class="section-title">
            <text>插槽用法</text>
          </view>
          <view class="demo-card">
            <zx-ai-welcome>
              <template #icon>
                <view class="gradient-icon">
                  <text class="icon-text">AI</text>
                </view>
              </template>
              
              <template #title>
                <view class="custom-title">
                  <text class="title-main">智能创作助手</text>
                  <text class="title-badge">Beta</text>
                </view>
              </template>
              
              <template #description>
                <view class="rich-description">
                  <text class="desc-text">支持多种创作模式：</text>
                  <view class="feature-list">
                    <text class="feature-item">• 文本生成</text>
                    <text class="feature-item">• 图像创作</text>
                    <text class="feature-item">• 代码编写</text>
                  </view>
                </view>
              </template>
              
              <template #extra>
                <view class="status-indicator">
                  <view class="status-dot"></view>
                  <text class="status-text">在线</text>
                </view>
              </template>
            </zx-ai-welcome>
          </view>
        </view>
      </view>
    </scroll-view>
    
    <!-- 返回顶部 -->
    <zx-backtop :scrollTop="scrollTop" />
  </view>
</template>

<script setup>
import { ref } from 'vue'
// 引入组件
import ZxNavbar from '@/components/zx-navbar/zx-navbar.vue'
import ZxBacktop from '@/components/zx-backtop/zx-backtop.vue'
import ZxAiWelcome from '@/components/zx-ai-welcome/zx-ai-welcome.vue'


// 定义页面选项
defineOptions({
  name: 'AiWelcomePage'
})

// 响应式数据
const scrollTop = ref(0)

// 滚动事件处理
const onScroll = (e) => {
  scrollTop.value = e.detail.scrollTop
}

// 开始对话
const startChat = () => {
  uni.showToast({
    title: '开始对话',
    icon: 'success'
  })
}

// 查看功能
const viewFeatures = () => {
  uni.showToast({
    title: '查看功能',
    icon: 'success'
  })
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;
  background-color: #f5f5f5;
}

.scroll-view {
  height: calc(100vh - 88rpx);
}

.content {
  padding: 32rpx;
}

.page-header {
  text-align: center;
  margin-bottom: 48rpx;
  
  .page-title {
    display: block;
    font-size: 48rpx;
    font-weight: 600;
    color: #262626;
    margin-bottom: 16rpx;
  }
  
  .page-desc {
    display: block;
    font-size: 28rpx;
    color: #8c8c8c;
    line-height: 1.6;
  }
}

.demo-section {
  margin-bottom: 48rpx;
  
  .section-title {
    margin-bottom: 24rpx;
    
    text {
      font-size: 32rpx;
      font-weight: 600;
      color: #262626;
    }
  }
}

.demo-card {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

// 额外按钮样式
.extra-buttons {
  display: flex;
  gap: 16rpx;
  
  .extra-btn {
    padding: 8rpx 16rpx;
    font-size: 24rpx;
    border-radius: 8rpx;
  }
}

// 自定义图标样式
.custom-icon {
  font-size: 64rpx;
  line-height: 1;
}

// 操作菜单样式
.action-menu {
  padding: 8rpx;
  
  .menu-icon {
    font-size: 32rpx;
    color: #8c8c8c;
  }
}

// 操作按钮样式
.action-buttons {
  display: flex;
  gap: 24rpx;
  margin-top: 32rpx;
  
  .action-btn {
    flex: 1;
    height: 80rpx;
    border-radius: 12rpx;
    font-size: 28rpx;
    border: none;
    
    &.primary {
      background: #1890ff;
      color: #ffffff;
    }
    
    &.secondary {
      background: #f0f0f0;
      color: #262626;
    }
  }
}

// 渐变图标样式
.gradient-icon {
  width: 96rpx;
  height: 96rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .icon-text {
    color: #ffffff;
    font-size: 32rpx;
    font-weight: 600;
  }
}

// 自定义标题样式
.custom-title {
  display: flex;
  align-items: center;
  gap: 16rpx;
  
  .title-main {
    font-size: 36rpx;
    font-weight: 600;
    color: #262626;
  }
  
  .title-badge {
    background: #ff4d4f;
    color: #ffffff;
    font-size: 20rpx;
    padding: 4rpx 12rpx;
    border-radius: 20rpx;
  }
}

// 富文本描述样式
.rich-description {
  .desc-text {
    display: block;
    font-size: 28rpx;
    color: #8c8c8c;
    margin-bottom: 16rpx;
  }
  
  .feature-list {
    .feature-item {
      display: block;
      font-size: 26rpx;
      color: #595959;
      line-height: 1.8;
    }
  }
}

// 状态指示器样式
.status-indicator {
  display: flex;
  align-items: center;
  gap: 8rpx;
  
  .status-dot {
    width: 16rpx;
    height: 16rpx;
    background: #52c41a;
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  
  .status-text {
    font-size: 24rpx;
    color: #52c41a;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(82, 196, 26, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20rpx rgba(82, 196, 26, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(82, 196, 26, 0);
  }
}
</style>