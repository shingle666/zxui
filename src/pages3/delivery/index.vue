<template>
  <view class="delivery-demo">
    <!-- 页面标题 -->
    <zx-navbar title="配送组件示例" left-arrow @click-left="goBack" />
    
    <!-- 基础用法 -->
    <view class="demo-section">
      <view class="demo-title">基础用法</view>
      <zx-delivery
        v-model="basicDelivery.method"
        :delivery-methods="deliveryMethods"
        :delivery-times="deliveryTimes"
        :address="basicDelivery.address"
        :remark="basicDelivery.remark"
        @change="onBasicDeliveryChange"
        @address-select="onAddressSelect"
      />
    </view>
    
    <!-- 自定义配送方式 -->
    <view class="demo-section">
      <view class="demo-title">自定义配送方式</view>
      <zx-delivery
        v-model="customDelivery.method"
        :delivery-methods="customMethods"
        :show-time-select="false"
        :show-address="false"
        :show-remark="false"
        @change="onCustomDeliveryChange"
      />
    </view>
    
    <!-- 隐藏部分功能 -->
    <view class="demo-section">
      <view class="demo-title">隐藏部分功能</view>
      <zx-delivery
        v-model="simpleDelivery.method"
        :delivery-methods="simpleMethodsData"
        :show-time-select="false"
        :show-address="false"
        :show-remark="false"
        :show-fee-detail="true"
        @change="onSimpleDeliveryChange"
      />
    </view>
    
    <!-- 自定义样式 -->
    <view class="demo-section">
      <view class="demo-title">自定义样式</view>
      <zx-delivery
        v-model="styledDelivery.method"
        :delivery-methods="styledMethods"
        :active-color="'#ff6b35'"
        :icon-size="48"
        :radio-size="40"
        custom-class="custom-delivery"
        :show-time-select="false"
        :show-address="false"
        :show-remark="false"
        @change="onStyledDeliveryChange"
      />
    </view>
    
    <!-- 带额外费用 -->
    <view class="demo-section">
      <view class="demo-title">带额外费用</view>
      <zx-delivery
        v-model="feeDelivery.method"
        :delivery-methods="feeMethodsData"
        :extra-fee="extraFee"
        extra-fee-label="加急费"
        :show-time-select="false"
        :show-address="false"
        :show-remark="false"
        @change="onFeeDeliveryChange"
      />
    </view>
    
    <!-- 表单集成示例 -->
    <view class="demo-section">
      <view class="demo-title">表单集成</view>
      <zx-form ref="formRef" :model="formData" :rules="formRules">
        <zx-form-item label="收货人" name="receiver" required>
          <zx-input 
            v-model="formData.receiver"
            placeholder="请输入收货人姓名"
          />
        </zx-form-item>
        
        <zx-form-item label="联系电话" name="phone" required>
          <zx-input 
            v-model="formData.phone"
            type="tel"
            placeholder="请输入联系电话"
          />
        </zx-form-item>
        
        <zx-form-item label="配送信息" name="delivery" required>
          <zx-delivery
            ref="deliveryRef"
            v-model="formData.delivery.method"
            :delivery-methods="deliveryMethods"
            :delivery-times="deliveryTimes"
            :address="formData.delivery.address"
            :remark="formData.delivery.remark"
            @change="onFormDeliveryChange"
            @address-select="onFormAddressSelect"
          />
        </zx-form-item>
        
        <view class="form-buttons">
          <zx-button type="primary" @click="handleSubmit">提交订单</zx-button>
          <zx-button @click="handleReset">重置表单</zx-button>
        </view>
      </zx-form>
    </view>
    
    <!-- 操作结果展示 -->
    <view class="demo-section">
      <view class="demo-title">操作结果</view>
      <view class="result-display">
        <view class="result-item">
          <text class="result-label">基础用法:</text>
          <text class="result-value">{{ JSON.stringify(basicDelivery, null, 2) }}</text>
        </view>
        <view class="result-item">
          <text class="result-label">自定义方式:</text>
          <text class="result-value">{{ JSON.stringify(customDelivery, null, 2) }}</text>
        </view>
        <view class="result-item">
          <text class="result-label">表单数据:</text>
          <text class="result-value">{{ JSON.stringify(formData, null, 2) }}</text>
        </view>
      </view>
    </view>
    
    <!-- 地址选择弹窗 -->
    <zx-popup 
      v-model:show="showAddressPicker"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <view class="address-picker">
        <view class="address-picker__header">
          <text class="address-picker__title">选择配送地址</text>
          <zx-icon name="close" @click="showAddressPicker = false" />
        </view>
        <view class="address-picker__content">
          <view 
            v-for="(address, index) in addressList" 
            :key="index"
            class="address-item"
            @click="selectAddress(address)"
          >
            <view class="address-item__info">
              <view class="address-item__name">{{ address.name }} {{ address.phone }}</view>
              <view class="address-item__detail">{{ address.detail }}</view>
            </view>
            <zx-icon 
              v-if="selectedAddressIndex === index"
              name="success" 
              color="#1989fa" 
            />
          </view>
        </view>
      </view>
    </zx-popup>
    
    <!-- Toast 提示 -->
    <zx-toast ref="toastRef" />
  </view>
