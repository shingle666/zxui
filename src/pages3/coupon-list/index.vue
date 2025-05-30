<template>
  <view class="container">
    <view class="content">
      <zx-title type="line" title="基础用法"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">优惠券选择</text>
          <view class="coupon-cell" @tap="showBasicList = true">
            <text class="coupon-cell__text">
              {{ basicChosenCoupon >= 0 ? `已选择优惠券 ${basicChosenCoupon + 1}` : '选择优惠券' }}
            </text>
            <text class="coupon-cell__arrow">></text>
          </view>
        </view>
      </view>

      <zx-title type="line" title="多选模式"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">多张优惠券选择</text>
          <view class="coupon-cell" @tap="showMultiList = true">
            <text class="coupon-cell__text">
              {{ multiChosenCoupons.length > 0 ? `已选择 ${multiChosenCoupons.length} 张优惠券` : '选择多张优惠券' }}
            </text>
            <text class="coupon-cell__arrow">></text>
          </view>
        </view>
      </view>

      <zx-title type="line" title="兑换功能"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">支持优惠券兑换</text>
          <view class="coupon-cell" @tap="showExchangeList = true">
            <text class="coupon-cell__text">优惠券兑换</text>
            <text class="coupon-cell__arrow">></text>
          </view>
        </view>
      </view>

      <zx-title type="line" title="自定义样式"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">自定义文案和样式</text>
          <view class="coupon-cell" @tap="showCustomList = true">
            <text class="coupon-cell__text">自定义优惠券列表</text>
            <text class="coupon-cell__arrow">></text>
          </view>
        </view>
      </view>

      <zx-title type="line" title="空状态"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">无优惠券状态</text>
          <view class="coupon-cell" @tap="showEmptyList = true">
            <text class="coupon-cell__text">查看空状态</text>
            <text class="coupon-cell__arrow">></text>
          </view>
        </view>
      </view>

      <zx-title type="line" title="禁用兑换"></zx-title>
      <view class="demo-section">
        <view class="demo-item">
          <text class="demo-label">禁用兑换功能</text>
          <view class="coupon-cell" @tap="showDisabledExchangeList = true">
            <text class="coupon-cell__text">禁用兑换栏</text>
            <text class="coupon-cell__arrow">></text>
          </view>
        </view>
      </view>
    </view>

    <!-- 基础用法弹窗 -->
    <zx-popup 
      v-model:show="showBasicList" 
      position="bottom" 
      :style="{ height: '90%' }"
      round
    >
      <zx-coupon-list
        v-model:code="exchangeCode"
        :coupons="basicCoupons"
        :chosen-coupon="basicChosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onBasicChange"
        @exchange="onExchange"
      />
    </zx-popup>

    <!-- 多选模式弹窗 -->
    <zx-popup 
      v-model:show="showMultiList" 
      position="bottom" 
      :style="{ height: '90%' }"
      round
    >
      <zx-coupon-list
        :coupons="multiCoupons"
        :chosen-coupon="multiChosenCoupons"
        :disabled-coupons="disabledCoupons"
        @change="onMultiChange"
        @exchange="onExchange"
      />
    </zx-popup>

    <!-- 兑换功能弹窗 -->
    <zx-popup 
      v-model:show="showExchangeList" 
      position="bottom" 
      :style="{ height: '90%' }"
      round
    >
      <zx-coupon-list
        v-model:code="exchangeCode"
        :coupons="exchangeCoupons"
        :chosen-coupon="exchangeChosenCoupon"
        :disabled-coupons="disabledCoupons"
        :exchange-button-loading="exchangeLoading"
        @change="onExchangeChange"
        @exchange="onExchangeSubmit"
      />
    </zx-popup>

    <!-- 自定义样式弹窗 -->
    <zx-popup 
      v-model:show="showCustomList" 
      position="bottom" 
      :style="{ height: '90%' }"
      round
    >
      <zx-coupon-list
        :coupons="customCoupons"
        :chosen-coupon="customChosenCoupon"
        :disabled-coupons="customDisabledCoupons"
        currency="$"
        enabled-title="Available Coupons"
        disabled-title="Unavailable Coupons"
        exchange-button-text="Redeem"
        close-button-text="No Coupon"
        input-placeholder="Enter coupon code"
        custom-class="custom-coupon-list"
        @change="onCustomChange"
        @exchange="onExchange"
      >
        <template #list-footer>
          <view class="custom-footer">
            <text class="custom-footer__text">更多优惠券敬请期待</text>
          </view>
        </template>
      </zx-coupon-list>
    </zx-popup>

    <!-- 空状态弹窗 -->
    <zx-popup 
      v-model:show="showEmptyList" 
      position="bottom" 
      :style="{ height: '90%' }"
      round
    >
      <zx-coupon-list
        :coupons="[]"
        :disabled-coupons="[]"
        :chosen-coupon="-1"
        @change="onEmptyChange"
        @exchange="onExchange"
      />
    </zx-popup>

    <!-- 禁用兑换弹窗 -->
    <zx-popup 
      v-model:show="showDisabledExchangeList" 
      position="bottom" 
      :style="{ height: '90%' }"
      round
    >
      <zx-coupon-list
        :coupons="basicCoupons"
        :chosen-coupon="disabledExchangeChosenCoupon"
        :disabled-coupons="disabledCoupons"
        :show-exchange-bar="false"
        @change="onDisabledExchangeChange"
      />
    </zx-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxCouponList from '@/components/zx-coupon-list/zx-coupon-list.vue'
