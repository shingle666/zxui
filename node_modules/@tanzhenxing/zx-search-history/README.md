# SearchHistory 搜索历史

搜索历史组件，用于展示和管理用户的搜索历史记录，支持关键词高亮、删除单条记录、清空所有记录等功能。

## 特性

- 🔍 支持字符串和对象两种数据格式
- 🎨 支持关键词高亮显示
- 🗑️ 支持删除单条记录和清空所有记录
- 📱 完美适配 H5、小程序、App 多端
- 🎯 支持自定义样式和图标
- 📊 支持限制显示数量
- 🔧 支持字段映射配置
- 🎭 支持空状态展示

## 基础用法

```vue
<template>
  <zx-search-history 
    v-model="historyList"
    @item-click="onItemClick"
    @item-delete="onItemDelete"
    @clear-all="onClearAll"
  />
</template>

<script setup>
import { ref } from 'vue'

const historyList = ref([
  '手机',
  '电脑',
  '耳机'
])

const onItemClick = ({ item, index }) => {
  console.log('点击了:', item)
}

const onItemDelete = ({ item, index }) => {
  console.log('删除了:', item)
}

const onClearAll = () => {
  console.log('清空了所有历史')
}
</script>
```

## 对象数据格式

```vue
<template>
  <zx-search-history 
    v-model="objectHistory"
    :field-names="{ text: 'keyword', value: 'id' }"
    @item-click="onItemClick"
  />
</template>

<script setup>
const objectHistory = ref([
  { id: 1, keyword: '智能手机', category: '数码' },
  { id: 2, keyword: '运动鞋', category: '服装' },
  { id: 3, keyword: '咖啡机', category: '家电' }
])
</script>
```

## 关键词高亮

```vue
<template>
  <zx-search-history 
    v-model="historyList"
    :keyword="searchKeyword"
    :highlight-keyword="true"
    highlight-color="#ff6b35"
  />
</template>

<script setup>
const searchKeyword = ref('手机')
const historyList = ref(['智能手机', '手机壳', '手机充电器'])
</script>
```

## 自定义样式

```vue
<template>
  <zx-search-history 
    v-model="historyList"
    title="最近搜索"
    title-icon="time"
    title-color="#007aff"
    clear-text="全部清除"
    item-icon="magnifying-glass"
    item-text-color="#333"
    :item-height="120"
  />
</template>
```

## 限制显示数量

```vue
<template>
  <zx-search-history 
    v-model="historyList"
    :max-count="5"
    title="搜索记录（最多5条）"
  />
</template>
```

## 禁用删除功能

