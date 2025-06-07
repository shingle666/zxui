<template>
  <view class="settle-bar-demo">
    <!-- 页面标题 -->
    <view class="demo-header">
      <text class="demo-title">SettleBar 结算栏</text>
      <text class="demo-desc">常用于购物车页面底部的结算栏组件</text>
    </view>

    <!-- 模拟购物车商品列表 -->
    <view class="cart-section">
      <view class="section-title">购物车商品</view>
      <view class="cart-list">
        <view 
          v-for="item in cartList" 
          :key="item.id" 
          class="cart-item"
        >
          <view class="item-checkbox">
            <zx-checkbox 
              v-model="item.checked" 
              :color="checkboxColor"
              :size="checkboxSize"
              @change="updateCheckAll"
            />
          </view>
          <image class="item-image" :src="item.image" mode="aspectFill" />
          <view class="item-info">
            <text class="item-name">{{ item.name }}</text>
            <text class="item-spec">{{ item.spec }}</text>
            <view class="item-price-row">
              <text class="item-price">¥{{ (item.price / 100).toFixed(2) }}</text>
              <view class="item-counter">
                <button 
                  class="counter-btn" 
                  @click="updateQuantity(item, -1)"
                  :disabled="item.quantity <= 1"
                >
                  -
                </button>
                <text class="counter-num">{{ item.quantity }}</text>
                <button class="counter-btn" @click="updateQuantity(item, 1)">+</button>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 示例区域 -->
    <view class="demo-section">
      <view class="section-title">基础用法</view>
      <view class="demo-block">
        <zx-settle-bar
          :price="totalPrice"
          :selected-count="selectedCount"
          :check-all="isAllChecked"
          @settle="handleSettle"
          @check-all="handleCheckAll"
          @update:check-all="handleCheckAll"
        />
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">显示原价</view>
      <view class="demo-block">
        <zx-settle-bar
          :price="totalPrice"
          :original-price="originalTotalPrice"
          :selected-count="selectedCount"
          :check-all="isAllChecked"
          @settle="handleSettle"
          @check-all="handleCheckAll"
        />
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">自定义按钮</view>
      <view class="demo-block">
        <zx-settle-bar
          :price="totalPrice"
          :selected-count="selectedCount"
          :check-all="isAllChecked"
          button-text="立即购买"
          button-type="danger"
          button-color="#ff4444"
          @settle="handleBuyNow"
          @check-all="handleCheckAll"
        />
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">加载状态</view>
      <view class="demo-block">
        <zx-settle-bar
          :price="totalPrice"
          :selected-count="selectedCount"
          :check-all="isAllChecked"
          :loading="loading"
          loading-text="结算中..."
          @settle="handleSettleWithLoading"
          @check-all="handleCheckAll"
        />
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">提示信息</view>
      <view class="demo-block">
        <zx-settle-bar
          :price="totalPrice"
          :selected-count="selectedCount"
          :check-all="isAllChecked"
          tip="满99元免运费，还差¥20.00"
          tip-icon="info"
          @settle="handleSettle"
          @check-all="handleCheckAll"
        />
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">禁用状态</view>
      <view class="demo-block">
        <zx-settle-bar
          :price="0"
          :selected-count="0"
          :check-all="false"
          :disabled="true"
          button-text="请选择商品"
          @settle="handleSettle"
          @check-all="handleCheckAll"
        />
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">自定义插槽</view>
      <view class="demo-block">
        <zx-settle-bar
          :price="totalPrice"
          :selected-count="selectedCount"
          :check-all="isAllChecked"
          @settle="handleSettle"
          @check-all="handleCheckAll"
        >
          <!-- 顶部插槽 -->
          <template #top>
            <view class="custom-top">
              <text class="coupon-text">🎫 有可用优惠券</text>
            </view>
          </template>
          
          <!-- 默认插槽 -->
          <view class="custom-content">
            <text class="discount-text">已优惠：¥20.00</text>
          </view>
        </zx-settle-bar>
      </view>
    </view>

    <view class="demo-section">
      <view class="section-title">自定义按钮插槽</view>
      <view class="demo-block">
        <zx-settle-bar
          :price="totalPrice"
          :selected-count="selectedCount"
          :check-all="isAllChecked"
          @check-all="handleCheckAll"
        >
          <template #button>
            <view class="custom-button-group">
              <button class="add-to-cart" @click="handleAddToCart">
                加入购物车
              </button>
              <button class="buy-now" @click="handleBuyNow">
                立即购买
              </button>
            </view>
          </template>
        </zx-settle-bar>
      </view>
    </view>

    <!-- 占位空间，避免被结算栏遮挡 -->
    <view class="bottom-placeholder"></view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import ZxSettleBar from '@tanzhenxing/zx-settle-bar/zx-settle-bar.vue'
