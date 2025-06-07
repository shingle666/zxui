<template>
  <view
    class="zx-settle-bar"
    :class="{ 'zx-safe-area-bottom': safeAreaInsetBottom }"
    :style="{ backgroundColor: backgroundColor }"
  >
    <!-- 顶部插槽 -->
    <slot name="top"></slot>
    
    <!-- 提示信息 -->
    <view v-if="tip || $slots.tip" class="zx-settle-bar__tip" :style="{ backgroundColor: tipBackgroundColor }">
      <zx-icon
        v-if="tipIcon"
        :name="tipIcon"
        :color="tipIconColor"
        :size="tipIconSize"
        class="zx-settle-bar__tip-icon"
      ></zx-icon>
      <text v-if="tip" class="zx-settle-bar__tip-text" :style="{ color: tipTextColor }">{{ tip }}</text>
      <slot name="tip"></slot>
    </view>
    
    <!-- 结算栏主体 -->
    <view class="zx-settle-bar__bar">
      <!-- 全选区域 -->
      <view v-if="showCheckAll" class="zx-settle-bar__check-all" @click="handleCheckAll">
        <zx-checkbox
          :modelValue="isAllChecked"
          :disabled="checkAllDisabled"
          :color="checkboxColor"
          :size="checkboxSize"
          :shape="checkboxShape"
        ></zx-checkbox>
        <text class="zx-settle-bar__check-all-text" :style="{ color: checkAllTextColor }">{{ checkAllText }}</text>
      </view>
      
      <!-- 默认插槽 -->
      <slot></slot>
      
      <!-- 金额信息 -->
      <view class="zx-settle-bar__price-info" v-if="showPrice">
        <!-- 原价（划线价） -->
        <view v-if="originalPrice > 0" class="zx-settle-bar__original-price">
          <text :style="{ color: originalPriceColor, fontSize: originalPriceSize + 'rpx' }">
            {{ currency }}{{ formatPrice(originalPrice) }}
          </text>
        </view>
        
        <!-- 当前价格 -->
        <view class="zx-settle-bar__price">
          <text class="zx-settle-bar__price-label" :style="{ color: priceLabelColor }">{{ priceLabel }}</text>
          <text class="zx-settle-bar__price-symbol" :style="{ color: priceColor }">{{ currency }}</text>
          <text class="zx-settle-bar__price-integer" :style="{ color: priceColor, fontSize: priceSize + 'rpx' }">
            {{ pricePair[0] }}
          </text>
          <text class="zx-settle-bar__price-decimal" :style="{ color: priceColor }">
            {{ decimalStr }}
          </text>
        </view>
        
        <!-- 价格后缀 -->
        <view v-if="priceSuffix" class="zx-settle-bar__price-suffix">
          <text :style="{ color: priceSuffixColor, fontSize: priceSuffixSize + 'rpx' }">{{ priceSuffix }}</text>
        </view>
      </view>
      
      <!-- 按钮区域 -->
      <slot name="button">
        <zx-button
          :type="buttonType"
          :color="buttonColor"
          :size="buttonSize"
          :round="buttonRound"
          :loading="loading"
          :disabled="disabled || selectedCount === 0"
          :loadingText="loadingText"
          class="zx-settle-bar__button"
          @click="handleSettle"
        >
          {{ buttonText }}{{ selectedCount > 0 ? `(${selectedCount})` : '' }}
        </zx-button>
      </slot>
    </view>
    
    <!-- 底部插槽 -->
    <slot name="bottom"></slot>
  </view>
</template>

