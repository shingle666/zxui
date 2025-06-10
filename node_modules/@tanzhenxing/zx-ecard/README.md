# zx-ecard 电子卡券组件

> 一个功能完整的电子卡券组件，支持优惠券、代金券、折扣券、礼品券等多种类型，适用于电商、O2O等场景。

## 介绍

zx-ecard 是一个专为电子卡券场景设计的组件，提供了完整的卡券展示功能。组件支持多种卡券类型、状态管理、自定义样式等功能，同时支持点击事件、按钮操作等交互。基于 NutUI 电子卡券组件设计理念 <mcreference link="https://nutui.jd.com/biz/h5/react/1x/#/zh-CN/component/Ecard" index="1">1</mcreference>，结合 uniapp 多端兼容特性开发。

## 特性

- 🎫 支持多种卡券类型：优惠券、代金券、折扣券、礼品券
- 🔄 支持多种状态：可用、已使用、已过期
- 🎨 丰富的自定义样式配置
- 📱 完美适配 H5、小程序、APP 多端
- ⚡ 基于 Vue 3 Composition API
- 🛡️ TypeScript 类型支持
- 🎯 无浏览器特有 DOM 依赖

## 基础用法

```vue
<template>
  <zx-ecard
    type="coupon"
    title="满减优惠券"
    description="全场通用，满100元可用"
    :value="20"
    condition="满100元可用"
    valid-to="2024-12-31"
    @click="handleCardClick"
    @button-click="handleButtonClick"
  />
</template>

<script setup>
const handleCardClick = (cardInfo) => {
  console.log('卡券点击:', cardInfo)
}

const handleButtonClick = (cardInfo) => {
  console.log('按钮点击:', cardInfo)
}
</script>
```

## 不同类型

```vue
<template>
  <!-- 优惠券 -->
  <zx-ecard
    type="coupon"
    title="满减优惠券"
    :value="20"
    condition="满100元可用"
  />
  
  <!-- 代金券 -->
  <zx-ecard
    type="voucher"
    title="代金券"
    :value="50"
    condition="指定商品可用"
  />
  
  <!-- 折扣券 -->
  <zx-ecard
    type="discount"
    title="折扣券"
    value="8"
    value-symbol=""
    value-unit="折"
    condition="全场商品可用"
  />
  
  <!-- 礼品券 -->
  <zx-ecard
    type="gift"
    title="生日礼品券"
    :value="100"
    condition="生日当月可用"
    tag="专享"
  />
</template>
```

## 不同状态

```vue
<template>
  <!-- 可用状态 -->
  <zx-ecard
    title="可用优惠券"
    :value="15"
    status="available"
  />
  
  <!-- 已使用状态 -->
  <zx-ecard
    title="已使用优惠券"
    :value="15"
    status="used"
  />
  
  <!-- 已过期状态 -->
  <zx-ecard
    title="已过期优惠券"
    :value="15"
    status="expired"
  />
</template>
```

## 自定义样式

```vue
<template>
  <zx-ecard
    title="自定义样式券"
    :value="88"
    title-color="#2979ff"
    :title-size="36"
    value-color="#ff6b35"
    :value-size="52"
    button-color="#2979ff"
    tag="特惠"
    tag-color="#ff6b35"
  />
</template>
```

## 按钮类型

```vue
<template>
  <!-- 主要按钮 -->
  <zx-ecard
    title="主要按钮"
    :value="25"
    button-type="primary"
    button-text="立即使用"
  />
  
  <!-- 次要按钮 -->
  <zx-ecard
    title="次要按钮"
    :value="25"
    button-type="secondary"
    button-text="立即领取"
  />
  
  <!-- 轮廓按钮 -->
  <zx-ecard
    title="轮廓按钮"
    :value="30"
    button-type="outline"
    button-text="去使用"
  />
</template>
```

## 显示完整信息

```vue
<template>
  <zx-ecard
    title="商家优惠券"
    :value="35"
    valid-from="2024-01-01"
    valid-to="2024-12-31"
    merchant-name="ZXUI官方旗舰店"
    card-no="ZX202410001"
    :show-footer="true"
  />
</template>
```

## 特殊状态

