<template>
  <view class="product-feed-demo">
    <!-- 导航栏 -->
    <zx-navbar title="商品流组件" back-icon-color="#333" />
    
    <!-- 标签页 -->
    <zx-tabs v-model="activeTab" @change="handleTabChange">
      <zx-tab title="网格布局" name="grid" />
      <zx-tab title="瀑布流" name="waterfall" />
      <zx-tab title="列表布局" name="list" />
      <zx-tab title="自定义" name="custom" />
    </zx-tabs>
    
    <!-- 网格布局示例 -->
    <view v-if="activeTab === 'grid'" class="demo-section">
      <view class="section-header">
        <text class="section-title">网格布局</text>
        <text class="section-desc">支持多列网格展示，适合商品列表页</text>
      </view>
      
      <!-- 控制面板 -->
      <view class="control-panel">
        <view class="control-item">
          <text class="control-label">列数：</text>
          <zx-stepper v-model="gridColumns" :min="1" :max="4" />
        </view>
        <view class="control-item">
          <text class="control-label">间距：</text>
          <zx-stepper v-model="gridGap" :min="8" :max="40" :step="4" />
        </view>
      </view>
      
      <zx-product-feed
        :list="productList"
        layout="grid"
        :columns="gridColumns"
        :gap="gridGap"
        :loading="loading"
        :finished="finished"
        @item-click="handleItemClick"
        @load-more="handleLoadMore"
      />
    </view>
    
    <!-- 瀑布流布局示例 -->
    <view v-if="activeTab === 'waterfall'" class="demo-section">
      <view class="section-header">
        <text class="section-title">瀑布流布局</text>
        <text class="section-desc">自适应高度的瀑布流展示，适合图片尺寸不一的场景</text>
      </view>
      
      <view class="control-panel">
        <view class="control-item">
          <text class="control-label">列数：</text>
          <zx-stepper v-model="waterfallColumns" :min="2" :max="3" />
        </view>
      </view>
      
      <zx-product-feed
        :list="waterfallList"
        layout="waterfall"
        :columns="waterfallColumns"
        :gap="16"
        :loading="loading"
        @item-click="handleItemClick"
        @load-more="handleLoadMoreWaterfall"
      />
    </view>
    
    <!-- 列表布局示例 -->
    <view v-if="activeTab === 'list'" class="demo-section">
      <view class="section-header">
        <text class="section-title">列表布局</text>
        <text class="section-desc">单列列表展示，适合详细信息展示</text>
      </view>
      
      <zx-product-feed
        :list="listData"
        layout="list"
        :columns="1"
        :gap="12"
        :title-lines="3"
        @item-click="handleItemClick"
      />
    </view>
    
    <!-- 自定义示例 -->
    <view v-if="activeTab === 'custom'" class="demo-section">
      <view class="section-header">
        <text class="section-title">自定义样式</text>
        <text class="section-desc">展示各种自定义功能</text>
      </view>
      
      <!-- 自定义字段映射 -->
      <view class="custom-demo">
        <text class="demo-subtitle">自定义字段映射</text>
        <zx-product-feed
          :list="customFieldList"
          layout="grid"
          :columns="2"
          key-field="productId"
          image-field="thumbnail"
          title-field="name"
          desc-field="description"
          price-field="currentPrice"
          original-price-field="marketPrice"
          sales-field="soldCount"
          tag-field="label"
          @item-click="handleItemClick"
        />
      </view>
      
      <!-- 自定义颜色 -->
      <view class="custom-demo">
        <text class="demo-subtitle">自定义颜色主题</text>
        <zx-product-feed
          :list="colorThemeList"
          layout="grid"
          :columns="2"
          title-color="#2c3e50"
          desc-color="#7f8c8d"
          price-color="#e74c3c"
          original-price-color="#bdc3c7"
          tag-color="#fff"
          tag-bg-color="#9b59b6"
          @item-click="handleItemClick"
        />
      </view>
      
      <!-- 自定义商品卡片 -->
      <view class="custom-demo">
        <text class="demo-subtitle">自定义商品卡片</text>
        <zx-product-feed :list="customCardList" layout="grid" :columns="2">
          <template #item="{ item, index }">
            <view class="custom-card" @click="handleCustomClick(item, index)">
              <view class="custom-card-header">
                <image :src="item.image" class="custom-card-image" mode="aspectFill" />
                <view v-if="item.tag" class="custom-card-tag">
                  <text class="custom-card-tag-text">{{ item.tag }}</text>
                </view>
              </view>
              <view class="custom-card-content">
                <text class="custom-card-title">{{ item.title }}</text>
                <view class="custom-card-price">
                  <text class="custom-card-price-current">¥{{ item.price }}</text>
                  <text v-if="item.originalPrice" class="custom-card-price-original">¥{{ item.originalPrice }}</text>
                </view>
                <view class="custom-card-footer">
                  <text class="custom-card-sales">已售{{ item.sales }}件</text>
                  <view class="custom-card-btn">
                    <text class="custom-card-btn-text">立即购买</text>
                  </view>
                </view>
              </view>
            </view>
          </template>
        </zx-product-feed>
      </view>
      
      <!-- 空状态示例 -->
      <view class="custom-demo">
        <text class="demo-subtitle">自定义空状态</text>
        <zx-product-feed :list="[]" layout="grid" :columns="2">
          <template #empty>
            <view class="custom-empty">
              <view class="custom-empty-icon">📦</view>
              <text class="custom-empty-text">暂无商品数据</text>
              <button class="custom-empty-btn" @click="refreshData">刷新重试</button>
            </view>
          </template>
        </zx-product-feed>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 当前标签页
