# ZX-Scroll 使用指南

## 快速集成

### 1. 组件引入

将 `zx-scroll` 文件夹复制到你的项目 `components` 目录中，然后在页面中引入：

```vue
<script>
import ZxScroll from '@/components/zx-scroll/zx-scroll.vue'

export default {
  components: {
    ZxScroll
  }
}
</script>
```

或者使用 Vue 3 Composition API：

```vue
<script setup>
// 如果配置了自动导入，可以直接使用
// 否则需要手动导入
</script>
```

### 2. 页面配置（可选）

在 `pages.json` 中为使用 zx-scroll 的页面添加配置：

```json
{
  "pages": [
    {
      "path": "pages/scroll-demo/scroll-demo",
      "style": {
        "navigationBarTitleText": "滚动演示",
        "enablePullDownRefresh": false,
        "backgroundTextStyle": "dark"
      }
    }
  ]
}
```

## 常见使用场景

### 场景1: 简单列表滚动

```vue
<template>
  <zx-scroll height="600rpx" :show-scrollbar="true">
    <view v-for="item in list" :key="item.id" class="list-item">
      {{ item.title }}
    </view>
  </zx-scroll>
</template>

<script setup>
import { ref } from 'vue'

const list = ref([
  { id: 1, title: '列表项 1' },
  { id: 2, title: '列表项 2' },
  // ...
])
</script>

<style>
.list-item {
  padding: 20rpx;
  border-bottom: 1px solid #eee;
}
</style>
```

### 场景2: 新闻资讯页面

```vue
<template>
  <zx-scroll
    height="100vh"
    :refresher-enabled="true"
    :refresher-triggered="refreshing"
    :show-load-more="true"
    :is-loading="loading"
    :no-more="noMore"
    :show-back-top="true"
    @refresherrefresh="onRefresh"
    @loadMore="onLoadMore"
  >
    <view v-for="article in articles" :key="article.id" class="article-item">
      <image :src="article.cover" class="article-cover" />
      <view class="article-content">
        <text class="article-title">{{ article.title }}</text>
        <text class="article-summary">{{ article.summary }}</text>
        <view class="article-meta">
          <text class="article-time">{{ article.publishTime }}</text>
          <text class="article-views">{{ article.views }}阅读</text>
        </view>
      </view>
    </view>
  </zx-scroll>
</template>

<script setup>
import { ref } from 'vue'

const articles = ref([])
const refreshing = ref(false)
const loading = ref(false)
const noMore = ref(false)

const onRefresh = async () => {
  refreshing.value = true
  try {
    // 调用接口获取最新数据
    const res = await api.getLatestArticles()
    articles.value = res.data
  } finally {
    refreshing.value = false
  }
}

const onLoadMore = async () => {
  if (loading.value || noMore.value) return
  
  loading.value = true
  try {
    // 调用接口获取更多数据
    const res = await api.getMoreArticles(articles.value.length)
    if (res.data.length === 0) {
      noMore.value = true
    } else {
      articles.value.push(...res.data)
    }
  } finally {
    loading.value = false
  }
}
</script>
```

### 场景3: 商品展示页面（水平滚动）

```vue
<template>
  <view class="product-section">
    <text class="section-title">推荐商品</text>
    <zx-scroll 
      direction="x" 
      height="300rpx"
      :show-scrollbar="false"
    >
      <view 
        v-for="product in products" 
        :key="product.id" 
        class="product-card"
        @tap="goToProduct(product)"
      >
        <image :src="product.image" class="product-image" />
        <text class="product-name">{{ product.name }}</text>
        <text class="product-price">￥{{ product.price }}</text>
      </view>
    </zx-scroll>
  </view>
</template>

<style>
.product-card {
  width: 200rpx;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.product-image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 8rpx;
}

.product-name {
  display: block;
  font-size: 24rpx;
  margin-top: 10rpx;
  color: #333;
}

.product-price {
  display: block;
  font-size: 28rpx;
  color: #e60012;
  font-weight: bold;
  margin-top: 5rpx;
}
</style>
```

### 场景4: 大数据量虚拟列表

```vue
<template>
  <zx-scroll
    height="100vh"
    :enable-virtual-list="true"
    :virtual-list-source="bigDataList"
    :virtual-item-height="120"
    :virtual-buffer="10"
    :show-scrollbar="true"
  >
    <template #virtual-item="{ item, index }">
      <view class="virtual-list-item">
        <view class="item-avatar">
          <image :src="item.avatar" class="avatar-img" />
        </view>
        <view class="item-content">
          <text class="item-name">{{ item.name }}</text>
          <text class="item-desc">{{ item.description }}</text>
          <text class="item-index">序号: {{ index + 1 }}</text>
        </view>
      </view>
    </template>
  </zx-scroll>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bigDataList = ref([])

onMounted(() => {
  // 生成大量数据
  const data = []
  for (let i = 0; i < 50000; i++) {
    data.push({
      id: i,
      name: `用户 ${i}`,
      description: `这是第 ${i} 个用户的描述信息`,
      avatar: `https://picsum.photos/60/60?random=${i}`
    })
  }
  bigDataList.value = data
})
</script>

<style>
.virtual-list-item {
  height: 120rpx;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  border-bottom: 1px solid #eee;
}

.item-avatar {
  margin-right: 20rpx;
}

.avatar-img {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}

.item-content {
  flex: 1;
}

.item-name {
  display: block;
  font-size: 32rpx;
  color: #333;
  font-weight: 500;
}

.item-desc {
  display: block;
  font-size: 26rpx;
  color: #666;
  margin-top: 10rpx;
}

