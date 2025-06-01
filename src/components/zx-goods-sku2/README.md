# zx-goods-sku2 商品规格选择组件 2.0

商品规格选择组件增强版，常用于电商场景中的商品规格选择、数量选择等功能。相比 v1 版本，新增了规格联动、图片规格、服务保障、库存预警等高级功能。

## 特性

- 🛍️ 支持多规格选择（颜色、尺寸、版本等）
- 🖼️ 支持图片规格展示
- 🔗 支持规格联动（智能禁用不可选组合）
- 📦 支持库存数量限制和预警
- 🎨 支持自定义操作按钮
- 🚫 支持不可售规格设置
- 🛡️ 支持服务保障展示
- 💰 支持价格区间显示
- 🔧 提供丰富的插槽支持
- 📱 完美适配 H5、小程序、App 端
- 🎯 TypeScript 支持
- ✨ 流畅的动画效果

## 安装使用

在 `pages.json` 中引入组件：

```json
{
  "easycom": {
    "^zx-(.*)$": "@/components/zx-$1/zx-$1.vue"
  }
}
```

## 基础用法

```vue
<template>
  <zx-goods-sku2
    v-model:show="skuVisible"
    :sku="skuData"
    :goods="goodsData"
    @select-sku="onSelectSku"
    @click-btn-operate="onClickBtnOperate"
  />
</template>

<script setup>
import { ref } from 'vue'

const skuVisible = ref(false)

const skuData = ref([
  {
    id: 1,
    name: '颜色',
    required: true,
    list: [
      { id: 101, name: '黑色', active: false, disabled: false },
      { id: 102, name: '白色', active: false, disabled: false },
      { id: 103, name: '红色', active: false, disabled: false }
    ]
  },
  {
    id: 2,
    name: '尺寸',
    required: true,
    list: [
      { id: 201, name: 'S', active: false, disabled: false },
      { id: 202, name: 'M', active: false, disabled: false },
      { id: 203, name: 'L', active: false, disabled: false }
    ]
  }
])

const goodsData = ref({
  title: '时尚休闲T恤',
  image: 'https://example.com/goods.jpg',
  price: '99.00',
  originalPrice: '199.00',
  stock: 100
})

function onSelectSku(data) {
  console.log('选择规格:', data)
}

function onClickBtnOperate(data) {
  console.log('点击操作按钮:', data)
}
</script>
```

## 图片规格选择

```vue
<template>
  <zx-goods-sku2
    v-model:show="skuVisible"
    :sku="imageSkuData"
    :goods="goodsData"
  />
</template>

<script setup>
const imageSkuData = ref([
  {
    id: 1,
    name: '颜色',
    required: true,
    list: [
      { 
        id: 101, 
        name: '黑色', 
        image: 'https://example.com/black.jpg',
        active: false, 
        disabled: false 
      },
      { 
        id: 102, 
        name: '白色', 
        image: 'https://example.com/white.jpg',
        active: false, 
        disabled: false 
      },
      { 
        id: 103, 
        name: '红色', 
        image: 'https://example.com/red.jpg',
        active: false, 
        disabled: false 
      }
    ]
  }
])
</script>
```

## 规格联动

```vue
<template>
  <zx-goods-sku2
    v-model:show="skuVisible"
    :sku="skuData"
    :goods="goodsData"
    :enable-sku-link="true"
    :sku-combinations="skuCombinations"
  />
</template>

<script setup>
const skuCombinations = ref([
  {
    skuIds: [101, 201], // 黑色 + S
    price: '89.00',
    stock: 10
  },
  {
    skuIds: [101, 202], // 黑色 + M
    price: '99.00',
    stock: 20
  },
  {
    skuIds: [102, 201], // 白色 + S
    price: '99.00',
    stock: 0 // 无库存，会被禁用
  },
  {
    skuIds: [102, 202], // 白色 + M
    price: '109.00',
    stock: 15
  }
  // 注意：红色 + L 的组合不存在，会被自动禁用
])
</script>
```

## 自定义操作按钮

```vue
<template>
  <zx-goods-sku2
    v-model:show="skuVisible"
    :sku="skuData"
    :goods="goodsData"
    :btn-options="['buy', 'cart']"
    buy-text="立即购买"
    add-cart-text="加入购物车"
  />
</template>
```

## 库存限制和预警

