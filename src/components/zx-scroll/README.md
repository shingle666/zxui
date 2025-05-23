# ZX-Scroll 增强滚动组件

一个基于 uni-app scroll-view 的增强滚动组件，支持更多自定义功能和性能优化。

## ✨ 特性

- 🚀 **高性能**: 支持虚拟列表、节流防抖等性能优化
- 🎨 **丰富功能**: 下拉刷新、上拉加载、自动滚动、返回顶部
- 📱 **跨平台**: 支持 H5、小程序、App 等多端
- 🎯 **易用性**: Vue3 Composition API，支持 JavaScript 开发
- 🔧 **可定制**: 丰富的配置选项和插槽支持
- ♿ **无障碍**: 支持深色模式、高对比度、减少动画等

## 📦 安装

将 `zx-scroll` 文件夹复制到你的项目组件目录中。

## 🚀 快速开始

### 基础用法

```vue
<template>
  <zx-scroll height="400rpx" :show-scrollbar="true">
    <view v-for="item in list" :key="item.id" class="item">
      {{ item.text }}
    </view>
  </zx-scroll>
</template>

<script setup>
import { ref } from 'vue'

const list = ref([
  { id: 1, text: '列表项 1' },
  { id: 2, text: '列表项 2' },
  // ...
])
</script>
```

### 水平滚动

```vue
<template>
  <zx-scroll direction="x" height="200rpx">
    <view v-for="item in list" :key="item.id" class="horizontal-item">
      {{ item.text }}
    </view>
  </zx-scroll>
</template>
```

### 下拉刷新

```vue
<template>
  <zx-scroll
    height="400rpx"
    :refresher-enabled="true"
    :refresher-triggered="refreshTriggered"
    @refresherrefresh="onRefresh"
  >
    <view v-for="item in list" :key="item.id" class="item">
      {{ item.text }}
    </view>
  </zx-scroll>
</template>

<script setup>
import { ref } from 'vue'

const refreshTriggered = ref(false)

const onRefresh = () => {
  refreshTriggered.value = true
  // 模拟刷新
  setTimeout(() => {
    refreshTriggered.value = false
  }, 1500)
}
</script>
```

### 加载更多

```vue
<template>
  <zx-scroll
    height="400rpx"
    :show-load-more="true"
    :is-loading="isLoading"
    :no-more="noMore"
    @loadMore="onLoadMore"
  >
    <view v-for="item in list" :key="item.id" class="item">
      {{ item.text }}
    </view>
  </zx-scroll>
</template>

<script setup>
import { ref } from 'vue'

const isLoading = ref(false)
const noMore = ref(false)

const onLoadMore = () => {
  if (isLoading.value || noMore.value) return
  
  isLoading.value = true
  // 模拟加载
  setTimeout(() => {
    // 加载数据...
    isLoading.value = false
  }, 1000)
}
</script>
```

### 虚拟列表

```vue
<template>
  <zx-scroll
    height="400rpx"
    :enable-virtual-list="true"
    :virtual-list-source="virtualData"
    :virtual-item-height="80"
    :virtual-buffer="5"
  >
    <template #virtual-item="{ item, index }">
      <view class="virtual-item">
        <text>{{ index }}: {{ item.title }}</text>
      </view>
    </template>
  </zx-scroll>
</template>

<script setup>
import { ref } from 'vue'

const virtualData = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    title: `虚拟列表项 ${i}`
  }))
)
</script>
```

### 自动滚动

```vue
<template>
  <zx-scroll
    height="300rpx"
    :auto-scroll-interval="2000"
    :auto-scroll-speed="50"
  >
    <view v-for="item in list" :key="item.id" class="item">
      {{ item.text }}
    </view>
  </zx-scroll>
</template>
```

