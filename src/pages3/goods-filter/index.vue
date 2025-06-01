<template>
  <view class="container">
    <scroll-view scroll-y style="flex: 1">
      <view class="content">
        <!-- 基础用法 -->
        <view class="demo-section">
          <view class="demo-title">基础用法</view>
          <view class="demo-desc">商品筛选组件支持多种筛选类型，包括单选、多选、价格区间等。</view>
          <view class="demo-block">
            <view class="filter-trigger" @click="showBasicFilter = true">
              <text>点击打开基础筛选</text>
              <zx-icon name="arrow-right" size="16" color="#666"></zx-icon>
            </view>
            <view class="result-display">
              <text class="result-title">筛选结果：</text>
              <text class="result-content">{{ formatResult(basicResult) }}</text>
            </view>
          </view>
        </view>

        <!-- 带地址选择 -->
        <view class="demo-section">
          <view class="demo-title">带地址选择</view>
          <view class="demo-desc">支持地址选择功能，适用于需要根据地区筛选商品的场景。</view>
          <view class="demo-block">
            <view class="filter-trigger" @click="showAddressFilter = true">
              <text>点击打开地址筛选</text>
              <zx-icon name="arrow-right" size="16" color="#666"></zx-icon>
            </view>
            <view class="result-display">
              <text class="result-title">当前地址：</text>
              <text class="result-content">{{ currentAddress }}</text>
            </view>
          </view>
        </view>

        <!-- 复杂筛选 -->
        <view class="demo-section">
          <view class="demo-title">复杂筛选</view>
          <view class="demo-desc">包含多种筛选类型的复杂筛选场景，支持品牌多选、价格区间、推荐价格等。</view>
          <view class="demo-block">
            <view class="filter-trigger" @click="showComplexFilter = true">
              <text>点击打开复杂筛选</text>
              <zx-icon name="arrow-right" size="16" color="#666"></zx-icon>
            </view>
            <view class="result-display">
              <text class="result-title">筛选结果：</text>
              <text class="result-content">{{ formatResult(complexResult) }}</text>
            </view>
          </view>
        </view>

        <!-- 自定义样式 -->
        <view class="demo-section">
          <view class="demo-title">自定义样式</view>
          <view class="demo-desc">支持自定义样式，可以根据项目需求调整组件外观。</view>
          <view class="demo-block">
            <view class="filter-trigger" @click="showCustomFilter = true">
              <text>点击打开自定义样式筛选</text>
              <zx-icon name="arrow-right" size="16" color="#666"></zx-icon>
            </view>
          </view>
        </view>

        <!-- API 说明 -->
        <view class="demo-section">
          <view class="demo-title">API 说明</view>
          <view class="api-table">
            <view class="api-row api-header">
              <text class="api-col-name">属性</text>
              <text class="api-col-type">类型</text>
              <text class="api-col-desc">说明</text>
            </view>
            <view class="api-row">
              <text class="api-col-name">filterData</text>
              <text class="api-col-type">Array</text>
              <text class="api-col-desc">筛选数据配置</text>
            </view>
            <view class="api-row">
              <text class="api-col-name">showAddress</text>
              <text class="api-col-type">Boolean</text>
              <text class="api-col-desc">是否显示地址选择</text>
            </view>
            <view class="api-row">
              <text class="api-col-name">currentAddress</text>
              <text class="api-col-type">String</text>
              <text class="api-col-desc">当前选中的地址</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 基础筛选弹窗 -->
    <zx-popup 
      v-model:show="showBasicFilter" 
      position="right" 
      :style="{ width: '80%', height: '100%' }"
    >
      <zx-goods-filter
        :filter-data="basicFilterData"
        @confirm="handleBasicConfirm"
        @reset="handleBasicReset"
        @filter-change="handleFilterChange"
      />
    </zx-popup>

    <!-- 地址筛选弹窗 -->
    <zx-popup 
      v-model:show="showAddressFilter" 
      position="right" 
      :style="{ width: '80%', height: '100%' }"
    >
      <zx-goods-filter
        :filter-data="addressFilterData"
        :show-address="true"
        :current-address="currentAddress"
        @confirm="handleAddressConfirm"
        @reset="handleAddressReset"
        @address-click="handleAddressClick"
        @filter-change="handleFilterChange"
      />
    </zx-popup>

    <!-- 复杂筛选弹窗 -->
    <zx-popup 
      v-model:show="showComplexFilter" 
      position="right" 
      :style="{ width: '85%', height: '100%' }"
    >
      <zx-goods-filter
        :filter-data="complexFilterData"
        :show-address="true"
        :current-address="currentAddress"
        @confirm="handleComplexConfirm"
        @reset="handleComplexReset"
        @address-click="handleAddressClick"
        @filter-change="handleFilterChange"
      />
    </zx-popup>

    <!-- 自定义样式筛选弹窗 -->
    <zx-popup 
      v-model:show="showCustomFilter" 
      position="right" 
      :style="{ width: '80%', height: '100%' }"
    >
      <zx-goods-filter
        :filter-data="customFilterData"
        custom-class="custom-goods-filter"
        :custom-style="customFilterStyle"
        @confirm="handleCustomConfirm"
        @reset="handleCustomReset"
        @filter-change="handleFilterChange"
      />
    </zx-popup>

    <!-- 地址选择弹窗 -->
    <zx-popup v-model:show="showAddressPicker" position="bottom">
      <view class="address-picker">
        <view class="address-header">
          <text class="address-title">选择地址</text>
          <zx-icon name="close" size="20" @click="showAddressPicker = false"></zx-icon>
        </view>
        <view class="address-list">
          <view 
            v-for="(address, index) in addressList" 
            :key="index"
            class="address-item"
            @click="selectAddress(address)"
          >
            <text>{{ address }}</text>
            <zx-icon v-if="address === currentAddress" name="check" size="16" color="#fa2c19"></zx-icon>
          </view>
        </view>
      </view>
    </zx-popup>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 弹窗显示状态
