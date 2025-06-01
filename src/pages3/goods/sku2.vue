<template>
  <view class="container">
    <!-- 页面标题 -->
    <zx-navbar title="商品规格选择器 2.0" />
    
    <!-- 示例列表 -->
    <view class="demo-list">
      <!-- 基础用法 -->
      <view class="demo-item">
        <view class="demo-title">基础用法</view>
        <view class="demo-desc">最基本的商品规格选择功能</view>
        <zx-button type="primary" @click="showBasicSku">打开基础规格选择</zx-button>
      </view>

      <!-- 图片规格 -->
      <view class="demo-item">
        <view class="demo-title">图片规格</view>
        <view class="demo-desc">支持图片展示的规格选择</view>
        <zx-button type="primary" @click="showImageSku">打开图片规格选择</zx-button>
      </view>

      <!-- 规格联动 -->
      <view class="demo-item">
        <view class="demo-title">规格联动</view>
        <view class="demo-desc">智能联动，自动禁用不可选组合</view>
        <zx-button type="primary" @click="showLinkSku">打开联动规格选择</zx-button>
      </view>

      <!-- 库存预警 -->
      <view class="demo-item">
        <view class="demo-title">库存预警</view>
        <view class="demo-desc">库存不足时显示预警信息</view>
        <zx-button type="primary" @click="showStockSku">打开库存预警示例</zx-button>
      </view>

      <!-- 服务保障 -->
      <view class="demo-item">
        <view class="demo-title">服务保障</view>
        <view class="demo-desc">展示商品服务保障信息</view>
        <zx-button type="primary" @click="showServiceSku">打开服务保障示例</zx-button>
      </view>

      <!-- 自定义按钮 -->
      <view class="demo-item">
        <view class="demo-title">自定义按钮</view>
        <view class="demo-desc">自定义底部操作按钮</view>
        <zx-button type="primary" @click="showCustomBtnSku">打开自定义按钮示例</zx-button>
      </view>

      <!-- 完整示例 -->
      <view class="demo-item">
        <view class="demo-title">完整示例</view>
        <view class="demo-desc">包含所有功能的完整示例</view>
        <zx-button type="primary" @click="showCompleteSku">打开完整示例</zx-button>
      </view>
    </view>

    <!-- 基础用法 -->
    <zx-goods-sku2
      v-model:show="basicVisible"
      :sku="basicSkuData"
      :goods="basicGoodsData"
      @select-sku="onSelectSku"
      @click-btn-operate="onClickBtnOperate"
      @sku-complete="onSkuComplete"
    />

    <!-- 图片规格 -->
    <zx-goods-sku2
      v-model:show="imageVisible"
      :sku="imageSkuData"
      :goods="imageGoodsData"
      @select-sku="onSelectSku"
      @click-btn-operate="onClickBtnOperate"
    />

    <!-- 规格联动 -->
    <zx-goods-sku2
      v-model:show="linkVisible"
      :sku="linkSkuData"
      :goods="linkGoodsData"
      :enable-sku-link="true"
      :sku-combinations="skuCombinations"
      @select-sku="onSelectSku"
      @click-btn-operate="onClickBtnOperate"
      @stock-shortage="onStockShortage"
    />

    <!-- 库存预警 -->
    <zx-goods-sku2
      v-model:show="stockVisible"
      :sku="stockSkuData"
      :goods="stockGoodsData"
      :show-stock="true"
      :stock-threshold="5"
      @select-sku="onSelectSku"
      @click-btn-operate="onClickBtnOperate"
      @stock-shortage="onStockShortage"
    />

    <!-- 服务保障 -->
    <zx-goods-sku2
      v-model:show="serviceVisible"
      :sku="serviceSkuData"
      :goods="serviceGoodsData"
      :services="serviceList"
      @select-sku="onSelectSku"
      @click-btn-operate="onClickBtnOperate"
    />

    <!-- 自定义按钮 -->
    <zx-goods-sku2
      v-model:show="customBtnVisible"
      :sku="customBtnSkuData"
      :goods="customBtnGoodsData"
      :btn-options="['buy', 'cart']"
      buy-text="立即购买"
      add-cart-text="加入购物车"
      @select-sku="onSelectSku"
      @click-btn-operate="onClickBtnOperate"
    >
      <template #sku-select-top>
        <view class="custom-tip">
          <text class="tip-icon">💡</text>
          <text class="tip-text">选择您喜欢的规格组合</text>
        </view>
      </template>
      
      <template #sku-stepper-bottom>
        <view class="custom-promotion">
          <text class="promotion-text">🎉 满99元包邮，满199元送赠品</text>
        </view>
      </template>
    </zx-goods-sku2>

    <!-- 完整示例 -->
    <zx-goods-sku2
      v-model:show="completeVisible"
      :sku="completeSkuData"
      :goods="completeGoodsData"
      :enable-sku-link="true"
      :sku-combinations="completeCombinations"
      :services="completeServiceList"
      :btn-options="['buy', 'cart']"
      :show-stock="true"
      :stock-threshold="10"
      buy-text="立即购买"
      add-cart-text="加入购物车"
      btn-extra-text="支持7天无理由退换"
      @select-sku="onSelectSku"
      @click-btn-operate="onClickBtnOperate"
      @sku-complete="onSkuComplete"
      @stock-shortage="onStockShortage"
    >
      <template #sku-select-top>
        <view class="complete-tip">
          <view class="tip-row">
            <text class="tip-icon">🔥</text>
            <text class="tip-text">限时特惠，仅剩24小时</text>
          </view>
          <view class="tip-row">
            <text class="tip-icon">⭐</text>
            <text class="tip-text">已有1000+用户购买</text>
          </view>
        </view>
      </template>
    </zx-goods-sku2>

    <!-- 消息提示 -->
    <zx-toast ref="toast" />
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 页面数据
const toast = ref()

