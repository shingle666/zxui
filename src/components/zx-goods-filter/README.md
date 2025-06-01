# zx-goods-filter 商品筛选

`zx-goods-filter` 是一个功能强大的商品筛选组件，支持多种筛选类型，包括单选、多选、价格区间等，适用于电商场景的商品筛选功能。

## 特性

- 支持多种筛选类型：单选、多选、价格区间
- 支持地址选择功能
- 支持选项展开/收起
- 支持推荐价格快速选择
- 支持重置和确认操作
- 完全兼容 H5、小程序、APP 三端
- 响应式设计，适配不同屏幕尺寸

## 使用方法

```vue
<template>
  <zx-goods-filter
    :filter-data="filterData"
    :show-address="true"
    :current-address="currentAddress"
    @confirm="handleConfirm"
    @reset="handleReset"
    @address-click="handleAddressClick"
    @filter-change="handleFilterChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const currentAddress = ref('北京市朝阳区')

const filterData = ref([
  {
    key: 'category',
    title: '商品分类',
    type: 'radio',
    value: '',
    options: [
      { text: '全部', value: '' },
      { text: '手机', value: 'phone' },
      { text: '电脑', value: 'computer' },
      { text: '家电', value: 'appliance' }
    ]
  },
  {
    key: 'brand',
    title: '品牌',
    type: 'checkbox',
    value: [],
    showCount: 6,
    options: [
      { text: '苹果', value: 'apple' },
      { text: '华为', value: 'huawei' },
      { text: '小米', value: 'xiaomi' },
      { text: '三星', value: 'samsung' },
      { text: 'OPPO', value: 'oppo' },
      { text: 'vivo', value: 'vivo' },
      { text: '一加', value: 'oneplus' },
      { text: '魅族', value: 'meizu' }
    ]
  },
  {
    key: 'price',
    title: '价格',
    type: 'price',
    minPrice: '',
    maxPrice: '',
    recommendPrices: [
      { text: '0-100', min: '0', max: '100' },
      { text: '100-500', min: '100', max: '500' },
      { text: '500-1000', min: '500', max: '1000' },
      { text: '1000以上', min: '1000', max: '' }
    ]
  }
])

const handleConfirm = (result) => {
  console.log('筛选结果:', result)
}

const handleReset = (data) => {
  console.log('重置筛选:', data)
}

const handleAddressClick = () => {
  console.log('点击地址选择')
}

const handleFilterChange = (data) => {
  console.log('筛选项变化:', data)
}
</script>
```

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| filterData | Array | [] | 筛选数据配置 |
| showAddress | Boolean | false | 是否显示地址选择 |
| currentAddress | String | '请选择地址' | 当前选中的地址 |
| customClass | String | '' | 自定义类名 |
| customStyle | String/Object | '' | 自定义样式 |

## 事件说明

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击确定按钮时触发 | result: 筛选结果数组 |
| reset | 点击重置按钮时触发 | data: 重置后的数据 |
| address-click | 点击地址修改时触发 | - |
| filter-change | 筛选项发生变化时触发 | data: 变化的筛选项信息 |

## filterData 数据结构

### 单选类型 (radio)

```javascript
{
  key: 'category',           // 筛选项唯一标识
  title: '商品分类',          // 筛选项标题
  type: 'radio',            // 筛选类型
  value: '',                // 当前选中值
  options: [                // 选项列表
    { text: '全部', value: '' },
    { text: '手机', value: 'phone' }
  ]
}
```

### 多选类型 (checkbox)

```javascript
{
  key: 'brand',             // 筛选项唯一标识
  title: '品牌',             // 筛选项标题
  type: 'checkbox',         // 筛选类型
  value: [],                // 当前选中值数组
  showCount: 6,             // 默认显示的选项数量
  options: [                // 选项列表
    { text: '苹果', value: 'apple' },
    { text: '华为', value: 'huawei' }
  ]
}
```

### 价格区间类型 (price)

```javascript
{
  key: 'price',             // 筛选项唯一标识
  title: '价格',             // 筛选项标题
  type: 'price',            // 筛选类型
  minPrice: '',             // 最低价格
  maxPrice: '',             // 最高价格
  recommendPrices: [        // 推荐价格区间（可选）
    { text: '0-100', min: '0', max: '100' },
    { text: '100-500', min: '100', max: '500' }
  ]
}
```

## 样式定制

组件支持通过 CSS 变量进行样式定制：

```css
.zx-goods-filter {
  --primary-color: #fa2c19;           /* 主题色 */
  --border-color: #f2f3f3;            /* 边框颜色 */
  --background-color: #fff;           /* 背景色 */
  --text-color: #1a1a1a;              /* 文字颜色 */
  --secondary-text-color: #666;       /* 次要文字颜色 */
  --item-background: #f6f6f6;         /* 选项背景色 */
  --active-background: rgba(240, 37, 15, 0.05); /* 选中背景色 */
}
```

## 注意事项

1. 组件需要配合 `zx-icon` 组件使用，请确保已正确引入
2. 价格输入框仅支持数字输入
3. 多选类型支持展开/收起功能，通过 `showCount` 控制默认显示数量
4. 组件高度为 100%，请确保父容器有明确的高度
5. 底部操作按钮使用绝对定位，请预留足够的底部空间

## 兼容性

- ✅ H5
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 百度小程序
- ✅ 字节跳动小程序
- ✅ QQ 小程序
- ✅ 快手小程序
- ✅ 京东小程序
- ✅ App

## 更新日志

### v1.0.0

- 初始版本发布
- 支持单选、多选、价格区间筛选
- 支持地址选择功能
- 支持选项展开/收起
- 支持推荐价格快速选择