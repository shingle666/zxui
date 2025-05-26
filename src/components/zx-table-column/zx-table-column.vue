<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref, defineOptions, useSlots } from 'vue';

// 定义组件名称
defineOptions({
  name: 'zx-table-column'
});

// 生成简单的唯一ID
const generateId = () => {
  return 'zx-col-' + Math.random().toString(36).substr(2, 9);
};

const props = defineProps({
  // 列属性名
  prop: {
    type: String,
    default: ''
  },
  // 列标签名
  label: {
    type: String,
    default: ''
  },
  // 列宽度
  width: {
    type: String,
    default: ''
  },
  // 对齐方式
  align: {
    type: String,
    default: 'left' // left, center, right
  },
  // 表头对齐方式
  headerAlign: {
    type: String,
    default: '' // 不设置则与align一致
  },
  // 单元格格式化函数
  formatter: {
    type: Function,
    default: null
  },
  // 是否可排序
  sortable: {
    type: Boolean,
    default: false
  },
  // 自定义排序函数
  sortMethod: {
    type: Function,
    default: null
  },
  // 初始排序方向
  sortDirection: {
    type: String,
    default: 'ascending' // ascending, descending
  },
  // 是否可筛选
  filterable: {
    type: Boolean,
    default: false
  },
  // 筛选选项
  filters: {
    type: Array,
    default: () => []
  },
  // 自定义筛选函数
  filterMethod: {
    type: Function,
    default: null
  },
  // 是否显示溢出tooltip
  showOverflowTooltip: {
    type: Boolean,
    default: false
  },
  // 表头自定义类名
  headerClass: {
    type: String,
    default: ''
  },
  // 单元格自定义类名
  cellClass: {
    type: String,
    default: ''
  },
  // 列类型 (selection, index, expand)
  type: {
    type: String,
    default: ''
  },
  // 是否固定在左侧或者右侧
  fixed: {
    type: [Boolean, String],
    default: false // true/'left' or 'right'
  }
});

// 获取插槽
const slots = useSlots();

// 生成唯一ID
const columnId = ref(generateId());

// 获取表格提供的上下文
const zxTable = inject('zxTable', null);

if (!zxTable) {
  console.error('zx-table-column 组件必须在 zx-table 组件内使用');
}

// 计算表头对齐方式
const computedHeaderAlign = computed(() => {
  return props.headerAlign || props.align;
});

// 单元格渲染函数
const renderCell = (row, column, rowIndex) => {
  if (props.formatter) {
    return props.formatter(row, column, row[props.prop], rowIndex);
  }
  return row[props.prop];
};

// 列的配置信息
const columnConfig = computed(() => {
  return {
    id: columnId.value,
    prop: props.prop,
    label: props.label,
    width: props.width,
    align: props.align,
    headerAlign: computedHeaderAlign.value,
    formatter: props.formatter,
    renderCell: renderCell,
    sortable: props.sortable,
    sortMethod: props.sortMethod,
    sortDirection: props.sortDirection,
    filterable: props.filterable,
    filters: props.filters,
    filterMethod: props.filterMethod,
    showOverflowTooltip: props.showOverflowTooltip,
    headerClass: props.headerClass,
    cellClass: props.cellClass,
    type: props.type,
    fixed: props.fixed,
    // 提供给父组件的插槽信息
    slots: {
      default: !!slots.default,
      header: !!slots.header
    }
  };
});

onMounted(() => {
  // 注册列到表格
  zxTable?.registerColumn(columnConfig.value);
});

onBeforeUnmount(() => {
  // 注销列
  zxTable?.unregisterColumn(columnId.value);
});

// 将插槽暴露给父组件
defineExpose({
  columnId,
  renderCell,
  slots: {
    default: slots.default,
    header: slots.header
  }
});
</script>

<template>
  <!-- 占位用，实际渲染由父组件完成 -->
  <template v-if="$slots.default">
    <slot></slot>
  </template>
  <template v-if="$slots.header">
    <slot name="header"></slot>
  </template>
</template> 