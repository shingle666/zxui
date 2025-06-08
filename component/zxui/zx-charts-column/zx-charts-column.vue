<template>
  <view class="zx-charts__column-wrap">
    <view class="zx-column__legend" v-if="legend.show">
      <view class="zx-column__legend-item" v-for="(item, index) in dataset" :key="index">
        <view class="zx-legend__circle" :style="{ backgroundColor: item.color }"></view>
        <text :style="{
          fontSize: (legend.size || 24) + 'rpx',
          lineHeight: (legend.size || 24) + 'rpx',
          color: legend.color || '#333',
        }">{{ item.name }}</text>
      </view>
    </view>
    <view class="zx-charts__column-box" v-if="xAxis.length > 0 && dataset.length > 0">
      <scroll-view :scroll-x="scrollable" class="zx-column__scroll-view" :style="{ height: scrollViewH + 'rpx' }">
        <view :style="{ height: (xAxisVal.height || 2) + 'rpx' }" v-if="xAxisVal.show"></view>
        <view class="zx-charts__column" :style="{ height: height + 'rpx' }">
          <view class="zx-column__item" :class="{
            'zx-column__flex-1': !scrollable,
            'zx-column__flex-column': isStack,
            'zx-column__item-active': activeIndex === index && clickEffect == 1,
            'zx-column__bar-opacity': clickEffect == 2,
            'zx-column__bar-active': clickEffect == 2 && activeIndex == index,
          }" :style="{ padding: scrollable ? xAxisLine.itemPadding || '0 30rpx' : '0' }"
            v-for="(item, index) in xAxis" :key="index">
            <view class="zx-column__val" v-if="
              (xAxisVal.show && clickEffect != 2) ||
              (xAxisVal.show && clickEffect == 2 && activeIndex === index)
            " :style="{
                color: xAxisVal.color,
                fontSize: (xAxisVal.size || 24) + 'rpx',
                whiteSpace: xAxisVal.nowrap ? 'nowrap' : 'normal',
              }">
              {{ getYAxisVal(index) }}
            </view>
            <view class="zx-column__bar" :class="{ 'zx-column__bar-round': columnCap === 'round' }"
              v-for="(bar, idx) in dataset" :key="idx" :style="{
                width: columnBarWidth + 'rpx',
                borderTopColor: getBarColor(
                  bar.source[index],
                  bar.color,
                  bar.colorFormatter
                ),
                background: getBarColor(bar.source[index], bar.color, bar.colorFormatter),
                height:
                  ((bar.source[index] - (isStack ? min / dataset.length : min)) /
                    splitNumber) *
                  (yAxisLine.itemGap || 60) +
                  'rpx',
              }" @tap.stop="onBarTap(index, idx)"></view>
            <view class="zx-column__xAxis-text" :style="{
              color: xAxisLabel.color || '#333',
              fontSize: (xAxisLabel.size || 24) + 'rpx',
            }">
              {{ item }}
            </view>
            <view class="zx-xAxis__tickmarks" :style="{
              height: xAxisTick.height || '12rpx',
              backgroundColor: xAxisTick.color || '#e3e3e3',
            }"></view>
          </view>
        </view>
      </scroll-view>
      <view class="zx-column__border-left" :style="{
        height: height + (xAxisVal.show ? xAxisVal.height || 2 : 0) + 'rpx',
        backgroundColor: yAxisLine.color || '#e3e3e3',
      }"></view>
      <view class="zx-xAxis__line" :class="{ 'zx-line__first': index === 0 }" :style="{
        bottom: index * (yAxisLine.itemGap || 60) + (xAxisLabel.height || 60) + 'rpx',
        borderTopStyle: index === 0 ? 'solid' : splitLine.type,
        borderTopColor: index === 0 ? xAxisLine.color : splitLine.color,
      }" v-for="(item, index) in yAxisData" :key="index">
        <text class="zx-yAxis__val" :style="{
          color: item.color || yAxisLabel.color,
          fontSize: (yAxisLabel.size || 24) + 'rpx',
        }" v-if="yAxisLabel.show">
          {{ item.value }}
        </text>
      </view>
    </view>
    <view class="zx-column__tooltip" v-if="tooltip" :class="{ 'zx-column__tooltip-show': tooltipShow }">
      <view class="zx-tooltip__title">{{ xAxis[activeIndex] || "" }}</view>
      <view class="zx-column__tooltip-item" v-for="(item, index) in tooltips" :key="index">
        <view class="zx-legend__circle" :style="{ backgroundColor: item.color }"></view>
        <text class="zx-tooltip__val">{{ item.name }}</text>
        <text class="zx-tooltip__val zx-tooltip__val-ml">{{ item.val }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

const emit = defineEmits(["click"]);
const props = defineProps({
  legend: { type: Object, default: () => ({ show: false, size: 24, color: "#333" }) },
  tooltip: { type: Boolean, default: false },
  xAxis: { type: Array, default: () => [] },
  currentIndex: { type: Number, default: -1 },
  columnBarWidth: { type: [Number, String], default: 32 },
  splitLine: { type: Object, default: () => ({ color: "#e3e3e3", type: "dashed" }) },
  xAxisTick: { type: Object, default: () => ({ height: "12rpx", color: "#e3e3e3" }) },
  xAxisLine: {
    type: Object,
    default: () => ({ color: "#e3e3e3", itemPadding: "0 30rpx" }),
  },
  xAxisLabel: { type: Object, default: () => ({ color: "#333", size: 24, height: 60 }) },
  xAxisVal: {
    type: Object,
    default: () => ({ show: false, color: "#333", size: 24, height: 60 }),
  },
  yAxis: { type: Array, default: () => [] },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  splitNumber: { type: Number, default: 20 },
  yAxisLine: { type: Object, default: () => ({ color: "#e3e3e3", itemGap: 60 }) },
  yAxisLabel: { type: Object, default: () => ({ show: true, color: "#333", size: 24 }) },
  scrollable: { type: Boolean, default: false },
  isStack: { type: Boolean, default: false },
  clickEffect: { type: Number, default: 1 },
  columnCap: { type: String, default: "square" },
});

const height = ref(0);
const scrollViewH = ref(0);
const sections = ref(0);
const yAxisData = ref([]);
const activeIndex = ref(-1);
const activeIdx = ref(-1);
const tooltips = ref([]);
const tooltipShow = ref(false);
const timer = ref(null);
const dataset = ref([]);
const xAxisValFormatter = ref(null);

watch(
  () => props.yAxis,
  () => {
    init();
  }
);
watch(
  () => props.currentIndex,
  (newVal) => {
    if (newVal != activeIndex.value) {
      activeIndex.value = newVal;
    }
  }
);

onMounted(() => {
  init();
  activeIndex.value = props.currentIndex;
});
onBeforeUnmount(() => {
  clearTimer();
});

function generateArray(start, end) {
  return Array.from(new Array(end + 1).keys()).slice(start);
}
function getYAxisVal(index) {
  let showVal = "";
  let val = 0;
  if (dataset.value.length === 1) {
    val = dataset.value[0].source[index];
    showVal = val;
  } else if (dataset.value.length > 1) {
    let arr = [];
    dataset.value.forEach((item) => {
      arr.push(item.source[index]);
    });
    val = arr;
  }
  if (props.xAxisVal.formatter && typeof props.xAxisVal.formatter === "function") {
    showVal = props.xAxisVal.formatter(val);
  } else if (xAxisValFormatter.value && typeof xAxisValFormatter.value === "function") {
    showVal = xAxisValFormatter.value(val);
  }
  return showVal;
}
function getBarColor(val, color, colorFormatter) {
  let bgColor = color;
  if (colorFormatter && typeof colorFormatter === "function") {
    let formatColor = colorFormatter(val);
    if (formatColor) {
      bgColor = formatColor;
    }
  }
  return bgColor;
}
function init() {
  let itemGap = props.yAxisLine.itemGap || 60;
  let sectionsNum = props.yAxis.length - 1;
  let yAxis = props.yAxis;
  if (sectionsNum <= 0) {
    sectionsNum = Math.ceil((props.max - props.min) / props.splitNumber);
    let sectionsArr = generateArray(0, sectionsNum);
    yAxis = sectionsArr.map((item) => {
      return { value: item * props.splitNumber + props.min };
    });
  }
  yAxisData.value = yAxis;
  sections.value = sectionsNum + 1;
  height.value = itemGap * sectionsNum;
  const valH = props.xAxisVal.show ? props.xAxisVal.height || 2 : 0;
  scrollViewH.value = height.value + (props.xAxisLabel.height || 60) + valH;
}
function clearTimer() {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }
}
function tooltipHandle(index) {
  let data = [...dataset.value];
  let tooltipsArr = [];
  data.forEach((item) => {
    let color = item.color;
    if (item.colorFormatter && typeof item.colorFormatter === "function") {
      color = item.colorFormatter(item.source[index]);
    }
    tooltipsArr.push({
      color: color,
      name: item.name,
      val: item.source[index],
    });
  });
  tooltips.value = tooltipsArr;
  clearTimer();
  tooltipShow.value = true;
  timer.value = setTimeout(() => {
    tooltipShow.value = false;
  }, 5000);
}
function onBarTap(index, idx) {
  activeIndex.value = index;
  activeIdx.value = idx;
  tooltipHandle(index);
  emit("click", {
    datasetIndex: idx,
    sourceIndex: index,
    ...dataset.value[idx],
  });
}
function draw(newDataset, formatter) {
  xAxisValFormatter.value = formatter || null;
  dataset.value = newDataset || [];
  init();
}
defineExpose({ draw });
</script>

