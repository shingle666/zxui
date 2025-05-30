<template>
	<view class="container">
		<view class="header">
			<text class="title">zx-overlay 遮罩层</text>
		</view>
		
		<view class="section">
			<view class="section-title">基础用法</view>
			<view class="button-group">
				<button class="btn" @click="show = !show">显示/隐藏遮罩层</button>
			</view>
			<view class="demo-box">
				<zx-overlay :show="show" @click="show = false">
					<view class="overlay-content">
						<text class="content-text">点击遮罩关闭</text>
					</view>
				</zx-overlay>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">自定义透明度</view>
			<view class="button-group">
				<button class="btn" @click="showCustomOpacity = !showCustomOpacity">自定义透明度</button>
			</view>
			<view class="demo-box">
				<zx-overlay :show="showCustomOpacity" :opacity="0.8" @click="showCustomOpacity = false">
					<view class="overlay-content">
						<text class="content-text">透明度: 0.8</text>
					</view>
				</zx-overlay>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">自定义内容</view>
			<view class="button-group">
				<button class="btn" @click="showCustomContent = !showCustomContent">自定义内容</button>
			</view>
			<view class="demo-box">
				<zx-overlay :show="showCustomContent" @click="showCustomContent = false">
					<view class="custom-content">
						<view class="content-box">
							<text class="content-title">自定义内容</text>
							<text class="content-desc">可以在遮罩层上添加任意内容</text>
							<button class="content-btn" @click.stop="showCustomContent = false">关闭</button>
						</view>
					</view>
				</zx-overlay>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">点击行为控制</view>
			<view class="button-group">
				<button class="btn" @click="showClickControl = !showClickControl">点击行为控制</button>
			</view>
			<view class="demo-box">
				<zx-overlay 
					:show="showClickControl" 
					:close-on-click-overlay="closeOnClickOverlay" 
					@click="clickOverlay"
					@open="onOpen"
					@close="onClose"
				>
					<view class="overlay-content">
						<text class="content-text">{{ closeOnClickOverlay ? '点击遮罩关闭' : '点击遮罩不关闭' }}</text>
						<button class="toggle-btn" @click.stop="toggleCloseOnClick">切换点击行为</button>
					</view>
				</zx-overlay>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">不同动画模式</view>
			<view class="button-group">
				<button class="btn" @click="currentMode = 'fade'; toggleAnimation()">淡入淡出</button>
				<button class="btn" @click="currentMode = 'fade-zoom'; toggleAnimation()">缩放淡入</button>
				<button class="btn" @click="currentMode = 'fade-up'; toggleAnimation()">上滑淡入</button>
				<button class="btn" @click="currentMode = 'fade-down'; toggleAnimation()">下滑淡入</button>
			</view>
			<view class="demo-box">
				<zx-overlay 
					:show="showAnimation" 
					:mode="currentMode"
					@click="showAnimation = false"
				>
					<view class="overlay-content">
						<text class="content-text">动画模式: {{ currentMode }}</text>
					</view>
				</zx-overlay>
			</view>
		</view>
		
		<view class="section">
			<view class="section-title">锁定滚动</view>
			<view class="button-group">
				<button class="btn" @click="showLockScroll = !showLockScroll">{{ lockScroll ? '锁定滚动' : '不锁定滚动' }}</button>
				<button class="btn" @click="lockScroll = !lockScroll">切换锁定状态</button>
			</view>
			<view class="demo-box">
				<zx-overlay 
					:show="showLockScroll" 
					:lock-scroll="lockScroll"
					@click="showLockScroll = false"
				>
					<view class="overlay-content">
						<text class="content-text">{{ lockScroll ? '背景滚动已锁定' : '背景滚动未锁定' }}</text>
					</view>
				</zx-overlay>
			</view>
		</view>
		
		<view class="placeholder"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 基础用法
const show = ref(false);

// 自定义透明度
const showCustomOpacity = ref(false);

// 自定义内容
const showCustomContent = ref(false);

// 点击行为控制
const showClickControl = ref(false);
const closeOnClickOverlay = ref(true);

// 切换点击行为
const toggleCloseOnClick = () => {
	closeOnClickOverlay.value = !closeOnClickOverlay.value;
};

// 点击遮罩
const clickOverlay = () => {
	if (closeOnClickOverlay.value) {
		showClickControl.value = false;
	}
};

// 动画模式
const showAnimation = ref(false);
const currentMode = ref('fade');

const toggleAnimation = () => {
	showAnimation.value = true;
};

// 锁定滚动
const showLockScroll = ref(false);
const lockScroll = ref(true);

// 事件处理
const onOpen = () => {
	console.log('遮罩已打开');
};

const onClose = () => {
	console.log('遮罩已关闭');
};
</script>

<style scoped>
.container {
	padding: 20rpx;
}

.header {
	margin-bottom: 40rpx;
}

.title {
	font-size: 36rpx;
	font-weight: 500;
}

.section {
	margin-bottom: 30rpx;
	background-color: #ffffff;
	border-radius: 10rpx;
	padding: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-title {
	font-size: 28rpx;
	margin-bottom: 20rpx;
	color: #333;
	font-weight: 500;
}

.button-group {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 20rpx;
}

.btn {
	margin-right: 20rpx;
	margin-bottom: 20rpx;
	font-size: 26rpx;
	background-color: #5677fc;
	color: #ffffff;
}

.demo-box {
	position: relative;
	height: 100rpx;
	margin-bottom: 20rpx;
}

.overlay-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 300rpx;
	height: 300rpx;
	background-color: #ffffff;
	border-radius: 10rpx;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
}

.content-text {
	font-size: 28rpx;
	color: #333;
	margin-bottom: 20rpx;
}

.toggle-btn {
	font-size: 24rpx;
	padding: 10rpx 20rpx;
	background-color: #5677fc;
	color: #ffffff;
	border-radius: 50rpx;
}

.custom-content {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.content-box {
	width: 70%;
	padding: 40rpx;
	background-color: #ffffff;
	border-radius: 10rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.content-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 20rpx;
	color: #333;
}

.content-desc {
	font-size: 26rpx;
	color: #666;
	margin-bottom: 30rpx;
	text-align: center;
}

.content-btn {
	font-size: 26rpx;
	padding: 10rpx 40rpx;
	background-color: #5677fc;
	color: #ffffff;
	border-radius: 50rpx;
}

.placeholder {
	height: 500rpx;
}
</style>
