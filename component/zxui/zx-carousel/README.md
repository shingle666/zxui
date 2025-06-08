# zx-carousel 走马灯

在有限空间内，循环播放同一类型的图片、文字等内容。

## 基本用法

```vue
<template>
  <zx-carousel height="300rpx" :list="carouselList">
  </zx-carousel>
</template>

<script>
export default {
  data() {
    return {
      carouselList: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg',
        'https://example.com/image4.jpg'
      ]
    }
  }
}
</script>
```

## 指示器

可以将指示器的显示位置设置在容器外部

```vue
<template>
  <zx-carousel 
    :list="carouselList" 
    indicator-position="outside"
    height="300rpx"
  >
  </zx-carousel>
</template>
```

## 切换箭头

可以设置切换箭头的显示时机

```vue
<template>
  <zx-carousel 
    :list="carouselList" 
    arrow="always"
    :interval="5000"
    height="300rpx"
  >
  </zx-carousel>
</template>
```

## 卡片模式

当页面宽度方向空间空余，但高度方向空间匮乏时，可使用卡片风格

```vue
<template>
  <zx-carousel 
    :list="carouselList" 
    type="card"
    height="200rpx"
    :interval="4000"
  >
  </zx-carousel>
</template>
```

## 垂直排列

通过设置 `direction` 为 `vertical` 来让走马灯在垂直方向上显示

```vue
<template>
  <zx-carousel 
    :list="carouselList" 
    direction="vertical"
    height="400rpx"
    :autoplay="false"
  >
  </zx-carousel>
</template>
```

## 动态模糊

添加动态模糊以给走马灯注入活力和流畅性

```vue
<template>
  <zx-carousel 
    :list="carouselList" 
    :motion-blur="true"
    height="200rpx"
  >
  </zx-carousel>
</template>
```

## 自定义内容

使用 `zx-carousel-item` 组件来自定义轮播内容

```vue
<template>
  <zx-carousel height="300rpx">
    <zx-carousel-item v-for="(item, index) in customList" :key="index">
      <view class="custom-item">
        <text>{{ item.title }}</text>
        <text>{{ item.desc }}</text>
      </view>
    </zx-carousel-item>
  </zx-carousel>
</template>

<script>
export default {
  data() {
    return {
      customList: [
        { title: '标题1', desc: '描述1' },
        { title: '标题2', desc: '描述2' },
        { title: '标题3', desc: '描述3' }
      ]
    }
  }
}
</script>

<style>
.custom-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
  color: white;
}
</style>
```

## API

### Carousel Attributes

| 参数名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| list | 轮播数据列表 | Array | [] |
| height | carousel 的高度 | String/Number | '300rpx' |
| initial-index | 初始状态激活的幻灯片的索引，从 0 开始 | Number | 0 |
| trigger | 指示器的触发方式：hover/click | String | 'hover' |
| autoplay | 是否自动切换 | Boolean | true |
| interval | 自动切换的时间间隔，单位为毫秒 | Number | 3000 |
| indicator-position | 指示器的位置：''/outside/none | String | '' |
| arrow | 切换箭头的显示时机：hover/always/never | String | 'hover' |
| type | carousel 的类型：''/card | String | '' |
| card-scale | 当 type 为 card 时，二级卡的缩放大小 | Number | 0.83 |
| loop | 是否循环显示 | Boolean | true |
| direction | 展示的方向：horizontal/vertical | String | 'horizontal' |
| pause-on-hover | 鼠标悬浮时暂停自动切换 | Boolean | true |
| motion-blur | 添加动态模糊效果 | Boolean | false |
| image-mode | 图片的裁剪模式 | String | 'aspectFill' |
| lazy-load | 是否开启懒加载 | Boolean | true |
| current-item-id | 当前所在滑块的 item-id | String | '' |
| duration | 滑块切换过程所需时间 | Number | 500 |
| previous-margin | 前边距，可用于露出前一项的一小部分 | String/Number | '0rpx' |
| next-margin | 后边距，可用于露出后一项的一小部分 | String/Number | '0rpx' |
| display-multiple-items | 同时显示的滑块数量 | Number | 1 |
| disable-touch | 是否禁止用户 touch 操作 | Boolean | false |
| touchable | 是否监听用户的触摸事件 | Boolean | true |
| easing-function | 指定swiper切换缓动动画类型 | String | 'default' |
| circular | 是否循环播放 | Boolean | true |
| background-color | 背景色 | String | 'transparent' |
| border-radius | 圆角 | String/Number | '0rpx' |
| custom-style | 自定义样式 | String/Object | '' |
| indicator-style | 指示器样式 | String/Object | '' |
| arrow-style | 箭头样式 | String/Object | '' |