```vue
<template>
  <!-- 禁用状态 -->
  <zx-ecard
    title="禁用状态券"
    :value="40"
    :disabled="true"
  />
  
  <!-- 选中状态 -->
  <zx-ecard
    title="选中状态券"
    :value="20"
    :selected="true"
  />
  
  <!-- 隐藏按钮 -->
  <zx-ecard
    title="纯展示券"
    :value="60"
    :show-button="false"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 卡券类型 | String | coupon |
| status | 卡券状态 | String | available |
| title | 卡券标题 | String | 优惠券 |
| description | 卡券描述 | String | - |
| value | 卡券面额/折扣值 | String/Number | 10 |
| value-symbol | 面额符号 | String | ¥ |
| value-unit | 面额单位 | String | - |
| condition | 使用条件 | String | - |
| valid-from | 有效期开始时间 | String | - |
| valid-to | 有效期结束时间 | String | - |
| merchant-name | 商家名称 | String | - |
| card-no | 卡券编号 | String | - |
| tag | 卡券标签 | String | - |
| disabled | 是否禁用 | Boolean | false |
| selected | 是否选中 | Boolean | false |
| show-button | 是否显示操作按钮 | Boolean | true |
| button-text | 按钮文字 | String | 立即使用 |
| button-type | 按钮类型 | String | primary |
| show-footer | 是否显示底部信息 | Boolean | false |
| show-status-icon | 是否显示状态图标 | Boolean | true |
| title-color | 标题颜色 | String | #333333 |
| title-size | 标题字体大小(rpx) | Number/String | 32 |
| desc-color | 描述颜色 | String | #666666 |
| desc-size | 描述字体大小(rpx) | Number/String | 24 |
| value-color | 面额颜色 | String | #ff4757 |
| value-size | 面额字体大小(rpx) | Number/String | 48 |
| condition-color | 条件颜色 | String | #999999 |
| condition-size | 条件字体大小(rpx) | Number/String | 22 |
| validity-color | 有效期颜色 | String | #999999 |
| validity-size | 有效期字体大小(rpx) | Number/String | 22 |
| button-color | 按钮颜色 | String | #ff4757 |
| button-text-color | 按钮文字颜色 | String | #ffffff |
| button-size | 按钮字体大小(rpx) | Number/String | 26 |
| tag-color | 标签颜色 | String | #ff4757 |
| custom-class | 自定义类名 | String | - |
| custom-style | 自定义样式 | Object/String | - |

### Type 卡券类型

| 值 | 说明 |
| --- | --- |
| coupon | 优惠券 |
| voucher | 代金券 |
| discount | 折扣券 |
| gift | 礼品券 |

### Status 卡券状态

| 值 | 说明 |
| --- | --- |
| available | 可用 |
| used | 已使用 |
| expired | 已过期 |

### Button Type 按钮类型

| 值 | 说明 |
| --- | --- |
| primary | 主要按钮 |
| secondary | 次要按钮 |
| outline | 轮廓按钮 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击卡券时触发 | { type, status, value, cardNo } |
| button-click | 点击按钮时触发 | { type, status, value, cardNo } |

## 数据结构

### 卡券信息对象

```javascript
{
  type: 'coupon',           // 卡券类型
  status: 'available',      // 卡券状态
  title: '满减优惠券',       // 卡券标题
  description: '全场通用',   // 卡券描述
  value: 20,                // 面额/折扣值
  valueSymbol: '¥',         // 面额符号
  valueUnit: '',            // 面额单位
  condition: '满100元可用',  // 使用条件
  validFrom: '2024-01-01',  // 有效期开始
  validTo: '2024-12-31',    // 有效期结束
  merchantName: '商家名称',  // 商家名称
  cardNo: 'ZX202410001',    // 卡券编号
  tag: '限时'               // 卡券标签
}
```

## 样式变量

组件提供了以下 CSS 变量，可用于自定义主题：

```scss
$zx-ecard-primary: #ff4757 !default;           // 主色调
$zx-ecard-secondary: #2979ff !default;         // 次要色调
$zx-ecard-success: #5cb85c !default;           // 成功色调
$zx-ecard-warning: #f0ad4e !default;           // 警告色调
$zx-ecard-border-radius: 12rpx !default;       // 圆角大小
$zx-ecard-spacing-xs: 8rpx !default;           // 最小间距
$zx-ecard-spacing-sm: 16rpx !default;          // 小间距
$zx-ecard-spacing-md: 24rpx !default;          // 中等间距
$zx-ecard-spacing-lg: 32rpx !default;          // 大间距
```

## 注意事项

1. **多端兼容**：组件使用 uniapp 语法，支持 H5、小程序、APP 多端运行
2. **样式单位**：所有尺寸使用 rpx 单位，确保多端适配
3. **事件处理**：点击事件会返回卡券的基本信息，便于业务处理
4. **状态管理**：组件本身不处理状态变更，需要在业务层面管理卡券状态
5. **自定义样式**：支持通过 props 自定义样式，也可以通过 custom-class 和 custom-style 进行深度定制
6. **无 DOM 依赖**：组件不使用浏览器特有的 DOM API，确保多端兼容性

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持多种卡券类型和状态
- ✨ 提供丰富的自定义配置
- ✨ 完美支持多端运行
- ✨ 基于 Vue 3 Composition API

## 许可证

MIT License