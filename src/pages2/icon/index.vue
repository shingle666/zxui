<template>
	<view>
		<!-- 导航栏 -->
		<zx-navbar title="Icon 图标"></zx-navbar>
		<view class="container">
			<view class="title">基础图标</view>
			<view class="icon-group">
				<view class="icon-item" v-for="(item, index) in baseIcons" :key="index">
					<zx-icon :name="item" size="40rpx"></zx-icon>
					<text class="icon-text">{{ item }}</text>
				</view>
			</view>

			<view class="title">不同颜色</view>
			<view class="icon-group">
				<view class="icon-item" v-for="(item, index) in colors" :key="index">
					<zx-icon name="star" :color="item.color" size="40rpx"></zx-icon>
					<text class="icon-text">{{ item.name }}</text>
				</view>
			</view>

			<view class="title">不同尺寸</view>
			<view class="icon-group">
				<view class="icon-item" v-for="(item, index) in sizes" :key="index">
					<zx-icon name="star" color="#2979ff" :size="item.size"></zx-icon>
					<text class="icon-text">{{ item.name }}</text>
				</view>
			</view>

			<view class="title">自定义样式</view>
			<view class="icon-group">
				<view class="icon-item">
					<zx-icon name="arrow-upward" color="#ff9500" size="40rpx"
						:style="{ transform: 'rotate(45deg)' }"></zx-icon>
					<text class="icon-text">旋转45度</text>
				</view>
				<view class="icon-item">
					<zx-icon name="star" color="#ff9500" size="40rpx" bold></zx-icon>
					<text class="icon-text">粗体</text>
				</view>
			</view>

			<view class="title">点击事件</view>
			<view class="icon-group">
				<view class="icon-item">
					<zx-icon name="heart" color="#ff5500" size="40rpx" @onClick="iconClick"></zx-icon>
					<text class="icon-text">点击我</text>
				</view>
			</view>

			<view class="title">图片图标</view>
			<view class="icon-group">
				<view class="icon-item">
					<zx-icon name="https://zxui.org/logo.png" width="60rpx" height="60rpx"></zx-icon>
					<text class="icon-text">图片图标</text>
				</view>
				<view class="icon-item">
					<zx-icon :name="svgImgCode" width="60rpx" height="60rpx"></zx-icon>
					<text class="icon-text">svg图标</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const svgImgCode = ref(`<svg t="1748845278714" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2954" width="200" height="200"><path d="M240.071 241.095h59.278v59.278h-59.278v-59.278z" fill="" p-id="2955"></path><path d="M405.959 134.485h-272.611v272.611h106.723v47.445h59.278v-47.445h106.723v-59.278h47.445v-47.445h-47.445l-0.114-165.888zM346.795 347.819h-154.169v-154.055h154.055v154.055h0.114zM240.071 727.154h59.278v59.278h-59.278v-59.278zM726.016 241.095h59.278v59.278h-59.278v-59.278zM512.683 509.042v63.943h59.278v-59.165h47.445v-59.278h-47.445v-47.445h-59.278v101.945zM512.683 725.789v60.643h59.278v-106.723h47.445v-59.278h-106.723v105.358zM571.961 786.432h47.445v47.445h-47.445v-47.445zM453.405 833.877v59.165h118.557v-59.165h-118.557z" fill="" p-id="2956"></path><path d="M678.685 679.709h-59.278v106.723h106.61v-59.278h-47.331v-47.445zM726.016 893.042h166.002v-59.165h-106.723v-47.445h-59.278v106.61zM892.018 513.821v-59.278h-106.723v59.278h106.723zM832.739 727.154h59.278v59.278h-59.278v-59.278zM453.405 347.819h59.278v59.278h-59.278v-59.278zM726.016 454.542v-47.445h166.002v-272.611h-272.611v59.278h-106.723v47.445h106.723v59.165h-47.445v47.445h47.445v59.278h59.278v47.445h47.331zM678.685 193.763h154.055v154.055h-154.055v-154.055zM678.685 572.985h47.331v47.445h-47.331v-47.445zM785.294 679.709h-59.278v47.445h106.723v-106.723h59.278v-47.445h-106.723v106.723zM453.405 241.095h59.278v59.278h-59.278v-59.278zM299.349 513.821h47.445v59.165h-47.445v-59.165zM453.405 454.542h-106.61v59.278h59.165v59.165h47.445v-118.443z" fill="" p-id="2957"></path><path d="M405.959 786.432v-106.723h47.445v-59.278h-213.333v-106.61h-106.723v59.278h59.278v47.445h-59.278v272.611h272.611v-59.278h47.445v-47.445h-47.445zM346.795 833.877h-154.169v-154.169h154.055v154.169h0.114zM453.405 572.985h59.278v47.445h-59.278v-47.445zM619.406 513.821h59.278v59.165h-59.278v-59.165zM726.016 513.821h59.278v59.165h-59.278v-59.165z" fill="" p-id="2958"></path></svg>`);

// 基础图标列表
const baseIcons = ref([
	'search', 'eye', 'eye-fill', 'mic', 'mic-off',
	'trash', 'info', 'plus', 'minus', 'close'
]);

// 不同颜色
const colors = ref([
	{ color: '#2979ff', name: '蓝色' },
	{ color: '#ff5500', name: '橙色' },
	{ color: '#19be6b', name: '绿色' },
	{ color: '#fa3534', name: '红色' },
	{ color: '#ff9500', name: '黄色' }
]);

// 不同尺寸
const sizes = ref([
	{ size: '24rpx', name: '小' },
	{ size: '40rpx', name: '中' },
	{ size: '60rpx', name: '大' }
]);

// 图标点击事件
const iconClick = (index) => {
	uni.showToast({
		title: '点击了图标',
		icon: 'none'
	});
};
</script>

<style>
.container {
	padding: 30rpx;
}

.title {
	font-size: 32rpx;
	font-weight: bold;
	margin: 40rpx 0 20rpx 0;
	color: #333;
}

.icon-group {
	display: flex;
	flex-wrap: wrap;
}

.icon-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 150rpx;
	height: 150rpx;
	margin: 10rpx;
	background-color: #f8f8f8;
	border-radius: 8rpx;
}

.icon-text {
	font-size: 24rpx;
	color: #666;
	margin-top: 16rpx;
	text-align: center;
}
</style>
