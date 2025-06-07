<template>
  <view :class="[
    'zx-coupon-item',
    {
      'zx-coupon-item--disabled': disabled,
      'zx-coupon-item--chosen': chosen
    }
  ]" @click="handleClick">
    <!-- 优惠券主体 -->
    <view class="zx-coupon-item__content">
      <!-- 左侧金额区域 -->
      <view class="zx-coupon-item__head">
        <view class="zx-coupon-item__amount">
          <text class="zx-coupon-item__currency">{{ currency }}</text>
          <text class="zx-coupon-item__value">{{ formatValue }}</text>
        </view>
        <text class="zx-coupon-item__condition">{{ coupon.condition || '无门槛' }}</text>
      </view>

      <!-- 右侧信息区域 -->
      <view class="zx-coupon-item__body">
        <text class="zx-coupon-item__name">{{ coupon.name || '优惠券' }}</text>
        <text class="zx-coupon-item__description">{{ formatDescription }}</text>
        <text v-if="disabled && coupon.reason" class="zx-coupon-item__reason">
          {{ coupon.reason }}
        </text>
      </view>

      <!-- 选中状态 -->
      <view v-if="!disabled" class="zx-coupon-item__corner">
        <view v-if="chosen" class="zx-coupon-item__check">
          <text class="zx-coupon-item__check-icon">✓</text>
        </view>
      </view>
    </view>

    <!-- 锯齿边 -->
    <view class="zx-coupon-item__border">
      <view v-for="n in 12" :key="n" class="zx-coupon-item__dot"></view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 优惠券信息
  coupon: {
    type: Object,
    required: true,
    default: () => ({})
  },
  // 是否被选中
  chosen: {
    type: Boolean,
    default: false
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 货币符号
  currency: {
    type: String,
    default: '¥'
  }
})

const emit = defineEmits(['click'])

// 计算属性
const formatValue = computed(() => {
  const { value, valueDesc } = props.coupon
  if (valueDesc) {
    return valueDesc
  }
  if (typeof value === 'number') {
    // 如果是分为单位，转换为元
    return (value / 100).toFixed(value % 100 === 0 ? 0 : 2)
  }
  return value || '0'
})

const formatDescription = computed(() => {
  const { description, startAt, endAt } = props.coupon

  if (description) {
    return description
  }

  if (startAt && endAt) {
    const startDate = new Date(startAt * 1000)
    const endDate = new Date(endAt * 1000)
    const formatDate = (date) => {
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}.${month}.${day}`
    }
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }

  return ''
})

// 方法
const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<style lang="scss" scoped>
.zx-coupon-item {
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.zx-coupon-item--disabled {
  opacity: 0.6;
  background-color: #f7f8fa;
}

.zx-coupon-item--chosen {
  border: 1px solid #ee0a24;
}

.zx-coupon-item__content {
  display: flex;
  align-items: center;
  padding: 16px;
  min-height: 84px;
}

.zx-coupon-item__head {
  width: 96px;
  text-align: center;
  border-right: 1px dashed #ebedf0;
  padding-right: 16px;
  margin-right: 16px;
}

.zx-coupon-item__amount {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 6px;
}

.zx-coupon-item__currency {
  font-size: 12px;
  color: #ee0a24;
  margin-right: 2px;
}

.zx-coupon-item__value {
  font-size: 30px;
  font-weight: 500;
  color: #ee0a24;
  line-height: 1;
}

.zx-coupon-item--disabled .zx-coupon-item__currency,
.zx-coupon-item--disabled .zx-coupon-item__value {
  color: #969799;
}

.zx-coupon-item__condition {
  font-size: 12px;
  color: #969799;
  line-height: 16px;
  white-space: pre-line;
  text-align: center;
}

.zx-coupon-item__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.zx-coupon-item__name {
  font-size: 14px;
  font-weight: 500;
  color: #323233;
  line-height: 20px;
  margin-bottom: 4px;
}

.zx-coupon-item--disabled .zx-coupon-item__name {
  color: #969799;
}

.zx-coupon-item__description {
  font-size: 12px;
  color: #969799;
  line-height: 16px;
}

.zx-coupon-item__reason {
  font-size: 12px;
  color: #ee0a24;
  line-height: 16px;
  margin-top: 4px;
}

.zx-coupon-item__corner {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
}

.zx-coupon-item__check {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background-color: #ee0a24;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zx-coupon-item__check-icon {
  color: #fff;
  font-size: 12px;
  font-weight: bold;
}

.zx-coupon-item__border {
  position: absolute;
  top: 0;
  left: 112px;
  bottom: 0;
  width: 1px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 8px 0;
}

.zx-coupon-item__dot {
  width: 4px;
  height: 4px;
  background-color: #ebedf0;
  border-radius: 50%;
}

.zx-coupon-item--disabled .zx-coupon-item__dot {
  background-color: #c8c9cc;
}
</style>