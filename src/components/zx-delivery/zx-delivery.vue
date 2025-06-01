<template>
  <view 
    :class="[
      'zx-delivery',
      customClass
    ]"
    :style="[customStyle]"
  >
    <!-- 配送方式选择 -->
    <view class="zx-delivery__section">
      <view class="zx-delivery__title">配送方式</view>
      <view class="zx-delivery__methods">
        <view 
          v-for="method in deliveryMethods" 
          :key="method.value"
          :class="[
            'zx-delivery__method',
            {
              'zx-delivery__method--active': selectedMethod === method.value,
              'zx-delivery__method--disabled': method.disabled
            }
          ]"
          @click="handleMethodSelect(method)"
        >
          <view class="zx-delivery__method-icon">
            <zx-icon 
              :name="method.icon" 
              :size="iconSize"
              :color="selectedMethod === method.value ? activeColor : iconColor"
            />
          </view>
          <view class="zx-delivery__method-content">
            <view class="zx-delivery__method-name">{{ method.name }}</view>
            <view class="zx-delivery__method-desc">{{ method.desc }}</view>
            <view v-if="method.price" class="zx-delivery__method-price">
              {{ formatPrice(method.price) }}
            </view>
          </view>
          <view class="zx-delivery__method-radio">
            <zx-icon 
              :name="selectedMethod === method.value ? 'radio-checked' : 'radio-unchecked'"
              :size="radioSize"
              :color="selectedMethod === method.value ? activeColor : '#c8c9cc'"
            />
          </view>
        </view>
      </view>
    </view>

    <!-- 配送时间选择 -->
    <view v-if="showTimeSelect && selectedMethod" class="zx-delivery__section">
      <view class="zx-delivery__title">配送时间</view>
      <view class="zx-delivery__times">
        <view 
          v-for="time in availableTimes" 
          :key="time.value"
          :class="[
            'zx-delivery__time',
            {
              'zx-delivery__time--active': selectedTime === time.value,
              'zx-delivery__time--disabled': time.disabled
            }
          ]"
          @click="handleTimeSelect(time)"
        >
          <view class="zx-delivery__time-label">{{ time.label }}</view>
          <view v-if="time.desc" class="zx-delivery__time-desc">{{ time.desc }}</view>
        </view>
      </view>
    </view>

    <!-- 配送地址 -->
    <view v-if="showAddress && selectedMethod" class="zx-delivery__section">
      <view class="zx-delivery__title">配送地址</view>
      <view 
        class="zx-delivery__address"
        @click="handleAddressSelect"
      >
        <view v-if="selectedAddress" class="zx-delivery__address-content">
          <view class="zx-delivery__address-info">
            <view class="zx-delivery__address-name">{{ selectedAddress.name }} {{ selectedAddress.phone }}</view>
            <view class="zx-delivery__address-detail">{{ selectedAddress.detail }}</view>
          </view>
          <zx-icon name="arrow-right" size="32" color="#c8c9cc" />
        </view>
        <view v-else class="zx-delivery__address-placeholder">
          <zx-icon name="location" size="32" color="#c8c9cc" />
          <text class="zx-delivery__address-text">请选择配送地址</text>
          <zx-icon name="arrow-right" size="32" color="#c8c9cc" />
        </view>
      </view>
    </view>

    <!-- 配送备注 -->
    <view v-if="showRemark && selectedMethod" class="zx-delivery__section">
      <view class="zx-delivery__title">配送备注</view>
      <view class="zx-delivery__remark">
        <zx-textarea 
          v-model="deliveryRemark"
          :placeholder="remarkPlaceholder"
          :maxlength="remarkMaxlength"
          :rows="remarkRows"
          auto-height
          @input="handleRemarkChange"
        />
      </view>
    </view>

    <!-- 配送费用明细 -->
    <view v-if="showFeeDetail && selectedMethodInfo" class="zx-delivery__section">
      <view class="zx-delivery__title">费用明细</view>
      <view class="zx-delivery__fee-detail">
        <view class="zx-delivery__fee-item">
          <text class="zx-delivery__fee-label">配送费</text>
          <text class="zx-delivery__fee-value">{{ formatPrice(selectedMethodInfo.price || 0) }}</text>
        </view>
        <view v-if="extraFee > 0" class="zx-delivery__fee-item">
          <text class="zx-delivery__fee-label">{{ extraFeeLabel }}</text>
          <text class="zx-delivery__fee-value">{{ formatPrice(extraFee) }}</text>
        </view>
        <view class="zx-delivery__fee-total">
          <text class="zx-delivery__fee-label">总计</text>
          <text class="zx-delivery__fee-value zx-delivery__fee-value--total">
            {{ formatPrice(totalFee) }}
          </text>
        </view>
      </view>
    </view>

    <!-- 自定义插槽 -->
    <slot />
  </view>
