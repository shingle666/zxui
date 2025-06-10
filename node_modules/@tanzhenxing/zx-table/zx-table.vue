<template>
  <view class="zx-table" :class="[{ 'zx-table--border': border, 'zx-table--stripe': stripe }, tableClass]"
    :style="tableStyle" ref="tableRef">
    <!-- 表头 -->
    <view v-if="showHeader" class="zx-table__header">
      <view class="zx-table__header-row">
        <view v-for="(column, columnIndex) in columns" :key="column.id || columnIndex" class="zx-table__header-cell"
          :class="[
            { 'zx-table__cell--border': border },
            column.headerClass
          ]" :style="{ width: column.width || 'auto', textAlign: column.align || 'left' }"
          @tap="handleHeaderClick(column, columnIndex, $event)">
          <slot :name="`header-${column.prop}`" :column="column">
            {{ column.label }}
          </slot>
        </view>
      </view>
    </view>

    <!-- 表格主体 -->
    <view class="zx-table__body">
      <!-- 加载状态 -->
      <view v-if="loading" class="zx-table__loading">
        <view class="zx-table__loading-text">{{ loadingText }}</view>
      </view>

      <!-- 数据为空状态 -->
      <view v-else-if="!data || data.length === 0" class="zx-table__empty">
        <view class="zx-table__empty-text">{{ emptyText }}</view>
      </view>

      <!-- 表格数据 -->
      <block v-else>
        <view v-for="(row, rowIndex) in data" :key="getRowKey(row, rowIndex)" class="zx-table__row"
          :class="{ 'zx-table__row--stripe': stripe && rowIndex % 2 !== 0 }"
          @tap="handleRowClick(row, rowIndex, $event)">
          <view v-for="(column, columnIndex) in columns" :key="column.id || columnIndex" class="zx-table__cell" :class="[
            { 'zx-table__cell--border': border },
            column.cellClass
          ]" :style="{ width: column.width || 'auto', textAlign: column.align || 'left' }"
            @tap.stop="handleCellClick(row, column, rowIndex, columnIndex, $event)">
            <!-- 渲染单元格内容 -->
            <template v-if="column.slots && column.slots.default">
              <!-- 自定义列模板 -->
              <slot :name="`col-${column.id}`" :row="row" :column="column" :$index="rowIndex">
                <!-- 保持默认插槽的向后兼容性 -->
                <slot :name="column.prop" :row="row" :column="column" :$index="rowIndex"
                  :scope="{ row, column, $index: rowIndex }"></slot>
              </slot>
            </template>
            <template v-else>
              <!-- 使用默认渲染方式 -->
              {{ column.renderCell ? column.renderCell(row, column, rowIndex) : row[column.prop] }}
            </template>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script setup>
import { computed, provide, ref, toRefs } from 'vue';

const props = defineProps({
  // 表格数据
  data: {
    type: Array,
    default: () => []
  },
  // 是否带有纵向边框
  border: {
    type: Boolean,
    default: false
  },
  // 是否为斑马纹表格
  stripe: {
    type: Boolean,
    default: false
  },
  // 表格的高度，默认为自动高度
  height: {
    type: [String, Number],
    default: ''
  },
  // 列的宽度是否自撑开
  fit: {
    type: Boolean,
    default: true
  },
  // 是否显示表头
  showHeader: {
    type: Boolean,
    default: true
  },
  // 行的 key 值
  rowKey: {
    type: String,
    default: ''
  },
  // 空数据时显示的文本
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  // 是否显示表格加载状态
  loading: {
    type: Boolean,
    default: false
  },
  // 加载中显示的文本
  loadingText: {
    type: String,
    default: '加载中...'
  },
  // 表格样式
  tableClass: {
    type: String,
    default: ''
  },
});

const emit = defineEmits([
  'row-click',
  'cell-click',
  'header-click',
  'sort-change',
  'selection-change'
]);

// 存储列信息的数组
const columns = ref([]);

// 暴露给外部的方法
const tableRef = ref(null);

// 注册列
const registerColumn = (column) => {
  columns.value.push(column);
};

// 注销列
const unregisterColumn = (columnId) => {
  const index = columns.value.findIndex(col => col.id === columnId);
  if (index !== -1) {
    columns.value.splice(index, 1);
  }
};

// 生成行的唯一key
const getRowKey = (row, rowIndex) => {
  return props.rowKey ? row[props.rowKey] : rowIndex;
};

// 计算表格样式
const tableStyle = computed(() => {
  const style = {};

  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height;
  }

  return style;
});

// 行点击事件处理
const handleRowClick = (row, rowIndex, event) => {
  emit('row-click', row, rowIndex, event);
};

// 单元格点击事件处理
const handleCellClick = (row, column, rowIndex, columnIndex, event) => {
  emit('cell-click', row, column, rowIndex, columnIndex, event);
};

// 表头点击事件处理
const handleHeaderClick = (column, columnIndex, event) => {
  emit('header-click', column, columnIndex, event);
};

// 存储列的插槽内容
const columnSlots = ref({});

// 注册列的插槽
const registerColumnSlot = (columnId, slotType, slotContent) => {
  if (!columnSlots.value[columnId]) {
    columnSlots.value[columnId] = {};
  }
  columnSlots.value[columnId][slotType] = slotContent;
};

// 为子组件提供上下文
provide('zxTable', {
  registerColumn,
  unregisterColumn,
  registerColumnSlot,
  columns,
  columnSlots
});

defineExpose({
  // 暴露组件内部的方法给父组件使用
  columns,
  tableRef
});
</script>

<style>
.zx-table {
  width: 100%;
  box-sizing: border-box;
  font-size: 28rpx;
  color: #333;
  position: relative;
  background-color: #fff;
}

.zx-table--border {
  border: 2rpx solid #ebeef5;
  border-right: none;
  border-bottom: none;
}

.zx-table__header {
  background-color: #f5f7fa;
}

.zx-table__header-row,
.zx-table__row {
  display: flex;
  width: 100%;
}

.zx-table__header-cell,
.zx-table__cell {
  flex: 1;
  padding: 24rpx 20rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-sizing: border-box;
}

.zx-table__header-cell {
  font-weight: bold;
  color: #909399;
}

.zx-table__cell--border,
.zx-table__header-cell.zx-table__cell--border {
  border-right: 2rpx solid #ebeef5;
  border-bottom: 2rpx solid #ebeef5;
}

.zx-table__row:hover {
  background-color: #f5f7fa;
}

.zx-table__row--stripe {
  background-color: #fafafa;
}

.zx-table__row--stripe:hover {
  background-color: #f5f7fa;
}

.zx-table__empty,
.zx-table__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60rpx 0;
  color: #909399;
}

.zx-table__empty-text,
.zx-table__loading-text {
  font-size: 28rpx;
}

.zx-table__loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 1;
}
</style>
