# zx-table-v2 虚拟化表格组件

`zx-table-v2` 是一个基于 UniApp 的高性能虚拟化表格组件，专为处理大量数据而设计，确保在 H5、小程序和 App 端都能流畅运行。

## 特性

- **虚拟滚动**: 只渲染可视区域内的数据，高效处理万级甚至十万级数据量。
- **固定表头**: 表头在内容滚动时保持固定。
- **固定列**: 支持左右固定列（待实现）。
- **自定义单元格渲染**: 灵活定义单元格显示内容与样式。
- **自动高度/宽度**: 支持根据父容器自动调整大小（待实现）。
- **多平台兼容**: 专为 UniApp 设计，兼容 H5、小程序、App。

## 安装

```bash
# npm
npm install @tanzhenxing/zx-table-v2

# yarn
yarn add @tanzhenxing/zx-table-v2
```

## 使用方法

在 `pages.json` 中配置：

```json
{
  "easycom": {
    "^zx-(.*)": "@tanzhenxing/zx-ui/components/zx-$1/zx-$1.vue"
  },
  "usingComponents": {
    "zx-table-v2": "/src/components/zx-table-v2/zx-table-v2"
  }
}
```

在页面中使用：

```vue
<template>
  <view style="height: 400px;">
    <zx-table-v2
      :columns="columns"
      :data="data"
      :width="tableWidth"
      :height="tableHeight"
      fixed
    />
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const columns = ref([
  { key: 'id', dataKey: 'id', title: 'ID', width: 150 },
  { key: 'name', dataKey: 'name', title: '名称', width: 200 },
  { key: 'value', dataKey: 'value', title: '值', width: 100 },
  // 更多列...
]);

const data = ref([]);
const tableWidth = ref(750); // rpx or px
const tableHeight = ref(400); // rpx or px, 对应外层容器高度

onMounted(() => {
  // 模拟加载大量数据
  const generatedData = [];
  for (let i = 0; i < 1000; i++) {
    generatedData.push({
      id: `row-${i}`,
      name: `Name ${i}`,
      value: Math.floor(Math.random() * 1000),
    });
  }
  data.value = generatedData;
});
</script>
```

## API

### Props

| 属性名        | 类型          | 默认值 | 说明                                                                 |
| ------------- | ------------- | ------ | -------------------------------------------------------------------- |
| `columns`     | `Array<Column>` | `[]`   | 表格列的配置，详见 `Column` 配置                                       |
| `data`        | `Array<Object>` | `[]`   | 表格数据源                                                             |
| `width`       | `Number`      | `0`    | 表格总宽度，单位 rpx 或 px。如果为 0，则尝试自适应父容器（部分平台可能不完美） |
| `height`      | `Number`      | `300`  | 表格高度，单位 rpx 或 px。虚拟滚动依赖此固定高度。                         |
| `row-height`  | `Number`      | `50`   | 每行的大致高度，单位 rpx 或 px。用于虚拟滚动计算。                         |
| `header-height`| `Number`      | `50`   | 表头高度，单位 rpx 或 px。                                               |
| `fixed`       | `Boolean`     | `false`| 是否固定表头（目前仅垂直方向滚动时表头固定）                             |
| `row-key`     | `String`      | `id`   | 行数据的唯一标识符字段名                                                 |
| `border`      | `Boolean`     | `false`| 是否显示纵向边框                                                         |
| `stripe`      | `Boolean`     | `false`| 是否为斑马纹 table                                                       |
| `loading`     | `Boolean`     | `false`| 是否显示加载中                                                           |
| `empty-text`  | `String`      | `暂无数据` | 空数据时显示的文本                                                       |

### Column 配置

| 属性名      | 类型                | 说明                                                               |
| ----------- | ------------------- | ------------------------------------------------------------------ |
| `key`       | `String`            | 列的唯一标识                                                         |
| `dataKey`   | `String`            | 对应 `data` 数组中对象的属性名                                         |
| `title`     | `String`            | 列头显示文字                                                         |
| `width`     | `Number`            | 列宽度，单位 rpx 或 px                                                 |
| `minWidth`  | `Number`            | 最小列宽度，单位 rpx 或 px                                             |
| `align`     | `String`            | 对齐方式 (`left`, `center`, `right`)                                 |
| `fixed`     | `String` / `Boolean`| 列是否固定在左侧或者右侧，`true` 表示固定在左侧，`left` / `right` (待实现) |
| `renderCell`| `Function`          | 自定义单元格渲染函数，参数为 `{ row, column, rowIndex, columnIndex }`    |
| `renderHeader`| `Function`          | 自定义表头单元格渲染函数，参数为 `{ column, columnIndex }`             |
| `sortable`  | `Boolean`           | 该列是否可排序 (待实现)                                                |

### Events

| 事件名            | 回调参数                                  | 说明                                 |
| ----------------- | ----------------------------------------- | ------------------------------------ |
| `row-click`       | `(row, column, event)`                    | 当某一行被点击时触发                 |
| `header-click`    | `(column, event)`                         | 当某一列的表头被点击时触发           |
| `scroll`          | `({ scrollLeft, scrollTop, scrollHeight, scrollWidth, ...eventDetail })` | 表格滚动时触发                       |

## 注意事项

- 为实现虚拟滚动，表格容器必须具有明确的高度 (`height` prop)。
- `row-height` 属性对虚拟滚动的计算至关重要，请尽量提供准确的预估行高。
- 跨平台兼容性是首要考虑，避免使用 H5 特有的 DOM API。

## 待办事项

- [ ] 实现左右固定列
- [ ] 实现列排序功能
- [ ] 实现 `AutoResizer` 功能，自动获取父容器宽高
- [ ] 更精细的虚拟滚动优化
- [ ] 单元测试

## 贡献

欢迎提交 PR 和 Issue。