<style scoped>
.zx-charts__column-wrap {
  position: relative;
  overflow: visible;
}

.zx-charts__column-box {
  position: relative;
  padding-left: 1px;
  box-sizing: border-box;
}

.zx-column__scroll-view {
  position: relative;
  z-index: 10;
  box-sizing: border-box;
}

.zx-charts__column {
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  position: relative;
}

.zx-column__between {
  justify-content: space-between;
}

.zx-column__item {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  text-align: center;
  box-sizing: border-box;
  z-index: 10;
  transition: all 0.3s;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}

.zx-column__bar-opacity {
  opacity: 0.6;
}

.zx-column__bar-active {
  /*这里请勿随意将值改为1*/
  opacity: 0.9999;
}

.zx-column__flex-1 {
  flex: 1;
}

.zx-column__item-active {
  background-color: rgba(0, 0, 0, 0.1);
  padding-top: 20rpx !important;
}

.zx-column__flex-column {
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}

.zx-xAxis__tickmarks {
  position: absolute;
  right: 0;
  width: 1px;
  transform: translateY(100%);
  bottom: 0;
}

.zx-column__bar {
  transition: all 0.3s;
  flex-shrink: 0;
  text-align: center;
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */
  /* border-top: 1px solid; */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}

.zx-column__bar-round {
  border-top-left-radius: 100px;
  border-top-right-radius: 100px;
}

