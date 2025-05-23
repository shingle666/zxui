<template>
	<view class="page">
		<!-- 页面标题 -->
		<view class="page-header">
			<text class="page-title">zx-swiper 轮播组件</text>
			<text class="page-desc">功能丰富的轮播组件，支持图片、视频、自定义内容</text>
		</view>

		<scroll-view scroll-y class="page-body">
			<!-- 基础轮播图 -->
			<view class="demo-section">
				<view class="section-title">
					<text class="title-text">基础轮播图</text>
					<text class="title-desc">最简单的图片轮播使用方式</text>
				</view>
				<view class="demo-wrapper">
					<zx-swiper
						ref="basicSwiperRef"
						:list="imageList"
						:height="'400rpx'"
						:autoplay="true"
						:interval="3000"
						:indicator="true"
						@change="onSwiperChange"
						@click="onSwiperClick"
					/>
				</view>
			</view>

			<!-- 带标题的轮播图 -->
			<view class="demo-section">
				<view class="section-title">
					<text class="title-text">带标题轮播</text>
					<text class="title-desc">显示图片标题信息</text>
				</view>
				<view class="demo-wrapper">
					<zx-swiper
						:list="imageListWithTitle"
						:height="'400rpx'"
						:show-title="true"
						:autoplay="false"
						:indicator-mode="'line'"
						:indicator-active-color="'#007aff'"
						:indicator-inactive-color="'rgba(0,122,255,0.3)'"
					/>
				</view>
			</view>

			<!-- 视频轮播 -->
			<view class="demo-section">
				<view class="section-title">
					<text class="title-text">视频轮播</text>
					<text class="title-desc">支持视频播放和控制</text>
				</view>
				<view class="demo-wrapper">
					<zx-swiper
						:list="videoList"
						:height="'300rpx'"
						:autoplay="false"
						:video-controls="true"
						:video-muted="true"
						@video-play="onVideoPlay"
						@video-pause="onVideoPause"
						@video-ended="onVideoEnded"
					/>
				</view>
			</view>

			<!-- 纵向轮播 -->
			<view class="demo-section">
				<view class="section-title">
					<text class="title-text">纵向轮播</text>
					<text class="title-desc">垂直方向滑动切换</text>
				</view>
				<view class="demo-wrapper">
					<zx-swiper
						:list="imageList"
						:height="'300rpx'"
						:vertical="true"
						:autoplay="true"
						:interval="2500"
						:indicator-style="{ right: '20rpx' }"
					/>
				</view>
			</view>

			<!-- 多项显示 -->
			<view class="demo-section">
				<view class="section-title">
					<text class="title-text">多项显示</text>
					<text class="title-desc">同时显示多个轮播项</text>
				</view>
				<view class="demo-wrapper">
					<zx-swiper
						:list="imageList"
						:height="'200rpx'"
						:display-multiple-items="2"
						:previous-margin="'30rpx'"
						:next-margin="'30rpx'"
						:autoplay="false"
						:radius="'20rpx'"
					/>
				</view>
			</view>

			<!-- 自定义内容轮播 -->
			<view class="demo-section">
				<view class="section-title">
					<text class="title-text">自定义内容</text>
					<text class="title-desc">使用插槽自定义轮播内容</text>
				</view>
				<view class="demo-wrapper">
					<zx-swiper
						:list="customList"
						:height="'300rpx'"
						:autoplay="false"
					>
						<template #item="{ item, index }">
							<view class="custom-item" :style="{ backgroundColor: item.color }">
								<view class="custom-icon">{{ item.icon }}</view>
								<text class="custom-text">{{ item.text }}</text>
								<text class="custom-desc">{{ item.desc }}</text>
								<text class="custom-index">{{ index + 1 }}/{{ customList.length }}</text>
							</view>
						</template>
					</zx-swiper>
				</view>
			</view>

			<!-- 自定义指示器 -->
			<view class="demo-section">
				<view class="section-title">
					<text class="title-text">自定义指示器</text>
					<text class="title-desc">使用插槽自定义指示器样式</text>
				</view>
				<view class="demo-wrapper">
					<zx-swiper
						:list="imageList"
						:height="'300rpx'"
						:autoplay="true"
						:indicator="false"
					>
						<template #indicator="{ current, total }">
							<view class="custom-indicator">
								<text class="indicator-text">{{ current + 1 }} / {{ total }}</text>
							</view>
						</template>
					</zx-swiper>
				</view>
			</view>

			<!-- 控制按钮演示 -->
			<view class="demo-section">
				<view class="section-title">
					<text class="title-text">编程式控制</text>
					<text class="title-desc">通过方法控制轮播行为</text>
				</view>
				<view class="demo-wrapper">
					<zx-swiper
						ref="controlSwiperRef"
						:list="imageList"
						:height="'300rpx'"
						:autoplay="false"
						:current="controlCurrent"
					/>
					<view class="control-buttons">
						<button @click="switchToPrev" class="control-btn prev-btn">
							<text class="btn-icon">←</text>
							<text class="btn-text">上一张</text>
						</button>
						<button @click="switchToNext" class="control-btn next-btn">
							<text class="btn-icon">→</text>
							<text class="btn-text">下一张</text>
						</button>
						<button @click="switchToIndex" class="control-btn index-btn">
							<text class="btn-icon">#</text>
							<text class="btn-text">跳转到第3张</text>
						</button>
						<button @click="getCurrentInfo" class="control-btn info-btn">
							<text class="btn-icon">ℹ</text>
							<text class="btn-text">获取当前信息</text>
						</button>
					</view>
				</view>
			</view>

			<!-- 配置选项演示 -->
			<view class="demo-section">
				<view class="section-title">
					<text class="title-text">配置选项</text>
					<text class="title-desc">动态调整轮播配置</text>
				</view>
				<view class="demo-wrapper">
					<zx-swiper
						:list="imageList"
						:height="'300rpx'"
						:autoplay="configOptions.autoplay"
						:interval="configOptions.interval"
						:duration="configOptions.duration"
						:circular="configOptions.circular"
						:indicator="configOptions.indicator"
						:indicator-mode="configOptions.indicatorMode"
						:lazy-load="configOptions.lazyLoad"
					/>
					<view class="config-panel">
						<view class="config-row">
							<text class="config-label">自动播放</text>
							<switch :checked="configOptions.autoplay" @change="toggleAutoplay" />
						</view>
						<view class="config-row">
							<text class="config-label">显示指示器</text>
							<switch :checked="configOptions.indicator" @change="toggleIndicator" />
						</view>
						<view class="config-row">
							<text class="config-label">循环播放</text>
							<switch :checked="configOptions.circular" @change="toggleCircular" />
						</view>
						<view class="config-row">
							<text class="config-label">懒加载</text>
							<switch :checked="configOptions.lazyLoad" @change="toggleLazyLoad" />
						</view>
						<view class="config-row">
							<text class="config-label">指示器模式</text>
							<picker :value="configOptions.indicatorMode === 'dot' ? 0 : 1" 
								:range="['圆点', '线条']" @change="changeIndicatorMode">
								<text class="picker-text">{{ configOptions.indicatorMode === 'dot' ? '圆点' : '线条' }}</text>
							</picker>
						</view>
						<view class="config-row">
							<text class="config-label">切换间隔: {{ configOptions.interval }}ms</text>
							<slider :value="configOptions.interval" min="1000" max="5000" @change="changeInterval" />
						</view>
						<view class="config-row">
							<text class="config-label">动画时长: {{ configOptions.duration }}ms</text>
							<slider :value="configOptions.duration" min="200" max="1000" @change="changeDuration" />
						</view>
					</view>
				</view>
			</view>

			<!-- 事件日志 -->
			<view class="demo-section">
				<view class="section-title">
					<text class="title-text">事件日志</text>
					<text class="title-desc">最近的轮播事件记录</text>
				</view>
				<view class="demo-wrapper">
					<view class="event-log">
						<text v-for="(log, index) in eventLogs.slice(-5)" :key="index" class="log-item">
							{{ log }}
						</text>
						<text v-if="eventLogs.length === 0" class="log-empty">暂无事件记录</text>
					</view>
					<button @click="clearLogs" class="clear-btn">清空日志</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref, reactive } from 'vue';

