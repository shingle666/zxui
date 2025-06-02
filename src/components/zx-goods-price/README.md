# GoodsPrice 商品价格

### 介绍

商品价格组件，用于展示商品价格，支持多种样式和格式化选项，适用于电商场景中的价格展示。

### 安装使用

```js
import zxGoodsPrice from '@/components/zx-goods-price/zx-goods-price.vue'
```

### 基础用法

最简单的用法，传入价格即可。

```vue
<template>
  <zx-goods-price price="99.99" />
</template>
```

### 不同尺寸

通过 `size` 属性设置价格组件的尺寸。

```vue
<template>
  <view>
    <zx-goods-price price="99.99" size="small" />
    <zx-goods-price price="99.99" size="normal" />
    <zx-goods-price price="99.99" size="large" />
  </view>
</template>
```

### 自定义颜色

通过 `color` 属性设置价格颜色。

```vue
<template>
  <view>
    <zx-goods-price price="99.99" color="#ff6900" />
    <zx-goods-price price="99.99" color="#07c160" />
    <zx-goods-price price="99.99" color="#1989fa" />
  </view>
</template>
```

### 货币符号

通过 `currency` 属性设置货币符号。

```vue
<template>
  <view>
    <zx-goods-price price="99.99" currency="¥" />
    <zx-goods-price price="99.99" currency="$" />
    <zx-goods-price price="99.99" currency="€" />
  </view>
</template>
```

### 前缀和后缀

通过 `prefix` 和 `suffix` 属性设置价格前缀和后缀。

```vue
<template>
  <view>
    <zx-goods-price price="99.99" prefix="现价" />
    <zx-goods-price price="99.99" suffix="起" />
    <zx-goods-price price="99.99" prefix="仅需" suffix="包邮" />
  </view>
</template>
```

### 小数位控制

通过 `decimal-length` 属性控制小数位数，通过 `show-decimal` 控制是否显示小数部分。

```vue
<template>
  <view>
    <zx-goods-price price="99" decimal-length="0" />
    <zx-goods-price price="99.9" decimal-length="1" />
    <zx-goods-price price="99.999" decimal-length="3" />
    <zx-goods-price price="99.99" :show-decimal="false" />
  </view>
</template>
```

### 删除线样式

通过 `line-through` 属性显示删除线，常用于原价展示。

```vue
<template>
  <view>
    <zx-goods-price price="199.99" line-through color="#999" />
    <zx-goods-price price="99.99" color="#ee0a24" />
  </view>
</template>
```

### 自定义字体大小

可以分别设置各部分的字体大小。

```vue
<template>
  <zx-goods-price 
    price="99.99" 
    :symbol-size="20"
    :integer-size="36"
    :decimal-size="24"
  />
</template>
```

### 插槽用法

支持通过插槽自定义前缀和后缀内容。

```vue
<template>
  <zx-goods-price price="99.99">
    <template #prefix>
      <text style="color: #999; font-size: 24rpx;">限时特价</text>
    </template>
    <template #suffix>
      <text style="color: #ff6900; font-size: 20rpx;">包邮</text>
    </template>
  </zx-goods-price>
</template>
```

### 完整示例

