# Category 分类

用于展示商品分类的组件，支持左右布局，左侧为分类列表，右侧为子分类网格展示。

## 特性

- 🎯 **左右布局** - 经典的分类展示布局
- 🎨 **高度自定义** - 支持自定义样式、字段映射、插槽等
- 📱 **多端兼容** - 支持 H5、小程序、App
- 🔄 **响应式** - 支持动态数据更新
- 🎪 **丰富插槽** - 提供多个插槽满足不同需求
- ⚡ **性能优化** - 使用 scroll-view 优化滚动性能

## 引入

```javascript
import zxCategory from '@/components/zx-category/zx-category.vue'
```

## 基础用法

```vue
<template>
  <zx-category 
    :categories="categories"
    v-model:active-index="activeIndex"
    @category-click="onCategoryClick"
    @sub-category-click="onSubCategoryClick"
    style="height: 600rpx;"
  ></zx-category>
</template>

<script setup>
import { ref, reactive } from 'vue'

const activeIndex = ref(0)

const categories = reactive([
  {
    id: 1,
    name: '手机数码',
    children: [
      { id: 101, name: '手机', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
      { id: 102, name: '平板电脑', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
      { id: 103, name: '智能手表', image: 'https://img.yzcdn.cn/vant/cat.jpeg' }
    ]
  },
  {
    id: 2,
    name: '服装鞋帽',
    children: [
      { id: 201, name: '男装', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
      { id: 202, name: '女装', image: 'https://img.yzcdn.cn/vant/cat.jpeg' },
      { id: 203, name: '童装', image: 'https://img.yzcdn.cn/vant/cat.jpeg' }
    ]
  }
])

const onCategoryClick = (data) => {
  console.log('分类点击:', data)
}

const onSubCategoryClick = (data) => {
  console.log('子分类点击:', data)
}
</script>
```

## 自定义列数

```vue
<template>
  <zx-category 
    :categories="categories"
    :columns="4"
    style="height: 600rpx;"
  ></zx-category>
</template>
```

## 自定义字段映射

当你的数据结构与默认字段不同时，可以通过字段映射来适配：

```vue
<template>
  <zx-category 
    :categories="customCategories"
    category-key="categoryId"
    category-name-key="categoryName"
    sub-categories-key="subList"
    sub-category-key="subId"
    sub-name-key="subName"
    sub-image-key="subImage"
  ></zx-category>
</template>

<script setup>
const customCategories = [
  {
    categoryId: 1,
    categoryName: '电子产品',
    subList: [
      { subId: 101, subName: '笔记本电脑', subImage: 'xxx.jpg' }
    ]
  }
]
</script>
```

## 自定义插槽

### 左侧分类项插槽

```vue
<template>
  <zx-category :categories="categories">
    <template #left-item="{ item, index, active }">
      <view class="custom-left-item">
        <zx-icon v-if="item.icon" :name="item.icon" :color="active ? '#ff6900' : '#666'"></zx-icon>
        <text :style="{ color: active ? '#ff6900' : '#333' }">{{ item.name }}</text>
        <view v-if="item.badge" class="badge">{{ item.badge }}</view>
      </view>
    </template>
  </zx-category>
</template>
```

### 右侧头部插槽

```vue
<template>
  <zx-category :categories="categories">
    <template #right-header="{ category }">
      <view class="custom-header">
        <text class="title">{{ category.name }}</text>
        <text class="desc">{{ category.desc || '精选推荐' }}</text>
      </view>
    </template>
  </zx-category>
</template>
```

### 子分类项插槽

```vue
<template>
  <zx-category :categories="categories">
    <template #sub-item="{ item, index, category }">
      <view class="custom-sub-item">
        <image :src="item.image" class="image" />
        <text class="name">{{ item.name }}</text>
        <text v-if="item.price" class="price">¥{{ item.price }}</text>
      </view>
    </template>
  </zx-category>
</template>
```

### 空状态插槽

