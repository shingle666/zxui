<template>
  <view class="zx-submit-bar" :class="{ 'zx-safe-area-bottom': safeAreaInsetBottom }">
    <!-- 顶部插槽 -->
    <slot name="top"></slot>

    <!-- 提示信息 -->
    <view v-if="tip || $slots.tip" class="zx-submit-bar__tip">
      <zx-icon v-if="tipIcon" :name="tipIcon" class="zx-submit-bar__tip-icon"></zx-icon>
      <text v-if="tip" class="zx-submit-bar__tip-text">{{ tip }}</text>
      <slot name="tip"></slot>
    </view>

    <!-- 订单栏 -->
    <view class="zx-submit-bar__bar">
      <!-- 默认插槽 -->
      <slot></slot>

      <!-- 金额信息 -->
      <view class="zx-submit-bar__text" :style="{ textAlign: textAlign }" v-if="typeof price === 'number'">
        <text>{{ label || '合计：' }}</text>
        <text class="zx-submit-bar__price">
          {{ currency }}
          <text class="zx-submit-bar__price-integer">{{ pricePair[0] }}</text>
          {{ decimalStr }}
        </text>
        <text v-if="suffixLabel" class="zx-submit-bar__suffix-label">{{ suffixLabel }}</text>
      </view>

      <!-- 按钮插槽 -->
      <slot name="button">
        <zx-button round :type="buttonType" :color="buttonColor" :loading="loading" :disabled="disabled"
          class="zx-submit-bar__button" :class="[`zx-submit-bar__button--${buttonType}`]" @click="onSubmit">{{
            buttonText }}</zx-button>
      </slot>
    </view>
  </view>
</template>

<script setup>
/**
 * submit-bar 提交订单栏
 * @description 用于展示订单金额与提交订单
 * @tutorial https://zxui.org/components/submit-bar
 * @property {Number} price            金额（单位分）
 * @property {Number | String} decimalLength  金额小数点位数 (默认 2 )
 * @property {String} label            金额左侧文案 (默认 '合计：' )
 * @property {String} suffixLabel      金额右侧文案
 * @property {String} textAlign        金额文案对齐方向，可选值为 left (默认 right )
 * @property {String} buttonText       按钮文字
 * @property {String} buttonType       按钮类型 (默认 danger )
 * @property {String} buttonColor      自定义按钮颜色
 * @property {String} tip              在订单栏上方的提示文案
 * @property {String} tipIcon          提示文案左侧的图标名称
 * @property {String} currency         货币符号 (默认 ¥ )
 * @property {Boolean} disabled        是否禁用按钮 (默认 false )
 * @property {Boolean} loading         是否显示将按钮显示为加载中状态 (默认 false )
 * @property {Boolean} safeAreaInsetBottom 是否开启底部安全区适配 (默认 true )
 * @property {Boolean} placeholder     是否在标签位置生成一个等高的占位元素 (默认 false )
 * @event {Function} submit            按钮点击事件回调
 */
import { computed, ref } from 'vue';
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue';
import zxButton from '@tanzhenxing/zx-button/zx-button.vue';


const props = defineProps({
  // 金额（单位分）
  price: Number,
  // 金额小数点位数
  decimalLength: {
    type: [Number, String],
    default: 2
  },
  // 金额左侧文案
  label: {
    type: String,
    default: '合计：'
  },
  // 金额右侧文案
  suffixLabel: String,
  // 金额文案对齐方向
  textAlign: {
    type: String,
    default: 'right'
  },
  // 按钮文字
  buttonText: String,
  // 按钮类型
  buttonType: {
    type: String,
    default: 'danger'
  },
  // 自定义按钮颜色
  buttonColor: String,
  // 在订单栏上方的提示文案
  tip: String,
  // 提示文案左侧的图标名称
  tipIcon: String,
  // 货币符号
  currency: {
    type: String,
    default: '¥'
  },
  // 是否禁用按钮
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否显示将按钮显示为加载中状态
  loading: {
    type: Boolean,
    default: false
  },
  // 是否开启底部安全区适配
  safeAreaInsetBottom: {
    type: Boolean,
    default: true
  },
  // 是否在标签位置生成一个等高的占位元素
  placeholder: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit']);

// 计算价格部分
const pricePair = computed(() => {
  if (typeof props.price === 'number') {
    return (props.price / 100).toFixed(+props.decimalLength).split('.');
  }
  return ['0', '00'];
});

// 计算小数部分
const decimalStr = computed(() => {
  if (props.decimalLength && pricePair.value[1]) {
    return `.${pricePair.value[1]}`;
  }
  return '';
});

// 提交按钮点击事件
const onSubmit = () => {
  if (!props.disabled && !props.loading) {
    emit('submit');
  }
};
</script>

<style lang="scss">
.zx-submit-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background-color: #fff;
  user-select: none;

  &__tip {
    padding: 8rpx 24rpx;
    color: #f56723;
    font-size: 24rpx;
    line-height: 1.5;
    background-color: #fff7e8;

    &-icon {
      margin-right: 8rpx;
      font-size: 24rpx;
      vertical-align: middle;
    }

    &-text {
      vertical-align: middle;
    }
  }

  &__bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100rpx;
    padding: 0 32rpx;
    font-size: 28rpx;
  }

  &__text {
    flex: 1;
    padding-right: 24rpx;
    color: #323233;

    span {
      display: inline-block;
    }
  }

  &__suffix-label {
    margin-left: 10rpx;
    font-weight: 500;
  }

  &__price {
    color: #ee0a24;
    font-weight: 500;
    font-size: 24rpx;
    margin-left: 10rpx;

    &-integer {
      font-size: 40rpx;
      font-family: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif;
    }
  }

  &__button {
    width: 220rpx;
    height: 80rpx;
    font-weight: 500;
    border: none;

    &--danger {
      background: linear-gradient(to right, #ff6034, #ee0a24);
    }
  }
}

.zx-safe-area-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>