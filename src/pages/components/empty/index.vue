<template>
	<view class="container">
		<view class="header">
			<view class="title">
				<text>空状态</text>
			</view>
			<view class="subtitle">
				<text>用于需要加载内容但数据为空时的占位提示</text>
			</view>
		</view>
		
		<!-- 基础用法 -->
		<view class="section">
			<view class="section-title">基础用法</view>
			<view class="section-content">
				<zx-empty text="暂无数据" icon="data"></zx-empty>
			</view>
		</view>
		
		<!-- 自定义图片 -->
		<view class="section">
			<view class="section-title">自定义图片</view>
			<view class="section-content">
				<zx-empty text="暂无数据" icon="https://files.wufu-app.com/images/empty/search.png"></zx-empty>
			</view>
		</view>
		
		<!-- 图片尺寸 -->
		<view class="section">
			<view class="section-title">图片尺寸</view>
			<view class="section-content">
				<zx-empty text="控制图片大小" icon="data" :image-size="200"></zx-empty>
			</view>
		</view>
		
		<!-- 底部内容 -->
		<view class="section">
			<view class="section-title">底部内容</view>
			<view class="section-content">
				<zx-empty text="暂无数据" icon="search">
					<button type="primary" size="mini">刷新试试</button>
				</zx-empty>
			</view>
		</view>
		
		<!-- 完全自定义 -->
		<view class="section">
			<view class="section-title">完全自定义</view>
			<view class="section-content">
				<zx-empty>
					<template #image>
						<view class="custom-image">
							<text class="iconfont icon-empty" style="font-size: 120rpx; color: #8a8a8a;"></text>
						</view>
					</template>
					<template #description>
						<view>
							<zx-text text="什么都没找到" color="#666" size="28rpx" bold></zx-text>
							<zx-text text="请尝试其他搜索条件" color="#999" size="24rpx"></zx-text>
						</view>
					</template>
					<button type="primary" size="mini" style="margin-top: 20rpx;">返回首页</button>
				</zx-empty>
			</view>
		</view>
		
		<!-- 内置图标 -->
		<view class="section">
			<view class="section-title">内置图标</view>
			<view class="icon-grid">
				<view class="icon-item" v-for="(icon, index) in iconList" :key="index">
					<zx-empty :icon="icon" :text="icon" :width="120" :height="120" :text-size="24"></zx-empty>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

// 内置图标列表
const iconList = ref([
	'address',
	'auth',
	'cart', 
	'collection',
	'comment',
	'coupon',
	'data',
	'message',
	'message_list',
	'news',
	'orders',
	'page',
	'record',
	'search',
	'wifi'
]);
</script>

<style lang="scss" scoped>
.container {
	padding: 30rpx;
}

.header {
	margin-bottom: 40rpx;
	
	.title {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 10rpx;
	}
	
	.subtitle {
		font-size: 28rpx;
		color: #666;
	}
}

.section {
	margin-bottom: 50rpx;
	
	&-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
		position: relative;
		padding-left: 20rpx;
		
		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 6rpx;
			height: 30rpx;
			background-color: #5677fc;
			border-radius: 3rpx;
		}
	}
	
	&-content {
		background-color: #fff;
		border-radius: 12rpx;
		padding: 20rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
	}
}

.icon-grid {
	display: flex;
	flex-wrap: wrap;
	background-color: #fff;
	border-radius: 12rpx;
	padding: 20rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
	
	.icon-item {
		width: 33.33%;
		display: flex;
		justify-content: center;
		margin-bottom: 30rpx;
	}
}

.custom-image {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 200rpx;
	height: 200rpx;
	background-color: #f5f7fa;
	border-radius: 50%;
}
</style>
