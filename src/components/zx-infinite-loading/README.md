# zx-infinite-loading 无限滚动加载

`zx-infinite-loading` 是一个支持无限滚动加载的组件，适用于长列表数据的分页加载场景。组件支持 H5、小程序、App 等多端平台。

## 特性

- 🚀 支持多端：H5、小程序、App
- 📱 自动检测滚动位置，到达底部自动触发加载
- 🎨 支持自定义加载状态显示
- 🔄 支持加载失败重试
- ⚡ 支持自定义触发距离
- 🎯 支持禁用状态
- 📦 轻量级，无外部依赖

## 使用方法

### 基础用法

```vue
<template>
  <view>
    <zx-infinite-loading 
      :status="loadStatus" 
      @load="onLoad"
      @retry="onRetry"
    >
      <view v-for="item in list" :key="item.id" class="list-item">
        {{ item.name }}
      </view>
    </zx-infinite-loading>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import zxInfiniteLoading from '@/components/zx-infinite-loading/zx-infinite-loading.vue'

const list = ref([])
const loadStatus = ref('loading')
const page = ref(1)

const onLoad = async () => {
  try {
    // 模拟API请求
    const response = await fetchData(page.value)
    
    if (response.data.length > 0) {
      list.value.push(...response.data)
      page.value++
      loadStatus.value = 'loading'
    } else {
      loadStatus.value = 'complete'
    }
  } catch (error) {
    loadStatus.value = 'error'
  }
}

const onRetry = () => {
  loadStatus.value = 'loading'
}

const fetchData = (pageNum) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = Array.from({ length: 10 }, (_, i) => ({
        id: (pageNum - 1) * 10 + i + 1,
        name: `Item ${(pageNum - 1) * 10 + i + 1}`
      }))
      resolve({ data: pageNum <= 5 ? data : [] })
    }, 1000)
  })
}
</script>
```

### 自定义加载状态

```vue
<template>
  <zx-infinite-loading :status="loadStatus" @load="onLoad">
    <!-- 列表内容 -->
    <view v-for="item in list" :key="item.id" class="list-item">
      {{ item.name }}
    </view>
    
    <!-- 自定义加载中状态 -->
    <template #loading>
      <view class="custom-loading">
        <image src="/static/loading.gif" class="loading-gif" />
        <text>正在努力加载中...</text>
      </view>
    </template>
    
    <!-- 自定义错误状态 -->
    <template #error="{ retry }">
      <view class="custom-error" @click="retry">
        <text>😵 加载失败了</text>
        <text>点击重新加载</text>
      </view>
    </template>
    
    <!-- 自定义完成状态 -->
    <template #complete>
      <view class="custom-complete">
        <text>🎉 全部加载完成</text>
      </view>
    </template>
  </zx-infinite-loading>
</template>
```

### 配置触发距离

```vue
<template>
  <!-- 距离底部200px时触发加载 -->
  <zx-infinite-loading 
    :threshold="200"
    :status="loadStatus" 
    @load="onLoad"
  >
    <!-- 内容 -->
  </zx-infinite-loading>
</template>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| status | String | 'loading' | 加载状态，可选值：loading、error、complete |
| threshold | Number | 100 | 距离底部多少像素时触发加载 |
| loadingText | String | '加载中...' | 加载中显示的文本 |
| errorText | String | '加载失败，点击重试' | 加载失败显示的文本 |
| completeText | String | '没有更多了' | 加载完成显示的文本 |
| disabled | Boolean | false | 是否禁用 |
| height | String/Number | '' | 容器高度 |
| statusStyle | Object | {} | 状态区域自定义样式 |
| immediateCheck | Boolean | true | 是否立即检查是否需要加载 |

## 事件说明

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| load | 触发加载时的回调 | - |
| retry | 点击重试时的回调 | - |

## 插槽说明

| 插槽名 | 说明 | 插槽参数 |
| --- | --- | --- |
| default | 默认插槽，用于放置列表内容 | - |
| loading | 自定义加载中状态 | { loading: true } |
| error | 自定义错误状态 | { error: true, retry: Function } |
| complete | 自定义完成状态 | { complete: true } |

## 方法说明

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| checkLoad | 手动检查是否需要加载 | - |

## 状态管理

组件通过 `status` 属性来控制当前的加载状态：

- **loading**: 加载中状态，会显示加载动画和加载文本
- **error**: 错误状态，会显示错误文本，点击可重试
- **complete**: 完成状态，会显示完成文本，不再触发加载

## 使用场景

### 1. 商品列表
```vue
<template>
  <zx-infinite-loading :status="loadStatus" @load="loadGoods">
    <view v-for="goods in goodsList" :key="goods.id" class="goods-item">
      <!-- 商品信息 -->
    </view>
  </zx-infinite-loading>
</template>
```

### 2. 新闻列表
```vue
<template>
  <zx-infinite-loading :status="loadStatus" @load="loadNews">
    <view v-for="news in newsList" :key="news.id" class="news-item">
      <!-- 新闻信息 -->
    </view>
  </zx-infinite-loading>
</template>
```

### 3. 评论列表
```vue
<template>
  <zx-infinite-loading 
    :status="loadStatus" 
    :threshold="50"
    @load="loadComments"
  >
    <view v-for="comment in commentList" :key="comment.id" class="comment-item">
      <!-- 评论信息 -->
    </view>
  </zx-infinite-loading>
</template>
```

## 注意事项

1. **页面滚动监听**: 组件依赖页面滚动事件，确保页面可以正常滚动
2. **状态管理**: 需要正确管理 `status` 状态，避免无限循环加载
3. **数据去重**: 在加载新数据时，注意避免重复数据
4. **错误处理**: 建议在加载失败时提供重试机制
5. **性能优化**: 对于大量数据，建议使用虚拟滚动等优化方案

## 兼容性

- ✅ H5
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 百度小程序
- ✅ 字节跳动小程序
- ✅ QQ小程序
- ✅ App (Vue)
- ✅ App (Nvue)

## 更新日志

### v1.0.0
- 🎉 初始版本发布
- ✨ 支持基础无限滚动加载功能
- ✨ 支持自定义加载状态
- ✨ 支持多端兼容