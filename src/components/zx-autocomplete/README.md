# ZxAutocomplete 自动补全输入框

根据输入内容提供对应的输入建议。

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

<script>
import ZxAutocomplete from '@/components/zx-autocomplete'

export default {
  components: {
    ZxAutocomplete
  },
  data() {
    return {
      state: '',
      restaurants: []
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  },
  methods: {
    querySearch(queryString, cb) {
      const restaurants = this.restaurants
      const results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    loadAll() {
      return [
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        { value: 'Hot honey 首尔炸鸡（仙霞路）', address: '上海市长宁区淞虹路661号' },
        { value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { value: '泷千家(天山西路店)', address: '天山西路438号' }
      ]
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>
```

## 自定义模板

可自定义输入建议的显示模板。

```vue
<template>
  <zx-autocomplete
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="请输入"
    @select="handleSelect"
  >
    <template #default="{ item }">
      <div class="suggestion-item">
        <div class="value">{{ item.value }}</div>
        <span class="address">{{ item.address }}</span>
      </div>
    </template>
  </zx-autocomplete>
</template>

<style>
.suggestion-item {
  display: flex;
  flex-direction: column;
}
.value {
  font-size: 28rpx;
  color: #606266;
}
.address {
  font-size: 24rpx;
  color: #b4b4b4;
}
</style>
```

## 远程搜索

从服务端搜索数据。

```vue
<template>
  <zx-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入"
    @select="handleSelect"
  />
</template>

<script>
export default {
  data() {
    return {
      state: ''
    }
  },
  methods: {
    querySearchAsync(queryString, cb) {
      // 模拟异步请求
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
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>
```

## 属性

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

## 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| select | 点击选中建议项时触发 | 选中的建议项 |
| change | 在输入值改变时触发 | 输入框的值 |
| input | 在输入框值改变时触发 | 输入框的值 |
| focus | 在输入框获得焦点时触发 | 输入框的值 |
| blur | 在输入框失去焦点时触发 | 输入框的值 |
| clear | 在点击清空按钮时触发 | — |

## 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义输入建议的内容 | { item } |
| suffix | 输入框后缀内容 | — |
| loading | 自定义加载中状态内容 | — |