```vue
<template>
  <zx-goods-sku2
    v-model:show="skuVisible"
    :sku="skuData"
    :goods="goodsData"
    :show-stock="true"
    :stock-threshold="5"
    @stock-shortage="onStockShortage"
  />
</template>

<script setup>
function onStockShortage(data) {
  console.log('库存不足:', data)
  // { requested: 10, available: 3 }
}
</script>
```

## 服务保障

```vue
<template>
  <zx-goods-sku2
    v-model:show="skuVisible"
    :sku="skuData"
    :goods="goodsData"
    :services="serviceList"
  />
</template>

<script setup>
const serviceList = ref([
  { icon: '🛡️', text: '7天无理由退换' },
  { icon: '🚚', text: '全国包邮' },
  { icon: '📞', text: '24小时客服' },
  { icon: '✅', text: '正品保证' }
])
</script>
```

## 自定义插槽

```vue
<template>
  <zx-goods-sku2
    v-model:show="skuVisible"
    :sku="skuData"
    :goods="goodsData"
  >
    <template #sku-select-top>
      <view class="custom-tip">
        <text>💡 选择您喜欢的规格组合</text>
      </view>
    </template>
    
    <template #sku-stepper-bottom>
      <view class="custom-promotion">
        <text>🎉 满99元包邮，满199元送赠品</text>
      </view>
    </template>
    
    <template #operate-btn>
      <view class="custom-operate">
        <button @click="addToWishlist">❤️ 收藏</button>
        <button @click="shareGoods">📤 分享</button>
      </view>
    </template>
  </zx-goods-sku2>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | 是否显示商品规格弹框 | Boolean | false |
| sku | 商品 sku 数据 | Array | [] |
| goods | 商品信息 | Object | {} |
| stepperMax | 设置数量选择器最大值 | String/Number | 99999 |
| stepperMin | 设置数量选择器最小值 | String/Number | 1 |
| btnOptions | 底部按钮设置 | Array | ['confirm'] |
| btnExtraText | 按钮上部添加文案 | String | '' |
| stepperTitle | 数量选择组件左侧文案 | String | '购买数量' |
| stepperExtraText | 数量选择器额外文案 | Function/Boolean/String | false |
| buyText | 立即购买按钮文案 | String | '立即购买' |
| addCartText | 加入购物车按钮文案 | String | '加入购物车' |
| confirmText | 确定按钮文案 | String | '确定' |
| maskClosable | 点击遮罩是否关闭 | Boolean | true |
| showStock | 是否显示库存 | Boolean | true |
| stockThreshold | 库存不足阈值 | Number | 10 |
| services | 服务保障列表 | Array | [] |
| enableSkuLink | 是否启用规格联动 | Boolean | true |
| skuCombinations | SKU组合数据 | Array | [] |
| customClass | 自定义类名 | String | '' |
| customStyle | 自定义样式 | String/Object | '' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:show | 显示状态改变时触发 | show: boolean |
| close | 关闭弹层时触发 | - |
| select-sku | 切换规格类目时触发 | { sku, skuIndex, parentSku, parentIndex, selectedSku } |
| change-stepper | 购买数量变化时触发 | value: number |
| click-btn-operate | 点击底部按钮时触发 | { type, value, selectedSku, combination } |
| add | 点击增加按钮时触发 | value: number |
| reduce | 点击减少按钮时触发 | value: number |
| over-limit | 数量超出限制时触发 | { type, value } |
| sku-complete | 所有必选规格选择完成时触发 | { selectedSku, combination } |
| stock-shortage | 库存不足时触发 | { requested, available } |

### Slots

| 名称 | 说明 |
|------|------|
| sku-select-top | 规格选择区域上方自定义内容 |
| sku-stepper-bottom | 数量选择区域下方自定义内容 |
| operate-btn | 自定义操作按钮区域 |

### Methods

通过 ref 可以获取到组件实例并调用实例方法：

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| close | 关闭弹框 | - | - |
| getSelectedSku | 获取当前选中的规格 | - | Object |
| getSelectedCombination | 获取当前选中的规格组合 | - | Object/null |
| getCurrentPrice | 获取当前价格 | - | String |
| getCurrentStock | 获取当前库存 | - | Number |
| getQuantity | 获取当前数量 | - | Number |

## 数据结构

### goods 对象结构

```javascript
goods: {
  title: '商品标题',
  name: '商品名称', // title 的别名
  image: '商品图片URL',
  price: '99.00', // 当前价格
  originalPrice: '199.00', // 原价（可选）
  stock: 100 // 库存数量（可选）
}
```

### sku 数组结构

sku 数组中，每一个数组索引代表一个规格类目。其中，list 代表该规格类目下的类目值。每个类目值对象包括：name、id、active(是否选中)、disabled(是否可选)、image(规格图片，可选)、required(是否必选，默认true)

```javascript
sku: [
  {
    id: 1,
    name: '颜色',
    required: true, // 是否必选
    list: [
      {
        name: '亮黑色',
        id: 100016015112,
        active: false,
        disabled: false,
        image: 'https://example.com/black.jpg' // 可选
      },
      {
        name: '釉白色',
        id: 100016015142,
        active: false,
        disabled: false,
        image: 'https://example.com/white.jpg' // 可选
      }
    ]
  },
  {
    id: 2,
    name: '尺寸',
    required: true,
    list: [
      {
        name: 'S',
        id: 100016015078,
        active: false,
        disabled: false
      },
      {
        name: 'M',
        id: 100016015079,
        active: false,
        disabled: false
      }
    ]
  }
]
```

### skuCombinations 数组结构

用于规格联动，定义可用的规格组合及其对应的价格和库存：

```javascript
skuCombinations: [
  {
    skuIds: [100016015112, 100016015078], // 对应的规格ID组合
    price: '89.00', // 该组合的价格
    stock: 10, // 该组合的库存
    originalPrice: '199.00' // 该组合的原价（可选）
  },
  {
    skuIds: [100016015112, 100016015079],
    price: '99.00',
    stock: 20
  }
]
```

### services 数组结构

服务保障列表：

```javascript
services: [
  {
    icon: '🛡️', // 图标（可选）
    text: '7天无理由退换' // 服务文案
  },
  {
    icon: '🚚',
    text: '全国包邮'
  }
]
```

## 主题定制

组件提供了丰富的 CSS 变量，可用于自定义样式：

```scss
// 规格选择项
.zx-goods-sku2-spec-item {
  --sku-spec-item-border: 2rpx solid #e8e8e8;
  --sku-spec-item-bg: #fafafa;
  --sku-spec-item-active-border: #007aff;
  --sku-spec-item-active-bg: #e6f3ff;
  --sku-spec-item-disabled-opacity: 0.4;
}

