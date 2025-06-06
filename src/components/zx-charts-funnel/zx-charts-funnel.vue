<template>
  <view class="zx-charts__funnel-wrap" :class="{ 'zx-charts__funnel-vertical': legend.direction !== 'vertical' }">
    <view class="zx-funnel__legend" :class="{ 'zx-legend__flex-column': legend.direction === 'vertical' }"
      v-if="legend.show">
      <view class="zx-funnel__legend-item" :style="{ marginLeft: legend.direction === 'vertical' ? '0' : '24rpx' }"
        v-for="(item, index) in dataset" :key="index">
        <view class="zx-legend__circle" :style="{ backgroundColor: item.color }"></view>
        <text :style="{
          fontSize: (legend.size || 24) + 'rpx',
          lineHeight: (legend.size || 24) + 'rpx',
          color: legend.color || '#333',
        }">{{ item.name }}</text>
      </view>
    </view>
    <view class="zx-charts-funnel" :style="{ width: w + 'px', height: h + 'px' }">
      <view class="zx-charts__funnel-item" :class="['zx-funnel__' + sort]" :style="{
        width: item.width + 'px',
        height: itemHeight + 'px',
        borderTopWidth: sort === 'desc' ? itemHeight + 'px' : 0,
        borderTopColor: sort === 'desc' ? item.color : 'transparent',
        borderBottomWidth: sort === 'asc' ? itemHeight + 'px' : 0,
        borderBottomColor: sort === 'asc' ? item.color : 'transparent',
        borderLeftWidth: item.diff + 'px',
        borderRightWidth: item.diff + 'px',
      }" v-for="(item, index) in dataset" :key="index" @tap.stop="itemClick(index)"></view>

      <view class="zx-funnel__tooltip" v-if="tooltip" :class="{ 'zx-funnel__tooltip-show': tooltipShow }">
        <view class="zx-tooltip__title" v-if="title">{{ title }}</view>
        <view class="zx-funnel__tooltip-item" :style="{ paddingTop: title ? '24rpx' : '0' }">
          <view class="zx-legend__circle" :style="{
            backgroundColor: dataset[activeIndex] && dataset[activeIndex].color,
          }"></view>
          <text class="zx-tooltip__val">{{
            dataset[activeIndex] && dataset[activeIndex].name
          }}</text>
          <text class="zx-tooltip__val zx-tooltip__val-ml">{{
            dataset[activeIndex] && dataset[activeIndex].value
          }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";

function ascSort(a, b) {
  return a.value - b.value;
}

function descSort(a, b) {
  return b.value - a.value;
}

const emit = defineEmits(["click"]);
const props = defineProps({
  //统计名称
  title: {
    type: String,
    default: "",
  },
  //总宽度 rpx
  width: {
    type: [Number, String],
    default: 400,
  },
  height: {
    type: [Number, String],
    default: 480,
  },
  //间距 rpx
  gap: {
    type: [Number, String],
    default: 4,
  },
  //图例，说明
  legend: {
    type: Object,
    default: () => ({
      show: true,
      size: 24,
      color: "#333",
      //horizontal、vertical
      direction: "horizontal",
    }),
  },
  tooltip: {
    type: Boolean,
    default: true,
  },
  //asc，desc
  sort: {
    type: String,
    default: "desc",
  },
});

const tooltips = ref([]);
const tooltipShow = ref(false);
const timer = ref(null);
const activeIndex = ref(-1);
const dataset = ref([]);
const itemHeight = ref(60);
const w = ref(200);
const h = ref(240);

function getPx(rpx) {
  let px = parseInt(uni.upx2px(Number(rpx)));
  return px % 2 === 0 ? px : px - 1;
}

function getEvenNum(px) {
  px = parseInt(px);
  return px % 2 === 0 ? px : px - 1;
}

function draw(data) {
  let dataList = JSON.parse(JSON.stringify(data));
  let sorted = dataList.sort(descSort);
  let width = getPx(props.width || 400);
  let height = getPx(props.height || 480);
  w.value = width;
  h.value = height;
  let len = sorted.length;
  let gap = Number(props.gap) * (len - 1);
  let max = Number(sorted[0].value);
  itemHeight.value = (height - getPx(gap)) / len;
  sorted.map((item, index) => {
    let itemW = index === 0 ? width : getEvenNum((Number(item.value) / max) * width);
    if (sorted[index + 1]) {
      let w1 = getEvenNum((Number(sorted[index + 1].value) / max) * width);
      item.diff = Math.abs(itemW - w1) / 2;
    } else {
      item.diff = itemW / 2;
    }
    item.width = itemW - (item.diff || 0) * 2;
  });
  if (props.sort === "asc") {
    dataset.value = sorted.sort(ascSort);
  } else {
    dataset.value = sorted;
  }
}

function clearTimer() {
  if (timer.value) {
    clearTimeout(timer.value);
    timer.value = null;
  }
}

function itemClick(index) {
  activeIndex.value = index;
  clearTimer();
  tooltipShow.value = true;
  timer.value = setTimeout(() => {
    tooltipShow.value = false;
  }, 5000);
  emit("click", {
    index: index,
    ...dataset.value[index],
  });
}

onBeforeUnmount(() => {
  clearTimer();
});

defineExpose({ draw });
</script>

<style scoped>
.zx-charts__funnel-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.zx-charts__funnel-vertical {
  flex-direction: column;
}

.zx-funnel__legend {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.zx-legend__flex-column {
  flex-direction: column;
  align-items: flex-start;
  margin-right: 40rpx;
}

.zx-funnel__legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
}

.zx-legend__circle {
  height: 20rpx;
  width: 20rpx;
  border-radius: 50%;
  margin-right: 8rpx;
  flex-shrink: 0;
}

.zx-charts-funnel {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.zx-charts__funnel-item {
  border-left-style: solid;
  border-left-color: transparent;
  border-right-style: solid;
  border-right-color: transparent;
  /* #ifdef H5 */
  cursor: pointer;
  /* #endif */
  position: relative;
}

.zx-funnel__asc {
  border-bottom-style: solid;
}

.zx-funnel__desc {
  border-top-style: solid;
}

.zx-funnel__tooltip {
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

.zx-funnel__tooltip-show {
  visibility: visible;
  opacity: 1;
}

.zx-tooltip__title {
  font-size: 30rpx;
  color: #fff;
  line-height: 30rpx;
  flex-shrink: 0;
}

.zx-funnel__tooltip-item {
  display: flex;
  align-items: center;
  white-space: nowrap;
}

.zx-tooltip__val {
  font-size: 24rpx;
  line-height: 24rpx;
  color: #fff;
  margin-left: 6rpx;
  white-space: nowrap;
}

.zx-tooltip__val-ml {
  margin-left: 20rpx;
}
</style>
