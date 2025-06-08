<template>
  <view class="zx-picker-view-container">
    <picker-view class="zx-picker-view" :indicator-style="indicatorStyle" :indicator-class="indicatorClass"
      :mask-style="maskStyle" :mask-class="maskClass" :value="value" :immediate-change="immediateChange"
      @change="onChange" @pickstart="onPickStart" @pickend="onPickEnd" :style="pickerViewStyle">
      <picker-view-column v-for="(column, columnIndex) in columns" :key="columnIndex" class="zx-picker-view__column">
        <view v-for="(item, itemIndex) in column" :key="itemIndex" class="zx-picker-view__column-item"
          :style="itemStyle">
          {{ getItemText(item) }}
        </view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

/**
 * zx-picker-view
 * @description 嵌入页面的滚动选择器。
 * @property {Array} value 数组中的数字依次表示 picker-view 内的 picker-view-column 选择的第几项（下标从 0 开始），数字大于 picker-view-column 可选项长度时，选择最后一项。
 * @property {Array} columns 对象数组，设置每一列的数据。格式：[[{text: '北京'}, {text: '上海'}], [{text: '男'}, {text: '女'}]]
 * @property {String} keyName 选项对象中，需要展示的属性键名（默认 'text' ）
 * @property {String} itemHeight 各列中，单个选项的高度, 单位rpx (默认 '88rpx' )。
 * @property {String | Number} visibleItemCount 每列中可见选项的数量（默认 5 ）。
 * @property {String} indicatorStyle 设置选择器中间选中框的样式。
 * @property {String} indicatorClass 设置选择器中间选中框的类名。
 * @property {String} maskStyle 设置蒙层的样式。
 * @property {String} maskClass 设置蒙层的类名。
 * @property {Boolean} immediateChange 是否在手指松开时立即触发 change 事件。若不开启则会在滚动动画结束后触发 change 事件。（微信小程序 2.21.1+ 支持）
 * @event {Function} change 当滚动选择，value 改变时触发 change 事件，event.detail = {value: value}；value为数组，表示 picker-view 内的 picker-view-column 当前选择的是第几项（下标从 0 开始）。
 * @event {Function} pickstart 当滚动选择开始时候触发事件。（微信小程序2.3.1、快手小程序支持）
 * @event {Function} pickend 当滚动选择结束时候触发事件。（微信小程序2.3.1、快手小程序支持）
 */

const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  },
  keyName: {
    type: String,
    default: 'text'
  },
  itemHeight: {
    type: String,
    default: '88rpx'
  },
  visibleItemCount: {
    type: [String, Number],
    default: 5
  },
  indicatorStyle: {
    type: String,
    default: 'height: 88rpx;'
  },
  indicatorClass: {
    type: String,
    default: ''
  },
  maskStyle: {
    type: String,
    default: ''
  },
  maskClass: {
    type: String,
    default: ''
  },
  immediateChange: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['change', 'pickstart', 'pickend']);

const pickerViewStyle = computed(() => {
  const height = parseInt(props.itemHeight) * Number(props.visibleItemCount);
  return `height: ${height}rpx;`;
});

const itemStyle = computed(() => {
  return `height: ${props.itemHeight}; line-height: ${props.itemHeight};`;
});

const getItemText = (item) => {
  if (typeof item === 'object' && item !== null && props.keyName in item) {
    return item[props.keyName];
  }
  return item;
};

const onChange = (event) => {
  emit('change', event.detail.value);
};

const onPickStart = (event) => {
  emit('pickstart', event);
};

const onPickEnd = (event) => {
  emit('pickend', event);
};

</script>

<style lang="scss" scoped>
.zx-picker-view-container {
  width: 100%;
}

.zx-picker-view {
  width: 100%;
}

.zx-picker-view__column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.zx-picker-view__column-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 32rpx;
  color: #333;
}
</style>
