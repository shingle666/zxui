<template>
	<view class="container">
		<view class="page-title">zx-image 组件示例</view>
		
		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">基础用法</view>
			<view class="section-content">
				<zx-image 
					src="https://cdn.mp.ac.cn/banner/01.jpg" 
					width="300rpx" 
					height="200rpx"
				></zx-image>
			</view>
		</view>
		
		<!-- 图片模式 -->
		<view class="section">
			<view class="section-title">图片模式</view>
			<view class="section-content mode-list">
				<view class="mode-item" v-for="(item, index) in modeList" :key="index">
					<zx-image 
						:src="imageSrc" 
						:mode="item.mode" 
						width="180rpx" 
						height="180rpx"
						:backgroundColor="item.index % 2 === 0 ? '#f0f0f0' : '#e0e0e0'"
					></zx-image>
					<view class="mode-name">{{item.mode}}</view>
				</view>
			</view>
		</view>
		
		<!-- 圆角设置 -->
		<view class="section">
			<view class="section-title">圆角设置</view>
			<view class="section-content">
				<view class="radius-demo">
					<zx-image 
						:src="imageSrc" 
						width="150rpx" 
						height="150rpx" 
						radius="10rpx"
					></zx-image>
					<text class="demo-text">radius="10rpx"</text>
				</view>
				<view class="radius-demo">
					<zx-image 
						:src="imageSrc" 
						width="150rpx" 
						height="150rpx" 
						radius="20rpx"
					></zx-image>
					<text class="demo-text">radius="20rpx"</text>
				</view>
				<view class="radius-demo">
					<zx-image 
						:src="imageSrc" 
						width="150rpx" 
						height="150rpx" 
						radius="75rpx"
					></zx-image>
					<text class="demo-text">圆形 radius="75rpx"</text>
				</view>
			</view>
		</view>
		
		<!-- 占位图 -->
		<view class="section">
			<view class="section-title">占位图和加载失败</view>
			<view class="section-content">
				<view class="placeholder-demo">
					<zx-image 
						:src="imageSrc" 
						width="200rpx" 
						height="200rpx"
						placeholder="/static/images/placeholder.png"
					></zx-image>
					<text class="demo-text">使用占位图</text>
				</view>
				<view class="placeholder-demo">
					<zx-image 
						src="https://cdn.mp.ac.cn/banner/01.jpg" 
						width="200rpx" 
						height="200rpx"
						errorImage="https://cdn.mp.ac.cn/images/error.png"
					></zx-image>
					<text class="demo-text">加载失败显示错误图</text>
				</view>
			</view>
		</view>
		
		<!-- 懒加载 -->
		<view class="section">
			<view class="section-title">懒加载示例</view>
			<view class="section-content">
				<view class="lazy-demo">
					<text class="demo-text">向下滚动查看懒加载效果</text>
				</view>
			</view>
		</view>
		
		<!-- 滚动列表加载 -->
		<view class="section">
			<view class="section-title">滚动加载图片</view>
			<scroll-view class="scroll-list" scroll-y>
				<view class="scroll-item" v-for="(item, index) in lazyLoadList" :key="index">
					<zx-image 
						:src="item.src" 
						:index="index"
						width="100%"
						height="300rpx"
						:lazyLoad="true"
						@load="onImageLoad"
						@error="onImageError"
						@click="onImageClick"
					></zx-image>
					<text class="item-index">图片 {{index + 1}}</text>
				</view>
			</scroll-view>
		</view>
		
		<!-- 手动加载 -->
		<view class="section">
			<view class="section-title">手动触发加载</view>
			<view class="section-content">
				<zx-image 
					ref="manualImage"
					:src="imageSrc" 
					width="250rpx" 
					height="180rpx"
					:disconnect="true"
				></zx-image>
				<button class="btn" @tap="loadManualImage">加载图片</button>
			</view>
		</view>
		
		<!-- 事件显示区域 -->
		<view class="section" v-if="eventLog">
			<view class="section-title">事件日志</view>
			<view class="event-log">
				{{eventLog}}
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const imageSrc = ref('https://cdn.mp.ac.cn/banner/01.jpg')
const eventLog = ref('')
const modeList = [
	{ mode: 'scaleToFill', index: 0 },
	{ mode: 'aspectFit', index: 1 },
	{ mode: 'aspectFill', index: 2 },
	{ mode: 'widthFix', index: 3 },
	{ mode: 'heightFix', index: 4 },
	{ mode: 'top', index: 5 },
	{ mode: 'bottom', index: 6 },
	{ mode: 'center', index: 7 },
	{ mode: 'left', index: 8 },
	{ mode: 'right', index: 9 },
	{ mode: 'top left', index: 10 },
	{ mode: 'top right', index: 11 },
	{ mode: 'bottom left', index: 12 },
	{ mode: 'bottom right', index: 13 }
]
const lazyLoadList = ref([])
const manualImage = ref(null)