// 基础用法
const basicVisible = ref(false)
const basicSkuData = ref([
  {
    id: 1,
    name: '颜色',
    required: true,
    list: [
      { id: 101, name: '黑色', active: false, disabled: false },
      { id: 102, name: '白色', active: false, disabled: false },
      { id: 103, name: '红色', active: false, disabled: false }
    ]
  },
  {
    id: 2,
    name: '尺寸',
    required: true,
    list: [
      { id: 201, name: 'S', active: false, disabled: false },
      { id: 202, name: 'M', active: false, disabled: false },
      { id: 203, name: 'L', active: false, disabled: false }
    ]
  }
])

const basicGoodsData = ref({
  title: '时尚休闲T恤',
  image: '/static/demo/goods1.jpg',
  price: '99.00',
  originalPrice: '199.00',
  stock: 100
})

// 图片规格
const imageVisible = ref(false)
const imageSkuData = ref([
  {
    id: 1,
    name: '颜色',
    required: true,
    list: [
      { 
        id: 101, 
        name: '经典黑', 
        image: '/static/demo/color-black.jpg',
        active: false, 
        disabled: false 
      },
      { 
        id: 102, 
        name: '珍珠白', 
        image: '/static/demo/color-white.jpg',
        active: false, 
        disabled: false 
      },
      { 
        id: 103, 
        name: '玫瑰金', 
        image: '/static/demo/color-gold.jpg',
        active: false, 
        disabled: false 
      }
    ]
  },
  {
    id: 2,
    name: '版本',
    required: true,
    list: [
      { id: 201, name: '标准版', active: false, disabled: false },
      { id: 202, name: '专业版', active: false, disabled: false },
      { id: 203, name: '旗舰版', active: false, disabled: false }
    ]
  }
])

const imageGoodsData = ref({
  title: '智能手机 Pro Max',
  image: '/static/demo/phone.jpg',
  price: '6999.00',
  originalPrice: '7999.00',
  stock: 50
})

// 规格联动
const linkVisible = ref(false)
const linkSkuData = ref([
  {
    id: 1,
    name: '颜色',
    required: true,
    list: [
      { id: 101, name: '黑色', active: false, disabled: false },
      { id: 102, name: '白色', active: false, disabled: false },
      { id: 103, name: '蓝色', active: false, disabled: false }
    ]
  },
  {
    id: 2,
    name: '内存',
    required: true,
    list: [
      { id: 201, name: '128GB', active: false, disabled: false },
      { id: 202, name: '256GB', active: false, disabled: false },
      { id: 203, name: '512GB', active: false, disabled: false }
    ]
  }
])