const showBasicFilter = ref(false)
const showAddressFilter = ref(false)
const showComplexFilter = ref(false)
const showCustomFilter = ref(false)
const showAddressPicker = ref(false)

// 当前地址
const currentAddress = ref('北京市朝阳区')

// 地址列表
const addressList = ref([
  '北京市朝阳区',
  '北京市海淀区',
  '上海市浦东新区',
  '上海市黄浦区',
  '广州市天河区',
  '深圳市南山区'
])

// 筛选结果
const basicResult = ref([])
const complexResult = ref([])

// 基础筛选数据
const basicFilterData = ref([
  {
    key: 'category',
    title: '商品分类',
    type: 'radio',
    value: '',
    options: [
      { text: '全部', value: '' },
      { text: '手机数码', value: 'phone' },
      { text: '电脑办公', value: 'computer' },
      { text: '家用电器', value: 'appliance' },
      { text: '服饰内衣', value: 'clothing' }
    ]
  },
  {
    key: 'sort',
    title: '排序方式',
    type: 'radio',
    value: '',
    options: [
      { text: '默认排序', value: '' },
      { text: '价格从低到高', value: 'price_asc' },
      { text: '价格从高到低', value: 'price_desc' },
      { text: '销量优先', value: 'sales' },
      { text: '好评优先', value: 'rating' }
    ]
  }
])

// 地址筛选数据
const addressFilterData = ref([
  {
    key: 'delivery',
    title: '配送方式',
    type: 'checkbox',
    value: [],
    showCount: 4,
    options: [
      { text: '京东配送', value: 'jd' },
      { text: '货到付款', value: 'cod' },
      { text: '仅看有货', value: 'stock' },
      { text: '免运费', value: 'free_shipping' }
    ]
  }
])