function generateLazyLoadList() {
	const baseUrl = 'https://cdn.mp.ac.cn/banner/'
	const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg']
	let list = []
	for (let i = 0; i < 10; i++) {
		const randomIndex = Math.floor(Math.random() * images.length)
		list.push({
			src: baseUrl + images[randomIndex % images.length]
		})
	}
	lazyLoadList.value = list
}

function loadManualImage() {
	manualImage.value && manualImage.value.loadImage()
	logEvent('手动触发加载图片')
}

function onImageLoad(e) {
	logEvent(`图片 ${e.index + 1} 加载成功，尺寸: ${e.detail.width}x${e.detail.height}`)
}

function onImageError(e) {
	logEvent(`图片 ${e.index + 1} 加载失败`)
}

function onImageClick(e) {
	logEvent(`点击了图片 ${e.index + 1}`)
}

function logEvent(message) {
	eventLog.value = message + '\n' + eventLog.value
	if (eventLog.value.length > 500) {
		eventLog.value = eventLog.value.substring(0, 500) + '...'
	}
}

onMounted(() => {
	generateLazyLoadList()
})
</script>

<style lang="scss" scoped>
.container {
	padding: 20rpx;
}

.page-title {
	font-size: 36rpx;
	font-weight: bold;
	text-align: center;
	padding: 30rpx 0;
}

.section {
	margin-bottom: 40rpx;
}

.section-title {
	font-size: 30rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	padding-left: 20rpx;
	border-left: 8rpx solid #007AFF;
}

.section-content {
	padding: 20rpx;
	background-color: #ffffff;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.mode-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}

.mode-item {
	width: 180rpx;
	margin-bottom: 30rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.mode-name {
	font-size: 24rpx;
	color: #666;
	margin-top: 10rpx;
	text-align: center;
}

.radius-demo, .placeholder-demo {
	display: inline-block;
	margin: 0 20rpx 20rpx 0;
	text-align: center;
}

.demo-text {
	font-size: 24rpx;
	color: #666;
	margin-top: 10rpx;
	display: block;
}

.scroll-list {
	height: 600rpx;
	border: 1rpx solid #eee;
	border-radius: 12rpx;
}

.scroll-item {
	margin-bottom: 20rpx;
	position: relative;
}

.item-index {
	position: absolute;
	bottom: 10rpx;
	left: 10rpx;
	background-color: rgba(0, 0, 0, 0.5);
	color: #fff;
	padding: 4rpx 10rpx;
	font-size: 24rpx;
	border-radius: 6rpx;
}

.lazy-demo {
	height: 200rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.btn {
	margin-top: 20rpx;
	background-color: #007AFF;
	color: #fff;
	font-size: 28rpx;
	border-radius: 8rpx;
}

.event-log {
	background-color: #f5f5f5;
	padding: 20rpx;
	font-size: 24rpx;
	color: #333;
	border-radius: 8rpx;
	min-height: 200rpx;
	max-height: 400rpx;
	overflow-y: auto;
	white-space: pre-wrap;
	word-break: break-all;
	line-height: 1.5;
}
</style>
