<template>
	<view class="container">
		<view class="header">
			<text class="title">zx-transition 过渡动画</text>
		</view>
		
		<view class="section">
			<view class="section-title">基础动画</view>
			<view class="button-group">
				<button class="btn" @click="showFade = !showFade">淡入淡出</button>
				<button class="btn" @click="showFadeZoom = !showFadeZoom">缩放淡入</button>
				<button class="btn" @click="showRotate = !showRotate">旋转</button>
			</view>
			<view class="demo-box">
				<zx-transition :show="showFade" mode="fade">
					<view class="transition-box bg-blue">
						<text class="box-text">fade</text>
					</view>
				</zx-transition>
				
				<zx-transition :show="showFadeZoom" mode="fade-zoom">
					<view class="transition-box bg-green">
						<text class="box-text">fade-zoom</text>
					</view>
				</zx-transition>
				
				<zx-transition :show="showRotate" mode="rotate-zoom">
					<view class="transition-box bg-orange">
						<text class="box-text">rotate-zoom</text>
					</view>
				</zx-transition>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">滑动动画</view>
			<view class="button-group">
				<button class="btn" @click="direction = 'up'; toggleSlide()">上滑</button>
				<button class="btn" @click="direction = 'down'; toggleSlide()">下滑</button>
				<button class="btn" @click="direction = 'left'; toggleSlide()">左滑</button>
				<button class="btn" @click="direction = 'right'; toggleSlide()">右滑</button>
			</view>
			<view class="demo-box">
				<zx-transition :show="showSlide" :mode="`fade-${direction}`">
					<view class="transition-box bg-purple">
						<text class="box-text">fade-{{direction}}</text>
					</view>
				</zx-transition>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">动画参数</view>
			<view class="controls">
				<view class="control-item">
					<text>持续时间: {{duration}}ms</text>
					<slider :min="100" :max="2000" :step="100" :value="duration" @change="onDurationChange" show-value />
				</view>
				<view class="control-item">
					<text>动画函数:</text>
					<picker @change="onFunctionChange" :value="functionIndex" :range="functions">
						<view class="picker-view">{{functions[functionIndex]}}</view>
					</picker>
				</view>
			</view>
			<view class="button-group">
				<button class="btn" @click="showCustom = !showCustom">显示/隐藏</button>
			</view>
			<view class="demo-box">
				<zx-transition 
					:show="showCustom" 
					mode="fade-zoom" 
					:duration="duration" 
					:timingFunction="functions[functionIndex]"
					@beforeEnter="onBeforeEnter"
					@enter="onEnter"
					@afterEnter="onAfterEnter"
					@beforeLeave="onBeforeLeave"
					@leave="onLeave"
					@afterLeave="onAfterLeave"
				>
					<view class="transition-box bg-red">
						<text class="box-text">自定义参数</text>
					</view>
				</zx-transition>
			</view>
			<view class="event-log">
				<text class="log-title">事件日志:</text>
				<scroll-view scroll-y class="log-content">
					<text v-for="(log, index) in eventLogs" :key="index" class="log-item">{{log}}</text>
				</scroll-view>
				<button class="btn btn-small" @click="clearLog">清空日志</button>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">手动触发</view>
			<view class="button-group">
				<button class="btn" @click="triggerManual">手动触发动画</button>
			</view>
			<view class="demo-box">
				<zx-transition ref="manualTransition" mode="rotate">
					<view class="transition-box bg-cyan">
						<text class="box-text">手动触发</text>
					</view>
				</zx-transition>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">所有动画模式</view>
			<view class="mode-grid">
				<view class="mode-item" v-for="mode in allModes" :key="mode">
					<button class="btn btn-small" @click="showPreviewMode(mode)">{{mode}}</button>
				</view>
			</view>
			<view class="demo-box">
				<zx-transition :show="showPreview" :mode="previewMode">
					<view class="transition-box bg-gray">
						<text class="box-text">{{previewMode}}</text>
					</view>
				</zx-transition>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 基础动画
const showFade = ref(false);
const showFadeZoom = ref(false);
const showRotate = ref(false);