### Carousel Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 当前展示的幻灯片切换时触发 | (current, old, source, item) |
| click | 点击轮播项时触发 | (index, item) |
| transition | 过渡动画事件 | event |
| animationfinish | 动画结束事件 | event |
| imageLoad | 图片加载成功 | event |
| imageError | 图片加载失败 | event |

### Carousel Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| default | 自定义默认内容 | - |
| item | 自定义轮播项内容 | { item, index } |
| indicator | 自定义指示器 | { current, total } |
| arrow-left | 自定义左箭头 | - |
| arrow-right | 自定义右箭头 | - |

### Carousel Exposes

| 方法名 | 说明 | 参数 |
|--------|------|------|
| activeIndex | 当前幻灯片的索引 | - |
| setActiveItem | 手动切换幻灯片 | index |
| prev | 切换至上一张幻灯片 | - |
| next | 切换至下一张幻灯片 | - |

## CarouselItem API

### CarouselItem Attributes

| 参数名 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| name | 幻灯片的名字，可用作 setActiveItem 的参数 | String | '' |
| label | 该幻灯片所对应指示器的文本 | String/Number | '' |
| src | 图片链接 | String | '' |
| type | 内容类型：image/text/custom | String | 'custom' |
| image-mode | 图片的裁剪模式 | String | 'aspectFill' |
| lazy-load | 是否开启懒加载 | Boolean | true |
| custom-style | 自定义样式 | String/Object | '' |

### CarouselItem Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击事件 | ({ name, label, src }) |
| imageLoad | 图片加载成功 | event |
| imageError | 图片加载失败 | event |

### CarouselItem Slots

| 插槽名 | 说明 |
|--------|------|
| default | 自定义默认内容 |

## 数据格式

### 基础数组格式

```javascript
// 字符串数组（图片链接）
const list = [
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
]

// 对象数组
const list = [
  {
    id: 1,
    src: 'https://example.com/image1.jpg',
    title: '图片1',
    label: '标签1'
  },
  {
    id: 2,
    src: 'https://example.com/image2.jpg', 
    title: '图片2',
    label: '标签2'
  }
]

// 混合内容
const list = [
  {
    type: 'image',
    src: 'https://example.com/image1.jpg',
    title: '图片'
  },
  {
    type: 'text',
    title: '文本内容',
    content: '这是一段文本'
  },
  {
    type: 'custom',
    data: { /* 自定义数据 */ }
  }
]
```

## 注意事项

1. 在 uni-app 中，某些平台可能不支持所有的 swiper 属性，如 nvue 和部分小程序平台。
2. 动态模糊效果在某些低端设备上可能影响性能。
3. 卡片模式在垂直方向上显示时，建议调整 `card-scale` 参数以获得更好的视觉效果。
4. 指示器的 hover 事件在移动端会转换为 touch 事件。
5. 箭头在移动端默认隐藏，只在桌面端 hover 时显示（除非设置为 `always`）。

## 更新日志

### v1.0.0

- 初始版本发布
- 支持基础轮播功能
- 支持指示器、箭头、卡片模式、垂直排列
- 支持动态模糊效果
- 支持自定义内容和样式
- 完全兼容 Element Plus Carousel 组件 API