```vue
<template>
  <zx-search-history 
    v-model="historyList"
    :show-delete="false"
    :show-clear="false"
    title="只读历史记录"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| v-model | 历史记录数据 | Array | [] |
| show-history | 是否显示历史记录 | Boolean | true |
| max-count | 最大显示数量，0表示不限制 | Number | 10 |
| keyword | 高亮关键词 | String | '' |
| highlight-keyword | 是否高亮关键词 | Boolean | true |
| highlight-color | 高亮颜色 | String | '#ff4444' |
| field-names | 字段映射配置 | Object | { text: 'text', value: 'value', icon: 'icon', disabled: 'disabled' } |

#### 标题相关

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show-title | 是否显示标题栏 | Boolean | true |
| title | 标题文字 | String | '搜索历史' |
| title-icon | 标题图标 | String | 'clock' |
| title-icon-size | 标题图标大小 | Number/String | 32 |
| title-icon-color | 标题图标颜色 | String | '#666666' |
| title-color | 标题文字颜色 | String | '#333333' |
| title-size | 标题文字大小 | Number/String | 28 |

#### 清除按钮相关

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show-clear | 是否显示清除按钮 | Boolean | true |
| clear-text | 清除按钮文字 | String | '清空' |
| clear-icon | 清除按钮图标 | String | 'delete' |
| clear-icon-size | 清除按钮图标大小 | Number/String | 28 |
| clear-icon-color | 清除按钮图标颜色 | String | '#999999' |
| clear-text-color | 清除按钮文字颜色 | String | '#999999' |
| clear-text-size | 清除按钮文字大小 | Number/String | 24 |

#### 项目相关

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show-item-icon | 是否显示项目图标 | Boolean | true |
| item-icon | 项目默认图标 | String | 'search' |
| item-icon-size | 项目图标大小 | Number/String | 28 |
| item-icon-color | 项目图标颜色 | String | '#999999' |
| item-text-color | 项目文字颜色 | String | '#333333' |
| item-text-size | 项目文字大小 | Number/String | 28 |
| item-height | 项目高度 | Number/String | 88 |
| item-padding | 项目内边距 | String | '0 32rpx' |

#### 删除按钮相关

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show-delete | 是否显示删除按钮 | Boolean | true |
| delete-icon | 删除按钮图标 | String | 'close' |
| delete-icon-size | 删除按钮图标大小 | Number/String | 24 |
| delete-icon-color | 删除按钮图标颜色 | String | '#cccccc' |

#### 空状态相关

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show-empty | 是否显示空状态 | Boolean | true |
| empty-text | 空状态文字 | String | '暂无搜索历史' |
| empty-icon | 空状态图标 | String | 'empty' |
| empty-icon-size | 空状态图标大小 | Number/String | 120 |
| empty-icon-color | 空状态图标颜色 | String | '#cccccc' |
| empty-text-color | 空状态文字颜色 | String | '#999999' |
| empty-text-size | 空状态文字大小 | Number/String | 24 |

#### 其他

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| disabled-color | 禁用状态颜色 | String | '#cccccc' |
| background-color | 背景颜色 | String | 'transparent' |

### Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击历史记录项时触发 | { item, index } |
| item-click | 点击历史记录项时触发（同click） | { item, index } |
| item-delete | 删除历史记录项时触发 | { item, index, list } |
| clear | 清空所有历史记录时触发 | - |
| clear-all | 清空所有历史记录时触发（同clear） | - |

### 数据格式

#### 字符串格式

```javascript
const historyList = [
  '手机',
  '电脑',
  '耳机'
]
```

#### 对象格式

```javascript
const historyList = [
  {
    id: 1,
    text: '智能手机',
    icon: 'phone',
    disabled: false
  },
  {
    id: 2,
    text: '笔记本电脑',
    icon: 'laptop',
    disabled: false
  }
]
```

#### 自定义字段映射

```javascript
// 数据
const historyList = [
  {
    id: 1,
    keyword: '智能手机',
    category: '数码'
  }
]

// 字段映射
const fieldNames = {
  text: 'keyword',
  value: 'id'
}
```

## 样式变量

组件提供了以下 CSS 变量，可用于自定义样式：

```scss
:root {
  --zx-search-history-bg: transparent;
  --zx-search-history-title-color: #333333;
  --zx-search-history-item-color: #333333;
  --zx-search-history-clear-color: #999999;
  --zx-search-history-delete-color: #cccccc;
  --zx-search-history-disabled-color: #cccccc;
  --zx-search-history-highlight-color: #ff4444;
}
```

## 注意事项

1. 组件使用了 `zx-icon` 组件，请确保项目中已正确引入
2. 关键词高亮功能使用了 `v-html`，请注意 XSS 安全问题
3. 在小程序中，部分 CSS 特性可能不支持，建议在真机上测试
4. 对象数据格式中，`disabled` 字段为 `true` 时，该项将不可点击且显示为禁用状态
5. `max-count` 设置为 0 时表示不限制显示数量

## 更新日志

### v1.0.0

- 🎉 初始版本发布
- ✨ 支持字符串和对象数据格式
- ✨ 支持关键词高亮
- ✨ 支持删除和清空功能
- ✨ 支持自定义样式
- ✨ 支持多端适配