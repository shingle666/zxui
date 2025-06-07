# zx-goods-sku 商品规格选择组件

商品规格选择组件，常用于电商场景中的商品规格选择、数量选择等功能。支持多规格选择、库存限制、自定义按钮等特性。

## 特性

- 🛍️ 支持多规格选择（颜色、尺寸、版本等）
- 📦 支持库存数量限制
- 🎨 支持自定义操作按钮
- 🚫 支持不可售规格设置
- 🔧 提供丰富的插槽支持
- 📱 完美适配 H5、小程序、App 端
- 🎯 TypeScript 支持

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
  <zx-goods-sku
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
    list: [
      { id: 101, name: '黑色', active: false, disabled: false },
      { id: 102, name: '白色', active: false, disabled: false },
      { id: 103, name: '红色', active: false, disabled: false }
    ]
  }
])

const goodsData = ref({
  image: 'https://example.com/goods.jpg',
  price: '199.00',
  originalPrice: '299.00',
  stock: 100
})

function onSelectSku(data) {
  console.log('选择规格:', data)
}

function onClickBtnOperate(data) {
  console.log('点击按钮:', data)
}
</script>
```

## 多规格选择

```vue
<template>
  <zx-goods-sku
    v-model:show="skuVisible"
    :sku="multiSkuData"
    :goods="goodsData"
  />
</template>

<script setup>
const multiSkuData = ref([
  {
    id: 1,
    name: '颜色',
    list: [
      { id: 101, name: '亮黑色', active: false, disabled: false },
      { id: 102, name: '釉白色', active: false, disabled: false },
      { id: 103, name: '秘银色', active: false, disabled: false }
    ]
  },
  {
    id: 2,
    name: '版本',
    list: [
      { id: 201, name: '8GB+128GB', active: false, disabled: false },
      { id: 202, name: '8GB+256GB', active: false, disabled: false },
      { id: 203, name: '12GB+256GB', active: false, disabled: false }
    ]
  }
])
</script>
```

## 自定义操作按钮

```vue
<template>
  <zx-goods-sku
    v-model:show="skuVisible"
    :sku="skuData"
    :goods="goodsData"
    :btn-options="['buy', 'cart']"
    buy-text="立即购买"
    add-cart-text="加入购物车"
  />
</template>
```

## 库存限制

```vue
<template>
  <zx-goods-sku
    v-model:show="skuVisible"
    :sku="skuData"
    :goods="goodsData"
    :stepper-max="goodsData.stock"
    @over-limit="onOverLimit"
  />
</template>

<script setup>
function onOverLimit(data) {
  const message = data.type === 'min' ? '不能再少了' : `最多只能购买 ${data.value} 件`
  uni.showToast({ title: message, icon: 'none' })
}
</script>
```

## 不可售规格

```vue
<template>
  <zx-goods-sku
    v-model:show="skuVisible"
    :sku="disabledSkuData"
    :goods="goodsData"
  />
</template>

<script setup>
const disabledSkuData = ref([
  {
    id: 1,
    name: '颜色',
    list: [
      { id: 101, name: '黑色', active: false, disabled: false },
      { id: 102, name: '白色', active: false, disabled: true }, // 不可选
      { id: 103, name: '红色', active: false, disabled: false }
    ]
  }
])
</script>
```

## 自定义插槽

```vue
<template>
  <zx-goods-sku
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
      <view class="custom-service">
        <text>🛡️ 7天无理由退换 | 📞 24小时客服</text>
      </view>
    </template>
    
    <template #operate-btn>
      <view class="custom-operate">
        <button>自定义按钮</button>
      </view>
    </template>
  </zx-goods-sku>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | 是否显示商品规格弹框 | Boolean | false |