</template>

<script setup>
import { ref, reactive, computed, nextTick } from 'vue'
import zxNavbar from '@tanzhenxing/zx-navbar/zx-navbar.vue'
import zxDelivery from '@tanzhenxing/zx-delivery/zx-delivery.vue'
import zxForm from '@tanzhenxing/zx-form/zx-form.vue'
import zxFormItem from '@tanzhenxing/zx-form-item/zx-form-item.vue'
import zxInput from '@tanzhenxing/zx-input/zx-input.vue'
import zxButton from '@tanzhenxing/zx-button/zx-button.vue'
import zxPopup from '@tanzhenxing/zx-popup/zx-popup.vue'
import zxIcon from '@tanzhenxing/zx-icon/zx-icon.vue'
import zxToast from '@tanzhenxing/zx-toast/zx-toast.vue'

// 页面引用
const formRef = ref()
const deliveryRef = ref()
const toastRef = ref()

// 地址选择相关
const showAddressPicker = ref(false)
const selectedAddressIndex = ref(0)
const currentAddressTarget = ref('basic') // 'basic', 'form'

// 基础配送数据
const basicDelivery = reactive({
  method: 'express',
  time: 'morning',
  address: {
    name: '张三',
    phone: '13800138000',
    detail: '北京市朝阳区xxx街道xxx号xxx小区xxx单元xxx室'
  },
  remark: '',
  totalFee: 0
})

// 自定义配送数据
const customDelivery = reactive({
  method: 'standard',
  totalFee: 0
})

// 简单配送数据
const simpleDelivery = reactive({
  method: 'free',
  totalFee: 0
})

// 样式配送数据
const styledDelivery = reactive({
  method: 'premium',
  totalFee: 0
})

// 费用配送数据
const feeDelivery = reactive({
  method: 'express',
  totalFee: 0
})

// 额外费用
const extraFee = ref(15)

// 表单数据
const formData = reactive({
  receiver: '李四',
  phone: '13900139000',
  delivery: {
    method: 'same-day',
    time: 'afternoon',
    address: {
      name: '李四',
      phone: '13900139000',
      detail: '上海市浦东新区xxx路xxx号xxx大厦xxx层'
    },
    remark: '请放在前台',
    totalFee: 0
  }
})

// 表单验证规则
const formRules = {
  receiver: [
    { required: true, message: '请输入收货人姓名' }
  ],
  phone: [
    { required: true, message: '请输入联系电话' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
  ],
  delivery: [
    { required: true, message: '请选择配送方式' }
  ]
}

// 配送方式数据
const deliveryMethods = ref([
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
    desc: '免配送费，营业时间内可取',
    icon: 'shop',
    price: 0,
    disabled: false
  }
])

// 自定义配送方式
const customMethods = ref([
  {
    value: 'standard',
    name: '标准配送',
    desc: '5-7个工作日',
    icon: 'truck',
    price: 0,
    disabled: false
  },
  {
    value: 'premium',
    name: '加急配送',
    desc: '1-2个工作日',
    icon: 'flash',
    price: 30,
    disabled: false
  },
  {
    value: 'international',
    name: '国际配送',
    desc: '10-15个工作日',
    icon: 'global',
    price: 100,
    disabled: true
  }
])

// 简单配送方式
const simpleMethodsData = ref([
  {
    value: 'free',
    name: '免费配送',
    desc: '满99元免运费',
    icon: 'gift',
    price: 0,
    disabled: false
  },
  {
    value: 'paid',
    name: '付费配送',
    desc: '全国包邮',
    icon: 'truck',
    price: 12,
    disabled: false
  }
])

// 样式配送方式
const styledMethods = ref([
  {
    value: 'premium',
    name: '尊享配送',
    desc: '专人配送，当日达',
    icon: 'diamond',
    price: 50,
    disabled: false
  },
  {
    value: 'vip',
    name: 'VIP配送',
    desc: '白手套服务',
    icon: 'crown',
    price: 100,
    disabled: false
  }
])

// 费用配送方式
const feeMethodsData = ref([
  {
    value: 'express',
    name: '普通快递',
    desc: '3-5个工作日',
    icon: 'truck',
    price: 8,
    disabled: false
  },
  {
    value: 'urgent',
    name: '加急配送',
    desc: '24小时内送达',
    icon: 'flash',
    price: 25,
    disabled: false
  }
])

// 配送时间数据
const deliveryTimes = ref([
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
  },
  {
    value: 'weekend',
    label: '周末',
    desc: '周六日全天',
    disabled: false
  }
])

// 地址列表
const addressList = ref([
  {
    name: '张三',
    phone: '13800138000',
    detail: '北京市朝阳区xxx街道xxx号xxx小区xxx单元xxx室'
  },
  {
    name: '李四',
    phone: '13900139000',
    detail: '上海市浦东新区xxx路xxx号xxx大厦xxx层'
  },
  {
    name: '王五',
    phone: '13700137000',
    detail: '广州市天河区xxx大道xxx号xxx广场xxx室'
  }
])