## 📚 API

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| **基础属性** | | | |
| direction | String | 'y' | 滚动方向：'x'-横向，'y'-纵向 |
| width | String | '100%' | 容器宽度 |
| height | String | '400rpx' | 容器高度 |
| position | Number/String | 0 | 滚动条位置 |
| **滚动控制** | | | |
| upperThreshold | Number/String | 50 | 距顶部/左边多远时触发 scrolltoupper 事件 |
| lowerThreshold | Number/String | 50 | 距底部/右边多远时触发 scrolltolower 事件 |
| scrollIntoView | String | '' | 滚动到某子元素，值为元素id |
| scrollWithAnimation | Boolean | true | 设置滚动条位置时使用动画过渡 |
| enableBackToTop | Boolean | true | iOS点击状态栏滚动到顶部 |
| showScrollbar | Boolean | false | 是否显示滚动条 |
| **下拉刷新** | | | |
| refresherEnabled | Boolean | false | 开启自定义下拉刷新 |
| refresherThreshold | Number | 45 | 下拉刷新阈值 |
| refresherTriggered | Boolean | false | 下拉刷新状态 |
| refresherDefaultStyle | String | 'black' | 下拉刷新默认样式：black/white/none |
| refresherBackground | String | '#ffffff' | 下拉刷新背景颜色 |
| customRefresher | Boolean | false | 是否使用自定义刷新器 |
| **UI增强** | | | |
| showBackTop | Boolean | false | 是否显示返回顶部按钮 |
| backTopThreshold | Number | 200 | 返回顶部按钮显示阈值 |
| backTopStyle | Object | {} | 返回顶部按钮样式 |
| backgroundColor | String | 'transparent' | 背景颜色 |
| borderRadius | String | '0' | 边框圆角 |
| border | String | 'none' | 边框 |
| padding | String | '0' | 内边距 |
| boxShadow | String | 'none' | 阴影 |
| **加载更多** | | | |
| showLoadMore | Boolean | false | 是否显示加载更多 |
| isLoading | Boolean | false | 是否处于加载中状态 |
| noMore | Boolean | false | 是否已加载全部数据 |
| loadingText | String | '加载中...' | 加载中文本 |
| noMoreText | String | '没有更多数据了' | 没有更多数据文本 |
| **空状态** | | | |
| isEmpty | Boolean | false | 是否显示空内容提示 |
| emptyText | String | '暂无数据' | 空内容提示文本 |
| **性能优化** | | | |
| enhanced | Boolean | false | 增强安卓性能 |
| bounce | Boolean | true | iOS是否回弹 |
| pagingEnabled | Boolean | false | 分页滑动效果 |
| fastDeceleration | Boolean | false | 滑动减速速率加快 |
| debounce | Boolean | true | 是否防抖 |
| debounceTime | Number | 100 | 防抖延迟时间（毫秒） |
| throttle | Boolean | false | 是否节流 |
| throttleTime | Number | 16 | 节流时间（毫秒） |
| **虚拟列表** | | | |
| enableVirtualList | Boolean | false | 是否启用虚拟列表 |
| virtualListSource | Array | [] | 虚拟列表数据源 |
| virtualItemHeight | Number | 50 | 虚拟列表项高度 |
| virtualItemWidth | Number | 100 | 虚拟列表项宽度（水平滚动） |
| virtualBuffer | Number | 5 | 虚拟列表缓冲区大小 |
| **自动滚动** | | | |
| autoScrollInterval | Number | 0 | 自动滚动间隔（毫秒），0表示不自动滚动 |
| autoScrollSpeed | Number | 1 | 自动滚动速度 |
| **拖拽** | | | |
| enableDrag | Boolean | false | 启用拖拽滚动 |
| **其他** | | | |
| enableFlex | Boolean | false | 启用flexbox布局 |
| scrollAnchoring | Boolean | false | 开启scroll anchoring特性 |
| customClass | String | '' | 自定义类名 |
| preloadDistance | Number | 100 | 预加载距离 |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| scroll | 滚动时触发 | `{ scrollTop, scrollLeft, scrollHeight, scrollWidth, deltaX, deltaY }` |
| scrolltoupper | 滚动到顶部/左边时触发 | event |
| scrolltolower | 滚动到底部/右边时触发 | event |
| refresherpulling | 下拉刷新控件被下拉 | event |
| refresherrefresh | 下拉刷新被触发 | event |
| refresherrestore | 下拉刷新被复位 | event |
| refresherabort | 下拉刷新被中止 | event |
| loadMore | 触发加载更多 | - |
| inited | 组件初始化完成 | - |
| dragStart | 拖拽开始 | `{ x, y }` |
| dragMove | 拖拽移动 | `{ x, y, deltaX, deltaY }` |
| dragEnd | 拖拽结束 | `{ totalDeltaX, totalDeltaY }` |
| virtualScroll | 虚拟滚动时触发 | `{ visibleRange, scrollPosition }` |

### Slots

| 插槽名 | 说明 | 作用域参数 |
|--------|------|-----------|
| default | 默认内容 | - |
| refresher | 自定义下拉刷新器 | `{ triggered }` |
| loadMore | 自定义加载更多 | `{ loading, noMore }` |
| empty | 自定义空状态 | - |
| backTop | 自定义返回顶部按钮 | `{ scrollTop }` |
| virtual-item | 虚拟列表项（垂直） | `{ item, index, isVisible }` |
| virtual-item-horizontal | 虚拟列表项（水平） | `{ item, index, isVisible }` |