const activeTab = ref('grid')

// 网格布局配置
const gridColumns = ref(2)
const gridGap = ref(20)

// 瀑布流配置
const waterfallColumns = ref(2)

// 加载状态
const loading = ref(false)
const finished = ref(false)

// 基础商品数据
const productList = ref([])
const waterfallList = ref([])
const listData = ref([])
const customFieldList = ref([])
const colorThemeList = ref([])
const customCardList = ref([])

// 生成模拟数据
const generateMockData = (count = 10, type = 'normal') => {
  const data = []
  const categories = ['数码', '服装', '家居', '美妆', '食品', '运动', '图书', '玩具']
  const tags = ['热销', '新品', '限时', '包邮', '特价', '推荐']
  
  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const tag = Math.random() > 0.5 ? tags[Math.floor(Math.random() * tags.length)] : ''
    const price = (Math.random() * 500 + 50).toFixed(2)
    const originalPrice = (parseFloat(price) * (1 + Math.random() * 0.5)).toFixed(2)
    const sales = Math.floor(Math.random() * 10000)
    
    if (type === 'custom') {
      data.push({
        productId: `p${i}`,
        thumbnail: `https://picsum.photos/300/${200 + Math.floor(Math.random() * 100)}?random=${i}`,
        name: `${category}商品 ${i}`,
        description: `这是一个优质的${category}商品，具有很好的性价比和用户体验。`,
        currentPrice: price,
        marketPrice: originalPrice,
        soldCount: sales,
        label: tag
      })
    } else {
      const height = type === 'waterfall' ? 200 + Math.floor(Math.random() * 200) : 300
      data.push({
        id: i,
        image: `https://picsum.photos/300/${height}?random=${i}`,
        title: `${category}商品 ${i} - 高品质优选好货`,
        desc: `这是一个优质的${category}商品，具有很好的性价比和用户体验，深受用户喜爱。`,
        price: price,
        originalPrice: parseFloat(originalPrice) > parseFloat(price) ? originalPrice : null,
        sales: sales,
        tag: tag
      })
    }
  }
  
  return data
}

// 初始化数据
const initData = () => {
  productList.value = generateMockData(20)
  waterfallList.value = generateMockData(15, 'waterfall')
  listData.value = generateMockData(8)
  customFieldList.value = generateMockData(6, 'custom')
  colorThemeList.value = generateMockData(6)
  customCardList.value = generateMockData(4)
}

// 标签页切换
const handleTabChange = (name) => {
  activeTab.value = name
}

// 商品点击
const handleItemClick = ({ item, index }) => {
  uni.showToast({
    title: `点击了商品: ${item.title || item.name}`,
    icon: 'none'
  })
  console.log('商品点击:', item, index)
}

