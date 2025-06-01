# zx-goods-card2 商品卡片组件

## 介绍

`zx-goods-card2` 是一个功能丰富的商品卡片组件，常用于商品列表、搜索结果、推荐商品等场景。支持垂直和水平两种布局方式，提供丰富的自定义选项和插槽支持。

## 特性

- 🎨 支持垂直和水平两种布局
- 📏 提供小、中、大三种尺寸
- 🏷️ 支持多种标签样式（图片标签、标题标签、商品标签）
- 🎯 丰富的自定义颜色配置
- 🔧 灵活的插槽系统
- 📱 完美适配 H5、小程序、APP
- ♿ 支持禁用状态
- 🖼️ 支持图片懒加载和错误处理

## 安装使用

在页面中引入组件：

```vue
<template>
  <zx-goods-card2
    image="https://example.com/image.jpg"
    title="商品标题"
    price="99.99"
    @click="handleClick"
  />
</template>

<script setup>
const handleClick = () => {
  console.log('商品卡片被点击')
}
</script>
```

## 代码演示

### 基础用法

```vue
<zx-goods-card2
  image="https://img.yzcdn.cn/vant/cat.jpeg"
  title="商品标题"
  description="这是商品的详细描述信息"
  price="99.99"
  origin-price="199.99"
  shop-name="官方旗舰店"
  @click="handleCardClick"
  @shop-click="handleShopClick"
/>
```

### 水平布局

```vue
<zx-goods-card2
  layout="horizontal"
  image="https://img.yzcdn.cn/vant/cat.jpeg"
  title="水平布局商品标题"
  description="这是水平布局的商品描述"
  price="158.00"
  origin-price="298.00"
  shop-name="品牌官方店"
/>
```

### 不同尺寸

```vue
<!-- 小尺寸 -->
<zx-goods-card2
  size="small"
  image="https://img.yzcdn.cn/vant/cat.jpeg"
  title="小尺寸商品"
  price="59.99"
/>

<!-- 正常尺寸 -->
<zx-goods-card2
  size="normal"
  image="https://img.yzcdn.cn/vant/cat.jpeg"
  title="正常尺寸商品"
  price="99.99"
/>

<!-- 大尺寸 -->
<zx-goods-card2
  size="large"
  image="https://img.yzcdn.cn/vant/cat.jpeg"
  title="大尺寸商品标题"
  description="大尺寸商品的详细描述"
  price="199.99"
  origin-price="399.99"
  shop-name="旗舰店"
/>
```

### 商品标签

```vue
<zx-goods-card2
  image="https://img.yzcdn.cn/vant/cat.jpeg"
  title="带标签的商品"
  price="88.88"
  :tags="['热销', '包邮', '新品']"
  image-tag="限时"
  title-tag="推荐"
/>

<!-- 自定义标签样式 -->
<zx-goods-card2
  image="https://img.yzcdn.cn/vant/cat.jpeg"
  title="自定义标签样式"
  price="128.00"
  :tags="[
    { text: 'VIP', color: '#fff', bgColor: '#ff6900' },
    { text: '包邮', color: '#fff', bgColor: '#4cd964' }
  ]"
  image-tag="HOT"
  image-tag-position="top-right"
  image-tag-bg-color="#ff4757"
/>
```

### 自定义颜色

```vue
<zx-goods-card2
  image="https://img.yzcdn.cn/vant/cat.jpeg"
  title="蓝色主题商品"
  description="自定义蓝色主题"
  price="168.00"
  price-color="#007aff"
  title-color="#007aff"
  tag-bg-color="#007aff"
  :tags="['蓝色主题']"
/>
```

### 标题行数控制

```vue
<!-- 单行标题 -->
<zx-goods-card2
  image="https://img.yzcdn.cn/vant/cat.jpeg"
  title="单行标题显示，超出部分会被省略号代替"
  :title-lines="1"
  price="99.99"
/>

<!-- 多行标题 -->
<zx-goods-card2
  image="https://img.yzcdn.cn/vant/cat.jpeg"
  title="多行标题显示，可以显示更多的商品标题信息内容"
  :title-lines="3"
  price="99.99"
/>
```

### 禁用状态

```vue
<zx-goods-card2
  disabled
  image="https://img.yzcdn.cn/vant/cat.jpeg"
  title="禁用状态商品"
  description="此商品已禁用"
  price="99.99"
  origin-price="199.99"
/>
```

### 自定义插槽

