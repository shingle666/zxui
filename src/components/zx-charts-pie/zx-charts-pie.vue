<template>
	<view class="zx-charts__pie-wrap" :class="{ 'zx-charts__pie-vertical': legend.direction !== 'vertical' }">
		<view class="zx-pie__legend" :class="{ 'zx-legend__flex-column': legend.direction === 'vertical' }" v-if="legend.show">
			<view class="zx-pie__legend-item" :style="{ marginLeft: legend.direction === 'vertical' ? '0' : '24rpx' }" v-for="(item, index) in dataset" :key="index">
				<view class="zx-legend__circle" :style="{ backgroundColor: item.color }"></view>
				<text :style="{ fontSize: (legend.size || 24) + 'rpx', lineHeight: (legend.size || 24) + 'rpx', color: legend.color || '#333' }">{{ item.name }}</text>
			</view>
		</view>
		<view class="zx-charts__pie-box" :style="{ width: diam + 'rpx', height: diam + 'rpx', backgroundColor: backgroundColor }">
			<view
				class="zx-charts__pie-itembox"
				:style="{
					width: diam / 2 + 2 + 'rpx',
					height: diam + 'rpx',
					backgroundColor: item.angle > 180 ? item.color : 'transparent',
					zIndex: item.angle > 180 ? 10 : 'auto',
					clip: item.transformAngle > 180 ? `rect(0, ${diam / 2}rpx, ${diam}rpx, 0)` : 'auto'
				}"
				v-for="(item, index) in dataset"
				:key="index"
				@tap.stop="itemClick(index)"
			>
				<view
					class="zx-charts__pie-item"
					:style="{
						width: diam / 2 + 'rpx',
						height: diam + 'rpx',
						marginLeft: diam / 2 + 'rpx',
						'-webkit-transform': `rotate(${item.transformAngle}deg)`,
						transform: `rotate(${item.transformAngle}deg)`,
						backgroundColor: item.color
					}"
				></view>
			</view>
			<view
				class="zx-charts__pie-annular"
				v-if="type == 2"
				:style="{ width: annular.width + 'rpx', height: annular.width + 'rpx', backgroundColor: annular.backgroundColor }"
			></view>
		</view>
		<view class="zx-pie__tooltip" v-if="tooltip" :class="{ 'zx-pie__tooltip-show': tooltipShow }">
			<view class="zx-tooltip__title" v-if="title">{{ title }}</view>
			<view class="zx-pie__tooltip-item" :style="{ paddingTop: title ? '24rpx' : '0' }">
				<view class="zx-legend__circle" :style="{ backgroundColor: dataset[activeIndex] && dataset[activeIndex].color }"></view>
				<text class="zx-tooltip__val">{{ dataset[activeIndex] && dataset[activeIndex].name }}</text>
				<text class="zx-tooltip__val zx-tooltip__val-ml">{{ dataset[activeIndex] && dataset[activeIndex].value }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, defineProps, defineEmits, onBeforeUnmount, defineExpose } from 'vue';

const emit = defineEmits(['click']);
const props = defineProps({
	title: { type: String, default: '' },
	diam: { type: Number, default: 400 },
	backgroundColor: { type: String, default: 'transparent' },
	legend: { type: Object, default: () => ({ show: true, size: 24, color: '#333', direction: 'horizontal' }) },
	tooltip: { type: Boolean, default: true },
	type: { type: Number, default: 1 },
	annular: { type: Object, default: () => ({ width: 200, backgroundColor: '#f8f8f8' }) }
});

const tooltips = ref([]);
const tooltipShow = ref(false);
const timer = ref(null);
const activeIndex = ref(-1);
const dataset = ref([]);

function getTotalVal(data) {
	let val = 0;
	data.forEach((item) => {
		val += item.value;
	});
	return val;
}
function init(data) {
	let pieData = [...data];
	const total = getTotalVal(pieData);
	let totalAngle = 0;
	pieData.map((item) => {
		item.transformAngle = totalAngle;
		item.angle = Number(((item.value / total) * 360).toFixed(1));
		totalAngle += item.angle;
	});
	dataset.value = pieData;
}
function draw(data) {
	init(data);
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
	emit('click', {
		index: index,
		...dataset.value[index]
	});
}
onBeforeUnmount(() => {
	clearTimer();
});
defineExpose({ draw });
</script>

<style scoped>
.zx-charts__pie-wrap {
	position: relative;
	display: inline-flex;
	align-items: center;
}

.zx-charts__pie-vertical {
	flex-direction: column;
}

.zx-pie__legend {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}

.zx-legend__flex-column {
	flex-direction: column;
	margin-right: 40rpx;
}

.zx-pie__legend-item {
	display: flex;
	align-items: center;
	margin-bottom: 40rpx;
}

.zx-legend__circle {
	height: 20rpx;
	width: 20rpx;
	border-radius: 50%;
	margin-right: 8rpx;
	flex-shrink: 0;
}

.zx-charts__pie-box {
	position: relative;
	border-radius: 50%;
	overflow: hidden;
	transform: rotate(0deg) translateZ(0);
	flex-shrink: 0;
	font-size: 0;
}

.zx-charts__pie-itembox {
	position: absolute;
	left: 0;
	top: 0;
	/* #ifdef H5 */
	cursor: pointer;
	/* #endif */
}

.zx-charts__pie-item {
	transform-origin: 0 50%;
	/* #ifdef H5 */
	cursor: pointer;
	/* #endif */
	position: relative;
	z-index: 10;
	margin-top: 0;
	margin-bottom: 0;
	margin-right: 0;
	/* transform-style:preserve-3d; */
	/* transition: all 0.3s; */
}

.zx-charts__pie-annular {
	border-radius: 50%;
	left: 50%;
	top: 50%;
	position: absolute;
	z-index: 12;
	transform: translate(-50%, -50%);
	display: flex;
	align-items: center;
	justify-content: center;
}

.zx-pie__tooltip {
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

.zx-pie__tooltip-show {
	visibility: visible;
	opacity: 1;
}

.zx-tooltip__title {
	font-size: 30rpx;
	color: #fff;
	line-height: 30rpx;
	flex-shrink: 0;
}

.zx-pie__tooltip-item {
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
