<template>
  <view class="zx-delivery-time">
    <!-- 触发按钮 -->
    <view class="zx-delivery-time__trigger" @click="showPicker = true">
      <slot name="trigger">
        <view class="zx-delivery-time__trigger-default">
          <text class="zx-delivery-time__trigger-text">{{ displayText }}</text>
          <text class="zx-delivery-time__trigger-arrow">></text>
        </view>
      </slot>
    </view>

    <!-- 弹窗选择器 -->
    <view v-if="showPicker" class="zx-delivery-time__popup" @click="handleOverlayClick">
      <view class="zx-delivery-time__container" @click.stop>
        <!-- 标题栏 -->
        <view class="zx-delivery-time__header">
          <view class="zx-delivery-time__cancel" @click="handleCancel">取消</view>
          <view class="zx-delivery-time__title">{{ title }}</view>
          <view class="zx-delivery-time__confirm" @click="handleConfirm">确定</view>
        </view>

        <!-- 内容区域 -->
        <view class="zx-delivery-time__content">
          <!-- 左侧日期面板 -->
          <view class="zx-delivery-time__panel">
            <scroll-view scroll-y class="zx-delivery-time__panel-scroll">
              <view 
                v-for="(item, index) in dateList" 
                :key="index"
                class="zx-delivery-time__panel-item"
                :class="{ 'zx-delivery-time__panel-item--active': currentDateIndex === index }"
                @click="handleDateSelect(index)"
              >
                <text class="zx-delivery-time__panel-date">{{ item.date }}</text>
                <text class="zx-delivery-time__panel-week">{{ item.week }}</text>
              </view>
            </scroll-view>
          </view>

          <!-- 右侧时间详情 -->
          <view class="zx-delivery-time__detail">
            <scroll-view scroll-y class="zx-delivery-time__detail-scroll">
              <view class="zx-delivery-time__time-grid">
                <view 
                  v-for="(time, timeIndex) in currentTimeList"
                  :key="timeIndex"
                  class="zx-delivery-time__time-item"
                  :class="{ 
                    'zx-delivery-time__time-item--active': currentTimeIndex === timeIndex,
                    'zx-delivery-time__time-item--disabled': time.disabled
                  }"
                  @click="handleTimeSelect(timeIndex)"
                >
                  {{ time.text }}
                </view>
              </view>
            </scroll-view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// Props 定义
const props = defineProps({
  // 是否显示选择器
  visible: {
    type: Boolean,
    default: false
  },
  // 标题
  title: {
    type: String,
    default: '选择配送时间'
  },
  // 当前选中的日期索引
  currentKey: {
    type: [String, Number],
    default: 0
  },
  // 当前选中的时间数据
  currentTime: {
    type: Array,
    default: () => []
  },
  // 可选择的日期数量
  dateCount: {
    type: Number,
    default: 7
  },
  // 时间段配置
  timeSlots: {
    type: Array,
    default: () => [
      { start: '09:00', end: '12:00', text: '上午 09:00-12:00' },
      { start: '14:00', end: '18:00', text: '下午 14:00-18:00' },
      { start: '19:00', end: '21:00', text: '晚上 19:00-21:00' }
    ]
  },
  // 禁用的时间段
  disabledTimes: {
    type: Array,
    default: () => []
  },
  // 默认显示文本
  placeholder: {
    type: String,
    default: '请选择配送时间'
  }
})

// Emits 定义
const emit = defineEmits(['update:visible', 'select', 'change', 'cancel', 'confirm'])

// 响应式数据
const showPicker = ref(false)
const currentDateIndex = ref(0)
const currentTimeIndex = ref(-1)
const selectedDate = ref(null)
const selectedTime = ref(null)

