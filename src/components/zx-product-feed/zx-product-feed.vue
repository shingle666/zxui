<template>
  <view 
    :class="[
      'zx-product-feed',
      customClass,
      `zx-product-feed--${layout}`,
      { 'zx-product-feed--loading': loading }
    ]"
    :style="[customStyle]"
  >
    <!-- 头部插槽 -->
    <slot name="header" />
    
    <!-- 商品列表 -->
    <view 
      class="zx-product-feed__list"
      :style="{
        columnCount: layout === 'waterfall' ? columns : 'auto',
        columnGap: layout === 'waterfall' ? `${gap}rpx` : '0'
      }"
    >
      <view 
        v-for="(item, index) in internalList" 
        :key="item[keyField] || index"
        class="zx-product-feed__item"
        :style="getItemStyle(index)"
        @click="handleItemClick(item, index)"
      >
        <slot name="item" :item="item" :index="index">
          <!-- 默认商品卡片 -->
          <view class="zx-product-feed__card">
            <!-- 商品图片 -->
            <view class="zx-product-feed__image-wrapper">
              <image 
                v-if="item[imageField]"
                :src="item[imageField]"
                :mode="imageMode"
                class="zx-product-feed__image"
                :lazy-load="lazyLoad"
                @error="handleImageError(item, index)"
                @load="handleImageLoad(item, index)"
              />
              <view v-else class="zx-product-feed__image zx-product-feed__image--placeholder">
                <text class="zx-product-feed__placeholder-text">暂无图片</text>
              </view>
              
              <!-- 图片标签 -->
              <view 
                v-if="item[tagField]" 
                class="zx-product-feed__tag"
                :style="{ backgroundColor: tagBgColor, color: tagColor }"
              >
                <text class="zx-product-feed__tag-text">{{ item[tagField] }}</text>
              </view>
            </view>
            
            <!-- 商品信息 -->
            <view class="zx-product-feed__content">
              <!-- 商品标题 -->
              <view v-if="item[titleField]" class="zx-product-feed__title">
                <text 
                  class="zx-product-feed__title-text"
                  :style="{ color: titleColor, '-webkit-line-clamp': titleLines }"
                >
                  {{ item[titleField] }}
                </text>
              </view>
              
              <!-- 商品描述 -->
              <view v-if="item[descField]" class="zx-product-feed__desc">
                <text class="zx-product-feed__desc-text" :style="{ color: descColor }">
                  {{ item[descField] }}
                </text>
              </view>
              
              <!-- 价格信息 -->
              <view v-if="showPrice && item[priceField]" class="zx-product-feed__price">
                <text class="zx-product-feed__price-symbol" :style="{ color: priceColor }">{{ currency }}</text>
                <text class="zx-product-feed__price-value" :style="{ color: priceColor }">{{ formatPrice(item[priceField]) }}</text>
                <text 
                  v-if="item[originalPriceField] && item[originalPriceField] !== item[priceField]"
                  class="zx-product-feed__original-price"
                  :style="{ color: originalPriceColor }"
                >
                  {{ currency }}{{ formatPrice(item[originalPriceField]) }}
                </text>
              </view>
              
              <!-- 销量/评价等信息 -->
              <view v-if="showSales && item[salesField]" class="zx-product-feed__sales">
                <text class="zx-product-feed__sales-text" :style="{ color: salesColor }">
                  已售{{ item[salesField] }}件
                </text>
              </view>
            </view>
          </view>
        </slot>
      </view>
    </view>
    
    <!-- 加载更多 -->
    <view v-if="showLoadMore" class="zx-product-feed__load-more" @click="handleLoadMore">
      <slot name="loadMore">
        <view class="zx-product-feed__load-more-content">
          <view v-if="loading" class="zx-product-feed__loading">
            <view class="zx-product-feed__loading-icon"></view>
            <text class="zx-product-feed__loading-text">{{ loadingText }}</text>
          </view>
          <view v-else-if="finished" class="zx-product-feed__finished">
            <text class="zx-product-feed__finished-text">{{ finishedText }}</text>
          </view>
          <view v-else class="zx-product-feed__load-more-btn">
            <text class="zx-product-feed__load-more-text">{{ loadMoreText }}</text>
          </view>
        </view>
      </slot>
    </view>
    
    <!-- 空状态 -->
    <view v-if="isEmpty" class="zx-product-feed__empty">
      <slot name="empty">
        <view class="zx-product-feed__empty-content">
          <text class="zx-product-feed__empty-text">{{ emptyText }}</text>
        </view>
      </slot>
    </view>
    
    <!-- 底部插槽 -->
    <slot name="footer" />
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  // 数据列表
  list: {
    type: Array,
    default: () => []
  },
  // 布局模式：grid(网格) | waterfall(瀑布流) | list(列表)
  layout: {
    type: String,
    default: 'grid'
  },
  // 网格列数（grid模式）或瀑布流列数
  columns: {
    type: Number,
    default: 2
  },
  // 间距
  gap: {
    type: Number,
    default: 20
  },
  // 数据字段映射
  keyField: {
    type: String,
    default: 'id'
  },
  imageField: {
    type: String,
    default: 'image'
  },
  titleField: {
    type: String,
    default: 'title'
  },
  descField: {
    type: String,
    default: 'desc'
  },
  priceField: {
    type: String,
    default: 'price'
  },
  originalPriceField: {
    type: String,
    default: 'originalPrice'
  },
  salesField: {
    type: String,
    default: 'sales'
  },
  tagField: {
    type: String,
    default: 'tag'
  },
  // 图片相关
  imageMode: {
    type: String,
    default: 'aspectFill'
  },
  lazyLoad: {
    type: Boolean,
    default: true
  },
  // 显示控制
  showPrice: {
    type: Boolean,
    default: true
  },
  showSales: {
    type: Boolean,
    default: true
  },
  showLoadMore: {
    type: Boolean,
    default: true
  },
  // 标题行数
  titleLines: {
    type: Number,
    default: 2
  },
  // 货币符号
  currency: {
    type: String,
    default: '¥'
  },
  // 加载状态
  loading: {
    type: Boolean,
    default: false
  },
  finished: {
    type: Boolean,
    default: false
  },
  // 文本配置
  loadingText: {
    type: String,
    default: '加载中...'
  },
  loadMoreText: {
    type: String,
    default: '点击加载更多'
  },
  finishedText: {
    type: String,
    default: '没有更多了'
  },
  emptyText: {
    type: String,
    default: '暂无商品'
  },
  // 颜色配置
  titleColor: {
    type: String,
    default: '#333'
  },
  descColor: {
    type: String,
    default: '#666'
  },
  priceColor: {
    type: String,
    default: '#ff4757'
  },
  originalPriceColor: {
    type: String,
    default: '#999'
  },
  salesColor: {
    type: String,
    default: '#999'
  },
  tagColor: {
    type: String,
    default: '#fff'
  },
  tagBgColor: {
    type: String,
    default: '#ff4757'
  },
  // 自定义样式
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: [Object, String],
    default: () => ({})
  }
})

