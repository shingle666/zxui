<template>
  <view class="container">
    <!-- 页面标题 -->
    <zx-navbar title="商品规格选择" :border="false" />
    
    <!-- 示例列表 -->
    <scroll-view scroll-y class="scroll-view">
      <view class="demo-section">
        <view class="demo-title">基础用法</view>
        <view class="demo-item" @click="showBasicSku">
          <view class="demo-item-content">
            <view class="demo-item-title">基础商品规格选择</view>
            <view class="demo-item-desc">最基本的商品规格选择功能</view>
          </view>
          <text class="demo-item-arrow">></text>
        </view>
      </view>

      <view class="demo-section">
        <view class="demo-title">多规格选择</view>
        <view class="demo-item" @click="showMultiSku">
          <view class="demo-item-content">
            <view class="demo-item-title">多规格商品</view>
            <view class="demo-item-desc">包含颜色、尺寸、版本等多个规格</view>
          </view>
          <text class="demo-item-arrow">></text>
        </view>
      </view>

      <view class="demo-section">
        <view class="demo-title">自定义按钮</view>
        <view class="demo-item" @click="showCustomBtnSku">
          <view class="demo-item-content">
            <view class="demo-item-title">自定义操作按钮</view>
            <view class="demo-item-desc">立即购买 + 加入购物车</view>
          </view>
          <text class="demo-item-arrow">></text>
        </view>
      </view>

      <view class="demo-section">
        <view class="demo-title">库存限制</view>
        <view class="demo-item" @click="showStockLimitSku">
          <view class="demo-item-content">
            <view class="demo-item-title">库存数量限制</view>
            <view class="demo-item-desc">根据库存限制最大购买数量</view>
          </view>
          <text class="demo-item-arrow">></text>
        </view>
      </view>

      <view class="demo-section">
        <view class="demo-title">不可售规格</view>
        <view class="demo-item" @click="showDisabledSku">
          <view class="demo-item-content">
            <view class="demo-item-title">包含不可售规格</view>
            <view class="demo-item-desc">某些规格组合不可选择</view>
          </view>
          <text class="demo-item-arrow">></text>
        </view>
      </view>

      <view class="demo-section">
        <view class="demo-title">自定义插槽</view>
        <view class="demo-item" @click="showCustomSlotSku">
          <view class="demo-item-content">
            <view class="demo-item-title">使用自定义插槽</view>
            <view class="demo-item-desc">自定义规格选择区域内容</view>
          </view>
          <text class="demo-item-arrow">></text>
        </view>
      </view>
    </scroll-view>

    <!-- 基础用法 -->
    <zx-goods-sku
      v-model:show="basicSkuVisible"
      :sku="basicSkuData"
      :goods="basicGoodsData"
      @select-sku="onSelectSku"
      @change-stepper="onChangeStepper"
      @click-btn-operate="onClickBtnOperate"
    />

    <!-- 多规格选择 -->
    <zx-goods-sku
      v-model:show="multiSkuVisible"
      :sku="multiSkuData"
      :goods="multiGoodsData"
      @select-sku="onSelectSku"
      @change-stepper="onChangeStepper"
      @click-btn-operate="onClickBtnOperate"
    />

    <!-- 自定义按钮 -->
    <zx-goods-sku
      v-model:show="customBtnSkuVisible"
      :sku="customBtnSkuData"
      :goods="customBtnGoodsData"
      :btn-options="['buy', 'cart']"
      buy-text="立即购买"
      add-cart-text="加入购物车"
      @select-sku="onSelectSku"
      @change-stepper="onChangeStepper"
      @click-btn-operate="onClickBtnOperate"
    />

    <!-- 库存限制 -->
    <zx-goods-sku
      v-model:show="stockLimitSkuVisible"
      :sku="stockLimitSkuData"
      :goods="stockLimitGoodsData"
      :stepper-max="stockLimitGoodsData.stock"
      @select-sku="onSelectSku"
      @change-stepper="onChangeStepper"
      @click-btn-operate="onClickBtnOperate"
      @over-limit="onOverLimit"
    />

    <!-- 不可售规格 -->
    <zx-goods-sku
      v-model:show="disabledSkuVisible"
      :sku="disabledSkuData"
      :goods="disabledGoodsData"
      @select-sku="onSelectSku"
      @change-stepper="onChangeStepper"
      @click-btn-operate="onClickBtnOperate"
    />

    <!-- 自定义插槽 -->
    <zx-goods-sku
      v-model:show="customSlotSkuVisible"
      :sku="customSlotSkuData"
      :goods="customSlotGoodsData"
      @select-sku="onSelectSku"
      @change-stepper="onChangeStepper"
      @click-btn-operate="onClickBtnOperate"
    >
      <template #sku-select-top>
        <view class="custom-tip">
          <text class="custom-tip-text">💡 选择您喜欢的规格组合</text>
        </view>
      </template>
      
      <template #sku-stepper-bottom>
        <view class="custom-service">
          <text class="custom-service-text">🛡️ 7天无理由退换 | 📞 24小时客服</text>
        </view>
      </template>
    </zx-goods-sku>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 基础用法