const linkGoodsData = ref({
  title: '智能手机联动示例',
  image: '/static/demo/phone2.jpg',
  price: '3999.00',
  stock: 30
})

const skuCombinations = ref([
  {
    skuIds: [101, 201], // 黑色 + 128GB
    price: '3999.00',
    stock: 10
  },
  {
    skuIds: [101, 202], // 黑色 + 256GB
    price: '4499.00',
    stock: 15
  },
  {
    skuIds: [102, 201], // 白色 + 128GB
    price: '3999.00',
    stock: 0 // 无库存
  },
  {
    skuIds: [102, 202], // 白色 + 256GB
    price: '4499.00',
    stock: 8
  },
  {
    skuIds: [103, 203], // 蓝色 + 512GB
    price: '5999.00',
    stock: 5
  }
  // 注意：其他组合不存在，会被自动禁用
])

// 库存预警
const stockVisible = ref(false)
const stockSkuData = ref([
  {
    id: 1,
    name: '尺寸',
    required: true,
    list: [
      { id: 101, name: 'S', active: false, disabled: false },
      { id: 102, name: 'M', active: false, disabled: false },
      { id: 103, name: 'L', active: false, disabled: false }
    ]
  }
])

const stockGoodsData = ref({
  title: '限量版连帽衫',
  image: '/static/demo/hoodie.jpg',
  price: '299.00',
  originalPrice: '399.00',
  stock: 3 // 库存很少
})

// 服务保障
const serviceVisible = ref(false)
const serviceSkuData = ref([
  {
    id: 1,
    name: '颜色',
    required: true,
    list: [
      { id: 101, name: '黑色', active: false, disabled: false },
      { id: 102, name: '白色', active: false, disabled: false }
    ]
  }
])

const serviceGoodsData = ref({
  title: '高端商务包',
  image: '/static/demo/bag.jpg',
  price: '899.00',
  originalPrice: '1299.00',
  stock: 20
})

const serviceList = ref([
  { icon: '🛡️', text: '7天无理由退换' },
  { icon: '🚚', text: '全国包邮' },
  { icon: '📞', text: '24小时客服' },
  { icon: '✅', text: '正品保证' },
  { icon: '🔒', text: '隐私保护' },
  { icon: '⚡', text: '闪电发货' }
])

// 自定义按钮
const customBtnVisible = ref(false)
const customBtnSkuData = ref([
  {
    id: 1,
    name: '款式',
    required: true,
    list: [
      { id: 101, name: '经典款', active: false, disabled: false },
      { id: 102, name: '时尚款', active: false, disabled: false },
      { id: 103, name: '运动款', active: false, disabled: false }
    ]
  }
])

const customBtnGoodsData = ref({
  title: '多功能运动鞋',
  image: '/static/demo/shoes.jpg',
  price: '599.00',
  originalPrice: '799.00',
  stock: 50
})

// 完整示例
const completeVisible = ref(false)
const completeSkuData = ref([
  {
    id: 1,
    name: '颜色',
    required: true,
    list: [
      { 
        id: 101, 
        name: '星空黑', 
        image: '/static/demo/watch-black.jpg',
        active: false, 
        disabled: false 
      },
      { 
        id: 102, 
        name: '月光银', 
        image: '/static/demo/watch-silver.jpg',
        active: false, 
        disabled: false 
      },
      { 
        id: 103, 
        name: '玫瑰金', 
        image: '/static/demo/watch-gold.jpg',
        active: false, 
        disabled: false 
      }
    ]
  },
  {
    id: 2,
    name: '表带',
    required: true,
    list: [
      { id: 201, name: '运动表带', active: false, disabled: false },
      { id: 202, name: '皮质表带', active: false, disabled: false },
      { id: 203, name: '金属表带', active: false, disabled: false }
    ]
  },
  {
    id: 3,
    name: '尺寸',
    required: true,
    list: [
      { id: 301, name: '40mm', active: false, disabled: false },
      { id: 302, name: '44mm', active: false, disabled: false }
    ]
  }
])

