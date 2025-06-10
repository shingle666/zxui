# zx-receive-invoice-list 收货发票列表

## 介绍

`zx-receive-invoice-list` 是一个功能完整的收货发票列表组件，用于展示和管理发票抬头信息。组件支持个人发票、企业发票等多种类型，提供了完整的发票信息展示功能，包括发票抬头、税号、地址、电话、开户行等信息，同时支持选择、编辑、删除等交互操作。

## 特性

- 🧾 支持多种发票类型：个人、企业、专票
- 📱 完美适配 H5、小程序、APP
- 🔧 灵活的数据字段映射
- ✅ 支持单选和多选模式
- ✏️ 支持编辑和删除操作
- 📄 支持加载更多和分页功能
- 🎯 丰富的自定义配置选项
- 🎪 提供多个插槽支持自定义内容
- 🎨 支持自定义颜色和样式
- 📊 支持空状态展示

## 安装使用

在 `pages.json` 中引入组件：

```json
{
  "easycom": {
    "^zx-(.*)$": "@/components/zx-$1/zx-$1.vue"
  }
}
```

## 基本用法

### 基础列表

```vue
<template>
  <zx-receive-invoice-list
    :list="invoiceList"
    @item-click="handleItemClick"
    @edit="handleEdit"
    @delete="handleDelete"
  />
</template>

<script setup>
import { ref } from 'vue'

const invoiceList = ref([
  {
    id: 1,
    title: '北京京东世纪贸易有限公司',
    type: 'company',
    taxNumber: '91110000123456789X',
    address: '北京市朝阳区北辰西路8号院',
    phone: '010-12345678',
    bank: '中国工商银行北京分行',
    account: '1234567890123456789',
    isDefault: true
  },
  {
    id: 2,
    title: '张三',
    type: 'personal',
    isDefault: false
  }
])

const handleItemClick = ({ item, index }) => {
  console.log('点击发票:', item, index)
}

const handleEdit = ({ item, index }) => {
  console.log('编辑发票:', item, index)
}

const handleDelete = ({ item, index }) => {
  console.log('删除发票:', item, index)
}
</script>
```

### 选择模式

```vue
<template>
  <zx-receive-invoice-list
    :list="invoiceList"
    :selectable="true"
    @select="handleSelect"
  />
</template>

<script setup>
const handleSelect = ({ item, index }) => {
  // 更新选择状态
  item.selected = !item.selected
  console.log('选择发票:', item, index)
}
</script>
```

### 自定义字段映射

```vue
<template>
  <zx-receive-invoice-list
    :list="customInvoiceList"
    key-field="invoiceId"
    title-field="companyName"
    type-field="invoiceType"
    tax-number-field="taxId"
    address-field="companyAddress"
    phone-field="contactPhone"
    bank-field="bankName"
    account-field="bankAccount"
    default-field="isDefaultInvoice"
  />
</template>

<script setup>
const customInvoiceList = ref([
  {
    invoiceId: 'inv001',
    companyName: '自定义公司名称',
    invoiceType: 'company',
    taxId: '91110000123456789X',
    companyAddress: '自定义地址',
    contactPhone: '010-87654321',
    bankName: '自定义银行',
    bankAccount: '9876543210987654321',
    isDefaultInvoice: true
  }
])
</script>
```

### 自定义发票卡片

```vue
<template>
  <zx-receive-invoice-list :list="invoiceList">
    <template #item="{ item, index }">
      <view class="custom-invoice-card" @click="handleCustomClick(item, index)">
        <view class="custom-header">
          <text class="custom-title">{{ item.title }}</text>
          <text class="custom-type">{{ getTypeText(item.type) }}</text>
        </view>
        <view class="custom-content">
          <text class="custom-tax">税号：{{ item.taxNumber }}</text>
        </view>
      </view>
    </template>
  </zx-receive-invoice-list>
</template>

<style>
.custom-invoice-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16rpx;
  padding: 32rpx;
  color: white;
  margin-bottom: 24rpx;
}

.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.custom-title {
  font-size: 32rpx;
  font-weight: bold;
}

.custom-type {
  font-size: 24rpx;
  opacity: 0.8;
}

.custom-content {
  font-size: 24rpx;
  opacity: 0.9;
}
</style>
```

### 加载状态管理

