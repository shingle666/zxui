# zx-pagination 分页组件

一个功能完善的分页组件，支持多种布局组合和样式定制。

## 基本用法

```vue
<template>
  <zx-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const handleCurrentChange = (page) => {
  console.log(`当前页: ${page}`)
}
</script>
```

## 不同尺寸

```vue
<template>
  <zx-pagination :total="50" size="small" />
  <zx-pagination :total="50" />
  <zx-pagination :total="50" size="large" />
</template>
```

## 带背景色的分页

```vue
<template>
  <zx-pagination :total="50" background />
</template>
```

## 完整功能示例

```vue
<template>
  <zx-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    :page-sizes="[10, 20, 30, 50]"
    :background="true"
    layout="total, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const handleSizeChange = (size) => {
  console.log(`每页 ${size} 条`)
}

const handleCurrentChange = (page) => {
  console.log(`当前页: ${page}`)
}
</script>
```

## 属性

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| size | 分页组件大小 | String | large/default/small | default |
| background | 是否为分页按钮添加背景色 | Boolean | — | false |
| page-size | 每页显示条目个数 | Number | — | 10 |
| default-page-size | 每页默认的条目个数 | Number | — | 10 |
| total | 总条目数 | Number | — | 0 |
| page-count | 总页数，与 total 设置任意一个就可以达到显示页码的功能 | Number | — | 0 |
| pager-count | 页码按钮的数量，当总页数超过该值时会折叠 | Number | 大于等于 5 且小于等于 21 的奇数 | 7 |
| current-page | 当前页数 | Number | — | 1 |
| default-current-page | 当前页数的默认值 | Number | — | 1 |
| layout | 组件布局，子组件名用逗号分隔 | String | sizes, prev, pager, next, jumper, ->, total | prev, pager, next, jumper, ->, total |
| page-sizes | 每页显示个数选择器的选项设置 | Array | — | [10, 20, 30, 40, 50, 100] |
| prev-text | 替代图标显示的上一页文字 | String | — | "" |
| next-text | 替代图标显示的下一页文字 | String | — | "" |
| disabled | 是否禁用分页 | Boolean | — | false |
| hide-on-single-page | 只有一页时是否隐藏 | Boolean | — | false |

## 事件

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| update:current-page | 当前页改变时触发（支持 v-model:current-page） | 新的页码 |
| update:page-size | 每页条数改变时触发（支持 v-model:page-size） | 新的每页条数 |
| size-change | 每页条数改变时触发 | 新的每页条数 |
| current-change | 当前页改变时触发 | 新的页码 |
| prev-click | 点击上一页按钮时触发 | 新的页码 |
| next-click | 点击下一页按钮时触发 | 新的页码 |
| change | 当前页码或每页条数变化时触发 | 当前页码, 当前每页条数 |

## 布局

通过设置 `layout` 属性，可以灵活地组合分页组件的各个部分：

- `total`: 显示总条目数
- `sizes`: 每页显示条目数选择器
- `prev`: 上一页按钮
- `pager`: 页码按钮
- `next`: 下一页按钮
- `jumper`: 跳转页码输入框
- `->`: 右对齐分隔符，右侧内容将右对齐