import zxPopup from '@/components/zx-popup/zx-popup.vue'
import zxTitle from '@/components/zx-title/zx-title.vue'

// 弹窗显示状态
const showBasicList = ref(false)
const showMultiList = ref(false)
const showExchangeList = ref(false)
const showCustomList = ref(false)
const showEmptyList = ref(false)
const showDisabledExchangeList = ref(false)

// 选中状态
const basicChosenCoupon = ref(-1)
const multiChosenCoupons = ref([])
const exchangeChosenCoupon = ref(-1)
const customChosenCoupon = ref(-1)
const disabledExchangeChosenCoupon = ref(-1)

// 兑换相关
const exchangeCode = ref('')
const exchangeLoading = ref(false)

// 基础优惠券数据
const basicCoupons = ref([
  {
    id: '1',
    name: '满减优惠券',
    condition: '满100元可用',
    value: 1000, // 10元，单位分
    startAt: 1640995200, // 2022-01-01
    endAt: 1735689599,   // 2024-12-31
    description: '全场通用，不与其他优惠同享'
  },
  {
    id: '2',
    name: '新用户专享',
    condition: '无门槛',
    valueDesc: '9.5',
    unitDesc: '折',
    startAt: 1640995200,
    endAt: 1735689599,
    description: '仅限新用户首次购买使用'
  },
  {
    id: '3',
    name: '限时特惠',
    condition: '满200元可用',
    value: 5000, // 50元
    startAt: 1640995200,
    endAt: 1735689599,
    description: '限时活动，数量有限'
  }
])

// 多选优惠券数据
const multiCoupons = ref([
  {
    id: '4',
    name: '叠加优惠券A',
    condition: '满50元可用',
    value: 500, // 5元
    startAt: 1640995200,
    endAt: 1735689599,
    description: '可与其他优惠券叠加使用'
  },
  {
    id: '5',
    name: '叠加优惠券B',
    condition: '满80元可用',
    value: 800, // 8元
    startAt: 1640995200,
    endAt: 1735689599,
    description: '可与其他优惠券叠加使用'
  },
  {
    id: '6',
    name: '叠加优惠券C',
    condition: '满120元可用',
    value: 1200, // 12元
    startAt: 1640995200,
    endAt: 1735689599,
    description: '可与其他优惠券叠加使用'
  }
])

// 兑换优惠券数据
const exchangeCoupons = ref([
  {
    id: '7',
    name: '兑换专享券',
    condition: '满150元可用',
    value: 2000, // 20元
    startAt: 1640995200,
    endAt: 1735689599,
    description: '通过兑换码获得的专享优惠券'
  }
])

// 自定义样式优惠券数据
const customCoupons = ref([
  {
    id: '8',
    name: 'Discount Coupon',
    condition: 'Min $50',
    value: 1000, // $10
    startAt: 1640995200,
    endAt: 1735689599,
    description: 'Valid for all products'
  },
  {
    id: '9',
    name: 'VIP Exclusive',
    condition: 'No minimum',
    valueDesc: '20',
    unitDesc: '%',
    startAt: 1640995200,
    endAt: 1735689599,
    description: 'VIP members only'
  }
])

