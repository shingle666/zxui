<template>
  <view :class="['zx-coupon-list', customClass]" :style="customStyle">
    <!-- 兑换栏 -->
    <view v-if="showExchangeBar" class="zx-coupon-list__exchange-bar">
      <view class="zx-coupon-list__field">
        <zx-input v-model="currentCode" :placeholder="inputPlaceholder || '请输入优惠码'" :maxlength="20"
          class="zx-coupon-list__input" />
        <view v-if="currentCode" class="zx-coupon-list__clear" @tap="clearCode">
          <zx-icon name="close" class="zx-coupon-list__clear-icon" size="20" />
        </view>
      </view>
      <view class="zx-coupon-list__exchange-btn" :class="{ 'zx-coupon-list__exchange-btn--disabled': buttonDisabled }"
        @tap="onExchange">
        <text class="zx-coupon-list__exchange-text">
          {{ exchangeButtonLoading ? '兑换中...' : (exchangeButtonText || '兑换') }}
        </text>
      </view>
    </view>

    <!-- 标签页 -->
    <view class="zx-coupon-list__tabs">
      <view class="zx-coupon-list__tab" :class="{ 'zx-coupon-list__tab--active': activeTab === 0 }" @tap="switchTab(0)">
        <text class="zx-coupon-list__tab-text">
          {{ enabledTitle || '可使用优惠券' }}
          <text v-if="showCount" class="zx-coupon-list__tab-count">({{ coupons.length }})</text>
        </text>
      </view>
      <view class="zx-coupon-list__tab" :class="{ 'zx-coupon-list__tab--active': activeTab === 1 }" @tap="switchTab(1)">
        <text class="zx-coupon-list__tab-text">
          {{ disabledTitle || '不可使用优惠券' }}
          <text v-if="showCount" class="zx-coupon-list__tab-count">({{ disabledCoupons.length }})</text>
        </text>
      </view>
    </view>

    <!-- 优惠券列表 -->
    <scroll-view class="zx-coupon-list__list" :class="{ 'zx-coupon-list__list--with-bottom': showCloseButton }"
      :style="{ height: listHeight + 'px' }" scroll-y enhanced :show-scrollbar="false">
      <!-- 可用优惠券 -->
      <view v-if="activeTab === 0">
        <view v-for="(coupon, index) in coupons" :key="coupon.id || index" class="zx-coupon-list__item"
          @tap="selectCoupon(index)">
          <zx-coupon-item :coupon="coupon" :chosen="isChosenCoupon(index)" :currency="currency" />
        </view>

        <!-- 空状态 -->
        <view v-if="!coupons.length" class="zx-coupon-list__empty">
          <image v-if="emptyImage" :src="emptyImage" class="zx-coupon-list__empty-image" />
          <text class="zx-coupon-list__empty-text">暂无可用优惠券</text>
        </view>

        <!-- 列表底部插槽 -->
        <slot name="list-footer"></slot>
      </view>

      <!-- 不可用优惠券 -->
      <view v-if="activeTab === 1">
        <view v-for="(coupon, index) in disabledCoupons" :key="coupon.id || index" class="zx-coupon-list__item">
          <zx-coupon-item :coupon="coupon" :disabled="true" :currency="currency" />
        </view>

        <!-- 空状态 -->
        <view v-if="!disabledCoupons.length" class="zx-coupon-list__empty">
          <image v-if="emptyImage" :src="emptyImage" class="zx-coupon-list__empty-image" />
          <text class="zx-coupon-list__empty-text">暂无不可用优惠券</text>
        </view>

        <!-- 不可用列表底部插槽 -->
        <slot name="disabled-list-footer"></slot>
      </view>
    </scroll-view>

    <!-- 底部按钮 -->
    <view v-if="showCloseButton" class="zx-coupon-list__bottom">
      <slot name="list-button">
        <view class="zx-coupon-list__close-btn" @tap="closeCouponList">
          <text class="zx-coupon-list__close-text">{{ closeButtonText || '不使用优惠' }}</text>
        </view>
      </slot>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import zxCouponItem from './zx-coupon-item.vue'
import zxInput from '@tanzhenxing/zx-input/zx-input.vue'
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'

const props = defineProps({
  // 当前输入的兑换码
  code: {
    type: String,
    default: ''
  },
  // 当前选中优惠券的索引，支持多选
  chosenCoupon: {
    type: [Number, Array],
    default: -1
  },
  // 可用优惠券列表
  coupons: {
    type: Array,
    default: () => []
  },
  // 不可用优惠券列表
  disabledCoupons: {
    type: Array,
    default: () => []
  },
  // 可用优惠券列表标题
  enabledTitle: {
    type: String,
    default: '可使用优惠券'
  },
  // 不可用优惠券列表标题
  disabledTitle: {
    type: String,
    default: '不可使用优惠券'
  },
  // 兑换按钮文字
  exchangeButtonText: {
    type: String,
    default: '兑换'
  },
  // 是否显示兑换按钮加载动画
  exchangeButtonLoading: {
    type: Boolean,
    default: false
  },
  // 是否禁用兑换按钮
  exchangeButtonDisabled: {
    type: Boolean,
    default: false
  },
  // 兑换码最小长度
  exchangeMinLength: {
    type: Number,
    default: 1
  },
  // 滚动至特定优惠券位置
  displayedCouponIndex: {
    type: Number,
    default: -1
  },
  // 是否显示列表底部按钮
  showCloseButton: {
    type: Boolean,
    default: true
  },
  // 列表底部按钮文字
  closeButtonText: {
    type: String,
    default: '不使用优惠'
  },
  // 输入框文字提示
  inputPlaceholder: {
    type: String,
    default: '请输入优惠码'
  },
  // 是否展示兑换栏
  showExchangeBar: {
    type: Boolean,
    default: true
  },
  // 货币符号
  currency: {
    type: String,
    default: '¥'
  },
  // 列表为空时的占位图
  emptyImage: {
    type: String,
    default: ''
  },
  // 是否展示可用/不可用数量
  showCount: {
    type: Boolean,
    default: true
  },
  // 自定义样式类名
  customClass: {
    type: String,
    default: ''
  },
  // 自定义样式
  customStyle: {
    type: [String, Object],
    default: ''
  }
})