// 自定义卡片点击
const handleCustomClick = (item, index) => {
  uni.showToast({
    title: `自定义卡片点击: ${item.title}`,
    icon: 'none'
  })
}

// 加载更多
const handleLoadMore = async () => {
  if (loading.value || finished.value) return
  
  loading.value = true
  
  // 模拟网络请求
  setTimeout(() => {
    const newData = generateMockData(10)
    productList.value.push(...newData)
    
    // 模拟加载完成
    if (productList.value.length >= 50) {
      finished.value = true
    }
    
    loading.value = false
  }, 1500)
}

// 瀑布流加载更多
const handleLoadMoreWaterfall = async () => {
  if (loading.value) return
  
  loading.value = true
  
  setTimeout(() => {
    const newData = generateMockData(8, 'waterfall')
    waterfallList.value.push(...newData)
    loading.value = false
  }, 1000)
}

// 刷新数据
const refreshData = () => {
  uni.showToast({
    title: '刷新成功',
    icon: 'success'
  })
  initData()
}

onMounted(() => {
  initData()
})
</script>

<style lang="scss" scoped>
.product-feed-demo {
  min-height: 100vh;
  background: #f5f5f5;
}

.demo-section {
  padding-bottom: 40rpx;
}

.section-header {
  padding: 40rpx 30rpx 20rpx;
  background: #fff;
  border-bottom: 1rpx solid #eee;
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 8rpx;
}

.section-desc {
  font-size: 24rpx;
  color: #666;
  line-height: 1.4;
}

.control-panel {
  padding: 30rpx;
  background: #fff;
  border-bottom: 1rpx solid #eee;
  display: flex;
  flex-wrap: wrap;
  gap: 30rpx;
}

.control-item {
  display: flex;
  align-items: center;
  min-width: 200rpx;
}

.control-label {
  font-size: 28rpx;
  color: #333;
  margin-right: 20rpx;
}

.custom-demo {
  margin-bottom: 60rpx;
}

.demo-subtitle {
  display: block;
  font-size: 28rpx;
  font-weight: 600;
  color: #333;
  padding: 30rpx;
  background: #fff;
  border-bottom: 1rpx solid #eee;
}

// 自定义卡片样式
.custom-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16rpx;
  overflow: hidden;
  box-shadow: 0 8rpx 32rpx rgba(102, 126, 234, 0.3);
  transition: transform 0.2s ease;
  
  &:active {
    transform: scale(0.95);
  }
}

.custom-card-header {
  position: relative;
}

.custom-card-image {
  width: 100%;
  height: 240rpx;
}

.custom-card-tag {
  position: absolute;
  top: 12rpx;
  right: 12rpx;
  background: rgba(255, 255, 255, 0.9);
  padding: 6rpx 12rpx;
  border-radius: 20rpx;
}

.custom-card-tag-text {
  font-size: 20rpx;
  color: #667eea;
  font-weight: 600;
}

.custom-card-content {
  padding: 24rpx;
  color: white;
}

.custom-card-title {
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 16rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.custom-card-price {
  display: flex;
  align-items: baseline;
  margin-bottom: 16rpx;
}

.custom-card-price-current {
  font-size: 32rpx;
  font-weight: 700;
}

.custom-card-price-original {
  font-size: 24rpx;
  opacity: 0.7;
  text-decoration: line-through;
  margin-left: 12rpx;
}

.custom-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-card-sales {
  font-size: 22rpx;
  opacity: 0.8;
}

.custom-card-btn {
  background: rgba(255, 255, 255, 0.2);
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.3);
}

.custom-card-btn-text {
  font-size: 22rpx;
  font-weight: 600;
}

// 自定义空状态样式
.custom-empty {
  text-align: center;
  padding: 120rpx 40rpx;
}

.custom-empty-icon {
  font-size: 120rpx;
  margin-bottom: 32rpx;
}

.custom-empty-text {
  display: block;
  font-size: 28rpx;
  color: #999;
  margin-bottom: 40rpx;
}

.custom-empty-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 25rpx;
  padding: 20rpx 40rpx;
  font-size: 28rpx;
  font-weight: 600;
  box-shadow: 0 4rpx 16rpx rgba(102, 126, 234, 0.3);
  
  &:active {
    opacity: 0.8;
  }
}
</style>