```vue
<zx-goods-card2
  image="https://img.yzcdn.cn/vant/cat.jpeg"
  title="自定义插槽商品"
  price="299.99"
>
  <template #priceAfter>
    <view class="custom-badge">限时特价</view>
  </template>
  <template #bottom>
    <view class="custom-actions">
      <button size="mini" type="primary" @tap.stop="handleAddCart">加购物车</button>
      <button size="mini" type="warn" @tap.stop="handleBuyNow">立即购买</button>
    </view>
  </template>
</zx-goods-card2>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| image | 商品图片地址 | String | '' |
| imageMode | 图片裁剪模式 | String | 'aspectFill' |
| lazyLoad | 是否开启图片懒加载 | Boolean | true |
| title | 商品标题 | String | '' |
| titleLines | 标题显示行数 | String/Number | 2 |
| description | 商品描述 | String | '' |
| tags | 商品标签列表 | Array | [] |
| price | 商品价格 | String/Number | '' |
| originPrice | 商品原价 | String/Number | '' |
| currency | 货币符号 | String | '¥' |
| showPrice | 是否显示价格 | Boolean | true |
| shopName | 店铺名称 | String | '' |
| shopIcon | 店铺图标 | String | '' |
| imageTag | 图片标签文字 | String | '' |
| imageTagPosition | 图片标签位置 | String | 'top-left' |
| titleTag | 标题标签文字 | String | '' |
| layout | 布局方式 | String | 'vertical' |
| size | 组件尺寸 | String | 'normal' |
| disabled | 是否禁用 | Boolean | false |
| customClass | 自定义样式类 | String | '' |
| customStyle | 自定义样式对象 | Object | {} |

### 颜色自定义 Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| titleColor | 标题颜色 | String | '#333' |
| descriptionColor | 描述颜色 | String | '#666' |
| priceColor | 价格颜色 | String | '#ff6900' |
| originPriceColor | 原价颜色 | String | '#999' |
| shopNameColor | 店铺名称颜色 | String | '#999' |
| tagColor | 标签文字颜色 | String | '#fff' |
| tagBgColor | 标签背景颜色 | String | '#ff6900' |
| imageTagColor | 图片标签文字颜色 | String | '#fff' |
| imageTagBgColor | 图片标签背景颜色 | String | '#ff6900' |
| titleTagColor | 标题标签文字颜色 | String | '#fff' |
| titleTagBgColor | 标题标签背景颜色 | String | '#ff6900' |

### 可选值说明

#### layout 布局方式
- `vertical`: 垂直布局（默认）
- `horizontal`: 水平布局

#### size 组件尺寸
- `small`: 小尺寸
- `normal`: 正常尺寸（默认）
- `large`: 大尺寸

#### imageTagPosition 图片标签位置
- `top-left`: 左上角（默认）
- `top-right`: 右上角
- `bottom-left`: 左下角
- `bottom-right`: 右下角

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击商品卡片时触发 | - |
| shopClick | 点击店铺信息时触发 | - |
| imageError | 图片加载失败时触发 | event |
| imageLoad | 图片加载成功时触发 | event |

### Slots

| 名称 | 说明 |
|------|------|
| image | 自定义商品图片 |
| imageTag | 自定义图片标签 |
| title | 自定义商品标题 |
| titleTag | 自定义标题标签 |
| description | 自定义商品描述 |
| tags | 自定义商品标签列表 |
| price | 自定义价格显示 |
| originPrice | 自定义原价显示 |
| priceAfter | 价格后自定义内容 |
| shop | 自定义店铺信息 |
| bottom | 自定义底部内容 |

## 样式变量

组件提供了以下 CSS 变量，可用于自定义主题：

```scss
:root {
  // 基础样式
  --zx-goods-card2-bg-color: #fff;
  --zx-goods-card2-border-radius: 12rpx;
  --zx-goods-card2-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
  
  // 内容区域
  --zx-goods-card2-padding: 20rpx;
  --zx-goods-card2-gap: 12rpx;
  
  // 文字样式
  --zx-goods-card2-title-font-size: 30rpx;
  --zx-goods-card2-title-font-weight: 500;
  --zx-goods-card2-title-line-height: 1.4;
  
  --zx-goods-card2-desc-font-size: 24rpx;
  --zx-goods-card2-desc-line-height: 1.4;
  
  // 价格样式
  --zx-goods-card2-price-symbol-font-size: 24rpx;
  --zx-goods-card2-price-integer-font-size: 38rpx;
  --zx-goods-card2-price-decimal-font-size: 24rpx;
  --zx-goods-card2-origin-price-font-size: 22rpx;
  
  // 标签样式
  --zx-goods-card2-tag-padding: 4rpx 8rpx;
  --zx-goods-card2-tag-border-radius: 4rpx;
  --zx-goods-card2-tag-font-size: 20rpx;
}
```

## 注意事项

1. **图片比例**: 垂直布局下图片默认为 1:1 比例，水平布局下为固定尺寸
2. **标签数组**: tags 属性支持字符串数组或对象数组，对象格式为 `{ text, color, bgColor }`
3. **事件冒泡**: 店铺点击事件会阻止冒泡，不会触发卡片点击事件
4. **插槽优先级**: 使用插槽时会覆盖对应的 props 配置
5. **禁用状态**: 禁用状态下所有点击事件都不会触发
6. **图片懒加载**: 建议在长列表中开启图片懒加载以提升性能

## 兼容性

- ✅ H5
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 百度小程序
- ✅ 头条小程序
- ✅ QQ 小程序
- ✅ App (Vue)
- ✅ App (Nvue)

## 更新日志

### v1.0.0
- 🎉 初始版本发布
- ✨ 支持垂直和水平布局
- ✨ 支持多种尺寸和标签样式
- ✨ 提供丰富的自定义选项
- ✨ 完善的插槽系统