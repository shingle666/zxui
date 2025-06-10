<template>
  <view class="zx-table-v2" :style="tableStyle">
    <!-- Header -->
    <view class="zx-table-v2__header-wrapper" :style="headerWrapperStyle" v_if="columns.length > 0">
      <view class="zx-table-v2__header" :style="headerStyle">
        <view v-for="(column, colIndex) in columns" :key="`header-${column.key || colIndex}`"
          class="zx-table-v2__header-cell" :style="getHeaderCellStyle(column)"
          @click="handleHeaderClick(column, colIndex)">
          <template v-if="column.renderHeader">
            <component :is="column.renderHeader({ column, columnIndex: colIndex })" />
          </template>
          <template v-else>
            {{ column.title }}
          </template>
        </view>
      </view>
    </view>

    <!-- Body -->
    <scroll-view class="zx-table-v2__body-wrapper" :scroll-y="true" :scroll-x="true" :style="bodyWrapperStyle"
      @scroll="handleScroll" :scroll-top="scrollTop" :scroll-left="scrollLeft">
      <view class="zx-table-v2__body" :style="bodyStyle">
        <view class="zx-table-v2__virtual-list-phantom" :style="phantomStyle"></view>
        <view class="zx-table-v2__virtual-list" :style="virtualListStyle">
          <view v-for="(item, rowIndex) in visibleData" :key="item.originalIndex + rowIndex" class="zx-table-v2__row"
            :class="getRowClass(item.originalIndex)" :style="getRowStyle(item.originalIndex)"
            @click="handleRowClick(item.rowData, item.originalIndex)">
            <view v-for="(column, colIndex) in columns" :key="`cell-${item.originalIndex}-${column.key || colIndex}`"
              class="zx-table-v2__cell" :style="getCellStyle(column, item.rowData, item.originalIndex, colIndex)">
              <template v-if="column.renderCell">
                <component
                  :is="column.renderCell({ row: item.rowData, column, rowIndex: item.originalIndex, columnIndex: colIndex })" />
              </template>
              <template v-else>
                {{ getCellValue(item.rowData, column) }}
              </template>
            </view>
          </view>
        </view>
      </view>

      <view v-if="loading" class="zx-table-v2__loading">
        <view class="zx-table-v2__loading-indicator">加载中...</view>
      </view>
      <view v-if="!loading && data.length === 0 && emptyText" class="zx-table-v2__empty">
        {{ emptyText }}
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick, h } from 'vue';

const props = defineProps({
  columns: { type: Array, default: () => [] }, // { key, dataKey, title, width, minWidth, align, fixed, renderCell, renderHeader, sortable }
  data: { type: Array, default: () => [] },
  width: { type: [Number, String], default: '100%' }, // rpx or px or %
  height: { type: [Number, String], default: 300 }, // rpx or px
  rowHeight: { type: [Number, String], default: 50 }, // rpx or px, for virtual scroll calculation
  headerHeight: { type: [Number, String], default: 50 }, // rpx or px
  fixed: { type: Boolean, default: false }, // currently only for fixed header
  rowKey: { type: String, default: 'id' },
  border: { type: Boolean, default: false },
  stripe: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  emptyText: { type: String, default: '暂无数据' },
  // showScrollbar: { type: Boolean, default: false } // Native scrollbar, not custom
});

const emits = defineEmits(['row-click', 'header-click', 'scroll']);

const tableContentWidth = computed(() => {
  return props.columns.reduce((sum, col) => sum + uni.upx2px(col.width || col.minWidth || 100), 0);
});

const parseUnit = (value) => {
  if (typeof value === 'string') {
    if (value.endsWith('rpx')) return uni.upx2px(parseInt(value));
    if (value.endsWith('px')) return parseInt(value);
    if (value.endsWith('%')) {
      // Percentage width needs a parent context, for now, treat as direct px if no better way
      // This might need adjustment based on how parent width is obtained in uniapp
      // For simplicity, if it's 100%, we might try to get parent width, otherwise it's tricky
      return parseInt(value); // Placeholder, % handling can be complex
    }
  }
  return Number(value) || 0;
};

const actualTableWidth = computed(() => parseUnit(props.width));
const actualTableHeight = computed(() => parseUnit(props.height));
const actualRowHeight = computed(() => parseUnit(props.rowHeight));
const actualHeaderHeight = computed(() => props.columns.length > 0 ? parseUnit(props.headerHeight) : 0);

const tableStyle = computed(() => ({
  width: typeof props.width === 'string' && props.width.endsWith('%') ? props.width : `${actualTableWidth.value}px`,
  height: `${actualTableHeight.value}px`,
}));

const headerWrapperStyle = computed(() => ({
  height: `${actualHeaderHeight.value}px`,
  overflow: 'hidden', // Hide horizontal scrollbar for header, sync with body scroll
  width: '100%',
}));

const headerStyle = computed(() => ({
  width: `${tableContentWidth.value}px`,
  height: `${actualHeaderHeight.value}px`,
  display: 'flex',
  transform: `translateX(-${scrollLeft.value}px)` // Sync with body scroll
}));

const bodyWrapperStyle = computed(() => ({
  height: `calc(100% - ${actualHeaderHeight.value}px)`,
  overflow: 'auto', // Enables native scrollbars
}));

const bodyStyle = computed(() => ({
  width: `${tableContentWidth.value}px`,
  position: 'relative',
  // height will be set by phantom
}));

// Virtual Scroll state
const scrollTop = ref(0);
const scrollLeft = ref(0);
const startIndex = ref(0);
const endIndex = ref(0);
const screenHeight = computed(() => actualTableHeight.value - actualHeaderHeight.value);
const bufferCount = 5; // Number of items to render outside visible area