// 滑动动画
const showSlide = ref(false);
const direction = ref('up');
function toggleSlide() {
	showSlide.value = !showSlide.value;
}

// 自定义参数
const showCustom = ref(false);
const duration = ref(500);
const functions = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'step-start', 'step-end'];
const functionIndex = ref(1);

function onDurationChange(e) {
	duration.value = e.detail.value;
}

function onFunctionChange(e) {
	functionIndex.value = e.detail.value;
}

// 事件日志
const eventLogs = ref([]);
function addLog(message) {
	const now = new Date();
	const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
	eventLogs.value.push(`[${time}] ${message}`);
}

function clearLog() {
	eventLogs.value = [];
}

function onBeforeEnter() {
	addLog('beforeEnter');
}

function onEnter() {
	addLog('enter');
}

function onAfterEnter() {
	addLog('afterEnter');
}

function onBeforeLeave() {
	addLog('beforeLeave');
}

function onLeave() {
	addLog('leave');
}

function onAfterLeave() {
	addLog('afterLeave');
}

// 手动触发
const manualTransition = ref(null);
function triggerManual() {
	manualTransition.value.trigger();
}

// 预览所有模式
const allModes = [
	'fade', 'fade-up', 'fade-down', 'fade-left', 'fade-right',
	'slide-up', 'slide-down', 'slide-left', 'slide-right',
	'zoom', 'fade-zoom', 'rotate', 'rotate-zoom'
];
const showPreview = ref(false);
const previewMode = ref('fade');

function showPreviewMode(mode) {
	previewMode.value = mode;
	// 如果当前正在显示，先隐藏再显示
	if (showPreview.value) {
		showPreview.value = false;
		setTimeout(() => {
			showPreview.value = true;
		}, 50);
	} else {
		showPreview.value = true;
	}
}
</script>

<style lang="scss" scoped>
.container {
	padding: 20rpx;
}

.header {
	text-align: center;
	margin-bottom: 40rpx;
}

.title {
	font-size: 40rpx;
	font-weight: bold;
}

.section {
	margin-bottom: 40rpx;
	background-color: #ffffff;
	border-radius: 10rpx;
	padding: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	padding-bottom: 20rpx;
	border-bottom: 1rpx solid #eee;
	margin-bottom: 20rpx;
}

.button-group {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 20rpx;
}

.btn {
	margin: 10rpx;
	font-size: 28rpx;
	background-color: #2979ff;
	color: #ffffff;
}

.btn-small {
	padding: 0 20rpx;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 24rpx;
}

.demo-box {
	padding: 20rpx;
	min-height: 200rpx;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-bottom: 20rpx;
	border-radius: 10rpx;
	background-color: #f5f5f5;
}

.transition-box {
	width: 200rpx;
	height: 200rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10rpx;
}

.box-text {
	color: #ffffff;
	font-size: 28rpx;
	font-weight: bold;
}

.bg-blue {
	background-color: #2979ff;
}

.bg-green {
	background-color: #19be6b;
}

.bg-orange {
	background-color: #ff9900;
}

.bg-purple {
	background-color: #9c27b0;
}

.bg-red {
	background-color: #e51c23;
}

.bg-cyan {
	background-color: #00bcd4;
}

.bg-gray {
	background-color: #607d8b;
}

.controls {
	margin-bottom: 20rpx;
}

.control-item {
	margin-bottom: 20rpx;
}

.picker-view {
	padding: 20rpx;
	background-color: #f8f8f8;
	border-radius: 8rpx;
	border: 1rpx solid #ddd;
}

.event-log {
	margin-top: 30rpx;
	padding: 20rpx;
	background-color: #f8f8f8;
	border-radius: 10rpx;
}

.log-title {
	font-size: 28rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.log-content {
	height: 200rpx;
	margin-bottom: 10rpx;
}

.log-item {
	font-size: 24rpx;
	line-height: 1.5;
	display: block;
	color: #333;
}

.mode-grid {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 20rpx;
}

.mode-item {
	width: 25%;
	padding: 5rpx;
	box-sizing: border-box;
}
</style>
