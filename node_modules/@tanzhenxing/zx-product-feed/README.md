# zx-product-feed 商品流组件

## 介绍

`zx-product-feed` 是一个功能丰富的商品流组件，支持多种布局模式（网格、瀑布流、列表），常用于商品列表、搜索结果、推荐商品等场景。组件提供了完整的商品展示功能，包括图片、标题、价格、销量等信息的展示，同时支持加载更多、空状态等交互功能。

## 特性

- 🎨 支持三种布局模式：网格、瀑布流、列表
- 📱 完美适配 H5、小程序、APP
- 🔧 灵活的数据字段映射
- 🖼️ 支持图片懒加载和错误处理
- 📄 支持加载更多和分页功能
- 🎯 丰富的自定义配置选项
- 🎪 提供多个插槽支持自定义内容
- 🎨 支持自定义颜色和样式
- 📊 支持空状态展示

## 安装使用

在 `pages.json` 中引入组件：

```json
{
  "easycom": {
    "^zx-(.*)$": "@/components/zx-$1/zx-$1.vue"
  }
}
```

## 基本用法

### 网格布局

```vue
<template>
  <zx-product-feed
    :list="productList"
    layout="grid"
    :columns="2"
    @item-click="handleItemClick"
    @load-more="handleLoadMore"
  />
</template>

<script setup>
import { ref } from 'vue'

const productList = ref([
  {
    id: 1,
    image: 'https://example.com/product1.jpg',
    title: '商品标题1',
    desc: '商品描述信息',
    price: 99.99,
    originalPrice: 199.99,
    sales: 1234,
    tag: '热销'
  },
  {
    id: 2,
    image: 'https://example.com/product2.jpg',
    title: '商品标题2',
    desc: '商品描述信息',
    price: 159.99,
    sales: 567
  }
])

const handleItemClick = ({ item, index }) => {
  console.log('点击商品:', item, index)
}

const handleLoadMore = () => {
  console.log('加载更多')
  // 加载更多数据的逻辑
}
</script>
```

### 瀑布流布局

```vue
<template>
  <zx-product-feed
    :list="productList"
    layout="waterfall"
    :columns="2"
    :gap="16"
  />
</template>
```

### 列表布局

```vue
<template>
  <zx-product-feed
    :list="productList"
    layout="list"
    :columns="1"
  />
</template>
```

## 自定义字段映射

```vue
<template>
  <zx-product-feed
    :list="customProductList"
    key-field="productId"
    image-field="thumbnail"
    title-field="name"
    desc-field="description"
    price-field="currentPrice"
    original-price-field="marketPrice"
    sales-field="soldCount"
    tag-field="label"
  />
</template>

<script setup>
const customProductList = ref([
  {
    productId: 'p001',
    thumbnail: 'https://example.com/thumb1.jpg',
    name: '自定义商品名称',
    description: '自定义商品描述',
    currentPrice: 88.88,
    marketPrice: 168.88,
    soldCount: 999,
    label: '新品'
  }
])
</script>
```

## 自定义商品卡片

```vue
<template>
  <zx-product-feed :list="productList">
    <template #item="{ item, index }">
      <view class="custom-card" @click="handleCustomClick(item, index)">
        <image :src="item.image" class="custom-image" />
        <view class="custom-content">
          <text class="custom-title">{{ item.title }}</text>
          <text class="custom-price">¥{{ item.price }}</text>
        </view>
      </view>
    </template>
  </zx-product-feed>
</template>

<style>
.custom-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16rpx;
  padding: 20rpx;
  color: white;
}

.custom-image {
  width: 100%;
  height: 200rpx;
  border-radius: 12rpx;
}

.custom-content {
  margin-top: 16rpx;
}

.custom-title {
  font-size: 28rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 8rpx;
}

.custom-price {
  font-size: 32rpx;
  font-weight: 600;
}
</style>
```

## 加载状态管理

```vue
<template>
  <zx-product-feed
    :list="productList"
    :loading="loading"
    :finished="finished"
    loading-text="正在加载..."
    finished-text="已加载全部商品"
    @load-more="loadMoreProducts"
  />
</template>

<script setup>
import { ref } from 'vue'

const productList = ref([])
const loading = ref(false)
const finished = ref(false)
const page = ref(1)

const loadMoreProducts = async () => {
  if (loading.value || finished.value) return
  
  loading.value = true
  try {
    // 模拟API请求
    const response = await fetchProducts(page.value)
    
    if (response.data.length === 0) {
      finished.value = true
    } else {
      productList.value.push(...response.data)
      page.value++
    }
  } catch (error) {
    console.error('加载失败:', error)
  } finally {
    loading.value = false
  }
}

// 模拟API请求
const fetchProducts = (pageNum) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData = pageNum <= 3 ? [
        // 模拟数据...
      ] : []
      resolve({ data: mockData })
    }, 1000)
  })
}

// 初始加载
loadMoreProducts()
</script>
```

## 自定义空状态