// 组件引用
const basicSwiperRef = ref(null);
const controlSwiperRef = ref(null);

// 控制相关
const controlCurrent = ref(0);

// 图片列表
const imageList = ref([
	'https://cdn.uviewui.com/uview/swiper/swiper1.png',
	'https://cdn.uviewui.com/uview/swiper/swiper2.png',
	'https://cdn.uviewui.com/uview/swiper/swiper3.png',
	'https://cdn.uviewui.com/uview/album/1.jpg'
]);

// 带标题的图片列表
const imageListWithTitle = ref([
	{
		url: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
		title: '美丽的自然风光'
	},
	{
		url: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
		title: '现代都市建筑'
	},
	{
		url: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
		title: '宁静的湖泊景色'
	},
	{
		url: 'https://cdn.uviewui.com/uview/album/1.jpg',
		title: '壮观的山峰雪景'
	}
]);

// 视频列表
const videoList = ref([
	{
		type: 'video',
		url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
		poster: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
		title: '示例视频1'
	},
	{
		type: 'image', // 混合显示图片
		url: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
		title: '图片内容'
	}
]);

// 自定义内容列表
const customList = ref([
	{
		type: 'custom',
		text: '功能丰富',
		desc: '支持图片、视频、自定义内容',
		icon: '🎨',
		color: '#667eea'
	},
	{
		type: 'custom',
		text: '高度定制',
		desc: '灵活的配置选项和插槽支持',
		icon: '⚙️',
		color: '#764ba2'
	},
	{
		type: 'custom',
		text: '性能优化',
		desc: '懒加载、视频控制等优化特性',
		icon: '⚡',
		color: '#f093fb'
	},
	{
		type: 'custom',
		text: '易于使用',
		desc: '简单的API，完整的文档',
		icon: '📖',
		color: '#4facfe'
	}
]);