// 计算属性
const dateList = computed(() => {
  const list = []
  const today = new Date()
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  
  for (let i = 0; i < props.dateCount; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    
    const month = date.getMonth() + 1
    const day = date.getDate()
    const week = weekDays[date.getDay()]
    
    let dateText = `${month}月${day}日`
    if (i === 0) {
      dateText = '今天'
    } else if (i === 1) {
      dateText = '明天'
    }
    
    list.push({
      date: dateText,
      week: week,
      value: `${date.getFullYear()}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      dateObj: new Date(date)
    })
  }
  
  return list
})

const currentTimeList = computed(() => {
  if (!dateList.value[currentDateIndex.value]) return []
  
  const currentDate = dateList.value[currentDateIndex.value]
  const isToday = currentDateIndex.value === 0
  const now = new Date()
  
  return props.timeSlots.map((slot, index) => {
    let disabled = false
    
    // 检查是否在禁用列表中
    const disabledKey = `${currentDate.value}_${index}`
    if (props.disabledTimes.includes(disabledKey)) {
      disabled = true
    }
    
    // 如果是今天，检查时间是否已过
    if (isToday && !disabled) {
      const [startHour, startMinute] = slot.start.split(':').map(Number)
      const slotTime = new Date()
      slotTime.setHours(startHour, startMinute, 0, 0)
      
      if (slotTime <= now) {
        disabled = true
      }
    }
    
    return {
      ...slot,
      disabled,
      index
    }
  })
})

const displayText = computed(() => {
  if (selectedDate.value && selectedTime.value) {
    return `${selectedDate.value.date} ${selectedTime.value.text}`
  }
  return props.placeholder
})

// 方法
const handleDateSelect = (index) => {
  currentDateIndex.value = index
  currentTimeIndex.value = -1
  emit('change', {
    dateIndex: index,
    date: dateList.value[index],
    timeIndex: -1,
    time: null
  })
}

const handleTimeSelect = (index) => {
  const timeItem = currentTimeList.value[index]
  if (timeItem.disabled) return
  
  currentTimeIndex.value = index
  emit('change', {
    dateIndex: currentDateIndex.value,
    date: dateList.value[currentDateIndex.value],
    timeIndex: index,
    time: timeItem
  })
}

const handleCancel = () => {
  showPicker.value = false
  emit('update:visible', false)
  emit('cancel')
}

const handleConfirm = () => {
  if (currentTimeIndex.value === -1) {
    uni.showToast({
      title: '请选择配送时间',
      icon: 'none'
    })
    return
  }
  
  const date = dateList.value[currentDateIndex.value]
  const time = currentTimeList.value[currentTimeIndex.value]
  
  selectedDate.value = date
  selectedTime.value = time
  
  showPicker.value = false
  emit('update:visible', false)
  emit('select', {
    date,
    time,
    dateIndex: currentDateIndex.value,
    timeIndex: currentTimeIndex.value
  })
  emit('confirm', {
    date,
    time,
    dateIndex: currentDateIndex.value,
    timeIndex: currentTimeIndex.value
  })
}

const handleOverlayClick = () => {
  showPicker.value = false
  emit('update:visible', false)
}

// 监听 visible 属性变化
watch(() => props.visible, (newVal) => {
  showPicker.value = newVal
})

watch(() => showPicker.value, (newVal) => {
  emit('update:visible', newVal)
})

// 初始化
onMounted(() => {
  if (props.currentKey !== undefined) {
    currentDateIndex.value = Number(props.currentKey)
  }
  
  if (props.currentTime && props.currentTime.length > 0) {
    const currentData = props.currentTime[0]
    if (currentData && currentData.list && currentData.list.length > 0) {
      // 根据传入的数据设置选中状态
      // 这里可以根据实际需求进行数据匹配
    }
  }
})
</script>

<style lang="scss" scoped>
.zx-delivery-time {
  width: 100%;
  
  &__trigger {
    width: 100%;
    
    &-default {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24rpx 32rpx;
      background-color: #fff;
      border-radius: 16rpx;
      border: 2rpx solid #e5e5e5;
    }
    
    &-text {
      font-size: 28rpx;
      color: #333;
    }
    
    &-arrow {
      font-size: 24rpx;
      color: #999;
      transform: rotate(90deg);
    }
  }
  
  &__popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    align-items: flex-end;
  }
  
  &__container {
    width: 100%;
    background-color: #fff;
    border-radius: 32rpx 32rpx 0 0;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
  }
  
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32rpx;
    border-bottom: 2rpx solid #f5f5f5;
  }
  
  &__cancel,
  &__confirm {
    font-size: 28rpx;
    padding: 16rpx 24rpx;
  }
  
  &__cancel {
    color: #999;
  }
  
  &__confirm {
    color: #007aff;
  }
  
  &__title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
  }
  
  &__content {
    display: flex;
    flex: 1;
    min-height: 600rpx;
  }
  
  &__panel {
    width: 280rpx;
    background-color: #f8f8f8;
    
    &-scroll {
      height: 600rpx;
    }
    
    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 32rpx 24rpx;
      border-bottom: 2rpx solid #f0f0f0;
      
      &--active {
        background-color: #fff;
        
        .zx-delivery-time__panel-date {
          color: #007aff;
        }
      }
    }
    
    &-date {
      font-size: 28rpx;
      color: #333;
      margin-bottom: 8rpx;
    }
    
    &-week {
      font-size: 24rpx;
      color: #999;
    }
  }
  
  &__detail {
    flex: 1;
    padding: 32rpx;
    
    &-scroll {
      height: 600rpx;
    }
  }
  
  &__time-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 24rpx;
  }
  
  &__time-item {
    flex: 0 0 calc(50% - 12rpx);
    padding: 24rpx 16rpx;
    background-color: #f8f8f8;
    border-radius: 16rpx;
    text-align: center;
    font-size: 26rpx;
    color: #333;
    
    &--active {
      background-color: #007aff;
      color: #fff;
    }
    
    &--disabled {
      background-color: #f0f0f0;
      color: #ccc;
    }
  }
}
</style>