### Methods

| 方法名 | 说明 | 参数 |
|--------|------|------|
| scrollToTop | 滚动到顶部 | - |
| scrollToBottom | 滚动到底部 | - |
| scrollTo | 滚动到指定位置 | `(position, duration)` |
| scrollToPercent | 滚动到指定百分比位置 | `(percent)` |
| scrollToPage | 滚动到指定页 | `(pageIndex)` |
| scrollToIndex | 滚动到虚拟列表指定索引 | `(index)` |
| scrollToPosition | 滚动到指定位置（支持百分比） | `(position)` |
| scrollIntoViewById | 滚动到指定元素 | `(elementId)` |
| refreshSize | 刷新滚动区域大小 | - |
| startAutoScroll | 开始自动滚动 | - |
| stopAutoScroll | 停止自动滚动 | - |
| stopAnimation | 立即停止滚动动画 | - |
| getScrollPosition | 获取当前滚动位置 | - |
| getTotalPages | 获取总页数 | 返回 Promise |
| getScrollableHeight | 获取可滚动高度 | 返回 Promise |
| getViewportHeight | 获取可视区域高度 | 返回 Promise |

## 🎨 主题定制

组件支持通过 CSS 变量进行主题定制：

```css
.zx-scroll-outer {
  --zx-scroll-loading-color: #3498db;
  --zx-scroll-text-color: #666;
  --zx-scroll-background-color: #fff;
  --zx-scroll-border-radius: 8rpx;
}
```

## 🔧 高级用法

### 自定义下拉刷新

```vue
<template>
  <zx-scroll
    :refresher-enabled="true"
    :custom-refresher="true"
    :refresher-triggered="refreshTriggered"
    @refresherrefresh="onRefresh"
  >
    <template #refresher="{ triggered }">
      <view class="custom-refresher">
        <view v-if="triggered" class="refreshing">刷新中...</view>
        <view v-else class="pull-down">下拉刷新</view>
      </view>
    </template>
    
    <!-- 内容 -->
  </zx-scroll>
</template>
```

### 自定义加载更多

```vue
<template>
  <zx-scroll :show-load-more="true" @loadMore="onLoadMore">
    <!-- 内容 -->
    
    <template #loadMore="{ loading, noMore }">
      <view class="custom-load-more">
        <view v-if="loading" class="loading">
          <text>加载中...</text>
        </view>
        <view v-else-if="noMore" class="no-more">
          <text>没有更多了</text>
        </view>
      </view>
    </template>
  </zx-scroll>
</template>
```

### 性能优化

```vue
<template>
  <!-- 大量数据时使用虚拟列表 -->
  <zx-scroll
    v-if="list.length > 100"
    :enable-virtual-list="true"
    :virtual-list-source="list"
    :virtual-item-height="80"
  >
    <template #virtual-item="{ item, index }">
      <ListItem :data="item" :index="index" />
    </template>
  </zx-scroll>
  
  <!-- 频繁滚动时使用节流 -->
  <zx-scroll
    v-else
    :throttle="true"
    :throttle-time="16"
    @scroll="onScroll"
  >
    <!-- 内容 -->
  </zx-scroll>
</template>
```

## ⚠️ 注意事项

1. **虚拟列表**: 启用虚拟列表时，必须设置固定的 `virtualItemHeight` 或 `virtualItemWidth`
2. **性能**: 对于大量数据推荐使用虚拟列表，对于频繁滚动推荐启用节流
3. **平台差异**: 某些功能在不同平台上可能有差异，请参考 [uni-app scroll-view 文档](https://uniapp.dcloud.net.cn/component/scroll-view.html)
4. **内存管理**: 虚拟列表会自动回收不可见的 DOM 节点，有效控制内存使用

## 🆕 更新日志

### v2.1.1
- 🔄 转换为纯 JavaScript 版本
- ❌ 移除 TypeScript 类型定义
- 📝 更新文档和示例

### v2.1.0
- ✨ 新增虚拟列表支持
- ✨ 新增节流和防抖模式
- ✨ 新增自动滚动功能
- ✨ 新增拖拽滚动支持
- 🎨 改进样式和动画效果
- 🐛 修复若干已知问题
- 📝 完善文档和示例

### v2.0.0
- 🎉 重构为 Vue3 Composition API
- ✨ 新增 JavaScript 支持
- ✨ 新增更多自定义选项
- 🎨 优化 UI 和交互体验

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 联系

如有问题或建议，请通过以下方式联系：

- Issue: [项目 Issues](https://github.com/your-repo/issues)
- Email: your-email@example.com