// 配置选项
const configOptions = reactive({
	autoplay: true,
	interval: 3000,
	duration: 500,
	circular: true,
	indicator: true,
	indicatorMode: 'dot',
	lazyLoad: true
});

// 事件日志
const eventLogs = ref([]);

// 添加事件日志
function addLog(message) {
	const timestamp = new Date().toLocaleTimeString();
	eventLogs.value.push(`[${timestamp}] ${message}`);
}

// 轮播切换事件
function onSwiperChange(e) {
	console.log('轮播切换:', e);
	addLog(`轮播切换到第 ${e.current + 1} 张，切换来源: ${e.source || '未知'}`);
}

// 点击轮播项事件
function onSwiperClick(e) {
	console.log('点击轮播项:', e);
	addLog(`点击了第 ${e.index + 1} 张轮播项`);
	uni.showToast({
		title: `点击了第${e.index + 1}张`,
		icon: 'none',
		duration: 1500
	});
}

// 视频事件
function onVideoPlay(e) {
	console.log('视频开始播放:', e);
	addLog('视频开始播放');
}

function onVideoPause(e) {
	console.log('视频暂停:', e);
	addLog('视频暂停播放');
}

function onVideoEnded(e) {
	console.log('视频播放结束:', e);
	addLog('视频播放结束');
}

// 控制方法
function switchToPrev() {
	controlSwiperRef.value?.prev();
	addLog('手动切换到上一张');
}

function switchToNext() {
	controlSwiperRef.value?.next();
	addLog('手动切换到下一张');
}

function switchToIndex() {
	controlSwiperRef.value?.switchTo(2);
	controlCurrent.value = 2;
	addLog('手动跳转到第3张');
}

function getCurrentInfo() {
	const currentItem = controlSwiperRef.value?.getCurrentItem();
	addLog(`当前轮播项信息: ${currentItem || '获取失败'}`);
	uni.showToast({
		title: '查看控制台输出',
		icon: 'none'
	});
	console.log('当前轮播项:', currentItem);
}

// 配置切换方法
function toggleAutoplay(e) {
	configOptions.autoplay = e.detail.value;
	addLog(`${configOptions.autoplay ? '开启' : '关闭'}自动播放`);
}

function toggleIndicator(e) {
	configOptions.indicator = e.detail.value;
	addLog(`${configOptions.indicator ? '显示' : '隐藏'}指示器`);
}

function toggleCircular(e) {
	configOptions.circular = e.detail.value;
	addLog(`${configOptions.circular ? '开启' : '关闭'}循环播放`);
}

function toggleLazyLoad(e) {
	configOptions.lazyLoad = e.detail.value;
	addLog(`${configOptions.lazyLoad ? '开启' : '关闭'}懒加载`);
}

function changeIndicatorMode(e) {
	configOptions.indicatorMode = e.detail.value === 0 ? 'dot' : 'line';
	addLog(`切换指示器模式为: ${configOptions.indicatorMode === 'dot' ? '圆点' : '线条'}`);
}

function changeInterval(e) {
	configOptions.interval = e.detail.value;
	addLog(`调整切换间隔为: ${configOptions.interval}ms`);
}

function changeDuration(e) {
	configOptions.duration = e.detail.value;
	addLog(`调整动画时长为: ${configOptions.duration}ms`);
}

