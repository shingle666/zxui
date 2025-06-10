<template>
  <view class="zx-charts__line-wrap" :style="{ width: width + 'rpx' }">
    <view class="zx-line__legend" v-if="legend.show">
      <view class="zx-line__legend-item" v-for="(item, index) in dataset" :key="index">
        <view class="zx-line__legend-circle" :style="{ backgroundColor: item.color }"></view>
        <text :style="{
          fontSize: (legend.size || 24) + 'rpx',
          lineHeight: (legend.size || 24) + 'rpx',
          color: legend.color || '#333',
        }">{{ item.name }}</text>
      </view>
    </view>
    <view class="zx-charts__line-box" v-if="xAxis.length > 0 && dataset.length > 0" :style="{ width: width + 'rpx' }">
      <scroll-view :scroll-x="scrollable" class="zx-line__scroll-view" :style="{ height: scrollViewH + 'rpx' }">
        <view :style="{ height: (xAxisVal.height || 48) + 'rpx' }"></view>
        <view class="zx-charts__line" :style="{ height: height + 'rpx' }">
          <view class="zx-line__item" :class="{ 'zx-line__flex-1': !scrollable }"
            :style="{ width: (xAxisLine.itemGap || 120) + 'rpx' }" v-for="(item, index) in xAxis" :key="index">
            <view class="zx-line__xAxis-text" :style="{
              color: xAxisLabel.color || '#333',
              fontSize: (xAxisLabel.size || 24) + 'rpx',
            }">
              {{ item }}
            </view>
            <view class="zx-yAxis__split-line" :style="{
              borderRightStyle: yAxisSplitLine.type || 'dashed',
              borderRightColor: yAxisSplitLine.color || '#e3e3e3',
            }" v-if="tooltipShow && index == activeIdx"></view>
            <view class="zx-xAxis__tickmarks" :style="{
              height: xAxisTick.height || '12rpx',
              backgroundColor: xAxisTick.color || '#e3e3e3',
            }"></view>
          </view>
          <view v-for="(dot, i) in dots" :key="dot.id">
            <view class="zx-charts__line-dot" :class="{ 'zx-charts__dot-enlarge': tooltipShow && j == activeIdx }"
              @tap.stop="dotClick(i, j)" v-for="(d, j) in dot.source" :key="d.id" :style="{
                bottom: d.y + 'rpx',
                left: d.x + 'rpx',
                width: (brokenDot.width || 12) + 'rpx',
                height: (brokenDot.width || 12) + 'rpx',
                borderColor: dot.color || brokenDot.color,
                background: brokenDot.color || dot.color,
              }">
              <text class="zx-line__val" :style="{
                fontSize: (xAxisVal.size || 24) + 'rpx',
                color: xAxisVal.color,
              }" v-if="xAxisVal.show">
                {{ getYAxisVal(i, j) }}
              </text>
            </view>
          </view>

          <view v-for="(line, idx) in lines" :key="line.id + idx">
            <view class="zx-charts__broken-line" v-for="(l, k) in line.source" :key="l.id + k" :style="{
              height: brokenLineHeight + 'px',
              background: line.color,
              bottom: l.y + 'rpx',
              left: l.x + 'rpx',
              width: l.width + 'rpx',
              '-webkit-transform': `rotate(${l.angle}deg)`,
              transform: `rotate(${l.angle}deg)`,
            }"></view>
          </view>
        </view>
      </scroll-view>
      <view class="zx-line__border-left" :style="{
        height: height + (xAxisVal.height || 48) + 'rpx',
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

    <view class="zx-line__tooltip" v-if="tooltip" :class="{ 'zx-line__tooltip-show': tooltipShow }">
      <view class="zx-tooltip__title">{{ xAxis[activeIdx] || "" }}</view>
      <view class="zx-line__tooltip-item" v-for="(item, index) in tooltips" :key="index">
        <view class="zx-line__legend-circle" :style="{ backgroundColor: item.color }"></view>
        <text class="zx-tooltip__val">{{ item.name }}</text>
        <text class="zx-tooltip__val zx-tooltip__val-ml">{{ item.val }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const emit = defineEmits(["click"]);
const props = defineProps({
  width: { type: [Number, String], default: 620 },
  legend: { type: Object, default: () => ({ show: false, size: 24, color: "#333" }) },
  tooltip: { type: Boolean, default: false },
  xAxis: { type: Array, default: () => [] },
  currentIndex: { type: Number, default: -1 },
  splitLine: { type: Object, default: () => ({ color: "#e3e3e3", type: "dashed" }) },
  xAxisTick: { type: Object, default: () => ({ height: "12rpx", color: "#e3e3e3" }) },
  xAxisLine: { type: Object, default: () => ({ color: "#e3e3e3", itemGap: 120 }) },
  xAxisLabel: { type: Object, default: () => ({ color: "#333", size: 24, height: 60 }) },
  xAxisVal: {
    type: Object,
    default: () => ({ show: true, color: "#333", size: 24, height: 48 }),
  },
  yAxisSplitLine: {
    type: Object,
    default: () => ({ color: "transparent", type: "dashed" }),
  },
  brokenDot: { type: Object, default: () => ({ width: 12, color: "#F8F8F8" }) },
  brokenLineHeight: { type: [Number, String], default: 1 },
  yAxis: { type: Array, default: () => [] },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  splitNumber: { type: Number, default: 20 },
  yAxisLine: { type: Object, default: () => ({ color: "#e3e3e3", itemGap: 60 }) },
  yAxisLabel: { type: Object, default: () => ({ show: true, color: "#333", size: 24 }) },
  scrollable: { type: Boolean, default: false },
});

const height = ref(0);
const scrollViewH = ref(0);
const sections = ref(0);
const yAxisData = ref([]);
const activeIndex = ref(-1);
const activeIdx = ref(props.currentIndex);
const tooltips = ref([]);
const tooltipShow = ref(false);
const timer = ref(null);
const dots = ref([]);
const lines = ref([]);
const dataset = ref([]);
const xAxisValFormatter = ref(null);
const maxValue = ref(1);

function getYAxisVal(idx, index) {
  let showVal = dataset.value[idx].source[index];
  if (props.xAxisVal.formatter && typeof props.xAxisVal.formatter === "function") {
    showVal = props.xAxisVal.formatter(showVal);
  } else if (xAxisValFormatter.value && typeof xAxisValFormatter.value === "function") {
    showVal = xAxisValFormatter.value(showVal);
  }
  return showVal;
}
function generateArray(start, end) {
  return Array.from(new Array(end + 1).keys()).slice(start);
}
function getValue(val) {
  return val < 0 ? 0 : val;
}
function getCoordinatePoint() {
  const xAxis = [...props.xAxis];
  const xSections = xAxis.length;
  const ySections = yAxisData.value.length - 1;
  const itemGap = props.scrollable
    ? props.xAxisLine.itemGap || 120
    : props.width / xSections;
  let dotsArr = [];
  let radius = (props.brokenDot.width || 12) / 2;
  dataset.value.map((item, index) => {
    let source = item.source || [];
    let dotArr = [];
    source.map((val, idx) => {
      dotArr.push({
        id: "d" + idx,
        x: getValue((0.5 + idx) * itemGap - radius),
        y: getValue(
          ((val - props.min) / (maxValue.value - props.min)) *
          (props.yAxisLine.itemGap || 60) *
          ySections -
          radius
        ),
      });
    });
    dotsArr.push({
      id: "dd" + index,
      color: item.color,
      source: dotArr,
    });
  });
  dots.value = dotsArr;
  drawLines(dotsArr);
}
function drawLines(dotsArr) {
  let linesArr = [];
  let radius = (props.brokenDot.width || 12) / 2;
  dotsArr.map((item, idx) => {
    let dotArr = item.source;
    let lineArr = [];
    dotArr.map((dot, index) => {
      if (!dotArr[index + 1]) return;
      const AB = {
        x: dotArr[index + 1].x - dot.x,
        y: dotArr[index + 1].y - dot.y,
        y1: dot.y - dotArr[index + 1].y,
      };
      const v = Math.sqrt(Math.pow(AB.x, 2) + Math.pow(AB.y, 2));
      const angle = Math.atan2(AB.y1, AB.x) * (180 / Math.PI);
      lineArr.push({
        id: "l" + index,
        x: dot.x + radius,
        y: dot.y + radius - 1,
        width: v,
        angle: AB.y1 > 0 ? Math.sqrt(Math.pow(angle, 2)) : -Math.sqrt(Math.pow(angle, 2)),
      });
    });
    linesArr.push({
      id: "ll" + idx,
      color: item.color,
      source: lineArr,
    });
  });
  lines.value = linesArr;
}
function init() {
  maxValue.value = props.max;
  let itemGap = props.yAxisLine.itemGap || 60;
  let sectionsNum = props.yAxis.length - 1;
  let yAxis = props.yAxis;
  if (sectionsNum <= 0) {
    sectionsNum = Math.ceil((props.max - props.min) / props.splitNumber);
    let sectionsArr = generateArray(0, sectionsNum);
    yAxis = sectionsArr.map((item) => {
      return { value: item * props.splitNumber + props.min };
    });
    maxValue.value = yAxis[yAxis.length - 1].value;
  }
  yAxisData.value = yAxis;
  sections.value = sectionsNum + 1;
  height.value = itemGap * sectionsNum;
  const valH = props.xAxisVal.height || 48;
  scrollViewH.value = height.value + (props.xAxisLabel.height || 60) + valH;
  getCoordinatePoint();
}
function draw(newDataset, formatter) {
  xAxisValFormatter.value = formatter || null;
  dataset.value = newDataset || [];
  init();
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
function dotClick(index, idx) {
  activeIndex.value = index;
  activeIdx.value = idx;
  tooltipHandle(idx);
  emit("click", {
    datasetIndex: index,
    sourceIndex: idx,
    ...dataset.value[index],
  });
}
onMounted(() => {
  init();
  activeIdx.value = props.currentIndex;
});
onBeforeUnmount(() => {
  clearTimer();
});
defineExpose({ draw });
</script>

<style scoped>
.zx-charts__line-wrap {
  position: relative;
  transform: rotate(0deg) scale(1);
  /* margin: 0 auto; */
}

.zx-line__legend {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.zx-line__legend-item {
  display: flex;
  align-items: center;
  margin-left: 24rpx;
  margin-bottom: 30rpx;
}

.zx-line__legend-circle {
  height: 20rpx;
  width: 20rpx;
  border-radius: 50%;
  margin-right: 8rpx;
  flex-shrink: 0;
}

.zx-charts__line-box {
  position: relative;
  padding-left: 1px;
  box-sizing: border-box;
  transform-origin: 0 0;
  overflow: visible;
  transform: scale(1);
}

.zx-line__scroll-view {
  position: relative;
  z-index: 10;
  box-sizing: border-box;
}

.zx-charts__line {
  min-width: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  /* overflow: hidden; */
  transform: rotate(0deg) scale(1);
}

.zx-line__between {
  justify-content: space-between;
}

.zx-line__item {
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  text-align: center;
  box-sizing: border-box;
  z-index: 10;
  transition: all 0.3s;
  flex-shrink: 0;
}

.zx-line__flex-1 {
  flex: 1;
}

.zx-xAxis__tickmarks {
  position: absolute;
  right: 0;
  width: 1px;
  transform: translateY(100%);
  bottom: 0;
}

.zx-yAxis__split-line {
  position: absolute;
  height: 100%;
  width: 0;
  border-right-width: 1px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
}

.zx-line__xAxis-text {
  width: 100%;
  position: absolute;
  left: 50%;
  bottom: 0;
  flex: 1;
  transform: translate(-50%, 100%);
  padding-top: 8rpx;
  word-break: break-all;
}

.zx-line__border-left {
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

.zx-charts__line-dot {
  position: absolute;
  border-radius: 50%;
  transition: all 0.3s;
  z-index: 12;
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */
}

.zx-line__val {
  width: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  padding-bottom: 12rpx;
  transform: translate(-50%, -100%);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  white-space: nowrap;
  z-index: 20;
}

.zx-charts__dot-enlarge {
  transform: scale(1.4);
}

.zx-charts__broken-line {
  position: absolute;
  transform-origin: 0 0;
  transition: all 0.3s;
  z-index: 10;
  border-color: transparent;
  box-sizing: border-box;
  /* transform: translateZ(0); */
  /* -webkit-backface-visibility:hidden; */
}

.zx-line__tooltip {
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

.zx-line__tooltip-show {
  visibility: visible;
  opacity: 1;
}

.zx-tooltip__title {
  font-size: 30rpx;
  color: #fff;
  line-height: 30rpx;
}

.zx-line__tooltip-item {
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
