# zx-swiper 轮播组件

一个功能丰富、高度可定制的 uni-app 轮播组件，支持图片、视频、自定义内容等多种形式的轮播展示。

## ✨ 特性

- 🖼️ **多媒体支持**：支持图片、视频、自定义内容轮播
- 🎛️ **丰富配置**：支持所有 uni-app swiper 组件的原生属性
- 📱 **响应式设计**：支持横向、纵向滑动，自适应高度
- 🎨 **自定义样式**：可自定义指示器、遮罩层、圆角等样式
- ⚡ **性能优化**：懒加载、视频自动暂停等性能优化
- 🎯 **事件完整**：完整的事件回调支持
- 🔧 **方法暴露**：提供编程式控制方法

## 📦 安装使用

1. 将 `zx-swiper` 文件夹复制到项目的 `components` 目录下
2. 在页面中引入并使用：

```vue
<template>
  <zx-swiper :list="imageList" :height="'400rpx'" />
</template>

<script setup>
import { ref } from 'vue'

const imageList = ref([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
])
</script>
```

## 📋 Props 属性

### 基础属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| list | Array | [] | 轮播数据列表 |
| height | String/Number | '320rpx' | 组件高度 |
| width | String/Number | '750rpx' | 组件宽度 |
| loading | Boolean | false | 是否显示加载状态 |
| bgColor | String | '#f3f4f6' | 背景颜色 |
| radius | String/Number | '10rpx' | 圆角大小 |

### 轮播控制

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| autoplay | Boolean | true | 是否自动播放 |
| interval | String/Number | 3000 | 自动切换间隔时间(ms) |
| duration | String/Number | 500 | 滑动动画时长(ms) |
| circular | Boolean | true | 是否启用循环播放 |
| current | String/Number | 0 | 当前显示的索引 |
| currentItemId | String | '' | 当前显示的item-id |

### 滑动控制

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| vertical | Boolean | false | 是否纵向滑动 |
| disableTouch | Boolean | false | 是否禁用触摸滑动 |
| touchable | Boolean | true | 是否响应用户触摸事件 |
| previousMargin | String/Number | '0rpx' | 前边距 |
| nextMargin | String/Number | '0rpx' | 后边距 |

### 显示控制

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| displayMultipleItems | Number | 1 | 同时显示的滑块数量 |
| acceleration | Boolean | false | 是否开启连续滑动 |
| easingFunction | String | 'default' | 切换缓动动画类型 |

### 指示器

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| indicator | Boolean | true | 是否显示指示器 |
| indicatorMode | String | 'dot' | 指示器模式: 'dot', 'line' |
| indicatorActiveColor | String | '#FFFFFF' | 激活指示器颜色 |
| indicatorInactiveColor | String | 'rgba(255,255,255,0.35)' | 非激活指示器颜色 |
| indicatorStyle | String/Object | '' | 指示器自定义样式 |

### 内容显示

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| keyName | String | 'url' | 对象数组中的图片字段名 |
| imgMode | String | 'aspectFill' | 图片裁剪模式 |
| showTitle | Boolean | false | 是否显示标题 |
| showMask | Boolean | false | 是否显示遮罩 |
| maskStyle | String/Object | '' | 遮罩样式 |
| autoHeight | Boolean | false | 是否自适应高度 |
| lazyLoad | Boolean | true | 是否开启懒加载 |

### 视频控制

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| videoControls | Boolean | true | 是否显示视频控制栏 |
| videoAutoplay | Boolean | false | 视频是否自动播放 |
| videoLoop | Boolean | false | 视频是否循环播放 |
| videoMuted | Boolean | false | 视频是否静音 |

## 🎯 Events 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| change | { current, source, currentItem } | 轮播切换时触发 |
| click | { index, item } | 点击轮播项时触发 |
| transition | event.detail | 轮播过渡时触发 |
| animationfinish | event.detail | 动画结束时触发 |
| imageLoad | event | 图片加载成功时触发 |
| imageError | event | 图片加载失败时触发 |
| videoPlay | event | 视频开始播放时触发 |
| videoPause | event | 视频暂停时触发 |
| videoEnded | event | 视频播放结束时触发 |
| videoError | event | 视频播放错误时触发 |

## 🔧 Methods 方法

通过 `ref` 可以调用以下方法：

```vue
<template>
  <zx-swiper ref="swiperRef" :list="list" />
  <button @click="next">下一张</button>
</template>

<script setup>
import { ref } from 'vue'

const swiperRef = ref()

// 切换到下一张
const next = () => {
  swiperRef.value.next()
}
</script>
```

| 方法名 | 参数 | 说明 |
|--------|------|------|
| switchTo(index) | index: Number | 切换到指定索引 |
| next() | - | 切换到下一张 |
| prev() | - | 切换到上一张 |
| getCurrentItem() | - | 获取当前轮播项数据 |
| pauseAllVideos() | - | 暂停所有视频播放 |

## 🎨 Slots 插槽