// 复杂筛选数据
const complexFilterData = ref([
  {
    key: 'category',
    title: '商品分类',
    type: 'radio',
    value: '',
    options: [
      { text: '全部', value: '' },
      { text: '手机数码', value: 'phone' },
      { text: '电脑办公', value: 'computer' },
      { text: '家用电器', value: 'appliance' }
    ]
  },
  {
    key: 'brand',
    title: '品牌',
    type: 'checkbox',
    value: [],
    showCount: 6,
    options: [
      { text: '苹果', value: 'apple' },
      { text: '华为', value: 'huawei' },
      { text: '小米', value: 'xiaomi' },
      { text: '三星', value: 'samsung' },
      { text: 'OPPO', value: 'oppo' },
      { text: 'vivo', value: 'vivo' },
      { text: '一加', value: 'oneplus' },
      { text: '魅族', value: 'meizu' },
      { text: '荣耀', value: 'honor' },
      { text: '真我', value: 'realme' }
    ]
  },
  {
    key: 'price',
    title: '价格',
    type: 'price',
    minPrice: '',
    maxPrice: '',
    recommendPrices: [
      { text: '0-100', min: '0', max: '100' },
      { text: '100-500', min: '100', max: '500' },
      { text: '500-1000', min: '500', max: '1000' },
      { text: '1000-2000', min: '1000', max: '2000' },
      { text: '2000-5000', min: '2000', max: '5000' },
      { text: '5000以上', min: '5000', max: '' }
    ]
  },
  {
    key: 'features',
    title: '商品特色',
    type: 'checkbox',
    value: [],
    showCount: 8,
    options: [
      { text: '新品', value: 'new' },
      { text: '热销', value: 'hot' },
      { text: '促销', value: 'promotion' },
      { text: '包邮', value: 'free_shipping' },
      { text: '现货', value: 'in_stock' },
      { text: '预售', value: 'pre_sale' },
      { text: '限量', value: 'limited' },
      { text: '精选', value: 'featured' },
      { text: '推荐', value: 'recommended' },
      { text: '爆款', value: 'bestseller' }
    ]
  }
])

// 自定义样式筛选数据
const customFilterData = ref([
  {
    key: 'type',
    title: '商品类型',
    type: 'radio',
    value: '',
    options: [
      { text: '全部', value: '' },
      { text: '实物商品', value: 'physical' },
      { text: '虚拟商品', value: 'virtual' },
      { text: '服务商品', value: 'service' }
    ]
  }
])

// 自定义样式
const customFilterStyle = {
  '--primary-color': '#1890ff',
  '--border-radius': '8px'
}

// 格式化结果显示
const formatResult = (result) => {
  if (!result || result.length === 0) {
    return '暂无筛选'
  }
  
  const parts = []
  result.forEach(item => {
    if (item.type === 'radio' && item.value) {
      const option = item.options?.find(opt => opt.value === item.value)
      if (option) {
        parts.push(`${item.title}: ${option.text}`)
      }
    } else if (item.type === 'checkbox' && item.value && item.value.length > 0) {
      parts.push(`${item.title}: ${item.value.length}项`)
    } else if (item.type === 'price' && (item.minPrice || item.maxPrice)) {
      const priceText = `${item.minPrice || '0'}-${item.maxPrice || '不限'}`
      parts.push(`${item.title}: ${priceText}`)
    }
  })
  
  return parts.length > 0 ? parts.join(', ') : '暂无筛选'
}

// 基础筛选确认
const handleBasicConfirm = (result) => {
  basicResult.value = result
  showBasicFilter.value = false
  uni.showToast({
    title: '筛选成功',
    icon: 'success'
  })
}

// 基础筛选重置
const handleBasicReset = (data) => {
  basicResult.value = []
  uni.showToast({
    title: '已重置',
    icon: 'none'
  })
}