```vue
<template>
  <zx-product-feed :list="[]">
    <template #empty>
      <view class="custom-empty">
        <image src="/static/empty-cart.png" class="empty-image" />
        <text class="empty-text">暂无商品</text>
        <button class="empty-btn" @click="refreshData">刷新重试</button>
      </view>
    </template>
  </zx-product-feed>
</template>

<style>
.custom-empty {
  text-align: center;
  padding: 120rpx 40rpx;
}

.empty-image {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 32rpx;
}

.empty-text {
  display: block;
  font-size: 28rpx;
  color: #999;
  margin-bottom: 32rpx;
}

.empty-btn {
  background: #007aff;
  color: white;
  border: none;
  border-radius: 8rpx;
  padding: 16rpx 32rpx;
  font-size: 28rpx;
}
</style>
```

## 头部和底部插槽

```vue
<template>
  <zx-product-feed :list="productList">
    <template #header>
      <view class="feed-header">
        <text class="header-title">推荐商品</text>
        <text class="header-subtitle">为您精选优质好货</text>
      </view>
    </template>
    
    <template #footer>
      <view class="feed-footer">
        <text class="footer-text">— 到底了 —</text>
      </view>
    </template>
  </zx-product-feed>
</template>

<style>
.feed-header {
  padding: 40rpx 20rpx;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.header-title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.header-subtitle {
  font-size: 24rpx;
  opacity: 0.8;
}

.feed-footer {
  padding: 40rpx;
  text-align: center;
}

.footer-text {
  font-size: 24rpx;
  color: #999;
}
</style>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| list | 商品数据列表 | Array | [] |
| layout | 布局模式：grid/waterfall/list | String | 'grid' |
| columns | 列数 | Number | 2 |
| gap | 间距（rpx） | Number | 20 |
| keyField | 唯一标识字段名 | String | 'id' |
| imageField | 图片字段名 | String | 'image' |
| titleField | 标题字段名 | String | 'title' |
| descField | 描述字段名 | String | 'desc' |
| priceField | 价格字段名 | String | 'price' |
| originalPriceField | 原价字段名 | String | 'originalPrice' |
| salesField | 销量字段名 | String | 'sales' |
| tagField | 标签字段名 | String | 'tag' |
| imageMode | 图片裁剪模式 | String | 'aspectFill' |
| lazyLoad | 是否懒加载图片 | Boolean | true |
| showPrice | 是否显示价格 | Boolean | true |
| showSales | 是否显示销量 | Boolean | true |
| showLoadMore | 是否显示加载更多 | Boolean | true |
| titleLines | 标题显示行数 | Number | 2 |
| currency | 货币符号 | String | '¥' |
| loading | 是否加载中 | Boolean | false |
| finished | 是否加载完成 | Boolean | false |
| loadingText | 加载中文本 | String | '加载中...' |
| loadMoreText | 加载更多文本 | String | '点击加载更多' |
| finishedText | 加载完成文本 | String | '没有更多了' |
| emptyText | 空状态文本 | String | '暂无商品' |
| titleColor | 标题颜色 | String | '#333' |
| descColor | 描述颜色 | String | '#666' |
| priceColor | 价格颜色 | String | '#ff4757' |
| originalPriceColor | 原价颜色 | String | '#999' |
| salesColor | 销量颜色 | String | '#999' |
| tagColor | 标签文字颜色 | String | '#fff' |
| tagBgColor | 标签背景颜色 | String | '#ff4757' |
| customClass | 自定义类名 | String | '' |
| customStyle | 自定义样式 | Object/String | {} |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| item-click | 点击商品项 | { item, index } |
| load-more | 加载更多 | - |
| image-error | 图片加载错误 | { item, index } |
| image-load | 图片加载成功 | { item, index } |

### Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| header | 头部内容 | - |
| item | 自定义商品项 | { item, index } |
| empty | 空状态内容 | - |
| loadMore | 自定义加载更多 | - |
| footer | 底部内容 | - |

## 数据结构

### 商品数据结构

```javascript
{
  id: 1,                    // 唯一标识
  image: 'image_url',       // 商品图片
  title: '商品标题',         // 商品标题
  desc: '商品描述',          // 商品描述
  price: 99.99,             // 当前价格
  originalPrice: 199.99,    // 原价
  sales: 1234,              // 销量
  tag: '热销'               // 标签
}
```

## 主题定制

组件提供了丰富的 CSS 变量，可用于自定义样式：

```scss
.zx-product-feed {
  // 卡片样式
  --card-bg: #fff;
  --card-border-radius: 12rpx;
  --card-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
  
  // 文字颜色
  --title-color: #333;
  --desc-color: #666;
  --price-color: #ff4757;
  --original-price-color: #999;
  --sales-color: #999;
  
  // 标签样式
  --tag-color: #fff;
  --tag-bg-color: #ff4757;
  --tag-border-radius: 6rpx;
  
  // 加载状态
  --loading-color: #007aff;
  --loading-text-color: #666;
}
```

## 注意事项

1. 瀑布流布局在小程序中可能存在兼容性问题，建议优先使用网格布局
2. 图片建议使用 CDN 地址，并设置合适的尺寸以提升加载性能
3. 大量数据时建议启用虚拟滚动或分页加载以提升性能
4. 自定义插槽时注意保持样式一致性
5. 在使用自定义字段映射时，确保数据结构的正确性

## 兼容性

- ✅ H5
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 百度小程序
- ✅ 字节跳动小程序
- ✅ QQ小程序
- ✅ 快手小程序
- ✅ 京东小程序
- ✅ App

## 许可证

MIT License