</template>

<script setup>
import { ref, reactive, computed, watch, nextTick } from 'vue'
import zxIcon from '../zx-icon/zx-icon.vue'
import zxTextarea from '../zx-textarea/zx-textarea.vue'

const props = defineProps({
  // 配送方式列表
  deliveryMethods: {
    type: Array,
    default: () => [
      {
        value: 'express',
        name: '快递配送',
        desc: '3-5个工作日送达',
        icon: 'truck',
        price: 10,
        disabled: false
      },
      {
        value: 'same-day',
        name: '当日达',
        desc: '当日18:00前送达',
        icon: 'clock',
        price: 20,
        disabled: false
      },
      {
        value: 'pickup',
        name: '到店自提',
        desc: '免配送费',
        icon: 'shop',
        price: 0,
        disabled: false
      }
    ]
  },
  
  // 配送时间选项
  deliveryTimes: {
    type: Array,
    default: () => [
      {
        value: 'morning',
        label: '上午',
        desc: '09:00-12:00',
        disabled: false
      },
      {
        value: 'afternoon',
        label: '下午',
        desc: '13:00-18:00',
        disabled: false
      },
      {
        value: 'evening',
        label: '晚上',
        desc: '18:00-21:00',
        disabled: false
      }
    ]
  },
  
  // 默认选中的配送方式
  modelValue: {
    type: String,
    default: ''
  },
  
  // 默认选中的配送时间
  defaultTime: {
    type: String,
    default: ''
  },
  
  // 配送地址
  address: {
    type: Object,
    default: () => null
  },
  
  // 配送备注
  remark: {
    type: String,
    default: ''
  },
  
  // 显示控制
  showTimeSelect: {
    type: Boolean,
    default: true
  },
  showAddress: {
    type: Boolean,
    default: true
  },
  showRemark: {
    type: Boolean,
    default: true
  },
  showFeeDetail: {
    type: Boolean,
    default: true
  },
  
  // 样式配置
  iconSize: {
    type: [Number, String],
    default: 40
  },
  radioSize: {
    type: [Number, String],
    default: 36
  },
  activeColor: {
    type: String,
    default: '#1989fa'
  },
  iconColor: {
    type: String,
    default: '#969799'
  },
  
  // 备注配置
  remarkPlaceholder: {
    type: String,
    default: '请输入配送备注（选填）'
  },
  remarkMaxlength: {
    type: [Number, String],
    default: 200
  },
  remarkRows: {
    type: [Number, String],
    default: 3
  },
  
  // 额外费用
  extraFee: {
    type: [Number, String],
    default: 0
  },
  extraFeeLabel: {
    type: String,
    default: '加急费'
  },
  
  // 价格格式化
  pricePrefix: {
    type: String,
    default: '¥'
  },
  
  // 自定义样式
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: [Object, String],
    default: () => ({})
  }
})

const emit = defineEmits([
  'update:modelValue',
  'change',
  'method-change',
  'time-change',
  'address-select',
  'remark-change'
])

// 选中的配送方式
const selectedMethod = ref(props.modelValue)

// 选中的配送时间
const selectedTime = ref(props.defaultTime)

// 选中的配送地址
const selectedAddress = ref(props.address)

// 配送备注
const deliveryRemark = ref(props.remark)

// 计算属性
const selectedMethodInfo = computed(() => {
  return props.deliveryMethods.find(method => method.value === selectedMethod.value)
})

const availableTimes = computed(() => {
  if (!selectedMethodInfo.value) return []
  
  // 根据配送方式过滤可用时间
  if (selectedMethodInfo.value.value === 'pickup') {
    // 自提可能有不同的时间选项
    return props.deliveryTimes.filter(time => time.value !== 'evening')
  }
  
  return props.deliveryTimes
})

const totalFee = computed(() => {
  const methodPrice = selectedMethodInfo.value?.price || 0
  const extra = Number(props.extraFee) || 0
  return methodPrice + extra
})

// 方法
const formatPrice = (price) => {
  const num = Number(price) || 0
  return `${props.pricePrefix}${num.toFixed(2)}`
}

const handleMethodSelect = (method) => {
  if (method.disabled) return
  
  selectedMethod.value = method.value
  emit('update:modelValue', method.value)
  emit('method-change', method)
  
  // 如果是自提，清空配送时间
  if (method.value === 'pickup') {
    selectedTime.value = ''
    emit('time-change', '')
  }
  
  emitChange()
}

