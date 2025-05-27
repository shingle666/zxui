<template>
  <view class="zx-charts__scatter-wrap" :style="{ width: width + 'rpx' }">
    <view class="zx-scatter__legend" v-if="legend.show">
      <view class="zx-scatter__legend-item" v-for="(item, index) in dataset" :key="index">
        <view class="zx-legend__circle" :style="{ background: item.color }"></view>
        <text
          :style="{
            fontSize: (legend.size || 24) + 'rpx',
            lineHeight: (legend.size || 24) + 'rpx',
            color: legend.color || '#333',
          }"
          >{{ item.name }}</text
        >
      </view>
    </view>
    <view
      class="zx-charts__scatter-box"
      :style="{ width: width + 'rpx', height: height + 'rpx' }"
    >
      <view
        class="zx-xAxis__line"
        v-for="(item, index) in xAxisData"
        :key="item.id"
        :style="{
          left: index * (xAxisLine.itemGap || 100) + 'rpx',
          borderLeftStyle: index === 0 ? 'solid' : splitLine.type,
          borderLeftColor: index === 0 ? yAxisLine.color : splitLine.color,
        }"
      >
        <view
          class="zx-xAxis__tickmarks"
          :style="{
            height: xAxisTick.height || '12rpx',
            background: xAxisTick.color || '#e3e3e3',
          }"
        ></view>
        <view
          class="zx-xAxis__val"
          :style="{ color: xAxisLabel.color, fontSize: xAxisLabel.size + 'rpx' }"
        >
          {{ item.value }}
        </view>
      </view>
      <view
        class="zx-yAxis__line"
        v-for="(item, index) in yAxisData"
        :key="item.id"
        :style="{
          bottom: index * (yAxisLine.itemGap || 80) + 'rpx',
          borderBottomStyle: index === 0 ? 'solid' : splitLine.type,
          borderBottomColor: index === 0 ? xAxisLine.color : splitLine.color,
        }"
      >
        <view
          class="zx-yAxis__tickmarks"
          :style="{
            width: yAxisTick.width || '12rpx',
            background: yAxisTick.color || '#e3e3e3',
          }"
        ></view>
        <view
          class="zx-yAxis__val"
          :style="{ color: yAxisLabel.color, fontSize: yAxisLabel.size + 'rpx' }"
        >
          {{ item.value }}
        </view>
      </view>
      <view v-for="(item, index) in dataset" :key="item.id">
        <view
          @tap.stop="onDotTap(index, idx)"
          class="zx-scatter__item"
          :class="{
            'zx-scatter__item-active':
              activeIdx === idx && activeIndex === index && tooltipShow,
          }"
          v-for="(model, idx) in item.source"
          :key="idx"
          :style="{
            width: (item.width || 12) + 'rpx',
            height: (item.width || 12) + 'rpx',
            background: item.color || '#5677fc',
            left: model.x + 'rpx',
            bottom: model.y + 'rpx',
          }"
        ></view>
      </view>
    </view>
    <view
      class="zx-scatter__tooltip"
      v-if="tooltip"
      :class="{ 'zx-scatter__tooltip-show': tooltipShow }"
    >
      <view class="zx-tooltip__title"></view>
      <view class="zx-scatter__tooltip-item">
        <view class="zx-legend__circle" :style="{ background: tooltips.color }"></view>
        <text class="zx-tooltip__val">{{ tooltips.val }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const emit = defineEmits(["click"]);
const props = defineProps({
  legend: { type: Object, default: () => ({ show: false, size: 24, color: "#333" }) },
  tooltip: { type: Boolean, default: true },
  xAxis: { type: Object, default: () => ({ min: 0, max: 100, splitNumber: 20 }) },
  xAxisTick: { type: Object, default: () => ({ height: "12rpx", color: "#e3e3e3" }) },
  xAxisLine: { type: Object, default: () => ({ color: "#e3e3e3", itemGap: 100 }) },
  xAxisLabel: { type: Object, default: () => ({ color: "#333", size: 24 }) },
  yAxis: { type: Object, default: () => ({ min: 0, max: 100, splitNumber: 20 }) },
  yAxisLine: { type: Object, default: () => ({ color: "#e3e3e3", itemGap: 80 }) },
  yAxisTick: { type: Object, default: () => ({ width: "12rpx", color: "#e3e3e3" }) },
  yAxisLabel: { type: Object, default: () => ({ color: "#333", size: 24 }) },
  splitLine: { type: Object, default: () => ({ color: "#e3e3e3", type: "dashed" }) },
});

const width = ref(0);
const height = ref(0);
const xAxisData = ref([]);
const yAxisData = ref([]);
const activeIndex = ref(-1);
const activeIdx = ref(-1);
const dataset = ref([]);
const tooltips = ref({});
const tooltipShow = ref(false);
const timer = ref(null);

function generateArray(start, end) {
  return Array.from(new Array(end + 1).keys()).slice(start);
}
function init(ds, xAxisValFormatter) {
  let xTotal = props.xAxis.max - props.xAxis.min;
  let yTotal = props.yAxis.max - props.yAxis.min;
  let xSections = Math.ceil(xTotal / props.xAxis.splitNumber);
  let ySections = Math.ceil(yTotal / props.yAxis.splitNumber);
  let xSectionsArr = generateArray(0, xSections);
  let ySectionsArr = generateArray(0, ySections);
  xAxisData.value = xSectionsArr.map((item, index) => {
    let val = item * props.xAxis.splitNumber + props.xAxis.min;
    val = xAxisValFormatter ? xAxisValFormatter(val) : val;
    return {
      id: "x_" + index,
      value: val,
    };
  });
  yAxisData.value = ySectionsArr.map((item, idx) => {
    return {
      id: "y_" + idx,
      value: item * props.yAxis.splitNumber + props.yAxis.min,
    };
  });
  width.value = (props.xAxisLine.itemGap || 100) * xSections;
  height.value = (props.yAxisLine.itemGap || 80) * ySections;
  ds.map((item, i) => {
    item.id = "d_" + i;
    item.source = item.source.map((model) => {
      return {
        x: ((Number(model[0]) - props.xAxis.min) / xTotal) * width.value,
        y: ((Number(model[1]) - props.yAxis.min) / yTotal) * height.value,
        name: model[2],
        x1: model[0],
        y1: model[1],
      };
    });
  });
  dataset.value = ds;
}
function draw(ds, xAxisValFormatter) {
  ds = ds || [];
  init(ds, xAxisValFormatter);
}
function clearTimer() {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }
}
function tooltipHandle(index, idx) {
  let data = dataset.value[index];
  let item = data.source[idx];
  let tooltipsObj = {
    color: data.color,
    val: item.name || `${item.x1}，${item.y1}`,
  };
  tooltips.value = tooltipsObj;
  clearTimer();
  tooltipShow.value = true;
  timer.value = setTimeout(() => {
    tooltipShow.value = false;
  }, 5000);
}
function onDotTap(index, idx) {
  activeIndex.value = index;
  activeIdx.value = idx;
  tooltipHandle(index, idx);
  emit("click", {
    datasetIndex: index,
    sourceIndex: idx,
  });
}
onBeforeUnmount(() => {
  clearTimer();
});
defineExpose({ draw });
</script>

