# zx-coupon2 优惠券组件

一个功能丰富、样式美观的优惠券组件，支持多种样式、状态和交互效果。

## 特性

- 🎨 多种主题色彩和尺寸
- 📱 完美适配 H5、小程序、APP
- 🎯 支持多种状态（正常、已使用、已过期、禁用）
- 🔧 高度可定制的样式
- 📦 轻量级，无外部依赖
- 🎪 支持锯齿边装饰效果

## 基础用法

```vue
<template>
  <zx-coupon2 
    amount="10" 
    title="全场通用券" 
    desc="满100元可用" 
    valid-time="2024-12-31前有效"
    @click="handleCouponClick"
    @btn-click="handleBtnClick"
  />
</template>

<script setup>
const handleCouponClick = () => {
  console.log('优惠券被点击')
}

const handleBtnClick = () => {
  console.log('按钮被点击')
}
</script>
```

## 不同尺寸

```vue
<template>
  <!-- 小尺寸 -->
  <zx-coupon2 size="small" amount="5" title="小额优惠券" />
  
  <!-- 正常尺寸 -->
  <zx-coupon2 size="normal" amount="10" title="标准优惠券" />
  
  <!-- 大尺寸 -->
  <zx-coupon2 size="large" amount="20" title="大额优惠券" />
</template>
```

## 不同主题

```vue
<template>
  <!-- 默认主题 -->
  <zx-coupon2 type="default" amount="10" title="默认优惠券" />
  
  <!-- 主要主题 -->
  <zx-coupon2 type="primary" amount="15" title="主要优惠券" />
  
  <!-- 成功主题 -->
  <zx-coupon2 type="success" amount="20" title="成功优惠券" />
  
  <!-- 警告主题 -->
  <zx-coupon2 type="warning" amount="25" title="警告优惠券" />
  
  <!-- 危险主题 -->
  <zx-coupon2 type="danger" amount="30" title="危险优惠券" />
</template>
```

## 不同状态

```vue
<template>
  <!-- 正常状态 -->
  <zx-coupon2 status="normal" amount="10" title="可用优惠券" />
  
  <!-- 已使用 -->
  <zx-coupon2 
    status="used" 
    status-text="已使用" 
    amount="10" 
    title="已使用优惠券" 
  />
  
  <!-- 已过期 -->
  <zx-coupon2 
    status="expired" 
    status-text="已过期" 
    amount="10" 
    title="已过期优惠券" 
  />
  
  <!-- 禁用状态 -->
  <zx-coupon2 
    status="disabled" 
    amount="10" 
    title="禁用优惠券" 
  />
</template>
```

## 自定义样式

```vue
<template>
  <!-- 自定义主题色 -->
  <zx-coupon2 
    theme-color="#ff6900" 
    amount="10" 
    title="自定义颜色" 
  />
  
  <!-- 方形样式 -->
  <zx-coupon2 
    shape="square" 
    amount="10" 
    title="方形优惠券" 
  />
  
  <!-- 隐藏锯齿边 -->
  <zx-coupon2 
    :show-sawtooth="false" 
    amount="10" 
    title="无锯齿边" 
  />
  
  <!-- 隐藏按钮 -->
  <zx-coupon2 
    :show-btn="false" 
    amount="10" 
    title="无按钮" 
  />
</template>
```

## 带标签

```vue
<template>
  <zx-coupon2 
    amount="10" 
    title="限时优惠券" 
    label="限时" 
    desc="仅限今日使用" 
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|------|------|------|--------|---------|
| amount | 优惠券金额 | String/Number | '10' | - |
| currency | 货币符号 | String | '￥' | - |
| condition | 使用条件 | String | '' | - |
| title | 优惠券标题 | String | '优惠券' | - |
| desc | 优惠券描述 | String | '' | - |
| valid-time | 有效期 | String | '' | - |
| size | 尺寸 | String | 'normal' | 'small', 'normal', 'large' |
| type | 主题类型 | String | 'default' | 'default', 'primary', 'success', 'warning', 'danger' |
| shape | 形状 | String | 'round' | 'round', 'square' |
| status | 状态 | String | 'normal' | 'normal', 'used', 'expired', 'disabled' |
| status-text | 状态文本 | String | '' | - |
| show-btn | 是否显示按钮 | Boolean | true | - |
| btn-text | 按钮文本 | String | '立即使用' | - |
| label | 标签文本 | String | '' | - |
| show-sawtooth | 是否显示锯齿边 | Boolean | true | - |
| custom-class | 自定义类名 | String | '' | - |
| custom-style | 自定义样式 | Object | {} | - |
| theme-color | 自定义主题色 | String | '' | - |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 优惠券点击事件 | - |
| btn-click | 按钮点击事件 | - |

### Slots

暂无插槽支持，后续版本可能会添加。

## 样式变量

组件使用 CSS 变量，可以通过覆盖这些变量来自定义样式：

```scss
.zx-coupon2 {
  // 可以在这里覆盖样式变量
  --coupon-bg-color: #fff;
  --coupon-border-radius: 8rpx;
  --coupon-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.1);
}
```

## 注意事项

1. 组件使用 `rpx` 单位，确保在不同设备上的适配性
2. 禁用状态下，点击事件不会触发
3. 建议在列表中使用时，为每个优惠券设置唯一的 `key`
4. 组件支持 H5、小程序、APP 三端，无需额外配置

## 更新日志

### v1.0.0
- 初始版本发布
- 支持基础优惠券展示
- 支持多种尺寸和主题
- 支持状态管理
- 支持自定义样式