const emit = defineEmits([
  'item-click',
  'load-more',
  'image-error',
  'image-load'
])

// 内部数据列表
const internalList = ref([])

// 监听外部数据变化
watch(() => props.list, (newList) => {
  internalList.value = [...newList]
}, { immediate: true, deep: true })

// 是否为空状态
const isEmpty = computed(() => {
  return !props.loading && internalList.value.length === 0
})

// 获取项目样式
const getItemStyle = (index) => {
  const style = {}
  
  if (props.layout === 'grid') {
    const width = `calc((100% - ${(props.columns - 1) * props.gap}rpx) / ${props.columns})`
    style.width = width
    style.marginRight = (index + 1) % props.columns === 0 ? '0' : `${props.gap}rpx`
    style.marginBottom = `${props.gap}rpx`
  } else if (props.layout === 'list') {
    style.width = '100%'
    style.marginBottom = `${props.gap}rpx`
  } else if (props.layout === 'waterfall') {
    style.breakInside = 'avoid'
    style.marginBottom = `${props.gap}rpx`
  }
  
  return style
}

// 格式化价格
const formatPrice = (price) => {
  if (typeof price === 'number') {
    return price.toFixed(2)
  }
  return String(price)
}

// 处理项目点击
const handleItemClick = (item, index) => {
  emit('item-click', { item, index })
}