import ZxCheckbox from '@tanzhenxing/zx-checkbox/zx-checkbox.vue'

// 复选框配置
const checkboxColor = ref('#1989fa')
const checkboxSize = ref(20)

// 加载状态
const loading = ref(false)

// 模拟购物车数据
const cartList = ref([
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    spec: '深空黑色 256GB',
    price: 999900, // 9999.00元，单位：分
    originalPrice: 1099900,
    quantity: 1,
    checked: false,
    image: 'https://img.yzcdn.cn/vant/iphone.jpeg'
  },
  {
    id: 2,
    name: 'AirPods Pro 2',
    spec: '白色 无线充电盒',
    price: 189900, // 1899.00元
    originalPrice: 199900,
    quantity: 2,
    checked: true,
    image: 'https://img.yzcdn.cn/vant/airpods.jpeg'
  },
  {
    id: 3,
    name: 'MacBook Pro 14',
    spec: '银色 M3 芯片 512GB',
    price: 1599900, // 15999.00元
    originalPrice: 1699900,
    quantity: 1,
    checked: true,
    image: 'https://img.yzcdn.cn/vant/macbook.jpeg'
  }
])

// 是否全选
const isAllChecked = computed(() => {
  return cartList.value.length > 0 && cartList.value.every(item => item.checked)
})

// 已选择数量
const selectedCount = computed(() => {
  return cartList.value
    .filter(item => item.checked)
    .reduce((total, item) => total + item.quantity, 0)
})

// 总价（当前价格）
const totalPrice = computed(() => {
  return cartList.value
    .filter(item => item.checked)
    .reduce((total, item) => total + (item.price * item.quantity), 0)
})

// 原价总计
const originalTotalPrice = computed(() => {
  return cartList.value
    .filter(item => item.checked)
    .reduce((total, item) => total + (item.originalPrice * item.quantity), 0)
})

// 处理全选
const handleCheckAll = (checked) => {
  console.log('全选状态改变:', checked)
  cartList.value.forEach(item => {
    item.checked = checked
  })
}

// 更新全选状态（当单个商品选择状态改变时）
const updateCheckAll = () => {
  // 计算属性会自动更新全选状态
  console.log('单个商品选择状态改变，当前全选状态:', isAllChecked.value)
}

// 更新商品数量
const updateQuantity = (item, delta) => {
  const newQuantity = item.quantity + delta
  if (newQuantity >= 1) {
    item.quantity = newQuantity
  }
}

// 处理结算
const handleSettle = (data) => {
  console.log('结算数据:', data)
  const selectedItems = cartList.value.filter(item => item.checked)
  
  if (selectedItems.length === 0) {
    uni.showToast({
      title: '请选择要结算的商品',
      icon: 'none'
    })
    return
  }
  
  uni.showModal({
    title: '确认结算',
    content: `共${data.selectedCount}件商品，总计¥${(data.price / 100).toFixed(2)}`,
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '结算成功',
          icon: 'success'
        })
      }
    }
  })
}