// 操作按钮
.zx-goods-sku2-operate-btn {
  --sku-btn-confirm-bg: linear-gradient(135deg, #007aff 0%, #0056cc 100%);
  --sku-btn-buy-bg: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  --sku-btn-cart-bg: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
}

// 价格颜色
.zx-goods-sku2-price-value {
  --sku-price-color: #ff4757;
}

// 库存状态颜色
.zx-goods-sku2-stock-normal {
  --sku-stock-normal-color: #52c41a;
}

.zx-goods-sku2-stock-low {
  --sku-stock-low-color: #faad14;
}

.zx-goods-sku2-stock-empty {
  --sku-stock-empty-color: #ff4d4f;
}
```

## 高级功能

### 1. 规格联动

当启用规格联动时，组件会根据 `skuCombinations` 数据自动计算哪些规格组合是可选的，不可选的组合会被自动禁用。

### 2. 动态价格

当选择不同规格组合时，价格会根据 `skuCombinations` 中对应组合的价格动态更新。

### 3. 库存管理

- 支持全局库存和规格组合库存
- 库存不足时会显示预警信息
- 数量选择器会根据库存自动限制最大值

### 4. 图片规格

支持为规格选项添加图片，适用于颜色、款式等需要直观展示的规格。

## 注意事项

1. **数据结构**：请确保 sku 数据结构符合组件要求，特别是 id、name、active、disabled 字段
2. **规格联动**：启用规格联动时，请确保 `skuCombinations` 数据完整且正确
3. **库存管理**：组件本身不处理库存逻辑，需要在业务层面处理库存变化
4. **价格计算**：组件显示的价格来自 goods.price 或 skuCombinations 中的价格
5. **兼容性**：组件使用了 Vue 3 Composition API，请确保项目支持
6. **性能优化**：大量规格组合时建议启用虚拟滚动或分页加载

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持基础的商品规格选择功能
- ✨ 支持图片规格展示
- ✨ 支持规格联动功能
- ✨ 支持动态价格计算
- ✨ 支持库存预警
- ✨ 支持服务保障展示
- ✨ 支持自定义操作按钮
- ✨ 支持丰富的插槽
- ✨ 优化动画效果
- ✨ 完善的 TypeScript 支持

## 许可证

MIT License