const basicSkuVisible = ref(false)
const basicSkuData = ref([
  {
    id: 1,
    name: '颜色',
    list: [
      { id: 101, name: '黑色', active: false, disabled: false },
      { id: 102, name: '白色', active: false, disabled: false },
      { id: 103, name: '红色', active: false, disabled: false }
    ]
  }
])
const basicGoodsData = ref({
  image: 'https://img.yzcdn.cn/vant/sku/shoes-1.png',
  price: '199.00',
  originalPrice: '299.00',
  stock: 100
})

// 多规格选择
const multiSkuVisible = ref(false)
const multiSkuData = ref([
  {
    id: 1,
    name: '颜色',
    list: [
      { id: 101, name: '亮黑色', active: false, disabled: false },
      { id: 102, name: '釉白色', active: false, disabled: false },
      { id: 103, name: '秘银色', active: false, disabled: false },
      { id: 104, name: '夏日胡杨', active: false, disabled: false }
    ]
  },
  {
    id: 2,
    name: '版本',
    list: [
      { id: 201, name: '8GB+128GB', active: false, disabled: false },
      { id: 202, name: '8GB+256GB', active: false, disabled: false },
      { id: 203, name: '12GB+256GB', active: false, disabled: false }
    ]
  },
  {
    id: 3,
    name: '套餐',
    list: [
      { id: 301, name: '官方标配', active: false, disabled: false },
      { id: 302, name: '充电套装', active: false, disabled: false },
      { id: 303, name: '保护套装', active: false, disabled: false }
    ]
  }
])
const multiGoodsData = ref({
  image: 'https://img.yzcdn.cn/vant/sku/shoes-2.png',
  price: '2999.00',
  originalPrice: '3299.00',
  stock: 50
})

// 自定义按钮
const customBtnSkuVisible = ref(false)
const customBtnSkuData = ref([
  {
    id: 1,
    name: '尺寸',
    list: [
      { id: 101, name: 'S', active: false, disabled: false },
      { id: 102, name: 'M', active: false, disabled: false },
      { id: 103, name: 'L', active: false, disabled: false },
      { id: 104, name: 'XL', active: false, disabled: false }
    ]
  }
])
const customBtnGoodsData = ref({
  image: 'https://img.yzcdn.cn/vant/sku/shoes-3.png',
  price: '89.00',
  originalPrice: '129.00',
  stock: 200
})

// 库存限制
const stockLimitSkuVisible = ref(false)
const stockLimitSkuData = ref([
  {
    id: 1,
    name: '颜色',
    list: [
      { id: 101, name: '蓝色', active: false, disabled: false },
      { id: 102, name: '绿色', active: false, disabled: false }
    ]
  }
])
const stockLimitGoodsData = ref({
  image: 'https://img.yzcdn.cn/vant/sku/shoes-1.png',
  price: '159.00',
  stock: 3 // 库存只有3件
})