const handleTimeSelect = (time) => {
  if (time.disabled) return
  
  selectedTime.value = time.value
  emit('time-change', time)
  emitChange()
}

const handleAddressSelect = () => {
  emit('address-select')
}

const handleRemarkChange = (value) => {
  deliveryRemark.value = value
  emit('remark-change', value)
  emitChange()
}

const emitChange = () => {
  const data = {
    method: selectedMethod.value,
    methodInfo: selectedMethodInfo.value,
    time: selectedTime.value,
    address: selectedAddress.value,
    remark: deliveryRemark.value,
    totalFee: totalFee.value
  }
  
  emit('change', data)
}

// 监听外部数据变化
watch(() => props.modelValue, (newVal) => {
  selectedMethod.value = newVal
})

watch(() => props.defaultTime, (newVal) => {
  selectedTime.value = newVal
})

watch(() => props.address, (newVal) => {
  selectedAddress.value = newVal
}, { deep: true })

watch(() => props.remark, (newVal) => {
  deliveryRemark.value = newVal
})

// 暴露方法
defineExpose({
  getDeliveryData: () => ({
    method: selectedMethod.value,
    methodInfo: selectedMethodInfo.value,
    time: selectedTime.value,
    address: selectedAddress.value,
    remark: deliveryRemark.value,
    totalFee: totalFee.value
  }),
  setMethod: (value) => {
    const method = props.deliveryMethods.find(m => m.value === value)
    if (method) {
      handleMethodSelect(method)
    }
  },
  setTime: (value) => {
    const time = props.deliveryTimes.find(t => t.value === value)
    if (time) {
      handleTimeSelect(time)
    }
  },
  setAddress: (address) => {
    selectedAddress.value = address
    emitChange()
  },
  setRemark: (remark) => {
    deliveryRemark.value = remark
    emitChange()
  }
})
</script>

