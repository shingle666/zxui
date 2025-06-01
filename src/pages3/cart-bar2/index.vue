<template>
  <view class="page">
    <!-- 页面标题 -->
    <view class="page-title">ZX-Cart-Bar2 购物车底部栏</view>
    
    <!-- 购物车列表 -->
    <view class="cart-list">
      <view class="cart-item" v-for="(item, index) in cartList" :key="item.id">
        <view class="item-checkbox">
          <zx-checkbox 
            v-model="item.checked" 
            :color="checkboxColor"
            @change="onItemCheck"
          ></zx-checkbox>
        </view>
        <view class="item-image">
          <image :src="item.image" mode="aspectFill"></image>
        </view>
        <view class="item-info">
          <view class="item-title">{{ item.title }}</view>
          <view class="item-spec">{{ item.spec }}</view>
          <view class="item-price-row">
            <view class="item-price">¥{{ (item.price / 100).toFixed(2) }}</view>
            <view class="item-quantity">
              <zx-button 
                size="mini" 
                type="default" 
                @click="decreaseQuantity(index)"
                :disabled="item.quantity <= 1"
              >
                -
              </zx-button>
              <text class="quantity-text">{{ item.quantity }}</text>
              <zx-button 
                size="mini" 
                type="default" 
                @click="increaseQuantity(index)"
              >
                +
              </zx-button>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 功能演示区域 -->
    <view class="demo-section">
      <view class="section-title">功能演示</view>
      
      <!-- 基础功能切换 -->
      <view class="demo-row">
        <text class="demo-label">显示原价和优惠：</text>
        <zx-switch v-model="showOriginalPrice" @change="onToggleOriginalPrice"></zx-switch>
      </view>
      
      <view class="demo-row">
        <text class="demo-label">显示收藏按钮：</text>
        <zx-switch v-model="showFavoriteButton"></zx-switch>
      </view>
      
      <view class="demo-row">
        <text class="demo-label">显示提示信息：</text>
        <zx-switch v-model="showTip"></zx-switch>
      </view>
      
      <view class="demo-row">
        <text class="demo-label">显示阴影：</text>
        <zx-switch v-model="showShadow"></zx-switch>
      </view>
      
      <view class="demo-row">
        <text class="demo-label">显示边框：</text>
        <zx-switch v-model="showBorder"></zx-switch>
      </view>
      
      <view class="demo-row">
        <text class="demo-label">显示全选：</text>
        <zx-switch v-model="showCheckAll"></zx-switch>
      </view>
      
      <view class="demo-row">
        <text class="demo-label">显示数量：</text>
        <zx-switch v-model="showCount"></zx-switch>
      </view>
      
      <view class="demo-row">
        <text class="demo-label">加载状态：</text>
        <zx-switch v-model="loading"></zx-switch>
      </view>
      
      <view class="demo-row">
        <text class="demo-label">禁用状态：</text>
        <zx-switch v-model="disabled"></zx-switch>
      </view>
      
      <!-- 按钮样式切换 -->
      <view class="demo-row">
        <text class="demo-label">按钮类型：</text>
        <zx-radio-group v-model="buttonType" direction="horizontal">
          <zx-radio name="primary">Primary</zx-radio>
          <zx-radio name="danger">Danger</zx-radio>
          <zx-radio name="warning">Warning</zx-radio>
        </zx-radio-group>
      </view>
      
      <!-- 自定义插槽演示 -->
      <view class="demo-row">
        <text class="demo-label">自定义左侧内容：</text>
        <zx-switch v-model="showCustomLeft"></zx-switch>
      </view>
      
      <view class="demo-row">
        <text class="demo-label">自定义按钮：</text>
        <zx-switch v-model="showCustomButton"></zx-switch>
      </view>
    </view>
    
    <!-- 底部占位 -->
    <view class="cart-bar-placeholder"></view>
    
    <!-- 购物车底部栏 -->
    <zx-cart-bar2
      v-model:all-checked="allChecked"
      :total-price="totalPrice"
      :original-price="originalPrice"
      :checked-count="checkedCount"
      :total-count="totalCount"
      :show-check-all="showCheckAll"
      :show-count="showCount"
      :show-original-price="showOriginalPrice"
      :show-favorite-button="showFavoriteButton"
      :show-shadow="showShadow"
      :show-border="showBorder"
      :tip="showTip ? tipText : ''"
      :tip-icon="showTip ? 'info-circle' : ''"
      :tip-closable="showTip"
      :button-type="buttonType"
      :loading="loading"
      :disabled="disabled"
      :discount-text="showOriginalPrice ? discountText : ''"
      @submit="handleSubmit"
      @check-all="handleCheckAll"
      @favorite="handleFavorite"
      @tip-close="handleTipClose"
    >
      <!-- 自定义左侧内容 -->
      <template #left v-if="showCustomLeft">
        <view class="custom-left">
          <zx-icon name="gift" color="#ff6900" size="20"></zx-icon>
          <text class="gift-text">有礼品</text>
        </view>
      </template>
      
      <!-- 自定义按钮 -->
      <template #button v-if="showCustomButton">
        <view class="custom-buttons">
          <zx-button 
            type="warning" 
            size="small" 
            round
            @click="addToFavorites"
          >
            收藏
          </zx-button>
          <zx-button 
            type="danger" 
            round
            :disabled="checkedCount === 0"
            @click="buyNow"
          >
            立即购买({{ checkedCount }})
          </zx-button>
        </view>
      </template>
    </zx-cart-bar2>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// 购物车数据
