<template>
  <view class="zx-charts__bar-wrap" :style="{ width: width + 'rpx' }">
    <view class="zx-bar__legend" v-if="legend.show">
      <view class="zx-bar__legend-item" v-for="(item, index) in dataset" :key="index">
        <view class="zx-legend__circle" :style="{ backgroundColor: item.color }"></view>
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
      class="zx-charts__bar-box"
      :style="{ borderLeftColor: yAxisLine.color, borderBottomColor: xAxisLineColor }"
      v-if="yAxis.length > 0 && dataset.length > 0"
    >
      <view
        class="zx-charts__bar-item"
        :class="{
          'zx-bar__item-stack': isStack,
          'zx-column__item-active': activeIndex === index && clickEffect == 1,
          'zx-column__bar-opacity': clickEffect == 2,
          'zx-column__bar-active': clickEffect == 2 && activeIndex == index,
        }"
        v-for="(item, index) in yAxis"
        :key="index"
        :style="{ padding: yAxisLine.itemPadding || '30rpx 0' }"
      >
        <view
          class="zx-charts__bar"
          :class="{ 'zx-charts__bar-round': columnCap === 'round' }"
          v-for="(bar, idx) in dataset"
          :key="idx"
          :style="{
            height: columnBarHeight + 'rpx',
            borderRightColor: getBarColor(
              bar.source[index],
              bar.color,
              bar.colorFormatter
            ),
            background: getBarColor(bar.source[index], bar.color, bar.colorFormatter),
            width:
              ((bar.source[index] - (isStack ? min / dataset.length : min)) /
                (maxValue - min)) *
                width +
              'rpx',
          }"
          @tap.stop="onBarTap(index, idx)"
        ></view>
        <view
          class="zx-bar__val"
          v-if="
            (yAxisVal.show && clickEffect != 2) ||
            (yAxisVal.show && clickEffect == 2 && activeIndex === index)
          "
          :style="{
            color: yAxisVal.color,
            fontSize: (yAxisVal.size || 24) + 'rpx',
            whiteSpace: yAxisVal.nowrap ? 'nowrap' : 'normal',
            left: getLeft(index),
          }"
        >
          {{ getXAxisVal(index) }}
        </view>
        <view
          class="zx-bar__yAxis-text"
          :style="{
            color: yAxisLabel.color || '#333',
            fontSize: (yAxisLabel.size || 24) + 'rpx',
          }"
        >
          {{ item }}
        </view>
        <view
          class="zx-yAxis__tickmarks"
          :style="{
            width: yAxisTick.width || '12rpx',
            backgroundColor: yAxisTick.color || '#e3e3e3',
          }"
        ></view>
      </view>
      <view class="zx-bar__yAxis-linebox">
        <view
          class="zx-bar__yAxis-line"
          :class="{ 'zx-yAxis__line-first': idx === 0 }"
          v-for="(item, idx) in xAxisData"
          :key="idx"
          :style="{ borderLeftStyle: splitLine.type, borderLeftColor: splitLine.color }"
        >
          <text
            class="zx-xAxis__val"
            :style="{
              color: item.color || xAxisLabel.color,
              fontSize: (xAxisLabel.size || 24) + 'rpx',
            }"
            v-if="xAxisLabel.show"
          >
            {{ item.value }}
          </text>
        </view>
      </view>
    </view>
    <view
      class="zx-column__tooltip"
      v-if="tooltip"
      :class="{ 'zx-column__tooltip-show': tooltipShow }"
    >
      <view class="zx-tooltip__title">{{ yAxis[activeIndex] || "" }}</view>
      <view
        class="zx-column__tooltip-item"
        v-for="(item, index) in tooltips"
        :key="index"
      >
        <view class="zx-legend__circle" :style="{ backgroundColor: item.color }"></view>
        <text class="zx-tooltip__val">{{ item.name }}</text>
        <text class="zx-tooltip__val zx-tooltip__val-ml">{{ item.val }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, watch, onBeforeUnmount, onMounted } from "vue";

