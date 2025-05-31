<template>
  <view class="delivery-time-demo">
    <zx-navbar title="配送时间选择" />
    
    <view class="demo-section">
      <view class="demo-title">基础用法</view>
      <view class="demo-content">
        <zx-delivery-time 
          v-model:visible="showBasic"
          @select="handleBasicSelect"
          @change="handleBasicChange"
        />
        <view class="result-text" v-if="basicResult">
          选择结果：{{ basicResult }}
        </view>
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">自定义标题</view>
      <view class="demo-content">
        <zx-delivery-time 
          v-model:visible="showCustomTitle"
          title="请选择送达时间"
          placeholder="点击选择送达时间"
          @select="handleCustomTitleSelect"
        />
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">自定义时间段</view>
      <view class="demo-content">
        <zx-delivery-time 
          v-model:visible="showCustomTime"
          :time-slots="customTimeSlots"
          @select="handleCustomTimeSelect"
        />
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">禁用特定时间段</view>
      <view class="demo-content">
        <zx-delivery-time 
          v-model:visible="showDisabled"
          :disabled-times="disabledTimes"
          @select="handleDisabledSelect"
        />
        <view class="tip-text">
          提示：今天的第一个时间段和明天的第二个时间段已被禁用
        </view>
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">自定义触发器</view>
      <view class="demo-content">
        <zx-delivery-time 
          v-model:visible="showCustomTrigger"
          @select="handleCustomTriggerSelect"
        >
          <template #trigger>
            <view class="custom-trigger" @click="showCustomTrigger = true">
              <view class="custom-trigger-icon">📅</view>
              <view class="custom-trigger-text">
                {{ customTriggerResult || '点击选择配送时间' }}
              </view>
              <view class="custom-trigger-arrow">→</view>
            </view>
          </template>
        </zx-delivery-time>
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">更多日期选择</view>
      <view class="demo-content">
        <zx-delivery-time 
          v-model:visible="showMoreDates"
          :date-count="14"
          @select="handleMoreDatesSelect"
        />
        <view class="tip-text">
          提示：可选择未来14天的配送时间
        </view>
      </view>
    </view>

    <view class="demo-section">
      <view class="demo-title">事件监听</view>
      <view class="demo-content">
        <zx-delivery-time 
          v-model:visible="showEvents"
          @select="handleEventsSelect"
          @change="handleEventsChange"
          @cancel="handleEventsCancel"
          @confirm="handleEventsConfirm"
        />
        <view class="event-logs">
          <view class="event-title">事件日志：</view>
          <view 
            v-for="(log, index) in eventLogs" 
            :key="index" 
            class="event-log"
          >
            {{ log }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import zxNavbar from '@/components/zx-navbar/zx-navbar.vue'
import zxDeliveryTime from '@/components/zx-delivery-time/zx-delivery-time.vue'

// 基础用法
const showBasic = ref(false)
const basicResult = ref('')

const handleBasicSelect = (data) => {
  basicResult.value = `${data.date.date} ${data.time.text}`
  console.log('基础选择结果:', data)
}

const handleBasicChange = (data) => {
  console.log('基础选择变化:', data)
}

// 自定义标题
const showCustomTitle = ref(false)

const handleCustomTitleSelect = (data) => {
  uni.showToast({
    title: `已选择：${data.date.date} ${data.time.text}`,
    icon: 'none'
  })
}

// 自定义时间段
const showCustomTime = ref(false)
const customTimeSlots = [
  { start: '08:00', end: '10:00', text: '早上 08:00-10:00' },
  { start: '10:00', end: '12:00', text: '上午 10:00-12:00' },
  { start: '12:00', end: '14:00', text: '中午 12:00-14:00' },
  { start: '14:00', end: '16:00', text: '下午 14:00-16:00' },
  { start: '16:00', end: '18:00', text: '下午 16:00-18:00' },
  { start: '18:00', end: '20:00', text: '晚上 18:00-20:00' },
  { start: '20:00', end: '22:00', text: '晚上 20:00-22:00' }
]

const handleCustomTimeSelect = (data) => {
  uni.showToast({
    title: `自定义时间：${data.date.date} ${data.time.text}`,
    icon: 'none'
  })
}

// 禁用特定时间段
const showDisabled = ref(false)
const disabledTimes = computed(() => {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`
  
  return [
    `${todayStr}_0`,    // 今天第一个时间段
    `${tomorrowStr}_1`  // 明天第二个时间段
  ]
})

const handleDisabledSelect = (data) => {
  uni.showToast({
    title: `已选择：${data.date.date} ${data.time.text}`,
    icon: 'none'
  })
}

// 自定义触发器
const showCustomTrigger = ref(false)
const customTriggerResult = ref('')

const handleCustomTriggerSelect = (data) => {
  customTriggerResult.value = `${data.date.date} ${data.time.text}`
}

// 更多日期选择
const showMoreDates = ref(false)

const handleMoreDatesSelect = (data) => {
  uni.showToast({
    title: `选择了：${data.date.date} ${data.time.text}`,
    icon: 'none'
  })
}

// 事件监听
const showEvents = ref(false)
const eventLogs = ref([])

const addEventLog = (event, data = null) => {
  const time = new Date().toLocaleTimeString()
  let logText = `[${time}] ${event}`
  
  if (data) {
    if (data.date && data.time) {
      logText += `: ${data.date.date} ${data.time.text}`
    } else if (data.date) {
      logText += `: 选择了${data.date.date}`
    }
  }
  
  eventLogs.value.unshift(logText)
  
  // 只保留最近10条日志
  if (eventLogs.value.length > 10) {
    eventLogs.value = eventLogs.value.slice(0, 10)
  }
}

const handleEventsSelect = (data) => {
  addEventLog('select事件', data)
}

const handleEventsChange = (data) => {
  addEventLog('change事件', data)
}

const handleEventsCancel = () => {
  addEventLog('cancel事件')
}

const handleEventsConfirm = (data) => {
  addEventLog('confirm事件', data)
}
</script>

<style lang="scss" scoped>
.delivery-time-demo {
  padding: 32rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.demo-section {
  margin-bottom: 48rpx;
  background-color: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.demo-title {
  padding: 32rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  background-color: #f8f9fa;
  border-bottom: 2rpx solid #e9ecef;
}

.demo-content {
  padding: 32rpx;
}

.result-text {
  margin-top: 24rpx;
  padding: 24rpx;
  background-color: #f0f9ff;
  border-radius: 12rpx;
  font-size: 28rpx;
  color: #0369a1;
  border: 2rpx solid #bae6fd;
}

.tip-text {
  margin-top: 16rpx;
  font-size: 24rpx;
  color: #666;
  line-height: 1.5;
}

.custom-trigger {
  display: flex;
  align-items: center;
  padding: 32rpx;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16rpx;
  color: #fff;
  
  &-icon {
    font-size: 32rpx;
    margin-right: 16rpx;
  }
  
  &-text {
    flex: 1;
    font-size: 28rpx;
  }
  
  &-arrow {
    font-size: 24rpx;
    opacity: 0.8;
  }
}

.event-logs {
  margin-top: 24rpx;
  padding: 24rpx;
  background-color: #f8f9fa;
  border-radius: 12rpx;
  max-height: 400rpx;
  overflow-y: auto;
}

.event-title {
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
}

.event-log {
  font-size: 24rpx;
  color: #666;
  line-height: 1.6;
  margin-bottom: 8rpx;
  padding: 8rpx 12rpx;
  background-color: #fff;
  border-radius: 8rpx;
  border-left: 6rpx solid #007aff;
  
  &:last-child {
    margin-bottom: 0;
  }
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .delivery-time-demo {
    padding: 24rpx;
  }
  
  .demo-content {
    padding: 24rpx;
  }
  
  .demo-title {
    padding: 24rpx;
    font-size: 30rpx;
  }
}
</style>