const cartList = ref([
  {
    id: 1,
    title: 'iPhone 15 Pro Max',
    spec: '深空黑色 256GB',
    price: 999900, // 9999.00元，以分为单位
    quantity: 1,
    checked: true,
    image: 'https://img.yzcdn.cn/vant/iphone.jpeg'
  },
  {
    id: 2,
    title: 'MacBook Pro 16英寸',
    spec: '银色 M3 Pro 512GB',
    price: 1999900, // 19999.00元
    quantity: 1,
    checked: true,
    image: 'https://img.yzcdn.cn/vant/macbook.jpeg'
  },
  {
    id: 3,
    title: 'AirPods Pro 2',
    spec: '白色 USB-C',
    price: 189900, // 1899.00元
    quantity: 2,
    checked: false,
    image: 'https://img.yzcdn.cn/vant/airpods.jpeg'
  },
  {
    id: 4,
    title: 'Apple Watch Series 9',
    spec: '午夜色 45mm GPS',
    price: 329900, // 3299.00元
    quantity: 1,
    checked: false,
    image: 'https://img.yzcdn.cn/vant/watch.jpeg'
  },
  {
    id: 5,
    title: 'iPad Air 5',
    spec: '深空灰色 256GB WiFi',
    price: 479900, // 4799.00元
    quantity: 1,
    checked: false,
    image: 'https://img.yzcdn.cn/vant/ipad.jpeg'
  }
])

// 组件状态
const allChecked = ref(false)
const showOriginalPrice = ref(false)
const showFavoriteButton = ref(false)
const showTip = ref(true)
const showShadow = ref(true)
const showBorder = ref(true)
const showCheckAll = ref(true)
const showCount = ref(true)
const loading = ref(false)
const disabled = ref(false)
const buttonType = ref('danger')
const showCustomLeft = ref(false)
const showCustomButton = ref(false)
const checkboxColor = ref('#ff6900')

// 提示信息
const tipText = ref('满99元免运费，还差21元')
const discountText = ref('已优惠 ¥500.00')

// 计算属性
const checkedItems = computed(() => {
  return cartList.value.filter(item => item.checked)
})

const checkedCount = computed(() => {
  return checkedItems.value.reduce((total, item) => total + item.quantity, 0)
})

const totalCount = computed(() => {
  return cartList.value.reduce((total, item) => total + item.quantity, 0)
})

const totalPrice = computed(() => {
  return checkedItems.value.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
})

const originalPrice = computed(() => {
  // 模拟原价比总价高500元
  return totalPrice.value + 50000
})

// 监听全选状态变化
watch(allChecked, (newVal) => {
  cartList.value.forEach(item => {
    item.checked = newVal
  })
})