const visibleCount = computed(() => {
  return Math.ceil(screenHeight.value / actualRowHeight.value) + bufferCount * 2;
});

const phantomStyle = computed(() => ({
  height: `${props.data.length * actualRowHeight.value}px`,
}));

const virtualListStyle = computed(() => ({
  transform: `translateY(${startIndex.value * actualRowHeight.value}px)`,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
}));

const visibleData = computed(() => {
  return props.data.slice(startIndex.value, endIndex.value).map((rowData, index) => ({
    rowData,
    originalIndex: startIndex.value + index,
  }));
});

function updateVisibleRange(currentScrollTop) {
  const newStartIndex = Math.max(0, Math.floor(currentScrollTop / actualRowHeight.value) - bufferCount);
  const newEndIndex = Math.min(props.data.length, newStartIndex + visibleCount.value + bufferCount);

  if (newStartIndex !== startIndex.value || newEndIndex !== endIndex.value) {
    startIndex.value = newStartIndex;
    endIndex.value = newEndIndex;
  }
}

const handleScroll = (event) => {
  const { scrollTop: newScrollTop, scrollLeft: newScrollLeft, scrollHeight, scrollWidth } = event.detail;
  scrollTop.value = newScrollTop;
  scrollLeft.value = newScrollLeft; // For horizontal scroll sync
  updateVisibleRange(newScrollTop);
  emits('scroll', event.detail);
};

watch(() => props.data, () => {
  updateVisibleRange(scrollTop.value);
  // Reset scroll to top if data changes significantly, or handle as needed
  // scrollTop.value = 0; 
  // nextTick(() => updateVisibleRange(0));
}, { deep: true });

watch(() => [props.height, props.rowHeight], () => {
  nextTick(() => {
    updateVisibleRange(scrollTop.value);
  });
});

onMounted(() => {
  updateVisibleRange(0);
});

// Styles and Class getters
const getHeaderCellStyle = (column) => ({
  width: `${uni.upx2px(column.width || column.minWidth || 100)}px`,
  minWidth: column.minWidth ? `${uni.upx2px(column.minWidth)}px` : undefined,
  textAlign: column.align || 'left',
  lineHeight: `${actualHeaderHeight.value}px`,
  padding: '0 8px',
  boxSizing: 'border-box',
  borderRight: props.border ? '1px solid #e0e0e0' : 'none',
  borderBottom: '1px solid #e0e0e0',
  backgroundColor: '#f5f5f5',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const getRowStyle = (rowIndex) => ({
  height: `${actualRowHeight.value}px`,
  display: 'flex',
  backgroundColor: props.stripe && rowIndex % 2 !== 0 ? '#fafafa' : '#ffffff',
});

const getRowClass = (rowIndex) => ({
  'zx-table-v2__row--stripe': props.stripe && rowIndex % 2 !== 0,
});

const getCellStyle = (column, rowData, rowIndex, colIndex) => ({
  width: `${uni.upx2px(column.width || column.minWidth || 100)}px`,
  minWidth: column.minWidth ? `${uni.upx2px(column.minWidth)}px` : undefined,
  textAlign: column.align || 'left',
  lineHeight: `${actualRowHeight.value}px`,
  padding: '0 8px',
  boxSizing: 'border-box',
  borderRight: props.border && colIndex < props.columns.length - 1 ? '1px solid #e8eaec' : 'none',
  borderBottom: '1px solid #e8eaec',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const getCellValue = (row, column) => {
  return column.dataKey.split('.').reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : '', row);
};

// Event handlers
const handleRowClick = (row, rowIndex) => {
  emits('row-click', row, props.columns[0], event); // Assuming first column for now, or pass undefined
};

const handleHeaderClick = (column, colIndex) => {
  emits('header-click', column, event);
};

// Expose methods if needed via defineExpose
// defineExpose({});

</script>

<style lang="scss" scoped>
.zx-table-v2 {
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0; // Outer border
  box-sizing: border-box;
  overflow: hidden; // Important for layout

  &__header-wrapper {
    flex-shrink: 0;
    position: relative; // For potential absolute positioned elements inside
  }

  &__header {
    display: flex;
    font-weight: bold;
    background-color: #f8f8f9;
  }

  &__header-cell {

    // Shared styles in JS, specific overrides here if needed
    &:last-child {
      border-right: none; // Remove last cell's right border if global border is on
    }
  }

  &__body-wrapper {
    flex-grow: 1;
    overflow: auto; // This enables native scrollbars
    position: relative; // For phantom and virtual list positioning
    -webkit-overflow-scrolling: touch; // Smooth scrolling on iOS
  }

  &__body {
    // width is set by JS (tableContentWidth)
    // height is set by phantomStyle
  }

  &__virtual-list-phantom {
    // height set by JS, purely for scrollbar calculation
  }

  &__virtual-list {
    // transform set by JS
  }

  &__row {
    display: flex;
    width: 100%; // Ensure row takes full width of its container (the virtual list item)
    border-bottom: 1px solid #e8eaec; // Default row separator
    box-sizing: border-box;

    &:last-child {
      border-bottom: none;
    }
  }

  &__row--stripe {
    // background-color is set by JS
  }

  &__cell {

    // Shared styles in JS, specific overrides here if needed
    &:last-child {
      border-right: none; // Remove last cell's right border if global border is on
    }
  }

  &__loading,
  &__empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #909399;
    font-size: 14px;
  }

  &__loading-indicator {
    // Basic loading text, can be replaced with a spinner component
  }
}

// Hide scrollbar by default for a cleaner look, rely on touch scrolling
// Users can add ::-webkit-scrollbar { display: none; } in global style if needed for all platforms
// Or we can make it conditional based on a prop
.zx-table-v2__body-wrapper::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.zx-table-v2__body-wrapper::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.zx-table-v2__body-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
}
</style>