```vue
<template>
  <view class="demo-container">
    <!-- 基础用法 -->
    <view class="demo-section">
      <text class="demo-title">基础用法</text>
      <zx-goods-price price="99.99" />
    </view>
    
    <!-- 不同尺寸 -->
    <view class="demo-section">
      <text class="demo-title">不同尺寸</text>
      <view class="demo-row">
        <zx-goods-price price="99.99" size="small" />
        <zx-goods-price price="99.99" size="normal" />
        <zx-goods-price price="99.99" size="large" />
      </view>
    </view>
    
    <!-- 自定义颜色 -->
    <view class="demo-section">
      <text class="demo-title">自定义颜色</text>
      <view class="demo-row">
        <zx-goods-price price="99.99" color="#ff6900" />
        <zx-goods-price price="99.99" color="#07c160" />
        <zx-goods-price price="99.99" color="#1989fa" />
      </view>
    </view>
    
    <!-- 货币符号 -->
    <view class="demo-section">
      <text class="demo-title">货币符号</text>
      <view class="demo-row">
        <zx-goods-price price="99.99" currency="¥" />
        <zx-goods-price price="99.99" currency="$" />
        <zx-goods-price price="99.99" currency="€" />
      </view>
    </view>
    
    <!-- 前缀后缀 -->
    <view class="demo-section">
      <text class="demo-title">前缀后缀</text>
      <view class="demo-column">
        <zx-goods-price price="99.99" prefix="现价" />
        <zx-goods-price price="99.99" suffix="起" />
        <zx-goods-price price="99.99" prefix="仅需" suffix="包邮" />
      </view>
    </view>
    
    <!-- 小数位控制 -->
    <view class="demo-section">
      <text class="demo-title">小数位控制</text>
      <view class="demo-column">
        <zx-goods-price price="99" decimal-length="0" />
        <zx-goods-price price="99.9" decimal-length="1" />
        <zx-goods-price price="99.999" decimal-length="3" />
        <zx-goods-price price="99.99" :show-decimal="false" />
      </view>
    </view>
    
    <!-- 删除线样式 -->
    <view class="demo-section">
      <text class="demo-title">删除线样式</text>
      <view class="demo-column">
        <zx-goods-price price="199.99" line-through color="#999" />
        <zx-goods-price price="99.99" color="#ee0a24" />
      </view>
    </view>
    
    <!-- 插槽用法 -->
    <view class="demo-section">
      <text class="demo-title">插槽用法</text>
      <zx-goods-price price="99.99">
        <template #prefix>
          <text style="color: #999; font-size: 24rpx;">限时特价</text>
        </template>
        <template #suffix>
          <text style="color: #ff6900; font-size: 20rpx;">包邮</text>
        </template>
      </zx-goods-price>
    </view>
  </view>
</template>

<style>
.demo-container {
  padding: 20rpx;
}

.demo-section {
  margin-bottom: 40rpx;
}

.demo-title {
  display: block;
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  color: #333;
}

.demo-row {
  display: flex;
  gap: 20rpx;
  align-items: center;
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}
</style>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| price | 价格，支持字符串和数字 | _string \| number_ | `0` |
| currency | 货币符号 | _string_ | `¥` |
| prefix | 价格前缀文字 | _string_ | - |
| suffix | 价格后缀文字 | _string_ | - |
| decimal-length | 小数位数 | _number_ | `2` |
| show-decimal | 是否显示小数部分 | _boolean_ | `true` |
| size | 尺寸大小，可选值：`small` `normal` `large` | _string_ | `normal` |
| color | 价格颜色 | _string_ | `#ee0a24` |
| prefix-color | 前缀颜色 | _string_ | 继承 color |
| suffix-color | 后缀颜色 | _string_ | 继承 color |
| symbol-size | 货币符号字体大小 | _number_ | 根据 size 自动计算 |
| integer-size | 整数部分字体大小 | _number_ | 根据 size 自动计算 |
| decimal-size | 小数部分字体大小 | _number_ | 根据 size 自动计算 |
| prefix-size | 前缀字体大小 | _number_ | 根据 size 自动计算 |
| suffix-size | 后缀字体大小 | _number_ | 根据 size 自动计算 |
| font-weight | 字体粗细 | _string \| number_ | `normal` |
| line-through | 是否显示删除线 | _boolean_ | `false` |
| custom-style | 自定义样式 | _string_ | - |

### Slots

| 名称 | 说明 |
|------|------|
| prefix | 自定义价格前缀内容 |
| suffix | 自定义价格后缀内容 |

### 尺寸说明

不同尺寸对应的字体大小（单位：rpx）：

| 尺寸 | 货币符号 | 整数部分 | 小数部分 | 前缀/后缀 |
|------|----------|----------|----------|------------|
| small | 20 | 24 | 20 | 20 |
| normal | 24 | 32 | 24 | 24 |
| large | 28 | 40 | 28 | 28 |

### 样式变量

组件提供了以下 CSS 变量，可用于自定义样式：

```scss
.zx-goods-price {
  // 可以通过以下方式自定义样式
  --goods-price-color: #ee0a24;
  --goods-price-font-family: inherit;
}
```

### 注意事项

1. **多端兼容**：组件使用 `view` 和 `text` 标签，完全兼容 H5、小程序、App 端
2. **价格格式**：支持字符串和数字类型的价格输入，内部会自动格式化
3. **小数处理**：当 `show-decimal` 为 `false` 时，不显示小数部分；当 `decimal-length` 为 0 时，不保留小数
4. **颜色继承**：前缀和后缀颜色默认继承主价格颜色，也可单独设置
5. **字体大小**：各部分字体大小可单独设置，未设置时根据 `size` 属性自动计算

### 常见问题

**Q: 如何实现价格区间显示？**

A: 可以使用插槽或后缀来实现：

```vue
<zx-goods-price price="99.99" suffix="~199.99" />
```

**Q: 如何实现不同颜色的价格组合？**

A: 可以组合多个价格组件：

```vue
<view style="display: flex; align-items: baseline; gap: 10rpx;">
  <zx-goods-price price="99.99" color="#ee0a24" />
  <zx-goods-price price="199.99" color="#999" line-through />
</view>
```

**Q: 如何适配不同的设计规范？**

A: 通过 `custom-style` 属性或单独设置各部分字体大小来适配：

```vue
<zx-goods-price 
  price="99.99" 
  :symbol-size="20"
  :integer-size="36"
  :decimal-size="24"
  custom-style="font-family: 'PingFang SC';"
/>
```