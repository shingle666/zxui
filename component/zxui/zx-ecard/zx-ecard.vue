<template>
  <view class="zx-ecard" :class="[
    `zx-ecard--${type}`,
    `zx-ecard--${status}`,
    {
      'zx-ecard--disabled': disabled,
      'zx-ecard--selected': selected
    },
    customClass
  ]" :style="customStyle" @click="handleClick">
    <!-- 卡券背景装饰 -->
    <view class="zx-ecard__bg-decoration">
      <view class="zx-ecard__bg-pattern"></view>
    </view>

    <!-- 卡券主体内容 -->
    <view class="zx-ecard__content">
      <!-- 左侧主要信息区域 -->
      <view class="zx-ecard__main">
        <!-- 卡券标题 -->
        <view class="zx-ecard__title">
          <text class="zx-ecard__title-text" :style="{
            fontSize: titleSize + 'rpx',
            color: titleColor
          }">
            {{ title }}
          </text>
          <!-- 卡券标签 -->
          <view v-if="tag" class="zx-ecard__tag" :style="{ backgroundColor: tagColor }">
            <text class="zx-ecard__tag-text">{{ tag }}</text>
          </view>
        </view>

        <!-- 卡券描述 -->
        <view v-if="description" class="zx-ecard__description">
          <text class="zx-ecard__description-text" :style="{
            fontSize: descSize + 'rpx',
            color: descColor
          }">
            {{ description }}
          </text>
        </view>

        <!-- 卡券价值/面额 -->
        <view class="zx-ecard__value">
          <text class="zx-ecard__value-symbol">{{ valueSymbol }}</text>
          <text class="zx-ecard__value-amount" :style="{
            fontSize: valueSize + 'rpx',
            color: valueColor
          }">
            {{ value }}
          </text>
          <text v-if="valueUnit" class="zx-ecard__value-unit">{{ valueUnit }}</text>
        </view>

        <!-- 使用条件 -->
        <view v-if="condition" class="zx-ecard__condition">
          <text class="zx-ecard__condition-text" :style="{
            fontSize: conditionSize + 'rpx',
            color: conditionColor
          }">
            {{ condition }}
          </text>
        </view>

        <!-- 有效期 -->
        <view class="zx-ecard__validity">
          <text class="zx-ecard__validity-text" :style="{
            fontSize: validitySize + 'rpx',
            color: validityColor
          }">
            {{ validityText }}
          </text>
        </view>
      </view>

      <!-- 右侧操作区域 -->
      <view class="zx-ecard__action">
        <!-- 卡券状态图标 -->
        <view v-if="showStatusIcon" class="zx-ecard__status-icon">
          <text class="zx-ecard__status-text">{{ statusText }}</text>
        </view>

        <!-- 操作按钮 -->
        <view v-if="showButton && !disabled" class="zx-ecard__button" :class="`zx-ecard__button--${buttonType}`"
          :style="{ backgroundColor: buttonColor }" @click.stop="handleButtonClick">
          <text class="zx-ecard__button-text" :style="{
            fontSize: buttonSize + 'rpx',
            color: buttonTextColor
          }">
            {{ buttonText }}
          </text>
        </view>
      </view>
    </view>

    <!-- 卡券底部信息 -->
    <view v-if="showFooter" class="zx-ecard__footer">
      <!-- 商家信息 -->
      <view v-if="merchantName" class="zx-ecard__merchant">
        <text class="zx-ecard__merchant-text">{{ merchantName }}</text>
      </view>

      <!-- 卡券编号 -->
      <view v-if="cardNo" class="zx-ecard__card-no">
        <text class="zx-ecard__card-no-text">卡券编号：{{ cardNo }}</text>
      </view>
    </view>

    <!-- 状态遮罩 -->
    <view v-if="status === 'used' || status === 'expired'" class="zx-ecard__mask">
      <text class="zx-ecard__mask-text">{{ maskText }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

/**
 * zx-ecard 电子卡券组件
 * @description 用于展示各种类型的电子卡券，支持优惠券、代金券、折扣券等
 * @property {String} type 卡券类型 coupon|voucher|discount|gift
 * @property {String} status 卡券状态 available|used|expired
 * @property {String} title 卡券标题
 * @property {String} description 卡券描述
 * @property {String|Number} value 卡券面额/折扣值
 * @property {String} valueSymbol 面额符号
 * @property {String} valueUnit 面额单位
 * @property {String} condition 使用条件
 * @property {String} validFrom 有效期开始时间
 * @property {String} validTo 有效期结束时间
 * @property {String} merchantName 商家名称
 * @property {String} cardNo 卡券编号
 * @property {String} tag 卡券标签
 * @property {Boolean} disabled 是否禁用
 * @property {Boolean} selected 是否选中
 * @property {Boolean} showButton 是否显示操作按钮
 * @property {String} buttonText 按钮文字
 * @property {String} buttonType 按钮类型
 * @property {Boolean} showFooter 是否显示底部信息
 * @property {Boolean} showStatusIcon 是否显示状态图标
 * @event {Function} click 点击卡券时触发
 * @event {Function} buttonClick 点击按钮时触发
 */

// 定义事件
const emit = defineEmits([
  'click',
  'buttonClick'
])

// 定义 props
const props = defineProps({
  // 卡券类型：coupon-优惠券, voucher-代金券, discount-折扣券, gift-礼品券
  type: {
    type: String,
    default: 'coupon',
    validator: (value) => ['coupon', 'voucher', 'discount', 'gift'].includes(value)
  },
  // 卡券状态：available-可用, used-已使用, expired-已过期
  status: {
    type: String,
    default: 'available',
    validator: (value) => ['available', 'used', 'expired'].includes(value)
  },
  // 卡券标题
  title: {
    type: String,
    default: '优惠券'
  },
  // 卡券描述
  description: {
    type: String,
    default: ''
  },
  // 卡券面额/折扣值
  value: {
    type: [String, Number],
    default: '10'
  },
  // 面额符号
  valueSymbol: {
    type: String,
    default: '¥'
  },
  // 面额单位
  valueUnit: {
    type: String,
    default: ''
  },
  // 使用条件
  condition: {
    type: String,
    default: ''
  },
  // 有效期开始时间
  validFrom: {
    type: String,
    default: ''
  },
  // 有效期结束时间
  validTo: {
    type: String,
    default: ''
  },
  // 商家名称
  merchantName: {
    type: String,
    default: ''
  },
  // 卡券编号
  cardNo: {
    type: String,
    default: ''
  },
  // 卡券标签
  tag: {
    type: String,
    default: ''
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否选中
  selected: {
    type: Boolean,
    default: false
  },
  // 是否显示操作按钮
  showButton: {
    type: Boolean,
    default: true
  },
  // 按钮文字
  buttonText: {
    type: String,
    default: '立即使用'
  },
  // 按钮类型
  buttonType: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
  },
  // 是否显示底部信息
  showFooter: {
    type: Boolean,
    default: false
  },
  // 是否显示状态图标
  showStatusIcon: {
    type: Boolean,
    default: true
  },
  // 样式配置
  titleColor: {
    type: String,
    default: '#333333'
  },
  titleSize: {
    type: [Number, String],
    default: 32
  },
  descColor: {
    type: String,
    default: '#666666'
  },
  descSize: {
    type: [Number, String],
    default: 24
  },
  valueColor: {
    type: String,
    default: '#ff4757'
  },
  valueSize: {
    type: [Number, String],
    default: 48
  },
  conditionColor: {
    type: String,
    default: '#999999'
  },
  conditionSize: {
    type: [Number, String],
    default: 22
  },
  validityColor: {
    type: String,
    default: '#999999'
  },
  validitySize: {
    type: [Number, String],
    default: 22
  },
  buttonColor: {
    type: String,
    default: '#ff4757'
  },
  buttonTextColor: {
    type: String,
    default: '#ffffff'
  },
  buttonSize: {
    type: [Number, String],
    default: 26
  },
  tagColor: {
    type: String,
    default: '#ff4757'
  },
  // 自定义类名
  customClass: {
    type: String,
    default: ''
  },
  // 自定义样式
  customStyle: {
    type: [Object, String],
    default: () => ({})
  }
})

// 计算有效期文本
const validityText = computed(() => {
  if (props.validFrom && props.validTo) {
    return `有效期：${props.validFrom} - ${props.validTo}`
  } else if (props.validTo) {
    return `有效期至：${props.validTo}`
  } else {
    return '长期有效'
  }
})

// 计算状态文本
const statusText = computed(() => {
  const statusMap = {
    available: '可使用',
    used: '已使用',
    expired: '已过期'
  }
  return statusMap[props.status] || ''
})

// 计算遮罩文本
const maskText = computed(() => {
  const maskMap = {
    used: '已使用',
    expired: '已过期'
  }
  return maskMap[props.status] || ''
})

// 处理卡券点击
const handleClick = () => {
  if (props.disabled) return
  emit('click', {
    type: props.type,
    status: props.status,
    value: props.value,
    cardNo: props.cardNo
  })
}

// 处理按钮点击
const handleButtonClick = () => {
  if (props.disabled) return
  emit('buttonClick', {
    type: props.type,
    status: props.status,
    value: props.value,
    cardNo: props.cardNo
  })
}
</script>

<style lang="scss">
$zx-ecard-primary: #ff4757 !default;
$zx-ecard-secondary: #2979ff !default;
$zx-ecard-success: #5cb85c !default;
$zx-ecard-warning: #f0ad4e !default;
$zx-ecard-border-radius: 12rpx !default;
$zx-ecard-spacing-xs: 8rpx !default;
$zx-ecard-spacing-sm: 16rpx !default;
$zx-ecard-spacing-md: 24rpx !default;
$zx-ecard-spacing-lg: 32rpx !default;

.zx-ecard {
  position: relative;
  margin: $zx-ecard-spacing-sm;
  border-radius: $zx-ecard-border-radius;
  overflow: hidden;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
  }

  // 卡券类型样式
  &--coupon {
    border-left: 8rpx solid $zx-ecard-primary;

    .zx-ecard__bg-decoration {
      background: linear-gradient(135deg, rgba(255, 71, 87, 0.1) 0%, rgba(255, 71, 87, 0.05) 100%);
    }
  }

  &--voucher {
    border-left: 8rpx solid $zx-ecard-secondary;

    .zx-ecard__bg-decoration {
      background: linear-gradient(135deg, rgba(41, 121, 255, 0.1) 0%, rgba(41, 121, 255, 0.05) 100%);
    }
  }

  &--discount {
    border-left: 8rpx solid $zx-ecard-success;

    .zx-ecard__bg-decoration {
      background: linear-gradient(135deg, rgba(92, 184, 92, 0.1) 0%, rgba(92, 184, 92, 0.05) 100%);
    }
  }

  &--gift {
    border-left: 8rpx solid $zx-ecard-warning;

    .zx-ecard__bg-decoration {
      background: linear-gradient(135deg, rgba(240, 173, 78, 0.1) 0%, rgba(240, 173, 78, 0.05) 100%);
    }
  }

  // 卡券状态样式
  &--used,
  &--expired {
    opacity: 0.6;

    .zx-ecard__content {
      filter: grayscale(0.5);
    }
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &--selected {
    border: 2rpx solid $zx-ecard-primary;
    box-shadow: 0 4rpx 16rpx rgba(255, 71, 87, 0.3);
  }

  // 背景装饰
  &__bg-decoration {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  &__bg-pattern {
    position: absolute;
    top: -50%;
    right: -20%;
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  }

  // 主体内容
  &__content {
    position: relative;
    z-index: 1;
    display: flex;
    padding: $zx-ecard-spacing-lg $zx-ecard-spacing-md;
  }

  &__main {
    flex: 1;
    min-width: 0;
  }

  &__action {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    margin-left: $zx-ecard-spacing-md;
  }

  // 标题区域
  &__title {
    display: flex;
    align-items: center;
    margin-bottom: $zx-ecard-spacing-xs;
  }

  &__title-text {
    font-weight: 600;
    margin-right: $zx-ecard-spacing-xs;
  }

  &__tag {
    padding: 4rpx 12rpx;
    border-radius: 20rpx;

    &-text {
      font-size: 20rpx;
      color: #ffffff;
    }
  }

  // 描述
  &__description {
    margin-bottom: $zx-ecard-spacing-sm;

    &-text {
      line-height: 1.4;
    }
  }

  // 面额/价值
  &__value {
    display: flex;
    align-items: baseline;
    margin-bottom: $zx-ecard-spacing-xs;
  }

  &__value-symbol {
    font-size: 28rpx;
    font-weight: 600;
    margin-right: 4rpx;
  }

  &__value-amount {
    font-weight: 700;
    line-height: 1;
  }

  &__value-unit {
    font-size: 24rpx;
    margin-left: 4rpx;
    opacity: 0.8;
  }

  // 使用条件
  &__condition {
    margin-bottom: $zx-ecard-spacing-xs;

    &-text {
      font-size: 22rpx;
      line-height: 1.3;
    }
  }

  // 有效期
  &__validity {
    &-text {
      font-size: 22rpx;
    }
  }

  // 状态图标
  &__status-icon {
    margin-bottom: $zx-ecard-spacing-sm;
  }

  &__status-text {
    font-size: 20rpx;
    color: #999999;
    padding: 4rpx 8rpx;
    border: 1rpx solid #e0e0e0;
    border-radius: 8rpx;
    background-color: #f5f5f5;
  }

  // 操作按钮
  &__button {
    padding: 12rpx 24rpx;
    border-radius: 20rpx;
    transition: all 0.2s ease;

    &:active {
      transform: scale(0.95);
    }

    &--primary {
      background-color: $zx-ecard-primary;
    }

    &--secondary {
      background-color: $zx-ecard-secondary;
    }

    &--outline {
      background-color: transparent;
      border: 1rpx solid $zx-ecard-primary;

      .zx-ecard__button-text {
        color: $zx-ecard-primary !important;
      }
    }
  }

  &__button-text {
    font-weight: 500;
  }

  // 底部信息
  &__footer {
    position: relative;
    z-index: 1;
    padding: $zx-ecard-spacing-sm $zx-ecard-spacing-md;
    border-top: 1rpx solid #f0f0f0;
    background-color: rgba(248, 249, 250, 0.8);
  }

  &__merchant {
    margin-bottom: $zx-ecard-spacing-xs;

    &-text {
      font-size: 24rpx;
      color: #666666;
    }
  }

  &__card-no {
    &-text {
      font-size: 20rpx;
      color: #999999;
    }
  }

  // 状态遮罩
  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);

    &-text {
      font-size: 48rpx;
      font-weight: 700;
      color: #ffffff;
      text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
      transform: rotate(-15deg);
    }
  }
}
</style>