.item-index {
  display: block;
  font-size: 24rpx;
  color: #999;
  margin-top: 5rpx;
}
</style>
```

### 场景5: 聊天消息列表

```vue
<template>
  <zx-scroll
    ref="chatScrollRef"
    height="calc(100vh - 120rpx)"
    :show-scrollbar="false"
    :throttle="true"
    :throttle-time="16"
  >
    <view v-for="message in messages" :key="message.id" class="message-item">
      <view 
        class="message-bubble"
        :class="{ 'message-self': message.isSelf }"
      >
        <text class="message-text">{{ message.content }}</text>
        <text class="message-time">{{ formatTime(message.time) }}</text>
      </view>
    </view>
  </zx-scroll>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'

const chatScrollRef = ref()
const messages = ref([])

// 新消息到达时滚动到底部
watch(() => messages.value.length, () => {
  nextTick(() => {
    chatScrollRef.value?.scrollToBottom()
  })
})

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString()
}
</script>
```

## 性能优化建议

### 1. 大数据量场景

- 超过 100 条数据时建议使用虚拟列表
- 设置合适的 `virtualBuffer` 值（通常 3-10 之间）
- 确保 `virtualItemHeight` 或 `virtualItemWidth` 准确

### 2. 频繁滚动场景

- 启用节流模式：`:throttle="true"`
- 调整节流时间：`:throttle-time="16"`（60fps）
- 避免在滚动事件中执行复杂计算

### 3. 网络请求优化

- 使用防抖避免频繁请求：`:debounce="true"`
- 设置合理的预加载距离：`:preload-distance="100"`
- 实现请求缓存和重复请求取消

### 4. 内存管理

- 及时清理不需要的数据
- 使用 `v-show` 代替 `v-if` 控制显示隐藏
- 避免在循环中创建复杂对象

## 平台兼容性

### 微信小程序

```vue
<!-- 注意小程序中的一些限制 -->
<zx-scroll
  height="400rpx"
  :enhanced="true"
  :show-scrollbar="false"
  :fast-deceleration="true"
>
  <!-- 内容 -->
</zx-scroll>
```

### App 端

```vue
<!-- App 端可以使用更多特性 -->
<zx-scroll
  height="400rpx"
  :bounce="true"
  :paging-enabled="false"
  :enable-drag="true"
>
  <!-- 内容 -->
</zx-scroll>
```

### H5 端

```vue
<!-- H5 端注意滚动条样式 -->
<zx-scroll
  height="400rpx"
  :show-scrollbar="true"
  custom-class="custom-scroll"
>
  <!-- 内容 -->
</zx-scroll>

<style>
.custom-scroll::-webkit-scrollbar {
  width: 6px;
}
.custom-scroll::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}
</style>
```

## 常见问题

### 1. 虚拟列表项高度不一致

```vue
<!-- 错误示例：高度不固定 -->
<template #virtual-item="{ item }">
  <view class="item">
    <text>{{ item.title }}</text>
    <!-- 内容高度可能变化 -->
    <text v-if="item.description">{{ item.description }}</text>
  </view>
</template>

<!-- 正确示例：确保固定高度 -->
<template #virtual-item="{ item }">
  <view class="item" style="height: 80px; overflow: hidden;">
    <text class="title">{{ item.title }}</text>
    <text class="desc">{{ item.description || '暂无描述' }}</text>
  </view>
</template>
```

### 2. 下拉刷新状态管理

```vue
<script setup>
// 正确的状态管理
const refreshing = ref(false)

const onRefresh = async () => {
  if (refreshing.value) return // 防止重复触发
  
  refreshing.value = true
  try {
    await loadData()
  } finally {
    refreshing.value = false // 确保状态被重置
  }
}
</script>
```

### 3. 滚动位置记忆

```vue
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const scrollRef = ref()
const scrollKey = 'page-scroll-position'

onMounted(() => {
  // 恢复滚动位置
  const savedPosition = uni.getStorageSync(scrollKey)
  if (savedPosition) {
    nextTick(() => {
      scrollRef.value?.scrollTo(savedPosition)
    })
  }
})

const onScroll = (e) => {
  // 保存滚动位置
  uni.setStorageSync(scrollKey, e.scrollTop)
}

onBeforeUnmount(() => {
  // 清理（可选）
  uni.removeStorageSync(scrollKey)
})
</script>
```

## 调试技巧

### 1. 开启调试模式

```vue
<zx-scroll
  @scroll="onScroll"
  @virtualScroll="onVirtualScroll"
>
  <!-- 内容 -->
</zx-scroll>

<script setup>
const onScroll = (e) => {
  console.log('滚动位置:', e.scrollTop)
}

const onVirtualScroll = (info) => {
  console.log('虚拟滚动:', info.visibleRange)
}
</script>
```

### 2. 性能监控

```vue
<script setup>
import { ref } from 'vue'

const scrollCount = ref(0)
const performanceMode = ref('normal')

const onScroll = () => {
  scrollCount.value++
  if (scrollCount.value % 10 === 0) {
    console.log(`滚动事件触发次数: ${scrollCount.value}`)
  }
}

// 切换性能模式进行对比
const togglePerformanceMode = () => {
  const modes = ['normal', 'throttle', 'debounce']
  const currentIndex = modes.indexOf(performanceMode.value)
  performanceMode.value = modes[(currentIndex + 1) % modes.length]
  scrollCount.value = 0
  console.log(`切换到 ${performanceMode.value} 模式`)
}
</script>
```

通过这个使用指南，你应该能够快速上手并充分利用 zx-scroll 组件的各种功能。如果遇到问题，请参考 README.md 中的详细 API 文档。 