```vue
<template>
  <zx-category :categories="categories">
    <template #empty>
      <view class="custom-empty">
        <zx-icon name="inbox" size="80rpx" color="#ddd"></zx-icon>
        <text>暂无数据</text>
      </view>
    </template>
  </zx-category>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| categories | 分类数据 | Array | `[]` |
| active-index | 当前激活的分类索引，支持 v-model | Number\|String | `0` |
| category-key | 分类唯一标识字段名 | String | `'id'` |
| category-name-key | 分类名称字段名 | String | `'name'` |
| sub-categories-key | 子分类数组字段名 | String | `'children'` |
| sub-category-key | 子分类唯一标识字段名 | String | `'id'` |
| sub-name-key | 子分类名称字段名 | String | `'name'` |
| sub-image-key | 子分类图片字段名 | String | `'image'` |
| left-width | 左侧分类列表宽度（rpx） | Number\|String | `200` |
| columns | 右侧网格列数 | Number\|String | `3` |
| show-category-title | 是否显示分类标题 | Boolean | `true` |
| show-border | 是否显示子分类项边框 | Boolean | `true` |
| show-empty | 是否显示空状态 | Boolean | `true` |
| show-scrollbar | 是否显示滚动条 | Boolean | `false` |
| scroll-with-animation | 滚动时是否使用动画 | Boolean | `true` |
| empty-text | 空状态文本 | String | `'暂无数据'` |
| custom-class | 自定义类名 | String | `''` |
| custom-style | 自定义样式 | Object | `{}` |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| category-click | 分类点击时触发 | `{ item, index, category }` |
| sub-category-click | 子分类点击时触发 | `{ item, index, category, categoryIndex }` |
| update:active-index | 激活索引更新时触发 | `index` |

### Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| left-item | 自定义左侧分类项内容 | `{ item, index, active }` |
| right-header | 自定义右侧头部内容 | `{ category }` |
| sub-item | 自定义子分类项内容 | `{ item, index, category }` |
| right-footer | 自定义右侧底部内容 | `{ category }` |
| empty | 自定义空状态内容 | - |

### Methods

通过 ref 可以获取到 Category 实例并调用实例方法：

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| setActiveIndex | 设置激活的分类索引 | `index: number` | - |
| getCurrentCategory | 获取当前激活的分类 | - | `object` |
| getCurrentSubCategories | 获取当前激活分类的子分类列表 | - | `array` |
| scrollToTop | 滚动到顶部 | - | - |

```vue
<template>
  <zx-category ref="categoryRef" :categories="categories"></zx-category>
</template>

<script setup>
import { ref } from 'vue'

const categoryRef = ref()

// 设置激活分类
const setActive = () => {
  categoryRef.value.setActiveIndex(2)
}

// 获取当前分类
const getCurrent = () => {
  const current = categoryRef.value.getCurrentCategory()
  console.log(current)
}
</script>
```

## 数据结构

### 基础数据结构

```javascript
const categories = [
  {
    id: 1,                    // 分类ID
    name: '手机数码',          // 分类名称
    badge: 'HOT',             // 徽标（可选）
    children: [               // 子分类列表
      {
        id: 101,              // 子分类ID
        name: '手机',          // 子分类名称
        image: 'xxx.jpg',     // 子分类图片
        badge: 'NEW'          // 徽标（可选）
      }
    ]
  }
]
```

### 自定义字段结构

```javascript
const customCategories = [
  {
    categoryId: 1,            // 自定义分类ID字段
    categoryName: '电子产品',  // 自定义分类名称字段
    subList: [                // 自定义子分类数组字段
      {
        subId: 101,           // 自定义子分类ID字段
        subName: '笔记本',     // 自定义子分类名称字段
        subImage: 'xxx.jpg'   // 自定义子分类图片字段
      }
    ]
  }
]
```

## 样式定制

组件提供了丰富的 CSS 变量，可以方便地进行样式定制：

```scss
.zx-category {
  // 左侧分类样式
  &__left {
    background-color: #fff;
    
    &-item {
      padding: 32rpx 24rpx;
      
      &--active {
        background-color: #f8f8f8;
        border-right: 6rpx solid #ff6900;
      }
    }
    
    &-text {
      font-size: 28rpx;
      color: #323233;
    }
  }
  
  // 右侧内容样式
  &__right {
    background-color: #fff;
    
    &-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #323233;
    }
  }
  
  // 网格样式
  &__grid {
    &-item {
      padding: 32rpx 16rpx;
      background-color: #fff;
      border-radius: 12rpx;
    }
    
    &-text {
      font-size: 24rpx;
      color: #323233;
    }
  }
}
```

## 注意事项

1. **容器高度**：组件需要设置明确的高度才能正常滚动
2. **图片资源**：确保图片资源可访问，建议使用 CDN
3. **数据格式**：确保数据结构符合组件要求
4. **性能优化**：大量数据时建议使用虚拟滚动
5. **兼容性**：在小程序中使用时注意图片域名配置

## 常见问题

### Q: 如何实现分类数据的异步加载？

A: 可以在分类点击时动态加载子分类数据：

```vue
<script setup>
const onCategoryClick = async (data) => {
  // 显示加载状态
  uni.showLoading({ title: '加载中...' })
  
  try {
    // 异步加载子分类数据
    const subCategories = await loadSubCategories(data.item.id)
    
    // 更新数据
    categories[data.index].children = subCategories
  } catch (error) {
    console.error('加载失败:', error)
  } finally {
    uni.hideLoading()
  }
}
</script>
```

### Q: 如何实现左右联动滚动？

A: 组件内部已实现基础联动，如需更复杂的联动效果，可以监听滚动事件：

```vue
<template>
  <zx-category 
    :categories="categories"
    @scroll="onScroll"
  ></zx-category>
</template>

<script setup>
const onScroll = (e) => {
  // 处理滚动联动逻辑
  console.log('滚动位置:', e.detail.scrollTop)
}
</script>
```

### Q: 如何自定义空状态样式？

A: 使用 empty 插槽：

```vue
<template>
  <zx-category :categories="categories">
    <template #empty>
      <view class="custom-empty">
        <image src="/static/empty.png" class="empty-image" />
        <text class="empty-text">暂无商品分类</text>
        <button class="empty-button" @click="refresh">刷新</button>
      </view>
    </template>
  </zx-category>
</template>
```