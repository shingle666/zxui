<template>
  <view class="animate-demo">
    <zx-navbar title="zx-animate 动画组件" />
    
    <!-- 基础用法 -->
    <zx-section title="基础用法" sub-title="点击触发动画">
      <view class="demo-section">
        <view class="demo-row">
          <zx-animate type="shake" action="click">
            <zx-button type="primary" size="mini">shake 抖动</zx-button>
          </zx-animate>
          
          <zx-animate type="ripple" action="click">
            <zx-button type="success" size="mini">ripple 缩放</zx-button>
          </zx-animate>
        </view>
        
        <view class="demo-row">
          <zx-animate type="jump" action="click">
            <zx-button type="warning" size="mini">jump 跳跃</zx-button>
          </zx-animate>
          
          <zx-animate type="twinkle" action="click">
            <zx-button type="info" size="mini">twinkle 水波</zx-button>
          </zx-animate>
        </view>
      </view>
    </zx-section>
    
    <!-- 滑入动画 -->
    <zx-section title="滑入动画" sub-title="点击触发滑入效果">
      <view class="demo-section">
        <view class="demo-row">
          <zx-animate type="slide-right" action="click">
            <zx-button type="primary" size="mini">slide-right</zx-button>
          </zx-animate>
          
          <zx-animate type="slide-left" action="click">
            <zx-button type="success" size="mini">slide-left</zx-button>
          </zx-animate>
        </view>
        
        <view class="demo-row">
          <zx-animate type="slide-top" action="click">
            <zx-button type="warning" size="mini">slide-top</zx-button>
          </zx-animate>
          
          <zx-animate type="slide-bottom" action="click">
            <zx-button type="danger" size="mini">slide-bottom</zx-button>
          </zx-animate>
        </view>
      </view>
    </zx-section>
    
    <!-- 循环动画 -->
    <zx-section title="循环动画" sub-title="持续播放的动画效果">
      <view class="demo-section">
        <view class="demo-row">
          <zx-animate type="breath" :loop="true" action="initial">
            <zx-button type="primary" size="mini">breath 呼吸灯</zx-button>
          </zx-animate>
          
          <zx-animate type="float" :loop="true" action="initial">
            <zx-button type="success" size="mini">float 漂浮</zx-button>
          </zx-animate>
        </view>
        
        <view class="demo-row">
          <zx-animate type="flicker" :loop="true" action="initial">
            <zx-button type="warning" size="mini">flicker 擦亮</zx-button>
          </zx-animate>
          
          <zx-animate type="twinkle" :loop="true" action="initial">
            <zx-badge :value="99">
              <zx-icon name="message" size="40"></zx-icon>
            </zx-badge>
          </zx-animate>
        </view>
      </view>
    </zx-section>
    
    <!-- 通过 show 控制 -->
    <zx-section title="通过 show 控制" sub-title="手动控制动画播放">
      <view class="demo-section">
        <view class="control-buttons">
          <zx-button type="primary" size="mini" @click="triggerShake">触发抖动</zx-button>
          <zx-button type="success" size="mini" @click="triggerRipple">触发缩放</zx-button>
          <zx-button type="warning" size="mini" @click="triggerSlide">触发滑入</zx-button>
        </view>
        
        <view class="demo-row">
          <zx-animate :show="showShake" type="shake" @animate="onAnimate">
            <zx-button type="primary" size="mini">受控抖动</zx-button>
          </zx-animate>
          
          <zx-animate :show="showRipple" type="ripple" @animate="onAnimate">
            <zx-button type="success" size="mini">受控缩放</zx-button>
          </zx-animate>
          
          <zx-animate :show="showSlide" type="slide-bottom" @animate="onAnimate">
            <zx-button type="warning" size="mini">受控滑入</zx-button>
          </zx-animate>
        </view>
      </view>
    </zx-section>
    
    <!-- 自定义时长 -->
    <zx-section title="自定义时长" sub-title="不同的动画持续时间">
      <view class="demo-section">
        <view class="demo-row">
          <zx-animate type="shake" action="click" :duration="500">
            <zx-button type="primary" size="mini">快速 500ms</zx-button>
          </zx-animate>
          
          <zx-animate type="shake" action="click" :duration="1000">
            <zx-button type="success" size="mini">正常 1000ms</zx-button>
          </zx-animate>
          
          <zx-animate type="shake" action="click" :duration="2000">
            <zx-button type="warning" size="mini">缓慢 2000ms</zx-button>
          </zx-animate>
        </view>
      </view>
    </zx-section>
    
    <!-- 实际应用场景 -->
    <zx-section title="实际应用场景" sub-title="常见的使用场景">
      <view class="demo-section">
        <!-- 消息通知 -->
        <view class="scenario-item">
          <text class="scenario-title">消息通知</text>
          <zx-animate type="twinkle" :loop="true" action="initial">
            <zx-badge :value="5">
              <zx-icon name="message" size="40" color="#409eff"></zx-icon>
            </zx-badge>
          </zx-animate>
        </view>
        
        <!-- 状态指示 -->
        <view class="scenario-item">
          <text class="scenario-title">在线状态</text>
          <view class="status-container">
            <zx-avatar src="/static/avatar.png" size="60"></zx-avatar>
            <zx-animate type="breath" :loop="true" action="initial">
              <view class="status-dot online"></view>
            </zx-animate>
          </view>
        </view>
        
        <!-- 错误提示 -->
        <view class="scenario-item">
          <text class="scenario-title">错误提示</text>
          <zx-animate type="shake" action="click">
            <zx-button type="danger" size="mini">删除操作</zx-button>
          </zx-animate>
        </view>
        
        <!-- 页面入场 -->
        <view class="scenario-item">
          <text class="scenario-title">卡片入场</text>
          <zx-animate type="slide-bottom" action="click">
            <view class="demo-card">
              <text>点击重新播放入场动画</text>
            </view>
          </zx-animate>
        </view>
      </view>
    </zx-section>
    
    <!-- 组合动画 -->
    <zx-section title="组合动画" sub-title="多个动画组合使用">
      <view class="demo-section">
        <view class="combo-demo">
          <zx-button type="primary" @click="playComboAnimation">播放组合动画</zx-button>
          
          <view class="combo-container">
            <zx-animate :show="comboStep >= 1" type="slide-top" :duration="600">
              <view class="combo-item item1">第一个元素</view>
            </zx-animate>
            
            <zx-animate :show="comboStep >= 2" type="slide-left" :duration="600">
              <view class="combo-item item2">第二个元素</view>
            </zx-animate>
            
            <zx-animate :show="comboStep >= 3" type="slide-right" :duration="600">
              <view class="combo-item item3">第三个元素</view>
            </zx-animate>
            
            <zx-animate :show="comboStep >= 4" type="slide-bottom" :duration="600">
              <view class="combo-item item4">第四个元素</view>
            </zx-animate>
          </view>
        </view>
      </view>
    </zx-section>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import ZxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue'
