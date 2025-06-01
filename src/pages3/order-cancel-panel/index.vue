<template>
  <view class="container">
    <view class="header">
      <text class="title">OrderCancelPanel 订单取消面板</text>
      <text class="description">用于订单取消的底部弹出面板，支持多种取消原因选择</text>
    </view>
    
    <view class="demo-section">
      <view class="section-title">基础用法</view>
      <view class="section-desc">最简单的用法，使用默认的取消原因列表</view>
      <view class="button-group">
        <zx-button type="primary" @click="basicVisible = true">打开取消面板</zx-button>
      </view>
    </view>
    
    <view class="demo-section">
      <view class="section-title">自定义取消原因</view>
      <view class="section-desc">可以自定义取消原因列表</view>
      <view class="button-group">
        <zx-button type="primary" @click="customVisible = true">自定义原因列表</zx-button>
      </view>
    </view>
    
    <view class="demo-section">
      <view class="section-title">加载状态</view>
      <view class="section-desc">提交时显示加载状态</view>
      <view class="button-group">
        <zx-button type="primary" @click="loadingVisible = true">带加载状态</zx-button>
      </view>
    </view>
    
    <view class="demo-section">
      <view class="section-title">自定义文案</view>
      <view class="section-desc">自定义标题、按钮文字等</view>
      <view class="button-group">
        <zx-button type="primary" @click="customTextVisible = true">自定义文案</zx-button>
      </view>
    </view>
    
    <view class="demo-section">
      <view class="section-title">禁用遮罩关闭</view>
      <view class="section-desc">点击遮罩不关闭面板</view>
      <view class="button-group">
        <zx-button type="primary" @click="noOverlayVisible = true">禁用遮罩关闭</zx-button>
      </view>
    </view>
    
    <view class="demo-section">
      <view class="section-title">事件监听</view>
      <view class="section-desc">监听各种事件</view>
      <view class="button-group">
        <zx-button type="primary" @click="eventVisible = true">事件监听示例</zx-button>
      </view>
      <view v-if="eventLog.length > 0" class="event-log">
        <view class="event-log-title">事件日志：</view>
        <view 
          v-for="(log, index) in eventLog" 
          :key="index" 
          class="event-log-item"
        >
          {{ log }}
        </view>
      </view>
    </view>
    
    <!-- 基础用法 -->
    <zx-order-cancel-panel
      v-model="basicVisible"
      @confirm="handleBasicConfirm"
      @cancel="handleCancel"
    />
    
    <!-- 自定义取消原因 -->
    <zx-order-cancel-panel
      v-model="customVisible"
      :reason-list="customReasons"
      @confirm="handleCustomConfirm"
      @cancel="handleCancel"
    />
    
    <!-- 加载状态 -->
    <zx-order-cancel-panel
      v-model="loadingVisible"
      :loading="isLoading"
      @confirm="handleLoadingConfirm"
      @cancel="handleCancel"
    />
    
    <!-- 自定义文案 -->
    <zx-order-cancel-panel
      v-model="customTextVisible"
      title="申请退款"
      subtitle="请选择退款原因"
      cancel-text="暂不退款"
      confirm-text="申请退款"
      other-placeholder="请详细描述退款原因..."
      primary-color="#ff6b35"
      @confirm="handleCustomTextConfirm"
      @cancel="handleCancel"
    />
    
    <!-- 禁用遮罩关闭 -->
    <zx-order-cancel-panel
      v-model="noOverlayVisible"
      :close-on-click-overlay="false"
      @confirm="handleNoOverlayConfirm"
      @cancel="handleCancel"
      @close="handleClose"
    />
    
    <!-- 事件监听 -->
    <zx-order-cancel-panel
      v-model="eventVisible"
      @confirm="handleEventConfirm"
      @cancel="handleEventCancel"
      @close="handleEventClose"
      @reason-change="handleReasonChange"
    />
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const basicVisible = ref(false)
const customVisible = ref(false)
const loadingVisible = ref(false)
const customTextVisible = ref(false)
const noOverlayVisible = ref(false)
const eventVisible = ref(false)
const isLoading = ref(false)
const eventLog = ref([])