// 地址筛选确认
const handleAddressConfirm = (result) => {
  showAddressFilter.value = false
  uni.showToast({
    title: '筛选成功',
    icon: 'success'
  })
}

// 地址筛选重置
const handleAddressReset = (data) => {
  uni.showToast({
    title: '已重置',
    icon: 'none'
  })
}

// 复杂筛选确认
const handleComplexConfirm = (result) => {
  complexResult.value = result
  showComplexFilter.value = false
  uni.showToast({
    title: '筛选成功',
    icon: 'success'
  })
}

// 复杂筛选重置
const handleComplexReset = (data) => {
  complexResult.value = []
  uni.showToast({
    title: '已重置',
    icon: 'none'
  })
}

// 自定义样式确认
const handleCustomConfirm = (result) => {
  showCustomFilter.value = false
  uni.showToast({
    title: '筛选成功',
    icon: 'success'
  })
}

// 自定义样式重置
const handleCustomReset = (data) => {
  uni.showToast({
    title: '已重置',
    icon: 'none'
  })
}

// 地址点击
const handleAddressClick = () => {
  showAddressPicker.value = true
}

// 选择地址
const selectAddress = (address) => {
  currentAddress.value = address
  showAddressPicker.value = false
  uni.showToast({
    title: '地址已更新',
    icon: 'success'
  })
}

// 筛选项变化
const handleFilterChange = (data) => {
  console.log('筛选项变化:', data)
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.content {
  padding: 20rpx;
}

.demo-section {
  margin-bottom: 40rpx;
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.demo-title {
  padding: 30rpx 30rpx 20rpx;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid #f0f0f0;
}

.demo-desc {
  padding: 20rpx 30rpx;
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
}

.demo-block {
  padding: 30rpx;
}

.filter-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
  border: 2rpx solid #e9ecef;
  margin-bottom: 20rpx;
  
  text {
    font-size: 28rpx;
    color: #333;
  }
}

.result-display {
  padding: 20rpx;
  background: #f0f9ff;
  border-radius: 8rpx;
  border-left: 6rpx solid #0ea5e9;
  
  .result-title {
    font-size: 26rpx;
    color: #0369a1;
    font-weight: bold;
  }
  
  .result-content {
    font-size: 26rpx;
    color: #0c4a6e;
    margin-left: 10rpx;
  }
}

.api-table {
  margin: 20rpx 30rpx;
  border: 1px solid #e9ecef;
  border-radius: 8rpx;
  overflow: hidden;
}

.api-row {
  display: flex;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
  
  &.api-header {
    background: #f8f9fa;
    font-weight: bold;
  }
}

.api-col-name {
  flex: 1;
  padding: 20rpx;
  font-size: 24rpx;
  border-right: 1px solid #e9ecef;
}

.api-col-type {
  flex: 1;
  padding: 20rpx;
  font-size: 24rpx;
  border-right: 1px solid #e9ecef;
  color: #e74c3c;
}

.api-col-desc {
  flex: 2;
  padding: 20rpx;
  font-size: 24rpx;
  color: #666;
}

.address-picker {
  background: #fff;
  border-radius: 20rpx 20rpx 0 0;
  max-height: 80vh;
}

.address-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  border-bottom: 1px solid #f0f0f0;
  
  .address-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
  }
}

.address-list {
  max-height: 60vh;
  overflow-y: auto;
}

.address-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  text {
    font-size: 28rpx;
    color: #333;
  }
}

// 自定义样式示例
:deep(.custom-goods-filter) {
  .zx-goods-filter__operate__btn--confirm {
    background: linear-gradient(45deg, #1890ff, #40a9ff);
  }
  
  .zx-goods-filter__chunk__type__item.active,
  .zx-goods-filter__chunk__groups--item.active {
    background: rgba(24, 144, 255, 0.1);
    border-color: #1890ff;
    color: #1890ff;
  }
}
</style>