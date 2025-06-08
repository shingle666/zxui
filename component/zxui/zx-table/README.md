# zx-table 表格组件

一个跨平台的表格组件，支持 H5、小程序和 App，基于 uniapp 和 Vue3 setup 语法开发。

## 特性

- 支持跨平台：H5、微信小程序、支付宝小程序、App 等
- 使用 Vue3 组合式 API (setup)
- 支持基本表格、带边框表格、斑马纹表格
- 支持自定义列模板
- 支持表格事件（行点击、单元格点击、表头点击等）
- 支持自定义样式

## 安装

```bash
npm install @tanzhenxing/zx-table
```

## 引入组件

### 全局引入

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'

import ZxTable from '@tanzhenxing/zx-table'

const app = createApp(App)
app.use(ZxTable)
app.mount('#app')
```

### 局部引入

```js
// 在需要使用的页面中引入
import { ZxTable, ZxTableColumn } from '@tanzhenxing/zx-table'
```

## 基本用法

```vue
<template>
  <zx-table :data="tableData">
    <zx-table-column prop="date" label="日期" width="180"></zx-table-column>
    <zx-table-column prop="name" label="姓名" width="180"></zx-table-column>
    <zx-table-column prop="address" label="地址"></zx-table-column>
  </zx-table>
</template>

<script setup>
import { ref } from 'vue';

const tableData = [
  {
    date: '2023-01-01',
    name: '张三',
    address: '北京市朝阳区芍药居'
  },
  {
    date: '2023-01-02',
    name: '李四',
    address: '上海市浦东新区张江高科'
  },
  {
    date: '2023-01-03',
    name: '王五',
    address: '广州市天河区珠江新城'
  },
  {
    date: '2023-01-04',
    name: '赵六',
    address: '深圳市南山区科技园'
  }
];
</script>
```

## 带斑马纹表格

使用 `stripe` 属性可以创建带斑马纹的表格，以便区分不同行。

```vue
<zx-table :data="tableData" stripe>
  <zx-table-column prop="date" label="日期" width="180"></zx-table-column>
  <zx-table-column prop="name" label="姓名" width="180"></zx-table-column>
  <zx-table-column prop="address" label="地址"></zx-table-column>
</zx-table>
```

## 带边框表格

使用 `border` 属性可以为表格添加边框。

```vue
<zx-table :data="tableData" border>
  <zx-table-column prop="date" label="日期" width="180"></zx-table-column>
  <zx-table-column prop="name" label="姓名" width="180"></zx-table-column>
  <zx-table-column prop="address" label="地址"></zx-table-column>
</zx-table>
```

## 自定义列模板

通过 `slot` 可以自定义列的内容，参数包括 `row`（当前行数据）、`column`（当前列数据）和 `$index`（当前行索引）。

```vue
<zx-table :data="tableData" border>
  <zx-table-column prop="date" label="日期" width="180"></zx-table-column>
  <zx-table-column prop="name" label="姓名" width="180"></zx-table-column>
  <zx-table-column label="操作">
    <template #default="scope">
      <view class="button-group">
        <button @tap="handleEdit(scope.row)">编辑</button>
        <button @tap="handleDelete(scope.$index, scope.row)">删除</button>
      </view>
    </template>
  </zx-table-column>
</zx-table>
```

## 表格事件

表格组件提供了多种事件：

```vue
<zx-table 
  :data="tableData" 
  @row-click="handleRowClick"
  @cell-click="handleCellClick"
  @header-click="handleHeaderClick"
>
  <!-- 列定义 -->
</zx-table>
```

## API

### zx-table 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表格数据 | Array | [] |
| border | 是否带有纵向边框 | Boolean | false |
| stripe | 是否为斑马纹表格 | Boolean | false |
| height | 表格高度 | String/Number | - |
| fit | 列的宽度是否自撑开 | Boolean | true |
| showHeader | 是否显示表头 | Boolean | true |
| rowKey | 行数据的 Key，用于优化渲染 | String | - |
| emptyText | 空数据时显示的文本 | String | 暂无数据 |
| loading | 是否显示加载中 | Boolean | false |
| loadingText | 加载中显示的文本 | String | 加载中... |
| tableClass | 表格自定义类名 | String | - |

### zx-table 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| row-click | 当某一行被点击时触发 | row, rowIndex, event |
| cell-click | 当某个单元格被点击时触发 | row, column, rowIndex, columnIndex, event |
| header-click | 当某列的表头被点击时触发 | column, columnIndex, event |
| sort-change | 当表格的排序条件发生变化时触发 | { column, prop, order } |
| selection-change | 当选择项发生变化时触发 | selection |

### zx-table-column 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prop | 对应列内容的字段名 | String | - |
| label | 显示的标题 | String | - |
| width | 对应列的宽度 | String | - |
| align | 对齐方式 | String | left |
| headerAlign | 表头对齐方式 | String | - |
| formatter | 用来格式化内容 | Function(row, column, cellValue, index) | - |
| sortable | 对应列是否可以排序 | Boolean | false |
| sortMethod | 自定义排序方法 | Function(a, b) | - |
| sortDirection | 默认排序方向 | String | ascending |
| filterable | 是否可筛选 | Boolean | false |
| filters | 筛选选项 | Array | [] |
| filterMethod | 自定义筛选方法 | Function | - |
| showOverflowTooltip | 当内容过长被隐藏时显示 tooltip | Boolean | false |
| headerClass | 表头单元格的类名 | String | - |
| cellClass | 单元格的类名 | String | - |
| fixed | 列是否固定 | Boolean/String | false |

### zx-table-column 插槽

| 插槽名 | 说明 | 插槽作用域 |
| --- | --- | --- |
| default | 自定义列的内容 | { row, column, $index } |
| header | 自定义表头的内容 | { column, $index } |

## 示例

查看 `src/pages/components/table/index.vue` 获取更多使用示例。
