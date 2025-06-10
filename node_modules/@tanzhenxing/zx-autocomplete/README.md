# ZxAutocomplete 自动补全输入框（Vue3 + <script setup> 语法，uni-app 多端）

根据输入内容提供对应的输入建议，支持 H5、小程序、App。无浏览器特有 DOM 依赖。

## 组件特性
- 支持 v-model 双向绑定
- 支持同步/异步数据源
- 支持自定义建议项模板
- 支持清空、禁用、下拉宽度自适应等
- 兼容 H5、微信/支付宝/百度/字节小程序、App（nvue/普通）

## 基础用法
```vue
<template>
  <zx-autocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="请输入"
    @select="handleSelect"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'

const state = ref('')
const restaurants = ref([])

onMounted(() => {
  restaurants.value = loadAll()
})
function querySearch(queryString, cb) {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  cb(results)
}
function createFilter(queryString) {
  return (restaurant) =>
    restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
}
function loadAll() {
  return [
    { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
    { value: 'Hot honey 首尔炸鸡', address: '上海市长宁区淞虹路661号' }
  ]
}
function handleSelect(item) {
  uni.showToast({ title: '选中：' + item.value, icon: 'none' })
}
</script>
```

## 自定义模板
```vue
<template>
  <zx-autocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="请输入"
    @select="handleSelect"
  >
    <template #default="{ item }">
      <view class="custom-item">
        <view class="item-name">{{ item.value }}</view>
        <view class="item-addr">{{ item.address }}</view>
      </view>
    </template>
  </zx-autocomplete>
</template>

<style scoped>
.custom-item {
  display: flex;
  flex-direction: column;
}
.item-name {
  font-size: 28rpx;
  color: #606266;
}
.item-addr {
  font-size: 24rpx;
  color: #b4b4b4;
}
</style>
```

## 远程搜索（异步）
```vue
<script setup>
import { ref } from 'vue'
const state = ref('')
function querySearchAsync(queryString, cb) {
  setTimeout(() => {
    const results = queryString
      ? [
          { value: '结果1' },
          { value: '结果2' },
          { value: '结果3' }
        ]
      : []
    cb(results)
  }, 500)
}
function handleSelect(item) {
  uni.showToast({ title: '选中：' + item.value, icon: 'none' })
}
</script>
<template>
  <zx-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入"
    @select="handleSelect"
  />
</template>
```

## 属性（Props）
| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model / modelValue | 选中项绑定值 | String | — |
| placeholder | 占位文本 | String | 请输入 |
| disabled | 是否禁用 | Boolean | false |
| valueKey | 输入建议对象中用于显示的键名 | String | value |
| clearable | 是否可清空 | Boolean | false |
| fetchSuggestions | 获取输入建议的方法 | Function | — |
| triggerOnFocus | 是否在输入框聚焦时就显示建议 | Boolean | true |
| debounce | 获取输入建议的去抖延时，单位为毫秒 | Number | 300 |
| hideLoading | 是否隐藏远程加载时的加载图标 | Boolean | false |
| highlightFirstItem | 是否默认高亮远程搜索结果的第一项 | Boolean | false |
| fitInputWidth | 下拉框的宽度是否与输入框相同 | Boolean | false |

## 事件（Emits）
| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| select | 点击选中建议项时触发 | 选中的建议项 |
| change | 在输入值改变时触发 | 输入框的值 |
| input | 在输入框值改变时触发 | 输入框的值 |
| focus | 在输入框获得焦点时触发 | 输入框的值 |
| blur | 在输入框失去焦点时触发 | 输入框的值 |
| clear | 在点击清空按钮时触发 | — |

## 插槽（Slots）
| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义输入建议的内容 | { item } |
| suffix | 输入框后缀内容 | — |
| loading | 自定义加载中状态内容 | — |

## 多端兼容注意事项
- 组件未使用任何浏览器特有 DOM API，适用于 uni-app 支持的所有平台。
- 下拉宽度自适应（fitInputWidth）依赖 uni.createSelectorQuery，部分平台如 nvue 可能不支持，建议兼容性测试。
- 建议 fetchSuggestions 支持 callback 形式，兼容同步/异步。

## 贡献与反馈
如有问题或建议，欢迎 issue 或 PR。