<script setup>
/**
 * settle-bar 结算栏
 * @description 购物车结算栏组件，支持全选、价格显示、结算按钮等功能
 * @tutorial https://zxui.org/components/settle-bar
 * @property {Number} price 当前价格（单位：分）
 * @property {Number} originalPrice 原价（单位：分）
 * @property {String} priceLabel 价格标签文字 (默认 '合计：')
 * @property {String} priceSuffix 价格后缀文字
 * @property {String} currency 货币符号 (默认 '¥')
 * @property {Number} decimalLength 小数位数 (默认 2)
 * @property {Boolean} showPrice 是否显示价格 (默认 true)
 * @property {Number} selectedCount 已选择商品数量 (默认 0)
 * @property {Boolean} showCheckAll 是否显示全选 (默认 true)
 * @property {Boolean} checkAll 全选状态 (默认 false)
 * @property {String} checkAllText 全选文字 (默认 '全选')
 * @property {Boolean} checkAllDisabled 全选是否禁用 (默认 false)
 * @property {String} buttonText 按钮文字 (默认 '结算')
 * @property {String} buttonType 按钮类型 (默认 'primary')
 * @property {String} buttonColor 按钮颜色
 * @property {String} buttonSize 按钮尺寸 (默认 'normal')
 * @property {Boolean} buttonRound 按钮是否圆角 (默认 true)
 * @property {Boolean} loading 是否加载中 (默认 false)
 * @property {String} loadingText 加载中文字
 * @property {Boolean} disabled 是否禁用 (默认 false)
 * @property {String} tip 提示文字
 * @property {String} tipIcon 提示图标
 * @property {Boolean} safeAreaInsetBottom 是否适配底部安全区 (默认 true)
 * @property {String} backgroundColor 背景色 (默认 '#ffffff')
 * @property {String} tipBackgroundColor 提示背景色 (默认 '#fff7e8')
 * @property {String} tipTextColor 提示文字颜色 (默认 '#f56723')
 * @property {String} tipIconColor 提示图标颜色 (默认 '#f56723')
 * @property {Number} tipIconSize 提示图标大小 (默认 24)
 * @property {String} checkAllTextColor 全选文字颜色 (默认 '#323233')
 * @property {String} checkboxColor 复选框颜色 (默认 '#1989fa')
 * @property {Number} checkboxSize 复选框大小 (默认 20)
 * @property {String} checkboxShape 复选框形状 (默认 'round')
 * @property {String} priceLabelColor 价格标签颜色 (默认 '#323233')
 * @property {String} priceColor 价格颜色 (默认 '#ee0a24')
 * @property {Number} priceSize 价格字体大小 (默认 36)
 * @property {String} originalPriceColor 原价颜色 (默认 '#969799')
 * @property {Number} originalPriceSize 原价字体大小 (默认 24)
 * @property {String} priceSuffixColor 价格后缀颜色 (默认 '#323233')
 * @property {Number} priceSuffixSize 价格后缀字体大小 (默认 24)
 * @event {Function} settle 结算事件
 * @event {Function} check-all 全选事件
 */
import { computed } from 'vue'

const props = defineProps({
  // 价格相关
  price: {
    type: Number,
    default: 0
  },
  originalPrice: {
    type: Number,
    default: 0
  },
  priceLabel: {
    type: String,
    default: '合计：'
  },
  priceSuffix: {
    type: String,
    default: ''
  },
  currency: {
    type: String,
    default: '¥'
  },
  decimalLength: {
    type: Number,
    default: 2
  },
  showPrice: {
    type: Boolean,
    default: true
  },
  
  // 选择相关
  selectedCount: {
    type: Number,
    default: 0
  },
  showCheckAll: {
    type: Boolean,
    default: true
  },
  checkAll: {
    type: Boolean,
    default: false
  },
  checkAllText: {
    type: String,
    default: '全选'
  },
  checkAllDisabled: {
    type: Boolean,
    default: false
  },
  
  // 按钮相关
  buttonText: {
    type: String,
    default: '结算'
  },
  buttonType: {
    type: String,
    default: 'primary'
  },
  buttonColor: {
    type: String,
    default: ''
  },
  buttonSize: {
    type: String,
    default: 'normal'
  },
  buttonRound: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  
  // 提示相关
  tip: {
    type: String,
    default: ''
  },
  tipIcon: {
    type: String,
    default: ''
  },
  
  // 样式相关
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  tipBackgroundColor: {
    type: String,
    default: '#fff7e8'
  },
  tipTextColor: {
    type: String,
    default: '#f56723'
  },
  tipIconColor: {
    type: String,
    default: '#f56723'
  },
  tipIconSize: {
    type: Number,
    default: 24
  },
  checkAllTextColor: {
    type: String,
    default: '#323233'
  },
  checkboxColor: {
    type: String,
    default: '#1989fa'
  },
  checkboxSize: {
    type: Number,
    default: 20
  },
  checkboxShape: {
    type: String,
    default: 'round'
  },
  priceLabelColor: {
    type: String,
    default: '#323233'
  },
  priceColor: {
    type: String,
    default: '#ee0a24'
  },
  priceSize: {
    type: Number,
    default: 36
  },
  originalPriceColor: {
    type: String,
    default: '#969799'
  },
  originalPriceSize: {
    type: Number,
    default: 24
  },
  priceSuffixColor: {
    type: String,
    default: '#323233'
  },
  priceSuffixSize: {
    type: Number,
    default: 24
  }
})