const completeGoodsData = ref({
  title: '智能手表 Ultra',
  image: '/static/demo/watch.jpg',
  price: '2999.00',
  originalPrice: '3999.00',
  stock: 25
})

const completeCombinations = ref([
  {
    skuIds: [101, 201, 301], // 星空黑 + 运动表带 + 40mm
    price: '2999.00',
    stock: 15
  },
  {
    skuIds: [101, 201, 302], // 星空黑 + 运动表带 + 44mm
    price: '3199.00',
    stock: 12
  },
  {
    skuIds: [102, 202, 301], // 月光银 + 皮质表带 + 40mm
    price: '3299.00',
    stock: 8
  },
  {
    skuIds: [102, 202, 302], // 月光银 + 皮质表带 + 44mm
    price: '3499.00',
    stock: 6
  },
  {
    skuIds: [103, 203, 302], // 玫瑰金 + 金属表带 + 44mm
    price: '3999.00',
    stock: 3
  }
])

const completeServiceList = ref([
  { icon: '🛡️', text: '2年质保' },
  { icon: '🚚', text: '顺丰包邮' },
  { icon: '📞', text: '专属客服' },
  { icon: '✅', text: '官方正品' },
  { icon: '🔄', text: '30天换新' },
  { icon: '⚡', text: '当日发货' }
])

// 方法
function showBasicSku() {
  basicVisible.value = true
}

function showImageSku() {
  imageVisible.value = true
}

function showLinkSku() {
  linkVisible.value = true
}

function showStockSku() {
  stockVisible.value = true
}

function showServiceSku() {
  serviceVisible.value = true
}

function showCustomBtnSku() {
  customBtnVisible.value = true
}

function showCompleteSku() {
  completeVisible.value = true
}

function onSelectSku(data) {
  console.log('选择规格:', data)
}

function onClickBtnOperate(data) {
  console.log('点击操作按钮:', data)
  
  let message = ''
  switch (data.type) {
    case 'buy':
      message = `立即购买 ${data.value} 件商品`
      break
    case 'cart':
      message = `已加入购物车 ${data.value} 件商品`
      break
    case 'confirm':
    default:
      message = `确认选择 ${data.value} 件商品`
      break
  }
  
  toast.value?.show({
    type: 'success',
    message: message
  })
}

function onSkuComplete(data) {
  console.log('规格选择完成:', data)
  toast.value?.show({
    type: 'success',
    message: '规格选择完成！'
  })
}

function onStockShortage(data) {
  console.log('库存不足:', data)
  toast.value?.show({
    type: 'warning',
    message: `库存不足！仅剩 ${data.available} 件`
  })
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.demo-list {
  padding: 32rpx;
}

.demo-item {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
}

.demo-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 12rpx;
}

.demo-desc {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 24rpx;
  line-height: 1.5;
}

// 自定义插槽样式
.custom-tip {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 32rpx;
  display: flex;
  align-items: center;
}

.tip-icon {
  font-size: 32rpx;
  margin-right: 16rpx;
}

.tip-text {
  font-size: 26rpx;
  color: #fff;
  flex: 1;
}

.custom-promotion {
  background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
  border-radius: 12rpx;
  padding: 20rpx;
  margin-top: 24rpx;
  text-align: center;
}

.promotion-text {
  font-size: 24rpx;
  color: #2d3436;
}

.complete-tip {
  background: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%);
  border-radius: 12rpx;
  padding: 24rpx;
  margin-bottom: 32rpx;
}

.tip-row {
  display: flex;
  align-items: center;
  margin-bottom: 12rpx;
}

.tip-row:last-child {
  margin-bottom: 0;
}

.complete-tip .tip-icon {
  font-size: 28rpx;
  margin-right: 12rpx;
}

.complete-tip .tip-text {
  font-size: 24rpx;
  color: #fff;
  flex: 1;
}
</style>