// 处理带加载状态的结算
const handleSettleWithLoading = (data) => {
  console.log('带加载状态的结算:', data)
  loading.value = true
  
  // 模拟异步操作
  setTimeout(() => {
    loading.value = false
    uni.showToast({
      title: '结算完成',
      icon: 'success'
    })
  }, 2000)
}

// 处理立即购买
const handleBuyNow = () => {
  uni.showToast({
    title: '立即购买',
    icon: 'success'
  })
}

// 处理加入购物车
const handleAddToCart = () => {
  uni.showToast({
    title: '已加入购物车',
    icon: 'success'
  })
}
</script>

<style lang="scss" scoped>
.settle-bar-demo {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 200rpx;
}

.demo-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60rpx 32rpx 40rpx;
  color: white;
  
  .demo-title {
    display: block;
    font-size: 48rpx;
    font-weight: bold;
    margin-bottom: 16rpx;
  }
  
  .demo-desc {
    display: block;
    font-size: 28rpx;
    opacity: 0.8;
  }
}

.cart-section {
  background: white;
  margin: 20rpx 0;
}

.section-title {
  padding: 32rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #323233;
  border-bottom: 1rpx solid #ebedf0;
}

.cart-list {
  .cart-item {
    display: flex;
    align-items: center;
    padding: 32rpx;
    border-bottom: 1rpx solid #ebedf0;
    
    &:last-child {
      border-bottom: none;
    }
    
    .item-checkbox {
      margin-right: 24rpx;
    }
    
    .item-image {
      width: 160rpx;
      height: 160rpx;
      border-radius: 16rpx;
      margin-right: 24rpx;
      background-color: #f5f5f5;
    }
    
    .item-info {
      flex: 1;
      
      .item-name {
        display: block;
        font-size: 32rpx;
        font-weight: 500;
        color: #323233;
        margin-bottom: 8rpx;
        line-height: 1.4;
      }
      
      .item-spec {
        display: block;
        font-size: 24rpx;
        color: #969799;
        margin-bottom: 16rpx;
      }
      
      .item-price-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        .item-price {
          font-size: 32rpx;
          font-weight: 600;
          color: #ee0a24;
        }
        
        .item-counter {
          display: flex;
          align-items: center;
          
          .counter-btn {
            width: 56rpx;
            height: 56rpx;
            border: 1rpx solid #dcdee0;
            background: white;
            color: #323233;
            font-size: 32rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            
            &:first-child {
              border-radius: 8rpx 0 0 8rpx;
            }
            
            &:last-child {
              border-radius: 0 8rpx 8rpx 0;
            }
            
            &:disabled {
              color: #c8c9cc;
              background: #f5f6fa;
            }
          }
          
          .counter-num {
            width: 80rpx;
            height: 56rpx;
            border-top: 1rpx solid #dcdee0;
            border-bottom: 1rpx solid #dcdee0;
            background: white;
            text-align: center;
            line-height: 56rpx;
            font-size: 28rpx;
          }
        }
      }
    }
  }
}

.demo-section {
  background: white;
  margin: 20rpx 0;
  
  .demo-block {
    padding: 32rpx;
  }
}

.custom-top {
  background: #fff7e8;
  padding: 16rpx 32rpx;
  
  .coupon-text {
    font-size: 24rpx;
    color: #f56723;
  }
}

.custom-content {
  .discount-text {
    font-size: 24rpx;
    color: #07c160;
  }
}

.custom-button-group {
  display: flex;
  gap: 16rpx;
  
  .add-to-cart {
    flex: 1;
    height: 80rpx;
    background: white;
    border: 2rpx solid #1989fa;
    color: #1989fa;
    border-radius: 40rpx;
    font-size: 28rpx;
  }
  
  .buy-now {
    flex: 1;
    height: 80rpx;
    background: #1989fa;
    color: white;
    border: none;
    border-radius: 40rpx;
    font-size: 28rpx;
  }
}

.bottom-placeholder {
  height: 200rpx;
}
</style>