const emit = defineEmits(['change', 'exchange', 'update:code'])

// 响应式数据
const activeTab = ref(0)
const currentCode = ref(props.code)
const listHeight = ref(300)

// 计算属性
const buttonDisabled = computed(() => {
  return !props.exchangeButtonLoading &&
    (props.exchangeButtonDisabled ||
      !currentCode.value ||
      currentCode.value.length < props.exchangeMinLength)
})

// 方法
const switchTab = (index) => {
  activeTab.value = index
}

const clearCode = () => {
  currentCode.value = ''
}

const onExchange = () => {
  if (buttonDisabled.value) return
  emit('exchange', currentCode.value)
  if (!props.code) {
    currentCode.value = ''
  }
}

const isChosenCoupon = (index) => {
  if (Array.isArray(props.chosenCoupon)) {
    return props.chosenCoupon.includes(index)
  }
  return index === props.chosenCoupon
}

const selectCoupon = (index) => {
  let newChosenCoupon
  if (Array.isArray(props.chosenCoupon)) {
    // 多选模式
    if (props.chosenCoupon.includes(index)) {
      newChosenCoupon = props.chosenCoupon.filter(item => item !== index)
    } else {
      newChosenCoupon = [...props.chosenCoupon, index]
    }
  } else {
    // 单选模式
    newChosenCoupon = index
  }
  emit('change', newChosenCoupon)
}

const closeCouponList = () => {
  const resetValue = Array.isArray(props.chosenCoupon) ? [] : -1
  emit('change', resetValue)
}

const updateListHeight = () => {
  // 计算列表高度
  const TABS_HEIGHT = 44
  const EXCHANGE_BAR_HEIGHT = props.showExchangeBar ? 60 : 0
  const BOTTOM_HEIGHT = props.showCloseButton ? 50 : 0

  // 获取系统信息
  uni.getSystemInfo({
    success: (res) => {
      const windowHeight = res.windowHeight
      const availableHeight = windowHeight - TABS_HEIGHT - EXCHANGE_BAR_HEIGHT - BOTTOM_HEIGHT - 20
      listHeight.value = Math.max(availableHeight, 200)
    }
  })
}

// 监听器
watch(() => props.code, (value) => {
  currentCode.value = value
})

watch(currentCode, (value) => {
  emit('update:code', value)
})

watch(() => props.displayedCouponIndex, (index) => {
  if (index >= 0) {
    // 滚动到指定优惠券
    nextTick(() => {
      // 这里可以添加滚动到指定位置的逻辑
    })
  }
})

// 生命周期
onMounted(() => {
  updateListHeight()
})
</script>

<style lang="scss" scoped>
.zx-coupon-list {
  position: relative;
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
}

.zx-coupon-list__exchange-bar {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: #fff;
  border-bottom: 1px solid #ebedf0;
}

.zx-coupon-list__field {
  flex: 1;
  position: relative;
  margin-right: 12px;
}

.zx-coupon-list__input {
  width: 100%;
  height: 34px;
  padding: 0 12px;
  padding-right: 30px;
  font-size: 14px;
  line-height: 34px;
  background-color: #f7f8fa;
  border-radius: 17px;
  border: none;
  outline: none;
}

.zx-coupon-list__input::placeholder {
  color: #969799;
}

.zx-coupon-list__clear {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zx-coupon-list__clear-icon {
  font-size: 16px;
  color: #c8c9cc;
}

.zx-coupon-list__exchange-btn {
  height: 32px;
  padding: 0 16px;
  background-color: #ee0a24;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zx-coupon-list__exchange-btn--disabled {
  background-color: #c8c9cc;
  opacity: 0.5;
}

.zx-coupon-list__exchange-text {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}

.zx-coupon-list__tabs {
  display: flex;
  background-color: #fff;
  border-bottom: 1px solid #ebedf0;
}

.zx-coupon-list__tab {
  flex: 1;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.zx-coupon-list__tab--active {
  color: #ee0a24;
}

.zx-coupon-list__tab--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background-color: #ee0a24;
  border-radius: 1px;
}

.zx-coupon-list__tab-text {
  font-size: 14px;
  font-weight: 500;
}

.zx-coupon-list__tab-count {
  margin-left: 4px;
  font-weight: normal;
}

.zx-coupon-list__list {
  flex: 1;
  padding: 12px 16px;
  box-sizing: border-box;
}

.zx-coupon-list__list--with-bottom {
  padding-bottom: 62px;
}

.zx-coupon-list__item {
  margin-bottom: 12px;
}

.zx-coupon-list__item:last-child {
  margin-bottom: 0;
}

.zx-coupon-list__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

.zx-coupon-list__empty-image {
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
}

.zx-coupon-list__empty-text {
  color: #969799;
  font-size: 14px;
  line-height: 20px;
}

.zx-coupon-list__bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 5px 16px;
  background-color: #f7f8fa;
  border-top: 1px solid #ebedf0;
}

.zx-coupon-list__close-btn {
  height: 40px;
  background-color: #ee0a24;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zx-coupon-list__close-text {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}
</style>