<style lang="scss" scoped>
.zx-delivery {
  background-color: var(--zx-delivery-bg-color, #f8f9fa);
  
  &__section {
    background-color: var(--zx-delivery-section-bg, #fff);
    margin-bottom: var(--zx-delivery-section-margin, 20rpx);
    padding: var(--zx-delivery-padding, 32rpx);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__title {
    font-size: var(--zx-delivery-title-size, 32rpx);
    font-weight: var(--zx-delivery-title-weight, 600);
    color: var(--zx-delivery-title-color, #323233);
    margin-bottom: var(--zx-delivery-title-margin, 24rpx);
  }
  
  &__methods {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
  }
  
  &__method {
    display: flex;
    align-items: center;
    padding: 24rpx;
    border: 2rpx solid var(--zx-delivery-method-border, #ebedf0);
    border-radius: var(--zx-delivery-method-radius, 16rpx);
    background-color: var(--zx-delivery-method-bg, #fff);
    transition: all 0.3s ease;
    
    &--active {
      border-color: var(--zx-delivery-active-color, #1989fa);
      background-color: var(--zx-delivery-active-bg, #f0f8ff);
    }
    
    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &:not(&--disabled):active {
      transform: scale(0.98);
    }
  }
  
  &__method-icon {
    margin-right: 24rpx;
  }
  
  &__method-content {
    flex: 1;
    min-width: 0;
  }
  
  &__method-name {
    font-size: var(--zx-delivery-method-name-size, 30rpx);
    font-weight: var(--zx-delivery-method-name-weight, 500);
    color: var(--zx-delivery-method-name-color, #323233);
    margin-bottom: 8rpx;
  }
  
  &__method-desc {
    font-size: var(--zx-delivery-method-desc-size, 26rpx);
    color: var(--zx-delivery-method-desc-color, #969799);
    margin-bottom: 8rpx;
  }
  
  &__method-price {
    font-size: var(--zx-delivery-method-price-size, 28rpx);
    font-weight: var(--zx-delivery-method-price-weight, 600);
    color: var(--zx-delivery-price-color, #ee0a24);
  }
  
  &__method-radio {
    margin-left: 24rpx;
  }
  
  &__times {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200rpx, 1fr));
    gap: 16rpx;
  }
  
  &__time {
    padding: 24rpx;
    border: 2rpx solid var(--zx-delivery-time-border, #ebedf0);
    border-radius: var(--zx-delivery-time-radius, 12rpx);
    background-color: var(--zx-delivery-time-bg, #fff);
    text-align: center;
    transition: all 0.3s ease;
    
    &--active {
      border-color: var(--zx-delivery-active-color, #1989fa);
      background-color: var(--zx-delivery-active-bg, #f0f8ff);
    }
    
    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    &:not(&--disabled):active {
      transform: scale(0.95);
    }
  }
  
  &__time-label {
    font-size: var(--zx-delivery-time-label-size, 28rpx);
    font-weight: var(--zx-delivery-time-label-weight, 500);
    color: var(--zx-delivery-time-label-color, #323233);
    margin-bottom: 8rpx;
  }
  
  &__time-desc {
    font-size: var(--zx-delivery-time-desc-size, 24rpx);
    color: var(--zx-delivery-time-desc-color, #969799);
  }
  
  &__address {
    border: 2rpx solid var(--zx-delivery-address-border, #ebedf0);
    border-radius: var(--zx-delivery-address-radius, 12rpx);
    background-color: var(--zx-delivery-address-bg, #fff);
    transition: all 0.3s ease;
    
    &:active {
      background-color: var(--zx-delivery-address-active-bg, #f8f9fa);
    }
  }
  
  &__address-content,
  &__address-placeholder {
    display: flex;
    align-items: center;
    padding: 24rpx;
  }
  
  &__address-info {
    flex: 1;
    min-width: 0;
  }
  
  &__address-name {
    font-size: var(--zx-delivery-address-name-size, 28rpx);
    font-weight: var(--zx-delivery-address-name-weight, 500);
    color: var(--zx-delivery-address-name-color, #323233);
    margin-bottom: 8rpx;
  }
  
  &__address-detail {
    font-size: var(--zx-delivery-address-detail-size, 26rpx);
    color: var(--zx-delivery-address-detail-color, #969799);
    line-height: 1.4;
  }
  
  &__address-placeholder {
    gap: 16rpx;
  }
  
  &__address-text {
    flex: 1;
    font-size: var(--zx-delivery-address-text-size, 28rpx);
    color: var(--zx-delivery-placeholder-color, #c8c9cc);
  }
  
  &__remark {
    border: 2rpx solid var(--zx-delivery-remark-border, #ebedf0);
    border-radius: var(--zx-delivery-remark-radius, 12rpx);
    padding: 24rpx;
    background-color: var(--zx-delivery-remark-bg, #fff);
  }
  
  &__fee-detail {
    border: 2rpx solid var(--zx-delivery-fee-border, #ebedf0);
    border-radius: var(--zx-delivery-fee-radius, 12rpx);
    background-color: var(--zx-delivery-fee-bg, #fff);
    overflow: hidden;
  }
  
  &__fee-item,
  &__fee-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx;
    
    &:not(:last-child) {
      border-bottom: 1rpx solid var(--zx-delivery-fee-divider, #ebedf0);
    }
  }
  
  &__fee-total {
    background-color: var(--zx-delivery-fee-total-bg, #f8f9fa);
  }
  
  &__fee-label {
    font-size: var(--zx-delivery-fee-label-size, 28rpx);
    color: var(--zx-delivery-fee-label-color, #646566);
  }
  
  &__fee-value {
    font-size: var(--zx-delivery-fee-value-size, 28rpx);
    font-weight: var(--zx-delivery-fee-value-weight, 500);
    color: var(--zx-delivery-fee-value-color, #323233);
    
    &--total {
      font-size: var(--zx-delivery-fee-total-size, 32rpx);
      font-weight: var(--zx-delivery-fee-total-weight, 600);
      color: var(--zx-delivery-price-color, #ee0a24);
    }
  }
}

// 深色模式适配
@media (prefers-color-scheme: dark) {
  .zx-delivery {
    --zx-delivery-bg-color: #1a1a1a;
    --zx-delivery-section-bg: #2a2a2a;
    --zx-delivery-title-color: #ffffff;
    --zx-delivery-method-bg: #2a2a2a;
    --zx-delivery-method-border: #3a3a3a;
    --zx-delivery-method-name-color: #ffffff;
    --zx-delivery-method-desc-color: #999999;
    --zx-delivery-time-bg: #2a2a2a;
    --zx-delivery-time-border: #3a3a3a;
    --zx-delivery-time-label-color: #ffffff;
    --zx-delivery-time-desc-color: #999999;
    --zx-delivery-address-bg: #2a2a2a;
    --zx-delivery-address-border: #3a3a3a;
    --zx-delivery-address-name-color: #ffffff;
    --zx-delivery-address-detail-color: #999999;
    --zx-delivery-remark-bg: #2a2a2a;
    --zx-delivery-remark-border: #3a3a3a;
    --zx-delivery-fee-bg: #2a2a2a;
    --zx-delivery-fee-border: #3a3a3a;
    --zx-delivery-fee-divider: #3a3a3a;
    --zx-delivery-fee-total-bg: #1a1a1a;
    --zx-delivery-fee-label-color: #999999;
    --zx-delivery-fee-value-color: #ffffff;
  }
}
</style>