// 自定义取消原因
const customReasons = [
  { text: '商品质量问题', value: 'quality_issue' },
  { text: '发货时间太长', value: 'delivery_delay' },
  { text: '商品描述不符', value: 'description_mismatch' },
  { text: '价格变动', value: 'price_change' },
  { text: '找到更优惠的', value: 'found_cheaper' },
  { text: '其他原因', value: 'other' }
]

// 事件处理函数
const handleBasicConfirm = (result) => {
  console.log('基础用法 - 确认取消:', result)
  uni.showToast({
    title: `已选择: ${result.reason.text}`,
    icon: 'none'
  })
  basicVisible.value = false
}

const handleCustomConfirm = (result) => {
  console.log('自定义原因 - 确认取消:', result)
  uni.showToast({
    title: `已选择: ${result.reason.text}`,
    icon: 'none'
  })
  customVisible.value = false
}

const handleLoadingConfirm = (result) => {
  console.log('加载状态 - 确认取消:', result)
  isLoading.value = true
  
  // 模拟API调用
  setTimeout(() => {
    isLoading.value = false
    loadingVisible.value = false
    uni.showToast({
      title: '订单取消成功',
      icon: 'success'
    })
  }, 2000)
}

const handleCustomTextConfirm = (result) => {
  console.log('自定义文案 - 确认退款:', result)
  uni.showToast({
    title: '退款申请已提交',
    icon: 'success'
  })
  customTextVisible.value = false
}

const handleNoOverlayConfirm = (result) => {
  console.log('禁用遮罩 - 确认取消:', result)
  uni.showToast({
    title: `已选择: ${result.reason.text}`,
    icon: 'none'
  })
  noOverlayVisible.value = false
}

const handleEventConfirm = (result) => {
  addEventLog(`确认取消 - 原因: ${result.reason.text}${result.otherReason ? `, 详情: ${result.otherReason}` : ''}`)
  eventVisible.value = false
}

const handleCancel = () => {
  console.log('用户取消操作')
  uni.showToast({
    title: '已取消',
    icon: 'none'
  })
}

const handleClose = () => {
  console.log('面板关闭')
}

const handleEventCancel = () => {
  addEventLog('用户点击取消按钮')
}

const handleEventClose = () => {
  addEventLog('面板关闭')
}

const handleReasonChange = (data) => {
  const logText = `选择原因变化 - ${data.reason.text}${data.otherReason ? ` (${data.otherReason})` : ''}`
  addEventLog(logText)
}

const addEventLog = (message) => {
  const timestamp = new Date().toLocaleTimeString()
  eventLog.value.unshift(`[${timestamp}] ${message}`)
  
  // 限制日志数量
  if (eventLog.value.length > 10) {
    eventLog.value = eventLog.value.slice(0, 10)
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 32rpx;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.header {
  margin-bottom: 48rpx;
  
  .title {
    display: block;
    font-size: 48rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 16rpx;
  }
  
  .description {
    display: block;
    font-size: 28rpx;
    color: #666;
    line-height: 1.5;
  }
}

.demo-section {
  margin-bottom: 48rpx;
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  
  .section-title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 16rpx;
  }
  
  .section-desc {
    font-size: 26rpx;
    color: #666;
    margin-bottom: 32rpx;
    line-height: 1.5;
  }
  
  .button-group {
    display: flex;
    gap: 24rpx;
    flex-wrap: wrap;
  }
}

.event-log {
  margin-top: 32rpx;
  padding: 24rpx;
  background-color: #f5f5f5;
  border-radius: 12rpx;
  
  .event-log-title {
    font-size: 28rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 16rpx;
  }
  
  .event-log-item {
    font-size: 24rpx;
    color: #666;
    line-height: 1.4;
    margin-bottom: 8rpx;
    padding: 8rpx 12rpx;
    background-color: #fff;
    border-radius: 8rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

/* 适配暗黑模式 */
@media (prefers-color-scheme: dark) {
  .container {
    background-color: #000;
  }
  
  .header {
    .title {
      color: #fff;
    }
    
    .description {
      color: #999;
    }
  }
  
  .demo-section {
    background-color: #1c1c1e;
    
    .section-title {
      color: #fff;
    }
    
    .section-desc {
      color: #999;
    }
  }
  
  .event-log {
    background-color: #2c2c2e;
    
    .event-log-title {
      color: #fff;
    }
    
    .event-log-item {
      background-color: #1c1c1e;
      color: #999;
    }
  }
}
</style>