// 监听商品选中状态变化
watch(cartList, () => {
  const checkedItemsCount = cartList.value.filter(item => item.checked).length
  allChecked.value = checkedItemsCount === cartList.value.length && cartList.value.length > 0
}, { deep: true })

// 方法
const onItemCheck = () => {
  // 商品选中状态变化时的处理
  console.log('商品选中状态变化')
}

const decreaseQuantity = (index) => {
  if (cartList.value[index].quantity > 1) {
    cartList.value[index].quantity--
  }
}

const increaseQuantity = (index) => {
  cartList.value[index].quantity++
}

const onToggleOriginalPrice = (value) => {
  console.log('切换原价显示:', value)
}

const handleSubmit = (data) => {
  console.log('提交订单:', data)
  
  if (checkedCount.value === 0) {
    uni.showToast({
      title: '请选择商品',
      icon: 'none'
    })
    return
  }
  
  // 模拟提交
  loading.value = true
  setTimeout(() => {
    loading.value = false
    uni.showToast({
      title: `提交成功，共${checkedCount.value}件商品`,
      icon: 'success'
    })
  }, 2000)
}

const handleCheckAll = (checked) => {
  console.log('全选状态变化:', checked)
  cartList.value.forEach(item => {
    item.checked = checked
  })
}

const handleFavorite = (data) => {
  console.log('收藏商品:', data)
  
  if (checkedCount.value === 0) {
    uni.showToast({
      title: '请选择要收藏的商品',
      icon: 'none'
    })
    return
  }
  
  uni.showToast({
    title: `已收藏${checkedCount.value}件商品`,
    icon: 'success'
  })
}

const handleTipClose = () => {
  console.log('提示已关闭')
  showTip.value = false
}

// 自定义按钮事件
const addToFavorites = () => {
  console.log('添加到收藏夹')
  uni.showToast({
    title: '已添加到收藏夹',
    icon: 'success'
  })
}

const buyNow = () => {
  console.log('立即购买')
  if (checkedCount.value === 0) {
    uni.showToast({
      title: '请选择商品',
      icon: 'none'
    })
    return
  }
  
  uni.showToast({
    title: `立即购买${checkedCount.value}件商品`,
    icon: 'success'
  })
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 200rpx;
}

.page-title {
  background: #fff;
  padding: 40rpx 32rpx 20rpx;
  font-size: 36rpx;
  font-weight: 600;
  color: #323233;
  text-align: center;
  border-bottom: 1rpx solid #ebedf0;
}

.cart-list {
  background: #fff;
  margin-top: 20rpx;
}

.cart-item {
  display: flex;
  align-items: flex-start;
  padding: 32rpx;
  border-bottom: 1rpx solid #ebedf0;
  
  &:last-child {
    border-bottom: none;
  }
}

.item-checkbox {
  margin-right: 24rpx;
  margin-top: 8rpx;
}

.item-image {
  width: 160rpx;
  height: 160rpx;
  margin-right: 24rpx;
  border-radius: 12rpx;
  overflow: hidden;
  
  image {
    width: 100%;
    height: 100%;
  }
}

.item-info {
  flex: 1;
  min-height: 160rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #323233;
  line-height: 1.4;
  margin-bottom: 8rpx;
}

.item-spec {
  font-size: 24rpx;
  color: #969799;
  margin-bottom: 16rpx;
}

.item-price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-price {
  font-size: 32rpx;
  font-weight: 600;
  color: #ee0a24;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.quantity-text {
  font-size: 28rpx;
  color: #323233;
  min-width: 60rpx;
  text-align: center;
}

.demo-section {
  background: #fff;
  margin-top: 20rpx;
  padding: 32rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #323233;
  margin-bottom: 32rpx;
}

.demo-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.demo-label {
  font-size: 28rpx;
  color: #323233;
}

.cart-bar-placeholder {
  height: 200rpx;
}

// 自定义插槽样式
.custom-left {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.gift-text {
  font-size: 24rpx;
  color: #ff6900;
}

.custom-buttons {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
</style>