### indicator 插槽

自定义指示器：

```vue
<zx-swiper :list="list">
  <template #indicator="{ current, total }">
    <view class="custom-indicator">
      {{ current + 1 }} / {{ total }}
    </view>
  </template>
</zx-swiper>
```

### item 插槽

自定义轮播项内容：

```vue
<zx-swiper :list="customList">
  <template #item="{ item, index }">
    <view class="custom-item">
      <text>{{ item.text }}</text>
    </view>
  </template>
</zx-swiper>
```

### overlay 插槽

自定义覆盖层：

```vue
<zx-swiper :list="list">
  <template #overlay="{ current, total }">
    <view class="overlay">
      自定义覆盖内容
    </view>
  </template>
</zx-swiper>
```

## 📱 使用示例

### 基础图片轮播

```vue
<template>
  <zx-swiper 
    :list="imageList"
    :height="'400rpx'"
    :autoplay="true"
    :interval="3000"
  />
</template>

<script setup>
const imageList = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
]
</script>
```

### 带标题的轮播

```vue
<template>
  <zx-swiper 
    :list="titleList"
    :show-title="true"
    :height="'400rpx'"
  />
</template>

<script setup>
const titleList = [
  {
    url: 'https://example.com/image1.jpg',
    title: '图片标题1'
  },
  {
    url: 'https://example.com/image2.jpg',
    title: '图片标题2'
  }
]
</script>
```

### 视频轮播

```vue
<template>
  <zx-swiper 
    :list="videoList"
    :height="'300rpx'"
    :video-controls="true"
    @video-play="onVideoPlay"
  />
</template>

<script setup>
const videoList = [
  {
    type: 'video',
    url: 'https://example.com/video1.mp4',
    poster: 'https://example.com/poster1.jpg'
  }
]

const onVideoPlay = (e) => {
  console.log('视频开始播放', e)
}
</script>
```

### 纵向轮播

```vue
<template>
  <zx-swiper 
    :list="imageList"
    :vertical="true"
    :height="'600rpx'"
  />
</template>
```

### 自定义内容轮播

```vue
<template>
  <zx-swiper :list="customList">
    <template #item="{ item, index }">
      <view class="custom-item" :style="{ backgroundColor: item.color }">
        <text>{{ item.text }}</text>
      </view>
    </template>
  </zx-swiper>
</template>

<script setup>
const customList = [
  { text: '自定义内容1', color: '#ff6b6b' },
  { text: '自定义内容2', color: '#4ecdc4' }
]
</script>
```

## 🔍 数据格式说明

### 字符串数组
```javascript
['image1.jpg', 'image2.jpg', 'video.mp4']
```

### 对象数组
```javascript
[
  {
    url: 'image1.jpg',        // 图片/视频地址
    title: '标题',            // 可选：标题
    poster: 'poster.jpg',     // 可选：视频封面
    type: 'image|video|custom', // 可选：类型
    id: 'unique_id'           // 可选：唯一标识
  }
]
```

## 🚀 高级用法

### 1. 自适应高度
开启 `autoHeight` 后，组件会根据图片的实际高度自动调整：

```vue
<zx-swiper :list="imageList" :auto-height="true" />
```

### 2. 多项显示
同时显示多个轮播项：

```vue
<zx-swiper 
  :list="imageList"
  :display-multiple-items="2"
  :previous-margin="'20rpx'"
  :next-margin="'20rpx'"
/>
```

### 3. 编程式控制
通过 ref 调用方法进行控制：

```vue
<template>
  <zx-swiper ref="swiperRef" :list="imageList" />
  <view class="controls">
    <button @click="prev">上一张</button>
    <button @click="next">下一张</button>
    <button @click="goToFirst">第一张</button>
  </view>
</template>

<script setup>
const swiperRef = ref()

const prev = () => swiperRef.value.prev()
const next = () => swiperRef.value.next()
const goToFirst = () => swiperRef.value.switchTo(0)
</script>
```

## 🐛 注意事项

1. **视频播放**：在小程序中，视频组件层级较高，可能会遮挡其他内容
2. **自适应高度**：开启后会异步获取图片信息，可能导致初始化时高度闪动
3. **性能优化**：大量图片时建议开启 `lazyLoad` 懒加载
4. **平台差异**：部分属性在不同平台可能有差异，详见 [uni-app 官方文档](https://uniapp.dcloud.net.cn/component/swiper.html)

## 🔄 更新日志

### v2.0.0
- ✨ 新增视频轮播支持
- ✨ 新增自定义内容插槽
- ✨ 新增更多事件回调
- ✨ 新增编程式控制方法
- 🐛 修复 nextMargin 默认值错误
- 🐛 修复多项显示时的样式问题
- ⚡ 优化性能和代码结构

### v1.0.0
- 🎉 初始版本发布
- ✨ 基础轮播功能
- ✨ 指示器支持
- ✨ 自适应高度

## 📄 许可证

MIT License