// 不可售规格
const disabledSkuVisible = ref(false)
const disabledSkuData = ref([
  {
    id: 1,
    name: '颜色',
    list: [
      { id: 101, name: '黑色', active: false, disabled: false },
      { id: 102, name: '白色', active: false, disabled: true }, // 不可选
      { id: 103, name: '红色', active: false, disabled: false }
    ]
  },
  {
    id: 2,
    name: '尺寸',
    list: [
      { id: 201, name: 'S', active: false, disabled: false },
      { id: 202, name: 'M', active: false, disabled: true }, // 不可选
      { id: 203, name: 'L', active: false, disabled: false }
    ]
  }
])
const disabledGoodsData = ref({
  image: 'https://img.yzcdn.cn/vant/sku/shoes-2.png',
  price: '299.00',
  stock: 20
})

// 自定义插槽
const customSlotSkuVisible = ref(false)
const customSlotSkuData = ref([
  {
    id: 1,
    name: '材质',
    list: [
      { id: 101, name: '真皮', active: false, disabled: false },
      { id: 102, name: '人造革', active: false, disabled: false },
      { id: 103, name: '帆布', active: false, disabled: false }
    ]
  }
])
const customSlotGoodsData = ref({
  image: 'https://img.yzcdn.cn/vant/sku/shoes-3.png',
  price: '399.00',
  originalPrice: '599.00',
  stock: 80
})

// 方法
function showBasicSku() {
  basicSkuVisible.value = true
}

function showMultiSku() {
  multiSkuVisible.value = true
}

function showCustomBtnSku() {
  customBtnSkuVisible.value = true
}

function showStockLimitSku() {
  stockLimitSkuVisible.value = true
}

function showDisabledSku() {
  disabledSkuVisible.value = true
}

function showCustomSlotSku() {
  customSlotSkuVisible.value = true
}

function onSelectSku(data) {
  console.log('选择规格:', data)
  uni.showToast({
    title: `选择了: ${data.sku.name}`,
    icon: 'none'
  })
}

function onChangeStepper(value) {
  console.log('数量变化:', value)
}

function onClickBtnOperate(data) {
  console.log('点击按钮:', data)
  let message = ''
  switch (data.type) {
    case 'confirm':
      message = `确定购买 ${data.value} 件`
      break
    case 'buy':
      message = `立即购买 ${data.value} 件`
      break
    case 'cart':
      message = `加入购物车 ${data.value} 件`
      break
  }
  
  uni.showToast({
    title: message,
    icon: 'success'
  })
}

function onOverLimit(data) {
  console.log('超出限制:', data)
  const message = data.type === 'min' ? '不能再少了' : `最多只能购买 ${data.value} 件`
  uni.showToast({
    title: message,
    icon: 'none'
  })
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
  padding: 20rpx;
}

.demo-section {
  margin-bottom: 40rpx;
}

.demo-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 20rpx;
  padding-left: 20rpx;
}

.demo-item {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
  transition: all 0.2s;
}

.demo-item:active {
  transform: scale(0.98);
  background-color: #f8f8f8;
}

.demo-item-content {
  flex: 1;
}

.demo-item-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 8rpx;
}

.demo-item-desc {
  font-size: 26rpx;
  color: #666;
}

.demo-item-arrow {
  font-size: 32rpx;
  color: #999;
  margin-left: 20rpx;
}

// 自定义插槽样式
.custom-tip {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
}

.custom-tip-text {
  color: #fff;
  font-size: 26rpx;
  text-align: center;
  display: block;
}

.custom-service {
  background-color: #f8f9fa;
  border-radius: 12rpx;
  padding: 20rpx;
  margin-top: 30rpx;
}

.custom-service-text {
  color: #666;
  font-size: 24rpx;
  text-align: center;
  display: block;
}
</style>