import ZxSection from '@tanzhenxing/zx-section/zx-section.vue'
import ZxAnimate from '@tanzhenxing/zx-animate/zx-animate.vue'
import ZxButton from '@tanzhenxing/zx-button/zx-button.vue'
import ZxBadge from '@tanzhenxing/zx-badge/zx-badge.vue'
import ZxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'
import ZxAvatar from '@tanzhenxing/zx-avatar/zx-avatar.vue'

// 控制动画的响应式变量
const showShake = ref(false)
const showRipple = ref(false)
const showSlide = ref(false)
const comboStep = ref(0)

// 触发抖动动画
const triggerShake = () => {
  showShake.value = false
  setTimeout(() => {
    showShake.value = true
  }, 100)
}

// 触发缩放动画
const triggerRipple = () => {
  showRipple.value = false
  setTimeout(() => {
    showRipple.value = true
  }, 100)
}

// 触发滑入动画
const triggerSlide = () => {
  showSlide.value = false
  setTimeout(() => {
    showSlide.value = true
  }, 100)
}

// 动画触发回调
const onAnimate = () => {
  console.log('动画已触发')
  uni.showToast({
    title: '动画已触发',
    icon: 'none',
    duration: 1000
  })
}

// 播放组合动画
const playComboAnimation = () => {
  comboStep.value = 0
  
  // 依次播放动画
  setTimeout(() => comboStep.value = 1, 200)
  setTimeout(() => comboStep.value = 2, 600)
  setTimeout(() => comboStep.value = 3, 1000)
  setTimeout(() => comboStep.value = 4, 1400)
}
</script>

<style lang="scss" scoped>
.animate-demo {
  padding-bottom: 100rpx;
}

.demo-section {
  padding: 20rpx;
}

.demo-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 30rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.control-buttons {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40rpx;
}

.scenario-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;
  border-bottom: 1rpx solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
}

.scenario-title {
  font-size: 28rpx;
  color: #333;
}

.status-container {
  position: relative;
  display: flex;
  align-items: center;
}

.status-dot {
  position: absolute;
  right: -5rpx;
  top: -5rpx;
  width: 20rpx;
  height: 20rpx;
  border-radius: 50%;
  border: 2rpx solid #fff;
  
  &.online {
    background-color: #52c41a;
  }
}

.demo-card {
  padding: 30rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16rpx;
  color: #fff;
  text-align: center;
  font-size: 28rpx;
  box-shadow: 0 8rpx 32rpx rgba(102, 126, 234, 0.3);
}

.combo-demo {
  text-align: center;
}

.combo-container {
  margin-top: 40rpx;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20rpx;
  padding: 20rpx;
}

.combo-item {
  padding: 30rpx 20rpx;
  border-radius: 12rpx;
  color: #fff;
  text-align: center;
  font-size: 24rpx;
  
  &.item1 {
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  }
  
  &.item2 {
    background: linear-gradient(45deg, #4ecdc4, #44a08d);
  }
  
  &.item3 {
    background: linear-gradient(45deg, #45b7d1, #96c93d);
  }
  
  &.item4 {
    background: linear-gradient(45deg, #f093fb, #f5576c);
  }
}
</style>