// 事件处理
const onBasicDeliveryChange = (data) => {
  Object.assign(basicDelivery, data)
  console.log('基础配送变化:', data)
}

const onCustomDeliveryChange = (data) => {
  Object.assign(customDelivery, data)
  console.log('自定义配送变化:', data)
}

const onSimpleDeliveryChange = (data) => {
  Object.assign(simpleDelivery, data)
  console.log('简单配送变化:', data)
}

const onStyledDeliveryChange = (data) => {
  Object.assign(styledDelivery, data)
  console.log('样式配送变化:', data)
}

const onFeeDeliveryChange = (data) => {
  Object.assign(feeDelivery, data)
  console.log('费用配送变化:', data)
}

const onFormDeliveryChange = (data) => {
  Object.assign(formData.delivery, data)
  console.log('表单配送变化:', data)
}

const onAddressSelect = () => {
  currentAddressTarget.value = 'basic'
  selectedAddressIndex.value = addressList.value.findIndex(
    addr => addr.detail === basicDelivery.address?.detail
  )
  if (selectedAddressIndex.value === -1) {
    selectedAddressIndex.value = 0
  }
  showAddressPicker.value = true
}

const onFormAddressSelect = () => {
  currentAddressTarget.value = 'form'
  selectedAddressIndex.value = addressList.value.findIndex(
    addr => addr.detail === formData.delivery.address?.detail
  )
  if (selectedAddressIndex.value === -1) {
    selectedAddressIndex.value = 1
  }
  showAddressPicker.value = true
}

const selectAddress = (address) => {
  selectedAddressIndex.value = addressList.value.indexOf(address)
  
  if (currentAddressTarget.value === 'basic') {
    basicDelivery.address = { ...address }
  } else if (currentAddressTarget.value === 'form') {
    formData.delivery.address = { ...address }
  }
  
  showAddressPicker.value = false
  
  toastRef.value?.show({
    message: '地址选择成功',
    type: 'success'
  })
}

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    const deliveryData = deliveryRef.value.getDeliveryData()
    
    const submitData = {
      ...formData,
      delivery: deliveryData
    }
    
    console.log('提交数据:', submitData)
    
    toastRef.value?.show({
      message: '订单提交成功',
      type: 'success',
      duration: 2000
    })
    
    // 模拟提交成功后的操作
    setTimeout(() => {
      uni.showModal({
        title: '提交成功',
        content: `订单已提交\n配送方式: ${deliveryData.methodInfo?.name}\n总费用: ¥${deliveryData.totalFee}`,
        showCancel: false
      })
    }, 2000)
    
  } catch (error) {
    console.log('验证失败:', error)
    toastRef.value?.show({
      message: '请完善表单信息',
      type: 'error'
    })
  }
}

const handleReset = () => {
  formRef.value?.resetFields()
  
  // 重置配送信息
  formData.delivery = {
    method: '',
    time: '',
    address: null,
    remark: '',
    totalFee: 0
  }
  
  toastRef.value?.show({
    message: '表单已重置',
    type: 'info'
  })
}

const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.delivery-demo {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.demo-section {
  margin-bottom: 32rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.demo-title {
  padding: 32rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #323233;
  background-color: #fff;
  border-bottom: 1rpx solid #ebedf0;
}

.form-buttons {
  display: flex;
  gap: 24rpx;
  padding: 32rpx;
  background-color: #fff;
  
  .zx-button {
    flex: 1;
  }
}

.result-display {
  background-color: #fff;
  padding: 32rpx;
}

.result-item {
  margin-bottom: 24rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.result-label {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: #323233;
  margin-bottom: 12rpx;
}

.result-value {
  display: block;
  font-size: 24rpx;
  color: #646566;
  background-color: #f8f9fa;
  padding: 16rpx;
  border-radius: 8rpx;
  white-space: pre-wrap;
  word-break: break-all;
}

.address-picker {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32rpx;
    border-bottom: 1rpx solid #ebedf0;
  }
  
  &__title {
    font-size: 32rpx;
    font-weight: 600;
    color: #323233;
  }
  
  &__content {
    flex: 1;
    overflow-y: auto;
    padding: 24rpx 0;
  }
}

.address-item {
  display: flex;
  align-items: center;
  padding: 24rpx 32rpx;
  border-bottom: 1rpx solid #f0f1f5;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:active {
    background-color: #f8f9fa;
  }
  
  &__info {
    flex: 1;
    min-width: 0;
  }
  
  &__name {
    font-size: 28rpx;
    font-weight: 500;
    color: #323233;
    margin-bottom: 8rpx;
  }
  
  &__detail {
    font-size: 26rpx;
    color: #969799;
    line-height: 1.4;
  }
}

// 自定义样式示例
:deep(.custom-delivery) {
  --zx-delivery-active-color: #ff6b35;
  --zx-delivery-method-radius: 20rpx;
  --zx-delivery-time-radius: 20rpx;
  --zx-delivery-active-bg: #fff5f0;
}

// 响应式适配
@media (max-width: 750rpx) {
  .form-buttons {
    flex-direction: column;
    
    .zx-button {
      flex: none;
    }
  }
}
</style>