// 处理加载更多
const handleLoadMore = () => {
  if (!props.loading && !props.finished) {
    emit('load-more')
  }
}

// 处理图片错误
const handleImageError = (item, index) => {
  emit('image-error', { item, index })
}

// 处理图片加载
const handleImageLoad = (item, index) => {
  emit('image-load', { item, index })
}
</script>

<style lang="scss" scoped>
.zx-product-feed {
  width: 100%;
  
  &__list {
    display: flex;
    flex-wrap: wrap;
    padding: 20rpx;
  }
  
  &--grid &__list {
    display: flex;
    flex-wrap: wrap;
  }
  
  &--list &__list {
    display: flex;
    flex-direction: column;
  }
  
  &--waterfall &__list {
    column-fill: balance;
  }
  
  &__item {
    box-sizing: border-box;
  }
  
  &__card {
    background: #fff;
    border-radius: 12rpx;
    overflow: hidden;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
    transition: transform 0.2s ease;
    
    &:active {
      transform: scale(0.98);
    }
  }
  
  &__image-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
  }
  
  &__image {
    width: 100%;
    height: 300rpx;
    display: block;
    
    &--placeholder {
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
  &__placeholder-text {
    font-size: 24rpx;
    color: #999;
  }
  
  &__tag {
    position: absolute;
    top: 12rpx;
    left: 12rpx;
    padding: 4rpx 8rpx;
    border-radius: 6rpx;
    font-size: 20rpx;
  }
  
  &__tag-text {
    font-size: 20rpx;
    line-height: 1;
  }
  
  &__content {
    padding: 20rpx;
  }
  
  &__title {
    margin-bottom: 12rpx;
  }
  
  &__title-text {
    font-size: 28rpx;
    font-weight: 500;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;
  }
  
  &__desc {
    margin-bottom: 12rpx;
  }
  
  &__desc-text {
    font-size: 24rpx;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;
  }
  
  &__price {
    display: flex;
    align-items: baseline;
    margin-bottom: 8rpx;
  }
  
  &__price-symbol {
    font-size: 24rpx;
    font-weight: 500;
  }
  
  &__price-value {
    font-size: 32rpx;
    font-weight: 600;
    margin-left: 2rpx;
  }
  
  &__original-price {
    font-size: 24rpx;
    text-decoration: line-through;
    margin-left: 12rpx;
  }
  
  &__sales {
    margin-top: 8rpx;
  }
  
  &__sales-text {
    font-size: 22rpx;
  }
  
  &__load-more {
    padding: 40rpx 20rpx;
  }
  
  &__load-more-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &__loading-icon {
    width: 32rpx;
    height: 32rpx;
    border: 4rpx solid #e5e5e5;
    border-top-color: #007aff;
    border-radius: 50%;
    animation: zx-product-feed-spin 1s linear infinite;
    margin-right: 12rpx;
  }
  
  &__loading-text,
  &__load-more-text,
  &__finished-text {
    font-size: 28rpx;
    color: #666;
  }
  
  &__load-more-btn {
    padding: 16rpx 32rpx;
    background: #f5f5f5;
    border-radius: 8rpx;
    
    &:active {
      background: #e5e5e5;
    }
  }
  
  &__empty {
    padding: 120rpx 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  &__empty-content {
    text-align: center;
  }
  
  &__empty-text {
    font-size: 28rpx;
    color: #999;
  }
}

@keyframes zx-product-feed-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>