<style scoped>
.zx-charts__scatter-wrap {
  position: relative;
  font-weight: normal;
  margin-bottom: 60rpx;
}

.zx-charts__scatter-box {
  position: relative;
}

.zx-xAxis__line {
  position: absolute;
  left: 0;
  border-left-width: 1px;
  top: 0;
  bottom: 0;
  overflow: visible;
}

.zx-xAxis__tickmarks {
  width: 1px;
  position: absolute;
  left: -1px;
  bottom: 0;
  transform: translateY(100%);
}

.zx-yAxis__line {
  position: absolute;
  left: 0;
  border-bottom-width: 1px;
  bottom: 0;
  right: 0;
  overflow: visible;
}

.zx-yAxis__tickmarks {
  width: 12rpx;
  height: 1px;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(-100%);
  z-index: 10;
}

.zx-xAxis__val {
  position: absolute;
  left: 0;
  bottom: -16rpx;
  transform: translate(-50%, 100%);
}

.zx-yAxis__val {
  position: absolute;
  left: -16rpx;
  top: 0;
  transform: translate(-100%, -50%);
  z-index: 11;
}

.zx-scatter__item {
  border-radius: 50%;
  position: absolute;
  z-index: 12;
  left: 0;
  bottom: 0;
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */
  transform: translate(-50%, 50%) scale(1);
  transition: transform 0.3s;
}

.zx-scatter__item-active {
  transform: translate(-50%, 50%) scale(1.2);
}

.zx-scatter__legend {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.zx-scatter__legend-item {
  display: flex;
  align-items: center;
  margin-left: 24rpx;
  margin-bottom: 30rpx;
}

.zx-legend__circle {
  height: 20rpx;
  width: 20rpx;
  border-radius: 50%;
  margin-right: 8rpx;
  flex-shrink: 0;
}

.zx-scatter__tooltip {
  padding: 30rpx;
  border-radius: 12rpx;
  background-color: rgba(0, 0, 0, 0.6);
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  z-index: 20;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s;
}

.zx-scatter__tooltip-show {
  visibility: visible;
  opacity: 1;
}

.zx-scatter__tooltip-item {
  display: flex;
  align-items: center;
  white-space: nowrap;
  transform: scale(1);
}

.zx-tooltip__val {
  font-size: 24rpx;
  line-height: 24rpx;
  color: #fff;
  margin-left: 6rpx;
}
</style>