const emit = defineEmits([
  'settle',
  'check-all',
  'update:checkAll'
])

// 计算价格部分
const pricePair = computed(() => {
  if (typeof props.price === 'number') {
    return (props.price / 100).toFixed(props.decimalLength).split('.')
  }
  return ['0', '00']
})

// 计算小数部分
const decimalStr = computed(() => {
  if (props.decimalLength && pricePair.value[1]) {
    return `.${pricePair.value[1]}`
  }
  return ''
})

// 是否全选
const isAllChecked = computed(() => props.checkAll)

// 格式化价格
const formatPrice = (price) => {
  return (price / 100).toFixed(props.decimalLength)
}

// 处理全选
const handleCheckAll = () => {
  if (props.checkAllDisabled) return
  
  const newCheckAll = !props.checkAll
  emit('update:checkAll', newCheckAll)
  emit('check-all', newCheckAll)
}

// 处理结算
const handleSettle = () => {
  if (props.disabled || props.loading || props.selectedCount === 0) return
  
  emit('settle', {
    selectedCount: props.selectedCount,
    price: props.price,
    originalPrice: props.originalPrice
  })
}
</script>

<style lang="scss" scoped>
.zx-settle-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background-color: #ffffff;
  border-top: 1rpx solid #ebedf0;
  user-select: none;
  
  &__tip {
    display: flex;
    align-items: center;
    padding: 16rpx 32rpx;
    background-color: #fff7e8;
    
    &-icon {
      margin-right: 12rpx;
    }
    
    &-text {
      flex: 1;
      font-size: 24rpx;
      line-height: 1.4;
    }
  }
  
  &__bar {
    display: flex;
    align-items: center;
    min-height: 100rpx;
    padding: 16rpx 32rpx;
    gap: 24rpx;
  }
  
  &__check-all {
    display: flex;
    align-items: center;
    gap: 12rpx;
    
    &-text {
      font-size: 28rpx;
      line-height: 1.4;
    }
  }
  
  &__price-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4rpx;
  }
  
  &__original-price {
    text {
      text-decoration: line-through;
      font-size: 24rpx;
    }
  }
  
  &__price {
    display: flex;
    align-items: baseline;
    gap: 4rpx;
    
    &-label {
      font-size: 28rpx;
      line-height: 1.4;
    }
    
    &-symbol {
      font-size: 24rpx;
      font-weight: 500;
    }
    
    &-integer {
      font-weight: 600;
      font-family: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif;
    }
    
    &-decimal {
      font-size: 24rpx;
      font-weight: 500;
    }
  }
  
  &__price-suffix {
    text {
      font-size: 24rpx;
    }
  }
  
  &__button {
    min-width: 200rpx;
    height: 80rpx;
    font-weight: 500;
  }
}

.zx-safe-area-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>