function clearLogs() {
	eventLogs.value = [];
	uni.showToast({
		title: '日志已清空',
		icon: 'success',
		duration: 1500
	});
}
</script>

<style lang="scss" scoped>
.page {
	min-height: 100vh;
	background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.page-header {
	padding: 60rpx 40rpx 40rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	text-align: center;
}

.page-title {
	font-size: 48rpx;
	font-weight: bold;
	display: block;
	margin-bottom: 20rpx;
}

.page-desc {
	font-size: 28rpx;
	opacity: 0.9;
	display: block;
}

.page-body {
	flex: 1;
	padding: 20rpx;
}

.demo-section {
	margin-bottom: 40rpx;
	background: white;
	border-radius: 20rpx;
	overflow: hidden;
	box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.1);
}

.section-title {
	padding: 40rpx 30rpx 30rpx;
	background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
	color: white;
}

.title-text {
	font-size: 36rpx;
	font-weight: bold;
	display: block;
	margin-bottom: 10rpx;
}

.title-desc {
	font-size: 26rpx;
	opacity: 0.9;
	display: block;
}

.demo-wrapper {
	padding: 30rpx;
}

/* 自定义内容样式 */
.custom-item {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 20rpx;
	position: relative;
	padding: 40rpx;
}

.custom-icon {
	font-size: 80rpx;
	margin-bottom: 20rpx;
}

.custom-text {
	font-size: 36rpx;
	color: white;
	font-weight: bold;
	margin-bottom: 15rpx;
}

.custom-desc {
	font-size: 26rpx;
	color: rgba(255, 255, 255, 0.9);
	text-align: center;
	margin-bottom: 20rpx;
	line-height: 1.4;
}

.custom-index {
	position: absolute;
	top: 20rpx;
	right: 30rpx;
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.8);
	background: rgba(0, 0, 0, 0.2);
	padding: 8rpx 16rpx;
	border-radius: 20rpx;
}

/* 自定义指示器 */
.custom-indicator {
	background: rgba(0, 0, 0, 0.6);
	padding: 12rpx 24rpx;
	border-radius: 30rpx;
	backdrop-filter: blur(10rpx);
}

.indicator-text {
	color: white;
	font-size: 26rpx;
	font-weight: 500;
}

/* 控制按钮 */
.control-buttons {
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx;
	margin-top: 30rpx;
}

.control-btn {
	flex: 1;
	min-width: 300rpx;
	height: 88rpx;
	border: none;
	border-radius: 44rpx;
	font-size: 28rpx;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12rpx;
	position: relative;
	overflow: hidden;
	
	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
		transition: left 0.5s;
	}
	
	&:active::before {
		left: 100%;
	}
	
	&.prev-btn {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
	}
	
	&.next-btn {
		background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
		color: white;
	}
	
	&.index-btn {
		background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
		color: white;
	}
	
	&.info-btn {
		background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
		color: white;
	}
}

.btn-icon {
	font-size: 32rpx;
	font-weight: bold;
}

.btn-text {
	font-size: 28rpx;
}

/* 配置面板 */
.config-panel {
	margin-top: 30rpx;
	padding: 30rpx;
	background: #f8f9fa;
	border-radius: 16rpx;
}

.config-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 30rpx;
	
	&:last-child {
		margin-bottom: 0;
	}
}

.config-label {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

.picker-text {
	font-size: 26rpx;
	color: #007aff;
	padding: 10rpx 20rpx;
	background: rgba(0, 122, 255, 0.1);
	border-radius: 8rpx;
}

/* 事件日志 */
.event-log {
	background: #2c3e50;
	border-radius: 12rpx;
	padding: 30rpx;
	min-height: 200rpx;
	max-height: 400rpx;
	overflow-y: auto;
}

.log-item {
	display: block;
	color: #a8d4a8;
	font-size: 24rpx;
	line-height: 1.6;
	margin-bottom: 10rpx;
	font-family: 'Monaco', 'Consolas', monospace;
	
	&:last-child {
		margin-bottom: 0;
	}
}

.log-empty {
	color: #7f8c8d;
	font-size: 26rpx;
	text-align: center;
	margin-top: 60rpx;
	display: block;
}

.clear-btn {
	margin-top: 20rpx;
	width: 100%;
	height: 80rpx;
	background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
	color: white;
	border: none;
	border-radius: 40rpx;
	font-size: 28rpx;
	font-weight: 500;
}
</style>