.zx-column__val {
  width: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  padding-bottom: 12rpx;
  transform: translate(-50%, -100%);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  word-break: break-all;
}

.zx-column__xAxis-text {
  width: 100%;
  position: absolute;
  left: 50%;
  bottom: 0;
  flex: 1;
  transform: translate(-50%, 100%);
  padding-top: 8rpx;
  word-break: break-all;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}

.zx-column__border-left {
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  z-index: 11;
}

.zx-xAxis__line {
  width: 100%;
  height: 0;
  border-top-width: 1px;
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
}

.zx-line__first {
  z-index: 12;
}

.zx-yAxis__val {
  transform: translateX(-100%);
  padding-right: 12rpx;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
}

.zx-column__legend {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.zx-column__legend-item {
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

.zx-column__tooltip {
  padding: 30rpx;
  border-radius: 12rpx;
  background-color: rgba(0, 0, 0, 0.6);
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s;
}

.zx-column__tooltip-show {
  visibility: visible;
  opacity: 1;
}

.zx-tooltip__title {
  font-size: 30rpx;
  color: #fff;
  line-height: 30rpx;
}

.zx-column__tooltip-item {
  display: flex;
  align-items: center;
  padding-top: 24rpx;
  white-space: nowrap;
}

.zx-tooltip__val {
  font-size: 24rpx;
  line-height: 24rpx;
  color: #fff;
  margin-left: 6rpx;
}

.zx-tooltip__val-ml {
  margin-left: 20rpx;
}
</style>