// Define props with defaults
const props = defineProps({
  // Chart width in rpx
  width: {
    type: [Number, String],
    default: 600,
  },
  // Legend configuration
  legend: {
    type: Object,
    default: () => ({
      show: false,
      size: 24,
      color: "#333",
    }),
  },
  // Tooltip display
  tooltip: {
    type: Boolean,
    default: false,
  },
  // X-axis data
  xAxis: {
    type: Array,
    default: () => [],
  },
  // X-axis minimum value
  min: {
    type: Number,
    default: 0,
  },
  // X-axis maximum value
  max: {
    type: Number,
    default: 100,
  },
  // X-axis split number (increment)
  splitNumber: {
    type: Number,
    default: 20,
  },
  // Split line configuration
  splitLine: {
    type: Object,
    default: () => ({
      color: "#e3e3e3",
      type: "dashed",
    }),
  },
  // X-axis line color
  xAxisLineColor: {
    type: String,
    default: "#e3e3e3",
  },
  // X-axis label configuration
  xAxisLabel: {
    type: Object,
    default: () => ({
      show: true,
      color: "#333",
      size: 24,
    }),
  },
  // Y-axis data array
  yAxis: {
    type: Array,
    default: () => [],
  },
  // Column bar height
  columnBarHeight: {
    type: [Number, String],
    default: 32,
  },
  // Y-axis tick marks configuration
  yAxisTick: {
    type: Object,
    default: () => ({
      width: "12rpx",
      color: "#e3e3e3",
    }),
  },
  // Y-axis line configuration
  yAxisLine: {
    type: Object,
    default: () => ({
      color: "#e3e3e3",
      itemPadding: "30rpx 0",
    }),
  },
  // Y-axis label configuration
  yAxisLabel: {
    type: Object,
    default: () => ({
      show: true,
      color: "#333",
      size: 24,
    }),
  },
  // Y-axis value configuration
  yAxisVal: {
    type: Object,
    default: () => ({
      show: true,
      color: "#333",
      size: 24,
    }),
  },
  // Default selected Y-axis index
  currentIndex: {
    type: Number,
    default: -1,
  },
  // Stack display mode
  isStack: {
    type: Boolean,
    default: false,
  },
  // Click effect: 1-background, 2-highlight, 3-no effect
  clickEffect: {
    type: Number,
    default: 1,
  },
  // Column cap style: 'round' or 'square'
  columnCap: {
    type: String,
    default: "square",
  },
});

// Define emits
const emit = defineEmits(["click"]);

// Reactive state variables
const sections = ref(0);
const xAxisData = ref([]);
const activeIndex = ref(-1);
const activeIdx = ref(-1);
const tooltips = ref([]);
const tooltipShow = ref(false);
let timer = null;
const dataset = ref([]);
const yAxisValFormatter = ref(null);
const maxValue = ref(1);

// Initialize when created
onMounted(() => {
  init();
  activeIndex.value = props.currentIndex;
});

// Clean up timers before component is destroyed
onBeforeUnmount(() => {
  clearTimer();
});

// Watch for changes in xAxis or currentIndex
watch(
  () => props.xAxis,
  () => {
    init();
  },
  { deep: true }
);

watch(
  () => props.currentIndex,
  (newVal) => {
    if (newVal != activeIndex.value) {
      activeIndex.value = newVal;
    }
  }
);

// Helper function to generate array
const generateArray = (start, end) => {
  return Array.from(new Array(end + 1).keys()).slice(start);
};

// Get X-axis value for display
const getXAxisVal = (index) => {
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

  if (props.yAxisVal.formatter && typeof props.yAxisVal.formatter === "function") {
    showVal = props.yAxisVal.formatter(val);
  } else if (yAxisValFormatter.value && typeof yAxisValFormatter.value === "function") {
    showVal = yAxisValFormatter.value(val);
  }

  return showVal;
};

// Get bar color with formatter support
const getBarColor = (val, color, colorFormatter) => {
  let bgColor = color;

  if (colorFormatter && typeof colorFormatter === "function") {
    let formatColor = colorFormatter(val);
    if (formatColor) {
      bgColor = formatColor;
    }
  }

  return bgColor;
};

