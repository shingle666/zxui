<template>
	<view class="container">
		<view class="title">基础图标</view>
		<view class="icon-group">
			<view class="icon-item" v-for="(item, index) in baseIcons" :key="index">
				<zx-icon :name="item" size="40rpx"></zx-icon>
				<text class="icon-text">{{item}}</text>
			</view>
		</view>
		
		<view class="title">不同颜色</view>
		<view class="icon-group">
			<view class="icon-item" v-for="(item, index) in colors" :key="index">
				<zx-icon name="star" :color="item.color" size="40rpx"></zx-icon>
				<text class="icon-text">{{item.name}}</text>
			</view>
		</view>
		
		<view class="title">不同尺寸</view>
		<view class="icon-group">
			<view class="icon-item" v-for="(item, index) in sizes" :key="index">
				<zx-icon name="star" color="#2979ff" :size="item.size"></zx-icon>
				<text class="icon-text">{{item.name}}</text>
			</view>
		</view>
		
		<view class="title">自定义样式</view>
		<view class="icon-group">
			<view class="icon-item">
				<zx-icon name="star" color="#ff9500" size="40rpx" :customStyle="{ transform: 'rotate(45deg)' }"></zx-icon>
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
				<zx-icon name="/static/logo.png" width="60rpx" height="60rpx"></zx-icon>
				<text class="icon-text">图片图标</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

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