// 不可用优惠券数据
const disabledCoupons = ref([
  {
    id: '10',
    name: '已过期优惠券',
    condition: '满50元可用',
    value: 500,
    reason: '优惠券已过期',
    startAt: 1609459200,
    endAt: 1640995199
  },
  {
    id: '11',
    name: '已用完优惠券',
    condition: '满100元可用',
    value: 1000,
    reason: '优惠券已抢完',
    startAt: 1640995200,
    endAt: 1735689599
  },
  {
    id: '12',
    name: '不满足条件',
    condition: '满500元可用',
    value: 5000,
    reason: '订单金额不满足使用条件',
    startAt: 1640995200,
    endAt: 1735689599
  }
])

// 自定义不可用优惠券
const customDisabledCoupons = ref([
  {
    id: '13',
    name: 'Expired Coupon',
    condition: 'Min $30',
    value: 500,
    reason: 'Coupon has expired',
    startAt: 1609459200,
    endAt: 1640995199
  }
])

// 事件处理
const onBasicChange = (index) => {
  basicChosenCoupon.value = index
  showBasicList.value = false
  uni.showToast({
    title: index >= 0 ? `选择了第 ${index + 1} 张优惠券` : '取消选择',
    icon: 'none'
  })
}

const onMultiChange = (indexes) => {
  multiChosenCoupons.value = indexes
  showMultiList.value = false
  uni.showToast({
    title: `选择了 ${indexes.length} 张优惠券`,
    icon: 'none'
  })
}

const onExchangeChange = (index) => {
  exchangeChosenCoupon.value = index
  showExchangeList.value = false
  uni.showToast({
    title: index >= 0 ? `选择了第 ${index + 1} 张优惠券` : '取消选择',
    icon: 'none'
  })
}

const onCustomChange = (index) => {
  customChosenCoupon.value = index
  showCustomList.value = false
  uni.showToast({
    title: index >= 0 ? `Selected coupon ${index + 1}` : 'Cancelled',
    icon: 'none'
  })
}

const onEmptyChange = (index) => {
  showEmptyList.value = false
  uni.showToast({
    title: '空状态下的选择',
    icon: 'none'
  })
}

const onDisabledExchangeChange = (index) => {
  disabledExchangeChosenCoupon.value = index
  showDisabledExchangeList.value = false
  uni.showToast({
    title: index >= 0 ? `选择了第 ${index + 1} 张优惠券` : '取消选择',
    icon: 'none'
  })
}

const onExchange = (code) => {
  uni.showToast({
    title: `兑换码: ${code}`,
    icon: 'none'
  })
  console.log('兑换码:', code)
}

const onExchangeSubmit = (code) => {
  exchangeLoading.value = true
  
  // 模拟兑换请求
  setTimeout(() => {
    exchangeLoading.value = false
    
    if (code === 'TEST123') {
      // 模拟兑换成功
      exchangeCoupons.value.push({
        id: Date.now().toString(),
        name: '兑换成功券',
        condition: '满100元可用',
        value: 1500,
        startAt: Math.floor(Date.now() / 1000),
        endAt: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30天后过期
        description: '通过兑换码 ' + code + ' 获得'
      })
      
      uni.showToast({
        title: '兑换成功！',
        icon: 'success'
      })
      
      exchangeCode.value = ''
    } else {
      uni.showToast({
        title: '兑换码无效，请输入 TEST123 测试',
        icon: 'none',
        duration: 3000
      })
    }
  }, 2000)
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f8f8f8;
}

.content {
  padding: 20rpx;
}

.demo-section {
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
}

.demo-item {
  padding: 30rpx;
  border-bottom: 1px solid #f0f0f0;
}

.demo-item:last-child {
  border-bottom: none;
}

.demo-label {
  display: block;
  font-size: 28rpx;
  color: #666;
  margin-bottom: 20rpx;
}

.coupon-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 0;
  background-color: #fff;
  border-radius: 12rpx;
  border: 1px solid #ebedf0;
  padding-left: 24rpx;
  padding-right: 24rpx;
}

.coupon-cell__text {
  font-size: 30rpx;
  color: #323233;
}

.coupon-cell__arrow {
  font-size: 32rpx;
  color: #969799;
  font-weight: bold;
}

.custom-footer {
  padding: 32rpx;
  text-align: center;
  background-color: #f7f8fa;
}

.custom-footer__text {
  font-size: 28rpx;
  color: #969799;
}

// 自定义样式示例
:deep(.custom-coupon-list) {
  .zx-coupon-list__exchange-btn {
    background-color: #1989fa;
  }
  
  .zx-coupon-list__tab--active {
    color: #1989fa;
  }
  
  .zx-coupon-list__tab--active::after {
    background-color: #1989fa;
  }
  
  .zx-coupon-list__close-btn {
    background-color: #1989fa;
  }
}
</style>