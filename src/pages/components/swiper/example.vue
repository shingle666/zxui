<template>
	<view class="example-container">
		<view class="example-title">zx-swiper 轮播组件示例</view>
		
		<!-- 基础轮播图 -->
		<view class="example-section">
			<view class="section-title">基础轮播图</view>
			<zx-swiper
				:list="imageList"
				:height="'400rpx'"
				:autoplay="true"
				:interval="3000"
				:indicator="true"
				@change="onSwiperChange"
				@click="onSwiperClick"
			/>
		</view>
		
		<!-- 带标题的轮播图 -->
		<view class="example-section">
			<view class="section-title">带标题的轮播图</view>
			<zx-swiper
				:list="imageListWithTitle"
				:height="'400rpx'"
				:show-title="true"
				:autoplay="false"
				indicator-mode="line"
			/>
		</view>
		
		<!-- 视频轮播 -->
		<view class="example-section">
			<view class="section-title">视频轮播</view>
			<zx-swiper
				:list="videoList"
				:height="'300rpx'"
				:autoplay="false"
				:video-controls="true"
				@video-play="onVideoPlay"
				@video-pause="onVideoPause"
			/>
		</view>
		
		<!-- 纵向轮播 -->
		<view class="example-section">
			<view class="section-title">纵向轮播</view>
			<zx-swiper
				:list="imageList"
				:height="'400rpx'"
				:vertical="true"
				:autoplay="true"
				:interval="2000"
			/>
		</view>
		
		<!-- 多个显示项目 -->
		<view class="example-section">
			<view class="section-title">多个显示项目</view>
			<zx-swiper
				:list="imageList"
				:height="'200rpx'"
				:display-multiple-items="2"
				:previous-margin="'20rpx'"
				:next-margin="'20rpx'"
				:autoplay="false"
			/>
		</view>
		
		<!-- 自定义内容 -->
		<view class="example-section">
			<view class="section-title">自定义内容轮播</view>
			<zx-swiper
				:list="customList"
				:height="'300rpx'"
				:autoplay="false"
			>
				<template #item="{ item, index }">
					<view class="custom-item" :style="{ backgroundColor: item.color }">
						<text class="custom-text">{{ item.text }}</text>
						<text class="custom-index">{{ index + 1 }}</text>
					</view>
				</template>
			</zx-swiper>
		</view>
		
		<!-- 控制按钮 -->
		<view class="control-buttons">
			<button @click="switchToPrev" class="control-btn">上一张</button>
			<button @click="switchToNext" class="control-btn">下一张</button>
			<button @click="switchToIndex" class="control-btn">跳转到第3张</button>
			<button @click="pauseAllVideos" class="control-btn">暂停所有视频</button>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 引用轮播组件
const swiperRef = ref(null);

// 图片列表
const imageList = ref([
	'https://example.com/image1.jpg',
	'https://example.com/image2.jpg',
	'https://example.com/image3.jpg',
	'https://example.com/image4.jpg'
]);

// 带标题的图片列表
const imageListWithTitle = ref([
	{
		url: 'https://example.com/image1.jpg',
		title: '美丽的风景图片1'
	},
	{
		url: 'https://example.com/image2.jpg',
		title: '美丽的风景图片2'
	},
	{
		url: 'https://example.com/image3.jpg',
		title: '美丽的风景图片3'
	}
]);

// 视频列表
const videoList = ref([
	{
		type: 'video',
		url: 'https://example.com/video1.mp4',
		poster: 'https://example.com/poster1.jpg',
		title: '精彩视频1'
	},
	{
		type: 'video',
		url: 'https://example.com/video2.mp4',
		poster: 'https://example.com/poster2.jpg',
		title: '精彩视频2'
	}
]);

// 自定义内容列表
const customList = ref([
	{
		type: 'custom',
		text: '自定义内容1',
		color: '#ff6b6b'
	},
	{
		type: 'custom',
		text: '自定义内容2',
		color: '#4ecdc4'
	},
	{
		type: 'custom',
		text: '自定义内容3',
		color: '#45b7d1'
	}
]);

// 轮播切换事件
function onSwiperChange(e) {
	console.log('轮播切换:', e);
}

// 点击轮播项事件
function onSwiperClick(e) {
	console.log('点击轮播项:', e);
	uni.showToast({
		title: `点击了第${e.index + 1}张`,
		icon: 'none'
	});
}

// 视频播放事件
function onVideoPlay(e) {
	console.log('视频开始播放:', e);
}

// 视频暂停事件
function onVideoPause(e) {
	console.log('视频暂停:', e);
}

// 控制方法
function switchToPrev() {
	swiperRef.value?.prev();
}

function switchToNext() {
	swiperRef.value?.next();
}

function switchToIndex() {
	swiperRef.value?.switchTo(2); // 跳转到第3张（索引为2）
}

function pauseAllVideos() {
	swiperRef.value?.pauseAllVideos();
}
</script>

<style lang="scss" scoped>
.example-container {
	padding: 40rpx;
	background-color: #f8f9fa;
	min-height: 100vh;
}

.example-title {
	font-size: 36rpx;
	font-weight: bold;
	text-align: center;
	margin-bottom: 40rpx;
	color: #333;
}

.example-section {
	margin-bottom: 60rpx;
	background: white;
	border-radius: 20rpx;
	padding: 30rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.section-title {
	font-size: 32rpx;
	font-weight: 600;
	margin-bottom: 30rpx;
	color: #333;
	border-left: 8rpx solid #007aff;
	padding-left: 20rpx;
}

.custom-item {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 20rpx;
}

.custom-text {
	font-size: 32rpx;
	color: white;
	font-weight: bold;
	margin-bottom: 20rpx;
}

.custom-index {
	font-size: 60rpx;
	color: white;
	font-weight: bold;
}

.control-buttons {
	display: flex;
	flex-wrap: wrap;
	gap: 20rpx;
	margin-top: 40rpx;
}

.control-btn {
	flex: 1;
	min-width: 200rpx;
	height: 80rpx;
	background: linear-gradient(45deg, #007aff, #5ac8fa);
	color: white;
	border: none;
	border-radius: 40rpx;
	font-size: 28rpx;
	font-weight: 500;
	box-shadow: 0 4rpx 15rpx rgba(0, 122, 255, 0.3);
	
	&:active {
		transform: scale(0.95);
		box-shadow: 0 2rpx 8rpx rgba(0, 122, 255, 0.3);
	}
}
</style> 