| sku | 商品 sku 数据 | Array | [] |
| goods | 商品信息 | Object | {} |
| stepper-max | 设置数量选择器最大值 | String \| Number | 99999 |
| stepper-min | 设置数量选择器最小值 | String \| Number | 1 |
| btn-options | 底部按钮设置，['confirm', 'buy', 'cart'] | Array | ['confirm'] |
| btn-extra-text | 按钮上部添加文案 | String | '' |
| stepper-title | 数量选择组件左侧文案 | String | '购买数量' |
| stepper-extra-text | 数量选择器与标题之间的文案 | Function \| Boolean \| String | false |
| buy-text | 立即购买按钮文案 | String | '立即购买' |
| add-cart-text | 加入购物车按钮文案 | String | '加入购物车' |
| confirm-text | 确定按钮文案 | String | '确定' |
| mask-closable | 点击遮罩是否关闭 | Boolean | true |
| custom-class | 自定义类名 | String | '' |
| custom-style | 自定义样式 | String \| Object | '' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:show | 显示状态改变时触发 | show: boolean |
| close | 关闭弹层时触发 | - |
| select-sku | 切换规格类目时触发 | { sku, skuIndex, parentSku, parentIndex, selectedSku } |
| change-stepper | 购买数量变化时触发 | value: number |
| click-btn-operate | 点击底部按钮时触发 | { type, value, selectedSku } |
| add | 点击增加按钮时触发 | value: number |
| reduce | 点击减少按钮时触发 | value: number |
| over-limit | 点击不可用的按钮时触发 | { type, value } |

### Slots

| 名称 | 说明 |
|------|------|
| sku-select-top | 规格选择区域上方自定义内容 |
| sku-stepper-bottom | 数量选择区域下方自定义内容 |
| operate-btn | 自定义操作按钮区域 |

### 数据结构

#### goods 对象结构

```javascript
goods: {
  image: '', // 商品图片
  price: '0.00', // 商品价格
  originalPrice: '0.00', // 原价（可选）
  stock: 0 // 库存数量（可选）
}
```

#### sku 数组结构

sku 数组中，每一个数组索引代表一个规格类目。其中，list 代表该规格类目下的类目值。每个类目值对象包括：name、id、active(是否选中)、disabled(是否可选)

```javascript
sku: [
  {
    id: 1,
    name: '颜色',
    list: [
      {
        name: '亮黑色',
        id: 100016015112,
        active: true,
        disabled: false
      },
      {
        name: '釉白色',
        id: 100016015142,
        active: false,
        disabled: false
      },
      {
        name: '秘银色',
        id: 100016015078,
        active: false,
        disabled: true // 不可选
      }
    ]
  },
  {
    id: 2,
    name: '版本',
    list: [
      {
        name: '8GB+128GB',
        id: 100016015102,
        active: true,
        disabled: false
      },
      {
        name: '8GB+256GB',
        id: 100016015122,
        active: false,
        disabled: false
      }
    ]
  }
]
```

## 主题定制

组件提供了丰富的 CSS 变量，可用于自定义样式：

```scss
// 规格选择项
.zx-goods-sku-spec-item {
  --sku-spec-item-border: 2rpx solid #e5e5e5;
  --sku-spec-item-bg: #f8f8f8;
  --sku-spec-item-active-border: #007aff;
  --sku-spec-item-active-bg: #e6f3ff;
  --sku-spec-item-disabled-opacity: 0.5;
}

// 操作按钮
.zx-goods-sku-operate-btn {
  --sku-btn-confirm-bg: linear-gradient(135deg, #007aff 0%, #0056cc 100%);
  --sku-btn-buy-bg: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  --sku-btn-cart-bg: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
}
```

## 注意事项

1. **数据结构**：请确保 sku 数据结构符合组件要求，特别是 id、name、active、disabled 字段
2. **库存管理**：组件本身不处理库存逻辑，需要在业务层面处理库存变化
3. **规格联动**：如需实现规格联动（如某些组合不可选），需要在 `select-sku` 事件中处理
4. **价格计算**：组件显示的价格来自 goods.price，如需根据规格动态计算价格，请在业务层面处理
5. **兼容性**：组件使用了 Vue 3 Composition API，请确保项目支持

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持基础的商品规格选择功能
- ✨ 支持多规格选择
- ✨ 支持自定义操作按钮
- ✨ 支持库存限制
- ✨ 支持不可售规格设置
- ✨ 提供丰富的插槽支持
- ✨ 完美适配多端（H5、小程序、App）

## 许可证

MIT License