```vue
<template>
  <zx-receive-invoice-list
    :list="invoiceList"
    :loading="loading"
    :finished="finished"
    loading-text="正在加载发票信息..."
    finished-text="已加载全部发票"
    @load-more="loadMoreInvoices"
  />
</template>

<script setup>
import { ref } from 'vue'

const invoiceList = ref([])
const loading = ref(false)
const finished = ref(false)

const loadMoreInvoices = async () => {
  if (loading.value || finished.value) return
  
  loading.value = true
  try {
    // 模拟API调用
    const newInvoices = await fetchInvoices()
    invoiceList.value.push(...newInvoices)
    
    if (newInvoices.length < 10) {
      finished.value = true
    }
  } catch (error) {
    console.error('加载失败:', error)
  } finally {
    loading.value = false
  }
}

const fetchInvoices = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        // 模拟发票数据
      ])
    }, 1000)
  })
}
</script>
```

### 显示控制

```vue
<template>
  <zx-receive-invoice-list
    :list="invoiceList"
    :show-tax-number="false"
    :show-address="false"
    :show-phone="false"
    :show-bank="false"
    :show-account="false"
    :show-edit="false"
    :show-delete="false"
  />
</template>
```

### 自定义插槽

```vue
<template>
  <zx-receive-invoice-list :list="invoiceList">
    <template #header>
      <view class="invoice-header">
        <text class="header-title">我的发票抬头</text>
        <text class="header-subtitle">管理您的发票信息</text>
      </view>
    </template>
    
    <template #empty>
      <view class="custom-empty">
        <text class="empty-icon">📄</text>
        <text class="empty-title">暂无发票抬头</text>
        <text class="empty-desc">请添加发票抬头信息</text>
        <button class="empty-btn" @click="addInvoice">添加发票抬头</button>
      </view>
    </template>
    
    <template #footer>
      <view class="invoice-footer">
        <text class="footer-text">— 发票信息仅用于开具发票 —</text>
      </view>
    </template>
  </zx-receive-invoice-list>
</template>

<style>
.invoice-header {
  padding: 40rpx 32rpx;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.header-title {
  display: block;
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
}

.header-subtitle {
  font-size: 24rpx;
  opacity: 0.8;
}

.custom-empty {
  padding: 120rpx 0;
  text-align: center;
}

.empty-icon {
  display: block;
  font-size: 80rpx;
  margin-bottom: 16rpx;
  opacity: 0.3;
}

.empty-title {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 8rpx;
  color: #333;
}

.empty-desc {
  display: block;
  font-size: 24rpx;
  color: #666;
  margin-bottom: 32rpx;
}

.empty-btn {
  background: #007aff;
  color: white;
  border: none;
  border-radius: 50rpx;
  padding: 16rpx 32rpx;
  font-size: 28rpx;
}

.invoice-footer {
  padding: 40rpx;
  text-align: center;
}

.footer-text {
  font-size: 24rpx;
  color: #999;
}
</style>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| list | 发票数据列表 | Array | [] |
| keyField | 唯一标识字段名 | String | 'id' |
| titleField | 发票抬头字段名 | String | 'title' |
| typeField | 发票类型字段名 | String | 'type' |
| taxNumberField | 税号字段名 | String | 'taxNumber' |
| addressField | 地址字段名 | String | 'address' |
| phoneField | 电话字段名 | String | 'phone' |
| bankField | 开户行字段名 | String | 'bank' |
| accountField | 银行账号字段名 | String | 'account' |
| defaultField | 默认状态字段名 | String | 'isDefault' |
| selectedField | 选择状态字段名 | String | 'selected' |
| showTaxNumber | 是否显示税号 | Boolean | true |
| showAddress | 是否显示地址 | Boolean | true |
| showPhone | 是否显示电话 | Boolean | true |
| showBank | 是否显示开户行 | Boolean | true |
| showAccount | 是否显示银行账号 | Boolean | true |
| showDefault | 是否显示默认标识 | Boolean | true |
| showEdit | 是否显示编辑按钮 | Boolean | true |
| showDelete | 是否显示删除按钮 | Boolean | true |
| selectable | 是否可选择 | Boolean | false |
| loading | 是否加载中 | Boolean | false |
| finished | 是否加载完成 | Boolean | false |
| showLoadMore | 是否显示加载更多 | Boolean | true |
| emptyText | 空状态文本 | String | '暂无发票信息' |
| loadingText | 加载中文本 | String | '加载中...' |
| loadMoreText | 加载更多文本 | String | '点击加载更多' |
| finishedText | 加载完成文本 | String | '没有更多了' |
| titleColor | 标题颜色 | String | '#333' |
| descColor | 描述颜色 | String | '#666' |
| tagColor | 标签文字颜色 | String | '#fff' |
| tagBgColor | 标签背景颜色 | String | '#007aff' |
| defaultTagColor | 默认标签文字颜色 | String | '#fff' |
| defaultTagBgColor | 默认标签背景颜色 | String | '#ff4757' |
| selectedColor | 选中状态颜色 | String | '#007aff' |
| loadingColor | 加载状态颜色 | String | '#007aff' |
| finishedColor | 完成状态颜色 | String | '#999' |
| customClass | 自定义类名 | String | '' |
| customStyle | 自定义样式 | Object/String | {} |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| item-click | 点击发票项 | { item, index } |
| select | 选择发票项 | { item, index } |
| edit | 编辑发票项 | { item, index } |
| delete | 删除发票项 | { item, index } |
| load-more | 加载更多 | - |

### Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| header | 头部内容 | - |
| item | 自定义发票项 | { item, index } |
| empty | 空状态内容 | - |
| loading | 自定义加载状态 | - |
| loadMore | 自定义加载更多 | - |
| footer | 底部内容 | - |

## 数据结构

### 发票数据结构

```javascript
{
  id: 1,                           // 唯一标识
  title: '北京京东世纪贸易有限公司',    // 发票抬头
  type: 'company',                 // 发票类型：personal(个人) | company(企业) | special(专票)
  taxNumber: '91110000123456789X', // 税号
  address: '北京市朝阳区北辰西路8号院', // 地址
  phone: '010-12345678',           // 电话
  bank: '中国工商银行北京分行',       // 开户行
  account: '1234567890123456789',  // 银行账号
  isDefault: true,                 // 是否默认
  selected: false                  // 是否选中
}
```

### 发票类型说明

- `personal`: 个人发票，通常只需要发票抬头
- `company`: 企业发票，需要完整的企业信息
- `special`: 专用发票，需要完整的企业信息和银行信息

## 主题定制

组件提供了丰富的 CSS 变量，可用于自定义样式：

```scss
.zx-receive-invoice-list {
  // 卡片样式
  --card-bg: #fff;
  --card-border-radius: 16rpx;
  --card-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
  --card-padding: 32rpx;
  
  // 图标样式
  --icon-size: 80rpx;
  --icon-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --icon-color: #fff;
  
  // 文字颜色
  --title-color: #333;
  --desc-color: #666;
  --tag-color: #fff;
  --tag-bg-color: #007aff;
  
  // 默认标签样式
  --default-tag-color: #fff;
  --default-tag-bg-color: #ff4757;
  
  // 选择状态
  --selected-color: #007aff;
  
  // 按钮样式
  --edit-btn-bg: #f8f9fa;
  --edit-btn-color: #007aff;
  --delete-btn-bg: #fff5f5;
  --delete-btn-color: #ff4757;
  
  // 加载状态
  --loading-color: #007aff;
  --finished-color: #999;
}
```

## 使用场景

### 1. 发票抬头管理

用于用户管理个人或企业的发票抬头信息，支持添加、编辑、删除操作。

### 2. 发票抬头选择

在下单或开票流程中，让用户选择已保存的发票抬头。

### 3. 发票信息展示

在订单详情或发票记录中展示发票相关信息。

## 注意事项

1. 发票类型图标和文本可以根据业务需求自定义
2. 企业发票建议显示完整信息，个人发票可以隐藏部分字段
3. 在选择模式下，建议提供明确的选择反馈
4. 删除操作建议添加确认弹窗
5. 税号等敏感信息建议做脱敏处理
6. 大量数据时建议启用分页加载

## 兼容性

- ✅ H5
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 百度小程序
- ✅ 字节跳动小程序
- ✅ QQ小程序
- ✅ 快手小程序
- ✅ 京东小程序
- ✅ App

## 许可证

MIT License