<template>
  <view class="zx-trend-arrow" :class="classNames" :style="containerStyle" @click="handleClick">
    <!-- 箭头在左侧 -->
    <view v-if="arrowLeft" class="zx-trend-arrow__icon" :style="iconStyle">
      <slot v-if="rate > 0" name="upIcon">
        <zx-icon name="arrow-up" :color="riseColor" :size="fontSize" />
      </slot>
      <slot v-else-if="rate < 0" name="downIcon">
        <zx-icon name="arrow-down" :color="dropColor" :size="fontSize" />
      </slot>
    </view>
    
    <!-- 数值文本 -->
    <text 
      v-if="displayText" 
      class="zx-trend-arrow__text" 
      :style="textStyle"
    >
      {{ displayText }}
    </text>
    
    <!-- 箭头在右侧（默认） -->
    <view v-if="!arrowLeft" class="zx-trend-arrow__icon" :style="iconStyle">
      <slot v-if="rate > 0" name="upIcon">
        <zx-icon name="arrow-up" :color="riseColor" :size="fontSize" />
      </slot>
      <slot v-else-if="rate < 0" name="downIcon">
        <zx-icon name="arrow-down" :color="dropColor" :size="fontSize" />
      </slot>
    </view>
  </view>
</template>

<script setup>
/**
 * TrendArrow 趋势箭头
 * @description 带有箭头指示的百分比数字，用以展示指标趋势
 * @tutorial https://zxui.org/component/trend-arrow
 * @property {Number}  rate           数值，大于0时箭头向上，小于0时箭头向下
 * @property {Number}  digits         小数位精度，默认2
 * @property {Boolean} showSign       是否显示加减号，默认false
 * @property {Boolean} showZero       是否显示0，默认false
 * @property {Boolean} arrowLeft      是否在数字左侧显示箭头，默认false
 * @property {Boolean} syncTextColor  文字颜色是否与箭头同步，默认true
 * @property {String}  textColor      文字颜色，默认#333333
 * @property {String}  riseColor      向上箭头颜色，默认#fa2c19
 * @property {String}  dropColor      向下箭头颜色，默认#64b578
 * @property {String}  fontSize       字体大小，默认14px
 * @property {Object}  customStyle    自定义样式
 * @event {Function}   click          点击事件
 * @example <zx-trend-arrow :rate="10.2365" />
 */
import { computed, getCurrentInstance } from 'vue'
import zxIcon from '../zx-icon/zx-icon.vue'

const { proxy } = getCurrentInstance()

const props = defineProps({
  // 数值，大于0时箭头向上，小于0时箭头向下
  rate: {
    type: Number,
    default: 0
  },
  // 小数位精度
  digits: {
    type: Number,
    default: 2
  },
  // 是否显示加减号
  showSign: {
    type: Boolean,
    default: false
  },
  // 是否显示0
  showZero: {
    type: Boolean,
    default: false
  },
  // 是否在数字左侧显示箭头
  arrowLeft: {
    type: Boolean,
    default: false
  },
  // 文字颜色是否与箭头同步
  syncTextColor: {
    type: Boolean,
    default: true
  },
  // 文字颜色
  textColor: {
    type: String,
    default: '#333333'
  },
  // 向上箭头颜色
  riseColor: {
    type: String,
    default: '#fa2c19'
  },
  // 向下箭头颜色
  dropColor: {
    type: String,
    default: '#64b578'
  },
  // 字体大小
  fontSize: {
    type: String,
    default: '14px'
  },
  // 自定义样式
  customStyle: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['click'])

// 计算显示的文本
const displayText = computed(() => {
  const { rate, digits, showSign, showZero } = props
  
  // 处理0值
  if (rate === 0) {
    return showZero ? (showSign ? '+0' : '0') : ''
  }
  
  // 格式化数值
  const formattedRate = Number(rate).toFixed(digits)
  
  // 添加符号
  if (showSign) {
    return rate > 0 ? `+${formattedRate}` : formattedRate
  }
  
  return Math.abs(rate).toFixed(digits)
})

// 计算类名
const classNames = computed(() => {
  const classes = []
  
  if (props.arrowLeft) {
    classes.push('zx-trend-arrow--arrow-left')
  }
  
  return classes
})

// 容器样式
const containerStyle = computed(() => {
  return {
    fontSize: props.fontSize,
    ...props.customStyle
  }
})

// 文本样式
const textStyle = computed(() => {
  const { rate, syncTextColor, textColor, riseColor, dropColor } = props
  
  let color = textColor
  
  if (syncTextColor && rate !== 0) {
    color = rate > 0 ? riseColor : dropColor
  }
  
  return {
    color
  }
})

// 图标样式
const iconStyle = computed(() => {
  const { rate, riseColor, dropColor } = props
  
  let color = '#333333'
  
  if (rate > 0) {
    color = riseColor
  } else if (rate < 0) {
    color = dropColor
  }
  
  return {
    color
  }
})

// 点击事件
const handleClick = () => {
  emit('click')
}
</script>

<style lang="scss" scoped>
.zx-trend-arrow {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  line-height: 1;
  
  &__icon {
    display: flex;
    align-items: center;
    margin: 0 4rpx;
  }
  
  &__triangle {
    font-size: 12px;
    line-height: 1;
    
    &--up {
      // 向上箭头样式已通过文本设置
    }
    
    &--down {
      // 向下箭头样式已通过文本设置
    }
  }
  
  &__text {
    font-size: inherit;
    line-height: 1;
  }
  
  &--arrow-left {
    .zx-trend-arrow__icon {
      order: -1;
    }
  }
}
</style>