// Calculate left position for bar values
const getLeft = (index) => {
  let arr = [0];
  let total = 0;

  dataset.value.forEach((item) => {
    arr.push(item.source[index]);
    total += item.source[index];
  });

  return (
    (((props.isStack ? total : Math.max(...arr)) - props.min) /
      (maxValue.value - props.min)) *
      props.width +
    "rpx"
  );
};

// Initialize chart data
const init = () => {
  let sectionCount = props.xAxis.length - 1;
  let xAxisValues = props.xAxis;
  maxValue.value = props.max;

  if (sectionCount <= 0) {
    sectionCount = Math.ceil((props.max - props.min) / props.splitNumber);
    let sectionsArr = generateArray(0, sectionCount);

    xAxisValues = sectionsArr.map((item) => {
      return {
        value: item * props.splitNumber + props.min,
      };
    });
    maxValue.value = xAxisValues[xAxisValues.length - 1].value;
  }

  xAxisData.value = xAxisValues;
  sections.value = sectionCount + 1;
};

// Clear tooltip timer
const clearTimer = () => {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

// Handle tooltip display
const tooltipHandle = (index) => {
  let data = [...dataset.value];
  let tooltipItems = [];

  data.forEach((item) => {
    let color = item.color;
    if (item.colorFormatter && typeof item.colorFormatter === "function") {
      color = item.colorFormatter(item.source[index]);
    }
    tooltipItems.push({
      color: color,
      name: item.name,
      val: item.source[index],
    });
  });

  tooltips.value = tooltipItems;
  clearTimer();
  tooltipShow.value = true;

  timer = setTimeout(() => {
    tooltipShow.value = false;
  }, 5000);
};

// Bar tap event handler
const onBarTap = (index, idx) => {
  activeIndex.value = index;
  activeIdx.value = idx;
  tooltipHandle(index);

  emit("click", {
    datasetIndex: idx,
    sourceIndex: index,
    ...dataset.value[idx],
  });
};

// Draw chart with data
const draw = (chartDataset, formatter) => {
  yAxisValFormatter.value = formatter || null;
  dataset.value = chartDataset || [];
  init();
};

// Expose methods to parent components
defineExpose({
  draw,
});
</script>

<style scoped>
.zx-charts__bar-wrap {
  position: relative;
  margin: 0 auto;
}

.zx-bar__legend {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.zx-bar__legend-item {
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

.zx-charts__bar-box {
  position: relative;
  width: 100%;
  border-left: 1px solid;
  border-bottom: 1px solid;
  display: inline-flex;
  justify-content: space-between;
  flex-direction: column;
  z-index: 8;
}

.zx-charts__bar-item {
  position: relative;
  flex: 1;
  flex-shrink: 0;
  padding: 30rpx 0;
  display: inline-flex;
  flex-direction: column;
  z-index: 10;
  transition: all 0.3s;
}

.zx-bar__item-stack {
  flex-direction: row !important;
}

.zx-yAxis__tickmarks {
  position: absolute;
  width: 16rpx;
  height: 1px;
  background-color: #e3e3e3;
  left: 0;
  top: 0;
  transform: translateX(-100%);
  z-index: 10;
}

.zx-charts__bar {
  position: relative;
  transition: all 0.3s;
  text-align: center;
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  flex-shrink: 0;
}

.zx-column__bar-opacity {
  opacity: 0.6;
}

.zx-column__bar-active {
  opacity: 0.9999;
}

.zx-column__item-active {
  background-color: rgba(0, 0, 0, 0.1);
}

.zx-charts__bar-round {
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
}

.zx-bar__val {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  padding-left: 12rpx;
  word-break: break-all;
  flex-shrink: 0;
  transition: left 0.3s;
}

.zx-bar__yAxis-text {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 0;
  flex: 1;
  transform: translate(-100%, -50%);
  padding-right: 20rpx;
  word-break: break-all;
}

.zx-bar__yAxis-linebox {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 6;
}

.zx-bar__yAxis-line {
  height: 100%;
  width: 0;
  border-left: 1px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: visible;
}

.zx-yAxis__line-first {
  border-left: 0 !important;
}

.zx-xAxis__val {
  transform: translateY(100%);
  padding-top: 12rpx;
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
