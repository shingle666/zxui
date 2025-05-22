<template>
	<view class="demo-page">
		<view class="demo-title">头像组 zx-avatar-group</view>
		
		<view class="demo-section">
			<view class="demo-section__title">基本使用</view>
			<zx-avatar-group :urls="basicUrls" size="70"></zx-avatar-group>
		</view>
		
		<view class="demo-section">
			<view class="demo-section__title">对象数组用法</view>
			<zx-avatar-group :urls="objectUrls" keyName="avatar" size="70"></zx-avatar-group>
		</view>
		
		<view class="demo-section">
			<view class="demo-section__title">自定义形状 - 方形</view>
			<zx-avatar-group :urls="basicUrls" shape="square" size="70"></zx-avatar-group>
		</view>
		
		<view class="demo-section">
			<view class="demo-section__title">自定义显示数量</view>
			<zx-avatar-group :urls="basicUrls" :maxCount="3" size="70"></zx-avatar-group>
		</view>
		
		<view class="demo-section">
			<view class="demo-section__title">自定义间距比例</view>
			<view class="demo-row">
				<view class="demo-item">
					<view class="demo-item__title">gap: 0.2</view>
					<zx-avatar-group :urls="basicUrls" :gap="0.2" size="70"></zx-avatar-group>
				</view>
				<view class="demo-item">
					<view class="demo-item__title">gap: 0.5</view>
					<zx-avatar-group :urls="basicUrls" :gap="0.5" size="70"></zx-avatar-group>
				</view>
				<view class="demo-item">
					<view class="demo-item__title">gap: 0.8</view>
					<zx-avatar-group :urls="basicUrls" :gap="0.8" size="70"></zx-avatar-group>
				</view>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="demo-section__title">自定义显示尺寸</view>
			<view class="demo-row">
				<view class="demo-item">
					<view class="demo-item__title">size: 50</view>
					<zx-avatar-group :urls="basicUrls" :size="50"></zx-avatar-group>
				</view>
				<view class="demo-item">
					<view class="demo-item__title">size: 70</view>
					<zx-avatar-group :urls="basicUrls" :size="70"></zx-avatar-group>
				</view>
				<view class="demo-item">
					<view class="demo-item__title">size: 90</view>
					<zx-avatar-group :urls="basicUrls" :size="90"></zx-avatar-group>
				</view>
			</view>
		</view>
		
		<view class="demo-section">
			<view class="demo-section__title">额外显示的数量</view>
			<zx-avatar-group :urls="basicUrls" :maxCount="3" :extraValue="10" size="70"></zx-avatar-group>
		</view>
		
		<view class="demo-section">
			<view class="demo-section__title">禁用查看更多</view>
			<zx-avatar-group :urls="basicUrls" :maxCount="3" :showMore="false" size="70"></zx-avatar-group>
		</view>
		
		<view class="demo-section">
			<view class="demo-section__title">点击查看更多</view>
			<zx-avatar-group :urls="basicUrls" :maxCount="3" size="70" @showMore="handleShowMore"></zx-avatar-group>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 基础字符串数组
const basicUrls = ref([
	'https://cdn.uviewui.com/uview/album/1.jpg',
	'https://cdn.uviewui.com/uview/album/2.jpg',
	'https://cdn.uviewui.com/uview/album/3.jpg',
	'https://cdn.uviewui.com/uview/album/4.jpg',
	'https://cdn.uviewui.com/uview/album/5.jpg',
	'https://cdn.uviewui.com/uview/album/6.jpg',
	'https://cdn.uviewui.com/uview/album/7.jpg'
]);

// 对象数组
const objectUrls = ref([
	{ id: 1, name: '用户1', avatar: 'https://cdn.uviewui.com/uview/album/1.jpg' },
	{ id: 2, name: '用户2', avatar: 'https://cdn.uviewui.com/uview/album/2.jpg' },
	{ id: 3, name: '用户3', avatar: 'https://cdn.uviewui.com/uview/album/3.jpg' },
	{ id: 4, name: '用户4', avatar: 'https://cdn.uviewui.com/uview/album/4.jpg' },
	{ id: 5, name: '用户5', avatar: 'https://cdn.uviewui.com/uview/album/5.jpg' }
]);

// 处理查看更多事件
const handleShowMore = () => {
	uni.showToast({
		title: '点击了查看更多',
		icon: 'none'
	});
};
</script>

<style lang="scss" scoped>
.demo-page {
	padding: 30rpx;
	background-color: #f8f8f8;
	min-height: 100vh;
}

.demo-title {
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 40rpx;
	text-align: center;
}

.demo-section {
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	
	&__title {
		font-size: 28rpx;
		margin-bottom: 20rpx;
		color: #333333;
	}
}

.demo-row {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin: 0 -10rpx;
}

.demo-item {
	padding: 0 10rpx;
	margin-bottom: 20rpx;
	
	&__title {
		font-size: 24rpx;
		color: #666666;
		margin-bottom: 10rpx;
	}
}
</style>
