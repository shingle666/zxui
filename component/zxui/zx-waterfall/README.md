# zx-waterfall 瀑布流组件

一个基于 uniapp 的跨平台瀑布流组件，支持 H5、小程序和 App。

## 特性

- 支持多种数据分组模式（简单模式和高度计算模式）
- 支持自定义样式和布局
- 支持加载状态、完成状态和错误状态的自定义展示
- 支持自定义插槽内容
- 跨平台兼容（H5、小程序、App）
- 响应式设计

## 安装

```bash
npm install @tanzhenxing/zx-waterfall
```

## 基础用法

```vue
<template>
  <view class="container">
    <zx-waterfall
      :listData="goodsList"
      :loading="loading"
      :finished="finished"
      :error="loadError"
      @retry="onRetry"
    >
      <template #left="{ entity, index }">
        <view class="goods-item">
          <image class="goods-image" :src="entity.image" mode="widthFix"></image>
          <view class="goods-title">{{ entity.title }}</view>
          <view class="goods-price">¥{{ entity.price }}</view>
        </view>
      </template>
      
      <template #right="{ entity, index }">
        <view class="goods-item">
          <image class="goods-image" :src="entity.image" mode="widthFix"></image>
          <view class="goods-title">{{ entity.title }}</view>
          <view class="goods-price">¥{{ entity.price }}</view>
        </view>
      </template>
    </zx-waterfall>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 商品列表数据
const goodsList = ref([])
// 加载状态
const loading = ref(false)
// 是否加载完成
const finished = ref(false)
// 是否加载失败
const loadError = ref(false)
// 当前页码
const page = ref(1)

// 加载数据
const loadData = async () => {
  if (finished.value || loading.value) return
  
  loading.value = true
  try {
    const res = await getGoodsList(page.value)
    goodsList.value = [...goodsList.value, ...res.data]
    
    // 判断是否还有更多数据
    if (page.value >= res.totalPage) {
      finished.value = true
    } else {
      page.value++
    }
    loadError.value = false
  } catch (e) {
    loadError.value = true
  } finally {
    loading.value = false
  }
}

// 重试加载
const onRetry = () => {
  loadError.value = false
  loadData()
}

// 监听页面滚动到底部
const onReachBottom = () => {
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style lang="scss">
.container {
  padding: 20rpx;
}

.goods-item {
  background-color: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}

.goods-image {
  width: 100%;
  height: auto;
}

.goods-title {
  font-size: 28rpx;
  color: #333;
  padding: 16rpx;
  line-height: 1.4;
}

.goods-price {
  font-size: 32rpx;
  color: #ff4d4f;
  font-weight: bold;
  padding: 0 16rpx 16rpx;
}
</style>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|------|------|------|------|
| listData | Array | [] | 列表数据 |
| pageSize | Number | 10 | 每页数据条数 |
| type | Number | 1 | 数据分组类型：1-简单左右分组，2-计算高度分组 |
| columnCount | Number | 2 | 瀑布流列数，目前支持最大值为2 |
| columnGap | String | '10rpx' | 列与列的间隙 |
| leftGap | String | '10rpx' | 左侧和列表的间隙 |
| rightGap | String | '10rpx' | 右侧和列表的间隙 |
| backgroundColor | String | 'transparent' | 列表背景色 |
| radius | String | '0' | 列表外层容器圆角值 |
| loading | Boolean | false | 是否处于加载状态 |
| finished | Boolean | false | 是否已加载完成所有数据 |
| error | Boolean | false | 是否加载失败 |
| delay | Number | 50 | 延迟计算时间(ms) |

## 事件说明

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| retry | 加载失败时点击重试触发 | - |
| change | 数据变化时触发 | { leftList, rightList } |

## 插槽说明

| 插槽名 | 说明 | 作用域参数 |
|------|------|------|
| left | 左侧列表项内容 | { entity, index, isList } |
| right | 右侧列表项内容 | { entity, index, isList } |
| loading | 自定义加载中提示 | - |
| finished | 自定义加载完成提示 | - |
| error | 自定义加载失败提示 | - |

## 方法说明

通过 ref 可以获取到组件实例并调用实例方法

| 方法名 | 说明 | 参数 |
|------|------|------|
| resetList | 重置列表数据 | - |
| getListData | 获取当前列表数据 | - |

## 高级用法

### 1. 自定义加载状态

```vue
<zx-waterfall :listData="goodsList" :loading="loading" :finished="finished">
  <template #loading>
    <view class="custom-loading">
      <image src="/static/loading.gif" mode="widthFix"></image>
      <text>正在加载更多商品...</text>
    </view>
  </template>
  
  <template #finished>
    <view class="custom-finished">
      <text>没有更多商品了~</text>
    </view>
  </template>
</zx-waterfall>
```

### 2. 单列模式

```vue
<zx-waterfall :listData="goodsList" :columnCount="1">
  <template #left="{ entity, index, isList }">
    <view class="goods-item">
      <!-- 单列模式下的商品展示 -->
    </view>
  </template>
</zx-waterfall>
```

### 3. 高度计算模式

```vue
<zx-waterfall :listData="goodsList" :type="2">
  <!-- 插槽内容 -->
</zx-waterfall>
```

## 常见问题

1. **为什么我的瀑布流两列高度差异大？**

   在使用 type=2 (高度计算模式) 时，图片需要设置 mode="widthFix" 保持图片宽高比例，确保计算准确。

2. **如何监听滚动到底部加载更多？**

   组件不包含滚动加载功能，需要在页面中监听滚动事件，触发 loadData 方法。可以使用 uni.onReachBottom 或自定义滚动监听。

3. **如何处理数据刷新？**

   当列表数据长度小于等于 pageSize 时，组件会自动重置列表。也可以使用 resetList 方法手动重置。

## 实现原理

组件提供两种分组模式：

1. **简单左右分组（type=1）**：将数据按照索引奇偶分为左右两列，适合高度相近的列表项。
2. **高度计算模式（type=2）**：通过计算左右两列的高度，将新的列表项添加到高度较小的一列，实现更好的瀑布流效果。

## 注意事项

- 为了获得最佳效果，建议列表项中的图片设置 mode="widthFix"
- 列表项内容由用户自定义，组件不负责具体的列表项样式
- 在 type=2 模式下，初始渲染可能有轻微的闪烁，这是正常的高度计算过程
